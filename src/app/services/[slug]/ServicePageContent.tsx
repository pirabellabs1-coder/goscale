"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, CheckCircle, Sparkles, Clock, Menu, X, Home, ArrowLeft, Cpu, Tag } from "lucide-react";
import { useT, useLang, useSyncHtmlLang } from "@/lib/i18n";
import { getService } from "@/lib/services-data";
import HeroIllustration from "./HeroIllustration";

const colorMap: Record<string, { text: string; bg: string; border: string; gradFrom: string; gradTo: string; ring: string; hex: string }> = {
  emerald: { text: "text-emerald", bg: "bg-emerald/10", border: "border-emerald/20", gradFrom: "from-emerald/25", gradTo: "to-emerald/5", ring: "border-emerald/30", hex: "#10B981" },
  blue: { text: "text-blue", bg: "bg-blue/10", border: "border-blue/20", gradFrom: "from-blue/25", gradTo: "to-blue/5", ring: "border-blue/30", hex: "#3B82F6" },
  brand: { text: "text-brand", bg: "bg-brand/10", border: "border-brand/20", gradFrom: "from-brand/30", gradTo: "to-accent/10", ring: "border-brand/40", hex: "#E85C1A" },
  purple: { text: "text-purple", bg: "bg-purple/10", border: "border-purple/20", gradFrom: "from-purple/25", gradTo: "to-purple/5", ring: "border-purple/30", hex: "#8B5CF6" },
  amber: { text: "text-amber", bg: "bg-amber/10", border: "border-amber/20", gradFrom: "from-amber/25", gradTo: "to-amber/5", ring: "border-amber/30", hex: "#F59E0B" },
};

/** Gradient pour les pastilles de logos d'outils (mappage par mot-clé) */
function toolGradient(name: string): string {
  const k = name.toLowerCase();
  if (k.includes("whatsapp")) return "linear-gradient(135deg,#25D366,#128C7E)";
  if (k.includes("gpt") || k.includes("openai")) return "linear-gradient(135deg,#10A37F,#0EAA85)";
  if (k.includes("claude") || k.includes("anthropic")) return "linear-gradient(135deg,#D97757,#F4A261)";
  if (k.includes("botpress")) return "linear-gradient(135deg,#1F4FE0,#4F8AFF)";
  if (k.includes("manychat")) return "linear-gradient(135deg,#00D9C0,#0099FF)";
  if (k.includes("wachap")) return "linear-gradient(135deg,#25D366,#0066FF)";
  if (k.includes("voiceflow")) return "linear-gradient(135deg,#5247FF,#7B6BFF)";
  if (k.includes("vapi")) return "linear-gradient(135deg,#15B79E,#5EE5C2)";
  if (k.includes("twilio")) return "linear-gradient(135deg,#F22F46,#FF6B7A)";
  if (k.includes("eleven")) return "linear-gradient(135deg,#1F1F1F,#5C5C5C)";
  if (k.includes("retell")) return "linear-gradient(135deg,#7C3AED,#C084FC)";
  if (k.includes("make")) return "linear-gradient(135deg,#6D5BFC,#9D4EFF)";
  if (k.includes("n8n")) return "linear-gradient(135deg,#EA4B71,#FF6B6B)";
  if (k.includes("zapier")) return "linear-gradient(135deg,#FF4A00,#FF7A45)";
  if (k.includes("hubspot")) return "linear-gradient(135deg,#FF7A59,#FF9F7C)";
  if (k.includes("notion")) return "linear-gradient(135deg,#1F1F1F,#404040)";
  if (k.includes("airtable")) return "linear-gradient(135deg,#FCB400,#FF8800)";
  if (k.includes("calendar") || k.includes("calendly")) return "linear-gradient(135deg,#4285F4,#34A853)";
  if (k.includes("stripe")) return "linear-gradient(135deg,#6772E5,#9D7DFF)";
  if (k.includes("paypal")) return "linear-gradient(135deg,#003087,#009CDE)";
  if (k.includes("wordpress")) return "linear-gradient(135deg,#21759B,#1E8CBE)";
  if (k.includes("elementor")) return "linear-gradient(135deg,#92003B,#D7286E)";
  if (k.includes("rankmath")) return "linear-gradient(135deg,#724BCB,#9D4EFF)";
  if (k.includes("figma")) return "linear-gradient(135deg,#F24E1E,#A259FF)";
  if (k.includes("v0")) return "linear-gradient(135deg,#1F1F1F,#404040)";
  if (k.includes("gohighlevel")) return "linear-gradient(135deg,#1F77FF,#3CC8FF)";
  return "linear-gradient(135deg,#F07830,#D94048)"; // brand default
}

