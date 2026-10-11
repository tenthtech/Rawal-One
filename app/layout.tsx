import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { ApplicationFrame } from "@/components/application-frame";
import { PublicAnalytics } from "@/components/public-analytics";
import { ACCESSIBILITY_PREFERENCES_SCRIPT } from "@/lib/accessibility-preferences";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          id="rawal-one-accessibility-preferences"
          dangerouslySetInnerHTML={{ __html: ACCESSIBILITY_PREFERENCES_SCRIPT }}
        />
      </head>
      <body
        className={`${publicSans.variable} flex min-h-screen flex-col antialiased`}
      >
        <ApplicationFrame>{children}</ApplicationFrame>
        <PublicAnalytics />
      </body>
    </html>
  );
}
