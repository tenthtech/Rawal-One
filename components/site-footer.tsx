import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { CivicIcon } from "@/components/civic-icon";

const serviceLinks = [
  { href: "/services", label: "All services" },
  { href: "/search", label: "Search Rawal One" },
  { href: "/documents", label: "Documents & forms" },
];

const communityLinks = [
  { href: "/#updates", label: "City updates" },
  { href: "/notices", label: "Public notices" },
  { href: "/#community", label: "Around Rawalpindi" },
];

const helpLinks = [
  { href: "/accessibility", label: "Accessibility" },
  { href: "/#useful-information-heading", label: "Useful information" },
  { href: "/#about-this-demo", label: "About this demonstration" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="civic-container">
        <div className="footer-grid">
          <div className="footer-identity">
            <Link
              href="/"
              aria-label="Rawal One home"
              className="inline-flex min-h-14 items-center gap-3 text-white no-underline"
            >
              <BrandMark className="h-10 w-10 shrink-0" />
              <span>
                <span className="block text-[1.65rem] font-semibold leading-tight tracking-[-0.055em]">
                  Rawal One
                </span>
                <span className="mt-1 block text-xs font-normal tracking-normal text-white/75">
                  Your city. One place.
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-64 text-sm leading-6 text-white/75">
              Services, local information and shared spaces for the people of
              Rawalpindi.
            </p>
          </div>

          <nav aria-label="Footer services">
            <h2 className="footer-label">Services</h2>
            <ul className="mt-3">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Community information">
            <h2 className="footer-label">Community</h2>
            <ul className="mt-3">
              {communityLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer help">
            <h2 className="footer-label">Help</h2>
            <ul className="mt-3">
              {helpLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <section
          id="about-this-demo"
          aria-labelledby="footer-disclosure-heading"
          className="footer-disclosure"
        >
          <h2
            id="footer-disclosure-heading"
            className="footer-disclosure-label"
          >
            Made in Rawalpindi
          </h2>
          <p className="text-sm leading-6 text-white/75">
            Rawal One is an internal municipal digital-services R&amp;D
            demonstration created by Tenth Tech in Rawalpindi, Pakistan. It is
            not an official government service.
          </p>
        </section>

        <div className="footer-bottom">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <p>&copy; 2026 Tenth Tech. Research &amp; development.</p>
            <Link
              href="/image-credits"
              className="inline-flex min-h-11 items-center text-white/85 underline decoration-white/40 underline-offset-4 hover:text-white"
            >
              Image credits
            </Link>
            <Link
              href="/privacy"
              className="inline-flex min-h-11 items-center text-white/85 underline decoration-white/40 underline-offset-4 hover:text-white"
            >
              Privacy
            </Link>
          </div>
          <Link
            href="#main-content"
            className="inline-flex min-h-11 items-center gap-2 text-white/85 hover:text-white"
          >
            Back to the top{" "}
            <CivicIcon name="arrow" className="h-4 w-4 -rotate-90" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
