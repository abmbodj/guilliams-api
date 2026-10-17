# Per-screen mobile contracts

Each state links to the Figma and lists proposed inputs, displayed data, API operations and navigation. Empty/filled/error variants share endpoints; [mobile-screens.md](mobile-screens.md) groups those variants. Types, requiredness, success/error responses and common loading/failure/empty handling are defined once in [contracts.md](contracts.md) and [OpenAPI](../openapi.yaml). Proposed behavior is not a claim that ambiguous design rules are approved.

## auth: Phone - Sign in - Empty field (295:6643)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6643)

**Inputs:** dial code, phone number.
**Displayed:** phone validation, Next enabled/disabled.
**API contracts:** `/api/auth/challenges/`.
**Buttons/destinations:** Next → code screen; Country → country sheet; Back/close → splash/method selection.

**Evidence:** frame metadata; additional rendered text. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Step 1 - Phone Number - Empty (295:6654)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6654)

**Inputs:** dial code, phone number, message_consent.
**Displayed:** phone validation, Next enabled/disabled.
**API contracts:** `/api/auth/challenges/`.
**Buttons/destinations:** Next → code screen; Country → country sheet; Back/close → splash/method selection.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Email - Sign in - Empty field (295:6666)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6666)

**Inputs:** email.
**Displayed:** email validation, Next enabled/disabled.
**API contracts:** `/api/auth/challenges/`.
**Buttons/destinations:** Next → email code screen; Back → previous step.

**Evidence:** frame metadata; additional rendered text. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Email - Sign in - Filled in (295:6677)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6677)

**Inputs:** email.
**Displayed:** email validation, Next enabled/disabled.
**API contracts:** `/api/auth/challenges/`.
**Buttons/destinations:** Next → email code screen; Back → previous step.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Email - Sign in - Error (295:6689)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6689)

**Inputs:** email.
**Displayed:** email validation, Next enabled/disabled.
**API contracts:** `/api/auth/challenges/`.
**Buttons/destinations:** Next → email code screen; Back → previous step.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Step 3 - Email - Empty (295:6701)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6701)

**Inputs:** email.
**Displayed:** email validation, Next enabled/disabled.
**API contracts:** `/api/me/`.
**Buttons/destinations:** Next → name onboarding; Back → previous step.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Step 6 - Profile picture - Empty (295:6714)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6714)

**Inputs:** image bytes/filename/content_type, photo_id, local crop/zoom.
**Displayed:** photo preview, source picker, Save enabled/disabled.
**API contracts:** `/api/media/`, `/api/me/`.
**Buttons/destinations:** Upload/replace → device picker; Save → notifications/house rules; Back → category preferences.

**Evidence:** frame metadata; additional rendered text. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Step 6 - Profile picture - Filled in (295:6731)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6731)

**Inputs:** image bytes/filename/content_type, photo_id, local crop/zoom.
**Displayed:** photo preview, source picker, Save enabled/disabled.
**API contracts:** `/api/media/`, `/api/me/`.
**Buttons/destinations:** Upload/replace → device picker; Save → notifications/house rules; Back → category preferences.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Step 6 - Profile picture - Empty (295:6750)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6750)

**Inputs:** image bytes/filename/content_type, photo_id, local crop/zoom.
**Displayed:** photo preview, source picker, Save enabled/disabled.
**API contracts:** `/api/media/`, `/api/me/`.
**Buttons/destinations:** Upload/replace → device picker; Save → notifications/house rules; Back → category preferences.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Step 4 - Name - Empty (295:6768)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6768)

**Inputs:** first_name, last_name.
**Displayed:** input values, profile name visibility explanation.
**API contracts:** `/api/me/`.
**Buttons/destinations:** Next → category preferences; Back → email.

**Evidence:** frame metadata; additional rendered text. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Step 4 - Name - Filled in (295:6782)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6782)

**Inputs:** first_name, last_name.
**Displayed:** input values, profile name visibility explanation.
**API contracts:** `/api/me/`.
**Buttons/destinations:** Next → category preferences; Back → email.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Step 5 - Choose Categories - Empty (295:6796)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6796)

**Inputs:** category_ids (ordered selection).
**Displayed:** category groups/options, selected chips.
**API contracts:** `/api/categories/`, `/api/me/`.
**Buttons/destinations:** Next → photo; Tap category → local selection; Back → name.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Step 5 - Choose Categories - Filled (295:6936)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6936)

**Inputs:** category_ids (ordered selection).
**Displayed:** category groups/options, selected chips.
**API contracts:** `/api/categories/`, `/api/me/`.
**Buttons/destinations:** Next → photo; Tap category → local selection; Back → name.

**Evidence:** frame metadata; additional rendered text. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Step 3 - Email - Filled in (295:6964)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6964)

**Inputs:** email.
**Displayed:** email validation, Next enabled/disabled.
**API contracts:** `/api/me/`.
**Buttons/destinations:** Next → name onboarding; Back → previous step.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Phone - Sign in - Filled in (295:6977)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6977)

**Inputs:** dial code, phone number.
**Displayed:** phone validation, Next enabled/disabled.
**API contracts:** `/api/auth/challenges/`.
**Buttons/destinations:** Next → code screen; Country → country sheet; Back/close → splash/method selection.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Step 1 - Phone Number - Filled in (295:6988)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6988)

**Inputs:** dial code, phone number, message_consent.
**Displayed:** phone validation, Next enabled/disabled.
**API contracts:** `/api/auth/challenges/`.
**Buttons/destinations:** Next → code screen; Country → country sheet; Back/close → splash/method selection.

**Evidence:** frame metadata; additional rendered text. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Enter your code (295:7000)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7000)

**Inputs:** challenge_id (retained), six-digit code.
**Displayed:** destination, code slots, invalid-code text, resend deadline.
**API contracts:** `/api/auth/verify/`, `/api/auth/challenges/{challenge_id}/resend/`.
**Buttons/destinations:** Next → session and next incomplete step/Home; Resend → same screen; Back → contact entry.

**Evidence:** frame metadata; additional rendered text. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Enter your code (295:7013)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7013)

**Inputs:** challenge_id (retained), six-digit code.
**Displayed:** destination, code slots, invalid-code text, resend deadline.
**API contracts:** `/api/auth/verify/`, `/api/auth/challenges/{challenge_id}/resend/`.
**Buttons/destinations:** Next → session and next incomplete step/Home; Resend → same screen; Back → contact entry.

**Evidence:** frame metadata; additional rendered text. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Invalid code (295:7026)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7026)

**Inputs:** challenge_id (retained), six-digit code.
**Displayed:** destination, code slots, invalid-code text, resend deadline.
**API contracts:** `/api/auth/verify/`, `/api/auth/challenges/{challenge_id}/resend/`.
**Buttons/destinations:** Next → session and next incomplete step/Home; Resend → same screen; Back → contact entry.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Code filled in (295:7039)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7039)

