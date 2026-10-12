import Image from "next/image";

import { rawalpindiGalleryPhotos, type RawalpindiPhotoId } from "@/data/rawalpindi-gallery";

export function PlacePhotograph({
  photoId,
  sizes,
  className = "",
}: {
  photoId: RawalpindiPhotoId;
  sizes: string;
  className?: string;
}) {
  const photo = rawalpindiGalleryPhotos.find((item) => item.id === photoId);
  if (!photo) return null;

  return (
    <figure className={`place-photograph ${className}`.trim()}>
      <div className="place-photo-window">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          className={`place-photo-image place-photo-image--${photo.id}`}
        />
      </div>
      <figcaption className="place-photo-caption">
        <span className="photo-caption-rule" aria-hidden="true" />
        <span>
          <strong>{photo.place}</strong>
          <span>{photo.caption}</span>
        </span>
      </figcaption>
    </figure>
  );
}
