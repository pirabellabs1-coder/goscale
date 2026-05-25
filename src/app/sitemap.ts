import type { MetadataRoute } from "next";
import { allServiceSlugs } from "@/lib/services-data";

const SITE_URL = "https://goscalestudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /** ── Home + sections (ancres) ── */
  const sections = [
    "",
    "#services",
    "#pricing",
    "#portfolio",
    "#about",
    "#process",
    "#faq",
    "#contact",
    "#stack",
  ];

  const home = sections.flatMap((s) => [
    {
      url: `${SITE_URL}/${s}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: s === "" ? 1 : 0.8,
      alternates: {
        languages: {
          fr: `${SITE_URL}/${s}`,
          en: `${SITE_URL}/?lang=en${s.startsWith("#") ? s : ""}`,
          "x-default": `${SITE_URL}/${s}`,
        },
      },
    },
    {
      url: `${SITE_URL}/?lang=en${s.startsWith("#") ? s : ""}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: s === "" ? 0.9 : 0.7,
    },
  ]);

  /** ── 15 pages services × 2 langues (FR + EN) ── */
  const services = allServiceSlugs.flatMap((slug) => [
    {
      url: `${SITE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${SITE_URL}/services/${slug}`,
          en: `${SITE_URL}/services/${slug}?lang=en`,
          "x-default": `${SITE_URL}/services/${slug}`,
        },
      },
    },
    {
      url: `${SITE_URL}/services/${slug}?lang=en`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ]);

  return [...home, ...services];
}