**Inputs:** challenge_id (retained), six-digit code.
**Displayed:** destination, code slots, invalid-code text, resend deadline.
**API contracts:** `/api/auth/verify/`, `/api/auth/challenges/{challenge_id}/resend/`.
**Buttons/destinations:** Next → session and next incomplete step/Home; Resend → same screen; Back → contact entry.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Code filled in (295:7052)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7052)

**Inputs:** challenge_id (retained), six-digit code.
**Displayed:** destination, code slots, invalid-code text, resend deadline.
**API contracts:** `/api/auth/verify/`, `/api/auth/challenges/{challenge_id}/resend/`.
**Buttons/destinations:** Next → session and next incomplete step/Home; Resend → same screen; Back → contact entry.

**Evidence:** frame metadata; additional rendered text. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Code filled in (295:7066)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7066)

**Inputs:** challenge_id (retained), six-digit code.
**Displayed:** destination, code slots, invalid-code text, resend deadline.
**API contracts:** `/api/auth/verify/`, `/api/auth/challenges/{challenge_id}/resend/`.
**Buttons/destinations:** Next → session and next incomplete step/Home; Resend → same screen; Back → contact entry.

**Evidence:** frame metadata; additional rendered text. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Contries table (295:7110)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7110)

**Inputs:** country search (local), country/dial-code selection.
**Displayed:** country name, dial code.
**API contracts:** `/api/countries/`.
**Buttons/destinations:** Select country → phone form; Close → phone form.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Inbox - Gmail - Landing page (295:7160)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7160)

**Inputs:** None (UI/reference state).
**Displayed:** External delivery/reference preview.
**API contracts:** No request; local navigation/device UI only.
**Buttons/destinations:** No mobile API/UI action; delivery is simulated in the associated flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Welcome Email (295:7203)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7203)

**Inputs:** None (UI/reference state).
**Displayed:** External delivery/reference preview.
**API contracts:** No request; local navigation/device UI only.
**Buttons/destinations:** No mobile API/UI action; delivery is simulated in the associated flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Inbox - Gmail - Email with code (295:7246)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7246)

**Inputs:** None (UI/reference state).
**Displayed:** External delivery/reference preview.
**API contracts:** No request; local navigation/device UI only.
**Buttons/destinations:** No mobile API/UI action; delivery is simulated in the associated flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Inbox - Gmail - Email with code (295:7312)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7312)

**Inputs:** None (UI/reference state).
**Displayed:** External delivery/reference preview.
**API contracts:** No request; local navigation/device UI only.
**Buttons/destinations:** No mobile API/UI action; delivery is simulated in the associated flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Inbox - Gmail - Email with code (295:7379)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7379)

**Inputs:** None (UI/reference state).
**Displayed:** External delivery/reference preview.
**API contracts:** No request; local navigation/device UI only.
**Buttons/destinations:** No mobile API/UI action; delivery is simulated in the associated flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Step 2 - Location Selected (295:7442)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7442)

**Inputs:** city_id.
**Displayed:** city choices, selected city.
**API contracts:** `/api/cities/`, `/api/me/`.
**Buttons/destinations:** Next → email onboarding; Back → previous step.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Notifications (295:7453)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7453)

**Inputs:** notifications_enabled, device permission choice (local).
**Displayed:** permission explanation.
**API contracts:** `/api/me/`.
**Buttons/destinations:** Allow → OS permission and stored preference → house rules; Skip → house rules.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: House rules (295:7467)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7467)

**Inputs:** house_rules_accepted.
**Displayed:** rules copy/version.
**API contracts:** `/api/legal/{document}/`, `/api/me/`.
**Buttons/destinations:** Accept → Home; no browser-side legal acceptance is automated here.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Splash Screen - Pics (295:9927)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-9927)

**Inputs:** None (UI/reference state).
**Displayed:** Branding, sign-in/create-account choices, terms/cookies links.
**API contracts:** No request; local navigation/device UI only.
**Buttons/destinations:** Create account → phone signup; Sign in → phone/email sign-in options; Terms/Cookies → legal sheet.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Sign in options (295:9957)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-9957)

**Inputs:** None (UI/reference state).
**Displayed:** Branding, sign-in/create-account choices, terms/cookies links.
**API contracts:** No request; local navigation/device UI only.
**Buttons/destinations:** Create account → phone signup; Sign in → phone/email sign-in options; Terms/Cookies → legal sheet.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Splash Screen - Video (546:2988)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=546-2988)

**Inputs:** None (UI/reference state).
**Displayed:** Branding, sign-in/create-account choices, terms/cookies links.
**API contracts:** No request; local navigation/device UI only.
**Buttons/destinations:** Create account → phone signup; Sign in → phone/email sign-in options; Terms/Cookies → legal sheet.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Terms of Service (295:9989)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-9989)

**Inputs:** None (UI/reference state).
**Displayed:** document title/body/version.
**API contracts:** `/api/legal/{document}/`.
**Buttons/destinations:** Close/back → preceding screen.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Cookie Policy (295:10046)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-10046)

**Inputs:** None (UI/reference state).
**Displayed:** document title/body/version.
**API contracts:** `/api/legal/{document}/`.
**Buttons/destinations:** Close/back → preceding screen.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Popup Container (586:7322)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=586-7322)

**Inputs:** None (UI/reference state).
**Displayed:** External delivery/reference preview.
**API contracts:** No request; local navigation/device UI only.
**Buttons/destinations:** No mobile API/UI action; delivery is simulated in the associated flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## auth: Popup Container (586:7384)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=586-7384)

**Inputs:** None (UI/reference state).
**Displayed:** External delivery/reference preview.
**API contracts:** No request; local navigation/device UI only.
**Buttons/destinations:** No mobile API/UI action; delivery is simulated in the associated flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## home: Home - All categories (295:10258)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-10258)

**Inputs:** selected category, latest/preferred tab, notification permission choice.
**Displayed:** greeting, listing cards: ID/title/photo/price/unit/category/location, sponsors needed, unread count, yard sale countdown, empty category.
**API contracts:** `/api/feed/`, `/api/listings/{listing_id}/`, `/api/notifications/`, `/api/notifications/{notification_id}/read/`, `/api/conversations/`, `/api/me/`.
**Buttons/destinations:** Card → buyer detail; Search → items/members search; Find sponsors → suggestions; Allow notifications → OS prompt and stored preference; Bell → messages/notifications; Notification → target detail; Bottom tabs → Home/Concierge/Sell/Yard sale/Profile.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## home: Item clicked on (487:14727)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=487-14727)

**Inputs:** selected category, latest/preferred tab, notification permission choice.
**Displayed:** greeting, listing cards: ID/title/photo/price/unit/category/location, sponsors needed, unread count, yard sale countdown, empty category.
**API contracts:** `/api/feed/`, `/api/listings/{listing_id}/`, `/api/notifications/`, `/api/notifications/{notification_id}/read/`, `/api/conversations/`, `/api/me/`.
**Buttons/destinations:** Card → buyer detail; Search → items/members search; Find sponsors → suggestions; Allow notifications → OS prompt and stored preference; Bell → messages/notifications; Notification → target detail; Bottom tabs → Home/Concierge/Sell/Yard sale/Profile.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## home: No notifications (295:10768)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-10768)

