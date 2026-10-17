# Mobile screen contracts — Phase 1

All `/api/` routes use JSON, except media content. Protected requests send `Authorization: Bearer <session_token>`. The exported OpenAPI files contain every typed request and response field, required flags, enums, bounds and response status. The mobile screen inventory maps each Figma state to these shared contracts.

## Shared behavior

- Loading: preserve the current screen and inputs, show a spinner, and disable repeated writes. Lists may retain their previous data while refreshing.
- 401: clear the local session and navigate to sign-in. 403: show the supplied reason (including sponsor requirement); stay on the screen. 404: show unavailable state and a back action. 409: refresh the affected resource and show the conflict. 410: request a new verification code. 422: show field errors and keep inputs. 429: wait until the resend time before retrying. Network/5xx: show retry; do not assume a write succeeded.
- Empty list: display the design's empty state, not an error. Buttons and device permissions that only change local UI have no API endpoint.
- Error shape: `{error:{code,message,fields:[{path,message}]}}`. IDs are opaque strings. Times are UTC Unix seconds. Money is integer minor units plus currency and price unit. Lists return `{items,total,offset,limit}`.

## Authentication and onboarding

| Method/route | Request | Success | Mobile result |
|---|---|---|---|
| POST `/api/signup/` | `Signup`: username/password required; phone optional | 201 `Session` | Persist token; use `user.onboarding_step` |
| POST `/api/login/` | `Login`: username/password | 200 `Session` | Resume onboarding or Home |
| POST `/api/auth/challenges/` | `ChallengeRequest`: channel, destination, purpose | 201 `Challenge` | Code screen; retain challenge ID and resend deadline |
| POST `/api/auth/challenges/{id}/resend/` | none | 200 `Challenge` | Clear code; update countdown |
| POST `/api/auth/verify/` | `Verify`: challenge_id, six-digit code | 200 `Session` | Login/signup session, or phone change completed |
| GET/PATCH `/api/me/` | `ProfilePatch` for writes; every field optional; explicit null only clears photo | 200 `User` | Advance phone → location → email → name → categories → optional photo → house rules → Home |
| POST `/api/logout/` | none | 204 | Clear local session; splash/sign-in |
| GET `/api/cities/`, `/api/categories/`, `/api/countries/` | none | 200 reference lists | Populate selections; country catalogue limited to four demo markets |
| GET `/api/legal/{document}/` | terms, cookies, house-rules | 200 title/body/version | Read-only legal screen; development copy only |

Phone signup and phone/email login are simulated code flows. Email is the recovery contact at onboarding and is editable. A phone-change challenge is bound to the signed-in account; the number changes only after verification. Duplicate usernames/contact identifiers produce 409; credentials produce 401; invalid code produces 422; consumed code produces 409; expired code produces 410. Demo code is 123456, expires after 10 minutes, permits five attempts, and can be resent after 60 seconds. No email/SMS is sent.

## Feed, search and member profiles

| Method/route | Request | Success | Mobile result |
|---|---|---|---|
| GET `/api/feed/` | category_id optional; preferred_only boolean | 200 `Feed` | Greeting from `/me`; cards, sponsor progress, notification prompt, yard-sale countdown |
| GET `/api/listings/` | q, category_id, city_id, min_price, max_price, filters JSON, offset, limit | 200 `Page[Listing]` | Cards/results; empty-state when total=0 |
| GET `/api/search/suggestions/` | q optional | 200 `Suggestions` | Recent/popular searches and matching titles |
| GET `/api/members/` | q optional, offset, limit | 200 `Page[Member]` | Members tab; member tap opens profile |
| GET `/api/members/{id}/` | ID | 200 `Member` | Public display name, photo, city, sponsorship count, verification status; no private phone/email |
| GET `/api/members/{id}/listings/` | offset, limit | 200 `Page[Listing]` | Member's active items |
| GET `/api/listings/{id}/` | ID | 200 `Listing` | Detail, ordered photos, seller_id, category, description, price, location and category details |
| GET `/api/listings/{id}/similar/` | offset, limit | 200 `Page[Listing]` | Similar active items |

Search filters use the same `Attributes` names as forms. Text, category, city, price, amenities, counts and date filters are deterministic SQLite-backed matching. No geocoding or location autocomplete provider. Removing all filters returns to the category/search landing view. Default city is the profile city. Boats reject mileage. There is no AI category detection in Phase 1; the user chooses a category.

## Sponsorship

GET `/api/sponsors/suggestions/` returns fictional eligible members (`Page[Member]`). GET `/api/sponsorships/` returns incoming/outgoing requests, accepted_count and required_count. POST `/api/sponsorships/` takes sponsor_id and optional relationship, returning 201 `Sponsorship`. PATCH `/api/sponsorships/{id}/` takes accepted/declined and returns the updated request. Only the recipient can decide. Duplicate/self requests fail (409/422). Terminal decisions cannot be changed (409).

Mobile: suggestions → send confirmation → request sent → statuses. A recipient's notification opens review profile → accept/decline → confirmation → requests. After accepting, refresh counts and Home. Sponsor-back uses the same request endpoint in the other direction. Only full members can sponsor back; that final policy is a development decision. Contact permission denial stays local; suggestions remain simulated. No address book is uploaded.

## Listing creation and management

