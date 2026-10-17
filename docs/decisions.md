# Phase 1 decisions and open product questions

These are explicit development defaults, not claims of product approval. They keep the basic API usable while Moiz and the team refine behavior.

| Topic | Implemented development default | Confirmation needed |
|---|---|---|
| Authentication | Password login/signup plus simulated phone signup and phone/email login codes | Which login method ships in the mobile app? |
| Plain-text input | Password is a JSON input; stored as salted scrypt hash, never returned | Transport must use HTTPS when deployed |
| Verification delivery | Fixed local demo code 123456; 10 minutes, five attempts, 60-second resend cooldown | Real provider/integration later |
| Country selector | Four demo markets GB/US/AE/AU; phone input supports E.164 | Full country catalogue required for launch |
| Sponsorship access | Three accepted sponsors needed to create/publish/re-activate listings; browsing and messaging allowed before this | Exact access gating boundaries |
| Sponsor back | Requires full membership when reverse accepted sponsorship exists; rechecked on accept | Exact policy and decline/retry behavior |
| Onboarding | City, email, name, one or more interests and house rules complete onboarding; profile photo optional | Requiredness and rules/consent text |
| Listing forms | Common fields required; typed category attributes optional; photos optional | Category required fields, photo limits, enums |
| Listing inference | Manual category selection | No AI category detection in Phase 1 |
| Images | Base64 PNG/JPEG API, 2 MiB, SQLite BLOB, authenticated bytes route | Production storage and image validation/transforms |
| Offers | Accepted offer blocks further negotiation; seller separately marks sold; denomination changes blocked during live negotiation; deleting a participant releases reservations; no money moves | Reservation, cancellation, expiry and fulfilment rules |
| Price ranges | price_minor is minimum and attributes.price_max_minor is maximum | Labels/currencies and category-specific units |
| Search | SQLite text/city/category/attribute filtering; dates match selected listing dates | Geospatial radius, ranking and live autocomplete |
| Contacts | Fictional suggestions; no address book upload or Instagram integration | Provider support and permission handling |
| Notifications | Persist in-app events and preferences; OS prompt is client side; no push delivery | Native push integration later |
| Concierge | Deterministic acknowledgement, one thread per topic reused for 24 hours | Real support/AI integration and timeout policy |
| Verification badge | Request becomes pending; no automatic verification | Criteria and review flow |
| Account deletion | Soft deletion, session revocation, listing withdrawal; private data retained in local DB | Retention/purge policy and deletion questionnaire |
| Legal screens | Development placeholder text; no legal acceptance performed by this work | Approved copy and acceptance/version policy |
| Yard sale | One fictional event relative to first DB creation; registration closes before event | Recurrence, city membership and registration requirements |
| Database | Version 1 SQL schema, foreign keys, guarded operations use BEGIN IMMEDIATE | Migration strategy and production DB after contract review |

## Review coverage

All 209 mobile-sized top-level frames across the seven feature pages are inventoried with exact IDs and source text-layer labels. Ten are email-client/external previews. The cover, component library, desktop variants and archive alternatives are reference material, not additional mobile features. Core flows were visually inspected through computer use. Connector extraction reached the account's Figma call quota; generic nested component text slots and exact field requiredness are not represented as fully verified. The JSON inventory exposes that limitation per record.

No mobile UI source was supplied. HTTP flow tests and a fetch client example validate backend integration behavior, but do not constitute wiring or testing an existing iOS/Android UI. No group messages are sent by this repository creation.
