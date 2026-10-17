# Mobile screen checklist and flow contracts

209 mobile-sized frames inventoried across seven feature pages. Each state below has an exact Figma link. Empty/filled/error variants are grouped. This is the full metadata inventory, not a claim that every generic component text slot was visually verified. Rendered text was inspected for core flows; the connector reached its account quota during deeper extraction.

**Review status:** frame discovery complete; proposed contracts implemented; unresolved component copy, exact required fields and product rules still require confirmation. No desktop screens or archived alternatives are implementation requirements. Email-client frames are external/reference previews. Inputs, UI behavior and navigation below are explicit proposals where the design does not define them.

**Common loading/failure/empty behavior:** see [contracts.md](contracts.md#shared-behavior). UI-only screens/controls do not get redundant endpoints. The API schema is authoritative for proposed field types/requiredness, while the Figma remains the visual source.

## Authentication and onboarding
[Figma page](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6642)

**Proposed inputs:** username/password (brief alternative), phone country/dial code and number, six-digit verification code, location/city, email, first_name, last_name, category_ids, profile photo, message consent, notification preference, house rules acceptance.

**Displayed fields:** onboarding progress, verification destination, resend countdown, field errors, selected categories, profile photo preview.

**Buttons and destinations:** Next → next incomplete onboarding step; Resend → same code screen with new deadline; Back/close → preceding screen or splash; Save photo → onboarding completion; Sign in → existing-account method; Terms/Cookies → legal sheet.

**Shared route contracts:** `/api/signup/`, `/api/login/`, `/api/auth/challenges/`, `/api/auth/verify/`, `/api/me/`, `/api/categories/`, `/api/cities/`, `/api/countries/`, `/api/legal/{document}/`. See [contracts.md](contracts.md) for methods, models, success/error responses and navigation.

### Phone - Sign in

- [x] Inventoried [Phone - Sign in - Empty field — 295:6643](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6643)
- [x] Inventoried [Phone - Sign in - Filled in — 295:6977](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6977)

**Source text-layer labels/slots:** Header Text; Subtitle.

**Additional rendered labels inspected:** Phone number; UK +44; 20 7123 4567; 5:13; 76; May we have your number please?; We only ask to verify it’s you. It won’t be displayed anywhere, including your profile.; Next.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Step 1 - Phone Number

- [x] Inventoried [Step 1 - Phone Number - Empty — 295:6654](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6654)
- [x] Inventoried [Step 1 - Phone Number - Filled in — 295:6988](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6988)

**Source text-layer labels/slots:** Question; Description.

**Additional rendered labels inspected:** Phone number; UK +44; 23 6813 4583; 5:13; 76; May we have your number?; By entering your phone number, you agree to receive texts about your account, like verification codes, account alerts, and updates.; Next.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Email - Sign in

- [x] Inventoried [Email - Sign in - Empty field — 295:6666](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6666)
- [x] Inventoried [Email - Sign in - Filled in — 295:6677](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6677)
- [x] Inventoried [Email - Sign in - Error — 295:6689](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6689)

**Source text-layer labels/slots:** Title; Subtitle; Subheading.

**Additional rendered labels inspected:** 5:13; 76; May we have your email please?; We only ask to verify it’s you. It won’t be displayed anywhere, including your profile.; Email; [sample email omitted]; Next.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Step 3 - Email

- [x] Inventoried [Step 3 - Email - Empty — 295:6701](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6701)
- [x] Inventoried [Step 3 - Email - Filled in — 295:6964](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6964)

**Source text-layer labels/slots:** Title; Description.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Step 6 - Profile picture

- [x] Inventoried [Step 6 - Profile picture - Empty — 295:6714](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6714)
- [x] Inventoried [Step 6 - Profile picture - Filled in — 295:6731](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6731)
- [x] Inventoried [Step 6 - Profile picture - Empty — 295:6750](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6750)

**Source text-layer labels/slots:** Title; Description; Upload Photo Text; Step Description.

**Additional rendered labels inspected:** 5:13; 76; Last step. Add your recent photo; A clear photo, helps build trust with other members. We recommend a face photo.; Upload your photo; Save.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Step 4 - Name

- [x] Inventoried [Step 4 - Name - Empty — 295:6768](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6768)
- [x] Inventoried [Step 4 - Name - Filled in — 295:6782](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6782)

**Source text-layer labels/slots:** Title; Description.

**Additional rendered labels inspected:** 5:13; 76; Now, let’s get more personal; Only the first letter of your last name will be shown on your profile.; First name; Last name; Next; “The”; the; to; q; w; e; r; t; y; u; i; o; p; a; s; d; f; g; h; j; k; l; z; x; c; v; b; n; m; ABC.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Step 5 - Choose Categories

- [x] Inventoried [Step 5 - Choose Categories - Empty — 295:6796](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6796)
- [x] Inventoried [Step 5 - Choose Categories - Filled — 295:6936](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-6936)

**Source text-layer labels/slots:** Heading; Subheading; Category header.

**Additional rendered labels inspected:** 5:13; 76; Which categories are you interested in John?; So we know whether to send Tiktoks or newspaper clip pings.; Category name 1A; Category 1; Category 2; Category 3; Next.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Enter your code

- [x] Inventoried [Enter your code — 295:7000](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7000)
- [x] Inventoried [Enter your code — 295:7013](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7013)

**Source text-layer labels/slots:** Title; Subtitle; Help Text; Subheading.

**Additional rendered labels inspected:** Enter code; 0; 5:13; 76; Enter your code; Code sent to: [sample phone omitted]; Next; Haven’t received your code?; Resend code; Code sent to: [sample email omitted].

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Invalid code

- [x] Inventoried [Invalid code — 295:7026](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7026)

**Source text-layer labels/slots:** Title; Subtitle; Help Text.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Code filled in

- [x] Inventoried [Code filled in — 295:7039](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7039)
- [x] Inventoried [Code filled in — 295:7052](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7052)
- [x] Inventoried [Code filled in — 295:7066](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7066)

**Source text-layer labels/slots:** Title; Subtitle; Help Text; Subheading; Text Link.

**Additional rendered labels inspected:** 5:13; 76; Enter your code; Code sent to: [sample phone omitted]; Enter code; 4; 9; 5; 8; 7; Next; Haven’t received your code?; Resend code; Code sent to: [sample email omitted].

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Contries table

- [x] Inventoried [Contries table — 295:7110](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7110)

**Source text-layer labels/slots:** Title; CountryName; DialCode; Alphabet.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Inbox - Gmail - Landing page

- [x] Inventoried [Inbox - Gmail - Landing page — 295:7160](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7160) **External/reference preview.**

**Source text-layer labels/slots:** Search Placeholder; Primary Label; Notification Count; Label.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Welcome Email

- [x] Inventoried [Welcome Email — 295:7203](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7203) **External/reference preview.**

**Source text-layer labels/slots:** Search Placeholder; Primary Label; Notification Count; Label.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Inbox - Gmail - Email with code

- [x] Inventoried [Inbox - Gmail - Email with code — 295:7246](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7246) **External/reference preview.**
- [x] Inventoried [Inbox - Gmail - Email with code — 295:7312](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7312) **External/reference preview.**
- [x] Inventoried [Inbox - Gmail - Email with code — 295:7379](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7379) **External/reference preview.**

**Source text-layer labels/slots:** Email Subject; Headline; Greeting and Instructions; Code; Footer Text; Yours truly; Reply Text; Forward Text; Email title; Email subtitle; Email message; Support email.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Step 2 - Location Selected

- [x] Inventoried [Step 2 - Location Selected — 295:7442](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7442)

**Source text-layer labels/slots:** Header; Subheader.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Notifications

- [x] Inventoried [Notifications — 295:7453](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7453)

**Source text-layer labels/slots:** Title; Description.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### House rules

- [x] Inventoried [House rules — 295:7467](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-7467)

**Source text-layer labels/slots:** Title; Subtitle; Instruction 1; Instruction 2; Instruction 3.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Splash Screen - Pics

- [x] Inventoried [Splash Screen - Pics — 295:9927](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-9927)

**Source text-layer labels/slots:** Tagline Text; Terms text.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sign in options

- [x] Inventoried [Sign in options — 295:9957](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-9957)

**Source text-layer labels/slots:** Terms text; Tagline Text.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Splash Screen - Video

- [x] Inventoried [Splash Screen - Video — 546:2988](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=546-2988)

**Source text-layer labels/slots:** This frame uses nested components; use the shared display/input contract above and the linked visual source..

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Terms of Service

- [x] Inventoried [Terms of Service — 295:9989](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-9989)

**Source text-layer labels/slots:** CTA Description; Tagline Text; Title Text; Effective Date; Summary Text; Membership Text; User Conduct Text; Listings Content Text.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Cookie Policy

- [x] Inventoried [Cookie Policy — 295:10046](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-10046)

**Source text-layer labels/slots:** CTA Description; Tagline Text; Popup Title; Consent Control Text; Cookies Analytics Text; Introduction Text.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Popup Container

- [x] Inventoried [Popup Container — 586:7322](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=586-7322) **External/reference preview.**
- [x] Inventoried [Popup Container — 586:7384](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=586-7384) **External/reference preview.**

**Source text-layer labels/slots:** Title Text; Effective Date; Summary Text; Membership Text; User Conduct Text; Listings Content Text; Popup Title; Consent Control Text; Cookies Analytics Text; Introduction Text.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

## Home and inbox
[Figma page](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=0-1)

**Proposed inputs:** selected category, latest/preferred tab, notification permission choice.

**Displayed fields:** greeting, listing cards: ID/title/photo/price/unit/category/location, sponsors needed, unread count, yard sale countdown, empty category.

**Buttons and destinations:** Card → buyer detail; Search → items/members search; Find sponsors → suggestions; Allow notifications → OS prompt and stored preference; Bell → messages/notifications; Notification → target detail; Bottom tabs → Home/Concierge/Sell/Yard sale/Profile.

**Shared route contracts:** `/api/feed/`, `/api/listings/{listing_id}/`, `/api/notifications/`, `/api/notifications/{notification_id}/read/`, `/api/conversations/`, `/api/me/`. See [contracts.md](contracts.md) for methods, models, success/error responses and navigation.

### Home - All categories

- [x] Inventoried [Home - All categories — 295:10258](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-10258)

**Source text-layer labels/slots:** Notifications switched off; Find sponsors; Allow Notifications; Good afternoon Charlie; London; Property for sale; All; Latest posts; Room for rent; Holiday home; Your categories; Villa with 6 bedroom in Sicily with view over the river Ca...; Tickets; Property for rent; Wimbledon; Sicily; Home; Concierge; Sell; Yard Sale; Profile.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Item clicked on

- [x] Inventoried [Item clicked on — 487:14727](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=487-14727)

**Source text-layer labels/slots:** Notifications switched off; Find sponsors; Allow Notifications; Good afternoon Charlie; London; Property for sale; All; Latest posts; Room for rent; Holiday home; Your categories; Villa with 6 bedroom in Sicily with view over the river Ca...; Tickets; Property for rent; Wimbledon; Sicily; Home; Concierge; Sell; Yard Sale; Profile.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### No notifications

- [x] Inventoried [No notifications — 295:10768](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-10768)

**Source text-layer labels/slots:** Good afternoon Charlie; Property for sale; All; Latest posts; Room for rent; Holiday home; Your categories; Villa with 6 bedroom in Sicily with view over the river Ca...; Tickets; Property for rent; Wimbledon; Sicily; Home; Concierge; Sell; Yard Sale; Profile; London.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Category empty

- [x] Inventoried [Category empty — 295:11082](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-11082)

**Source text-layer labels/slots:** Good afternoon Charlie; Property for sale; Room for rent; Holiday home; Tickets; Holidays home; Members have yet to publish in this category. Be the first.; We’re on it; Start renting; Home; Concierge; Sell; Yard Sale; Profile; London.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Notification

- [x] Inventoried [Notification — 295:11161](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-11161)

**Source text-layer labels/slots:** Home; Favorites; Sell; Yard Sale; Profile; Good afternoon Charlie; Property for sale; Rooms for rent; Holiday home; Tickets; Holidays home; This service is not available yet in your area.; We’re on it; Start selling; You’re almost there!; Find Sponsors; London.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Yard sale countdown

- [x] Inventoried [Yard sale countdown — 295:11223](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-11223)

**Source text-layer labels/slots:** Good afternoon Charlie; Property for sale; All; Latest posts; Room for rent; Holiday home; Your categories; Villa with 6 bedroom in Sicily with view over the river Ca...; Yard sale starts in:; :; Tickets; Property for rent; Wimbledon; Sicily; Home; Concierge; Sell; Yard Sale; Profile; London.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Messages

- [x] Inventoried [Messages — 295:11463](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-11463)

**Source text-layer labels/slots:** Notifications; Messages; When you buy or sell, this is where you’ll chat.; Chat. Deal. Everyone’s happy; Find sponsors; Home; Concierge; Sell; Yard Sale; Profile.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Notifications - Unread

- [x] Inventoried [Notifications - Unread — 295:11514](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-11514)
- [x] Inventoried [Notifications - Unread — 295:11541](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-11541)

**Source text-layer labels/slots:** Notifications; Messages; Welcome to Guilliam’s House, a marketplace you can trust..

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Notifications - Detail page

- [x] Inventoried [Notifications - Detail page — 295:12228](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-12228)

**Source text-layer labels/slots:** Notifications; Section Header; Feature Number; Feature Title; Claim.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Allow notifications

- [x] Inventoried [Allow notifications — 295:12257](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-12257)

**Source text-layer labels/slots:** Property for sale; Private catering; Joanna D.; Paul F.; Home; Favorite; Sell; Yard Sale; Profile; Choose your cookies.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

## Sponsorship
[Figma page](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-10256)

**Proposed inputs:** member search, selected sponsor_id, relationship, accept/decline decision.

**Displayed fields:** suggested members, contact connection simulated status, requests sent, approvals count/required count, request status, review profile/name/photo, confirmation or empty state.

**Buttons and destinations:** Connect/update contacts → local permission/simulated suggestions; Send request → confirmation → sent; View statuses → requests list; Review profile → accept/decline → confirmation; Sponsor back → inverse request flow; Done → Home or remaining requests.

**Shared route contracts:** `/api/sponsors/suggestions/`, `/api/sponsorships/`, `/api/sponsorships/{sponsorship_id}/`, `/api/members/{member_id}/`, `/api/notifications/`. See [contracts.md](contracts.md) for methods, models, success/error responses and navigation.

### Search - Members - 3 sponsors

- [x] Inventoried [Search - Members - 3 sponsors — 295:14669](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14669)

**Source text-layer labels/slots:** Search items and members; Items; Members; Connect your address book to find suggestions.; Connect phone contacts; Search 3 sponsors among your loved ones.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Phone contacts connected

- [x] Inventoried [Phone contacts connected — 295:14696](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14696)

**Source text-layer labels/slots:** Search items and members; Items; Members; Connect your address book to find suggestions.; Search 3 sponsors among your loved ones; Connect phone contacts; Updated 15/07 at 15:09.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sponsors suggestions

- [x] Inventoried [Sponsors suggestions — 295:14725](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14725)

**Source text-layer labels/slots:** Search items and members; Items; Members; Suggestions; Sponsorship requests; [sample member]; Phone contacts; Update contacts; View statuses.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Request sent

- [x] Inventoried [Request sent — 295:14800](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14800)

**Source text-layer labels/slots:** Search items and members; Items; Members; Suggestions; Sponsorship requests; [sample member]; Phone contact; View more suggestions; View statuses.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sponsorship requests statuses

- [x] Inventoried [Sponsorship requests statuses — 295:14907](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14907)

**Source text-layer labels/slots:** [sample member]; Phone contact - Sent 10 min ago; Phone contact- Sent 5 days ago; Phone contact - Sent 5 days ago; Phone contact - Sent 1 week ago; Phone contact - Sent 3 days ago; PENDING; UNAIVALABLE; APPROVED; Sponsorship requests.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### View Statuses - No requests sent

- [x] Inventoried [View Statuses - No requests sent — 433:4002](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-4002)

**Source text-layer labels/slots:** [sample member]; Sponsorship requests; This is where you’ll see your sponsorship statuses.; Send requests.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### No suggestions

- [x] Inventoried [No suggestions — 295:14946](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14946)

**Source text-layer labels/slots:** Search items and members; Items; Members; Reach out to your network; Share; Suggestions; Sponsorship requests; View statuses; Update contacts.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Send request

- [x] Inventoried [Send request — 295:14992](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-14992)

**Source text-layer labels/slots:** Search items and members; Items; Members; Suggestions; [sample member]; Phone contacts; Instagram contacts; View more suggestions; Send request to [sample member]; Your sponsor is waiting for your request.; Sponsorship requests; View statuses.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Dashboard - Request sent

- [x] Inventoried [Dashboard - Request sent — 295:15074](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15074)

**Source text-layer labels/slots:** Search items and members; Items; Members; Suggestions; [sample member]; Phone contacts; Instagram contacts; View more suggestions; Request sent to [sample member]; Sponsorship requests; View statuses; Done.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Allow access to contacts

- [x] Inventoried [Allow access to contacts — 295:15157](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15157)

**Source text-layer labels/slots:** Search items and members; Items; Members; Connect your address book to find suggestions.; Connect phone contacts; Connect Instagram contacts; Search 3 sponsors among your loved ones; Choose your cookies.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Email - Sponsorship

- [x] Inventoried [Email - Sponsorship — 295:15193](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15193) **External/reference preview.**

**Source text-layer labels/slots:** Email Subject; Headline; Greeting and Instructions; Footer Text; Find more sponsors; Yours truly; Reply Text; Forward Text.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Email - Sponsor back

- [x] Inventoried [Email - Sponsor back — 404:6640](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-6640) **External/reference preview.**

**Source text-layer labels/slots:** Email Subject; Headline; Greeting and Instructions; Footer Text; Sponsor back; Yours truly; Reply Text; Forward Text.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Email - Sponsor

- [x] Inventoried [Email - Sponsor — 295:15258](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15258) **External/reference preview.**

**Source text-layer labels/slots:** Email Subject; Headline; Greeting and Instructions; Footer Text; Review profile; Yours truly; Reply Text; Forward Text.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Inbox - Sponsorship

- [x] Inventoried [Inbox - Sponsorship — 295:15439](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15439)
- [x] Inventoried [Inbox - Sponsorship — 295:15482](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15482)

**Source text-layer labels/slots:** Search Placeholder; Primary Label; Notification Count; Label.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Notification - Sponsorship

- [x] Inventoried [Notification - Sponsorship — 295:15525](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15525)

**Source text-layer labels/slots:** Notifications; Messages; Welcome to Guilliam’s House, a marketplace you can trust..

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sponsor back - Notification

- [x] Inventoried [Sponsor back - Notification — 404:6559](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-6559)

**Source text-layer labels/slots:** Notifications; Messages; Great news! [sample member] has sponsored you. Sponsor back.; Welcome to Guilliam’s House, a marketplace you can trust..

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Notification - Sponsor

- [x] Inventoried [Notification - Sponsor — 295:15558](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15558)

**Source text-layer labels/slots:** Notifications; Messages.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Review profile - 1 profile

- [x] Inventoried [Review profile - 1 profile — 295:15585](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15585)

**Source text-layer labels/slots:** Review profile; Sponsor; Decline; [sample member]; London; Greeting and Instructions; Colleague; Relationship.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Review profile

- [x] Inventoried [Review profile — 404:6603](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-6603)

**Source text-layer labels/slots:** Review profile; Sponsor; Decline; [sample member]; London; Greeting and Instructions; Colleague; Relationship.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sponsorship accepted

- [x] Inventoried [Sponsorship accepted — 295:15604](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15604)

**Source text-layer labels/slots:** Review profile; You’re up to date with all your sponsorship requests.; All good for now; Back home; Sponsorship confirmed; Thank you for trusting your [relationship].; Done.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sponsorship declined

- [x] Inventoried [Sponsorship declined — 295:15622](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15622)

**Source text-layer labels/slots:** Review profile; You’re up to date with all your sponsorship requests.; All good for now; Back home; Done; Sponsorship declined; The person won’t be notified. Don’t worry..

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Requests up to date

- [x] Inventoried [Requests up to date — 295:15640](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15640)

**Source text-layer labels/slots:** Review profile; You’re up to date with all your sponsorship requests.; All good for now; Back home.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Review profile - 3 profiles

- [x] Inventoried [Review profile - 3 profiles — 295:15652](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-15652)

**Source text-layer labels/slots:** Review profile; Sponsor; Decline; [sample member]; London; Greeting and Instructions; Colleague; Relationship.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Home -  1 sponsor left

- [x] Inventoried [Home -  1 sponsor left — 404:6448](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-6448)

**Source text-layer labels/slots:** Notifications switched off; Find sponsors; Allow Notifications; Good afternoon Charlie; Property for sale; All; Latest posts; Rooms for rent; Holidays home; Your categories; Villa with 6 bedroom in Sicily with view over the river Ca...; Tickets; Property for rent; Wimbledon; Sicily; Home; Concierge; Sell; Yard Sale; Profile.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Home - Sponsor - 1 request

- [x] Inventoried [Home - Sponsor - 1 request — 404:7145](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-7145)

**Source text-layer labels/slots:** Good afternoon Charlie; Property for sale; All; Latest posts; Rooms for rent; Holidays home; Your categories; Villa with 6 bedroom in Sicily with view over the river Ca...; Tickets; Property for rent; Wimbledon; Sicily; Home; Concierge; Sell; Yard Sale; Profile; Review profile; London.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

## Search and category discovery
[Figma page](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16551)

**Proposed inputs:** q, items/members tab, category_id, city_id/location, min_price/max_price, category-specific typed filters, date selections, individual filter-chip removals.

**Displayed fields:** recent/popular/suggested queries, member names/photos/sponsor counts, result count/cards, selected filters, empty category/no results, top picks, yard sale registration status.

**Buttons and destinations:** Search/keyboard submit → results; Category → category listing/filter; Filter → filter sheet; Apply → results with chips; Calendar Apply/Cancel → filter sheet; Remove chip → refreshed results; Member → public profile; Item → buyer detail; Back/clear → search landing; Register → registration success/closed state.

**Shared route contracts:** `/api/listings/`, `/api/search/suggestions/`, `/api/members/`, `/api/categories/`, `/api/cities/`, `/api/yard-sales/current/`, `/api/yard-sales/{sale_id}/register/`. See [contracts.md](contracts.md) for methods, models, success/error responses and navigation.

### Search results

- [x] Inventoried [Search results — 295:16552](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16552)
- [x] Inventoried [Search results — 406:7646](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=406-7646)
- [x] Inventoried [Search results — 406:7983](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=406-7983)
- [x] Inventoried [Search results — 417:8111](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-8111)
- [x] Inventoried [Search results — 417:9037](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-9037)
- [x] Inventoried [Search results — 736:5762](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=736-5762)
- [x] Inventoried [Search results — 736:5956](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=736-5956)

**Source text-layer labels/slots:** property for sale; Filters; Flat; London; Property for sale; property to rent; Property to rent; room for rent; Double room. Flat sharing with 2 other tenants.; EW1 2QQ; Room for rent; holiday home; Holiday home; Post code (Surrey); tickets; Tickets; Top west end show. Disney’s The Lion king; WC1N 3JJ (Covent Garden); pets; Pets; Selling; Miniature daschund puppies.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Top picks template

- [x] Inventoried [Top picks template — 433:5551](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-5551)

**Source text-layer labels/slots:** property for sale; Filters; Top picks; Property for sale.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### No results

- [x] Inventoried [No results — 295:16640](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16640)

**Source text-layer labels/slots:** property for sale in Cornwall; Filters; We’re not getting any results; Flat; Cornwall.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Search - Items

- [x] Inventoried [Search - Items — 295:16689](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16689)

**Source text-layer labels/slots:** Search items and members; Property for sale; Rooms for rent; Cars & boat; Pets; Private catering; Pet sitting; Property for rent; Holidays home; Yard sale; Tickets; Nanny/Au pair; Jobs; Items; Members.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Filter — Property for sale

- [x] Inventoried [Filter — 295:16754](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16754)

**Source text-layer labels/slots:** House; Bedrooms; Garden; Parking; Bathrooms; Flat; Land; The team’s top property for sale picks; Minimum; Maximum; Price; Property type; Rooms and beds; Amenities; Surface; Location; m2; Property for sale; Section Header; Search; London.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Filter — Holiday home

- [x] Inventoried [Filter — 417:8665](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-8665)

**Source text-layer labels/slots:** The team’s top holiday home picks; Minimum; Maximum; Price; Location; Holiday home; Section Header; Search; London; Bedrooms; Beds; Rooms and beds; Parking; Barbecue; Pets allowed; Swimming pool; Beach front; Water front; Air con; Amenities.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Filter - Boats selected

- [x] Inventoried [Filter - Boats selected — 417:9331](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-9331)

**Source text-layer labels/slots:** Minimum; Maximum; Year; Location; Cars & Boats; Search; London; Section Header; The team’s top cars & boats picks; Cars; Boats; Type; Mileage; km.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Filter - Cars selected

- [x] Inventoried [Filter - Cars selected — 457:10733](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-10733)

**Source text-layer labels/slots:** Minimum; Maximum; Year; Location; Cars & Boats; Search; London; Section Header; The team’s top cars & boats picks; Type; Cars; Boats; Mileage; km.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Filter — Property to rent

- [x] Inventoried [Filter — 406:7774](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=406-7774)

**Source text-layer labels/slots:** House; Bedrooms; Garden; Furnished; Unfurnished; Parking; Bathrooms; Flat; Land; The team’s top property to rent picks; Monthly price; Minimum stay; Property type; Rooms and beds; Amenities; Furniture; Location; months; Property to rent; Section Header; Search; London.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Filter — Room for rent

- [x] Inventoried [Filter — 417:8202](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-8202)

**Source text-layer labels/slots:** Tenants; Garden; Parking; En-suite; The team’s top room for rent picks; Monthly price; Minimum stay; How many tenants will you share the place with?; Amenities; Property location; months; Room for rent; Section Header; Search; EW1 2QQ; Furnished; Furniture; Unfurnished.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Filter — Tickets

- [x] Inventoried [Filter — 417:9512](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-9512)

**Source text-layer labels/slots:** Price range; Location; Tickets; Concert; Sport; Ticket type; Date; Search; London; Section Header; The team’s top tickets picks; Add dates.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Dates added

- [x] Inventoried [Dates added — 433:5882](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-5882)

**Source text-layer labels/slots:** Price range; Location; Tickets; Concert; Sport; Ticket type; Date; Search; London; Section Header; The team’s top tickets picks; Add dates.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Calendar opened

- [x] Inventoried [Calendar opened — 433:5761](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-5761)

**Source text-layer labels/slots:** Price range; Location; Tickets; Concert; Sport; Ticket type; Date; Search; London; Section Header; The team’s top tickets picks; Apply; Cancel.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Search - Opened

- [x] Inventoried [Search - Opened - No input — 295:16787](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16787)
- [x] Inventoried [Search - Opened - Type in — 295:16810](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16810)

**Source text-layer labels/slots:** Recent searches; Popular searches; Cars & boat; Directory; London, cars, min 4000£; London, electrician; Sailing boat with skipper; Tickets for Wimbledon final; Items; Members; du; Suggestions; Duplex in Property for sale; Duplex in Property for rent; Dutch painting.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Search - Members

- [x] Inventoried [Search - Members — 530:10164](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=530-10164)

**Source text-layer labels/slots:** do; Items; Members; Dorian A; Doremis P; Doremis K; Doreen K.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Type in location

- [x] Inventoried [Type in location — 404:5514](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-5514)

**Source text-layer labels/slots:** an; Suggestions; Angel neighbourhood; Angel street, EW 2QQ London; Annabel street, RW 1L4 London.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Property for sale

- [x] Inventoried [Property for sale — 295:16835](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-16835)

**Source text-layer labels/slots:** Good afternoon Charlie; Property for sale; All; Room for rent; Holiday home; +1000 results; Flat for sale. 2 beds. 80m2. Central London; House for sale. 5 beds with garden. Thames view; Post code (Wimbledon); Post code (Shoreditch); Wimbledon; Shoreditch; Filters; London; Home; Concierge; Sell; Yard Sale; Profile.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Holiday home

- [x] Inventoried [Holiday home — 417:8745](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-8745)

**Source text-layer labels/slots:** Good afternoon Charlie; Rooms for rent; Holiday home; Cars & Boat; Property to rent; +1000 results; House to rent in Surrey. 5 beds.; Post code (Surrey); Property for sale; Post code (Cornwall); Wimbledon; Shoreditch; Filters; London; Home; Concierge; Sell; Yard Sale; Profile.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Pet sitting

- [x] Inventoried [Pet sitting — 436:7307](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-7307)
- [x] Inventoried [Pet sitting — 457:11219](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-11219)

**Source text-layer labels/slots:** Good afternoon Charlie; Holiday home; Cars & Boat; Pet sitting; Private cat; Property to rent; London; Filters; Home; Concierge; Sell; Yard Sale; Profile.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Private catering

- [x] Inventoried [Private catering — 436:7745](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-7745)

**Source text-layer labels/slots:** Good afternoon Charlie; London; Cars & Boat; Pet sitting; Nanny/Au pair; Jobs; Private catering; Filters; Any price; Home; Concierge; Sell; Yard Sale; Profile.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Nanny/Au pair

- [x] Inventoried [Nanny/Au pair — 436:8404](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-8404)

**Source text-layer labels/slots:** Good afternoon Charlie; Cars & Boat; Pet sitting; Nanny/Au pair; Jobs; Private catering; London; Any price; Filters; Home; Concierge; Sell; Yard Sale; Profile.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Jobs

- [x] Inventoried [Jobs — 436:8671](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-8671)

**Source text-layer labels/slots:** Good afternoon Charlie; London; Home; Concierge; Sell; Yard Sale; Profile; Nanny/Au pair; Jobs; Pets; Yard sale; Private catering; +100 results; Manager in an asset management company; Bar tender at a 5 stars hotel in central London; Art dealer specialised in contemporary art; Internship in the AI space. Phd in Computer Science.; Hiring; Applying; N1 1BP (Angel).

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Pets

- [x] Inventoried [Pets — 436:9232](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-9232)

**Source text-layer labels/slots:** Good afternoon Charlie; Nanny/Au pair; Jobs; Pets; Yard sale; Private catering; London; Home; Concierge; Sell; Yard Sale; Profile; Pure British shorthair kittens, 2 boys & 2 girls.; Miniature dachshund puppies.; Afghan pigeons, with beautiful feathers; +100 results; Filters; N1 1BP (Angel).

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Yard sale

- [x] Inventoried [Yard sale — 453:9757](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=453-9757)

**Source text-layer labels/slots:** Good afternoon Charlie; London; Home; Concierge; Sell; Yard Sale; Profile; King size bed in oak wood. dark colour.; Set of 4 leather armchairs, well used.; Large dining room table, 200cmx130cm.; Painting 20th century. Unknown painter.; +100 results; N1 1BP (Angel); Nanny/Au pair; Jobs; Pets; Yard sale; Private catering.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Category empty

- [x] Inventoried [Category empty — 420:9637](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=420-9637)
- [x] Inventoried [Category empty — 436:9050](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-9050)
- [x] Inventoried [Category empty — 436:9131](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-9131)
- [x] Inventoried [Category empty — 436:7812](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-7812)
- [x] Inventoried [Category empty — 436:8469](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-8469)
- [x] Inventoried [Category empty — 436:8736](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-8736)
- [x] Inventoried [Category empty — 433:6500](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-6500)
- [x] Inventoried [Category empty — 433:6920](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-6920)
- [x] Inventoried [Category empty — 433:7208](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-7208)
- [x] Inventoried [Category empty — 433:6618](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-6618)
- [x] Inventoried [Category empty — 433:6831](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-6831)
- [x] Inventoried [Category empty — 433:6707](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-6707)

**Source text-layer labels/slots:** Good afternoon Charlie; Holiday home; Cars & Boat; Pet sitting; Private cat; Property to rent; London; Members have yet to publish in this category. Be the first.; Be the first; Start selling; Home; Concierge; Sell; Yard Sale; Profile; Nanny/Au pair; Jobs; Pets; Yard sale; Private catering; The best deals every sunday; Property for sale; All; Rooms for rent; Cars & Boats; Tickets; Start renting; Room for rent.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Registration closed

- [x] Inventoried [Registration closed — 453:9678](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=453-9678)

**Source text-layer labels/slots:** Good afternoon Charlie; Nanny/Au pair; Jobs; Pets; Yard sale; Private catering; London; Home; Concierge; Sell; Yard Sale; Profile; The best deals every sunday; Start selling.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Cars & Boats

- [x] Inventoried [Cars & Boats — 417:9170](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-9170)

**Source text-layer labels/slots:** Good afternoon Charlie; Rooms for rent; Holiday home; Cars & Boats; Tickets; Pet sitting; Property to rent; +1000 results; Toyota C-HR 1.8 Hybride 122CH Dynamic; Post code (Wimbledon); Property for sale; Wimbledon; Shoreditch; Filters; London; Home; Concierge; Sell; Yard Sale; Profile.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Tickets

- [x] Inventoried [Tickets — 417:9399](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-9399)

**Source text-layer labels/slots:** Good afternoon Charlie; Rooms for rent; Holiday home; Cars & Boats; Tickets; Pet sitting; Property to rent; +1000 results; Top west end show. Disney’s The Lion king; Post code (Covent Garden); Property for sale; Wimbledon; Shoreditch; Filters; London; Home; Concierge; Sell; Yard Sale; Profile.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Property to rent

- [x] Inventoried [Property to rent — 406:7832](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=406-7832)

**Source text-layer labels/slots:** Good afternoon Charlie; Room for rent; Holiday home; Cars & Boat; Property to rent; +1000 results; Flat to rent. 2 beds. 80m2. Central London; Flat to rent. 5 beds with garden. Thames view; Post code (Wimbledon); Property for sale; Post code (Shoreditch); Wimbledon; Shoreditch; Filters; London; Home; Concierge; Sell; Yard Sale; Profile.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Room for rent

- [x] Inventoried [Room for rent — 417:8266](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=417-8266)

**Source text-layer labels/slots:** Good afternoon Charlie; +1000 results; Room for rent. 2 beds. 80m2. Central London; Room for rent. 5 beds with garden. Thames view; Post code (Wimbledon); Property for sale; Post code (Shoreditch); Wimbledon; Shoreditch; Filters; London; Home; Concierge; Sell; Yard Sale; Profile; All; Room for rent; Holiday home.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Filter — Pet sitting

- [x] Inventoried [Filter — 436:7948](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-7948)

**Source text-layer labels/slots:** Location; Ad type; London; Pet sitting; Search; Who needs looking after; Walking; Cats; Hiring; Holidays sitting; Fish; Other; Day care; Dogs; Selling; Overnight sleeping; Birds; Category; Price; month; Section Header; The team’s top pet sitters picks.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Filter — 453:9384

- [x] Inventoried [Filter — 453:9384](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=453-9384)

**Source text-layer labels/slots:** Location; London; Pets; Search; Pets for sale; Cats; Fish; Other; Birds; Section Header; The team’s top pet picks; Ad type; Hiring; Selling; Dogs.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Filter — Private catering

- [x] Inventoried [Filter — 436:8044](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-8044)

**Source text-layer labels/slots:** Location; London; Private catering; Search; Event type; Corporate; Wedding; Birthday; Christmas/New Year’s Eve; Stag/Hen party; Other; hourly; Price range; Guests (up to); guests; Section Header; The team’s top private caterer picks; Ad type; Hiring; Selling.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Filter — Nanny/Au pair

- [x] Inventoried [Filter — 436:8523](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=436-8523)

**Source text-layer labels/slots:** Location; London; Nanny/Au pair; Search; Category; One off; Weekly; Daily; Au pair at home; Au pair for holidays; Section Header; The team’s top Nanny/au pair picks; Ad type; Hiring; Selling.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

## Listing creation and seller actions
[Figma page](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=301-17676)

**Proposed inputs:** title, description, category_id, city_id, postal_code, town, price_minor, currency, price_unit, ordered photo_ids, typed category attributes, buyer_id when marking sold.

**Displayed fields:** photo/main-image previews, category details, validation errors, publication confirmation, listing status, seller item detail.

**Buttons and destinations:** Upload/camera/library → local picker → media upload; Drag/remove photo → local ordered list; Category → category selector; Publish → confirmation → seller detail; Edit → prefilled form; Pause → paused listings; Mark sold → member selection → sold history; Delete → confirmation → deleted history; Close → prior page (draft retention is proposed).

**Shared route contracts:** `/api/media/`, `/api/listings/`, `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/publish/`, `/api/listings/{listing_id}/status/`, `/api/me/listings/`, `/api/members/`. See [contracts.md](contracts.md) for methods, models, success/error responses and navigation.

### Sell - No sponsors yet

- [x] Inventoried [Sell - No sponsors yet — 301:17716](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=301-17716)

**Source text-layer labels/slots:** Make the sale; Find sponsors; Home; Concierge; Sell; Yard Sale; Profile.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Item published

- [x] Inventoried [Item published — 457:10662](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-10662)

**Source text-layer labels/slots:** Item published; Sell another item; Later.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Edit pictures

- [x] Inventoried [Edit pictures — 453:10215](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=453-10215)

**Source text-layer labels/slots:** Cancel; Rotate; Delete; Done.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sell - Yard sale

- [x] Inventoried [Sell - Yard sale — 301:17899](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=301-17899)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Description; Tell buyers what you’re selling; Tell buyers more about it; + Upload photos; Yard sale; Purchased price; Asking price; Publish; Location; Postal code; Town.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sell - Pet sitting

- [x] Inventoried [Sell - Pet sitting — 457:11812](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-11812)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Description; Tell buyers what you’re selling; Tell buyers more about it; + Upload photos; Pet sitting, hiring pet sitter; Publish; Postal code; Town; Location; Cats; Dogs; Birds; Fish; Who needs looking after; Other; Walking; Holidays sitting; Day care; Overnight sleeping; Category; Price; month.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sell - Property for sale

- [x] Inventoried [Sell - Property for sale — 464:12016](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=464-12016)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Description; Tell buyers what you’re selling; Tell buyers more about it; + Upload photos; Property for sale; Publish; Postal code; Town; Location; House; Flat; Land; Property type; Bedrooms; Bathrooms; Rooms and beds; Surface; m2; Price; Garden; Parking; Amenities; Other.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sell - Holiday home

- [x] Inventoried [Sell - Holiday home — 474:13019](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-13019)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Description; Tell buyers what you’re selling; Tell buyers more about it; + Upload photos; Holiday home; Publish; Postal code; Town; Location; Bedrooms; Bathrooms; Rooms and beds; Other; Price; month; Parking; Barbecue; Pets allowed; Swimming pool; Beach front; Water front; Air con; Amenities.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sell - Cars & boats

- [x] Inventoried [Sell - Cars & boats — 474:13133](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-13133)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Description; Tell buyers what you’re selling; Tell buyers more about it; + Upload photos; Cars & Boats; Publish; Postal code; Town; Location; Year; Type; Mileage; Cars; Boats; km.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sell - Private catering

- [x] Inventoried [Sell - Private catering — 474:13239](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-13239)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Description; Tell buyers what you’re selling; Tell buyers more about it; + Upload photos; Private catering; Publish; Postal code; Town; Location; Event type; Corporate; Wedding; Birthday; Christmas/New Year’s Eve; Stag/Hen party; Other; hourly; Price range; Guests (up to); guests.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sell - Nanny/Au pair

- [x] Inventoried [Sell - Nanny/Au pair — 474:13315](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-13315)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Description; Tell buyers what you’re selling; Tell buyers more about it; + Upload photos; Nanny/Au pair; Publish; Postal code; Town; Location; Other; hourly; Price range; Category; One off; Weekly; Daily; Au pair at home; Au pair for holidays.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sell - Jobs

- [x] Inventoried [Sell - Jobs — 474:13406](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-13406)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Description; Tell buyers what you’re selling; Tell buyers more about it; + Upload photos; Jobs, hiring; Publish; Postal code; Town; Location; hourly; Price range.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sell - Property to rent

- [x] Inventoried [Sell - Property to rent — 474:12380](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-12380)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Description; Tell buyers what you’re selling; Tell buyers more about it; + Upload photos; Property to rent; Publish; Postal code; Town; Location; House; Flat; Land; Property type; Bedrooms; Bathrooms; Rooms and beds; Minimum stay; months; Monthly price; Furnished; Unfurnished; Furniture; Garden; Parking; Amenities; Other.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sell - Room for rent

- [x] Inventoried [Sell - Room for rent — 474:12493](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=474-12493)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Description; Tell buyers what you’re selling; Tell buyers more about it; + Upload photos; Room for rent; Publish; Postal code; Town; Location; Tenants; How many tenants are in the place?; Minimum stay; months; Monthly price; Garden; Parking; Amenities; Other.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Pictures selected

- [x] Inventoried [Pictures selected — 453:10115](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=453-10115)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Click and drag to rearrange; Description; Tell buyers what you’re selling; Tell buyers more about it; Yard sale; Purchased price; Asking price; Publish; Main; Location; Postal code; Town.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Detail page - Buyer

- [x] Inventoried [Detail page - Buyer — 477:13509](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=477-13509)

**Source text-layer labels/slots:** Make offer; Description; Location; Similar items; Joanna D.; Report ad; Message; King size bed in oak wood. dark colour.; Large dining room table, 200cmx130cm..

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sold

- [x] Inventoried [Sold — 479:14098](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=479-14098)
- [x] Inventoried [Sold — 749:15418](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=749-15418)

**Source text-layer labels/slots:** Description; Sold; Location; Similar items; King size bed in oak wood. dark colour.; Large dining room table, 200cmx130cm..

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Processing

- [x] Inventoried [Processing — 479:14154](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=479-14154)

**Source text-layer labels/slots:** Description; Processing; Location; Similar items; King size bed in oak wood. dark colour.; Large dining room table, 200cmx130cm..

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Deleted

- [x] Inventoried [Deleted — 479:14208](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=479-14208)

**Source text-layer labels/slots:** Deleted; Description; Location; Similar items; King size bed in oak wood. dark colour.; Large dining room table, 200cmx130cm..

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Pause

- [x] Inventoried [Pause — 479:14277](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=479-14277)

**Source text-layer labels/slots:** Hidden; Description; Location; Similar items; King size bed in oak wood. dark colour.; Large dining room table, 200cmx130cm..

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Detail page - Seller

- [x] Inventoried [Detail page - Seller — 477:13735](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=477-13735)

**Source text-layer labels/slots:** Description; Location; Similar items; King size bed in oak wood. dark colour.; Large dining room table, 200cmx130cm..

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Device pop up

- [x] Inventoried [Device pop up — 477:13793](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=477-13793)

**Source text-layer labels/slots:** Description.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Mark as sold

- [x] Inventoried [Mark as sold — 530:10220](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=530-10220)

**Source text-layer labels/slots:** Description.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Delete

- [x] Inventoried [Delete — 477:13932](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=477-13932)

**Source text-layer labels/slots:** Description.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sell - No category selected

- [x] Inventoried [Sell - No category selected — 457:10384](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-10384)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Click and drag to rearrange; Description; Tell buyers what you’re selling; Tell buyers more about it; Category; Publish; Main; Location; Postal code; Town; Price.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sell - Tickets

- [x] Inventoried [Sell - Tickets — 457:11654](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-11654)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Click and drag to rearrange; Description; Tell buyers what you’re selling; Tell buyers more about it; Tickets; Asking price/ticket; Publish; Main; Location; Postal code; Town; Concert; Sport; Ticket type; Date; Add date; Number of tickets; Other.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sell - Pets

- [x] Inventoried [Sell - Pets — 457:10564](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-10564)

**Source text-layer labels/slots:** Sell an item; Photos; About your item; Item details; Title; Click and drag to rearrange; Description; Tell buyers what you’re selling; Tell buyers more about it; Pets, selling; Other; Price/pet; Publish; Main; Location; EW1 2QQ; London; Pet age; weeks; Cats; Dogs; Birds; Fish; Pet you’re selling.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Item details - Category

- [x] Inventoried [Item details - Category — 457:10469](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=457-10469)

**Source text-layer labels/slots:** Property for sale; Rooms for rent; Cars & boat; Pets; Private catering; Pet sitting; Property for rent; Holidays home; Yard sale; Tickets; Nanny/Au pair; Jobs; Category.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Select member

- [x] Inventoried [Select member — 530:10284](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=530-10284)

**Source text-layer labels/slots:** do; Dorian A; Doremis P; Doremis K; Doreen K.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

## Buyer detail, offers and conversations
[Figma page](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=487-14420)

**Proposed inputs:** offer preset/custom amount_minor, accept/decline/counter decision, message text/photo, report reason/message, concierge query.

**Displayed fields:** listing photos/title/description/location/price/seller, category-specific attributes, similar/member items, conversation messages, offer amount/currency/status, sold status, report acknowledgement.

**Buttons and destinations:** Make offer → amount sheet → conversation; Counter → amount sheet → conversation; Accept/Decline → updated offer message; Message → listing conversation; Report → text entry → sent/failure state; Concierge/contact/feedback → topic conversation; Info → conversation information; Similar/member item → buyer detail.

**Shared route contracts:** `/api/listings/{listing_id}/`, `/api/listings/{listing_id}/similar/`, `/api/members/{member_id}/listings/`, `/api/listings/{listing_id}/offers/`, `/api/offers/{offer_id}/`, `/api/conversations/`, `/api/conversations/{conversation_id}/messages/`, `/api/reports/`. See [contracts.md](contracts.md) for methods, models, success/error responses and navigation.

### Concierge

- [x] Inventoried [Concierge - Empty — 487:14428](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=487-14428)

**Source text-layer labels/slots:** Write message here; Concierge.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Report ad - Message not sent

- [x] Inventoried [Report ad - Message not sent — 503:6691](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=503-6691)

**Source text-layer labels/slots:** GH Concierge; Hello John, how can I help today?.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Make offer

- [x] Inventoried [Make offer — 505:7083](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-7083)
- [x] Inventoried [Make offer - Button activated — 505:7180](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-7180)

**Source text-layer labels/slots:** Make an offer; Item price: 80£; Custom; Set a price; Make offer.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Counter offer

- [x] Inventoried [Counter offer — 505:7465](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-7465)

**Source text-layer labels/slots:** Make an offer; Item price:; Make offer.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Report ad - Message sent

- [x] Inventoried [Report ad - Message sent — 503:6738](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=503-6738)

**Source text-layer labels/slots:** GH Concierge; Hello John, how can I help today?; What’s the issue?; Write message here.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Message sent

- [x] Inventoried [Message sent — 505:6881](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-6881)
- [x] Inventoried [Message sent — 505:6936](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-6936)

**Source text-layer labels/slots:** Concierge; Hello John, how can I help today?; What’s the issue?; Write message here; Conversation ended; Thank you for contacting Guilliam’s House support.; Give options like Clanmark.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Buyer - Yard sale

- [x] Inventoried [Buyer - Yard sale — 487:14554](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=487-14554)

**Source text-layer labels/slots:** Make offer; Description; Location; Similar items; Member’s items; Joanna D.; Report ad; Message; King size bed in oak wood. dark colour.; Large dining room table, 200cmx130cm..

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Buyer - Pet sitting

- [x] Inventoried [Buyer - Pet sitting — 507:8747](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=507-8747)

**Source text-layer labels/slots:** Dogs pet sitter; Description; Location; Message; PetloversUK; Report ad; Item 1, similar to this category.; Item 2 similar to this category.; Large dining room table, 200cmx130cm.; Similar items; Member’s items.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Buyer - Pets

- [x] Inventoried [Buyer - Pets — 527:9229](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9229)

**Source text-layer labels/slots:** Ready now KC registered PRA clear mini dachshund; Description; Location; Pets you’re selling; Pet age; Hollieh; Report ad; Item 1, similar to this category.; Item 2 similar to this category.; Large dining room table, 200cmx130cm.; Similar items; Member’s items; Message.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Buyer - Tickets

- [x] Inventoried [Buyer - Tickets — 527:9489](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9489)

**Source text-layer labels/slots:** Last minute tickets for Wicked. 3 seats in front rows.; Description; Location; Dates; Number of tickets; Ticket type; Message; Jackieh; Musical; Report ad; Item 1, similar to this category.; Item 2 similar to this category.; Large dining room table, 200cmx130cm.; Similar items; Member’s items.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Buyer - Property for sale

- [x] Inventoried [Buyer - Property for sale — 507:8951](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=507-8951)

**Source text-layer labels/slots:** Description; Location; Rooms and beds; Amenities; Realestatelondon; Garden, parking, open plan kitchen, lift; Report ad; Item 1, similar to this category.; Item 2 similar to this category.; Large dining room table, 200cmx130cm.; Similar items; Member’s items; Message.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Buyer - Property to rent

- [x] Inventoried [Buyer - Property to rent — 527:9045](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9045)

**Source text-layer labels/slots:** Description; Location; Rooms and beds; Furniture; Amenities; Barrainlondon; Furnished; Garden, parking, open plan kitchen, lift; Report ad; Item 1, similar to this category.; Item 2 similar to this category.; Large dining room table, 200cmx130cm.; Similar items; Member’s items; Message.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Buyer - Holiday home

- [x] Inventoried [Buyer - Holiday home — 527:9587](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9587)

**Source text-layer labels/slots:** Description; Location; Rooms and beds; Amenities; Barrainlondon; Garden, parking, open plan kitchen, lift; Report ad; Item 1, similar to this category.; Item 2 similar to this category.; Large dining room table, 200cmx130cm.; Similar items; Member’s items; Message.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Buyer - Cars

- [x] Inventoried [Buyer - Cars — 527:9676](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9676)

**Source text-layer labels/slots:** Description; Location; Type; Year; Mileage; Carloversuk; Cars; Report ad; Item 1, similar to this category.; Item 2 similar to this category.; Large dining room table, 200cmx130cm.; Similar items; Member’s items; Message.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Buyer - Private catering

- [x] Inventoried [Buyer - Private catering — 527:9855](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9855)

**Source text-layer labels/slots:** Private catering all over London; Description; Location; Event type; Guests (up to); Socialpantry; Corporate, wedding, birthday, stag/hen party.; Report ad; Item 1, similar to this category.; Item 2 similar to this category.; Large dining room table, 200cmx130cm.; Similar items; Member’s items; Message.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Buyer - Nanny/Au pair

- [x] Inventoried [Buyer - Nanny/Au pair — 530:9960](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=530-9960)

**Source text-layer labels/slots:** Part-time nannies all over London; Description; Location; Korukids; Any in London; Report ad; Item 1, similar to this category.; Item 2 similar to this category.; Large dining room table, 200cmx130cm.; Similar items; Member’s items; Message.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Buyer - Jobs

- [x] Inventoried [Buyer - Jobs — 530:10078](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=530-10078)

**Source text-layer labels/slots:** Payments system manager; Description; Location; Totaljobs; Report ad; Item 1, similar to this category.; Item 2 similar to this category.; Large dining room table, 200cmx130cm.; Similar items; Member’s items; Message.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Buyer - Boats

- [x] Inventoried [Buyer - Boats — 527:9766](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9766)

**Source text-layer labels/slots:** Description; Location; Type; Year; Yatchbrokers; Boats; Report ad; Item 1, similar to this category.; Item 2 similar to this category.; Large dining room table, 200cmx130cm.; Similar items; Member’s items; Message.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Buyer - Room for rent

- [x] Inventoried [Buyer - Room for rent — 527:9140](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=527-9140)

**Source text-layer labels/slots:** A room in bright and cosy two-floor flat in Hoxton; Description; Location; Minimum stay; Number of current tenants; Amenities; Barrainlondon; EC2A 3HU (Shoreditch); Garden, parking, open plan kitchen, lift; Report ad; Item 1, similar to this category.; Item 2 similar to this category.; Large dining room table, 200cmx130cm.; Similar items; Member’s items; Message.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Detail page - Buyer

- [x] Inventoried [Detail page - Buyer — 505:6998](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-6998)

**Source text-layer labels/slots:** Make offer; Description; Location; Joanna D.; Report ad; Message; King size bed in oak wood. dark colour.; Large dining room table, 200cmx130cm..

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sold

- [x] Inventoried [Sold — 503:6404](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=503-6404)

**Source text-layer labels/slots:** Description; Location; Similar items; Member’s items; Joanna D.; Report ad; King size bed in oak wood. dark colour.; Large dining room table, 200cmx130cm.; Sold; Make offer; Message.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Inbox - Landing page

- [x] Inventoried [Inbox - Landing page — 503:6599](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=503-6599)

**Source text-layer labels/slots:** Notifications; Messages; a day ago; Hi there,; Old painting 20th century; Montessori wooden board game with 3 colours in...; Get instant mobile notifications; GH concierge; Allison203; Drocha85; D.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Messages

- [x] Inventoried [Messages — 503:6804](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=503-6804)

**Source text-layer labels/slots:** Alison203; Hi, I’m Alison203; Last seen 50min ago; Declined; Decline; Counter Offer; Accept; Write message here.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Offer accepted

- [x] Inventoried [Offer accepted — 505:7542](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-7542)

**Source text-layer labels/slots:** Alison203; Hi, I’m Alison203; Last seen 50min ago; Declined; Accepted; Write message here.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Info icon - Top right corner

- [x] Inventoried [Info icon - Top right corner — 505:7628](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=505-7628)

**Source text-layer labels/slots:** Alison203; Hi, I’m Alison203; Last seen 50min ago; Declined; Accepted; Write message here.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

## Profile and settings
[Figma page](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-10257)

**Proposed inputs:** name/email edits, phone/code verification, profile photo, city selection, category_ids, notification preference, contact/feedback text, delete confirmation/reason.

**Displayed fields:** settings menu, personal information, sponsors, selling status tabs, purchases/favourites, unavailable favourite, verification pending status, legal copy.

**Buttons and destinations:** Personal info → edit fields/photo/phone; Save → profile with refreshed data; Swap cities → city selection → Home; Categories → preference selection; Selling/Buying → listing history/favourites; Item → detail; Contact/Feedback → concierge topic; Logout → confirmation → sign-in; Delete account → confirmation → splash; Get verified → pending; Terms → legal.

**Shared route contracts:** `/api/me/`, `/api/auth/challenges/`, `/api/auth/verify/`, `/api/media/`, `/api/sponsorships/`, `/api/me/listings/`, `/api/me/purchases/`, `/api/favourites/`, `/api/favourites/{listing_id}/`, `/api/me/verification/`, `/api/logout/`, `/api/conversations/`, `/api/legal/{document}/`. See [contracts.md](contracts.md) for methods, models, success/error responses and navigation.

### Profile - Selling

- [x] Inventoried [Profile - Selling — 295:17256](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=295-17256)

**Source text-layer labels/slots:** Home; Concierge; Sell; Yard Sale; Profile; Settings; Selling; Buying; Get verified; Active listings; Hidden items; Deleted items; Sold items.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Get verified

- [x] Inventoried [Get verified — 535:12580](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12580)

**Source text-layer labels/slots:** Home; Concierge; Sell; Yard Sale; Profile; Settings; Selling; Buying; Get verified; Active listings; Hidden items; Deleted items; Sold items; PROCESSING.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Profile - Buying

- [x] Inventoried [Profile - Buying — 535:12359](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12359)

**Source text-layer labels/slots:** Home; Concierge; Sell; Yard Sale; Profile; Settings; Selling; Buying; Your categories; Favourites.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Profile - Settings

- [x] Inventoried [Profile - Settings — 404:7256](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=404-7256)

**Source text-layer labels/slots:** Home; Concierge; Sell; Yard Sale; Profile; Settings; Selling; Buying; Contact us; Log out; Push notifications; Share feedback; Delete account; Personal info; Terms of service; Swap cities; Your sponsors.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Log out

- [x] Inventoried [Log out — 535:12146](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12146)

**Source text-layer labels/slots:** Home; Concierge; Sell; Yard Sale; Profile; Settings; Selling; Buying; Contact us; Log out; Push notifications; Share feedback; Delete account; Personal info; Safety; Swap cities; Your sponsors.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Active listings

- [x] Inventoried [Active listings — 433:6350](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=433-6350)

**Source text-layer labels/slots:** Villa with 6 bedroom in Sicily with view over the river Ca...; Quirky 1 bed flat to let in Maida Vale; Sailing boat available from August. No skipper.; Property for rent; Tickets; Cas & Boats; Maide Vale; Alexandra Palace; UK; Sicily; Active listings.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Your categories

- [x] Inventoried [Your categories — 535:13308](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-13308)

**Source text-layer labels/slots:** Your categories; Save; Category header.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Sold

- [x] Inventoried [Sold — 535:12985](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12985)

**Source text-layer labels/slots:** Villa with 6 bedroom in Sicily with view over the river Ca...; Quirky 1 bed flat to let in Maida Vale; Sailing boat available from August. No skipper.; Property for rent; Tickets; Cas & Boats; Maide Vale; Alexandra Palace; UK; Sicily; Sold items; Sold.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Deleted

- [x] Inventoried [Deleted — 535:13062](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-13062)

**Source text-layer labels/slots:** Villa with 6 bedroom in Sicily with view over the river Ca...; Quirky 1 bed flat to let in Maida Vale; Sailing boat available from August. No skipper.; Property for rent; Tickets; Cas & Boats; Maide Vale; Alexandra Palace; UK; Sicily; Deleted items; Deleted.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Pause

- [x] Inventoried [Pause — 535:13141](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-13141)

**Source text-layer labels/slots:** Villa with 6 bedroom in Sicily with view over the river Ca...; Quirky 1 bed flat to let in Maida Vale; Sailing boat available from August. No skipper.; Property for rent; Tickets; Cas & Boats; Maide Vale; Alexandra Palace; UK; Sicily; Deleted items; Hidden.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Favourites

- [x] Inventoried [Favourites — 535:12669](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12669)

**Source text-layer labels/slots:** Villa with 6 bedroom in Sicily with view over the river Ca...; Quirky 1 bed flat to let in Maida Vale; Sailing boat available from August. No skipper.; Property for rent; Tickets; Cas & Boats; Maide Vale; Alexandra Palace; UK; Sicily; Favourites.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Item removed

- [x] Inventoried [Item removed — 535:12874](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12874)

**Source text-layer labels/slots:** Villa with 6 bedroom in Sicily with view over the river Ca...; Quirky 1 bed flat to let in Maida Vale; Sailing boat available from August. No skipper.; Item removed from list; Property for rent; Tickets; Cas & Boats; Maide Vale; Alexandra Palace; UK; Sicily; Favourites.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Swap cities

- [x] Inventoried [Swap cities — 533:10650](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-10650)

**Source text-layer labels/slots:** Swap cities; Choose your city:; Confirm.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Contact us

- [x] Inventoried [Contact us — 533:11232](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11232)

**Source text-layer labels/slots:** Concierge; Hello John, how can I help today?; What’s the issue?; Write message here.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Delete account

- [x] Inventoried [Delete account — 535:12275](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12275)

**Source text-layer labels/slots:** Concierge; Write message here.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Push notifications

- [x] Inventoried [Push notifications — 533:11345](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11345)

**Source text-layer labels/slots:** Push notifications; Messages; Account updates; News and sales; New sponsors.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Your sponsors

- [x] Inventoried [Your sponsors — 535:12089](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12089)

**Source text-layer labels/slots:** Your sponsors; [sample member]; Phone contacts.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Terms of service

- [x] Inventoried [Terms of service — 535:12440](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12440)

**Source text-layer labels/slots:** Terms of service; Title Text; Effective Date; Summary Text; Membership Text; User Conduct Text; Listings Content Text.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Personal info

- [x] Inventoried [Personal info — 533:11423](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11423)

**Source text-layer labels/slots:** Personal info; First name; Last name; Email; Phone number; John; Edit; [sample member]; [sample email omitted]; [sample phone omitted].

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Edit photo - options

- [x] Inventoried [Edit photo - options — 535:12003](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12003)

**Source text-layer labels/slots:** Personal info; First name; Last name; Email; Phone number; John; Edit; [sample member]; [sample email omitted]; [sample phone omitted].

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Edit photo

- [x] Inventoried [Edit photo — 535:12047](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=535-12047)

**Source text-layer labels/slots:** Personal info.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Edit first/last name/email

- [x] Inventoried [Edit first/last name/email — 533:11502](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11502)

**Source text-layer labels/slots:** Personal info; First name; [sample member]; Confirm.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Edit phone number

- [x] Inventoried [Edit phone number — 533:11549](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11549)

**Source text-layer labels/slots:** Personal info; +33; Confirm.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Enter code

- [x] Inventoried [Enter code — 533:11798](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11798)

**Source text-layer labels/slots:** Personal info; Enter the code sent to [sample phone omitted].; Confirm; Help Text.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.

### Share feedback

- [x] Inventoried [Share feedback — 533:11289](https://www.figma.com/design/tHY3rCOMbQapPxXcjqL5sV/GH---Web-App?node-id=533-11289)

**Source text-layer labels/slots:** It’s ok for now, thanks.; Concierge; Thank you for helping us. Have a good day!; Write message here.

- [ ] Confirm component-slot copy and field requiredness with the product/design owner.
