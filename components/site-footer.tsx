import Link from "next/link";

export function SiteFooter() {
  return (
    <footer id="about-this-demo" className="bg-ink text-white">
      <div className="mx-auto max-w-[76rem] px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="grid gap-8 border-b border-white/20 pb-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div className="max-w-3xl">
            <p className="text-lg font-bold">Rawal One</p>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Rawal One is an internal municipal digital-services R&amp;D
              demonstration created by Tenth Tech in Rawalpindi, Pakistan. It
              is not an official government service.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">
              <li>
                <Link className="underline decoration-white/40 underline-offset-4 hover:decoration-white" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="underline decoration-white/40 underline-offset-4 hover:decoration-white" href="/services">
                  Services
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="pt-6 text-xs leading-5 text-white/65">
          &copy; 2026 Tenth Tech. Research and development demonstration.
        </p>
      </div>
    </footer>
  );
}
