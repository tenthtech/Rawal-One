import type { Metadata } from "next";
import Link from "next/link";

import { PublicPageIntro } from "@/components/public-page-intro";
import { PlacePhotograph } from "@/components/place-photograph";
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

function filterServices(query: string, category: ServiceCategorySlug | undefined): ServiceRecord[] {
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
      <PublicPageIntro
        id="services-heading"
        eyebrow="Resident services"
        title="Services"
        description="Find municipal services, applications, local information and the right pathway for reporting an issue."
      >
        <div className="public-search-panel">
          <form action="/services" method="get" role="search">
            <label
              htmlFor="services-search"
              className="block text-sm font-semibold tracking-[-0.01em] text-ink"
            >
              Search services
            </label>
            <div className="mt-2 flex gap-2">
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
                  className="civic-input search-preview min-h-12 w-full min-w-0 py-3 ps-12"
                />
              </div>
              {activeCategory ? (
                <input
                  type="hidden"
                  name="category"
                  value={activeCategory.slug}
                />
              ) : null}
              <button type="submit" className="civic-button min-h-12 px-4 py-3 sm:px-6">
                Search
              </button>
            </div>
          </form>

          {query ? (
            <Link
              href={buildServicesHref({ category: activeCategory?.slug })}
              className="civic-link mt-2 inline-flex min-h-11 items-center text-sm font-semibold"
            >
              Clear search
            </Link>
          ) : (
            <p className="mt-2 text-xs leading-5 text-muted">
              Search by service, resident task or a common term such as garbage
              or pothole.
            </p>
          )}
        </div>
      </PublicPageIntro>

      <section className="bg-page" aria-label="Services directory">
        <div className="civic-container grid gap-6 py-7 sm:py-9 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12 lg:py-10">
          <nav
            aria-labelledby="service-categories-heading"
            className="min-w-0 border-t-2 border-accent pt-3 lg:self-start"
          >
            <p className="civic-eyebrow sr-only">Explore</p>
            <h2
              id="service-categories-heading"
              className="text-base font-semibold tracking-[-0.025em] text-ink lg:text-lg"
            >
              Browse by category
            </h2>
            <ul className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:block lg:border-t lg:border-line">
              <li className="min-w-0">
                <Link
                  href={buildServicesHref({ query })}
                  aria-current={!activeCategory ? "page" : undefined}
                  className={`flex min-h-11 items-center justify-between gap-2 border px-2.5 py-2 text-[0.8125rem] font-semibold no-underline transition-colors motion-reduce:transition-none lg:min-h-12 lg:justify-start lg:border-0 lg:border-b lg:border-s-[3px] lg:px-4 lg:text-sm ${
                    !activeCategory
                      ? "border-civic bg-civic text-white lg:border-line lg:border-s-accent lg:bg-sage lg:text-civic"
                      : "border-line bg-surface text-ink hover:border-civic hover:bg-sage lg:border-line lg:border-s-transparent lg:bg-transparent lg:hover:border-s-accent lg:hover:bg-surface lg:hover:text-civic"
                  }`}
                >
                  <span className="min-w-0">All services</span>
                  {!activeCategory ? <span aria-hidden="true">✓</span> : null}
                </Link>
              </li>
              {serviceCategories.map((category) => {
                const isCurrent = activeCategory?.slug === category.slug;

                return (
                  <li key={category.slug} className="min-w-0">
                    <Link
                      href={buildServicesHref({
                        query,
                        category: category.slug,
                      })}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`flex min-h-11 items-center justify-between gap-2 border px-2.5 py-2 text-[0.8125rem] font-semibold no-underline transition-colors motion-reduce:transition-none lg:min-h-12 lg:justify-start lg:border-0 lg:border-b lg:border-s-[3px] lg:px-4 lg:text-sm ${
                        isCurrent
                          ? "border-civic bg-civic text-white lg:border-line lg:border-s-accent lg:bg-sage lg:text-civic"
                          : "border-line bg-surface text-ink hover:border-civic hover:bg-sage lg:border-line lg:border-s-transparent lg:bg-transparent lg:hover:border-s-accent lg:hover:bg-surface lg:hover:text-civic"
                      }`}
                    >
                      <span className="min-w-0">{category.label}</span>
                      {isCurrent ? <span aria-hidden="true">✓</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <PlacePhotograph
              photoId="murree-road"
              className="directory-place-photograph"
              sizes="(min-width: 1024px) 224px, (min-width: 640px) 384px, calc(100vw - 40px)"
            />
          </nav>

          <section className="min-w-0" aria-labelledby="service-results-heading">
            <div className="flex flex-col gap-2 border-b-2 border-ink pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
              <div>
                <p className="civic-eyebrow">Directory</p>
                <h2
                  id="service-results-heading"
                  className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-ink"
                >
                  {matchingServices.length === 0
                    ? "No services found"
                    : "Service results"}
                </h2>
              </div>
              <p
                role="status"
                aria-atomic="true"
                className="max-w-full [overflow-wrap:anywhere] text-sm font-semibold text-civic"
              >
                {resultStatus}
              </p>
            </div>

            {matchingServices.length === 0 ? (
              <div className="mt-6 border-s-[3px] border-accent bg-surface px-5 py-8 sm:px-7">
                <p className="max-w-xl text-lg leading-8 text-muted">
                  Try a different search term or browse all services.
                </p>
                <Link
                  href="/services"
                  className="civic-button mt-5 inline-flex min-h-11 items-center px-5 py-3"
                >
                  View all services
                </Link>
              </div>
            ) : (
              <ul className="grid xl:grid-cols-2 xl:gap-x-12">
                {matchingServices.map((service) => (
                  <li key={service.slug} className="min-w-0 border-b border-line">
                    <article className="py-5 sm:py-6">
                      <p className="text-xs font-semibold tracking-[0.06em] text-civic uppercase">
                        <span className="sr-only">Category: </span>
                        {getServiceCategoryLabel(service.category)}
                      </p>
                      <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-[-0.025em] text-ink sm:text-xl">
                        {service.detailHref ? (
                          <Link
                            href={service.detailHref}
                            className="group inline-flex min-h-11 items-center gap-3 text-civic underline decoration-civic/35 underline-offset-4 hover:decoration-civic"
                          >
                            <span>{service.title}</span>
                            <span
                              aria-hidden="true"
                              className="flex h-8 w-8 shrink-0 items-center justify-center border border-line bg-surface text-base text-civic transition-colors group-hover:border-civic group-hover:bg-civic group-hover:text-white motion-reduce:transition-none"
                            >
                              →
                            </span>
                          </Link>
                        ) : (
                          service.title
                        )}
                      </h3>
                      <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted">
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
