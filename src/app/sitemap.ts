import type { MetadataRoute } from "next";
import { business } from "@/config/business";
import { navItems } from "@/config/navigation";

const extraRoutes = [
  { href: "/privacy", priority: 0.3 },
  { href: "/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl.replace(/\/+$/, "");
  const now = new Date();

  const routes = [
    ...navItems.map((item) => ({
      url: `${base}${item.href === "/" ? "" : item.href}`,
      changeFrequency: "weekly" as const,
      priority: item.href === "/" ? 1 : 0.8,
    })),
    ...extraRoutes.map((item) => ({
      url: `${base}${item.href}`,
      changeFrequency: "yearly" as const,
      priority: item.priority,
    })),
  ];

  return routes.map((route) => ({
    ...route,
    lastModified: now,
  }));
}
