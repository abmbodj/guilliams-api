import test from "node:test";
import assert from "node:assert/strict";
import { setup, login, listingPayload } from "./helpers.js";

test("listing lifecycle enforces ownership and draft privacy", async (t) => {
  const { app } = await setup(t);
  const a = await login(app);
  const b = await login(app, "bob");
  const created = await app.inject({
    method: "POST",
    url: "/api/listings/",
    headers: a,
    payload: listingPayload(),
  });
  assert.equal(created.statusCode, 201, created.body);
  const id = created.json().id;
  assert.equal(
    (
      await app.inject({
        method: "GET",
        url: `/api/listings/${id}/`,
        headers: b,
      })
    ).statusCode,
    404,
  );
  assert.equal(
    (
      await app.inject({
        method: "PATCH",
        url: `/api/listings/${id}/`,
        headers: b,
        payload: { title: "Stolen" },
      })
    ).statusCode,
    403,
  );
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: `/api/listings/${id}/publish/`,
        headers: a,
      })
    ).json().status,
    "active",
  );
  assert.equal(
    (
      await app.inject({
        method: "PUT",
        url: `/api/favourites/${id}/`,
        headers: b,
      })
    ).statusCode,
    200,
  );
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: `/api/listings/${id}/status/`,
        headers: a,
        payload: { status: "paused" },
      })
    ).json().status,
    "paused",
  );
  const favourites = (
    await app.inject({ method: "GET", url: "/api/favourites/", headers: b })
  ).json();
  assert.equal(favourites.items[0].unavailable, true);
  assert.equal(favourites.items[0].listing, null);
});

test("search rejects invalid typed filters and price ranges", async (t) => {
  const { app } = await setup(t);
  const headers = await login(app);
  for (const query of [
    "filters=null",
    "filters=not-json",
    "filters=" + encodeURIComponent(JSON.stringify({ unknown: true })),
    "filters=" + encodeURIComponent(JSON.stringify({ bedrooms: null })),
    "min_price=100&max_price=1",
    "category_id=yard-sale&filters=" +
      encodeURIComponent(JSON.stringify({ bedrooms: 2 })),
  ]) {
    const response = await app.inject({
      method: "GET",
      url: "/api/listings/?" + query,
      headers,
    });
    assert.equal(response.statusCode, 422, response.body);
  }
});

test("media stays private until attached to a published listing", async (t) => {
  const { app } = await setup(t);
  const a = await login(app),
    b = await login(app, "bob");
  const content = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10, 0]);
  const uploaded = await app.inject({
    method: "POST",
    url: "/api/media/",
    headers: a,
    payload: {
      filename: "chair.png",
      content_type: "image/png",
      content_base64: content.toString("base64"),
    },
  });
  assert.equal(uploaded.statusCode, 201, uploaded.body);
  const media = uploaded.json();
  assert.equal(
    (await app.inject({ method: "GET", url: media.content_url, headers: b }))
      .statusCode,
    404,
  );
  const created = await app.inject({
    method: "POST",
    url: "/api/listings/",
    headers: a,
    payload: listingPayload("yard-sale", { photo_ids: [media.id] }),
  });
  assert.equal(created.statusCode, 201, created.body);
  await app.inject({
    method: "POST",
    url: `/api/listings/${created.json().id}/publish/`,
    headers: a,
  });
  const image = await app.inject({
    method: "GET",
    url: media.content_url,
    headers: b,
  });
  assert.equal(image.statusCode, 200, image.body);
  assert.deepEqual(image.rawPayload, content);
  assert.equal(image.headers["cache-control"], "private, no-store");
  const invalid = await app.inject({
    method: "POST",
    url: "/api/media/",
    headers: a,
    payload: {
      filename: "fake.png",
      content_type: "image/png",
      content_base64: "%%%%",
    },
  });
  assert.equal(invalid.statusCode, 422);
});

test("sold listings appear in buyer history and cannot reopen", async (t) => {
  const { app } = await setup(t);
  const a = await login(app),
    b = await login(app, "bob");
  const buyer = (
    await app.inject({ method: "GET", url: "/api/me/", headers: b })
  ).json().id;
  const sold = await app.inject({
    method: "POST",
    url: "/api/listings/demo-chair/status/",
    headers: a,
    payload: { status: "sold", buyer_id: buyer },
  });
  assert.equal(sold.statusCode, 200, sold.body);
  const purchases = (
    await app.inject({ method: "GET", url: "/api/me/purchases/", headers: b })
  ).json();
  assert.equal(
    purchases.items.some((x: { id: string }) => x.id === "demo-chair"),
    true,
  );
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: "/api/listings/demo-chair/status/",
        headers: a,
        payload: { status: "active" },
      })
    ).statusCode,
    409,
  );
});

test("live offers reserve the listing denomination", async (t) => {
  const { app } = await setup(t);
  const a = await login(app),
    b = await login(app, "bob");
  const offer = await app.inject({
    method: "POST",
    url: "/api/listings/demo-chair/offers/",
    headers: b,
    payload: { amount_minor: 5000 },
  });
  assert.equal(offer.statusCode, 201, offer.body);
  for (const payload of [{ currency: "USD" }, { price_unit: "hour" }])
    assert.equal(
      (
        await app.inject({
          method: "PATCH",
          url: "/api/listings/demo-chair/",
          headers: a,
          payload,
        })
      ).statusCode,
      409,
    );
  const edit = await app.inject({
    method: "PATCH",
    url: "/api/listings/demo-chair/",
    headers: a,
    payload: { price_minor: 9000 },
  });
  assert.equal(edit.statusCode, 200, edit.body);
});
