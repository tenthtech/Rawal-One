# Netlify and Supabase deployment

Rawal One uses Netlify's standard Next.js support and a dedicated Supabase
project. No custom server, custom Netlify Function or service-role key is
required.

## Supabase

1. Create a Supabase project for the demonstration.
2. In the SQL Editor, run the complete, unchanged
   [supabase/schema.sql](../supabase/schema.sql) file. It creates the `alerts`
   table, grants and row-level security policies.
3. Next, run the complete
   [supabase/cms-schema.sql](../supabase/cms-schema.sql) file. It creates the
   `notices`, `documents`, `city_updates` and `community_events` tables, their
   row-level security policies, and the public `rawal-documents` Storage bucket
   with authenticated upload, update and delete policies. Do not create the
   bucket separately.
4. Manually run [supabase/content-seed.sql](../supabase/content-seed.sql) after
   both schemas. It loads the repository's demonstration content. The seed uses
   fixed IDs and ignores rows that already exist, so it is safe to run again
   without overwriting later CMS edits; it is deliberately not part of the
   application startup or Netlify build.
5. In Authentication settings, keep email/password enabled, disable public
   email signups and anonymous sign-ins, and remove any unexpected users.
6. Manually create and confirm one demonstration user. The recommended email is
   `rawalone.demo@thetenthtech.com`; create its password in Supabase and keep it
   outside Git.
7. Copy the project URL and public anon key from the project API settings.

The authoritative CMS schema intentionally has no fields for the legacy public
slugs, notice-related links/display labels or City Update call-to-action links.
The application preserves those presentation details only for the fixed
demonstration seed IDs. This compatibility mapping does not add or merge content
records: with Supabase configured, only published rows returned by Supabase are
rendered. Newly created records use ID-qualified anchors, derive notice state
from `closing_at`, and use category-based City Update links.

For local Supabase testing, copy `.env.example` to `.env.local` and set:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Both values must be present together. They support public content reads and the
authenticated administration session. The browser-visible anon key is expected
and is constrained by the included row-level security and Storage policies. Do
not add `SUPABASE_SERVICE_ROLE_KEY` (or any other service-role credential) to
local, Netlify or repository configuration.

If both variables are absent during `pnpm dev`, Rawal One uses its
development-only repository fallbacks: the JSON alert store remains available,
and repository-backed notices, documents, city updates and events remain
visible but read-only in the CMS. A partial configuration fails closed instead
of falling back. Production and hosted administration also fail closed when
Supabase is missing or incomplete.

## Netlify

1. Connect the GitHub repository `tenthtech/Rawal-One`.
2. Select the `main` branch and use Netlify's normal Next.js support.
3. Use pnpm and the build command `pnpm build`. The repository requires Node.js
   22.13 or newer and does not need a custom publish directory, server or
   function.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the
   Netlify environment for builds and runtime functions.
5. Deploy, then add `rawalone.thetenthtech.com` as a custom domain and follow
   Netlify's DNS instructions.

Netlify does not apply the SQL files. Run the three SQL steps above manually in
the target Supabase project before testing the deployment. After deployment,
confirm that published content is visible publicly, the demo user can open
`/admin`, and a PDF uploaded through Documents is served from the
`rawal-documents` bucket.

Codex does not deploy the site or change DNS.

## Demo login

Open `/admin/login` and use the manually created demonstration user. The
recommended email is `rawalone.demo@thetenthtech.com`. Its password is created
and managed in Supabase Auth and is never stored in Git.
