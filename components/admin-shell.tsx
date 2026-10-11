"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { signOutAction } from "@/app/admin/login/actions";
import { BrandMark } from "@/components/brand-mark";

const contentNavigation = [
  { href: "/admin/alerts", label: "Emergency Alerts" },
  { href: "/admin/notices", label: "Public Notices" },
  { href: "/admin/documents", label: "Documents" },
  { href: "/admin/updates", label: "City Updates" },
  { href: "/admin/events", label: "Community Events" },
] as const;

const serviceNavigation = [
  { href: "/admin/services", label: "Services" },
] as const;

function AdminNavigation({ closeMenu }: { closeMenu?: () => void }) {
  const pathname = usePathname();

  function navigationLink(href: string, label: string) {
    const isCurrent =
      href === "/admin"
        ? pathname === href
        : pathname === href || pathname.startsWith(`${href}/`);

    return (
      <Link
        href={href}
        aria-current={isCurrent ? "page" : undefined}
        onClick={closeMenu}
        className={`flex min-h-11 items-center border-s-[3px] px-4 py-2 text-sm font-semibold no-underline transition-colors ${
          isCurrent
            ? "border-accent bg-white/12 text-white"
            : "border-transparent text-white/78 hover:border-white/25 hover:bg-white/7 hover:text-white"
        }`}
      >
        {label}
      </Link>
    );
  }

  return (
    <nav aria-label="Administration navigation" className="px-3 py-5">
      <ul>
        <li>{navigationLink("/admin", "Overview")}</li>
      </ul>

      <p className="mt-7 px-4 text-[0.6875rem] font-bold tracking-[0.14em] text-white/50 uppercase">
        Content
      </p>
      <ul className="mt-2">
        {contentNavigation.map((item) => (
          <li key={item.href}>{navigationLink(item.href, item.label)}</li>
        ))}
      </ul>

      <p className="mt-7 px-4 text-[0.6875rem] font-bold tracking-[0.14em] text-white/50 uppercase">
        Services
      </p>
      <ul className="mt-2">
        {serviceNavigation.map((item) => (
          <li key={item.href}>{navigationLink(item.href, item.label)}</li>
        ))}
      </ul>
    </nav>
  );
}

function AdminIdentity({ closeMenu }: { closeMenu?: () => void }) {
  return (
    <Link
      href="/admin"
      onClick={closeMenu}
      className="flex min-h-16 items-center gap-3 px-5 py-4 text-white no-underline"
    >
      <BrandMark className="h-8 w-8 shrink-0" />
      <span className="min-w-0">
        <span className="block text-lg font-bold leading-tight tracking-[-0.035em]">
          Rawal One
        </span>
        <span className="mt-0.5 block text-xs leading-tight text-white/62">
          Administration
        </span>
      </span>
    </Link>
  );
}

function AdminFooterActions({ closeMenu }: { closeMenu?: () => void }) {
  return (
    <div className="border-t border-white/12 px-3 py-4">
      <Link
        href="/"
        onClick={closeMenu}
        className="flex min-h-11 items-center px-4 py-2 text-sm font-semibold text-white/78 no-underline hover:bg-white/7 hover:text-white"
      >
        View public website
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="ms-auto h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 4h9v9" />
          <path d="m16 4-9 9" />
          <path d="M13 11v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4" />
        </svg>
      </Link>
      <form action={signOutAction}>
        <button
          type="submit"
          className="flex min-h-11 w-full items-center px-4 py-2 text-start text-sm font-semibold text-white/78 hover:bg-white/7 hover:text-white"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[#f5f6f3] lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
      <aside className="hidden min-h-screen flex-col bg-civic-deep lg:sticky lg:top-0 lg:flex lg:h-screen">
        <div className="border-b border-white/12">
          <AdminIdentity />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <AdminNavigation />
        </div>
        <AdminFooterActions />
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-40 border-b border-line bg-civic-deep text-white lg:hidden">
          <div className="flex min-h-16 items-center justify-between gap-3 pe-4">
            <AdminIdentity closeMenu={() => setMenuOpen(false)} />
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="admin-mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-white/35 px-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              {menuOpen ? "Close" : "Menu"}
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

          {menuOpen ? (
            <div
              id="admin-mobile-navigation"
              className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/12"
            >
              <AdminNavigation closeMenu={() => setMenuOpen(false)} />
              <AdminFooterActions closeMenu={() => setMenuOpen(false)} />
            </div>
          ) : null}
        </header>

        <main id="main-content" tabIndex={-1} className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