POST `/api/media/` takes filename, content_type and base64 image bytes; returns 201 `Media` with ID and authenticated content_url. PNG/JPEG only, 2 MiB maximum. GET `/api/media/{id}/content/` returns bytes to owners or authorised viewers of attached media. Camera/library/file picker/cropping/reordering are local UI actions; attach the returned IDs in order.

POST `/api/listings/` takes `ListingCreate`, returns 201 `Listing` in draft. PATCH `/api/listings/{id}/` takes `ListingPatch`, returning 200 `Listing` (attributes replace the category detail document). POST `/api/listings/{id}/publish/` validates the draft and returns active. POST `/api/listings/{id}/status/` takes active/paused/sold and optional buyer_id, returning `Listing`. DELETE `/api/listings/{id}/` soft-deletes and returns 204. GET `/api/me/listings/` filters the signed-in seller's listings by status. Only owners can edit/publish/change/delete (403); selling requires three accepted sponsors (403). Sold/deleted items cannot be republished (409).

Common form fields: title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, ordered photo_ids, attributes. Draft API requires the common text/location/price fields; photo upload is optional for the Phase 1 demo. Category details are typed but optional until product requiredness is confirmed.

| Category | Additional typed `attributes` fields |
|---|---|
| Property for sale | property_type, bedrooms, bathrooms, surface_m2, amenities, other |
| Property for rent | property_type, bedrooms, bathrooms, minimum_stay_months, furnished, amenities, other |
| Room for rent | tenants, minimum_stay_months, amenities, other |
| Holiday home | bedrooms, bathrooms, amenities, other, minimum_stay_nights |
| Cars & boats | vehicle_type, year, mileage_km (cars only) |
| Yard sale | purchased_price_minor |
| Pets | pet_age, pet_age_unit, cats, dogs, birds, fish, other, ad_type |
| Tickets | dates, ticket_type, ticket_count, other |
| Private catering | event_types, guests, price_max_minor, ad_type, other |
| Nanny/Au pair | service_types, price_max_minor, ad_type, other |
| Pet sitting | cats, dogs, birds, fish, service_types, other, ad_type, price_max_minor |
| Jobs | price_max_minor, ad_type |

Publish success → confirmation → seller detail. Pause/delete/sold → confirmation → selling history. Mark sold can select a member through member search. An accepted offer reserves the negotiation and seller explicitly marks sold. Currency and price-unit changes are blocked while pending/accepted offers exist. No checkout or payment integration exists.

## Offers, messaging, concierge and reports

POST `/api/listings/{id}/offers/` takes amount_minor and returns 201 `Offer`, including conversation_id. PATCH `/api/offers/{id}/` takes accept/decline/counter, with amount_minor required only for counter; returns the terminal offer or new counteroffer. Only the recipient may act. One pending offer per conversation and one accepted offer per listing. Conflicts return 409; users cannot offer on their own listings (422). Currency is copied from the listing, not supplied by the client. Preset 10%/20% discounts are computed locally with integer rounding.

GET/POST `/api/conversations/` lists/creates `Conversation` resources. Creation takes kind (listing/concierge), listing_id when applicable, and topic (general/feedback/contact/report). GET/POST `/api/conversations/{id}/messages/` reads/sends `Message` resources; writes take text and optional photo_id. POST `/api/conversations/{id}/close/` closes the thread. Only members can read/send (403); closed threads reject sends (409). Photos remain private to members. Listing conversations are reused per buyer/listing; concierge creates a new thread after 24 hours. Concierge replies are explicitly simulated acknowledgements, not AI or external staff.

POST `/api/reports/` takes listing_id, reason and message, returning 201 `Report`. Success → message-sent state; failure keeps report text. Contact and feedback open concierge with matching topics. No report/email is sent outside this backend.

## Profile, notifications and yard sale

GET `/api/favourites/`, PUT/DELETE `/api/favourites/{listing_id}/`: list/add/remove favourites. Deleted/paused favourites become unavailable cards; private draft details are never exposed. GET `/api/me/purchases/`: sold listings whose buyer_id is the current user. POST `/api/me/verification/`: returns pending; no identity verification occurs. DELETE `/api/me/` takes confirmation=DELETE and optional reason, soft-deletes the account, withdraws listings, closes conversations, releases pending/accepted negotiations and revokes sessions; returns 204.

GET `/api/notifications/` returns `Page[Notification]`; PATCH `/api/notifications/{id}/read/` marks an owned notification read and returns it. The target_type/target_id determine the app destination (sponsorship/listing/conversation). Saving notifications_enabled through `/me` stores preference only; the OS permission prompt remains client behavior and push delivery is simulated.

GET `/api/yard-sales/current/` returns `YardSale`; POST `/api/yard-sales/{id}/register/` registers the user and returns it. When registration is closed, return 409 and show the closed-registration state. Countdown derives from starts_at and the device clock. Fixture dates are relative to the first database initialisation.

## Traceability and outstanding confirmation

See `mobile-screens.md` for every inventoried mobile frame, its direct source link, source text-layer labels, proposed actions/destinations and shared contract mapping. Layer names such as “Header Text” are slots rather than verified copy. Source inspection hit the Figma account's connector quota; unresolved slot labels and exact requiredness remain marked for visual/product review. The API is a concrete development proposal, not a claim that ambiguous Figma behavior has been approved.
