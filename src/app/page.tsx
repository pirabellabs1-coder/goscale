"use client";

import { useState, useEffect, useRef } from "react";
import { useProjects } from "@/lib/ProjectContext";
import { categoryColors } from "@/lib/data";
import {
  Menu, X, Zap, Bot, Phone, Globe, Palette, ChevronDown,
  ArrowRight, Star, Mail, MapPin, Clock, Shield, Headphones,
  RotateCcw, Users, TrendingUp, CheckCircle, Play, Sparkles,
  Target, BarChart3, MessageSquare,
} from "lucide-react";

/* ── Data ──────────────────────────────────────────── */

const services = [
  { icon: Zap, title: "Automatisation Metier", desc: "Workflows intelligents avec Make, n8n ou Zapier. On connecte vos outils, on supprime les taches repetitives, on vous rend +10h/semaine.", color: "emerald" },
  { icon: Phone, title: "CallBot & Assistant Vocal IA", desc: "Agents vocaux 24/7 via Vapi, Twilio ou Bland AI. Prise de RDV, qualification de leads, support client — sans intervention humaine.", color: "blue" },
  { icon: Bot, title: "ChatBot IA sur Mesure", desc: "Chatbots GPT-4 deployes sur WhatsApp, site web ou Messenger. Entraines sur vos donnees, ils convertissent et assistent vos clients.", color: "brand" },
  { icon: Globe, title: "Site WordPress + SEO", desc: "Sites vitrines rapides et SEO-ready avec WordPress + Elementor. Optimisation technique, contenu et netlinking pour atteindre la page 1.", color: "purple" },
  { icon: Palette, title: "Maquette UI/UX IA", desc: "Prototypes cliquables livres en 48-72h avec Figma AI et v0.dev. Design moderne, mobile-first, pret pour le developpement.", color: "amber" },
];

const processSteps = [
  { num: "01", title: "Appel Decouverte", desc: "On analyse votre business, vos blocages et vos objectifs en 30 min.", icon: MessageSquare },
  { num: "02", title: "Strategie & Devis", desc: "Plan d'action clair, timeline et devis transparent sous 24h.", icon: Target },
  { num: "03", title: "Execution Rapide", desc: "Developpement agile avec points reguliers. Livraison en 3-14 jours.", icon: Zap },
  { num: "04", title: "Support & Scale", desc: "Suivi post-livraison, optimisations et accompagnement pour scaler.", icon: TrendingUp },
];

const stats = [
  { value: 65, suffix: "+", label: "Projets livres" },
  { value: 5, suffix: ".0/5", label: "Note ComeUp" },
  { value: 15, suffix: "h+", label: "Economisees/sem" },
  { value: 48, suffix: "h", label: "Delai moyen" },
];

const testimonials1 = [
  { name: "Jean-Marc D.", role: "Agent immobilier", text: "GoScaleStudio a automatise tout mon CRM. Je gagne 15h par semaine et je ne rate plus aucun lead. Service au top !", rating: 5 },
  { name: "Sophie L.", role: "CEO Startup FinTech", text: "Maquette livree en 48h, exactement ce qu'il nous fallait pour notre levee de fonds. Resultat : 200K leves !", rating: 5 },
  { name: "Marc A.", role: "E-commerce Mode", text: "Le chatbot WhatsApp a augmente nos conversions de 35%. Les clients adorent avoir des reponses instantanees.", rating: 5 },
];

const testimonials2 = [
  { name: "Claire M.", role: "Directrice Clinique", text: "Le callbot gere 80% de nos appels. Plus d'appels manques, les patients adorent. Un vrai game-changer.", rating: 5 },
  { name: "Pierre K.", role: "Consultant SEO", text: "Site WordPress impeccable, page 1 Google en 2 mois. Le meilleur investissement digital que j'ai fait.", rating: 5 },
  { name: "Amina B.", role: "Fondatrice Agence", text: "Automatisation complete de notre social media. 4 reseaux geres automatiquement, reporting inclus.", rating: 5 },
];

