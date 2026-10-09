import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const publicSans = localFont({
  src: "../public/fonts/public-sans-latin-variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Rawal One | Your city. One place.",
    template: "%s | Rawal One",
  },
  description:
    "Rawal One is a Tenth Tech municipal digital-services R&D demonstration designed around resident needs in Rawalpindi, Pakistan.",
};

export const viewport: Viewport = {
  themeColor: "#174C3C",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} flex min-h-screen flex-col antialiased`}
      >
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
