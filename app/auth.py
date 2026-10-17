from fastapi import APIRouter, Depends, Request, Response
from . import models as m
from .core import connection, current_user, bearer, fail, now, row, session_response, public_user
from .db import password_hash, password_matches, token_hash, uid

router = APIRouter(prefix="/api", tags=["Authentication"])


@router.post("/signup/", response_model=m.Session, status_code=201)
def signup(body: m.Signup, request: Request, c=Depends(connection)):
    user_id = uid()
    c.execute(
        "INSERT INTO users(id,username,password_hash,phone,created_at) VALUES (?,?,?,?,?)",
        (user_id, body.username.lower(), password_hash(body.password), body.phone, now(request)),
    )
    return session_response(c, user_id, now(request))


@router.post("/login/", response_model=m.Session)
def login(body: m.Login, request: Request, c=Depends(connection)):
    u = row(c, "SELECT * FROM users WHERE username=? AND deleted_at IS NULL", (body.username,))
    if not u or not password_matches(body.password, u["password_hash"]):
        fail(401, "invalid_credentials", "Username or password is incorrect")
    return session_response(c, u["id"], now(request))


@router.post("/logout/", status_code=204)
def logout(user=Depends(current_user), credentials=Depends(bearer), c=Depends(connection)):
    c.execute("DELETE FROM sessions WHERE token_hash=?", (token_hash(credentials.credentials),))
    return Response(status_code=204)


def challenge_result(challenge):
    return {k: challenge[k] for k in ("id", "expires_at", "resend_after")} | {
        "delivery": "simulated",
        "demo_code": "123456",
    }


@router.post("/auth/challenges/", response_model=m.Challenge, status_code=201)
def create_challenge(
    body: m.ChallengeRequest, request: Request, credentials=Depends(bearer), c=Depends(connection)
):
    if not request.app.state.demo_mode:
        fail(503, "simulation_disabled", "Verification delivery is unavailable")
    owner = None
    if body.purpose == "change_phone":
        owner = current_user(request, credentials, c)["id"]
        if row(c, "SELECT id FROM users WHERE phone=?", (body.destination,)):
            fail(409, "contact_in_use", "Phone number is already used")
    # No account existence is disclosed by challenge creation.
    recent = row(
        c,
        "SELECT * FROM challenges WHERE destination=? AND resend_after>?",
        (body.destination, now(request)),
    )
    if recent:
        fail(429, "resend_cooldown", "Wait before requesting another code")
    ch = {
        "id": uid(),
        "channel": body.channel,
        "destination": body.destination,
        "purpose": body.purpose,
        "user_id": owner,
        "expires_at": now(request) + 600,
        "resend_after": now(request) + 60,
    }
    c.execute(
        "INSERT INTO challenges(id,channel,destination,purpose,user_id,expires_at,resend_after) VALUES (:id,:channel,:destination,:purpose,:user_id,:expires_at,:resend_after)",
        ch,
    )
    return challenge_result(ch)


@router.post("/auth/challenges/{challenge_id}/resend/", response_model=m.Challenge)
def resend(challenge_id: str, request: Request, credentials=Depends(bearer), c=Depends(connection)):
    if not request.app.state.demo_mode:
        fail(503, "simulation_disabled", "Verification delivery is unavailable")
    ch = row(c, "SELECT * FROM challenges WHERE id=?", (challenge_id,))
    if not ch:
        fail(404, "not_found", "Code request not found")
    if ch["user_id"] and current_user(request, credentials, c)["id"] != ch["user_id"]:
        fail(403, "forbidden", "This request belongs to another account")
    if ch["used"]:
        fail(409, "code_used", "Request a new code")
    if ch["resend_after"] > now(request):
        fail(429, "resend_cooldown", "Wait before resending")
    ch.update(expires_at=now(request) + 600, resend_after=now(request) + 60)
    c.execute(
        "UPDATE challenges SET expires_at=?,resend_after=?,attempts=0 WHERE id=?",
        (ch["expires_at"], ch["resend_after"], challenge_id),
    )
    return challenge_result(ch)


