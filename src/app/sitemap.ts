import type { MetadataRoute } from "next";

const SITE_URL = "https://goscalestudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = [
    "",
    "#services",
    "#pricing",
    "#portfolio",
    "#about",
    "#process",
    "#faq",
    "#contact",
  ];

  return sections.map((s) => ({
    url: `${SITE_URL}/${s}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: s === "" ? 1 : 0.8,
  }));
}
