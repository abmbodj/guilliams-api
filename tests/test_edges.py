import base64
import json
import sqlite3
from concurrent.futures import ThreadPoolExecutor
from fastapi.testclient import TestClient
import pytest
from app.catalog import CATEGORY_FIELDS
from app.factory import create_app
from test_flows import login, listing_payload


@pytest.mark.parametrize("category", list(CATEGORY_FIELDS))
def test_every_category_create_publish_detail_and_search(client, category):
    h = login(client)
    r = client.post("/api/listings/", headers=h, json=listing_payload(category))
    assert r.status_code == 201, r.text
    item = r.json()["id"]
    assert client.post(f"/api/listings/{item}/publish/", headers=h).json()["status"] == "active"
    assert client.get(f"/api/listings/{item}/", headers=h).json()["category_id"] == category
    assert (
        client.get("/api/listings/", headers=h, params={"category_id": category}).json()["total"]
        >= 1
    )


def test_media_attachment_order_and_private_messages(client):
    a, b, c = login(client), login(client, "bob"), login(client, "carol")
    data = base64.b64encode(b"\x89PNG\r\n\x1a\n" + b"demo-image").decode()
    r = client.post(
        "/api/media/",
        headers=a,
        json={"filename": "photo.png", "content_type": "image/png", "content_base64": data},
    )
    assert r.status_code == 201, r.text
    photo = r.json()["id"]
    url = r.json()["content_url"]
    assert client.get(url, headers=c).status_code == 404
    assert client.patch("/api/me/", headers=b, json={"photo_id": photo}).status_code == 422
    item = client.post("/api/listings/", headers=a, json=listing_payload(photo_ids=[photo])).json()[
        "id"
    ]
    assert client.get(url, headers=c).status_code == 404
    client.post(f"/api/listings/{item}/publish/", headers=a)
    assert client.get(url, headers=c).status_code == 200
    assert client.get(url, headers=c).headers["content-type"] == "image/png"
    private = client.post(
        "/api/media/",
        headers=b,
        json={"filename": "private.png", "content_type": "image/png", "content_base64": data},
    ).json()
    conv = client.post(
        "/api/conversations/", headers=b, json={"kind": "listing", "listing_id": item}
    ).json()["id"]
    assert (
        client.post(
            f"/api/conversations/{conv}/messages/",
            headers=b,
            json={"text": "Photo", "photo_id": private["id"]},
        ).status_code
        == 201
    )
    assert client.get(private["content_url"], headers=a).status_code == 200
    assert client.get(private["content_url"], headers=c).status_code == 404
    assert (
        client.post(
            "/api/media/",
            headers=a,
            json={"filename": "x.png", "content_type": "image/png", "content_base64": "not-base64"},
        ).status_code
        == 422
    )


def test_phone_change_cannot_be_claimed_by_another_user(client):
    a, b = login(client), login(client, "bob")
    body = {"channel": "phone", "destination": "+447700900097", "purpose": "change_phone"}
    assert client.post("/api/auth/challenges/", json=body).status_code == 401
    ch = client.post("/api/auth/challenges/", headers=a, json=body).json()
    verify = {"challenge_id": ch["id"], "code": "123456"}
    assert client.post("/api/auth/verify/", headers=b, json=verify).status_code == 403
    assert client.get("/api/me/", headers=a).json()["phone"] == "+447700900000"
    assert client.post("/api/auth/verify/", headers=a, json=verify).status_code == 200
    assert client.get("/api/me/", headers=a).json()["phone"] == body["destination"]


def test_five_bad_codes_lock_challenge(client):
    ch = client.post(
        "/api/auth/challenges/",
        json={"channel": "email", "destination": "alice@example.test", "purpose": "login"},
    ).json()
    for _ in range(5):
        assert (
            client.post(
                "/api/auth/verify/", json={"challenge_id": ch["id"], "code": "000000"}
            ).status_code
            == 422
        )
    assert (
        client.post(
            "/api/auth/verify/", json={"challenge_id": ch["id"], "code": "123456"}
        ).status_code
        == 429
    )


def test_simulations_can_be_disabled(tmp_path):
    with TestClient(create_app(str(tmp_path / "disabled.sqlite3"), demo_mode=False)) as c:
        assert (
            c.post(
                "/api/auth/challenges/",
                json={"channel": "email", "destination": "alice@example.test", "purpose": "login"},
            ).status_code
            == 503
        )
        assert (
            c.post(
                "/api/login/", json={"username": "alice", "password": "DemoPass123!"}
            ).status_code
            == 200
        )


