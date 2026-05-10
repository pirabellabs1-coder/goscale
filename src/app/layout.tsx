import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { ProjectProvider } from "@/lib/ProjectContext";
import Preloader from "@/components/public/Preloader";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const SITE_URL = "https://goscalestudio.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GoScaleStudio | Agence d'Automatisation, IA & Web au Bénin — Cotonou",
    template: "%s | GoScaleStudio",
  },
  description:
    "Agence digitale basée à Cotonou (Bénin) spécialisée en automatisation Make / n8n / Zapier, chatbots IA (GPT-4, Claude), callbots vocaux (Vapi, Twilio), sites WordPress optimisés SEO et maquettes UI/UX. 65+ projets livrés à travers l'Afrique de l'Ouest, la francophonie et l'international. Audit à 15 €.",
  applicationName: "GoScaleStudio",
  keywords: [
    // Géo / local SEO
    "agence digitale Bénin",
    "agence digitale Cotonou",
    "automatisation Bénin",
    "automatisation Cotonou",
    "chatbot IA Bénin",
    "agence IA Afrique",
    "agence IA Afrique de l'Ouest",
    "studio digital Bénin",
    "agence web Bénin",
    "agence marketing digital Cotonou",
    "expert automatisation Bénin",
    "consultant IA Bénin",
    // Services
    "automatisation",
    "automatisation entreprise",
    "automatisation no-code",
    "automatisation processus métier",
    "chatbot IA",
    "chatbot WhatsApp",
    "chatbot GPT-4",
    "chatbot Claude",
    "callbot vocal",
    "callbot IA",
    "agent vocal IA",
    "assistant vocal IA",
    "Make.com",
    "n8n",
    "Zapier",
    "Voiceflow",
    "Botpress",
    "Vapi",
    "Twilio",
    "Bland AI",
    "ElevenLabs",
    "OpenAI GPT-4",
    "Anthropic Claude",
    "WordPress SEO",
    "site web SEO",
    "RankMath",
    "Elementor",
    "maquette UI/UX",
    "Figma AI",
    "v0.dev",
    "intelligence artificielle entreprise",
    "workflow no-code",
    // Marque
    "GoScaleStudio",
    "GoScale Studio",
    "Pirabel Labs",
    "Fidah IMOROU BOUKARI",
    // Offre
    "audit automatisation 15 euros",
    "audit gratuit automatisation",
    "devis automatisation gratuit",
  ],
  authors: [
    { name: "Fidah IMOROU BOUKARI", url: "https://goscalestudio.com" },
    { name: "GoScaleStudio", url: "https://goscalestudio.com" },
  ],
  creator: "Fidah IMOROU BOUKARI",
  publisher: "GoScaleStudio",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: { "fr-FR": "/", "fr-BJ": "/" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["fr_BJ", "fr_CA", "fr_BE", "fr_CH", "en_US"],
    url: SITE_URL,
    siteName: "GoScaleStudio",
    title: "GoScaleStudio | Agence Automatisation, IA & Web au Bénin",
    description:
      "Agence digitale basée à Cotonou (Bénin). Chatbots IA, assistants vocaux, automatisations et sites web performants. 65+ projets livrés. Audit à 15 €.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "GoScaleStudio — Agence Automatisation, IA & Web (Bénin)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoScaleStudio | Agence Automatisation, IA & Web au Bénin",
    description:
      "Chatbots IA, assistants vocaux, automatisations et sites web. Studio basé à Cotonou — 65+ projets livrés.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "1rClZtKcWbBVWicoHQQt4LOguUgvdcyxq8QKM7QNrLw",
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  other: {
    "geo.region": "BJ-LI",
    "geo.placename": "Cotonou",
    "geo.position": "6.3703;2.3912",
    ICBM: "6.3703, 2.3912",
  },
};

