import test from "node:test";
import assert from "node:assert/strict";
import { setup, login } from "./helpers.js";

test("offer counters enforce recipient access, terminal states, and reservation", async (t) => {
  const { app } = await setup(t);
  const a = await login(app),
    b = await login(app, "bob"),
    c = await login(app, "carol");
  const offered = await app.inject({
    method: "POST",
    url: "/api/listings/demo-chair/offers/",
    headers: b,
    payload: { amount_minor: 5000 },
  });
  assert.equal(offered.statusCode, 201, offered.body);
  const offer = offered.json();
  assert.equal(
    (
      await app.inject({
        method: "GET",
        url: `/api/conversations/${offer.conversation_id}/messages/`,
        headers: c,
      })
    ).statusCode,
    403,
  );
  assert.equal(
    (
      await app.inject({
        method: "PATCH",
        url: `/api/offers/${offer.id}/`,
        headers: b,
        payload: { action: "accept" },
      })
    ).statusCode,
    403,
  );
  assert.equal(
    (
      await app.inject({
        method: "PATCH",
        url: `/api/offers/${offer.id}/`,
        headers: a,
        payload: { action: "counter" },
      })
    ).statusCode,
    422,
  );
  const counter = await app.inject({
    method: "PATCH",
    url: `/api/offers/${offer.id}/`,
    headers: a,
    payload: { action: "counter", amount_minor: 6000 },
  });
  assert.equal(counter.statusCode, 200, counter.body);
  const url = `/api/offers/${counter.json().id}/`;
  assert.equal(
    (
      await app.inject({
        method: "PATCH",
        url,
        headers: b,
        payload: { action: "accept" },
      })
    ).json().status,
    "accepted",
  );
  assert.equal(
    (
      await app.inject({
        method: "PATCH",
        url,
        headers: b,
        payload: { action: "accept" },
      })
    ).statusCode,
    409,
  );
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: "/api/listings/demo-chair/offers/",
        headers: c,
        payload: { amount_minor: 7000 },
      })
    ).statusCode,
    409,
  );
});

test("sponsor-back acceptance rechecks eligibility and notifications belong to their owner", async (t) => {
  const { app } = await setup(t);
  const a = await login(app),
    b = await login(app, "bob"),
    c = await login(app, "carol");
  const forward = (
    await app.inject({
      method: "POST",
      url: "/api/sponsorships/",
      headers: a,
      payload: { sponsor_id: "bob" },
    })
  ).json();
  const reverse = (
    await app.inject({
      method: "POST",
      url: "/api/sponsorships/",
      headers: b,
      payload: { sponsor_id: "alice" },
    })
  ).json();
  assert.equal(
    (
      await app.inject({
        method: "PATCH",
        url: `/api/sponsorships/${reverse.id}/`,
        headers: a,
        payload: { status: "accepted" },
      })
    ).statusCode,
    200,
  );
  assert.equal(
    (
      await app.inject({
        method: "PATCH",
        url: `/api/sponsorships/${forward.id}/`,
        headers: b,
        payload: { status: "accepted" },
      })
    ).statusCode,
    403,
  );
  const notification = (
    await app.inject({ method: "GET", url: "/api/notifications/", headers: a })
  ).json().items[0];
  const url = `/api/notifications/${notification.id}/read/`;
  assert.equal(
    (await app.inject({ method: "PATCH", url, headers: c })).statusCode,
    404,
  );
  assert.equal(
    typeof (await app.inject({ method: "PATCH", url, headers: a })).json()
      .read_at,
    "number",
  );
});

test("concierge is simulated, closed and expired conversations reject messages", async (t) => {
  const { app, clock } = await setup(t);
  let headers = await login(app);
  const create = async () =>
    (
      await app.inject({
        method: "POST",
        url: "/api/conversations/",
        headers,
        payload: { kind: "concierge" },
      })
    ).json().id;
  const id = await create();
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: `/api/conversations/${id}/messages/`,
        headers,
        payload: { text: "Help" },
      })
    ).statusCode,
    201,
  );
  const messages = (
    await app.inject({
      method: "GET",
      url: `/api/conversations/${id}/messages/`,
      headers,
    })
  ).json();
  assert.equal(messages.total, 2);
  assert.match(messages.items[1].text, /Simulated concierge/);
  await app.inject({
    method: "POST",
    url: `/api/conversations/${id}/close/`,
    headers,
  });
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: `/api/conversations/${id}/messages/`,
        headers,
        payload: { text: "Help" },
      })
    ).statusCode,
    409,
  );
  const next = await create();
  assert.notEqual(next, id);
  clock.value += 86399;
  headers = await login(app);
  clock.value += 2;
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: `/api/conversations/${next}/messages/`,
        headers,
        payload: { text: "Help" },
      })
    ).statusCode,
    409,
  );
});

