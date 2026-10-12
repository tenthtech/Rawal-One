export type RawalpindiPhotoId = "lalkurti" | "ayub-park";

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
] as const satisfies readonly RawalpindiGalleryPhoto[];
