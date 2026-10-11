import type { Metadata } from "next";

import { serviceCategories, services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services administration",
  description:
    "Read-only service content reference for Rawal One administration.",
};

const categoryLabels = new Map(
  serviceCategories.map((category) => [category.slug, category.label]),
);

export default function AdminServicesPage() {
  return (
    <div className="px-5 py-7 sm:px-8 sm:py-9 xl:px-10">
      <div className="mx-auto max-w-[78rem]">
        <header className="border-b border-line pb-6">
          <p className="text-xs font-bold tracking-[0.12em] text-civic uppercase">
            Services
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
            Services
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            Review the resident services currently listed across Rawal One.
          </p>
        </header>

        <section
          aria-labelledby="service-summary-heading"
          className="mt-6 flex flex-col gap-3 border border-line bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 id="service-summary-heading" className="font-bold text-ink">
              {services.length} services
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              <strong className="font-semibold text-ink">
                Service content is fixed in this R&amp;D demonstration.
              </strong>
            </p>
          </div>
          <span className="w-fit rounded-sm border border-line px-2.5 py-1 text-xs font-bold text-muted">
            Read only
          </span>
        </section>

        <section aria-labelledby="service-list-heading" className="mt-8">
          <h2 id="service-list-heading" className="sr-only">
            Service content
          </h2>
          <ul className="divide-y divide-line border-y border-line bg-surface">
            {services.map((service) => (
              <li
                key={service.slug}
                className="grid gap-2 px-5 py-5 md:grid-cols-[minmax(12rem,0.7fr)_minmax(9rem,0.45fr)_minmax(18rem,1.2fr)] md:gap-6"
              >
                <h3 className="font-bold text-ink">{service.title}</h3>
                <p className="text-sm font-semibold text-civic">
                  {categoryLabels.get(service.category)}
                </p>
                <p className="text-sm leading-6 text-muted">
                  {service.summary}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
