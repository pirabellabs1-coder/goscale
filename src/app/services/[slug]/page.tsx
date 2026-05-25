import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allServiceSlugs, getService } from "@/lib/services-data";
import ServicePageContent from "./ServicePageContent";

const SITE_URL = "https://goscalestudio.com";

/** Pré-rend les 15 pages services à la build pour des perfs et un SEO optimaux. */
export function generateStaticParams() {
  return allServiceSlugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service introuvable" };

  const canonical = `${SITE_URL}/services/${slug}`;

  return {
    title: service.metaTitle.fr,
    description: service.metaDescription.fr,
    keywords: service.keywords,
    alternates: {
      canonical,
      languages: {
        "fr-FR": canonical,
        "fr-BJ": canonical,
        fr: canonical,
        en: `${canonical}?lang=en`,
        "en-US": `${canonical}?lang=en`,
        "x-default": canonical,
      },
    },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      alternateLocale: ["fr_BJ", "fr_CA", "fr_BE", "en_US"],
      url: canonical,
      siteName: "GoScaleStudio",
      title: service.metaTitle.fr,
      description: service.metaDescription.fr,
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: service.metaTitle.fr,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle.fr,
      description: service.metaDescription.fr,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  /** ── JSON-LD — Service + FAQPage + BreadcrumbList + WebPage ── */
  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${slug}#service`,
    name: service.metaTitle.fr,
    serviceType: service.category,
    description: service.metaDescription.fr,
    provider: { "@id": `${SITE_URL}#organization` },
    areaServed: [
      { "@type": "Country", name: "Benin" },
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "Switzerland" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Côte d'Ivoire" },
      { "@type": "Country", name: "Senegal" },
      { "@type": "Place", name: "Francophonie" },
      { "@type": "Place", name: "Worldwide" },
    ],
    inLanguage: ["fr", "en"],
    url: `${SITE_URL}/services/${slug}`,
    audience: { "@type": "BusinessAudience", audienceType: "SMEs, startups, freelancers, agencies" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "65",
    },
    ...(service.pricing.tiers.length > 0 && {
      offers: service.pricing.tiers.map((tier) => ({
        "@type": "Offer",
        name: tier.name.fr,
        price: tier.price.replace(/[^0-9]/g, "").slice(0, 4) || "0",
        priceCurrency: "EUR",
        description: tier.priceNote.fr,
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/services/${slug}`,
      })),
    }),
  };

  /** WebPage schema avec liens vers les services connexes (internal linking SEO) */
  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/services/${slug}#webpage`,
    url: `${SITE_URL}/services/${slug}`,
    name: service.metaTitle.fr,
    description: service.metaDescription.fr,
    inLanguage: "fr",
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": `${SITE_URL}/services/${slug}#service` },
    publisher: { "@id": `${SITE_URL}#organization` },
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
    /** Speakable : permet aux assistants vocaux (Alexa, Google Assistant) de lire à voix haute le contenu clé */
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
    ...(service.relatedSlugs.length > 0 && {
      relatedLink: service.relatedSlugs.map((rs) => `${SITE_URL}/services/${rs}`),
    }),
  };

  /** Article schema — fait considérer la page comme contenu éditorial par les IA (ChatGPT Search, Perplexity, Claude) */
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/services/${slug}#article`,
    headline: service.hero.h1.fr,
    description: service.metaDescription.fr,
    url: `${SITE_URL}/services/${slug}`,
    inLanguage: "fr",
    isPartOf: { "@id": `${SITE_URL}/services/${slug}#webpage` },
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: "2026-01-15T08:00:00+00:00",
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}#founder`,
      name: "Fidah IMOROU BOUKARI",
      url: `${SITE_URL}/#about`,
      jobTitle: "CEO & Fondateur GoScaleStudio",
    },
    publisher: { "@id": `${SITE_URL}#organization` },
    articleSection: service.category,
    keywords: service.keywords.join(", "),
    about: { "@id": `${SITE_URL}/services/${slug}#service` },
    mainEntityOfPage: { "@id": `${SITE_URL}/services/${slug}#webpage` },
  };

  /** HowTo schema — décrit le process en 5 étapes. Très puissant pour AI search (ChatGPT, Perplexity) */
  const jsonLdHowTo = service.howItWorks.steps.length > 0 && {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE_URL}/services/${slug}#howto`,
    name: service.howItWorks.headline.fr,
    description: `${service.howItWorks.headline.fr} — Process complet en ${service.howItWorks.steps.length} étapes pour ${service.metaTitle.fr}.`,
    inLanguage: "fr",
    image: `${SITE_URL}/og-image.jpg`,
    totalTime: "P7D", // ISO 8601 — 7 jours moyens
    step: service.howItWorks.steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.title.fr,
      text: s.desc.fr,
      url: `${SITE_URL}/services/${slug}#step-${idx + 1}`,
      ...(s.duration.fr && {
        timeRequired: s.duration.fr,
      }),
    })),
  };

  /** FAQ FR — Google indexe la langue principale */
  const jsonLdFaq = service.faq.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "fr",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q.fr,
      inLanguage: "fr",
      acceptedAnswer: { "@type": "Answer", text: f.a.fr, inLanguage: "fr" },
    })),
  };

  /** FAQ EN — second schema pour la version anglaise */
  const jsonLdFaqEn = service.faq.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en",
    "@id": `${SITE_URL}/services/${slug}?lang=en#faq`,
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q.en,
      inLanguage: "en",
      acceptedAnswer: { "@type": "Answer", text: f.a.en, inLanguage: "en" },
    })),
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/#services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.hero.h1.fr,
        item: `${SITE_URL}/services/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      {jsonLdHowTo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
        />
      )}
      {jsonLdFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      )}
      {jsonLdFaqEn && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaqEn) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <ServicePageContent slug={slug} />
    </>
  );
}