const faqItems = [
  { q: "Quels sont vos delais de livraison ?", a: "La plupart des projets sont livres entre 3 et 14 jours selon la complexite. Les maquettes UI/UX sont livrees en 48-72h." },
  { q: "Est-ce que vous travaillez avec des entreprises hors de France ?", a: "Absolument ! Nous travaillons avec des clients dans toute la francophonie et a l'international. Tout se fait a distance." },
  { q: "Comment fonctionne le support apres livraison ?", a: "Chaque projet inclut un suivi post-livraison de 30 jours. Support reactif par email et WhatsApp." },
  { q: "Quels outils utilisez-vous ?", a: "Make, n8n, Zapier pour l'automatisation. Botpress, Voiceflow pour les chatbots. Vapi, Twilio pour les callbots. WordPress, Figma, v0.dev pour le web et design." },
  { q: "Est-ce que je peux modifier le chatbot/callbot apres livraison ?", a: "Oui, nous vous formons a l'utilisation et vous avez acces complet. On reste disponible pour les evolutions." },
  { q: "Combien coute un projet ?", a: "Les tarifs varient selon la complexite. Automatisation a partir de 150EUR, chatbot a partir de 200EUR, site web a partir de 400EUR. Devis gratuit sous 24h." },
];

const techTools = [
  "Make", "n8n", "Zapier", "Botpress", "Voiceflow", "GPT-4",
  "Vapi", "Twilio", "WordPress", "Elementor", "Figma", "v0.dev",
  "HubSpot", "Notion", "WhatsApp API", "Bland AI",
];

const guarantees = [
  { icon: Shield, title: "Satisfait ou Repris", desc: "Si le livrable ne correspond pas au cahier des charges, on reprend gratuitement." },
  { icon: Headphones, title: "Support 30 Jours", desc: "Suivi post-livraison inclus. On ne vous lache pas apres la mise en ligne." },
  { icon: RotateCcw, title: "Revisions Illimitees", desc: "Jusqu'a satisfaction totale sur chaque livrable, sans frais supplementaires." },
];

const colorMap: Record<string, string> = {
  emerald: "text-emerald bg-emerald/10 border-emerald/20",
  blue: "text-blue bg-blue/10 border-blue/20",
  brand: "text-brand bg-brand/10 border-brand/20",
  purple: "text-purple bg-purple/10 border-purple/20",
  amber: "text-amber bg-amber/10 border-amber/20",
};

/* ── Component ─────────────────────────────────────── */

