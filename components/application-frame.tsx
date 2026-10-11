"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function ApplicationFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

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
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
