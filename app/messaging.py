from fastapi import APIRouter, Depends, Query, Request
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
    open_conversation,
    conversation_access,
    notify,
)
from .db import uid

router = APIRouter(prefix="/api", tags=["Messaging and offers"])


def add_message(c, conv, sender, text, timestamp, photo=None, offer=None):
    value = {
        "id": uid(),
        "conversation_id": conv,
        "sender_id": sender,
        "text": text,
        "photo_id": photo,
        "offer_id": offer,
        "created_at": timestamp,
    }
    c.execute(
        "INSERT INTO messages VALUES (:id,:conversation_id,:sender_id,:text,:photo_id,:offer_id,:created_at)",
        value,
    )
    for recipient in rows(
        c,
        "SELECT user_id FROM conversation_members WHERE conversation_id=? AND user_id<>?",
        (conv, sender or ""),
    ):
        notify(c, recipient["user_id"], "message", "New message", "conversation", conv, timestamp)
    return value


def create_offer(c, item, conv, sender, recipient, amount, timestamp, parent=None):
    value = {
        "id": uid(),
        "listing_id": item["id"],
        "conversation_id": conv,
        "sender_id": sender,
        "recipient_id": recipient,
        "amount_minor": amount,
        "currency": item["currency"],
        "status": "pending",
        "parent_id": parent,
        "created_at": timestamp,
    }
    c.execute(
        "INSERT INTO offers VALUES (:id,:listing_id,:conversation_id,:sender_id,:recipient_id,:amount_minor,:currency,:status,:parent_id,:created_at)",
        value,
    )
    add_message(c, conv, sender, "Offer submitted", timestamp, offer=value["id"])
    return value


@router.post("/conversations/", response_model=m.Conversation, status_code=201)
def create_conversation(
    body: m.ConversationCreate, request: Request, user=Depends(current_user), c=Depends(connection)
):
    if body.kind == "listing" and not body.listing_id:
        fail(422, "listing_required", "Choose the listing to discuss")
    if body.kind == "concierge" and body.listing_id:
        fail(422, "invalid_listing", "Concierge conversations do not attach a listing")
    return open_conversation(c, user["id"], body.kind, body.listing_id, body.topic, now(request))


@router.get("/conversations/", response_model=m.Page[m.Conversation])
def conversations(
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    user=Depends(current_user),
    c=Depends(connection),
):
    return page(
        rows(
            c,
            "SELECT co.* FROM conversations co JOIN conversation_members cm ON cm.conversation_id=co.id WHERE cm.user_id=? ORDER BY co.created_at DESC,co.id",
            (user["id"],),
        ),
        offset,
        limit,
    )


@router.get("/conversations/{conversation_id}/messages/", response_model=m.Page[m.Message])
def messages(
    conversation_id: str,
    offset: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    user=Depends(current_user),
    c=Depends(connection),
):
    conversation_access(c, conversation_id, user["id"])
    return page(
        rows(
            c,
            "SELECT * FROM messages WHERE conversation_id=? ORDER BY created_at,rowid",
            (conversation_id,),
        ),
        offset,
        limit,
    )


@router.post(
    "/conversations/{conversation_id}/messages/", response_model=m.Message, status_code=201
)
def send(
    conversation_id: str,
    body: m.MessageCreate,
    request: Request,
    user=Depends(current_user),
    c=Depends(connection),
):
    conv = conversation_access(c, conversation_id, user["id"])
    if conv["closed_at"] is not None or (
        conv["kind"] == "concierge" and conv["created_at"] <= now(request) - 86400
    ):
        fail(409, "conversation_closed", "Start a new conversation")
    if body.photo_id and not row(
        c, "SELECT id FROM media WHERE id=? AND owner_id=?", (body.photo_id, user["id"])
    ):
        fail(422, "invalid_photo", "Upload the message photo first")
    message = add_message(
        c, conversation_id, user["id"], body.text, now(request), photo=body.photo_id
    )
    if conv["kind"] == "concierge":
        add_message(
            c,
            conversation_id,
            None,
            "[Simulated concierge] Your message has been received. No external service was contacted.",
            now(request),
        )
    return message


