# Guilliams Mobile API

Phase 1 backend for the mobile flows: authentication/onboarding, Home/search, sponsorship, listings, offers/messages/concierge, and profile/settings. No external integrations. SQLite persists changes; fixtures are fictional.

## Run locally

Python 3.11+ is required (verified on Python 3.14). From this folder:

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements-dev.txt
uvicorn app.main:app --host 127.0.0.1 --port 8765
```

Open **[Swagger UI](http://127.0.0.1:8765/docs)**. Its JavaScript/CSS are served locally. Download the portable contract: [openapi.yaml](openapi.yaml) or [openapi.json](openapi.json).

1. Call `POST /api/login/` with username `alice`, password `DemoPass123!`.
2. Copy `session_token`, click Swagger **Authorize**, and paste the token.
3. Try `/api/feed/`, create/publish a listing, or use `bob` to send an offer to Alice.

Fixture users: `alice`, `bob`, `carol`, `sponsor-a`, `sponsor-b`, `sponsor-c`; all use `DemoPass123!`. Alice has three sponsors and one active example per category. Others start without sponsorship approvals. Demo phone/email codes are `123456`; delivery is simulated. These are public fictional test credentials, not secrets.

This is a **local development service**, not a production deployment. Bind to localhost by default. Set `GUILLIAMS_DEMO_MODE=false` to disable code authentication; password authentication remains available. `GUILLIAMS_DB` selects the SQLite file (default `data/guilliams.sqlite3`). Do not use real personal data in the fixtures.

## Screen specs and decisions

- [Mobile screen checklist](docs/mobile-screens.md): 209 exact Figma frame links, grouped variants, source labels, proposed fields/actions/destinations.
- [Per-screen contracts](docs/screen-contracts.md): proposed inputs, displayed fields, routes and button destinations per state.
- [Machine-readable screen inventory](docs/mobile-screens.json).
- [API and mobile handling contracts](docs/contracts.md): success/failure/loading/empty behavior and navigation.
- [Database structure](docs/database.md) and [executable SQL](app/schema.sql).
- [Development decisions and open questions](docs/decisions.md): inferred defaults are marked explicitly.
- [Implementation design](docs/design.md) and [delivery plan](docs/implementation-plan.md).

Frame discovery is complete; exact component-slot copy, requiredness and some product policies remain subject to review. Figma connector inspection reached the account's quota. No desktop implementation or archived alternative is included. No Figma screenshots, design assets, email-client content, or real user data are bundled.

## Verify

```sh
pytest -q
ruff check app tests scripts
ruff format --check app tests scripts
python scripts/verify_contract.py
```

After changing models/routes, regenerate and validate the single contract:

```sh
python scripts/export_openapi.py
```

The suite exercises all twelve categories, sessions, simulated verification, ownership, sponsorship, offer negotiation, private messages/media, reports, profile changes, favourites, notifications, registration closure, concurrency and persistence. CI repeats the checks.

## Mobile app connection

[examples/mobile-client.mjs](examples/mobile-client.mjs) is a small fetch client with injectable token storage, field errors, timeout handling and session clearing on 401. Use secure token storage provided by the actual app. The live HTTP smoke check runs against a running local server:

```sh
node examples/smoke.mjs
```

A physical device needs the development computer's reachable LAN URL instead of `127.0.0.1`; configure `GUILLIAMS_API_URL` for the smoke script. No mobile UI repository was supplied, so this project validates backend flows and provides the client boundary; it does not claim an existing mobile UI has been wired or device-tested.

## Project layout

`app/` contains request/response models, SQLite schema, fixtures and feature routers. `tests/` contains HTTP flow tests. `scripts/` exports/verifies OpenAPI. `docs/` contains screen and product contracts. `static/swagger/` contains the licensed Swagger UI distribution; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
