import type { TestContext } from "node:test";
import type { FastifyInstance } from "fastify";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";
import { createApp } from "../src/app.js";
import type { Schema } from "../src/types.js";

export async function setup(
  t: TestContext,
  options: { demoMode?: boolean } = {},
) {
  const directory = mkdtempSync(join(tmpdir(), "guilliams-ts-"));
  const clock = { value: 1800000000 };
  const dbPath = join(directory, "test.sqlite3");
  const app = createApp({ dbPath, clock: () => clock.value, ...options });
  t.after(async () => {
    await app.close();
    rmSync(directory, { recursive: true, force: true });
  });
  await app.ready();
  return { app, clock, dbPath };
}
export async function login(app: FastifyInstance, username = "alice") {
  const r = await app.inject({
    method: "POST",
    url: "/api/login/",
    payload: { username, password: "DemoPass123!" },
  });
  assert.equal(r.statusCode, 200, r.body);
  return { authorization: "Bearer " + r.json().session_token };
}
export function listingPayload(
  category = "yard-sale",
  overrides: Partial<Schema<"ListingCreate">> = {},
): Schema<"ListingCreate"> {
  return {
    title: "Test chair",
    description: "A fictional item for local testing.",
    category_id: category,
    city_id: "london",
    postal_code: "SW1A 1AA",
    town: "London",
    price_minor: 8000,
    currency: "GBP",
    price_unit: "item",
    photo_ids: [],
    attributes: {},
    ...overrides,
  };
}