**Inputs:** selected category, latest/preferred tab, notification permission choice.
**Displayed:** greeting, listing cards: ID/title/photo/price/unit/category/location, sponsors needed, unread count, yard sale countdown, empty category.
**API contracts:** `/api/feed/`, `/api/listings/{listing_id}/`, `/api/notifications/`, `/api/notifications/{notification_id}/read/`, `/api/conversations/`, `/api/me/`.
**Buttons/destinations:** Card → buyer detail; Search → items/members search; Find sponsors → suggestions; Allow notifications → OS prompt and stored preference; Bell → messages/notifications; Notification → target detail; Bottom tabs → Home/Concierge/Sell/Yard sale/Profile.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## home: Category empty (295:11082)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-11082)

**Inputs:** selected category, latest/preferred tab, notification permission choice.
**Displayed:** greeting, listing cards: ID/title/photo/price/unit/category/location, sponsors needed, unread count, yard sale countdown, empty category.
**API contracts:** `/api/feed/`, `/api/listings/{listing_id}/`, `/api/notifications/`, `/api/notifications/{notification_id}/read/`, `/api/conversations/`, `/api/me/`.
**Buttons/destinations:** Card → buyer detail; Search → items/members search; Find sponsors → suggestions; Allow notifications → OS prompt and stored preference; Bell → messages/notifications; Notification → target detail; Bottom tabs → Home/Concierge/Sell/Yard sale/Profile.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## home: Notification (295:11161)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-11161)

**Inputs:** selected notification ID.
**Displayed:** notification list/detail, read state, target_type/target_id.
**API contracts:** `/api/notifications/`, `/api/notifications/{notification_id}/read/`.
**Buttons/destinations:** Open → mark read → target profile/request/conversation.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## home: Yard sale countdown (295:11223)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-11223)

**Inputs:** selected category, latest/preferred tab, notification permission choice.
**Displayed:** greeting, listing cards: ID/title/photo/price/unit/category/location, sponsors needed, unread count, yard sale countdown, empty category.
**API contracts:** `/api/feed/`, `/api/listings/{listing_id}/`, `/api/notifications/`, `/api/notifications/{notification_id}/read/`, `/api/conversations/`, `/api/me/`.
**Buttons/destinations:** Card → buyer detail; Search → items/members search; Find sponsors → suggestions; Allow notifications → OS prompt and stored preference; Bell → messages/notifications; Notification → target detail; Bottom tabs → Home/Concierge/Sell/Yard sale/Profile.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## home: Messages (295:11463)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-11463)

**Inputs:** None (UI/reference state).
**Displayed:** conversation list, listing context, message preview.
**API contracts:** `/api/conversations/`.
**Buttons/destinations:** Conversation → messages; Notifications tab → notification list.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## home: Notifications - Unread (295:11514)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-11514)

**Inputs:** selected notification ID.
**Displayed:** notification list/detail, read state, target_type/target_id.
**API contracts:** `/api/notifications/`, `/api/notifications/{notification_id}/read/`.
**Buttons/destinations:** Open → mark read → target profile/request/conversation.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## home: Notifications - Unread (295:11541)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-11541)

**Inputs:** selected notification ID.
**Displayed:** notification list/detail, read state, target_type/target_id.
**API contracts:** `/api/notifications/`, `/api/notifications/{notification_id}/read/`.
**Buttons/destinations:** Open → mark read → target profile/request/conversation.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## home: Notifications - Detail page (295:12228)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-12228)

**Inputs:** selected notification ID.
**Displayed:** notification list/detail, read state, target_type/target_id.
**API contracts:** `/api/notifications/`, `/api/notifications/{notification_id}/read/`.
**Buttons/destinations:** Open → mark read → target profile/request/conversation.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## home: Allow notifications (295:12257)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-12257)

**Inputs:** notifications_enabled, device permission (local).
**Displayed:** permission prompt.
**API contracts:** `/api/me/`.
**Buttons/destinations:** Allow/skip → Home.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Search - Members - 3 sponsors (295:14669)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14669)

**Inputs:** member query, selected sponsor, local contact permission choice.
**Displayed:** simulated contacts status, member suggestions, approvals and request counts.
**API contracts:** `/api/sponsors/suggestions/`, `/api/members/`, `/api/sponsorships/`.
**Buttons/destinations:** Connect/update → simulated suggestions; Member → send confirmation; View statuses → requests.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Phone contacts connected (295:14696)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14696)

**Inputs:** member query, selected sponsor, local contact permission choice.
**Displayed:** simulated contacts status, member suggestions, approvals and request counts.
**API contracts:** `/api/sponsors/suggestions/`, `/api/members/`, `/api/sponsorships/`.
**Buttons/destinations:** Connect/update → simulated suggestions; Member → send confirmation; View statuses → requests.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Sponsors suggestions (295:14725)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14725)

**Inputs:** member query, selected sponsor, local contact permission choice.
**Displayed:** simulated contacts status, member suggestions, approvals and request counts.
**API contracts:** `/api/sponsors/suggestions/`, `/api/members/`, `/api/sponsorships/`.
**Buttons/destinations:** Connect/update → simulated suggestions; Member → send confirmation; View statuses → requests.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Request sent (295:14800)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14800)

**Inputs:** sponsor_id, relationship.
**Displayed:** member name/photo, send/confirmation state.
**API contracts:** `/api/sponsorships/`.
**Buttons/destinations:** Send → request-sent confirmation; Sponsor back → inverse request; Done → request statuses/Home.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Sponsorship requests statuses (295:14907)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14907)

**Inputs:** None (UI/reference state).
**Displayed:** incoming/outgoing request statuses, approvals/required count.
**API contracts:** `/api/sponsorships/`.
**Buttons/destinations:** Send requests → suggestions; Request/member → review profile; Back → Home/search.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: View Statuses - No requests sent (433:4002)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-4002)

**Inputs:** None (UI/reference state).
**Displayed:** incoming/outgoing request statuses, approvals/required count.
**API contracts:** `/api/sponsorships/`.
**Buttons/destinations:** Send requests → suggestions; Request/member → review profile; Back → Home/search.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: No suggestions (295:14946)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14946)

**Inputs:** member query, selected sponsor, local contact permission choice.
**Displayed:** simulated contacts status, member suggestions, approvals and request counts.
**API contracts:** `/api/sponsors/suggestions/`, `/api/members/`, `/api/sponsorships/`.
**Buttons/destinations:** Connect/update → simulated suggestions; Member → send confirmation; View statuses → requests.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Send request (295:14992)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14992)

**Inputs:** sponsor_id, relationship.
**Displayed:** member name/photo, send/confirmation state.
**API contracts:** `/api/sponsorships/`.
**Buttons/destinations:** Send → request-sent confirmation; Sponsor back → inverse request; Done → request statuses/Home.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Dashboard - Request sent (295:15074)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15074)