function toolInitials(name: string): string {
  const cleaned = name.replace(/[()]/g, "").trim();
  const words = cleaned.split(/[\s/]+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2);
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function ServicePageContent({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<div className="bg-dark min-h-screen" />}>
      <ServiceInner slug={slug} />
    </Suspense>
  );
}

function ServiceInner({ slug }: { slug: string }) {
  const service = getService(slug);
  const t = useT();
  const lang = useLang();
  useSyncHtmlLang();
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".anim:not([data-visible])");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-visible", "");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });

  const toggleLang = () => {
    const newLang = lang === "fr" ? "en" : "fr";
    if (typeof document !== "undefined") {
      document.cookie = `gs-lang=${newLang};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    }
    const params = new URLSearchParams(sp?.toString() || "");
    if (newLang === "en") params.set("lang", "en");
    else params.delete("lang");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname || "/");
  };

  if (!service) {
    return (
      <div className="bg-dark min-h-screen flex items-center justify-center text-white/60">
        Service introuvable
      </div>
    );
  }

  const palette = colorMap[service.color] || colorMap.brand;
  const Icon = service.icon;

  const linkToContact = `/?lang=${lang}#contact`;
  const linkToServices = `/?lang=${lang}#services`;

  // Liens du footer — identiques à la home (scroll vers les ancres sur la home)
  const footerNavLinks = [
    { label: { fr: "Services", en: "Services" }, id: "services" },
    { label: { fr: "Tarifs", en: "Pricing" }, id: "pricing" },
    { label: { fr: "Réalisations", en: "Work" }, id: "portfolio" },
    { label: { fr: "À propos", en: "About" }, id: "about" },
    { label: { fr: "FAQ", en: "FAQ" }, id: "faq" },
    { label: { fr: "Contact", en: "Contact" }, id: "contact" },
  ];

  return (
    <div className="bg-dark text-white min-h-screen">
      {/* ── Nav — identique à la home (6 liens + lang + CTA) ── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-dark/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          <Link href={`/?lang=${lang}`} className="flex items-center gap-2 shrink-0" aria-label="GoScaleStudio — Accueil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="GoScaleStudio" className="h-8 w-8 rounded-lg object-cover" />
            <span className="font-display text-base sm:text-xl font-bold">
              <span className="gradient-text">GoScale</span>Studio
            </span>
          </Link>
          {/* Desktop nav (lg+ pour éviter le débordement à 6 liens) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm">
            {footerNavLinks.map((l) => (
              <Link
                key={l.id}
                href={`/?lang=${lang}#${l.id}`}
                className="text-white/70 hover:text-white transition-colors whitespace-nowrap"
              >
                {t(l.label)}
              </Link>
            ))}
            <button
              onClick={toggleLang}
              className="text-xs font-bold text-white/60 hover:text-brand transition-colors px-2 py-1 border border-white/10 rounded-md"
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
            <Link
              href={linkToContact}
              className="btn-primary px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 whitespace-nowrap"
            >
              {t({ fr: "Audit gratuit", en: "Free audit" })} <ArrowRight size={14} />
            </Link>
          </div>

          {/* CTA seul + burger (mobile + tablet) */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={linkToContact}
              className="hidden sm:flex btn-primary px-4 py-2 rounded-full text-xs font-bold items-center gap-1.5 whitespace-nowrap"
            >
              {t({ fr: "Audit", en: "Audit" })} <ArrowRight size={12} />
            </Link>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="text-white p-2"
              aria-label="Menu"
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Menu mobile/tablet (jusqu'à lg) */}
        {mobileMenu && (
          <div className="lg:hidden bg-dark-2 border-t border-white/5 p-4 flex flex-col gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {footerNavLinks.map((l) => (
              <Link
                key={l.id}
                href={`/?lang=${lang}#${l.id}`}
                className="text-sm text-white/80 py-3 px-2 hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setMobileMenu(false)}
              >
                {t(l.label)}
              </Link>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={toggleLang}
                className="text-xs text-white/60 px-3 py-2 border border-white/10 rounded-md font-bold flex-shrink-0"
              >
                {lang === "fr" ? "EN" : "FR"}
              </button>
              <Link
                href={linkToContact}
                onClick={() => setMobileMenu(false)}
                className="btn-primary flex-1 px-4 py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2"
              >
                {t({ fr: "Audit gratuit", en: "Free audit" })} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── Breadcrumb ── */}
      <div className="pt-24 sm:pt-28 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-white/40 flex-wrap">
          <Link href={`/?lang=${lang}`} className="hover:text-brand transition-colors flex items-center gap-1">
            <Home size={11} /> {t({ fr: "Accueil", en: "Home" })}
          </Link>
          <span className="text-white/20">/</span>
          <Link href={`/?lang=${lang}#services`} className="hover:text-brand transition-colors">
            {t({ fr: "Services", en: "Services" })}
          </Link>
          <span className="text-white/20">/</span>
          <span className={`${palette.text} font-semibold`}>{t(service.hero.badge)}</span>
        </div>
      </div>

      {/* ══════ HERO — 2 colonnes texte + illustration ══════ */}
      <section className="relative pt-8 sm:pt-12 pb-16 sm:pb-24 px-5 sm:px-6 overflow-hidden">
        {/* Halos décoratifs très diffus */}
        <div className={`absolute top-10 -right-32 w-96 h-96 ${palette.bg} rounded-full blur-3xl opacity-40 pointer-events-none`} />
        <div className={`absolute -bottom-20 -left-40 w-80 h-80 ${palette.bg} rounded-full blur-3xl opacity-20 pointer-events-none`} />

        {/*
          Layout hero :
          - Mobile : badge → H1 → subtitle → ILLUSTRATION → CTA → trust strip (ordre source)
          - Desktop (lg+) : 2 colonnes. Gauche : badge + H1 + subtitle (haut) + CTA + trust (bas). Droite : illustration pleine hauteur.
        */}
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-x-16 lg:gap-y-6 lg:items-center">
          {/* TOP TEXT — badge + h1 + subtitle */}
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            {/* Badge */}
            <div className="anim fade-up mb-4 sm:mb-5 flex items-center gap-3 flex-wrap">
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${palette.bg} ${palette.border} border ${palette.text} text-[11px] font-bold uppercase tracking-widest`}>
                <Icon size={11} /> {t(service.hero.badge)}
              </span>
              <span className="text-xs text-white/30">·</span>
              <span className="text-xs text-white/40">{service.category}</span>
            </div>

            {/* H1 — taille réduite mobile */}
            <h1 className="anim fade-up delay-1 font-display text-[1.625rem] leading-[1.2] sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-5">
              {t(service.hero.h1)}{" "}
              {service.hero.h1Highlight.fr && (
                <span className="gradient-text">{t(service.hero.h1Highlight)}</span>
              )}
            </h1>

            {/* Subtitle */}
            <p className="anim fade-up delay-2 text-[13px] sm:text-base lg:text-lg text-white/60 leading-relaxed max-w-xl">
              {t(service.hero.subtitle)}
            </p>
          </div>

          {/* ILLUSTRATION — entre subtitle et CTA sur mobile, colonne droite pleine hauteur sur desktop */}
          <div className="anim fade-up delay-3 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center my-2 lg:my-0">
            <HeroIllustration
              variant={service.heroIllustration || "icon-halo"}
              color={service.color}
            />
          </div>

          {/* BOTTOM TEXT — CTAs + trust strip */}
          <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
            {/* CTA */}
            <div className="anim fade-up delay-3 flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
              <Link
                href={linkToContact}
                className="btn-primary px-6 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2"
              >
                {t({ fr: "Démarrer mon projet", en: "Start my project" })} <ArrowRight size={16} />
              </Link>
              <Link
                href={linkToServices}
                className="btn-dark px-6 py-3.5 rounded-full text-sm flex items-center justify-center gap-2"
              >
                <ArrowLeft size={15} /> {t({ fr: "Tous nos services", en: "All our services" })}
              </Link>
            </div>

            {/* Trust strip */}
            <div className="anim fade-up delay-4 flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-3 pt-1">
              {service.hero.trustStrip.map((item, i) => (
                <div key={i} className="flex items-baseline gap-1.5 sm:gap-2">
                  <span className="font-display text-lg sm:text-2xl font-bold gradient-text tabular-nums leading-none">
                    {item.value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider font-medium">
                    {t(item.label)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ PAIN POINTS ══════ */}
      {service.painPoints.items.length > 0 && (
        <section className="py-14 sm:py-20 px-5 sm:px-6 bg-dark-2">
          <div className="max-w-4xl mx-auto">
            <div className="anim fade-up section-badge mb-5"><span>×</span> {t({ fr: "Le problème", en: "The problem" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-lg sm:text-xl lg:text-3xl font-bold mb-5 leading-tight">
              {t({ fr: "Ce qui vous coûte du temps et de l'argent", en: "What's costing you time and money" })}
            </h2>
            <p className="anim fade-up delay-2 text-white/55 text-sm sm:text-base leading-relaxed mb-10 max-w-3xl">
              {t(service.painPoints.intro)}
            </p>

            <div className="flex flex-col">
              {service.painPoints.items.map((p, i) => (
                <div
                  key={i}
                  className={`anim fade-up delay-${Math.min(i + 1, 6)} group relative grid grid-cols-[auto_1fr] gap-5 sm:gap-8 py-6 sm:py-8 ${
                    i < service.painPoints.items.length - 1 ? "border-b border-white/8" : ""
                  }`}
                >
                  <div className="flex flex-col items-start gap-3">
                    <span className="font-display text-3xl sm:text-4xl font-bold text-red-500/30 leading-none tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p.icon size={18} className="text-red-400/70 group-hover:text-red-400 transition-colors" />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-display text-base sm:text-lg font-bold mb-2 group-hover:text-red-300 transition-colors">
                      {t(p.title)}
                    </h3>
                    <p className="text-white/55 text-sm sm:text-[15px] leading-relaxed max-w-2xl">
                      {t(p.desc)}
                    </p>
                  </div>
                  <div className="absolute left-0 top-6 sm:top-8 bottom-6 sm:bottom-8 w-px bg-gradient-to-b from-red-500/30 via-red-500/10 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════ SOLUTION ══════ */}
      {service.solution.features.length > 0 && (
        <section className="py-14 sm:py-20 px-5 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="anim fade-up section-badge mb-5"><CheckCircle size={12} /> {t({ fr: "La solution", en: "The solution" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-lg sm:text-xl lg:text-3xl font-bold mb-5 leading-tight">
              {t(service.solution.headline)}
            </h2>
            <p className="anim fade-up delay-2 text-white/55 text-sm sm:text-base leading-relaxed mb-12 max-w-3xl">
              {t(service.solution.intro)}
            </p>

            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-9 sm:gap-y-10">
              {service.solution.features.map((f, i) => (
                <div key={i} className={`anim fade-up delay-${Math.min(i + 1, 6)} group`}>
                  <div className="flex items-center gap-3 mb-3">
                    <f.icon size={18} className={palette.text} />
                    <div className={`flex-1 h-px bg-gradient-to-r ${palette.border.replace("border-", "from-")} to-transparent`} />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold mb-2 leading-tight">
                    {t(f.title)}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {t(f.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════ HOW IT WORKS — Timeline zigzag ══════ */}
      {service.howItWorks.steps.length > 0 && (
        <section className="py-14 sm:py-20 px-5 sm:px-6 bg-dark-2">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="anim fade-up section-badge mx-auto mb-5"><Clock size={12} /> {t({ fr: "Comment ça marche", en: "How it works" })}</div>
              <h2 className="anim fade-up delay-1 font-display text-lg sm:text-xl lg:text-3xl font-bold leading-tight">
                {t(service.howItWorks.headline)}
              </h2>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className={`absolute top-4 bottom-4 left-7 sm:left-1/2 sm:-translate-x-px w-px bg-gradient-to-b ${palette.border.replace("border-", "from-")} via-white/10 to-transparent`} />

              <ol className="flex flex-col gap-10 sm:gap-14 pt-6">
                {service.howItWorks.steps.map((s, i) => {
                  const isRight = i % 2 === 0;
                  return (
                    <li
                      key={i}
                      className={`anim ${isRight ? "fade-left" : "fade-right"} delay-${Math.min(i + 1, 6)} group relative grid grid-cols-[auto_1fr] sm:grid-cols-2 sm:gap-0 items-start`}
                    >
                      {!isRight && (
                        <div className="hidden sm:block sm:col-start-1 pr-14 text-right">
                          <StepDesktop step={s} index={i} palette={palette} t={t} alignRight />
                        </div>
                      )}

                      <div className="relative flex-shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-0 z-10">
                        <div className={`absolute inset-0 ${palette.bg} rounded-full blur-xl group-hover:opacity-80 transition-opacity`} />
                        <div className={`relative w-14 h-14 rounded-full bg-dark border-2 ${palette.ring} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <s.icon size={20} className={palette.text} />
                        </div>
                        <span className={`absolute -top-1 -right-1 text-[10px] font-display font-bold text-white w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-lg ring-2 ring-dark`} style={{ background: palette.hex }}>
                          {i + 1}
                        </span>
                      </div>

                      <div className="sm:hidden pt-1 pl-3">
                        <StepMobile step={s} index={i} palette={palette} t={t} />
                      </div>

                      {isRight && (
                        <div className="hidden sm:block sm:col-start-2 pl-14">
                          <StepDesktop step={s} index={i} palette={palette} t={t} />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* ══════ STATS — Bandeau ══════ */}
      {service.stats.length > 0 && (
        <section className="py-10 sm:py-14 px-5 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="anim scale-in relative">
              <div className={`absolute inset-0 -inset-x-6 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent rounded-3xl`} />
              <div className="relative grid grid-cols-2 md:grid-cols-4 py-8 sm:py-10">
                {service.stats.map((s, i) => (
                  <div
                    key={i}
                    className={`px-5 sm:px-6 text-center ${
                      i > 0 ? "md:border-l border-white/10" : ""
                    } ${i === 2 ? "border-l md:border-l border-white/10" : ""} ${
                      i >= 2 ? "mt-8 md:mt-0 pt-8 md:pt-0 border-t md:border-t-0 border-white/10" : ""
                    }`}
                  >
                    <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold gradient-text mb-2 tabular-nums leading-none">
                      {s.value}{s.suffix || ""}
                    </div>
                    <p className="text-white/50 text-xs sm:text-sm uppercase tracking-wider font-medium">
                      {t(s.label)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════ USE CASES — par secteur ══════ */}
      {service.useCases.cases.length > 0 && (
        <section className="py-14 sm:py-20 px-5 sm:px-6 bg-dark-2">
          <div className="max-w-5xl mx-auto">
            <div className="anim fade-up section-badge mb-5"><Sparkles size={12} /> {t({ fr: "Cas d'usage", en: "Use cases" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-lg sm:text-xl lg:text-3xl font-bold mb-5 leading-tight">
              {t(service.useCases.headline)}
            </h2>
            <p className="anim fade-up delay-2 text-white/55 text-sm sm:text-base leading-relaxed mb-12 max-w-3xl">
              {t(service.useCases.intro)}
            </p>

            <div className="flex flex-col">
              {service.useCases.cases.map((c, i) => (
                <div
                  key={i}
                  className={`anim fade-up delay-${Math.min(i + 1, 6)} group py-9 sm:py-11 ${
                    i < service.useCases.cases.length - 1 ? "border-b border-white/8" : ""
                  }`}
                >
                  <div className="grid sm:grid-cols-[auto_1fr] gap-5 sm:gap-10">
                    <div className="flex sm:flex-col items-start gap-4">
                      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${palette.gradFrom} ${palette.gradTo} border ${palette.ring} flex items-center justify-center flex-shrink-0`}>
                        <c.icon size={24} className={palette.text} />
                      </div>
                      <div className="pt-1 sm:pt-0">
                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">
                          {t({ fr: "Secteur", en: "Sector" })}
                        </div>
                        <div className="font-display text-base font-bold">{t(c.sector)}</div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-red-400/70 font-bold mb-1.5">
                          {t({ fr: "Le problème", en: "The problem" })}
                        </div>
                        <p className="text-white/65 text-sm sm:text-[15px] leading-relaxed">{t(c.problem)}</p>
                      </div>
                      <div>
                        <div className={`text-[10px] uppercase tracking-widest ${palette.text} font-bold mb-1.5 opacity-80`}>
                          {t({ fr: "Notre approche", en: "Our approach" })}
                        </div>
                        <p className="text-white/65 text-sm sm:text-[15px] leading-relaxed">{t(c.solution)}</p>
                      </div>
                      <div className="flex items-start gap-3 pt-2">
                        <CheckCircle size={16} className="text-emerald flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-emerald font-bold mb-0.5">
                            {t({ fr: "Résultat moyen observé", en: "Average result observed" })}
                          </div>
                          <p className="font-semibold text-white text-sm sm:text-[15px] leading-relaxed">{t(c.result)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════ STACK technique — Logos colorés en grille ══════ */}
      {service.stack.tools.length > 0 && (
        <section className="py-14 sm:py-20 px-5 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="anim fade-up section-badge mx-auto mb-5"><Cpu size={12} /> {t({ fr: "Stack technique", en: "Tech stack" })}</div>
              <h2 className="anim fade-up delay-1 font-display text-lg sm:text-xl lg:text-3xl font-bold mb-4 leading-tight">
                {t(service.stack.headline)}
              </h2>
              <p className="anim fade-up delay-2 text-white/55 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                {t(service.stack.intro)}
              </p>
            </div>

            {/* Grille de tuiles d'outils colorées */}
            <div className="anim fade-up delay-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {service.stack.tools.map((tool, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-dark-2 border border-white/8 hover:border-white/20 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-md group-hover:scale-105 transition-transform"
                    style={{ background: toolGradient(tool.name) }}
                  >
                    {toolInitials(tool.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-sm text-white truncate mb-1">{tool.name}</div>
                    <div className="text-xs text-white/50 leading-relaxed line-clamp-2">{t(tool.role)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════ PRICING ══════ */}
      {service.pricing.tiers.length > 0 && (
        <section className="py-14 sm:py-20 px-5 sm:px-6 bg-dark-2">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="anim fade-up section-badge mx-auto mb-5"><Tag size={12} /> {t({ fr: "Tarifs", en: "Pricing" })}</div>
              <h2 className="anim fade-up delay-1 font-display text-lg sm:text-xl lg:text-3xl font-bold mb-4 leading-tight">
                {t(service.pricing.headline)}
              </h2>
              <p className="anim fade-up delay-2 text-white/55 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                {t(service.pricing.intro)}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {service.pricing.tiers.map((tier, i) => (
                <div
                  key={i}
                  className={`anim fade-up delay-${i + 1} relative p-6 sm:p-7 rounded-3xl ${
                    tier.highlight
                      ? `bg-gradient-to-br ${palette.gradFrom} ${palette.gradTo} border-2 ${palette.ring}`
                      : "bg-dark border border-white/8"
                  }`}
                >
                  {tier.highlight && (
                    <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest ${palette.bg} ${palette.text} px-3 py-1 rounded-full border ${palette.ring}`}>
                      {t({ fr: "Recommandé", en: "Recommended" })}
                    </span>
                  )}
                  <h3 className="font-display text-base sm:text-lg font-bold mb-1">{t(tier.name)}</h3>
                  <p className="text-white/40 text-xs mb-5">{t(tier.priceNote)}</p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className={`font-display text-2xl sm:text-3xl font-bold ${tier.highlight ? "gradient-text" : "text-white"}`}>
                      {tier.price}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2.5 mb-6">
                    {tier.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5 text-sm text-white/75">
                        <CheckCircle size={14} className={`${palette.text} flex-shrink-0 mt-0.5`} />
                        <span>{t(f)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={linkToContact}
                    className={`w-full px-5 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${
                      tier.highlight ? "btn-primary" : "btn-dark"
                    }`}
                  >
                    {t({ fr: "Choisir cette offre", en: "Choose this plan" })} <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════ FAQ ══════ */}
      {service.faq.length > 0 && (
        <section className="py-14 sm:py-20 px-5 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="anim fade-up section-badge mx-auto mb-5">? FAQ</div>
              <h2 className="anim fade-up delay-1 font-display text-lg sm:text-xl lg:text-3xl font-bold leading-tight">
                {t({ fr: "Questions fréquentes", en: "Frequently asked questions" })}
              </h2>
            </div>

            <div className="flex flex-col">
              {service.faq.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div
                    key={i}
                    className={`anim fade-up delay-${Math.min(i + 1, 6)} border-b border-white/8`}
                  >
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full flex items-start justify-between gap-4 py-5 sm:py-6 text-left group"
                    >
                      <span className={`font-display font-bold text-sm sm:text-base pt-0.5 transition-colors ${open ? palette.text : "text-white"} group-hover:${palette.text}`}>
                        {t(f.q)}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`${palette.text} flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""} mt-1`}
                      />
                    </button>
                    {open && (
                      <div className="pb-6 pr-8">
                        <p className="text-white/65 text-sm sm:text-[15px] leading-relaxed">{t(f.a)}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════ Services connexes ══════ */}
      {service.relatedSlugs.length > 0 && (
        <section className="py-14 sm:py-20 px-5 sm:px-6 bg-dark-2">
          <div className="max-w-5xl mx-auto">
            <div className="anim fade-up section-badge mb-5">→ {t({ fr: "Services connexes", en: "Related services" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl font-bold mb-8 leading-tight">
              {t({ fr: "Vous pourriez aussi être intéressé par", en: "You might also be interested in" })}
            </h2>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {service.relatedSlugs.map((relSlug, i) => {
                const rel = getService(relSlug);
                if (!rel) return null;
                const relPalette = colorMap[rel.color] || colorMap.brand;
                const RelIcon = rel.icon;
                return (
                  <Link
                    key={i}
                    href={`/services/${relSlug}${lang === "en" ? "?lang=en" : ""}`}
                    className={`anim fade-up delay-${i + 1} group flex items-start gap-4 py-5 border-b border-white/8 hover:border-white/15 transition-colors`}
                  >
                    <RelIcon size={20} className={`${relPalette.text} flex-shrink-0 mt-0.5`} />
                    <div className="flex-1 min-w-0">
                      <div className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${relPalette.text}`}>
                        {rel.category}
                      </div>
                      <h3 className="font-display text-sm sm:text-base font-bold group-hover:text-white transition-colors leading-tight">
                        {t(rel.hero.h1)}
                      </h3>
                    </div>
                    <ArrowUpRight size={15} className="text-white/30 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-1" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════ CTA Final ══════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="anim fade-up font-display text-xl sm:text-2xl lg:text-4xl font-bold mb-5 leading-tight">
            {t(service.cta.headline)}
          </h2>
          <p className="anim fade-up delay-1 text-white/55 text-sm sm:text-base lg:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            {t(service.cta.desc)}
          </p>
          <div className="anim fade-up delay-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={linkToContact}
              className="btn-primary px-8 py-3.5 rounded-full text-sm sm:text-base font-bold flex items-center justify-center gap-2"
            >
              {t(service.cta.primaryLabel)} <ArrowRight size={16} />
            </Link>
            <Link
              href={linkToServices}
              className="btn-dark px-8 py-3.5 rounded-full text-sm sm:text-base flex items-center justify-center gap-2"
            >
              {t(service.cta.secondaryLabel)}
            </Link>
          </div>
          <p className="anim fade-up delay-3 text-[11px] text-white/35 mt-5">
            {t({ fr: "Aucune carte requise · Réponse sous 24h · Zéro engagement", en: "No card required · Reply within 24h · No commitment" })}
          </p>
        </div>
      </section>

      {/* ══════ Footer — identique à la home + section Services pour l'interconnexion ══════ */}
      <footer className="border-t border-border py-10 sm:py-14 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Sections de liens (Brand + Nav + Services) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.2fr] gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10">
            {/* Brand + tagline (full width sur sm pour respirer) */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href={`/?lang=${lang}`} className="font-display text-lg font-bold inline-block mb-3">
                <span className="gradient-text">GoScale</span>Studio
              </Link>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                {t({
                  fr: "Agence digitale à Cotonou — Automatisation, IA, sites web & maquettes. 65+ projets livrés à travers l'Afrique, la francophonie et l'international.",
                  en: "Digital agency in Cotonou — Automation, AI, websites & mockups. 65+ projects delivered across Africa, the francophone world and internationally.",
                })}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
                {t({ fr: "Navigation", en: "Navigation" })}
              </div>
              <div className="flex flex-col gap-2 text-sm text-white/60">
                {footerNavLinks.map((l) => (
                  <Link
                    key={l.id}
                    href={`/?lang=${lang}#${l.id}`}
                    className="hover:text-brand transition-colors"
                  >
                    {t(l.label)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services (interconnexion vers les 5 pillar pages) */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">
                {t({ fr: "Nos services", en: "Our services" })}
              </div>
              <div className="flex flex-col gap-2 text-sm text-white/60">
                {[
                  { slug: "automatisation-no-code", label: { fr: "Automatisation No-Code", en: "No-Code Automation" } },
                  { slug: "chatbot-ia", label: { fr: "ChatBot IA", en: "AI ChatBot" } },
                  { slug: "callbot-ia-vocal", label: { fr: "CallBot & Agent Vocal IA", en: "AI CallBot & Voice Agent" } },
                  { slug: "site-wordpress-seo", label: { fr: "Site WordPress + SEO", en: "WordPress Site + SEO" } },
                  { slug: "maquette-ui-ux", label: { fr: "Maquette UI/UX", en: "UI/UX Mockup" } },
                ].map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}${lang === "en" ? "?lang=en" : ""}`}
                    className={`hover:text-brand transition-colors ${
                      service.slug === s.slug || service.pillarSlug === s.slug ? "text-brand font-semibold" : ""
                    }`}
                  >
                    {t(s.label)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="divider mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <p>
              &copy; {new Date().getFullYear()} GoScaleStudio.{" "}
              {t({ fr: "Tous droits réservés.", en: "All rights reserved." })}
            </p>
            <p>
              {t({ fr: "Réalisé par ", en: "Built by " })}
              <a
                href="https://pirabellabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand/60 hover:text-brand transition-colors font-semibold"
              >
                Pirabel Labs
              </a>
              {t({ fr: ", Agence Web, Marketing & SEO", en: ", Web, Marketing & SEO Agency" })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Sub-components pour le timeline ── */

type StepProps = {
  step: { icon: React.ComponentType<{ size?: number; className?: string }>; title: { fr: string; en: string }; desc: { fr: string; en: string }; duration: { fr: string; en: string } };
  index: number;
  palette: typeof colorMap[string];
  t: <T>(o: { fr: T; en: T }) => T;
  alignRight?: boolean;
};

function StepDesktop({ step, index, palette, t, alignRight }: StepProps) {
  return (
    <div className={`max-w-md ${alignRight ? "ml-auto" : ""}`}>
      <div className={`flex items-center gap-2 mb-3 ${alignRight ? "justify-end" : ""}`}>
        <span className={`font-display text-xs font-bold uppercase tracking-widest ${palette.text}`}>
          {String(index + 1).padStart(2, "0")} · {t({ fr: "Étape", en: "Step" })}
        </span>
        <span className="w-1 h-1 rounded-full bg-white/30" />
        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${palette.text} ${palette.bg} border ${palette.border} px-2 py-0.5 rounded-full`}>
          <Clock size={10} /> {t(step.duration)}
        </span>
      </div>
      <h3 className="font-display text-base sm:text-lg font-bold mb-2 leading-tight">{t(step.title)}</h3>
      <p className="text-white/55 text-sm leading-relaxed">{t(step.desc)}</p>
    </div>
  );
}

function StepMobile({ step, index, palette, t }: StepProps) {
  return (
    <div className="max-w-md text-left">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`font-display text-xs font-bold uppercase tracking-widest ${palette.text}`}>
          {String(index + 1).padStart(2, "0")} · {t({ fr: "Étape", en: "Step" })}
        </span>
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${palette.text} ${palette.bg} border ${palette.border} px-2 py-0.5 rounded-full`}>
          <Clock size={10} /> {t(step.duration)}
        </span>
      </div>
      <h3 className="font-display text-base font-bold mb-2 leading-tight">{t(step.title)}</h3>
      <p className="text-white/55 text-sm leading-relaxed">{t(step.desc)}</p>
    </div>
  );
}
