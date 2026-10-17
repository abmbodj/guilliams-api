# Implementation plan

Goal: a runnable, documented Phase 1 backend for the mobile flows, with fixtures and persistence.

1. Inspect mobile frame metadata and visible labels; inventory exact Figma IDs, group screen variants, document inputs/display/actions/navigation and confidence.
2. Define Pydantic request/response models and category fields, then author screen-to-route contracts before implementing handlers.
3. Write failing HTTP tests for auth/session lifecycle, onboarding, sponsorship, listing lifecycle, search, offers/conversations, profile/notifications, failures and persistence.
4. Implement modules against SQLite foreign keys and ownership checks; seed fictional users/listings; keep integrations local.
5. Generate OpenAPI JSON/YAML and schema SQL; validate OpenAPI, all route contracts, data relationships and end-to-end flows.
6. Review source, secrets and Git attribution; publish the public repository with only the user's configured Git author.

Use inline execution. Each implementation change follows a failing test and ends with relevant passing checks. No live mobile app source was supplied: validate client flows over HTTP and provide a small mobile API client, while clearly distinguishing this from connecting an existing UI.
