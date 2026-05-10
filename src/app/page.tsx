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
  { icon: Zap, title: "Automatisation Métier", desc: "Workflows intelligents avec Make, n8n ou Zapier. On connecte vos outils, on supprime les tâches répétitives, on vous rend +10h/semaine.", color: "emerald" },
  { icon: Phone, title: "CallBot & Assistant Vocal IA", desc: "Agents vocaux 24/7 via Vapi, Twilio ou Bland AI. Prise de RDV, qualification de leads, support client — sans intervention humaine.", color: "blue" },
  { icon: Bot, title: "ChatBot IA sur Mesure", desc: "Chatbots GPT-4 déployés sur WhatsApp, site web ou Messenger. Entraînés sur vos données, ils convertissent et assistent vos clients.", color: "brand" },
  { icon: Globe, title: "Site WordPress + SEO", desc: "Sites vitrines rapides et SEO-ready avec WordPress + Elementor. Optimisation technique, contenu et netlinking pour atteindre la page 1.", color: "purple" },
  { icon: Palette, title: "Maquette UI/UX IA", desc: "Prototypes cliquables livrés en 48-72h avec Figma AI et v0.dev. Design moderne, mobile-first, prêt pour le développement.", color: "amber" },
];

const processSteps = [
  { num: "01", title: "Appel Découverte", desc: "On écoute votre business, vos blocages et vos objectifs en 30 min.", icon: Search },
  { num: "02", title: "Audit & Diagnostic", desc: "Analyse de vos processus actuels et identification des opportunités.", icon: Eye },
  { num: "03", title: "Stratégie & Devis", desc: "Plan d'action clair, timeline et devis transparent sous 24h.", icon: FileCheck },
  { num: "04", title: "Développement", desc: "Exécution agile avec points réguliers et previews à chaque étape.", icon: Settings },
  { num: "05", title: "Tests & Livraison", desc: "Tests complets, ajustements et livraison du projet finalisé.", icon: Rocket },
  { num: "06", title: "Support & Scale", desc: "Formation, suivi 30 jours et accompagnement pour scaler.", icon: Handshake },
];

const stats = [
  { value: 65, suffix: "+", label: "Projets livrés" },
  { value: 5, suffix: ".0/5", label: "Note ComeUp" },
  { value: 15, suffix: "h+", label: "Économisées/sem" },
  { value: 48, suffix: "h", label: "Délai moyen" },
];

const testimonials1 = [
  { name: "Jean-Marc D.", role: "Agent immobilier", text: "GoScaleStudio a automatisé tout mon CRM. Je gagne 15h par semaine et je ne rate plus aucun lead. Service au top !", rating: 5 },
  { name: "Sophie L.", role: "CEO Startup FinTech", text: "Maquette livrée en 48h, exactement ce qu'il nous fallait pour notre levée de fonds. Résultat : 200K levés !", rating: 5 },
  { name: "Marc A.", role: "E-commerce Mode", text: "Le chatbot WhatsApp a augmenté nos conversions de 35%. Les clients adorent avoir des réponses instantanées.", rating: 5 },
];

const testimonials2 = [
  { name: "Claire M.", role: "Directrice Clinique", text: "Le callbot gère 80% de nos appels. Plus d'appels manqués, les patients adorent. Un vrai game-changer.", rating: 5 },
  { name: "Pierre K.", role: "Consultant SEO", text: "Site WordPress impeccable, page 1 Google en 2 mois. Le meilleur investissement digital que j'ai fait.", rating: 5 },
  { name: "Amina B.", role: "Fondatrice Agence", text: "Automatisation complète de notre social media. 4 réseaux gérés automatiquement, reporting inclus.", rating: 5 },
];