// ── JSON-LD: LocalBusiness (Cotonou, Bénin) ──
const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService", "Organization"],
  "@id": `${SITE_URL}#organization`,
  name: "GoScaleStudio",
  alternateName: ["GoScale Studio", "GoScale"],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
  image: `${SITE_URL}/logo.jpg`,
  description:
    "Studio digital basé à Cotonou (Bénin) spécialisé en automatisation, intelligence artificielle (chatbots, callbots vocaux), sites WordPress optimisés SEO et maquettes UI/UX. Au service des entreprises africaines, francophones et internationales.",
  email: "contact@goscalestudio.com",
  telephone: "+229 01 68 24 28 66",
  priceRange: "15 € – 500 €",
  currenciesAccepted: "EUR, XOF, USD",
  paymentAccepted: ["Stripe", "Virement bancaire", "PayPal", "Wise"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cotonou",
    addressRegion: "Littoral",
    addressCountry: "BJ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 6.3703,
    longitude: 2.3912,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}#founder`,
    name: "Fidah IMOROU BOUKARI",
    jobTitle: "CEO & Fondateur",
    worksFor: { "@id": `${SITE_URL}#organization` },
    image: "https://i.postimg.cc/tR89Dwj9/Whats-App-Image-2026-05-10-at-01-30-44.jpg",
    nationality: "Benin",
    affiliation: {
      "@type": "Organization",
      name: "Pirabel Labs",
      url: "https://pirabellabs.com",
      description: "Agence web marketing",
    },
  },
  sameAs: [
    "https://pirabellabs.com",
    "https://comeup.com/",
  ],
  areaServed: [
    { "@type": "Country", name: "Benin" },
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Belgium" },
    { "@type": "Country", name: "Switzerland" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "Côte d'Ivoire" },
    { "@type": "Country", name: "Senegal" },
    { "@type": "Country", name: "Togo" },
    { "@type": "Place", name: "Afrique de l'Ouest" },
    { "@type": "Place", name: "Francophonie" },
  ],
  knowsAbout: [
    "Automatisation no-code",
    "Make.com",
    "n8n",
    "Zapier",
    "GoHighLevel",
    "Chatbot IA",
    "GPT-4",
    "GPT-4o",
    "Claude (Anthropic)",
    "Claude Code",
    "Gemini (Google)",
    "Botpress",
    "Voiceflow",
    "Callbot vocal IA",
    "Vapi",
    "Twilio",
    "Bland AI",
    "ElevenLabs",
    "OpenAI TTS",
    "WhatsApp Business API",
    "WordPress",
    "Elementor",
    "RankMath",
    "SEO",
    "Google Search Console",
    "Google Analytics 4",
    "Google Stitch",
    "Figma AI",
    "v0.dev",
    "HubSpot",
    "Notion",
    "Airtable",
    "Slack",
    "Google Workspace",
    "Stripe",
    "Mobile Money",
    "RGPD",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services GoScaleStudio",
    itemListElement: [
      { "@type": "Offer", name: "Audit & Diagnostic", price: "15", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Scénario simple", price: "30", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Scénario avancé", price: "50", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Automatisation sur mesure", price: "100", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Maintenance 30 jours", price: "500", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Consulting 30 min", price: "30", priceCurrency: "EUR" },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "65",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+229 01 68 24 28 66",
    contactType: "customer service",
    email: "contact@goscalestudio.com",
    availableLanguage: ["French", "English"],
    areaServed: "Worldwide",
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: "GoScaleStudio",
  description: "Agence digitale au Bénin — Automatisation, IA & Web. Scale Smart. Grow Bold.",
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: "fr-FR",
};

const jsonLdServices = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Automatisation Métier (Make / n8n / Zapier)",
    serviceType: "Workflow automation",
    provider: { "@id": `${SITE_URL}#organization` },
    description:
      "Workflows intelligents avec Make, n8n ou Zapier. Connexion d'outils (HubSpot, Notion, Google Workspace, WhatsApp), suppression des tâches répétitives, gain moyen de +10h/semaine. Définition : l'automatisation no-code consiste à créer des séquences d'actions automatiques entre vos outils sans écrire de code.",
    areaServed: [{ "@type": "Country", name: "Benin" }, "Francophonie", "Worldwide"],
    offers: { "@type": "Offer", price: "30", priceCurrency: "EUR", url: `${SITE_URL}#pricing` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Chatbot IA sur Mesure (GPT-4, Claude)",
    serviceType: "AI chatbot development",
    provider: { "@id": `${SITE_URL}#organization` },
    description:
      "Chatbots GPT-4, GPT-4o et Claude déployés sur WhatsApp Business API, site web ou Messenger. Entraînés sur les données du client. Définition : un chatbot IA est un programme conversationnel qui comprend le langage naturel et répond aux questions ou guide les utilisateurs 24/7.",
    areaServed: [{ "@type": "Country", name: "Benin" }, "Francophonie", "Worldwide"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "CallBot & Assistant Vocal IA (Vapi, Twilio)",
    serviceType: "Voice AI assistant",
    provider: { "@id": `${SITE_URL}#organization` },
    description:
      "Agents vocaux 24/7 via Vapi, Twilio et Bland AI avec voix premium ElevenLabs et OpenAI TTS. Définition : un callbot est un assistant téléphonique automatisé propulsé par une IA conversationnelle, capable de prendre des RDV, qualifier des leads et assister les clients.",
    areaServed: [{ "@type": "Country", name: "Benin" }, "Francophonie", "Worldwide"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Site WordPress + SEO",
    serviceType: "Web development & SEO",
    provider: { "@id": `${SITE_URL}#organization` },
    description:
      "Sites vitrines rapides et SEO-ready avec WordPress + Elementor. Optimisation technique, contenu et netlinking. Définition : le SEO (Search Engine Optimization) regroupe les techniques pour positionner un site en première page des moteurs de recherche.",
    areaServed: [{ "@type": "Country", name: "Benin" }, "Francophonie", "Worldwide"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Maquette UI/UX (Figma AI, v0.dev)",
    serviceType: "UI/UX design",
    provider: { "@id": `${SITE_URL}#organization` },
    description:
      "Prototypes cliquables livrés en 48-72h avec Figma AI et v0.dev. Définition : une maquette UI/UX est une représentation visuelle interactive d'un produit numérique, permettant de valider le design et l'expérience utilisateur avant le développement.",
    areaServed: [{ "@type": "Country", name: "Benin" }, "Francophonie", "Worldwide"],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${sora.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServices) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NQ6SEVPQD3"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-NQ6SEVPQD3');`}
        </Script>
        <Preloader />
        <ProjectProvider>{children}</ProjectProvider>
      </body>
    </html>
  );
}
