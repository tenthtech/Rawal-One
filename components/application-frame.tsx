"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import type { ReactNode } from "react";

import { AccessibilityPreferencesProvider } from "@/components/accessibility-preferences";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function ApplicationFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = /^\/admin(?:\/|$)/.test(pathname);

  useLayoutEffect(() => {
    document.documentElement.dataset.site = isAdminRoute ? "admin" : "public";
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return (
      <>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {pathname === "/admin/login" ? (
          <main id="main-content" tabIndex={-1} className="flex-1">
            {children}
          </main>
        ) : (
          children
        )}
      </>
    );
  }

  return (
    <AccessibilityPreferencesProvider>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </AccessibilityPreferencesProvider>
  );
}
