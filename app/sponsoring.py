from fastapi import APIRouter, Depends, Request
from . import models as m
from .core import (
    connection,
    current_user,
    row,
    rows,
    fail,
    now,
    notify,
    member,
    count_sponsors,
    page,
)
from .db import uid

router = APIRouter(prefix="/api", tags=["Sponsorship"])


@router.get("/sponsors/suggestions/", response_model=m.Page[m.Member])
def suggestions(user=Depends(current_user), c=Depends(connection)):
    eligible = rows(
        c,
        "SELECT id FROM users WHERE id<>? AND deleted_at IS NULL AND id NOT IN (SELECT sponsor_id FROM sponsorships WHERE requester_id=?) ORDER BY id",
        (user["id"], user["id"]),
    )
    return page([member(c, u["id"]) for u in eligible])


@router.get("/sponsorships/", response_model=m.Sponsorships)
def sponsorships(user=Depends(current_user), c=Depends(connection)):
    return {
        "incoming": rows(
            c, "SELECT * FROM sponsorships WHERE sponsor_id=? ORDER BY created_at,id", (user["id"],)
        ),
        "outgoing": rows(
            c,
            "SELECT * FROM sponsorships WHERE requester_id=? ORDER BY created_at,id",
            (user["id"],),
        ),
        "accepted_count": count_sponsors(c, user["id"]),
        "required_count": 3,
    }


@router.post("/sponsorships/", response_model=m.Sponsorship, status_code=201)
def request_sponsor(
    body: m.SponsorRequest, request: Request, user=Depends(current_user), c=Depends(connection)
):
    if body.sponsor_id == user["id"]:
        fail(422, "self_sponsorship", "Choose another member")
    member(c, body.sponsor_id)
    if row(
        c,
        "SELECT id FROM sponsorships WHERE requester_id=? AND sponsor_id=?",
        (user["id"], body.sponsor_id),
    ):
        fail(409, "request_exists", "A request already exists for this member")
    reverse = row(
        c,
        "SELECT id FROM sponsorships WHERE requester_id=? AND sponsor_id=? AND status='accepted'",
        (body.sponsor_id, user["id"]),
    )
    if reverse and count_sponsors(c, user["id"]) < 3:
        fail(403, "sponsors_required", "Complete your three sponsorships before sponsoring back")
    value = {
        "id": uid(),
        "requester_id": user["id"],
        "sponsor_id": body.sponsor_id,
        "relationship": body.relationship,
        "status": "pending",
        "created_at": now(request),
    }
    c.execute(
        "INSERT INTO sponsorships VALUES (:id,:requester_id,:sponsor_id,:relationship,:status,:created_at)",
        value,
    )
    notify(
        c,
        body.sponsor_id,
        "sponsorship",
        "New sponsorship request",
        "sponsorship",
        value["id"],
        now(request),
    )
    return value


@router.patch("/sponsorships/{sponsorship_id}/", response_model=m.Sponsorship)
def decide(
    sponsorship_id: str,
    body: m.SponsorDecision,
    request: Request,
    user=Depends(current_user),
    c=Depends(connection),
):
    value = row(c, "SELECT * FROM sponsorships WHERE id=?", (sponsorship_id,))
    if not value:
        fail(404, "not_found", "Request not found")
    if value["sponsor_id"] != user["id"]:
        fail(403, "forbidden", "Only the sponsor can decide this request")
    if value["status"] != "pending":
        fail(409, "already_decided", "This request has already been decided")
    reverse = row(
        c,
        "SELECT id FROM sponsorships WHERE requester_id=? AND sponsor_id=? AND status='accepted'",
        (user["id"], value["requester_id"]),
    )
    if body.status == "accepted" and reverse and count_sponsors(c, user["id"]) < 3:
        fail(403, "sponsors_required", "Complete your three sponsorships before sponsoring back")
    c.execute("UPDATE sponsorships SET status=? WHERE id=?", (body.status, sponsorship_id))
    notify(
        c,
        value["requester_id"],
        "sponsorship",
        "Sponsorship " + body.status,
        "sponsorship",
        sponsorship_id,
        now(request),
    )
    return {**value, "status": body.status}
