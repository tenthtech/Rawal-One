import { serviceCategories } from "@/data/services";

export type PublicNavigationGroupId = "services" | "community" | "information";

export type PublicNavigationLink = {
  href: string;
  label: string;
  featured?: boolean;
};

export type PublicNavigationGroup = {
  id: PublicNavigationGroupId;
  label: string;
  kicker: string;
  description: string;
  links: readonly PublicNavigationLink[];
};

export const publicNavigation: readonly PublicNavigationGroup[] = [
  {
    id: "services",
    label: "Services",
    kicker: "Everyday city services",
    description: "Practical guidance for daily life in Rawalpindi.",
    links: [
      { href: "/services", label: "Browse all services", featured: true },
      ...serviceCategories.map((category) => ({
        href: `/services?category=${category.slug}`,
        label: category.label,
      })),
    ],
  },
  {
    id: "community",
    label: "Community",
    kicker: "Our city, together",
    description: "Local updates, shared spaces and community life.",
    links: [
      { href: "/#updates", label: "City updates" },
      { href: "/notices", label: "Public notices" },
      { href: "/#community", label: "Around Rawalpindi" },
      { href: "/#community-events", label: "Community events" },
    ],
  },
  {
    id: "information",
    label: "Information",
    kicker: "Find what you need",
    description: "Documents and help using your community platform.",
    links: [
      { href: "/documents", label: "Documents & forms" },
      { href: "/accessibility", label: "Accessibility statement" },
      { href: "/search", label: "Search Rawal One" },
      { href: "/#about-this-demo", label: "About this demonstration" },
    ],
  },
];