const faqItems = [
  // ── Tarifs & paiement ──
  {
    cat: "Tarifs",
    q: "Combien coûte un projet GoScaleStudio ?",
    a: "Tout commence par notre offre Audit à 15 €  qui clarifie votre besoin. Ensuite, comptez 30 à 40 € pour 1 à 3 scénarios simples, 50 € pour un scénario avancé, 100 à 500 € pour une automatisation sur mesure, et 500 € pour 30 jours de maintenance. Un consulting de 30 minutes coûte 30 €. Devis personnalisé gratuit sous 24h.",
  },
  {
    cat: "Tarifs",
    q: "L'offre de base à 15 €, qu'est-ce qu'elle inclut exactement ?",
    a: "L'Audit à 15 € comprend une analyse complète de votre activité, l'identification des automatisations possibles, l'explication simple de votre futur système et des recommandations personnalisées. C'est le point de départ idéal si vous débutez et ne savez pas par où commencer.",
  },
  {
    cat: "Tarifs",
    q: "Quels modes de paiement acceptez-vous ?",
    a: "Nous acceptons Stripe (CB), virement bancaire, PayPal et Wise pour l'international. Pour les projets supérieurs à 200 €, le paiement se fait en deux fois : 50 % au lancement, 50 % à la livraison.",
  },
  {
    cat: "Tarifs",
    q: "Y a-t-il des frais cachés ou un abonnement ?",
    a: "Non, aucun frais caché. Vous payez une fois, vous êtes propriétaire de votre solution. Les seuls coûts récurrents possibles viennent des outils tiers (Make, OpenAI, Twilio...) que vous payez directement et selon votre usage.",
  },

  // ── Delais & livraison ──
  {
    cat: "Délais",
    q: "Quels sont vos délais de livraison ?",
    a: "La plupart des projets sont livrés entre 3 et 14 jours selon la complexité. Les maquettes UI/UX sont livrées en 48 à 72h. L'audit à 15 € est rendu sous 24 à 48h. Pour les chatbots et automatisations standards, comptez 5 à 7 jours ouvrés.",
  },
  {
    cat: "Délais",
    q: "Comment se déroule un projet étape par étape ?",
    a: "Notre processus en 6 étapes : 1) Appel découverte de 30 min, 2) Audit et diagnostic, 3) Stratégie et devis sous 24h, 4) Développement avec previews réguliers, 5) Tests, ajustements et livraison, 6) Formation, suivi 30 jours et accompagnement pour scaler.",
  },

  // ── Services ──
  {
    cat: "Services",
    q: "Quels services proposez-vous ?",
    a: "GoScaleStudio propose 5 expertises : automatisation métier (Make, n8n, Zapier), callbots et assistants vocaux IA (Vapi, Twilio, Bland AI), chatbots IA sur mesure (GPT-4, WhatsApp, Botpress), sites WordPress + SEO, et maquettes UI/UX (Figma AI, v0.dev).",
  },
  {
    cat: "Services",
    q: "Quels outils et technologies utilisez-vous ?",
    a: "Pour l'automatisation : Make, n8n, Zapier, HubSpot, Notion. Pour les chatbots : Botpress, Voiceflow, GPT-4, Claude, WhatsApp Business API. Pour les callbots : Vapi, Twilio, Bland AI. Pour le web : WordPress, Elementor, RankMath. Pour le design : Figma AI, v0.dev. Plus de 15 outils maîtrisés au quotidien.",
  },
  {
    cat: "Services",
    q: "Pour quels secteurs d'activité travaillez-vous ?",
    a: "Nous accompagnons aussi bien des agences immobilières, e-commerces, cliniques, cabinets de conseil, startups fintech, agences marketing, freelances et PME. Notre approche s'adapte à votre métier : on commence par comprendre votre activité avant de proposer une solution.",
  },

  // ── Apres livraison ──
  {
    cat: "Après livraison",
    q: "Comment fonctionne le support après livraison ?",
    a: "Chaque projet inclut un suivi de 30 jours offert : support réactif par email et WhatsApp, ajustements mineurs gratuits, et formation à la prise en main. Au-delà, le pack Maintenance 30 jours à 500 € couvre les évolutions, monitoring et ajustements continus.",
  },
  {
    cat: "Après livraison",
    q: "Puis-je modifier mon chatbot, callbot ou automatisation après livraison ?",
    a: "Oui, totalement. Vous êtes propriétaire de votre solution avec accès complet. Nous vous formons à son utilisation et à sa modification. Si vous préférez déléguer, on reste disponibles pour faire évoluer le système avec vous.",
  },
  {
    cat: "Après livraison",
    q: "Que se passe-t-il si l'automatisation tombe en panne ?",
    a: "Pendant les 30 jours offerts, on intervient gratuitement pour tout bug ou panne lié à notre code. Au-delà, le pack Maintenance couvre les corrections. La majorité des pannes viennent de changements d'API tiers (Make, OpenAI...) — on détecte et réagit rapidement.",
  },

  // ── International & collaboration ──
  {
    cat: "Collaboration",
    q: "Travaillez-vous avec des entreprises hors de France ?",
    a: "Absolument. Nous accompagnons des clients dans toute la francophonie (France, Belgique, Suisse, Canada, Afrique francophone) et à l'international. Tout se fait à distance via Zoom ou Google Meet. Paiements internationaux acceptés via Wise et PayPal.",
  },
  {
    cat: "Collaboration",
    q: "Qui est derrière GoScaleStudio ?",
    a: "GoScaleStudio est dirigé par Fidah IMOROU BOUKARI, CEO et fondateur, également co-fondateur de Pirabel Labs (agence web marketing). L'équipe combine expertise en automatisation, IA et marketing digital pour livrer des solutions performantes et alignées sur vos objectifs business.",
  },

  // ── Securite & confidentialite ──
  {
    cat: "Sécurité",
    q: "Comment garantissez-vous la confidentialité de mes données ?",
    a: "Nous signons un NDA si vous le souhaitez. Toutes les données sont stockées sur des serveurs RGPD-compliant (UE). Les credentials et accès clients sont gérés dans des coffres-forts chiffrés (1Password). Aucune donnée n'est partagée avec des tiers sans votre accord écrit.",
  },
  {
    cat: "Sécurité",
    q: "Êtes-vous conformes au RGPD ?",
    a: "Oui. Nous concevons toutes nos solutions en respectant le RGPD : minimisation des données, consentement explicite, droit à l'oubli, hébergement UE et registre de traitements. Pour les chatbots qui collectent des données clients, nous intégrons les mentions légales adéquates.",
  },

  // ── IA ──
  {
    cat: "IA",
    q: "Quels modèles d'IA utilisez-vous pour les chatbots et callbots ?",
    a: "Selon le besoin : GPT-4 et GPT-4o (OpenAI) pour les chatbots conversationnels, Claude (Anthropic) pour le contenu long et le raisonnement, Gemini pour les usages Google Workspace. Pour les callbots, nous utilisons les voix premium de Vapi, ElevenLabs et OpenAI TTS pour un rendu humain.",
  },
];

