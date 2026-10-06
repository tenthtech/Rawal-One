const popularServiceGroups = [
  {
    title: "Bins, waste & recycling",
    description: "Collection information and everyday waste services.",
  },
  {
    title: "Permits & applications",
    description: "A future home for clear application guidance.",
  },
  {
    title: "Roads, streets & local issues",
    description: "Local service notices and reporting pathways.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="border-b border-line bg-sage" aria-labelledby="help-heading">
        <div className="mx-auto grid max-w-[76rem] gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.88fr)_minmax(24rem,1.12fr)] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-sm font-bold tracking-[0.08em] text-civic uppercase">
              <span className="h-0.5 w-8 bg-accent" aria-hidden="true" />
              Resident services
            </p>
            <h1
              id="help-heading"
              className="mt-5 max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.035em] text-ink sm:text-5xl lg:text-[3.25rem]"
            >
              What can we help you with?
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              A clear starting point for finding local services and public
              information, designed around what residents need to do.
            </p>
          </div>

          <div className="border-t-4 border-accent bg-surface p-5 shadow-[0_1px_0_rgba(24,37,33,0.08)] sm:p-8">
            <label htmlFor="service-search" className="block text-base font-bold text-ink">
              Search Rawal One
            </label>
            <div className="relative mt-3">
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
                id="service-search"
                type="search"
                readOnly
                aria-describedby="search-status"
                placeholder="Search services, permits, waste collection, road notices..."
                className="search-preview min-h-14 w-full rounded-sm border-2 border-civic bg-white py-3 pe-4 ps-12 text-base text-ink"
              />
            </div>
            <p id="search-status" className="mt-3 text-sm leading-6 text-muted">
              Search is shown for design review and is not active in this
              foundation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-page" aria-labelledby="popular-services-heading">
        <div className="mx-auto max-w-[76rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)] md:items-end md:gap-12">
            <div>
              <p className="text-sm font-bold tracking-[0.08em] text-civic uppercase">
                Service preview
              </p>
              <h2
                id="popular-services-heading"
                className="mt-3 text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl"
              >
                Popular services
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted md:justify-self-end">
              This restrained structure establishes how common resident needs
              can be presented. Service details will be added in a later phase.
            </p>
          </div>

          <ul className="mt-10 border-y border-line divide-y divide-line">
            {popularServiceGroups.map((service, index) => (
              <li
                key={service.title}
                className="grid gap-3 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5 sm:py-7"
              >
                <span className="text-sm font-bold text-advisory" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{service.title}</h3>
                  <p className="mt-1 max-w-2xl leading-7 text-muted">
                    {service.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
