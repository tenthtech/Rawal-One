# Rawal One

Rawal One is a resident-first municipal digital-services R&D demonstration created by Tenth Tech in Rawalpindi, Pakistan. It explores how local services and public information can be organised around resident needs through a clear, accessible digital front door.

Rawal One is an internal prototype. It is not an official government service and is not presented as previous client work.

## Technology

- Next.js with the App Router
- React and TypeScript
- Tailwind CSS
- pnpm

## Local development

Use Node.js 22.13 or newer and pnpm 11.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000` to view the application.

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

The current foundation includes `/`, `/services`, and `/admin`. Product services, search, administration, and integrations are intentionally outside this phase.
