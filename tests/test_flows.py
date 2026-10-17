from fastapi.testclient import TestClient

from app.factory import create_app


def login(c, username="alice"):
    r = c.post("/api/login/", json={"username": username, "password": "DemoPass123!"})
    assert r.status_code == 200, r.text
    return {"Authorization": "Bearer " + r.json()["session_token"]}


def listing_payload(category="yard-sale", **kwargs):
    return {
        "title": "Test chair",
        "description": "A fictional item for local testing.",
        "category_id": category,
        "city_id": "london",
        "postal_code": "SW1A 1AA",
        "town": "London",
        "price_minor": 8000,
        "currency": "GBP",
        "attributes": {},
        **kwargs,
    }


def test_auth_signup_onboarding_and_session_lifecycle(client, clock):
    r = client.post(
        "/api/signup/",
        json={"username": "new-user", "password": "secret1234", "phone": "+447700900099"},
    )
    assert r.status_code == 201, r.text
    h = {"Authorization": "Bearer " + r.json()["session_token"]}
    assert client.get("/api/me/", headers=h).json()["onboarding_step"] == "location"
    body = {
        "city_id": "london",
        "email": "new@example.test",
        "first_name": "New",
        "last_name": "User",
        "category_ids": ["tickets", "yard-sale"],
        "message_consent": True,
        "house_rules_accepted": True,
        "notifications_enabled": False,
    }
    r = client.patch("/api/me/", headers=h, json=body)
    assert r.status_code == 200, r.text
    assert r.json()["onboarding_step"] == "complete"
    assert r.json()["category_ids"] == ["tickets", "yard-sale"]
    assert "password_hash" not in r.text
    assert (
        client.post(
            "/api/signup/", json={"username": "new-user", "password": "secret1234"}
        ).status_code
        == 409
    )
    assert (
        client.post("/api/login/", json={"username": "new-user", "password": "wrong"}).status_code
        == 401
    )
    assert client.post("/api/logout/", headers=h).status_code == 204
    assert client.get("/api/me/", headers=h).status_code == 401
    h = login(client)
    clock[0] += 86401
    assert client.get("/api/me/", headers=h).status_code == 401


def test_code_auth_invalid_expired_resend_and_no_side_effect_before_verify(client, clock):
    r = client.post(
        "/api/auth/challenges/",
        json={"channel": "phone", "destination": "+447700900098", "purpose": "signup"},
    )
    assert r.status_code == 201
    challenge = r.json()
    assert challenge["demo_code"] == "123456"
    assert (
        client.post(
            "/api/auth/verify/", json={"challenge_id": challenge["id"], "code": "000000"}
        ).status_code
        == 422
    )
    assert client.post("/api/auth/challenges/" + challenge["id"] + "/resend/").status_code == 429
    clock[0] += 61
    assert client.post("/api/auth/challenges/" + challenge["id"] + "/resend/").status_code == 200
    verified = client.post(
        "/api/auth/verify/", json={"challenge_id": challenge["id"], "code": "123456"}
    )
    assert verified.status_code == 200, verified.text
    assert (
        client.post(
            "/api/auth/verify/", json={"challenge_id": challenge["id"], "code": "123456"}
        ).status_code
        == 409
    )
    challenge = client.post(
        "/api/auth/challenges/",
        json={"channel": "email", "destination": "alice@example.test", "purpose": "login"},
    ).json()
    clock[0] += 601
    assert (
        client.post(
            "/api/auth/verify/", json={"challenge_id": challenge["id"], "code": "123456"}
        ).status_code
        == 410
    )


def test_sponsorship_requests_and_permissions(client):
    a, b = login(client), login(client, "bob")
    r = client.post("/api/sponsorships/", headers=b, json={"sponsor_id": "alice"})
    assert r.status_code == 201, r.text
    request_id = r.json()["id"]
    assert (
        client.post("/api/sponsorships/", headers=b, json={"sponsor_id": "alice"}).status_code
        == 409
    )
    assert (
        client.patch(
            "/api/sponsorships/" + request_id + "/", headers=b, json={"status": "accepted"}
        ).status_code
        == 403
    )
    r = client.patch(
        "/api/sponsorships/" + request_id + "/", headers=a, json={"status": "accepted"}
    )
    assert r.status_code == 200
    assert client.get("/api/sponsorships/", headers=b).json()["accepted_count"] == 1
    assert (
        client.patch(
            "/api/sponsorships/" + request_id + "/", headers=a, json={"status": "declined"}
        ).status_code
        == 409
    )
    assert client.get("/api/sponsors/suggestions/", headers=b).status_code == 200
    assert client.get("/api/notifications/", headers=b).json()["total"] > 0


