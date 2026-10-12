"use client";

import Image from "next/image";
import { useState } from "react";

import { CivicIcon } from "@/components/civic-icon";
import {
  rawalpindiGalleryPhotos,
  type RawalpindiPhotoId,
} from "@/data/rawalpindi-gallery";

type PublicGalleryProps = {
  id: string;
  label: string;
  variant: "hero" | "community";
  initialPhotoId: RawalpindiPhotoId;
  sizes: string;
  preload?: boolean;
  className?: string;
};

export function PublicGallery({
  id,
  label,
  variant,
  initialPhotoId,
  sizes,
  preload = false,
  className = "",
}: PublicGalleryProps) {
  const start = rawalpindiGalleryPhotos.findIndex((photo) => photo.id === initialPhotoId);
  const photos = [
    ...rawalpindiGalleryPhotos.slice(start),
    ...rawalpindiGalleryPhotos.slice(0, start),
  ];
  const [index, setIndex] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const photo = photos[index];

  function showPhotograph(direction: -1 | 1) {
    const nextIndex =
      (index + direction + photos.length) % photos.length;
    const nextPhoto = photos[nextIndex];

    setIndex(nextIndex);
    setAnnouncement(
      `Photograph ${nextIndex + 1} of ${photos.length}: ${nextPhoto.place}. ${nextPhoto.caption}`,
    );
  }

  return (
    <figure
      id={id}
      className={`public-gallery public-gallery--${variant} ${className}`.trim()}
      aria-label={label}
    >
      <div id={`${id}-slide`} className="public-gallery-window">
        <Image
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          preload={preload && index === 0}
          className={`public-gallery-image public-gallery-image--${photo.id}`}
        />
      </div>

      <figcaption className="public-gallery-footer">
        <div className="public-gallery-caption">
          <span className="photo-caption-rule" aria-hidden="true" />
          <span>
            <strong className="public-gallery-place">{photo.place}</strong>
            <span className="public-gallery-description">{photo.caption}</span>
          </span>
        </div>
        <div className="public-gallery-controls">
          <button
            type="button"
            className="public-gallery-button"
            aria-label={`Previous photograph in ${label}`}
            aria-controls={`${id}-slide`}
            onClick={() => showPhotograph(-1)}
          >
            <CivicIcon
              name="arrow"
              className="public-gallery-arrow public-gallery-arrow--previous"
            />
          </button>
          <span id={`${id}-position`} className="public-gallery-position">
            {index + 1} of {photos.length}
          </span>
          <button
            type="button"
            className="public-gallery-button"
            aria-label={`Next photograph in ${label}`}
            aria-controls={`${id}-slide`}
            onClick={() => showPhotograph(1)}
          >
            <CivicIcon name="arrow" className="public-gallery-arrow" />
          </button>
        </div>
        <p
          className="public-gallery-announcement sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          {announcement}
        </p>
      </figcaption>
    </figure>
  );
}
