import Link from "next/link";
import type { ReactNode } from "react";

import { PublicPageIntro } from "@/components/public-page-intro";

export function CityPageIntro({
  eyebrow,
  title,
  description,
  sections = [],
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  sections?: readonly { href: string; label: string }[];
}) {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <nav aria-label="Breadcrumb" className="civic-container flex flex-wrap gap-x-2 py-2 text-xs text-muted">
          <Link className="civic-link text-xs" href="/">Home</Link>
          <span aria-hidden="true" className="self-center">/</span>
          <Link className="civic-link text-xs" href="/rawalpindi">Know Rawalpindi</Link>
        </nav>
      </div>
      <PublicPageIntro id="city-page-heading" eyebrow={eyebrow} title={title} description={description} />
      {sections.length > 0 ? (
        <div className="border-b border-line bg-surface">
          <nav aria-label="On this page" className="civic-container">
            <ul className="flex flex-wrap gap-x-6 gap-y-1 py-3">
              {sections.map((section) => (
                <li key={section.href}><a className="civic-link" href={section.href}>{section.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}