**Inputs:** None (UI/reference state).
**Displayed:** approvals needed, requests sent, Home cards.
**API contracts:** `/api/feed/`, `/api/sponsorships/`.
**Buttons/destinations:** Find sponsors → suggestions; View requests → statuses.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Allow access to contacts (295:15157)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15157)

**Inputs:** member query, selected sponsor, local contact permission choice.
**Displayed:** simulated contacts status, member suggestions, approvals and request counts.
**API contracts:** `/api/sponsors/suggestions/`, `/api/members/`, `/api/sponsorships/`.
**Buttons/destinations:** Connect/update → simulated suggestions; Member → send confirmation; View statuses → requests.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Email - Sponsorship (295:15193)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15193)

**Inputs:** None (UI/reference state).
**Displayed:** External delivery/reference preview.
**API contracts:** No request; local navigation/device UI only.
**Buttons/destinations:** No mobile API/UI action; delivery is simulated in the associated flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Email - Sponsor back (404:6640)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-6640)

**Inputs:** None (UI/reference state).
**Displayed:** External delivery/reference preview.
**API contracts:** No request; local navigation/device UI only.
**Buttons/destinations:** No mobile API/UI action; delivery is simulated in the associated flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Email - Sponsor (295:15258)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15258)

**Inputs:** None (UI/reference state).
**Displayed:** External delivery/reference preview.
**API contracts:** No request; local navigation/device UI only.
**Buttons/destinations:** No mobile API/UI action; delivery is simulated in the associated flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Inbox - Sponsorship (295:15439)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15439)

**Inputs:** selected event ID.
**Displayed:** sponsorship notification, target request/member.
**API contracts:** `/api/notifications/`, `/api/notifications/{notification_id}/read/`.
**Buttons/destinations:** Open → profile/review/sponsor-back flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Inbox - Sponsorship (295:15482)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15482)

**Inputs:** selected event ID.
**Displayed:** sponsorship notification, target request/member.
**API contracts:** `/api/notifications/`, `/api/notifications/{notification_id}/read/`.
**Buttons/destinations:** Open → profile/review/sponsor-back flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Notification - Sponsorship (295:15525)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15525)

**Inputs:** selected event ID.
**Displayed:** sponsorship notification, target request/member.
**API contracts:** `/api/notifications/`, `/api/notifications/{notification_id}/read/`.
**Buttons/destinations:** Open → profile/review/sponsor-back flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Sponsor back - Notification (404:6559)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-6559)

**Inputs:** sponsor_id, relationship.
**Displayed:** member name/photo, send/confirmation state.
**API contracts:** `/api/sponsorships/`.
**Buttons/destinations:** Send → request-sent confirmation; Sponsor back → inverse request; Done → request statuses/Home.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Notification - Sponsor (295:15558)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15558)

**Inputs:** selected event ID.
**Displayed:** sponsorship notification, target request/member.
**API contracts:** `/api/notifications/`, `/api/notifications/{notification_id}/read/`.
**Buttons/destinations:** Open → profile/review/sponsor-back flow.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Review profile - 1 profile (295:15585)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15585)

**Inputs:** accepted/declined decision.
**Displayed:** member public profile, relationship, request ID/status.
**API contracts:** `/api/members/{member_id}/`, `/api/sponsorships/`, `/api/sponsorships/{sponsorship_id}/`.
**Buttons/destinations:** Accept/Decline → confirmation; Next profile → next pending request.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Review profile (404:6603)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-6603)

**Inputs:** accepted/declined decision.
**Displayed:** member public profile, relationship, request ID/status.
**API contracts:** `/api/members/{member_id}/`, `/api/sponsorships/`, `/api/sponsorships/{sponsorship_id}/`.
**Buttons/destinations:** Accept/Decline → confirmation; Next profile → next pending request.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Sponsorship accepted (295:15604)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15604)

**Inputs:** None (UI/reference state).
**Displayed:** decision confirmation, remaining request count.
**API contracts:** `/api/sponsorships/`.
**Buttons/destinations:** Done → remaining requests or Home.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Sponsorship declined (295:15622)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15622)

**Inputs:** None (UI/reference state).
**Displayed:** decision confirmation, remaining request count.
**API contracts:** `/api/sponsorships/`.
**Buttons/destinations:** Done → remaining requests or Home.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Requests up to date (295:15640)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15640)

**Inputs:** None (UI/reference state).
**Displayed:** decision confirmation, remaining request count.
**API contracts:** `/api/sponsorships/`.
**Buttons/destinations:** Done → remaining requests or Home.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Review profile - 3 profiles (295:15652)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15652)

**Inputs:** accepted/declined decision.
**Displayed:** member public profile, relationship, request ID/status.
**API contracts:** `/api/members/{member_id}/`, `/api/sponsorships/`, `/api/sponsorships/{sponsorship_id}/`.
**Buttons/destinations:** Accept/Decline → confirmation; Next profile → next pending request.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Home -  1 sponsor left (404:6448)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-6448)

**Inputs:** None (UI/reference state).
**Displayed:** approvals needed, requests sent, Home cards.
**API contracts:** `/api/feed/`, `/api/sponsorships/`.
**Buttons/destinations:** Find sponsors → suggestions; View requests → statuses.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sponsoring: Home - Sponsor - 1 request (404:7145)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-7145)

**Inputs:** None (UI/reference state).
**Displayed:** approvals needed, requests sent, Home cards.
**API contracts:** `/api/feed/`, `/api/sponsorships/`.
**Buttons/destinations:** Find sponsors → suggestions; View requests → statuses.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Search results (295:16552)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16552)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Search results (406:7646)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=406-7646)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Top picks template (433:5551)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-5551)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Search results (406:7983)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=406-7983)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Search results (417:8111)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-8111)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Search results (417:9037)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-9037)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Search results (736:5762)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=736-5762)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Search results (736:5956)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=736-5956)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: No results (295:16640)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16640)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Search - Items (295:16689)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16689)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Filter (295:16754)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16754)

**Inputs:** category_id, city_id, min_price, max_price, attributes.property_type, attributes.bedrooms, attributes.bathrooms, attributes.surface_m2, attributes.amenities, attributes.other.
**Displayed:** current selections, date calendar, filter count.
**API contracts:** `/api/listings/`.
**Buttons/destinations:** Apply/Search → results; Cancel → previous filters; Clear → landing/results without chips.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Filter (417:8665)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-8665)

**Inputs:** category_id, city_id, min_price, max_price, attributes.bedrooms, attributes.bathrooms, attributes.amenities, attributes.other, attributes.minimum_stay_nights.
**Displayed:** current selections, date calendar, filter count.
**API contracts:** `/api/listings/`.
**Buttons/destinations:** Apply/Search → results; Cancel → previous filters; Clear → landing/results without chips.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Filter - Boats selected (417:9331)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-9331)

**Inputs:** category_id, city_id, min_price, max_price, attributes.vehicle_type, attributes.year, attributes.mileage_km.
**Displayed:** current selections, date calendar, filter count.
**API contracts:** `/api/listings/`.
**Buttons/destinations:** Apply/Search → results; Cancel → previous filters; Clear → landing/results without chips.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Filter - Cars selected (457:10733)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-10733)

