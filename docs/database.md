# Database structure and field coverage

The executable source is [src/schema.sql](../src/schema.sql). Every app instance enables SQLite foreign keys. The seed runs only on a database with no users; normal restarts preserve changes. `schema_version` records version 1. No reset/admin endpoint exists.

| Tables | Purpose and relationships |
|---|---|
| users, sessions, challenges | Unique username/contact values, salted password hash, hashed bearer tokens, expiries, verification attempts/consumption |
| cities, categories, user_categories | Reference IDs; ordered preferred categories; profile city |
| listings, listing_photos, media | Seller/buyer ownership, category/city, integer money, status, timestamps, ordered photos and media ownership |
| sponsorships | Requester/sponsor relationship, unique pair, pending/accepted/declined; disallow self sponsorship |
| conversations, conversation_members, messages | Private participants, listing/topic context, closed time, text/media/offer references |
| offers | Sender/recipient/listing/conversation, integer amount, currency, parent counteroffer, status; unique accepted offer per listing and pending offer per conversation |
| notifications | Recipient, typed event target, read/created timestamps |
| favourites | Unique member/listing pair; unavailable entries retain ID without exposing hidden item details |
| reports | Reporter, listing, reason, text, received timestamp |
| search_history | User's recent queries |
| yard_sales, yard_sale_registrations | Event times/registration deadline and unique member registrations |

Category-specific listing fields use one JSON `attributes` column validated through the shared typed `Attributes` schema and per-category whitelist. This is a deliberate Phase 1 tradeoff: contracts remain explicit while fields can evolve without twelve table migrations. Images use BLOB storage only for the small local development dataset. These choices need revisiting for a production service.

`User`, `Listing`, `Sponsorship`, `Offer`, `Conversation`, `Message` and `Notification` are reusable OpenAPI response definitions. Profile-only contact fields are not part of public `Member`. Category attributes round-trip through list/detail/create/update, while search exposes a typed JSON filter document.

The TypeScript server uses Node’s synchronous SQLite driver and wraps API handlers in `BEGIN IMMEDIATE` transactions before guarded reads. Handlers do not yield while a transaction is open. This serializes local SQLite operations, preventing concurrent code reuse and stale state transitions. It favours correctness over throughput for the demo. A production database should use row-level transactions and conditional updates.

Run `npm run verify:contract` to validate exported schema parity, Figma link mappings, foreign keys and SQLite integrity. Tests also cover restarts and concurrent requests. Soft-deleted data remains stored; see the explicit retention question in [decisions.md](decisions.md).
