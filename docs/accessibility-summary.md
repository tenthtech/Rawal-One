# Accessibility summary

Reviewed on 11 October 2026.

## Target

WCAG 2.2 AA-oriented implementation. The default experience remains the foundation; resident preferences are optional reading-comfort enhancements, not an accessibility overlay.

## Built-in accessibility foundations

- Semantic landmarks and headings, descriptive links, labelled search/filter controls, and meaningful photo alt text; decorative and duplicate imagery remains hidden from assistive technology.
- Skip to main content, visible keyboard focus, native buttons and notices disclosures, and textual severity/status labels rather than colour alone.
- Responsive rem-based typography and reflow, stable emergency information, and OS reduced-motion support.
- Descriptive PDF titles, file metadata, and distinct View PDF / Download PDF actions. Public image attribution remains available through Image credits.

## Resident presentation preferences

- **Text size:** Default (100%), Large (112.5%) and Extra large (125%) root text scale; no page-scale transform.
- **High contrast:** deeper text colours, stronger borders/form boundaries/focus rings, and clearer status separation without image inversion or altered severity meanings.
- **Underline links:** persistent standard-text link underlines; obvious button/tab/card treatments are not unnecessarily underlined.
- **Reduce motion:** removes non-essential transitions and arrow movement. OS reduced-motion remains effective even after Reset disables the manual preference.

Preferences use validated, device/browser-local `localStorage` under `rawal-one-accessibility-v1`. A small static head script restores them before framework hydration. Blocked storage falls back safely and permits visit-only changes with an explanatory status. No account or backend storage is involved. Public/admin route scoping keeps the controls and presentation preferences out of administration.

## Manual and browser checks performed

- **Responsive/reflow:** 105 route/presentation cases across `/`, Services, Water detail, Search, Documents, Notices and Accessibility, checked in development with existing demo content and repeated in production. Default and all-preferences-combined tested at 320, 390, 768, 1024 and 1440px; each individual preference tested on all seven desktop pages. No horizontal text overflow or duplicate IDs detected; each page has one main landmark and h1.
- **Native browser zoom:** actual Chromium 200% default zoom, independently confirmed by CDP `zoom: 2`, not CSS scaling or pinch emulation. A physical 1440 × 900 viewport reflowed to 720 × 450 CSS pixels. Homepage, Services, Search and Documents retained usable navigation, forms, filters, PDF actions and a scrollable dialog without horizontal overflow.
- **Keyboard/focus:** skip link, header/mobile menu, search, services/filter/results, footer and native notices disclosures reviewed. Native dialog opens with Close focused, makes the background inert, supports labelled native radio/checkbox states, Escape and reset, and restores focus to its trigger. Mobile menu remains available after closing the dialog. Focus rings and practical 44px mobile targets reviewed.
- **Persistence/early restoration:** saved preferences survive refresh and Next Link navigation; Reset restores saved defaults. With framework scripts blocked, the head script still restored the combined presentation and 20px root text before hydration. Storage-denied behaviour passed.
- **Reduced motion:** manual, OS-only and OS-after-reset cases retain functional state changes while removing non-essential motion, including independent Tailwind arrow translation. No decorative photo or emergency-alert animation was added.
- **Colour/contrast:** default and strengthened palettes inspected. Representative default muted-copy ratios were 4.79–5.49:1, civic links 7.99:1, and alert labels 6.26–6.49:1. Forms, focus, footer and severity affordances checked without flattening the existing art direction.
- **Forms/semantics:** automated axe WCAG-tag checks found zero violations in 14 page scans plus the combined-preference dialog scan in each runtime, and four additional narrow-dialog scans. These scans supplement semantic and keyboard review; they do not establish complete accessibility conformance or screen-reader interoperability.
- **Regression:** homepage/global search, services query/category filtering, demo-mode notices Enter/Space disclosures and eight PDF view/download destinations, mobile navigation, and production CMS login redirect checked. Production has no published CMS notices/documents in this environment: explicit empty states and the eight existing static PDF URLs were verified without seeding data. Three existing public alert severities passed 18 isolated rendered cases across 320/390/1440px and default/combined preferences; six fixture scans found zero axe violations. Live alerts are empty, so no publishing, persistence or backend-delivery claim is made.
- **Visual review:** [six final screenshots](accessibility-review/README.md) reviewed. One targeted correction aligned the mobile text-size cards; the public composition, photography and content structure are otherwise preserved.

`pnpm typecheck`, `pnpm lint` and `pnpm build` passed. The production smoke check restored combined preferences on all seven public routes without browser errors; `/admin` redirected with HTTP 307 to `/admin/login`, retaining default 16px text with no resident controls or preference attributes. No application dependencies were added; browser/axe helpers were kept outside the repository.

## Important limitation

This internal R&D demonstration has not undergone independent third-party WCAG certification. No formal assistive-technology certification or exhaustive browser/screen-reader audit is claimed. Downloadable PDFs have not been independently audited; accessibility within them may vary. Optional preferences do not replace default accessibility or native browser zoom.

CMS workflows, database/Supabase architecture, authentication, alert persistence and product logic were not changed.
