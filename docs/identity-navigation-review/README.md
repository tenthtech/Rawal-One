# Rawalpindi identity and navigation review

Production review, 12 October 2026. These PNG captures are available to download
and share for design review.

## Identity and photography

The existing civic-block logo is retained: four neighbourhood blocks meet at
one shared centre. Header, footer and administration already share that mark;
the SVG browser icon, multi-size ICO and opaque Apple icon now use its exact
geometry. The browser theme colour matches the civic-deep palette. See the
[brand contract](../brand-identity.md).

Four real places supply the photographic identity. The two new photographs
were verified before use, downloaded and optimized locally; they add about
647KB in total. All photographs use Next Image with responsive sizes and
reserved image dimensions. Supporting photographs are lazy-loaded; only the
initial hero image is preloaded.

| Photograph | Creator | Reuse licence | Placement |
| --- | --- | --- | --- |
| Lalkurti street | Aleem Yousaf | CC BY-SA 2.0 | Both homepage galleries; waste collection guide |
| Ayub Park lake | Naseerabbas | CC BY-SA 3.0 | Both galleries; parks and recreation guides |
| Murree Road | King Eliot | CC BY-SA 4.0 | Both galleries; desktop Services directory; road and building guides |
| Rawalpindi railway station | HuangWending18072009 | CC0 1.0 | Both galleries; community support guide |

Exact source URLs, capture dates, Commons revisions, licence links and changes
are recorded in [image credits](../image-credits.md) and on `/image-credits`,
which remains linked from the public footer. These images provide place
context; they do not depict current service operations or demonstration events.

The manual galleries preserve search and task discovery as the homepage's
primary purpose. Context photographs support six selected guides; the small
Services directory photograph is desktop-only so mobile filters and results
stay together. Documents, notices, accessibility and search remain editorial
and utility-focused, connected by shared Rawalpindi labels, type, colour and
the unified identity.

## Navigation

Three native button disclosures replace the flat desktop list:

- Services: Browse all services and the seven existing service categories.
- Community: City updates, Public notices, Around Rawalpindi and Community events.
- Information: Documents, Accessibility statement, Search and About this demonstration.

Ordinary links retain native Tab navigation. Enter/Space toggle disclosures;
Arrow Down can enter desktop links. Escape closes a group and restores its
trigger, then closes the mobile menu on a further Escape. Outside clicks and
focus leaving the navigation close it without stealing focus. Route/hash/Back
and breakpoint changes clear stale menus; resizing returns focus to a visible
control. Existing accessibility dialogs retain their focus and Escape behavior.

Mobile uses the same destinations in collapsed groups, with Search,
Accessibility and Browse all services available above them. The featured
Browse-all destination is not duplicated inside the mobile Services group.
The footer follows the same Services, Community and Information grouping.

## Screenshots

- Homepage: [1440px](homepage-1440.png), [1024px](homepage-1024.png),
  [768px](homepage-768.png), [390px](homepage-390.png), [320px](homepage-320.png).
- Desktop navigation: [Services dropdown](homepage-1440-services-dropdown-open.png).
- Mobile navigation: [Menu open](homepage-390-menu-open.png),
  [Services expanded](homepage-390-services-group-open.png).
- Alternative gallery views: [Desktop second](homepage-1440-galleries-second-slide.png),
  [Desktop third](homepage-1440-galleries-third-slide.png),
  [Mobile second](homepage-390-galleries-second-slide.png),
  [Mobile third](homepage-390-galleries-third-slide.png).
- Services: [Desktop directory](services-1440.png), [Mobile directory](services-390.png),
  [Water](services-water-service-interruptions-1440.png),
  [Road guidance](services-report-pothole-road-issue-1440.png),
  [Building guidance](services-building-permits-applications-1440.png),
  [Parks](services-parks-community-facilities-1440.png),
  [Community support](services-community-information-support-1440.png).
- Mobile guides: [Roads](services-report-pothole-road-issue-390.png),
  [Parks](services-parks-community-facilities-390.png),
  [Community support](services-community-information-support-390.png).
- Information: [Search](search-1440.png), [Documents](documents-1440.png),
  [Notices](notices-1440.png), [Accessibility](accessibility-1440.png).
- Combined accessibility preferences: [Homepage](homepage-390-combined.png),
  [Missed collection](services-missed-waste-collection-390-combined.png).
- Brand: [Native-size SVG, ICO and Apple icon evidence](brand-icon-review.png).

The first review produced one targeted presentation pass: keep mobile
Accessibility above expanded groups, remove the duplicated mobile Browse-all
entry, and omit the added Water sidebar image to preserve that page's balanced
support column. All other crops and compositions passed visual review.

## Verification

- `pnpm typecheck`, `pnpm lint` and `pnpm build`: passed after the correction.
- 110 responsive cases: 100 public page layouts and 10 expanded-navigation
  layouts at 320, 390, 768, 1024 and 1440px, with default and combined
  accessibility preferences. The Water page's 10 cases were rerun after its
  photograph was removed.
- All 16 service pages and their search destinations passed. Directory category
  aliases, combined query/category filters, clearing and empty results passed.
- 20 distinct axe audits passed; four affected audits were rerun after the
  correction. Fifteen final navigation checks cover keyboard activation,
  native Tab order, Escape/focus return, outside clicks, route/hash/Back
  navigation, breakpoint focus repair and accessibility dialogs.
- Four gallery cases and four motion modes passed, including OS and Rawal
  reduced motion. Preferences persisted across navigation and refresh.
- Existing PDF files, protected admin redirects, local photography decoding
  and native browser icon metadata passed. No analytics or other third-party
  requests occurred in the local review.
- Zero application console errors, horizontal overflow or unresolved failures.
  All 29 screenshots were inspected; the three affected captures were refreshed
  and reviewed after the single correction pass.
- Final scope review found 71 protected files and the Water page byte-identical
  to baseline `bcbb263`. `git diff --check` passed.

## Scope

CMS, Supabase, authentication, database schemas, admin CRUD, product datasets,
search algorithms, analytics logic and activation gates, alert persistence and
dependencies are unchanged. The Water page source is restored to its existing
implementation. Public filtering, query handling and destinations retain their
existing behavior. No remote database writes or analytics activation occurred.
