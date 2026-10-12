"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent } from "react";

import { AccessibilityPreferencesButton } from "@/components/accessibility-preferences";
import { BrandMark } from "@/components/brand-mark";
import { CivicIcon } from "@/components/civic-icon";
import {
  publicNavigation,
  type PublicNavigationGroup,
  type PublicNavigationGroupId,
} from "@/data/public-navigation";

function NavigationChevron() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="site-nav-chevron"
    >
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  // A public route change starts with closed navigation, including browser Back.
  return <PublicHeader key={pathname} pathname={pathname} />;
}

function PublicHeader({ pathname }: { pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopGroup, setDesktopGroup] =
    useState<PublicNavigationGroupId | null>(null);
  const [mobileGroup, setMobileGroup] =
    useState<PublicNavigationGroupId | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const desktopNavigationRef = useRef<HTMLElement>(null);
  const mobileNavigationRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopTriggers = useRef<
    Partial<Record<PublicNavigationGroupId, HTMLButtonElement | null>>
  >({});
  const mobileTriggers = useRef<
    Partial<Record<PublicNavigationGroupId, HTMLButtonElement | null>>
  >({});

  useEffect(() => {
    if (!menuOpen && !desktopGroup) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (
        event.key !== "Escape" ||
        event.defaultPrevented ||
        document.querySelector("dialog[open]")
      ) {
        return;
      }

      event.preventDefault();

      if (desktopGroup) {
        setDesktopGroup(null);
        desktopTriggers.current[desktopGroup]?.focus();
      } else if (mobileGroup) {
        setMobileGroup(null);
        mobileTriggers.current[mobileGroup]?.focus();
      } else {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function closeOnOutsidePress(event: PointerEvent) {
      if (document.querySelector("dialog[open]")) return;
      if (!(event.target instanceof Node)) return;

      const openDesktopGroup = desktopGroup
        ? desktopTriggers.current[desktopGroup]?.closest(".site-navigation-group")
        : null;

      if (openDesktopGroup && !openDesktopGroup.contains(event.target)) {
        setDesktopGroup(null);
      }

      if (!headerRef.current?.contains(event.target)) {
        setDesktopGroup(null);
        setMobileGroup(null);
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePress);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [desktopGroup, menuOpen, mobileGroup]);

  useEffect(() => {
    const desktopLayout = window.matchMedia("(min-width: 1280px)");

    function closeNavigation() {
      setDesktopGroup(null);
      setMobileGroup(null);
      setMenuOpen(false);
    }

    function handleLayoutChange(event: MediaQueryListEvent) {
      const focusedElement = document.activeElement;
      const focusBecomesHidden = event.matches
        ? focusedElement === menuButtonRef.current ||
          mobileNavigationRef.current?.contains(focusedElement)
        : desktopNavigationRef.current?.contains(focusedElement) ||
          (focusedElement instanceof Element &&
            focusedElement.matches(".a11y-utility-trigger"));

      closeNavigation();

      if (focusBecomesHidden && !document.querySelector("dialog[open]")) {
        if (event.matches) desktopTriggers.current.services?.focus();
        else menuButtonRef.current?.focus();
      }
    }

    desktopLayout.addEventListener("change", handleLayoutChange);
    window.addEventListener("hashchange", closeNavigation);
    window.addEventListener("popstate", closeNavigation);

    return () => {
      desktopLayout.removeEventListener("change", handleLayoutChange);
      window.removeEventListener("hashchange", closeNavigation);
      window.removeEventListener("popstate", closeNavigation);
    };
  }, []);

  function closeNavigation(restoreFocus = false) {
    if (restoreFocus) {
      if (menuOpen) menuButtonRef.current?.focus();
      else if (desktopGroup) desktopTriggers.current[desktopGroup]?.focus();
    }

    setDesktopGroup(null);
    setMobileGroup(null);
    setMenuOpen(false);
  }

  function closeOnHeaderFocusLeave(event: FocusEvent<HTMLElement>) {
    if (document.querySelector("dialog[open]")) return;
    if (!event.currentTarget.contains(event.relatedTarget)) closeNavigation();
  }

  function closeOnGroupFocusLeave(
    event: FocusEvent<HTMLLIElement>,
    group: PublicNavigationGroupId,
  ) {
    if (document.querySelector("dialog[open]")) return;

    if (!event.currentTarget.contains(event.relatedTarget)) {
      setDesktopGroup((openGroup) => (openGroup === group ? null : openGroup));
    }
  }

  function isCurrentPage(href: string) {
    return !href.includes("#") && pathname === href;
  }

  function isActiveGroup(group: PublicNavigationGroup) {
    if (group.id === "services") {
      return pathname === "/services" || pathname.startsWith("/services/");
    }

    return group.links.some((item) => isCurrentPage(item.href));
  }

  function navigationLinks(group: PublicNavigationGroup, mobile: boolean) {
    return group.links.map((item) => {
      // The mobile menu already keeps this destination above its groups.
      if (mobile && item.featured) return null;
      const isCurrent = isCurrentPage(item.href);

      return (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={isCurrent ? "page" : undefined}
            onClick={() => closeNavigation(true)}
            data-active={isCurrent || undefined}
            data-featured={item.featured || undefined}
            className={mobile ? "mobile-nav-link" : "site-navigation-link"}
          >
            <span>{item.label}</span>
            <CivicIcon name="arrow" className="h-4 w-4 shrink-0" />
          </Link>
        </li>
      );
    });
  }

  return (
    <header
      ref={headerRef}
      className="site-header"
      onBlur={closeOnHeaderFocusLeave}
    >
      <div className="site-utility-bar">
        <div className="civic-container flex min-h-8 items-center justify-between gap-3 py-1.5 text-[0.6875rem]">
          <p className="flex items-center gap-2 font-medium tracking-[0.03em]">
            <span aria-hidden="true" className="h-1 w-1 bg-[#d8b679]" />
            Rawalpindi, Pakistan
          </p>
          <div className="flex items-center gap-5">
            <p className="text-white/80">
              <span className="sm:hidden">R&amp;D demo</span>
              <span className="hidden sm:inline">
                Tenth Tech R&amp;D demonstration
              </span>
            </p>
            <AccessibilityPreferencesButton className="a11y-utility-trigger hidden xl:inline-flex" />
          </div>
        </div>
      </div>

      <div className="border-b border-line bg-surface">
        <div className="civic-container site-header-main">
          <Link
            href="/"
            aria-label="Rawal One home"
            className="site-brand"
            onClick={() => closeNavigation()}
          >
            <BrandMark className="site-brand-mark" />
            <span className="min-w-0">
              <span className="site-wordmark">Rawal One</span>
              <span className="site-tagline">
                Rawalpindi community platform
              </span>
            </span>
          </Link>

          <nav
            ref={desktopNavigationRef}
            aria-label="Primary navigation"
            className="public-desktop-navigation hidden xl:block"
          >
            <ul className="site-navigation-groups">
              {publicNavigation.map((group) => (
                <li
                  key={group.id}
                  className="site-navigation-group"
                  onBlur={(event) => closeOnGroupFocusLeave(event, group.id)}
                >
                  <button
                    ref={(element) => {
                      desktopTriggers.current[group.id] = element;
                    }}
                    id={`navigation-trigger-${group.id}`}
                    type="button"
                    aria-expanded={desktopGroup === group.id}
                    aria-controls={`navigation-panel-${group.id}`}
                    data-active={isActiveGroup(group) || undefined}
                    className="site-nav-trigger"
                    onClick={() =>
                      setDesktopGroup((openGroup) =>
                        openGroup === group.id ? null : group.id,
                      )
                    }
                    onKeyDown={(event) => {
                      if (event.key !== "ArrowDown") return;

                      event.preventDefault();
                      setDesktopGroup(group.id);
                      requestAnimationFrame(() => {
                        document
                          .getElementById(`navigation-panel-${group.id}`)
                          ?.querySelector<HTMLAnchorElement>("a")
                          ?.focus();
                      });
                    }}
                  >
                    {group.label}
                    <NavigationChevron />
                  </button>
                  <div
                    id={`navigation-panel-${group.id}`}
                    className="site-navigation-panel"
                    data-group={group.id}
                    hidden={desktopGroup !== group.id}
                  >
                    <div className="site-navigation-panel-inner">
                      <div className="site-navigation-intro">
                        <p className="site-navigation-kicker">{group.kicker}</p>
                        <p className="site-navigation-description">
                          {group.description}
                        </p>
                      </div>
                      <ul className="site-navigation-links">
                        {navigationLinks(group, false)}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="/search"
              aria-label="Search Rawal One"
              className="header-search hidden sm:flex"
              onClick={() => closeNavigation()}
            >
              <CivicIcon name="search" className="h-5 w-5" />
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                setMenuOpen((open) => !open);
                setMobileGroup(null);
              }}
              className="public-menu-toggle inline-flex min-h-11 items-center gap-2 rounded-sm border border-civic bg-surface px-3 text-sm font-semibold text-civic transition-colors duration-200 hover:bg-sage xl:hidden"
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
          ref={mobileNavigationRef}
          id="mobile-navigation"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
          className="mobile-navigation xl:hidden"
        >
          <div className="civic-container py-3 pb-6">
            <h2 className="mobile-menu-heading">Find your way</h2>
            <Link
              href="/search"
              onClick={() => closeNavigation(true)}
              className="mobile-search-link mb-3 flex min-h-14 items-center gap-3 bg-sage px-4 text-sm font-semibold text-civic"
            >
              <CivicIcon name="search" className="h-5 w-5 shrink-0" />
              Search all of Rawal One
            </Link>
            <AccessibilityPreferencesButton className="a11y-mobile-trigger mb-3 w-full" />
            <Link
              href="/services"
              onClick={() => closeNavigation(true)}
              className="mobile-browse-services mobile-nav-link"
            >
              <span>Browse all services</span>
              <CivicIcon name="arrow" className="h-4 w-4 shrink-0" />
            </Link>
            <ul className="mobile-navigation-groups">
              {publicNavigation.map((group) => (
                <li key={group.id} className="mobile-navigation-group">
                  <button
                    ref={(element) => {
                      mobileTriggers.current[group.id] = element;
                    }}
                    type="button"
                    aria-expanded={mobileGroup === group.id}
                    aria-controls={`mobile-navigation-${group.id}`}
                    data-active={isActiveGroup(group) || undefined}
                    className="mobile-group-trigger"
                    onClick={() =>
                      setMobileGroup((openGroup) =>
                        openGroup === group.id ? null : group.id,
                      )
                    }
                  >
                    {group.label}
                    <NavigationChevron />
                  </button>
                  <ul
                    id={`mobile-navigation-${group.id}`}
                    className="mobile-group-links"
                    hidden={mobileGroup !== group.id}
                  >
                    {navigationLinks(group, true)}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