**Inputs:** category_id, city_id, min_price, max_price, attributes.vehicle_type, attributes.year, attributes.mileage_km.
**Displayed:** current selections, date calendar, filter count.
**API contracts:** `/api/listings/`.
**Buttons/destinations:** Apply/Search → results; Cancel → previous filters; Clear → landing/results without chips.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Filter (406:7774)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=406-7774)

**Inputs:** category_id, city_id, min_price, max_price, attributes.property_type, attributes.bedrooms, attributes.bathrooms, attributes.minimum_stay_months, attributes.furnished, attributes.amenities, attributes.other.
**Displayed:** current selections, date calendar, filter count.
**API contracts:** `/api/listings/`.
**Buttons/destinations:** Apply/Search → results; Cancel → previous filters; Clear → landing/results without chips.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Filter (417:8202)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-8202)

**Inputs:** category_id, city_id, min_price, max_price, attributes.tenants, attributes.minimum_stay_months, attributes.amenities, attributes.other.
**Displayed:** current selections, date calendar, filter count.
**API contracts:** `/api/listings/`.
**Buttons/destinations:** Apply/Search → results; Cancel → previous filters; Clear → landing/results without chips.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Filter (417:9512)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-9512)

**Inputs:** category_id, city_id, min_price, max_price, attributes.dates, attributes.ticket_type, attributes.ticket_count, attributes.other.
**Displayed:** current selections, date calendar, filter count.
**API contracts:** `/api/listings/`.
**Buttons/destinations:** Apply/Search → results; Cancel → previous filters; Clear → landing/results without chips.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Dates added (433:5882)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-5882)

**Inputs:** category_id, city_id, min_price, max_price, attributes.dates, attributes.ticket_type, attributes.ticket_count, attributes.other.
**Displayed:** current selections, date calendar, filter count.
**API contracts:** `/api/listings/`.
**Buttons/destinations:** Apply/Search → results; Cancel → previous filters; Clear → landing/results without chips.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Calendar opened (433:5761)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-5761)

**Inputs:** category_id, city_id, min_price, max_price, attributes.dates, attributes.ticket_type, attributes.ticket_count, attributes.other.
**Displayed:** current selections, date calendar, filter count.
**API contracts:** `/api/listings/`.
**Buttons/destinations:** Apply/Search → results; Cancel → previous filters; Clear → landing/results without chips.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Search - Opened - No input (295:16787)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16787)

**Inputs:** q.
**Displayed:** recent/popular/suggested searches.
**API contracts:** `/api/search/suggestions/`.
**Buttons/destinations:** Submit/suggestion → results; Clear → no-input state; Members tab → member search.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Search - Members (530:10164)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=530-10164)

**Inputs:** q.
**Displayed:** matching member names/photos/sponsor counts.
**API contracts:** `/api/members/`.
**Buttons/destinations:** Member → public profile; Items tab → item search; Back → Home.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Search - Opened - Type in (295:16810)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16810)

**Inputs:** q.
**Displayed:** recent/popular/suggested searches.
**API contracts:** `/api/search/suggestions/`.
**Buttons/destinations:** Submit/suggestion → results; Clear → no-input state; Members tab → member search.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Type in location (404:5514)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-5514)

**Inputs:** city_id/location query (local reference lookup).
**Displayed:** location suggestions.
**API contracts:** `/api/cities/`.
**Buttons/destinations:** Select → filters; Back → filters.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Property for sale (295:16835)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16835)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Holiday home (417:8745)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-8745)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Pet sitting (436:7307)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-7307)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Pet sitting (457:11219)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-11219)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Private catering (436:7745)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-7745)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Nanny/Au pair (436:8404)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-8404)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Jobs (436:8671)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-8671)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Pets (436:9232)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-9232)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Yard sale (453:9757)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=453-9757)

**Inputs:** registration choice.
**Displayed:** event start/end/deadline, registration open/closed, yard-sale cards.
**API contracts:** `/api/yard-sales/current/`, `/api/yard-sales/{sale_id}/register/`, `/api/listings/`.
**Buttons/destinations:** Register → confirmed/closed state; Item → buyer detail; Create post → yard-sale form.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Category empty (420:9637)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=420-9637)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Category empty (436:9050)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-9050)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Category empty (436:9131)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-9131)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Registration closed (453:9678)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=453-9678)

**Inputs:** registration choice.
**Displayed:** event start/end/deadline, registration open/closed, yard-sale cards.
**API contracts:** `/api/yard-sales/current/`, `/api/yard-sales/{sale_id}/register/`, `/api/listings/`.
**Buttons/destinations:** Register → confirmed/closed state; Item → buyer detail; Create post → yard-sale form.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Category empty (436:7812)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-7812)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Category empty (436:8469)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-8469)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Category empty (436:8736)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-8736)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Cars & Boats (417:9170)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-9170)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Tickets (417:9399)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-9399)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Property to rent (406:7832)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=406-7832)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Room for rent (417:8266)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-8266)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Category empty (433:6500)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-6500)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Category empty (433:6920)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-6920)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Category empty (433:7208)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-7208)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Category empty (433:6618)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-6618)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Category empty (433:6831)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-6831)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Category empty (433:6707)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-6707)

**Inputs:** q, category_id, city_id, min_price, max_price, filters JSON.
**Displayed:** listing cards, category heading, top picks, empty/no-results state, filter chips.
**API contracts:** `/api/listings/`, `/api/search/suggestions/`.
**Buttons/destinations:** Filter → filter sheet; Item → buyer detail; Remove chip → refresh; Back/clear → landing.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Filter (436:7948)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-7948)

**Inputs:** category_id, city_id, min_price, max_price, attributes.cats, attributes.dogs, attributes.birds, attributes.fish, attributes.service_types, attributes.other, attributes.ad_type, attributes.price_max_minor.
**Displayed:** current selections, date calendar, filter count.
**API contracts:** `/api/listings/`.
**Buttons/destinations:** Apply/Search → results; Cancel → previous filters; Clear → landing/results without chips.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Filter (453:9384)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=453-9384)

**Inputs:** category_id, city_id, min_price, max_price, attributes.pet_age, attributes.pet_age_unit, attributes.cats, attributes.dogs, attributes.birds, attributes.fish, attributes.other, attributes.ad_type.
**Displayed:** current selections, date calendar, filter count.
**API contracts:** `/api/listings/`.
**Buttons/destinations:** Apply/Search → results; Cancel → previous filters; Clear → landing/results without chips.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Filter (436:8044)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-8044)

**Inputs:** category_id, city_id, min_price, max_price, attributes.event_types, attributes.guests, attributes.price_max_minor, attributes.ad_type, attributes.other.
**Displayed:** current selections, date calendar, filter count.
**API contracts:** `/api/listings/`.
**Buttons/destinations:** Apply/Search → results; Cancel → previous filters; Clear → landing/results without chips.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## search: Filter (436:8523)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-8523)

