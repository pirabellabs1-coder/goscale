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
    default: "GoScaleStudio | Automatisation, IA & Web — Scale Smart. Grow Bold.",
    template: "%s | GoScaleStudio",
  },
  description:
    "Studio spécialisé en automatisation Make / n8n / Zapier, chatbots IA (GPT-4, Claude), callbots vocaux (Vapi, Twilio), sites WordPress optimisés SEO et maquettes UI/UX. 65+ projets livrés, note 5,0/5 sur ComeUp. Audit à 15 €.",
  applicationName: "GoScaleStudio",
  keywords: [
    "automatisation",
    "automatisation entreprise",
    "automatisation no-code",
    "chatbot IA",
    "chatbot WhatsApp",
    "chatbot GPT-4",
    "callbot vocal",
    "callbot IA",
    "agent vocal IA",
    "Make.com",
    "n8n",
    "Zapier",
    "Voiceflow",
    "Botpress",
    "Vapi",
    "Twilio",
    "Bland AI",
    "WordPress SEO",
    "site web SEO",
    "maquette UI/UX",
    "Figma AI",
    "v0.dev",
    "intelligence artificielle entreprise",
    "GoScaleStudio",
    "GoScale Studio",
    "Pirabel Labs",
    "Fidah IMOROU BOUKARI",
    "agence automatisation",
    "studio IA France",
    "audit automatisation 15 euros",
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
    languages: { "fr-FR": "/" },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "GoScaleStudio",
    title: "GoScaleStudio | Automatisation, IA & Web",
    description:
      "Chatbots IA, assistants vocaux, automatisations et sites web performants. 65+ projets livrés, note 5,0/5. Audit à 15 €.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "GoScaleStudio — Automatisation, IA & Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoScaleStudio | Automatisation, IA & Web",
    description:
      "Chatbots IA, assistants vocaux, automatisations et sites web performants. 65+ projets livrés.",
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
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: "GoScaleStudio",
  alternateName: "GoScale Studio",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
  image: `${SITE_URL}/logo.jpg`,
  description:
    "Studio spécialisé en automatisation, intelligence artificielle (chatbots, callbots), sites WordPress optimisés SEO et maquettes UI/UX.",
  email: "contact@goscalestudio.com",
  telephone: "+229 01 68 24 28 66",
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}#founder`,
    name: "Fidah IMOROU BOUKARI",
    jobTitle: "CEO & Fondateur",
    worksFor: { "@id": `${SITE_URL}#organization` },
    image: "https://i.postimg.cc/tR89Dwj9/Whats-App-Image-2026-05-10-at-01-30-44.jpg",
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
  areaServed: ["France", "Belgium", "Switzerland", "Canada", "Africa"],
  serviceType: [
    "Automatisation métier",
    "Chatbot IA",
    "Callbot vocal IA",
    "Site WordPress SEO",
    "Maquette UI/UX",
  ],
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
  description: "Automatisation, IA & Web — Scale Smart. Grow Bold.",
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: "fr-FR",
};

const jsonLdServices = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Automatisation Métier",
    provider: { "@id": `${SITE_URL}#organization` },
    description:
      "Workflows intelligents avec Make, n8n ou Zapier. Connexion d'outils, suppression des tâches répétitives, gain de +10h/semaine.",
    areaServed: "Worldwide",
    offers: { "@type": "Offer", price: "30", priceCurrency: "EUR", url: `${SITE_URL}#pricing` },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Chatbot IA sur Mesure",
    provider: { "@id": `${SITE_URL}#organization` },
    description:
      "Chatbots GPT-4 / Claude déployés sur WhatsApp, site web ou Messenger. Entraînés sur vos données.",
    areaServed: "Worldwide",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "CallBot & Assistant Vocal IA",
    provider: { "@id": `${SITE_URL}#organization` },
    description:
      "Agents vocaux 24/7 via Vapi, Twilio ou Bland AI. Prise de RDV, qualification de leads, support client.",
    areaServed: "Worldwide",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Site WordPress + SEO",
    provider: { "@id": `${SITE_URL}#organization` },
    description:
      "Sites vitrines rapides et SEO-ready avec WordPress + Elementor. Optimisation technique, contenu et netlinking.",
    areaServed: "Worldwide",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Maquette UI/UX IA",
    provider: { "@id": `${SITE_URL}#organization` },
    description:
      "Prototypes cliquables livrés en 48-72h avec Figma AI et v0.dev. Design moderne, mobile-first.",
    areaServed: "Worldwide",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
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