export default function HomePage() {
  const { publishedProjects } = useProjects();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (counted) return;
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCounted(true);
          stats.forEach((s, i) => {
            const duration = 1500;
            const steps = 40;
            const increment = s.value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= s.value) {
                current = s.value;
                clearInterval(timer);
              }
              setCounters((prev) => {
                const copy = [...prev];
                copy[i] = Math.round(current);
                return copy;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [counted]);

  const scrollTo = (id: string) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "Realisations", id: "portfolio" },
    { label: "Processus", id: "process" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="bg-dark text-white min-h-screen">
      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-dark/90 backdrop-blur-lg border-b border-border" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-display text-xl font-bold">
            <span className="gradient-text">GoScale</span>Studio
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-sm text-white/60 hover:text-white transition-colors">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="btn-primary px-5 py-2 rounded-full text-sm">
              Demarrer un projet
            </button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-dark-2 border-t border-border px-6 py-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left text-white/70 hover:text-white">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="btn-primary px-5 py-3 rounded-full text-sm mt-2">
              Demarrer un projet
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,92,26,0.08)_0%,transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="section-badge mx-auto mb-8">
            <Sparkles size={12} /> Studio IA & Automatisation
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            Automatisez. Deployez.{" "}
            <span className="gradient-text">Scalez.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Chatbots IA, assistants vocaux, automatisations et sites web performants.
            On construit les systemes qui font tourner votre business — pendant que vous dormez.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("contact")} className="btn-primary px-8 py-4 rounded-full text-base flex items-center justify-center gap-2">
              Lancer mon projet <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollTo("portfolio")} className="btn-outline px-8 py-4 rounded-full text-base flex items-center justify-center gap-2">
              <Play size={18} /> Voir nos realisations
            </button>
          </div>
          <div className="mt-14 flex flex-wrap justify-center gap-8 text-sm text-white/40">
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald" /> 65+ projets livres</span>
            <span className="flex items-center gap-2"><Star size={16} className="text-amber" /> 5.0/5 ComeUp</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-blue" /> Livraison 48h-14j</span>
          </div>
        </div>
      </section>

      {/* ── Tech Marquee ── */}
      <section className="py-10 border-y border-border overflow-hidden">
        <div className="marquee-left flex gap-8 whitespace-nowrap">
          {[...techTools, ...techTools].map((t, i) => (
            <span key={i} className="tool-pill text-xs">{t}</span>
          ))}
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto mb-4"><Target size={12} /> Le Probleme</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Vous perdez du temps sur des taches qui ne <span className="gradient-text">scalent pas</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: "Taches repetitives", desc: "Vous passez des heures a copier-coller, relancer, planifier manuellement." },
              { icon: Phone, title: "Appels manques", desc: "Vos clients appellent, personne ne repond. Chaque appel manque = un client perdu." },
              { icon: Users, title: "Support deborde", desc: "Les memes questions reviennent. Votre equipe repond en boucle au lieu de vendre." },
            ].map((p, i) => (
              <div key={i} className="glass rounded-2xl p-8 hover:border-brand/20 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-5 group-hover:bg-brand/20 transition-colors">
                  <p.icon size={22} className="text-brand" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ── Services ── */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto mb-4"><Zap size={12} /> Nos Services</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Tout ce qu&apos;il faut pour <span className="gradient-text">scaler</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">5 expertises complementaires pour automatiser, convertir et dominer votre marche.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const cls = colorMap[s.color] || colorMap.brand;
              return (
                <div key={i} className="glass rounded-2xl p-8 hover:border-brand/20 transition-all duration-300 group hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${cls}`}>
                    <s.icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="process" className="py-24 px-6 bg-dark-2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto mb-4"><BarChart3 size={12} /> Notre Processus</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              De l&apos;idee au <span className="gradient-text">resultat</span> en 4 etapes
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((s, i) => (
              <div key={i} className="relative glass rounded-2xl p-8 text-center group hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl font-display font-bold text-brand/20 mb-4">{s.num}</div>
                <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-5">
                  <s.icon size={24} className="text-brand" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-brand/30">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-24 px-6" ref={statsRef}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto mb-4"><TrendingUp size={12} /> Chiffres Cles</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Des <span className="gradient-text">resultats</span> concrets
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="glass rounded-2xl p-8 text-center">
                <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                  {counters[i]}{s.suffix}
                </div>
                <p className="text-white/50 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ── Portfolio ── */}
      <section id="portfolio" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto mb-4"><Sparkles size={12} /> Realisations</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Nos derniers <span className="gradient-text">projets</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">Chaque projet est concu sur mesure pour resoudre un probleme metier reel.</p>
          </div>
          {publishedProjects.length === 0 ? (
            <p className="text-center text-white/30">Aucune realisation publiee pour le moment.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {publishedProjects.map((p) => {
                const cat = categoryColors[p.category] || "brand";
                return (
                  <div key={p.id} className="group bg-dark-3 rounded-2xl border border-border overflow-hidden hover:border-brand/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-52 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="portfolio-gradient absolute inset-0" />
                      <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full border ${colorMap[cat] || colorMap.brand}`}>
                        {p.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold mb-2">{p.title}</h3>
                      <p className="text-white/50 text-sm mb-4 leading-relaxed">{p.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-brand font-bold text-sm">{p.result}</span>
                        <div className="flex gap-1.5 flex-wrap justify-end">
                          {p.tools.split(", ").map((t, ti) => (
                            <span key={ti} className="tool-pill">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-dark-2 overflow-hidden">
        <div className="text-center mb-16 px-6">
          <div className="section-badge mx-auto mb-4"><Star size={12} /> Avis Clients</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Ce que disent nos <span className="gradient-text">clients</span>
          </h2>
        </div>
        {/* Row 1 - scroll left */}
        <div className="mb-6 overflow-hidden">
          <div className="marquee-left flex gap-6">
            {[...testimonials1, ...testimonials1].map((t, i) => (
              <div key={i} className="testimonial-card glass rounded-2xl p-6 flex-shrink-0">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber fill-amber" />
                  ))}
                </div>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">&quot;{t.text}&quot;</p>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Row 2 - scroll right */}
        <div className="overflow-hidden">
          <div className="marquee-right flex gap-6">
            {[...testimonials2, ...testimonials2].map((t, i) => (
              <div key={i} className="testimonial-card glass rounded-2xl p-6 flex-shrink-0">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber fill-amber" />
                  ))}
                </div>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">&quot;{t.text}&quot;</p>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guarantees ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto mb-4"><Shield size={12} /> Nos Garanties</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Zero risque, <span className="gradient-text">100% confiance</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {guarantees.map((g, i) => (
              <div key={i} className="glass rounded-2xl p-8 text-center hover:border-brand/20 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-5">
                  <g.icon size={24} className="text-brand" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{g.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto mb-4"><MessageSquare size={12} /> FAQ</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Questions <span className="gradient-text">frequentes</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqItems.map((f, i) => (
              <div key={i} className={`faq-item glass rounded-xl overflow-hidden ${openFaq === i ? "open border-brand/20" : ""}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-semibold text-sm pr-4">{f.q}</span>
                  <ChevronDown size={18} className="faq-chevron text-brand flex-shrink-0" />
                </button>
                <div className="faq-answer px-5 pb-5">
                  <p className="text-white/50 text-sm leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-dark-2">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Pret a <span className="gradient-text">scaler</span> votre business ?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Rejoignez 65+ entreprises qui ont deja automatise leur croissance avec GoScaleStudio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("contact")} className="btn-primary px-10 py-4 rounded-full text-base flex items-center justify-center gap-2">
              Demarrer maintenant <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollTo("services")} className="btn-dark px-8 py-4 rounded-full text-base">
              Explorer nos services
            </button>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-badge mx-auto mb-4"><Mail size={12} /> Contact</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Lancez votre <span className="gradient-text">projet</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">Decrivez votre besoin et recevez un devis personnalise sous 24h.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Prenom & Nom" className="input-field" />
                <input type="email" placeholder="Email" className="input-field" />
              </div>
              <input type="tel" placeholder="Telephone (optionnel)" className="input-field" />
              <select className="input-field" defaultValue="">
                <option value="" disabled>Service souhaite</option>
                {services.map((s, i) => (
                  <option key={i} value={s.title}>{s.title}</option>
                ))}
              </select>
              <textarea placeholder="Decrivez votre projet..." rows={4} className="input-field resize-none" />
              <button type="submit" className="btn-primary px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2 mt-2">
                Envoyer <ArrowRight size={18} />
              </button>
            </form>
            <div className="flex flex-col gap-6 justify-center">
              {[
                { icon: Mail, label: "Email", value: "contact@goscalestudio.com" },
                { icon: MapPin, label: "Localisation", value: "Remote — France & International" },
                { icon: Clock, label: "Reponse", value: "Sous 24h garantie" },
              ].map((c, i) => (
                <div key={i} className="glass rounded-xl p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center">
                    <c.icon size={20} className="text-brand" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">{c.label}</p>
                    <p className="font-semibold text-sm">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-lg font-bold">
            <span className="gradient-text">GoScale</span>Studio
          </div>
          <div className="flex gap-8 text-sm text-white/40">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="hover:text-white transition-colors">
                {l.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} GoScaleStudio. Tous droits reserves.</p>
        </div>
      </footer>
    </div>
  );
}
