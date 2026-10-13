# Rawalpindi civic-information review

Review date: **13 October 2026**. The PNG screenshots below are committed review
artifacts for downloading and sharing. This feature extends the existing public
design; it does not replace the homepage, service guides or administration.

## Information architecture

| Route | Resident purpose |
| --- | --- |
| `/rawalpindi` | Know Rawalpindi: scoped census facts, city essentials, Metro pathway, public-service topics and two city parks |
| `/rawalpindi/health-emergency` | Explicit emergency telephone actions and four structured hospital rows |
| `/rawalpindi/public-safety` | The complete published Punjab Police Rawalpindi directory, filtered locally by name and circle |
| `/rawalpindi/government-services` | Seven certificate/licence/Fard pathways, the verified e-Khidmat centre and five useful public-office roles |
| `/rawalpindi/metrobus` | Complete PMA station sequence, an original route schematic and visible semantic station list |
| `/rawalpindi/nullah-lai` | Sourced watercourse context, conservative PDMA flood precautions and official advisory links |

The hub uses native section links, varied editorial sections, a Murree Road
hero, large census typography, a compact essentials list, a restrained transport
teaser, service topics and a public-place composition. Focused detail routes
keep the complete police and Metro lists out of the hub.

The homepage gains one city-at-a-glance band, with two scoped census figures and
five city-essential pathways after the existing service/reporting content. It
retains its service-first hero, galleries, updates and community content.

Navigation adds **Rawalpindi** as the fourth native disclosure group, after
Services: Know Rawalpindi, City at a glance, Hospitals & emergency, Police &
public safety, Government services, Metro & transport, Nullah Lai and Around
the city. Mobile retains the featured hub link and its existing prominent
Search, Accessibility and Browse-all controls. The footer adds only three civic
links inside its existing groups. Existing keyboard/focus handlers are retained.

Global search adds **88 static civic records** and a **City information** filter.
Hospital, police, service, office, Metro-station and place results reach stable
internal anchors. Keywords support thana, khidmat, metro station, Nala Lai and
other requested journeys. Existing normalization, synonyms, ranking, CMS reads
and previous group priorities remain unchanged.

## Research, scope and limitations

The authoritative [source registry](../rawalpindi-sources.md) records facts,
geographic scope, official publishers/URLs, publication dates when available,
verification dates, exact support and limitations. An independent reviewer
checked the data and public copy against original HTML/PDF/map evidence.

- PBS Census 2023: **2,284,014 (2.28M)** for Rawalpindi Metropolitan Corporation;
  **6,118,911 (6.12M)** for Rawalpindi District as tabulated by PBS. The corporation
  and cantonments are separate census records. The district figure follows
  census geography, including Murree/Kotli Sattian in that table, without
  asserting current boundaries. The brief's approximate 6.059M candidate was
  not corroborated; an internally scope-mixed national-report table is excluded.
- Four hospitals: **Holy Family Hospital, Benazir Bhutto Hospital, Rawalpindi
  Teaching Hospital and Rawalpindi Institute of Cardiology**. The available
  provincial directory supplies the current published teaching-hospital name;
  DHQ alias, individual first-three addresses/phones and capacity/hours are
  unverified and omitted. RIC's **051-9281111** is explicitly general enquiries.
- Official emergency actions: **Rescue 1122** and **Police Emergency 15**.
  Rescue's concise remit is supported by the Emergency Services Department.
  No medical advice, response-time or live-availability claim is introduced.
- Punjab Police's undated published listing contains **11 circles, 30 stations
  and four police posts**. All 34 entries are retained, including Murree and
  Kotli Sattian, with a visible scope/date caveat. Station telephone links
  preserve printed digits; the suspicious Wah Cantt number is omitted pending
  corroboration. Officer/SDPO numbers are not substituted for station contacts.
- District/PITB sources support seven government-service categories and the
  Rawalpindi e-Khidmat centre. Its departmental description is explicitly based
  on a **29 November 2024** report. Current centre address, phone, hours, fees,
  eligibility and availability are unverified and omitted. Unavailable portals
  are replaced with working official information pathways, without promising
  transactions. RDA/WASA/PDMA roles stay within verified responsibilities.
- PDMA's **Monsoon Contingency Plan 2026** supports Nullah Lai's Rawalpindi City
  location, urban runoff and monitoring significance. Currently linked general
  PDMA safety guidance supports following government announcements, avoiding
  walking in floodwater and not driving through floodwater. No levels,
  thresholds, predicted/current risk or neighbourhood warning is published.
- PMA's official map and system profile support **24 stations**, in order from
  **Saddar to Pak Secretariat**. Exact published spellings are retained. Fares,
  hours, helpline, transfer details, distances and exact city boundary are
  unverified and omitted. The published route is reference information, with
  current operating details directed to PMA.
- District sources verify **Ayub National Park** near Grand Trunk Road and
  **Liaquat Bagh** as a city park. Visiting hours, fees and current amenities
  are omitted.

Verification dates describe checking published material, not calling numbers,
visiting centres or confirming live operations. The R&D identity and concise
official-provider note remain visible. Rawal One does not operate these services.

## Imagery and performance

The hub reuses the existing locally served **Murree Road** photograph (King
Eliot, CC BY-SA 4.0) and **Ayub Park** photograph (Naseerabbas, CC BY-SA 3.0).
Their verified licences, original sources and new usage locations are recorded
in [image credits](../image-credits.md) and the existing public footer credit
page. No new image assets are added; all four existing photo assets remain
unchanged. Meaningful alt text, reserved dimensions, responsive crops and Next
Image optimization are retained; the hub hero is preloaded and supporting
photography is lazy-loaded.

