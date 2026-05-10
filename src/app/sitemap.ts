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
    "#stack",
  ];

  const fr = sections.map((s) => ({
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
  }));

  const en = sections.map((s) => ({
    url: `${SITE_URL}/?lang=en${s.startsWith("#") ? s : ""}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: s === "" ? 0.9 : 0.7,
  }));

  return [...fr, ...en];
}
