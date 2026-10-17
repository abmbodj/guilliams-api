# Guilliams Mobile API

[![Verify API](https://github.com/abmbodj/guilliams-api/actions/workflows/ci.yml/badge.svg)](https://github.com/abmbodj/guilliams-api/actions/workflows/ci.yml)

The TypeScript/Fastify Phase 1 backend for the Guilliams mobile app. It provides API contracts and working endpoints for the Figma flows, with fictional test data and SQLite persistence.

**Phase 1 goal:** make the app flows work before adding external integrations. SMS, email, contact suggestions, push delivery and concierge responses are simulated or deferred.

## What is included

| Area | Available behavior |
|---|---|
| Accounts and onboarding | Signup, password login, simulated phone/email codes, profile details, city and category preferences, session expiry and logout |
| Home and search | Feed, categories, listing/member search, filters, suggestions and empty results |
| Sponsorship | Suggestions, requests, acceptance/decline, approval counts and sponsor-back eligibility |
| Selling | Twelve category forms, image uploads, drafts, publishing, editing, pausing, marking sold and soft deletion |
| Buying and conversations | Offers, counteroffers, acceptance/decline, private messages, concierge acknowledgements and ad reports |
| Profile | Personal information, favourites, purchase/selling history, notifications, verification requests and account deletion |
| Yard sale | Event countdown, registration and closed-registration state |

The repository contains **52 API operations**, an inventory of **209 mobile-sized Figma states**, reusable OpenAPI schemas, and a mobile fetch client example. Screen mappings and field rules are development proposals; outstanding product decisions are recorded explicitly.

## Quick start

Requirements: **Node.js 22.16.0 or later** and npm. The API uses Node’s built-in SQLite driver. `.nvmrc` selects the supported Node 22 release line.

```sh
git clone https://github.com/abmbodj/guilliams-api.git
cd guilliams-api
npm ci
npm run dev
```

If you already have the repository, start from its root directory and skip the clone steps. These commands use a macOS/Linux shell.

- **Swagger UI:** [http://127.0.0.1:8765/docs](http://127.0.0.1:8765/docs)
- **Health check:** [http://127.0.0.1:8765/api/health/](http://127.0.0.1:8765/api/health/)
- **Live OpenAPI:** [http://127.0.0.1:8765/openapi.json](http://127.0.0.1:8765/openapi.json)

The database is created and seeded on first startup. Changes survive restarts. Swagger's JavaScript and CSS are served locally, so the running service does not need a documentation CDN.

## Try a flow in Swagger

### 1. Sign in

Expand `POST /api/login/`, choose **Try it out**, and submit:

```json
{
  "username": "alice",
  "password": "DemoPass123!"
}
```

Copy `session_token` from the response. Click **Authorize** at the top of Swagger, paste the token without adding the word `Bearer`, and choose **Authorize**.

### 2. Read the Home feed

Run `GET /api/me/` and `GET /api/feed/`. On a fresh database, Alice has three accepted sponsors and an active example listing in each category.

### 3. Create and publish a listing

Run `POST /api/listings/` with:

```json
{
  "title": "Oak side table",
  "description": "A fictional listing for testing the mobile flow.",
  "category_id": "yard-sale",
  "city_id": "london",
  "postal_code": "SW1A 1AA",
  "town": "London",
  "price_minor": 4500,
  "currency": "GBP",
  "price_unit": "item",
  "photo_ids": [],
  "attributes": {
    "purchased_price_minor": 9000
  }
}
```

The response is a draft. Copy its `id` into `POST /api/listings/{listing_id}/publish/` to make it active. `4500` means **£45.00**: monetary amounts use integer minor units.

To test an offer, sign in as `bob`, replace the authorised token, and call `POST /api/listings/{listing_id}/offers/`. Sign back in as Alice to accept, decline or counter the returned offer. The API moves no money; the seller marks a listing sold separately.

## Demo accounts and verification

All fixture accounts use the public test password **`DemoPass123!`**.

| Username | Starting state on a fresh database |
|---|---|
| `alice` | Three accepted sponsors; owns the example listings |
| `bob`, `carol` | No accepted sponsors; useful for buyer and access-control checks |
| `sponsor-a`, `sponsor-b`, `sponsor-c` | Alice's initial sponsors |

Phone/email verification uses the simulated code **`123456`**. Codes expire after ten minutes, allow five incorrect attempts, and can be resent after sixty seconds. No SMS or email is sent.

This is a local development backend with known demo credentials. Use fictional data. Production authentication, delivery providers, storage and operating policies are outside this phase.

## API conventions

- Routes use the `/api/` prefix and trailing slash.
- Protected requests send `Authorization: Bearer <session_token>`.
- IDs are opaque strings; timestamps are UTC Unix seconds.
- Lists return `items`, `total`, `offset` and `limit`.
- Money uses integer minor units, a currency and a price unit.
- Errors return `error.code`, `error.message` and `error.fields`. A `401` means the client should clear its session and show sign-in.
- Category details use the typed `attributes` object. `GET /api/categories/` lists the applicable field names for each category.

See the [API and mobile handling contracts](docs/contracts.md) for success, failure, loading and empty-state behavior. The generated [OpenAPI YAML](openapi.yaml) and [JSON](openapi.json) specify request/response fields, types, requiredness and status codes.

## Screen and database documentation

| Document | Use it for |
|---|---|
| [Mobile screen checklist](docs/mobile-screens.md) | Grouped variants and direct Figma links |
| [Per-screen contracts](docs/screen-contracts.md) | Proposed inputs, displayed fields, routes, buttons and destinations for each state |
| [Screen inventory JSON](docs/mobile-screens.json) | Machine-readable mappings and evidence status |
| [API contracts](docs/contracts.md) | Shared endpoint behavior and mobile flow handling |
| [Database guide](docs/database.md) / [SQL schema](src/schema.sql) | Stored fields, relationships, ownership and statuses |
| [Decisions and open questions](docs/decisions.md) | Development defaults that still need product confirmation |
| [Design](docs/design.md) / [Implementation plan](docs/implementation-plan.md) | Project boundaries and delivery approach |

The inventory includes ten external/email-client reference previews. Component copy, exact field requiredness and some product policies still need review; a linked frame is not proof that every field has been approved. Desktop variants and archived alternatives are reference material.

## Connect a mobile client

[examples/mobile-client.mjs](examples/mobile-client.mjs) wraps `fetch` with injectable token storage, field errors, timeouts and session clearing on `401`. The actual app should supply its secure token-storage implementation.

With the API running, exercise the client over HTTP:

```sh
node examples/smoke.mjs
```

This checks login, feed loading, empty results, validation errors, logout and missing-session handling.

For a physical device on your development network, start the API with `HOST=0.0.0.0 npm run dev` and configure the app to use the computer's reachable LAN address, for example `http://192.168.1.10:8765`. Use your computer's actual address; `127.0.0.1` on a phone points to the phone itself. Keep this demo service on a trusted development network.

The smoke script accepts a different base URL through `GUILLIAMS_API_URL`. No mobile UI source is included in this repository, so backend flow tests do not establish that an iOS/Android UI has been connected or device-tested.

## Tests and contract updates

From the repository root:

```sh
npm run check
npm run build
```

`check` runs TypeScript typechecking, HTTP regression tests and contract verification. To run the compiled server, use `npm start` after building; `npm run dev` watches the TypeScript sources during development.

The test suite covers the twelve listing categories, sessions, verification, sponsorship, ownership, offers, private messages/media, profile changes, favourites, notifications, registration, concurrent requests and persistence. GitHub Actions installs the locked npm dependencies, runs the checks and build, starts the compiled server and runs the mobile-client HTTP smoke check.

The shared JSON Schema contract is `src/openapi-source.json`. Handlers use generated TypeScript schema types, and AJV validates requests, query parameters and responses. After changing the contract or routes, update the exported specification and types:

```sh
npm run export:openapi
npm run generate:types
npm run check
```

Keep the screen contracts and product decisions in sync with behavior changes.

## Configuration

| Environment variable | Default | Purpose |
|---|---|---|
| `GUILLIAMS_DB` | `data/guilliams.sqlite3` | SQLite file path, relative to the working directory unless absolute |
| `GUILLIAMS_DEMO_MODE` | `true` | Set to `false` to disable simulated code authentication; password authentication remains available |
| `HOST` | `127.0.0.1` | Server bind address |
| `PORT` | `8765` | Server port |
| `GUILLIAMS_API_URL` | `http://127.0.0.1:8765` | Base URL used by the client smoke script |

## Repository layout

```text
src/              TypeScript server, feature routes, schema validation, SQLite schema and fixtures
src/generated/    TypeScript definitions generated from OpenAPI
docs/             Screen contracts, database notes and product decisions
examples/         Mobile fetch client and live HTTP smoke check
scripts/          OpenAPI export and consistency checks
tests-ts/         HTTP flow and regression tests using node:test and Fastify.inject
static/swagger/   Locally served Swagger UI distribution
openapi.yaml      Portable API specification (JSON also included)
```

Third-party notices and Swagger UI licensing are preserved in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
