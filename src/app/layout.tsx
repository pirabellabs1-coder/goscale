import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "GoScaleStudio | Automatisation, IA & Web — Scale Smart. Grow Bold.",
    template: "%s | GoScaleStudio",
  },
  description:
    "GoScaleStudio : studio spécialisé en automatisation, chatbots IA, callbots vocaux, sites WordPress SEO et maquettes UI/UX. 65+ projets livrés, note 5.0/5 sur ComeUp.",
  keywords: [
    "automatisation",
    "chatbot IA",
    "callbot vocal",
    "WordPress",
    "SEO",
    "maquette UI/UX",
    "GoScaleStudio",
    "Make",
    "n8n",
    "Zapier",
    "Voiceflow",
    "Botpress",
    "intelligence artificielle",
  ],
  authors: [{ name: "GoScaleStudio" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "GoScaleStudio",
    title: "GoScaleStudio | Automatisation, IA & Web",
    description:
      "Chatbots IA, assistants vocaux, automatisations et sites web performants. 65+ projets livrés.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoScaleStudio | Automatisation, IA & Web",
    description:
      "Chatbots IA, assistants vocaux, automatisations et sites web performants. 65+ projets livrés.",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "1rClZtKcWbBVWicoHQQt4LOguUgvdcyxq8QKM7QNrLw",
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${sora.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
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
