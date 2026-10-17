import base64
import binascii
import json
from fastapi import APIRouter, Depends, Query, Request, Response
from pydantic import ValidationError
from . import models as m
from .core import (
    connection,
    current_user,
    row,
    rows,
    fail,
    now,
    page,
    listing,
    require_full,
    validate_listing,
)
from .db import uid
from .catalog import CATEGORY_FIELDS

router = APIRouter(prefix="/api", tags=["Listings"])


def search_items(
    c, user_id, q=None, category_id=None, city_id=None, min_price=None, max_price=None, filters=None
):
    sql = "SELECT l.id FROM listings l JOIN users u ON u.id=l.seller_id WHERE l.status='active' AND u.deleted_at IS NULL"
    args = []
    for clause, value in [
        ("l.category_id=?", category_id),
        ("l.city_id=?", city_id),
        ("l.price_minor>=?", min_price),
        ("l.price_minor<=?", max_price),
    ]:
        if value is not None:
            sql += " AND " + clause
            args.append(value)
    if q:
        sql += " AND (l.title LIKE ? OR l.description LIKE ?)"
        args += ["%" + q + "%"] * 2
    if min_price is not None and max_price is not None and min_price > max_price:
        fail(422, "invalid_price_range", "Minimum price exceeds maximum price")
    filter_data = {}
    if filters:
        try:
            parsed = json.loads(filters)
            model = m.Attributes.model_validate(parsed)
            filter_data = model.model_dump(mode="json", exclude_unset=True)
        except (ValueError, ValidationError):
            fail(
                422,
                "invalid_filters",
                "Filters must be a JSON object using typed category attribute fields",
            )
        if any(v is None for v in filter_data.values()):
            fail(422, "invalid_filters", "Omit unused filters instead of setting null")
        if category_id and (
            category_id not in CATEGORY_FIELDS
            or set(filter_data) - set(CATEGORY_FIELDS[category_id][1])
        ):
            fail(422, "invalid_filters", "Filter does not apply to this category")
    items = [
        listing(c, r["id"], user_id)
        for r in rows(c, sql + " ORDER BY l.created_at DESC,l.id", args)
    ]

    def matches(item):
        attrs = item["attributes"]
        for key, wanted in filter_data.items():
            actual = attrs.get(key)
            if isinstance(wanted, list):
                if not wanted:
                    continue
                if key == "dates":
                    if not set(wanted) & set(actual or []):
                        return False
                elif not set(wanted) <= set(actual or []):
                    return False
            elif actual is None:
                return False
            elif key in ("bedrooms", "bathrooms", "surface_m2", "guests"):
                if actual < wanted:
                    return False
            elif actual != wanted:
                return False
        return True

    return [item for item in items if matches(item)]


@router.get("/listings/", response_model=m.Page[m.Listing])
def search(
    request: Request,
    q: str | None = Query(None, max_length=160),
    category_id: str | None = None,
    city_id: str | None = None,
    min_price: int | None = Query(None, ge=0),
    max_price: int | None = Query(None, ge=0),
    filters: str | None = None,
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    user=Depends(current_user),
    c=Depends(connection),
):
    if q:
        c.execute(
            "INSERT INTO search_history(user_id,query,created_at) VALUES (?,?,?)",
            (user["id"], q, now(request)),
        )
    return page(
        search_items(c, user["id"], q, category_id, city_id, min_price, max_price, filters),
        offset,
        limit,
    )


@router.post("/listings/", response_model=m.Listing, status_code=201)
def create(
    body: m.ListingCreate, request: Request, user=Depends(current_user), c=Depends(connection)
):
    require_full(c, user["id"])
    value = validate_listing(c, body.model_dump(mode="json"), user["id"])
    photos = value.pop("photo_ids")
    value["attributes"] = json.dumps(value["attributes"])
    value.update(
        id=uid(),
        seller_id=user["id"],
        status="draft",
        created_at=now(request),
        updated_at=now(request),
    )
    c.execute(
        "INSERT INTO listings ("
        + ",".join(value)
        + ") VALUES ("
        + ",".join("?" for _ in value)
        + ")",
        tuple(value.values()),
    )
    c.executemany(
        "INSERT INTO listing_photos VALUES (?,?,?)",
        [(value["id"], p, i) for i, p in enumerate(photos)],
    )
    return listing(c, value["id"], user["id"])


@router.get("/listings/{listing_id}/", response_model=m.Listing)
def detail(listing_id: str, user=Depends(current_user), c=Depends(connection)):
    return listing(c, listing_id, user["id"])