const faqCategories = ["Tous", "Tarifs", "Délais", "Services", "Après livraison", "Collaboration", "Sécurité", "IA"];

const techTools = [
  "Make", "n8n", "Zapier", "Botpress", "Voiceflow", "GPT-4",
  "Vapi", "Twilio", "WordPress", "Elementor", "Figma", "v0.dev",
  "HubSpot", "Notion", "WhatsApp API", "Bland AI",
];

const guarantees = [
  { icon: Shield, title: "Satisfait ou Repris", desc: "Si le livrable ne correspond pas au cahier des charges, on reprend gratuitement." },
  { icon: Headphones, title: "Support 30 Jours", desc: "Suivi post-livraison inclus. On ne vous lâche pas après la mise en ligne." },
  { icon: RotateCcw, title: "Révisions Illimitées", desc: "Jusqu'à satisfaction totale sur chaque livrable, sans frais supplémentaires." },
];

const painPoints = [
  { icon: Clock, title: "Tâches manuelles qui bouffent vos journées", desc: "Copier-coller entre outils, relances manuelles, reporting à la main... Vous perdez +10h/semaine sur des tâches qu'un robot ferait en 10 secondes." },
  { icon: Phone, title: "Appels manqués = clients perdus", desc: "Votre téléphone sonne, personne ne répond. Chaque appel manqué est un prospect qui va chez le concurrent. Et ça arrive tous les jours." },
  { icon: Users, title: "Support noyé sous les mêmes questions", desc: "Vos équipes répondent en boucle aux mêmes demandes au lieu de vendre. Le chat, les mails, WhatsApp — tout déborde." },
  { icon: Eye, title: "Site web invisible sur Google", desc: "Vous avez un site mais zéro trafic organique. Vos concurrents trustent la page 1 pendant que vous restez en page 5." },
];

