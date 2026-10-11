# Rawal One

Rawal One is a resident-first municipal digital-services R&D demonstration created by Tenth Tech in Rawalpindi, Pakistan. It explores how local services and public information can be organised around resident needs through a clear, accessible digital front door.

Rawal One is an internal prototype. It is not an official government service and is not presented as previous client work.

## Technology

- Next.js with the App Router
- React and TypeScript
- Tailwind CSS
- Supabase Auth and Postgres with row-level security
- pnpm

## Local development

Use Node.js 22.13 or newer and pnpm 11.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000` to view the application.

When both Supabase variables are absent, `pnpm dev` uses development-only
repository fallbacks: alerts use `data/alerts.json`, while notices, documents,
city updates and community events use the existing local content. The local CMS
content is read-only. A partial Supabase configuration does not enable the
fallback.

To exercise the authenticated CMS, copy `.env.example` to `.env.local` and set
both the project URL and public anon key.

Useful checks:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Run the production build locally with `pnpm start` after `pnpm build`.

## Structure

- `app/` — routes, metadata, global styles, and layout
- `components/` — shared public and administration components
- `supabase/schema.sql` — alert table, grants, and row-level security setup
- `supabase/cms-schema.sql` — CMS tables, document Storage bucket, and policies
- `supabase/content-seed.sql` — idempotent demonstration CMS content seed

The current demonstration includes resident service discovery, a water-service
detail experience, emergency-alert publishing, and an authenticated municipal
communications CMS for notices, documents, city updates and community events.
The administration workspace also provides a read-only view of resident
services.

Configured deployments store alerts and CMS records in Supabase and protect
administration with a manually managed Supabase Auth account. Public reads use
the anon key under row-level security, and authenticated administration uses the
same project URL and anon key with the signed-in user's session. No service-role
key is required or supported. Hosted administration fails closed if Supabase is
not configured.

See the concise [Netlify and Supabase deployment guide](docs/deployment.md) for
project setup, environment variables, build settings, demo login and the
intended `rawalone.thetenthtech.com` domain.