test("discovery protects member privacy and returns feed, reference and report contracts", async (t) => {
  const { app, clock } = await setup(t);
  let headers = await login(app);
  const profile = (
    await app.inject({ method: "GET", url: "/api/members/bob/", headers })
  ).json();
  assert.equal("email" in profile, false);
  assert.equal("phone" in profile, false);
  for (const url of [
    "/api/cities/",
    "/api/categories/",
    "/api/countries/",
    "/api/legal/house-rules/",
    "/api/feed/",
    "/api/search/suggestions/?q=chair",
    "/api/members/alice/listings/",
  ]) {
    const response = await app.inject({ method: "GET", url, headers });
    assert.equal(response.statusCode, 200, response.body);
  }
  const report = await app.inject({
    method: "POST",
    url: "/api/reports/",
    headers,
    payload: {
      listing_id: "demo-chair",
      reason: "incorrect-details",
      message: "Test report",
    },
  });
  assert.equal(report.statusCode, 201, report.body);
  assert.equal(report.json().status, "received");
  const sale = (
    await app.inject({
      method: "GET",
      url: "/api/yard-sales/current/",
      headers,
    })
  ).json();
  const url = `/api/yard-sales/${sale.id}/register/`;
  assert.equal(
    (await app.inject({ method: "POST", url, headers })).json().registered,
    true,
  );
  clock.value += 86401;
  headers = await login(app);
  assert.equal(
    (await app.inject({ method: "POST", url, headers })).statusCode,
    409,
  );
});

test("buyer deletion releases reservation and closes the old private conversation", async (t) => {
  const { app } = await setup(t);
  const a = await login(app),
    b = await login(app, "bob"),
    c = await login(app, "carol");
  const offer = (
    await app.inject({
      method: "POST",
      url: "/api/listings/demo-chair/offers/",
      headers: b,
      payload: { amount_minor: 5000 },
    })
  ).json();
  assert.equal(
    (
      await app.inject({
        method: "PATCH",
        url: `/api/offers/${offer.id}/`,
        headers: a,
        payload: { action: "accept" },
      })
    ).statusCode,
    200,
  );
  assert.equal(
    (
      await app.inject({
        method: "DELETE",
        url: "/api/me/",
        headers: b,
        payload: { confirmation: "DELETE" },
      })
    ).statusCode,
    204,
  );
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: "/api/listings/demo-chair/offers/",
        headers: c,
        payload: { amount_minor: 6000 },
      })
    ).statusCode,
    201,
  );
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: `/api/conversations/${offer.conversation_id}/messages/`,
        headers: a,
        payload: { text: "Still here?" },
      })
    ).statusCode,
    409,
  );
});

test("closing a listing conversation declines its pending offer and reopening creates a fresh thread", async (t) => {
  const { app } = await setup(t);
  const a = await login(app),
    b = await login(app, "bob");
  const offer = (
    await app.inject({
      method: "POST",
      url: "/api/listings/demo-chair/offers/",
      headers: b,
      payload: { amount_minor: 5000 },
    })
  ).json();
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: `/api/conversations/${offer.conversation_id}/close/`,
        headers: a,
      })
    ).statusCode,
    200,
  );
  assert.equal(
    (
      await app.inject({
        method: "GET",
        url: `/api/offers/${offer.id}/`,
        headers: b,
      })
    ).json().status,
    "declined",
  );
  const next = await app.inject({
    method: "POST",
    url: "/api/listings/demo-chair/offers/",
    headers: b,
    payload: { amount_minor: 6000 },
  });
  assert.equal(next.statusCode, 201, next.body);
  assert.notEqual(next.json().conversation_id, offer.conversation_id);
});

test("acceptance declines competing offers and duplicate pending offers conflict", async (t) => {
  const { app } = await setup(t);
  const a = await login(app),
    b = await login(app, "bob"),
    c = await login(app, "carol");
  const submit = async (headers: typeof a, amount_minor: number) =>
    app.inject({
      method: "POST",
      url: "/api/listings/demo-chair/offers/",
      headers,
      payload: { amount_minor },
    });
  const first = (await submit(b, 5000)).json();
  assert.equal((await submit(b, 5100)).statusCode, 409);
  const competing = (await submit(c, 5500)).json();
  assert.equal(
    (
      await app.inject({
        method: "PATCH",
        url: `/api/offers/${first.id}/`,
        headers: a,
        payload: { action: "accept", amount_minor: 6000 },
      })
    ).statusCode,
    422,
  );
  assert.equal(
    (
      await app.inject({
        method: "PATCH",
        url: `/api/offers/${first.id}/`,
        headers: a,
        payload: { action: "accept" },
      })
    ).statusCode,
    200,
  );
  const response = await app.inject({
    method: "GET",
    url: `/api/offers/${competing.id}/`,
    headers: c,
  });
  assert.equal(response.json().status, "declined");
  assert.equal(
    (
      await app.inject({
        method: "PATCH",
        url: `/api/offers/${competing.id}/`,
        headers: a,
        payload: { action: "accept" },
      })
    ).statusCode,
    409,
  );
});
