# Analytics verification

Verified on 2026-10-11 with Node.js 24.19.0, pnpm 11.19.0,
Next.js 16.3.8 and headless Chromium.

**Activation remains disabled.** The user has not confirmed the GA4 property
settings and requested that collection remain gated. No Google property,
hosting, Supabase or authentication configuration was changed.

## Automated checks

| Check | Result |
| --- | --- |
| `pnpm typecheck` | Pass |
| `pnpm lint` | Pass |
| `pnpm build` (normal Turbopack production build) | Pass |
| `node --experimental-strip-types --test tests/public-analytics.test.mjs` | 10/10 pass |
| `git diff --check` | Pass |

The policy tests cover configuration validation, the activation gate,
development/loopback defaults and explicit opt-in, browser privacy signals,
fixed public page metadata, admin/unknown/PDF exclusion and identifying query
or fragment rejection.

## Browser verification

All Google loader requests were intercepted with a minimal command-processing
stub; Google collection endpoints were blocked. These tests validate the
application's commands and route guards, **not live GA collection or current
Google dashboard settings**. No actual SDK was downloaded or live hit sent.

The explicitly opted-in development application passed:

- Exactly one initial homepage view, including React Strict Mode, and one
  view for each of ten real Next.js client navigations covering `/services`,
  `/documents`, `/notices`, `/accessibility`, water service, search, privacy
  and image credits. The SDK loaded once within that SPA document.
- `send_page_view: false` on every configuration; fixed titles/paths with no
  query, fragment, private incoming referrer or form value in any command.
  The SDK request itself had no Referer header.
- Search typing and same-path query/hash changes produced no extra views.
  The existing native GET search form can start a new document, which gets
  one fresh sanitized view.
- Six direct admin entry points, including `/admin/login`, emitted no
  commands or events and loaded no SDK. Entering admin after public loading
  set the Google disable flag; returning publicly emitted one clean view.
- Entering admin while the SDK was delayed cleared the pending queue. Late
  completion emitted nothing on admin; public return resumed safely.
- Do Not Track, Global Privacy Control and missing/unconfirmed configuration
  suppressed the SDK and events. Development on a nonlocal hostname stayed
  disabled without the explicit local/development opt-in.
- A blocked SDK left navigation working without application errors. The
  browser's normal failed-resource diagnostic was expected for that test.
- Accessibility preference interactions emitted no analytics events.

The same enabled matrix passed with an isolated production build on a virtual
public hostname, including sanitized page views, public-to-admin suppression,
browser privacy signals, a blocked SDK and delayed loading. Protected admin
endpoints returned 307 to login; the login page emitted no analytics. Separate
production checks with a loopback hostname and with no Measurement ID stayed
disabled. The development/production browser reports contain 27 passing
scenario groups in total.

Happy-path checks recorded no console or JavaScript errors.

## Public-site regression and accessibility

The actual unconfigured production build served the homepage, services,
water service, search, documents, notices, accessibility and privacy pages
successfully with no Google requests or console errors. Saved combined
accessibility preferences restored correctly. Production CMS empty states
remained intact. `/admin` still redirected to `/admin/login` with HTTP 307;
admin pages retained their separate accessibility behavior.

The new Privacy page passed six accessibility cases: 1440, 390 and 320px
with default and saved combined preferences. All had zero axe violations,
console errors and horizontal overflow. Skip links, landmarks, visible
keyboard focus and footer navigation worked. The Privacy footer link was
44px tall by default and 55px with the larger-text preferences.

The final scope review found only analytics, its configuration/documentation/
tests, and the Privacy page/footer link. No existing CSS, public content data,
CMS, authentication, Supabase, database, alerts or dependencies changed.
