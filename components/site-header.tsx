"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/brand-mark";
import { CivicIcon } from "@/components/civic-icon";

const navigation = [
  { href: "/services", label: "Services" },
  { href: "/#community", label: "Community" },
  { href: "/notices", label: "News & Notices" },
  { href: "/documents", label: "Documents" },
  { href: "/#about-this-demo", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function closeOnOutsidePress(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePress);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [menuOpen]);

  function isCurrentPage(href: string) {
    return !href.includes("#") && pathname === href;
  }

  function navigationList(mobile: boolean) {
    return navigation.map((item) => {
      const isCurrent = isCurrentPage(item.href);
      const isActiveSection =
        isCurrent ||
        (item.href === "/services" && pathname.startsWith("/services/"));

      return (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={isCurrent ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
            data-active={isActiveSection || undefined}
            className={mobile ? "mobile-nav-link" : "site-nav-link"}
          >
            {item.label}
            {mobile ? (
              <CivicIcon name="arrow" className="h-5 w-5 text-civic" />
            ) : null}
          </Link>
        </li>
      );
    });
  }

  return (
    <header ref={headerRef} className="site-header">
      <div className="site-utility-bar">
        <div className="civic-container flex min-h-8 items-center justify-between gap-3 py-1.5 text-[0.6875rem]">
          <p className="flex items-center gap-2 font-medium tracking-[0.03em]">
            <span aria-hidden="true" className="h-1 w-1 bg-[#d8b679]" />
            Rawalpindi, Pakistan
          </p>
          <p className="text-white/80">
            <span className="sm:hidden">R&amp;D demo</span>
            <span className="hidden sm:inline">
              Tenth Tech R&amp;D demonstration
            </span>
          </p>
        </div>
      </div>

      <div className="border-b border-line bg-surface">
        <div className="civic-container site-header-main">
          <Link href="/" aria-label="Rawal One home" className="site-brand">
            <BrandMark className="site-brand-mark" />
            <span className="min-w-0">
              <span className="site-wordmark">Rawal One</span>
              <span className="site-tagline">Your city. One place.</span>
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden xl:block">
            <ul className="flex items-center gap-7">{navigationList(false)}</ul>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/search"
              aria-label="Search Rawal One"
              className="header-search hidden sm:flex"
            >
              <CivicIcon name="search" className="h-5 w-5" />
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-civic bg-surface px-3 text-sm font-semibold text-civic transition-colors duration-200 hover:bg-sage xl:hidden"
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {menuOpen ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
          className="mobile-navigation xl:hidden"
        >
          <div className="civic-container py-3 pb-6">
            <ul>{navigationList(true)}</ul>
            <Link
              href="/search"
              onClick={() => setMenuOpen(false)}
              className="mt-5 flex min-h-14 items-center gap-3 bg-sage px-4 text-sm font-semibold text-civic"
            >
              <CivicIcon name="search" className="h-5 w-5" />
              Search all of Rawal One
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
