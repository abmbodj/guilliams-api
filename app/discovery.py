from typing import Literal
from fastapi import APIRouter, Depends, Query, Request
from . import models as m
from .core import connection, current_user, row, rows, fail, now, page, member, listing
from .listings import search_items
from .catalog import CITIES, CATEGORY_FIELDS

router = APIRouter(prefix="/api", tags=["Discovery and profile"])


@router.get("/cities/", response_model=list[m.Reference])
def cities():
    return [{"id": k, "name": v} for k, v in CITIES.items()]


@router.get("/categories/", response_model=list[m.Category])
def categories():
    return [{"id": k, "name": v[0], "attribute_fields": v[1]} for k, v in CATEGORY_FIELDS.items()]


@router.get("/countries/", response_model=list[m.Country])
def countries():
    return [
        {"id": k, "name": name, "dial_code": dial}
        for k, name, dial in [
            ("GB", "United Kingdom", "+44"),
            ("US", "United States", "+1"),
            ("AE", "United Arab Emirates", "+971"),
            ("AU", "Australia", "+61"),
        ]
    ]


@router.get("/legal/{document}/", response_model=m.Legal)
def legal(document: Literal["terms", "cookies", "house-rules"]):
    return {
        "document": document,
        "title": document.replace("-", " ").title(),
        "body": "Development placeholder copy. Use approved legal text before a live release.",
        "version": "demo-1",
    }


@router.get("/members/", response_model=m.Page[m.Member])
def members(
    q: str = Query("", max_length=160),
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    user=Depends(current_user),
    c=Depends(connection),
):
    ids = rows(
        c,
        "SELECT id FROM users WHERE deleted_at IS NULL AND (username LIKE ? OR first_name LIKE ? OR last_name LIKE ?) ORDER BY username",
        ("%" + q + "%",) * 3,
    )
    return page([member(c, r["id"]) for r in ids], offset, limit)


@router.get("/members/{member_id}/", response_model=m.Member)
def member_profile(member_id: str, user=Depends(current_user), c=Depends(connection)):
    return member(c, member_id)


@router.get("/members/{member_id}/listings/", response_model=m.Page[m.Listing])
def member_items(
    member_id: str,
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    user=Depends(current_user),
    c=Depends(connection),
):
    member(c, member_id)
    ids = rows(
        c,
        "SELECT id FROM listings WHERE seller_id=? AND status='active' ORDER BY created_at DESC,id",
        (member_id,),
    )
    return page([listing(c, r["id"], user["id"]) for r in ids], offset, limit)


@router.get("/search/suggestions/", response_model=m.Suggestions)
def search_suggestions(
    q: str = Query("", max_length=160), user=Depends(current_user), c=Depends(connection)
):
    items = search_items(c, user["id"], q=q) if q else []
    recent = [
        r["query"]
        for r in rows(
            c,
            "SELECT query,max(created_at) AS last FROM search_history WHERE user_id=? GROUP BY query ORDER BY last DESC LIMIT 5",
            (user["id"],),
        )
    ]
    return {
        "suggestions": [{"text": i["title"], "category_id": i["category_id"]} for i in items[:5]],
        "recent": recent,
        "popular": ["Tickets", "Holiday home", "Yard sale"],
    }


def yard_sale(c, user_id, timestamp):
    sale = row(c, "SELECT * FROM yard_sales ORDER BY starts_at DESC LIMIT 1")
    return {
        **sale,
        "registration_status": "open" if timestamp < sale["registration_closes_at"] else "closed",
        "registered": bool(
            row(
                c,
                "SELECT 1 FROM yard_sale_registrations WHERE yard_sale_id=? AND user_id=?",
                (sale["id"], user_id),
            )
        ),
    }


@router.get("/yard-sales/current/", response_model=m.YardSale)
def current_yard_sale(request: Request, user=Depends(current_user), c=Depends(connection)):
    return yard_sale(c, user["id"], now(request))


@router.post("/yard-sales/{sale_id}/register/", response_model=m.YardSale)
def register(sale_id: str, request: Request, user=Depends(current_user), c=Depends(connection)):
    sale = row(c, "SELECT * FROM yard_sales WHERE id=?", (sale_id,))
    if not sale:
        fail(404, "not_found", "Yard sale not found")
    if now(request) >= sale["registration_closes_at"]:
        fail(409, "registration_closed", "Registration has closed")
    c.execute("INSERT OR IGNORE INTO yard_sale_registrations VALUES (?,?)", (sale_id, user["id"]))
    return {**sale, "registration_status": "open", "registered": True}


@router.get("/feed/", response_model=m.Feed)
def feed(
    request: Request,
    category_id: str | None = None,
    preferred_only: bool = False,
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    user=Depends(current_user),
    c=Depends(connection),
):
    items = search_items(c, user["id"], category_id=category_id, city_id=user["city_id"])
    if preferred_only:
        items = [i for i in items if i["category_id"] in user["category_ids"]]
    unread = c.execute(
        "SELECT count(*) FROM notifications WHERE user_id=? AND read_at IS NULL", (user["id"],)
    ).fetchone()[0]
    return {
        "listings": page(items, offset, limit),
        "sponsorship_count": user["sponsorship_count"],
        "required_sponsors": 3,
        "notifications_enabled": user["notifications_enabled"],
        "unread_notifications": unread,
        "category_ids": user["category_ids"],
        "yard_sale": yard_sale(c, user["id"], now(request)),
    }


@router.get("/notifications/", response_model=m.Page[m.Notification])
def notifications(
    unread_only: bool = False,
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    user=Depends(current_user),
    c=Depends(connection),
):
    values = rows(
        c, "SELECT * FROM notifications WHERE user_id=? ORDER BY created_at DESC,id", (user["id"],)
    )
    return page(
        [
            {k: v for k, v in n.items() if k != "user_id"}
            for n in values
            if not unread_only or n["read_at"] is None
        ],
        offset,
        limit,
    )


@router.patch("/notifications/{notification_id}/read/", response_model=m.Notification)
def read_notification(
    notification_id: str, request: Request, user=Depends(current_user), c=Depends(connection)
):
    value = row(
        c, "SELECT * FROM notifications WHERE id=? AND user_id=?", (notification_id, user["id"])
    )
    if not value:
        fail(404, "not_found", "Notification not found")
    if value["read_at"] is None:
        value["read_at"] = now(request)
        c.execute(
            "UPDATE notifications SET read_at=? WHERE id=?", (value["read_at"], notification_id)
        )
    value.pop("user_id")
    return value
