import type { CivicReference } from "@/data/rawalpindi/sources";

export const nullahLai = {
  title: "Understanding Nullah Lai",
  description:
    "The city’s watercourse, monsoon awareness and where to find official information during heavy rain.",
  paragraphs: [
    "Nullah Lai, also called Lai Nullah, is a flood-carrying watercourse through Rawalpindi City. It collects runoff from the surrounding urban catchments.",
    "PDMA Punjab includes Lai Nullah in its Monsoon Contingency Plan 2026 and describes its importance to urban flood planning and monitoring.",
    "This is background information about the city. For current conditions, warnings or instructions, follow the relevant official authorities.",
  ],
  sourceIds: ["flood-lai-2026"],
  geographicScope: "Lai Nullah through Rawalpindi City, provincial monsoon planning",
  lastVerified: "2026-10-13",
} as const satisfies CivicReference & {
  title: string;
  description: string;
  paragraphs: readonly string[];
};

export const floodAdvice = [
  "Follow government weather announcements and official alerts.",
  "Avoid walking in floodwater.",
  "Do not drive through floodwater.",
] as const;

export const floodGuidance = {
  title: "During heavy rain",
  description:
    "PDMA Punjab’s general flood-safety guidance includes these practical precautions.",
  authorityNote:
    "For current emergency information, follow official authorities. Rawal One does not provide live flood status.",
  href: "https://pdma.punjab.gov.pk/advisories",
  sourceIds: ["flood-pdma-guidance", "flood-pdma-pathways"],
  geographicScope: "General Punjab flood-safety guidance, not a local evacuation order",
  lastVerified: "2026-10-13",
} as const satisfies CivicReference & {
  title: string;
  description: string;
  authorityNote: string;
  href: string;
};
