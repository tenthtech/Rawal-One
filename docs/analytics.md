# Public usage analytics

Rawal One supports GA4 Measurement ID **`G-11Q13VK1YX`** through a small
App Router client component using `next/script` with `lazyOnload`.
The ID is public, not a credential. No analytics dependency was added.

## Activation remains gated

The stream's privacy settings have **not been confirmed**. At the user's
request, `.env.example` keeps `NEXT_PUBLIC_GA_PRIVACY_READY=false`.
Adding the Measurement ID alone does not load Google or collect events.

Before activation, the property owner must check the GA4 web stream:

1. Turn **Enhanced Measurement off entirely**, including automatic history
   page views, site search, form interactions, downloads, outbound clicks,
   scrolling and video events. `send_page_view: false` alone does not disable
   all stream-controlled collection.
2. Keep **Google Signals**, **user-provided data collection** and
   **advertising personalization** off. Do not connect advertising/remarketing
   features or add user IDs, user properties or custom interaction tags.
3. After confirming those settings, set the production build environment:

   ```text
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-11Q13VK1YX
   NEXT_PUBLIC_GA_PRIVACY_READY=true
   NEXT_PUBLIC_GA_ALLOW_LOCAL=false
   ```

4. Rebuild/redeploy: Next.js embeds `NEXT_PUBLIC_` variables at build time.
   Confirm a single homepage view and one view for each public pathname
   navigation in GA4 Realtime/DebugView, and no admin, query or form events.
   Keep these stream settings off after activation. If they change or cannot
   be confirmed, restore the privacy gate to `false` and rebuild.

This task does not change the remote Google property or hosting environment.
No live measurement events were sent during verification.

## Tracking scope

- The known public routes are `/`, `/services`,
  `/services/water-service-interruptions`, `/search`, `/documents`, `/notices`,
  `/accessibility`, `/image-credits` and `/privacy`.
- Each view uses a fixed page name and `origin + pathname`. No query string,
  fragment, original referrer, rendered title/content or form value is read
  into event parameters. Search/filter changes on the same pathname do not
  create additional views or expose search terms. Unknown/dynamic paths and
  PDF file URLs are excluded.
- The component sends explicit `page_view` events. Every configuration uses
  `send_page_view: false`; a pathname guard avoids duplicate initial events,
  React Strict Mode repeats and same-path renders. Returning from another
  pathname records a new view.
- Clean page metadata is applied to Google tag defaults and configuration,
  as well as the manual view. The loader uses a dedicated `rawalGaDataLayer`
  and `referrerPolicy="no-referrer"`.
- Every `/admin` route, including login and CMS routes, is outside the
  allowlist. The root guard stays mounted and sets Google's
  `ga-disable-G-11Q13VK1YX` switch when the route is excluded. This also
  disables an SDK previously loaded on a public route; merely removing its
  Script element would not remove Google's listeners. Pending commands are
  cleared if navigation leaves the public site before the loader is ready.
- There are no application interaction events for authentication, CMS
  operations, uploads, PDF downloads, searches, forms or accessibility
  controls. No application PII, user ID or user properties are supplied.
- Google Signals and advertising personalization are disabled in tag
  configuration. Advertising storage, advertising user data and advertising
  personalization consent categories are denied; URL passthrough is disabled
  and advertising data redaction is enabled.
- Do Not Track and Global Privacy Control suppress the loader and events.
  An absent/invalid ID, unconfirmed privacy gate or failed SDK leaves the
  application usable. No application error is logged for a blocked loader.

GA4's ordinary session/first-visit/engagement metadata may accompany its basic
page-view processing. It uses pseudonymous analytics identifiers/cookies and
receives browser/device/network metadata; the integration does not claim full
anonymity. The public [Privacy page](../app/privacy/page.tsx), linked from the
footer, explains this without adding a competing consent system or banner.
There was no prior privacy/cookie implementation to integrate with.

## Development and tests

Development and localhost/loopback are disabled even if the ID and privacy gate
are configured. A separate **explicit** `NEXT_PUBLIC_GA_ALLOW_LOCAL=true`
override is required for an intentional local analytics test. Leave it `false`
in hosted environments. Local opt-in never bypasses the privacy gate or browser
privacy signals.

Run the dependency-free policy tests with the supported Node.js version:

```bash
node --experimental-strip-types --test tests/public-analytics.test.mjs
pnpm typecheck
pnpm lint
pnpm build
```

Browser verification uses isolated local application copies with different
build-time settings. Google loader/collection requests are intercepted, so
enabled behavior can be checked without sending real visits to the property.
These checks validate application integration, not Google's current dashboard
settings or acceptance of live events. See [verification](analytics-verification.md).
