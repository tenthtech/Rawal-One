# Rawal One civic experience review

Reviewed on 11 October 2026, against baseline commit `502d4cacde7ace52820693a29686d9b4c89c19d8`.

## Initial findings

The existing site had good local photographs, consistent icons and working accessibility controls. Its locality was less visible in the brand and headings. Repeated large cream introductions, floating search panels and generous catalogue spacing delayed access to useful content on phones. The routine advisory crowded the hero, and the footer mixed resident links with the demonstration disclosure. Existing catalogue lists were already appropriate; they did not need another card system.

## Final presentation

- **Homepage narrative:** existing active alerts first, resident hero, six most-used services, routine service information, problem-reporting pathways, city updates, community activity, documents/useful information, civic footer. Alert eligibility and data remain unchanged.
- **Hero:** retained “What can we help you with?” with a larger display hierarchy, a wider task column, labelled search, four existing quick pathways and an asymmetric street photograph. Search and tasks precede photography on phones.
- **Rawalpindi identity:** locality appears in the brand line, hero eyebrow, “Latest from Rawalpindi,” “Around Rawalpindi,” photo captions and the footer. Existing Satellite Town and Sixth Road content remains intact. Existing event locations are displayed when supplied by the CMS; no location was invented or seeded.
- **Typography:** retained the local Public Sans font infrastructure; stronger display and section weights, smaller internal-page titles, clear catalogue titles, restrained metadata and consistent line heights. Only the hero uses large display text.
- **Service discovery:** a flat 3×2 desktop index with civic line icons, subtle emphasis on waste/water, clear arrows, and compact horizontal rows on phones. Icons retain the existing uniform stroke weight. Mobile category/type filters use readable columns and minimum 44px targets.
- **Photography:** retained both verified local WebP files. Removed the hero's large offset backing shape and corner cut, used a portrait crop on desktop and wider mobile/tablet crops, and put captions below photographs. The Ayub Park image uses a shorter public-space composition. No image files, licences or alt text were replaced; no third image or remote hotlink was added. See [image credits](../image-credits.md).
- **Section rhythm:** cream editorial hero, white service index, sage routine advisory, deep green problem pathways, white updates, warm community section and a practical white information index. Faint street-grid lines support wayfinding and disappear in high contrast.
- **Internal pages:** Services and Search use integrated sage search panels and denser indexes. Documents put titles before file/category/date metadata while preserving separate View/Download PDF links. Notices put titles first in reading order, retain status/date metadata and native disclosure controls, and give open details a quiet surface treatment. Water prioritizes status, resident actions, context, guidance, FAQ and help/related pathways. Accessibility uses the shared compact introduction.
- **Mobile/header/footer:** locality remains visible at 320px; the mobile menu has a distinct heading, search first, five resident destinations and Accessibility. The footer groups Services, Community and Help, followed by a clearly separated R&D/non-government disclosure and retained Image credits link.
- **Interaction:** existing focus rings, keyboard operation, preference persistence, reset and reduced-motion behavior remain in place. No new motion or client component was introduced.

At 390px, the first Services title moved from 1218px to 947px down the page. Water status moved from 776px to 534px, and resident actions from 1411px to 780px. These are browser measurements with default preferences, not performance timings.

## Screenshot review and one correction pass

All 16 captures were reviewed against the baseline at desktop, tablet and mobile sizes, including a separate critical review. The only meaningful issue was a white-on-sage foreground on the first two service icons in high contrast. One deliberate correction pass gave every high-contrast service icon a dark civic foreground; the resulting measured contrast is **10.67:1**. The high-contrast screenshot was recaptured and verified. No further design iteration was performed.

The screenshots use the running development application and its existing demonstration CMS fallback content. No data provider, dataset, remote Supabase configuration or production fallback was changed to obtain them. The separate fresh production build correctly shows empty CMS states when Supabase is unconfigured. No live publishing or remote database operation was performed.

Each PNG is captured at the stated CSS width. Full-page captures include the footer; menu and accessibility-panel captures use a 390×844 viewport. Fonts and local photographs were loaded before capture. Only the Next.js development indicator was hidden.