def test_listing_lifecycle_search_and_ownership(client):
    a, b = login(client), login(client, "bob")
    r = client.post("/api/listings/", headers=a, json=listing_payload())
    assert r.status_code == 201, r.text
    item = r.json()["id"]
    assert (
        client.patch(f"/api/listings/{item}/", headers=b, json={"title": "Stolen"}).status_code
        == 403
    )
    assert client.post(f"/api/listings/{item}/publish/", headers=a).status_code == 200
    results = client.get("/api/listings/?q=Test%20chair&category_id=yard-sale", headers=b).json()
    assert any(x["id"] == item for x in results["items"])
    assert (
        client.post(
            f"/api/listings/{item}/status/", headers=a, json={"status": "paused"}
        ).status_code
        == 200
    )
    assert client.get(f"/api/listings/{item}/", headers=b).status_code == 404
    assert (
        client.post(
            f"/api/listings/{item}/status/", headers=a, json={"status": "active"}
        ).status_code
        == 200
    )
    assert client.put(f"/api/favourites/{item}/", headers=b).status_code == 200
    assert client.get("/api/favourites/", headers=b).json()["total"] == 1
    assert client.delete(f"/api/listings/{item}/", headers=a).status_code == 204
    assert client.get(f"/api/listings/{item}/", headers=b).status_code == 404
    assert client.get("/api/favourites/", headers=b).json()["items"][0]["unavailable"] is True
    assert client.get("/api/listings/?q=NO_MATCH_999", headers=b).json()["total"] == 0


def test_offer_counter_accept_and_conversation_membership(client):
    a, b, c = login(client), login(client, "bob"), login(client, "carol")
    r = client.post("/api/listings/demo-chair/offers/", headers=b, json={"amount_minor": 5000})
    assert r.status_code == 201, r.text
    offer, conv = r.json()["id"], r.json()["conversation_id"]
    assert client.get(f"/api/conversations/{conv}/messages/", headers=c).status_code == 403
    assert (
        client.patch(f"/api/offers/{offer}/", headers=b, json={"action": "accept"}).status_code
        == 403
    )
    r = client.patch(
        f"/api/offers/{offer}/", headers=a, json={"action": "counter", "amount_minor": 6000}
    )
    assert r.status_code == 200, r.text
    counter = r.json()["id"]
    assert (
        client.patch(f"/api/offers/{counter}/", headers=b, json={"action": "accept"}).json()[
            "status"
        ]
        == "accepted"
    )
    assert (
        client.patch(f"/api/offers/{counter}/", headers=b, json={"action": "accept"}).status_code
        == 409
    )
    assert (
        client.post(
            f"/api/conversations/{conv}/messages/", headers=b, json={"text": "Hello seller"}
        ).status_code
        == 201
    )
    assert client.get(f"/api/conversations/{conv}/messages/", headers=a).json()["total"] >= 1
    assert (
        client.post(
            "/api/listings/demo-chair/offers/", headers=b, json={"amount_minor": 7000}
        ).status_code
        == 409
    )


def test_concierge_reports_notifications_and_profile(client):
    a = login(client)
    conv = client.post(
        "/api/conversations/", headers=a, json={"kind": "concierge", "topic": "feedback"}
    ).json()["id"]
    assert (
        client.post(
            f"/api/conversations/{conv}/messages/", headers=a, json={"text": "Please help"}
        ).status_code
        == 201
    )
    assert client.get(f"/api/conversations/{conv}/messages/", headers=a).json()["total"] == 2
    assert (
        client.post(
            "/api/reports/",
            headers=a,
            json={
                "listing_id": "demo-chair",
                "reason": "incorrect-details",
                "message": "Test report",
            },
        ).status_code
        == 201
    )
    assert client.get("/api/members/bob/", headers=a).status_code == 200
    assert "email" not in client.get("/api/members/bob/", headers=a).json()
    assert client.patch("/api/me/", headers=a, json={"city_id": "bad"}).status_code == 422
    assert client.post("/api/me/verification/", headers=a).json()["status"] == "pending"
    assert client.get("/api/feed/", headers=a).status_code == 200
    assert client.get("/api/search/suggestions/?q=chair", headers=a).status_code == 200


def test_validation_and_error_shape(client):
    h = login(client)
    assert client.get("/api/me/").json()["error"]["code"] == "unauthenticated"
    r = client.post("/api/listings/", headers=h, json=listing_payload(price_minor=-1))
    assert r.status_code == 422 and r.json()["error"]["fields"]
    assert (
        client.post(
            "/api/listings/",
            headers=h,
            json=listing_payload(
                "cars-boats", attributes={"vehicle_type": "boats", "mileage_km": 10}
            ),
        ).status_code
        == 422
    )
    assert (
        client.post(
            "/api/listings/",
            headers=h,
            json=listing_payload("tickets", attributes={"dates": ["not-date"]}),
        ).status_code
        == 422
    )
    assert client.get("/api/listings/?limit=1000", headers=h).status_code == 422
    assert client.patch("/api/me/", headers=h, json={"is_verified": True}).status_code == 422


def test_persistence_and_openapi(tmp_path):
    path = str(tmp_path / "persist.sqlite3")
    with TestClient(create_app(path)) as c:
        h = login(c)
        r = c.post("/api/listings/", headers=h, json=listing_payload())
        item = r.json()["id"]
    with TestClient(create_app(path)) as c:
        h = login(c)
        assert c.get(f"/api/listings/{item}/", headers=h).json()["title"] == "Test chair"
        from openapi_spec_validator import validate

        spec = c.get("/openapi.json").json()
        validate(spec)
        assert spec["components"]["schemas"]["ListingCreate"]
        assert all(op.get("responses") for path in spec["paths"].values() for op in path.values())
