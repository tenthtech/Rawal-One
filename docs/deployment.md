# Netlify and Supabase deployment

Rawal One uses Netlify's standard Next.js support and a dedicated Supabase
project. No custom server, Netlify Function or service-role key is required.

## Supabase

1. Create a Supabase project for the demonstration.
2. In the SQL Editor, run the complete [supabase/schema.sql](../supabase/schema.sql)
   file. It creates the empty `alerts` table, grants and row-level security
   policies.
3. In Authentication settings, keep email/password enabled, disable public
   email signups and anonymous sign-ins, and remove any unexpected users.
4. Manually create and confirm one demonstration user. The recommended email is
   `rawalone.demo@thetenthtech.com`; create its password in Supabase and keep it
   outside Git.
5. Copy the project URL and public anon key from the project API settings.

For local Supabase testing, copy `.env.example` to `.env.local` and set:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Both values must be present together. The public anon key is constrained by the
included RLS policies; do not add a service-role key.

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

Codex does not deploy the site or change DNS.

## Demo login

Open `/admin/login` and use the manually created demonstration user. The
recommended email is `rawalone.demo@thetenthtech.com`. Its password is created
and managed in Supabase Auth and is never stored in Git.
