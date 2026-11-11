import type { Metadata } from "next";
import { business } from "@/config/business";

/**
 * Builds consistent per-page metadata.
 *
 * Every page gets its own title, description, canonical URL and Open Graph
 * tags. The canonical and OG URLs are derived from `business.siteUrl`, so
 * they always follow the real deployment origin — no production domain is
 * hard-coded anywhere.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Page title without the brand suffix — the layout template adds it. */
  title: string;
  description: string;
  /** Route path, e.g. "/packages". "/" for the homepage. */
  path: string;
}): Metadata {
  const base = business.siteUrl.replace(/\/+$/, "");
  const url = path === "/" ? base : `${base}${path}`;

  // The homepage already carries the full brand + tagline, so it is used
  // verbatim; every other page gets the brand appended here.
  const fullTitle =
    path === "/" ? `${business.brandName} — ${business.tagline}` : `${title} | ${business.brandName}`;

  return {
    // The homepage has no page title of its own — the layout's default
    // ("Brand — tagline") is used instead.
    ...(path === "/" ? {} : { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "bn_BD",
      siteName: business.brandName,
      url,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
