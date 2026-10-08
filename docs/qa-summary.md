# Rawal One QA summary

## Scope checked

- Public routes: `/`, `/services`, `/services/water-service-interruptions`, `/search`, `/documents` and `/notices`.
- Administration routes: `/admin`, `/admin/alerts/new` and a temporary alert preview.
- End-to-end alert states: draft, preview, published, inactive and expired, including homepage and search visibility.
- Service and global search, document downloads, notice disclosures, navigation, metadata, content, keyboard journeys and responsive layouts.

## Issues fixed

- Moved the planned Satellite Town maintenance window to 10 October 2026 and aligned its last-updated dates.
- Preserved the selected alert severity after server validation and aligned mobile form action order with keyboard order.
- Replaced an invalid PDF `Aside` structure role so every tagged document exposes its “About this resource” content correctly.
- Clarified the waste-guide related-link label and added the missing Rawal One browser icon.

## Known prototype limitations

- Hosted administration uses one manually managed Supabase Auth account; the
  prototype intentionally has no registration, user management or roles.
- Configured deployments use Supabase alert persistence and RLS. Local
  development without Supabase variables uses the clean JSON fallback.
- Email and SMS remain labelled future integrations.
- Search is lightweight local search rather than a production search service.
- All municipal content and workflows are fictional demonstration material.

## Final checks

- `pnpm typecheck`, `pnpm lint` and `pnpm build`: passed.
- Production Chromium review at 320, 390, 768, 1024 and 1440 pixels: passed with no horizontal overflow or console errors.
- Keyboard-only resident, services, documents, notices and alert-administration journeys: passed.
- Internal link, anchor and resource audit: passed; all eight tagged, `en-PK` PDFs open and expose readable structure.
- Local JSON fallback draft, preview, publish, homepage/search visibility,
  deactivate and expiry checks: passed.
- Production-mode admin redirects, no-cache headers and accessible generic
  invalid-login feedback: passed without using real credentials.
- Temporary alerts and QA fixtures were removed; `data/alerts.json` is clean.
- Credential-backed Supabase authentication, RLS and alert lifecycle checks
  remain a deployment verification step because no test project credentials are
  stored in this repository.