const solutions = [
  { icon: Zap, title: "On automatise, vous respirez", desc: "On connecte tous vos outils et on crée des workflows qui tournent tout seuls. Fini le copier-coller, bonjour la productivité.", result: "+10h/sem libérées" },
  { icon: Bot, title: "Un assistant IA qui ne dort jamais", desc: "Chatbot ou callbot IA déployé en 48h. Il répond, qualifie et convertit vos prospects 24/7 — même à 3h du matin.", result: "24/7 disponible" },
  { icon: Globe, title: "Un site qui attire et convertit", desc: "Site WordPress optimisé SEO qui grimpe sur Google et transforme les visiteurs en clients. Pas juste joli — performant.", result: "Page 1 Google" },
  { icon: Palette, title: "Un prototype qui convainc", desc: "Maquette interactive en 48h pour valider votre idée, convaincre vos investisseurs ou lancer votre produit plus vite.", result: "48h livraison" },
];

const targetAudiences = [
  { icon: Building2, title: "Agences & Consultants", desc: "Vous jonglez entre 10 clients et 20 outils. On automatise votre back-office pour que vous restiez focus sur la valeur." },
  { icon: ShoppingCart, title: "E-commerce & Retail", desc: "Chatbot sur WhatsApp, relances panier abandonné, gestion de stock auto — on booste vos ventes pendant que vous dormez." },
  { icon: Stethoscope, title: "Santé & Cliniques", desc: "Callbot pour la prise de RDV, rappels SMS, gestion des annulations — vos patients obtiennent un créneau en 30 secondes." },
  { icon: GraduationCap, title: "Startups & SaaS", desc: "Prototype rapide, onboarding automatisé, support chatbot — tout ce qu'il faut pour scaler sans exploser votre équipe." },
  { icon: Briefcase, title: "PME & Indépendants", desc: "Site visible sur Google, leads automatisés, facturation connectée — on digitalise votre business de A à Z." },
  { icon: Heart, title: "Associations & ONG", desc: "Communication automatisée, formulaires intelligents, chatbot d'information — plus d'impact avec moins de ressources." },
];

const beforeAfter = [
  { before: "Relances manuelles, prospects oubliés", after: "CRM automatisé, zéro prospect perdu", icon: Target },
  { before: "Appels manqués, clients frustrés", after: "Callbot IA 24/7, satisfaction +90 %", icon: Phone },
  { before: "Site en page 5 de Google", after: "Top 3 Google, trafic x5", icon: Globe },
  { before: "Support débordé, délais de réponse longs", after: "Chatbot instant, réponse en 2 secondes", icon: Bot },
  { before: "Prototype en 3 semaines", after: "Maquette interactive en 48h", icon: Palette },
];

const whyUs = [
  { icon: Rocket, title: "Livraison ultra-rapide", desc: "48h à 14 jours max. Pas de projets qui traînent pendant des mois.", value: "48h-14j" },
  { icon: Award, title: "Note 5.0/5 sur ComeUp", desc: "65+ projets livrés avec 100 % de satisfaction client. Zéro avis négatif.", value: "5.0/5" },
  { icon: Cpu, title: "Stack IA de pointe", desc: "On utilise les meilleurs outils du marché : GPT-4, Make, Vapi, Botpress, et plus.", value: "15+ outils" },
  { icon: Heart, title: "Accompagnement humain", desc: "Un interlocuteur dédié, des points réguliers, et un support 30 jours post-livraison.", value: "30j support" },
];