def test_closing_threads_and_expired_concierge(client, clock):
    h = login(client)
    body = {"kind": "concierge"}
    conv = client.post("/api/conversations/", headers=h, json=body).json()["id"]
    assert client.post(f"/api/conversations/{conv}/close/", headers=h).status_code == 200
    assert (
        client.post(
            f"/api/conversations/{conv}/messages/", headers=h, json={"text": "Still open?"}
        ).status_code
        == 409
    )
    new = client.post("/api/conversations/", headers=h, json=body).json()["id"]
    assert new != conv
    # Refresh login before the one-day session expires.
    clock[0] += 86399
    h = login(client)
    clock[0] += 2
    assert (
        client.post(
            f"/api/conversations/{new}/messages/", headers=h, json={"text": "Expired?"}
        ).status_code
        == 409
    )
    assert client.post("/api/conversations/", headers=h, json=body).json()["id"] != new


def test_mark_sold_history_and_closed_registration(client, clock):
    a, b = login(client), login(client, "bob")
    assert (
        client.post(
            "/api/listings/demo-chair/status/",
            headers=a,
            json={"status": "sold", "buyer_id": "bob"},
        ).status_code
        == 200
    )
    assert client.get("/api/me/purchases/", headers=b).json()["total"] == 1
    assert client.get("/api/me/listings/?status=sold", headers=a).json()["total"] == 1
    assert (
        client.post(
            "/api/listings/demo-chair/status/", headers=a, json={"status": "active"}
        ).status_code
        == 409
    )
    sale = client.get("/api/yard-sales/current/", headers=a).json()
    assert (
        client.post(f"/api/yard-sales/{sale['id']}/register/", headers=a).json()["registered"]
        is True
    )
    clock[0] += 86401
    a = login(client)
    assert client.post(f"/api/yard-sales/{sale['id']}/register/", headers=a).status_code == 409


def test_notifications_ownership_and_read(client):
    a, b, c = login(client), login(client, "bob"), login(client, "carol")
    client.post("/api/sponsorships/", headers=b, json={"sponsor_id": "alice"})
    value = client.get("/api/notifications/", headers=a).json()["items"][0]
    url = f"/api/notifications/{value['id']}/read/"
    assert client.patch(url, headers=c).status_code == 404
    assert client.patch(url, headers=a).json()["read_at"] is not None
    assert client.get("/api/notifications/?unread_only=true", headers=a).json()["total"] == 0


def test_search_attribute_filters_and_empty_preferred_feed(client):
    a, b = login(client), login(client, "bob")
    client.patch(
        "/api/listings/demo-property-sale/",
        headers=a,
        json={"attributes": {"bedrooms": 3, "amenities": ["garden"]}},
    )
    filters = json.dumps({"bedrooms": 2, "amenities": ["garden"]})
    r = client.get(
        "/api/listings/", headers=b, params={"category_id": "property-sale", "filters": filters}
    )
    assert r.status_code == 200 and r.json()["total"] == 1
    assert (
        client.get("/api/listings/", headers=b, params={"filters": "not-json"}).status_code == 422
    )
    assert client.get("/api/listings/", headers=b, params={"filters": "null"}).status_code == 422
    client.patch("/api/me/", headers=b, json={"category_ids": []})
    assert client.get("/api/feed/?preferred_only=true", headers=b).json()["listings"]["total"] == 0


def test_account_deletion_revokes_all_sessions_and_withdraws_listings(client):
    a, a2, b = login(client), login(client), login(client, "bob")
    r = client.request(
        "DELETE", "/api/me/", headers=a, json={"confirmation": "DELETE", "reason": "Demo test"}
    )
    assert r.status_code == 204, r.text
    assert client.get("/api/me/", headers=a2).status_code == 401
    assert client.get("/api/listings/demo-chair/", headers=b).status_code == 404
    assert client.get("/api/members/alice/", headers=b).status_code == 404
    assert (
        client.post(
            "/api/login/", json={"username": "alice", "password": "DemoPass123!"}
        ).status_code
        == 401
    )


