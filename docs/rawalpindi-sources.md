# Rawalpindi civic-information source registry

Verified **13 October 2026**. This registry covers the externally sourced facts
published by the Rawalpindi civic-information feature, including its homepage
teaser and global-search summaries. Data is curated static reference content.
Rawal One is Tenth Tech's R&D demonstration; it does not operate these agencies
or confirm live services, current incidents or today's administrative boundaries.

Research used official PBS, Punjab-government, Police, Emergency Services,
PMA, SHC&ME, RIC, PITB, District Rawalpindi, RDA, WASA and PDMA publications.
Pages/PDFs were fetched through the environment proxy with normal TLS validation.
Scanned PDF evidence and the PMA route map were visually inspected. Client
rendered institutional pages were checked from TLS-verified official HTML and
JavaScript, replayed locally with unrelated requests blocked. No remote writes
or transaction forms were used.

A verification date records checking the published source, not calling a
telephone, visiting a facility or validating live operating status. Where an
update date is absent it is recorded as **not shown**; copyright years,
HTTP Last-Modified and PDF metadata are not silently substituted for publication
dates. Full research captures are retained outside the app; source URLs, excerpts,
scopes and limitations below are the repository's maintainable reference.

## Population — PBS Census 2023

| Fact | Geographic scope | Organization and source | Publication/update date | Verified | Limitation |
| --- | --- | --- | --- | --- | --- |
| **2,284,014 people (2.28M)**; all sexes, 2023 Census | Rawalpindi Metropolitan Corporation, one urban locality in the census | Pakistan Bureau of Statistics, [Table 2, PDF page 6](https://www.pbs.gov.pk/wp-content/uploads/census_tables/tables/table_2_punjab_districts.pdf#page=6) | Not shown | 13 October 2026 | Rawalpindi and Chaklala cantonments are separately listed; this is not the total for all urban Rawalpindi. |
| **6,118,911 people (6.12M)**; all sexes, 2023 Census | Rawalpindi District as tabulated by PBS for Census 2023 | Pakistan Bureau of Statistics, [Table 1, PDF page 7](https://www.pbs.gov.pk/wp-content/uploads/census_tables/tables/table_1_punjab_districts.pdf#page=7) | Not shown | 13 October 2026 | The table includes Murree and Kotli Sattian within its published district grouping. This is the census reference geography, not confirmation of today's administrative boundaries. |

The [official PBS census page](https://www.pbs.gov.pk/census/) links these
detailed tables. Their headers expressly identify Census 2023 and the all-sexes
population column. Both rows were checked in extracted text and rendered page
images; an independent review verified the labels and arithmetic.

The brief's candidate district figure, approximately **6.059 million**, was not
corroborated in the reviewed primary captures and is excluded. The precise
linked Table 1 gives 6,118,911. The public site therefore uses **6.12M**, rather
than silently using the suggested 6.06M.

The [National Census Report 2023](https://www.pbs.gov.pk/wp-content/uploads/2020/07/National-Census-Report-2023.pdf)
contains a scope inconsistency in **Table 4.5, PDF page 155**: it prints the
district-sized value within a major-cities table while its city scope footnote
refers to corporation/cantonment areas. That table is excluded as public
evidence. Table 1's explicit district row and Table 2's explicit urban-locality
row supply the defensible scopes. The
[Punjab report](https://www.pbs.gov.pk/wp-content/uploads/2020/07/Provincial-Census-Report-2023-Punjab.pdf)
and [7 August 2023 Gazette notification](https://www.pbs.gov.pk/wp-content/uploads/2024/02/Gazette-Notification-of-Census-2023-07.08.2023.pdf)
were also reviewed; the Gazette does not contain the required Rawalpindi rows.

Both table assets have HTTP Last-Modified 22 January 2025; that is transport
metadata, not a verified publication date. No current population estimate,
growth projection, city ranking or updated boundary is claimed.

Public wording makes the distinction explicit: city and district figures cover
different geographic areas and follow the areas used in the PBS 2023 tables.
Usage: homepage glance section; `/rawalpindi#at-a-glance`; civic search records.

## Health, emergency and police

All facts below were checked on **13 October 2026**. No publication/update date is shown for these cited facts. Copyright years and unrelated homepage news dates are not treated as updates. Exact captures/excerpts are retained in `scratch/city-research/health-police/health-police-evidence.json`; research captures are outside the application repository.

### Major hospitals

| Fact | Geographic scope | Source organization and URL | Published date | Verified | Limitation |
| --- | --- | --- | --- | --- | --- |
| Rawalpindi Teaching Hospital — Tertiary-care hospital (Punjab SHC&ME listing); location: Rawalpindi | Hospital listed in Rawalpindi district in the official SHC&ME tertiary-care institutions directory | [Punjab SHC&ME tertiary institutions](https://health.punjab.gov.pk/TertiaryHospitals.aspx) | Not shown | 13 October 2026 | No verified individual address, neighbourhood, phone, hours, capacity or live availability is provided for this hospital. RMU pages returned upstream HTTP 403. Official information link uses the available provincial directory. |
| Holy Family Hospital — Tertiary-care hospital (Punjab SHC&ME listing); location: Rawalpindi | Hospital listed in Rawalpindi district in the official SHC&ME tertiary-care institutions directory | [Punjab SHC&ME tertiary institutions](https://health.punjab.gov.pk/TertiaryHospitals.aspx) | Not shown | 13 October 2026 | No verified individual address, neighbourhood, phone, hours, capacity or live availability is provided for this hospital. RMU pages returned upstream HTTP 403. Official information link uses the available provincial directory. |
| Benazir Bhutto Hospital — Tertiary-care hospital (Punjab SHC&ME listing); location: Rawalpindi | Hospital listed in Rawalpindi district in the official SHC&ME tertiary-care institutions directory | [Punjab SHC&ME tertiary institutions](https://health.punjab.gov.pk/TertiaryHospitals.aspx) | Not shown | 13 October 2026 | No verified individual address, neighbourhood, phone, hours, capacity or live availability is provided for this hospital. RMU pages returned upstream HTTP 403. Official information link uses the available provincial directory. |
| Rawalpindi Institute of Cardiology — Specialist cardiovascular hospital; location: Rawalpindi, Punjab, Pakistan | Hospital listed in Rawalpindi district in the official SHC&ME tertiary-care institutions directory | [Punjab SHC&ME tertiary institutions](https://health.punjab.gov.pk/TertiaryHospitals.aspx); [Rawalpindi Institute of Cardiology](https://ric.gop.pk/about) | Not shown | 13 October 2026 | The available RIC contact page gives city/province only. A historic construction reference mentions Rawal Road, but this is not a current postal address and is omitted. The phone is general enquiries, not an emergency dispatch number. No capacity, opening hours or live availability claims. |

RIC additional facts: specialist prevention/diagnosis/treatment of cardiovascular diseases — [official RIC About page](https://ric.gop.pk/about). City/province/country and **general enquiries** telephone **051-9281111** — [official RIC Contact page](https://ric.gop.pk/contact). Scope: Rawalpindi Institute of Cardiology; organization: RIC. Publication date not shown; verified 13 October 2026. These are not emergency dispatch or live availability claims. The current official site is client rendered; cited original HTML and JS were curl/TLS-verified, then replayed locally for rendered evidence with other external requests blocked.

First-three-hospital type/context: the [SHC&ME homepage](https://health.punjab.gov.pk/) describes tertiary-care hospitals working under the department as delivering advanced medical services, specialized treatments and clinical training. Scope: departmental tertiary-care hospitals in Punjab. Publication date not shown; verified 13 October 2026. Do not strengthen this to institution-specific medical capability or RMU affiliation.

Naming/access limitation: RMU pages returned upstream 403. The available provincial list names Rawalpindi Teaching Hospital; DHQ alias and individual neighbourhood/street details are not verified or recommended for publication.

### Emergency services

| Fact | Scope | Official organization / URL | Published date | Verified | Limitation |
| --- | --- | --- | --- | --- | --- |
| Rescue emergency number 1122 | Punjab Emergency Service | [Emergency Services Department, Government of the Punjab](https://www.rescue.gov.pk/) | Not shown | 13 October 2026 | External emergency service; no availability/response-time promises. |
| Rescue remit: medical emergencies, road traffic crashes, fire, rescue, flood/water rescue | Punjab Emergency Service | [Emergency Services Department introduction](https://www.rescue.gov.pk/Introduction.aspx) | Not shown | 13 October 2026 | Restrained paraphrase of published remit; no procedures or medical advice. |
| Police Emergency 15 | Punjab Police service | [Punjab Police, Government of the Punjab](https://www.punjabpolice.gov.pk/) | Not shown | 13 October 2026 | Separate from non-emergency directory telephone contacts. |

### Police directory

Official directory: [Punjab Police — SDPOs and Police Stations - Rawalpindi](https://www.punjabpolice.gov.pk/RawalpindiDirectory), followed from [City Police Offices](https://www.punjabpolice.gov.pk/CityPOContacts). Geographic scope: the published Rawalpindi police directory, which includes Murree and Kotli Sattian. Its update date is absent; current administrative boundaries, operating status and complete current roster are not established. Verified 13 October 2026.

Source-derived counts: **11 circles; 30 stations; 4 explicitly named police posts; 34 facility entries**. These describe the published table, not current operating-facility totals. Every circle/station/phone association comes from exact original table cells; officer/SDPO numbers are excluded.

| Exact facility name | Kind | Exact source circle | Telephone as printed | Public contact use |
| --- | --- | --- | --- | --- |
| Cantt | Police station | Cantt Circle | 051-9270652 | Exact printed contact; tel normalization removes hyphens only. |
| Saddar Barooni | Police station | Saddar Circle | 051-9292856 | Exact printed contact; tel normalization removes hyphens only. |
| City | Police station | City Circle | 051-9334688 | Exact printed contact; tel normalization removes hyphens only. |
| R.A Bazar | Police station | Cantt Circle | 051-9270653 | Exact printed contact; tel normalization removes hyphens only. |
| Chountra | Police station | Saddar Circle | 051-4673181 | Exact printed contact; tel normalization removes hyphens only. |
| Ganjmandi | Police station | City Circle | 051-9334366 | Exact printed contact; tel normalization removes hyphens only. |
| Westridge | Police station | Cantt Circle | 051-9334349 | Exact printed contact; tel normalization removes hyphens only. |
| Rawat | Police station | Saddar Circle | 051-3595100 | Exact printed contact; tel normalization removes hyphens only. |
| Pirwadhai | Police station | City Circle | 051-9334559 | Exact printed contact; tel normalization removes hyphens only. |
| Naseerabad | Police station | Cantt Circle | 051-9334114 | Exact printed contact; tel normalization removes hyphens only. |
| Police Post Adyala | Police post | Saddar Circle | 051-5133156 | Exact printed contact; tel normalization removes hyphens only. |
| Ratta Amral | Police station | City Circle | 051-9334844 | Exact printed contact; tel normalization removes hyphens only. |
| Race Course | Police station | Cantt Circle | 051-9334088 | Exact printed contact; tel normalization removes hyphens only. |
| Taxila | Police station | Taxila Circle | 051-9314355 | Exact printed contact; tel normalization removes hyphens only. |
| Gujar Khan | Police station | Gujar Khan Circle | 051-9330013 | Exact printed contact; tel normalization removes hyphens only. |
| Waris Khan | Police station | Waris Khan Circle | 051-9334344 | Exact printed contact; tel normalization removes hyphens only. |
| Wah Cantt | Police station | Taxila Circle | 051-905523218 | Omitted pending official corroboration; abnormal printed length. |
| Mandra | Police station | Gujar Khan Circle | 051-3591333 | Exact printed contact; tel normalization removes hyphens only. |
| Banni | Police station | Waris Khan Circle | 051-9334455 | Exact printed contact; tel normalization removes hyphens only. |
| Wah Sadar | Police station | Taxila Circle | 051-9330005 | Exact printed contact; tel normalization removes hyphens only. |
| Jatli | Police station | Gujar Khan Circle | 051-3556010 | Exact printed contact; tel normalization removes hyphens only. |
| Police Post City | Police post | Taxila Circle | 051-9314242 | Exact printed contact; tel normalization removes hyphens only. |
| Civil Lines | Police station | Civil Lines Circle | 051-9286039 | Exact printed contact; tel normalization removes hyphens only. |
| Kahuta | Police station | Kahuta Circle | 051-3311056 | Exact printed contact; tel normalization removes hyphens only. |
| New Town | Police station | New Town Circle | 051-9290286 | Exact printed contact; tel normalization removes hyphens only. |
| Airport | Police station | Civil Lines Circle | 051-9280333 | Exact printed contact; tel normalization removes hyphens only. |
| Kallar Syedan | Police station | Kahuta Circle | 051-9330009 | Exact printed contact; tel normalization removes hyphens only. |
| Sadiqabad | Police station | New Town Circle | 051-9334899 | Exact printed contact; tel normalization removes hyphens only. |
| Morgha | Police station | Civil Lines Circle | 051-9334848 | Exact printed contact; tel normalization removes hyphens only. |
| Women | Police station | Civil Lines Circle | 051-9292832 | Exact printed contact; tel normalization removes hyphens only. |
| Police Post DHA | Police post | Civil Lines Circle | 051-5138143, 051-5138144 | Exact printed contact; tel normalization removes hyphens only. |
| Kotli Sattian | Police station | Kotli Sattian Circle | 051-3356014 | Exact printed contact; tel normalization removes hyphens only. |
| Murree | Police station | Murree Circle | 051-3756632 | Exact printed contact; tel normalization removes hyphens only. |
| Police Post Sunny Bank | Police post | Murree Circle | 051-9269089 | Exact printed contact; tel normalization removes hyphens only. |

Each row above shares source organization **Punjab Police, Government of the Punjab**, exact source URL **https://www.punjabpolice.gov.pk/RawalpindiDirectory**, geographic scope **the published Rawalpindi directory**, publication/update date **not shown**, and verification date **13 October 2026**. Cell coordinates/excerpts and preserved original HTML are in the structured evidence handoff.

Conflict/limitation: the Wah Cantt row prints **051-905523218**. Its nine-digit subscriber portion is unresolved. The facility remains represented but its public telephone/direct-call link must be omitted; no shorter replacement is inferred.

The alternative cporwp.punjabpolice.gov.pk host returned proxy CONNECT 403 once and was not retried/bypassed. The parent Punjab Police directory supplies authoritative data.


## Metrobus — complete published route

**Topic:** Pakistan Metrobus System / Rawalpindi–Islamabad Metrobus.
**Scope:** Saddar–Pak Secretariat corridor, not other Islamabad transport lines.
**Publisher:** Punjab Masstransit Authority, Government of Punjab.
**Publication/update date:** not shown on the cited pages/map.
**Verified:** 13 October 2026.

| Fact | Official source | Evidence and limitation |
| --- | --- | --- |
| Pakistan Metrobus System serves Rawalpindi–Islamabad; 24 stations | [PMA system profile](https://pma.punjab.gov.pk/pakistan-metrobus-system) | Source expressly states 24. This is the published system, not a live operating-status claim. |
| Terminals: Saddar and Pak Secretariat | [PMA homepage](https://pma.punjab.gov.pk/) | Homepage explicitly names the operating corridor. No fares, hours, timetable or helpline was verified for publication. |
| Complete station labels and sequence below | [PMA route-map index](https://pma.punjab.gov.pk/route-maps) → [official map](https://pma.punjab.gov.pk/system/files/PMBS1.jpg) | All map labels were read visually, including Marrir Chowk, 6th Road Station and Katchery. Sequence numbers below are editorial order, not official station IDs. |

| Route order | PMA map station label |
| --- | --- |
| 1 | Saddar |
| 2 | Marrir Chowk |
| 3 | Liaquat Bagh |
| 4 | Committee Chowk |
| 5 | Waris Khan |
| 6 | Chandni Chowk |
| 7 | Rehmanabad |
| 8 | 6th Road Station |
| 9 | Shamsabad |
| 10 | Faizabad |
| 11 | IJP |
| 12 | Potohar |
| 13 | Khayaban-e-Johar |
| 14 | Faiz Ahmed Faiz |
| 15 | Kashmir Highway |
| 16 | Chaman |
| 17 | Ibn-e-Sina |
| 18 | Katchery |
| 19 | PIMS |
| 20 | Stock Exchange |
| 21 | 7th Avenue |
| 22 | Shaheed-e-Millat |
| 23 | Parade Ground |
| 24 | Pak Secretariat |

The count independently agrees with the system profile. The map's HTTP
Last-Modified is 1 September 2025, not an established publication date. No exact
municipal boundary, interchange, transfer, distance or station coordinates are
inferred. Volatile fares/hours/availability are omitted; the user follows the
official operator for current details.

Usage: `/rawalpindi/metrobus`; hub transport teaser; station/topic search
results. The site draws an original schematic with a complete semantic HTML
station list. The original PMA base map has no verified reuse licence and is
**not shipped as an asset**.

## Government services, public offices and e-Khidmat

The following sources support the centre, service categories and restrained
institutional responsibility summaries. Each entry records exact supporting
wording so later edits cannot quietly strengthen the claim.

| Source ID / topic | Fact or exact support | Geographic scope | Organization and URL | Publication/update date | Verified | Limitation |
| --- | --- | --- | --- | --- | --- | --- |
| gov-ekhidmat-programme · Citizen Facilitation & Service Centers | The Citizen Facilitation and Service Centres (e-Khidmat Markaz) are initially operational in various districts i.e, Lahore, Rawalpindi, Faisalabad, Sargodha, Gujranwala and Sahiwal. These centres offer more than 17 different services like Domicile Certification, Traffic Fine Collection and Issuance of Route Permit. | Punjab programme; explicitly includes Rawalpindi | Punjab Information Technology Board, Government of Punjab · [Official source](https://pitb.gov.pk/cfsc) | Not shown | 13 October 2026 | Undated programme overview; do not repeat service count as a current statistic or guarantee particular service availability. No Rawalpindi address, phone, hours or requirements given. |
| gov-ekhidmat-rawalpindi · Chief IT P&D Visits e-Khidmat Center Rawalpindi | He also visited the CSR (Citizen Service Representative) Hall to inspect the different departmental services available at the facilitation center such as NADRA, Traffic Police (Driving License Service), Excise, Punjab Land Record Authority (PLRA) and e-Stamping etc. | Rawalpindi e-Khidmat centre | Punjab Information Technology Board, Government of Punjab · [Official source](https://pitb.gov.pk/node/10466) | 2024-11-29 | 13 October 2026 | Dated report establishes the actual Rawalpindi centre and departments, not live availability. Node10467 is duplicate content. Undated later testimonial node11263 separately confirms Rawalpindi centre, but is not a service catalogue. |
| gov-district-pathways · Services | e-Khidmat Markaz (Birth Certificate); e-Khidmat Markaz (Character Certificate); e-Khidmat Markaz (Death Certificate); e-Khidmat Marrkaz (Domicile Certificate); e-Khidmat Markaz (Issuance of Fard); e-Khidmat Markaz (Learners Driving License); e-Khidmat Markaz (Marriage Certificate) | District Rawalpindi official links to Punjab government services | District Rawalpindi, Government of Punjab · [Official source](https://rawalpindi.punjab.gov.pk/services) | Not shown | 13 October 2026 | Catalogue links point to older fc.punjab.gov.pk/services fragments. That portal and ekhidmat.punjab.gov.pk returned503, so link the working official District Services page or PITB programme page. Publish categories/pathways, no fees, requirements, appointment promises, transaction forms or availability guarantee. |
| gov-rda-functions · Powers & Functions of Authority | Building, land use control, and urban development plans; Approval and control over private housing schemes; To plan, guide, control, and implement short and long term development projects | RDA jurisdiction in Rawalpindi; not all district/cantonment services | Rawalpindi Development Authority, Government of Punjab · [Official source](https://rda.gop.pk/authority) | Not shown | 13 October 2026 | Use broad verified planning/building/housing role, not claim RDA administers every public service. Address and general public-information phone appear on its Contact page but are unnecessary for this compact office directory. |
| gov-wasa-role · WASA Rawalpindi — Water & Sanitation Agency Rawalpindi \| Official Website | Official meta description: WASA Rawalpindi provides safe drinking water, sewerage, and sanitation services to citizens of Rawalpindi, Punjab, Pakistan. Check your bill, lodge complaints, and access services online. | WASA Rawalpindi services; no claim of every district/cantonment being covered | Water and Sanitation Agency Rawalpindi · [Official source](https://wasarwp.gop.pk/) | Not shown | 13 October 2026 | Official identity established by partner hyperlink on RDA homepage to this exact domain. Full site body needs unapproved Sanity CDN; no attempt made to bypass proxy or fetch that domain. Broad role only, no phone, centre, service area, water availability, bill amount or Lai claims inferred from metadata. Earlier candidate wasarwp.punjab.gov.pk is not the current verified source. |

Public service pathways are **Birth certificate, Death certificate, Marriage
certificate, Domicile certificate, Character certificate, Learner driving licence
and Issuance of Fard**. Each category is listed on the
[official District Services page](https://rawalpindi.punjab.gov.pk/services).
Descriptions direct residents to official information; they do not invent
eligibility, required documents, fees, procedures or processing times.

The actual Rawalpindi e-Khidmat centre is supported by PITB's programme page and
**29 November 2024** centre report. The report names NADRA, Traffic Police
driving-licence services, Excise, PLRA and e-Stamping. It is explicitly presented
as a dated report, not today's service-availability guarantee. No verified
current address, telephone or opening hours were available, so those fields
are omitted. Direct/older e-Khidmat portals returned HTTP 503 during research;
the working District/PITB information pathways are used.

Public-office descriptions are limited to verified responsibilities:
District Administration's official service pathways; e-Khidmat's shared
government-service pathway; WASA water/sewerage/sanitation; RDA urban planning,
building/land-use control and private housing-scheme approvals; PDMA official
advisory pathways. None implies coverage of every district/cantonment service.

WASA's current official domain was followed from RDA's partner link. Its verified
metadata supports the broad role only; additional content depended on an
unapproved third-party domain and was not fetched or inferred.

Usage: `/rawalpindi/government-services`, hub pathways and static civic search.
External labels identify the provider; no Rawal One application transaction or
new administrative workflow is introduced.

## Nullah Lai and flood awareness

| Topic | Fact or exact support | Geographic scope | Organization and URL | Publication/update date | Verified | Limitation |
| --- | --- | --- | --- | --- | --- | --- |
| flood-lai-2026 · Punjab Monsoon Contingency Plan 2026, section1.2.4.1.6 Lai Nullah in Rawalpindi | Lai Nullah is the principal flood-carrying channel passing through Rawalpindi City. ... it drains runoff from the surrounding urban catchments ... Owing to the concentration of population and infrastructure along its banks, Lai Nullah remains one of the most closely monitored urban flood channels in Punjab. | Lai Nullah through Rawalpindi City; provincial monsoon planning | Provincial Disaster Management Authority, Punjab · [Official source](https://pdma.punjab.gov.pk/system/files/PDMA%20BOOk%202026-compressed.pdf) | 2026 | 13 October 2026 | No live status, current risk, thresholds, vulnerable locality list, population-at-risk count, history/casualty figures or route-map coordinates should be republished. Source uses Lai Nullah in prose and Nullah Lai in figure labels. Publicly use Nullah Lai consistently, optionally explain Lai Nullah alternate on first mention. Source PDF map not licensed as an image asset; do not copy/reuse it. Facts can be summarized with source citation. |
| flood-pdma-guidance · Safety Measures regarding Floods | Keep yourself well informed about weather conditions before and during Monsoon season, through radio, television, and mobile phones, and act upon the announcements made by the government. ... Avoid walking in flood water ... Do not drive vehicle in flood water as it can sweep the vehicle away. | General flood safety across Punjab; not a specific Rawalpindi evacuation order | Provincial Disaster Management Authority, Punjab · [Official source](https://pdma.punjab.gov.pk/system/files/Untitled.pdf) | Not shown | 13 October 2026 | Still linked from current PDMA Documents page. No displayed publication/update date; PDF metadata ModDate8November2018 is not asserted to be publication. Compact public panel only uses these conservative explicit instructions, attributed to PDMA. Rawal One is not a warning authority. |
| flood-pdma-pathways · Advisories and functions | Advisories page links Flood Advisory and Weather Advisory. Functions page states Coordinate response in the event of disaster and Promote general education, awareness and community training relating to the actions to be taken in response to disaster. | Punjab; follow authority's own timestamped notices | Provincial Disaster Management Authority, Punjab · [Official source](https://pdma.punjab.gov.pk/advisories) | Not shown | 13 October 2026 | Link official advisories, do not mirror historic website alerts as current/live warnings. PDMA’s additional helpline is not published by this feature. |

The Monsoon Contingency Plan 2026, section **1.2.4.1.6**, printed pages 12–13 /
PDF pages 28–29, describes the flood-carrying watercourse through Rawalpindi City,
urban runoff and its planning/monitoring significance. The decisive scanned
pages were visually checked after OCR. Official prose uses **Lai Nullah** and
figure labels use **Nullah Lai**. The public site consistently uses **Nullah Lai**,
acknowledging the alternate once.

The currently linked PDMA safety PDF explicitly supports:
**follow government weather announcements; avoid walking in floodwater; do not
drive through floodwater**. This is general Punjab guidance, not a current
Rawalpindi evacuation order. No displayed publication date exists; PDF metadata
suggests 8 November 2018 but is not asserted as its publication date.

Current information points to PDMA's own advisories. No historic website notice
is mirrored as a live warning. No live levels, thresholds, predicted risk,
affected-neighbourhood list, population-at-risk count, casualties or current
emergency instructions are published. The original illustrative linework is
not a geographic map. PDMA's large PDF/maps are research evidence only.

Usage: `/rawalpindi/nullah-lai`, hub topic and civic search aliases (including
Nala Lai and Lai Nullah).

## Around the city — public places

| Fact | Geographic scope | Organization and source | Publication/update date | Verified | Limitation |
| --- | --- | --- | --- | --- | --- |
| Ayub National Park is a Rawalpindi park near Grand Trunk Road | Selected Rawalpindi city place within district list | District Rawalpindi, Government of Punjab · [Important Places](https://rawalpindi.punjab.gov.pk/important_places) | Not shown | 13 October 2026 | Page places it between Murree Brewery and Grand Trunk Road. No hours, fees, current amenities or access guarantee. |
| Liaquat Bagh is a city park in the official important-places list | Selected Rawalpindi city place within district list | District Rawalpindi, Government of Punjab · [Important Places](https://rawalpindi.punjab.gov.pk/important_places) | Not shown | 13 October 2026 | Basic name/type only. Historic dates on the page are unnecessary and excluded. |

Usage: `/rawalpindi#places` and civic search. No Taxila district landmark is
misrepresented as inside Rawalpindi city. Visiting details should be confirmed
with the relevant authority.

## Photography and omissions

Existing licensed Murree Road and Ayub Park photographs are reused on the hub.
All four existing gallery assets retain their creators, sources, licences and
change notices in [image credits](image-credits.md) and the public credit page.
No additional photograph, news/disaster image or unlicensed official map is added.

Unavailable RMU pages are not treated as evidence. The working provincial
hospital list supplies the published name Rawalpindi Teaching Hospital; the DHQ
alias remains unverified and is omitted. NDMA pages were unavailable; the flood
content uses PDMA primary sources. An ambiguous district-plan index link and
blocked alternate police/WASA candidates are excluded rather than bypassed.