**Inputs:** category_id, city_id, min_price, max_price, attributes.service_types, attributes.price_max_minor, attributes.ad_type, attributes.other.
**Displayed:** current selections, date calendar, filter count.
**API contracts:** `/api/listings/`.
**Buttons/destinations:** Apply/Search → results; Cancel → previous filters; Clear → landing/results without chips.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - No sponsors yet (301:17716)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=301-17716)

**Inputs:** None (UI/reference state).
**Displayed:** sponsorship requirement/progress.
**API contracts:** `/api/me/`.
**Buttons/destinations:** Find sponsors → sponsorship flow; Back → Home.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Item published (457:10662)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-10662)

**Inputs:** None (UI/reference state).
**Displayed:** listing fields/status, publication/processing feedback, seller actions.
**API contracts:** `/api/listings/{listing_id}/`.
**Buttons/destinations:** Edit → form; Pause/Sold/Delete → corresponding confirmation; Done → detail/history.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Edit pictures (453:10215)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=453-10215)

**Inputs:** image bytes/filename/content_type, local crop/reorder/delete.
**Displayed:** device picker/photo preview.
**API contracts:** `/api/media/`.
**Buttons/destinations:** Save → form with photo IDs; Cancel → form.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - Yard sale (301:17899)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=301-17899)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes.purchased_price_minor.
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - Pet sitting (457:11812)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-11812)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes.cats, attributes.dogs, attributes.birds, attributes.fish, attributes.service_types, attributes.other, attributes.ad_type, attributes.price_max_minor.
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - Property for sale (464:12016)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=464-12016)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes.property_type, attributes.bedrooms, attributes.bathrooms, attributes.surface_m2, attributes.amenities, attributes.other.
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - Holiday home (474:13019)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-13019)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes.bedrooms, attributes.bathrooms, attributes.amenities, attributes.other, attributes.minimum_stay_nights.
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - Cars & boats (474:13133)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-13133)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes.vehicle_type, attributes.year, attributes.mileage_km.
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - Private catering (474:13239)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-13239)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes.event_types, attributes.guests, attributes.price_max_minor, attributes.ad_type, attributes.other.
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - Nanny/Au pair (474:13315)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-13315)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes.service_types, attributes.price_max_minor, attributes.ad_type, attributes.other.
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - Jobs (474:13406)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-13406)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes.price_max_minor, attributes.ad_type.
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - Property to rent (474:12380)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-12380)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes.property_type, attributes.bedrooms, attributes.bathrooms, attributes.minimum_stay_months, attributes.furnished, attributes.amenities, attributes.other.
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - Room for rent (474:12493)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-12493)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes.tenants, attributes.minimum_stay_months, attributes.amenities, attributes.other.
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Pictures selected (453:10115)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=453-10115)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes.purchased_price_minor.
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Detail page - Buyer (477:13509)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=477-13509)

**Inputs:** None (UI/reference state).
**Displayed:** listing fields/status, publication/processing feedback, seller actions.
**API contracts:** `/api/listings/{listing_id}/`.
**Buttons/destinations:** Edit → form; Pause/Sold/Delete → corresponding confirmation; Done → detail/history.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sold (479:14098)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=479-14098)

**Inputs:** buyer_id when marking sold, member query.
**Displayed:** confirmation, buyer/member list, sold listing.
**API contracts:** `/api/members/`, `/api/listings/{listing_id}/status/`, `/api/me/listings/`.
**Buttons/destinations:** Select buyer → mark sold → selling history; Done → sold history.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sold (749:15418)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=749-15418)

**Inputs:** buyer_id when marking sold, member query.
**Displayed:** confirmation, buyer/member list, sold listing.
**API contracts:** `/api/members/`, `/api/listings/{listing_id}/status/`, `/api/me/listings/`.
**Buttons/destinations:** Select buyer → mark sold → selling history; Done → sold history.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Processing (479:14154)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=479-14154)

**Inputs:** None (UI/reference state).
**Displayed:** listing fields/status, publication/processing feedback, seller actions.
**API contracts:** `/api/listings/{listing_id}/`.
**Buttons/destinations:** Edit → form; Pause/Sold/Delete → corresponding confirmation; Done → detail/history.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Deleted (479:14208)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=479-14208)

**Inputs:** local confirmation.
**Displayed:** delete prompt/confirmation.
**API contracts:** `/api/listings/{listing_id}/`.
**Buttons/destinations:** Confirm → soft delete → deleted history; Cancel → seller detail.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Pause (479:14277)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=479-14277)

**Inputs:** status=paused.
**Displayed:** pause prompt/confirmation.
**API contracts:** `/api/listings/{listing_id}/status/`.
**Buttons/destinations:** Confirm → paused history; Cancel → seller detail.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Detail page - Seller (477:13735)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=477-13735)

**Inputs:** None (UI/reference state).
**Displayed:** listing fields/status, publication/processing feedback, seller actions.
**API contracts:** `/api/listings/{listing_id}/`.
**Buttons/destinations:** Edit → form; Pause/Sold/Delete → corresponding confirmation; Done → detail/history.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Device pop up (477:13793)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=477-13793)

**Inputs:** image bytes/filename/content_type, local crop/reorder/delete.
**Displayed:** device picker/photo preview.
**API contracts:** `/api/media/`.
**Buttons/destinations:** Save → form with photo IDs; Cancel → form.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Mark as sold (530:10220)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=530-10220)

**Inputs:** buyer_id when marking sold, member query.
**Displayed:** confirmation, buyer/member list, sold listing.
**API contracts:** `/api/members/`, `/api/listings/{listing_id}/status/`, `/api/me/listings/`.
**Buttons/destinations:** Select buyer → mark sold → selling history; Done → sold history.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Delete (477:13932)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=477-13932)

**Inputs:** local confirmation.
**Displayed:** delete prompt/confirmation.
**API contracts:** `/api/listings/{listing_id}/`.
**Buttons/destinations:** Confirm → soft delete → deleted history; Cancel → seller detail.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - No category selected (457:10384)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-10384)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes (category-specific; see contracts.md).
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - Tickets (457:11654)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-11654)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes.dates, attributes.ticket_type, attributes.ticket_count, attributes.other.
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Sell - Pets (457:10564)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-10564)

**Inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, photo_ids, attributes.pet_age, attributes.pet_age_unit, attributes.cats, attributes.dogs, attributes.birds, attributes.fish, attributes.other, attributes.ad_type.
**Displayed:** form fields, photo previews/order/main indicator, validation.
**API contracts:** `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/media/`.
**Buttons/destinations:** Publish → confirmation → seller detail; Category → selector; Photo → picker/edit; Close → previous view.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Item details - Category (457:10469)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-10469)

**Inputs:** category_id (local draft selection).
**Displayed:** category names.
**API contracts:** `/api/categories/`.
**Buttons/destinations:** Choose → category-specific form; Back → form.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## sell: Select member (530:10284)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=530-10284)