@router.patch("/listings/{listing_id}/", response_model=m.Listing)
def update(
    listing_id: str,
    body: m.ListingPatch,
    request: Request,
    user=Depends(current_user),
    c=Depends(connection),
):
    item = listing(c, listing_id, user["id"], True)
    if item["status"] in ("sold", "deleted"):
        fail(409, "listing_closed", "This listing cannot be edited")
    denomination_changed = any(
        key in body.model_fields_set and getattr(body, key) != item[key]
        for key in ("currency", "price_unit")
    )
    if denomination_changed and row(
        c,
        "SELECT id FROM offers WHERE listing_id=? AND status IN ('pending','accepted')",
        (listing_id,),
    ):
        fail(409, "live_offer", "Currency and price unit cannot change during a live negotiation")
    merged = {k: v for k, v in item.items() if k in m.ListingCreate.model_fields}
    merged.update(body.model_dump(exclude_unset=True, mode="json"))
    value = validate_listing(c, merged, user["id"])
    photos = value.pop("photo_ids")
    value["attributes"] = json.dumps(value["attributes"])
    value["updated_at"] = now(request)
    c.execute(
        "UPDATE listings SET " + ",".join(k + "=?" for k in value) + " WHERE id=?",
        (*value.values(), listing_id),
    )
    c.execute("DELETE FROM listing_photos WHERE listing_id=?", (listing_id,))
    c.executemany(
        "INSERT INTO listing_photos VALUES (?,?,?)",
        [(listing_id, p, i) for i, p in enumerate(photos)],
    )
    return listing(c, listing_id, user["id"])


@router.post("/listings/{listing_id}/publish/", response_model=m.Listing)
def publish(listing_id: str, request: Request, user=Depends(current_user), c=Depends(connection)):
    require_full(c, user["id"])
    item = listing(c, listing_id, user["id"], True)
    if item["status"] != "draft":
        fail(409, "invalid_transition", "Only a draft can be published")
    validate_listing(
        c, {k: v for k, v in item.items() if k in m.ListingCreate.model_fields}, user["id"]
    )
    c.execute(
        "UPDATE listings SET status='active',updated_at=? WHERE id=?", (now(request), listing_id)
    )
    return listing(c, listing_id, user["id"])


@router.post("/listings/{listing_id}/status/", response_model=m.Listing)
def change_status(
    listing_id: str,
    body: m.ListingStatus,
    request: Request,
    user=Depends(current_user),
    c=Depends(connection),
):
    item = listing(c, listing_id, user["id"], True)
    allowed = {"active": {"paused", "sold"}, "paused": {"active", "sold"}}
    if body.status not in allowed.get(item["status"], set()):
        fail(409, "invalid_transition", "This listing state cannot change that way")
    if body.status == "active":
        require_full(c, user["id"])
    if body.buyer_id and body.status != "sold":
        fail(422, "invalid_buyer", "A buyer is only valid when marking sold")
    buyer = body.buyer_id
    accepted = row(
        c, "SELECT * FROM offers WHERE listing_id=? AND status='accepted'", (listing_id,)
    )
    if body.status == "sold" and accepted:
        expected = (
            accepted["sender_id"]
            if accepted["sender_id"] != user["id"]
            else accepted["recipient_id"]
        )
        if buyer and buyer != expected:
            fail(409, "buyer_conflict", "Choose the member whose offer was accepted")
        buyer = expected
    if buyer:
        if buyer == user["id"] or not row(
            c, "SELECT id FROM users WHERE id=? AND deleted_at IS NULL", (buyer,)
        ):
            fail(422, "invalid_buyer", "Choose another active member")
    c.execute(
        "UPDATE listings SET status=?,buyer_id=?,updated_at=? WHERE id=?",
        (body.status, buyer, now(request), listing_id),
    )
    if body.status == "sold":
        c.execute(
            "UPDATE offers SET status='declined' WHERE listing_id=? AND status='pending'",
            (listing_id,),
        )
    return listing(c, listing_id, user["id"])


@router.delete("/listings/{listing_id}/", status_code=204)
def delete(listing_id: str, request: Request, user=Depends(current_user), c=Depends(connection)):
    listing(c, listing_id, user["id"], True)
    c.execute(
        "UPDATE listings SET status='deleted',updated_at=? WHERE id=?", (now(request), listing_id)
    )
    c.execute(
        "UPDATE offers SET status='declined' WHERE listing_id=? AND status='pending'", (listing_id,)
    )
    return Response(status_code=204)


@router.get("/listings/{listing_id}/similar/", response_model=m.Page[m.Listing])
def similar(
    listing_id: str,
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    user=Depends(current_user),
    c=Depends(connection),
):
    item = listing(c, listing_id, user["id"])
    items = search_items(c, user["id"], category_id=item["category_id"], city_id=item["city_id"])
    return page([x for x in items if x["id"] != listing_id], offset, limit)


@router.get("/me/listings/", response_model=m.Page[m.Listing], tags=["Profile"])
def own_listings(
    status: str | None = Query(None, pattern="^(draft|active|paused|sold|deleted)$"),
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    user=Depends(current_user),
    c=Depends(connection),
):
    ids = rows(
        c, "SELECT id FROM listings WHERE seller_id=? ORDER BY created_at DESC,id", (user["id"],)
    )
    items = [listing(c, r["id"], user["id"]) for r in ids]
    return page([x for x in items if not status or x["status"] == status], offset, limit)


