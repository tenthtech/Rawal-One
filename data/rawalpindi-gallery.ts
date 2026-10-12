export type RawalpindiPhotoId =
  | "lalkurti"
  | "ayub-park"
  | "murree-road"
  | "rawalpindi-station";

export type RawalpindiGalleryPhoto = {
  id: RawalpindiPhotoId;
  src: string;
  width: number;
  height: number;
  alt: string;
  place: string;
  caption: string;
};

// These local photographs and their reuse licences are recorded in
// docs/image-credits.md and on the public /image-credits page.
export const rawalpindiGalleryPhotos = [
  {
    id: "lalkurti",
    src: "/images/lalkurti-street.webp",
    width: 1920,
    height: 1920,
    alt: "People walking between shops and market stalls beneath colourful evening lights in Lalkurti, Rawalpindi",
    place: "Lalkurti, Rawalpindi",
    caption: "Shops, streets and everyday life.",
  },
  {
    id: "ayub-park",
    src: "/images/ayub-park-lake.webp",
    width: 2000,
    height: 1500,
    alt: "A fountain rises from the lake in Ayub Park, Rawalpindi, surrounded by trees and a waterside path",
    place: "Ayub Park, Rawalpindi",
    caption: "A shared place to pause.",
  },
  {
    id: "murree-road",
    src: "/images/murree-road.webp",
    width: 2000,
    height: 1500,
    alt: "Traffic and motorcycles travel along Murree Road in Rawalpindi beside a planted median and an elevated Metrobus station",
    place: "Murree Road, Rawalpindi",
    caption: "The streets that connect our city.",
  },
  {
    id: "rawalpindi-station",
    src: "/images/rawalpindi-station.webp",
    width: 2000,
    height: 1500,
    alt: "Passengers walk along Rawalpindi railway station’s covered platform beside arched walls and a waiting train",
    place: "Rawalpindi railway station",
    caption: "Shared journeys, everyday connections.",
  },
] as const satisfies readonly RawalpindiGalleryPhoto[];
