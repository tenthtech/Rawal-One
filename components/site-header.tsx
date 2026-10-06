"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/#about-this-demo", label: "About this demo" },
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
    if (href === "/") return pathname === "/";
    if (href === "/services") return pathname === "/services";
    return false;
  }

  const navigationList = navigation.map((item) => {
    const isCurrent = isCurrentPage(item.href);

    return (
      <li key={item.href}>
        <Link
          href={item.href}
          aria-current={isCurrent ? "page" : undefined}
          onClick={() => setMenuOpen(false)}
          className={`flex min-h-11 items-center border-b-2 px-1 text-[0.9375rem] font-bold no-underline transition-colors motion-reduce:transition-none md:min-h-16 ${
            isCurrent
              ? "border-civic text-civic"
              : "border-transparent text-ink hover:border-line hover:text-civic"
          }`}
        >
          {item.label}
        </Link>
      </li>
    );
  });

  return (
    <header ref={headerRef}>
      <div className="bg-civic text-white">
        <div className="mx-auto flex min-h-9 max-w-[76rem] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2 text-[0.8125rem] sm:px-8 lg:px-10">
          <p className="font-bold tracking-[0.01em]">
            Tenth Tech municipal services research
          </p>
          <p className="text-white/80">Rawalpindi, Pakistan</p>
        </div>
      </div>

      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-[76rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            aria-label="Rawal One home"
            className="my-3 flex min-h-12 min-w-0 items-center gap-3 rounded-sm no-underline sm:my-4"
          >
            <span
              className="h-10 w-1 shrink-0 bg-accent"
              aria-hidden="true"
            />
            <span className="min-w-0">
              <span className="block text-xl font-bold leading-tight tracking-[-0.02em] text-civic sm:text-2xl">
                Rawal One
              </span>
              <span className="block text-xs leading-tight text-muted sm:text-sm">
                Your city. One place.
              </span>
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-7">{navigationList}</ul>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-line bg-surface px-3 text-sm font-bold text-ink hover:border-civic hover:text-civic md:hidden"
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

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
          className="border-t border-line bg-surface px-5 pb-4 sm:px-8 md:hidden"
        >
          <ul className="divide-y divide-line">{navigationList}</ul>
        </nav>
      </div>
    </header>
  );
}
