import json
import secrets
from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from .db import token_hash, uid
from .catalog import CATEGORY_FIELDS
from .models import ListingCreate

bearer = HTTPBearer(auto_error=False)


def fail(status, code, message):
    raise HTTPException(status, detail={"code": code, "message": message, "fields": []})


def connection(request: Request):
    with request.app.state.database.connect() as c:
        # Serialize state checks and writes for this small local SQLite backend.
        c.execute("BEGIN IMMEDIATE")
        yield c


def now(request):
    return request.app.state.clock()


def row(c, sql, args=()):
    r = c.execute(sql, args).fetchone()
    return dict(r) if r else None


def rows(c, sql, args=()):
    return [dict(r) for r in c.execute(sql, args).fetchall()]


def count_sponsors(c, user_id):
    return c.execute(
        "SELECT count(*) FROM sponsorships WHERE requester_id=? AND status='accepted'", (user_id,)
    ).fetchone()[0]


def public_user(c, user_id):
    u = row(c, "SELECT * FROM users WHERE id=? AND deleted_at IS NULL", (user_id,))
    if not u:
        fail(404, "not_found", "User not found")
    u["category_ids"] = [
        r["category_id"]
        for r in rows(
            c,
            "SELECT category_id FROM user_categories WHERE user_id=? ORDER BY position",
            (user_id,),
        )
    ]
    u["sponsorship_count"] = count_sponsors(c, user_id)
    u["access_status"] = "full" if u["sponsorship_count"] >= 3 else "pending_sponsors"
    u["onboarding_step"] = next(
        (
            k
            for k, v in [
                ("location", u["city_id"]),
                ("email", u["email"]),
                ("name", u["first_name"] and u["last_name"]),
                ("categories", u["category_ids"]),
                ("house_rules", u["house_rules_accepted"]),
            ]
            if not v
        ),
        "complete",
    )
    return {
        k: v
        for k, v in u.items()
        if k not in ("password_hash", "deleted_at", "deletion_reason", "created_at")
    }


def current_user(
    request: Request,
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer),
    c=Depends(connection),
):
    if not credentials or credentials.scheme.lower() != "bearer":
        fail(401, "unauthenticated", "Sign in to continue")
    session = row(
        c, "SELECT * FROM sessions WHERE token_hash=?", (token_hash(credentials.credentials),)
    )
    if not session or session["expires_at"] <= now(request):
        fail(401, "unauthenticated", "Session is missing or expired")
    return public_user(c, session["user_id"])


def session_response(c, user_id, timestamp):
    token = secrets.token_urlsafe(32)
    expiry = timestamp + 86400
    c.execute("INSERT INTO sessions VALUES (?,?,?)", (token_hash(token), user_id, expiry))
    return {
        "session_token": token,
        "token_type": "bearer",
        "expires_at": expiry,
        "user": public_user(c, user_id),
    }


def notify(c, user_id, kind, title, target_type, target_id, timestamp, body=""):
    c.execute(
        "INSERT INTO notifications VALUES (?,?,?,?,?,?,?,?,?)",
        (uid(), user_id, kind, title, body, target_type, target_id, None, timestamp),
    )


def member(c, user_id):
    u = public_user(c, user_id)
    return {
        "id": u["id"],
        "display_name": (u["first_name"] + " " + u["last_name"][:1] + ".").strip()
        if u["first_name"]
        else u["username"],
        "photo_id": u["photo_id"],
        "city_id": u["city_id"],
        "sponsorship_count": u["sponsorship_count"],
        "verification_status": u["verification_status"],
    }


