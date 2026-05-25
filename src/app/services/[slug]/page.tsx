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

  /** ── JSON-LD — Service + FAQPage + BreadcrumbList + WebPage ──
   * Note Google : aggregateRating doit être attaché à Organization/LocalBusiness (déjà dans layout.tsx),
   * pas au Service. inLanguage gardé en string simple.
   */
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
    url: `${SITE_URL}/services/${slug}`,
    category: service.category,
    audience: { "@type": "BusinessAudience", audienceType: "SMEs, startups, freelancers, agencies" },
    ...(service.pricing.tiers.length > 0 && {
      offers: service.pricing.tiers.map((tier) => {
        const numericPrice = tier.price.replace(/[^0-9]/g, "");
        return {
          "@type": "Offer",
          name: tier.name.fr,
          price: numericPrice || "0",
          priceCurrency: "EUR",
          description: tier.priceNote.fr,
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/services/${slug}`,
          seller: { "@id": `${SITE_URL}#organization` },
        };
      }),
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

  /** Article schema — fait considérer la page comme contenu éditorial par les IA (ChatGPT Search, Perplexity, Claude).
   * Google exige : headline ≤ 110 chars, image en ImageObject avec width/height, datePublished + dateModified,
   * author + publisher avec logo.
   */
  const headlineRaw = service.hero.h1.fr;
  const headlineTrimmed = headlineRaw.length > 110 ? `${headlineRaw.slice(0, 107)}...` : headlineRaw;

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/services/${slug}#article`,
    headline: headlineTrimmed,
    description: service.metaDescription.fr,
    url: `${SITE_URL}/services/${slug}`,
    inLanguage: "fr",
    isPartOf: { "@id": `${SITE_URL}/services/${slug}#webpage` },
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    datePublished: "2026-01-15T08:00:00+00:00",
    dateModified: new Date().toISOString(),
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}#founder`,
      name: "Fidah IMOROU BOUKARI",
      url: `${SITE_URL}/#about`,
      jobTitle: "CEO & Fondateur GoScaleStudio",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "GoScaleStudio",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.jpg`,
        width: 512,
        height: 512,
      },
    },
    articleSection: service.category,
    keywords: service.keywords.join(", "),
    about: { "@id": `${SITE_URL}/services/${slug}#service` },
    mainEntityOfPage: { "@id": `${SITE_URL}/services/${slug}#webpage` },
  };

  /** HowTo schema — décrit le process en 5 étapes. Très puissant pour AI search (ChatGPT, Perplexity).
   * Note Google : timeRequired doit être en ISO 8601 (PT2H, P3D…). Comme nos durations sont en texte FR
   * libre ("Jour 1 matin", "Semaines 1-4"), on les omet pour rester strictement valide.
   */
  const jsonLdHowTo = service.howItWorks.steps.length > 0 && {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE_URL}/services/${slug}#howto`,
    name: service.howItWorks.headline.fr,
    description: `${service.howItWorks.headline.fr} — Process complet en ${service.howItWorks.steps.length} étapes pour ${service.metaTitle.fr}.`,
    inLanguage: "fr",
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    totalTime: "P7D",
    step: service.howItWorks.steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.title.fr,
      text: s.desc.fr,
      url: `${SITE_URL}/services/${slug}#step-${idx + 1}`,
    })),
  };

  /** FAQ FR — Google indexe la langue principale. Toutes les Questions nommées + answers avec author. */
  const jsonLdFaq = service.faq.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/services/${slug}#faq`,
    name: `FAQ — ${service.metaTitle.fr}`,
    description: `Questions fréquentes sur ${service.metaTitle.fr}`,
    inLanguage: "fr",
    isPartOf: { "@id": `${SITE_URL}/services/${slug}#webpage` },
    mainEntity: service.faq.map((f, i) => ({
      "@type": "Question",
      "@id": `${SITE_URL}/services/${slug}#faq-${i + 1}`,
      name: f.q.fr,
      inLanguage: "fr",
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a.fr,
        inLanguage: "fr",
        author: { "@id": `${SITE_URL}#organization` },
      },
    })),
  };

  /** FAQ EN — second schema pour la version anglaise */
  const jsonLdFaqEn = service.faq.length > 0 && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/services/${slug}?lang=en#faq`,
    name: `FAQ — ${service.metaTitle.en}`,
    description: `Frequently asked questions about ${service.metaTitle.en}`,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/services/${slug}#webpage` },
    mainEntity: service.faq.map((f, i) => ({
      "@type": "Question",
      "@id": `${SITE_URL}/services/${slug}?lang=en#faq-${i + 1}`,
      name: f.q.en,
      inLanguage: "en",
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a.en,
        inLanguage: "en",
        author: { "@id": `${SITE_URL}#organization` },
      },
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
