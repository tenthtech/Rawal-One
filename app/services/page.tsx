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
        className="border-b border-line bg-sage"
        aria-labelledby="services-heading"
      >
        <div className="mx-auto grid max-w-[76rem] gap-9 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,0.78fr)_minmax(28rem,1.22fr)] lg:items-end lg:gap-16 lg:px-10">
          <div className="max-w-2xl border-s-4 border-accent ps-5 sm:ps-7">
            <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
              Resident services
            </p>
            <h1
              id="services-heading"
              className="mt-3 text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl"
            >
              Services
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
              Find municipal services, applications, local information and the
              right pathway for reporting an issue.
            </p>
          </div>

          <div className="border-t-4 border-accent bg-surface p-5 shadow-[0_1px_0_rgba(24,37,33,0.08)] sm:p-7">
            <form action="/services" method="get" role="search">
              <label
                htmlFor="services-search"
                className="block text-base font-bold text-ink"
              >
                Search services
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
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
                    className="search-preview min-h-14 w-full min-w-0 rounded-sm border-2 border-civic bg-white py-3 pe-4 ps-12 text-base text-ink"
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
                  className="min-h-14 rounded-sm bg-civic px-6 py-3 font-bold text-white hover:bg-civic-deep"
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
        <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14 lg:px-10">
          <nav aria-labelledby="service-categories-heading">
            <h2
              id="service-categories-heading"
              className="text-xl font-bold tracking-[-0.015em] text-ink"
            >
              Browse by category
            </h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <li>
                <Link
                  href={buildServicesHref({ query })}
                  aria-current={!activeCategory ? "page" : undefined}
                  className={`flex min-h-12 items-center gap-2 border border-line border-s-4 px-3 py-2 font-bold no-underline ${
                    !activeCategory
                      ? "border-s-civic bg-sage text-civic"
                      : "border-s-transparent bg-surface text-ink hover:border-s-civic hover:text-civic"
                  }`}
                >
                  {!activeCategory ? <span aria-hidden="true">✓</span> : null}
                  <span className="min-w-0">All services</span>
                </Link>
              </li>
              {serviceCategories.map((category) => {
                const isCurrent = activeCategory?.slug === category.slug;

                return (
                  <li key={category.slug}>
                    <Link
                      href={buildServicesHref({
                        query,
                        category: category.slug,
                      })}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`flex min-h-12 items-center gap-2 border border-line border-s-4 px-3 py-2 font-bold no-underline ${
                        isCurrent
                          ? "border-s-civic bg-sage text-civic"
                          : "border-s-transparent bg-surface text-ink hover:border-s-civic hover:text-civic"
                      }`}
                    >
                      {isCurrent ? <span aria-hidden="true">✓</span> : null}
                      <span className="min-w-0">{category.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <section className="min-w-0" aria-labelledby="service-results-heading">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <h2
                id="service-results-heading"
                className="text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl"
              >
                {matchingServices.length === 0
                  ? "No services found"
                  : "Service results"}
              </h2>
              <p
                role="status"
                className="max-w-full [overflow-wrap:anywhere] text-base font-bold text-civic"
              >
                {resultStatus}
              </p>
            </div>

            {matchingServices.length === 0 ? (
              <div className="mt-7 border-y border-line bg-surface px-5 py-8 sm:px-7">
                <p className="max-w-xl text-lg leading-8 text-muted">
                  Try a different search term or browse all services.
                </p>
                <Link
                  href="/services"
                  className="mt-5 inline-flex min-h-11 items-center rounded-sm bg-civic px-5 py-3 font-bold text-white no-underline hover:bg-civic-deep"
                >
                  View all services
                </Link>
              </div>
            ) : (
              <ul className="mt-7 grid border-t border-line xl:grid-cols-2 xl:gap-x-10">
                {matchingServices.map((service) => (
                  <li key={service.slug} className="min-w-0 border-b border-line">
                    <article className="px-1 py-6 sm:px-3 sm:py-7">
                      <p className="text-sm font-bold text-civic">
                        <span className="sr-only">Category: </span>
                        {getServiceCategoryLabel(service.category)}
                      </p>
                      <h3 className="mt-2 text-xl font-bold tracking-[-0.015em] text-ink">
                        {service.title}
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