def listing(c, listing_id, user_id, owner_only=False):
    item = row(c, "SELECT * FROM listings WHERE id=?", (listing_id,))
    if not item:
        fail(404, "not_found", "Listing not found")
    if owner_only and item["seller_id"] != user_id:
        fail(403, "forbidden", "Only the seller can change this listing")
    seller = row(c, "SELECT deleted_at FROM users WHERE id=?", (item["seller_id"],))
    if (
        item["status"] in ("draft", "paused", "deleted") or seller["deleted_at"] is not None
    ) and item["seller_id"] != user_id:
        fail(404, "not_found", "Listing is unavailable")
    item["attributes"] = json.loads(item["attributes"])
    item["photo_ids"] = [
        p["media_id"]
        for p in rows(
            c,
            "SELECT media_id FROM listing_photos WHERE listing_id=? ORDER BY position",
            (listing_id,),
        )
    ]
    item["unavailable"] = item["status"] == "deleted"
    item.pop("buyer_id", None)
    return item


def require_full(c, user_id):
    if count_sponsors(c, user_id) < 3:
        fail(403, "sponsors_required", "Three accepted sponsors are required to sell")


def validate_listing(c, payload, owner):
    # Validates the merged document as well as category applicability.
    data = ListingCreate.model_validate(payload).model_dump(mode="json")
    if data["category_id"] not in CATEGORY_FIELDS:
        fail(422, "invalid_category", "Choose a listed category")
    if not row(c, "SELECT id FROM cities WHERE id=?", (data["city_id"],)):
        fail(422, "invalid_city", "Choose a listed city")
    provided = {k for k, v in data["attributes"].items() if v not in (None, [])}
    if provided - set(CATEGORY_FIELDS[data["category_id"]][1]):
        fail(422, "invalid_attributes", "Some item details do not apply to this category")
    if (
        data["attributes"].get("price_max_minor") is not None
        and data["attributes"]["price_max_minor"] < data["price_minor"]
    ):
        fail(422, "invalid_price_range", "Maximum price must be at least the minimum price")
    photos = data["photo_ids"]
    if len(photos) != len(set(photos)):
        fail(422, "duplicate_photos", "Each photo may appear only once")
    for photo_id in photos:
        if not row(c, "SELECT id FROM media WHERE id=? AND owner_id=?", (photo_id, owner)):
            fail(422, "invalid_photo", "Upload each photo before attaching it")
    return data


def page(items, offset=0, limit=20):
    return {
        "items": items[offset : offset + limit],
        "total": len(items),
        "offset": offset,
        "limit": limit,
    }


def conversation_access(c, conversation_id, user_id):
    conv = row(c, "SELECT * FROM conversations WHERE id=?", (conversation_id,))
    if not conv:
        fail(404, "not_found", "Conversation not found")
    if not row(
        c,
        "SELECT 1 FROM conversation_members WHERE conversation_id=? AND user_id=?",
        (conversation_id, user_id),
    ):
        fail(403, "forbidden", "This conversation is private")
    return conv


def open_conversation(c, user_id, kind, listing_id, topic, timestamp):
    if kind == "listing":
        item = listing(c, listing_id, user_id)
        if item["seller_id"] == user_id:
            fail(422, "own_listing", "Choose another member's listing")
        if item["status"] != "active":
            fail(409, "listing_unavailable", "This listing is no longer active")
        existing = row(
            c,
            "SELECT co.* FROM conversations co JOIN conversation_members cm ON cm.conversation_id=co.id WHERE cm.user_id=? AND co.kind='listing' AND co.listing_id=? AND co.closed_at IS NULL",
            (user_id, listing_id),
        )
        members = [user_id, item["seller_id"]]
    else:
        existing = row(
            c,
            "SELECT co.* FROM conversations co JOIN conversation_members cm ON cm.conversation_id=co.id WHERE cm.user_id=? AND co.kind='concierge' AND co.topic=? AND co.closed_at IS NULL AND co.created_at>?",
            (user_id, topic, timestamp - 86400),
        )
        members = [user_id]
    if existing:
        return existing
    conv = {
        "id": uid(),
        "kind": kind,
        "listing_id": listing_id,
        "topic": topic,
        "created_at": timestamp,
        "closed_at": None,
    }
    c.execute(
        "INSERT INTO conversations VALUES (:id,:kind,:listing_id,:topic,:created_at,:closed_at)",
        conv,
    )
    c.executemany(
        "INSERT INTO conversation_members VALUES (?,?)", [(conv["id"], m) for m in members]
    )
    return conv
