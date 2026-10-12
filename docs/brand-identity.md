# Rawal One identity

Rawal One uses one abstract civic mark: four neighbourhood blocks connected to a warm shared centre. It retains the established header and footer silhouette, without an official crest or government insignia.

## Shared geometry

`lib/brand-identity.ts` holds the mark's paths, 44 × 44 view box, 4-unit connection width and amber centre (`#c39448`). `components/brand-mark.tsx` renders these paths in `currentColor`, so the same mark appears in the public header, public footer and administration shell. Each identity link has an accessible name; the SVG itself is decorative.

The browser and home-screen icons reproduce those exact paths, placed at `(10, 10)` in a 64 × 64 canvas. Their white blocks and amber centre sit on the existing civic-deep background (`#102e26`). At 16px, this gives four 4 × 4px blocks, 1px connections and a 2 × 2px centre. The mark contains no small text or competing monogram.

## Assets

| Asset | Use | Format and size |
| --- | --- | --- |
| `app/icon.svg` | Modern browser icon | SVG, scalable 64 × 64 view box |
| `app/favicon.ico` | Browser fallback | ICO with 16, 32, 48 and 64px images |
| `app/apple-icon.png` | iOS home-screen icon | Opaque PNG, 180 × 180px |

These are static Next.js metadata files; Next.js supplies their icon links automatically. No icon handler, external image service, runtime dependency or additional application logic is involved.

## Updating the mark

If the geometry changes, update `lib/brand-identity.ts` and regenerate `app/icon.svg` from its paths using the placement above. Rasterize that SVG to an opaque 180px PNG for the Apple icon, then rasterize at 16, 32, 48 and 64px and package those PNGs into an ICO. The current assets were rendered locally with the environment's Sharp image tool; no package dependencies were added.

Inspect the 16px result at native size and enlarged without smoothing. Confirm the corner blocks, connections and amber centre remain distinct, and that browser metadata references all three files. The public site's photography licences are recorded separately in `docs/image-credits.md`.
