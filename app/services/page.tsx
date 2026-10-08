import type { Metadata } from "next";
import Link from "next/link";

import {
  getServiceCategory,
  getServiceCategoryLabel,
  serviceCategories,
  services,
  type ServiceCategorySlug,
  type ServiceRecord,
} from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Search and browse resident services, applications and local information in the Rawal One demonstration.",
};

type ServicesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

type ServicesHrefOptions = {
  query?: string;
  category?: string;
};

function getFirstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function tidyQuery(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getSearchableText(service: ServiceRecord) {
  return normalizeSearchText(
    [
      service.title,
      service.summary,
      getServiceCategoryLabel(service.category),
      ...service.keywords,
    ].join(" "),
  );
}

function buildServicesHref({ query, category }: ServicesHrefOptions = {}) {
  const params = new URLSearchParams();

  if (query) params.set("q", query);
  if (category) params.set("category", category);

  const search = params.toString();
  return search ? `/services?${search}` : "/services";
}

function getResultStatus(
  count: number,
  query: string,
  categoryLabel: string | undefined,
) {
  const serviceLabel = count === 1 ? "service" : "services";

  if (query && categoryLabel) {
    return `${count} ${serviceLabel} matching “${query}” in ${categoryLabel}`;
  }

  if (query) return `${count} ${serviceLabel} matching “${query}”`;
  if (categoryLabel) return `${count} ${serviceLabel} in ${categoryLabel}`;

  return `${count} ${serviceLabel}`;
}

function filterServices(query: string, category: ServiceCategorySlug | undefined) {
  const searchTerms = normalizeSearchText(query).split(" ").filter(Boolean);

  return services.filter((service) => {
    if (category && service.category !== category) return false;
    if (searchTerms.length === 0) return true;

    const searchableText = getSearchableText(service);
    return searchTerms.every((term) => searchableText.includes(term));
  });
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const params = await searchParams;
  const query = tidyQuery(getFirstParam(params.q));
  const requestedCategory = getFirstParam(params.category).trim().toLowerCase();
  const activeCategory = getServiceCategory(requestedCategory || undefined);
  const matchingServices = filterServices(query, activeCategory?.slug);
  const resultStatus = getResultStatus(
    matchingServices.length,
    query,
    activeCategory?.label,
  );

  return (
    <>
      <section
        className="border-b border-line bg-page"
        aria-labelledby="services-heading"
      >
        <div className="mx-auto grid max-w-[76rem] gap-8 px-5 py-11 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(27rem,1.18fr)] lg:items-center lg:gap-20 lg:px-10">
          <div className="max-w-xl">
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.14em] text-civic uppercase sm:text-sm">
              <span aria-hidden="true" className="h-0.5 w-8 bg-accent" />
              Resident services
            </p>
            <h1
              id="services-heading"
              className="mt-4 text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl lg:text-[3.5rem]"
            >
              Services
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-muted">
              Find municipal services, applications, local information and the
              right pathway for reporting an issue.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5 shadow-[0_12px_36px_rgba(24,37,33,0.06)] sm:p-7">
            <form action="/services" method="get" role="search">
              <label
                htmlFor="services-search"
                className="block text-lg font-bold tracking-[-0.01em] text-ink"
              >
                Search services
              </label>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <div className="relative min-w-0 flex-1">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-civic"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m16 16 4 4" />
                  </svg>
                  <input
                    key={query}
                    id="services-search"
                    name="q"
                    type="search"
                    defaultValue={query}
                    placeholder="Search waste, permits, water, roads..."
                    className="search-preview min-h-14 w-full min-w-0 rounded-md border border-civic bg-page py-3 pe-4 ps-12 text-base text-ink"
                  />
                </div>
                {activeCategory ? (
                  <input
                    type="hidden"
                    name="category"
                    value={activeCategory.slug}
                  />
                ) : null}
                <button
                  type="submit"
                  className="min-h-14 rounded-md bg-civic px-6 py-3 font-bold text-white hover:bg-civic-deep"
                >
                  Search
                </button>
              </div>
            </form>

            {query ? (
              <Link
                href={buildServicesHref({ category: activeCategory?.slug })}
                className="mt-3 inline-flex min-h-11 items-center font-bold text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
              >
                Clear search
              </Link>
            ) : (
              <p className="mt-3 text-sm leading-6 text-muted">
                Search by service, resident task or a common term such as
                garbage or pothole.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-page" aria-label="Services directory">
        <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-11 sm:px-8 sm:py-14 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14 lg:px-10">
          <nav aria-labelledby="service-categories-heading" className="min-w-0 lg:self-start">
            <h2
              id="service-categories-heading"
              className="text-lg font-bold tracking-[-0.015em] text-ink"
            >
              Browse by category
            </h2>
            <ul className="mt-4 grid grid-cols-2 overflow-hidden rounded-lg border border-line bg-surface lg:grid-cols-1">
              <li>
                <Link
                  href={buildServicesHref({ query })}
                  aria-current={!activeCategory ? "page" : undefined}
                  className={`flex min-h-12 items-center justify-between gap-3 border-s-4 px-4 py-2 text-sm font-bold no-underline sm:text-base ${
                    !activeCategory
                      ? "border-s-accent bg-sage text-civic"
                      : "border-s-transparent text-ink hover:border-s-accent hover:bg-page hover:text-civic"
                  }`}
                >
                  <span className="min-w-0">All services</span>
                  {!activeCategory ? <span aria-hidden="true">✓</span> : null}
                </Link>
              </li>
              {serviceCategories.map((category, index) => {
                const isCurrent = activeCategory?.slug === category.slug;

                return (
                  <li
                    key={category.slug}
                    className={
                      index === 0
                        ? "border-s border-line lg:border-s-0 lg:border-t"
                        : "border-t border-line max-lg:even:border-s"
                    }
                  >
                    <Link
                      href={buildServicesHref({
                        query,
                        category: category.slug,
                      })}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`flex min-h-12 items-center justify-between gap-3 border-s-4 px-4 py-2 text-sm font-bold no-underline sm:text-base ${
                        isCurrent
                          ? "border-s-accent bg-sage text-civic"
                          : "border-s-transparent text-ink hover:border-s-accent hover:bg-page hover:text-civic"
                      }`}
                    >
                      <span className="min-w-0">{category.label}</span>
                      {isCurrent ? <span aria-hidden="true">✓</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <section className="min-w-0" aria-labelledby="service-results-heading">
            <div className="flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <h2
                id="service-results-heading"
                className="text-2xl font-bold tracking-[-0.025em] text-ink sm:text-3xl"
              >
                {matchingServices.length === 0
                  ? "No services found"
                  : "Service results"}
              </h2>
              <p
                role="status"
                aria-atomic="true"
                className="max-w-full [overflow-wrap:anywhere] text-sm font-bold text-civic"
              >
                {resultStatus}
              </p>
            </div>

            {matchingServices.length === 0 ? (
              <div className="mt-6 rounded-lg border border-line bg-surface px-5 py-8 sm:px-7">
                <p className="max-w-xl text-lg leading-8 text-muted">
                  Try a different search term or browse all services.
                </p>
                <Link
                  href="/services"
                  className="mt-5 inline-flex min-h-11 items-center rounded-md bg-civic px-5 py-3 font-bold text-white no-underline hover:bg-civic-deep"
                >
                  View all services
                </Link>
              </div>
            ) : (
              <ul className="grid xl:grid-cols-2 xl:gap-x-10">
                {matchingServices.map((service) => (
                  <li key={service.slug} className="min-w-0 border-b border-line">
                    <article className="px-1 py-5 sm:px-2 sm:py-6">
                      <p className="text-xs font-bold tracking-[0.08em] text-civic uppercase">
                        <span className="sr-only">Category: </span>
                        {getServiceCategoryLabel(service.category)}
                      </p>
                      <h3 className="mt-2 text-xl font-bold leading-snug tracking-[-0.02em] text-ink">
                        {"detailHref" in service ? (
                          <Link
                            href={service.detailHref}
                            className="group inline-flex min-h-11 items-center gap-3 text-ink underline decoration-civic/30 underline-offset-4 hover:text-civic hover:decoration-civic"
                          >
                            <span>{service.title}</span>
                            <span
                              aria-hidden="true"
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-civic group-hover:bg-civic group-hover:text-white"
                            >
                              →
                            </span>
                          </Link>
                        ) : (
                          service.title
                        )}
                      </h3>
                      <p className="mt-2 max-w-2xl leading-7 text-muted">
                        {service.summary}
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </section>
    </>
  );
}
