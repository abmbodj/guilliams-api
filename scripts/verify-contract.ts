import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import SwaggerParser from "@apidevtools/swagger-parser";
import openapiTS, { astToString, COMMENT_HEADER } from "openapi-typescript";
import { parse } from "yaml";
import { createApp } from "../src/app.js";

const root = new URL("../", import.meta.url);
const read = (path: string) => readFile(new URL(path, root), "utf8");
const source = JSON.parse(await read("src/openapi-source.json"));
const json = JSON.parse(await read("openapi.json"));
const yaml = parse(await read("openapi.yaml"));
await SwaggerParser.validate(structuredClone(source));
assert.deepEqual(
  json,
  source,
  "Regenerate OpenAPI JSON from the canonical source",
);
assert.deepEqual(
  yaml,
  source,
  "Regenerate OpenAPI YAML from the canonical source",
);
const expected = new Set<string>();
const methods = new Set([
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
  "trace",
]);
for (const [path, operations] of Object.entries(
  source.paths as Record<string, object>,
)) {
  for (const method of Object.keys(operations))
    if (methods.has(method)) expected.add(`${method.toUpperCase()} ${path}`);
}
assert.equal(
  expected.size,
  52,
  "The mobile contract must retain all 52 operations",
);
const directory = await mkdtemp(join(tmpdir(), "guilliams-contract-"));
let app: ReturnType<typeof createApp> | undefined;
try {
  app = createApp({ dbPath: join(directory, "verify.sqlite3") });
  await app.ready();
  assert.deepEqual(
    new Set(app.operations),
    expected,
    "Runtime registry must exactly match the canonical operations",
  );
  assert.deepEqual(app.store.all("PRAGMA foreign_key_check"), []);
  assert.equal(
    app.store.one<{ integrity_check: string }>("PRAGMA integrity_check")
      ?.integrity_check,
    "ok",
  );
} finally {
  if (app) await app.close();
  await rm(directory, { recursive: true, force: true });
}
interface Screen {
  id: string;
  figma_url: string;
  api_required: boolean;
  shared_routes: string[];
}
const screens = JSON.parse(await read("docs/mobile-screens.json")) as Screen[];
assert.equal(screens.length, 209);
assert.equal(new Set(screens.map((screen) => screen.id)).size, 209);
for (const screen of screens) {
  assert.ok(
    screen.figma_url.endsWith(screen.id.replaceAll(":", "-")),
    `Invalid Figma link: ${screen.id}`,
  );
  assert.ok(
    screen.shared_routes.length || !screen.api_required,
    `Missing API mapping: ${screen.id}`,
  );
  for (const route of screen.shared_routes)
    assert.ok(route in source.paths, `Unknown route ${route} on ${screen.id}`);
}
const generated = COMMENT_HEADER + astToString(await openapiTS(source));
assert.equal(
  await read("src/generated/api-types.ts"),
  generated,
  "Regenerate TypeScript types from the canonical OpenAPI contract",
);
console.log(
  "Contract exports, all 52 runtime operations, generated TypeScript types, 209 unique Figma links and SQLite integrity pass.",
);