const resultsBars = [
  { label: "Temps économisé par semaine", value: 85, display: "15h+", from: "#10B981", to: "#34D399", text: "text-emerald" },
  { label: "Taux de satisfaction client", value: 100, display: "100 %", from: "#F07830", to: "#D94048", text: "text-brand" },
  { label: "Augmentation des conversions", value: 70, display: "+35 %", from: "#3B82F6", to: "#60A5FA", text: "text-blue" },
  { label: "Réduction des appels manqués", value: 80, display: "-40 %", from: "#8B5CF6", to: "#C084FC", text: "text-purple" },
  { label: "Amélioration du trafic SEO", value: 90, display: "x5", from: "#F59E0B", to: "#FBBF24", text: "text-amber" },
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
  "Analyse complète de votre activité",
  "Identification des automatisations possibles",
  "Explication simple de votre système futur",
  "Recommandations personnalisées",
];

const pricingOptions = [
  { service: "1 scénario simple", price: "30 €", note: "Workflow basique" },
  { service: "2 scénarios simples", price: "35 €", note: "Pack 2 workflows" },
  { service: "3 scénarios simples", price: "40 €", note: "Pack 3 workflows" },
  { service: "Scénario avancé", price: "50 €", note: "Logique multi-étapes" },
  { service: "Automatisation sur mesure", price: "100 € à 500 €", note: "Projet complet adapté", highlight: true },
  { service: "Maintenance 30 jours", price: "500 €", note: "Suivi & ajustements" },
  { service: "Consulting 30 min", price: "30 €", note: "Appel stratégique" },
];

/* ── Component ─────────────────────────────────────── */

