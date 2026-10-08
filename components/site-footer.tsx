import Link from "next/link";

const exploreLinks = [
  { href: "/services", label: "Services" },
  { href: "/search", label: "Search" },
  { href: "/documents", label: "Documents" },
  { href: "/notices", label: "Public notices" },
];

const communityLinks = [
  { href: "/#community", label: "Around the community" },
  { href: "/documents?q=accessibility", label: "Accessibility statement" },
  { href: "/services?category=community-services", label: "Community services" },
];

export function SiteFooter() {
  return (
    <footer id="about-this-demo" className="bg-civic-deep text-white">
      <div className="mx-auto max-w-[76rem] px-5 pt-12 pb-6 sm:px-8 sm:pt-14 lg:px-10">
        <div className="grid gap-x-10 gap-y-9 border-b border-white/20 pb-10 sm:grid-cols-2 xl:grid-cols-[minmax(0,1.2fr)_minmax(8rem,0.65fr)_minmax(9rem,0.7fr)_minmax(0,1.2fr)]">
          <div>
            <Link
              href="/"
              className="inline-block text-[1.65rem] font-extrabold tracking-[-0.04em] text-white no-underline"
            >
              Rawal One
            </Link>
            <p className="mt-1 text-sm font-medium text-white/85">
              Your city. One place.
            </p>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/75">
              An easier starting point for everyday services, local updates and
              community life in Rawalpindi.
            </p>
          </div>

          <nav aria-label="Explore">
            <h2 className="text-sm font-bold tracking-[0.08em] text-white/70 uppercase">
              Explore
            </h2>
            <ul className="mt-3 space-y-1">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-white no-underline hover:underline hover:underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Community information">
            <h2 className="text-sm font-bold tracking-[0.08em] text-white/70 uppercase">
              Community
            </h2>
            <ul className="mt-3 space-y-1">
              {communityLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-white no-underline hover:underline hover:underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold tracking-[0.08em] text-white/70 uppercase">
              About this demonstration
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/85">
              Rawal One is an internal municipal digital-services R&amp;D
              demonstration created by Tenth Tech in Rawalpindi, Pakistan. It
              is not an official government service.
            </p>
          </div>
        </div>

        <p className="pt-5 text-xs leading-5 text-white/65">
          &copy; 2026 Tenth Tech. Research and development demonstration.
        </p>
      </div>
    </footer>
  );
}
