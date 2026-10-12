# Rawalpindi galleries and service coverage

Review captures from the local production build, 11 October 2026.
Photographs remain the locally served, verified Lalkurti street and Ayub Park
images; their creators and reuse licences are in [image credits](../image-credits.md).

## Public changes

- Two independent, reusable manual galleries replace the fixed hero and
  community photographs. Both have native previous/next buttons, visible
  counters, place labels, captions, descriptive alt text and concise polite
  announcements after an interaction. Controls retain focus. There is no
  autoplay, timer, slide animation or extra motion dependency.
- Controls have at least 44px touch targets. Existing OS and Rawal One
  reduced-motion settings suppress the restrained control colour transitions.
  The hero starts with Lalkurti and the community gallery with Ayub Park.
- Fifteen typed, statically generated service pages complete the existing
  sixteen-service catalogue. The existing Water interruption page is retained.
  Each new page contains a breadcrumb, service note, section navigation,
  practical steps, preparation guidance, pathways, native FAQ disclosures,
  support preparation, related services and an updated date.
- Guidance is explicitly informational: no reports, payments, applications,
  bookings or registrations are accepted. No real contact details, fees or
  live operational promises were invented.
- The directory retains search/category/query behavior. Its detail links feed
  the existing global search without changing the search engine. Homepage
  task shortcuts, problem pathways and Water-related links now reach guides
  directly. The fixed public analytics allowlist includes these known paths;
  its activation gate and admin/privacy exclusions are unchanged.

## New service pages

Every path below is under `/services/`:

| Waste and water | Roads and permits | Community |
| --- | --- | --- |
| `waste-collection-schedules` | `report-pothole-road-issue` | `parks-community-facilities` |
| `missed-waste-collection` | `report-streetlight-problem` | `recreation-programmes` |
| `bulky-waste-disposal-guidance` | `road-works-local-closures` | `licences-certificates` |
| `water-billing-account-help` | `building-permits-applications` | `community-information-support` |
| `new-water-sewer-connections` | `signage-commercial-permits` | |
| | `development-information` | |

## Screenshots

All files are PNGs suitable for downloading and sharing.

- Homepage: [320px](homepage-320.png), [390px](homepage-390.png),
  [768px](homepage-768.png), [1024px](homepage-1024.png), [1440px](homepage-1440.png).
- Gallery alternatives: [1440px](homepage-1440-galleries-second-slide.png),
  [390px](homepage-390-galleries-second-slide.png).
- Mobile navigation: [390px menu open](homepage-390-menu-open.png).
- Combined accessibility preferences: [homepage](homepage-390-combined.png),
  [missed collection](services-missed-waste-collection-390-combined.png).
- Discovery: [Services directory](services-1440.png), [Search](search-waste-1440.png).
- Desktop guides: [Waste schedules](services-waste-collection-schedules-1440.png),
  [Missed collection](services-missed-waste-collection-1440.png),
  [Road issues](services-report-pothole-road-issue-1440.png),
  [Building permits](services-building-permits-applications-1440.png),
  [Parks and facilities](services-parks-community-facilities-1440.png).
- Mobile guides: [Missed collection](services-missed-waste-collection-390.png),
  [Building permits](services-building-permits-applications-390.png),
  [Recreation](services-recreation-programmes-390.png).

The first visual review found no meaningful application design issue and
recommended no correction pass. Captures were cleaned up to remove retained
keyboard focus on the skip link; the application's accessible focus behavior
was preserved.

## Scope

CMS, Supabase, database schemas, authentication, admin workflows, alert logic
and dependencies are unchanged. The existing Water page source and content
are unchanged; five related/action URLs now point to the new public guides.
Both original photograph assets and their attribution are unchanged.

## Verification

Completed 12 October 2026; the screenshots above were captured 11 October.

| Check | Result |
| --- | --- |
| `pnpm typecheck` | Pass |
| `pnpm lint` | Pass |
| `pnpm build` | Pass; all 15 new detail pages statically generated |
| Analytics policy tests | 10/10 pass; collection remains gated off |
| Responsive layout | 60 cases across 320, 390, 768, 1024 and 1440px, default and combined preferences |
| Service routes and discovery | All 16 detail pages and global-search destinations pass; unknown service returns 404 |
| Axe accessibility review | 16 audits; zero violations |
| Galleries | Keyboard, stable focus, wraparound, independent mobile controls, announcements and no autoplay pass |
| Motion preferences | Default, Rawal reduced motion, OS reduced motion and combined preferences pass |
| Public regressions | Filters, query retention, mobile navigation, preference persistence, existing PDFs and admin redirect pass |
| Browser errors / horizontal overflow | Zero |

The targeted rerun corrected external test assumptions about date punctuation,
navigation scoping, lazy-image decoding and preference initialization. No
application changes were needed after the visual review. Third-party browser
requests were blocked; no analytics hits or remote Supabase writes were sent.
