import { test } from "node:test";
import assert from "node:assert/strict";
import { setup, login } from "./helpers.js";

test("signup, onboarding, logout and session expiry", async (t) => {
  const { app, clock } = await setup(t);
  const r = await app.inject({
    method: "POST",
    url: "/api/signup/",
    payload: {
      username: "new-user",
      password: "secret1234",
      phone: "+447700900099",
    },
  });
  assert.equal(r.statusCode, 201, r.body);
  const headers = { authorization: "Bearer " + r.json().session_token };
  assert.equal(r.json().user.onboarding_step, "location");
  const update = await app.inject({
    method: "PATCH",
    url: "/api/me/",
    headers,
    payload: {
      city_id: "london",
      email: "new@example.test",
      first_name: "New",
      last_name: "User",
      category_ids: ["tickets", "yard-sale"],
      message_consent: true,
      house_rules_accepted: true,
      notifications_enabled: false,
    },
  });
  assert.equal(update.statusCode, 200, update.body);
  assert.equal(update.json().onboarding_step, "complete");
  assert.deepEqual(update.json().category_ids, ["tickets", "yard-sale"]);
  assert.ok(!update.body.includes("password_hash"));
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: "/api/signup/",
        payload: { username: "new-user", password: "secret1234" },
      })
    ).statusCode,
    409,
  );
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: "/api/login/",
        payload: { username: "new-user", password: "wrong" },
      })
    ).statusCode,
    401,
  );
  assert.equal(
    (await app.inject({ method: "POST", url: "/api/logout/", headers }))
      .statusCode,
    204,
  );
  assert.equal(
    (await app.inject({ method: "GET", url: "/api/me/", headers })).statusCode,
    401,
  );
  const h = await login(app);
  clock.value += 86401;
  assert.equal(
    (await app.inject({ method: "GET", url: "/api/me/", headers: h }))
      .statusCode,
    401,
  );
});

test("codes: invalid, cooldown, resend, consumed, expired and locked", async (t) => {
  const { app, clock } = await setup(t);
  const r = await app.inject({
    method: "POST",
    url: "/api/auth/challenges/",
    payload: {
      channel: "phone",
      destination: "+447700900098",
      purpose: "signup",
    },
  });
  assert.equal(r.statusCode, 201, r.body);
  const ch = r.json();
  assert.equal(ch.demo_code, "123456");
  const verify = (code: string) =>
    app.inject({
      method: "POST",
      url: "/api/auth/verify/",
      payload: { challenge_id: ch.id, code },
    });
  assert.equal((await verify("000000")).statusCode, 422);
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: `/api/auth/challenges/${ch.id}/resend/`,
      })
    ).statusCode,
    429,
  );
  clock.value += 61;
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: `/api/auth/challenges/${ch.id}/resend/`,
      })
    ).statusCode,
    200,
  );
  assert.equal((await verify("123456")).statusCode, 200);
  assert.equal((await verify("123456")).statusCode, 409);
  const expired = (
    await app.inject({
      method: "POST",
      url: "/api/auth/challenges/",
      payload: {
        channel: "email",
        destination: "alice@example.test",
        purpose: "login",
      },
    })
  ).json();
  clock.value += 601;
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: "/api/auth/verify/",
        payload: { challenge_id: expired.id, code: "123456" },
      })
    ).statusCode,
    410,
  );
  const locked = (
    await app.inject({
      method: "POST",
      url: "/api/auth/challenges/",
      payload: {
        channel: "email",
        destination: "bob@example.test",
        purpose: "login",
      },
    })
  ).json();
  for (let i = 0; i < 5; i++)
    assert.equal(
      (
        await app.inject({
          method: "POST",
          url: "/api/auth/verify/",
          payload: { challenge_id: locked.id, code: "000000" },
        })
      ).statusCode,
      422,
    );
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: "/api/auth/verify/",
        payload: { challenge_id: locked.id, code: "123456" },
      })
    ).statusCode,
    429,
  );
});

test("phone changes are account bound and validated before mutation", async (t) => {
  const { app } = await setup(t);
  const a = await login(app),
    b = await login(app, "bob");
  const body = {
    channel: "phone",
    destination: "+447700900097",
    purpose: "change_phone",
  };
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: "/api/auth/challenges/",
        payload: body,
      })
    ).statusCode,
    401,
  );
  const ch = (
    await app.inject({
      method: "POST",
      url: "/api/auth/challenges/",
      headers: a,
      payload: body,
    })
  ).json();
  const verify = { challenge_id: ch.id, code: "123456" };
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: "/api/auth/verify/",
        headers: b,
        payload: verify,
      })
    ).statusCode,
    403,
  );
  assert.equal(
    (await app.inject({ method: "GET", url: "/api/me/", headers: a })).json()
      .phone,
    "+447700900000",
  );
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: "/api/auth/verify/",
        headers: a,
        payload: verify,
      })
    ).statusCode,
    200,
  );
  assert.equal(
    (await app.inject({ method: "GET", url: "/api/me/", headers: a })).json()
      .phone,
    body.destination,
  );
});

test("one verification code may issue only one session under parallel requests", async (t) => {
  const { app } = await setup(t);
  const ch = (
    await app.inject({
      method: "POST",
      url: "/api/auth/challenges/",
      payload: {
        channel: "email",
        destination: "alice@example.test",
        purpose: "login",
      },
    })
  ).json();
  const responses = await Promise.all(
    Array.from({ length: 8 }, () =>
      app.inject({
        method: "POST",
        url: "/api/auth/verify/",
        payload: { challenge_id: ch.id, code: "123456" },
      }),
    ),
  );
  assert.equal(responses.filter((r) => r.statusCode === 200).length, 1);
  assert.ok(responses.every((r) => [200, 409].includes(r.statusCode)));
});

test("profile validation prevents unknown fields and explicit nulls except photo", async (t) => {
  const { app } = await setup(t);
  const headers = await login(app);
  for (const payload of [
    { city_id: "bad" },
    { first_name: null },
    { is_verified: true },
    { email: "not-email" },
    { category_ids: ["tickets", "tickets"] },
  ])
    assert.equal(
      (await app.inject({ method: "PATCH", url: "/api/me/", headers, payload }))
        .statusCode,
      422,
    );
  assert.equal(
    (
      await app.inject({
        method: "PATCH",
        url: "/api/me/",
        headers,
        payload: { photo_id: null },
      })
    ).statusCode,
    200,
  );
  assert.equal(
    (
      await app.inject({
        method: "POST",
        url: "/api/me/verification/",
        headers,
      })
    ).json().status,
    "pending",
  );
  assert.equal(
    (await app.inject({ method: "GET", url: "/api/me/" })).json().error.code,
    "unauthenticated",
  );
});