def test_foreign_keys_and_concurrent_duplicate_sponsorship(tmp_path):
    app = create_app(str(tmp_path / "race.sqlite3"))
    with TestClient(app) as c:
        b = login(c, "bob")

        def request():
            return c.post("/api/sponsorships/", headers=b, json={"sponsor_id": "alice"}).status_code

        with ThreadPoolExecutor(max_workers=2) as pool:
            statuses = sorted(pool.map(lambda _: request(), range(2)))
        assert statuses == [201, 409]
    with sqlite3.connect(app.state.database.path) as db:
        assert db.execute("PRAGMA foreign_key_check").fetchall() == []


def test_single_use_code_under_parallel_verification(client):
    challenge = client.post(
        "/api/auth/challenges/",
        json={"channel": "email", "destination": "alice@example.test", "purpose": "login"},
    ).json()

    def verify():
        return client.post(
            "/api/auth/verify/", json={"challenge_id": challenge["id"], "code": "123456"}
        ).status_code

    with ThreadPoolExecutor(max_workers=8) as pool:
        statuses = list(pool.map(lambda _: verify(), range(8)))
    assert statuses.count(200) == 1, statuses
    assert all(status in (200, 409) for status in statuses)


def test_sponsor_back_rechecks_current_eligibility_when_accepting(client):
    a, b = login(client), login(client, "bob")
    forward = client.post("/api/sponsorships/", headers=a, json={"sponsor_id": "bob"}).json()["id"]
    reverse = client.post("/api/sponsorships/", headers=b, json={"sponsor_id": "alice"}).json()[
        "id"
    ]
    assert (
        client.patch(
            f"/api/sponsorships/{reverse}/", headers=a, json={"status": "accepted"}
        ).status_code
        == 200
    )
    assert (
        client.patch(
            f"/api/sponsorships/{forward}/", headers=b, json={"status": "accepted"}
        ).status_code
        == 403
    )


def test_swagger_works_with_local_assets(client):
    r = client.get("/docs")
    assert r.status_code == 200
    assert "cdn.jsdelivr" not in r.text
    assert client.get("/docs-assets/swagger-ui-bundle.js").status_code == 200


def test_offer_amount_validation_and_profile_nulls(client):
    a, b = login(client), login(client, "bob")
    offer = client.post(
        "/api/listings/demo-chair/offers/", headers=b, json={"amount_minor": 5000}
    ).json()["id"]
    assert (
        client.patch(f"/api/offers/{offer}/", headers=a, json={"action": "counter"}).status_code
        == 422
    )
    assert (
        client.patch(
            f"/api/offers/{offer}/", headers=a, json={"action": "accept", "amount_minor": 3}
        ).status_code
        == 422
    )
    assert client.patch("/api/me/", headers=a, json={"first_name": None}).status_code == 422
    assert client.patch("/api/me/", headers=a, json={"photo_id": None}).status_code == 200
    assert (
        client.patch("/api/listings/demo-chair/", headers=a, json={"price_minor": None}).status_code
        == 422
    )


def test_buyer_deletion_releases_accepted_reservation(client):
    a, b, c = login(client), login(client, "bob"), login(client, "carol")
    value = client.post(
        "/api/listings/demo-chair/offers/", headers=b, json={"amount_minor": 5000}
    ).json()
    assert (
        client.patch(
            f"/api/offers/{value['id']}/", headers=a, json={"action": "accept"}
        ).status_code
        == 200
    )
    assert (
        client.request("DELETE", "/api/me/", headers=b, json={"confirmation": "DELETE"}).status_code
        == 204
    )
    assert (
        client.post(
            "/api/listings/demo-chair/offers/", headers=c, json={"amount_minor": 6000}
        ).status_code
        == 201
    )
    assert (
        client.post(
            f"/api/conversations/{value['conversation_id']}/messages/",
            headers=a,
            json={"text": "Still here?"},
        ).status_code
        == 409
    )


def test_live_offer_prevents_currency_or_unit_changes(client):
    a, b = login(client), login(client, "bob")
    offer = client.post(
        "/api/listings/demo-chair/offers/", headers=b, json={"amount_minor": 5000}
    ).json()["id"]
    assert (
        client.patch("/api/listings/demo-chair/", headers=a, json={"currency": "USD"}).status_code
        == 409
    )
    assert (
        client.patch(
            "/api/listings/demo-chair/", headers=a, json={"price_unit": "hour"}
        ).status_code
        == 409
    )
    client.patch(f"/api/offers/{offer}/", headers=a, json={"action": "accept"})
    assert (
        client.patch("/api/listings/demo-chair/", headers=a, json={"currency": "USD"}).status_code
        == 409
    )
