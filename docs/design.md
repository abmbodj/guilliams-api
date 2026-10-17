# Phase 1 mobile API design

This project implements the six-step mobile API workflow approved in the project conversation. It is a local development backend with persistent SQLite data, predictable fictional fixtures, one generated OpenAPI specification, and mobile screen contracts. No external integrations or UI implementation are included.

## Boundaries
- Authentication supports username/password as requested by the internship brief, plus simulated phone/email code flows matching the Figma. Verification is local development only.
- Feature modules: authentication/onboarding, reference data/feed/search, sponsorship, listings, offers/conversations, profile/notifications.
- SQLite enforces ownership and relationships. Monetary values use integer minor units plus ISO currency.
- HTTP errors have one reusable error shape; validation reports field paths. Bearer sessions expire and logout revokes them.
- All demo identities are fictional. Credentials, databases, uploaded bytes and raw Figma assets stay out of Git.
- Category-specific inputs are explicit typed fields, shared by listing writes, detail reads and search filters.
- External email/SMS/push/contact suggestions and concierge replies are deterministic local simulations.

## Mobile state rules
Disable duplicate submission while pending; preserve inputs on errors. Display field validation beside inputs, retry for network/server failures, an empty state for empty lists, and route expired sessions to sign-in. Successful writes use the returned resource ID, never a guessed ID. Navigation and device permissions are client behavior and do not require separate API routes.

## Decisions needing product confirmation
Code authentication versus password as the final login method; sponsorship gating boundaries; mandatory profile photo; exact category required fields and dropdown values; concierge conversation timeout; yard-sale registration rules; verification criteria; account deletion retention. The implementation makes explicit development defaults in docs/decisions.md rather than presenting them as confirmed design requirements.
