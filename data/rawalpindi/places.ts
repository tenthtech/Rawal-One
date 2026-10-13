import type { RawalpindiPhotoId } from "@/data/rawalpindi-gallery";
import type { CivicReference } from "@/data/rawalpindi/sources";

type CityPlace = CivicReference & {
  id: string;
  title: string;
  description: string;
  category: string;
  photoId?: RawalpindiPhotoId;
};

export const cityPlaces = [
  {
    id: "ayub-national-park",
    title: "Ayub National Park",
    description: "A Rawalpindi park near Grand Trunk Road.",
    category: "Green space",
    photoId: "ayub-park",
    sourceIds: ["places-district"],
    geographicScope: "Ayub National Park, Rawalpindi city",
    lastVerified: "2026-10-13",
  },
  {
    id: "liaquat-bagh",
    title: "Liaquat Bagh",
    description: "A city park listed by District Rawalpindi among its important places.",
    category: "City park",
    sourceIds: ["places-district"],
    geographicScope: "Liaquat Bagh, Rawalpindi city",
    lastVerified: "2026-10-13",
  },
] as const satisfies readonly CityPlace[];