| Page/state | Screenshot |
| --- | --- |
| Homepage, 1440 default | [home-1440.png](home-1440.png) |
| Homepage, 1024 | [home-1024.png](home-1024.png) |
| Homepage, 768 | [home-768.png](home-768.png) |
| Homepage, 390 | [home-390.png](home-390.png) |
| Homepage, 320 | [home-320.png](home-320.png) |
| Homepage, 1440 high contrast | [home-1440-high-contrast.png](home-1440-high-contrast.png) |
| Homepage, 390 accessibility panel | [home-390-accessibility-open.png](home-390-accessibility-open.png) |
| Homepage, 390 navigation open | [home-390-menu-open.png](home-390-menu-open.png) |
| Services, 1440 | [services-1440.png](services-1440.png) |
| Services, 390 | [services-390.png](services-390.png) |
| Water service, 1440 | [water-service-1440.png](water-service-1440.png) |
| Water service, 390 | [water-service-390.png](water-service-390.png) |
| Search, 1440, query `water` | [search-1440.png](search-1440.png) |
| Documents, 1440 | [documents-1440.png](documents-1440.png) |
| Notices, 1440 | [notices-1440.png](notices-1440.png) |
| Accessibility, 1440 | [accessibility-1440.png](accessibility-1440.png) |

When sharing these screenshots, include [image-credits.md](../image-credits.md) so the photographs' creators, sources, licences and adaptations remain credited. The separate downloadable review archive includes that file.

## Verification

- `pnpm typecheck`, `pnpm lint`, `pnpm build`: passed after the correction. `git diff --check`: passed.
- **105 reflow cases:** seven public routes at 320/390/768/1024/1440 with default and combined extra-large/high-contrast/underlined/reduced-motion preferences, plus individual preference modes at desktop. No horizontal overflow, clipped visible text, duplicate IDs or landmark defects.
- **17 automated axe audits:** default/combined public pages, preference dialog and targeted post-correction homepage audits; zero violations. Four further default/combined mobile-dialog audits passed at 320/390. These automated checks support the review; they are not a formal accessibility certification.
- **Native browser zoom:** seven routes × default/extra-large text at genuine Chromium 200% zoom; 14 cases passed. A 1440×900 physical viewport became 720×450 CSS pixels with DPR 2 and visual scale 1. Search, filters, menu, preferences, notices and PDF interactions remained usable.
- **Keyboard:** skip link focuses main; homepage Tab order reaches search, service pathways and footer with visible rings; Enter activates services search/category/results; mobile Search → Services navigation closes the menu; notice disclosures respond to Enter/Space. Preference radio arrows, toggle Space, Reset, forward/backward dialog containment and Escape focus return passed.
- **Preferences/motion:** Large/Extra large, contrast, underlines and reduced motion persist across refresh and client navigation. Reset, blocked storage fallback and operating-system reduced motion passed. Menu and accessibility controls remain reachable at 320px.
- **Resident regressions:** homepage water search, search-type/query persistence, service search/category filtering, document search/no-results/clear, all eight local PDF signatures and matching View/Download destinations, and notice disclosure passed. No browser errors in the checks.
- **Alerts:** isolated rendering of advisory/warning/emergency severities across 320/390/1440 with default/combined preferences passed: six documents, 18 presentations, no overflow or axe violations. Live alert publishing was not exercised. The production homepage correctly renders no alert when none is active.
- **Fresh production smoke:** all seven public routes returned 200 with combined preferences restored, one main/H1 and no overflow or browser errors. Unconfigured CMS content fails closed with explicit empty states. Unauthenticated `/admin` returns 307 to `/admin/login`; admin stays at 16px with no public accessibility attributes or controls.
- **Read-only admin audit:** brand, operational typography, compact navigation, visible focus and mobile menu/Escape remain intact at 390/1440. No admin source changed.

## Performance and scope

Measured homepage production script/stylesheet payloads before and after, on the same environment. Gzip sizes are calculated from downloaded asset bodies, not a real-user network timing benchmark.

| Initial resource | Before | After | Difference |
| --- | ---: | ---: | ---: |
| Scripts, raw (8 files) | 604,652 B | 605,238 B | +586 B |
| Scripts, gzip | 186,887 B | 186,977 B | +90 B |
| Stylesheet, raw (1 file) | 71,663 B | 73,764 B | +2,101 B |
| Stylesheet, gzip | 13,311 B | 13,468 B | +157 B |
| Lalkurti WebP | 579,780 B | 579,780 B | unchanged |
| Ayub Park WebP | 286,440 B | 286,440 B | unchanged |

Initial compressed script/CSS payload increased by 247 bytes, approximately 0.12%. No new library, font, photograph or client component was added. Server rendering remains intact; the hero uses Next.js 16's existing image preload API.

Final scope review confirmed no changes to CMS models/providers, Supabase configuration, schemas, datasets, database operations, authentication, middleware, alert persistence, search/filter behavior or dependencies. Public navigation destinations, microcopy, rendering order and optional display of existing event locations are presentation changes. Water's 29 literal text entries, 64 property bindings, 20 links/time/label attributes and 12 IDs were preserved. No backend or business logic was modified.