**Inputs:** buyer_id when marking sold, member query.
**Displayed:** confirmation, buyer/member list, sold listing.
**API contracts:** `/api/members/`, `/api/listings/{listing_id}/status/`, `/api/me/listings/`.
**Buttons/destinations:** Select buyer → mark sold → selling history; Done → sold history.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Concierge - Empty (487:14428)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=487-14428)

**Inputs:** topic, text, photo_id.
**Displayed:** concierge conversation/empty prompt, simulated acknowledgement.
**API contracts:** `/api/conversations/`, `/api/conversations/{conversation_id}/messages/`.
**Buttons/destinations:** Send → conversation; Expired thread → new conversation; Back → previous tab.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Report ad - Message not sent (503:6691)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=503-6691)

**Inputs:** listing_id, reason, message.
**Displayed:** report input, sent/failed feedback.
**API contracts:** `/api/reports/`.
**Buttons/destinations:** Send → message-sent state; Failure → preserve text/retry; Close → item detail.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Make offer (505:7083)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-7083)

**Inputs:** amount_minor or preset, offer decision/parent ID for counter.
**Displayed:** asking price/unit/currency, offered amount, submit enabled/disabled.
**API contracts:** `/api/listings/{listing_id}/offers/`, `/api/offers/{offer_id}/`.
**Buttons/destinations:** Submit → conversation; Accept/decline → status message; Close → detail/conversation.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Make offer - Button activated (505:7180)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-7180)

**Inputs:** amount_minor or preset, offer decision/parent ID for counter.
**Displayed:** asking price/unit/currency, offered amount, submit enabled/disabled.
**API contracts:** `/api/listings/{listing_id}/offers/`, `/api/offers/{offer_id}/`.
**Buttons/destinations:** Submit → conversation; Accept/decline → status message; Close → detail/conversation.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Counter offer (505:7465)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-7465)

**Inputs:** amount_minor or preset, offer decision/parent ID for counter.
**Displayed:** asking price/unit/currency, offered amount, submit enabled/disabled.
**API contracts:** `/api/listings/{listing_id}/offers/`, `/api/offers/{offer_id}/`.
**Buttons/destinations:** Submit → conversation; Accept/decline → status message; Close → detail/conversation.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Report ad - Message sent (503:6738)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=503-6738)

**Inputs:** listing_id, reason, message.
**Displayed:** report input, sent/failed feedback.
**API contracts:** `/api/reports/`.
**Buttons/destinations:** Send → message-sent state; Failure → preserve text/retry; Close → item detail.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Message sent (505:6881)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-6881)

**Inputs:** text, photo_id, offer decision.
**Displayed:** private messages, offer amount/status, listing summary, member name/photo.
**API contracts:** `/api/conversations/{conversation_id}/messages/`, `/api/offers/{offer_id}/`.
**Buttons/destinations:** Send → appended message; Offer decision → updated conversation; Info → thread information; Back → inbox.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Message sent (505:6936)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-6936)

**Inputs:** text, photo_id, offer decision.
**Displayed:** private messages, offer amount/status, listing summary, member name/photo.
**API contracts:** `/api/conversations/{conversation_id}/messages/`, `/api/offers/{offer_id}/`.
**Buttons/destinations:** Send → appended message; Offer decision → updated conversation; Info → thread information; Back → inbox.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Buyer - Yard sale (487:14554)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=487-14554)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes.purchased_price_minor, seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Buyer - Pet sitting (507:8747)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=507-8747)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes.cats, attributes.dogs, attributes.birds, attributes.fish, attributes.service_types, attributes.other, attributes.ad_type, attributes.price_max_minor, seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Buyer - Pets (527:9229)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9229)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes.pet_age, attributes.pet_age_unit, attributes.cats, attributes.dogs, attributes.birds, attributes.fish, attributes.other, attributes.ad_type, seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Buyer - Tickets (527:9489)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9489)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes.dates, attributes.ticket_type, attributes.ticket_count, attributes.other, seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Buyer - Property for sale (507:8951)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=507-8951)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes.property_type, attributes.bedrooms, attributes.bathrooms, attributes.surface_m2, attributes.amenities, attributes.other, seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Buyer - Property to rent (527:9045)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9045)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes.property_type, attributes.bedrooms, attributes.bathrooms, attributes.minimum_stay_months, attributes.furnished, attributes.amenities, attributes.other, seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Buyer - Holiday home (527:9587)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9587)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes.bedrooms, attributes.bathrooms, attributes.amenities, attributes.other, attributes.minimum_stay_nights, seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Buyer - Cars (527:9676)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9676)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes.vehicle_type, attributes.year, attributes.mileage_km, seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Buyer - Private catering (527:9855)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9855)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes.event_types, attributes.guests, attributes.price_max_minor, attributes.ad_type, attributes.other, seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Buyer - Nanny/Au pair (530:9960)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=530-9960)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes.service_types, attributes.price_max_minor, attributes.ad_type, attributes.other, seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Buyer - Jobs (530:10078)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=530-10078)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes.price_max_minor, attributes.ad_type, seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Buyer - Boats (527:9766)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9766)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes.vehicle_type, attributes.year, attributes.mileage_km, seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Buyer - Room for rent (527:9140)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9140)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes.tenants, attributes.minimum_stay_months, attributes.amenities, attributes.other, seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Detail page - Buyer (505:6998)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-6998)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes (category-specific; see contracts.md), seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Sold (503:6404)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=503-6404)

**Inputs:** selected photo/index (local), favourite toggle.
**Displayed:** listing common fields, attributes (category-specific; see contracts.md), seller public profile, similar/member items, sold status.
**API contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Message → listing conversation; Make offer → amount sheet; Report → report entry; Seller/member item → corresponding detail; Favourite → saved state.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Inbox - Landing page (503:6599)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=503-6599)

**Inputs:** None (UI/reference state).
**Displayed:** conversation summaries.
**API contracts:** `/api/conversations/`.
**Buttons/destinations:** Conversation → messages; Back → Home.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Messages (503:6804)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=503-6804)

**Inputs:** text, photo_id, offer decision.
**Displayed:** private messages, offer amount/status, listing summary, member name/photo.
**API contracts:** `/api/conversations/{conversation_id}/messages/`, `/api/offers/{offer_id}/`.
**Buttons/destinations:** Send → appended message; Offer decision → updated conversation; Info → thread information; Back → inbox.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Offer accepted (505:7542)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-7542)

**Inputs:** text, photo_id, offer decision.
**Displayed:** private messages, offer amount/status, listing summary, member name/photo.
**API contracts:** `/api/conversations/{conversation_id}/messages/`, `/api/offers/{offer_id}/`.
**Buttons/destinations:** Send → appended message; Offer decision → updated conversation; Info → thread information; Back → inbox.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## buy: Info icon - Top right corner (505:7628)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-7628)

**Inputs:** text, photo_id, offer decision.
**Displayed:** private messages, offer amount/status, listing summary, member name/photo.
**API contracts:** `/api/conversations/{conversation_id}/messages/`, `/api/offers/{offer_id}/`.
**Buttons/destinations:** Send → appended message; Offer decision → updated conversation; Info → thread information; Back → inbox.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Profile - Selling (295:17256)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-17256)