All six civic routes are statically prerendered. Only the local police filters
need new client interaction; their containing production JavaScript chunk is
9,568 bytes, approximately **2,754 bytes gzip** in the reviewed build. This is a
chunk measurement, not a claim about total page transfer or end-user speed.
There is no mapping SDK, charting/animation library, new application dependency,
geolocation, live-data request or external image hotlink. The PMA/PDMA source
maps and large PDFs remain research evidence, rather than shipped site assets.

## Accessibility and correction review

The Metro schematic uses original decorative SVG linework beside one always
visible semantic ordered HTML list containing every station name. Numbered
markers and explicit Start/End terminal text provide meaning beyond colour.
Desktop uses three horizontal rows; mobile/tablet uses a readable vertical
route. Extra Large text uses the vertical route at 1024–1279px, preserving whole
words; 1280px and wider retain the horizontal composition.

Police filtering has labelled native inputs, circle selection, a live result
count, reset and an ordinary no-results state. All entries remain server-rendered
and usable without JavaScript. Telephone actions and official links are explicit,
keyboard reachable and comfortably sized. Sources derive verification dates
from the static source registry. No filter value or search term is logged.

The coordinated screenshot/source review corrected unsupported external-arrow
font glyphs with small decorative SVGs, moved Metro turnarounds out of label
areas, improved its narrower Extra Large composition and repaired two section
links. The production accessibility audit also identified small gold section
numbers below contrast requirements; the existing darker clay colour resolves
that issue. Station data, research facts and existing application behavior were
unchanged by those presentation corrections.

## Screenshots

- Homepage: [1440px](homepage-1440.png), [390px](homepage-390.png).
- Rawalpindi hub: [1440px full page](rawalpindi-1440.png),
  [390px full page](rawalpindi-390.png),
  [at a glance](rawalpindi-at-a-glance-1440.png).
- Health & emergency: [1440px](health-emergency-1440.png),
  [390px](health-emergency-390.png).
- Police & public safety: [1440px](public-safety-1440.png),
  [390px](public-safety-390.png).
- Government services: [1440px](government-services-1440.png),
  [390px](government-services-390.png).
- Metrobus: [1440px page](metrobus-1440.png), [390px page](metrobus-390.png),
  [desktop diagram](metrobus-route-1440.png),
  [mobile diagram](metrobus-route-390.png).
- Nullah Lai: [1440px](nullah-lai-1440.png), [390px](nullah-lai-390.png).
- Navigation: [desktop Rawalpindi dropdown](homepage-1440-rawalpindi-dropdown.png),
  [mobile Rawalpindi group](homepage-390-rawalpindi-menu.png).
- Preferences: [Metro High Contrast](metrobus-1440-high-contrast.png),
  [hub Extra Large text](rawalpindi-1440-extra-large.png).

## Final verification

- `pnpm typecheck`, `pnpm lint` and `pnpm build` passed after the final contrast
  correction. All six civic routes are statically prerendered.
- **130 responsive cases** passed: 13 civic/existing routes at 320, 390, 768,
  1024 and 1440px, with default and combined preferences. All 12 expanded
  navigation cases, including 1280px and enlarged text, passed.
- **39 native 200% browser-zoom cases** and 23 focus checks passed across the
  same routes with default, Extra Large and combined preferences. The measured
  1440px physical viewport became 720 CSS pixels at DPR 2, rather than using a
  CSS transform or screenshot scaling.
- **42 unique automated accessibility audits** passed: 19 civic-page contexts,
  13 navigation/police-filter contexts, four gallery/motion contexts and six
  isolated alert documents. Keyboard, focus return, headings, meaningful links,
  contrast, text scaling, underlined links and reduced motion were also reviewed.
- All **12 requested civic search journeys** passed. The 45 existing regression
  checks cover all 16 service guides and their search destinations, filters,
  galleries, four motion modes, preferences, PDFs and public content states.
  Twenty-three source-level service/synonym queries retain identical non-civic
  results; 20 existing search declarations remain unchanged.
- Six final Metro layout/order cases, two no-JavaScript police-directory cases
  and source-date/section-anchor checks on all six civic pages passed. The exact
  24-station sequence, all 34 police entries and phone exclusions were compared
  with independently captured official evidence.
- Sixteen production content-state cases and 24 protected-admin redirect
  assertions passed. The unconfigured production CMS correctly exposes explicit
  empty states; all eight existing PDF payloads remain valid.
- Three additional read-only development-fallback journeys passed: all four
  published notices render and their native Enter/Space disclosures retain
  focus; all eight document view/download pairs, category/text search and reset
  work; notice anchors and the global document query/filter/PDF destinations
  resolve correctly. A stale development process was restarted before these
  checks; no application or production changes were needed.
- All three alert severities passed in **18 isolated component displays** at
  default/combined preferences. These checks exercise rendering with current
  CSS; they do not exercise live publishing, persistence or backend delivery.
- All **21 final screenshots** and 14 additional native-size viewport close-ups
  were critically inspected. No material visual issue remains. The final
  captures include corrected SVG arrows, Metro geometry and contrast.
- Zero unresolved failures, application browser errors, horizontal overflow or
  unexpected external requests. Final diff whitespace check passed.

## Protected scope

CMS, administration CRUD, authentication, Supabase, database schemas, alert
persistence, service datasets, accessibility preference implementation,
analytics logic/activation gates and dependencies remain unchanged. All 92
protected tracked files match baseline `abd8a6c` byte-for-byte. Public search
receives only the documented static index/filter addition; its existing ranking
and CMS aggregation are preserved. No credentials or remote database writes are
introduced. GA activation remains gated off and its existing path allowlist is
unchanged.
