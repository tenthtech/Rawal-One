# Public-site visual review

Final high-fidelity civic art-direction review, **9 October 2026**. These full-page screenshots were captured from the production build using Chromium, a 1000px-high viewport and device scale factor 1. Fonts and local photographs were fully loaded before capture.

| Page/state | Viewport width | Screenshot |
| --- | --- | --- |
| Homepage `/` | 1440px | [Desktop homepage](rawal-one-home-desktop-1440.png) |
| Homepage `/` | 390px | [Mobile homepage](rawal-one-home-mobile-390.png) |
| Homepage, navigation open | 390px | [Mobile navigation](rawal-one-home-mobile-390-menu-open.png) |
| Services `/services` | 1440px | [Services](rawal-one-services-desktop-1440.png) |
| Water service interruptions | 1440px | [Water detail](rawal-one-water-service-desktop-1440.png) |
| Search `/search?q=water` | 1440px | [Search results](rawal-one-search-desktop-1440.png) |
| Documents `/documents` | 1440px | [Documents](rawal-one-documents-desktop-1440.png) |
| Notices `/notices` | 1440px | [Public notices](rawal-one-notices-desktop-1440.png) |

The homepage now uses two real, locally optimized Rawalpindi photographs: Aleem Yousaf's Lalkurti street scene (CC BY-SA 2.0) and Naseerabbas's Ayub Park lake (CC BY-SA 3.0). Full creator/source/licence details and adaptation notices are in [image credits](../image-credits.md) and on the public `/image-credits` page. Keep those credits with shared copies of screenshots containing the photographs. The former generated illustrations have been removed.

The final review covered all eight captures above, plus homepage crops at 320px and 768px and the mobile credits page. The street perspective, people, lights and park fountain remain visible in the responsive crops. No horizontal overflow, broken images, missing alt attributes or browser JavaScript errors were found. No additional visual correction was necessary after integrating and reviewing the photographs.

Verification passed:

- `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `git diff --check`.
- Global search and type filters; service query/category filters and clear-search behavior.
- All eight PDF downloads: HTTP 200, `application/pdf`, valid `%PDF-` signatures.
- All four notice disclosures and Water detail FAQ using the keyboard.
- Mobile navigation open/close, Escape focus restoration and closing on navigation; skip link.
- Unauthenticated `/admin` redirects 307 to `/admin/login`, with sign-in controls present.
- Actual public alert component rendered with temporary advisory, warning and emergency fixtures at 320px, 390px and 1440px. Titles, area, publication/expiry dates, information links and distinct severity treatments were checked without writing persisted alerts.
- Both photographs served locally with descriptive alt text; public credits and licence links present.

Changes are limited to public presentation, local assets and review/attribution documentation. Backend, authentication, Supabase, database, alert persistence and product logic remain unchanged.
