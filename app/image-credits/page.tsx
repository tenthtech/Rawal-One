import type { Metadata } from "next";
import Image from "next/image";

import { PublicPageIntro } from "@/components/public-page-intro";

export const metadata: Metadata = {
  title: "Image credits",
  description: "Photographs of Rawalpindi, their creators and reuse licences.",
};

const photographs = [
  {
    title: "Street lighting in Lalkurti - Rawalpindi, Pakistan",
    creator: "Aleem Yousaf",
    creatorUrl: "https://www.flickr.com/people/42819205@N05",
    source:
      "https://commons.wikimedia.org/wiki/File:Street_lighting_in_Lalkurti_-_Rawalpindi,_Pakistan_(16166062626).jpg",
    licence: "CC BY-SA 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    image: "/images/lalkurti-street.webp",
    width: 1920,
    height: 1920,
    usage: "Homepage galleries and waste service guides",
    date: "1 January 2015",
    changes: "The adapted photograph is shared under the same CC BY-SA 2.0 licence.",
  },
  {
    title: "Ayub park,rawalpindi,pakistan",
    creator: "Naseerabbas",
    creatorUrl: "https://commons.wikimedia.org/wiki/User:Naseerabbas",
    source:
      "https://commons.wikimedia.org/wiki/File:Ayub_park,rawalpindi,pakistan.jpg",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    image: "/images/ayub-park-lake.webp",
    width: 2000,
    height: 1500,
    usage: "Homepage galleries, parks and recreation service guides, and the Know Rawalpindi public-places section",
    date: "5 April 2014",
    changes: "The adapted photograph is shared under the same CC BY-SA 3.0 licence.",
  },
  {
    title: "Murree Road Rawalpindi",
    creator: "King Eliot",
    creatorUrl: "https://commons.wikimedia.org/wiki/User:King_Eliot",
    source:
      "https://commons.wikimedia.org/wiki/File:Murree_Road_Rawalpindi.jpg",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    image: "/images/murree-road.webp",
    width: 2000,
    height: 1500,
    usage: "Homepage galleries, services directory, road and building service guides, and the Know Rawalpindi hero",
    date: "2 March 2016",
    changes: "The adapted photograph is shared under the same CC BY-SA 4.0 licence.",
  },
  {
    title: "Rawalpindi Station Scene 1",
    creator: "HuangWending18072009",
    creatorUrl: "https://commons.wikimedia.org/wiki/User:HuangWending18072009",
    source:
      "https://commons.wikimedia.org/wiki/File:Rawalpindi_Station_Scene_1.jpg",
    licence: "CC0 1.0",
    licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    image: "/images/rawalpindi-station.webp",
    width: 2000,
    height: 1500,
    usage: "Homepage galleries and community support service guides",
    date: "9 December 2024",
    changes: "The photograph is available under the CC0 1.0 public domain dedication; credit is included here to acknowledge its creator.",
  },
];

export default function ImageCreditsPage() {
  return (
    <>
      <PublicPageIntro
        id="image-credits-heading"
        eyebrow="Our shared city"
        title="Image credits"
        description="Real places, seen through local lenses. Thank you to the photographers who make their work available for reuse."
      />
      <div className="civic-container py-10 sm:py-14">
        <p className="max-w-3xl text-base leading-7 text-muted">
          These photographs show Rawalpindi at the dates listed below. They do
          not depict the demonstration events or notices on this website.
        </p>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {photographs.map((photo) => (
            <li
              key={photo.image}
              className="grid gap-6 py-8 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-8"
            >
              <Image
                src={photo.image}
                alt=""
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 640px) 192px, calc(100vw - 40px)"
                className="aspect-square w-full object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold leading-7 text-ink">
                  {photo.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Photograph by{" "}
                  <a
                    href={photo.creatorUrl}
                    className="font-semibold text-civic underline underline-offset-4"
                  >
                    {photo.creator}
                  </a>,{" "}
                  {photo.date}. Used in the {photo.usage.toLowerCase()}.
                </p>
                <p className="mt-2 text-sm leading-7">
                  <a
                    href={photo.source}
                    className="font-semibold text-civic underline underline-offset-4"
                  >
                    Original on Wikimedia Commons
                  </a>
                  {" · "}
                  <a
                    href={photo.licenceUrl}
                    className="font-semibold text-civic underline underline-offset-4"
                  >
                    {photo.licence}
                  </a>
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                  Resized and converted to WebP; cropped to fit the page at
                  different screen sizes. {photo.changes} No photographer
                  endorsement is implied.
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