**Inputs:** status tab, listing selection.
**Displayed:** own listings/status cards.
**API contracts:** `/api/me/listings/`.
**Buttons/destinations:** Item → seller detail; Status tab → filtered history; Back → profile.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Get verified (535:12580)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12580)

**Inputs:** request verification action.
**Displayed:** verification state pending.
**API contracts:** `/api/me/verification/`.
**Buttons/destinations:** Request → pending state; Back → selling.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Profile - Buying (535:12359)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12359)

**Inputs:** purchase/favourite tab.
**Displayed:** purchase history/favourites.
**API contracts:** `/api/me/purchases/`, `/api/favourites/`.
**Buttons/destinations:** Item → buyer detail; Favourites → saved list; Settings tab → settings.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Profile - Settings (404:7256)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-7256)

**Inputs:** menu selection (local).
**Displayed:** profile settings menu.
**API contracts:** `/api/me/`.
**Buttons/destinations:** Choose setting → corresponding settings screen; Selling/Buying tab → corresponding profile section.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Log out (535:12146)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12146)

**Inputs:** local confirmation.
**Displayed:** logout prompt.
**API contracts:** `/api/logout/`.
**Buttons/destinations:** Confirm → revoke session → splash; Cancel → settings.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Active listings (433:6350)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-6350)

**Inputs:** status tab, listing selection.
**Displayed:** own listings/status cards.
**API contracts:** `/api/me/listings/`.
**Buttons/destinations:** Item → seller detail; Status tab → filtered history; Back → profile.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Your categories (535:13308)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-13308)

**Inputs:** category_ids (ordered).
**Displayed:** category options/selected chips.
**API contracts:** `/api/categories/`, `/api/me/`.
**Buttons/destinations:** Save → profile/Home; Back → profile.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Sold (535:12985)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12985)

**Inputs:** status tab, listing selection.
**Displayed:** own listings/status cards.
**API contracts:** `/api/me/listings/`.
**Buttons/destinations:** Item → seller detail; Status tab → filtered history; Back → profile.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Deleted (535:13062)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-13062)

**Inputs:** status tab, listing selection.
**Displayed:** own listings/status cards.
**API contracts:** `/api/me/listings/`.
**Buttons/destinations:** Item → seller detail; Status tab → filtered history; Back → profile.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Pause (535:13141)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-13141)

**Inputs:** status tab, listing selection.
**Displayed:** own listings/status cards.
**API contracts:** `/api/me/listings/`.
**Buttons/destinations:** Item → seller detail; Status tab → filtered history; Back → profile.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Favourites (535:12669)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12669)

**Inputs:** favourite removal/listing_id.
**Displayed:** favourite cards/unavailable state.
**API contracts:** `/api/favourites/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Item → detail; Remove → refreshed favourites; Back → buying.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Item removed (535:12874)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12874)

**Inputs:** favourite removal/listing_id.
**Displayed:** favourite cards/unavailable state.
**API contracts:** `/api/favourites/`, `/api/favourites/{listing_id}/`.
**Buttons/destinations:** Item → detail; Remove → refreshed favourites; Back → buying.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Swap cities (533:10650)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-10650)

**Inputs:** city_id.
**Displayed:** city options/selection.
**API contracts:** `/api/cities/`, `/api/me/`.
**Buttons/destinations:** Confirm → Home in chosen city; Cancel → settings.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Contact us (533:11232)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11232)

**Inputs:** topic=contact/feedback, text, photo_id.
**Displayed:** concierge messages.
**API contracts:** `/api/conversations/`, `/api/conversations/{conversation_id}/messages/`.
**Buttons/destinations:** Send → acknowledgement; Back → settings.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Delete account (535:12275)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12275)

**Inputs:** confirmation=DELETE, reason.
**Displayed:** delete prompt.
**API contracts:** `/api/me/`.
**Buttons/destinations:** Confirm → account soft deletion → splash; Cancel → settings.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Push notifications (533:11345)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11345)

**Inputs:** notifications_enabled, device permission (local).
**Displayed:** notification preferences.
**API contracts:** `/api/me/`.
**Buttons/destinations:** Save → settings.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Your sponsors (535:12089)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12089)

**Inputs:** None (UI/reference state).
**Displayed:** accepted sponsors/member display names.
**API contracts:** `/api/sponsorships/`.
**Buttons/destinations:** Member → public profile; Back → settings.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Terms of service (535:12440)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12440)

**Inputs:** None (UI/reference state).
**Displayed:** legal title/body/version.
**API contracts:** `/api/legal/{document}/`.
**Buttons/destinations:** Back → settings.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Personal info (533:11423)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11423)

**Inputs:** None (UI/reference state).
**Displayed:** first_name, last_name, phone, email, photo_id.
**API contracts:** `/api/me/`.
**Buttons/destinations:** Edit field/photo → matching editor; Back → settings.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Edit photo - options (535:12003)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12003)

**Inputs:** image source/bytes, local crop/zoom, photo_id.
**Displayed:** photo picker/preview.
**API contracts:** `/api/media/`, `/api/me/`.
**Buttons/destinations:** Save/replace → personal info; Cancel → personal info.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Edit photo (535:12047)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12047)

**Inputs:** image source/bytes, local crop/zoom, photo_id.
**Displayed:** photo picker/preview.
**API contracts:** `/api/media/`, `/api/me/`.
**Buttons/destinations:** Save/replace → personal info; Cancel → personal info.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Edit first/last name/email (533:11502)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11502)

**Inputs:** first_name, last_name, email.
**Displayed:** current values, validation.
**API contracts:** `/api/me/`.
**Buttons/destinations:** Save → personal info; Back → personal info.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Edit phone number (533:11549)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11549)

**Inputs:** phone/dial code, challenge_id/code.
**Displayed:** phone value, verification destination, resend deadline, errors.
**API contracts:** `/api/auth/challenges/`, `/api/auth/verify/`, `/api/auth/challenges/{challenge_id}/resend/`.
**Buttons/destinations:** Save → challenge → verify → personal info; Resend → same code screen; Cancel → personal info.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Enter code (533:11798)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11798)

**Inputs:** phone/dial code, challenge_id/code.
**Displayed:** phone value, verification destination, resend deadline, errors.
**API contracts:** `/api/auth/challenges/`, `/api/auth/verify/`, `/api/auth/challenges/{challenge_id}/resend/`.
**Buttons/destinations:** Save → challenge → verify → personal info; Resend → same code screen; Cancel → personal info.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

## profile: Share feedback (533:11289)
[Figma state](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11289)

**Inputs:** topic=contact/feedback, text, photo_id.
**Displayed:** concierge messages.
**API contracts:** `/api/conversations/`, `/api/conversations/{conversation_id}/messages/`.
**Buttons/destinations:** Send → acknowledgement; Back → settings.

**Evidence:** frame metadata; flow-level visual review. Source labels inventoried; generic component text slots and product requiredness need confirmation.