export default function HomePage() {
  const { publishedProjects } = useProjects();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeFaqCat, setActiveFaqCat] = useState<string>("Tous");
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
    { label: "Réalisations", id: "portfolio" },
    { label: "À propos", id: "about" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  const filteredProjects = activeTab === "Tous"
    ? publishedProjects
    : publishedProjects.filter((p) => p.category === activeTab);

  const filteredFaqItems = activeFaqCat === "Tous"
    ? faqItems
    : faqItems.filter((f) => f.cat === activeFaqCat);

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
              Démarrer un projet
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
              Démarrer un projet
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
            Automatisez. Déployez.{" "}
            <span className="gradient-text">Scalez.</span>
          </h1>
          <p className="anim fade-up delay-2 text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Chatbots IA, assistants vocaux, automatisations et sites web performants.
            On construit les systèmes qui font tourner votre business — pendant que vous dormez.
          </p>
          <div className="anim fade-up delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("contact")} className="btn-primary px-8 py-4 rounded-full text-sm sm:text-base flex items-center justify-center gap-2">
              Lancer mon projet <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollTo("portfolio")} className="btn-outline px-8 py-4 rounded-full text-sm sm:text-base flex items-center justify-center gap-2">
              <Play size={18} /> Voir nos réalisations
            </button>
          </div>
          <div className="anim fade-up delay-4 mt-14 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/40">
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald" /> 65+ projets livrés</span>
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
            <div className="anim fade-up section-badge mx-auto mb-4"><XCircle size={12} /> Le Problème</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Vous perdez du temps, de l&apos;argent et des clients <span className="gradient-text">chaque jour</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              Ces problèmes vous parlent ? Vous n&apos;êtes pas seul. 90 % de nos clients vivaient la même chose avant de nous contacter.
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
              On transforme vos problèmes en <span className="gradient-text">avantages compétitifs</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              Pour chaque blocage, on a une solution concrète, déployée en moins de 14 jours.
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
            <p className="anim fade-up delay-2 text-white/50 max-w-xl mx-auto text-sm sm:text-base">5 expertises complémentaires pour automatiser, convertir et dominer votre marché.</p>
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
              De l&apos;idée au <span className="gradient-text">résultat</span> en 6 étapes
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
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-3">Vous avez un projet en tête ?</h3>
          <p className="text-white/50 text-sm mb-6">Discutons-en gratuitement. Réponse garantie sous 24h.</p>
          <button onClick={() => scrollTo("contact")} className="btn-primary px-8 py-3.5 rounded-full text-sm flex items-center gap-2 mx-auto">
            Prendre un RDV gratuit <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" ref={statsRef}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><TrendingUp size={12} /> Chiffres Clés</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Des <span className="gradient-text">résultats</span> concrets
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
              Avant <span className="text-white/30">vs</span> <span className="gradient-text">Après</span> GoScaleStudio
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
            <div className="anim fade-up section-badge mx-auto mb-4"><Sparkles size={12} /> Réalisations</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Nos derniers <span className="gradient-text">projets</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-xl mx-auto text-sm sm:text-base">Chaque projet est conçu sur mesure pour résoudre un problème métier réel.</p>
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
            <p className="text-center text-white/30 py-8">Aucune réalisation dans cette catégorie.</p>
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
            <div className="anim fade-up section-badge mx-auto mb-4"><User size={12} /> À propos</div>
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
              <p className="text-white/30 text-xs mb-6 flex items-center gap-2 flex-wrap">
                <Sparkles size={11} className="text-brand" />
                <span>
                  Co-fondateur de{" "}
                  <a
                    href="https://pirabellabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    Pirabel Labs
                    <ArrowUpRight size={11} />
                  </a>{" "}
                  &middot; Agence web marketing
                </span>
              </p>

              <div className="flex flex-col gap-4 text-sm sm:text-[15px] text-white/70 leading-relaxed">
                <p>
                  Passionné par l&apos;automatisation, l&apos;intelligence artificielle et la croissance digitale,
                  j&apos;accompagne les entreprises dans la création de systèmes performants capables de simplifier
                  leur activité et d&apos;accélérer leur développement.
                </p>
                <p>
                  Chez <span className="text-white font-semibold">GoScaleStudio</span>, notre mission est d&apos;aider
                  les marques, entrepreneurs et entreprises à gagner du temps, optimiser leurs processus et scaler
                  plus efficacement grâce à des solutions digitales modernes et intelligentes.
                </p>
                <p>
                  Je suis aussi co-fondateur de{" "}
                  <a
                    href="https://pirabellabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    Pirabel Labs
                    <ArrowUpRight size={13} />
                  </a>
                  , une agence web marketing spécialisée dans la croissance digitale, la stratégie de contenu
                  et l&apos;acquisition client. Une double casquette qui me permet de combiner technologie,
                  automatisation et marketing pour des résultats concrets.
                </p>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-3 gap-3 mt-8">
                {[
                  { icon: Lightbulb, label: "Innovation" },
                  { icon: Target, label: "Stratégie" },
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
                  Voir mes réalisations
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
              Ce qui fait la <span className="gradient-text">différence</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whyUs.map((w, i) => (
              <div key={i} className={`anim scale-in delay-${i + 1} glass rounded-2xl p-6 sm:p-8 text-center hover:border-brand/20 transition-all duration-300 hover:-translate-y-1`}>
                <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-4">
                  <w.icon size={24} className="text-brand" />
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-display font-bold gradient-text mb-1 break-words">{w.value}</div>
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
              Zéro risque, <span className="gradient-text">100 % confiance</span>
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
            <div className="anim fade-up section-badge mx-auto mb-4"><BarChart3 size={12} /> Impact Réel</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Les <span className="gradient-text">résultats</span> moyens de nos clients
            </h2>
          </div>
          <div className="flex flex-col gap-5 sm:gap-6">
            {resultsBars.map((r, i) => (
              <div
                key={i}
                className={`anim fade-left delay-${Math.min(i + 1, 5)} result-bar`}
                style={{
                  ["--bar-w" as string]: `${r.value}%`,
                  ["--bar-from" as string]: r.from,
                  ["--bar-to" as string]: r.to,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-white/70">{r.label}</span>
                  <span className={`text-xs sm:text-sm font-bold ${r.text}`}>{r.display}</span>
                </div>
                <div className="h-2.5 sm:h-3 bg-white/5 rounded-full overflow-hidden relative">
                  <div className="result-bar-fill h-full rounded-full" />
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
              Commencez avec un audit à 15&nbsp;€ pour clarifier votre besoin, puis choisissez les options
              adaptées à votre projet.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Hero offer card */}
            <div className="lg:col-span-5 anim fade-up">
              <div className="relative h-full">
                <div className="absolute -inset-[2px] bg-gradient-to-br from-brand via-accent to-purple opacity-25 blur-2xl rounded-3xl pointer-events-none" />
                <div className="relative bg-dark-2 rounded-3xl p-8 sm:p-10 h-full flex flex-col border border-brand/40 shadow-2xl shadow-brand/10">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand bg-brand/10 px-3 py-1.5 rounded-full">
                      Offre de base
                    </span>
                    <span className="text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded-full">Recommandé</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">Audit &amp; Diagnostic</h3>
                  <p className="text-white/50 text-sm mb-6">Le point de départ idéal si vous débutez et ne savez pas quoi automatiser.</p>

                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="font-display text-5xl sm:text-6xl font-bold gradient-text">15</span>
                    <span className="text-2xl font-display font-bold text-white/70">€</span>
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
                    Réserver mon audit <ArrowRight size={16} />
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
                    <p className="text-white/40 text-xs">À combiner librement avec votre offre de base</p>
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
                    Devis personnalisé gratuit sous 24h
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
        {/* FAQPage structured data for Google rich snippets and AI assistants */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="anim fade-up section-badge mx-auto mb-4"><MessageSquare size={12} /> FAQ</div>
            <h2 className="anim fade-up delay-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Questions <span className="gradient-text">fréquentes</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 text-sm sm:text-base max-w-xl mx-auto">
              Tout ce que vous devez savoir avant de démarrer un projet avec GoScaleStudio.
            </p>
          </div>

          {/* Category filter */}
          <div className="anim fade-up flex flex-wrap justify-center gap-2 mb-8">
            {faqCategories.map((c) => (
              <button
                key={c}
                onClick={() => { setActiveFaqCat(c); setOpenFaq(null); }}
                className={`text-xs px-4 py-2 rounded-full font-semibold transition-all ${
                  activeFaqCat === c
                    ? "bg-brand text-white shadow-lg shadow-brand/30"
                    : "glass text-white/60 hover:text-white hover:border-brand/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {filteredFaqItems.length === 0 && (
              <p className="text-white/30 text-sm py-8 text-center">Aucune question dans cette catégorie.</p>
            )}
            {filteredFaqItems.map((f, i) => (
              <div key={`${f.cat}-${i}`} className={`anim fade-up delay-${Math.min(i + 1, 6)} faq-item glass rounded-xl overflow-hidden ${openFaq === i ? "open border-brand/20" : ""}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand bg-brand/10 px-2 py-1 rounded-md flex-shrink-0 mt-0.5">
                      {f.cat}
                    </span>
                    <span className="font-semibold text-xs sm:text-sm pt-1">{f.q}</span>
                  </div>
                  <ChevronDown size={18} className="faq-chevron text-brand flex-shrink-0" />
                </button>
                <div className="faq-answer px-4 sm:px-5 pb-4 sm:pb-5">
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed pl-0 sm:pl-[68px]">{f.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="anim fade-up text-center mt-10 sm:mt-12">
            <p className="text-white/50 text-sm mb-4">Vous ne trouvez pas votre réponse ?</p>
            <button onClick={() => scrollTo("contact")} className="btn-primary px-6 py-3 rounded-full text-sm inline-flex items-center gap-2">
              Posez votre question <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-dark-2">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="anim fade-up font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
            Prêt à <span className="gradient-text">scaler</span> votre business ?
          </h2>
          <p className="anim fade-up delay-1 text-white/50 text-sm sm:text-lg mb-10 max-w-xl mx-auto">
            Rejoignez 65+ entreprises qui ont déjà automatisé leur croissance avec GoScaleStudio.
          </p>
          <div className="anim fade-up delay-2 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("contact")} className="btn-primary px-10 py-4 rounded-full text-sm sm:text-base flex items-center justify-center gap-2">
              Démarrer maintenant <ArrowRight size={18} />
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
            <p className="anim fade-up delay-2 text-white/50 max-w-xl mx-auto text-sm sm:text-base">Décrivez votre besoin et recevez un devis personnalisé sous 24h.</p>
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
