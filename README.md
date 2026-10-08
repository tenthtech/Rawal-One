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

Without Supabase variables, local development keeps the clean JSON alert store
as a development-only fallback and allows the local administration workflow.
To use Supabase locally, copy `.env.example` to `.env.local` and set both the
project URL and public anon key.

Useful checks:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Run the production build locally with `pnpm start` after `pnpm build`.

## Structure

- `app/` — routes, metadata, global styles, and layout
- `components/` — shared public shell components
- `supabase/schema.sql` — alert table, grants, and row-level security setup

The current demonstration includes resident service discovery, a water-service
detail experience, and a focused emergency-alert publishing workflow under
`/admin`.

Configured deployments store alerts in Supabase and protect administration with
one manually managed Supabase Auth account. Public alert reads use the anon key
under row-level security; no service-role key is required. Hosted administration
fails closed if Supabase is not configured.

See the concise [Netlify and Supabase deployment guide](docs/deployment.md) for
project setup, environment variables, build settings, demo login and the
intended `rawalone.thetenthtech.com` domain.