@router.post("/auth/verify/", response_model=m.Session)
def verify(body: m.Verify, request: Request, credentials=Depends(bearer), c=Depends(connection)):
    if not request.app.state.demo_mode:
        fail(503, "simulation_disabled", "Verification delivery is unavailable")
    ch = row(c, "SELECT * FROM challenges WHERE id=?", (body.challenge_id,))
    if not ch:
        fail(404, "not_found", "Code request not found")
    if ch["used"]:
        fail(409, "code_used", "Code has already been used")
    if ch["expires_at"] <= now(request):
        fail(410, "code_expired", "Request a new code")
    if ch["attempts"] >= 5:
        fail(429, "attempts_exceeded", "Request a new code after the resend cooldown")
    if ch["user_id"] and current_user(request, credentials, c)["id"] != ch["user_id"]:
        fail(403, "forbidden", "This request belongs to another account")
    if body.code != "123456":
        c.execute("UPDATE challenges SET attempts=attempts+1 WHERE id=?", (body.challenge_id,))
        c.commit()
        fail(422, "invalid_code", "Invalid code. Please try again")
    if ch["purpose"] == "change_phone":
        user_id = ch["user_id"]
        c.execute("UPDATE users SET phone=? WHERE id=?", (ch["destination"], user_id))
    else:
        field = "phone" if ch["channel"] == "phone" else "email"
        u = row(c, f"SELECT id,deleted_at FROM users WHERE {field}=?", (ch["destination"],))
        if ch["purpose"] == "login":
            if not u or u["deleted_at"] is not None:
                fail(401, "invalid_credentials", "No active account matches this code request")
            user_id = u["id"]
        else:
            if u:
                fail(409, "contact_in_use", "This contact already has an account; sign in")
            user_id = uid()
            c.execute(
                "INSERT INTO users(id,username,phone,created_at) VALUES (?,?,?,?)",
                (user_id, "member-" + user_id[:12], ch["destination"], now(request)),
            )
    c.execute("UPDATE challenges SET used=1 WHERE id=?", (body.challenge_id,))
    return session_response(c, user_id, now(request))


@router.get("/me/", response_model=m.User, tags=["Profile"])
def me(user=Depends(current_user)):
    return user


@router.patch("/me/", response_model=m.User, tags=["Profile"])
def update_me(body: m.ProfilePatch, user=Depends(current_user), c=Depends(connection)):
    data = body.model_dump(exclude_unset=True)
    if "city_id" in data and not row(c, "SELECT id FROM cities WHERE id=?", (data["city_id"],)):
        fail(422, "invalid_city", "Choose a listed city")
    if data.get("photo_id") and not row(
        c, "SELECT id FROM media WHERE id=? AND owner_id=?", (data["photo_id"], user["id"])
    ):
        fail(422, "invalid_photo", "Upload a profile photo first")
    if "category_ids" in data:
        categories = data.pop("category_ids")
        if len(categories) != len(set(categories)):
            fail(422, "duplicate_categories", "Choose each category once")
        for category in categories:
            if not row(c, "SELECT id FROM categories WHERE id=?", (category,)):
                fail(422, "invalid_category", "Choose listed categories")
        c.execute("DELETE FROM user_categories WHERE user_id=?", (user["id"],))
        c.executemany(
            "INSERT INTO user_categories VALUES (?,?,?)",
            [(user["id"], v, i) for i, v in enumerate(categories)],
        )
    if data:
        c.execute(
            "UPDATE users SET " + ",".join(k + "=?" for k in data) + " WHERE id=?",
            (*data.values(), user["id"]),
        )
    return public_user(c, user["id"])


@router.post("/me/verification/", response_model=m.Verification, tags=["Profile"])
def request_verification(user=Depends(current_user), c=Depends(connection)):
    c.execute("UPDATE users SET verification_status='pending' WHERE id=?", (user["id"],))
    return {"status": "pending"}


@router.delete("/me/", status_code=204, tags=["Profile"])
def delete_account(
    body: m.DeleteAccount, request: Request, user=Depends(current_user), c=Depends(connection)
):
    c.execute(
        "UPDATE users SET deleted_at=?,deletion_reason=? WHERE id=?",
        (now(request), body.reason, user["id"]),
    )
    c.execute("DELETE FROM sessions WHERE user_id=?", (user["id"],))
    c.execute(
        "UPDATE listings SET status='deleted',updated_at=? WHERE seller_id=?",
        (now(request), user["id"]),
    )
    c.execute(
        "UPDATE offers SET status='declined' WHERE status IN ('pending','accepted') AND (sender_id=? OR recipient_id=?)",
        (user["id"], user["id"]),
    )
    c.execute(
        "UPDATE conversations SET closed_at=? WHERE id IN (SELECT conversation_id FROM conversation_members WHERE user_id=?)",
        (now(request), user["id"]),
    )
    return Response(status_code=204)
