"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useProjects } from "@/lib/ProjectContext";
import { categoryColors } from "@/lib/data";
import {
  Menu, X, Zap, Bot, Phone, Globe, Palette, ChevronDown,
  ArrowRight, Star, Mail, MapPin, Clock, Shield, Headphones,
  RotateCcw, Users, TrendingUp, CheckCircle, Play, Sparkles,
  Target, BarChart3, MessageSquare, Lightbulb, Building2,
  ShoppingCart, Stethoscope, GraduationCap, Briefcase,
  ArrowUpRight, Rocket, Search, FileCheck, Settings, Handshake,
  CircleCheck, XCircle, Heart, Award, Cpu, Eye, Tag, Coins, User,
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
  { num: "01", title: "Appel Decouverte", desc: "On ecoute votre business, vos blocages et vos objectifs en 30 min.", icon: Search },
  { num: "02", title: "Audit & Diagnostic", desc: "Analyse de vos processus actuels et identification des opportunites.", icon: Eye },
  { num: "03", title: "Strategie & Devis", desc: "Plan d'action clair, timeline et devis transparent sous 24h.", icon: FileCheck },
  { num: "04", title: "Developpement", desc: "Execution agile avec points reguliers et previews a chaque etape.", icon: Settings },
  { num: "05", title: "Tests & Livraison", desc: "Tests complets, ajustements et livraison du projet finalise.", icon: Rocket },
  { num: "06", title: "Support & Scale", desc: "Formation, suivi 30 jours et accompagnement pour scaler.", icon: Handshake },
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

const painPoints = [
  { icon: Clock, title: "Taches manuelles qui bouffent vos journees", desc: "Copier-coller entre outils, relances manuelles, reporting a la main... Vous perdez +10h/semaine sur des taches qu'un robot ferait en 10 secondes." },
  { icon: Phone, title: "Appels manques = clients perdus", desc: "Votre telephone sonne, personne ne repond. Chaque appel manque est un prospect qui va chez le concurrent. Et ca arrive tous les jours." },
  { icon: Users, title: "Support noye sous les memes questions", desc: "Vos equipes repondent en boucle aux memes demandes au lieu de vendre. Le chat, les mails, WhatsApp — tout deborde." },
  { icon: Eye, title: "Site web invisible sur Google", desc: "Vous avez un site mais zero trafic organique. Vos concurrents trustent la page 1 pendant que vous restez en page 5." },
];

const solutions = [
  { icon: Zap, title: "On automatise, vous respirez", desc: "On connecte tous vos outils et on cree des workflows qui tournent tout seuls. Fini le copier-coller, bonjour la productivite.", result: "+10h/sem liberees" },
  { icon: Bot, title: "Un assistant IA qui ne dort jamais", desc: "Chatbot ou callbot IA deploye en 48h. Il repond, qualifie et convertit vos prospects 24/7 — meme a 3h du matin.", result: "24/7 disponible" },
  { icon: Globe, title: "Un site qui attire et convertit", desc: "Site WordPress optimise SEO qui grimpe sur Google et transforme les visiteurs en clients. Pas juste joli — performant.", result: "Page 1 Google" },
  { icon: Palette, title: "Un prototype qui convainc", desc: "Maquette interactive en 48h pour valider votre idee, convaincre vos investisseurs ou lancer votre produit plus vite.", result: "48h livraison" },
];

const targetAudiences = [
  { icon: Building2, title: "Agences & Consultants", desc: "Vous jonglez entre 10 clients et 20 outils. On automatise votre back-office pour que vous restiez focus sur la valeur." },
  { icon: ShoppingCart, title: "E-commerce & Retail", desc: "Chatbot sur WhatsApp, relances panier abandonne, gestion de stock auto — on booste vos ventes pendant que vous dormez." },
  { icon: Stethoscope, title: "Sante & Cliniques", desc: "Callbot pour la prise de RDV, rappels SMS, gestion des annulations — vos patients obtiennent un creneau en 30 secondes." },
  { icon: GraduationCap, title: "Startups & SaaS", desc: "Prototype rapide, onboarding automatise, support chatbot — tout ce qu'il faut pour scaler sans exploser votre equipe." },
  { icon: Briefcase, title: "PME & Independants", desc: "Site visible sur Google, leads automatises, facturation connectee — on digitalise votre business de A a Z." },
  { icon: Heart, title: "Associations & ONG", desc: "Communication automatisee, formulaires intelligents, chatbot d'information — plus d'impact avec moins de ressources." },
];

const beforeAfter = [
  { before: "Relances manuelles, prospects oublies", after: "CRM automatise, zero prospect perdu", icon: Target },
  { before: "Appels manques, clients frustres", after: "Callbot IA 24/7, satisfaction +90%", icon: Phone },
  { before: "Site en page 5 de Google", after: "Top 3 Google, trafic x5", icon: Globe },
  { before: "Support deborde, delais de reponse longs", after: "Chatbot instant, reponse en 2 secondes", icon: Bot },
  { before: "Prototype en 3 semaines", after: "Maquette interactive en 48h", icon: Palette },
];

const whyUs = [
  { icon: Rocket, title: "Livraison ultra-rapide", desc: "48h a 14 jours max. Pas de projets qui trainent pendant des mois.", value: "48h-14j" },
  { icon: Award, title: "Note 5.0/5 sur ComeUp", desc: "65+ projets livres avec 100% de satisfaction client. Zero avis negatif.", value: "5.0/5" },
  { icon: Cpu, title: "Stack IA de pointe", desc: "On utilise les meilleurs outils du marche : GPT-4, Make, Vapi, Botpress, et plus.", value: "15+ outils" },
  { icon: Heart, title: "Accompagnement humain", desc: "Un interlocuteur dedie, des points reguliers, et un support 30 jours post-livraison.", value: "30j support" },
];

const resultsBars = [
  { label: "Temps economise par semaine", value: 85, display: "15h+" },
  { label: "Taux de satisfaction client", value: 100, display: "100%" },
  { label: "Augmentation des conversions", value: 70, display: "+35%" },
  { label: "Reduction des appels manques", value: 80, display: "-40%" },
  { label: "Amelioration du trafic SEO", value: 90, display: "x5" },
];

const colorMap: Record<string, string> = {
  emerald: "text-emerald bg-emerald/10 border-emerald/20",
  blue: "text-blue bg-blue/10 border-blue/20",
  brand: "text-brand bg-brand/10 border-brand/20",
  purple: "text-purple bg-purple/10 border-purple/20",
  amber: "text-amber bg-amber/10 border-amber/20",
};

const portfolioTabs = ["Tous", "Automatisation", "CallBot IA", "ChatBot IA", "WordPress + SEO", "Maquette UI/UX"];

const pricingFeatures = [
  "Analyse complete de votre activite",
  "Identification des automatisations possibles",
  "Explication simple de votre systeme futur",
  "Recommandations personnalisees",
];

const pricingOptions = [
  { service: "1 scenario simple", price: "30 EUR", note: "Workflow basique" },
  { service: "2 scenarios simples", price: "35 EUR", note: "Pack 2 workflows" },
  { service: "3 scenarios simples", price: "40 EUR", note: "Pack 3 workflows" },
  { service: "Scenario avance", price: "50 EUR", note: "Logique multi-etapes" },
  { service: "Automatisation sur mesure", price: "100 - 500 EUR", note: "Projet complet adapte", highlight: true },
  { service: "Maintenance 30 jours", price: "500 EUR", note: "Suivi & ajustements" },
  { service: "Consulting 30 min", price: "30 EUR", note: "Appel strategique" },
];

/* ── Component ─────────────────────────────────────── */

export default function HomePage() {
  const { publishedProjects } = useProjects();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [counted, setCounted] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeTab, setActiveTab] = useState("Tous");

  // Scroll animations observer — uses data attribute so React re-renders don't remove it
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }); // no deps — re-runs on every render to catch dynamically added elements

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
    { label: "Tarifs", id: "pricing" },
    { label: "Realisations", id: "portfolio" },
    { label: "A propos", id: "about" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  const filteredProjects = activeTab === "Tous"
    ? publishedProjects
    : publishedProjects.filter((p) => p.category === activeTab);

  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 4);

  return (
    <div className="bg-dark text-white min-h-screen overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-dark/90 backdrop-blur-lg border-b border-border" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="GoScaleStudio" className="h-8 w-8 rounded-lg object-cover" />
            <span className="font-display text-xl font-bold"><span className="gradient-text">GoScale</span>Studio</span>
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
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="anim fade-up section-badge mx-auto mb-8">
            <Sparkles size={12} /> Studio IA & Automatisation
          </div>
          <h1 className="anim fade-up delay-1 font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            Automatisez. Deployez.{" "}
            <span className="gradient-text">Scalez.</span>
          </h1>
          <p className="anim fade-up delay-2 text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Chatbots IA, assistants vocaux, automatisations et sites web performants.
            On construit les systemes qui font tourner votre business — pendant que vous dormez.
          </p>
          <div className="anim fade-up delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("contact")} className="btn-primary px-8 py-4 rounded-full text-sm sm:text-base flex items-center justify-center gap-2">
              Lancer mon projet <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollTo("portfolio")} className="btn-outline px-8 py-4 rounded-full text-sm sm:text-base flex items-center justify-center gap-2">
              <Play size={18} /> Voir nos realisations
            </button>
          </div>
          <div className="anim fade-up delay-4 mt-14 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/40">
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald" /> 65+ projets livres</span>
            <span className="flex items-center gap-2"><Star size={16} className="text-amber" /> 5.0/5 ComeUp</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-blue" /> Livraison 48h-14j</span>
          </div>
        </div>
      </section>

      {/* ── Tech Marquee ── */}
      <section className="py-8 sm:py-10 border-y border-border overflow-hidden">
        <div className="marquee-left flex gap-8 whitespace-nowrap">
          {[...techTools, ...techTools].map((t, i) => (
            <span key={i} className="tool-pill text-xs">{t}</span>
          ))}
        </div>
      </section>

      {/* ── Pain Points (Problemes du prospect) ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><XCircle size={12} /> Le Probleme</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Vous perdez du temps, de l&apos;argent et des clients <span className="gradient-text">chaque jour</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              Ces problemes vous parlent ? Vous n&apos;etes pas seul. 90% de nos clients vivaient la meme chose avant de nous contacter.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {painPoints.map((p, i) => (
              <div key={i} className={`anim fade-up delay-${i + 1} glass rounded-2xl p-6 sm:p-8 hover:border-red-500/20 transition-all duration-300 group border-l-2 border-l-red-500/30`}>
                <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <p.icon size={20} className="text-red-400" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW: La Solution ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-dark-2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Lightbulb size={12} /> La Solution</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              On transforme vos problemes en <span className="gradient-text">avantages competitifs</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              Pour chaque blocage, on a une solution concrete, deployee en moins de 14 jours.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {solutions.map((s, i) => (
              <div key={i} className={`anim fade-up delay-${i + 1} glass rounded-2xl p-6 sm:p-8 hover:border-brand/20 transition-all duration-300 group border-l-2 border-l-emerald/30`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald/10 flex items-center justify-center group-hover:bg-emerald/20 transition-colors">
                    <s.icon size={20} className="text-emerald" />
                  </div>
                  <span className="text-xs font-bold text-emerald bg-emerald/10 px-3 py-1 rounded-full">{s.result}</span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ── Services ── */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Zap size={12} /> Nos Services</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Tout ce qu&apos;il faut pour <span className="gradient-text">scaler</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-xl mx-auto text-sm sm:text-base">5 expertises complementaires pour automatiser, convertir et dominer votre marche.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((s, i) => {
              const cls = colorMap[s.color] || colorMap.brand;
              return (
                <div key={i} className={`anim scale-in delay-${i + 1} glass rounded-2xl p-6 sm:p-8 hover:border-brand/20 transition-all duration-300 group hover:-translate-y-1`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${cls}`}>
                    <s.icon size={22} />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold mb-3">{s.title}</h3>
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NEW: Pour Qui ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-dark-2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Users size={12} /> Pour Qui ?</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              On accompagne ceux qui veulent <span className="gradient-text">aller plus vite</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {targetAudiences.map((t, i) => (
              <div key={i} className={`anim fade-up delay-${Math.min(i + 1, 6)} glass rounded-2xl p-6 sm:p-8 hover:border-brand/20 transition-all duration-300 group hover:-translate-y-1`}>
                <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                  <t.icon size={20} className="text-brand" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold mb-2">{t.title}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process (6 etapes) ── */}
      <section id="process" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><BarChart3 size={12} /> Notre Processus</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              De l&apos;idee au <span className="gradient-text">resultat</span> en 6 etapes
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {processSteps.map((s, i) => (
              <div key={i} className={`anim fade-up delay-${Math.min(i + 1, 6)} relative glass rounded-2xl p-4 sm:p-7 text-center group hover:-translate-y-1 transition-all duration-300`}>
                <div className="text-xl sm:text-3xl font-display font-bold text-brand/20 mb-2 sm:mb-3">{s.num}</div>
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <s.icon size={20} className="text-brand" />
                </div>
                <h3 className="font-display text-sm sm:text-lg font-bold mb-1 sm:mb-2">{s.title}</h3>
                <p className="text-white/50 text-xs sm:text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA intermediaire ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-dark-2">
        <div className="anim scale-in max-w-3xl mx-auto text-center glass rounded-3xl p-8 sm:p-12 border-brand/10">
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-3">Vous avez un projet en tete ?</h3>
          <p className="text-white/50 text-sm mb-6">Discutons-en gratuitement. Reponse garantie sous 24h.</p>
          <button onClick={() => scrollTo("contact")} className="btn-primary px-8 py-3.5 rounded-full text-sm flex items-center gap-2 mx-auto">
            Prendre un RDV gratuit <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" ref={statsRef}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><TrendingUp size={12} /> Chiffres Cles</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Des <span className="gradient-text">resultats</span> concrets
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((s, i) => (
              <div key={i} className={`anim scale-in delay-${i + 1} glass rounded-2xl p-4 sm:p-8 text-center`}>
                <div className="text-xl sm:text-3xl md:text-4xl font-display font-bold gradient-text mb-1 sm:mb-2">
                  {counters[i]}{s.suffix}
                </div>
                <p className="text-white/50 text-xs sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW: Avant / Apres ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-dark-2">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><ArrowUpRight size={12} /> Transformation</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Avant <span className="text-white/30">vs</span> <span className="gradient-text">Apres</span> GoScaleStudio
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {beforeAfter.map((b, i) => (
              <div key={i} className={`anim fade-up delay-${Math.min(i + 1, 5)} glass rounded-xl sm:rounded-2xl p-4 sm:p-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <XCircle size={16} className="text-red-400 flex-shrink-0 hidden sm:block" />
                  <span className="text-white/50 text-xs sm:text-sm">{b.before}</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                  <ArrowRight size={14} className="text-brand" />
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <CircleCheck size={16} className="text-emerald flex-shrink-0 hidden sm:block" />
                  <span className="text-emerald font-semibold text-xs sm:text-sm">{b.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ── Portfolio (onglets par categorie) ── */}
      <section id="portfolio" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Sparkles size={12} /> Realisations</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Nos derniers <span className="gradient-text">projets</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-xl mx-auto text-sm sm:text-base">Chaque projet est concu sur mesure pour resoudre un probleme metier reel.</p>
          </div>

          {/* Onglets */}
          <div className="anim fade-up delay-3 flex flex-wrap justify-center gap-2 mb-10">
            {portfolioTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setShowAllProjects(false); }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-brand text-white shadow-lg shadow-brand/20"
                    : "bg-white/5 text-white/50 border border-white/10 hover:border-brand/30 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <p className="text-center text-white/30 py-8">Aucune realisation dans cette categorie.</p>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {visibleProjects.map((p) => {
                  const cat = categoryColors[p.category] || "brand";
                  return (
                    <div key={p.id} className="anim fade-up group bg-dark-3 rounded-2xl border border-border overflow-hidden hover:border-brand/30 transition-all duration-300 hover:-translate-y-1">
                      <div className="relative h-44 sm:h-52 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="portfolio-gradient absolute inset-0" />
                        <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full border ${colorMap[cat] || colorMap.brand}`}>
                          {p.category}
                        </span>
                      </div>
                      <div className="p-5 sm:p-6">
                        <h3 className="font-display text-base sm:text-lg font-bold mb-2">{p.title}</h3>
                        <p className="text-white/50 text-xs sm:text-sm mb-4 leading-relaxed">{p.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-brand font-bold text-xs sm:text-sm">{p.result}</span>
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
              {filteredProjects.length > 4 && !showAllProjects && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setShowAllProjects(true)}
                    className="btn-outline px-8 py-3 rounded-full text-sm flex items-center gap-2 mx-auto"
                  >
                    Voir plus ({filteredProjects.length - 4} de plus) <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><User size={12} /> A propos</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Qui suis-<span className="gradient-text">je</span> ?
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Photo */}
            <div className="lg:col-span-5 anim fade-right">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand/30 via-purple/20 to-emerald/20 rounded-3xl blur-2xl" />
                <div className="relative glass rounded-3xl p-2 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://i.postimg.cc/tR89Dwj9/Whats-App-Image-2026-05-10-at-01-30-44.jpg"
                    alt="Fidah IMOROU BOUKARI - CEO GoScaleStudio"
                    className="w-full aspect-[4/5] object-cover rounded-2xl"
                  />
                  <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl px-4 py-3 backdrop-blur-xl">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                      <span className="text-white/70 font-medium">Disponible pour vos projets</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-gradient-to-br from-brand to-accent rounded-2xl p-3 shadow-lg shadow-brand/30">
                  <Sparkles size={20} className="text-white" />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-7 anim fade-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-brand" />
                <span className="text-brand text-xs font-bold tracking-widest uppercase">CEO &amp; Fondateur</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-2">
                Fidah <span className="gradient-text">IMOROU BOUKARI</span>
              </h3>
              <p className="text-white/40 text-sm mb-2">CEO de GoScaleStudio</p>
              <p className="text-white/30 text-xs mb-6 flex items-center gap-2">
                <Sparkles size={11} className="text-brand" />
                Co-fondateur de <span className="text-white/60 font-semibold">Pirabel Labs</span> &middot; Agence web marketing
              </p>

              <div className="flex flex-col gap-4 text-sm sm:text-[15px] text-white/70 leading-relaxed">
                <p>
                  Passionne par l&apos;automatisation, l&apos;intelligence artificielle et la croissance digitale,
                  j&apos;accompagne les entreprises dans la creation de systemes performants capables de simplifier
                  leur activite et d&apos;accelerer leur developpement.
                </p>
                <p>
                  Chez <span className="text-white font-semibold">GoScaleStudio</span>, notre mission est d&apos;aider
                  les marques, entrepreneurs et entreprises a gagner du temps, optimiser leurs processus et scaler
                  plus efficacement grace a des solutions digitales modernes et intelligentes.
                </p>
                <p>
                  Je suis aussi co-fondateur de <span className="text-white font-semibold">Pirabel Labs</span>,
                  une agence web marketing specialisee dans la croissance digitale, la strategie de contenu
                  et l&apos;acquisition client. Une double casquette qui me permet de combiner technologie,
                  automatisation et marketing pour des resultats concrets.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-3 gap-3 mt-8">
                {[
                  { icon: Lightbulb, label: "Innovation" },
                  { icon: Target, label: "Strategie" },
                  { icon: TrendingUp, label: "Performance" },
                ].map((p, i) => (
                  <div key={i} className="glass rounded-xl p-4 text-center hover:border-brand/30 transition-colors">
                    <p.icon size={18} className="text-brand mx-auto mb-2" />
                    <span className="text-xs font-semibold text-white/80">{p.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <button onClick={() => scrollTo("contact")} className="btn-primary px-6 py-3 rounded-full text-sm flex items-center gap-2">
                  Travaillons ensemble <ArrowRight size={16} />
                </button>
                <button onClick={() => scrollTo("portfolio")} className="btn-dark px-6 py-3 rounded-full text-sm">
                  Voir mes realisations
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-24 bg-dark-2 overflow-hidden">
        <div className="text-center mb-12 sm:mb-16 px-4 sm:px-6">
          <div className="anim fade-up section-badge mx-auto mb-4"><Star size={12} /> Avis Clients</div>
          <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold">
            Ce que disent nos <span className="gradient-text">clients</span>
          </h2>
        </div>
        <div className="mb-6 overflow-hidden">
          <div className="marquee-left flex gap-6">
            {[...testimonials1, ...testimonials1].map((t, i) => (
              <div key={i} className="testimonial-card glass rounded-2xl p-5 sm:p-6 flex-shrink-0">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber fill-amber" />
                  ))}
                </div>
                <p className="text-white/70 text-xs sm:text-sm mb-4 leading-relaxed">&quot;{t.text}&quot;</p>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-right flex gap-6">
            {[...testimonials2, ...testimonials2].map((t, i) => (
              <div key={i} className="testimonial-card glass rounded-2xl p-5 sm:p-6 flex-shrink-0">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber fill-amber" />
                  ))}
                </div>
                <p className="text-white/70 text-xs sm:text-sm mb-4 leading-relaxed">&quot;{t.text}&quot;</p>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW: Pourquoi Nous ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Award size={12} /> Pourquoi Nous</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Ce qui fait la <span className="gradient-text">difference</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyUs.map((w, i) => (
              <div key={i} className={`anim scale-in delay-${i + 1} glass rounded-2xl p-6 sm:p-8 text-center hover:border-brand/20 transition-all duration-300 hover:-translate-y-1`}>
                <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-4">
                  <w.icon size={24} className="text-brand" />
                </div>
                <div className="text-2xl sm:text-3xl font-display font-bold gradient-text mb-1">{w.value}</div>
                <h3 className="font-display text-sm sm:text-base font-bold mb-2">{w.title}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guarantees ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-dark-2">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Shield size={12} /> Nos Garanties</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Zero risque, <span className="gradient-text">100% confiance</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {guarantees.map((g, i) => (
              <div key={i} className={`anim fade-up delay-${i + 1} glass rounded-2xl p-6 sm:p-8 text-center hover:border-brand/20 transition-all duration-300`}>
                <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-5">
                  <g.icon size={24} className="text-brand" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold mb-2">{g.title}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW: Resultats Concrets (barres) ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><BarChart3 size={12} /> Impact Reel</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Les <span className="gradient-text">resultats</span> moyens de nos clients
            </h2>
          </div>
          <div className="flex flex-col gap-5 sm:gap-6">
            {resultsBars.map((r, i) => (
              <div key={i} className={`anim fade-left delay-${Math.min(i + 1, 5)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-white/70">{r.label}</span>
                  <span className="text-xs sm:text-sm font-bold gradient-text">{r.display}</span>
                </div>
                <div className="h-2.5 sm:h-3 bg-white/5 rounded-full overflow-hidden">
                  <div className="progress-bar h-full rounded-full bg-gradient-to-r from-brand to-accent" style={{ width: `${r.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ── Pricing ── */}
      <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Tag size={12} /> Tarifs</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Des prix <span className="gradient-text">transparents</span>, sans surprise
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              Commencez avec un audit a 15&nbsp;EUR pour clarifier votre besoin, puis choisissez les options
              adaptees a votre projet.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Hero offer card */}
            <div className="lg:col-span-5 anim fade-up">
              <div className="relative h-full">
                <div className="absolute -inset-1 bg-gradient-to-br from-brand via-accent to-purple opacity-60 blur-xl rounded-3xl" />
                <div className="relative glass rounded-3xl p-8 sm:p-10 h-full flex flex-col border-brand/30">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand bg-brand/10 px-3 py-1.5 rounded-full">
                      Offre de base
                    </span>
                    <span className="text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded-full">Recommande</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">Audit &amp; Diagnostic</h3>
                  <p className="text-white/50 text-sm mb-6">Le point de depart ideal si vous debutez et ne savez pas quoi automatiser.</p>

                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="font-display text-5xl sm:text-6xl font-bold gradient-text">15</span>
                    <span className="text-2xl font-display font-bold text-white/70">EUR</span>
                    <span className="text-xs text-white/40 ml-2">paiement unique</span>
                  </div>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {pricingFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                        <div className="w-5 h-5 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle size={12} className="text-emerald" />
                        </div>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => scrollTo("contact")} className="btn-primary px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 w-full">
                    Reserver mon audit <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Options table */}
            <div className="lg:col-span-7 anim fade-left">
              <div className="glass rounded-3xl p-6 sm:p-8 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold mb-1">Options &amp; Add-ons</h3>
                    <p className="text-white/40 text-xs">A combiner librement avec votre offre de base</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                    <Coins size={18} className="text-brand" />
                  </div>
                </div>

                <div className="flex flex-col">
                  {pricingOptions.map((o, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between gap-3 py-4 ${
                        i < pricingOptions.length - 1 ? "border-b border-border" : ""
                      } ${o.highlight ? "bg-brand/5 -mx-3 px-3 rounded-xl my-1 border-y-0" : ""}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          o.highlight ? "bg-brand/15 text-brand" : "bg-white/5 text-white/40"
                        }`}>
                          <Tag size={14} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate">{o.service}</p>
                          <p className="text-[11px] text-white/35">{o.note}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className={`font-display text-base sm:text-lg font-bold ${
                          o.highlight ? "gradient-text" : "text-white"
                        }`}>
                          {o.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <p className="text-xs text-white/50 flex items-center gap-2">
                    <Shield size={12} className="text-emerald" />
                    Devis personnalise gratuit sous 24h
                  </p>
                  <button onClick={() => scrollTo("contact")} className="btn-dark px-5 py-2.5 rounded-full text-xs font-semibold">
                    Demander un devis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><MessageSquare size={12} /> FAQ</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Questions <span className="gradient-text">frequentes</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqItems.map((f, i) => (
              <div key={i} className={`anim fade-up delay-${Math.min(i + 1, 6)} faq-item glass rounded-xl overflow-hidden ${openFaq === i ? "open border-brand/20" : ""}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left">
                  <span className="font-semibold text-xs sm:text-sm pr-4">{f.q}</span>
                  <ChevronDown size={18} className="faq-chevron text-brand flex-shrink-0" />
                </button>
                <div className="faq-answer px-4 sm:px-5 pb-4 sm:pb-5">
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-dark-2">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="anim fade-up font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
            Pret a <span className="gradient-text">scaler</span> votre business ?
          </h2>
          <p className="anim fade-up delay-1 text-white/50 text-sm sm:text-lg mb-10 max-w-xl mx-auto">
            Rejoignez 65+ entreprises qui ont deja automatise leur croissance avec GoScaleStudio.
          </p>
          <div className="anim fade-up delay-2 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("contact")} className="btn-primary px-10 py-4 rounded-full text-sm sm:text-base flex items-center justify-center gap-2">
              Demarrer maintenant <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollTo("services")} className="btn-dark px-8 py-4 rounded-full text-sm sm:text-base">
              Explorer nos services
            </button>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Mail size={12} /> Contact</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Lancez votre <span className="gradient-text">projet</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-xl mx-auto text-sm sm:text-base">Decrivez votre besoin et recevez un devis personnalise sous 24h.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <form className="anim fade-right flex flex-col gap-4" onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              const btn = form.querySelector("button[type=submit]") as HTMLButtonElement;
              btn.disabled = true;
              btn.textContent = "Envoi en cours...";
              try {
                // Save to database
                await fetch("/api/messages", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: data.get("name"),
                    email: data.get("email"),
                    phone: data.get("phone"),
                    service: data.get("service"),
                    message: data.get("message"),
                  }),
                }).catch(() => {});
                // Also send via Formsubmit
                await fetch("https://formsubmit.co/ajax/contact@goscalestudio.com", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", "Accept": "application/json" },
                  body: JSON.stringify({
                    name: data.get("name"),
                    email: data.get("email"),
                    phone: data.get("phone"),
                    service: data.get("service"),
                    message: data.get("message"),
                    _subject: "Nouveau message depuis GoScaleStudio",
                    _template: "box",
                  }),
                }).catch(() => {});
                form.reset();
                btn.textContent = "Message envoy\u00e9 !";
                setTimeout(() => { btn.disabled = false; btn.innerHTML = "Envoyer"; }, 3000);
              } catch {
                btn.disabled = false;
                btn.textContent = "Erreur, r\u00e9essayez";
                setTimeout(() => { btn.innerHTML = "Envoyer"; }, 3000);
              }
            }}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Pr&eacute;nom &amp; Nom" className="input-field" required />
                <input type="email" name="email" placeholder="Email" className="input-field" required />
              </div>
              <input type="tel" name="phone" placeholder="WhatsApp / T&eacute;l&eacute;phone" className="input-field" required />
              <select className="input-field" name="service" required defaultValue="">
                <option value="" disabled>Service souhait&eacute;</option>
                {services.map((s, i) => (
                  <option key={i} value={s.title}>{s.title}</option>
                ))}
              </select>
              <textarea name="message" placeholder="D&eacute;crivez votre projet..." rows={4} className="input-field resize-none" required />
              <button type="submit" className="btn-primary px-8 py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 mt-2">
                Envoyer <ArrowRight size={18} />
              </button>
            </form>
            <div className="anim fade-left flex flex-col gap-4 sm:gap-6 justify-center">
              {[
                { icon: MessageSquare, label: "WhatsApp", value: "+229 01 68 24 28 66", href: "https://wa.me/2290168242866" },
                { icon: Mail, label: "Email", value: "contact@goscalestudio.com", href: "mailto:contact@goscalestudio.com" },
                { icon: MapPin, label: "Localisation", value: "Remote — France & International", href: undefined },
                { icon: Clock, label: "R\u00e9ponse", value: "Sous 24h garantie", href: undefined },
              ].map((c, i) => (
                <a key={i} href={c.href || undefined} target={c.href?.startsWith("http") ? "_blank" : undefined} rel={c.href?.startsWith("http") ? "noopener noreferrer" : undefined} className="glass rounded-xl p-4 sm:p-5 flex items-center gap-4 hover:border-brand/20 transition-all">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                    <c.icon size={18} className="text-brand" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">{c.label}</p>
                    <p className="font-semibold text-xs sm:text-sm">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-10 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="font-display text-lg font-bold">
              <span className="gradient-text">GoScale</span>Studio
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-white/40">
              {navLinks.map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="hover:text-white transition-colors">
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div className="divider mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <p>&copy; {new Date().getFullYear()} GoScaleStudio. Tous droits reserves.</p>
            <p>
              R&eacute;alis&eacute; par{" "}
              <a href="https://pirabellabs.com" target="_blank" rel="noopener noreferrer" className="text-brand/60 hover:text-brand transition-colors font-semibold">
                Pirabel Labs
              </a>
              , Agence Web, Marketing &amp; SEO
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
