# TypeScript backend

The API runs on TypeScript, Fastify and Node.js 22.16 or later. All 52 existing API operations retain their OpenAPI contract, demo flows and local Swagger assets.

`src/openapi-source.json` is the canonical contract. AJV validates requests and responses; `npm run generate:types` generates the shared TypeScript schema types. `npm run export:openapi` exports the portable JSON and YAML specifications. `npm run verify:contract` checks exports, runtime route coverage, generated types, screen links and database integrity.

`src/db.ts` uses Node's built-in SQLite with synchronous request transactions. Handlers return their response before a transaction commits and must not yield during a transaction. The existing database layout, password hash format and session token hashes remain compatible. Existing databases are opened without reset; fixtures are seeded only when no users exist.

Feature routes live in `src/routes/`. Tests cover authentication, onboarding, listings across twelve categories, sponsorship, offers, private messages/media, profile changes, invalid input, session expiry and persistence. Compatibility tests open a database containing legacy password and session records.

Run `npm ci`, `npm run check`, `npm run build` and `npm start`. Swagger remains at `http://127.0.0.1:8765/docs`. No Python runtime is required. Mobile UI implementation and unresolved Figma/product decisions remain outside this migration; see the screen contracts and decisions documents.