@router.post("/conversations/{conversation_id}/close/", response_model=m.Conversation)
def close(
    conversation_id: str, request: Request, user=Depends(current_user), c=Depends(connection)
):
    conv = conversation_access(c, conversation_id, user["id"])
    c.execute("UPDATE conversations SET closed_at=? WHERE id=?", (now(request), conversation_id))
    c.execute(
        "UPDATE offers SET status='declined' WHERE conversation_id=? AND status='pending'",
        (conversation_id,),
    )
    return {**conv, "closed_at": now(request)}


@router.post("/listings/{listing_id}/offers/", response_model=m.Offer, status_code=201)
def offer(
    listing_id: str,
    body: m.OfferCreate,
    request: Request,
    user=Depends(current_user),
    c=Depends(connection),
):
    item = listing(c, listing_id, user["id"])
    if item["seller_id"] == user["id"]:
        fail(422, "own_listing", "You cannot offer on your own listing")
    if item["status"] != "active" or row(
        c, "SELECT id FROM offers WHERE listing_id=? AND status='accepted'", (listing_id,)
    ):
        fail(409, "listing_unavailable", "This listing is unavailable for offers")
    conv = open_conversation(c, user["id"], "listing", listing_id, "general", now(request))
    if row(c, "SELECT id FROM offers WHERE conversation_id=? AND status='pending'", (conv["id"],)):
        fail(409, "offer_pending", "Wait for a decision on the current offer")
    return create_offer(
        c, item, conv["id"], user["id"], item["seller_id"], body.amount_minor, now(request)
    )


@router.get("/offers/{offer_id}/", response_model=m.Offer)
def get_offer(offer_id: str, user=Depends(current_user), c=Depends(connection)):
    value = row(c, "SELECT * FROM offers WHERE id=?", (offer_id,))
    if not value:
        fail(404, "not_found", "Offer not found")
    conversation_access(c, value["conversation_id"], user["id"])
    return value


@router.patch("/offers/{offer_id}/", response_model=m.Offer)
def act_on_offer(
    offer_id: str,
    body: m.OfferAction,
    request: Request,
    user=Depends(current_user),
    c=Depends(connection),
):
    value = row(c, "SELECT * FROM offers WHERE id=?", (offer_id,))
    if not value:
        fail(404, "not_found", "Offer not found")
    if value["recipient_id"] != user["id"]:
        fail(403, "forbidden", "Only the recipient can act on this offer")
    conv = conversation_access(c, value["conversation_id"], user["id"])
    if conv["closed_at"] is not None:
        fail(409, "conversation_closed", "This conversation is closed")
    item = listing(c, value["listing_id"], user["id"])
    if (
        item["status"] != "active"
        or value["status"] != "pending"
        or row(c, "SELECT id FROM offers WHERE listing_id=? AND status='accepted'", (item["id"],))
    ):
        fail(409, "offer_closed", "This offer can no longer be changed")
    if (body.action == "counter") != (body.amount_minor is not None):
        fail(422, "invalid_counter", "Only counteroffers require an amount")
    new_status = {"accept": "accepted", "decline": "declined", "counter": "countered"}[body.action]
    c.execute("UPDATE offers SET status=? WHERE id=?", (new_status, offer_id))
    if body.action == "counter":
        return create_offer(
            c,
            item,
            value["conversation_id"],
            user["id"],
            value["sender_id"],
            body.amount_minor,
            now(request),
            offer_id,
        )
    if body.action == "accept":
        c.execute(
            "UPDATE offers SET status='declined' WHERE listing_id=? AND status='pending'",
            (item["id"],),
        )
    add_message(
        c, value["conversation_id"], user["id"], "Offer " + new_status, now(request), offer=offer_id
    )
    return {**value, "status": new_status}


@router.post("/reports/", response_model=m.Report, status_code=201, tags=["Reports"])
def report(
    body: m.ReportCreate, request: Request, user=Depends(current_user), c=Depends(connection)
):
    listing(c, body.listing_id, user["id"])
    value = {"id": uid(), "user_id": user["id"], **body.model_dump(), "created_at": now(request)}
    c.execute(
        "INSERT INTO reports VALUES (:id,:user_id,:listing_id,:reason,:message,:created_at)", value
    )
    return {k: v for k, v in value.items() if k != "user_id"}