@router.get("/me/purchases/", response_model=m.Page[m.Listing], tags=["Profile"])
def purchases(
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    user=Depends(current_user),
    c=Depends(connection),
):
    ids = rows(
        c,
        "SELECT id FROM listings WHERE buyer_id=? AND status='sold' ORDER BY updated_at DESC,id",
        (user["id"],),
    )
    return page([listing(c, x["id"], user["id"]) for x in ids], offset, limit)


@router.put("/favourites/{listing_id}/", response_model=m.Favourite, tags=["Profile"])
def favourite(listing_id: str, user=Depends(current_user), c=Depends(connection)):
    item = listing(c, listing_id, user["id"])
    if item["status"] != "active":
        fail(409, "listing_unavailable", "Only active listings can be added")
    c.execute("INSERT OR IGNORE INTO favourites VALUES (?,?)", (user["id"], listing_id))
    return {"listing_id": listing_id, "unavailable": False, "listing": item}


@router.delete("/favourites/{listing_id}/", status_code=204, tags=["Profile"])
def unfavourite(listing_id: str, user=Depends(current_user), c=Depends(connection)):
    c.execute("DELETE FROM favourites WHERE user_id=? AND listing_id=?", (user["id"], listing_id))
    return Response(status_code=204)


@router.get("/favourites/", response_model=m.Page[m.Favourite], tags=["Profile"])
def favourites(
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    user=Depends(current_user),
    c=Depends(connection),
):
    ids = rows(
        c,
        "SELECT f.listing_id,l.status,u.deleted_at FROM favourites f JOIN listings l ON l.id=f.listing_id JOIN users u ON u.id=l.seller_id WHERE f.user_id=? ORDER BY f.listing_id",
        (user["id"],),
    )
    return page(
        [
            {
                "listing_id": x["listing_id"],
                "unavailable": x["status"] not in ("active", "sold") or x["deleted_at"] is not None,
                "listing": listing(c, x["listing_id"], user["id"])
                if x["status"] in ("active", "sold") and x["deleted_at"] is None
                else None,
            }
            for x in ids
        ],
        offset,
        limit,
    )


@router.post("/media/", response_model=m.Media, status_code=201, tags=["Media"])
def upload(body: m.MediaCreate, user=Depends(current_user), c=Depends(connection)):
    try:
        data = base64.b64decode(body.content_base64, validate=True)
    except (ValueError, binascii.Error):
        fail(422, "invalid_image", "Image must be valid base64")
    if len(data) > 2 * 1024 * 1024:
        fail(413, "image_too_large", "Image must be at most 2 MiB")
    signature = b"\x89PNG\r\n\x1a\n" if body.content_type == "image/png" else b"\xff\xd8\xff"
    if not data.startswith(signature):
        fail(422, "invalid_image", "Image signature does not match content type")
    media_id = uid()
    c.execute(
        "INSERT INTO media VALUES (?,?,?,?,?,?)",
        (media_id, user["id"], body.filename, body.content_type, len(data), data),
    )
    return {
        "id": media_id,
        "filename": body.filename,
        "content_type": body.content_type,
        "size": len(data),
        "content_url": f"/api/media/{media_id}/content/",
    }


@router.get(
    "/media/{media_id}/content/",
    response_class=Response,
    tags=["Media"],
    responses={
        200: {
            "description": "Authenticated PNG/JPEG bytes",
            "content": {"image/png": {}, "image/jpeg": {}},
        }
    },
)
def media_content(media_id: str, user=Depends(current_user), c=Depends(connection)):
    image = row(c, "SELECT * FROM media WHERE id=?", (media_id,))
    if not image:
        fail(404, "not_found", "Photo not found")
    allowed = image["owner_id"] == user["id"]
    allowed = allowed or row(
        c, "SELECT id FROM users WHERE photo_id=? AND deleted_at IS NULL", (media_id,)
    )
    allowed = allowed or row(
        c,
        "SELECT l.id FROM listing_photos p JOIN listings l ON l.id=p.listing_id JOIN users u ON u.id=l.seller_id WHERE p.media_id=? AND l.status IN ('active','sold') AND u.deleted_at IS NULL",
        (media_id,),
    )
    allowed = allowed or row(
        c,
        "SELECT m.id FROM messages m JOIN conversation_members cm ON cm.conversation_id=m.conversation_id WHERE m.photo_id=? AND cm.user_id=?",
        (media_id, user["id"]),
    )
    if not allowed:
        fail(404, "not_found", "Photo not found")
    return Response(
        image["bytes"],
        media_type=image["content_type"],
        headers={"X-Content-Type-Options": "nosniff", "Cache-Control": "private, no-store"},
    )
