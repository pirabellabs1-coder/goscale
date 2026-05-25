import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable (404)",
  description:
    "La page que vous cherchez n'existe pas ou a été déplacée. Retournez à l'accueil de GoScaleStudio ou explorez nos services.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="bg-dark text-white min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-xl text-center">
        <div className="font-display text-7xl sm:text-9xl font-bold gradient-text mb-4 leading-none">
          404
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-4">
          Cette page n'existe pas
        </h1>
        <p className="text-white/55 text-sm sm:text-base mb-8 leading-relaxed">
          La page que vous cherchez a été déplacée, supprimée, ou n'a jamais existé.
          Pas de panique — vous pouvez retourner à l'accueil ou explorer nos services.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-primary px-7 py-3.5 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2"
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/#services"
            className="btn-dark px-7 py-3.5 rounded-full text-sm inline-flex items-center justify-center gap-2"
          >
            Voir nos services
          </Link>
        </div>

        {/* Liens internes vers les 5 pillar pages (utile SEO + UX) */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-[11px] uppercase tracking-widest text-white/40 font-bold mb-4">
            Nos services
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { slug: "automatisation-no-code", label: "Automatisation No-Code" },
              { slug: "chatbot-ia", label: "ChatBot IA" },
              { slug: "callbot-ia-vocal", label: "CallBot IA" },
              { slug: "site-wordpress-seo", label: "Site WordPress + SEO" },
              { slug: "maquette-ui-ux", label: "Maquette UI/UX" },
            ].map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="text-xs text-white/60 hover:text-brand transition-colors px-3 py-1.5 border border-white/10 rounded-full"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
