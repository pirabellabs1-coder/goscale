/**
 * Données structurées pour les 15 pages services SEO de GoScaleStudio.
 *
 * Architecture :
 *   - 5 "pillar" pages (services principaux)
 *   - 10 "long-tail" pages (mots-clés secondaires SEO)
 *
 * URL : /services/[slug]
 *
 * Chaque page suit le même template (Hero → Pain Points → Solution → Process →
 * Stats → Use cases → Stack → Pricing → FAQ → Témoignages → Services liés → CTA)
 * pour un total ~2200 mots, FR + EN.
 */

import type { LucideIcon } from "lucide-react";
import {
  Bot, Phone, Zap, Globe, Palette, MessageSquare, Sparkles,
  ShoppingCart, Stethoscope, Building2, GraduationCap, Briefcase, Heart,
  TrendingUp, Users, Clock, Shield, Headphones, RotateCcw, CheckCircle,
  Search, Eye, FileCheck, Settings, Rocket, Handshake, Award, Cpu,
  Target, BarChart3, Lightbulb,
} from "lucide-react";

export type Tr<T = string> = { fr: T; en: T };
export type ServiceCategory =
  | "Automatisation"
  | "ChatBot IA"
  | "CallBot IA"
  | "WordPress + SEO"
  | "Maquette UI/UX";

export type IllustrationVariant =
  | "whatsapp-chat"
  | "chatbot-web"
  | "callbot-phone"
  | "automation-flow"
  | "wordpress-seo"
  | "ui-mockup"
  | "icon-halo";

export interface ServicePage {
  /** Slug d'URL — utilisé pour /services/[slug] */
  slug: string;
  /** Type : pillar (page principale) ou long-tail (page SEO mot-clé) */
  type: "pillar" | "long-tail";
  category: ServiceCategory;
  /** Pillar slug de référence (pour long-tail uniquement) */
  pillarSlug?: string;
  /** Couleur de la palette (emerald, blue, brand, purple, amber) */
  color: "emerald" | "blue" | "brand" | "purple" | "amber";
  /** Icône principale */
  icon: LucideIcon;
  /** Illustration du hero (défaut : "icon-halo") */
  heroIllustration?: IllustrationVariant;

  /** ── SEO ── */
  metaTitle: Tr;
  metaDescription: Tr;
  keywords: string[];

  /** ── Hero ── */
  hero: {
    badge: Tr;
    h1: Tr;
    h1Highlight: Tr;
    subtitle: Tr;
    /** Trust strip (3 chiffres clés sous le hero) */
    trustStrip: Array<{ value: string; label: Tr }>;
  };

  /** ── Pain Points (problèmes spécifiques au service, ~300 mots) ── */
  painPoints: {
    intro: Tr;
    items: Array<{ icon: LucideIcon; title: Tr; desc: Tr }>;
  };

  /** ── La solution (~350 mots) ── */
  solution: {
    headline: Tr;
    intro: Tr;
    features: Array<{ icon: LucideIcon; title: Tr; desc: Tr }>;
  };

  /** ── Comment ça marche (process en 4-5 étapes, ~400 mots) ── */
  howItWorks: {
    headline: Tr;
    steps: Array<{
      icon: LucideIcon;
      title: Tr;
      desc: Tr;
      duration: Tr;
    }>;
  };

  /** ── Bénéfices chiffrés ── */
  stats: Array<{ value: string; suffix?: string; label: Tr }>;

  /** ── Cas d'usage par secteur (~500 mots, 4 secteurs) ── */
  useCases: {
    headline: Tr;
    intro: Tr;
    cases: Array<{
      icon: LucideIcon;
      sector: Tr;
      problem: Tr;
      solution: Tr;
      result: Tr;
    }>;
  };

  /** ── Stack technique (outils) ── */
  stack: {
    headline: Tr;
    intro: Tr;
    tools: Array<{ name: string; role: Tr }>;
  };

  /** ── Tarifs spécifiques ── */
  pricing: {
    headline: Tr;
    intro: Tr;
    tiers: Array<{
      name: Tr;
      price: string;
      priceNote: Tr;
      features: Tr[];
      highlight?: boolean;
    }>;
  };

  /** ── FAQ spécifique (~500 mots, 6-8 questions) ── */
  faq: Array<{ q: Tr; a: Tr }>;

  /** ── Services connexes (internal linking SEO) ── */
  relatedSlugs: string[];

  /** ── CTA final ── */
  cta: {
    headline: Tr;
    desc: Tr;
    primaryLabel: Tr;
    secondaryLabel: Tr;
  };
}

/* ══════════════════════════════════════════════════════════════
   ★ PAGE MODÈLE : Chatbot WhatsApp Business
   ══════════════════════════════════════════════════════════════ */

const chatbotWhatsappBusiness: ServicePage = {
  slug: "chatbot-whatsapp-business",
  type: "long-tail",
  category: "ChatBot IA",
  pillarSlug: "chatbot-ia",
  color: "emerald",
  icon: MessageSquare,
  heroIllustration: "whatsapp-chat",

  metaTitle: {
    fr: "ChatBot WhatsApp Business sur Mesure — GPT-4 · Déployé en 48h",
    en: "Custom WhatsApp Business Chatbot — GPT-4 · Deployed in 48h",
  },
  metaDescription: {
    fr: "Chatbot WhatsApp Business IA propulsé par GPT-4. Réponses 24/7, qualification de leads, prise de RDV, support client multilingue. Déploiement en 48h. Audit gratuit.",
    en: "AI-powered WhatsApp Business chatbot driven by GPT-4. 24/7 replies, lead qualification, appointment booking, multilingual customer support. Deployed in 48h. Free audit.",
  },
  keywords: [
    "chatbot WhatsApp",
    "chatbot WhatsApp Business",
    "WhatsApp Business API",
    "chatbot WhatsApp GPT-4",
    "automatisation WhatsApp",
    "chatbot WhatsApp Bénin",
    "chatbot WhatsApp Afrique",
    "agent IA WhatsApp",
    "chatbot WhatsApp e-commerce",
    "chatbot WhatsApp clinique",
    "chatbot WhatsApp agence immobilière",
    "ManyChat WhatsApp",
    "WaChap",
    "Botpress WhatsApp",
    "chatbot multilingue WhatsApp",
  ],

  hero: {
    badge: { fr: "ChatBot WhatsApp Business", en: "WhatsApp Business Chatbot" },
    h1: {
      fr: "Un chatbot WhatsApp IA qui répond, qualifie et convertit",
      en: "A WhatsApp AI chatbot that replies, qualifies and converts",
    },
    h1Highlight: {
      fr: "24h/24, 7j/7",
      en: "24/7",
    },
    subtitle: {
      fr: "Déployez en 48h un assistant WhatsApp propulsé par GPT-4, entraîné sur vos données, intégré à votre CRM. Vos clients obtiennent une réponse immédiate à toute heure — vos équipes se concentrent sur ce qui rapporte vraiment.",
      en: "Deploy in 48h a WhatsApp assistant powered by GPT-4, trained on your data, connected to your CRM. Your customers get instant replies at any hour — your team focuses on what really moves the needle.",
    },
    trustStrip: [
      { value: "48h", label: { fr: "Déploiement", en: "Deployment" } },
      { value: "24/7", label: { fr: "Disponibilité", en: "Availability" } },
      { value: "+35 %", label: { fr: "Conversions", en: "Conversions" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "WhatsApp est le canal de communication n°1 en Afrique de l'Ouest et dans la francophonie. Vos clients y passent des heures par jour, mais votre business y est peut-être encore mal équipé pour répondre à la demande. Voici ce qui coince le plus souvent — et ce que ça vous coûte vraiment.",
      en: "WhatsApp is the #1 communication channel in West Africa and across the francophone world. Your customers spend hours on it every day, but your business may still be ill-equipped to handle the demand. Here's what usually breaks — and what it actually costs you.",
    },
    items: [
      {
        icon: Clock,
        title: {
          fr: "Vous répondez avec 6h de retard",
          en: "You reply 6h late",
        },
        desc: {
          fr: "Pendant que vous êtes en réunion ou que c'est la nuit, vos prospects écrivent à 3 concurrents en même temps. 78 % d'entre eux achètent chez celui qui répond en premier — et ce n'est jamais vous.",
          en: "While you're in a meeting or sleeping, your leads message 3 competitors at once. 78% buy from whoever replies first — and that's never you.",
        },
      },
      {
        icon: Users,
        title: {
          fr: "Votre équipe répond aux mêmes 10 questions en boucle",
          en: "Your team answers the same 10 questions on loop",
        },
        desc: {
          fr: "Horaires, prix, livraison, disponibilité, garantie… 70 % des messages WhatsApp sont des questions répétitives. Votre support s'épuise, et le temps qu'il prend pour répondre lui empêche de gérer les vrais cas complexes.",
          en: "Hours, pricing, delivery, availability, warranty… 70% of WhatsApp messages are repetitive. Your support team burns out, and the time spent on basics keeps them from handling the real complex cases.",
        },
      },
      {
        icon: TrendingUp,
        title: {
          fr: "Les paniers abandonnés représentent 60 % de vos ventes perdues",
          en: "Abandoned carts equal 60% of lost sales",
        },
        desc: {
          fr: "Sans relance automatique, un client qui hésite repart sans acheter. Vous laissez des milliers d'euros sur la table chaque mois — alors qu'un simple message bien timé sur WhatsApp en récupère 25 %.",
          en: "Without automated follow-up, hesitant customers leave without buying. You leave thousands of euros on the table each month — when a well-timed WhatsApp message recovers 25% of them.",
        },
      },
      {
        icon: MessageSquare,
        title: {
          fr: "Vos leads dorment dans une boîte WhatsApp non triée",
          en: "Your leads sleep in an untriaged WhatsApp inbox",
        },
        desc: {
          fr: "Sans système, impossible de distinguer un prospect chaud d'un simple curieux. Les meilleures opportunités se noient dans le flux. Votre CRM est désert, alors que WhatsApp déborde.",
          en: "Without a system, you can't tell a hot lead from a tire-kicker. Your best opportunities drown in the flow. Your CRM is empty while WhatsApp overflows.",
        },
      },
    ],
  },

  solution: {
    headline: {
      fr: "Un assistant WhatsApp qui travaille pendant que vous dormez",
      en: "A WhatsApp assistant that works while you sleep",
    },
    intro: {
      fr: "On construit pour vous un chatbot WhatsApp Business propulsé par GPT-4 (ou Claude, selon votre cas d'usage), entraîné sur vos produits, vos process et votre ton de marque. Il converse comme un humain, prend les bonnes décisions, et passe la main à un agent uniquement quand c'est nécessaire. Voici les capacités concrètes qu'on déploie selon votre besoin.",
      en: "We build you a WhatsApp Business chatbot powered by GPT-4 (or Claude, depending on your use case), trained on your products, processes and brand voice. It chats like a human, makes the right calls, and hands over to a human only when truly needed. Here are the concrete capabilities we deploy based on your needs.",
    },
    features: [
      {
        icon: MessageSquare,
        title: {
          fr: "Réponses naturelles, pas un robot rigide",
          en: "Natural conversation, not a rigid robot",
        },
        desc: {
          fr: "Propulsé par GPT-4 ou Claude, le chatbot comprend les fautes de frappe, les questions implicites, le langage parlé. Il s'adapte au ton de votre client : pro pour un B2B, décontracté pour un e-commerce, rassurant pour une clinique.",
          en: "Powered by GPT-4 or Claude, the chatbot handles typos, implicit questions, casual language. It adapts to your customer's tone: professional for B2B, casual for e-commerce, reassuring for a clinic.",
        },
      },
      {
        icon: Target,
        title: {
          fr: "Qualification automatique des leads",
          en: "Automatic lead qualification",
        },
        desc: {
          fr: "Le bot pose les bonnes questions pour identifier un prospect chaud : budget, urgence, besoin. Les leads qualifiés atterrissent directement dans votre CRM (HubSpot, Notion, Airtable) avec un score, et déclenchent une alerte commerciale.",
          en: "The bot asks the right questions to identify a hot lead: budget, urgency, need. Qualified leads land directly in your CRM (HubSpot, Notion, Airtable) with a score, and trigger a sales alert.",
        },
      },
      {
        icon: Clock,
        title: {
          fr: "Prise de RDV intégrée",
          en: "Built-in appointment booking",
        },
        desc: {
          fr: "Connecté à votre Google Calendar ou Calendly, le bot propose des créneaux libres et confirme le RDV en quelques échanges. Plus besoin d'aller-retours pour caler un appel — votre agenda se remplit tout seul.",
          en: "Connected to your Google Calendar or Calendly, the bot offers free slots and confirms appointments in a few exchanges. No more back-and-forth to book a call — your calendar fills itself.",
        },
      },
      {
        icon: ShoppingCart,
        title: {
          fr: "Relances panier abandonné automatisées",
          en: "Automated abandoned-cart recovery",
        },
        desc: {
          fr: "Un client ajoute un produit à son panier mais ne valide pas ? Le bot envoie une relance personnalisée 1h après, puis 24h après si nécessaire — avec un code promo si vous le souhaitez. Récupération moyenne : 25 % des paniers.",
          en: "A customer adds a product but doesn't check out? The bot sends a personalized follow-up 1h later, then 24h later if needed — with a promo code if you want. Average recovery: 25% of carts.",
        },
      },
      {
        icon: Headphones,
        title: {
          fr: "Escalade intelligente vers un humain",
          en: "Smart handover to a human",
        },
        desc: {
          fr: "Quand le bot détecte une réclamation, une question complexe ou un client agacé, il passe poliment la main à votre équipe avec tout le contexte de la conversation. Votre support n'a qu'à finir le travail.",
          en: "When the bot detects a complaint, a complex question or an upset customer, it politely hands over to your team with the full conversation context. Your support just finishes the job.",
        },
      },
      {
        icon: BarChart3,
        title: {
          fr: "Tableau de bord & analytics",
          en: "Dashboard & analytics",
        },
        desc: {
          fr: "Suivez en temps réel les conversations, le taux de résolution, le NPS, les sujets les plus demandés. On vous livre un dashboard simple pour piloter et améliorer le bot dans le temps.",
          en: "Track conversations, resolution rate, NPS, top topics in real time. We deliver a simple dashboard to monitor and improve the bot over time.",
        },
      },
    ],
  },

  howItWorks: {
    headline: {
      fr: "De l'idée au bot en ligne — en 48h chrono",
      en: "From idea to live bot — in 48h flat",
    },
    steps: [
      {
        icon: Search,
        title: { fr: "Audit & cadrage", en: "Audit & scoping" },
        desc: {
          fr: "On analyse votre activité WhatsApp actuelle, vos questions récurrentes et vos objectifs (support, ventes, RDV). On définit ensemble le périmètre du bot : ce qu'il fait, ce qu'il ne fait pas, et quand il passe la main.",
          en: "We analyze your current WhatsApp activity, recurring questions and goals (support, sales, bookings). Together we define the bot scope: what it does, what it doesn't, and when it hands over.",
        },
        duration: { fr: "Jour 1 matin", en: "Day 1 AM" },
      },
      {
        icon: FileCheck,
        title: {
          fr: "Préparation des données & flows",
          en: "Data & flow preparation",
        },
        desc: {
          fr: "On structure votre base de connaissances (FAQ, catalogue produits, scripts de vente) et on cartographie les conversations types. C'est cette qualité de préparation qui fait la différence entre un bot médiocre et un bot qui convertit vraiment.",
          en: "We structure your knowledge base (FAQ, product catalog, sales scripts) and map out conversation flows. This prep quality is what separates a mediocre bot from one that truly converts.",
        },
        duration: { fr: "Jour 1 après-midi", en: "Day 1 PM" },
      },
      {
        icon: Settings,
        title: { fr: "Développement & intégrations", en: "Build & integrations" },
        desc: {
          fr: "On configure le bot sur Botpress, ManyChat ou WaChap, on connecte GPT-4 ou Claude, et on intègre votre CRM, votre agenda et vos outils existants. Webhooks, API, Make/Zapier — tout est branché proprement.",
          en: "We configure the bot on Botpress, ManyChat or WaChap, plug in GPT-4 or Claude, and integrate your CRM, calendar and existing tools. Webhooks, APIs, Make/Zapier — everything is wired cleanly.",
        },
        duration: { fr: "Jour 2 matin", en: "Day 2 AM" },
      },
      {
        icon: Rocket,
        title: { fr: "Tests réels & mise en ligne", en: "Real tests & go-live" },
        desc: {
          fr: "On stress-test le bot avec des dizaines de cas réels, on ajuste le ton et les réponses, puis on connecte votre numéro WhatsApp Business officiel. Le bot devient opérationnel dans la journée.",
          en: "We stress-test the bot with dozens of real cases, fine-tune tone and responses, then connect your official WhatsApp Business number. The bot goes live the same day.",
        },
        duration: { fr: "Jour 2 après-midi", en: "Day 2 PM" },
      },
      {
        icon: Handshake,
        title: {
          fr: "Formation & support 30 jours",
          en: "Training & 30-day support",
        },
        desc: {
          fr: "On forme votre équipe à la prise de relais et au suivi du bot. Pendant 30 jours, on assure le support, on ajuste les réponses si besoin, et on optimise le taux de conversion avec vous.",
          en: "We train your team to take over and monitor the bot. For 30 days, we provide support, fine-tune responses if needed, and optimize conversion with you.",
        },
        duration: { fr: "Semaines 1-4", en: "Weeks 1-4" },
      },
    ],
  },

  stats: [
    { value: "48", suffix: "h", label: { fr: "Délai de déploiement", en: "Deployment time" } },
    { value: "70", suffix: "%", label: { fr: "Messages traités sans humain", en: "Messages handled without humans" } },
    { value: "25", suffix: "%", label: { fr: "Paniers récupérés", en: "Carts recovered" } },
    { value: "+35", suffix: "%", label: { fr: "Hausse des conversions", en: "Conversion uplift" } },
  ],

  useCases: {
    headline: {
      fr: "Pour qui ce chatbot WhatsApp est-il vraiment fait ?",
      en: "Who is this WhatsApp chatbot really for?",
    },
    intro: {
      fr: "WhatsApp est un canal universel, mais chaque secteur a ses propres enjeux. Voici comment on adapte concrètement le chatbot selon votre activité — avec les résultats moyens observés sur nos projets clients.",
      en: "WhatsApp is a universal channel, but every industry has its own challenges. Here's how we concretely adapt the chatbot to your business — with the average results we've seen across our client projects.",
    },
    cases: [
      {
        icon: ShoppingCart,
        sector: { fr: "E-commerce & Retail", en: "E-commerce & Retail" },
        problem: {
          fr: "Demandes sur les stocks, suivi de commande, paniers abandonnés, SAV — votre support WhatsApp ne dort jamais.",
          en: "Stock inquiries, order tracking, abandoned carts, after-sales — your WhatsApp support never sleeps.",
        },
        solution: {
          fr: "Le bot accède en temps réel à votre catalogue (Shopify, WooCommerce), confirme les commandes, relance les paniers et donne le statut de livraison.",
          en: "The bot accesses your catalog in real time (Shopify, WooCommerce), confirms orders, recovers carts and shares delivery status.",
        },
        result: {
          fr: "Récupération de 25 % des paniers abandonnés, -60 % de tickets SAV manuels.",
          en: "25% abandoned-cart recovery, -60% manual support tickets.",
        },
      },
      {
        icon: Stethoscope,
        sector: { fr: "Santé & Cliniques", en: "Health & Clinics" },
        problem: {
          fr: "Vos patients appellent à toute heure pour prendre RDV, déplacer une consultation ou poser une question administrative.",
          en: "Patients call at all hours to book, reschedule appointments or ask admin questions.",
        },
        solution: {
          fr: "Le bot prend les RDV directement sur votre agenda (Google Calendar, Doctolib), envoie des rappels SMS, gère les annulations et oriente les urgences.",
          en: "The bot books appointments directly in your calendar (Google Calendar, Doctolib), sends SMS reminders, handles cancellations and routes emergencies.",
        },
        result: {
          fr: "RDV pris en 30 secondes, -40 % de no-show grâce aux rappels automatisés.",
          en: "Appointments booked in 30 seconds, -40% no-shows thanks to automated reminders.",
        },
      },
      {
        icon: Building2,
        sector: { fr: "Agences immobilières", en: "Real estate agencies" },
        problem: {
          fr: "Vous recevez 100 demandes par semaine sur des biens, mais seules 5 deviennent des visites. Trop de temps perdu à qualifier.",
          en: "You get 100 inquiries a week on properties, but only 5 turn into viewings. Too much time wasted qualifying.",
        },
        solution: {
          fr: "Le bot qualifie automatiquement (budget, type de bien, zone, timing), envoie des fiches détaillées, et planifie les visites uniquement pour les prospects sérieux.",
          en: "The bot auto-qualifies (budget, property type, area, timing), sends detailed listings, and only books viewings for serious leads.",
        },
        result: {
          fr: "Taux de conversion visite/demande multiplié par 3, agents focus sur les vrais acheteurs.",
          en: "Inquiry-to-viewing rate 3× higher, agents focus on real buyers.",
        },
      },
      {
        icon: Briefcase,
        sector: { fr: "PME, Coachs & Consultants", en: "SMEs, Coaches & Consultants" },
        problem: {
          fr: "Vous êtes seul à gérer prospection, ventes et délivrabilité. Répondre aux messages WhatsApp prend la moitié de vos journées.",
          en: "You handle prospecting, sales and delivery alone. Replying to WhatsApp eats half your days.",
        },
        solution: {
          fr: "Le bot qualifie les prospects, envoie votre méthode/programme, propose des créneaux d'appel découverte, et déclenche un Stripe Checkout pour les ventes simples.",
          en: "The bot qualifies leads, sends your method/program, offers discovery-call slots, and triggers a Stripe Checkout for simple sales.",
        },
        result: {
          fr: "Économie de 10h/semaine, taux de transformation lead/appel x2.",
          en: "10h/week saved, lead-to-call conversion 2× higher.",
        },
      },
    ],
  },

  stack: {
    headline: { fr: "La stack technique qu'on déploie", en: "The tech stack we deploy" },
    intro: {
      fr: "On combine les meilleurs outils du marché pour livrer un chatbot WhatsApp fiable, scalable et facilement modifiable par votre équipe.",
      en: "We combine the best market tools to deliver a WhatsApp chatbot that's reliable, scalable and easy for your team to update.",
    },
    tools: [
      { name: "WhatsApp Business API", role: { fr: "Canal officiel Meta — pas de risque de bannissement", en: "Official Meta channel — no banning risk" } },
      { name: "GPT-4 / GPT-4o", role: { fr: "Modèle conversationnel principal pour les réponses naturelles", en: "Main conversational model for natural replies" } },
      { name: "Claude (Anthropic)", role: { fr: "Alternative pour B2B sensibles et longs contextes", en: "Alternative for sensitive B2B and long contexts" } },
      { name: "Botpress", role: { fr: "Orchestrateur de flows et gestion des intentions", en: "Flow orchestrator and intent management" } },
      { name: "ManyChat / WaChap", role: { fr: "Plateformes WhatsApp prêtes à l'emploi pour PME", en: "Ready-to-use WhatsApp platforms for SMEs" } },
      { name: "Make / Zapier / n8n", role: { fr: "Connexions avec CRM, agenda, paiement, e-commerce", en: "Connects CRM, calendar, payments, e-commerce" } },
      { name: "HubSpot / Notion / Airtable", role: { fr: "CRM cible pour stocker les leads qualifiés", en: "Target CRM to store qualified leads" } },
      { name: "Google Calendar / Calendly", role: { fr: "Agenda pour la prise de RDV automatique", en: "Calendar for automatic appointment booking" } },
      { name: "Stripe / PayPal", role: { fr: "Paiement direct depuis la conversation", en: "Direct payment from the chat" } },
    ],
  },

  pricing: {
    headline: { fr: "Combien coûte votre chatbot WhatsApp ?", en: "How much does your WhatsApp chatbot cost?" },
    intro: {
      fr: "Trois formules selon la complexité de vos besoins. Tout est sur mesure, payable en une fois ou 50/50. Sans abonnement, sans frais cachés — vous restez propriétaire de votre bot.",
      en: "Three tiers based on the complexity of your needs. Everything is custom, payable upfront or 50/50. No subscription, no hidden fees — you stay the owner of your bot.",
    },
    tiers: [
      {
        name: { fr: "Starter", en: "Starter" },
        price: "150 €",
        priceNote: { fr: "Bot WhatsApp basique", en: "Basic WhatsApp bot" },
        features: [
          { fr: "FAQ automatisée (20-30 questions)", en: "Automated FAQ (20-30 questions)" },
          { fr: "Connexion WhatsApp Business (WaChap)", en: "WhatsApp Business connection (WaChap)" },
          { fr: "Réponses GPT-4 sur votre base de connaissances", en: "GPT-4 replies based on your knowledge base" },
          { fr: "Escalade vers un agent humain", en: "Handover to a human agent" },
          { fr: "Livraison en 48h · Support 30 jours", en: "Delivered in 48h · 30-day support" },
        ],
      },
      {
        name: { fr: "Pro (recommandé)", en: "Pro (recommended)" },
        price: "350 €",
        priceNote: { fr: "Bot complet avec CRM & RDV", en: "Full bot with CRM & bookings" },
        features: [
          { fr: "Tout du plan Starter", en: "Everything in Starter" },
          { fr: "Qualification de leads + scoring", en: "Lead qualification + scoring" },
          { fr: "Intégration CRM (HubSpot, Notion, Airtable)", en: "CRM integration (HubSpot, Notion, Airtable)" },
          { fr: "Prise de RDV via Google Calendar / Calendly", en: "Appointment booking via Google Calendar / Calendly" },
          { fr: "Dashboard analytics personnalisé", en: "Custom analytics dashboard" },
          { fr: "Livraison en 5-7 jours · Support 30 jours", en: "Delivered in 5-7 days · 30-day support" },
        ],
        highlight: true,
      },
      {
        name: { fr: "Enterprise", en: "Enterprise" },
        price: "à partir de 800 €",
        priceNote: { fr: "Sur mesure & e-commerce", en: "Custom & e-commerce" },
        features: [
          { fr: "Tout du plan Pro", en: "Everything in Pro" },
          { fr: "Intégration e-commerce (Shopify, WooCommerce)", en: "E-commerce integration (Shopify, WooCommerce)" },
          { fr: "Relances panier abandonné automatisées", en: "Automated abandoned-cart recovery" },
          { fr: "Paiement intégré (Stripe, PayPal, Mobile Money)", en: "Built-in payments (Stripe, PayPal, Mobile Money)" },
          { fr: "Multi-langue (FR, EN, +)", en: "Multi-language (FR, EN, +)" },
          { fr: "Livraison en 10-14 jours · Maintenance incluse", en: "Delivered in 10-14 days · Maintenance included" },
        ],
      },
    ],
  },

  faq: [
    {
      q: { fr: "Quelle est la différence entre un chatbot WhatsApp et un assistant IA WhatsApp ?", en: "What's the difference between a WhatsApp chatbot and a WhatsApp AI assistant?" },
      a: {
        fr: "Un chatbot WhatsApp traditionnel suit des scénarios rigides (menus à boutons, mots-clés). Un assistant IA WhatsApp utilise un modèle de langage (GPT-4, Claude) pour comprendre le langage naturel, les fautes de frappe, les questions implicites et adapter ses réponses. Chez GoScaleStudio, on ne livre que des assistants IA : c'est ce qui fait la différence entre un bot frustrant et un bot qui convertit vraiment.",
        en: "A traditional WhatsApp chatbot follows rigid scripts (button menus, keywords). A WhatsApp AI assistant uses a language model (GPT-4, Claude) to understand natural language, typos, implicit questions and adapt its replies. At GoScaleStudio, we only ship AI assistants — that's the difference between a frustrating bot and one that truly converts.",
      },
    },
    {
      q: { fr: "Mon chatbot risque-t-il de faire bannir mon numéro WhatsApp ?", en: "Could my chatbot get my WhatsApp number banned?" },
      a: {
        fr: "Non, parce qu'on utilise exclusivement la WhatsApp Business API officielle (via WaChap, ManyChat ou Twilio). Cette API est validée par Meta, respecte toutes les règles de conformité, et permet l'envoi de messages à grande échelle sans risque. À l'inverse, les solutions non officielles (WhatsApp Web automation) sont risquées et finissent souvent par un bannissement.",
        en: "No, because we exclusively use the official WhatsApp Business API (via WaChap, ManyChat or Twilio). This API is validated by Meta, respects all compliance rules, and allows large-scale messaging with no risk. Unofficial solutions (WhatsApp Web automation) on the other hand are risky and often end in bans.",
      },
    },
    {
      q: { fr: "Combien de temps pour qu'un chatbot WhatsApp soit rentable ?", en: "How long until a WhatsApp chatbot pays for itself?" },
      a: {
        fr: "Dans la majorité des cas, l'investissement est récupéré en 30 à 60 jours. Pour un e-commerce qui récupère 25 % de paniers abandonnés, c'est souvent dès le premier mois. Pour un cabinet qui gagne 10h/semaine de support, le ROI est immédiat dès la première semaine d'utilisation. On peut chiffrer précisément votre cas pendant l'appel découverte.",
        en: "In most cases, the investment pays back in 30 to 60 days. For an e-commerce recovering 25% of abandoned carts, often from month one. For a firm saving 10h/week of support, ROI is immediate from week one. We can size your specific case during the discovery call.",
      },
    },
    {
      q: { fr: "Le chatbot peut-il gérer plusieurs langues sur WhatsApp ?", en: "Can the chatbot handle multiple languages on WhatsApp?" },
      a: {
        fr: "Oui, totalement. Avec GPT-4 ou Claude, le bot détecte automatiquement la langue du client (français, anglais, et même des langues moins courantes comme le wolof, le yoruba ou l'arabe) et répond dans la même langue. C'est particulièrement utile pour les business actifs au Bénin, en Côte d'Ivoire ou avec une clientèle internationale.",
        en: "Yes, fully. With GPT-4 or Claude, the bot auto-detects the customer's language (French, English, and even less common languages like Wolof, Yoruba or Arabic) and replies in the same. Especially useful for businesses active in Benin, Côte d'Ivoire or with an international clientele.",
      },
    },
    {
      q: { fr: "Comment le chatbot s'intègre-t-il à mon CRM existant ?", en: "How does the chatbot integrate with my existing CRM?" },
      a: {
        fr: "Le bot envoie automatiquement chaque lead qualifié dans votre CRM (HubSpot, Notion, Airtable, Pipedrive, Zoho, GoHighLevel…) avec toutes les infos collectées : nom, téléphone, intérêt, score, contexte de la conversation. L'intégration se fait via Make, Zapier ou n8n — donc même si vous changez de CRM plus tard, on bascule en 30 minutes.",
        en: "The bot automatically pushes every qualified lead into your CRM (HubSpot, Notion, Airtable, Pipedrive, Zoho, GoHighLevel…) with all collected info: name, phone, interest, score, conversation context. Integration runs through Make, Zapier or n8n — so even if you switch CRM later, we re-wire it in 30 minutes.",
      },
    },
    {
      q: { fr: "Et si le chatbot répond mal à un client ?", en: "What if the chatbot replies poorly to a customer?" },
      a: {
        fr: "On configure des garde-fous précis : pour chaque sujet sensible (réclamation, urgence, négociation), le bot transfère immédiatement à un humain avec le contexte complet de la conversation. Pendant les 30 premiers jours, on monitore les transcripts ensemble et on ajuste les réponses problématiques. Et bien sûr, le bot ne fait jamais d'engagement contractuel — il prépare le terrain pour la décision humaine.",
        en: "We configure strict guardrails: for every sensitive topic (complaint, emergency, negotiation), the bot immediately hands over to a human with the full conversation context. During the first 30 days, we monitor transcripts together and tune problematic answers. And of course, the bot never makes contractual commitments — it preps the ground for the human decision.",
      },
    },
    {
      q: { fr: "Quels coûts récurrents après la livraison ?", en: "What recurring costs after delivery?" },
      a: {
        fr: "Vous payez directement et selon votre usage : WhatsApp Business API (~0,005 à 0,02 € par message selon le pays), GPT-4 (~0,01 à 0,03 € par conversation), et la plateforme orchestratrice (Botpress dès 0 €, WaChap dès 5 €/mois). Pour un volume PME standard, comptez 20 à 80 €/mois tout compris. Aucun frais GoScaleStudio en dehors du pack Maintenance optionnel.",
        en: "You pay directly based on usage: WhatsApp Business API (~€0.005 to 0.02 per message depending on country), GPT-4 (~€0.01 to 0.03 per conversation), and the orchestrator platform (Botpress from €0, WaChap from €5/month). For a standard SME volume, budget €20 to €80/month all-in. No recurring GoScaleStudio fees outside of the optional Maintenance pack.",
      },
    },
    {
      q: { fr: "Peut-on tester le chatbot avant de payer ?", en: "Can we test the chatbot before paying?" },
      a: {
        fr: "Oui. Avant tout engagement, on vous fait une démo personnalisée pendant l'appel découverte (gratuit) avec un bot construit en live à partir d'une de vos questions clients réelles. Vous voyez concrètement ce que ça donne avant de décider. Si vous lancez le projet, on garde la même démo comme point de départ.",
        en: "Yes. Before any commitment, we run a personalized demo during the (free) discovery call with a bot built live from one of your real customer questions. You see exactly what it does before deciding. If you launch the project, we keep that demo as a starting point.",
      },
    },
  ],

  relatedSlugs: ["chatbot-ia", "chatbot-gpt-site-web", "automatisation-no-code", "agent-vocal-ia-24-7"],

  cta: {
    headline: {
      fr: "Et si votre WhatsApp commençait à travailler pour vous, dès cette semaine ?",
      en: "What if your WhatsApp started working for you, this week?",
    },
    desc: {
      fr: "30 minutes pour comprendre vos besoins, 48h pour livrer un bot opérationnel. Pas d'abonnement, pas d'engagement, et un audit 100 % gratuit pour démarrer.",
      en: "30 minutes to understand your needs, 48h to deliver a working bot. No subscription, no commitment, and a 100% free audit to start.",
    },
    primaryLabel: { fr: "Réserver mon audit gratuit", en: "Book my free audit" },
    secondaryLabel: { fr: "Voir tous nos services", en: "See all our services" },
  },
};

/* ══════════════════════════════════════════════════════════════
   ★ STUBS — Les 14 autres pages (à enrichir une par une)
   Chaque page sera détaillée en suivant le même template que la
   page modèle ci-dessus.
   ══════════════════════════════════════════════════════════════ */

const defaultIllustrationFor = (cat: ServiceCategory): IllustrationVariant => {
  switch (cat) {
    case "Automatisation": return "automation-flow";
    case "ChatBot IA": return "chatbot-web";
    case "CallBot IA": return "callbot-phone";
    case "WordPress + SEO": return "wordpress-seo";
    case "Maquette UI/UX": return "ui-mockup";
    default: return "icon-halo";
  }
};

const placeholderStub = (
  slug: string,
  type: "pillar" | "long-tail",
  category: ServiceCategory,
  pillarSlug: string | undefined,
  color: ServicePage["color"],
  icon: LucideIcon,
  metaTitle: Tr,
  metaDescription: Tr,
): ServicePage => ({
  slug,
  type,
  category,
  pillarSlug,
  color,
  icon,
  heroIllustration: defaultIllustrationFor(category),
  metaTitle,
  metaDescription,
  keywords: [],
  hero: {
    badge: { fr: category, en: category },
    h1: metaTitle,
    h1Highlight: { fr: "", en: "" },
    subtitle: metaDescription,
    trustStrip: [
      { value: "48h", label: { fr: "Délai moyen", en: "Avg delivery" } },
      { value: "65+", label: { fr: "Projets livrés", en: "Projects shipped" } },
      { value: "5.0/5", label: { fr: "Satisfaction", en: "Satisfaction" } },
    ],
  },
  painPoints: { intro: { fr: "", en: "" }, items: [] },
  solution: { headline: { fr: "", en: "" }, intro: { fr: "", en: "" }, features: [] },
  howItWorks: { headline: { fr: "", en: "" }, steps: [] },
  stats: [],
  useCases: { headline: { fr: "", en: "" }, intro: { fr: "", en: "" }, cases: [] },
  stack: { headline: { fr: "", en: "" }, intro: { fr: "", en: "" }, tools: [] },
  pricing: { headline: { fr: "", en: "" }, intro: { fr: "", en: "" }, tiers: [] },
  faq: [],
  relatedSlugs: [],
  cta: {
    headline: { fr: "Démarrons votre projet", en: "Let's start your project" },
    desc: { fr: "Audit gratuit · Devis sous 24h", en: "Free audit · Quote within 24h" },
    primaryLabel: { fr: "Réserver un appel", en: "Book a call" },
    secondaryLabel: { fr: "Voir nos services", en: "See our services" },
  },
});

/* ── Pillar : Automatisation No-Code ── */
const automatisationNoCode: ServicePage = {
  slug: "automatisation-no-code",
  type: "pillar",
  category: "Automatisation",
  pillarSlug: undefined,
  color: "emerald",
  icon: Zap,
  heroIllustration: "automation-flow",

  metaTitle: {
    fr: "Automatisation No-Code pour Entreprise — Make, n8n, Zapier · Déployé en 3-7 jours",
    en: "No-Code Automation for Business — Make, n8n, Zapier · Deployed in 3-7 days",
  },
  metaDescription: {
    fr: "Libérez +10h/semaine grâce à l'automatisation no-code. Connectez vos outils (CRM, email, WhatsApp, e-commerce), supprimez les tâches répétitives, scalez sans embaucher. Déployé en 3-7 jours par GoScaleStudio. Audit à 15 €.",
    en: "Free up 10+ hours per week with no-code automation. Connect your tools (CRM, email, WhatsApp, e-commerce), kill repetitive tasks, scale without hiring. Deployed in 3-7 days by GoScaleStudio. €15 audit.",
  },
  keywords: [
    "automatisation no-code",
    "automatisation entreprise",
    "automatisation PME",
    "Make automation",
    "n8n",
    "Zapier",
    "workflow automation",
    "automatisation Bénin",
    "automatisation Afrique",
    "intégration outils",
    "automatisation processus métier",
    "automatiser tâches répétitives",
    "agence automatisation",
    "automatisation CRM",
    "automatisation email",
    "automatisation marketing",
    "scénario Make",
    "workflow n8n",
  ],

  hero: {
    badge: { fr: "Automatisation No-Code", en: "No-Code Automation" },
    h1: {
      fr: "Automatisez vos tâches répétitives et récupérez",
      en: "Automate your repetitive tasks and reclaim",
    },
    h1Highlight: {
      fr: "+10h par semaine",
      en: "10+ hours per week",
    },
    subtitle: {
      fr: "On connecte tous vos outils (CRM, email, WhatsApp, e-commerce, comptabilité) avec Make, n8n et Zapier pour que vos workflows tournent tout seuls. Vous restez propriétaire, sans abonnement caché, modifiable par votre équipe. Déployé en 3-7 jours.",
      en: "We connect all your tools (CRM, email, WhatsApp, e-commerce, accounting) with Make, n8n and Zapier so your workflows run themselves. You stay the owner, no hidden subscription, editable by your team. Shipped in 3-7 days.",
    },
    trustStrip: [
      { value: "3-7j", label: { fr: "Déploiement", en: "Deployment" } },
      { value: "+10h", label: { fr: "Économisées/semaine", en: "Saved per week" } },
      { value: "200+", label: { fr: "Outils connectables", en: "Connectable tools" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Vous (ou votre équipe) passez chaque jour des heures à copier-coller, relancer, ressaisir, vérifier des emails, mettre à jour des feuilles Excel et reposter manuellement des contenus. Ce sont des tâches que personne ne devrait plus faire à la main en 2026 — et pourtant, elles plombent votre marge et tuent la motivation. Voici les 4 fuites de temps les plus coûteuses qu'on constate chez 9 entreprises sur 10 avant qu'on intervienne.",
      en: "You (or your team) spend hours every day copy-pasting, following up, re-typing, checking emails, updating Excel sheets and re-posting content manually. These are tasks no one should still be doing by hand in 2026 — yet they crush your margins and kill morale. Here are the 4 most expensive time leaks we find in 9 out of 10 companies before we step in.",
    },
    items: [
      {
        icon: Clock,
        title: { fr: "Vous perdez 2h par jour en copier-coller entre vos outils", en: "You lose 2h a day copy-pasting between tools" },
        desc: {
          fr: "Un lead arrive sur votre site → vous le ressaisissez dans HubSpot → vous le copiez dans une feuille Excel → vous lui envoyez un email manuellement → vous notez le suivi dans Notion. Multiplié par 50 leads/semaine, c'est un mi-temps complet qui part en fumée pour zéro valeur ajoutée.",
          en: "A lead lands on your site → you re-enter them in HubSpot → copy them into Excel → send a manual email → log the follow-up in Notion. Multiplied by 50 leads/week, that's a full part-time job burned on zero added value.",
        },
      },
      {
        icon: Users,
        title: { fr: "Vos équipes oublient (ou bâclent) les relances commerciales", en: "Your team forgets (or rushes) sales follow-ups" },
        desc: {
          fr: "80 % des ventes se font après la 4ᵉ relance, mais 90 % des commerciaux abandonnent après la 1ʳᵉ. Sans automatisation, les leads chauds refroidissent dans la nature et finissent chez le concurrent. Vous laissez 30 à 50 % de votre chiffre potentiel sur la table — chaque mois, sans même vous en rendre compte.",
          en: "80% of deals close after the 4th follow-up, yet 90% of reps give up after the 1st. Without automation, hot leads cool off and end up with a competitor. You leave 30 to 50% of your potential revenue on the table — every month, without even noticing.",
        },
      },
      {
        icon: BarChart3,
        title: { fr: "Votre reporting prend une journée entière chaque semaine", en: "Your reporting eats a whole day every week" },
        desc: {
          fr: "Lundi matin, quelqu'un exporte Stripe, télécharge les CSV de Shopify, copie les chiffres de Google Ads, agrège dans un Google Sheet, ajoute des graphiques, et envoie le tout par email. Pendant ce temps, personne ne vend, personne ne livre, personne ne crée. Et la donnée est déjà obsolète à l'arrivée.",
          en: "Monday morning, someone exports Stripe, downloads Shopify CSVs, copies Google Ads numbers, aggregates in a Google Sheet, adds charts and emails the lot. Meanwhile no one sells, no one delivers, no one creates. And the data is already stale on arrival.",
        },
      },
      {
        icon: Settings,
        title: { fr: "Vos outils ne se parlent pas — chaque action vit en silo", en: "Your tools don't talk to each other — each action lives in a silo" },
        desc: {
          fr: "Un paiement Stripe ne déclenche pas l'email de bienvenue. Une facture Pennylane n'arrive pas dans QuickBooks. Un lead Meta Ads n'atterrit pas dans votre CRM. Résultat : 15 outils payés chaque mois qui devraient s'amplifier l'un l'autre, mais qui tournent chacun dans leur coin sans levier.",
          en: "A Stripe payment doesn't trigger the welcome email. A Pennylane invoice doesn't reach QuickBooks. A Meta Ads lead doesn't land in your CRM. Result: 15 tools paid every month that should compound each other, but each runs alone with zero leverage.",
        },
      },
    ],
  },

  solution: {
    headline: {
      fr: "Des workflows qui tournent pendant que vous dormez — et qui vous restent",
      en: "Workflows that run while you sleep — and that stay yours",
    },
    intro: {
      fr: "On audite votre stack actuelle, on identifie les 5 à 10 process qui vous coûtent le plus de temps, puis on les automatise avec les meilleurs outils no-code du marché (Make, n8n, Zapier) — ceux où votre équipe peut intervenir ensuite sans nous. Vous récupérez du temps, vous fiabilisez la donnée, et vous arrêtez de dépendre d'une personne précise pour faire tourner la machine.",
      en: "We audit your current stack, identify the 5-10 processes costing you the most time, then automate them with the best no-code tools on the market (Make, n8n, Zapier) — the ones your team can edit afterwards without us. You reclaim time, you harden your data, and you stop depending on one specific person to keep the engine running.",
    },
    features: [
      {
        icon: Zap,
        title: { fr: "Lead routing & enrichissement automatique", en: "Automatic lead routing & enrichment" },
        desc: {
          fr: "Chaque lead (formulaire site, Meta Ads, WhatsApp, LinkedIn) est enrichi automatiquement (entreprise, fonction, taille), scoré, puis routé au bon commercial avec une alerte Slack ou email. Plus de leads perdus, plus de doublons, plus de débats sur qui prend quoi.",
          en: "Every lead (site form, Meta Ads, WhatsApp, LinkedIn) gets auto-enriched (company, role, size), scored, then routed to the right rep with a Slack or email alert. No more lost leads, no more duplicates, no more debates about who takes what.",
        },
      },
      {
        icon: MessageSquare,
        title: { fr: "Séquences d'email & WhatsApp multi-touch", en: "Multi-touch email & WhatsApp sequences" },
        desc: {
          fr: "On déploie des séquences de relance intelligentes (3 à 7 touches, email + WhatsApp + SMS) qui s'arrêtent dès qu'un prospect répond ou prend RDV. Personnalisation par segment, A/B test des objets, suivi des ouvertures et clics — tout est mesuré et optimisable.",
          en: "We deploy smart follow-up sequences (3 to 7 touches, email + WhatsApp + SMS) that stop as soon as a prospect replies or books. Per-segment personalization, subject-line A/B testing, open and click tracking — everything is measured and tunable.",
        },
      },
      {
        icon: ShoppingCart,
        title: { fr: "Synchro e-commerce & paniers abandonnés", en: "E-commerce sync & abandoned-cart recovery" },
        desc: {
          fr: "Shopify, WooCommerce ou Prestashop synchronisés en temps réel avec votre CRM, votre compta et votre outil de mailing. Relance automatique des paniers abandonnés par email + WhatsApp avec code promo dynamique — récupération moyenne : 20 à 25 % des paniers.",
          en: "Shopify, WooCommerce or Prestashop synced in real time with your CRM, accounting and mailing tool. Automated cart-recovery via email + WhatsApp with dynamic promo code — average recovery: 20-25% of carts.",
        },
      },
      {
        icon: BarChart3,
        title: { fr: "Reporting & tableaux de bord temps réel", en: "Real-time reporting & dashboards" },
        desc: {
          fr: "On agrège Stripe, Meta Ads, Google Ads, Shopify, HubSpot dans un Looker Studio (ou Notion / Airtable) mis à jour automatiquement chaque heure. Vous ouvrez un onglet et vous voyez CA, marge, CAC, ROAS, leads en cours — sans qu'aucun humain ne touche un CSV.",
          en: "We aggregate Stripe, Meta Ads, Google Ads, Shopify, HubSpot into a Looker Studio (or Notion / Airtable) auto-refreshed every hour. You open a tab and see revenue, margin, CAC, ROAS, leads in pipe — without any human touching a CSV.",
        },
      },
      {
        icon: FileCheck,
        title: { fr: "Onboarding client & facturation automatisés", en: "Automated client onboarding & invoicing" },
        desc: {
          fr: "Un client signe → le contrat est généré, signé via Yousign/PandaDoc, la facture est créée dans Pennylane/QuickBooks, le canal Slack/Notion est ouvert, les accès Google Drive provisionnés et l'email de bienvenue envoyé. 30 minutes de travail compressées en 30 secondes.",
          en: "A client signs → the contract is generated, signed via Yousign/PandaDoc, the invoice created in Pennylane/QuickBooks, the Slack/Notion channel opened, Google Drive access provisioned and the welcome email sent. 30 minutes of work compressed into 30 seconds.",
        },
      },
      {
        icon: Shield,
        title: { fr: "Monitoring, retries & alertes en cas de bug", en: "Monitoring, retries & alerts on failure" },
        desc: {
          fr: "Chaque scénario est protégé par des garde-fous : retry automatique en cas d'erreur API, alerte Slack si un workflow casse, log centralisé pour traçabilité. Pas de \"j'ai cru que ça tournait depuis 3 mois\" — vous savez en temps réel que tout va bien.",
          en: "Every scenario is protected by guardrails: automatic retry on API errors, Slack alert if a workflow breaks, centralized logs for traceability. No more \"I thought it had been running for 3 months\" — you know in real time that everything is fine.",
        },
      },
    ],
  },

  howItWorks: {
    headline: {
      fr: "De l'audit à la production — en 5 étapes claires",
      en: "From audit to production — in 5 clear steps",
    },
    steps: [
      {
        icon: Search,
        title: { fr: "Audit process & cartographie", en: "Process audit & mapping" },
        desc: {
          fr: "On passe 90 minutes avec vous et votre équipe pour lister vos tâches répétitives, mesurer leur coût en heures/semaine, et identifier les 5 à 10 workflows à plus haut ROI. On vous livre une carte claire : ce qu'on automatise, dans quel ordre, et combien de temps vous récupérez par scénario.",
          en: "We spend 90 minutes with you and your team to list repetitive tasks, measure their cost in hours/week, and identify the 5-10 highest-ROI workflows. You get a clear map: what we automate, in what order, and how many hours you reclaim per scenario.",
        },
        duration: { fr: "Jour 1", en: "Day 1" },
      },
      {
        icon: Lightbulb,
        title: { fr: "Design des scénarios & choix de la stack", en: "Scenario design & stack selection" },
        desc: {
          fr: "On dessine chaque workflow étape par étape (trigger → conditions → actions → fallback) et on choisit l'outil le plus adapté : Make pour le visuel et le rapport prix/puissance, n8n pour la souveraineté et le self-host, Zapier pour la simplicité absolue. Vous validez avant qu'on code une ligne.",
          en: "We design each workflow step by step (trigger → conditions → actions → fallback) and pick the most adapted tool: Make for visual workflows and price/power ratio, n8n for sovereignty and self-hosting, Zapier for raw simplicity. You sign off before we build a single step.",
        },
        duration: { fr: "Jour 2", en: "Day 2" },
      },
      {
        icon: Settings,
        title: { fr: "Construction & connexions API", en: "Build & API connections" },
        desc: {
          fr: "On configure les scénarios, on connecte chaque outil via OAuth ou clé API, on gère les webhooks et on installe les garde-fous (retry, error handler, data store). On code en clair, on commente chaque module, et on documente les variables sensibles pour que vous ne soyez jamais dépendant de nous.",
          en: "We configure scenarios, connect each tool via OAuth or API key, handle webhooks and install guardrails (retry, error handler, data store). We build cleanly, comment every module, and document sensitive variables so you're never dependent on us.",
        },
        duration: { fr: "Jours 3-5", en: "Days 3-5" },
      },
      {
        icon: Rocket,
        title: { fr: "Tests réels & mise en production", en: "Real tests & go-live" },
        desc: {
          fr: "On lance chaque scénario en mode sandbox avec des données réelles, on stresse les cas limites (mauvais format, API down, doublons), on valide la qualité de la donnée à l'arrivée. Puis on bascule en prod un workflow à la fois, avec rollback prêt si besoin.",
          en: "We launch each scenario in sandbox mode with real data, stress edge cases (bad format, API down, duplicates), and validate the data quality at destination. Then we flip to production one workflow at a time, with rollback ready if needed.",
        },
        duration: { fr: "Jours 5-6", en: "Days 5-6" },
      },
      {
        icon: Handshake,
        title: { fr: "Formation, doc & support 30 jours", en: "Training, docs & 30-day support" },
        desc: {
          fr: "On forme votre équipe (1 à 2h en visio) à lire, dupliquer et modifier les scénarios — sans nous. On vous livre une documentation Notion complète : schéma de chaque flow, identifiants, procédures de dépannage. Pendant 30 jours, on assure le support, on ajuste et on monitore avec vous.",
          en: "We train your team (1-2h video call) to read, duplicate and edit scenarios — without us. You get a full Notion documentation: every flow schema, credentials, troubleshooting playbooks. For 30 days, we provide support, tune and monitor with you.",
        },
        duration: { fr: "Semaines 1-4", en: "Weeks 1-4" },
      },
    ],
  },

  stats: [
    { value: "+10", suffix: "h", label: { fr: "Économisées par semaine", en: "Saved per week" } },
    { value: "3-7", suffix: "j", label: { fr: "Délai de déploiement", en: "Deployment window" } },
    { value: "200", suffix: "+", label: { fr: "Outils connectables", en: "Connectable tools" } },
    { value: "-65", suffix: "%", label: { fr: "Erreurs de saisie", en: "Data entry errors" } },
  ],

  useCases: {
    headline: {
      fr: "À qui s'adresse vraiment l'automatisation no-code ?",
      en: "Who is no-code automation really for?",
    },
    intro: {
      fr: "L'automatisation n'est plus réservée aux grands groupes avec une équipe IT. Une PME de 3 personnes peut aujourd'hui orchestrer ce qu'une boîte de 30 faisait il y a 5 ans. Voici 4 profils types qu'on accompagne le plus souvent — et les résultats concrets qu'on a livrés.",
      en: "Automation is no longer reserved for big corporations with an IT team. A 3-person SME can now orchestrate what a 30-person company did 5 years ago. Here are the 4 most common profiles we work with — and the concrete results we've delivered.",
    },
    cases: [
      {
        icon: Building2,
        sector: { fr: "Agences (marketing, design, dev)", en: "Agencies (marketing, design, dev)" },
        problem: {
          fr: "Onboarding client artisanal, devis perdus en route, reporting client manuel, facturation en retard. Votre marge fond chaque mois sur des tâches admin invisibles mais bien réelles.",
          en: "Artisanal client onboarding, quotes lost in transit, manual client reporting, late invoicing. Your margin melts every month on invisible but very real admin tasks.",
        },
        solution: {
          fr: "Pipeline lead → devis → contrat → onboarding → reporting automatisé de bout en bout via Make + HubSpot + Notion + Pennylane. Chaque client passe par le même rail, sans intervention humaine sauf décision.",
          en: "Lead → quote → contract → onboarding → reporting pipeline fully automated end-to-end via Make + HubSpot + Notion + Pennylane. Every client runs on the same rail, no human intervention except for decisions.",
        },
        result: {
          fr: "+12h/semaine récupérées par chef de projet, 0 facture oubliée, NPS client +18 points.",
          en: "+12h/week reclaimed per project manager, 0 forgotten invoices, +18 pts client NPS.",
        },
      },
      {
        icon: ShoppingCart,
        sector: { fr: "E-commerce & DTC", en: "E-commerce & DTC" },
        problem: {
          fr: "Stock désynchronisé entre Shopify et l'entrepôt, paniers abandonnés non relancés, support submergé par les questions \"où est ma commande ?\", reporting fait à la main chaque lundi.",
          en: "Stock out of sync between Shopify and warehouse, abandoned carts never recovered, support overwhelmed with \"where's my order?\" questions, manual Monday reporting.",
        },
        solution: {
          fr: "Sync Shopify ↔ ERP en temps réel, relances panier email + WhatsApp via Make, tracking automatique envoyé au client à chaque changement de statut, dashboard CA/marge/ROAS auto-actualisé.",
          en: "Real-time Shopify ↔ ERP sync, email + WhatsApp cart recovery via Make, automatic tracking sent to customer on every status change, auto-refreshed revenue/margin/ROAS dashboard.",
        },
        result: {
          fr: "+22 % de paniers récupérés, -55 % de tickets SAV, reporting dispo H24 sans intervention.",
          en: "+22% carts recovered, -55% support tickets, reporting available 24/7 with zero manual work.",
        },
      },
      {
        icon: Briefcase,
        sector: { fr: "PME & cabinets de services", en: "SMEs & service firms" },
        problem: {
          fr: "Vous (le dirigeant) êtes le goulot d'étranglement de tout : suivi commercial, validation devis, relances clients, paiements en retard. Impossible de partir en vacances sans que tout s'arrête.",
          en: "You (the founder) are the bottleneck of everything: sales follow-up, quote approval, client chasing, late payments. Impossible to take a vacation without the whole machine stopping.",
        },
        solution: {
          fr: "Workflows de relance auto (3 touches sur 14 jours), notifications Slack des affaires bloquées, dunning automatique pour les impayés via Stripe + WhatsApp, validation devis par simple clic Slack/email.",
          en: "Automated follow-up sequences (3 touches over 14 days), Slack notifications on stuck deals, automatic dunning for unpaid invoices via Stripe + WhatsApp, quote approval with one Slack/email click.",
        },
        result: {
          fr: "DSO réduit de 42 à 18 jours, taux de transformation x1,8, dirigeant qui part 3 semaines sans rien casser.",
          en: "DSO down from 42 to 18 days, 1.8× conversion rate, founder taking 3 weeks off without breaking anything.",
        },
      },
      {
        icon: Rocket,
        sector: { fr: "Startups & SaaS", en: "Startups & SaaS" },
        problem: {
          fr: "Vous voulez tester un nouveau funnel, brancher un nouvel outil, ou orchestrer un onboarding produit — mais votre dev est déjà sur 12 sprints et le produit core passe avant tout.",
          en: "You want to test a new funnel, plug a new tool, or orchestrate product onboarding — but your dev is already on 12 sprints and the core product comes first.",
        },
        solution: {
          fr: "On déploie l'orchestration en n8n self-host (souveraineté + scalabilité), connecté à votre backend via webhooks. Nouvelle source de leads, A/B test d'onboarding, scoring d'usage — tout itérable sans pull request.",
          en: "We deploy orchestration in self-hosted n8n (sovereignty + scalability), connected to your backend via webhooks. New lead source, onboarding A/B tests, usage scoring — all iterable without pull requests.",
        },
        result: {
          fr: "Time-to-market divisé par 5 sur les expérimentations growth, 0 heure de dev squad mobilisée.",
          en: "Time-to-market 5× faster on growth experiments, 0 hours from the dev squad.",
        },
      },
    ],
  },

  stack: {
    headline: { fr: "La stack no-code qu'on déploie", en: "The no-code stack we deploy" },
    intro: {
      fr: "On ne pousse pas un outil par dogme : on choisit en fonction de votre volume, de votre budget, de votre souveraineté de données et du niveau technique de votre équipe. Voici les briques qu'on combine selon votre cas.",
      en: "We don't push one tool out of dogma: we pick based on your volume, budget, data sovereignty needs and your team's technical level. Here are the building blocks we combine for your case.",
    },
    tools: [
      { name: "Make (ex-Integromat)", role: { fr: "Orchestrateur visuel n°1 — meilleur rapport puissance/prix pour 80 % des cas", en: "#1 visual orchestrator — best power/price ratio for 80% of cases" } },
      { name: "n8n (self-host)", role: { fr: "Souveraineté totale, scalable sans limite d'opérations, idéal SaaS et data sensibles", en: "Full sovereignty, unlimited operations, ideal for SaaS and sensitive data" } },
      { name: "Zapier", role: { fr: "Le plus simple, le plus de connecteurs, parfait pour démarrer vite", en: "The simplest, most connectors, perfect to start fast" } },
      { name: "GoHighLevel", role: { fr: "Tout-en-un CRM + automatisation + funnels pour agences et coachs", en: "All-in-one CRM + automation + funnels for agencies and coaches" } },
      { name: "HubSpot / Pipedrive", role: { fr: "CRM cibles pour gestion commerciale structurée", en: "Target CRMs for structured sales management" } },
      { name: "Notion / Airtable", role: { fr: "Bases de données souples, parfaites pour pilotage interne", en: "Flexible databases, perfect for internal pilots" } },
      { name: "Google Workspace", role: { fr: "Sheets, Drive, Calendar, Gmail comme cœur opérationnel automatisé", en: "Sheets, Drive, Calendar, Gmail as the automated operational core" } },
      { name: "WhatsApp Business API", role: { fr: "Canal de messagerie n°1 en Afrique et francophonie", en: "#1 messaging channel in Africa and the francophone world" } },
      { name: "Slack / Discord", role: { fr: "Notifications internes en temps réel sur les événements critiques", en: "Real-time internal notifications on critical events" } },
      { name: "Stripe / PayPal / FedaPay", role: { fr: "Triggers de paiement et dunning automatique, Mobile Money inclus", en: "Payment triggers and automatic dunning, Mobile Money included" } },
    ],
  },

  pricing: {
    headline: { fr: "Combien coûte votre projet d'automatisation ?", en: "How much does your automation project cost?" },
    intro: {
      fr: "Trois formules selon le nombre de workflows et la complexité des intégrations. Tout est sur mesure, payable en une fois ou 50/50. Sans abonnement GoScaleStudio, sans frais cachés — vous restez 100 % propriétaire des scénarios et pouvez les modifier vous-même à tout moment.",
      en: "Three tiers depending on the number of workflows and integration complexity. Everything is custom, payable upfront or 50/50. No GoScaleStudio subscription, no hidden fees — you stay 100% owner of the scenarios and can edit them yourself at any time.",
    },
    tiers: [
      {
        name: { fr: "Starter", en: "Starter" },
        price: "300 €",
        priceNote: { fr: "1 à 2 workflows simples", en: "1 to 2 simple workflows" },
        features: [
          { fr: "Audit éclair 60 min de votre stack", en: "60-min express audit of your stack" },
          { fr: "1 à 2 scénarios Make ou Zapier (3 à 5 étapes)", en: "1 to 2 Make or Zapier scenarios (3 to 5 steps)" },
          { fr: "Connexion de 2 à 3 outils existants", en: "Connect 2 to 3 existing tools" },
          { fr: "Tests réels et mise en production", en: "Real tests and go-live" },
          { fr: "Livraison en 3 jours · Support 15 jours", en: "Delivered in 3 days · 15-day support" },
        ],
      },
      {
        name: { fr: "Pro (recommandé)", en: "Pro (recommended)" },
        price: "700 €",
        priceNote: { fr: "Pack automatisation business", en: "Business automation pack" },
        features: [
          { fr: "Tout du plan Starter", en: "Everything in Starter" },
          { fr: "3 à 6 workflows multi-outils (jusqu'à 10 étapes chacun)", en: "3 to 6 multi-tool workflows (up to 10 steps each)" },
          { fr: "Lead routing, séquences email/WhatsApp, reporting", en: "Lead routing, email/WhatsApp sequences, reporting" },
          { fr: "Garde-fous : retry, alertes Slack, error handler", en: "Guardrails: retry, Slack alerts, error handler" },
          { fr: "Documentation Notion + formation équipe (2h)", en: "Notion documentation + team training (2h)" },
          { fr: "Livraison en 5-7 jours · Support 30 jours", en: "Delivered in 5-7 days · 30-day support" },
        ],
        highlight: true,
      },
      {
        name: { fr: "Enterprise", en: "Enterprise" },
        price: "à partir de 1 800 €",
        priceNote: { fr: "Architecture sur mesure", en: "Custom architecture" },
        features: [
          { fr: "Tout du plan Pro", en: "Everything in Pro" },
          { fr: "Architecture n8n self-host ou Make Enterprise", en: "Self-hosted n8n or Make Enterprise architecture" },
          { fr: "Workflows illimités, intégrations API custom", en: "Unlimited workflows, custom API integrations" },
          { fr: "Synchro e-commerce, ERP, paiements multi-devises", en: "E-commerce, ERP, multi-currency payment sync" },
          { fr: "Monitoring 24/7, SLA de réponse 4h", en: "24/7 monitoring, 4h SLA response" },
          { fr: "Livraison en 2-3 semaines · Maintenance incluse", en: "Delivered in 2-3 weeks · Maintenance included" },
        ],
      },
    ],
  },

  faq: [
    {
      q: { fr: "C'est quoi vraiment l'automatisation no-code, et en quoi c'est différent du code ?", en: "What is no-code automation really, and how is it different from code?" },
      a: {
        fr: "L'automatisation no-code consiste à connecter vos outils existants via des plateformes visuelles (Make, n8n, Zapier) plutôt qu'en écrivant du code custom. Le résultat est strictement le même fonctionnellement, mais c'est 5 à 10 fois plus rapide à déployer, 3 à 5 fois moins cher à maintenir, et surtout modifiable par votre équipe non-tech. Le code reste pertinent pour des cas très spécifiques (forte volumétrie, logique métier complexe, performance critique) — mais 90 % des automatisations d'entreprise n'en ont absolument pas besoin.",
        en: "No-code automation means connecting your existing tools through visual platforms (Make, n8n, Zapier) rather than writing custom code. The result is functionally identical, but 5-10× faster to deploy, 3-5× cheaper to maintain, and most importantly editable by your non-technical team. Code remains relevant for very specific cases (high volume, complex business logic, critical performance) — but 90% of business automations have absolutely no need for it.",
      },
    },
    {
      q: { fr: "Make, n8n ou Zapier — lequel choisir pour mon entreprise ?", en: "Make, n8n or Zapier — which one should I pick?" },
      a: {
        fr: "Zapier est le plus simple et a le plus de connecteurs (6000+), parfait si vous débutez et que vos volumes sont modestes. Make offre 5 à 10 fois plus de puissance par euro dépensé : c'est notre choix par défaut pour 80 % des PME. n8n est open-source et self-hostable : c'est imbattable pour la souveraineté des données, les volumes élevés et les SaaS. Pendant l'audit, on regarde votre volume mensuel d'opérations, vos contraintes data et le niveau technique de votre équipe pour vous recommander le bon outil — pas le plus cher, le plus adapté.",
        en: "Zapier is the simplest with the most connectors (6000+), perfect if you're starting and your volumes are modest. Make offers 5-10× more power per euro spent: it's our default pick for 80% of SMEs. n8n is open-source and self-hostable: unbeatable for data sovereignty, high volumes and SaaS. During the audit, we look at your monthly operation volume, data constraints and team's tech level to recommend the right tool — not the priciest, the best fit.",
      },
    },
    {
      q: { fr: "Combien de temps pour qu'un projet d'automatisation soit rentable ?", en: "How long until an automation project pays for itself?" },
      a: {
        fr: "Pour une PME qui automatise ses tâches commerciales et admin, le ROI est généralement atteint en 30 à 45 jours. Exemple concret : un pack Pro à 150 € qui libère 10h/semaine à un salarié payé 25 €/h représente 1000 € de valeur dès le premier mois — soit 7× l'investissement. Pour un e-commerce qui récupère 22 % de paniers abandonnés, c'est souvent rentabilisé dès la première semaine. On peut chiffrer précisément votre ROI pendant l'audit, en fonction de vos chiffres réels.",
        en: "For an SME automating sales and admin tasks, ROI is typically hit in 30 to 45 days. Concrete example: a €150 Pro pack freeing 10h/week from a €25/h employee represents €1000 of value in the first month — 7× the investment. For an e-commerce recovering 22% of abandoned carts, it's often paid back within the first week. We can size your specific ROI during the audit, based on your real numbers.",
      },
    },
    {
      q: { fr: "Est-ce que je reste propriétaire de mes scénarios après la livraison ?", en: "Do I stay the owner of my scenarios after delivery?" },
      a: {
        fr: "100 % oui. Les scénarios sont créés sur vos propres comptes Make, n8n ou Zapier (ou sur votre serveur n8n self-host), avec vos propres identifiants. Vous nous donnez un accès temporaire pendant le projet, qu'on retire à la livraison. Aucune dépendance technique, aucun verrou commercial. Vous pouvez résilier votre relation avec nous à tout moment sans rien perdre — c'est le contraire des SaaS d'automatisation propriétaires où la fuite est interdite.",
        en: "100% yes. Scenarios are built on your own Make, n8n or Zapier accounts (or on your self-hosted n8n server), with your own credentials. You give us temporary access during the project, which we revoke on delivery. No technical lock-in, no commercial trap. You can end our relationship at any time without losing anything — the opposite of proprietary automation SaaS where exit is forbidden.",
      },
    },
    {
      q: { fr: "Quels coûts récurrents après la mise en production ?", en: "What recurring costs after go-live?" },
      a: {
        fr: "Vous payez directement et selon votre usage la plateforme choisie : Make démarre à 9 €/mois (10 000 opérations), n8n self-host est gratuit hors serveur (~5 €/mois sur Hetzner), Zapier démarre à 19 €/mois. Pour une PME standard avec 3-6 workflows, comptez 15 à 50 €/mois tout compris. Aucun frais GoScaleStudio récurrent, sauf si vous souscrivez à notre pack Maintenance optionnel (à partir de 80 €/mois) qui couvre les évolutions, le monitoring et les ajouts de scénarios.",
        en: "You pay your chosen platform directly based on usage: Make starts at €9/month (10,000 operations), self-hosted n8n is free outside the server (~€5/month on Hetzner), Zapier starts at €19/month. For a standard SME with 3-6 workflows, budget €15 to €50/month all-in. No recurring GoScaleStudio fees, unless you subscribe to our optional Maintenance pack (from €80/month) covering evolutions, monitoring and new scenarios.",
      },
    },
    {
      q: { fr: "Et si un scénario casse ou si une API change ?", en: "What if a scenario breaks or an API changes?" },
      a: {
        fr: "Chaque workflow qu'on livre est protégé par des garde-fous : retry automatique en cas d'erreur transitoire (API down, timeout), error handler qui envoie une alerte Slack ou email à votre équipe, et log centralisé pour traçabilité. Pendant les 30 jours de support inclus, on corrige toute casse gratuitement. Au-delà, soit vous le faites vous-même grâce à la documentation Notion qu'on vous livre, soit vous activez notre pack Maintenance qui couvre les ajustements illimités.",
        en: "Every workflow we deliver is protected by guardrails: automatic retry on transient errors (API down, timeout), error handler sending a Slack or email alert to your team, and centralized logs for traceability. During the included 30 days of support, we fix any breakage for free. Beyond that, either you do it yourself thanks to the Notion documentation we deliver, or you activate our Maintenance pack covering unlimited tweaks.",
      },
    },
    {
      q: { fr: "Mes données sont-elles en sécurité dans Make, n8n ou Zapier ?", en: "Is my data safe in Make, n8n or Zapier?" },
      a: {
        fr: "Make et Zapier sont hébergés dans l'UE (Make) ou aux US (Zapier) et sont conformes RGPD, SOC 2 Type II et ISO 27001. Pour des données ultra-sensibles (santé, finance, données personnelles à grande échelle), on recommande systématiquement n8n self-host sur un serveur que vous contrôlez (Hetzner en Allemagne, OVH en France, ou votre propre cloud). Dans ce cas, aucune donnée ne quitte votre infrastructure — vous êtes maître du chiffrement, des logs et des accès.",
        en: "Make and Zapier are hosted in the EU (Make) or US (Zapier) and are GDPR, SOC 2 Type II and ISO 27001 compliant. For ultra-sensitive data (health, finance, large-scale personal data), we systematically recommend self-hosted n8n on a server you control (Hetzner in Germany, OVH in France, or your own cloud). In that case, no data leaves your infrastructure — you own the encryption, logs and access.",
      },
    },
    {
      q: { fr: "Pouvez-vous travailler depuis le Bénin avec des clients en France ou à l'international ?", en: "Can you work from Benin with clients in France or international?" },
      a: {
        fr: "Oui, c'est notre quotidien. GoScaleStudio est basé à Cotonou mais sert des clients en Afrique de l'Ouest, en France, en Europe francophone, au Canada et au Moyen-Orient. Tous nos process sont en remote (Notion, Slack, Loom, visio), nous facturons en EUR, XOF ou USD selon votre préférence, et nous acceptons le virement bancaire, le Mobile Money (MTN, Moov, Wave) et Stripe. L'écart horaire avec la France est nul (UTC+1), avec le Canada ou les US il reste très gérable.",
        en: "Yes, this is our daily life. GoScaleStudio is based in Cotonou but serves clients in West Africa, France, francophone Europe, Canada and the Middle East. All our processes are remote (Notion, Slack, Loom, video calls), we invoice in EUR, XOF or USD as you prefer, and we accept bank transfer, Mobile Money (MTN, Moov, Wave) and Stripe. Time zone with France is zero (UTC+1), with Canada or the US it stays very manageable.",
      },
    },
  ],

  relatedSlugs: ["automatisation-make", "automatisation-n8n", "automatisation-zapier", "chatbot-whatsapp-business"],

  cta: {
    headline: {
      fr: "Et si vous récupériez 10h par semaine, dès le mois prochain ?",
      en: "What if you reclaimed 10 hours a week, starting next month?",
    },
    desc: {
      fr: "30 minutes pour cartographier vos tâches répétitives, 3 à 7 jours pour livrer vos premiers workflows. Sans abonnement, sans engagement, audit complet à 15 € (déduit du projet si vous lancez).",
      en: "30 minutes to map your repetitive tasks, 3 to 7 days to ship your first workflows. No subscription, no commitment, full audit at €15 (deducted from the project if you launch).",
    },
    primaryLabel: { fr: "Réserver mon audit à 15 €", en: "Book my €15 audit" },
    secondaryLabel: { fr: "Voir tous nos services", en: "See all our services" },
  },
};

/* ── Pillar : ChatBot IA ── */
const chatbotIa: ServicePage = {
  slug: "chatbot-ia",
  type: "pillar",
  category: "ChatBot IA",
  pillarSlug: undefined,
  color: "brand",
  icon: Bot,
  heroIllustration: "chatbot-web",

  metaTitle: {
    fr: "ChatBot IA Sur Mesure — GPT-4 & Claude · Multi-Canal · Déployé en Jours",
    en: "Custom AI Chatbot — GPT-4 & Claude · Multi-Channel · Deployed in Days",
  },
  metaDescription: {
    fr: "Agence chatbot IA : assistants conversationnels GPT-4 et Claude déployés sur site web, WhatsApp, Messenger, Instagram, Telegram, Slack. Qualification de leads, support 24/7, multilingue, intégré à votre CRM. +35 % de conversion, -60 % de tickets support. Audit gratuit.",
    en: "AI chatbot agency: GPT-4 and Claude conversational assistants deployed on website, WhatsApp, Messenger, Instagram, Telegram, Slack. Lead qualification, 24/7 support, multilingual, CRM-integrated. +35% conversion, -60% support tickets. Free audit.",
  },
  keywords: [
    "chatbot IA", "chatbot GPT-4", "chatbot Claude", "assistant IA conversationnel",
    "chatbot intelligent", "chatbot multi-canal", "agent conversationnel IA",
    "chatbot multilingue", "chatbot Bénin", "chatbot Afrique", "chatbot Cotonou",
    "chatbot sur mesure", "chatbot e-commerce", "chatbot site web",
    "chatbot Messenger", "chatbot Instagram", "chatbot Telegram", "chatbot WhatsApp",
    "chatbot Slack", "agence chatbot IA", "chatbot RAG",
    "chatbot entraîné sur mes données", "chatbot service client 24/7",
    "chatbot qualification leads", "chatbot Botpress Voiceflow",
  ],

  hero: {
    badge: { fr: "ChatBot IA Multi-Canal", en: "Multi-Channel AI Chatbot" },
    h1: {
      fr: "Un assistant IA déployé partout où vos clients vous parlent — qui qualifie, convertit et supporte",
      en: "An AI assistant deployed everywhere your customers reach you — that qualifies, converts and supports",
    },
    h1Highlight: {
      fr: "24h/24, dans toutes les langues",
      en: "24/7, in every language",
    },
    subtitle: {
      fr: "On conçoit pour vous un chatbot IA propulsé par GPT-4 ou Claude, entraîné sur vos données, qui vit sur votre site web, WhatsApp, Messenger, Instagram, Telegram ou Slack. Pas un robot à boutons rigides — un vrai assistant conversationnel qui comprend, raisonne et passe la main à un humain au bon moment. Conçu à Cotonou pour scaler en Afrique, en France et dans la francophonie.",
      en: "We design you an AI chatbot powered by GPT-4 or Claude, trained on your data, that lives on your website, WhatsApp, Messenger, Instagram, Telegram or Slack. Not a rigid button-bot — a real conversational assistant that understands, reasons and hands over to a human at the right moment. Built in Cotonou to scale across Africa, France and the wider francophone world.",
    },
    trustStrip: [
      { value: "7j", label: { fr: "Déploiement moyen", en: "Avg deployment" } },
      { value: "+35 %", label: { fr: "Conversions", en: "Conversions" } },
      { value: "-60 %", label: { fr: "Tickets support", en: "Support tickets" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Vous savez déjà qu'un chatbot pourrait vous faire gagner du temps. Le problème, c'est que la plupart des bots que vos clients ont déjà croisés sont décevants : menus rigides, réponses hors sujet, escalade impossible. Résultat : vous hésitez à franchir le pas, et pendant ce temps, votre service client crie au secours et vos prospects vont voir ailleurs. Voici les vraies douleurs qu'on vient résoudre — pas avec un gadget, mais avec un assistant IA qui tient ses promesses.",
      en: "You already know a chatbot could save you time. The problem is that most bots your customers have already met are disappointing: rigid menus, off-topic replies, no real handover. So you hesitate to jump in, and meanwhile your support team is drowning and your prospects head to competitors. Here are the real pains we solve — not with a gimmick, but with an AI assistant that actually delivers.",
    },
    items: [
      {
        icon: Clock,
        title: { fr: "Vos clients attendent une réponse — vous n'êtes pas là", en: "Your customers wait for an answer — you're not around" },
        desc: {
          fr: "Le soir, le week-end, pendant les pics ou en pleine réunion, personne ne répond. 82 % des consommateurs attendent une réponse en moins de 10 minutes, et 64 % choisissent la marque qui répond la première. Sans chatbot IA, vous perdez la moitié des conversations avant même de savoir qu'elles existaient.",
          en: "Evenings, weekends, peak hours or mid-meeting — no one answers. 82% of consumers expect a reply in under 10 minutes, and 64% pick the brand that answers first. Without an AI chatbot, you lose half your conversations before you even know they happened.",
        },
      },
      {
        icon: Users,
        title: { fr: "Votre support tourne en rond sur les mêmes questions", en: "Your support team loops on the same questions" },
        desc: {
          fr: "Horaires, prix, disponibilité, statut de commande, politique de retour, conditions de livraison… 70 % des messages entrants sont répétitifs. Votre équipe s'épuise, le coût par ticket explose, et les vraies réclamations — celles qui méritent un humain — restent en attente derrière des questions triviales.",
          en: "Hours, pricing, availability, order status, return policy, delivery terms… 70% of inbound messages are repetitive. Your team burns out, cost per ticket explodes, and the real complaints — the ones that deserve a human — wait in line behind trivial questions.",
        },
      },
      {
        icon: TrendingUp,
        title: { fr: "Vos visiteurs partent sans laisser de trace", en: "Your visitors leave without a trace" },
        desc: {
          fr: "Sur votre site, 97 % des visiteurs repartent sans rien faire. Pas de formulaire rempli, pas d'email laissé, pas de message envoyé. Un chatbot IA bien placé engage la conversation au bon moment, qualifie l'intention, et transforme un visiteur silencieux en prospect identifié dans votre CRM.",
          en: "On your site, 97% of visitors leave without doing anything. No form filled, no email captured, no message sent. A well-placed AI chatbot starts the conversation at the right moment, qualifies intent, and turns a silent visitor into an identified lead in your CRM.",
        },
      },
      {
        icon: MessageSquare,
        title: { fr: "Vos canaux sont éclatés, vos clients perdus", en: "Your channels are scattered, your customers lost" },
        desc: {
          fr: "Vous répondez sur Messenger, vos collègues sur WhatsApp, un freelance sur Instagram, un autre par email. Personne n'a la vue complète, les promesses se contredisent, et vos clients doivent répéter trois fois la même chose. Sans assistant IA centralisé, l'expérience est incohérente — et c'est votre marque qui en paie le prix.",
          en: "You reply on Messenger, your colleagues on WhatsApp, a freelancer on Instagram, someone else by email. No one has the full picture, promises contradict each other, and customers have to repeat themselves three times. Without a centralized AI assistant, the experience is inconsistent — and your brand pays the price.",
        },
      },
    ],
  },

  solution: {
    headline: { fr: "Un seul assistant IA, partout où vos clients vous cherchent", en: "One AI assistant, everywhere your customers look for you" },
    intro: {
      fr: "On conçoit, entraîne et déploie un assistant conversationnel unique, propulsé par GPT-4 ou Claude (selon votre besoin), qui s'exprime de la même voix sur tous vos canaux : site web, WhatsApp Business, Messenger, Instagram, Telegram, Slack, ou même votre app interne. Il connaît vos produits, vos process, vos tarifs, votre politique de retour. Il sait quand répondre, quand poser une question, et quand transférer à un humain. Voici concrètement ce qu'on livre.",
      en: "We design, train and deploy a single conversational assistant, powered by GPT-4 or Claude (depending on your case), that speaks with the same voice across all your channels: website, WhatsApp Business, Messenger, Instagram, Telegram, Slack, or even your internal app. It knows your products, your processes, your pricing, your return policy. It knows when to answer, when to ask, and when to hand over to a human. Here's exactly what we ship.",
    },
    features: [
      { icon: Sparkles, title: { fr: "Compréhension naturelle, pas un arbre de boutons", en: "Natural understanding, not a button tree" },
        desc: { fr: "Propulsé par GPT-4 ou Claude, le bot gère le langage parlé, les fautes de frappe, les sous-entendus et les questions multiples. Il s'adapte au ton de votre marque : feutré pour un cabinet d'avocats, chaleureux pour une clinique, énergique pour un e-commerce. Vos clients sentent qu'ils parlent à quelqu'un, pas à un script.", en: "Powered by GPT-4 or Claude, the bot handles casual speech, typos, subtext and multi-part questions. It adapts to your brand tone: measured for a law firm, warm for a clinic, energetic for e-commerce. Your customers feel like they're talking to someone, not reading a script." } },
      { icon: Globe, title: { fr: "Multi-canal natif : un cerveau, plusieurs visages", en: "Natively multi-channel: one brain, many faces" },
        desc: { fr: "Le même assistant répond sur votre site web (widget intégré), WhatsApp Business, Messenger, Instagram DM, Telegram et Slack. Une seule base de connaissances, un seul ton, une seule mémoire client. Vos équipes pilotent tout depuis un dashboard unique — fini les outils éparpillés.", en: "The same assistant replies on your website (embedded widget), WhatsApp Business, Messenger, Instagram DM, Telegram and Slack. One knowledge base, one tone, one customer memory. Your team manages everything from a single dashboard — no more scattered tools." } },
      { icon: FileCheck, title: { fr: "Entraîné sur vos données (RAG)", en: "Trained on your data (RAG)" },
        desc: { fr: "On ingère votre catalogue, votre FAQ, vos PDF, votre site, votre Notion ou votre HubSpot. Grâce au RAG (Retrieval-Augmented Generation), le bot répond uniquement avec vos données vérifiées — pas d'hallucinations, pas d'invention. Vous mettez à jour une fiche produit, le bot le sait dans les minutes qui suivent.", en: "We ingest your catalog, FAQ, PDFs, website, Notion or HubSpot. Thanks to RAG (Retrieval-Augmented Generation), the bot answers strictly from your verified data — no hallucinations, no fabrication. Update a product page, and the bot knows within minutes." } },
      { icon: Target, title: { fr: "Qualification, scoring et synchro CRM", en: "Qualification, scoring and CRM sync" },
        desc: { fr: "Le bot pose les bonnes questions pour identifier l'intention, le budget, l'urgence, et calcule un lead score. Chaque conversation qualifiée part automatiquement dans HubSpot, Pipedrive, Notion, Airtable ou GoHighLevel, avec le transcript et les balises commerciales — votre équipe n'a plus qu'à appeler les leads chauds.", en: "The bot asks the right questions to identify intent, budget, urgency, and computes a lead score. Every qualified conversation lands automatically in HubSpot, Pipedrive, Notion, Airtable or GoHighLevel, with the full transcript and sales tags — your team just calls the hot leads." } },
      { icon: Headphones, title: { fr: "Escalade humaine intelligente", en: "Smart human handover" },
        desc: { fr: "Le bot détecte la frustration, l'urgence, la réclamation ou la question hors périmètre, et transfère poliment à un agent avec le contexte complet (canal, historique, intention). Pendant les heures ouvrées, l'humain prend le relais en quelques secondes ; hors heures, le bot prend un message structuré et promet un retour à une heure précise.", en: "The bot detects frustration, urgency, complaints or out-of-scope questions and politely hands over to an agent with the full context (channel, history, intent). During business hours, the human takes over in seconds; out of hours, the bot takes a structured message and promises a callback at a specific time." } },
      { icon: Shield, title: { fr: "GDPR-compliant, multilingue et sous votre contrôle", en: "GDPR-compliant, multilingual and under your control" },
        desc: { fr: "Conformité RGPD/GDPR, hébergement européen ou africain selon votre besoin, consentement explicite, droit à l'oubli intégré. Le bot répond en français, anglais, espagnol, portugais, arabe, wolof, yoruba ou fon. Vous restez propriétaire des données, du prompt système et de l'historique — vous pouvez tout exporter à tout moment.", en: "GDPR-compliant, European or African hosting depending on your needs, explicit consent, built-in right to be forgotten. The bot replies in French, English, Spanish, Portuguese, Arabic, Wolof, Yoruba or Fon. You own the data, the system prompt and the history — exportable at any time." } },
    ],
  },

  howItWorks: {
    headline: { fr: "De la première discussion au bot en production — en quelques jours", en: "From first call to production bot — in a handful of days" },
    steps: [
      { icon: Search, title: { fr: "Audit & cadrage produit", en: "Product audit & scoping" }, duration: { fr: "Jours 1-2", en: "Days 1-2" },
        desc: { fr: "On part de votre activité, vos canaux actuels (site, WhatsApp, réseaux sociaux), vos questions récurrentes et vos objectifs business : qualifier des leads, désengorger le support, prendre des RDV, vendre. On définit le périmètre exact du bot, sa personnalité, ses limites et ses points d'escalade vers l'humain.", en: "We start from your business, your current channels (site, WhatsApp, social), your recurring questions and your business goals: qualify leads, offload support, book appointments, sell. We define the exact bot scope, persona, guardrails and human handover points." } },
      { icon: FileCheck, title: { fr: "Ingestion des données & design conversationnel", en: "Data ingestion & conversation design" }, duration: { fr: "Jours 2-4", en: "Days 2-4" },
        desc: { fr: "On structure et indexe votre base de connaissances (FAQ, catalogue, PDF, Notion, site web) dans une base vectorielle. On rédige les flows clés (accueil, vente, support, rendez-vous, plainte) et on définit le system prompt qui donne au bot son ton, ses règles métiers et ses garde-fous.", en: "We structure and index your knowledge base (FAQ, catalog, PDFs, Notion, website) into a vector store. We write the key conversation flows (welcome, sales, support, booking, complaint) and define the system prompt that gives the bot its tone, business rules and guardrails." } },
      { icon: Settings, title: { fr: "Build, intégrations & connexion des canaux", en: "Build, integrations & channel hookup" }, duration: { fr: "Jours 4-7", en: "Days 4-7" },
        desc: { fr: "On configure le bot sur Botpress, Voiceflow ou notre stack maison (Next.js + Vercel AI SDK), on branche GPT-4 ou Claude, et on connecte les canaux choisis : widget de site, WhatsApp Business API, Messenger, Instagram, Telegram, Slack. Toutes les intégrations passent par Make ou n8n vers votre CRM, agenda, e-commerce et outils de paiement.", en: "We configure the bot on Botpress, Voiceflow or our in-house stack (Next.js + Vercel AI SDK), wire in GPT-4 or Claude, and connect the chosen channels: site widget, WhatsApp Business API, Messenger, Instagram, Telegram, Slack. All integrations flow through Make or n8n into your CRM, calendar, e-commerce and payment tools." } },
      { icon: Rocket, title: { fr: "Tests réels, ajustements & mise en ligne", en: "Real tests, tuning & go-live" }, duration: { fr: "Jour 8", en: "Day 8" },
        desc: { fr: "On lance des dizaines de scénarios réels (clients faciles, exigeants, agacés, hors sujet), on mesure la qualité des réponses, on ajuste le prompt, les flows et l'escalade. Vous validez. Puis on met le bot en ligne — d'abord sur un canal pour observer, ensuite sur tous les autres en cascade.", en: "We run dozens of real scenarios (easy customers, demanding ones, upset ones, off-topic), measure answer quality, tune the prompt, flows and handover. You approve. Then we go live — first on one channel to observe, then rolling out to the others." } },
      { icon: Handshake, title: { fr: "Formation, suivi & optimisation continue", en: "Training, monitoring & continuous tuning" }, duration: { fr: "Semaines 2-5", en: "Weeks 2-5" },
        desc: { fr: "On forme votre équipe à la prise de relais, à la lecture du dashboard et à la mise à jour de la base de connaissances. Pendant 30 jours, on monitore les conversations avec vous, on corrige les réponses problématiques, on affine le scoring et on pousse les optimisations qui font passer le bot de bon à excellent.", en: "We train your team on handover, dashboard reading and knowledge base updates. For 30 days we monitor conversations together, fix poor answers, refine scoring and push the tweaks that take the bot from good to excellent." } },
    ],
  },

  stats: [
    { value: "+35", suffix: "%", label: { fr: "Hausse des conversions", en: "Conversion uplift" } },
    { value: "-60", suffix: "%", label: { fr: "Tickets support traités humainement", en: "Support tickets handled by humans" } },
    { value: "24/7", label: { fr: "Disponibilité multi-canal", en: "Multi-channel availability" } },
    { value: "8", suffix: "+", label: { fr: "Langues supportées", en: "Languages supported" } },
  ],

  useCases: {
    headline: { fr: "Pour qui un chatbot IA fait vraiment la différence", en: "Where an AI chatbot truly moves the needle" },
    intro: {
      fr: "Un bon chatbot IA ne fait pas la même chose pour une boutique en ligne, une clinique ou une école. Voici comment on calibre l'assistant selon votre secteur, avec les résultats concrets observés sur nos projets — au Bénin, en Côte d'Ivoire, au Sénégal, en France et au-delà.",
      en: "A good AI chatbot doesn't do the same thing for an online store, a clinic and a school. Here's how we tune the assistant by industry, with the concrete results we see in our projects — across Benin, Côte d'Ivoire, Senegal, France and beyond.",
    },
    cases: [
      { icon: ShoppingCart, sector: { fr: "E-commerce & D2C", en: "E-commerce & D2C" },
        problem: { fr: "Questions produits avant achat, suivi de commande, retours, paniers abandonnés, recommandations — le support est noyé et les conversions plafonnent.", en: "Pre-sale product questions, order tracking, returns, abandoned carts, recommendations — support drowns and conversions stall." },
        solution: { fr: "Le bot accède en temps réel à votre catalogue Shopify ou WooCommerce, recommande des produits, déclenche les relances panier sur WhatsApp et Messenger, et gère 80 % du SAV de niveau 1 sans humain.", en: "The bot taps your Shopify or WooCommerce catalog live, recommends products, triggers cart-recovery flows on WhatsApp and Messenger, and handles 80% of tier-1 support without a human." },
        result: { fr: "+35 % de conversions, 25 % de paniers récupérés, support divisé par 3.", en: "+35% conversions, 25% cart recovery, support load cut by 3." } },
      { icon: Stethoscope, sector: { fr: "Santé, cliniques & cabinets", en: "Healthcare, clinics & practices" },
        problem: { fr: "Patients qui appellent à toute heure pour des RDV, des renouvellements ou des renseignements administratifs — le secrétariat sature et les no-shows pèsent.", en: "Patients calling at all hours for appointments, renewals or admin info — front desk saturates and no-shows hurt." },
        solution: { fr: "L'assistant prend les RDV sur Google Calendar ou Doctolib via le site et WhatsApp, envoie des rappels, gère les annulations, oriente les urgences vers le bon contact et anonymise les données médicales sensibles.", en: "The assistant books appointments via Google Calendar or Doctolib on site and WhatsApp, sends reminders, handles cancellations, routes emergencies to the right contact and anonymizes sensitive medical data." },
        result: { fr: "RDV pris en 30 secondes, -40 % de no-show, secrétariat libéré sur les vrais cas.", en: "Appointments booked in 30 seconds, -40% no-shows, front desk freed up for real cases." } },
      { icon: Briefcase, sector: { fr: "B2B, SaaS & consulting", en: "B2B, SaaS & consulting" },
        problem: { fr: "Trop de leads non qualifiés noient l'équipe commerciale, le cycle de vente est long, et la documentation produit n'est jamais lue.", en: "Too many unqualified leads flood sales, the cycle is long, and product docs go unread." },
        solution: { fr: "Sur le site et Slack, le bot pré-qualifie (BANT, MEDDIC), répond aux questions techniques depuis votre documentation, propose une démo, et pousse les leads chauds dans HubSpot avec un scoring précis.", en: "On the website and Slack, the bot pre-qualifies (BANT, MEDDIC), answers technical questions from your docs, offers a demo, and pushes hot leads into HubSpot with a precise score." },
        result: { fr: "Taux de leads qualifiés x2, temps de réponse SDR divisé par 10, cycle de vente raccourci de 30 %.", en: "Qualified-lead rate 2×, SDR response time cut by 10, sales cycle 30% shorter." } },
      { icon: GraduationCap, sector: { fr: "Écoles, formations & coaching", en: "Schools, training & coaching" },
        problem: { fr: "Vagues de questions identiques en période d'inscription (programmes, tarifs, financements, débouchés), suivi des apprenants éclaté entre email, WhatsApp et plateforme.", en: "Waves of identical questions at enrollment (programs, fees, funding, outcomes), learner follow-up scattered across email, WhatsApp and LMS." },
        solution: { fr: "L'assistant répond aux questions admission sur le site et Instagram, oriente vers le bon programme, déclenche les inscriptions et envoie des rappels de devoirs ou de paiement par WhatsApp.", en: "The assistant answers admission questions on the site and Instagram, routes to the right program, triggers enrollments and sends homework or payment reminders via WhatsApp." },
        result: { fr: "+50 % de demandes traitées en autonomie, +20 % d'inscriptions converties.", en: "+50% requests handled autonomously, +20% enrollments converted." } },
    ],
  },

  stack: {
    headline: { fr: "La stack qu'on combine pour vous livrer un assistant IA solide", en: "The stack we combine to deliver a solid AI assistant" },
    intro: {
      fr: "On ne s'enferme jamais dans un seul outil : selon votre cas, votre budget et votre autonomie cible, on choisit la combinaison la plus pertinente entre plateformes no-code, frameworks open source et modèles de langage de pointe. Vous restez propriétaire de tout.",
      en: "We never lock you into one tool: depending on your case, budget and target autonomy, we pick the most relevant combination of no-code platforms, open-source frameworks and frontier language models. You own everything.",
    },
    tools: [
      { name: "GPT-4 / GPT-4o (OpenAI)", role: { fr: "Modèle principal pour la conversation naturelle et la qualification", en: "Main model for natural conversation and qualification" } },
      { name: "Claude (Anthropic)", role: { fr: "Modèle alternatif pour les longs contextes et les domaines sensibles", en: "Alternative model for long contexts and sensitive domains" } },
      { name: "Gemini (Google)", role: { fr: "Modèle complémentaire pour le multimodal (image, voix)", en: "Complementary model for multimodal (image, voice)" } },
      { name: "Botpress", role: { fr: "Orchestrateur visuel de flows et gestion des intentions", en: "Visual flow orchestrator and intent management" } },
      { name: "Voiceflow", role: { fr: "Design conversationnel et prototypage rapide", en: "Conversation design and rapid prototyping" } },
      { name: "ManyChat", role: { fr: "Plateforme Messenger, Instagram et WhatsApp pour PME", en: "Messenger, Instagram and WhatsApp platform for SMEs" } },
      { name: "WhatsApp Business API", role: { fr: "Canal officiel Meta, sans risque de bannissement", en: "Official Meta channel, no banning risk" } },
      { name: "Make / n8n / Zapier", role: { fr: "Automatisations entre le bot, le CRM, l'agenda et les paiements", en: "Automations between bot, CRM, calendar and payments" } },
      { name: "HubSpot / Pipedrive / Notion / Airtable", role: { fr: "CRM cibles pour stocker les leads qualifiés", en: "Target CRMs to store qualified leads" } },
      { name: "Pinecone / Supabase pgvector", role: { fr: "Base vectorielle pour le RAG sur vos données", en: "Vector store for RAG on your data" } },
    ],
  },

  pricing: {
    headline: { fr: "Combien coûte un chatbot IA sur mesure ?", en: "How much does a custom AI chatbot cost?" },
    intro: {
      fr: "Trois formules selon la complexité de votre cas et le nombre de canaux. Tout est sur mesure, payable en EUR, XOF ou USD (Mobile Money accepté), en une fois ou en 50/50. Pas d'abonnement caché : vous restez propriétaire du bot, du prompt et de vos données.",
      en: "Three tiers depending on case complexity and channel count. Everything is custom, payable in EUR, XOF or USD (Mobile Money accepted), upfront or 50/50. No hidden subscription: you own the bot, the prompt and your data.",
    },
    tiers: [
      { name: { fr: "Starter", en: "Starter" }, price: "200 €", priceNote: { fr: "Chatbot IA basique GPT-4, un canal", en: "Basic GPT-4 AI chatbot, one channel" },
        features: [
          { fr: "Assistant IA GPT-4 ou Claude entraîné sur votre FAQ", en: "GPT-4 or Claude assistant trained on your FAQ" },
          { fr: "Déployé sur un canal au choix (site, WhatsApp, Messenger)", en: "Deployed on one channel of choice (site, WhatsApp, Messenger)" },
          { fr: "Jusqu'à 30 questions/intentions couvertes", en: "Up to 30 questions/intents covered" },
          { fr: "Escalade simple vers un agent humain", en: "Simple handover to a human agent" },
          { fr: "Livraison en 5-7 jours · Support 30 jours", en: "Delivered in 5-7 days · 30-day support" },
        ] },
      { name: { fr: "Pro (recommandé)", en: "Pro (recommended)" }, price: "500 €", priceNote: { fr: "Multi-canal + CRM + prise de RDV", en: "Multi-channel + CRM + bookings" }, highlight: true,
        features: [
          { fr: "Tout du plan Starter", en: "Everything in Starter" },
          { fr: "Déployé sur 3 canaux (site + WhatsApp + Messenger/Instagram)", en: "Deployed on 3 channels (site + WhatsApp + Messenger/Instagram)" },
          { fr: "RAG sur votre base de connaissances complète (PDF, Notion, site)", en: "RAG on your full knowledge base (PDFs, Notion, site)" },
          { fr: "Qualification de leads + scoring + synchro CRM", en: "Lead qualification + scoring + CRM sync" },
          { fr: "Prise de RDV via Google Calendar / Calendly", en: "Appointment booking via Google Calendar / Calendly" },
          { fr: "Dashboard analytics personnalisé", en: "Custom analytics dashboard" },
          { fr: "Livraison en 10-14 jours · Support 30 jours", en: "Delivered in 10-14 days · 30-day support" },
        ] },
      { name: { fr: "Enterprise", en: "Enterprise" }, price: "à partir de 1 000 €", priceNote: { fr: "E-commerce, sur-mesure ou multi-marques", en: "E-commerce, custom or multi-brand" },
        features: [
          { fr: "Tout du plan Pro", en: "Everything in Pro" },
          { fr: "Intégration e-commerce (Shopify, WooCommerce, PrestaShop)", en: "E-commerce integration (Shopify, WooCommerce, PrestaShop)" },
          { fr: "Relances panier abandonné + paiement intégré (Stripe, PayPal, Mobile Money)", en: "Cart recovery + built-in payments (Stripe, PayPal, Mobile Money)" },
          { fr: "Multilingue avancé (FR, EN, ES, PT, AR, langues locales)", en: "Advanced multilingual (FR, EN, ES, PT, AR, local languages)" },
          { fr: "RAG sur sources multiples + mise à jour continue", en: "RAG on multiple sources + continuous updates" },
          { fr: "Conformité RGPD renforcée + hébergement dédié", en: "Reinforced GDPR compliance + dedicated hosting" },
          { fr: "Livraison en 3-6 semaines · Maintenance incluse 3 mois", en: "Delivered in 3-6 weeks · 3-month maintenance included" },
        ] },
    ],
  },

  faq: [
    { q: { fr: "Quelle différence entre un chatbot classique et un chatbot IA ?", en: "What's the difference between a classic chatbot and an AI chatbot?" },
      a: { fr: "Un chatbot classique suit des arbres de décision rigides : menus à boutons, mots-clés exacts, réponses préprogrammées. Dès qu'un client formule sa question autrement, le bot se perd. Un chatbot IA, lui, utilise un grand modèle de langage (GPT-4, Claude) pour comprendre le langage naturel, raisonner sur vos données et formuler des réponses pertinentes — même face à des questions inattendues. Chez GoScaleStudio, on ne livre que des chatbots IA : c'est la seule façon d'obtenir un vrai gain de productivité et une expérience client qui ne déçoit pas.", en: "A classic chatbot follows rigid decision trees: button menus, exact keywords, pre-programmed answers. The moment a customer phrases things differently, the bot breaks. An AI chatbot uses a large language model (GPT-4, Claude) to understand natural language, reason over your data and craft relevant answers — even for unexpected questions. At GoScaleStudio, we only ship AI chatbots: it's the only way to get real productivity gains and a customer experience that doesn't disappoint." } },
    { q: { fr: "Sur quels canaux le chatbot IA peut-il être déployé ?", en: "Which channels can the AI chatbot be deployed on?" },
      a: { fr: "Sur tous les canaux où vos clients vous parlent : site web (widget intégré, popup, plein écran), WhatsApp Business, Facebook Messenger, Instagram DM, Telegram, Slack, Microsoft Teams, Discord, et même vos propres applications via API. On peut déployer un canal seul ou plusieurs en parallèle, avec une base de connaissances unique. La plupart de nos clients commencent par le site + WhatsApp, puis ajoutent Messenger et Instagram quand les volumes grandissent.", en: "On every channel where your customers reach you: website (embedded widget, popup, full-screen), WhatsApp Business, Facebook Messenger, Instagram DM, Telegram, Slack, Microsoft Teams, Discord, and even your own apps via API. We can launch a single channel or several in parallel, sharing one knowledge base. Most clients start with website + WhatsApp, then add Messenger and Instagram as volume grows." } },
    { q: { fr: "Le bot va-t-il halluciner ou inventer des réponses ?", en: "Will the bot hallucinate or make up answers?" },
      a: { fr: "Non, parce qu'on utilise systématiquement le RAG (Retrieval-Augmented Generation) : avant chaque réponse, le bot va chercher l'information dans votre base de connaissances vérifiée (FAQ, fiches produits, PDF, Notion). Il ne génère qu'à partir de ces sources. En complément, on configure des garde-fous stricts dans le system prompt : « si tu ne sais pas, dis-le et propose un humain ». Sur nos déploiements, le taux d'hallucination est sous les 2 %, contre 15-20 % pour un bot mal configuré.", en: "No, because we always use RAG (Retrieval-Augmented Generation): before every reply, the bot fetches information from your verified knowledge base (FAQ, product sheets, PDFs, Notion). It only generates from those sources. On top, we set strict guardrails in the system prompt: \"if you don't know, say so and offer a human\". On our deployments, hallucination rate stays under 2%, versus 15-20% for a misconfigured bot." } },
    { q: { fr: "Combien de langues le chatbot peut-il gérer ?", en: "How many languages can the chatbot handle?" },
      a: { fr: "Avec GPT-4 ou Claude, le bot gère nativement plus de 50 langues sans configuration spécifique. Il détecte automatiquement la langue du message entrant et répond dans la même langue. Concrètement, nos clients déploient majoritairement en français, anglais, espagnol et portugais, mais on a aussi des bots actifs en arabe, wolof, yoruba, fon, lingala et créole. C'est un atout énorme pour les marques actives en Afrique de l'Ouest, dans la diaspora ou à l'international.", en: "With GPT-4 or Claude, the bot natively handles 50+ languages without specific config. It auto-detects the incoming language and answers in kind. Our clients mainly deploy in French, English, Spanish and Portuguese, but we also have live bots in Arabic, Wolof, Yoruba, Fon, Lingala and Creole. A massive asset for brands active in West Africa, the diaspora or globally." } },
    { q: { fr: "Comment le chatbot se connecte-t-il à mon CRM, mon agenda ou mon e-commerce ?", en: "How does the chatbot connect to my CRM, calendar or e-commerce?" },
      a: { fr: "On utilise Make, n8n ou Zapier comme couche d'intégration : à chaque événement (lead qualifié, RDV pris, panier abandonné), le bot déclenche un scénario qui crée/met à jour les données dans votre CRM (HubSpot, Pipedrive, Notion, Airtable, GoHighLevel), votre agenda (Google Calendar, Calendly, Doctolib) ou votre e-commerce (Shopify, WooCommerce). On peut aussi appeler des API custom si vous avez un système maison. Toutes les connexions sont documentées et modifiables par votre équipe.", en: "We use Make, n8n or Zapier as the integration layer: on every event (qualified lead, booked appointment, abandoned cart), the bot triggers a scenario that creates/updates data in your CRM (HubSpot, Pipedrive, Notion, Airtable, GoHighLevel), calendar (Google Calendar, Calendly, Doctolib) or e-commerce (Shopify, WooCommerce). We can also call custom APIs if you have an in-house system. All connections are documented and your team can edit them." } },
    { q: { fr: "Le chatbot est-il conforme au RGPD et où sont stockées les données ?", en: "Is the chatbot GDPR-compliant and where is the data stored?" },
      a: { fr: "Oui, on déploie tous nos bots dans le respect strict du RGPD : bandeau de consentement explicite, mention claire que l'interlocuteur est une IA, politique de confidentialité accessible, droit à l'oubli intégré (suppression des conversations sur demande). Les données peuvent être hébergées en Europe (Vercel EU, AWS Frankfurt, OVH) ou en Afrique selon votre besoin. On signe un DPA (Data Processing Agreement) si vous en avez besoin pour votre conformité interne.", en: "Yes, we deploy every bot in strict GDPR compliance: explicit consent banner, clear AI disclosure, accessible privacy policy, built-in right to be forgotten (conversation deletion on request). Data can be hosted in Europe (Vercel EU, AWS Frankfurt, OVH) or in Africa depending on your needs. We sign a DPA (Data Processing Agreement) if you need it for your internal compliance." } },
    { q: { fr: "Quels sont les coûts récurrents après la livraison ?", en: "What are the recurring costs after delivery?" },
      a: { fr: "Vous payez directement vos consommations, sans marge GoScaleStudio : l'API GPT-4 ou Claude (≈ 0,01 à 0,03 € par conversation), la WhatsApp Business API si activée (≈ 0,005 à 0,02 € par message), la plateforme orchestratrice (Botpress dès 0 €, ManyChat dès 15 $/mois), et la base vectorielle si vous utilisez Pinecone (gratuit jusqu'à un certain volume). Pour un volume PME standard, comptez 30 à 120 €/mois tout compris. Aucun abonnement chez nous, sauf si vous souscrivez au pack Maintenance optionnel.", en: "You pay your usage directly, with zero GoScaleStudio markup: GPT-4 or Claude API (~€0.01 to 0.03 per conversation), WhatsApp Business API if active (~€0.005 to 0.02 per message), the orchestrator platform (Botpress from €0, ManyChat from $15/month), and the vector store if you use Pinecone (free up to a certain volume). For standard SME volumes, budget €30 to €120/month all-in. No subscription with us unless you take the optional Maintenance pack." } },
    { q: { fr: "Peut-on tester le chatbot avant de s'engager ?", en: "Can we test the chatbot before committing?" },
      a: { fr: "Oui, et c'est même la première chose qu'on fait. Pendant l'appel découverte (30 min, gratuit), on construit en direct un mini-bot à partir d'une vraie question de vos clients pour que vous puissiez juger sur pièces. Si vous validez le projet, on garde cette démo comme socle, et on l'enrichit. Aucun engagement avant que vous ayez vu, touché et validé le résultat.", en: "Yes, and that's the very first thing we do. During the (free) 30-minute discovery call, we build a live mini-bot from a real customer question so you can judge it for yourself. If you greenlight the project, we keep that demo as a foundation and grow it. No commitment until you've seen, touched and approved the result." } },
  ],

  relatedSlugs: ["chatbot-whatsapp-business", "chatbot-gpt-site-web", "callbot-ia-vocal", "automatisation-no-code"],

  cta: {
    headline: { fr: "Prêt à confier le travail répétitif à un assistant IA — et à reprendre du temps de cerveau ?", en: "Ready to hand off the repetitive work to an AI assistant — and reclaim your brain time?" },
    desc: { fr: "30 minutes pour comprendre votre business, une démo en direct sur l'une de vos vraies questions clients, et un devis sous 24h. Pas d'abonnement, pas d'engagement, audit 100 % gratuit.", en: "30 minutes to understand your business, a live demo on one of your real customer questions, and a quote within 24h. No subscription, no commitment, 100% free audit." },
    primaryLabel: { fr: "Réserver mon audit gratuit", en: "Book my free audit" },
    secondaryLabel: { fr: "Voir tous nos services", en: "See all our services" },
  },
};

/* ── Pillar : CallBot IA & Agent Vocal ── */
const callbotIaVocal: ServicePage = {
  slug: "callbot-ia-vocal",
  type: "pillar",
  category: "CallBot IA",
  pillarSlug: undefined,
  color: "blue",
  icon: Phone,
  heroIllustration: "callbot-phone",

  metaTitle: {
    fr: "CallBot IA & Agent Vocal — Voix Premium, Disponible 24/7 · Déployé en 5-10 jours",
    en: "AI CallBot & Voice Agent — Premium Voice, Available 24/7 · Deployed in 5-10 days",
  },
  metaDescription: {
    fr: "Un callbot IA qui répond à 100 % de vos appels, prend les RDV, qualifie vos leads et fait des rappels SMS. Voix ElevenLabs/OpenAI premium, multilingue FR/EN, intégration agenda & CRM. Déployé en 5-10 jours. Audit gratuit.",
    en: "An AI callbot that answers 100% of your calls, books appointments, qualifies leads and sends SMS follow-ups. Premium ElevenLabs/OpenAI voice, multilingual EN/FR, calendar & CRM integration. Deployed in 5-10 days. Free audit.",
  },
  keywords: [
    "callbot IA", "agent vocal IA", "assistant vocal IA", "voix IA", "callbot 24/7",
    "prise de RDV automatique", "agent téléphonique IA", "callbot multilingue",
    "callbot Bénin", "callbot Afrique", "ne plus rater d'appels", "réception téléphonique IA",
    "standard téléphonique IA", "Vapi callbot", "Bland AI", "Retell AI",
    "ElevenLabs voix IA", "callbot Twilio", "voicebot français",
  ],

  hero: {
    badge: { fr: "CallBot IA & Agent Vocal", en: "AI CallBot & Voice Agent" },
    h1: {
      fr: "Un agent vocal IA qui répond à chaque appel, prend les RDV et remplit votre agenda",
      en: "An AI voice agent that answers every call, books appointments and fills your calendar",
    },
    h1Highlight: {
      fr: "24h/24, sans jamais sonner robotique",
      en: "24/7, without ever sounding robotic",
    },
    subtitle: {
      fr: "On déploie pour vous un callbot IA propulsé par Vapi, Retell ou Bland AI, avec une voix ElevenLabs ou OpenAI impossible à distinguer d'un humain. Il répond aux appels entrants, comprend votre client, prend les RDV sur votre agenda, qualifie vos leads et envoie un SMS de confirmation. Vos appels manqués deviennent des opportunités gagnées — pendant que votre équipe respire enfin.",
      en: "We deploy an AI callbot for you, powered by Vapi, Retell or Bland AI, with an ElevenLabs or OpenAI voice indistinguishable from a human. It answers inbound calls, understands your customer, books appointments in your calendar, qualifies leads and sends an SMS confirmation. Your missed calls become won opportunities — while your team finally breathes.",
    },
    trustStrip: [
      { value: "24/7", label: { fr: "Disponibilité", en: "Availability" } },
      { value: "5-10j", label: { fr: "Déploiement", en: "Deployment" } },
      { value: "0 %", label: { fr: "Appels manqués", en: "Missed calls" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Le téléphone reste le canal n°1 de prise de décision dans la majorité des secteurs : clinique, immobilier, hôtellerie, services professionnels, artisanat. Pourtant, c'est aussi le canal le plus mal géré. Un appel raté, c'est un client qui appelle ailleurs — et qui n'appellera plus jamais. Voici les quatre fuites silencieuses qui plombent vos résultats sans que vous puissiez le mesurer.",
      en: "The phone remains the #1 decision-making channel in most industries: clinics, real estate, hospitality, professional services, trades. Yet it's also the worst-managed channel. A missed call is a customer calling someone else — and never calling you again. Here are the four silent leaks dragging down your results without you being able to measure them.",
    },
    items: [
      { icon: Phone, title: { fr: "30 à 50 % de vos appels ne reçoivent jamais de réponse", en: "30 to 50% of your calls never get an answer" },
        desc: { fr: "Pause déjeuner, réunion, week-end, soirée, ligne occupée : à chaque créneau sans personne au bout du fil, c'est un prospect qui raccroche et compose le numéro du concurrent suivant. Personne ne rappelle jamais le standard d'une entreprise qui n'a pas décroché — et vous n'avez même pas le nom du client perdu.", en: "Lunch break, meeting, weekend, evening, busy line: every slot with nobody on the line is a lead hanging up and dialing the next competitor. Nobody ever calls back a business that didn't pick up — and you don't even have the lost customer's name." } },
      { icon: Clock, title: { fr: "Vos RDV se ratent à cause des no-shows et des rappels oubliés", en: "Your appointments fail because of no-shows and forgotten reminders" },
        desc: { fr: "Sans système de confirmation et de rappel automatisé, 25 à 40 % de vos RDV finissent en absence. Chaque créneau vide, c'est de l'argent perdu, un agenda déséquilibré et une équipe frustrée. Et personne n'a le temps d'appeler manuellement chaque client la veille pour confirmer.", en: "Without an automated confirmation and reminder system, 25 to 40% of your appointments end in no-shows. Every empty slot is lost revenue, a broken schedule and a frustrated team. And nobody has time to manually call every customer the day before to confirm." } },
      { icon: Headphones, title: { fr: "Votre standard coûte cher et reste saturé aux heures de pointe", en: "Your switchboard is expensive and overloaded at peak hours" },
        desc: { fr: "Une secrétaire à plein temps coûte 1 500 à 2 500 € par mois — et reste indisponible la nuit, le week-end et pendant ses congés. Un centre d'appels externalisé démarre à 800 €/mois avec une qualité aléatoire. Pendant ce temps, 80 % des appels portent sur les mêmes 10 questions qu'un agent IA pourrait traiter sans effort.", en: "A full-time receptionist costs €1,500 to €2,500 a month — and is still unavailable at night, on weekends and during holidays. An outsourced call center starts at €800/month with hit-or-miss quality. Meanwhile 80% of calls are about the same 10 questions an AI agent could handle effortlessly." } },
      { icon: Users, title: { fr: "Votre équipe perd 3 à 5 heures par jour à répondre aux mêmes questions", en: "Your team loses 3 to 5 hours a day answering the same questions" },
        desc: { fr: "Horaires, tarifs, adresse, disponibilité, modalités de paiement, durée d'une prestation… Vos collaborateurs récitent en boucle les mêmes réponses au lieu de produire de la valeur. Le coût caché de cette dispersion dépasse facilement 30 000 € par an pour une PME de 5 personnes, sans compter la fatigue mentale qui finit en turnover.", en: "Hours, pricing, address, availability, payment terms, service duration… Your team recites the same answers over and over instead of producing real value. The hidden cost of this drain easily passes €30,000 a year for a 5-person SME, not counting the mental fatigue that ends in turnover." } },
    ],
  },

  solution: {
    headline: { fr: "Un agent vocal IA qui décroche, comprend, agit — et sonne 100 % humain", en: "An AI voice agent that picks up, understands, acts — and sounds 100% human" },
    intro: {
      fr: "Oubliez la voix robotique du serveur vocal de 2010. Nos callbots IA s'appuient sur les voix ElevenLabs, OpenAI TTS et PlayHT — calibrées pour la diction française, l'intonation naturelle, les pauses respiratoires, l'accent local. Couplés à GPT-4 ou Claude pour la compréhension, et à Vapi, Retell ou Bland AI pour l'orchestration temps réel, ils tiennent une conversation fluide, exécutent des actions concrètes (RDV, transfert, envoi de SMS, ouverture de ticket) et ne perdent jamais le fil. Voici les six capacités qu'on déploie selon votre cas d'usage.",
      en: "Forget the robotic voice of 2010 IVR systems. Our AI callbots run on ElevenLabs, OpenAI TTS and PlayHT voices — tuned for English diction, natural intonation, breathing pauses, regional accents. Combined with GPT-4 or Claude for understanding, and Vapi, Retell or Bland AI for real-time orchestration, they hold fluent conversations, execute concrete actions (booking, transfer, SMS, ticket creation) and never lose the thread. Here are the six capabilities we deploy depending on your use case.",
    },
    features: [
      { icon: Clock, title: { fr: "Prise de RDV en 30 secondes sur votre agenda", en: "Appointments booked in 30 seconds on your calendar" },
        desc: { fr: "Connecté en direct à Google Calendar, Calendly, Cal.com ou Doctolib, le callbot propose les créneaux disponibles, gère les conflits, confirme le RDV à la voix, puis envoie immédiatement un SMS et un email de confirmation. Plus de jeu de ping-pong téléphonique — l'agenda se remplit pendant que vous travaillez.", en: "Plugged directly into Google Calendar, Calendly, Cal.com or Doctolib, the callbot offers available slots, handles conflicts, confirms the booking verbally, then immediately sends an SMS and email confirmation. No more phone tag — the calendar fills itself while you work." } },
      { icon: Target, title: { fr: "Qualification de leads par téléphone", en: "Lead qualification over the phone" },
        desc: { fr: "Le bot pose les bonnes questions pour identifier un prospect chaud : budget, urgence, périmètre du projet, décisionnaire. Chaque appel devient une fiche structurée dans votre CRM (HubSpot, Pipedrive, Notion, Airtable, GoHighLevel), avec un score, un résumé et l'enregistrement audio.", en: "The bot asks the right questions to spot a hot lead: budget, urgency, project scope, decision-maker. Every call becomes a structured record in your CRM (HubSpot, Pipedrive, Notion, Airtable, GoHighLevel), with a score, a summary and the audio recording." } },
      { icon: MessageSquare, title: { fr: "FAQ vocale — 80 % des appels traités sans humain", en: "Voice FAQ — 80% of calls handled without a human" },
        desc: { fr: "Horaires, adresse, prix, modalités, disponibilité, statut d'une commande, accès handicapé, langues parlées : le callbot répond instantanément à toutes les questions récurrentes. Votre équipe ne traite plus que les cas réellement complexes ou à forte valeur.", en: "Hours, address, pricing, terms, availability, order status, accessibility, languages spoken: the callbot answers all recurring questions instantly. Your team only handles cases that are genuinely complex or high-value." } },
      { icon: Handshake, title: { fr: "Escalade fluide vers un humain quand c'est nécessaire", en: "Smooth handover to a human when needed" },
        desc: { fr: "Si le bot détecte une réclamation, une urgence ou un client agacé, il transfère poliment l'appel à votre équipe — avec un résumé vocal préenregistré pour mettre l'agent en contexte en 5 secondes. Aucune frustration, aucune perte d'historique.", en: "If the bot detects a complaint, an emergency or an upset customer, it politely transfers the call to your team — with a pre-recorded voice summary that briefs the agent in 5 seconds. Zero frustration, zero context loss." } },
      { icon: Globe, title: { fr: "Multilingue : FR, EN, ES, AR, et langues africaines", en: "Multilingual: EN, FR, ES, AR, and African languages" },
        desc: { fr: "Le bot détecte automatiquement la langue de l'appelant et bascule en temps réel. Français d'Afrique, français de France, anglais, espagnol, arabe — et pour les marchés locaux, on peut ajouter une couche de compréhension fon, yoruba, wolof ou lingala. Idéal pour les clientèles internationales et les marchés diasporiques.", en: "The bot auto-detects the caller's language and switches in real time. African French, France French, English, Spanish, Arabic — and for local markets, we can layer Fon, Yoruba, Wolof or Lingala understanding. Ideal for international clienteles and diaspora markets." } },
      { icon: Sparkles, title: { fr: "SMS de suivi, rappels automatiques & transcription", en: "Follow-up SMS, automatic reminders & full transcription" },
        desc: { fr: "Après chaque appel, le bot envoie un SMS récapitulatif (lien Google Maps, fiche produit, code promo, lien de paiement). 24h avant un RDV, il rappelle automatiquement par SMS et WhatsApp. Chaque conversation est transcrite et stockée pour audit qualité et conformité — vous voyez tout, vous pilotez tout.", en: "After each call, the bot sends a recap SMS (Google Maps link, product sheet, promo code, payment link). 24h before an appointment, it auto-reminds via SMS and WhatsApp. Every conversation is transcribed and stored for quality audit and compliance — you see everything, you control everything." } },
    ],
  },

  howItWorks: {
    headline: { fr: "De l'audit au callbot opérationnel — en 5 à 10 jours", en: "From audit to working callbot — in 5 to 10 days" },
    steps: [
      { icon: Search, title: { fr: "Audit & cadrage vocal", en: "Audit & voice scoping" }, duration: { fr: "Jours 1-2", en: "Days 1-2" },
        desc: { fr: "On écoute (avec votre accord) un échantillon d'appels réels pour identifier les 20 questions les plus fréquentes, les transferts récurrents et les pics horaires. On définit le périmètre du bot, son ton (chaleureux, pro, expert), sa voix, et les actions qu'il pourra exécuter de bout en bout.", en: "With your consent, we listen to a sample of real calls to identify the 20 most frequent questions, recurring transfers and peak hours. We define the bot scope, its tone (warm, pro, expert), its voice, and the actions it can execute end-to-end." } },
      { icon: FileCheck, title: { fr: "Préparation des scripts & base de connaissances", en: "Script & knowledge base preparation" }, duration: { fr: "Jours 2-3", en: "Days 2-3" },
        desc: { fr: "On rédige les prompts conversationnels, on structure votre base de connaissances (FAQ, produits, politiques, agenda), et on choisit la voix avec vous parmi le catalogue ElevenLabs ou OpenAI. Chaque scénario est validé avant développement pour zéro surprise au déploiement.", en: "We write conversational prompts, structure your knowledge base (FAQ, products, policies, calendar), and choose the voice together from the ElevenLabs or OpenAI catalog. Every scenario is signed off before build to avoid surprises at go-live." } },
      { icon: Settings, title: { fr: "Build & intégrations temps réel", en: "Build & real-time integrations" }, duration: { fr: "Jours 3-6", en: "Days 3-6" },
        desc: { fr: "On configure le bot sur Vapi, Retell ou Bland AI selon votre cas, on branche Twilio (ou votre opérateur) pour le numéro, et on connecte tous vos outils : Google Calendar, CRM, WhatsApp pour les SMS, Make ou n8n pour les automatisations connexes. Latence finale visée : moins de 800 ms entre votre question et la réponse vocale.", en: "We configure the bot on Vapi, Retell or Bland AI based on your case, plug in Twilio (or your carrier) for the number, and connect every tool: Google Calendar, CRM, WhatsApp for SMS, Make or n8n for related automations. Target end-to-end latency: under 800 ms between your question and the spoken answer." } },
      { icon: Rocket, title: { fr: "Tests réels & mise en service", en: "Real-world tests & go-live" }, duration: { fr: "Jours 7-9", en: "Days 7-9" },
        desc: { fr: "On stress-teste le bot avec 50 à 100 appels de scénarios réels (clients fictifs, accents variés, interruptions, silences, bruit de fond), on ajuste l'intonation et les pauses, puis on transfère votre numéro principal — ou un numéro dédié — vers le callbot. Vous validez en double-écoute pendant 24h.", en: "We stress-test the bot with 50 to 100 real-world scenario calls (mock customers, varied accents, interruptions, silences, background noise), tune intonation and pauses, then forward your main number — or a dedicated one — to the callbot. You sign off via shadow listening for 24h." } },
      { icon: Handshake, title: { fr: "Formation, monitoring & support 30 jours", en: "Training, monitoring & 30-day support" }, duration: { fr: "Semaines 2-5", en: "Weeks 2-5" },
        desc: { fr: "On forme votre équipe à la lecture des transcripts, à la reprise d'appel, au pilotage du dashboard. Pendant 30 jours, on écoute un échantillon quotidien d'appels avec vous, on ajuste les réponses problématiques et on optimise les taux de prise de RDV. Vous repartez avec une documentation complète.", en: "We train your team to read transcripts, take over calls, and pilot the dashboard. For 30 days, we review a daily sample of calls together, tune problem answers and optimize booking rates. You leave with complete documentation." } },
    ],
  },

  stats: [
    { value: "24/7", label: { fr: "Disponibilité totale", en: "Total availability" } },
    { value: "-40", suffix: "%", label: { fr: "Appels manqués", en: "Missed calls" } },
    { value: "x3", label: { fr: "RDV pris vs avant", en: "Appointments vs before" } },
    { value: "100", suffix: "%", label: { fr: "Appels transcrits", en: "Calls transcribed" } },
  ],

  useCases: {
    headline: { fr: "Pour quels métiers un callbot IA change vraiment la donne ?", en: "Which businesses does an AI callbot truly transform?" },
    intro: {
      fr: "Le callbot IA n'est pas un gadget : c'est une infrastructure qui devient critique dès que vous recevez plus de 20 appels par jour. Voici quatre secteurs où l'on observe un ROI immédiat et mesurable — avec les résultats moyens constatés chez nos clients à Cotonou, Dakar, Abidjan, Paris et Lyon.",
      en: "An AI callbot isn't a gimmick: it becomes critical infrastructure as soon as you take more than 20 calls a day. Here are four sectors where we see immediate, measurable ROI — with the average results observed at our client sites in Cotonou, Dakar, Abidjan, Paris and Lyon.",
    },
    cases: [
      { icon: Stethoscope, sector: { fr: "Cliniques, cabinets & santé", en: "Clinics, practices & health" },
        problem: { fr: "Vos patients appellent en continu pour des RDV, des reports, des renouvellements d'ordonnance ou des informations administratives. Votre secrétariat sature et les urgences passent parfois après les questions banales.", en: "Your patients call constantly for bookings, reschedules, prescription renewals or admin info. Your front desk saturates and emergencies sometimes get queued behind trivial questions." },
        solution: { fr: "Le bot prend les RDV sur Doctolib ou Google Calendar, envoie des rappels SMS 24h avant, gère les annulations, oriente immédiatement les urgences vers le médecin de garde, et répond aux questions de remboursement, horaires et accès. Conformité RGPD/HDS assurée.", en: "The bot books on Doctolib or Google Calendar, sends SMS reminders 24h ahead, handles cancellations, routes emergencies straight to the on-call doctor, and answers questions about reimbursements, hours and access. GDPR/HDS compliance guaranteed." },
        result: { fr: "RDV pris en 30 secondes, -40 % de no-shows, secrétariat libéré de 60 % des appels triviaux.", en: "Appointments booked in 30 seconds, -40% no-shows, front desk freed from 60% of trivial calls." } },
      { icon: Building2, sector: { fr: "Agences immobilières", en: "Real estate agencies" },
        problem: { fr: "Vous recevez 50 à 100 appels par semaine sur des annonces, mais seuls 5 à 10 % deviennent des visites qualifiées. Vos agents passent leurs journées à qualifier au téléphone au lieu de vendre.", en: "You take 50 to 100 calls a week on listings, but only 5 to 10% turn into qualified viewings. Your agents spend their days qualifying on the phone instead of selling." },
        solution: { fr: "Le bot qualifie chaque appel (budget, type de bien, zone, financement, timing), envoie immédiatement la fiche complète par SMS ou WhatsApp, et planifie la visite directement sur l'agenda du bon agent uniquement pour les prospects sérieux.", en: "The bot qualifies every call (budget, property type, area, financing, timing), instantly sends the full listing via SMS or WhatsApp, and books the viewing straight into the right agent's calendar — but only for serious leads." },
        result: { fr: "Taux visite/appel multiplié par 3, agents +10h/semaine consacrées à la vente réelle.", en: "Call-to-viewing rate tripled, agents gain 10h/week for actual selling." } },
      { icon: GraduationCap, sector: { fr: "Services professionnels & coachs", en: "Professional services & coaches" },
        problem: { fr: "Avocats, consultants, formateurs, coachs : vos prospects appellent pour évaluer si vous êtes le bon interlocuteur. Sans assistant, vous perdez les appels en consultation — ou vous bradez votre temps en pré-qualif.", en: "Lawyers, consultants, trainers, coaches: your prospects call to gauge whether you're the right fit. Without an assistant, you miss calls while in session — or you waste your time on pre-qualification." },
        solution: { fr: "Le bot présente votre offre, qualifie le besoin, propose un appel découverte ou un audit gratuit sur Calendly, envoie votre méthodologie par email, et peut même collecter un acompte via Stripe pour réserver le créneau.", en: "The bot pitches your offer, qualifies the need, books a discovery call or free audit on Calendly, emails over your methodology, and can even take a deposit through Stripe to lock in the slot." },
        result: { fr: "+12h/semaine de focus, taux de transformation appel/proposition x2, zéro appel manqué pendant les sessions client.", en: "+12h/week of focus, call-to-proposal conversion 2× higher, zero missed calls during client sessions." } },
      { icon: ShoppingCart, sector: { fr: "Hôtellerie & restauration", en: "Hospitality & restaurants" },
        problem: { fr: "Réservations, modifications, demandes spéciales, livraisons, horaires : votre standard sonne en pleine coup de feu, et personne ne peut décrocher sans pénaliser le service en salle.", en: "Reservations, changes, special requests, deliveries, opening hours: your phone rings in the middle of the dinner rush, and nobody can pick up without hurting in-room service." },
        solution: { fr: "Le bot prend les réservations dans votre logiciel (TheFork, OpenTable, Sevenrooms), répond aux questions courantes (menu, allergies, parking, terrasse), gère les modifications et envoie les confirmations par SMS multilingue.", en: "The bot takes reservations into your booking system (TheFork, OpenTable, Sevenrooms), answers common questions (menu, allergies, parking, terrace), handles changes and sends multilingual SMS confirmations." },
        result: { fr: "+25 % de réservations capturées en heures de pointe, équipe en salle entièrement focus sur l'expérience client.", en: "+25% reservations captured during peak hours, floor team fully focused on guest experience." } },
    ],
  },

  stack: {
    headline: { fr: "La stack vocale qu'on déploie", en: "The voice stack we deploy" },
    intro: {
      fr: "On combine les meilleurs orchestrateurs vocaux temps réel, les voix les plus naturelles du marché et les modèles de langage les plus pertinents pour votre cas — le tout sans vous enfermer dans une plateforme propriétaire.",
      en: "We combine the best real-time voice orchestrators, the most natural voices on the market and the language models best suited to your case — without locking you into a proprietary platform.",
    },
    tools: [
      { name: "Vapi", role: { fr: "Orchestrateur vocal temps réel — latence < 800 ms", en: "Real-time voice orchestrator — sub-800ms latency" } },
      { name: "Retell AI", role: { fr: "Alternative premium pour conversations longues et complexes", en: "Premium alternative for long, complex conversations" } },
      { name: "Bland AI", role: { fr: "Solution scalable pour campagnes d'appels sortants", en: "Scalable solution for outbound call campaigns" } },
      { name: "Twilio", role: { fr: "Numéros locaux/internationaux, SMS, transfert d'appel", en: "Local/international numbers, SMS, call transfer" } },
      { name: "ElevenLabs", role: { fr: "Voix IA ultra-naturelles, clonage de voix possible", en: "Ultra-natural AI voices, voice cloning available" } },
      { name: "OpenAI TTS", role: { fr: "Voix premium multilingues pour B2B exigeants", en: "Premium multilingual voices for demanding B2B" } },
      { name: "GPT-4 / GPT-4o", role: { fr: "Cerveau conversationnel principal — réponses contextuelles", en: "Main conversational brain — contextual answers" } },
      { name: "Claude (Anthropic)", role: { fr: "Alternative pour secteurs régulés et longs contextes", en: "Alternative for regulated sectors and long contexts" } },
      { name: "Google Calendar / Cal.com", role: { fr: "Prise de RDV directe pendant l'appel", en: "Direct in-call appointment booking" } },
      { name: "WhatsApp Business API", role: { fr: "Envoi de SMS, rappels et récapitulatifs après appel", en: "Sends SMS, reminders and post-call summaries" } },
      { name: "Make / n8n", role: { fr: "Connexion CRM, paiement, ticketing et workflows métier", en: "CRM, payment, ticketing and business workflow integrations" } },
    ],
  },

  pricing: {
    headline: { fr: "Combien coûte votre callbot IA ?", en: "How much does your AI callbot cost?" },
    intro: {
      fr: "Trois formules selon la profondeur de vos besoins. Tout est sur mesure, payable en une fois ou 50/50 (EUR, XOF, USD, Mobile Money accepté). Sans abonnement obligatoire, sans frais cachés — vous restez propriétaire du bot, des prompts et des données.",
      en: "Three tiers based on the depth of your needs. Everything is custom, payable upfront or 50/50 (EUR, XOF, USD, Mobile Money accepted). No mandatory subscription, no hidden fees — you stay the owner of the bot, the prompts and the data.",
    },
    tiers: [
      { name: { fr: "Starter", en: "Starter" }, price: "300 €", priceNote: { fr: "Callbot FAQ vocale basique", en: "Basic FAQ voice callbot" },
        features: [
          { fr: "Numéro Twilio dédié (FR, BJ, CI, SN, USA…)", en: "Dedicated Twilio number (FR, BJ, CI, SN, USA…)" },
          { fr: "Voix premium ElevenLabs ou OpenAI au choix", en: "Premium ElevenLabs or OpenAI voice of your choice" },
          { fr: "FAQ vocale (15-25 questions traitées)", en: "Voice FAQ (15-25 questions handled)" },
          { fr: "Transfert vers votre numéro si demande complexe", en: "Transfer to your number if request is complex" },
          { fr: "Transcription complète de chaque appel", en: "Full transcript of every call" },
          { fr: "Livraison en 5-7 jours · Support 30 jours", en: "Delivered in 5-7 days · 30-day support" },
        ] },
      { name: { fr: "Pro (recommandé)", en: "Pro (recommended)" }, price: "600 €", priceNote: { fr: "Callbot complet RDV + CRM + multilingue", en: "Full callbot bookings + CRM + multilingual" }, highlight: true,
        features: [
          { fr: "Tout du plan Starter", en: "Everything in Starter" },
          { fr: "Prise de RDV directe sur Google Calendar / Cal.com / Doctolib", en: "Direct booking on Google Calendar / Cal.com / Doctolib" },
          { fr: "Qualification de leads + envoi CRM (HubSpot, Pipedrive…)", en: "Lead qualification + CRM push (HubSpot, Pipedrive…)" },
          { fr: "SMS de confirmation + rappel 24h avant", en: "SMS confirmation + 24h reminder" },
          { fr: "Multilingue FR / EN (+ langue locale au choix)", en: "Multilingual EN / FR (+ one local language)" },
          { fr: "Dashboard analytics (appels, RDV, taux d'escalade)", en: "Analytics dashboard (calls, bookings, escalation rate)" },
          { fr: "Livraison en 7-10 jours · Support 30 jours", en: "Delivered in 7-10 days · 30-day support" },
        ] },
      { name: { fr: "Enterprise", en: "Enterprise" }, price: "dès 1 500 €", priceNote: { fr: "Sur mesure & multi-flux", en: "Custom & multi-flow" },
        features: [
          { fr: "Tout du plan Pro", en: "Everything in Pro" },
          { fr: "Campagnes d'appels sortants (relances, rappels, sondages)", en: "Outbound call campaigns (follow-ups, reminders, surveys)" },
          { fr: "Multi-numéros, multi-équipes, routage intelligent", en: "Multi-number, multi-team, intelligent routing" },
          { fr: "Intégrations sur mesure (ERP, ticketing, paiement Mobile Money)", en: "Custom integrations (ERP, ticketing, Mobile Money payment)" },
          { fr: "Clonage vocal de votre porte-parole (avec accord)", en: "Voice cloning of your spokesperson (with consent)" },
          { fr: "Conformité RGPD / HDS / PCI selon votre secteur", en: "GDPR / HDS / PCI compliance per your sector" },
          { fr: "Livraison en 2-4 semaines · Maintenance incluse 90 jours", en: "Delivered in 2-4 weeks · 90-day maintenance included" },
        ] },
    ],
  },

  faq: [
    { q: { fr: "La voix du callbot ressemble-t-elle vraiment à celle d'un humain ?", en: "Does the callbot voice really sound human?" },
      a: { fr: "Oui — et c'est la différence majeure avec les serveurs vocaux d'il y a 5 ans. On utilise ElevenLabs ou OpenAI TTS, qui restituent l'intonation, les pauses respiratoires, les variations de débit et même les hésitations naturelles. Dans nos tests à l'aveugle sur nos clients, 7 personnes sur 10 ne devinent pas qu'elles parlent à une IA pendant les 30 premières secondes. Pour les secteurs où la transparence est requise (santé, juridique), on peut programmer le bot pour qu'il se présente comme assistant virtuel dès la prise de ligne.", en: "Yes — and that's the major difference with IVR systems from 5 years ago. We use ElevenLabs or OpenAI TTS, which deliver intonation, breathing pauses, pace variation and even natural hesitations. In our blind tests with clients, 7 out of 10 people don't realize they're talking to AI during the first 30 seconds. For sectors requiring transparency (health, legal), we can program the bot to introduce itself as a virtual assistant from the start." } },
    { q: { fr: "Le bot comprend-il les accents africains, le franglais, les expressions locales ?", en: "Does the bot understand African accents, code-switching, local expressions?" },
      a: { fr: "Oui. Les modèles de reconnaissance vocale qu'on utilise (Whisper, Deepgram Nova) sont entraînés sur des dizaines de variantes du français : France, Belgique, Québec, Afrique de l'Ouest, Maghreb. Pour le marché béninois, ivoirien ou sénégalais, on calibre le bot avec des échantillons locaux et on ajuste les prompts pour qu'il comprenne le franglais, le nouchi, ou les expressions courantes. Si certaines tournures coincent, on les ajoute manuellement dans les premiers jours.", en: "Yes. The speech recognition models we use (Whisper, Deepgram Nova) are trained on dozens of variants: French (France, Belgium, Quebec, West Africa, Maghreb), English (US, UK, Africa, India). For the Beninese, Ivorian or Senegalese market, we calibrate the bot with local samples and tune prompts to handle code-switching and local expressions. If anything trips it up, we add it manually in the first days." } },
    { q: { fr: "Combien coûte un appel en frais récurrents ?", en: "What does a single call cost in recurring fees?" },
      a: { fr: "Comptez en moyenne 0,08 à 0,15 € par minute d'appel tout compris : numéro Twilio (~0,01 €/min), reconnaissance vocale (~0,02 €/min), GPT-4 (~0,03 €/min), voix ElevenLabs/OpenAI (~0,03 €/min), orchestrateur Vapi (~0,01 €/min). Pour une PME recevant 500 appels par mois d'une durée moyenne de 2 minutes, comptez 80 à 150 €/mois tout compris — soit 5 à 10 fois moins cher qu'une secrétaire et infiniment plus rapide. Vous payez Twilio et les providers en direct ; aucune marge GoScaleStudio sur l'usage.", en: "Budget on average €0.08 to €0.15 per call minute all-in: Twilio number (~€0.01/min), speech recognition (~€0.02/min), GPT-4 (~€0.03/min), ElevenLabs/OpenAI voice (~€0.03/min), Vapi orchestrator (~€0.01/min). For an SME taking 500 calls a month of 2-minute average duration, budget €80 to €150/month all-in — 5 to 10× cheaper than a receptionist and infinitely faster. You pay Twilio and providers directly; zero GoScaleStudio margin on usage." } },
    { q: { fr: "Quelles langues le callbot peut-il gérer ?", en: "Which languages can the callbot handle?" },
      a: { fr: "Plus de 30 langues nativement avec OpenAI TTS et ElevenLabs : français, anglais, espagnol, portugais, arabe, allemand, italien, mandarin, hindi… Pour les langues africaines (wolof, yoruba, fon, lingala, swahili), on peut soit utiliser une compréhension hybride (texte traduit puis répondu en français), soit construire un module spécifique avec des modèles open source. Le bot bascule automatiquement dans la langue détectée dès la première phrase de l'appelant — sans menu de sélection, sans friction.", en: "30+ languages natively via OpenAI TTS and ElevenLabs: English, French, Spanish, Portuguese, Arabic, German, Italian, Mandarin, Hindi… For African languages (Wolof, Yoruba, Fon, Lingala, Swahili), we can either use hybrid understanding (translated text then answered in French/English) or build a specific module with open-source models. The bot auto-switches to the detected language from the caller's first sentence — no selection menu, no friction." } },
    { q: { fr: "Comment l'intégration agenda fonctionne-t-elle concrètement ?", en: "How does the calendar integration actually work?" },
      a: { fr: "On connecte le bot à votre agenda principal (Google Calendar, Cal.com, Calendly, Doctolib, Outlook 365) via leur API officielle. Pendant l'appel, le bot voit les créneaux disponibles en temps réel, propose deux ou trois choix à voix, bloque le créneau dès l'accord du client, puis envoie un événement avec le numéro de l'appelant, le motif du RDV et un lien de visio si besoin. Il gère également les annulations et les déplacements de RDV de la même façon. Plusieurs agendas multi-praticiens ou multi-équipes sont supportés.", en: "We connect the bot to your main calendar (Google Calendar, Cal.com, Calendly, Doctolib, Outlook 365) via their official API. During the call, the bot sees available slots in real time, offers two or three voice choices, blocks the slot the moment the customer agrees, then sends an event with the caller's number, the appointment reason and a video link if needed. It handles cancellations and reschedules the same way. Multi-practitioner and multi-team calendars are fully supported." } },
    { q: { fr: "Comment un humain reprend-il un appel en cours si nécessaire ?", en: "How does a human take over a call in progress if needed?" },
      a: { fr: "Deux mécanismes. Premièrement, l'escalade automatique : si le bot détecte un mot-clé sensible (« urgence », « réclamation », « avocat », « plainte »), un ton agacé ou une question hors-périmètre, il dit poliment « Je vous transfère immédiatement à mon collègue » et bascule l'appel vers votre ligne. Deuxièmement, l'escalade manuelle : depuis votre dashboard, vous voyez les appels en direct et pouvez intervenir en un clic. Dans les deux cas, l'agent humain reçoit un résumé écrit ou vocal du contexte avant de prendre la parole — zéro frustration côté client.", en: "Two mechanisms. First, automatic escalation: if the bot detects a sensitive keyword (\"emergency\", \"complaint\", \"lawyer\", \"refund\"), an irritated tone or an out-of-scope question, it politely says \"I'll transfer you to my colleague right away\" and forwards the call to your line. Second, manual escalation: from your dashboard, you see live calls and can jump in with one click. In both cases, the human agent receives a written or voice summary of the context before speaking — zero customer frustration." } },
    { q: { fr: "Le callbot est-il conforme RGPD / HDS / réglementations locales ?", en: "Is the callbot GDPR / HDS / local-regulation compliant?" },
      a: { fr: "Oui. Pour les clients européens, on configure un hébergement des données en UE (Twilio EU, OpenAI EU), une politique de rétention claire (suppression auto à 30, 90 ou 365 jours selon votre choix), un consentement explicite à l'enregistrement annoncé au début de l'appel, et un registre des traitements prêt à fournir. Pour le secteur santé, on peut basculer sur des modèles HDS-compatibles. Pour le Bénin, la Côte d'Ivoire et le Sénégal, on respecte les lois locales de protection des données (loi 2017-20 au Bénin, loi 2018-975 en CI, loi 2008-12 au Sénégal).", en: "Yes. For European clients, we configure EU data hosting (Twilio EU, OpenAI EU), a clear retention policy (auto-deletion at 30, 90 or 365 days as you choose), explicit recording consent announced at call start, and a ready-to-share data processing registry. For health sectors, we can switch to HDS-compatible models. For Benin, Côte d'Ivoire and Senegal, we respect local data protection laws (law 2017-20 in Benin, law 2018-975 in CI, law 2008-12 in Senegal)." } },
    { q: { fr: "Peut-on tester le callbot avant de s'engager ?", en: "Can we test the callbot before committing?" },
      a: { fr: "Oui, et c'est même fortement recommandé. Pendant l'appel découverte (gratuit, 30 minutes), on vous envoie un numéro de test avec un mini-callbot pré-configuré sur l'un de vos cas d'usage réel. Vous l'appelez en direct, vous testez les scénarios, vous écoutez la voix, vous validez la fluidité. Si vous lancez le projet, on garde cette démo comme socle de départ — vous ne payez jamais à l'aveugle.", en: "Yes, and it's strongly recommended. During the (free, 30-minute) discovery call, we send you a test number with a mini-callbot pre-configured on one of your real use cases. You call it live, test scenarios, hear the voice, validate the smoothness. If you launch the project, we keep that demo as the starting point — you never pay blind." } },
  ],

  relatedSlugs: ["callbot-vapi", "agent-vocal-ia-24-7", "chatbot-whatsapp-business", "automatisation-no-code"],

  cta: {
    headline: { fr: "Et si chaque appel devenait une opportunité gagnée, dès la semaine prochaine ?", en: "What if every call became a won opportunity, starting next week?" },
    desc: { fr: "30 minutes pour comprendre vos besoins, un numéro de démo dans les 24h, un callbot opérationnel en 5 à 10 jours. Audit 100 % gratuit, sans engagement — et un test vocal en direct pendant l'appel découverte.", en: "30 minutes to understand your needs, a demo number within 24h, a working callbot in 5 to 10 days. 100% free audit, no commitment — and a live voice test during the discovery call." },
    primaryLabel: { fr: "Réserver mon audit gratuit", en: "Book my free audit" },
    secondaryLabel: { fr: "Voir tous nos services", en: "See all our services" },
  },
};

/* ── Pillar : Site WordPress + SEO ── */
const siteWordpressSeo: ServicePage = {
  slug: "site-wordpress-seo",
  type: "pillar",
  category: "WordPress + SEO",
  pillarSlug: undefined,
  color: "purple",
  icon: Globe,
  heroIllustration: "wordpress-seo",

  metaTitle: {
    fr: "Site WordPress + SEO sur Mesure — Rapide < 2s, Page 1 Google",
    en: "Custom WordPress Site + SEO — <2s Load, Page 1 on Google",
  },
  metaDescription: {
    fr: "Création de sites WordPress + Elementor optimisés SEO. Vitesse < 2s, score PageSpeed 90+, RankMath, contenu rédigé, netlinking. Page 1 Google en 3-6 mois. Audit SEO gratuit.",
    en: "WordPress + Elementor sites optimized for SEO. <2s load time, 90+ PageSpeed score, RankMath, content writing, link-building. Google page 1 in 3-6 months. Free SEO audit.",
  },
  keywords: [
    "site WordPress", "site web Bénin", "création site WordPress Cotonou",
    "SEO WordPress", "WordPress Elementor", "site rapide WordPress",
    "référencement Google", "RankMath SEO", "page 1 Google",
    "site vitrine professionnel", "site e-commerce WordPress", "WooCommerce Bénin",
    "agence WordPress Afrique", "audit SEO gratuit", "Core Web Vitals",
    "site mobile-first", "hébergement WordPress", "schema.org WordPress",
  ],

  hero: {
    badge: { fr: "Site WordPress + SEO", en: "WordPress Site + SEO" },
    h1: {
      fr: "Un site WordPress rapide, beau et qui sort vraiment sur Google",
      en: "A WordPress site that's fast, beautiful and actually ranks on Google",
    },
    h1Highlight: { fr: "Page 1 en 3-6 mois", en: "Page 1 in 3-6 months" },
    subtitle: {
      fr: "On construit votre site WordPress + Elementor entièrement sur mesure, optimisé pour la vitesse (< 2s), le SEO technique (RankMath, schema, sitemap) et la conversion. Contenu rédigé pour les bons mots-clés, design moderne mobile-first, et formation incluse pour que vous gardiez la main à 100 %.",
      en: "We build your WordPress + Elementor site fully custom, optimized for speed (<2s), technical SEO (RankMath, schema, sitemap) and conversion. Content written for the right keywords, modern mobile-first design, and training included so you stay 100% in control.",
    },
    trustStrip: [
      { value: "98/100", label: { fr: "Score PageSpeed", en: "PageSpeed score" } },
      { value: "< 2s", label: { fr: "Temps de chargement", en: "Load time" } },
      { value: "x5", label: { fr: "Trafic organique moyen", en: "Avg organic traffic" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Un site web n'est pas une plaquette. C'est votre premier commercial, votre vitrine ouverte 24h/24, et — quand il est bien construit — votre meilleur canal d'acquisition. Pourtant, 80 % des sites WordPress qu'on audite sont lents, invisibles sur Google, mal pensés pour la conversion et impossibles à maintenir pour leur propriétaire. Voici les quatre erreurs qui plombent votre site aujourd'hui et qui vous coûtent vraiment cher.",
      en: "A website isn't a brochure. It's your first salesperson, your storefront open 24/7, and — when built right — your best acquisition channel. Yet 80% of the WordPress sites we audit are slow, invisible on Google, badly designed for conversion, and impossible for their owner to maintain. Here are the four mistakes plaguing your site today, and what they really cost you.",
    },
    items: [
      { icon: Search, title: { fr: "Votre site est invisible sur Google", en: "Your site is invisible on Google" },
        desc: { fr: "Vous tapez le nom de votre activité + votre ville, et vous n'apparaissez nulle part en première page. Sans SEO technique, sans contenu optimisé et sans netlinking, Google ne voit pas votre site — et vos prospects atterrissent chez vos concurrents qui, eux, ont fait le travail. Chaque mois passé en page 2 ou 3 représente des dizaines de clients perdus.", en: "Type your business name + city and you're nowhere on page one. Without technical SEO, optimized content and link-building, Google doesn't see your site — and your prospects land on competitors who did the work. Every month spent on page 2 or 3 is dozens of lost customers." } },
      { icon: Zap, title: { fr: "Votre site met 6 secondes à charger", en: "Your site takes 6 seconds to load" },
        desc: { fr: "53 % des visiteurs mobiles quittent un site qui met plus de 3 secondes à s'afficher. Si le vôtre rame, vous perdez la moitié de votre trafic avant même la première page vue. Pire, Google pénalise les sites lents au classement — la lenteur tue le SEO autant que le chiffre d'affaires.", en: "53% of mobile visitors abandon a site that takes more than 3 seconds to load. If yours lags, you lose half your traffic before the first page view. Worse, Google penalizes slow sites in rankings — slowness kills SEO as much as revenue." } },
      { icon: Palette, title: { fr: "Votre design fait 2014", en: "Your design looks straight out of 2014" },
        desc: { fr: "Un thème WordPress générique acheté à 40 € sur ThemeForest, un logo flou, des photos trouvées sur Google Images, des couleurs criardes. Résultat : 87 % des visiteurs jugent votre crédibilité sur le design en moins de 3 secondes — et vous perdez la confiance avant même d'avoir parlé.", en: "A generic $40 ThemeForest template, a blurry logo, stock photos from Google Images, garish colors. Result: 87% of visitors judge your credibility on design in under 3 seconds — and you lose trust before even saying a word." } },
      { icon: TrendingUp, title: { fr: "Votre site ne convertit personne", en: "Your site converts no one" },
        desc: { fr: "Pas de call-to-action clair, pas de formulaire visible, pas de preuve sociale, pas de tunnel de vente. Les rares visiteurs qui arrivent partent sans laisser leur email, sans appeler, sans rien. Votre site est un dépliant en ligne, pas une machine à leads — et chaque mois sans conversion est de l'argent jeté par la fenêtre.", en: "No clear call-to-action, no visible form, no social proof, no sales funnel. The rare visitors who land leave without an email, without a call, without anything. Your site is an online flyer, not a lead machine — and every month without conversion is money down the drain." } },
    ],
  },

  solution: {
    headline: { fr: "Un site WordPress sur mesure, taillé pour Google et pour vos clients", en: "A custom WordPress site, built for Google and for your customers" },
    intro: {
      fr: "On ne livre pas un thème déguisé. On construit votre site entièrement sur Elementor Pro, avec une architecture pensée pour le SEO technique (RankMath, schema.org, sitemap dynamique), une vitesse optimisée jusqu'à atteindre 90+/100 sur PageSpeed Insights, un design moderne mobile-first calé sur votre identité de marque, et un contenu rédigé pour les bons mots-clés. Vous repartez avec un site dont vous êtes propriétaire à 100 %, que vous pouvez modifier vous-même, et qui travaille pour vous chaque jour.",
      en: "We don't ship a re-skinned template. We build your site entirely on Elementor Pro, with architecture engineered for technical SEO (RankMath, schema.org, dynamic sitemap), speed tuned until you hit 90+/100 on PageSpeed Insights, modern mobile-first design aligned with your brand identity, and content written for the right keywords. You walk away owning the site 100%, able to edit it yourself, working for you every day.",
    },
    features: [
      { icon: Zap, title: { fr: "Vitesse < 2 secondes garantie", en: "Guaranteed <2 second load time" },
        desc: { fr: "Compression d'images en WebP, lazy loading, mise en cache via WP Rocket, CDN Cloudflare, minification CSS/JS, hébergement optimisé WordPress. Score PageSpeed cible : 90+/100 sur mobile et desktop. Conformité Core Web Vitals (LCP, FID, CLS) systématique.", en: "Image compression to WebP, lazy loading, caching via WP Rocket, Cloudflare CDN, CSS/JS minification, WordPress-optimized hosting. PageSpeed target: 90+/100 on mobile and desktop. Systematic Core Web Vitals compliance (LCP, FID, CLS)." } },
      { icon: Search, title: { fr: "SEO technique pro avec RankMath", en: "Pro technical SEO with RankMath" },
        desc: { fr: "Installation et configuration complète de RankMath Pro (ou Yoast Premium au choix) : balises title et meta optimisées par page, sitemap XML dynamique, fichier robots.txt, redirections 301, données structurées schema.org (LocalBusiness, Product, Article, FAQ, Review). Google et Bing comprennent enfin de quoi parle votre site.", en: "Full install and config of RankMath Pro (or Yoast Premium if you prefer): per-page optimized title and meta tags, dynamic XML sitemap, robots.txt, 301 redirects, schema.org structured data (LocalBusiness, Product, Article, FAQ, Review). Google and Bing finally understand what your site is about." } },
      { icon: FileCheck, title: { fr: "Contenu rédigé pour les bons mots-clés", en: "Content written for the right keywords" },
        desc: { fr: "Recherche de mots-clés ciblés avec SEMrush ou Ahrefs, rédaction de pages piliers (1500+ mots), articles de blog SEO friendly, balises Hn structurées, maillage interne optimisé. On rédige pour Google ET pour l'humain — pas du bourrage de mots-clés, du contenu utile qui répond aux intentions de recherche.", en: "Targeted keyword research with SEMrush or Ahrefs, writing of pillar pages (1500+ words), SEO-friendly blog articles, structured Hn tags, optimized internal linking. We write for Google AND humans — no keyword stuffing, just useful content that answers search intent." } },
      { icon: Eye, title: { fr: "Design moderne et mobile-first", en: "Modern, mobile-first design" },
        desc: { fr: "Maquette Figma validée avant développement, design 100 % sur mesure dans votre identité visuelle, animations subtiles, typographies premium (Google Fonts auto-hébergées pour la vitesse), accessibilité WCAG AA. Le site est pensé mobile d'abord — c'est là que 70 % de votre trafic arrive.", en: "Figma mockup validated before development, 100% custom design in your visual identity, subtle animations, premium typography (Google Fonts self-hosted for speed), WCAG AA accessibility. The site is mobile-first by design — that's where 70% of your traffic lands." } },
      { icon: Target, title: { fr: "Pensé pour convertir, pas juste pour exister", en: "Built to convert, not just to exist" },
        desc: { fr: "Hiérarchie visuelle claire, CTA contextuels sur chaque page, formulaires courts (WPForms ou Gravity Forms), preuves sociales mises en avant (témoignages, logos clients, chiffres), tunnels de conversion pour les pages de service. Chaque section a un objectif : informer, rassurer, convertir.", en: "Clear visual hierarchy, contextual CTAs on every page, short forms (WPForms or Gravity Forms), social proof front and center (testimonials, client logos, numbers), conversion funnels on service pages. Every section has a goal: inform, reassure, convert." } },
      { icon: ShoppingCart, title: { fr: "E-commerce WooCommerce optionnel", en: "Optional WooCommerce e-commerce" },
        desc: { fr: "Si vous vendez en ligne, on intègre WooCommerce avec paiements Stripe, PayPal et Mobile Money (Orange Money, MTN, Moov), gestion des stocks, transporteurs (DHL, Chronopost, local Bénin), TVA automatique, factures PDF. Le tout compatible RGPD et avec les obligations légales locales.", en: "If you sell online, we integrate WooCommerce with Stripe, PayPal and Mobile Money payments (Orange Money, MTN, Moov), stock management, carriers (DHL, Chronopost, Benin local), automatic VAT, PDF invoices. All GDPR-compliant and aligned with local legal obligations." } },
    ],
  },

  howItWorks: {
    headline: { fr: "De la première discussion au site en ligne — étape par étape", en: "From first chat to live site — step by step" },
    steps: [
      { icon: Search, title: { fr: "Audit & cadrage stratégique", en: "Audit & strategic scoping" }, duration: { fr: "Semaine 1", en: "Week 1" },
        desc: { fr: "On démarre par un audit complet : analyse de votre site existant (s'il y en a un), étude des concurrents directs, recherche de mots-clés cibles avec SEMrush ou Ahrefs, définition de l'arborescence et des pages prioritaires. On en sort avec un cahier des charges clair et un plan SEO réaliste pour atteindre la page 1 sur vos mots-clés.", en: "We start with a full audit: analysis of your existing site (if any), direct competitor study, targeted keyword research with SEMrush or Ahrefs, sitemap and priority-page definition. You walk out with a clear spec and a realistic SEO plan to hit page 1 on your keywords." } },
      { icon: Palette, title: { fr: "Wireframes & maquette Figma", en: "Wireframes & Figma mockup" }, duration: { fr: "Semaine 2", en: "Week 2" },
        desc: { fr: "On dessine les wireframes basse fidélité de chaque page (architecture, hiérarchie, blocs de contenu), puis on passe à la maquette haute fidélité dans Figma — pixel-perfect, mobile et desktop, prête à valider. Vous voyez exactement ce que sera votre site avant qu'on touche WordPress.", en: "We draw low-fidelity wireframes for each page (architecture, hierarchy, content blocks), then move to a high-fidelity Figma mockup — pixel-perfect, mobile and desktop, ready to approve. You see exactly what your site will look like before we touch WordPress." } },
      { icon: Settings, title: { fr: "Build WordPress + Elementor", en: "WordPress + Elementor build" }, duration: { fr: "Semaine 3", en: "Week 3" },
        desc: { fr: "On installe WordPress sur un hébergement optimisé (o2switch, Kinsta ou Hostinger Business selon le budget), on configure Elementor Pro et on développe chaque page à partir de la maquette. Code propre, balises sémantiques, accessibilité, responsive parfait sur mobile, tablette et desktop.", en: "We install WordPress on optimized hosting (o2switch, Kinsta or Hostinger Business depending on budget), configure Elementor Pro and build each page from the mockup. Clean code, semantic tags, accessibility, perfect responsive on mobile, tablet and desktop." } },
      { icon: Rocket, title: { fr: "Optimisation SEO technique & vitesse", en: "Technical SEO & speed optimization" }, duration: { fr: "Semaine 4", en: "Week 4" },
        desc: { fr: "Configuration de RankMath, génération du sitemap, soumission à Google Search Console et Bing Webmaster Tools, mise en place du schema.org, optimisation des images en WebP, activation WP Rocket et Cloudflare, audit PageSpeed jusqu'à atteindre 90+/100. Conformité RGPD (bannière cookies, mentions légales, politique de confidentialité).", en: "RankMath setup, sitemap generation, submission to Google Search Console and Bing Webmaster Tools, schema.org implementation, image optimization to WebP, WP Rocket and Cloudflare activation, PageSpeed audit until hitting 90+/100. GDPR compliance (cookie banner, legal mentions, privacy policy)." } },
      { icon: Handshake, title: { fr: "Mise en ligne, formation & suivi", en: "Go-live, training & follow-up" }, duration: { fr: "Semaine 5 + suivi", en: "Week 5 + follow-up" },
        desc: { fr: "Migration vers votre domaine final, derniers tests cross-browser, mise en ligne officielle. On vous forme pendant 2h à Elementor et RankMath — vous saurez modifier vos pages, ajouter des articles, optimiser le SEO. Pendant 30 jours, support illimité et premier rapport de positionnement Google après 60 jours.", en: "Migration to your final domain, last cross-browser tests, official go-live. We train you for 2h on Elementor and RankMath — you'll know how to edit pages, add articles, optimize SEO. For 30 days, unlimited support and first Google ranking report after 60 days." } },
    ],
  },

  stats: [
    { value: "< 2", suffix: "s", label: { fr: "Temps de chargement", en: "Load time" } },
    { value: "98", suffix: "/100", label: { fr: "Score PageSpeed moyen", en: "Avg PageSpeed score" } },
    { value: "x5", label: { fr: "Trafic organique en 6 mois", en: "Organic traffic in 6 months" } },
    { value: "+200", suffix: "%", label: { fr: "Conversions post-refonte", en: "Conversions post-revamp" } },
  ],

  useCases: {
    headline: { fr: "Pour qui ce type de site WordPress est-il vraiment fait ?", en: "Who is this kind of WordPress site really for?" },
    intro: {
      fr: "WordPress est le CMS le plus polyvalent du marché : il propulse 43 % des sites web mondiaux, de la petite vitrine au site e-commerce à 7 chiffres. Voici comment on adapte concrètement le projet selon votre activité, avec les résultats moyens observés sur nos projets clients en Afrique et en francophonie.",
      en: "WordPress is the most versatile CMS on the market: it powers 43% of websites worldwide, from small showcases to 7-figure e-commerce. Here's how we concretely adapt the project to your business, with the average results we've seen across our African and francophone client projects.",
    },
    cases: [
      { icon: Building2, sector: { fr: "Cabinets conseil & B2B", en: "Consulting firms & B2B" },
        problem: { fr: "Votre site actuel ressemble à un CV en ligne. Vous gagnez peu de leads inbound et chaque prospect arrive par bouche-à-oreille ou LinkedIn — jamais par Google.", en: "Your current site looks like an online resume. You barely get inbound leads, every prospect comes through word-of-mouth or LinkedIn — never Google." },
        solution: { fr: "On construit un site vitrine premium avec pages services optimisées SEO, blog d'autorité, études de cas chiffrées, formulaire de devis. Architecture pensée pour ranker sur les mots-clés métier locaux (\"consultant stratégie Cotonou\", \"avocat affaires Bénin\").", en: "We build a premium showcase site with SEO-optimized service pages, authority blog, quantified case studies, quote form. Architecture engineered to rank on local industry keywords (\"strategy consultant Cotonou\", \"business lawyer Benin\")." },
        result: { fr: "Page 1 Google sous 4 mois sur 8-12 mots-clés ciblés, +150 % de leads inbound qualifiés.", en: "Page 1 on Google within 4 months on 8-12 targeted keywords, +150% qualified inbound leads." } },
      { icon: ShoppingCart, sector: { fr: "E-commerce local & retail", en: "Local e-commerce & retail" },
        problem: { fr: "Vous vendez sur Instagram ou WhatsApp mais vous n'avez aucun moyen de capter des clients qui ne vous connaissent pas déjà. Pas de paiement automatisé, pas de suivi de commande, pas de scalabilité.", en: "You sell on Instagram or WhatsApp but have no way to capture customers who don't already know you. No automated payments, no order tracking, no scalability." },
        solution: { fr: "Site WooCommerce complet avec catalogue produits, paiements Mobile Money (Orange Money, MTN), Stripe et PayPal, gestion des stocks, fiches produit SEO optimisées, suivi de commande, automatisation des emails transactionnels.", en: "Full WooCommerce site with product catalog, Mobile Money payments (Orange Money, MTN), Stripe and PayPal, stock management, SEO-optimized product pages, order tracking, automated transactional emails." },
        result: { fr: "Première vente organique dès le 2e mois, x3 de CA en 6 mois, taux de conversion moyen 2,8 %.", en: "First organic sale by month 2, 3× revenue in 6 months, 2.8% average conversion rate." } },
      { icon: Stethoscope, sector: { fr: "Cliniques, cabinets santé & professions libérales", en: "Clinics, health practices & liberal professions" },
        problem: { fr: "Les patients vous trouvent par hasard, jamais en cherchant votre spécialité. Pas de prise de RDV en ligne, pas d'information claire sur vos services, pas de réassurance pour les nouveaux patients.", en: "Patients find you by chance, never by searching your specialty. No online booking, no clear info about your services, no reassurance for new patients." },
        solution: { fr: "Site rassurant et conforme RGPD, prise de RDV en ligne intégrée (Calendly ou WP Booking), fiches de spécialités optimisées, blog santé pour ranker sur les requêtes \"symptômes\" et \"traitement\", témoignages patients vérifiés.", en: "Reassuring, GDPR-compliant site, integrated online booking (Calendly or WP Booking), optimized specialty pages, health blog to rank on \"symptoms\" and \"treatment\" queries, verified patient testimonials." },
        result: { fr: "+80 % de nouveaux patients via Google en 6 mois, planning rempli automatiquement.", en: "+80% new patients via Google in 6 months, calendar fills itself." } },
      { icon: Briefcase, sector: { fr: "Indépendants, coachs & créateurs", en: "Freelancers, coaches & creators" },
        problem: { fr: "Vous avez une offre claire mais aucun moyen de capter des prospects en automatique. Votre site actuel (Wix, Webflow gratuit, page Linktree) ne ranke pas et ne convertit pas.", en: "You have a clear offer but no way to capture prospects automatically. Your current site (Wix, free Webflow, Linktree page) doesn't rank and doesn't convert." },
        solution: { fr: "Site personal brand percutant : page d'accueil orientée tunnel, page méthode SEO optimisée, blog d'autorité, lead magnet (PDF ou audit gratuit), intégration Calendly ou Stripe Checkout pour vendre directement vos programmes.", en: "Punchy personal-brand site: funnel-oriented homepage, SEO-optimized method page, authority blog, lead magnet (PDF or free audit), Calendly or Stripe Checkout integration to sell your programs directly." },
        result: { fr: "Premier client inbound via Google dès le 3e mois, +400 % de prospects qualifiés sur 12 mois.", en: "First inbound client via Google by month 3, +400% qualified leads over 12 months." } },
    ],
  },

  stack: {
    headline: { fr: "La stack technique qu'on déploie", en: "The tech stack we deploy" },
    intro: {
      fr: "On utilise uniquement des outils éprouvés, supportés par de larges communautés et facilement reprenables par d'autres équipes. Pas de plugin obscur, pas de dépendance bizarre — vous restez totalement libre de votre site.",
      en: "We only use battle-tested tools backed by large communities and easily picked up by other teams. No obscure plugins, no weird dependencies — you stay fully free with your site.",
    },
    tools: [
      { name: "WordPress", role: { fr: "CMS open-source — 43 % du web mondial", en: "Open-source CMS — 43% of the web" } },
      { name: "Elementor Pro", role: { fr: "Builder visuel pour un design 100 % sur mesure", en: "Visual builder for 100% custom design" } },
      { name: "RankMath Pro", role: { fr: "SEO technique, schema, sitemap, analytics intégrés", en: "Technical SEO, schema, sitemap, built-in analytics" } },
      { name: "Yoast SEO Premium", role: { fr: "Alternative SEO si vous préférez l'écosystème Yoast", en: "SEO alternative if you prefer the Yoast ecosystem" } },
      { name: "WP Rocket", role: { fr: "Cache, lazy loading, minification — score PageSpeed +30 points", en: "Cache, lazy loading, minification — PageSpeed +30 points" } },
      { name: "Cloudflare", role: { fr: "CDN mondial, protection DDoS, SSL gratuit", en: "Global CDN, DDoS protection, free SSL" } },
      { name: "Wordfence", role: { fr: "Pare-feu et antivirus pour sécuriser votre site", en: "Firewall and antivirus to secure your site" } },
      { name: "WooCommerce", role: { fr: "E-commerce open-source avec Mobile Money, Stripe, PayPal", en: "Open-source e-commerce with Mobile Money, Stripe, PayPal" } },
      { name: "Google Search Console", role: { fr: "Suivi du référencement et des erreurs techniques", en: "SEO tracking and technical error monitoring" } },
      { name: "Google Analytics 4", role: { fr: "Analyse du trafic, des sources et du comportement", en: "Traffic, source and behavior analytics" } },
      { name: "SEMrush / Ahrefs", role: { fr: "Recherche de mots-clés, audit concurrentiel, suivi positions", en: "Keyword research, competitive audit, rank tracking" } },
      { name: "Hostinger / o2switch / Kinsta", role: { fr: "Hébergement optimisé WordPress selon le budget", en: "WordPress-optimized hosting depending on budget" } },
    ],
  },

  pricing: {
    headline: { fr: "Combien coûte votre site WordPress + SEO ?", en: "How much does your WordPress + SEO site cost?" },
    intro: {
      fr: "Trois formules selon votre maturité digitale et la complexité du projet. Tout est sur mesure, payable en une fois ou en 50/50. Pas d'abonnement caché, pas de frais surprise — vous êtes propriétaire à 100 % du site, du domaine et du contenu.",
      en: "Three tiers based on your digital maturity and project complexity. Everything is custom, payable upfront or 50/50. No hidden subscription, no surprise fees — you own the site, domain and content 100%.",
    },
    tiers: [
      { name: { fr: "Starter", en: "Starter" }, price: "300 €", priceNote: { fr: "Landing page WordPress", en: "WordPress landing page" },
        features: [
          { fr: "Landing page unique optimisée conversion", en: "Single landing page optimized for conversion" },
          { fr: "Design sur mesure Elementor + identité visuelle", en: "Custom Elementor design + visual identity" },
          { fr: "Formulaire de contact + Google Analytics", en: "Contact form + Google Analytics" },
          { fr: "SEO de base (meta, schema, sitemap)", en: "Basic SEO (meta, schema, sitemap)" },
          { fr: "Vitesse < 2s + score PageSpeed 90+", en: "<2s load + 90+ PageSpeed score" },
          { fr: "Livraison 7-10 jours · Support 30 jours", en: "7-10 day delivery · 30-day support" },
        ] },
      { name: { fr: "Pro (recommandé)", en: "Pro (recommended)" }, price: "700 €", priceNote: { fr: "Site 5 pages + SEO complet", en: "5-page site + full SEO" }, highlight: true,
        features: [
          { fr: "Tout du plan Starter", en: "Everything in Starter" },
          { fr: "5 pages sur mesure (Accueil, Services, À propos, Blog, Contact)", en: "5 custom pages (Home, Services, About, Blog, Contact)" },
          { fr: "RankMath Pro + recherche de mots-clés", en: "RankMath Pro + keyword research" },
          { fr: "3 articles de blog SEO rédigés (1500+ mots)", en: "3 SEO blog articles written (1500+ words)" },
          { fr: "Configuration Search Console + GA4", en: "Search Console + GA4 setup" },
          { fr: "Multilingue FR/EN inclus (WPML ou Polylang)", en: "FR/EN multilingual included (WPML or Polylang)" },
          { fr: "Formation 2h Elementor + RankMath", en: "2h Elementor + RankMath training" },
          { fr: "Livraison 4-5 semaines · Suivi SEO 60 jours", en: "4-5 week delivery · 60-day SEO follow-up" },
        ] },
      { name: { fr: "Enterprise", en: "Enterprise" }, price: "à partir de 1 500 €", priceNote: { fr: "E-commerce ou site sur mesure", en: "E-commerce or fully custom site" },
        features: [
          { fr: "Tout du plan Pro", en: "Everything in Pro" },
          { fr: "Boutique WooCommerce complète (catalogue illimité)", en: "Full WooCommerce store (unlimited catalog)" },
          { fr: "Paiements Stripe, PayPal, Mobile Money (Orange Money, MTN)", en: "Stripe, PayPal, Mobile Money payments (Orange Money, MTN)" },
          { fr: "Stratégie de netlinking (10 backlinks qualité)", en: "Link-building strategy (10 quality backlinks)" },
          { fr: "10 articles blog SEO rédigés", en: "10 SEO blog articles written" },
          { fr: "Multilingue illimité + automatisations Make/n8n", en: "Unlimited multilingual + Make/n8n automations" },
          { fr: "Maintenance + suivi SEO 6 mois inclus", en: "6-month maintenance + SEO follow-up included" },
        ] },
    ],
  },

  faq: [
    { q: { fr: "Combien de temps faut-il pour atteindre la page 1 de Google ?", en: "How long does it take to reach page 1 on Google?" },
      a: { fr: "En moyenne 3 à 6 mois sur des mots-clés locaux ou de niche (par exemple \"avocat affaires Cotonou\" ou \"coach business Bénin\"), et 6 à 12 mois sur des mots-clés plus concurrentiels. Le SEO n'est jamais instantané : c'est un travail de fond qui combine technique propre, contenu de qualité et autorité (backlinks). Mais une fois acquis, le trafic organique est gratuit, durable et exponentiel — contrairement à la pub. On vous remet un rapport mensuel pour suivre vos positions, votre trafic et vos conversions.", en: "On average 3 to 6 months for local or niche keywords (like \"business lawyer Cotonou\" or \"business coach Benin\"), and 6 to 12 months on more competitive keywords. SEO is never instant: it's deep work combining clean tech, quality content and authority (backlinks). But once earned, organic traffic is free, lasting and exponential — unlike ads. We give you a monthly report to track rankings, traffic and conversions." } },
    { q: { fr: "L'hébergement et le nom de domaine sont-ils inclus ?", en: "Are hosting and domain name included?" },
      a: { fr: "On peut tout gérer pour vous (recommandé), ou vous laisser propriétaire direct de votre hébergement et domaine — c'est vous qui choisissez. Selon le pack, on recommande Hostinger Business (30 €/an, idéal Starter), o2switch (70 €/an, top rapport qualité-prix) ou Kinsta (300 €/an, premium pour gros trafic). Le nom de domaine coûte 10-15 €/an chez OVH ou Hostinger. Vous payez directement le prestataire, donc vous êtes toujours propriétaire — pas d'enfermement.", en: "We can handle it all for you (recommended), or leave you as direct owner of hosting and domain — you choose. Depending on the package, we recommend Hostinger Business (€30/yr, ideal Starter), o2switch (€70/yr, best value), or Kinsta (€300/yr, premium for heavy traffic). The domain costs €10-15/yr at OVH or Hostinger. You pay the provider directly, so you always own everything — no lock-in." } },
    { q: { fr: "Est-ce que je garde la main pour modifier mon site moi-même ?", en: "Can I edit the site myself afterwards?" },
      a: { fr: "Absolument. On forme votre équipe pendant 2h (en visio ou en présentiel à Cotonou) à Elementor et RankMath. Vous saurez modifier vos textes, ajouter des photos, créer de nouvelles pages, publier des articles de blog, optimiser le SEO. On vous remet aussi un guide PDF et des tutos vidéo. WordPress + Elementor est l'écosystème le plus accessible du marché — pas besoin de coder. Et si vous voulez nous garder en maintenance mensuelle, c'est possible mais jamais obligatoire.", en: "Absolutely. We train your team for 2h (remotely or in person in Cotonou) on Elementor and RankMath. You'll know how to edit text, add photos, create new pages, publish blog articles, optimize SEO. We also hand you a PDF guide and video tutorials. WordPress + Elementor is the most accessible ecosystem on the market — no coding needed. And if you want monthly maintenance from us, that's possible but never mandatory." } },
    { q: { fr: "Pouvez-vous migrer mon site Wix, Shopify ou Squarespace vers WordPress ?", en: "Can you migrate my Wix, Shopify or Squarespace site to WordPress?" },
      a: { fr: "Oui, on fait des migrations régulièrement. On exporte vos contenus (textes, images, articles), on redessine le site avec une structure SEO propre, on met en place les redirections 301 pour ne pas perdre votre référencement existant, et on transfère votre nom de domaine. La migration est souvent un excellent moment pour repenser l'architecture et booster votre SEO — beaucoup de nos clients gagnent du trafic dans les 2 mois suivant la migration grâce aux corrections SEO qu'on apporte.", en: "Yes, we do migrations regularly. We export your content (text, images, articles), redesign the site with clean SEO structure, set up 301 redirects so you don't lose your existing rankings, and transfer your domain. Migrations are often a great moment to rethink architecture and boost SEO — many of our clients gain traffic within 2 months post-migration thanks to the SEO fixes we apply." } },
    { q: { fr: "Peut-on vendre en ligne (e-commerce) avec WordPress ?", en: "Can I sell online (e-commerce) with WordPress?" },
      a: { fr: "Oui, via WooCommerce qui propulse 28 % des boutiques en ligne mondiales. On installe et configure un catalogue illimité, paiements Stripe, PayPal et Mobile Money (Orange Money, MTN, Moov pour le Bénin et l'Afrique de l'Ouest), gestion des stocks, livraisons, factures PDF automatiques, codes promo. Compatible RGPD et avec les obligations légales locales. Pour des boutiques plus complexes (marketplace, abonnements, B2B), on peut aller jusqu'à 50 000 références sans souci.", en: "Yes, via WooCommerce which powers 28% of online stores globally. We install and configure an unlimited catalog, Stripe, PayPal and Mobile Money payments (Orange Money, MTN, Moov for Benin and West Africa), stock management, shipping, automatic PDF invoices, promo codes. GDPR-compliant and aligned with local legal obligations. For more complex stores (marketplace, subscriptions, B2B), we can go up to 50,000 SKUs without issue." } },
    { q: { fr: "Le site sera-t-il multilingue (français, anglais, autres) ?", en: "Will the site be multilingual (French, English, others)?" },
      a: { fr: "Oui, sur les packs Pro et Enterprise. On installe WPML ou Polylang Pro (selon vos besoins) pour gérer FR/EN par défaut, et on peut ajouter d'autres langues (espagnol, arabe, portugais, langues africaines comme le fon ou le yoruba pour le Bénin). Chaque version est traduite manuellement ou via DeepL + relecture humaine — pas de Google Translate brut qui plombe votre crédibilité. Chaque langue a sa propre URL optimisée SEO (site.com/en, site.com/fr) et sa propre soumission à Search Console.", en: "Yes, on Pro and Enterprise packs. We install WPML or Polylang Pro (depending on your needs) to handle FR/EN by default, and we can add more languages (Spanish, Arabic, Portuguese, African languages like Fon or Yoruba for Benin). Each version is translated manually or via DeepL + human review — no raw Google Translate that hurts your credibility. Each language has its own SEO-optimized URL (site.com/en, site.com/fr) and its own Search Console submission." } },
    { q: { fr: "Comment garantissez-vous une vitesse inférieure à 2 secondes ?", en: "How do you guarantee under 2-second load time?" },
      a: { fr: "On combine plusieurs leviers techniques : hébergement optimisé WordPress (LiteSpeed ou NGINX, pas du mutualisé bas de gamme), cache WP Rocket avec lazy loading et minification CSS/JS, conversion automatique des images en WebP, CDN Cloudflare global, suppression des plugins inutiles, optimisation de la base de données. On teste le site sur PageSpeed Insights, GTmetrix et WebPageTest jusqu'à atteindre 90+/100 sur mobile et desktop, avec validation des Core Web Vitals (LCP < 2,5s, FID < 100ms, CLS < 0,1).", en: "We combine several technical levers: WordPress-optimized hosting (LiteSpeed or NGINX, not cheap shared), WP Rocket cache with lazy loading and CSS/JS minification, automatic image conversion to WebP, global Cloudflare CDN, removal of useless plugins, database optimization. We test the site on PageSpeed Insights, GTmetrix and WebPageTest until hitting 90+/100 on mobile and desktop, with Core Web Vitals validation (LCP < 2.5s, FID < 100ms, CLS < 0.1)." } },
    { q: { fr: "Que se passe-t-il après la livraison ? Proposez-vous de la maintenance ?", en: "What happens after delivery? Do you offer maintenance?" },
      a: { fr: "Pendant les 30 premiers jours (60 sur Pro, 6 mois sur Enterprise), tout le support est inclus : corrections, ajustements, questions, optimisations SEO. Au-delà, on propose un pack Maintenance optionnel (à partir de 50 €/mois) qui couvre : mises à jour WordPress et plugins, sauvegardes quotidiennes, monitoring uptime, audit SEO trimestriel, 2h de modifications mensuelles. Mais rien n'est obligatoire — vous pouvez parfaitement gérer la maintenance vous-même ou via un autre prestataire après livraison.", en: "For the first 30 days (60 on Pro, 6 months on Enterprise), all support is included: fixes, tweaks, questions, SEO optimizations. Beyond that, we offer an optional Maintenance pack (from €50/month) covering: WordPress and plugin updates, daily backups, uptime monitoring, quarterly SEO audit, 2h monthly edits. But nothing is mandatory — you can absolutely handle maintenance yourself or via another provider post-delivery." } },
  ],

  relatedSlugs: ["seo-google-page-1", "maquette-ui-ux", "maquette-figma-48h", "chatbot-gpt-site-web"],

  cta: {
    headline: { fr: "Et si dans 6 mois, vous étiez enfin en page 1 de Google ?", en: "What if in 6 months, you were finally on Google's page 1?" },
    desc: { fr: "30 minutes d'audit gratuit pour comprendre votre marché, vos concurrents et vos opportunités SEO. Devis détaillé sous 24h, et un site WordPress livré en 4 à 5 semaines — rapide, beau, qui ranke et qui convertit.", en: "30 free audit minutes to understand your market, competitors and SEO opportunities. Detailed quote within 24h, and a WordPress site delivered in 4 to 5 weeks — fast, beautiful, ranking and converting." },
    primaryLabel: { fr: "Réserver mon audit SEO gratuit", en: "Book my free SEO audit" },
    secondaryLabel: { fr: "Voir tous nos services", en: "See all our services" },
  },
};

/* ── Pillar : Maquette UI/UX IA ── */
const maquetteUiUx: ServicePage = {
  slug: "maquette-ui-ux",
  type: "pillar",
  category: "Maquette UI/UX",
  pillarSlug: undefined,
  color: "amber",
  icon: Palette,
  heroIllustration: "ui-mockup",

  metaTitle: {
    fr: "Maquette UI/UX IA — Figma AI & v0.dev · Prototype Cliquable en 48-72h",
    en: "AI UI/UX Mockup — Figma AI & v0.dev · Clickable Prototype in 48-72h",
  },
  metaDescription: {
    fr: "Maquettes UI/UX cliquables propulsées par Figma AI, v0.dev et Google Stitch. Design system inclus, mobile-first, handoff dev React. Livrées en 48-72h. Audit gratuit.",
    en: "Clickable UI/UX mockups powered by Figma AI, v0.dev and Google Stitch. Design system included, mobile-first, React dev handoff. Delivered in 48-72h. Free audit.",
  },
  keywords: [
    "maquette UI/UX", "maquette Figma", "v0.dev", "Figma AI", "Google Stitch",
    "prototype interactif", "prototype cliquable", "design UI", "design UX",
    "wireframe", "mockup application", "MVP design", "design startup",
    "design system", "agence design Afrique", "maquette site web",
    "maquette SaaS", "design app mobile", "agence UI/UX Cotonou", "handoff développeur",
  ],

  hero: {
    badge: { fr: "Maquette UI/UX IA", en: "AI UI/UX Mockup" },
    h1: {
      fr: "Des maquettes cliquables qui convainquent vos investisseurs et vos utilisateurs",
      en: "Clickable mockups that win over your investors and your users",
    },
    h1Highlight: { fr: "en 48-72h", en: "in 48-72h" },
    subtitle: {
      fr: "On conçoit pour vous des prototypes UI/UX haute fidélité 100% cliquables avec Figma AI, v0.dev et Google Stitch. Design system inclus, mobile-first, accessible, exporté en code React prêt à intégrer. Validez votre idée avec de vrais utilisateurs avant d'investir un euro en développement.",
      en: "We design high-fidelity, 100% clickable UI/UX prototypes for you with Figma AI, v0.dev and Google Stitch. Design system included, mobile-first, accessible, exported as ready-to-ship React code. Validate your idea with real users before spending a single euro on development.",
    },
    trustStrip: [
      { value: "48-72h", label: { fr: "Livraison", en: "Delivery" } },
      { value: "100%", label: { fr: "Cliquable", en: "Clickable" } },
      { value: "x3", label: { fr: "Levées réussies", en: "Funding rounds won" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Avoir une bonne idée ne suffit pas — encore faut-il pouvoir la montrer. Sans maquette professionnelle, votre projet reste flou dans la tête des autres : investisseurs sceptiques, devs qui partent dans le mauvais sens, utilisateurs qui n'accrochent pas. La plupart des founders perdent des mois (et des dizaines de milliers d'euros) à coder un produit que personne ne voulait, faute d'avoir validé l'expérience avant. Voici les blocages concrets qu'on voit revenir presque chaque semaine — et ce qu'ils coûtent vraiment quand on les laisse traîner.",
      en: "Having a great idea isn't enough — you also need to be able to show it. Without a professional mockup, your project stays fuzzy in everyone else's head: skeptical investors, devs heading the wrong way, users who don't connect. Most founders waste months (and tens of thousands of euros) building a product nobody wanted, because they didn't validate the experience first. Here are the concrete blockers we see almost every week — and what they really cost when you let them drag on.",
    },
    items: [
      { icon: Lightbulb, title: { fr: "Votre idée reste floue, impossible à pitcher", en: "Your idea stays fuzzy, impossible to pitch" },
        desc: { fr: "Vous savez ce que vous voulez construire, mais quand vous l'expliquez, les gens hochent la tête sans vraiment voir. Sans visuel concret, votre produit n'existe pas — ni pour vos co-fondateurs, ni pour vos premiers clients, ni pour personne. Chaque pitch devient un exercice de traduction épuisant.", en: "You know what you want to build, but when you explain it, people nod without really seeing it. Without a concrete visual, your product doesn't exist — not for your co-founders, not for your first customers, not for anyone. Every pitch becomes an exhausting translation exercise." } },
      { icon: TrendingUp, title: { fr: "Vous payez un dev avant d'avoir validé l'UX", en: "You're paying a dev before validating the UX" },
        desc: { fr: "Vous lancez le code direct, parce que \"on verra à l'usage\". Trois mois et 15 000 € plus tard, les utilisateurs n'utilisent pas la moitié des features, l'onboarding ne convertit pas, et vous repartez de zéro. Une maquette à 300 € aurait évité 80% de ce gâchis.", en: "You jump straight to code because \"we'll figure it out as we go.\" Three months and €15,000 later, users don't use half the features, onboarding doesn't convert, and you start over. A €300 mockup would have prevented 80% of that waste." } },
      { icon: Eye, title: { fr: "Le mockup que vous avez fait en interne fait peur", en: "Your in-house mockup looks scary" },
        desc: { fr: "Bricolé sur PowerPoint ou Canva entre deux réunions, votre prototype renvoie une image amateur. Les boutons sont mal alignés, les couleurs jurent, la typo est celle de 2008. Résultat : peu importe la qualité du fond, la forme tue la crédibilité de votre projet avant même qu'on l'écoute.", en: "Slapped together in PowerPoint or Canva between meetings, your prototype screams amateur. Buttons are misaligned, colors clash, typography is straight out of 2008. The result: no matter how strong the substance is, the form kills your project's credibility before anyone even listens." } },
      { icon: Briefcase, title: { fr: "Les investisseurs ne sont pas convaincus, le time-to-market explose", en: "Investors aren't convinced, time-to-market explodes" },
        desc: { fr: "Sans démo cliquable, vos slides d'investisseurs ressemblent à toutes les autres. Les VCs voient 20 deals par semaine — sans expérience concrète à essayer, votre projet finit dans la pile \"on revoit plus tard\". Pendant ce temps, vos concurrents lèvent et lancent. Vous prenez 6 mois de retard sur un marché qui n'attend personne.", en: "Without a clickable demo, your investor slides look like every other deck. VCs see 20 deals a week — with no concrete experience to try, your project lands in the \"we'll revisit later\" pile. Meanwhile, your competitors raise and launch. You fall 6 months behind in a market that waits for no one." } },
    ],
  },

  solution: {
    headline: { fr: "Un prototype cliquable qui parle à votre place", en: "A clickable prototype that speaks for you" },
    intro: {
      fr: "On conçoit pour vous une maquette UI/UX haute fidélité, 100% interactive, livrée en 48 à 72h grâce à un workflow boosté par l'IA (Figma AI, v0.dev, Google Stitch). Vous obtenez un prototype Figma navigable qu'on peut tester sur n'importe quel téléphone, un design system clean réutilisable par vos devs, et — si vous le voulez — du code React généré par v0.dev prêt à intégrer dans votre projet Next.js ou Vite. Voici ce qu'on met concrètement dans chaque livrable, peu importe la taille de votre projet.",
      en: "We design a high-fidelity, 100% interactive UI/UX mockup for you, delivered in 48 to 72h thanks to an AI-powered workflow (Figma AI, v0.dev, Google Stitch). You get a navigable Figma prototype testable on any phone, a clean reusable design system for your devs, and — if you want — React code generated by v0.dev, ready to drop into your Next.js or Vite project. Here's what we concretely ship in every deliverable, regardless of project size.",
    },
    features: [
      { icon: Sparkles, title: { fr: "Prototypage assisté par IA, 10x plus rapide", en: "AI-assisted prototyping, 10x faster" },
        desc: { fr: "On combine Figma AI pour générer les premières variantes, v0.dev pour itérer sur les composants React, et Google Stitch pour explorer des layouts complets en quelques prompts. Résultat : ce qu'une agence classique livre en 3 semaines, on le livre en 3 jours — sans sacrifier la finition.", en: "We combine Figma AI to generate first variants, v0.dev to iterate on React components, and Google Stitch to explore full layouts in a few prompts. The result: what a classic agency delivers in 3 weeks, we ship in 3 days — without sacrificing polish." } },
      { icon: Palette, title: { fr: "Design system inclus, pas juste des écrans", en: "Design system included, not just screens" },
        desc: { fr: "Chaque maquette est construite sur un design system propre : palette de couleurs, typographie, grille d'espacements, composants réutilisables (boutons, cards, modales, formulaires). Vos devs récupèrent un kit cohérent qui leur évite des semaines de bricolage CSS.", en: "Every mockup is built on a clean design system: color palette, typography, spacing grid, reusable components (buttons, cards, modals, forms). Your devs get a coherent kit that saves them weeks of CSS hacking." } },
      { icon: Phone, title: { fr: "Mobile-first, testable sur de vrais téléphones", en: "Mobile-first, testable on real phones" },
        desc: { fr: "On commence systématiquement par le mobile (où vivent vos utilisateurs en 2026), puis on étend en tablette et desktop. Le prototype Figma est partagé via un lien que vous ouvrez sur votre téléphone — pour le tester en vrai, le montrer à des utilisateurs, l'envoyer à un investisseur en 1 clic.", en: "We always start with mobile (where your users actually live in 2026), then extend to tablet and desktop. The Figma prototype is shared via a link you open on your phone — to truly test it, show it to users, send it to an investor in one click." } },
      { icon: Zap, title: { fr: "Micro-animations & transitions subtiles", en: "Subtle micro-animations & transitions" },
        desc: { fr: "Un bon design ne se voit pas, il se ressent. On ajoute des transitions Smart Animate sur Figma, des micro-interactions sur les boutons, des loaders élégants, et — pour les projets premium — des animations Lottie exportables. Le prototype donne la sensation d'un vrai produit, pas d'un PDF statique.", en: "Good design isn't seen, it's felt. We add Smart Animate transitions in Figma, micro-interactions on buttons, elegant loaders, and — for premium projects — exportable Lottie animations. The prototype feels like a real product, not a static PDF." } },
      { icon: Cpu, title: { fr: "Code React généré via v0.dev", en: "React code generated via v0.dev" },
        desc: { fr: "Sur demande, on convertit les écrans clés en composants React + Tailwind via v0.dev. Vous récupérez du code propre, typé en TypeScript, prêt à coller dans un projet Next.js. Vos devs gagnent 60 à 80% du temps d'intégration front — ils se concentrent sur la logique métier.", en: "On request, we convert key screens into React + Tailwind components via v0.dev. You get clean, TypeScript-typed code ready to paste into a Next.js project. Your devs save 60 to 80% of frontend integration time — they focus on business logic." } },
      { icon: Shield, title: { fr: "Accessibilité & contrastes vérifiés", en: "Accessibility & contrasts checked" },
        desc: { fr: "Chaque maquette respecte WCAG 2.1 AA : contrastes vérifiés, tailles de touch targets ≥ 44px, hiérarchie sémantique claire, navigation clavier prévue. Votre produit reste utilisable par tout le monde — et passera sans douleur les audits accessibilité réglementaires (loi européenne 2025).", en: "Every mockup respects WCAG 2.1 AA: verified contrasts, touch targets ≥ 44px, clear semantic hierarchy, keyboard navigation accounted for. Your product stays usable by everyone — and will painlessly pass regulatory accessibility audits (EU 2025 law)." } },
    ],
  },

  howItWorks: {
    headline: { fr: "De l'idée au prototype cliquable — en 72h chrono", en: "From idea to clickable prototype — in 72h flat" },
    steps: [
      { icon: Search, title: { fr: "Kickoff & cadrage produit", en: "Kickoff & product scoping" }, duration: { fr: "Jour 1 matin", en: "Day 1 AM" },
        desc: { fr: "On organise un appel de 45 minutes pour comprendre votre vision, vos utilisateurs cibles, les écrans prioritaires et les références qui vous inspirent (Stripe, Linear, Notion…). On finalise la liste des écrans à designer, le ton visuel et les contraintes techniques (mobile/web/desktop, accessibilité, langues).", en: "We run a 45-minute call to understand your vision, target users, priority screens and the references that inspire you (Stripe, Linear, Notion…). We finalize the screen list to design, the visual tone and technical constraints (mobile/web/desktop, accessibility, languages)." } },
      { icon: Lightbulb, title: { fr: "Wireframes générés par IA", en: "AI-generated wireframes" }, duration: { fr: "Jour 1 après-midi", en: "Day 1 PM" },
        desc: { fr: "On utilise Figma AI et Google Stitch pour générer rapidement 2 à 3 variantes de wireframes basse fidélité par écran. On vous présente les directions, on tranche ensemble la plus pertinente. C'est l'étape qui élimine 80% des aller-retours — on valide la structure avant la couleur.", en: "We use Figma AI and Google Stitch to quickly generate 2-3 low-fidelity wireframe variants per screen. We present the directions, we decide together on the most relevant one. This step eliminates 80% of back-and-forth — we validate structure before color." } },
      { icon: Palette, title: { fr: "Design haute fidélité + design system", en: "High-fidelity design + design system" }, duration: { fr: "Jour 2", en: "Day 2" },
        desc: { fr: "On passe les wireframes validés en haute fidélité : couleurs, typo, illustrations, photos réelles, composants finalisés. Parallèlement, on construit le design system (tokens de couleurs, échelles d'espacement, library Figma). Chaque écran respecte la grille, les contrastes et la cohérence.", en: "We turn the validated wireframes into high-fidelity designs: colors, typography, illustrations, real photos, finalized components. In parallel, we build the design system (color tokens, spacing scales, Figma library). Every screen respects the grid, contrasts and consistency." } },
      { icon: Rocket, title: { fr: "Prototype cliquable + animations", en: "Clickable prototype + animations" }, duration: { fr: "Jour 3 matin", en: "Day 3 AM" },
        desc: { fr: "On lie tous les écrans entre eux dans Figma : chaque bouton, lien, modale et formulaire devient interactif. On ajoute Smart Animate sur les transitions clés, des micro-interactions sur les CTA, et un loader élégant. Vous recevez un lien de prototype testable sur téléphone — vous le montrez à 10 utilisateurs dans la journée.", en: "We link every screen together in Figma: each button, link, modal and form becomes interactive. We add Smart Animate on key transitions, micro-interactions on CTAs, and an elegant loader. You receive a prototype link testable on phone — you show it to 10 users the same day." } },
      { icon: Handshake, title: { fr: "Livraison & handoff dev", en: "Delivery & dev handoff" }, duration: { fr: "Jour 3 après-midi", en: "Day 3 PM" },
        desc: { fr: "On vous livre le fichier Figma complet (vous en êtes propriétaire), un PDF de présentation, et — en option — le code React/Tailwind généré via v0.dev des écrans clés. On organise un appel de handoff avec vos développeurs pour leur expliquer les composants, les tokens et les interactions. Support 30 jours inclus pour les ajustements mineurs.", en: "We deliver the full Figma file (you own it), a presentation PDF, and — optionally — the React/Tailwind code generated via v0.dev for key screens. We set up a handoff call with your developers to walk them through components, tokens and interactions. 30-day support included for minor adjustments." } },
    ],
  },

  stats: [
    { value: "48-72", suffix: "h", label: { fr: "Délai de livraison", en: "Delivery time" } },
    { value: "100", suffix: "%", label: { fr: "Prototype cliquable", en: "Clickable prototype" } },
    { value: "x3", label: { fr: "Levées de fonds réussies", en: "Successful fundraisings" } },
    { value: "80", suffix: "%", label: { fr: "Temps dev économisé", en: "Dev time saved" } },
  ],

  useCases: {
    headline: { fr: "Pour qui ces maquettes UI/UX sont-elles vraiment faites ?", en: "Who are these UI/UX mockups really for?" },
    intro: {
      fr: "Que vous soyez en train de pitcher votre première levée de fonds ou de refondre une plateforme existante, le bon prototype change tout. Voici comment on adapte concrètement la démarche à 4 profils que nous accompagnons régulièrement — avec les résultats moyens observés sur nos projets clients en Afrique, en France et à l'international.",
      en: "Whether you're pitching your first fundraise or redesigning an existing platform, the right prototype changes everything. Here's how we concretely adapt the approach for 4 profiles we work with regularly — with the average results we've seen on our client projects in Africa, France and internationally.",
    },
    cases: [
      { icon: GraduationCap, sector: { fr: "Startups & founders early-stage", en: "Startups & early-stage founders" },
        problem: { fr: "Vous avez une idée, un deck, mais rien de concret à montrer. Les investisseurs et premiers clients vous demandent \"vous avez une démo ?\" — vous n'avez qu'un Notion et de la passion.", en: "You have an idea, a deck, but nothing concrete to show. Investors and first customers ask \"got a demo?\" — you only have a Notion page and passion." },
        solution: { fr: "On livre en 72h un prototype haute fidélité de 5 à 8 écrans clés (onboarding, dashboard, feature principale) qui simule l'expérience complète. Vous pitchez avec un produit qui paraît déjà construit.", en: "In 72h we deliver a high-fidelity prototype of 5 to 8 key screens (onboarding, dashboard, main feature) simulating the full experience. You pitch with a product that already looks built." },
        result: { fr: "Levée de pre-seed multipliée par 3, premiers clients pilotes signés avant la première ligne de code.", en: "Pre-seed raises 3x higher, first pilot customers signed before the first line of code." } },
      { icon: ShoppingCart, sector: { fr: "E-commerce en refonte UX", en: "E-commerce redesigning UX" },
        problem: { fr: "Votre boutique Shopify ou WooCommerce convertit 1,2% — la moyenne du secteur est à 2,5%. Vous savez que le tunnel d'achat fuit, mais vous ne savez pas par où commencer.", en: "Your Shopify or WooCommerce store converts at 1.2% — the sector average is 2.5%. You know the funnel leaks, but you don't know where to start." },
        solution: { fr: "On audite votre tunnel actuel, on redesigne les 6 pages critiques (homepage, listing, fiche produit, panier, checkout, confirmation) avec un mobile-first agressif et une preuve sociale repensée.", en: "We audit your current funnel, we redesign the 6 critical pages (homepage, listing, product page, cart, checkout, confirmation) with aggressive mobile-first and rethought social proof." },
        result: { fr: "Taux de conversion doublé après intégration, panier moyen +18%, taux de rebond mobile divisé par 2.", en: "Conversion rate doubled after integration, +18% average cart value, mobile bounce rate cut in half." } },
      { icon: Briefcase, sector: { fr: "Agences digitales qui sous-traitent", en: "Digital agencies outsourcing" },
        problem: { fr: "Votre agence est débordée, vos designers internes sont sur 4 projets en parallèle, et vous devez livrer un mockup à un client important sous 5 jours. Recruter prend 3 mois, freelancer est aléatoire.", en: "Your agency is overloaded, your in-house designers are juggling 4 projects, and you must deliver a mockup to an important client in 5 days. Hiring takes 3 months, freelancing is hit-or-miss." },
        solution: { fr: "On devient votre studio design white-label : on travaille sous votre marque, sur vos templates, avec votre design system existant. Livraison sous 48-72h, NDA signé, communication directe avec votre PM.", en: "We become your white-label design studio: we work under your brand, on your templates, with your existing design system. 48-72h delivery, NDA signed, direct communication with your PM." },
        result: { fr: "Capacité de production doublée sans recruter, marge préservée, zéro client perdu pour cause de délais.", en: "Production capacity doubled without hiring, margin preserved, zero clients lost to deadline issues." } },
      { icon: Building2, sector: { fr: "PME qui digitalise un produit", en: "SMEs digitalizing a product" },
        problem: { fr: "Votre PME vit encore sur Excel et papier. Vous voulez digitaliser un process interne (gestion de stock, suivi commercial, portail client) mais vous n'avez ni équipe design, ni vision claire de l'interface.", en: "Your SME still runs on Excel and paper. You want to digitalize an internal process (inventory, sales tracking, client portal) but you have no design team and no clear interface vision." },
        solution: { fr: "On vous accompagne dans la cartographie des besoins métier, puis on conçoit une interface simple et claire — pensée pour des utilisateurs non-tech. Le prototype sert ensuite de cahier des charges au dev.", en: "We help you map business needs, then design a simple and clear interface — built for non-tech users. The prototype then serves as the spec sheet for the dev team." },
        result: { fr: "Adoption interne x4 vs ancien outil Excel, dev terminé sous 6 semaines au lieu de 4 mois.", en: "Internal adoption 4x higher vs old Excel tool, dev finished in 6 weeks instead of 4 months." } },
    ],
  },

  stack: {
    headline: { fr: "La stack design qu'on déploie", en: "The design stack we deploy" },
    intro: {
      fr: "On combine les outils IA les plus avancés du marché avec les standards éprouvés du design produit. L'objectif : aller 10x plus vite qu'une agence traditionnelle, sans jamais sacrifier la qualité du livrable.",
      en: "We combine the most advanced AI tools on the market with proven product design standards. The goal: move 10x faster than a traditional agency, without ever sacrificing deliverable quality.",
    },
    tools: [
      { name: "Figma + Figma AI", role: { fr: "Outil principal de design et de prototypage interactif", en: "Main tool for design and interactive prototyping" } },
      { name: "v0.dev (Vercel)", role: { fr: "Génération de composants React + Tailwind à partir de prompts", en: "Generates React + Tailwind components from prompts" } },
      { name: "Google Stitch", role: { fr: "Exploration rapide de layouts complets par IA", en: "Rapid AI-powered exploration of full layouts" } },
      { name: "Framer", role: { fr: "Prototypes avec animations avancées et publication web", en: "Prototypes with advanced animations and web publishing" } },
      { name: "Webflow", role: { fr: "Maquettes converties en sites no-code éditables", en: "Mockups converted into editable no-code sites" } },
      { name: "Lottie / LottieFiles", role: { fr: "Animations vectorielles légères pour mobile et web", en: "Lightweight vector animations for mobile and web" } },
      { name: "Maze / Useberry", role: { fr: "Tests utilisateurs à distance sur prototype Figma", en: "Remote user testing on Figma prototypes" } },
      { name: "Tailwind CSS", role: { fr: "Framework CSS utilisé pour le handoff dev", en: "CSS framework used for dev handoff" } },
      { name: "ShadCN UI", role: { fr: "Library de composants React accessibles et stylables", en: "Accessible, stylable React component library" } },
      { name: "Material UI / Radix UI", role: { fr: "Composants prêts à l'emploi pour produits enterprise", en: "Ready-made components for enterprise products" } },
    ],
  },

  pricing: {
    headline: { fr: "Combien coûte votre maquette UI/UX ?", en: "How much does your UI/UX mockup cost?" },
    intro: {
      fr: "Trois formules selon l'ampleur de votre projet. Tout est sur mesure, payable en une fois ou 50/50. Sans abonnement, sans frais cachés — vous restez propriétaire à 100% du fichier Figma et de tous les livrables.",
      en: "Three tiers based on the scope of your project. Everything is custom, payable upfront or 50/50. No subscription, no hidden fees — you stay 100% owner of the Figma file and every deliverable.",
    },
    tiers: [
      { name: { fr: "Starter", en: "Starter" }, price: "100 €", priceNote: { fr: "Maquette 1-2 écrans", en: "1-2 screen mockup" },
        features: [
          { fr: "1 à 2 écrans haute fidélité (mobile ou desktop)", en: "1 to 2 high-fidelity screens (mobile or desktop)" },
          { fr: "Palette de couleurs + typographie", en: "Color palette + typography" },
          { fr: "Prototype Figma cliquable basique", en: "Basic clickable Figma prototype" },
          { fr: "1 révision incluse", en: "1 revision included" },
          { fr: "Livraison en 48h · Fichier Figma fourni", en: "Delivered in 48h · Figma file provided" },
        ] },
      { name: { fr: "Pro (recommandé)", en: "Pro (recommended)" }, price: "300 €", priceNote: { fr: "Maquette complète + design system", en: "Full mockup + design system" }, highlight: true,
        features: [
          { fr: "5 à 7 écrans haute fidélité (mobile + desktop)", en: "5 to 7 high-fidelity screens (mobile + desktop)" },
          { fr: "Design system complet (tokens, composants, library)", en: "Full design system (tokens, components, library)" },
          { fr: "Prototype 100% cliquable avec animations Smart Animate", en: "100% clickable prototype with Smart Animate animations" },
          { fr: "Tests d'accessibilité WCAG 2.1 AA", en: "WCAG 2.1 AA accessibility checks" },
          { fr: "3 révisions incluses + appel de présentation", en: "3 revisions included + presentation call" },
          { fr: "Livraison en 72h · Support 30 jours", en: "Delivered in 72h · 30-day support" },
        ] },
      { name: { fr: "Enterprise", en: "Enterprise" }, price: "dès 600 €", priceNote: { fr: "10+ écrans + handoff dev complet", en: "10+ screens + full dev handoff" },
        features: [
          { fr: "Tout du plan Pro", en: "Everything in Pro" },
          { fr: "10+ écrans (toute la plateforme ou app)", en: "10+ screens (full platform or app)" },
          { fr: "Code React + Tailwind via v0.dev des écrans clés", en: "React + Tailwind code via v0.dev for key screens" },
          { fr: "Tests utilisateurs (Maze) sur 5-10 répondants", en: "User tests (Maze) on 5-10 respondents" },
          { fr: "Animations Lottie sur mesure", en: "Custom Lottie animations" },
          { fr: "Handoff complet avec vos développeurs", en: "Full handoff with your developers" },
          { fr: "Révisions illimitées · Maintenance 60 jours", en: "Unlimited revisions · 60-day maintenance" },
        ] },
    ],
  },

  faq: [
    { q: { fr: "Combien d'écrans peut-on inclure dans une maquette ?", en: "How many screens can a mockup include?" },
      a: { fr: "Le plan Starter couvre 1 à 2 écrans (parfait pour valider une homepage ou une feature isolée). Le plan Pro inclut 5 à 7 écrans, ce qui couvre généralement un parcours utilisateur complet d'une app (onboarding, dashboard, feature clé, paramètres, profil). Le plan Enterprise va à 10+ écrans, idéal pour une plateforme SaaS complète, un e-commerce avec checkout, ou une app mobile avec plusieurs sections. Si vous avez besoin de 30 écrans, on peut tout à fait découper le projet en sprints de 10 écrans livrés successivement.", en: "The Starter plan covers 1 to 2 screens (perfect to validate a homepage or isolated feature). The Pro plan includes 5 to 7 screens, generally covering a full user journey in an app (onboarding, dashboard, key feature, settings, profile). The Enterprise plan goes 10+ screens, ideal for a full SaaS platform, an e-commerce with checkout, or a mobile app with multiple sections. If you need 30 screens, we can absolutely split the project into sprints of 10 screens delivered successively." } },
    { q: { fr: "Est-ce que vous codez aussi le site après la maquette ?", en: "Do you also code the site after the mockup?" },
      a: { fr: "Oui, on peut prendre en charge le développement complet derrière. Avec le plan Enterprise, on génère déjà du code React + Tailwind via v0.dev pour les écrans clés. Si vous voulez aller jusqu'au site WordPress ou Next.js complet, on bascule sur notre service \"Site WordPress + SEO\" ou un projet sur mesure Next.js. Beaucoup de clients préfèrent toutefois que leurs propres devs intègrent la maquette — auquel cas on assure le handoff complet (appel d'explication, tokens exportés, composants documentés).", en: "Yes, we can take care of the full build behind it. With the Enterprise plan, we already generate React + Tailwind code via v0.dev for key screens. If you want to go all the way to a full WordPress or Next.js site, we switch to our \"WordPress + SEO Site\" service or a custom Next.js project. Many clients however prefer their own devs to integrate the mockup — in which case we provide a complete handoff (briefing call, exported tokens, documented components)." } },
    { q: { fr: "Le fichier Figma m'appartient-il vraiment ?", en: "Do I really own the Figma file?" },
      a: { fr: "Oui, à 100%. À la livraison, on vous transfère la propriété du fichier Figma sur votre propre compte (gratuit). Tous les composants, tokens, illustrations originales, et le design system vous appartiennent. Vous pouvez les modifier, les revendre, les transmettre à n'importe quelle agence par la suite. Aucun lock-in, aucune licence cachée — c'est votre patrimoine design.", en: "Yes, 100%. On delivery, we transfer ownership of the Figma file to your own (free) account. All components, tokens, original illustrations, and the design system are yours. You can modify them, resell them, hand them off to any agency later. No lock-in, no hidden license — it's your design asset." } },
    { q: { fr: "Combien de révisions sont incluses ?", en: "How many revisions are included?" },
      a: { fr: "1 révision sur le plan Starter, 3 sur le plan Pro, illimitées sur l'Enterprise. On définit clairement ce qu'est une \"révision\" lors du kickoff : un round complet d'ajustements (couleurs, typo, placement, contenus). Les micro-ajustements ponctuels (changer un mot, déplacer un bouton) ne comptent pas. Notre objectif est qu'à la fin de la phase wireframe, 80% des décisions soient déjà tranchées — ce qui rend les révisions hautes fidélité largement suffisantes.", en: "1 revision on Starter, 3 on Pro, unlimited on Enterprise. We clearly define what counts as a \"revision\" at kickoff: a complete adjustment round (colors, typography, placement, content). One-off micro-tweaks (changing a word, moving a button) don't count. Our goal is that by the end of the wireframe phase, 80% of decisions are already locked in — which makes high-fidelity revisions largely sufficient." } },
    { q: { fr: "Vous livrez en mobile, desktop, ou les deux ?", en: "Do you deliver mobile, desktop, or both?" },
      a: { fr: "Par défaut on adopte une approche mobile-first (le mobile représente 70%+ du trafic en 2026, surtout en Afrique). Le plan Starter cible une seule résolution. Le plan Pro inclut mobile + desktop pour chaque écran. Le plan Enterprise couvre mobile + tablette + desktop avec breakpoints détaillés. Si vous concevez une app native iOS/Android, on prévoit les variantes spécifiques (status bar, navigation iOS vs Android, tailles de touch targets).", en: "By default we take a mobile-first approach (mobile is 70%+ of traffic in 2026, especially in Africa). The Starter plan targets a single resolution. The Pro plan includes mobile + desktop for every screen. The Enterprise plan covers mobile + tablet + desktop with detailed breakpoints. If you're designing a native iOS/Android app, we plan for the specific variants (status bar, iOS vs Android navigation, touch target sizes)." } },
    { q: { fr: "Vous incluez des animations dans le prototype ?", en: "Do you include animations in the prototype?" },
      a: { fr: "Oui, à tous les niveaux. Le plan Pro inclut les transitions Smart Animate natives de Figma (fade, slide, scale) et des micro-interactions sur les boutons et formulaires. Le plan Enterprise ajoute des animations Lottie sur mesure (loaders, onboarding, illustrations animées) directement exportables pour Lottie Player. Pour les besoins de motion design avancés (After Effects, Rive), on peut s'associer avec un motion designer partenaire.", en: "Yes, at every level. The Pro plan includes Figma's native Smart Animate transitions (fade, slide, scale) and micro-interactions on buttons and forms. The Enterprise plan adds custom Lottie animations (loaders, onboarding, animated illustrations) directly exportable for Lottie Player. For advanced motion design needs (After Effects, Rive), we can partner with a motion designer." } },
    { q: { fr: "L'accessibilité est-elle prise en compte ?", en: "Is accessibility taken into account?" },
      a: { fr: "Toujours. Chaque maquette respecte les standards WCAG 2.1 AA : ratios de contraste vérifiés au pixel près (texte/fond ≥ 4.5:1), tailles de touch targets ≥ 44x44 pixels, hiérarchie sémantique claire, états focus visibles, gestion des erreurs explicites, et navigation clavier prévue. C'est devenu obligatoire en Europe depuis juin 2025 (European Accessibility Act) pour beaucoup de produits — on vous épargne un audit douloureux et coûteux a posteriori.", en: "Always. Every mockup respects WCAG 2.1 AA standards: pixel-checked contrast ratios (text/background ≥ 4.5:1), touch target sizes ≥ 44x44 pixels, clear semantic hierarchy, visible focus states, explicit error handling, and keyboard navigation accounted for. It became mandatory in Europe in June 2025 (European Accessibility Act) for many products — we spare you a painful and costly retroactive audit." } },
    { q: { fr: "Pouvez-vous travailler avec mes développeurs internes ?", en: "Can you work with my in-house developers?" },
      a: { fr: "Absolument. C'est même notre mode de collaboration préféré : vous gardez la maîtrise technique, on apporte l'accélération design. À la livraison, on organise un appel de handoff de 30 à 60 minutes avec votre équipe dev pour leur expliquer les composants, les tokens (couleurs, espacements, typo), les états interactifs et les animations. Le fichier Figma est annoté, les composants sont nommés selon les conventions React (Button.tsx, Card.tsx…), et on reste joignables 30 jours pour répondre à leurs questions d'intégration.", en: "Absolutely. It's even our preferred way to work: you keep technical ownership, we bring design acceleration. On delivery, we set up a 30-60 minute handoff call with your dev team to walk them through components, tokens (colors, spacing, typography), interactive states and animations. The Figma file is annotated, components are named with React conventions (Button.tsx, Card.tsx…), and we stay reachable for 30 days to answer their integration questions." } },
  ],

  relatedSlugs: ["site-wordpress-seo", "chatbot-ia", "automatisation-no-code", "callbot-ia-vocal"],

  cta: {
    headline: { fr: "Et si vous pitchiez votre projet avec un vrai prototype dès la semaine prochaine ?", en: "What if you pitched your project with a real prototype as early as next week?" },
    desc: { fr: "30 minutes pour comprendre votre vision, 48 à 72h pour livrer un prototype cliquable. Pas d'abonnement, pas d'engagement, et un kickoff 100% gratuit pour démarrer. Vous repartez avec un fichier Figma à vous, un design system, et — sur demande — du code React prêt à intégrer.", en: "30 minutes to understand your vision, 48 to 72h to deliver a clickable prototype. No subscription, no commitment, and a 100% free kickoff to get started. You leave with a Figma file you own, a design system, and — on request — ready-to-ship React code." },
    primaryLabel: { fr: "Réserver mon kickoff gratuit", en: "Book my free kickoff" },
    secondaryLabel: { fr: "Voir tous nos services", en: "See all our services" },
  },
};

/* ── Long-tail : Automatisation Make.com ── */
const automatisationMake: ServicePage = {
  slug: "automatisation-make",
  type: "long-tail",
  category: "Automatisation",
  pillarSlug: "automatisation-no-code",
  color: "emerald",
  icon: Zap,
  heroIllustration: "automation-flow",

  metaTitle: {
    fr: "Automatisation Make (Integromat) — Agence Experte · Scénarios Avancés Optimisés",
    en: "Make (Integromat) Automation — Expert Agency · Advanced Cost-Optimized Scenarios",
  },
  metaDescription: {
    fr: "Agence experte Make.com (ex-Integromat). Scénarios avancés avec routeurs, itérateurs, error handlers. Optimisation des opérations pour diviser votre facture par 3. Déployé en 5-10 jours. Audit gratuit.",
    en: "Make.com (ex-Integromat) expert agency. Advanced scenarios with routers, iterators, error handlers. Operations optimization to cut your bill by 3x. Deployed in 5-10 days. Free audit.",
  },
  keywords: [
    "Make automation", "Make Integromat", "scénario Make", "automatisation Make",
    "agence Make", "expert Make", "Make Bénin", "workflows Make",
    "Make vs Zapier", "Make pricing", "Make tutoriel", "Make.com",
    "Integromat migration", "Make routeur", "Make itérateur",
    "Make error handler", "Make webhooks", "Make API", "consultant Make",
  ],

  hero: {
    badge: { fr: "Automatisation Make.com", en: "Make.com Automation" },
    h1: { fr: "L'agence Make qui construit des scénarios capables de tenir à", en: "The Make agency building scenarios that scale to" },
    h1Highlight: { fr: "10 000 opérations/jour", en: "10,000 operations/day" },
    subtitle: {
      fr: "Make.com (ex-Integromat) est l'outil d'automatisation no-code le plus puissant du marché — à condition de maîtriser les routeurs, itérateurs, agrégateurs et error handlers. On construit pour vous des scénarios robustes, optimisés pour consommer 3x moins d'opérations, et entièrement éditables par votre équipe.",
      en: "Make.com (ex-Integromat) is the most powerful no-code automation tool on the market — provided you master routers, iterators, aggregators and error handlers. We build robust scenarios for you, optimized to burn 3x fewer operations, and fully editable by your team.",
    },
    trustStrip: [
      { value: "5-10j", label: { fr: "Déploiement", en: "Deployment" } },
      { value: "-66%", label: { fr: "Coût opérations", en: "Operations cost" } },
      { value: "1500+", label: { fr: "Apps connectables", en: "Connectable apps" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Make est une Rolls-Royce de l'automatisation, mais sans expertise on finit vite avec des scénarios fragiles, une facture qui explose et des bugs en production. Voici les 4 problèmes qu'on règle systématiquement quand un client arrive avec un Make déjà en place — ou qu'on évite de A à Z quand on démarre from scratch.",
      en: "Make is the Rolls-Royce of automation, but without expertise you quickly end up with fragile scenarios, a runaway bill and production bugs. Here are the 4 problems we systematically fix when a client arrives with an existing Make setup — or that we sidestep from day one when we build from scratch.",
    },
    items: [
      { icon: TrendingUp, title: { fr: "Votre facture Make explose chaque mois", en: "Your Make bill keeps exploding every month" },
        desc: { fr: "Vous avez démarré sur le plan Core à 9 €, vous êtes déjà à 99 €/mois et ça grimpe. La raison : des scénarios mal conçus qui consomment 10 opérations là où 1 suffirait. Sans audit, vous finirez sur le plan Enterprise à 290 €/mois avant la fin de l'année — alors qu'une optimisation propre divise la facture par 3.", en: "You started on the €9 Core plan, you're already at €99/month and climbing. The reason: poorly designed scenarios burning 10 ops where 1 would do. Without an audit, you'll hit the €290/month Enterprise plan before year-end — when a clean optimization cuts the bill by 3x." } },
      { icon: Settings, title: { fr: "Vos scénarios cassent sans prévenir", en: "Your scenarios break without warning" },
        desc: { fr: "Un module qui timeout, une API qui renvoie une erreur 429, un champ vide qui crashe tout le scénario… sans error handler ni retry logic, vos automatisations s'arrêtent en silence. Vous découvrez le problème 3 jours plus tard quand un client se plaint qu'il n'a jamais reçu sa facture.", en: "A module timing out, an API returning 429, an empty field crashing the whole scenario… without error handlers or retry logic, your automations silently die. You find out 3 days later when a customer complains they never got their invoice." } },
      { icon: BarChart3, title: { fr: "Vous traitez les enregistrements un par un, pas en batch", en: "You process records one by one, not in batches" },
        desc: { fr: "Au lieu d'utiliser un Aggregator + Iterator pour traiter 100 commandes en 1 scénario, votre setup déclenche 100 scénarios séparés. Résultat : 100x plus d'opérations consommées, 100x plus de chances qu'un appel API échoue, et un dashboard Make illisible. C'est le piège classique du débutant Make.", en: "Instead of using an Aggregator + Iterator to process 100 orders in 1 scenario, your setup triggers 100 separate scenario runs. Result: 100x more operations burned, 100x more chances an API call fails, and an unreadable Make dashboard. The classic Make beginner trap." } },
      { icon: Lightbulb, title: { fr: "Vous ne savez pas si Make ou Zapier est le bon choix", en: "You don't know if Make or Zapier is the right pick" },
        desc: { fr: "Zapier est plus simple, Make est plus puissant et 5x moins cher au volume, n8n est gratuit mais demande du self-hosting. Sans benchmark précis sur VOS cas d'usage, vous risquez de payer 3x le prix ou de bloquer sur des limitations dans 6 mois. On vous donne la réponse en 30 minutes lors de l'audit.", en: "Zapier is simpler, Make is more powerful and 5x cheaper at volume, n8n is free but needs self-hosting. Without a precise benchmark on YOUR use cases, you risk paying 3x the price or hitting limits in 6 months. We give you the answer in 30 minutes during the audit." } },
    ],
  },

  solution: {
    headline: { fr: "Des scénarios Make pros — robustes, optimisés, et que votre équipe sait modifier", en: "Pro-grade Make scenarios — robust, optimized, editable by your team" },
    intro: {
      fr: "On est experts certifiés Make.com depuis 2021 (avant le rebrand d'Integromat). On connaît les 1500+ apps natives, les modules HTTP/Webhook avancés, et surtout les patterns qui font la différence entre un scénario amateur qui crashe et un scénario pro qui tourne 5 ans sans intervention. Voici concrètement ce qu'on livre quand on construit votre stack Make.",
      en: "We've been Make.com certified experts since 2021 (before the Integromat rebrand). We know the 1500+ native apps, the advanced HTTP/Webhook modules, and above all the patterns that separate an amateur scenario that crashes from a pro scenario that runs for 5 years untouched. Here's what we ship when we build your Make stack.",
    },
    features: [
      { icon: Zap, title: { fr: "Scénarios avec routeurs et logique conditionnelle", en: "Scenarios with routers and conditional logic" },
        desc: { fr: "Vos workflows ne sont pas linéaires : un lead chaud va vers le commercial, un lead froid dans une séquence email, un client existant dans le CRM directement. On utilise les routeurs Make avec filtres avancés pour traiter chaque cas dans un seul scénario lisible, au lieu de 5 scénarios qui se chevauchent.", en: "Your workflows aren't linear: a hot lead goes to sales, a cold one into an email sequence, an existing customer straight to the CRM. We use Make routers with advanced filters to handle every case in one readable scenario, instead of 5 overlapping ones." } },
      { icon: RotateCcw, title: { fr: "Itérateurs et agrégateurs pour traiter en batch", en: "Iterators and aggregators for batch processing" },
        desc: { fr: "Au lieu de déclencher 1000 scénarios pour 1000 lignes, on en exécute 1 qui boucle proprement avec Iterator + Array Aggregator. Vous consommez 10x moins d'opérations, vos logs sont propres, et le debug se fait en 30 secondes au lieu de 30 minutes.", en: "Instead of triggering 1000 scenarios for 1000 rows, we run 1 that loops cleanly with Iterator + Array Aggregator. You burn 10x fewer ops, your logs stay clean, and debugging takes 30 seconds instead of 30 minutes." } },
      { icon: Shield, title: { fr: "Error handlers et retry logic intégrés", en: "Built-in error handlers and retry logic" },
        desc: { fr: "Chaque module critique a son error handler (Resume, Rollback, Break, Commit) avec une notification Slack ou email si quelque chose casse. Vos automatisations ne s'arrêtent plus en silence — vous êtes alerté dans la minute et le scénario reprend tout seul là où il s'est arrêté.", en: "Every critical module has its error handler (Resume, Rollback, Break, Commit) with a Slack or email alert if something breaks. Your automations no longer die silently — you're alerted within the minute and the scenario picks back up where it left off." } },
      { icon: Globe, title: { fr: "Modules HTTP & webhooks sur mesure", en: "Custom HTTP & webhook modules" },
        desc: { fr: "Quand une app n'a pas de module natif Make, on construit l'intégration à la main via les modules HTTP et Webhook. Toute API REST devient connectable en quelques minutes, avec authentification OAuth2, Bearer Token ou Basic Auth proprement gérée et stockée.", en: "When an app has no native Make module, we build the integration by hand using HTTP and Webhook modules. Any REST API becomes connectable in minutes, with OAuth2, Bearer Token or Basic Auth cleanly handled and stored." } },
      { icon: BarChart3, title: { fr: "Optimisation des opérations (cost-saving)", en: "Operations optimization (cost-saving)" },
        desc: { fr: "On revoit chaque scénario pour supprimer les opérations inutiles : filtres avant fetch, pagination optimisée, data stores au lieu de Google Sheets répétés, regroupement de modules. En moyenne, on divise par 3 la consommation d'opérations sans toucher au résultat fonctionnel.", en: "We review every scenario to kill wasted operations: filters before fetch, smart pagination, data stores instead of repeated Google Sheets calls, module consolidation. On average, we cut operations consumption by 3x without changing the functional outcome." } },
      { icon: FileCheck, title: { fr: "Documentation et formation de votre équipe", en: "Documentation and training for your team" },
        desc: { fr: "Chaque scénario livré est documenté (objectif, déclencheur, modules clés, points de défaillance). On forme 1 à 2 personnes de votre équipe à éditer, dupliquer et debugger les scénarios. Vous devenez autonome — on n'est plus indispensable au bout de 30 jours.", en: "Every shipped scenario is documented (purpose, trigger, key modules, failure points). We train 1-2 people on your team to edit, duplicate and debug scenarios. You become autonomous — we're no longer indispensable after 30 days." } },
    ],
  },

  howItWorks: {
    headline: { fr: "De l'audit aux scénarios en production — en 5 à 10 jours", en: "From audit to scenarios in production — in 5 to 10 days" },
    steps: [
      { icon: Search, title: { fr: "Audit Make existant ou cadrage from scratch", en: "Existing Make audit or from-scratch scoping" }, duration: { fr: "Jours 1-2", en: "Days 1-2" },
        desc: { fr: "Si vous avez déjà Make : on analyse vos scénarios existants, votre consommation d'opérations, vos error logs des 30 derniers jours, et on identifie les optimisations prioritaires. Si vous démarrez : on cartographie vos process actuels et on définit les 5-10 scénarios qui débloqueront le plus de valeur.", en: "If you already have Make: we analyze your existing scenarios, ops consumption, last 30 days of error logs, and identify priority optimizations. If you're starting: we map your current processes and define the 5-10 scenarios that will unlock the most value." } },
      { icon: Lightbulb, title: { fr: "Architecture & choix du plan Make", en: "Architecture & Make plan selection" }, duration: { fr: "Jour 3", en: "Day 3" },
        desc: { fr: "On dessine l'architecture complète : quels scénarios, quels triggers, quels modules, quels data stores, quels webhooks. On recommande le plan Make adapté (Free, Core, Pro, Teams, Enterprise) et on estime la consommation d'opérations mensuelles à ±10 % près.", en: "We design the full architecture: which scenarios, which triggers, which modules, which data stores, which webhooks. We recommend the right Make plan (Free, Core, Pro, Teams, Enterprise) and estimate monthly ops consumption within ±10%." } },
      { icon: Settings, title: { fr: "Construction des scénarios", en: "Scenario build" }, duration: { fr: "Jours 4-7", en: "Days 4-7" },
        desc: { fr: "On construit dans votre workspace Make tous les scénarios validés, avec routeurs, itérateurs, error handlers, filtres avancés et data stores. Connexions OAuth aux APIs (Google, Stripe, HubSpot, Shopify, etc.), tests unitaires de chaque branche, et review du code des modules HTTP custom.", en: "We build all approved scenarios in your Make workspace, with routers, iterators, error handlers, advanced filters and data stores. OAuth connections to APIs (Google, Stripe, HubSpot, Shopify, etc.), unit tests on every branch, and code review of custom HTTP modules." } },
      { icon: Rocket, title: { fr: "Tests réels & mise en production", en: "Real-world tests & go-live" }, duration: { fr: "Jours 8-9", en: "Days 8-9" },
        desc: { fr: "On stress-teste chaque scénario avec des données réelles (10, 100, 1000 enregistrements), on valide les error handlers en simulant des pannes API, puis on bascule en production avec un monitoring Slack actif. Si quelque chose casse dans la première semaine, on est alerté avant vous.", en: "We stress-test every scenario with real data (10, 100, 1000 records), validate error handlers by simulating API failures, then switch to production with active Slack monitoring. If anything breaks in week one, we're alerted before you." } },
      { icon: Handshake, title: { fr: "Formation, documentation & support 30 jours", en: "Training, documentation & 30-day support" }, duration: { fr: "Jour 10 + 30j", en: "Day 10 + 30d" },
        desc: { fr: "On forme votre équipe (2h en visio) à éditer, dupliquer et debugger les scénarios. On livre une documentation Notion claire pour chaque scénario. Pendant 30 jours, on assure le support, on corrige les bugs et on ajuste les scénarios gratuitement.", en: "We train your team (2h video call) to edit, duplicate and debug scenarios. We deliver clear Notion documentation for each scenario. For 30 days, we provide support, fix bugs and tune scenarios at no extra cost." } },
    ],
  },

  stats: [
    { value: "5-10", suffix: "j", label: { fr: "Délai de déploiement", en: "Deployment time" } },
    { value: "-66", suffix: "%", label: { fr: "Coût opérations Make", en: "Make ops cost" } },
    { value: "1500", suffix: "+", label: { fr: "Apps natives connectables", en: "Native apps connectable" } },
    { value: "99.5", suffix: "%", label: { fr: "Taux de succès scénarios", en: "Scenario success rate" } },
  ],

  useCases: {
    headline: { fr: "Les cas d'usage Make qu'on déploie le plus souvent", en: "The Make use cases we ship most often" },
    intro: {
      fr: "Make brille particulièrement sur les workflows complexes avec beaucoup de logique conditionnelle, du batch processing ou des intégrations API custom. Voici 4 secteurs où Make est presque toujours le bon choix — et les résultats concrets observés chez nos clients.",
      en: "Make particularly shines on complex workflows with heavy conditional logic, batch processing or custom API integrations. Here are 4 sectors where Make is almost always the right pick — and the concrete results we've seen with our clients.",
    },
    cases: [
      { icon: ShoppingCart, sector: { fr: "E-commerce multi-canal", en: "Multi-channel e-commerce" },
        problem: { fr: "Vous vendez sur Shopify, Amazon, Etsy et WhatsApp. Synchroniser stocks, commandes, facturation et SAV entre tous ces canaux est un cauchemar manuel.", en: "You sell on Shopify, Amazon, Etsy and WhatsApp. Syncing stock, orders, invoicing and after-sales across all those channels is a manual nightmare." },
        solution: { fr: "Un scénario Make central avec routeurs : chaque commande, peu importe le canal, est normalisée puis dispatchée vers le bon flow (facture Pennylane, mise à jour stock, email client, alerte Slack si rupture).", en: "One central Make scenario with routers: every order, regardless of channel, is normalized then dispatched to the right flow (Pennylane invoice, stock update, customer email, Slack alert if out-of-stock)." },
        result: { fr: "1 scénario remplace 8 outils Zapier, -75 % de coût d'abonnement, 0 rupture de stock non détectée depuis 6 mois.", en: "1 scenario replaces 8 Zapier setups, -75% subscription cost, 0 undetected stockouts in 6 months." } },
      { icon: Briefcase, sector: { fr: "Agences marketing & SaaS", en: "Marketing agencies & SaaS" },
        problem: { fr: "Vous gérez 30 clients, chacun avec son CRM, ses ads Meta/Google, son Slack, sa facturation. Le reporting mensuel prend 2 jours par compte.", en: "You manage 30 clients, each with their own CRM, Meta/Google ads, Slack and billing. Monthly reporting eats 2 days per account." },
        solution: { fr: "Scénarios Make qui agrègent automatiquement les métriques de chaque client dans un Google Sheet (puis Looker Studio), génèrent les factures Stripe en début de mois, et postent les rapports dans les Slack clients.", en: "Make scenarios that automatically aggregate each client's metrics into a Google Sheet (then Looker Studio), generate Stripe invoices at month-start, and post reports to client Slacks." },
        result: { fr: "Reporting mensuel passé de 60h à 2h, capacité de gérer 2x plus de clients sans embaucher.", en: "Monthly reporting cut from 60h to 2h, capacity to manage 2x more clients without hiring." } },
      { icon: Building2, sector: { fr: "Immobilier & Property Management", en: "Real estate & Property management" },
        problem: { fr: "Les leads viennent de 5 plateformes (SeLoger, Bien'ici, Le Bon Coin, site web, WhatsApp). Aucune n'a d'API moderne et les leads doublons noient votre CRM.", en: "Leads come from 5 platforms (SeLoger, Bien'ici, Le Bon Coin, your website, WhatsApp). None has a modern API and duplicate leads drown your CRM." },
        solution: { fr: "Make centralise tous les leads via webhooks et email parsing (modules Mailhook + HTTP), déduplique sur téléphone+email, enrichit avec les données publiques, puis pousse uniquement les leads uniques et qualifiés dans HubSpot.", en: "Make centralizes all leads via webhooks and email parsing (Mailhook + HTTP modules), dedupes on phone+email, enriches with public data, then pushes only unique qualified leads to HubSpot." },
        result: { fr: "0 doublon dans le CRM, +40 % de leads qualifiés réellement traités, 1 commercial libéré sur 3.", en: "0 CRM duplicates, +40% qualified leads actually worked, 1 sales rep freed out of 3." } },
      { icon: GraduationCap, sector: { fr: "Coachs, formateurs & infopreneurs", en: "Coaches, trainers & creators" },
        problem: { fr: "Vous vendez des formations sur Systeme.io, ThriveCart ou Stripe. Donner accès, envoyer le bon email, créer l'utilisateur dans la plateforme de cours, lancer la séquence onboarding — tout est manuel.", en: "You sell courses on Systeme.io, ThriveCart or Stripe. Granting access, sending the right email, creating the user in your LMS, kicking off the onboarding sequence — all manual." },
        solution: { fr: "Un scénario Make par produit acheté : webhook Stripe → création utilisateur Podia/Teachable → email de bienvenue personnalisé via Brevo → ajout dans une communauté Slack/Telegram → tag CRM pour la séquence longue.", en: "One Make scenario per product purchased: Stripe webhook → user creation in Podia/Teachable → personalized welcome email via Brevo → add to Slack/Telegram community → CRM tag for the long sequence." },
        result: { fr: "Onboarding 100 % automatisé, 0 client oublié, +20 min de temps de support gagné par vente.", en: "Fully automated onboarding, 0 forgotten customer, +20 min support time saved per sale." } },
    ],
  },

  stack: {
    headline: { fr: "L'écosystème Make qu'on maîtrise de bout en bout", en: "The Make ecosystem we master end-to-end" },
    intro: {
      fr: "Make est au centre, mais sa puissance vient des outils qu'il connecte. Voici la stack qu'on déploie le plus souvent autour de Make — chaque outil est choisi pour sa fiabilité, son rapport qualité-prix et sa compatibilité native.",
      en: "Make sits at the center, but its power comes from the tools it connects. Here's the stack we deploy most often around Make — every tool picked for reliability, price-quality ratio and native compatibility.",
    },
    tools: [
      { name: "Make.com (ex-Integromat)", role: { fr: "Cœur de l'automatisation — 1500+ apps natives, routeurs, itérateurs", en: "Automation core — 1500+ native apps, routers, iterators" } },
      { name: "Make Data Store", role: { fr: "Base de données interne Make pour persister entre scénarios", en: "Internal Make database to persist between scenarios" } },
      { name: "Webhooks & Custom HTTP", role: { fr: "Modules pour connecter n'importe quelle API REST sans intégration native", en: "Modules to connect any REST API without a native integration" } },
      { name: "Google Workspace", role: { fr: "Sheets, Drive, Calendar, Gmail — connexions natives ultra-fiables", en: "Sheets, Drive, Calendar, Gmail — rock-solid native connections" } },
      { name: "Airtable / Notion", role: { fr: "Bases de données no-code en input/output des scénarios", en: "No-code databases for scenario input/output" } },
      { name: "Stripe / PayPal / Mobile Money", role: { fr: "Triggers de paiement et facturation automatique", en: "Payment triggers and auto-invoicing" } },
      { name: "HubSpot / Pipedrive", role: { fr: "CRM cible pour leads qualifiés et pipeline commercial", en: "Target CRM for qualified leads and sales pipeline" } },
      { name: "Slack / Telegram", role: { fr: "Notifications opérationnelles et alertes d'erreur", en: "Operational notifications and error alerts" } },
      { name: "Shopify / WooCommerce", role: { fr: "E-commerce — sync stock, commandes, clients", en: "E-commerce — stock, orders, customers sync" } },
      { name: "OpenAI / Anthropic", role: { fr: "Modules IA dans les scénarios pour classification, génération, scoring", en: "AI modules in scenarios for classification, generation, scoring" } },
    ],
  },

  pricing: {
    headline: { fr: "Combien coûte une stack Make pro ?", en: "How much does a pro Make stack cost?" },
    intro: {
      fr: "Trois formules selon le nombre et la complexité des scénarios. Tarifs en EUR (paiement aussi accepté en XOF et USD, Mobile Money OK). Vous restez propriétaire de votre workspace Make — nous ne facturons aucune commission sur vos opérations.",
      en: "Three tiers based on the number and complexity of scenarios. Pricing in EUR (also accepted in XOF and USD, Mobile Money OK). You own your Make workspace — we charge zero commission on your operations.",
    },
    tiers: [
      { name: { fr: "Starter", en: "Starter" }, price: "250 €", priceNote: { fr: "1 scénario Make solide", en: "1 solid Make scenario" },
        features: [
          { fr: "1 scénario Make jusqu'à 5 modules", en: "1 Make scenario up to 5 modules" },
          { fr: "Connexion à 2 outils (CRM, email, etc.)", en: "Connection to 2 tools (CRM, email, etc.)" },
          { fr: "Filtres, formatage et error handler", en: "Filters, formatting and error handler" },
          { fr: "Documentation Notion fournie", en: "Notion documentation provided" },
          { fr: "Livraison en 48-72h · Support 14 jours", en: "Delivered in 48-72h · 14-day support" },
        ] },
      { name: { fr: "Pro (recommandé)", en: "Pro (recommended)" }, price: "600 €", priceNote: { fr: "Stack Make complète", en: "Full Make stack" }, highlight: true,
        features: [
          { fr: "3 à 5 scénarios avancés avec routeurs et itérateurs", en: "3 to 5 advanced scenarios with routers and iterators" },
          { fr: "Error handlers + notifications Slack/email", en: "Error handlers + Slack/email notifications" },
          { fr: "Optimisation des opérations (cost-saving)", en: "Operations optimization (cost-saving)" },
          { fr: "Connexion à 5+ outils + 1 module HTTP custom", en: "Connection to 5+ tools + 1 custom HTTP module" },
          { fr: "Formation équipe (2h visio) + documentation complète", en: "Team training (2h video) + full documentation" },
          { fr: "Livraison en 5-10 jours · Support 30 jours", en: "Delivered in 5-10 days · 30-day support" },
        ] },
      { name: { fr: "Enterprise", en: "Enterprise" }, price: "à partir de 1 500 €", priceNote: { fr: "Migration & architectures complexes", en: "Migration & complex architectures" },
        features: [
          { fr: "Audit complet d'un workspace Make existant", en: "Full audit of an existing Make workspace" },
          { fr: "10+ scénarios interconnectés avec data stores", en: "10+ interconnected scenarios with data stores" },
          { fr: "Migration depuis Zapier, n8n ou scripts custom", en: "Migration from Zapier, n8n or custom scripts" },
          { fr: "Modules HTTP custom + intégrations API privées", en: "Custom HTTP modules + private API integrations" },
          { fr: "Refacturation Make Teams ou Enterprise gérée", en: "Make Teams or Enterprise re-billing handled" },
          { fr: "Livraison en 2-4 semaines · Maintenance optionnelle", en: "Delivered in 2-4 weeks · Optional maintenance" },
        ] },
    ],
  },

  faq: [
    { q: { fr: "Make ou Zapier : lequel choisir en 2026 ?", en: "Make or Zapier: which to pick in 2026?" },
      a: { fr: "Make gagne dès qu'on a un peu de volume ou de complexité. À fonctionnalité équivalente, Make coûte 3 à 5x moins cher que Zapier au volume (10 000 ops à 9 € chez Make vs 100 tâches à 73 € chez Zapier). Make permet aussi des routeurs, itérateurs et logique conditionnelle bien plus poussée. Zapier reste plus simple à prendre en main pour 1-2 automatisations basiques. Notre règle : si vous dépassez 1000 tâches/mois ou si vos workflows ont des branches, Make est presque toujours le bon choix.", en: "Make wins as soon as you have volume or complexity. At feature parity, Make costs 3 to 5x less than Zapier at scale (10,000 ops at €9 on Make vs 100 tasks at €73 on Zapier). Make also offers routers, iterators and much deeper conditional logic. Zapier remains simpler to grasp for 1-2 basic automations. Our rule: if you exceed 1000 tasks/month or your workflows have branches, Make is almost always the right call." } },
    { q: { fr: "Quel plan Make.com choisir pour mon entreprise ?", en: "Which Make.com plan should my business pick?" },
      a: { fr: "Make Free (1000 ops/mois) suffit pour tester ou pour des automatisations très légères. Make Core (9 €/mois, 10k ops) couvre une PME avec 3-5 scénarios. Make Pro (16 €/mois, 10k ops + scheduling avancé) est notre recommandation par défaut. Make Teams (29 €/mois) ajoute la collaboration multi-utilisateurs. Make Enterprise (sur devis) débloque SSO, audit logs et SLA. On vous recommande le bon plan pendant l'audit en fonction de votre volume estimé d'opérations.", en: "Make Free (1000 ops/month) is enough to test or for very light automations. Make Core (€9/month, 10k ops) covers an SME with 3-5 scenarios. Make Pro (€16/month, 10k ops + advanced scheduling) is our default recommendation. Make Teams (€29/month) adds multi-user collaboration. Make Enterprise (custom) unlocks SSO, audit logs and SLA. We recommend the right plan during the audit based on your estimated ops volume." } },
    { q: { fr: "Pouvez-vous migrer mes scénarios Integromat vers le nouveau Make ?", en: "Can you migrate my Integromat scenarios to the new Make?" },
      a: { fr: "Oui, et c'est même l'une de nos spécialités. La migration Integromat vers Make est techniquement automatique (Make a migré les comptes), mais en pratique beaucoup de scénarios cassent à cause de modules dépréciés, d'OAuth à reconnecter ou de webhooks à mettre à jour. On reprend chaque scénario, on le teste, on remplace ce qui ne marche plus, et on en profite pour optimiser la consommation d'opérations. Comptez 5-10 jours pour migrer une stack Integromat moyenne.", en: "Yes, and it's one of our specialties. Integromat to Make migration is technically automatic (Make migrated the accounts), but in practice many scenarios break due to deprecated modules, OAuth reconnects or webhook updates. We pick up each scenario, test it, replace what no longer works, and take the chance to optimize ops consumption. Budget 5-10 days to migrate an average Integromat stack." } },
    { q: { fr: "Comment fonctionne la facturation Make et comment réduire le coût ?", en: "How does Make billing work and how do you cut costs?" },
      a: { fr: "Make facture en opérations (1 module exécuté = 1 opération en général). 10 000 ops coûtent 9 €. Pour réduire la facture : utiliser des Iterators au lieu de scénarios séparés, mettre les filtres AVANT les modules coûteux (pas après), utiliser les Data Stores au lieu de re-fetcher Google Sheets 50 fois, désactiver les scénarios non utilisés. Sur les workspaces qu'on optimise, on divise typiquement la facture par 3 sans perdre une fonctionnalité. C'est inclus dans notre offre Pro.", en: "Make charges in operations (1 module executed = 1 operation generally). 10,000 ops cost €9. To cut the bill: use Iterators instead of separate scenarios, place filters BEFORE expensive modules (not after), use Data Stores instead of re-fetching Google Sheets 50 times, disable unused scenarios. On the workspaces we optimize, we typically cut the bill by 3x without losing a single feature. Included in our Pro offer." } },
    { q: { fr: "Et si une API qu'on utilise n'a pas de module Make natif ?", en: "What if an API we use has no native Make module?" },
      a: { fr: "Pas de problème, Make a un module HTTP générique qui permet d'attaquer n'importe quelle API REST (GET, POST, PUT, DELETE) avec n'importe quelle authentification (OAuth2, Bearer, Basic, API Key). On construit le module sur mesure, on gère le refresh token si besoin, et on le documente comme un module natif. C'est inclus dans le plan Pro (1 module HTTP custom) et illimité dans le plan Enterprise.", en: "No problem, Make has a generic HTTP module that lets you hit any REST API (GET, POST, PUT, DELETE) with any auth (OAuth2, Bearer, Basic, API Key). We build the module by hand, handle token refresh if needed, and document it like a native module. Included in the Pro plan (1 custom HTTP module) and unlimited in the Enterprise plan." } },
    { q: { fr: "Que se passe-t-il si un de mes scénarios Make plante en pleine nuit ?", en: "What happens if one of my Make scenarios crashes in the middle of the night?" },
      a: { fr: "Sur tous les scénarios Pro et Enterprise qu'on livre, on installe des error handlers (Resume, Rollback, Break, Commit) qui rattrapent les erreurs API les plus courantes (timeout, 429 rate limit, 500). Si une erreur fatale survient malgré tout, on envoie une notification immédiate sur votre Slack ou email avec le détail (scénario, module, payload). Pendant les 30 jours de support inclus, on corrige nous-mêmes les bugs critiques sous 24h ouvrées.", en: "On every Pro and Enterprise scenario we ship, we install error handlers (Resume, Rollback, Break, Commit) that catch the most common API errors (timeout, 429 rate limit, 500). If a fatal error still happens, we send an immediate notification to your Slack or email with the details (scenario, module, payload). During the 30-day included support, we personally fix critical bugs within 24 business hours." } },
    { q: { fr: "Mon équipe pourra-t-elle modifier les scénarios sans vous ?", en: "Will my team be able to edit scenarios without you?" },
      a: { fr: "Oui, c'est même un objectif explicite. Make est l'un des outils no-code les plus accessibles : une fois la formation de 2h faite, votre équipe peut ajouter un module, changer un filtre, modifier un email, ou même dupliquer un scénario complet pour un nouveau cas d'usage. On laisse aussi une documentation Notion détaillée pour chaque scénario. Vous n'êtes plus dépendant de nous au bout de 30 jours — sauf si vous voulez nous garder en support continu (pack optionnel à 80 €/mois).", en: "Yes, it's an explicit goal. Make is one of the most accessible no-code tools: after the 2h training, your team can add a module, change a filter, edit an email, or even duplicate a whole scenario for a new use case. We also leave detailed Notion documentation for each scenario. You stop depending on us after 30 days — unless you want to keep us on ongoing support (optional pack at €80/month)." } },
    { q: { fr: "Travaillez-vous avec des clients hors Bénin ?", en: "Do you work with clients outside Benin?" },
      a: { fr: "Oui, on travaille 100 % à distance avec des clients en France, Belgique, Canada, Côte d'Ivoire, Sénégal, Maroc et Togo. Toute la collaboration se fait par visio, Slack/WhatsApp, et Notion. Paiement accepté en EUR, USD ou XOF — virement, Stripe, ou Mobile Money (MTN, Moov, Wave) pour la zone Afrique de l'Ouest. Aucune différence de qualité ou de délai selon votre pays.", en: "Yes, we work 100% remotely with clients in France, Belgium, Canada, Côte d'Ivoire, Senegal, Morocco and Togo. All collaboration happens via video calls, Slack/WhatsApp, and Notion. Payment accepted in EUR, USD or XOF — bank transfer, Stripe, or Mobile Money (MTN, Moov, Wave) for the West Africa zone. No difference in quality or timeline based on your country." } },
  ],

  relatedSlugs: ["automatisation-no-code", "automatisation-n8n", "automatisation-zapier", "chatbot-whatsapp-business"],

  cta: {
    headline: { fr: "Et si on auditait votre Make en 30 minutes — gratuitement ?", en: "What if we audited your Make in 30 minutes — free?" },
    desc: { fr: "On regarde ensemble vos scénarios actuels (ou ce que vous voulez automatiser), on identifie les optimisations prioritaires et on chiffre précisément le projet. Pas d'engagement, pas de blabla — un audit concret, livrable même si vous ne travaillez jamais avec nous.", en: "Together we look at your current scenarios (or what you want to automate), identify priority optimizations and price the project precisely. No commitment, no fluff — a concrete audit, deliverable even if you never end up working with us." },
    primaryLabel: { fr: "Réserver mon audit Make gratuit", en: "Book my free Make audit" },
    secondaryLabel: { fr: "Voir tous nos services", en: "See all our services" },
  },
};

/* ── Long-tail : n8n Self-Hosted ── */
const automatisationN8n: ServicePage = {
  slug: "automatisation-n8n",
  type: "long-tail",
  category: "Automatisation",
  pillarSlug: "automatisation-no-code",
  color: "emerald",
  icon: Zap,
  heroIllustration: "automation-flow",

  metaTitle: {
    fr: "Expert n8n Self-Hosted — Workflows Souverains RGPD · Hébergement Hetzner/OVH",
    en: "n8n Self-Hosted Expert — Sovereign GDPR Workflows · Hetzner/OVH Hosting",
  },
  metaDescription: {
    fr: "Agence n8n : on installe, configure et sécurise n8n sur votre serveur (Docker, Hetzner, OVH). Workflows illimités, données souveraines, conformité RGPD/HDS. Idéal SaaS, fintech, santé. Setup dès 80 €, audit gratuit.",
    en: "n8n agency: we install, configure and secure n8n on your server (Docker, Hetzner, OVH). Unlimited workflows, sovereign data, GDPR/HDS compliance. Ideal for SaaS, fintech, health. Setup from €80, free audit.",
  },
  keywords: [
    "n8n self-hosted", "n8n workflows", "n8n vs Zapier", "n8n Make alternative",
    "n8n RGPD", "n8n Docker", "n8n hébergement", "agence n8n", "expert n8n",
    "n8n Bénin", "n8n Afrique", "n8n custom nodes", "n8n Hetzner", "n8n OVH",
    "n8n cloud vs self-host", "automatisation open source", "n8n SaaS", "n8n fintech",
  ],

  hero: {
    badge: { fr: "Automatisation n8n self-hosted", en: "n8n self-hosted automation" },
    h1: { fr: "n8n installé sur votre serveur — workflows illimités,", en: "n8n installed on your server — unlimited workflows," },
    h1Highlight: { fr: "données 100 % souveraines", en: "100% sovereign data" },
    subtitle: {
      fr: "On installe n8n (open-source) sur votre infrastructure Hetzner, OVH ou Scaleway, on le sécurise (HTTPS, backups, SSO, audit log) et on construit vos workflows les plus complexes — sans plafond d'opérations, sans tarif par tâche, sans envoyer vos données chez un tiers américain. Idéal pour SaaS, fintech, santé et agences qui manipulent de la donnée sensible.",
      en: "We install n8n (open-source) on your Hetzner, OVH or Scaleway infrastructure, secure it (HTTPS, backups, SSO, audit log) and build your most complex workflows — no operations cap, no per-task pricing, no sending your data to a US third party. Ideal for SaaS, fintech, health and agencies handling sensitive data.",
    },
    trustStrip: [
      { value: "0 €", label: { fr: "Licence logicielle", en: "Software license" } },
      { value: "∞", label: { fr: "Opérations / mois", en: "Operations / month" } },
      { value: "RGPD", label: { fr: "Hébergement UE", en: "EU hosting" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Vous avez déjà testé Zapier ou Make et vous êtes vite tombé sur les limites : facture qui explose à mesure que le volume grandit, données qui transitent par des serveurs américains, impossibilité de faire tourner du code custom, et zéro contrôle quand l'outil change ses CGU. Pour un SaaS qui scale, une fintech sous DSP2, un cabinet sous secret médical ou une agence qui héberge la donnée de ses clients, ce n'est plus tenable. Voici les 4 murs concrets contre lesquels nos clients se cognent — avant qu'on migre tout sur n8n self-hosted.",
      en: "You've tried Zapier or Make and quickly hit the ceiling: bills exploding as volume grows, data flowing through US servers, no way to run custom code, and zero control when the vendor changes its terms. For a scaling SaaS, a PSD2 fintech, a medical practice under confidentiality or an agency hosting client data, it's no longer viable. Here are the 4 concrete walls our clients hit — before we migrate everything to self-hosted n8n.",
    },
    items: [
      { icon: TrendingUp, title: { fr: "Votre facture Zapier/Make double chaque trimestre", en: "Your Zapier/Make bill doubles every quarter" },
        desc: { fr: "Au-delà de 10 000 opérations/mois, Zapier passe à 73 €/mois, Make à 90 €, puis 200, puis 400. Un SaaS qui synchronise 100 000 événements/mois paye 600 à 1 200 €/mois — pour ce que n8n self-hosted fait sur un serveur Hetzner à 6 €/mois. À l'année, c'est 10 000 € qui partent en pure perte de marge.", en: "Beyond 10,000 ops/month, Zapier jumps to €73/mo, Make to €90, then 200, then 400. A SaaS syncing 100k events/month pays €600 to €1,200/mo — for what self-hosted n8n does on a €6/mo Hetzner box. At year-end that's €10,000 of pure margin lost." } },
      { icon: Shield, title: { fr: "Vos données sensibles transitent par des serveurs hors UE", en: "Your sensitive data flows through non-EU servers" },
        desc: { fr: "Zapier (US), Make (cloud Europe mais maison-mère Tchèque), Pipedream, IFTTT : à chaque automatisation, vos emails clients, vos factures, vos données de santé passent par des serveurs tiers. Pour une clinique, un cabinet d'avocats ou un SaaS B2B, c'est un risque RGPD majeur et un blocage commercial avec les grands comptes qui exigent la souveraineté.", en: "Zapier (US), Make (EU cloud but Czech parent), Pipedream, IFTTT: every automation routes your customer emails, invoices and health data through third-party servers. For a clinic, a law firm or a B2B SaaS, that's a major GDPR risk and a deal-breaker with enterprise customers who require sovereignty." } },
      { icon: Settings, title: { fr: "Vous ne pouvez pas faire ce que vous voulez vraiment", en: "You can't actually do what you want" },
        desc: { fr: "Un connecteur Zapier ne supporte pas votre endpoint custom. Make plafonne à 40 modules par scénario. Vous voulez exécuter du Python métier, brancher une LLM locale (Ollama, Mistral), parser un PDF spécifique ? Sur les outils cloud, vous êtes coincé. Sur n8n self-hosted, vous installez ce que vous voulez — y compris vos propres nœuds custom en TypeScript.", en: "A Zapier connector doesn't support your custom endpoint. Make caps at 40 modules per scenario. You want to run domain Python, hit a local LLM (Ollama, Mistral), parse a specific PDF? On cloud tools you're stuck. On self-hosted n8n you install whatever you want — including your own TypeScript custom nodes." } },
      { icon: Clock, title: { fr: "Vous dépendez d'un éditeur qui peut tout casser du jour au lendemain", en: "You depend on a vendor that can break everything overnight" },
        desc: { fr: "Zapier a déjà migré des plans, supprimé des connecteurs, multiplié des prix par 3. Make a coupé son free tier en 2023. Si demain l'éditeur ferme un connecteur clé ou triple ses tarifs, vos workflows critiques tombent — et vous n'avez aucun recours. Avec n8n auto-hébergé, vous possédez tout : le code, les workflows, l'historique, l'infra.", en: "Zapier has already migrated plans, killed connectors, tripled prices. Make cut its free tier in 2023. If tomorrow the vendor drops a key connector or triples its pricing, your critical workflows go down — with zero recourse. With self-hosted n8n you own everything: code, workflows, history, infra." } },
    ],
  },

  solution: {
    headline: { fr: "n8n installé chez vous, par des experts — pas chez Zapier, pas chez Make", en: "n8n installed at your place by experts — not at Zapier, not at Make" },
    intro: {
      fr: "On déploie n8n en mode self-hosted sur l'hébergeur de votre choix (Hetzner, OVH, Scaleway, Infomaniak, ou votre Kubernetes interne), en Docker ou Docker Compose, derrière un reverse proxy Traefik/Caddy avec SSL automatique. Tout est documenté, tout est versionné, votre équipe garde la main. Voici ce qu'on livre concrètement avec chaque installation.",
      en: "We deploy n8n in self-hosted mode on the hosting provider of your choice (Hetzner, OVH, Scaleway, Infomaniak, or your in-house Kubernetes), in Docker or Docker Compose, behind a Traefik/Caddy reverse proxy with auto SSL. Everything is documented, everything is versioned, your team stays in control. Here's what we ship with every install.",
    },
    features: [
      { icon: Shield, title: { fr: "Installation sécurisée sur votre serveur UE", en: "Secure install on your EU server" },
        desc: { fr: "Docker + Docker Compose, PostgreSQL en base, Redis pour la queue, HTTPS via Let's Encrypt, basic auth + SSO Google/Azure AD, backups automatiques chiffrés vers S3 ou Backblaze. Aucune donnée ne quitte votre infrastructure.", en: "Docker + Docker Compose, PostgreSQL as backend, Redis for the queue, HTTPS via Let's Encrypt, basic auth + Google/Azure AD SSO, encrypted automated backups to S3 or Backblaze. No data ever leaves your infrastructure." } },
      { icon: Zap, title: { fr: "Workflows illimités, sans coût par opération", en: "Unlimited workflows, no per-op cost" },
        desc: { fr: "Sur n8n self-hosted, vous payez 6 à 40 €/mois de serveur — et vous tournez 50 000, 500 000 ou 5 millions d'opérations sans changer de plan. Idéal pour les SaaS, e-commerces volumineux et back-office data lourds.", en: "On self-hosted n8n, you pay €6 to €40/mo of server — and run 50,000, 500,000 or 5 million ops with no plan change. Ideal for SaaS, high-volume e-commerce and heavy data back-offices." } },
      { icon: Cpu, title: { fr: "Nodes custom en TypeScript pour vos besoins métier", en: "Custom TypeScript nodes for your business needs" },
        desc: { fr: "Votre ERP maison, votre API interne, votre scoring IA propriétaire : on développe les nodes n8n sur mesure pour les brancher comme n'importe quel connecteur standard. Réutilisables dans tous vos workflows, versionnés sur Git.", en: "Your in-house ERP, your internal API, your proprietary AI scoring: we build custom n8n nodes to plug them in like any standard connector. Reusable across all your workflows, versioned on Git." } },
      { icon: BarChart3, title: { fr: "Monitoring & audit log conformes RGPD/HDS", en: "GDPR/HDS-compliant monitoring & audit log" },
        desc: { fr: "Dashboard Grafana/Uptime Kuma sur vos workflows, alertes Slack/email en cas d'échec, journalisation complète des exécutions avec rétention configurable. Vous gardez la traçabilité exigée par vos audits et certifications.", en: "Grafana/Uptime Kuma dashboard on your workflows, Slack/email alerts on failure, full execution logging with configurable retention. You keep the auditability required by your certifications and reviews." } },
      { icon: RotateCcw, title: { fr: "Migration depuis Make, Zapier ou Power Automate", en: "Migration from Make, Zapier or Power Automate" },
        desc: { fr: "On reprend vos scénarios existants un par un, on les réécrit en workflows n8n équivalents (ou meilleurs), on les teste en parallèle pendant 7 jours, puis on bascule. Aucune coupure, aucune perte de donnée historique.", en: "We take your existing scenarios one by one, rewrite them as equivalent (or better) n8n workflows, run them in parallel for 7 days, then cut over. Zero downtime, zero historical data loss." } },
      { icon: Users, title: { fr: "Formation de votre équipe technique & métier", en: "Training for your tech and business teams" },
        desc: { fr: "On forme votre dev/ops à l'administration n8n (Docker, backups, mises à jour) et votre équipe métier à la création de workflows simples via l'éditeur visuel. Autonomie totale en 5 demi-journées.", en: "We train your dev/ops on n8n administration (Docker, backups, upgrades) and your business team on building simple workflows via the visual editor. Full autonomy in 5 half-days." } },
    ],
  },

  howItWorks: {
    headline: { fr: "De l'infrastructure vide aux workflows en production — en 7 à 14 jours", en: "From empty infrastructure to live workflows — in 7 to 14 days" },
    steps: [
      { icon: Search, title: { fr: "Audit infra & cartographie des workflows", en: "Infra audit & workflow mapping" }, duration: { fr: "Jours 1-2", en: "Days 1-2" },
        desc: { fr: "On analyse votre stack actuelle (outils, volumes, contraintes RGPD/HDS), on inventorie les automatisations à migrer ou créer, et on choisit avec vous l'hébergeur cible (Hetzner CX22 pour démarrer, OVH ou cloud privé pour la prod sensible).", en: "We analyze your current stack (tools, volumes, GDPR/HDS constraints), inventory the automations to migrate or build, and pick the target host with you (Hetzner CX22 to start, OVH or private cloud for sensitive prod)." } },
      { icon: Settings, title: { fr: "Installation & sécurisation de n8n", en: "n8n install & hardening" }, duration: { fr: "Jours 3-4", en: "Days 3-4" },
        desc: { fr: "Provisioning serveur, déploiement Docker Compose (n8n + PostgreSQL + Redis), reverse proxy Caddy avec SSL automatique, SSO, backups chiffrés vers S3, monitoring Uptime Kuma. Documentation runbook livrée.", en: "Server provisioning, Docker Compose deploy (n8n + PostgreSQL + Redis), Caddy reverse proxy with auto SSL, SSO, encrypted S3 backups, Uptime Kuma monitoring. Runbook documentation delivered." } },
      { icon: Zap, title: { fr: "Construction des workflows critiques", en: "Building the critical workflows" }, duration: { fr: "Jours 5-10", en: "Days 5-10" },
        desc: { fr: "On code vos 5 à 15 workflows prioritaires : sync CRM, facturation, onboarding clients, scoring IA, reporting. Chaque workflow est testé en dry-run, versionné sur Git, et documenté pour vos équipes.", en: "We build your 5 to 15 priority workflows: CRM sync, billing, customer onboarding, AI scoring, reporting. Each workflow is dry-run tested, Git-versioned, and documented for your team." } },
      { icon: Rocket, title: { fr: "Migration & bascule production", en: "Migration & production cutover" }, duration: { fr: "Jours 11-12", en: "Days 11-12" },
        desc: { fr: "Si vous veniez de Make/Zapier, on fait tourner les deux systèmes en parallèle 7 jours pour valider la parité, puis on coupe l'ancien. Sinon, mise en production directe avec smoke tests sur données réelles.", en: "If you came from Make/Zapier, we run both systems in parallel for 7 days to validate parity, then shut the old one down. Otherwise, direct production rollout with smoke tests on live data." } },
      { icon: Handshake, title: { fr: "Formation & maintien en condition opérationnelle", en: "Training & ongoing operations" }, duration: { fr: "Jours 13-14 + 60 jours", en: "Days 13-14 + 60 days" },
        desc: { fr: "Formation tech (admin n8n, Docker, backups) et métier (création de workflows simples), puis 60 jours de support sur Slack pour répondre aux questions, debugger, et optimiser. Vous repartez 100 % autonome.", en: "Tech training (n8n admin, Docker, backups) and business training (simple workflow building), then 60 days of Slack support to answer questions, debug, and optimize. You leave 100% autonomous." } },
    ],
  },

  stats: [
    { value: "0", suffix: " €/mois", label: { fr: "Licence n8n (open-source)", en: "n8n license (open-source)" } },
    { value: "-85", suffix: " %", label: { fr: "Coût vs Zapier à volume", en: "Cost vs Zapier at scale" } },
    { value: "100", suffix: " %", label: { fr: "Données hébergées chez vous", en: "Data hosted on your infra" } },
    { value: "7-14", suffix: "j", label: { fr: "Mise en production", en: "To production" } },
  ],

  useCases: {
    headline: { fr: "Pour qui n8n self-hosted change vraiment la donne", en: "Who self-hosted n8n really changes the game for" },
    intro: {
      fr: "n8n n'est pas pour tout le monde — pour un freelance qui fait 200 opérations/mois, Zapier suffit. Mais dès qu'on parle volumes lourds, données sensibles ou logique métier custom, le self-hosted devient incontournable. Voici les 4 profils où on a déjà livré et où le ROI saute aux yeux.",
      en: "n8n isn't for everyone — for a freelancer running 200 ops/month, Zapier is fine. But as soon as you talk heavy volume, sensitive data or custom business logic, self-hosting becomes a no-brainer. Here are the 4 profiles where we've shipped and the ROI is obvious.",
    },
    cases: [
      { icon: Rocket, sector: { fr: "SaaS B2B en croissance", en: "Scaling B2B SaaS" },
        problem: { fr: "Votre produit synchronise 200 000 événements/mois entre Stripe, HubSpot, votre base PostgreSQL et Slack. Facture Make : 600 €/mois, et chaque feature ajoutée fait grimper la note.", en: "Your product syncs 200,000 events/month between Stripe, HubSpot, your PostgreSQL DB and Slack. Make bill: €600/mo, and every new feature drives it up." },
        solution: { fr: "Migration complète sur n8n self-hosted (Hetzner CPX31, 22 €/mois), Redis pour la queue, Git pour le versioning, monitoring Grafana. Vos devs reprennent la main sur les workflows.", en: "Full migration to self-hosted n8n (Hetzner CPX31, €22/mo), Redis for queueing, Git for versioning, Grafana monitoring. Your devs get back control of the workflows." },
        result: { fr: "Économie de 7 000 €/an sur la facture Make, scalabilité illimitée, MTTR divisé par 4 grâce aux logs centralisés.", en: "€7,000/year saved on the Make bill, unlimited scaling, MTTR divided by 4 thanks to centralized logs." } },
      { icon: Briefcase, sector: { fr: "Fintech & néobanques", en: "Fintech & neobanks" },
        problem: { fr: "Vos workflows touchent à la KYC, aux paiements et aux données bancaires. Impossible de les faire transiter par un SaaS US ou de les confier à un éditeur non audité. La conformité DSP2 et ACPR exige la maîtrise totale.", en: "Your workflows touch KYC, payments and banking data. Impossible to route them through a US SaaS or trust an unaudited vendor. PSD2 and regulator compliance demand full control." },
        solution: { fr: "n8n déployé sur votre cloud privé OVH ou Scaleway, isolé en VPC, avec SSO Azure AD, audit log immuable, chiffrement au repos. Workflows custom pour vérif KYC, alertes AML, reconciliation paiements.", en: "n8n deployed on your OVH or Scaleway private cloud, VPC-isolated, with Azure AD SSO, immutable audit log, encryption at rest. Custom workflows for KYC checks, AML alerts, payment reconciliation." },
        result: { fr: "Conformité validée par audit externe, 0 dépendance fournisseur, automatisation de 15 process critiques.", en: "Compliance signed off by external audit, 0 vendor lock-in, 15 critical processes automated." } },
      { icon: Stethoscope, sector: { fr: "Santé & cliniques HDS", en: "Health & HDS clinics" },
        problem: { fr: "Vos workflows manipulent des données patient (RDV, ordonnances, suivi). Le secret médical et le référentiel HDS interdisent toute fuite vers un outil cloud non certifié.", en: "Your workflows handle patient data (appointments, prescriptions, monitoring). Medical confidentiality and HDS rules forbid any leak to an uncertified cloud tool." },
        solution: { fr: "n8n sur OVH HDS, chiffrement TLS partout, pseudonymisation des données avant traitement, intégration Doctolib, Maiia, Pennylane. Backups chiffrés en France, rétention conforme.", en: "n8n on OVH HDS, TLS encryption everywhere, data pseudonymization before processing, Doctolib, Maiia, Pennylane integrations. Encrypted backups in France, compliant retention." },
        result: { fr: "Conformité HDS maintenue, 12h/semaine économisées sur le secrétariat, no-show divisé par 2.", en: "HDS compliance maintained, 12h/week saved on admin work, no-shows halved." } },
      { icon: Building2, sector: { fr: "Agences & ESN clients sensibles", en: "Agencies & IT services with sensitive clients" },
        problem: { fr: "Vous gérez la donnée de plusieurs clients grands comptes qui exigent par contrat que rien ne sorte de l'Europe. Make et Zapier sont blacklistés dans leur DPA.", en: "You handle data for several enterprise clients whose contracts require that nothing leaves Europe. Make and Zapier are blacklisted in their DPA." },
        solution: { fr: "Une instance n8n par client (multi-tenant via Docker Compose), hébergée sur Hetzner Falkenstein, gérée par GoScaleStudio avec SLA 99,5 %. Vous facturez l'automatisation comme une prestation à valeur ajoutée.", en: "One n8n instance per client (multi-tenant via Docker Compose), hosted on Hetzner Falkenstein, managed by GoScaleStudio with 99.5% SLA. You bill automation as a value-added service." },
        result: { fr: "Nouveau revenu récurrent +40 %, satisfaction client renforcée, 0 incident de fuite en 18 mois.", en: "+40% new recurring revenue, stronger client satisfaction, 0 leak incidents in 18 months." } },
    ],
  },

  stack: {
    headline: { fr: "La stack technique qu'on déploie autour de n8n", en: "The tech stack we deploy around n8n" },
    intro: {
      fr: "n8n est le cœur, mais une instance production sérieuse ne tourne jamais seule. Voici les briques qu'on assemble pour livrer un environnement fiable, monitoré et facilement maintenable par vos équipes.",
      en: "n8n is the core, but a serious production instance never runs alone. Here are the bricks we assemble to deliver a reliable, monitored environment your team can maintain.",
    },
    tools: [
      { name: "n8n", role: { fr: "Moteur de workflows open-source, hébergé chez vous", en: "Open-source workflow engine, hosted at your place" } },
      { name: "Docker & Docker Compose", role: { fr: "Conteneurisation et orchestration locale simple", en: "Containerization and simple local orchestration" } },
      { name: "Hetzner Cloud", role: { fr: "Hébergement UE performant dès 6 €/mois (Falkenstein, Helsinki)", en: "High-perf EU hosting from €6/mo (Falkenstein, Helsinki)" } },
      { name: "OVHcloud (HDS / SecNumCloud)", role: { fr: "Hébergement souverain France pour données sensibles", en: "Sovereign France hosting for sensitive data" } },
      { name: "Scaleway / Infomaniak", role: { fr: "Alternatives 100 % UE pour la production", en: "100% EU alternatives for production" } },
      { name: "PostgreSQL", role: { fr: "Base de données n8n persistante et performante", en: "Persistent, high-perf n8n database" } },
      { name: "Redis", role: { fr: "Queue de jobs pour exécution scalable (mode queue)", en: "Job queue for scalable execution (queue mode)" } },
      { name: "Caddy / Traefik", role: { fr: "Reverse proxy avec SSL Let's Encrypt automatique", en: "Reverse proxy with auto Let's Encrypt SSL" } },
      { name: "Custom nodes TypeScript", role: { fr: "Nodes sur mesure pour vos APIs internes et logique métier", en: "Custom nodes for your internal APIs and business logic" } },
      { name: "Grafana + Uptime Kuma", role: { fr: "Monitoring workflows, alertes Slack/email", en: "Workflow monitoring, Slack/email alerts" } },
    ],
  },

  pricing: {
    headline: { fr: "Combien coûte un n8n self-hosted bien fait ?", en: "What does a properly built self-hosted n8n cost?" },
    intro: {
      fr: "Trois formules selon votre niveau de criticité. Le coût serveur (6 à 40 €/mois chez Hetzner ou OVH) est en sus et payé directement par vous chez l'hébergeur. Paiement EUR, XOF ou USD, en une fois ou 50/50.",
      en: "Three tiers depending on your criticality level. Server cost (€6 to €40/mo at Hetzner or OVH) is extra and paid directly by you to the host. Pay in EUR, XOF or USD, upfront or 50/50.",
    },
    tiers: [
      { name: { fr: "Starter", en: "Starter" }, price: "350 €", priceNote: { fr: "Installation & setup", en: "Install & setup" },
        features: [
          { fr: "Provisioning serveur Hetzner CX22 (6 €/mois)", en: "Hetzner CX22 server provisioning (€6/mo)" },
          { fr: "Installation n8n + PostgreSQL en Docker Compose", en: "n8n + PostgreSQL Docker Compose install" },
          { fr: "HTTPS automatique (Caddy + Let's Encrypt)", en: "Automatic HTTPS (Caddy + Let's Encrypt)" },
          { fr: "Backups quotidiens vers S3 / Backblaze", en: "Daily backups to S3 / Backblaze" },
          { fr: "Documentation runbook + accès admin", en: "Runbook documentation + admin access" },
          { fr: "Livraison en 3 jours · Support 14 jours", en: "Delivered in 3 days · 14-day support" },
        ] },
      { name: { fr: "Pro (recommandé)", en: "Pro (recommended)" }, price: "850 €", priceNote: { fr: "Setup + 5 workflows complets", en: "Setup + 5 full workflows" }, highlight: true,
        features: [
          { fr: "Tout du plan Starter", en: "Everything in Starter" },
          { fr: "Mode queue (Redis) pour exécutions parallèles", en: "Queue mode (Redis) for parallel executions" },
          { fr: "SSO Google / Azure AD", en: "Google / Azure AD SSO" },
          { fr: "5 workflows construits (CRM, facturation, reporting, etc.)", en: "5 workflows built (CRM, billing, reporting, etc.)" },
          { fr: "Monitoring Uptime Kuma + alertes Slack", en: "Uptime Kuma monitoring + Slack alerts" },
          { fr: "Formation équipe (2 demi-journées)", en: "Team training (2 half-days)" },
          { fr: "Livraison en 7-10 jours · Support 30 jours", en: "Delivered in 7-10 days · 30-day support" },
        ] },
      { name: { fr: "Enterprise", en: "Enterprise" }, price: "dès 2 000 €", priceNote: { fr: "Architecture haute dispo & custom", en: "HA architecture & custom" },
        features: [
          { fr: "Tout du plan Pro", en: "Everything in Pro" },
          { fr: "Architecture haute disponibilité (multi-worker, failover)", en: "High-availability architecture (multi-worker, failover)" },
          { fr: "Hébergement HDS / SecNumCloud / cloud privé", en: "HDS / SecNumCloud / private cloud hosting" },
          { fr: "Nodes custom TypeScript pour vos APIs internes", en: "Custom TypeScript nodes for your internal APIs" },
          { fr: "Migration depuis Make / Zapier / Power Automate", en: "Migration from Make / Zapier / Power Automate" },
          { fr: "SLA 99,5 % + maintenance mensuelle incluse", en: "99.5% SLA + monthly maintenance included" },
          { fr: "Livraison en 14-21 jours · Support 60 jours", en: "Delivered in 14-21 days · 60-day support" },
        ] },
    ],
  },

  faq: [
    { q: { fr: "Quelle est la vraie différence entre n8n cloud et n8n self-hosted ?", en: "What's the real difference between n8n cloud and n8n self-hosted?" },
      a: { fr: "n8n Cloud (offre payante éditée par n8n.io) est un SaaS classique, hébergé chez n8n GmbH en Europe, facturé à partir de 20 €/mois avec un quota d'exécutions. n8n self-hosted est la même application, gratuite (édition Community), que vous installez sur votre propre serveur. Vous payez uniquement le serveur (6 à 40 €/mois) et vous avez zéro limite d'exécutions, zéro données chez un tiers, et le contrôle total sur la version, les nodes, les backups. C'est ce qu'on recommande dès que vous dépassez ~5 000 opérations/mois ou que vos données sont sensibles.", en: "n8n Cloud (the paid offer by n8n.io) is a classic SaaS, hosted by n8n GmbH in Europe, billed from €20/mo with execution quotas. Self-hosted n8n is the same application, free (Community edition), that you install on your own server. You only pay the server (€6 to €40/mo) with zero execution limits, zero data at a third party, and full control over the version, nodes and backups. We recommend it as soon as you exceed ~5,000 ops/month or your data is sensitive." } },
    { q: { fr: "n8n self-hosted est-il vraiment plus sécurisé que Make ou Zapier ?", en: "Is self-hosted n8n really more secure than Make or Zapier?" },
      a: { fr: "Oui, sur le critère qui compte le plus pour la conformité : la localisation et la maîtrise des données. Make et Zapier sont sécurisés au sens technique, mais vos données transitent par leur infra (US pour Zapier, EU/CZ pour Make), avec leurs sous-traitants et leurs CGU qui changent. n8n self-hosted, installé sur votre serveur Hetzner Falkenstein ou OVH France, ne fait sortir aucune donnée. C'est ce qui permet de passer une certification HDS, un audit ISO 27001 ou de signer avec un grand compte qui exige la souveraineté.", en: "Yes, on the criterion that matters most for compliance: data location and control. Make and Zapier are technically secure, but your data flows through their infra (US for Zapier, EU/CZ for Make), with their subprocessors and their evolving terms. Self-hosted n8n, installed on your Hetzner Falkenstein or OVH France server, lets no data out. That's what lets you pass HDS certification, an ISO 27001 audit, or sign with an enterprise customer requiring sovereignty." } },
    { q: { fr: "Quel est le coût réel d'un serveur n8n par mois ?", en: "What's the real monthly server cost for n8n?" },
      a: { fr: "Pour démarrer (< 50 000 exécutions/mois), un Hetzner CX22 (2 vCPU, 4 Go RAM, 40 Go SSD) à 5,83 €/mois suffit largement. Pour une PME qui tourne 200 000 exécutions/mois avec quelques workflows lourds, on passe sur un CPX31 (4 vCPU, 8 Go) à 16 €/mois. Pour un SaaS qui pousse 1M+ d'exécutions, on monte sur un CCX23 dédié à 35 €/mois ou on passe en mode queue avec workers séparés. Comparé aux 200 à 1 200 €/mois facturés par Zapier ou Make sur les mêmes volumes, l'économie est massive.", en: "To start (< 50,000 executions/month), a Hetzner CX22 (2 vCPU, 4 GB RAM, 40 GB SSD) at €5.83/mo is plenty. For an SME running 200,000 executions/month with some heavy workflows, we move to a CPX31 (4 vCPU, 8 GB) at €16/mo. For a SaaS pushing 1M+ executions, we go to a dedicated CCX23 at €35/mo or switch to queue mode with separate workers. Compared to the €200 to €1,200/mo Zapier or Make charge at the same volumes, the saving is massive." } },
    { q: { fr: "Peut-on créer des nodes custom n8n pour notre API interne ?", en: "Can we build custom n8n nodes for our internal API?" },
      a: { fr: "Oui, c'est l'un des plus gros avantages du self-hosted. Un node custom n8n est un module TypeScript qu'on développe une fois, qu'on installe sur votre instance, et que vos équipes utilisent ensuite dans n'importe quel workflow comme n'importe quel connecteur standard (drag & drop). On l'utilise typiquement pour : votre ERP maison, votre API de scoring/IA, un connecteur métier qui n'existe pas sur le marché. Comptez 1 à 3 jours de dev par node selon la complexité.", en: "Yes, and it's one of self-hosting's biggest perks. A custom n8n node is a TypeScript module we build once, install on your instance, then your teams use it in any workflow like a standard connector (drag & drop). Typical uses: your in-house ERP, your AI/scoring API, a domain connector that doesn't exist on the market. Budget 1 to 3 dev days per node depending on complexity." } },
    { q: { fr: "Comment n8n self-hosted scale-t-il quand le volume explose ?", en: "How does self-hosted n8n scale when volume explodes?" },
      a: { fr: "n8n supporte un mode queue natif basé sur Redis et Bull. Concrètement, on sépare le serveur principal (UI + scheduler) de N workers qui exécutent les workflows en parallèle. Vous pouvez monter à des millions d'exécutions/jour en ajoutant simplement des workers sur de nouvelles VMs. On a déjà déployé des architectures à 5 workers tournant 3 millions d'exécutions/mois sur des Hetzner CCX dédiés pour ~80 €/mois total — impossible à atteindre avec Make ou Zapier sans budget enterprise.", en: "n8n supports a native queue mode based on Redis and Bull. Concretely, we separate the main server (UI + scheduler) from N workers running workflows in parallel. You can scale to millions of executions per day by simply adding workers on new VMs. We've already deployed 5-worker architectures running 3M executions/month on dedicated Hetzner CCX boxes for ~€80/mo total — unreachable with Make or Zapier without an enterprise budget." } },
    { q: { fr: "Quel support garantissez-vous après la mise en production ?", en: "What support do you guarantee after go-live?" },
      a: { fr: "Selon la formule : 14 jours (Starter), 30 jours (Pro) ou 60 jours (Enterprise) de support inclus sur Slack et email, avec réponse sous 4h ouvrées. Au-delà, on propose un contrat de maintenance mensuel (à partir de 90 €/mois) qui couvre : mises à jour n8n, monitoring 24/7, backups vérifiés, ajustements de workflows, et 2h d'évolutions par mois. Vous pouvez aussi reprendre 100 % la main — toute la documentation et le code Docker Compose vous appartiennent.", en: "Per tier: 14 days (Starter), 30 days (Pro) or 60 days (Enterprise) of included support on Slack and email, with reply within 4 business hours. Beyond that, we offer a monthly maintenance contract (from €90/mo) covering: n8n upgrades, 24/7 monitoring, verified backups, workflow tweaks, and 2h of evolutions per month. You can also take over 100% — all documentation and the Docker Compose code are yours." } },
    { q: { fr: "Comment migrer nos scénarios Make ou Zapier vers n8n sans rien casser ?", en: "How do we migrate our Make or Zapier scenarios to n8n without breaking anything?" },
      a: { fr: "On procède en 4 étapes. 1) Inventaire : on liste tous vos scénarios existants avec leur fréquence et leur criticité. 2) Réécriture : on rebuild chaque scénario en workflow n8n équivalent (souvent en mieux, car n8n permet des branchements plus propres). 3) Tests parallèles : pendant 7 jours, Make/Zapier et n8n tournent en parallèle, on compare les outputs. 4) Bascule : une fois la parité validée, on coupe l'ancien système. Aucune coupure, aucune perte de donnée. C'est inclus dans le plan Enterprise.", en: "We proceed in 4 steps. 1) Inventory: we list all your existing scenarios with frequency and criticality. 2) Rewriting: we rebuild each as an equivalent n8n workflow (often better, since n8n allows cleaner branching). 3) Parallel testing: for 7 days, Make/Zapier and n8n run in parallel, we compare outputs. 4) Cutover: once parity is validated, we shut down the old system. Zero downtime, zero data loss. Included in the Enterprise plan." } },
    { q: { fr: "n8n self-hosted est-il conforme RGPD et HDS pour la santé ?", en: "Is self-hosted n8n GDPR and HDS compliant for health?" },
      a: { fr: "Le RGPD est une question d'hébergement et de configuration, pas de logiciel. n8n étant open-source et installable où vous voulez, on le déploie sur un hébergeur certifié : Hetzner ou OVH pour le RGPD standard, OVH HDS pour les données de santé en France, Scaleway ou Outscale pour SecNumCloud. On configure ensuite la pseudonymisation, le chiffrement au repos, l'audit log, la rétention des données et le registre des traitements. Combo qui passe les audits CNIL et HDS sans difficulté.", en: "GDPR is a hosting and configuration question, not a software one. Since n8n is open-source and installable anywhere, we deploy it on a certified host: Hetzner or OVH for standard GDPR, OVH HDS for French health data, Scaleway or Outscale for SecNumCloud. We then configure pseudonymization, encryption at rest, audit log, data retention and the processing register. A combo that passes CNIL and HDS audits without trouble." } },
  ],

  relatedSlugs: ["automatisation-no-code", "automatisation-make", "automatisation-zapier", "chatbot-ia"],

  cta: {
    headline: { fr: "Reprenez le contrôle de vos automatisations — sur votre serveur, sans plafond", en: "Take back control of your automations — on your server, with no ceiling" },
    desc: { fr: "30 minutes pour auditer votre stack, 7 jours pour livrer une instance n8n self-hosted prête à scaler. Audit gratuit, paiement EUR, XOF ou USD, et code 100 % à vous à la livraison.", en: "30 minutes to audit your stack, 7 days to deliver a self-hosted n8n instance ready to scale. Free audit, pay in EUR, XOF or USD, and 100% of the code is yours on delivery." },
    primaryLabel: { fr: "Réserver mon audit gratuit", en: "Book my free audit" },
    secondaryLabel: { fr: "Voir l'automatisation no-code", en: "See no-code automation" },
  },
};

/* ── Long-tail : Automatisation Zapier ── */
const automatisationZapier: ServicePage = {
  slug: "automatisation-zapier",
  type: "long-tail",
  category: "Automatisation",
  pillarSlug: "automatisation-no-code",
  color: "emerald",
  icon: Zap,
  heroIllustration: "automation-flow",

  metaTitle: {
    fr: "Expert Zapier — Automatisez vos outils en 24-48h · Agence Zapier Bénin",
    en: "Zapier Expert — Automate Your Tools in 24-48h · Zapier Agency Benin",
  },
  metaDescription: {
    fr: "Agence experte Zapier. Construction de Zaps fiables, optimisés en coût (task-based pricing), avec paths conditionnels, formatter et error handling. 6000+ connecteurs. Setup en 24-48h pour PME, freelances, agences et coachs. Audit gratuit.",
    en: "Expert Zapier agency. Reliable Zaps built with cost optimization (task-based pricing), conditional paths, formatter and error handling. 6000+ connectors. 24-48h setup for SMEs, freelancers, agencies and coaches. Free audit.",
  },
  keywords: [
    "Zapier automation", "Zaps Zapier", "expert Zapier", "agence Zapier",
    "Zapier vs Make", "Zapier Bénin", "Zapier pricing", "Zapier pour PME",
    "Zapier connecteurs", "premier Zap", "automatisation Zapier", "Zapier formatter",
    "Zapier paths", "Zapier multi-step", "consultant Zapier", "Zapier Cotonou",
    "Zapier Afrique", "Zapier HubSpot",
  ],

  hero: {
    badge: { fr: "Expert Zapier", en: "Zapier Expert" },
    h1: { fr: "Connectez vos 6000+ outils favoris avec Zapier en", en: "Connect your 6000+ favorite tools with Zapier in" },
    h1Highlight: { fr: "24 à 48 heures", en: "24 to 48 hours" },
    subtitle: {
      fr: "Zapier, c'est la plateforme no-code la plus simple et la plus connectée du marché. On construit pour vous des Zaps fiables, économes en tâches, avec paths conditionnels, formatter et error handling — pour que vos outils travaillent ensemble dès cette semaine, sans abonnement gonflé inutilement.",
      en: "Zapier is the simplest and most connected no-code platform out there. We build you reliable Zaps that are task-efficient, with conditional paths, formatter and error handling — so your tools work together this week, without an inflated subscription.",
    },
    trustStrip: [
      { value: "24-48h", label: { fr: "Premier Zap en ligne", en: "First Zap live" } },
      { value: "6000+", label: { fr: "Connecteurs Zapier", en: "Zapier connectors" } },
      { value: "-40%", label: { fr: "Tasks économisées", en: "Tasks saved" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Zapier est l'outil d'automatisation le plus populaire au monde — et pour une bonne raison : il connecte presque tout. Mais beaucoup d'entreprises l'utilisent mal et finissent par payer un abonnement Professional ou Team alors qu'un plan Starter suffirait. Voici les 4 pièges les plus fréquents que l'on corrige systématiquement chez nos clients.",
      en: "Zapier is the world's most popular automation tool — for good reason: it connects almost everything. But many businesses use it poorly and end up paying for a Professional or Team plan when a Starter would do. Here are the 4 most common traps we systematically fix for our clients.",
    },
    items: [
      { icon: TrendingUp, title: { fr: "Vos Zaps consomment 10x trop de tasks", en: "Your Zaps burn 10× too many tasks" },
        desc: { fr: "Chaque étape d'un Zap = 1 task facturée. Sans filtres en amont, sans paths conditionnels, sans regroupement intelligent, votre Zap déclenche 5 actions là où 1 suffirait. Résultat : vous explosez votre quota mensuel et passez au plan supérieur sans nécessité.", en: "Each Zap step = 1 billed task. Without upstream filters, conditional paths or smart batching, your Zap fires 5 actions where 1 would do. Result: you blow through your monthly quota and upgrade to a higher plan for no real reason." } },
      { icon: Settings, title: { fr: "Vos Zaps cassent silencieusement et personne ne le voit", en: "Your Zaps break silently and no one notices" },
        desc: { fr: "Un champ qui change de nom dans HubSpot, un token Google qui expire, une réponse API mal formatée — et votre Zap est en erreur depuis 3 semaines. Pendant ce temps, vos leads ne tombent plus dans le CRM, vos factures ne partent plus, et vous le découvrez quand un client se plaint.", en: "A field renamed in HubSpot, an expired Google token, a malformed API response — and your Zap has been failing for 3 weeks. Meanwhile leads never reach the CRM, invoices never go out, and you only find out when a customer complains." } },
      { icon: Cpu, title: { fr: "Vous avez accumulé 40 Zaps qui se chevauchent", en: "You've stacked 40 overlapping Zaps" },
        desc: { fr: "Chaque collaborateur a créé ses propres Zaps au fil du temps. Trois Zaps différents traitent les mêmes leads, deux Zaps envoient le même email, et personne ne sait plus qui fait quoi. Le compte Zapier est devenu un cimetière ingérable qui produit plus de bugs que de gains.", en: "Each teammate built their own Zaps over time. Three different Zaps handle the same leads, two send the same email, and no one knows what does what anymore. Your Zapier account has become an unmanageable graveyard producing more bugs than wins." } },
      { icon: Clock, title: { fr: "Vous payez Zapier sans jamais l'avoir fait décoller", en: "You pay for Zapier without ever taking off" },
        desc: { fr: "Vous avez ouvert un compte il y a 6 mois, créé 2 Zaps qui ne servent à rien, et l'abonnement continue de tourner. Personne en interne n'a le temps (ou les bons réflexes) pour construire des automatisations qui changent vraiment la donne. L'outil dort, votre équipe sature.", en: "You opened an account 6 months ago, built 2 useless Zaps, and the subscription keeps running. No one in-house has the time (or the right reflexes) to build automations that actually move the needle. The tool sleeps, your team drowns." } },
    ],
  },

  solution: {
    headline: { fr: "Des Zaps construits comme du vrai logiciel — fiables, économes, supervisés", en: "Zaps built like real software — reliable, cost-efficient, monitored" },
    intro: {
      fr: "On utilise Zapier depuis ses débuts. On connaît ses forces (la simplicité, les 6000+ connecteurs, le déploiement instantané) et ses pièges (le coût en tasks, le debugging limité, les timeouts). Notre méthode : architecturer chaque Zap pour la fiabilité et l'économie de tasks, avec paths conditionnels, formatter, error handling et alertes. Vous payez le bon plan, pas un de plus.",
      en: "We've used Zapier since the early days. We know its strengths (simplicity, 6000+ connectors, instant deployment) and its pitfalls (task pricing, limited debugging, timeouts). Our method: architect every Zap for reliability and task efficiency, with conditional paths, formatter, error handling and alerts. You pay for the right plan, not one above.",
    },
    features: [
      { icon: Zap, title: { fr: "Multi-step Zaps optimisés en tasks", en: "Multi-step Zaps optimized for tasks" },
        desc: { fr: "Chaque Zap est designé pour minimiser le compteur : filtres en amont, regroupement de records, utilisation de Storage by Zapier, et fusion d'étapes via le formatter. Sur le même cas d'usage, on consomme typiquement 40 % de tasks en moins que la version naïve.", en: "Every Zap is designed to minimize the counter: upstream filters, record batching, Storage by Zapier and step fusion via formatter. On the same use case, we typically burn 40% fewer tasks than the naive version." } },
      { icon: Target, title: { fr: "Paths conditionnels & logique métier", en: "Conditional paths & business logic" },
        desc: { fr: "Un seul Zap qui se ramifie selon le contexte (type de lead, montant de la commande, langue, source) au lieu de 5 Zaps redondants. Plus simple à maintenir, plus économique en tasks, et beaucoup plus lisible pour votre équipe.", en: "A single Zap that branches by context (lead type, order amount, language, source) instead of 5 redundant Zaps. Easier to maintain, cheaper in tasks, and far more readable for your team." } },
      { icon: Shield, title: { fr: "Error handling & alertes en temps réel", en: "Error handling & real-time alerts" },
        desc: { fr: "Chaque Zap critique embarque un fallback : retry automatique, branche d'erreur, alerte Slack ou email si une étape échoue 2 fois consécutivement. Vous savez en 5 minutes si un Zap casse, pas en 3 semaines via un client mécontent.", en: "Every critical Zap ships with a fallback: auto-retry, error branch, Slack or email alert if a step fails twice in a row. You know within 5 minutes if a Zap breaks, not 3 weeks later through an angry customer." } },
      { icon: Sparkles, title: { fr: "Formatter, Code by Zapier & AI by Zapier", en: "Formatter, Code by Zapier & AI by Zapier" },
        desc: { fr: "On exploite les outils built-in Zapier que 90 % des utilisateurs ignorent : Formatter pour transformer dates, devises et textes, Code by Zapier pour la logique custom légère, AI by Zapier pour parser un email ou enrichir un lead — sans payer un service externe.", en: "We leverage Zapier's built-in tools 90% of users ignore: Formatter for transforming dates, currencies and text, Code by Zapier for light custom logic, AI by Zapier to parse an email or enrich a lead — without paying an external service." } },
      { icon: BarChart3, title: { fr: "Monitoring & history exploitable", en: "Monitoring & usable history" },
        desc: { fr: "On configure un dashboard simple (Notion ou Google Sheets) qui agrège les runs réussis, échoués et le nombre de tasks consommées par Zap. Vous pilotez votre compte Zapier comme une stack tech, pas comme une boîte noire.", en: "We set up a simple dashboard (Notion or Google Sheets) aggregating successful runs, failures and task usage per Zap. You manage your Zapier account like a real tech stack, not a black box." } },
      { icon: Handshake, title: { fr: "Documentation & passation à votre équipe", en: "Documentation & handover to your team" },
        desc: { fr: "Chaque Zap livré est documenté (objectif, déclencheur, sorties, points de fragilité) et votre équipe est formée pour le modifier en autonomie. Vous ne dépendez de personne pour faire évoluer un Zap simple — on intervient seulement quand ça devient complexe.", en: "Every delivered Zap comes documented (purpose, trigger, outputs, fragility points) and your team is trained to edit it on its own. You don't depend on anyone for simple changes — we only step in when it gets complex." } },
    ],
  },

  howItWorks: {
    headline: { fr: "De l'idée au premier Zap en production — en 48h", en: "From idea to first production Zap — in 48h" },
    steps: [
      { icon: Search, title: { fr: "Audit Zapier & priorisation", en: "Zapier audit & prioritization" }, duration: { fr: "Jour 1 matin", en: "Day 1 AM" },
        desc: { fr: "On regarde votre stack actuelle (outils, abonnement Zapier en cours, Zaps existants si vous en avez) et on identifie les 3 à 5 workflows qui rapportent le plus s'ils sont automatisés. On chiffre le ROI attendu et le nombre de tasks nécessaires pour choisir le bon plan Zapier dès le départ.", en: "We review your current stack (tools, existing Zapier plan, current Zaps if any) and pinpoint the 3-5 workflows with the highest ROI once automated. We size the expected return and the tasks needed to pick the right Zapier plan from day one." } },
      { icon: FileCheck, title: { fr: "Architecture & mapping des données", en: "Architecture & data mapping" }, duration: { fr: "Jour 1 après-midi", en: "Day 1 PM" },
        desc: { fr: "On dessine chaque Zap sur papier : déclencheur, filtres, paths conditionnels, étapes formatter, actions finales, gestion des erreurs. On valide les mappings de champs entre vos outils pour éviter toute surprise au runtime.", en: "We sketch each Zap on paper: trigger, filters, conditional paths, formatter steps, final actions, error handling. We validate field mappings between your tools to dodge runtime surprises." } },
      { icon: Settings, title: { fr: "Construction des Zaps", en: "Zap construction" }, duration: { fr: "Jour 2 matin", en: "Day 2 AM" },
        desc: { fr: "On construit les Zaps directement dans votre compte Zapier (vous restez propriétaire). On utilise le Path Builder pour la logique conditionnelle, Formatter pour les transformations, et on configure les retries et alertes pour chaque étape critique. Pas un seul Zap pondu à l'arrache.", en: "We build the Zaps directly inside your Zapier account (you stay the owner). We use Path Builder for conditional logic, Formatter for transformations, and configure retries and alerts for every critical step. Not a single quick-and-dirty Zap shipped." } },
      { icon: Rocket, title: { fr: "Tests & passage en production", en: "Testing & go-live" }, duration: { fr: "Jour 2 après-midi", en: "Day 2 PM" },
        desc: { fr: "On teste chaque Zap avec des données réelles : leads, paiements, formulaires. On laisse tourner en mode silencieux 4h pour vérifier qu'aucune étape ne casse, puis on active la production. Les alertes Slack ou email sont câblées pour vous prévenir au premier incident.", en: "We test every Zap with real data: leads, payments, forms. We let them run silently for 4h to confirm no step breaks, then we flip to production. Slack or email alerts are wired so you hear about any incident first." } },
      { icon: Handshake, title: { fr: "Documentation, formation & support 30 jours", en: "Documentation, training & 30-day support" }, duration: { fr: "Semaines 1-4", en: "Weeks 1-4" },
        desc: { fr: "On vous livre une doc claire et on forme votre équipe en 1h. Pendant 30 jours, on monitore l'usage de tasks, on ajuste les filtres pour économiser, et on intervient sur tout Zap qui casse sans surcoût.", en: "We deliver clean docs and train your team in 1 hour. For 30 days, we monitor task usage, fine-tune filters to save tasks, and step in on any broken Zap at no extra cost." } },
    ],
  },

  stats: [
    { value: "24-48", suffix: "h", label: { fr: "Premier Zap en production", en: "First Zap in production" } },
    { value: "6000", suffix: "+", label: { fr: "Connecteurs disponibles", en: "Available connectors" } },
    { value: "-40", suffix: "%", label: { fr: "Tasks économisées vs version naïve", en: "Tasks saved vs naive build" } },
    { value: "10", suffix: "h", label: { fr: "Économisées par semaine en moyenne", en: "Saved per week on average" } },
  ],

  useCases: {
    headline: { fr: "Pour qui Zapier est-il l'outil parfait ?", en: "Who is Zapier the perfect fit for?" },
    intro: {
      fr: "Zapier brille là où la simplicité prime sur la complexité, et où le time-to-value compte plus que la sophistication. Voici quatre profils-types pour lesquels on construit des Zaps tous les mois, avec les résultats concrets observés.",
      en: "Zapier shines where simplicity beats complexity and time-to-value matters more than sophistication. Here are four typical profiles we build Zaps for every month, with the concrete results observed.",
    },
    cases: [
      { icon: Building2, sector: { fr: "PME & TPE", en: "SMEs & small businesses" },
        problem: { fr: "Vous gérez les leads, factures, emails et plannings dans 8 outils différents — et vous n'avez pas d'équipe tech pour les faire dialoguer.", en: "You handle leads, invoices, emails and schedules across 8 different tools — with no tech team to make them talk." },
        solution: { fr: "On connecte votre formulaire de contact, HubSpot, Gmail, Calendly et Stripe en 5 Zaps qui couvrent 80 % de vos workflows quotidiens. Tout est modifiable par votre office manager.", en: "We wire your contact form, HubSpot, Gmail, Calendly and Stripe with 5 Zaps covering 80% of your daily workflows. All editable by your office manager." },
        result: { fr: "Économie de 8h/semaine, zéro lead perdu, et un plan Zapier Starter ou Pro suffit largement.", en: "8h saved per week, zero lost leads, and a Zapier Starter or Pro plan is largely enough." } },
      { icon: Briefcase, sector: { fr: "Freelances & indépendants", en: "Freelances & solopreneurs" },
        problem: { fr: "Vous facturez seul, prospectez seul, livrez seul. Chaque heure passée à copier-coller des infos client est une heure de chiffre d'affaires en moins.", en: "You invoice alone, prospect alone, deliver alone. Every hour spent copy-pasting client info is one hour of revenue lost." },
        solution: { fr: "On construit votre back-office en Zaps : formulaire de prise de contact vers Notion, Calendly vers Google Calendar et Slack, Stripe vers Pennylane et envoi d'email de bienvenue automatique.", en: "We build your back-office in Zaps: intake form into Notion, Calendly to Google Calendar and Slack, Stripe into Pennylane and an automatic welcome email." },
        result: { fr: "Onboarding client en 30 secondes, +5h de delivery facturable récupérées par semaine.", en: "30-second client onboarding, +5h of billable delivery time reclaimed per week." } },
      { icon: Users, sector: { fr: "Agences (marketing, design, growth)", en: "Agencies (marketing, design, growth)" },
        problem: { fr: "Vous gérez 20+ clients en parallèle, chacun avec ses outils. Centraliser leads, livrables et reporting demande un coordo à plein temps.", en: "You handle 20+ clients in parallel, each with their own tools. Centralizing leads, deliverables and reporting demands a full-time coordinator." },
        solution: { fr: "Un Zap maître par client : lead Meta Ads ou Google Ads vers Airtable client, alerte Slack au commercial, ajout en pipeline HubSpot et déclenchement du sequence d'onboarding email.", en: "One master Zap per client: Meta or Google Ads lead into the client Airtable, Slack alert to the rep, push into the HubSpot pipeline and trigger the onboarding email sequence." },
        result: { fr: "Capacité doublée sans embauche, reporting hebdomadaire généré tout seul, satisfaction client en hausse.", en: "Capacity doubled with no new hire, weekly reporting auto-generated, client satisfaction up." } },
      { icon: GraduationCap, sector: { fr: "Coachs & formateurs", en: "Coaches & trainers" },
        problem: { fr: "Vos prospects découvrent votre offre via une landing page, mais vous mettez 2 jours à les recontacter. La moitié sont déjà partis ailleurs.", en: "Your prospects discover your offer through a landing page, but it takes you 2 days to reply. Half have already moved on." },
        solution: { fr: "Zap dédié : inscription au lead magnet vers Mailchimp ou Brevo, alerte Slack ou WhatsApp, et envoi automatique du lien Calendly avec créneau de découverte personnalisé.", en: "Dedicated Zap: lead magnet signup into Mailchimp or Brevo, Slack or WhatsApp alert, automatic Calendly link with a personalized discovery slot." },
        result: { fr: "Délai de réponse passé de 2 jours à 60 secondes, taux de prise de RDV multiplié par 2,5.", en: "Response time cut from 2 days to 60 seconds, booking rate 2.5× higher." } },
    ],
  },

  stack: {
    headline: { fr: "Les outils Zapier qu'on déploie systématiquement", en: "The Zapier tools we systematically deploy" },
    intro: {
      fr: "Zapier seul est puissant, mais c'est l'association avec les outils built-in et un choix précis de connecteurs qui fait la différence entre un Zap fragile et un Zap professionnel.",
      en: "Zapier alone is powerful, but pairing it with built-in tools and a precise choice of connectors is what separates a fragile Zap from a professional one.",
    },
    tools: [
      { name: "Zapier", role: { fr: "Plateforme principale d'orchestration des Zaps", en: "Main orchestration platform for Zaps" } },
      { name: "Formatter by Zapier", role: { fr: "Transformations dates, devises, texte, calculs sans Code", en: "Date, currency, text and math transformations without code" } },
      { name: "Paths by Zapier", role: { fr: "Logique conditionnelle multi-branches dans un seul Zap", en: "Multi-branch conditional logic inside a single Zap" } },
      { name: "Code by Zapier", role: { fr: "JavaScript ou Python léger pour logique sur mesure", en: "Light JavaScript or Python for custom logic" } },
      { name: "Gmail / Outlook", role: { fr: "Déclencheurs et actions email pour notifications & relances", en: "Email triggers and actions for notifications & follow-ups" } },
      { name: "Slack", role: { fr: "Alertes équipe et notifications d'erreur en temps réel", en: "Team alerts and real-time error notifications" } },
      { name: "Google Sheets / Airtable", role: { fr: "Base de données légère, logs et reporting", en: "Lightweight database, logs and reporting" } },
      { name: "HubSpot / Pipedrive", role: { fr: "CRM cible pour stocker leads qualifiés et opportunités", en: "Target CRM for qualified leads and opportunities" } },
      { name: "Calendly / Google Calendar", role: { fr: "Prise de RDV automatisée et synchronisation agendas", en: "Automated booking and calendar sync" } },
      { name: "Stripe", role: { fr: "Paiements, facturation et déclencheurs post-achat", en: "Payments, invoicing and post-purchase triggers" } },
    ],
  },

  pricing: {
    headline: { fr: "Combien coûte la mise en place de vos Zaps ?", en: "How much does setting up your Zaps cost?" },
    intro: {
      fr: "Trois formules selon la profondeur de votre besoin. Vous restez propriétaire du compte Zapier et de tous les Zaps livrés. L'abonnement Zapier (Starter, Pro, Team) est payé directement par vous, à part — on vous conseille le bon plan dès l'audit.",
      en: "Three tiers based on the depth of your needs. You stay the owner of the Zapier account and every delivered Zap. The Zapier subscription (Starter, Pro, Team) is paid by you directly, separately — we advise the right plan from the audit.",
    },
    tiers: [
      { name: { fr: "Starter", en: "Starter" }, price: "200 €", priceNote: { fr: "Premier Zap en 24h", en: "First Zap in 24h" },
        features: [
          { fr: "1 Zap multi-step (jusqu'à 5 étapes)", en: "1 multi-step Zap (up to 5 steps)" },
          { fr: "Filtres, formatter et alertes basiques", en: "Filters, formatter and basic alerts" },
          { fr: "Connexion à 2 outils de votre stack", en: "Connection to 2 tools from your stack" },
          { fr: "Documentation Notion + vidéo Loom de passation", en: "Notion docs + Loom handover video" },
          { fr: "Livraison en 24h · Support 15 jours", en: "Delivered in 24h · 15-day support" },
        ] },
      { name: { fr: "Pro (recommandé)", en: "Pro (recommended)" }, price: "450 €", priceNote: { fr: "Pack 3 Zaps connectés", en: "Pack of 3 connected Zaps" }, highlight: true,
        features: [
          { fr: "3 Zaps multi-step avec paths conditionnels", en: "3 multi-step Zaps with conditional paths" },
          { fr: "Formatter, Code by Zapier, AI by Zapier", en: "Formatter, Code by Zapier, AI by Zapier" },
          { fr: "Error handling complet + alertes Slack ou email", en: "Full error handling + Slack or email alerts" },
          { fr: "Connexion à 5 outils de votre stack", en: "Connection to 5 tools from your stack" },
          { fr: "Dashboard de monitoring tasks & runs", en: "Tasks & runs monitoring dashboard" },
          { fr: "Livraison en 48h · Support 30 jours", en: "Delivered in 48h · 30-day support" },
        ] },
      { name: { fr: "Enterprise", en: "Enterprise" }, price: "à partir de 1 100 €", priceNote: { fr: "Refonte complète de compte Zapier", en: "Full Zapier account overhaul" },
        features: [
          { fr: "Audit complet du compte Zapier existant", en: "Full audit of your existing Zapier account" },
          { fr: "Refactor des Zaps redondants ou cassés", en: "Refactor of redundant or broken Zaps" },
          { fr: "10+ Zaps avec architecture professionnelle", en: "10+ Zaps with professional architecture" },
          { fr: "Optimisation tasks pour rester sur le bon plan", en: "Task optimization to stay on the right plan" },
          { fr: "Connecteurs premium (Salesforce, NetSuite, etc.)", en: "Premium connectors (Salesforce, NetSuite, etc.)" },
          { fr: "Maintenance mensuelle optionnelle", en: "Optional monthly maintenance" },
        ] },
    ],
  },

  faq: [
    { q: { fr: "Zapier ou Make : lequel choisir pour mon business ?", en: "Zapier or Make: which one for my business?" },
      a: { fr: "Zapier est plus simple, plus rapide à prendre en main, et propose 6000+ connecteurs natifs — c'est l'idéal pour démarrer vite, pour les PME, les freelances et les workflows linéaires. Make est plus visuel, plus puissant pour les scénarios complexes (boucles, agrégations, branches massives) et souvent moins cher au volume. Notre règle : Zapier dès qu'il s'agit d'enchaîner 3 à 10 actions simples entre apps populaires. Make dès qu'il faut traiter des paquets de données, faire des transformations lourdes ou orchestrer 20+ étapes. On vous oriente vers l'un ou l'autre dès l'audit, sans biais.", en: "Zapier is simpler, faster to pick up, and ships 6000+ native connectors — ideal to start quickly, for SMEs, freelancers and linear workflows. Make is more visual, more powerful for complex scenarios (loops, aggregations, massive branching) and often cheaper at volume. Our rule: Zapier when you need to chain 3-10 simple actions between popular apps. Make when you have to process batches of data, do heavy transformations or orchestrate 20+ steps. We point you to one or the other from the audit, with no bias." } },
    { q: { fr: "Combien coûte vraiment Zapier pour une PME ?", en: "How much does Zapier really cost for an SME?" },
      a: { fr: "Zapier a 4 plans payants au-dessus du Free : Starter (~20 €/mois, 750 tasks, multi-step Zaps), Professional (~50 €/mois, 2 000 tasks, paths conditionnels), Team (~70 €/mois par utilisateur, 50 000 tasks) et Company. Pour une PME standard avec 5 à 10 Zaps bien architecturés, le plan Professional suffit dans 90 % des cas (environ 50 à 80 €/mois selon le nombre de tasks). On dimensionne précisément votre besoin pendant l'audit pour éviter de monter de plan sans raison.", en: "Zapier has 4 paid plans above Free: Starter (~€20/month, 750 tasks, multi-step Zaps), Professional (~€50/month, 2,000 tasks, conditional paths), Team (~€70/month per user, 50,000 tasks) and Company. For a standard SME with 5 to 10 well-architected Zaps, Professional is enough 90% of the time (around €50 to €80/month depending on task volume). We size your needs precisely during the audit to avoid upgrading for no reason." } },
    { q: { fr: "Tasks vs operations : c'est quoi la différence ?", en: "Tasks vs operations: what's the difference?" },
      a: { fr: "Chez Zapier, une task = une action réussie dans un Zap (envoyer un email, créer un contact, mettre à jour une ligne). Les déclencheurs ne comptent pas, mais chaque étape d'action est facturée 1 task. Chez Make, on parle d'operations, et la facturation est plus granulaire (chaque API call compte, y compris les déclencheurs). Concrètement : un Zap qui crée un lead et envoie 2 emails consomme 3 tasks à chaque exécution. C'est ce qu'on optimise systématiquement avec filtres, paths et regroupements.", en: "In Zapier, a task = one successful action in a Zap (sending an email, creating a contact, updating a row). Triggers don't count, but every action step is billed as 1 task. In Make, you talk about operations and billing is more granular (every API call counts, including triggers). Concretely: a Zap creating a lead and sending 2 emails burns 3 tasks per run. That's what we systematically optimize with filters, paths and batching." } },
    { q: { fr: "Quels types de Zaps construisez-vous le plus souvent ?", en: "What kinds of Zaps do you build most often?" },
      a: { fr: "Top 5 par fréquence : 1) lead capture vers CRM avec alerte Slack ou WhatsApp, 2) post-paiement Stripe vers facture Pennylane ou QuickBooks et email de bienvenue, 3) RDV Calendly vers HubSpot + Google Calendar + canal Slack, 4) formulaire Typeform vers Airtable et notification équipe, 5) message reçu sur un canal (Gmail, formulaire, Intercom) vers ticket Notion ou Linear. Pour chacun, on a déjà la trame optimisée et on l'adapte à votre stack.", en: "Top 5 by frequency: 1) lead capture into CRM with Slack or WhatsApp alert, 2) post-Stripe payment into Pennylane or QuickBooks invoice and welcome email, 3) Calendly booking into HubSpot + Google Calendar + Slack channel, 4) Typeform submission into Airtable with team notification, 5) inbound message (Gmail, form, Intercom) into a Notion or Linear ticket. For each, we already have an optimized blueprint we adapt to your stack." } },
    { q: { fr: "Pourquoi certains connecteurs Zapier coûtent plus cher (premium) ?", en: "Why do some Zapier connectors cost more (premium)?" },
      a: { fr: "Zapier classe certains connecteurs comme premium parce qu'ils requièrent une intégration plus poussée ou un coût licence côté éditeur (Salesforce, NetSuite, Zendesk Sell, GoHighLevel, certains ERP). Ces connecteurs ne sont accessibles qu'à partir du plan Professional. Si vous en utilisez un, on prévoit ce coût dès l'audit. Dans 80 % des cas, votre stack n'utilise que des connecteurs standard et un plan Starter ou Pro suffit largement.", en: "Zapier flags some connectors as premium because they require deeper integration or a vendor-side license cost (Salesforce, NetSuite, Zendesk Sell, GoHighLevel, certain ERPs). These are only available from the Professional plan up. If you use one, we account for that during the audit. 80% of the time, your stack uses only standard connectors and a Starter or Pro plan is largely enough." } },
    { q: { fr: "Comment debugger un Zap qui ne se déclenche pas ?", en: "How do you debug a Zap that doesn't trigger?" },
      a: { fr: "Notre méthode en 4 étapes : 1) vérifier le Zap History pour voir si le trigger a été reçu, 2) tester manuellement le déclencheur (Find data) pour confirmer la connexion API, 3) inspecter les filtres pour voir si la condition bloque l'exécution, 4) regarder les logs d'erreur sur chaque étape d'action. La cause n°1 est presque toujours un champ qui a changé de nom ou un token expiré. Avec notre setup (alertes + monitoring), vous détectez le problème en 5 minutes plutôt qu'en 3 semaines.", en: "Our 4-step method: 1) check Zap History to see if the trigger was received, 2) manually test the trigger (Find data) to confirm the API connection, 3) inspect filters to see if a condition blocks execution, 4) review error logs on each action step. The #1 cause is almost always a renamed field or an expired token. With our setup (alerts + monitoring), you spot the issue in 5 minutes instead of 3 weeks." } },
    { q: { fr: "Vais-je rester propriétaire de mes Zaps après le projet ?", en: "Will I stay the owner of my Zaps after the project?" },
      a: { fr: "Oui, à 100 %. On travaille directement dans votre compte Zapier, avec votre adresse email comme owner. Tous les Zaps, connexions et données restent chez vous. On peut être ajouté en tant que membre pendant la phase de construction et de support, puis retiré quand vous le souhaitez. Zéro lock-in.", en: "Yes, 100%. We work directly inside your Zapier account, with your email as owner. Every Zap, connection and piece of data stays with you. We can be added as a member during the build and support phase, then removed whenever you want. Zero lock-in." } },
    { q: { fr: "Travaillez-vous depuis le Bénin avec des clients à l'international ?", en: "Do you work from Benin with international clients?" },
      a: { fr: "Oui. GoScaleStudio est basée à Cotonou et accompagne des clients en France, Belgique, Suisse, Canada, Côte d'Ivoire, Sénégal et au-delà. Zapier étant 100 % cloud, on construit et on supervise vos Zaps à distance sans aucune contrainte géographique. Tous nos échanges, livrables et factures sont en français ou en anglais selon votre préférence.", en: "Yes. GoScaleStudio is based in Cotonou and works with clients in France, Belgium, Switzerland, Canada, Côte d'Ivoire, Senegal and beyond. Zapier being fully cloud, we build and monitor your Zaps remotely with zero geographic constraint. All our exchanges, deliverables and invoices are in French or English depending on your preference." } },
  ],

  relatedSlugs: ["automatisation-no-code", "automatisation-make", "automatisation-n8n", "chatbot-whatsapp-business"],

  cta: {
    headline: { fr: "Votre premier Zap en production cette semaine — vraiment.", en: "Your first Zap in production this week — for real." },
    desc: { fr: "30 minutes pour comprendre vos workflows, 24 à 48h pour livrer un Zap fiable, économe en tasks, supervisé. Pas d'abonnement caché, pas de lock-in : vous restez propriétaire de votre compte et de vos automatisations.", en: "30 minutes to understand your workflows, 24 to 48h to deliver a reliable, task-efficient and monitored Zap. No hidden subscription, no lock-in: you stay the owner of your account and your automations." },
    primaryLabel: { fr: "Réserver mon audit Zapier gratuit", en: "Book my free Zapier audit" },
    secondaryLabel: { fr: "Voir tous nos services", en: "See all our services" },
  },
};

/* ── Long-tail : ChatBot GPT pour Site Web ── */
const chatbotGptSiteWeb: ServicePage = {
  slug: "chatbot-gpt-site-web",
  type: "long-tail",
  category: "ChatBot IA",
  pillarSlug: "chatbot-ia",
  color: "brand",
  icon: Bot,
  heroIllustration: "chatbot-web",

  metaTitle: {
    fr: "Chatbot GPT pour Site Web — Widget IA Custom · Installé en 1 ligne de code",
    en: "GPT Chatbot for Websites — Custom AI Widget · Installed in 1 line of code",
  },
  metaDescription: {
    fr: "Intégrez un chatbot GPT-4 sur votre site web : widget conversationnel custom React, RAG sur votre contenu, qualification visiteurs, prise de RDV. Compatible WordPress, Webflow, Shopify, Next.js. +35 % de conversion. Démo gratuite.",
    en: "Add a GPT-4 chatbot to your website: custom React conversational widget, RAG on your content, visitor qualification, appointment booking. Compatible with WordPress, Webflow, Shopify, Next.js. +35% conversion. Free demo.",
  },
  keywords: [
    "chatbot site web", "widget chatbot", "chatbot GPT site", "chatbot GPT-4 site internet",
    "intégration chatbot WordPress", "chatbot React Next.js", "chatbot Webflow",
    "chatbot Shopify", "live chat IA", "assistant site internet", "chatbot conversion site",
    "widget conversationnel IA", "chatbot RAG site web", "agent IA site vitrine",
    "chatbot e-commerce site",
  ],

  hero: {
    badge: { fr: "Chatbot GPT pour Site Web", en: "GPT Chatbot for Websites" },
    h1: { fr: "Un chatbot GPT-4 intégré à votre site qui transforme vos visiteurs en clients", en: "A GPT-4 chatbot embedded in your site that turns visitors into customers" },
    h1Highlight: { fr: "+35 % de conversion", en: "+35% conversion" },
    subtitle: {
      fr: "On développe un widget conversationnel custom (React) ou on intègre Botpress/Voiceflow selon votre stack — entraîné sur le contenu de votre site, branché à votre agenda et votre CRM. Installation en 1 ligne de code sur WordPress, Webflow, Shopify, Next.js ou n'importe quel framework. Pas un script tiers générique : un assistant qui parle votre marque.",
      en: "We build a custom React conversational widget — or integrate Botpress/Voiceflow depending on your stack — trained on your website content, wired to your calendar and CRM. Install in 1 line of code on WordPress, Webflow, Shopify, Next.js or any framework. Not a generic third-party script: an assistant that speaks your brand.",
    },
    trustStrip: [
      { value: "1 ligne", label: { fr: "Pour installer", en: "To install" } },
      { value: "+35 %", label: { fr: "Conversion site", en: "Site conversion" } },
      { value: "24/7", label: { fr: "Disponibilité", en: "Availability" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Votre site web reçoit du trafic, mais il dort. Les visiteurs arrivent, scrollent, hésitent et repartent — sans laisser de trace, sans poser de question, sans devenir des clients. Vous payez pour du SEO, des ads, du contenu, mais la dernière marche (transformer un visiteur en lead ou en vente) reste cassée. Voici les 4 fuites qu'on observe sur 9 sites sur 10 avant qu'on intervienne.",
      en: "Your website gets traffic, but it sleeps. Visitors land, scroll, hesitate and leave — no trace, no question, no conversion. You pay for SEO, ads, content, but the last step (turning a visitor into a lead or a sale) is broken. Here are the 4 leaks we see on 9 out of 10 websites before we step in.",
    },
    items: [
      { icon: TrendingUp, title: { fr: "Votre taux de rebond dépasse 70 %", en: "Your bounce rate is over 70%" },
        desc: { fr: "7 visiteurs sur 10 quittent votre site sans interagir. Ils n'ont pas trouvé la réponse à leur question en 5 secondes, ils n'ont vu personne pour les aider, et ils sont partis chez le concurrent juste à côté. Chaque rebond, c'est de l'argent d'acquisition jeté à la poubelle.", en: "7 out of 10 visitors leave without interacting. They didn't find the answer in 5 seconds, no one was there to help, so they went to the competitor next door. Every bounce is acquisition spend thrown in the bin." } },
      { icon: Eye, title: { fr: "98 % de vos visiteurs restent totalement anonymes", en: "98% of your visitors stay completely anonymous" },
        desc: { fr: "Sans interaction, vous ne savez rien d'eux : qui ils sont, ce qu'ils cherchent, à quelle étape ils en sont. Vous gardez juste des stats Google Analytics agrégées, sans la moindre conversation, sans la moindre donnée exploitable pour rappeler ou relancer.", en: "Without interaction, you know nothing about them: who they are, what they want, where they stand. You're left with aggregate Google Analytics, no conversation, no actionable data to call back or follow up." } },
      { icon: Headphones, title: { fr: "Votre support n'existe pas en dehors des horaires de bureau", en: "Your support is dead outside office hours" },
        desc: { fr: "Le soir, le week-end, à 2 h du matin — les visiteurs qui ont une question n'ont personne. Or 40 % du trafic B2C arrive justement hors horaires ouvrés. Sans chatbot, vous laissez ces opportunités filer pendant que vous dormez. Au mieux, ils reviennent le lendemain. Au pire, jamais.", en: "Evenings, weekends, 2am — visitors with a question hit a wall. Yet 40% of B2C traffic comes outside business hours. Without a chatbot, you let those opportunities slip while you sleep. Best case they come back tomorrow. Worst case never." } },
      { icon: FileCheck, title: { fr: "Votre FAQ est ignorée, vos pages produits aussi", en: "Your FAQ is ignored, your product pages too" },
        desc: { fr: "Personne ne lit une page FAQ de 30 questions, ni 5 onglets d'une fiche produit. Vos visiteurs veulent une réponse directe à leur question précise — pas un labyrinthe à explorer. Tout le contenu que vous avez patiemment écrit reste invisible, et vous perdez en conversion ce que vous gagnez en référencement.", en: "No one reads a 30-question FAQ page, or 5 tabs of a product sheet. Your visitors want a direct answer to their specific question — not a maze to explore. All the content you patiently wrote stays invisible, and you lose in conversion what you gained in ranking." } },
    ],
  },

  solution: {
    headline: { fr: "Un widget IA qui parle votre marque, branché à votre site en 1 ligne de code", en: "An AI widget that speaks your brand, wired to your site in 1 line of code" },
    intro: {
      fr: "On développe nous-mêmes un widget conversationnel custom en React (totalement intégré à votre design), ou on intègre Botpress/Voiceflow si votre stack le justifie — jamais un script tiers générique qui ressemble à 10 000 autres sites. Le bot est entraîné sur tout votre contenu (pages, FAQ, blog, fiches produits) via du RAG, parle naturellement, qualifie, prend RDV, et passe la main quand il faut. Voici les 6 capacités qu'on déploie selon votre besoin.",
      en: "We build a custom React conversational widget ourselves (fully matched to your design), or integrate Botpress/Voiceflow when your stack calls for it — never a generic third-party script that looks like 10,000 other sites. The bot is trained on your full content (pages, FAQ, blog, product sheets) via RAG, chats naturally, qualifies, books appointments, and hands over when needed. Here are the 6 capabilities we deploy based on your needs.",
    },
    features: [
      { icon: Palette, title: { fr: "Widget custom React, 100 % à votre image", en: "Custom React widget, 100% on-brand" },
        desc: { fr: "Couleurs, typographie, icônes, animations, position, comportement mobile : tout est calé sur votre identité. On part de votre design system existant ou on créée un widget cohérent avec votre site. Pas de bouton bleu Intercom au coin de l'écran qui crie « je suis un outil tiers ».", en: "Colors, typography, icons, animations, position, mobile behavior: everything matches your identity. We build on your design system or craft a widget consistent with your site. No blue Intercom bubble screaming 'I'm a third-party tool'." } },
      { icon: Cpu, title: { fr: "RAG sur votre contenu site, indexé en temps réel", en: "RAG on your site content, indexed in real time" },
        desc: { fr: "On indexe tout votre site (pages, blog, FAQ, fiches produits, PDF) dans une base vectorielle (Pinecone, Qdrant). Le bot répond avec vos propres mots, cite ses sources et met automatiquement à jour ses connaissances dès que vous publiez une nouvelle page. Plus de réponses inventées, plus de contenu obsolète.", en: "We index your entire site (pages, blog, FAQ, product sheets, PDFs) into a vector database (Pinecone, Qdrant). The bot answers in your own words, cites its sources, and refreshes its knowledge automatically every time you publish a new page. No more hallucinations, no more stale content." } },
      { icon: Target, title: { fr: "Qualification des visiteurs en conversation naturelle", en: "Visitor qualification through natural conversation" },
        desc: { fr: "Le bot identifie en quelques messages le besoin, le budget, l'urgence et l'autorité du visiteur — sans formulaire rébarbatif. Les leads chauds atterrissent dans votre CRM (HubSpot, Notion, Airtable) avec un score et toute la transcription, prêts à être rappelés par un commercial.", en: "In a few messages, the bot identifies the visitor's need, budget, urgency and authority — no off-putting form. Hot leads land in your CRM (HubSpot, Notion, Airtable) with a score and the full transcript, ready for a sales call-back." } },
      { icon: Clock, title: { fr: "Prise de RDV directe depuis le chat", en: "Direct appointment booking from the chat" },
        desc: { fr: "Connecté à Google Calendar, Calendly ou Cal.com, le widget propose des créneaux libres et confirme le rendez-vous en quelques échanges. Votre visiteur ne quitte jamais le site, votre agenda se remplit tout seul, et la friction « prendre un appel » disparaît complètement.", en: "Connected to Google Calendar, Calendly or Cal.com, the widget offers open slots and confirms the meeting in a few messages. Your visitor never leaves the site, your calendar fills itself, and the 'book a call' friction completely vanishes." } },
      { icon: Handshake, title: { fr: "Escalade intelligente vers un humain", en: "Smart handover to a human" },
        desc: { fr: "Quand le bot détecte une demande complexe, une réclamation, ou tout simplement la volonté du visiteur de parler à quelqu'un, il passe la main à votre équipe avec le contexte complet — par email, Slack, WhatsApp ou directement dans le widget en live. Aucun visiteur frustré ne reste sans réponse.", en: "When the bot detects a complex request, a complaint, or simply a wish to speak with a human, it hands over to your team with full context — by email, Slack, WhatsApp or live inside the widget. No frustrated visitor is left hanging." } },
      { icon: Globe, title: { fr: "Multilingue natif, 8 langues incluses", en: "Native multilingual, 8 languages included" },
        desc: { fr: "Le widget détecte automatiquement la langue du visiteur (français, anglais, espagnol, allemand, italien, portugais, arabe, wolof) et répond dans la même langue, sans configuration. Idéal pour un site qui touche l'Europe et l'Afrique francophone en même temps.", en: "The widget auto-detects the visitor's language (French, English, Spanish, German, Italian, Portuguese, Arabic, Wolof) and replies in the same one, with zero config. Perfect for a site reaching Europe and francophone Africa at once." } },
    ],
  },

  howItWorks: {
    headline: { fr: "De l'audit à la mise en ligne — en 5 à 10 jours", en: "From audit to launch — in 5 to 10 days" },
    steps: [
      { icon: Search, title: { fr: "Audit du site & cadrage du widget", en: "Site audit & widget scoping" }, duration: { fr: "Jour 1", en: "Day 1" },
        desc: { fr: "On analyse votre site (stack, pages clés, parcours visiteur, taux de rebond, FAQ existante) et vos objectifs (qualification, support, ventes). On définit le périmètre du bot, le ton, le design, les intégrations nécessaires et les KPIs à suivre.", en: "We analyze your site (stack, key pages, visitor journey, bounce rate, existing FAQ) and your goals (qualification, support, sales). We define the bot's scope, tone, design, required integrations and KPIs to track." } },
      { icon: FileCheck, title: { fr: "Indexation du contenu & RAG", en: "Content indexing & RAG" }, duration: { fr: "Jours 2-3", en: "Days 2-3" },
        desc: { fr: "On crawle l'intégralité de votre site, on découpe en chunks sémantiques, on génère les embeddings (OpenAI ou Voyage AI) et on stocke le tout dans Pinecone ou Qdrant. On configure le pipeline de mise à jour automatique à chaque publication.", en: "We crawl your entire site, split into semantic chunks, generate embeddings (OpenAI or Voyage AI) and store everything in Pinecone or Qdrant. We set up the auto-refresh pipeline triggered on every publish." } },
      { icon: Settings, title: { fr: "Développement du widget & intégrations", en: "Widget build & integrations" }, duration: { fr: "Jours 4-6", en: "Days 4-6" },
        desc: { fr: "On développe le widget custom en React/Vercel AI SDK (ou on configure Botpress/Voiceflow), on branche GPT-4 ou Claude, on connecte votre CRM, votre agenda et vos outils via Make ou des webhooks. Le widget est entièrement responsive, mobile-first, accessible.", en: "We build the custom widget in React/Vercel AI SDK (or configure Botpress/Voiceflow), plug in GPT-4 or Claude, connect your CRM, calendar and tools via Make or webhooks. The widget is fully responsive, mobile-first, accessible." } },
      { icon: Rocket, title: { fr: "Installation 1 ligne & tests réels", en: "1-line install & real tests" }, duration: { fr: "Jours 7-8", en: "Days 7-8" },
        desc: { fr: "On vous fournit un snippet de script à coller dans le header de WordPress, Webflow, Shopify, Next.js, ou n'importe quel CMS. On stress-test avec 50+ conversations réelles, on ajuste les réponses, et on met en ligne progressivement (canary release possible).", en: "We hand you a snippet to paste in the header of WordPress, Webflow, Shopify, Next.js, or any CMS. We stress-test with 50+ real conversations, fine-tune answers, and roll out progressively (canary release available)." } },
      { icon: BarChart3, title: { fr: "A/B testing & optimisation continue", en: "A/B testing & ongoing optimization" }, duration: { fr: "Jours 9-30", en: "Days 9-30" },
        desc: { fr: "Pendant 30 jours, on suit le taux d'engagement, le taux de conversion, les sujets fréquents et on A/B teste les wordings d'accueil, les couleurs et les triggers. Objectif : faire grimper la conversion site mois après mois.", en: "For 30 days, we track engagement rate, conversion rate, top topics and A/B test welcome wordings, colors and triggers. The goal: push site conversion up month after month." } },
    ],
  },

  stats: [
    { value: "+35", suffix: "%", label: { fr: "Hausse de conversion site", en: "Site conversion uplift" } },
    { value: "-60", suffix: "%", label: { fr: "Taux de rebond", en: "Bounce rate" } },
    { value: "24/7", label: { fr: "Disponibilité du widget", en: "Widget availability" } },
    { value: "8", label: { fr: "Langues supportées", en: "Languages supported" } },
  ],

  useCases: {
    headline: { fr: "Pour quels sites web ce chatbot est-il vraiment fait ?", en: "Which websites is this chatbot really for?" },
    intro: {
      fr: "Un widget IA bien intégré change la donne dès qu'un site reçoit plus de 1 000 visites par mois. Voici comment on l'adapte concrètement aux 4 cas d'usage où il génère le plus de valeur immédiate — avec les chiffres moyens observés sur nos projets.",
      en: "A well-integrated AI widget changes the game as soon as a site sees more than 1,000 visits per month. Here's how we concretely tune it for the 4 use cases where it generates the most immediate value — with average numbers from our projects.",
    },
    cases: [
      { icon: ShoppingCart, sector: { fr: "E-commerce (Shopify, WooCommerce)", en: "E-commerce (Shopify, WooCommerce)" },
        problem: { fr: "Visiteurs qui hésitent entre 2 produits, questions sur la livraison, les tailles, le SAV — et un panier abandonné à la moindre friction.", en: "Visitors torn between 2 products, questions on shipping, sizes, returns — and a cart abandoned at the slightest friction." },
        solution: { fr: "Le widget accède au catalogue live (Shopify/Woo API), recommande le bon produit, répond sur stock/livraison, et propose un code promo si le visiteur hésite trop longtemps sur la page panier.", en: "The widget queries the live catalog (Shopify/Woo API), recommends the right product, answers on stock/shipping, and offers a promo code if the visitor hesitates too long on the cart page." },
        result: { fr: "+28 % de conversion produit, -45 % d'abandons panier sur les sessions où le widget est ouvert.", en: "+28% product conversion, -45% cart abandonment on sessions where the widget is opened." } },
      { icon: Cpu, sector: { fr: "SaaS & Apps B2B", en: "SaaS & B2B Apps" },
        problem: { fr: "Les visiteurs ne lisent pas la doc, ne comprennent pas la value prop, et partent sans s'inscrire à l'essai gratuit.", en: "Visitors don't read the docs, don't get the value prop, and leave without signing up for the free trial." },
        solution: { fr: "Le widget répond aux questions techniques en RAG sur la doc, explique les use cases, qualifie le visiteur (taille d'entreprise, stack, besoin) et déclenche un sign-up trial ou un démo call avec un AE.", en: "The widget answers technical questions via RAG on the docs, explains use cases, qualifies the visitor (company size, stack, need) and triggers a trial sign-up or demo call with an AE." },
        result: { fr: "+40 % de sign-ups trial qualifiés, -50 % de tickets support de niveau 1.", en: "+40% qualified trial sign-ups, -50% level-1 support tickets." } },
      { icon: Building2, sector: { fr: "Immobilier & Promoteurs", en: "Real estate & Developers" },
        problem: { fr: "Trafic important sur les annonces mais peu de prises de contact qualifiées. Beaucoup de curieux, peu d'acheteurs réels.", en: "High traffic on listings but few qualified contacts. Lots of browsers, few real buyers." },
        solution: { fr: "Le widget pose les bonnes questions (budget, zone, type, timing, financement), envoie automatiquement les biens correspondants et planifie la visite dans l'agenda de l'agent uniquement pour les prospects sérieux.", en: "The widget asks the right questions (budget, area, type, timing, financing), auto-sends matching listings and books viewings in the agent's calendar only for serious leads." },
        result: { fr: "Taux contact/visite multiplié par 3, agents libérés des appels non qualifiés.", en: "Contact-to-viewing rate 3× higher, agents freed from unqualified calls." } },
      { icon: Briefcase, sector: { fr: "Coachs, Cabinets & Consultants", en: "Coaches, Firms & Consultants" },
        problem: { fr: "Site vitrine qui reçoit du trafic SEO mais convertit peu en appel découverte. Le visiteur lit, hésite, ne se manifeste pas.", en: "A vitrine site that gets SEO traffic but rarely converts to discovery calls. The visitor reads, hesitates, never raises their hand." },
        solution: { fr: "Le widget engage la conversation au bon moment (scroll, intent d'exit), pose 3 questions clés sur la problématique, propose immédiatement un créneau Calendly et envoie la fiche prospect dans Notion.", en: "The widget opens the conversation at the right moment (scroll, exit intent), asks 3 key questions about the problem, immediately proposes a Calendly slot and pushes the lead sheet to Notion." },
        result: { fr: "+50 % d'appels découverte réservés depuis le site, sans budget pub supplémentaire.", en: "+50% discovery calls booked from the site, with zero extra ad spend." } },
    ],
  },

  stack: {
    headline: { fr: "La stack technique qu'on déploie", en: "The tech stack we deploy" },
    intro: {
      fr: "On choisit la stack en fonction de votre site existant, pas l'inverse. Voici les briques principales — toutes interchangeables selon vos contraintes (budget, hébergement, RGPD, données sensibles).",
      en: "We pick the stack based on your existing site, not the other way around. Here are the main bricks — all interchangeable depending on your constraints (budget, hosting, GDPR, sensitive data).",
    },
    tools: [
      { name: "GPT-4 / GPT-4o", role: { fr: "Modèle conversationnel principal, multilingue", en: "Main conversational model, multilingual" } },
      { name: "Claude (Anthropic)", role: { fr: "Alternative pour B2B sensibles et long contexte", en: "Alternative for sensitive B2B and long context" } },
      { name: "Vercel AI SDK", role: { fr: "SDK React pour streaming des réponses en temps réel", en: "React SDK for real-time response streaming" } },
      { name: "Pinecone / Qdrant", role: { fr: "Base vectorielle pour le RAG sur le contenu site", en: "Vector database for RAG on site content" } },
      { name: "Botpress / Voiceflow", role: { fr: "Plateformes no-code pour orchestrer les flows complexes", en: "No-code platforms to orchestrate complex flows" } },
      { name: "WordPress / Webflow / Shopify", role: { fr: "Intégration native via snippet header ou plugin officiel", en: "Native integration via header snippet or official plugin" } },
      { name: "Next.js / React / Vue", role: { fr: "Intégration directe en composant pour apps modernes", en: "Direct component integration for modern apps" } },
      { name: "Make / Zapier / n8n", role: { fr: "Connexion CRM, agenda, paiement, notifications", en: "Connects CRM, calendar, payments, notifications" } },
      { name: "HubSpot / Notion / Airtable", role: { fr: "CRM cible pour stocker les leads qualifiés", en: "Target CRM for qualified leads" } },
      { name: "Google Calendar / Calendly / Cal.com", role: { fr: "Prise de RDV directe depuis le widget", en: "Direct appointment booking from the widget" } },
    ],
  },

  pricing: {
    headline: { fr: "Combien coûte votre chatbot GPT site web ?", en: "How much does your GPT website chatbot cost?" },
    intro: {
      fr: "Trois formules selon la profondeur d'intégration et la complexité du RAG. Tout est sur mesure, payable en une fois ou 50/50. Sans abonnement GoScale, sans frais cachés — vous restez propriétaire du widget et du code.",
      en: "Three tiers based on integration depth and RAG complexity. All custom, payable upfront or 50/50. No GoScale subscription, no hidden fees — you stay the owner of the widget and the code.",
    },
    tiers: [
      { name: { fr: "Starter", en: "Starter" }, price: "250 €", priceNote: { fr: "Widget IA basique", en: "Basic AI widget" },
        features: [
          { fr: "Widget conversationnel pré-stylé (couleurs + logo)", en: "Pre-styled conversational widget (colors + logo)" },
          { fr: "FAQ automatisée (30-50 questions) + RAG sur 20 pages", en: "Automated FAQ (30-50 questions) + RAG on 20 pages" },
          { fr: "Réponses GPT-4 avec citations de sources", en: "GPT-4 replies with source citations" },
          { fr: "Installation 1 ligne (WordPress, Webflow, Shopify…)", en: "1-line install (WordPress, Webflow, Shopify…)" },
          { fr: "Livraison en 5 jours · Support 30 jours", en: "Delivered in 5 days · 30-day support" },
        ] },
      { name: { fr: "Pro (recommandé)", en: "Pro (recommended)" }, price: "600 €", priceNote: { fr: "Widget custom avec CRM & RDV", en: "Custom widget with CRM & bookings" }, highlight: true,
        features: [
          { fr: "Tout du plan Starter", en: "Everything in Starter" },
          { fr: "Widget React custom 100 % à votre charte", en: "Custom React widget, 100% on-brand" },
          { fr: "RAG full-site avec mise à jour auto", en: "Full-site RAG with auto-refresh" },
          { fr: "Qualification leads + scoring + push CRM", en: "Lead qualification + scoring + CRM push" },
          { fr: "Prise de RDV (Calendly, Cal.com, Google Calendar)", en: "Appointment booking (Calendly, Cal.com, Google Calendar)" },
          { fr: "Dashboard analytics + A/B testing", en: "Analytics dashboard + A/B testing" },
          { fr: "Livraison en 7-10 jours · Support 30 jours", en: "Delivered in 7-10 days · 30-day support" },
        ] },
      { name: { fr: "Enterprise", en: "Enterprise" }, price: "à partir de 1 200 €", priceNote: { fr: "Multi-langues & e-commerce avancé", en: "Multi-language & advanced e-commerce" },
        features: [
          { fr: "Tout du plan Pro", en: "Everything in Pro" },
          { fr: "Intégration e-commerce native (Shopify/Woo catalog live)", en: "Native e-commerce integration (live Shopify/Woo catalog)" },
          { fr: "Multi-langue avancé (8 langues, ton par marché)", en: "Advanced multi-language (8 languages, tone per market)" },
          { fr: "Escalade live agent (Slack, Crisp, Intercom)", en: "Live agent handover (Slack, Crisp, Intercom)" },
          { fr: "Hébergement RGPD UE + logs chiffrés", en: "EU GDPR hosting + encrypted logs" },
          { fr: "Livraison en 14-21 jours · Maintenance incluse 3 mois", en: "Delivered in 14-21 days · 3-month maintenance included" },
        ] },
    ],
  },

  faq: [
    { q: { fr: "Le widget est-il compatible avec WordPress, Shopify et Webflow ?", en: "Is the widget compatible with WordPress, Shopify and Webflow?" },
      a: { fr: "Oui, totalement. L'installation se fait par un snippet de script à coller dans le header (équivalent Google Analytics) ou via un plugin/app dédié selon la plateforme. Pour WordPress, on fournit aussi un plugin léger pour les utilisateurs non techniques. Pour Shopify, on intègre directement dans le thème via une section custom. Pour Webflow, c'est un embed dans Project Settings. Le widget fonctionne aussi sur Next.js, React, Vue, Squarespace, Wix, Framer ou n'importe quel site HTML statique.", en: "Yes, fully. Installation is done via a script snippet pasted in the header (like Google Analytics) or via a dedicated plugin/app depending on the platform. For WordPress we also ship a lightweight plugin for non-technical users. For Shopify we integrate directly in the theme through a custom section. For Webflow it's an embed in Project Settings. The widget also works on Next.js, React, Vue, Squarespace, Wix, Framer or any static HTML site." } },
    { q: { fr: "Peut-on customiser visuellement le widget pour qu'il colle à notre charte graphique ?", en: "Can we visually customize the widget to fit our brand?" },
      a: { fr: "Absolument, c'est même un de nos différenciateurs majeurs. À partir du plan Pro, on développe un widget React 100 % custom : couleurs, typographies, icônes, animations, forme du bouton, position, messages d'accueil, illustrations — tout est ajustable. Sur le plan Starter, on applique vos couleurs et votre logo à un template pré-stylé. Dans tous les cas, vous n'aurez jamais un widget qui ressemble à 10 000 autres sites avec un bouton bleu Intercom au coin.", en: "Absolutely, it's even one of our key differentiators. From the Pro plan, we build a 100% custom React widget: colors, fonts, icons, animations, button shape, position, welcome messages, illustrations — everything is tunable. On the Starter plan we apply your colors and logo to a pre-styled template. Either way, you'll never end up with a widget that looks like 10,000 other sites with a blue Intercom bubble in the corner." } },
    { q: { fr: "Le widget est-il conforme RGPD ?", en: "Is the widget GDPR-compliant?" },
      a: { fr: "Oui. On configure le widget avec un consentement explicite avant ouverture, un opt-in clair pour la collecte de données, et un lien direct vers votre politique de confidentialité. Les conversations sont anonymisées par défaut (pas de stockage d'IP), chiffrées en transit et au repos, et conservées le temps que vous décidez (30 jours par défaut). Sur le plan Enterprise, l'hébergement peut être 100 % UE (Pinecone EU, OpenAI EU endpoints) avec un DPA signé.", en: "Yes. We configure the widget with explicit consent before opening, a clear opt-in for data collection, and a direct link to your privacy policy. Conversations are anonymized by default (no IP storage), encrypted in transit and at rest, and retained for the duration you choose (30 days by default). On the Enterprise plan, hosting can be 100% EU (Pinecone EU, OpenAI EU endpoints) with a signed DPA." } },
    { q: { fr: "Le chatbot peut-il parler plusieurs langues sur le même site ?", en: "Can the chatbot speak multiple languages on the same site?" },
      a: { fr: "Oui, de façon native. Le widget détecte automatiquement la langue du navigateur ou du premier message du visiteur, puis répond dans cette langue. 8 langues sont supportées d'office : français, anglais, espagnol, allemand, italien, portugais, arabe et wolof. D'autres peuvent être ajoutées à la demande. Sur le plan Enterprise, on peut même adapter le ton par marché (plus formel en Allemagne, plus chaleureux en Afrique francophone, etc.).", en: "Yes, natively. The widget auto-detects the browser language or the visitor's first message, then replies in that language. 8 languages are supported out of the box: French, English, Spanish, German, Italian, Portuguese, Arabic and Wolof. Others can be added on request. On the Enterprise plan, we can even adapt tone per market (more formal in Germany, warmer in francophone Africa, etc.)." } },
    { q: { fr: "Quels sont les coûts récurrents API après la livraison ?", en: "What are the recurring API costs after delivery?" },
      a: { fr: "Vous payez directement à l'usage, sans intermédiaire : OpenAI GPT-4o (~0,01 à 0,03 € par conversation complète), Pinecone (gratuit jusqu'à 100 K vecteurs puis ~70 €/mois), et éventuellement Botpress (gratuit jusqu'à 5 000 messages/mois). Pour un site recevant 5 000 à 10 000 visites/mois avec ~10 % d'ouverture du widget, comptez 40 à 120 €/mois tout compris. Aucun frais GoScaleStudio en dehors du pack Maintenance optionnel (à partir de 80 €/mois).", en: "You pay directly per usage, no middleman: OpenAI GPT-4o (~€0.01 to 0.03 per full conversation), Pinecone (free up to 100K vectors then ~€70/month), and optionally Botpress (free up to 5,000 messages/month). For a site getting 5,000 to 10,000 visits/month with ~10% widget open rate, budget €40 to €120/month all-in. No recurring GoScaleStudio fees outside of the optional Maintenance pack (from €80/month)." } },
    { q: { fr: "Peut-on tester le widget avant de payer ?", en: "Can we test the widget before paying?" },
      a: { fr: "Oui. Avant tout engagement, on vous livre une démo personnalisée pendant l'appel découverte (gratuit) : on prend une page de votre site en exemple, on l'indexe en live, et on vous montre le widget répondant à 3-5 questions clients réelles. Vous voyez exactement ce que ça donne avant de décider. Si vous lancez le projet, cette démo devient le point de départ du widget final.", en: "Yes. Before any commitment, we ship a personalized demo during the (free) discovery call: we take a page from your site as a sample, index it live, and show the widget answering 3-5 real customer questions. You see exactly what it does before deciding. If you launch the project, this demo becomes the starting point for the final widget." } },
    { q: { fr: "Faites-vous de l'A/B testing sur le widget ?", en: "Do you run A/B testing on the widget?" },
      a: { fr: "Oui, à partir du plan Pro. On teste systématiquement le message d'accueil, le moment d'apparition (scroll %, exit intent, temps passé), la couleur et la position du bouton, et même la formulation des questions de qualification. Tous les KPIs (taux d'ouverture, taux d'engagement, conversion en lead, conversion en RDV) sont mesurés et reportés dans un dashboard. Sur 30 jours, on optimise jusqu'à atteindre l'objectif fixé au cadrage.", en: "Yes, from the Pro plan. We systematically test the welcome message, the appearance trigger (scroll %, exit intent, time on page), the button color and position, even the wording of qualifying questions. All KPIs (open rate, engagement rate, lead conversion, booking conversion) are measured and reported in a dashboard. Over 30 days, we optimize until we hit the target set during scoping." } },
    { q: { fr: "Pourquoi développer un widget custom plutôt qu'utiliser Intercom, Crisp ou Tidio ?", en: "Why build a custom widget rather than using Intercom, Crisp or Tidio?" },
      a: { fr: "Ces outils sont excellents pour du live chat humain, mais leurs « briques IA » sont des add-ons génériques (souvent à 50-200 €/mois en plus) avec une customisation très limitée et un branding visible. Un widget custom propulsé par GPT-4 vous donne : 100 % de contrôle visuel, un RAG fin sur votre contenu, zéro abonnement plateforme, et une intégration sur mesure de vos outils. C'est plus puissant et souvent moins cher sur 12 mois. Cela dit, si vous tenez à Intercom/Crisp, on peut aussi y greffer notre couche IA — on s'adapte.", en: "These tools are great for human live chat, but their 'AI bricks' are generic add-ons (often €50-200/month extra) with very limited customization and visible branding. A custom widget powered by GPT-4 gives you: 100% visual control, fine-grained RAG on your content, zero platform subscription, and a tailored integration with your tools. It's more powerful and often cheaper over 12 months. That said, if you're attached to Intercom/Crisp, we can also graft our AI layer on top — we adapt." } },
  ],

  relatedSlugs: ["chatbot-ia", "chatbot-whatsapp-business", "site-wordpress-seo", "automatisation-no-code"],

  cta: {
    headline: { fr: "Et si votre site commençait enfin à convertir vos visiteurs en clients ?", en: "What if your website finally started turning visitors into customers?" },
    desc: { fr: "30 minutes pour comprendre votre site et vos objectifs, une démo live de votre widget pendant l'appel, et un devis sous 24h. Audit 100 % gratuit, sans engagement.", en: "30 minutes to understand your site and goals, a live widget demo during the call, and a quote within 24h. 100% free audit, no commitment." },
    primaryLabel: { fr: "Réserver ma démo gratuite", en: "Book my free demo" },
    secondaryLabel: { fr: "Voir tous nos services", en: "See all our services" },
  },
};

/* ── Long-tail : CallBot Vapi ── */
const callbotVapi: ServicePage = {
  slug: "callbot-vapi",
  type: "long-tail",
  category: "CallBot IA",
  pillarSlug: "callbot-ia-vocal",
  color: "blue",
  icon: Phone,
  heroIllustration: "callbot-phone",

  metaTitle: {
    fr: "Agence Vapi — CallBot IA Voix Premium · Déployé en 5 jours",
    en: "Vapi Agency — Premium Voice AI CallBot · Deployed in 5 days",
  },
  metaDescription: {
    fr: "Experts Vapi certifiés à Cotonou. Callbots vocaux IA avec voix ElevenLabs, latence < 800ms, fonctions custom, intégration Cal.com & CRM. Déployé en 5 jours. Audit Vapi gratuit.",
    en: "Certified Vapi experts in Cotonou. AI voice callbots with ElevenLabs voices, sub-800ms latency, custom functions, Cal.com & CRM integration. Shipped in 5 days. Free Vapi audit.",
  },
  keywords: [
    "Vapi callbot", "Vapi voice AI", "Vapi tutoriel", "agence Vapi", "expert Vapi",
    "Vapi Twilio", "Vapi ElevenLabs", "Vapi pricing", "callbot Vapi francais",
    "Vapi vs Retell", "Vapi GPT-4", "Vapi voicemail detection", "Vapi end call phrases",
    "Vapi fonctions custom", "Vapi Cal.com", "Vapi Make", "agent vocal Vapi", "Vapi Benin",
  ],

  hero: {
    badge: { fr: "Agence Vapi certifiée", en: "Certified Vapi agency" },
    h1: { fr: "Un callbot Vapi avec une voix qu'on jurerait humaine —", en: "A Vapi callbot with a voice you'd swear is human —" },
    h1Highlight: { fr: "latence sous 800ms", en: "sub-800ms latency" },
    subtitle: {
      fr: "On déploie sur Vapi des agents vocaux qui appellent, répondent et qualifient avec des voix ElevenLabs ou OpenAI, GPT-4 en cerveau, et Twilio en téléphonie. Interruptions naturelles, détection de répondeur, fonctions custom branchées à votre agenda et votre CRM. Mis en ligne en 5 jours.",
      en: "We deploy Vapi voice agents that call, answer and qualify with ElevenLabs or OpenAI voices, GPT-4 as the brain, and Twilio as the telephony layer. Natural interruptions, voicemail detection, custom functions wired to your calendar and CRM. Live in 5 days.",
    },
    trustStrip: [
      { value: "5j", label: { fr: "Déploiement", en: "Deployment" } },
      { value: "< 800ms", label: { fr: "Latence vocale", en: "Voice latency" } },
      { value: "0,07 €", label: { fr: "Coût/minute moyen", en: "Avg cost/min" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Vapi est aujourd'hui la plateforme de référence pour bâtir des agents vocaux IA sérieux : voix premium, latence minimale, fonctions custom et orchestration LLM dans un seul SDK. Mais sans expertise pointue, on se retrouve vite avec un bot qui coupe la parole, qui parle dans le vide d'un répondeur, ou qui explose la facture OpenAI. Voici les 4 échecs typiques qu'on corrige chez les équipes qui nous appellent après une première tentative ratée.",
      en: "Vapi is today the reference platform to build serious AI voice agents: premium voices, minimal latency, custom functions and LLM orchestration in one SDK. But without sharp expertise, you quickly end up with a bot that cuts users off, talks into a voicemail void, or blows up the OpenAI bill. Here are the 4 typical failures we fix for teams calling us after a botched first attempt.",
    },
    items: [
      { icon: Clock, title: { fr: "Votre callbot Vapi met 2 secondes à répondre — l'appelant raccroche", en: "Your Vapi callbot takes 2s to reply — the caller hangs up" },
        desc: { fr: "Une mauvaise combinaison transcripteur (Deepgram vs Whisper), modèle (GPT-4 vs GPT-4o-mini) et voix (ElevenLabs vs OpenAI) peut faire grimper la latence à 1,5-2,5s. Au-delà de 1s, un humain perçoit un blanc gênant et perd confiance. La majorité des setups Vapi non optimisés tournent dans cette zone rouge.", en: "A bad mix of transcriber (Deepgram vs Whisper), model (GPT-4 vs GPT-4o-mini) and voice (ElevenLabs vs OpenAI) can push latency to 1.5-2.5s. Past 1s, humans feel an awkward gap and lose trust. Most unoptimized Vapi setups sit in that red zone." } },
      { icon: MessageSquare, title: { fr: "Le bot parle par-dessus l'appelant, ou se fait couper en boucle", en: "The bot talks over the caller, or gets cut off in loops" },
        desc: { fr: "Les paramètres d'interruption Vapi (endpointing, interruption sensitivity, backchanneling) sont mal réglés par défaut pour le français. Sans ajustement fin, le bot interrompt les hésitations naturelles ou répond à un silence comme s'il s'agissait d'une question — et la conversation devient inutilisable.", en: "Vapi's interruption settings (endpointing, interruption sensitivity, backchanneling) are poorly tuned by default for French. Without fine adjustment, the bot interrupts natural hesitations or replies to silence as if it were a question — and the conversation becomes unusable." } },
      { icon: Phone, title: { fr: "Il laisse un message de 3 minutes sur le répondeur", en: "It leaves a 3-minute message on the voicemail" },
        desc: { fr: "Sans voicemail detection active et sans end call phrases bien configurées, un agent Vapi qui appelle un mobile finit souvent par dérouler tout son script sur la boîte vocale. Résultat : chaque appel raté coûte 0,30-0,50 € en pure perte, et personne ne saura jamais ce qu'a dit le bot.", en: "Without active voicemail detection and properly configured end call phrases, a Vapi agent calling a mobile often pours its entire script into the voicemail. Result: every missed call costs €0.30-0.50 in pure waste, and no one will ever know what the bot said." } },
      { icon: BarChart3, title: { fr: "Votre facture Vapi + OpenAI + ElevenLabs explose sans visibilité", en: "Your Vapi + OpenAI + ElevenLabs bill explodes with no visibility" },
        desc: { fr: "Un callbot mal optimisé peut coûter 0,25 €/minute (GPT-4 long context, ElevenLabs Turbo v2.5, transcription premium). À 1000 appels/mois, c'est 1500-2500 € de frais infra. Avec le bon mix de modèles et de voix, on descend à 0,05-0,09 €/minute pour une qualité identique à l'oreille.", en: "A poorly optimized callbot can cost €0.25/minute (GPT-4 long context, ElevenLabs Turbo v2.5, premium transcription). At 1000 calls/month that's €1500-2500 in infra. With the right mix of models and voices, we drop to €0.05-0.09/minute for a quality indistinguishable to the ear." } },
    ],
  },

  solution: {
    headline: { fr: "Un agent Vapi réglé au millimètre — voix, latence, coût, intégrations", en: "A Vapi agent dialed in to the millimeter — voice, latency, cost, integrations" },
    intro: {
      fr: "On vit dans le dashboard Vapi depuis sa bêta. On connaît par cœur chaque paramètre qui fait la différence entre un bot frustrant et un bot qu'on prend pour un humain au téléphone. Voici les 6 capacités qu'on calibre pour vous, sur la base de centaines d'heures d'appels réels analysés sur des assistants Vapi en production.",
      en: "We've lived in the Vapi dashboard since its beta. We know by heart every parameter that separates a frustrating bot from one mistaken for a human on the phone. Here are the 6 capabilities we calibrate for you, based on hundreds of hours of real calls analyzed on production Vapi assistants.",
    },
    features: [
      { icon: Sparkles, title: { fr: "Voix premium ElevenLabs ou OpenAI au choix", en: "Premium ElevenLabs or OpenAI voice of your choice" },
        desc: { fr: "Vous sélectionnez la voix qui colle à votre marque parmi la bibliothèque ElevenLabs (Turbo v2.5, multilingue, clonable à partir de 60 secondes d'enregistrement) ou OpenAI TTS (Nova, Shimmer, Onyx — moins chère, qualité excellente). On benchmark les deux sur votre script avant de figer le choix.", en: "You pick the voice that fits your brand from the ElevenLabs library (Turbo v2.5, multilingual, clonable from 60s of recording) or OpenAI TTS (Nova, Shimmer, Onyx — cheaper, excellent quality). We benchmark both on your script before locking the choice." } },
      { icon: Zap, title: { fr: "Latence < 800ms grâce à un stack pipeline optimisé", en: "Sub-800ms latency thanks to an optimized pipeline stack" },
        desc: { fr: "Combo Deepgram Nova-2 (transcription streaming) + GPT-4o-mini ou Groq Llama 3.3 (raisonnement rapide) + ElevenLabs Turbo v2.5 (synthèse streaming). On règle l'endpointing entre 200 et 500ms selon la verbosité de votre cas d'usage, on active le backchanneling sur les uh-uh naturels.", en: "Combo Deepgram Nova-2 (streaming transcription) + GPT-4o-mini or Groq Llama 3.3 (fast reasoning) + ElevenLabs Turbo v2.5 (streaming synthesis). We set endpointing between 200 and 500ms depending on your use case verbosity, enable backchanneling on natural uh-huhs." } },
      { icon: Settings, title: { fr: "Fonctions custom branchées à vos outils", en: "Custom functions wired to your tools" },
        desc: { fr: "On déclare dans Vapi des function calls qui déclenchent vos webhooks Make ou n8n : vérifier un stock, créer un RDV dans Cal.com, pousser un lead dans HubSpot, envoyer un SMS de confirmation Twilio. L'agent ne se contente pas de parler — il agit pendant l'appel.", en: "We declare in Vapi function calls that trigger your Make or n8n webhooks: check stock, create a Cal.com booking, push a lead into HubSpot, send a Twilio confirmation SMS. The agent doesn't just talk — it acts during the call." } },
      { icon: Phone, title: { fr: "Voicemail detection + end call phrases réglées au cordeau", en: "Voicemail detection + end call phrases dialed in" },
        desc: { fr: "On active la voicemail detection native Vapi (modèle dédié qui écoute les 3 premières secondes) et on configure des end call phrases adaptées au français : Au revoir, bonne journée, Je vous laisse, Merci pour votre appel. Le bot raccroche proprement, sans payer 60 secondes de blanc.", en: "We turn on Vapi's native voicemail detection (a dedicated model listening to the first 3 seconds) and configure end call phrases adapted to French: Au revoir, bonne journée, I'll let you go, Thanks for your call. The bot hangs up cleanly, without paying for 60 seconds of silence." } },
      { icon: Globe, title: { fr: "Multilingue avec switch automatique en cours d'appel", en: "Multilingual with automatic in-call switching" },
        desc: { fr: "Vapi détecte la langue de l'appelant et bascule en temps réel entre français, anglais, espagnol, arabe ou portugais. Indispensable pour les business actifs au Bénin, en Côte d'Ivoire ou avec une clientèle francophone et anglophone mélangée. Une seule configuration, plusieurs marchés.", en: "Vapi detects the caller's language and switches in real time between French, English, Spanish, Arabic or Portuguese. Essential for businesses active in Benin, Côte d'Ivoire or with a mixed French-English clientele. One config, multiple markets." } },
      { icon: BarChart3, title: { fr: "Logs, transcripts et analytics dans un dashboard unique", en: "Logs, transcripts and analytics in a single dashboard" },
        desc: { fr: "Chaque appel est enregistré, transcrit, analysé (intentions détectées, sentiment, function calls exécutées, raisons de fin d'appel). On vous livre une vue Notion ou un dashboard Vapi natif pour piloter : taux de qualification, durée moyenne, coût par minute, succès de prise de RDV.", en: "Every call is recorded, transcribed, analyzed (detected intents, sentiment, executed function calls, end-call reasons). We deliver a Notion view or native Vapi dashboard to monitor: qualification rate, average duration, cost per minute, booking success rate." } },
    ],
  },

  howItWorks: {
    headline: { fr: "De la signature au callbot Vapi en production — en 5 jours", en: "From signing to a Vapi callbot in production — in 5 days" },
    steps: [
      { icon: Search, title: { fr: "Audit Vapi & définition du pipeline", en: "Vapi audit & pipeline definition" }, duration: { fr: "Jour 1", en: "Day 1" },
        desc: { fr: "On clarifie le cas d'usage (inbound, outbound, hybride), on choisit le bon assistant Vapi (orchestrator, workflow, squad), on calibre le couple transcripteur/LLM/voix selon votre tolérance coût/qualité, et on liste les fonctions custom nécessaires.", en: "We clarify the use case (inbound, outbound, hybrid), pick the right Vapi assistant (orchestrator, workflow, squad), calibrate the transcriber/LLM/voice trio to your cost/quality tradeoff, and list the required custom functions." } },
      { icon: Palette, title: { fr: "Prompt engineering & script vocal", en: "Prompt engineering & voice script" }, duration: { fr: "Jour 2", en: "Day 2" },
        desc: { fr: "On rédige le system prompt Vapi avec les sections critiques : persona, ton, règles d'escalade, gestion des objections, formules de politesse françaises. On enregistre ou on sélectionne la voix ElevenLabs, on teste 3-5 variantes sur de vrais extraits.", en: "We write the Vapi system prompt with critical sections: persona, tone, escalation rules, objection handling, French politeness formulas. We record or pick the ElevenLabs voice, test 3-5 variants on real snippets." } },
      { icon: Settings, title: { fr: "Intégrations Twilio, Cal.com & Make", en: "Twilio, Cal.com & Make integrations" }, duration: { fr: "Jour 3", en: "Day 3" },
        desc: { fr: "On connecte Vapi à votre numéro Twilio (entrant et sortant), on déclare les fonctions custom vers Cal.com pour la prise de RDV, et on câble les webhooks Make qui poussent les leads dans HubSpot, Notion ou Airtable avec le transcript complet.", en: "We connect Vapi to your Twilio number (inbound and outbound), declare custom functions toward Cal.com for booking, and wire Make webhooks that push leads into HubSpot, Notion or Airtable with the full transcript." } },
      { icon: Rocket, title: { fr: "Tests d'appels réels & tuning fin", en: "Real call tests & fine tuning" }, duration: { fr: "Jour 4", en: "Day 4" },
        desc: { fr: "On passe 20 à 50 appels réels (vous, vos commerciaux, des testeurs) en variant les profils. On ajuste endpointing, interruption sensitivity, voicemail detection, end call phrases jusqu'à obtenir un agent qui sonne naturel sur 95 % des cas.", en: "We run 20 to 50 real calls (you, your sales reps, testers) varying profiles. We tune endpointing, interruption sensitivity, voicemail detection, end call phrases until the agent sounds natural across 95% of cases." } },
      { icon: Handshake, title: { fr: "Mise en production & passation", en: "Go-live & handover" }, duration: { fr: "Jour 5 + S1-S4", en: "Day 5 + W1-W4" },
        desc: { fr: "On bascule sur votre numéro principal, on active le monitoring, et on forme votre équipe à lire les transcripts Vapi, ajuster un prompt et exporter les leads. Inclus : 30 jours d'optimisation continue sur les conversations qui dérapent.", en: "We switch to your main number, turn on monitoring, and train your team to read Vapi transcripts, tweak a prompt and export leads. Included: 30 days of continuous optimization on conversations that go off script." } },
    ],
  },

  stats: [
    { value: "5", suffix: "j", label: { fr: "Délai de déploiement", en: "Deployment time" } },
    { value: "800", suffix: "ms", label: { fr: "Latence vocale max", en: "Max voice latency" } },
    { value: "0,07", suffix: "€/min", label: { fr: "Coût infra moyen", en: "Avg infra cost" } },
    { value: "94", suffix: "%", label: { fr: "Appels achevés sans humain", en: "Calls handled without humans" } },
  ],

  useCases: {
    headline: { fr: "À qui Vapi convient-il vraiment ?", en: "Who is Vapi really a fit for?" },
    intro: {
      fr: "Vapi excelle dès qu'il y a un volume d'appels répétitifs avec des séquences claires (qualifier, prendre un RDV, répondre à une FAQ chaude) et un besoin de voix premium. Voici les 4 secteurs où nos déploiements Vapi tournent au quotidien — avec les résultats concrets que nous mesurons.",
      en: "Vapi shines as soon as there's a volume of repetitive calls with clear sequences (qualify, book a slot, answer a hot FAQ) and a need for premium voice. Here are the 4 sectors where our Vapi deployments run daily — with the concrete results we measure.",
    },
    cases: [
      { icon: Stethoscope, sector: { fr: "Cliniques & cabinets médicaux", en: "Clinics & medical practices" },
        problem: { fr: "Votre standard sature aux heures de pointe, les patients raccrochent après 90 secondes d'attente, et les RDV manqués le soir ne sont jamais rappelés.", en: "Your switchboard saturates at peak hours, patients hang up after 90 seconds on hold, and missed evening calls are never returned." },
        solution: { fr: "Un agent Vapi inbound qualifie le motif (urgence, RDV, renouvellement), prend le RDV directement sur Cal.com couplé à Doctolib, et envoie un SMS de confirmation Twilio. Les vraies urgences sont transférées à un humain en moins de 5 secondes.", en: "An inbound Vapi agent qualifies the reason (emergency, booking, refill), books directly in Cal.com paired with Doctolib, and sends a Twilio SMS confirmation. Real emergencies are transferred to a human in under 5 seconds." },
        result: { fr: "+220 % d'appels traités, taux de no-show divisé par 2, secrétariat déchargée de 6h/jour.", en: "+220% calls handled, no-show rate cut in half, reception desk freed up 6h/day." } },
      { icon: Building2, sector: { fr: "Agences immobilières", en: "Real estate agencies" },
        problem: { fr: "Vos annonces génèrent 80 appels entrants par semaine, mais vos agents ne rappellent que 20 % des numéros laissés en répondeur le week-end.", en: "Your listings generate 80 inbound calls a week, but agents only call back 20% of the numbers left on voicemail over the weekend." },
        solution: { fr: "Un agent Vapi outbound rappelle automatiquement chaque numéro manqué dans les 15 minutes, qualifie (budget, zone, timing, financement) et propose un créneau visite sur Cal.com. Les leads chauds atterrissent dans HubSpot avec un score.", en: "An outbound Vapi agent automatically calls back every missed number within 15 minutes, qualifies (budget, area, timing, financing) and offers a viewing slot in Cal.com. Hot leads land in HubSpot with a score." },
        result: { fr: "x3 sur le taux de transformation appel-visite, 100 % des leads recontactés le jour même.", en: "3x call-to-viewing conversion rate, 100% of leads contacted the same day." } },
      { icon: Briefcase, sector: { fr: "Services professionnels & cabinets", en: "Professional services & firms" },
        problem: { fr: "Avocats, experts-comptables, consultants : vos prospects appellent pour un premier contact, mais 60 % tombent sur le répondeur et n'envoient jamais de mail de suivi.", en: "Lawyers, accountants, consultants: your prospects call for a first contact, but 60% hit voicemail and never send a follow-up email." },
        solution: { fr: "Vapi prend l'appel 24/7, présente votre cabinet en 30 secondes, qualifie la nature du dossier, fixe un rendez-vous découverte gratuit dans votre agenda et envoie un email de confirmation avec le brief sur la situation du prospect.", en: "Vapi picks up 24/7, introduces your firm in 30 seconds, qualifies the nature of the case, books a free discovery slot in your calendar and sends a confirmation email with the prospect brief." },
        result: { fr: "+45 % de RDV qualifiés, 0 appel manqué la nuit ni le week-end.", en: "+45% qualified meetings, 0 missed calls at night or on weekends." } },
      { icon: Heart, sector: { fr: "Hôtellerie & restauration", en: "Hospitality & restaurants" },
        problem: { fr: "Réservations, modifications, horaires, allergies, parking : votre réception est interrompue toutes les 4 minutes pendant le service, et 30 % des appels du soir restent sans réponse.", en: "Bookings, changes, hours, allergies, parking: your reception is interrupted every 4 minutes during service, and 30% of evening calls go unanswered." },
        solution: { fr: "Un callbot Vapi gère les réservations directement dans votre PMS (Mews, Cloudbeds) ou logiciel de résa (Zenchef, TheFork), répond aux questions fréquentes en français et anglais, et bascule au manager uniquement pour les demandes VIP.", en: "A Vapi callbot handles bookings directly in your PMS (Mews, Cloudbeds) or reservation tool (Zenchef, TheFork), answers frequent questions in French and English, and only escalates VIP requests to the manager." },
        result: { fr: "+30 % de réservations captées, équipe de salle 100 % concentrée sur les clients en place.", en: "+30% bookings captured, front-of-house team 100% focused on guests on site." } },
    ],
  },

  stack: {
    headline: { fr: "La stack Vapi qu'on déploie", en: "The Vapi stack we deploy" },
    intro: {
      fr: "Vapi n'est pas une boîte noire : c'est un orchestrateur qui combine plusieurs briques. Le secret tient dans le choix de chaque brique selon votre cas d'usage. Voici la stack standard qu'on assemble pour atteindre une qualité production.",
      en: "Vapi is not a black box: it's an orchestrator that combines several bricks. The secret is in choosing each brick based on your use case. Here's the standard stack we assemble to reach production quality.",
    },
    tools: [
      { name: "Vapi", role: { fr: "Orchestrateur principal — gère pipeline voix, latence, fonctions custom", en: "Main orchestrator — handles voice pipeline, latency, custom functions" } },
      { name: "Twilio", role: { fr: "Téléphonie SIP — numéros entrants/sortants dans 100+ pays", en: "SIP telephony — inbound/outbound numbers in 100+ countries" } },
      { name: "ElevenLabs Turbo v2.5", role: { fr: "Synthèse vocale premium streaming, français natif, clonage de voix", en: "Premium streaming TTS, native French, voice cloning" } },
      { name: "OpenAI TTS", role: { fr: "Alternative voix moins chère (Nova, Shimmer, Onyx)", en: "Cheaper voice alternative (Nova, Shimmer, Onyx)" } },
      { name: "GPT-4o / GPT-4o-mini", role: { fr: "Cerveau conversationnel, raisonnement et function calls", en: "Conversational brain, reasoning and function calls" } },
      { name: "Deepgram Nova-2", role: { fr: "Transcription streaming ultra-rapide, robuste aux accents", en: "Ultra-fast streaming transcription, accent-robust" } },
      { name: "Cal.com", role: { fr: "Prise de RDV automatique depuis l'appel", en: "Automatic booking from the call" } },
      { name: "Make / n8n", role: { fr: "Webhooks vers CRM, base de données, SMS, email", en: "Webhooks to CRM, database, SMS, email" } },
      { name: "HubSpot / Notion / Airtable", role: { fr: "Destination des leads qualifiés avec transcript complet", en: "Destination for qualified leads with full transcript" } },
      { name: "Groq Llama 3.3", role: { fr: "LLM ultra-rapide pour latence critique (alternative GPT)", en: "Ultra-fast LLM for critical latency (GPT alternative)" } },
    ],
  },

  pricing: {
    headline: { fr: "Combien coûte un callbot Vapi sur mesure ?", en: "How much does a custom Vapi callbot cost?" },
    intro: {
      fr: "Trois formules selon la complexité du pipeline et le nombre de fonctions custom. Tout est payé en une fois ou 50/50, sans abonnement GoScaleStudio. Vous payez Vapi, OpenAI et ElevenLabs directement à l'usage — on vous donne les meilleures pratiques pour contrôler la facture.",
      en: "Three tiers based on pipeline complexity and the number of custom functions. Everything is paid upfront or 50/50, no GoScaleStudio subscription. You pay Vapi, OpenAI and ElevenLabs directly on usage — we share the best practices to keep the bill in check.",
    },
    tiers: [
      { name: { fr: "Starter Vapi", en: "Vapi Starter" }, price: "350 €", priceNote: { fr: "Agent Vapi inbound simple", en: "Simple inbound Vapi agent" },
        features: [
          { fr: "1 agent Vapi (inbound ou outbound)", en: "1 Vapi agent (inbound or outbound)" },
          { fr: "Voix ElevenLabs ou OpenAI au choix", en: "ElevenLabs or OpenAI voice of your choice" },
          { fr: "Connexion Twilio (1 numéro fourni)", en: "Twilio connection (1 number provided)" },
          { fr: "FAQ vocale (20-30 intentions)", en: "Voice FAQ (20-30 intents)" },
          { fr: "Transfert humain conditionné", en: "Conditional human transfer" },
          { fr: "Livraison 5 jours · Support 30 jours", en: "Delivered in 5 days · 30-day support" },
        ] },
      { name: { fr: "Pro Vapi (recommandé)", en: "Pro Vapi (recommended)" }, price: "700 €", priceNote: { fr: "Agent complet avec RDV & CRM", en: "Full agent with bookings & CRM" }, highlight: true,
        features: [
          { fr: "Tout du plan Starter", en: "Everything in Starter" },
          { fr: "Prise de RDV via Cal.com / Google Calendar", en: "Booking via Cal.com / Google Calendar" },
          { fr: "Fonctions custom (3-5 webhooks Make/n8n)", en: "Custom functions (3-5 Make/n8n webhooks)" },
          { fr: "Push leads dans HubSpot/Notion/Airtable", en: "Lead push to HubSpot/Notion/Airtable" },
          { fr: "Voicemail detection + end call phrases", en: "Voicemail detection + end call phrases" },
          { fr: "Multilingue FR/EN avec switch automatique", en: "Multilingual FR/EN with auto switch" },
          { fr: "Livraison 7-10 jours · Support 30 jours", en: "Delivered in 7-10 days · 30-day support" },
        ] },
      { name: { fr: "Enterprise Vapi", en: "Vapi Enterprise" }, price: "dès 1800 €", priceNote: { fr: "Squad d'agents & volumes élevés", en: "Agent squad & high volumes" },
        features: [
          { fr: "Tout du plan Pro", en: "Everything in Pro" },
          { fr: "Vapi squad (multi-agents spécialisés)", en: "Vapi squad (multi-specialist agents)" },
          { fr: "Outbound automatisé depuis votre CRM", en: "Automated outbound from your CRM" },
          { fr: "Clonage de voix sur mesure ElevenLabs", en: "Custom ElevenLabs voice cloning" },
          { fr: "Dashboard analytics avancé (Notion ou Metabase)", en: "Advanced analytics dashboard (Notion or Metabase)" },
          { fr: "Optimisation coût/minute mensuelle", en: "Monthly cost-per-minute optimization" },
          { fr: "Livraison 14-21 jours · Maintenance incluse 3 mois", en: "Delivered in 14-21 days · 3-month maintenance included" },
        ] },
    ],
  },

  faq: [
    { q: { fr: "La voix Vapi est-elle vraiment indiscernable d'une voix humaine ?", en: "Is the Vapi voice really indistinguishable from a human voice?" },
      a: { fr: "Avec ElevenLabs Turbo v2.5 sur un script bien écrit, 7 personnes sur 10 ne devinent pas qu'il s'agit d'une IA pendant les 30 premières secondes. La voix OpenAI Nova est aussi très convaincante et coûte moins cher. La clé, c'est moins le moteur de synthèse que le system prompt : on intègre des micro-hésitations, des connecteurs naturels (alors, du coup, en fait) et des formules françaises authentiques. Une voix premium avec un mauvais prompt sonne robotique ; une voix moyenne avec un excellent prompt passe inaperçue.", en: "With ElevenLabs Turbo v2.5 on a well-written script, 7 out of 10 people don't realize it's AI in the first 30 seconds. OpenAI Nova is also very convincing and cheaper. The key is less the synthesis engine than the system prompt: we add micro-hesitations, natural connectors (so, well, actually) and authentic French formulations. A premium voice with a bad prompt sounds robotic; an average voice with an excellent prompt goes unnoticed." } },
    { q: { fr: "Combien coûte réellement une minute d'appel Vapi tout compris ?", en: "What does a Vapi minute really cost all-in?" },
      a: { fr: "En configuration standard optimisée, comptez 0,05 à 0,09 € par minute, décomposés ainsi : Vapi (0,05 €/min), Twilio (0,01-0,02 €/min selon le pays), OpenAI GPT-4o-mini (~0,005 €/min), ElevenLabs Turbo (~0,03 €/min) ou OpenAI TTS (~0,008 €/min), Deepgram (~0,005 €/min). En basculant sur GPT-4o long context ou ElevenLabs Multilingual v2, on monte vers 0,15-0,25 €/min. On vous fait toujours une simulation précise sur votre volume cible avant de signer.", en: "In a standard optimized setup, expect €0.05 to €0.09 per minute, broken down as: Vapi (€0.05/min), Twilio (€0.01-0.02/min depending on country), OpenAI GPT-4o-mini (~€0.005/min), ElevenLabs Turbo (~€0.03/min) or OpenAI TTS (~€0.008/min), Deepgram (~€0.005/min). Switching to GPT-4o long context or ElevenLabs Multilingual v2, you climb to €0.15-0.25/min. We always run a precise simulation on your target volume before signing." } },
    { q: { fr: "Comment Vapi gère-t-il les interruptions et les blancs ?", en: "How does Vapi handle interruptions and silences?" },
      a: { fr: "Vapi expose trois leviers clés : l'endpointing (délai après lequel un silence est considéré comme fin de tour de parole, entre 200 et 1500ms), l'interruption sensitivity (à quel point le bot écoute pendant qu'il parle, de 0 à 1), et le backchanneling (envoi de uh-uh, d'accord pendant que l'humain parle). On règle ces trois paramètres à la main pour chaque agent, en fonction de votre verticale. Pour un cabinet médical, on autorise des silences plus longs ; pour un appel commercial, on écourte.", en: "Vapi exposes three key levers: endpointing (delay after which silence is considered end-of-turn, between 200 and 1500ms), interruption sensitivity (how much the bot listens while talking, from 0 to 1), and backchanneling (sending uh-huh, okay while the human talks). We hand-tune these three parameters for each agent, based on your vertical. For a medical practice we allow longer silences; for a sales call we shorten them." } },
    { q: { fr: "Peut-on déclencher des actions concrètes pendant l'appel (fonctions custom) ?", en: "Can the bot trigger real actions during the call (custom functions)?" },
      a: { fr: "Oui, c'est même la force de Vapi. On déclare dans l'agent des function calls JSON-schema qui pointent vers vos webhooks Make, n8n, Zapier ou vers votre API maison. Pendant l'appel, l'agent peut vérifier un stock, créer un RDV Cal.com, envoyer un SMS Twilio, pousser un lead HubSpot, déclencher un Stripe Checkout par SMS. Tout cela se passe en streaming sans bloquer la conversation : pendant que la fonction s'exécute, l'agent annonce vocalement Je vérifie tout de suite pour vous.", en: "Yes, and it's actually Vapi's strength. We declare in the agent JSON-schema function calls that point to your Make, n8n, Zapier webhooks or to your in-house API. During the call the agent can check stock, create a Cal.com booking, send a Twilio SMS, push a HubSpot lead, trigger a Stripe Checkout via SMS. All this happens in streaming without blocking the conversation: while the function runs, the agent verbally says Let me check that for you right now." } },
    { q: { fr: "Comment Vapi se connecte-t-il à mon agenda (Cal.com, Google Calendar, Doctolib) ?", en: "How does Vapi connect to my calendar (Cal.com, Google Calendar, Doctolib)?" },
      a: { fr: "Vapi expose une intégration native Cal.com (la plus rapide à déployer) qui permet à l'agent de lire les créneaux libres et de créer un événement directement. Pour Google Calendar, on passe par un webhook Make/n8n qui interroge l'API Google et écrit le RDV. Pour Doctolib (qui n'a pas d'API publique grand public), on bascule via un middleware ou on synchronise un Cal.com avec votre Doctolib. Dans tous les cas, l'agent confirme oralement l'horaire, envoie un SMS Twilio et un email avec lien d'annulation.", en: "Vapi has a native Cal.com integration (the fastest to deploy) letting the agent read free slots and create an event directly. For Google Calendar we go through a Make/n8n webhook that queries the Google API and writes the booking. For Doctolib (which has no public consumer API), we bridge via middleware or sync a Cal.com with your Doctolib. In all cases, the agent confirms the time verbally, sends a Twilio SMS and an email with a cancellation link." } },
    { q: { fr: "Vapi parle-t-il vraiment plusieurs langues sur un même appel ?", en: "Does Vapi really speak multiple languages within a single call?" },
      a: { fr: "Oui, sous deux conditions. Première : on choisit un transcripteur multilingue (Deepgram Nova-2 multilingual ou Whisper) et une voix multilingue (ElevenLabs Multilingual v2 ou OpenAI TTS). Deuxième : on instruit le system prompt avec des règles claires sur le switch (par exemple si l'appelant prononce 3 mots consécutifs en anglais, bascule entièrement en anglais). On a déployé au Bénin des agents qui jonglent français/anglais sans accroc.", en: "Yes, under two conditions. First: we pick a multilingual transcriber (Deepgram Nova-2 multilingual or Whisper) and a multilingual voice (ElevenLabs Multilingual v2 or OpenAI TTS). Second: we instruct the system prompt with clear switch rules (e.g. if the caller utters 3 consecutive English words, fully switch to English). We've deployed in Benin agents juggling French/English seamlessly." } },
    { q: { fr: "Vapi vs Retell vs Bland — pourquoi vous misez sur Vapi ?", en: "Vapi vs Retell vs Bland — why bet on Vapi?" },
      a: { fr: "Les trois plateformes sont sérieuses. Retell brille sur les workflows ultra-structurés et la qualité de la voix par défaut. Bland est très compétitif sur le prix et l'outbound à gros volume. Vapi gagne sur trois axes qui comptent pour nos clients : flexibilité totale sur le choix des modèles et voix (vous n'êtes pas enfermé dans un écosystème), maturité des fonctions custom et webhooks, et qualité du dashboard et des logs. Pour un cas d'usage outbound mass-call, on peut benchmarker Bland ; pour 90 % des projets sur mesure, Vapi reste le meilleur compromis.", en: "All three platforms are serious. Retell shines on highly structured workflows and default voice quality. Bland is very competitive on price and high-volume outbound. Vapi wins on three axes that matter for our clients: full flexibility on model and voice choice (you're not locked into an ecosystem), maturity of custom functions and webhooks, and quality of dashboard and logs. For mass-call outbound use cases we can benchmark Bland; for 90% of bespoke projects Vapi remains the best tradeoff." } },
    { q: { fr: "Que se passe-t-il si Vapi annonce une panne ou supprime un paramètre ?", en: "What happens if Vapi has an outage or removes a parameter?" },
      a: { fr: "On surveille de près le changelog Vapi (publié chaque semaine) et on garde une couche d'abstraction dans Make/n8n qui peut basculer vers Retell ou un autre orchestrateur en cas de besoin. Vapi a une uptime publique au-dessus de 99,9 % depuis 2024, et leur support réagit en quelques heures. Pour les clients Enterprise, on configure un fallback automatique vers un numéro de mise en attente humain en cas d'incident — vous n'êtes jamais coupé.", en: "We closely monitor the Vapi changelog (published weekly) and keep an abstraction layer in Make/n8n that can switch to Retell or another orchestrator if needed. Vapi has had public uptime above 99.9% since 2024, and their support replies within a few hours. For Enterprise clients, we configure an automatic fallback to a human hold number in case of incident — you're never cut off." } },
  ],

  relatedSlugs: ["callbot-ia-vocal", "agent-vocal-ia-24-7", "automatisation-no-code", "chatbot-whatsapp-business"],

  cta: {
    headline: { fr: "Prêt à entendre votre callbot Vapi parler avec votre voix de marque ?", en: "Ready to hear your Vapi callbot speak in your brand voice?" },
    desc: { fr: "30 minutes pour cadrer le cas d'usage, une démo live sur votre vrai script, et un agent Vapi en production sous 5 jours. Audit gratuit, devis sous 24h, zéro abonnement caché.", en: "30 minutes to scope the use case, a live demo on your real script, and a Vapi agent in production within 5 days. Free audit, quote within 24h, zero hidden subscription." },
    primaryLabel: { fr: "Réserver mon audit Vapi gratuit", en: "Book my free Vapi audit" },
    secondaryLabel: { fr: "Voir le service CallBot IA", en: "See the CallBot AI service" },
  },
};

/* ── Long-tail : Agent Vocal IA 24/7 ── */
const agentVocalIa247: ServicePage = {
  slug: "agent-vocal-ia-24-7",
  type: "long-tail",
  category: "CallBot IA",
  pillarSlug: "callbot-ia-vocal",
  color: "blue",
  icon: Phone,
  heroIllustration: "callbot-phone",

  metaTitle: {
    fr: "Agent Vocal IA 24/7 — Réception Téléphonique Automatisée · 0 Appel Manqué",
    en: "24/7 AI Voice Agent — Automated Phone Reception · Zero Missed Calls",
  },
  metaDescription: {
    fr: "Agent vocal IA disponible 24h/24, 7j/7. Réception téléphonique automatisée, secrétariat virtuel, prise de RDV, qualification d'appels, transfert urgences. 100% des appels décrochés, jour comme nuit. Audit gratuit.",
    en: "AI voice agent available 24/7. Automated phone reception, virtual secretary, appointment booking, call qualification, emergency routing. 100% of calls answered, day and night. Free audit.",
  },
  keywords: [
    "agent vocal 24/7", "réception téléphonique IA", "secrétaire virtuelle IA",
    "réception 24/7", "appels manqués zéro", "callbot week-end", "callbot nuit",
    "réception téléphonique automatisée", "secrétariat médical IA",
    "agent vocal IA Bénin", "permanence téléphonique IA", "standard téléphonique IA",
    "Vapi 24/7", "Retell AI", "callbot multilingue Afrique",
  ],

  hero: {
    badge: { fr: "Agent Vocal IA 24/7", en: "24/7 AI Voice Agent" },
    h1: { fr: "Un agent vocal IA qui décroche chaque appel,", en: "An AI voice agent that picks up every call," },
    h1Highlight: { fr: "jour et nuit, week-end inclus", en: "day and night, weekends included" },
    subtitle: {
      fr: "Plus jamais un seul appel manqué. Notre agent vocal IA, propulsé par Vapi et GPT-4, répond en 1 seconde à chaque appel — 3h du matin, dimanche, jour férié. Il qualifie, prend les RDV sur votre agenda, envoie un SMS de suivi et transfère les urgences vers vous. Le tout pour moins cher qu'un tiers de secrétaire.",
      en: "Never miss another call. Our AI voice agent, powered by Vapi and GPT-4, answers in 1 second to every call — 3 AM, Sunday, public holiday. It qualifies, books appointments on your calendar, sends an SMS follow-up and routes emergencies to you. All for less than a third of a secretary's cost.",
    },
    trustStrip: [
      { value: "24/7", label: { fr: "Disponibilité", en: "Availability" } },
      { value: "0", label: { fr: "Appel manqué", en: "Missed call" } },
      { value: "1 s", label: { fr: "Temps de réponse", en: "Pickup time" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Un appel manqué, c'est rarement juste un appel manqué : c'est un patient qui appelle votre concurrent, un client qui annule sa réservation, un dépannage qui part chez le voisin. Et le pire, c'est que la majorité de ces appels arrivent quand vous, ou votre équipe, ne pouvez plus répondre. Voici les quatre situations qui vous coûtent le plus cher chaque mois.",
      en: "A missed call is rarely just a missed call: it's a patient ringing your competitor, a customer cancelling their booking, a repair job going to the shop next door. The worst part is that most of these calls land precisely when you or your team can no longer answer. Here are the four situations costing you the most every month.",
    },
    items: [
      { icon: Clock, title: { fr: "Les appels de nuit partent directement chez la concurrence", en: "Night calls go straight to your competitors" },
        desc: { fr: "Entre 19h et 8h, votre standard est fermé. Pourtant, c'est exactement quand les urgences arrivent : une fuite, une panne, une douleur, une réservation last-minute. Vos prospects appellent le numéro suivant sur Google et achètent chez celui qui décroche en premier. 100% du chiffre d'affaires nocturne file ailleurs.", en: "Between 7 PM and 8 AM, your switchboard is closed. Yet that's exactly when emergencies hit: a leak, a breakdown, an ache, a last-minute booking. Your prospects call the next number on Google and buy from whoever picks up first. 100% of night revenue goes elsewhere." } },
      { icon: RotateCcw, title: { fr: "Le week-end, tout s'accumule sur votre messagerie", en: "Every weekend, voicemails pile up" },
        desc: { fr: "Samedi et dimanche représentent 28% des appels entrants — et 90% finissent en messagerie ignorée. Le lundi matin, votre équipe rappelle 40 personnes, dont la moitié a déjà trouvé la solution ailleurs. Vous payez deux fois : la perte du client et le temps de rappel inutile.", en: "Saturday and Sunday account for 28% of inbound calls — and 90% end up in an ignored voicemail. Monday morning, your team calls back 40 people, half of whom already solved their problem elsewhere. You pay twice: the lost customer plus the wasted callback time." } },
      { icon: TrendingUp, title: { fr: "Les RDV non pris sont du chiffre d'affaires évaporé", en: "Unbooked appointments are evaporated revenue" },
        desc: { fr: "Un patient qui veut prendre RDV un dimanche soir, un client qui veut réserver une table à 23h, un acheteur qui veut visiter un bien à 6h du matin — sans agent vocal, ils renoncent. Chaque RDV non pris vaut entre 30 et 800 euros selon votre activité. Sur un mois, cela représente facilement plusieurs milliers d'euros perdus.", en: "A patient wanting to book on Sunday evening, a customer wanting to reserve a table at 11 PM, a buyer wanting to visit a property at 6 AM — without a voice agent, they give up. Each unbooked appointment is worth between 30 and 800 euros depending on your business. Across a month, that's easily thousands of euros lost." } },
      { icon: Users, title: { fr: "Une secrétaire humaine coûte cher et n'est jamais là quand il faut", en: "A human secretary is expensive and never around when needed" },
        desc: { fr: "Un mi-temps secrétaire coûte 800 à 1 200 euros par mois, plus charges, congés, arrêts maladie. Et même avec un temps plein, votre standard reste fermé 130h par semaine sur 168. Un centre d'appels externalisé demande 1,50 à 3 euros par appel, qualité inégale, sans connaissance réelle de votre activité. Ni l'un ni l'autre ne résout vraiment le problème.", en: "A part-time secretary costs €800 to €1,200 a month, plus benefits, leave and sick days. Even full-time, your switchboard stays closed 130 hours a week out of 168. An outsourced call centre charges €1.50 to €3 per call, with uneven quality and no real knowledge of your business. Neither truly solves the problem." } },
    ],
  },

  solution: {
    headline: { fr: "Un standard vocal IA qui ne dort jamais, ne tombe pas malade et coûte trois fois moins cher", en: "An AI voice switchboard that never sleeps, never gets sick and costs three times less" },
    intro: {
      fr: "On déploie pour vous un agent vocal IA branché sur votre numéro existant (ou un nouveau numéro dédié). Il décroche en moins d'une seconde, parle avec une voix humaine indistinguable (ElevenLabs), comprend vos clients même en pleine nuit, et exécute des actions concrètes : prise de RDV, envoi de SMS, transfert vers vous en cas d'urgence. Voici les capacités clés qu'on configure selon votre activité.",
      en: "We deploy an AI voice agent connected to your existing number (or a new dedicated line). It picks up in under a second, speaks with a near-indistinguishable human voice (ElevenLabs), understands your customers even in the middle of the night, and executes concrete actions: appointment booking, SMS sending, transfer to you for emergencies. Here are the key capabilities we configure for your business.",
    },
    features: [
      { icon: Clock, title: { fr: "Disponibilité 24/7, 365 jours par an", en: "24/7 availability, 365 days a year" },
        desc: { fr: "L'agent décroche en moins d'une seconde, qu'il soit 3h du matin un mardi ou 22h un 25 décembre. Aucun temps mort, aucun jour férié, aucune pause déjeuner. Capacité illimitée : il peut prendre 50 appels en parallèle sans broncher.", en: "The agent picks up in under a second, whether it's 3 AM on a Tuesday or 10 PM on Christmas Day. No downtime, no holidays, no lunch break. Unlimited capacity: it can handle 50 parallel calls without flinching." } },
      { icon: Globe, title: { fr: "Multilingue : français, anglais et langues africaines", en: "Multilingual: French, English and African languages" },
        desc: { fr: "L'agent détecte la langue de l'appelant et bascule automatiquement entre français, anglais, fon, yoruba, wolof, arabe ou portugais. Indispensable pour les business actifs au Bénin, au Nigeria, en Côte d'Ivoire ou avec une clientèle internationale.", en: "The agent detects the caller's language and switches automatically between French, English, Fon, Yoruba, Wolof, Arabic or Portuguese. Essential for businesses operating in Benin, Nigeria, Ivory Coast or with international clientele." } },
      { icon: Shield, title: { fr: "Transfert intelligent des urgences", en: "Smart emergency routing" },
        desc: { fr: "Quand l'agent détecte une urgence (mot-clé, ton de voix, contexte médical ou panne critique), il transfère immédiatement l'appel vers le numéro de garde — ou vers vous personnellement la nuit. Une astreinte humaine reste possible, mais filtrée par l'IA pour ne plus être réveillé pour rien.", en: "When the agent detects an emergency (keyword, tone of voice, medical context or critical breakdown), it immediately transfers the call to the on-call number — or to you personally at night. Human on-call duty stays possible, but filtered by AI so you're no longer woken up for nothing." } },
      { icon: MessageSquare, title: { fr: "SMS de suivi automatique après chaque appel", en: "Automatic SMS follow-up after every call" },
        desc: { fr: "Après chaque conversation, l'agent envoie un SMS récapitulatif : confirmation de RDV, lien de paiement, fiche produit, devis estimatif. L'appelant garde une trace écrite, vous gagnez en taux de conversion et réduisez les no-show de 40%.", en: "After each conversation, the agent sends a recap SMS: appointment confirmation, payment link, product sheet, quote estimate. The caller keeps a written record, you gain conversion and cut no-shows by 40%." } },
      { icon: Sparkles, title: { fr: "Prise de RDV directe sur votre agenda", en: "Direct appointment booking in your calendar" },
        desc: { fr: "Connecté à Cal.com, Google Calendar ou Calendly, l'agent propose des créneaux libres en temps réel, confirme, et synchronise dans votre agenda. Votre planning se remplit la nuit pendant que vous dormez. Plus besoin de rappeler personne.", en: "Connected to Cal.com, Google Calendar or Calendly, the agent offers free slots in real time, confirms, and syncs into your calendar. Your schedule fills up at night while you sleep. No more callbacks needed." } },
      { icon: FileCheck, title: { fr: "Transcription + callback intelligent", en: "Transcription + smart callback" },
        desc: { fr: "Chaque appel est transcrit, résumé et envoyé dans votre CRM, Notion ou WhatsApp. Si l'agent n'a pas pu finaliser une demande, il programme un rappel humain au bon moment, avec tout le contexte prêt. Aucune information perdue, aucun appel sans suite.", en: "Every call is transcribed, summarised and pushed into your CRM, Notion or WhatsApp. If the agent couldn't close a request, it schedules a human callback at the right time with full context ready. No information lost, no call left hanging." } },
    ],
  },

  howItWorks: {
    headline: { fr: "De votre numéro actuel à un standard 24/7 — en 5 à 7 jours", en: "From your current number to a 24/7 switchboard — in 5 to 7 days" },
    steps: [
      { icon: Search, title: { fr: "Audit de vos appels actuels", en: "Audit of your current calls" }, duration: { fr: "Jour 1", en: "Day 1" },
        desc: { fr: "On analyse vos statistiques d'appels (volume, horaires, taux de décroche, motifs les plus fréquents). On identifie les heures les plus critiques et les types d'appels prioritaires : urgences, RDV, devis, infos. C'est cette photographie qui permet de calibrer précisément l'agent.", en: "We analyse your current call stats (volume, time slots, pickup rate, most frequent reasons). We identify the most critical hours and priority call types: emergencies, bookings, quotes, info. This snapshot lets us calibrate the agent precisely." } },
      { icon: FileCheck, title: { fr: "Script & arbre de décision", en: "Script & decision tree" }, duration: { fr: "Jour 2", en: "Day 2" },
        desc: { fr: "On écrit ensemble le script de l'agent : message d'accueil, questions de qualification, règles de transfert d'urgence, gestion des cas particuliers. On choisit la voix (homme/femme, accent, ton) sur ElevenLabs. Vous validez tout avant production.", en: "We co-write the agent script: greeting, qualification questions, emergency transfer rules, edge cases. We pick the voice (male/female, accent, tone) on ElevenLabs. You sign off everything before production." } },
      { icon: Settings, title: { fr: "Construction sur Vapi + intégrations", en: "Build on Vapi + integrations" }, duration: { fr: "Jours 3-4", en: "Days 3-4" },
        desc: { fr: "On configure l'agent sur Vapi (ou Retell selon votre cas), on branche Twilio pour la téléphonie, ElevenLabs pour la voix, GPT-4 pour la compréhension, Cal.com pour les RDV et Make pour le CRM. Tout est connecté proprement, testé pas à pas.", en: "We configure the agent on Vapi (or Retell depending on your case), plug in Twilio for telephony, ElevenLabs for voice, GPT-4 for understanding, Cal.com for bookings and Make for CRM. Everything connected cleanly, tested step by step." } },
      { icon: Rocket, title: { fr: "Tests réels + bascule du numéro", en: "Real tests + number switchover" }, duration: { fr: "Jour 5", en: "Day 5" },
        desc: { fr: "On stress-teste avec 30 à 50 scénarios réels (urgences, langues, demandes complexes). On ajuste la voix et les réponses, puis on bascule votre numéro existant ou on active un nouveau numéro dédié. L'agent prend ses premiers vrais appels dans la journée.", en: "We stress-test with 30 to 50 real scenarios (emergencies, languages, complex requests). We tune the voice and replies, then switch over your existing number or activate a new dedicated one. The agent takes its first real calls the same day." } },
      { icon: Handshake, title: { fr: "Suivi 30 jours + optimisation continue", en: "30-day follow-up + ongoing optimisation" }, duration: { fr: "Semaines 1-4", en: "Weeks 1-4" },
        desc: { fr: "Pendant un mois, on écoute les transcripts ensemble chaque semaine, on ajuste les réponses qui posent problème, on affine les règles de transfert. On vous forme aussi à gérer le dashboard pour piloter l'agent dans la durée.", en: "For a month, we review transcripts together each week, adjust problematic replies, fine-tune transfer rules. We also train you on the dashboard so you can steer the agent long-term." } },
    ],
  },

  stats: [
    { value: "24/7", label: { fr: "Disponibilité totale", en: "Total availability" } },
    { value: "-100", suffix: "%", label: { fr: "Appels manqués", en: "Missed calls" } },
    { value: "x3", label: { fr: "Volume de RDV pris", en: "Bookings captured" } },
    { value: "/3", label: { fr: "Coût vs secrétaire humaine", en: "Cost vs human secretary" } },
  ],

  useCases: {
    headline: { fr: "Pour qui un agent vocal IA 24/7 change vraiment la donne", en: "Who really benefits from a 24/7 AI voice agent" },
    intro: {
      fr: "Tous les business avec du flux d'appels y gagnent, mais quatre secteurs en particulier voient leur ROI exploser dans les premières semaines. Voici les configurations qu'on déploie le plus souvent et les résultats moyens observés.",
      en: "Every business with inbound call flow benefits, but four sectors see ROI explode in the first weeks. Here are the configurations we deploy most often and the average results observed.",
    },
    cases: [
      { icon: Stethoscope, sector: { fr: "Cliniques & cabinets de garde", en: "Clinics & on-call practices" },
        problem: { fr: "Vos patients appellent la nuit ou le week-end pour une douleur, une question post-opératoire ou un RDV urgent. Sans permanence, ils vont aux urgences ou changent de praticien.", en: "Your patients call at night or weekends for pain, post-op questions or urgent appointments. Without on-call cover, they head to the ER or switch practitioners." },
        solution: { fr: "L'agent prend l'appel, qualifie la nature du besoin, prend les RDV non urgents sur Doctolib ou Cal.com, et transfère uniquement les vraies urgences vers le médecin de garde.", en: "The agent answers, qualifies the need, books non-urgent appointments on Doctolib or Cal.com, and only transfers true emergencies to the on-call doctor." },
        result: { fr: "100% des appels décrochés, +60% de RDV pris hors horaires, médecin de garde réveillé 3x moins souvent.", en: "100% of calls answered, +60% bookings outside hours, on-call doctor woken 3x less often." } },
      { icon: Building2, sector: { fr: "Hôtellerie & restauration", en: "Hospitality & restaurants" },
        problem: { fr: "Réservations tardives, demandes d'info, modifications de dernière minute — votre réception ne peut pas être joignable 24h/24, surtout en basse saison ou pendant le service.", en: "Late bookings, info requests, last-minute changes — your reception can't be reachable 24/7, especially low season or during service." },
        solution: { fr: "L'agent prend les réservations sur votre PMS ou OpenTable, répond aux questions standards (horaires, parking, animaux, allergies), envoie la confirmation par SMS et un email avec le plan d'accès.", en: "The agent takes bookings into your PMS or OpenTable, answers standard questions (hours, parking, pets, allergies), sends SMS confirmation and an email with directions." },
        result: { fr: "Taux de remplissage +18%, équipe de réception focus sur l'expérience client en direct.", en: "Occupancy +18%, reception team focused on live customer experience." } },
      { icon: Zap, sector: { fr: "Services de dépannage & urgence", en: "Emergency & repair services" },
        problem: { fr: "Plomberie, serrurerie, dépannage auto, électricité — vos clients appellent souvent en panique, parfois la nuit. Manquer un appel signifie perdre une intervention urgente facturée 200 à 800 euros.", en: "Plumbing, locksmiths, roadside, electrical — your clients often call in panic, sometimes at night. Missing a call means losing an urgent job billed €200 to €800." },
        solution: { fr: "L'agent qualifie la nature de l'urgence, la localisation, le niveau de criticité, envoie un SMS de prise en charge et appelle le technicien disponible le plus proche selon vos règles d'astreinte.", en: "The agent qualifies the emergency type, location, severity, sends a handover SMS and calls the closest available technician based on your on-call rules." },
        result: { fr: "+40% d'interventions captées la nuit et le week-end, ROI sur un seul mois.", en: "+40% night and weekend jobs captured, ROI within a single month." } },
      { icon: Briefcase, sector: { fr: "Cabinets multi-praticiens", en: "Multi-practitioner firms" },
        problem: { fr: "Cabinets d'avocats, comptables, notaires, kinés avec 3 à 15 praticiens : la secrétaire est débordée, oriente mal les appels, et les RDV se mettent sur le mauvais agenda. Les patients abandonnent.", en: "Law firms, accountants, notaries, physios with 3 to 15 practitioners: the secretary is overwhelmed, mis-routes calls, bookings land on the wrong calendar. Patients give up." },
        solution: { fr: "L'agent identifie le praticien demandé (par nom, spécialité ou disponibilité), accède à chaque agenda individuel, propose les bons créneaux et envoie la confirmation au patient et au praticien concerné.", en: "The agent identifies the requested practitioner (by name, specialty or availability), accesses each individual calendar, offers correct slots and sends confirmation to both the patient and the practitioner." },
        result: { fr: "Erreurs de planning éliminées, secrétaire libérée de 70% des appels entrants, satisfaction patients +25%.", en: "Scheduling errors eliminated, secretary freed from 70% of inbound calls, patient satisfaction +25%." } },
    ],
  },

  stack: {
    headline: { fr: "La stack technique qu'on déploie", en: "The tech stack we deploy" },
    intro: {
      fr: "On combine les briques les plus solides du marché pour livrer un agent vocal fiable, naturel et intégré proprement à votre écosystème. Vous restez propriétaire du compte et des données, on configure tout pour vous.",
      en: "We combine the strongest market building blocks to deliver a voice agent that's reliable, natural and cleanly integrated with your ecosystem. You own the accounts and data, we configure everything for you.",
    },
    tools: [
      { name: "Vapi", role: { fr: "Plateforme principale d'orchestration voix temps réel", en: "Main real-time voice orchestration platform" } },
      { name: "Retell AI", role: { fr: "Alternative voix ultra-naturelle pour cas premium", en: "Ultra-natural voice alternative for premium cases" } },
      { name: "Twilio", role: { fr: "Téléphonie cloud, numéros internationaux, SMS", en: "Cloud telephony, international numbers, SMS" } },
      { name: "ElevenLabs", role: { fr: "Voix de synthèse indistinguable d'un humain", en: "Synthesis voice indistinguishable from a human" } },
      { name: "GPT-4 / GPT-4o", role: { fr: "Compréhension du langage et prise de décision", en: "Language understanding and decision-making" } },
      { name: "Cal.com / Google Calendar", role: { fr: "Prise de RDV automatique en temps réel", en: "Real-time automatic appointment booking" } },
      { name: "WhatsApp Business API", role: { fr: "Suivi par message après l'appel", en: "Message follow-up after the call" } },
      { name: "Make / n8n", role: { fr: "Connexions CRM, agenda, notifications, ERP", en: "CRM, calendar, notifications, ERP connections" } },
      { name: "Notion / HubSpot / Airtable", role: { fr: "Stockage des transcripts et leads qualifiés", en: "Storage for transcripts and qualified leads" } },
      { name: "Deepgram / Whisper", role: { fr: "Reconnaissance vocale multilingue haute précision", en: "High-accuracy multilingual speech recognition" } },
    ],
  },

  pricing: {
    headline: { fr: "Combien coûte votre agent vocal 24/7 ?", en: "How much does your 24/7 voice agent cost?" },
    intro: {
      fr: "Trois formules selon votre volume d'appels et la complexité des intégrations. Sans abonnement obligatoire : vous payez la création une fois, puis seulement la consommation réelle (Twilio + Vapi + voix). Beaucoup moins cher qu'une secrétaire, infiniment plus disponible.",
      en: "Three tiers based on your call volume and integration complexity. No mandatory subscription: you pay creation once, then only real usage (Twilio + Vapi + voice). Far cheaper than a secretary, infinitely more available.",
    },
    tiers: [
      { name: { fr: "Starter", en: "Starter" }, price: "250 €", priceNote: { fr: "Agent vocal de base 24/7", en: "Basic 24/7 voice agent" },
        features: [
          { fr: "Accueil 24/7 sur votre numéro existant", en: "24/7 reception on your existing number" },
          { fr: "Script FAQ (15-25 questions)", en: "FAQ script (15-25 questions)" },
          { fr: "Transfert simple vers un numéro d'astreinte", en: "Simple transfer to an on-call number" },
          { fr: "SMS de suivi automatique après appel", en: "Automatic SMS follow-up after call" },
          { fr: "Livraison en 5 jours · Support 30 jours", en: "Delivered in 5 days · 30-day support" },
        ] },
      { name: { fr: "Pro (recommandé)", en: "Pro (recommended)" }, price: "550 €", priceNote: { fr: "Standard vocal complet avec RDV & CRM", en: "Full voice switchboard with bookings & CRM" }, highlight: true,
        features: [
          { fr: "Tout du plan Starter", en: "Everything in Starter" },
          { fr: "Prise de RDV sur Cal.com ou Google Calendar", en: "Booking on Cal.com or Google Calendar" },
          { fr: "Qualification d'appel + transfert urgences intelligent", en: "Call qualification + smart emergency transfer" },
          { fr: "Multilingue (FR, EN, +1 langue africaine)", en: "Multilingual (FR, EN, +1 African language)" },
          { fr: "Transcription + envoi CRM (HubSpot, Notion, Airtable)", en: "Transcription + CRM push (HubSpot, Notion, Airtable)" },
          { fr: "Dashboard analytics personnalisé", en: "Custom analytics dashboard" },
          { fr: "Livraison en 7 jours · Support 30 jours", en: "Delivered in 7 days · 30-day support" },
        ] },
      { name: { fr: "Enterprise", en: "Enterprise" }, price: "dès 1 400 €", priceNote: { fr: "Multi-praticiens, multi-langues, intégrations sur mesure", en: "Multi-practitioner, multi-language, custom integrations" },
        features: [
          { fr: "Tout du plan Pro", en: "Everything in Pro" },
          { fr: "Gestion multi-agendas (jusqu'à 15 praticiens)", en: "Multi-calendar management (up to 15 practitioners)" },
          { fr: "Intégration ERP / PMS / Doctolib / OpenTable", en: "ERP / PMS / Doctolib / OpenTable integration" },
          { fr: "Multilingue avancé (4+ langues, incluant fon, yoruba, wolof)", en: "Advanced multilingual (4+ languages including Fon, Yoruba, Wolof)" },
          { fr: "Voix premium ElevenLabs clonée sur mesure", en: "Premium ElevenLabs voice custom-cloned" },
          { fr: "Astreinte technique 7j/7 incluse 3 mois", en: "7-day technical on-call included 3 months" },
          { fr: "Livraison en 10-14 jours · Maintenance incluse", en: "Delivered in 10-14 days · Maintenance included" },
        ] },
    ],
  },

  faq: [
    { q: { fr: "Combien je vais réellement économiser par rapport à une secrétaire humaine ?", en: "How much will I actually save versus a human secretary?" },
      a: { fr: "Une secrétaire à mi-temps coûte en moyenne 900 à 1 200 euros par mois charges comprises, pour 80 à 100 heures de présence. L'agent vocal IA, lui, est disponible 730 heures par mois (24/7) pour un coût total moyen de 200 à 400 euros par mois (Vapi + Twilio + ElevenLabs + GPT-4 selon le volume). Donc trois fois moins cher pour sept fois plus d'amplitude horaire. Le ROI est généralement atteint dès le 2e mois, parfois dès la première semaine pour les activités avec un volume nocturne fort (dépannage, santé, hôtellerie).", en: "A part-time secretary costs an average €900 to €1,200 a month including charges, for 80 to 100 hours of presence. The AI voice agent is available 730 hours a month (24/7) for an average total cost of €200 to €400 a month (Vapi + Twilio + ElevenLabs + GPT-4 depending on volume). So three times cheaper for seven times more coverage. ROI typically lands by month 2, sometimes within the first week for businesses with strong night volume (repair, health, hospitality)." } },
    { q: { fr: "Comment l'agent gère-t-il les vraies urgences médicales ou techniques ?", en: "How does the agent handle real medical or technical emergencies?" },
      a: { fr: "On configure une liste précise de mots-clés et de signaux contextuels (douleur intense, fuite massive, panne électrique, sang, accident). Quand l'un d'eux est détecté, l'agent interrompt poliment le script et transfère immédiatement l'appel vers le numéro de garde défini, en lui transmettant un résumé vocal de la situation. Vous gardez donc le contrôle humain sur les vraies urgences, sans être dérangé par les questions de routine. C'est exactement ce filtre qui fait la valeur du système.", en: "We configure a precise list of keywords and contextual signals (severe pain, major leak, power failure, blood, accident). When one is detected, the agent politely interrupts the script and immediately transfers the call to the defined on-call number, passing a voice summary of the situation. So you keep human control over real emergencies without being disturbed by routine questions. That filter is exactly where the value lies." } },
    { q: { fr: "Est-ce que l'agent peut transférer un appel vers un humain à tout moment ?", en: "Can the agent transfer a call to a human at any time?" },
      a: { fr: "Oui, et de plusieurs manières. L'appelant peut le demander explicitement (\"je voudrais parler à quelqu'un\"), l'agent peut le décider lui-même s'il détecte une situation complexe ou un client mécontent, ou bien la règle peut être conditionnelle (heures ouvrées uniquement, certains types de demande). Le transfert se fait via Twilio en moins d'une seconde, avec un message d'introduction qui résume la conversation à votre équipe. Aucune coupure, aucune perte de contexte.", en: "Yes, in multiple ways. The caller can request it explicitly (\"I'd like to speak to someone\"), the agent can decide on its own if it detects a complex situation or unhappy customer, or the rule can be conditional (business hours only, certain request types). Transfer happens via Twilio in under a second, with an intro message summarising the conversation for your team. No drop, no context loss." } },
    { q: { fr: "L'agent parle-t-il bien les langues africaines la nuit aussi ?", en: "Does the agent also speak African languages well at night?" },
      a: { fr: "Oui, la performance est indépendante de l'heure : ce n'est pas un humain qui se fatigue. Pour le français et l'anglais, la qualité est indistinguable d'un natif. Pour le fon, le yoruba, le wolof ou l'arabe, on utilise des modèles spécialisés (Whisper multilingue + voix ElevenLabs entraîné) qui atteignent un excellent niveau, même s'il peut subsister un léger accent. On teste systématiquement avec des locuteurs natifs avant la mise en ligne pour valider que la compréhension est totale.", en: "Yes, performance is independent of the time of day: it's not a human getting tired. For French and English, quality is indistinguishable from a native speaker. For Fon, Yoruba, Wolof or Arabic, we use specialised models (multilingual Whisper + trained ElevenLabs voice) reaching an excellent level, though a slight accent may remain. We systematically test with native speakers before go-live to confirm full comprehension." } },
    { q: { fr: "Que se passe-t-il si l'agent plante en pleine nuit ?", en: "What happens if the agent crashes in the middle of the night?" },
      a: { fr: "On configure un système de failover en deux niveaux : si Vapi ou GPT-4 rencontrent une panne (rare, mais possible), Twilio bascule automatiquement vers une messagerie vocale intelligente qui transcrit le message et vous l'envoie par SMS en temps réel. Vous êtes donc prévenu instantanément et pouvez rappeler. En 18 mois d'exploitation chez nos clients, on a comptabilisé moins de 30 minutes de downtime cumulées — c'est mieux que la disponibilité d'une secrétaire humaine sur un trimestre.", en: "We configure a two-tier failover: if Vapi or GPT-4 suffer an outage (rare but possible), Twilio automatically falls back to a smart voicemail that transcribes the message and sends it to you by SMS in real time. So you're alerted instantly and can call back. Across 18 months of client operation, we've logged under 30 minutes of cumulative downtime — better than a human secretary's availability over a quarter." } },
    { q: { fr: "L'agent vocal est-il conforme au RGPD et aux régulations locales ?", en: "Is the voice agent GDPR and local-regulation compliant?" },
      a: { fr: "Oui. Les conversations sont enregistrées uniquement si vous le décidez, hébergées en Europe (Twilio EU, OpenAI EU si nécessaire), et automatiquement supprimées après une durée configurable. On vous fournit un script d'information légale à inclure dans le message d'accueil (\"votre appel peut être enregistré…\"). Pour le secteur médical au Bénin ou en France, on respecte aussi les exigences spécifiques de confidentialité patient. Tout est documenté dans le contrat.", en: "Yes. Conversations are recorded only if you decide so, hosted in Europe (Twilio EU, OpenAI EU if needed), and automatically deleted after a configurable retention. We provide a legal-disclosure script to include in the greeting (\"your call may be recorded…\"). For the medical sector in Benin or France, we also respect specific patient confidentiality requirements. Everything is documented in the contract." } },
    { q: { fr: "Combien d'appels en parallèle l'agent peut-il prendre ?", en: "How many parallel calls can the agent handle?" },
      a: { fr: "Par défaut, on dimensionne pour 10 appels simultanés, ce qui couvre 99% des cas PME. L'architecture Vapi + Twilio permet de monter à 50, 100 ou 500 appels en parallèle sans perte de qualité, simplement en ajustant la capacité (le coût reste proportionnel au volume). Pour les pics saisonniers (Black Friday, périodes d'inscriptions, urgences climatiques), on peut activer un scaling automatique. Aucune file d'attente, aucun appel perdu même en cas de pic.", en: "By default we size for 10 simultaneous calls, covering 99% of SME cases. The Vapi + Twilio architecture can scale to 50, 100 or 500 parallel calls without quality loss, simply by adjusting capacity (cost stays proportional to volume). For seasonal peaks (Black Friday, enrolment periods, weather emergencies), we can enable auto-scaling. No queue, no lost call even during peaks." } },
    { q: { fr: "Peut-on écouter une démo avant de signer ?", en: "Can we hear a demo before signing?" },
      a: { fr: "Oui, et c'est même la première chose qu'on fait. Pendant l'appel découverte gratuit, on construit en live un mini-agent vocal à partir d'une de vos questions clients réelles, et on vous appelle sur votre portable pour que vous testiez la conversation vous-même. Vous entendez la voix, vous testez les limites, vous décidez ensuite. Si vous lancez le projet, ce prototype devient la base de l'agent final.", en: "Yes, and it's literally the first thing we do. During the free discovery call, we build a live mini voice agent from one of your real customer questions, and we ring your mobile so you can test the conversation yourself. You hear the voice, you test the limits, then you decide. If you launch the project, this prototype becomes the foundation of the final agent." } },
  ],

  relatedSlugs: ["callbot-ia-vocal", "callbot-vapi", "chatbot-whatsapp-business", "chatbot-ia", "automatisation-no-code"],

  cta: {
    headline: { fr: "Et si plus aucun appel ne tombait dans le vide, dès cette semaine ?", en: "What if not a single call slipped through the cracks, starting this week?" },
    desc: { fr: "30 minutes pour comprendre vos besoins, 5 à 7 jours pour déployer un agent vocal IA branché sur votre numéro, disponible jour, nuit et week-end. Audit gratuit et démo vocale live pendant l'appel.", en: "30 minutes to understand your needs, 5 to 7 days to deploy an AI voice agent connected to your number, available day, night and weekend. Free audit and live voice demo during the call." },
    primaryLabel: { fr: "Réserver mon audit gratuit", en: "Book my free audit" },
    secondaryLabel: { fr: "Voir tous nos services", en: "See all our services" },
  },
};

/* ── Long-tail : SEO Google Page 1 ── */
const seoGooglePage1: ServicePage = {
  slug: "seo-google-page-1",
  type: "long-tail",
  category: "WordPress + SEO",
  pillarSlug: "site-wordpress-seo",
  color: "purple",
  icon: Globe,
  heroIllustration: "wordpress-seo",

  metaTitle: {
    fr: "Atteindre la Page 1 de Google — Stratégie SEO Complète · Résultats en 3-6 mois",
    en: "Reach Google Page 1 — Full SEO Strategy · Results in 3-6 months",
  },
  metaDescription: {
    fr: "Stratégie SEO complète pour propulser votre site sur la page 1 de Google. Audit technique, recherche mots-clés, contenu, netlinking, SEO local Bénin. Reporting mensuel transparent. Audit gratuit.",
    en: "Full SEO strategy to push your site to Google page 1. Technical audit, keyword research, content, backlinks, local SEO in Benin. Transparent monthly reporting. Free audit.",
  },
  keywords: [
    "atteindre page 1 Google", "SEO Google", "référencement naturel Google",
    "stratégie SEO", "audit SEO", "consultant SEO", "expert SEO",
    "SEO local Bénin", "SEO Cotonou", "netlinking", "backlinks qualité",
    "audit technique SEO", "SEO mots-clés", "recherche mots-clés SEO",
    "agence SEO Bénin", "agence SEO Afrique", "première page Google",
    "Google Search Console", "Core Web Vitals SEO",
  ],

  hero: {
    badge: { fr: "Stratégie SEO Page 1 Google", en: "Google Page 1 SEO Strategy" },
    h1: { fr: "Une stratégie SEO complète pour atteindre la", en: "A full SEO strategy to reach" },
    h1Highlight: { fr: "page 1 de Google", en: "Google page 1" },
    subtitle: {
      fr: "Audit technique, recherche de mots-clés à fort potentiel, contenu optimisé, netlinking de qualité, SEO local pour Cotonou et l'Afrique de l'Ouest. On vous emmène en page 1 sur vos requêtes stratégiques en 3 à 6 mois — avec un reporting mensuel transparent que vous comprenez vraiment.",
      en: "Technical audit, high-potential keyword research, optimized content, quality backlinks, local SEO for Cotonou and West Africa. We get you to page 1 on your strategic queries in 3 to 6 months — with transparent monthly reporting you actually understand.",
    },
    trustStrip: [
      { value: "3-6", label: { fr: "Mois pour la page 1", en: "Months to page 1" } },
      { value: "×5", label: { fr: "Trafic organique moyen", en: "Avg organic traffic" } },
      { value: "100 %", label: { fr: "Reporting transparent", en: "Transparent reporting" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Vous avez un site qui devrait vous rapporter du trafic, mais sur Google c'est le silence radio. Vos concurrents — souvent moins bons que vous — trustent les premières positions, vos clients potentiels ne vous trouvent pas, et vous finissez par cracher des budgets Google Ads chaque mois pour exister. La vérité, c'est que 75 % des clics se font sur la première page de Google, et 0,8 % seulement sur la deuxième. Tant que vous n'y êtes pas, vous n'existez tout simplement pas pour vos prospects. Voici les 4 raisons qu'on retrouve quasi systématiquement quand on audite un site bloqué hors de la page 1.",
      en: "You have a site that should bring you traffic, but on Google it's radio silence. Your competitors — often weaker than you — occupy the top spots, your prospects don't find you, and you end up burning Google Ads budget every month just to exist. The truth: 75% of clicks happen on Google page 1, and only 0.8% on page 2. Until you're there, you simply don't exist for your prospects. Here are the 4 reasons we systematically find when auditing a site stuck off page 1.",
    },
    items: [
      { icon: Eye, title: { fr: "Vous êtes coincé en page 5+ et personne ne vous voit", en: "You're stuck on page 5+ and nobody sees you" },
        desc: { fr: "Sans stratégie SEO sérieuse, votre site se classe loin derrière sur vos mots-clés métier. Or 95 % des utilisateurs ne dépassent jamais la page 1. Votre site existe sur Google, mais pour vos clients potentiels c'est comme s'il n'existait pas — chaque jour de retard est un mois de chiffre d'affaires perdu pour la concurrence.", en: "Without a serious SEO strategy, your site ranks far behind on your business keywords. Yet 95% of users never go past page 1. Your site exists on Google, but for your prospects it might as well not — every day of delay is a month of revenue handed to competitors." } },
      { icon: TrendingUp, title: { fr: "Vos concurrents — moins bons — sont devant vous", en: "Your competitors — weaker than you — sit above you" },
        desc: { fr: "Vous le savez : votre service est meilleur, votre offre est plus complète, vos avis sont excellents. Et pourtant, c'est un concurrent moyen qui rafle les premières positions Google. La raison est simple : il a investi en SEO et vous non. Le résultat est cruel — Google ne récompense pas le meilleur produit, il récompense le meilleur référencement.", en: "You know it: your service is better, your offer is more complete, your reviews are excellent. Yet a mediocre competitor grabs the top Google spots. The reason is simple: they invested in SEO and you didn't. The result is brutal — Google doesn't reward the best product, it rewards the best SEO." } },
      { icon: BarChart3, title: { fr: "Google Ads vous coûte une fortune chaque mois", en: "Google Ads costs you a fortune every month" },
        desc: { fr: "Faute de SEO, vous compensez à coups de Google Ads. 800 €, 1 500 €, 3 000 € par mois qui partent en clics payants. Le jour où vous coupez le budget, le trafic s'arrête net. Le SEO, lui, capitalise : un article bien positionné continue de générer du trafic gratuit pendant 2, 3, 5 ans sans rien dépenser de plus.", en: "Without SEO, you compensate with Google Ads. €800, €1,500, €3,000 a month burned on paid clicks. The day you cut the budget, traffic dies. SEO compounds: a well-ranked article keeps generating free traffic for 2, 3, 5 years with nothing more to spend." } },
      { icon: Clock, title: { fr: "Votre trafic organique est plat depuis 12 mois", en: "Your organic traffic has been flat for 12 months" },
        desc: { fr: "Vous publiez (parfois), vous avez fait quelques optimisations (ou pas), mais la courbe de trafic ne décolle pas. Pourquoi ? Parce qu'une stratégie SEO ne se résume pas à un plugin et 3 articles. C'est un système : technique + contenu + autorité + local. Tant qu'un seul pilier manque, Google vous laisse en bas du classement.", en: "You publish (sometimes), you've done a few optimizations (or not), but the traffic curve doesn't take off. Why? Because an SEO strategy isn't a plugin and 3 articles. It's a system: technical + content + authority + local. As long as one pillar is missing, Google keeps you at the bottom." } },
    ],
  },

  solution: {
    headline: { fr: "Une approche SEO full-stack pour gagner durablement la page 1", en: "A full-stack SEO approach to durably win page 1" },
    intro: {
      fr: "Chez GoScaleStudio, on ne joue pas au SEO à moitié. On audite, on planifie, on exécute et on mesure — sur les 4 piliers qui font vraiment bouger les classements Google en 2026 : la santé technique du site, la pertinence du contenu, l'autorité par les backlinks, et la visibilité locale. Voici ce qu'on déploie concrètement pour vous emmener en page 1 sur vos mots-clés stratégiques.",
      en: "At GoScaleStudio, we don't half-play SEO. We audit, plan, execute and measure — across the 4 pillars that actually move Google rankings in 2026: technical site health, content relevance, backlink authority, and local visibility. Here's what we concretely deploy to get you to page 1 on your strategic keywords.",
    },
    features: [
      { icon: FileCheck, title: { fr: "Audit technique SEO complet", en: "Full technical SEO audit" },
        desc: { fr: "On passe votre site au crible avec Screaming Frog, PageSpeed et Search Console : Core Web Vitals, balisage Hn, structure d'URL, sitemap, robots.txt, données structurées, indexation, contenu dupliqué, redirections. On vous livre un rapport priorisé avec ce qui plombe vos positions et ce qu'on corrige en priorité.", en: "We run your site through Screaming Frog, PageSpeed and Search Console: Core Web Vitals, heading structure, URL architecture, sitemap, robots.txt, schema markup, indexation, duplicate content, redirects. We deliver a prioritized report with what's killing your rankings and what we fix first." } },
      { icon: Search, title: { fr: "Recherche de mots-clés à fort potentiel", en: "High-potential keyword research" },
        desc: { fr: "Avec SEMrush, Ahrefs et AlsoAsked, on identifie 80 à 150 mots-clés stratégiques pour votre business : volume de recherche, difficulté, intention (info, navigation, transaction), longue traîne. On construit votre cartographie sémantique pour cibler les requêtes qui rapportent vraiment, pas celles qui flattent l'ego.", en: "With SEMrush, Ahrefs and AlsoAsked, we identify 80-150 strategic keywords for your business: search volume, difficulty, intent (info, navigation, transaction), long tail. We build your semantic map to target queries that actually pay back, not ego-keywords." } },
      { icon: Lightbulb, title: { fr: "Contenu SEO optimisé qui se positionne", en: "Optimized SEO content that ranks" },
        desc: { fr: "On rédige (ou on optimise) vos pages et articles avec Surfer SEO et RankMath : longueur idéale, champ sémantique, balises, maillage interne, FAQ schema. Chaque contenu est calibré pour battre les 10 premiers résultats Google sur le mot-clé visé. Pas du blabla SEO — du contenu utile, lu par des humains, validé par Google.", en: "We write (or optimize) your pages and articles with Surfer SEO and RankMath: ideal length, semantic field, tags, internal linking, FAQ schema. Each piece is calibrated to beat the top 10 Google results on the target keyword. Not SEO fluff — useful content, read by humans, validated by Google." } },
      { icon: Handshake, title: { fr: "Netlinking & backlinks de qualité", en: "Quality netlinking & backlinks" },
        desc: { fr: "On construit votre autorité avec des backlinks ciblés : guest posts sur des sites thématiques DA 40+, citations locales (annuaires Bénin/Afrique de l'Ouest), partenariats éditoriaux, échanges d'articles. Méthodologie 100 % white-hat — chaque lien est traçable, justifiable, et survit aux updates Google.", en: "We build your authority with targeted backlinks: guest posts on thematic DA 40+ sites, local citations (Benin/West Africa directories), editorial partnerships, article swaps. 100% white-hat methodology — every link is traceable, defensible, and survives Google updates." } },
      { icon: Target, title: { fr: "SEO local pour Cotonou & l'Afrique de l'Ouest", en: "Local SEO for Cotonou & West Africa" },
        desc: { fr: "Pour les business locaux, on optimise votre fiche Google Business Profile, on génère des avis clients, on cible les requêtes géolocalisées (\"avocat Cotonou\", \"dentiste Akpakpa\"), on construit des pages ville/quartier. Résultat : vous apparaissez dans le Pack Local Google — les 3 fiches qui captent 70 % des clics locaux.", en: "For local businesses, we optimize your Google Business Profile, generate customer reviews, target geo queries (\"lawyer Cotonou\", \"dentist Akpakpa\"), build city/district pages. Result: you appear in the Google Local Pack — the 3 listings that grab 70% of local clicks." } },
      { icon: BarChart3, title: { fr: "Suivi de positions & reporting mensuel", en: "Rank tracking & monthly reporting" },
        desc: { fr: "Chaque mois, vous recevez un dashboard Looker Studio limpide : positions Google par mot-clé, évolution du trafic organique, conversions générées, backlinks acquis, prochaines actions. Pas de jargon, pas de chiffres maquillés — vous voyez exactement ce qui progresse et ce qu'on fait pour ça.", en: "Every month, you receive a clean Looker Studio dashboard: Google rankings per keyword, organic traffic evolution, generated conversions, acquired backlinks, next actions. No jargon, no cooked numbers — you see exactly what's progressing and what we're doing about it." } },
    ],
  },

  howItWorks: {
    headline: { fr: "De l'audit à la page 1 — un plan structuré sur 6 mois", en: "From audit to page 1 — a structured 6-month plan" },
    steps: [
      { icon: Search, title: { fr: "Audit SEO complet & analyse concurrentielle", en: "Full SEO audit & competitor analysis" }, duration: { fr: "Mois 1 — Semaines 1-2", en: "Month 1 — Weeks 1-2" },
        desc: { fr: "On audite tout : santé technique (Core Web Vitals, indexation, crawl), contenu existant, profil de backlinks, présence locale, comparaison avec vos 5 concurrents directs. On livre un rapport priorisé de 30 à 50 pages avec les blocages, les opportunités, et le plan d'action chiffré.", en: "We audit everything: technical health (Core Web Vitals, indexation, crawl), existing content, backlink profile, local presence, comparison with your 5 direct competitors. We deliver a 30-50 page prioritized report with blockers, opportunities, and a costed action plan." } },
      { icon: Target, title: { fr: "Plan SEO 6 mois & cartographie sémantique", en: "6-month SEO plan & semantic map" }, duration: { fr: "Mois 1 — Semaines 3-4", en: "Month 1 — Weeks 3-4" },
        desc: { fr: "On co-construit votre stratégie : 80-150 mots-clés priorisés, planning éditorial trimestriel, objectifs chiffrés mois par mois (positions, trafic, conversions), répartition technique / contenu / netlinking. Vous validez le plan avant qu'on déclenche la moindre action.", en: "We co-build your strategy: 80-150 prioritized keywords, quarterly editorial calendar, month-by-month numeric goals (rankings, traffic, conversions), technical / content / netlinking split. You validate the plan before we launch a single action." } },
      { icon: Settings, title: { fr: "Corrections techniques & optimisations on-page", en: "Technical fixes & on-page optimization" }, duration: { fr: "Mois 2", en: "Month 2" },
        desc: { fr: "On corrige tous les blocages SEO techniques : performance (PageSpeed > 90), balisage Hn, données structurées Schema.org, redirections 301, sitemap, robots.txt, indexation. On optimise les pages existantes (title, meta, contenu, maillage) pour ramasser les quick-wins en 30-60 jours.", en: "We fix every technical SEO blocker: performance (PageSpeed > 90), heading structure, Schema.org markup, 301 redirects, sitemap, robots.txt, indexation. We optimize existing pages (title, meta, content, internal links) to grab quick wins in 30-60 days." } },
      { icon: Lightbulb, title: { fr: "Production de contenu SEO ciblé", en: "Targeted SEO content production" }, duration: { fr: "Mois 2-6 — En continu", en: "Months 2-6 — Ongoing" },
        desc: { fr: "On produit 4 à 12 contenus par mois (selon votre formule) : pages services, articles longue traîne, pages locales, comparatifs. Chaque contenu est calibré avec Surfer SEO pour battre la SERP cible, validé par vous avant publication, et maillé intelligemment avec le reste du site.", en: "We produce 4 to 12 content pieces per month (depending on your tier): service pages, long-tail articles, local pages, comparisons. Each piece is calibrated with Surfer SEO to beat the target SERP, validated by you before publication, and intelligently linked with the rest of the site." } },
      { icon: Rocket, title: { fr: "Netlinking, suivi positions & reporting mensuel", en: "Netlinking, rank tracking & monthly reporting" }, duration: { fr: "Mois 3-6 — En continu", en: "Months 3-6 — Ongoing" },
        desc: { fr: "On déclenche la campagne netlinking (5 à 20 backlinks qualité/mois), on suit chaque position Google sur vos mots-clés cibles, on ajuste la stratégie selon les data. Chaque fin de mois, on livre un rapport Looker Studio + un call de 30 min pour décider des prochaines priorités.", en: "We trigger the netlinking campaign (5-20 quality backlinks/month), track every Google ranking on your target keywords, adjust strategy based on data. End of every month, we deliver a Looker Studio report + a 30-min call to decide on next priorities." } },
    ],
  },

  stats: [
    { value: "×5", label: { fr: "Trafic organique moyen à 6 mois", en: "Avg organic traffic at 6 months" } },
    { value: "3-6", suffix: " mois", label: { fr: "Pour atteindre la page 1", en: "To reach page 1" } },
    { value: "Top 10", label: { fr: "Sur vos mots-clés stratégiques", en: "On your strategic keywords" } },
    { value: "+200", suffix: "%", label: { fr: "Conversions organiques", en: "Organic conversions" } },
  ],

  useCases: {
    headline: { fr: "Pour qui notre stratégie SEO page 1 est-elle vraiment faite ?", en: "Who is our page-1 SEO strategy really for?" },
    intro: {
      fr: "Le SEO n'est pas universel — chaque secteur a ses propres signaux de classement, son intention de recherche, sa concurrence. Voici 4 cas concrets de clients GoScaleStudio, avec la stratégie qu'on a déployée et les résultats obtenus en 3 à 6 mois.",
      en: "SEO isn't one-size-fits-all — every industry has its own ranking signals, search intent, competition. Here are 4 concrete GoScaleStudio client cases, with the strategy we deployed and the results achieved in 3 to 6 months.",
    },
    cases: [
      { icon: Briefcase, sector: { fr: "B2B local & cabinets de conseil", en: "Local B2B & consulting firms" },
        problem: { fr: "Votre cabinet rivalise avec 30 confrères sur Cotonou mais n'apparaît nulle part sur \"consultant marketing Cotonou\" ou \"audit stratégique Bénin\".", en: "Your firm competes with 30 peers in Cotonou but appears nowhere on \"marketing consultant Cotonou\" or \"strategic audit Benin\"." },
        solution: { fr: "Audit technique + 30 pages services hyper-ciblées + Google Business Profile optimisé + 15 backlinks locaux (CCI, presse spécialisée, annuaires métier).", en: "Technical audit + 30 hyper-targeted service pages + optimized Google Business Profile + 15 local backlinks (Chamber of Commerce, trade press, industry directories)." },
        result: { fr: "Top 3 sur 18 requêtes locales en 5 mois, +320 % de demandes de devis qualifiées.", en: "Top 3 on 18 local queries in 5 months, +320% qualified quote requests." } },
      { icon: ShoppingCart, sector: { fr: "E-commerce & marketplaces", en: "E-commerce & marketplaces" },
        problem: { fr: "Votre boutique WooCommerce vend bien via Ads mais zéro trafic organique. Vous payez 4 €/clic à Google Ads pour des produits qui devraient se vendre tout seuls.", en: "Your WooCommerce store sells well via Ads but zero organic traffic. You pay €4/click on Google Ads for products that should sell themselves." },
        solution: { fr: "Optimisation fiches produits (250 SKU), pages catégories sémantiques, articles guides d'achat, Schema Product + Reviews, netlinking blogs lifestyle.", en: "Product page optimization (250 SKUs), semantic category pages, buying-guide articles, Product + Reviews Schema, lifestyle blog netlinking." },
        result: { fr: "Trafic organique x6 en 6 mois, -45 % de budget Ads à CA équivalent.", en: "Organic traffic ×6 in 6 months, -45% Ads budget at equivalent revenue." } },
      { icon: Stethoscope, sector: { fr: "Cabinets santé & cliniques", en: "Health practices & clinics" },
        problem: { fr: "Votre clinique est excellente mais introuvable sur \"dentiste Cotonou\", \"kiné Akpakpa\" ou \"clinique pédiatrique Bénin\". Les patients vont chez le concurrent moins bon mais mieux référencé.", en: "Your clinic is excellent but unfindable on \"dentist Cotonou\", \"physio Akpakpa\" or \"pediatric clinic Benin\". Patients go to the weaker but better-ranked competitor." },
        solution: { fr: "Pages spécialités par praticien, blog médical pédagogique (50 articles/an), Google Business Profile + génération d'avis, Schema LocalBusiness + MedicalClinic.", en: "Per-practitioner specialty pages, educational medical blog (50 articles/year), Google Business Profile + review generation, LocalBusiness + MedicalClinic Schema." },
        result: { fr: "1ʳᵉ position Pack Local sur 12 requêtes santé locales, +180 % de prises de RDV en ligne.", en: "#1 Local Pack on 12 local health queries, +180% online appointment bookings." } },
      { icon: Award, sector: { fr: "Indépendants, coachs & experts", en: "Freelancers, coaches & experts" },
        problem: { fr: "Vous êtes expert reconnu dans votre niche, mais quand on tape votre métier sur Google, ce sont des plateformes génériques (Malt, LinkedIn, Indeed) qui captent tous les clics. Vous restez invisible.", en: "You're a recognized expert in your niche, but Googling your profession shows generic platforms (Malt, LinkedIn, Indeed) grabbing all clicks. You stay invisible." },
        solution: { fr: "Personal branding SEO : page expert ultra-optimisée, blog d'autorité (1 article référence/semaine), citations presse, podcast guesting, Schema Person + Author.", en: "SEO personal branding: ultra-optimized expert page, authority blog (1 reference article/week), press citations, podcast guesting, Person + Author Schema." },
        result: { fr: "Top 3 sur le nom du métier + ville en 4 mois, +250 % de prospects entrants qualifiés.", en: "Top 3 on profession + city in 4 months, +250% qualified inbound leads." } },
    ],
  },

  stack: {
    headline: { fr: "La stack SEO professionnelle qu'on déploie", en: "The professional SEO stack we deploy" },
    intro: {
      fr: "On combine les meilleurs outils du marché — ceux qu'utilisent les agences SEO du top 1 % — pour auditer, planifier, produire et mesurer votre stratégie page 1. Vous gardez accès à toutes les data en permanence.",
      en: "We combine the best market tools — the ones used by top-1% SEO agencies — to audit, plan, produce and measure your page-1 strategy. You keep access to all the data at all times.",
    },
    tools: [
      { name: "Google Search Console", role: { fr: "Source officielle Google : impressions, clics, positions, erreurs d'indexation", en: "Official Google source: impressions, clicks, rankings, indexation errors" } },
      { name: "Google Analytics 4", role: { fr: "Suivi du trafic organique, conversions, parcours utilisateur", en: "Organic traffic tracking, conversions, user journey" } },
      { name: "SEMrush", role: { fr: "Recherche mots-clés, analyse concurrentielle, suivi positions", en: "Keyword research, competitor analysis, rank tracking" } },
      { name: "Ahrefs", role: { fr: "Analyse profil backlinks, opportunités netlinking, audit on-page", en: "Backlink profile analysis, netlinking opportunities, on-page audit" } },
      { name: "RankMath Pro", role: { fr: "Plugin SEO WordPress : Schema, sitemap, méta, optimisations on-page", en: "WordPress SEO plugin: Schema, sitemap, meta, on-page optimization" } },
      { name: "Screaming Frog", role: { fr: "Crawl technique complet : Hn, redirections, contenu dupliqué, balisage", en: "Full technical crawl: headings, redirects, duplicate content, markup" } },
      { name: "Google PageSpeed Insights", role: { fr: "Mesure Core Web Vitals & performance mobile/desktop", en: "Core Web Vitals & mobile/desktop performance measurement" } },
      { name: "Surfer SEO", role: { fr: "Optimisation sémantique des contenus pour battre la SERP cible", en: "Content semantic optimization to beat the target SERP" } },
      { name: "AlsoAsked", role: { fr: "Cartographie des People Also Ask pour le contenu longue traîne", en: "People Also Ask mapping for long-tail content" } },
      { name: "Looker Studio", role: { fr: "Dashboard de reporting mensuel personnalisé pour vous", en: "Custom monthly reporting dashboard for you" } },
      { name: "Google Business Profile", role: { fr: "Optimisation fiche locale pour entrer dans le Pack Local", en: "Local listing optimization to enter the Local Pack" } },
    ],
  },

  pricing: {
    headline: { fr: "Combien coûte une stratégie SEO page 1 ?", en: "How much does a page-1 SEO strategy cost?" },
    intro: {
      fr: "Trois formules selon votre ambition : un audit one-shot pour démarrer, un suivi mensuel (recommandé) pour atteindre la page 1 en 3-6 mois, ou un accompagnement Enterprise pour les sites complexes ou multi-pays. Tout est sur mesure, sans engagement long, transparent du premier au dernier euro.",
      en: "Three tiers depending on your ambition: a one-shot audit to start, a monthly retainer (recommended) to reach page 1 in 3-6 months, or an Enterprise package for complex or multi-country sites. Everything is custom, no long-term lock-in, transparent from the first to the last euro.",
    },
    tiers: [
      { name: { fr: "Starter — Audit SEO", en: "Starter — SEO Audit" }, price: "400 €", priceNote: { fr: "Audit complet one-shot", en: "Full one-shot audit" },
        features: [
          { fr: "Audit technique complet (Screaming Frog, PageSpeed, Search Console)", en: "Full technical audit (Screaming Frog, PageSpeed, Search Console)" },
          { fr: "Analyse de 80 mots-clés stratégiques (SEMrush + Ahrefs)", en: "Analysis of 80 strategic keywords (SEMrush + Ahrefs)" },
          { fr: "Analyse concurrentielle (5 concurrents directs)", en: "Competitor analysis (5 direct competitors)" },
          { fr: "Rapport priorisé 30-50 pages + plan d'action 6 mois", en: "Prioritized 30-50 page report + 6-month action plan" },
          { fr: "Restitution en visio (60 min) avec un expert SEO", en: "Video debrief (60 min) with an SEO expert" },
        ] },
      { name: { fr: "Pro — Suivi SEO mensuel (recommandé)", en: "Pro — Monthly SEO retainer (recommended)" }, price: "800 €/mois", priceNote: { fr: "Page 1 en 3-6 mois, engagement 3 mois minimum", en: "Page 1 in 3-6 months, 3-month minimum commitment" }, highlight: true,
        features: [
          { fr: "Tout du plan Starter (audit inclus le mois 1)", en: "Everything in Starter (audit included month 1)" },
          { fr: "4 contenus SEO rédigés & optimisés par mois", en: "4 SEO articles written & optimized per month" },
          { fr: "Optimisations techniques continues + corrections", en: "Ongoing technical optimizations + fixes" },
          { fr: "5 à 10 backlinks qualité par mois (white-hat)", en: "5 to 10 quality backlinks per month (white-hat)" },
          { fr: "SEO local Cotonou & Google Business Profile", en: "Local SEO Cotonou & Google Business Profile" },
          { fr: "Reporting Looker Studio + call mensuel de 30 min", en: "Looker Studio reporting + monthly 30-min call" },
        ] },
      { name: { fr: "Enterprise — SEO sur mesure", en: "Enterprise — Custom SEO" }, price: "à partir de 1 500 €/mois", priceNote: { fr: "Sites complexes, e-commerce, multi-pays, multi-langues", en: "Complex sites, e-commerce, multi-country, multi-language" },
        features: [
          { fr: "Tout du plan Pro à volume étendu", en: "Everything in Pro at extended volume" },
          { fr: "8 à 12 contenus SEO rédigés par mois", en: "8 to 12 SEO articles written per month" },
          { fr: "Netlinking premium : 15-20 backlinks DA 50+ par mois", en: "Premium netlinking: 15-20 DA 50+ backlinks per month" },
          { fr: "SEO international (hreflang, multi-pays, multi-langues)", en: "International SEO (hreflang, multi-country, multi-language)" },
          { fr: "Consultant SEO dédié + accès Slack 24/7", en: "Dedicated SEO consultant + 24/7 Slack access" },
          { fr: "Reporting hebdomadaire + war-room mensuelle", en: "Weekly reporting + monthly war-room" },
        ] },
    ],
  },

  faq: [
    { q: { fr: "Combien de temps avant de voir mon site sur la page 1 de Google ?", en: "How long before my site reaches Google page 1?" },
      a: { fr: "Pour des mots-clés longue traîne et locaux à faible concurrence, on observe les premières positions en page 1 dès 2 à 3 mois. Pour des requêtes commerciales compétitives, comptez 4 à 6 mois en moyenne, parfois jusqu'à 9 mois sur des secteurs très saturés. Notre engagement : visibilité mesurable dès le mois 3, et page 1 sur la majorité de vos mots-clés stratégiques entre 4 et 6 mois.", en: "For long-tail and low-competition local keywords, we see first page-1 positions starting 2 to 3 months in. For competitive commercial queries, expect 4 to 6 months on average, sometimes up to 9 in heavily saturated sectors. Our commitment: measurable visibility from month 3, and page 1 on the majority of your strategic keywords between months 4 and 6." } },
    { q: { fr: "Garantissez-vous la première position Google ?", en: "Do you guarantee Google's #1 position?" },
      a: { fr: "Honnêtement non — et personne de sérieux ne devrait vous le garantir. Google utilise plus de 200 signaux de classement, ajuste son algorithme en permanence, et la concurrence peut investir massivement à tout moment. Ce qu'on garantit en revanche, c'est : une progression mesurable mois après mois sur vos mots-clés cibles, l'application stricte des meilleures pratiques SEO 2026, un reporting transparent (vous voyez chaque position), et le remboursement des contenus non livrés si on prend du retard. Sur les 40 derniers clients, 92 % ont atteint la page 1 sur au moins 50 % de leurs mots-clés stratégiques en moins de 6 mois.", en: "Honestly no — and no serious agency should guarantee it. Google uses 200+ ranking signals, constantly tweaks its algorithm, and competitors can invest massively at any moment. What we do guarantee: measurable month-over-month progress on your target keywords, strict application of 2026 SEO best practices, transparent reporting (you see every position), and a refund on undelivered content if we fall behind. Across our last 40 clients, 92% reached page 1 on at least 50% of their strategic keywords in under 6 months." } },
    { q: { fr: "Combien de mots-clés couvrez-vous dans la stratégie ?", en: "How many keywords does the strategy cover?" },
      a: { fr: "En formule Pro, on cible activement 80 à 150 mots-clés (un mix de \"head\" à fort volume, \"middle tail\" et longue traîne). En Enterprise, on monte à 300-500 mots-clés. Plus important que le nombre : la cohérence sémantique. On construit une cartographie en arbre où chaque mot-clé alimente vos pages piliers, qui elles-mêmes renforcent votre autorité globale. C'est cette structure (et pas le bourrage de mots-clés) qui plaît à Google en 2026.", en: "In the Pro tier, we actively target 80 to 150 keywords (a mix of high-volume \"head\", \"middle tail\" and long tail). In Enterprise, we go up to 300-500 keywords. More important than the count: semantic coherence. We build a tree-shaped map where each keyword feeds your pillar pages, which themselves strengthen your overall authority. This structure (not keyword stuffing) is what Google loves in 2026." } },
    { q: { fr: "Quelle est votre méthode de netlinking ? Est-ce risqué ?", en: "What's your netlinking method? Is it risky?" },
      a: { fr: "100 % white-hat, traçable, et pérenne. On ne touche pas aux PBN (Private Blog Networks), aux fermes de liens, ni aux backlinks achetés en masse — ces pratiques font sanctionner par Google. Notre méthode : guest posts sur des sites thématiques DA 40+, citations dans annuaires métier et locaux reconnus, partenariats éditoriaux avec des médias spécialisés, échanges d'articles avec des sites complémentaires non concurrents. Chaque lien est validé manuellement, contextuel, et survit aux core updates Google.", en: "100% white-hat, traceable, and durable. We don't touch PBNs (Private Blog Networks), link farms, or bulk-purchased backlinks — those practices get you penalized by Google. Our method: guest posts on thematic DA 40+ sites, citations in recognized trade and local directories, editorial partnerships with specialized media, article swaps with complementary non-competing sites. Every link is manually validated, contextual, and survives Google core updates." } },
    { q: { fr: "Qui rédige les contenus SEO ? Est-ce de l'IA générique ?", en: "Who writes the SEO content? Is it generic AI output?" },
      a: { fr: "Nos contenus sont rédigés par des rédacteurs francophones spécialisés (souvent natifs du secteur visé) et optimisés avec Surfer SEO pour la pertinence sémantique. On utilise l'IA (GPT-4, Claude) comme assistant de structuration et de recherche, jamais comme générateur final. Chaque article passe par une revue éditoriale humaine, une vérification anti-plagiat, une validation factuelle, et votre relecture avant publication. Résultat : du contenu utile, original, agréable à lire, que Google récompense — pas du contenu IA bas de gamme que les algorithmes 2026 pénalisent activement.", en: "Our content is written by specialized francophone writers (often native to the target industry) and optimized with Surfer SEO for semantic relevance. We use AI (GPT-4, Claude) as a structuring and research assistant, never as the final generator. Every article goes through human editorial review, plagiarism checks, fact-checking, and your proofread before publication. Result: useful, original, pleasant-to-read content that Google rewards — not low-grade AI output that 2026 algorithms actively penalize." } },
    { q: { fr: "Faites-vous du SEO local pour Cotonou et le Bénin ?", en: "Do you do local SEO for Cotonou and Benin?" },
      a: { fr: "Oui, et c'est l'un de nos plus gros leviers pour les business locaux. Pour Cotonou, Porto-Novo, Parakou, Abomey-Calavi (et toute l'Afrique de l'Ouest francophone), on optimise votre Google Business Profile (catégories, descriptions, photos, horaires, attributs), on génère un flux d'avis clients authentiques, on construit des pages quartier/ville, et on cible les requêtes \"near me\" qui captent 70 % du trafic local mobile. Objectif : apparaître dans le Pack Local Google sur vos requêtes métier + ville.", en: "Yes, and it's one of our biggest levers for local businesses. For Cotonou, Porto-Novo, Parakou, Abomey-Calavi (and all francophone West Africa), we optimize your Google Business Profile (categories, descriptions, photos, hours, attributes), generate a flow of authentic customer reviews, build district/city pages, and target \"near me\" queries that grab 70% of local mobile traffic. Goal: appear in the Google Local Pack on your profession + city queries." } },
    { q: { fr: "Comment gérez-vous les mises à jour d'algorithme Google ?", en: "How do you handle Google algorithm updates?" },
      a: { fr: "Google déploie 3 à 5 core updates majeurs par an, plus des dizaines d'ajustements mineurs. Notre approche : on suit chaque update en temps réel, on monitore vos positions sur SEMrush dans les 48h qui suivent, et on ajuste la stratégie si besoin. Comme on travaille exclusivement en white-hat sur des fondations solides (technique, contenu utile, backlinks naturels), nos clients sont rarement impactés négativement par les updates — la plupart en bénéficient même. En cas de chute de positions liée à une update, l'analyse et le plan de remédiation sont inclus dans votre suivi mensuel, sans surcoût.", en: "Google rolls out 3-5 major core updates per year, plus dozens of minor tweaks. Our approach: we track every update in real time, monitor your rankings on SEMrush within 48h, and adjust strategy if needed. Since we work exclusively white-hat on solid foundations (technical, useful content, natural backlinks), our clients are rarely hit negatively by updates — most actually benefit. If a ranking drop is tied to an update, the analysis and remediation plan are included in your monthly retainer at no extra cost." } },
    { q: { fr: "Vous pratiquez du black-hat ou des techniques agressives ?", en: "Do you practice black-hat or aggressive techniques?" },
      a: { fr: "Jamais. Zéro cloaking, zéro keyword stuffing, zéro PBN, zéro contenu IA généré en masse, zéro backlinks achetés sur Fiverr, zéro doorway pages. Ces techniques fonctionnent peut-être 3 mois — puis Google sanctionne et c'est 12 mois à se relever (quand on se relève). On joue le long terme : 100 % white-hat, conforme aux Webmaster Guidelines Google, audité chaque trimestre par votre équipe si vous le souhaitez. C'est plus lent que le black-hat, mais c'est ce qui construit une vraie autorité durable.", en: "Never. Zero cloaking, zero keyword stuffing, zero PBNs, zero mass-generated AI content, zero Fiverr-bought backlinks, zero doorway pages. These techniques might work 3 months — then Google penalizes and it's 12 months to recover (if you recover). We play the long game: 100% white-hat, compliant with Google Webmaster Guidelines, audited every quarter by your team if you want. It's slower than black-hat, but it's what builds real durable authority." } },
  ],

  relatedSlugs: ["site-wordpress-seo", "maquette-ui-ux", "chatbot-gpt-site-web", "automatisation-no-code"],

  cta: {
    headline: { fr: "Et si dans 6 mois, vos clients vous trouvaient en premier sur Google ?", en: "What if in 6 months, your customers found you first on Google?" },
    desc: { fr: "On commence par un audit SEO gratuit de 60 minutes : on analyse vos positions actuelles, vos concurrents directs, et on vous remet un plan d'action chiffré pour atteindre la page 1 sur vos mots-clés stratégiques. Sans engagement, sans baratin.", en: "We start with a free 60-minute SEO audit: we analyze your current rankings, your direct competitors, and hand you a costed action plan to reach page 1 on your strategic keywords. No commitment, no fluff." },
    primaryLabel: { fr: "Réserver mon audit SEO gratuit", en: "Book my free SEO audit" },
    secondaryLabel: { fr: "Voir tous nos services", en: "See all our services" },
  },
};

/* ── Long-tail : Maquette Figma 48h ── */
const maquetteFigma48h: ServicePage = {
  slug: "maquette-figma-48h",
  type: "long-tail",
  category: "Maquette UI/UX",
  pillarSlug: "maquette-ui-ux",
  color: "amber",
  icon: Palette,
  heroIllustration: "ui-mockup",

  metaTitle: {
    fr: "Maquette Figma 48h Chrono — Designer Expert · Prototype Cliquable Livré Express",
    en: "Figma Mockup in 48h Flat — Expert Designer · Clickable Prototype Delivered Express",
  },
  metaDescription: {
    fr: "Maquette Figma haute fidélité livrée en 48h chrono. Prototype cliquable, design system inclus, mobile-first. Idéal pitch investisseurs, deadline client, lancement express. Fichier Figma 100% à vous.",
    en: "High-fidelity Figma mockup delivered in 48h flat. Clickable prototype, design system included, mobile-first. Perfect for investor pitches, client deadlines, express launches. Figma file 100% yours.",
  },
  keywords: [
    "maquette Figma 48h", "Figma rapide", "maquette urgente", "prototype Figma express",
    "designer Figma", "expert Figma", "agence Figma Afrique", "Figma AI",
    "maquette landing page Figma", "Figma freelance", "designer Figma Cotonou",
    "maquette express Bénin", "prototype cliquable rapide", "design system Figma",
    "maquette pitch investisseurs",
  ],

  hero: {
    badge: { fr: "Maquette Figma Express", en: "Express Figma Mockup" },
    h1: { fr: "Maquette Figma cliquable haute fidélité, livrée en", en: "High-fidelity clickable Figma mockup, delivered in" },
    h1Highlight: { fr: "48h chrono", en: "48h flat" },
    subtitle: {
      fr: "Pitch demain ? Deadline client jeudi ? Designer en congé ? On prend le relais et on livre en 48h une maquette Figma moderne, mobile-first, cliquable, avec design system inclus. Le fichier Figma reste 100% votre propriété — vous repartez avec un asset que vous pouvez faire évoluer ou confier à n'importe quel développeur.",
      en: "Pitch tomorrow? Client deadline Thursday? Designer on leave? We take over and deliver in 48h a modern, mobile-first, clickable Figma mockup with design system included. The Figma file stays 100% yours — you walk away with an asset you can iterate on or hand off to any developer.",
    },
    trustStrip: [
      { value: "48h", label: { fr: "Livraison chrono", en: "Flat delivery" } },
      { value: "100%", label: { fr: "Fichier à vous", en: "File is yours" } },
      { value: "5-8", label: { fr: "Écrans inclus", en: "Screens included" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Tout le monde a déjà vécu cette urgence : un pitch investisseurs cale dans 72h, un client qui veut voir la v2 avant la fin de semaine, un lancement marché qui se précise plus vite que prévu. Et au moment où vous avez besoin d'une maquette propre, personne n'est dispo. Voici les quatre situations qu'on débloque le plus souvent — et la raison pour laquelle on a structuré toute notre offre autour de la promesse 48h.",
      en: "We've all been there: an investor pitch in 72h, a client expecting v2 by Friday, a market launch that suddenly accelerated. And right when you need a clean mockup, nobody's available. Here are the four situations we unblock most often — and why we built our entire offer around the 48h promise.",
    },
    items: [
      { icon: Clock, title: { fr: "Une deadline qui semble impossible à tenir", en: "A deadline that seems impossible to hit" },
        desc: { fr: "Votre client, votre board ou votre comité attend une maquette pour après-demain. Une agence classique vous parle de 3 semaines. Un freelance disponible vous demande 10 jours. Vous, vous avez 48h. On a construit notre process exprès pour absorber ce type d'urgence sans sacrifier la qualité du livrable.", en: "Your client, your board or your committee expects a mockup the day after tomorrow. A classic agency quotes 3 weeks. An available freelancer asks for 10 days. You have 48h. We engineered our process specifically to absorb this kind of urgency without compromising deliverable quality." } },
      { icon: Users, title: { fr: "Votre designer habituel est indisponible", en: "Your usual designer is unavailable" },
        desc: { fr: "Congés, charge surchargée, départ, freelance ghosté en plein projet — quand votre designer interne ou externe tombe, tout votre planning produit s'effondre. On intervient en sous-traitance ponctuelle, on parle Figma couramment, et on rend un fichier propre que votre équipe pourra reprendre sans friction.", en: "Holidays, overload, departure, ghosted freelancer mid-project — when your in-house or external designer drops, your entire product timeline collapses. We step in as one-shot subcontractors, speak Figma fluently, and hand back a clean file your team can pick up without friction." } },
      { icon: Lightbulb, title: { fr: "Une idée à valider vite avant d'investir", en: "An idea to validate fast before investing" },
        desc: { fr: "Vous avez un concept de produit, de landing page ou d'app, mais vous ne voulez pas dépenser 5 000 € de dev tant que vous n'avez pas testé l'appétence du marché. Une maquette cliquable en 48h vous permet de la mettre devant 10 utilisateurs cibles cette semaine — et de pivoter, killer ou foncer en connaissance de cause.", en: "You have a product, landing page or app concept, but don't want to drop €5,000 on dev before testing market appetite. A clickable mockup in 48h lets you put it in front of 10 target users this week — and pivot, kill or go all-in with real evidence." } },
      { icon: Rocket, title: { fr: "Pitch investisseurs ou client demain", en: "Investor or client pitch tomorrow" },
        desc: { fr: "Slides PowerPoint, screenshots de Notion ou wireframe à la main : aucun investisseur sérieux ne projette plus aujourd'hui. Un prototype Figma cliquable, animé, sur mobile et desktop, transforme votre pitch d'amateur en exécution crédible. C'est souvent la différence entre un « on vous recontactera » et un term sheet.", en: "PowerPoint slides, Notion screenshots or hand-drawn wireframes: no serious investor projects on those anymore. A clickable, animated Figma prototype on mobile and desktop turns your pitch from amateur to credible execution. Often the difference between 'we'll follow up' and a term sheet." } },
    ],
  },

  solution: {
    headline: { fr: "Une maquette Figma production-ready, en deux jours ouvrés", en: "A production-ready Figma mockup, in two business days" },
    intro: {
      fr: "On a découpé le processus design en blocs ultra-rapides, en s'appuyant sur Figma AI, v0.dev, Google Stitch et nos design systems internes. Résultat : un livrable qui ressemble à 3 semaines de travail, produit en 48h. Voici les six éléments concrets que vous recevez à la fin du sprint.",
      en: "We sliced the design process into ultra-fast blocks, leveraging Figma AI, v0.dev, Google Stitch and our internal design systems. The result: a deliverable that looks like 3 weeks of work, produced in 48h. Here are the six concrete elements you receive at sprint end.",
    },
    features: [
      { icon: Sparkles, title: { fr: "Boost Figma AI pour accélérer x5", en: "Figma AI boost for 5× speed" },
        desc: { fr: "On utilise Figma AI (génération de wireframes, remplissage intelligent, variantes auto) pour passer de l'idée brute à un premier squelette en 2h au lieu de 2 jours. Vous gardez la direction créative, l'IA enlève le travail mécanique. C'est ce qui rend le délai 48h réaliste sans bâcler le rendu.", en: "We use Figma AI (wireframe generation, smart fill, auto variants) to go from raw idea to first skeleton in 2h instead of 2 days. You keep creative direction, AI removes mechanical work. That's what makes the 48h timeline realistic without rushing the output." } },
      { icon: Eye, title: { fr: "Prototype cliquable, pas une image figée", en: "Clickable prototype, not a frozen image" },
        desc: { fr: "Toutes les interactions clés sont câblées : navigation, hover, états actifs, transitions entre écrans, formulaires interactifs. Vos parties prenantes peuvent réellement utiliser la maquette dans Figma ou via un lien partageable — pas besoin d'expliquer ce qui se passerait « si on cliquait ici ».", en: "All key interactions are wired: navigation, hovers, active states, screen transitions, interactive forms. Your stakeholders can actually use the mockup in Figma or via a shareable link — no need to explain what would happen 'if we clicked here'." } },
      { icon: Palette, title: { fr: "Design system intégré dès la livraison", en: "Design system built in from delivery" },
        desc: { fr: "Couleurs, typos, composants, espacements, icônes : tout est structuré en styles et components Figma réutilisables. Quand vous (ou votre équipe) voudrez ajouter un écran, dupliquer une section ou changer la couleur primaire, ce sera trois clics au lieu de trois heures.", en: "Colors, typography, components, spacing, icons: everything is structured as reusable Figma styles and components. When you (or your team) need to add a screen, duplicate a section or change the primary color, it's three clicks instead of three hours." } },
      { icon: Phone, title: { fr: "Mobile-first, responsive desktop inclus", en: "Mobile-first, desktop responsive included" },
        desc: { fr: "En 2026, 70% du trafic est mobile — et en Afrique de l'Ouest, c'est plutôt 90%. On dessine d'abord la version mobile (la plus contraignante), puis on l'adapte en tablette et desktop. Vous recevez les trois breakpoints prêts à être codés, sans avoir à payer trois maquettes séparées.", en: "In 2026, 70% of traffic is mobile — and in West Africa it's closer to 90%. We design mobile first (the most constraining), then adapt to tablet and desktop. You receive all three breakpoints ready to code, without paying for three separate mockups." } },
      { icon: Zap, title: { fr: "Micro-animations et transitions Lottie", en: "Micro-animations and Lottie transitions" },
        desc: { fr: "On intègre des animations légères (Lottie, Smart Animate Figma, Framer) sur les éléments clés : CTA, transitions de pages, loaders, états de succès. Ce sont ces détails qui font passer une maquette de « correcte » à « waouh » devant un investisseur ou un comité de direction.", en: "We embed lightweight animations (Lottie, Figma Smart Animate, Framer) on key elements: CTAs, page transitions, loaders, success states. These details are what take a mockup from 'okay' to 'wow' in front of an investor or executive committee." } },
      { icon: FileCheck, title: { fr: "Fichier Figma 100% votre propriété", en: "Figma file 100% your property" },
        desc: { fr: "Pas de cage dorée, pas d'abonnement, pas de droits réservés. À la livraison, on vous transfère la propriété du fichier Figma. Vous pouvez le modifier, le partager, le confier à un autre designer ou à un dev — sans nous demander la permission. C'est votre asset, point.", en: "No golden cage, no subscription, no reserved rights. On delivery, we transfer ownership of the Figma file to you. You can edit it, share it, hand it to another designer or dev — without asking us. It's your asset, period." } },
    ],
  },

  howItWorks: {
    headline: { fr: "Le sprint 48h, étape par étape", en: "The 48h sprint, step by step" },
    steps: [
      { icon: Search, title: { fr: "Brief & cadrage éclair", en: "Lightning brief & scoping" }, duration: { fr: "Jour 1 — matin", en: "Day 1 — AM" },
        desc: { fr: "Appel de 45 minutes pour comprendre votre projet, votre cible, vos contraintes de marque, vos 3-5 écrans prioritaires et vos références visuelles. À la fin de l'appel, vous validez le périmètre exact (nombre d'écrans, breakpoints, niveau de finition) — le compte à rebours 48h démarre une fois le brief signé.", en: "45-minute call to understand your project, audience, brand constraints, your 3-5 priority screens and visual references. By the end, you validate the exact scope (screen count, breakpoints, finish level) — the 48h countdown starts once the brief is signed." } },
      { icon: Cpu, title: { fr: "Wireframes + design system de base", en: "Wireframes + base design system" }, duration: { fr: "Jour 1 — après-midi", en: "Day 1 — PM" },
        desc: { fr: "On génère les wireframes via Figma AI et Google Stitch, on les retravaille à la main, on cale la grille, la palette de couleurs, la typo et les composants de base (boutons, inputs, cards). En fin d'après-midi, vous recevez un Loom de 5 min pour valider la direction avant le passage en haute fidélité.", en: "We generate wireframes via Figma AI and Google Stitch, manually rework them, set the grid, color palette, type and base components (buttons, inputs, cards). End of afternoon, you get a 5-min Loom to validate direction before going into high fidelity." } },
      { icon: Palette, title: { fr: "Design haute fidélité mobile + desktop", en: "High-fidelity design mobile + desktop" }, duration: { fr: "Jour 2 — matin", en: "Day 2 — AM" },
        desc: { fr: "On habille tous les écrans en haute fidélité, mobile d'abord, puis desktop. On intègre l'imagerie (générée via Midjourney / Imagen ou vos assets), les illustrations, les micro-interactions. C'est l'étape la plus dense, et celle où votre fichier Figma prend la forme finale.", en: "We dress every screen in high fidelity, mobile first, then desktop. We integrate imagery (generated via Midjourney / Imagen or your assets), illustrations, micro-interactions. The densest step, and where your Figma file takes its final shape." } },
      { icon: Zap, title: { fr: "Prototypage cliquable & animations", en: "Clickable prototyping & animations" }, duration: { fr: "Jour 2 — après-midi", en: "Day 2 — PM" },
        desc: { fr: "On câble toutes les interactions dans Figma : navigation entre écrans, hover, focus, smart animate, transitions Lottie sur les moments clés. On ajoute aussi le lien de prototype partageable, le speaker mode pour vos présentations, et on exporte les assets dev-ready (SVG, PNG @2x).", en: "We wire all interactions in Figma: screen-to-screen navigation, hovers, focus states, smart animate, Lottie transitions on key moments. We also add the shareable prototype link, speaker mode for your presentations, and export dev-ready assets (SVG, PNG @2x)." } },
      { icon: Handshake, title: { fr: "Remise & 2 tours de révisions inclus", en: "Handover & 2 rounds of revisions included" }, duration: { fr: "J+2 → J+7", en: "D+2 → D+7" },
        desc: { fr: "Transfert de la propriété du fichier Figma, walkthrough vidéo de 10 min pour vous montrer où tout se trouve, et deux tours de révisions inclus dans les 7 jours qui suivent la livraison. Vous repartez autonome, avec un fichier propre et documenté.", en: "Transfer of Figma file ownership, 10-min video walkthrough showing where everything lives, and two rounds of revisions included within 7 days of delivery. You walk away autonomous, with a clean, documented file." } },
    ],
  },

  stats: [
    { value: "48", suffix: "h", label: { fr: "Délai de livraison garanti", en: "Guaranteed delivery time" } },
    { value: "100", suffix: "%", label: { fr: "Prototype cliquable", en: "Clickable prototype" } },
    { value: "100", suffix: "%", label: { fr: "Propriété du fichier", en: "File ownership" } },
    { value: "2", label: { fr: "Tours de révisions inclus", en: "Revision rounds included" } },
  ],

  useCases: {
    headline: { fr: "Quand le sprint 48h fait toute la différence", en: "When the 48h sprint makes all the difference" },
    intro: {
      fr: "Le format express ne convient pas à tous les projets — mais quand il colle, il colle parfaitement. Voici les quatre profils qui réservent le plus souvent ce sprint, et le type de livrable qu'on produit pour chacun d'eux.",
      en: "The express format doesn't fit every project — but when it does, it fits perfectly. Here are the four profiles who most often book this sprint, and the kind of deliverable we produce for each.",
    },
    cases: [
      { icon: Rocket, sector: { fr: "Founders en levée de fonds", en: "Founders in fundraising" },
        problem: { fr: "Pitch investisseurs dans 3 jours, deck déjà prêt, mais zéro prototype visuel à montrer du produit. Risque de perdre toute crédibilité face à des concurrents mieux outillés.", en: "Investor pitch in 3 days, deck ready, but zero visual prototype of the product to show. Risk of losing all credibility against better-equipped competitors." },
        solution: { fr: "Maquette Figma cliquable de 5-7 écrans clés du produit (onboarding, dashboard, fonctionnalité signature), mode présentation prêt à projeter, lien partageable pour les follow-ups post-pitch.", en: "Clickable Figma mockup of 5-7 key product screens (onboarding, dashboard, signature feature), presentation mode ready to project, shareable link for post-pitch follow-ups." },
        result: { fr: "Pitch nettement plus convaincant, term sheets ou seconds rendez-vous obtenus dans 60% des cas suivis.", en: "Significantly more convincing pitch, term sheets or second meetings obtained in 60% of tracked cases." } },
      { icon: Briefcase, sector: { fr: "Agences débordées en sous-traitance", en: "Overloaded agencies subcontracting" },
        problem: { fr: "Agence digitale ou studio web avec un pic de charge, designer en vacances, ou projet client signé sans la bande passante interne pour le livrer.", en: "Digital agency or web studio with a workload spike, designer on vacation, or signed client project without the internal bandwidth to deliver." },
        solution: { fr: "On intervient en marque blanche, on travaille à partir de votre brief client, on respecte votre charte graphique (ou celle du client) et on livre un fichier Figma propre que vous facturez sous votre nom.", en: "We step in white-label, work from your client brief, respect your brand guidelines (or the client's) and deliver a clean Figma file you invoice under your name." },
        result: { fr: "Délais clients tenus, marge préservée, équipe non burnoutée — collaboration récurrente sur 80% des cas.", en: "Client deadlines hit, margin preserved, team not burned out — recurring collaboration in 80% of cases." } },
      { icon: Handshake, sector: { fr: "Pitchs commerciaux B2B", en: "B2B sales pitches" },
        problem: { fr: "Équipe commerciale qui doit présenter une proposition sur mesure à un gros client dans 48-72h. Sans visuel, la propale tombe à plat face à la concurrence.", en: "Sales team needing to present a tailored proposal to a major client in 48-72h. Without visuals, the pitch falls flat against competition." },
        solution: { fr: "Maquette de la solution proposée appliquée à la marque du prospect (logo, couleurs, ton). Le client se projette immédiatement, l'écart entre votre propale et celle des concurrents devient flagrant.", en: "Mockup of the proposed solution applied to the prospect's brand (logo, colors, tone). The client projects immediately, the gap between your proposal and competitors becomes obvious." },
        result: { fr: "Taux de signature multiplié par 2 à 3 selon les retours commerciaux, deals à plus gros panier moyen débloqués.", en: "Close rate 2-3× higher per sales feedback, larger-ticket deals unlocked." } },
      { icon: Building2, sector: { fr: "PME pour démo interne ou comité", en: "SMEs for internal demo or committee" },
        problem: { fr: "Directeur produit ou marketing qui doit défendre un projet de refonte, nouveau service ou nouvelle landing page devant un comité interne — sans budget agence ni temps designer.", en: "Product or marketing director needing to defend a redesign, new service or new landing page in front of an internal committee — without agency budget or designer time." },
        solution: { fr: "Maquette concrète du concept à défendre, cliquable, en mobile et desktop, avec présentation des bénéfices visuels chiffrés. La décision interne devient évidente.", en: "Concrete mockup of the concept to defend, clickable, mobile and desktop, with quantified visual benefits presentation. Internal decision becomes obvious." },
        result: { fr: "Projets validés en comité 3× plus souvent qu'avec un simple document écrit, budget alloué plus vite.", en: "Projects validated in committee 3× more often than with a plain written document, budget allocated faster." } },
    ],
  },

  stack: {
    headline: { fr: "La stack qui rend le 48h possible", en: "The stack that makes 48h possible" },
    intro: {
      fr: "Aucun secret : sans les bons outils, ce délai serait fantaisiste. On combine Figma au cœur du process, boosté par les meilleurs assistants IA design du marché, plus quelques outils complémentaires qu'on a sélectionnés pour leur vitesse et leur qualité de rendu.",
      en: "No secret: without the right tools, this timeline would be fantasy. We put Figma at the heart of the process, boosted by the best AI design assistants on the market, plus a few complementary tools picked for their speed and output quality.",
    },
    tools: [
      { name: "Figma", role: { fr: "Outil principal pour la maquette, le design system et le prototypage", en: "Main tool for mockup, design system and prototyping" } },
      { name: "Figma AI", role: { fr: "Génération de wireframes, variantes auto, remplissage intelligent", en: "Wireframe generation, auto variants, smart fill" } },
      { name: "v0.dev", role: { fr: "Génération rapide de composants UI à partir de prompts", en: "Fast UI component generation from prompts" } },
      { name: "Google Stitch", role: { fr: "Génération d'écrans UI IA pour accélérer le squelette initial", en: "AI UI screen generation to speed up initial skeleton" } },
      { name: "Lottie / LottieFiles", role: { fr: "Animations légères intégrables dans Figma et en production", en: "Lightweight animations embeddable in Figma and production" } },
      { name: "Framer", role: { fr: "Prototype web cliquable avec animations avancées si besoin", en: "Clickable web prototype with advanced animations when needed" } },
      { name: "Midjourney / Google Imagen", role: { fr: "Génération d'imagerie sur mesure pour les visuels hero", en: "Custom imagery generation for hero visuals" } },
      { name: "Unsplash / Pexels", role: { fr: "Banques d'images libres de droits pour les placeholders qualitatifs", en: "Royalty-free image banks for high-quality placeholders" } },
      { name: "Iconify / Lucide", role: { fr: "Bibliothèques d'icônes vectorielles cohérentes et libres", en: "Consistent open vector icon libraries" } },
      { name: "Loom", role: { fr: "Vidéo de walkthrough livrée avec le fichier final", en: "Walkthrough video delivered with the final file" } },
    ],
  },

  pricing: {
    headline: { fr: "Trois formules selon votre niveau d'urgence", en: "Three plans based on your urgency level" },
    intro: {
      fr: "On a structuré nos tarifs autour du compromis vitesse / profondeur. Si vous êtes vraiment dans le rouge, prenez l'Express. Si vous avez 3-4 jours et besoin de plus d'écrans, le Standard est le meilleur rapport qualité/prix. Si vous voulez la totale avec révisions illimitées, partez sur Premium. Tous incluent la propriété complète du fichier.",
      en: "We structured pricing around the speed/depth trade-off. If you're truly in the red, take Express. If you have 3-4 days and need more screens, Standard is the best value. If you want the full package with unlimited revisions, go Premium. All include full file ownership.",
    },
    tiers: [
      { name: { fr: "Express 48h", en: "Express 48h" }, price: "150 €", priceNote: { fr: "Maquette urgente, 3-5 écrans", en: "Urgent mockup, 3-5 screens" },
        features: [
          { fr: "3 à 5 écrans en haute fidélité", en: "3 to 5 high-fidelity screens" },
          { fr: "Mobile + desktop responsive", en: "Mobile + desktop responsive" },
          { fr: "Prototype cliquable Figma", en: "Clickable Figma prototype" },
          { fr: "Design system de base inclus", en: "Base design system included" },
          { fr: "1 tour de révisions · Livraison 48h", en: "1 revision round · 48h delivery" },
        ] },
      { name: { fr: "Standard 72h (recommandé)", en: "Standard 72h (recommended)" }, price: "250 €", priceNote: { fr: "Maquette complète, 6-10 écrans", en: "Complete mockup, 6-10 screens" }, highlight: true,
        features: [
          { fr: "6 à 10 écrans en haute fidélité", en: "6 to 10 high-fidelity screens" },
          { fr: "Mobile, tablette + desktop responsive", en: "Mobile, tablet + desktop responsive" },
          { fr: "Prototype cliquable + micro-animations Lottie", en: "Clickable prototype + Lottie micro-animations" },
          { fr: "Design system complet (couleurs, typos, components)", en: "Full design system (colors, type, components)" },
          { fr: "2 tours de révisions · Walkthrough Loom · Livraison 72h", en: "2 revision rounds · Loom walkthrough · 72h delivery" },
        ] },
      { name: { fr: "Premium 48h", en: "Premium 48h" }, price: "à partir de 400 €", priceNote: { fr: "Express + révisions illimitées", en: "Express + unlimited revisions" },
        features: [
          { fr: "Jusqu'à 12 écrans en haute fidélité", en: "Up to 12 high-fidelity screens" },
          { fr: "Mobile, tablette, desktop + dark mode", en: "Mobile, tablet, desktop + dark mode" },
          { fr: "Prototype avancé + animations Framer", en: "Advanced prototype + Framer animations" },
          { fr: "Design system livré comme librairie Figma", en: "Design system delivered as Figma library" },
          { fr: "Révisions illimitées sur 14 jours · Livraison 48h", en: "Unlimited revisions over 14 days · 48h delivery" },
        ] },
    ],
  },

  faq: [
    { q: { fr: "C'est vraiment 48h ? Pas de surprise à mi-parcours ?", en: "Is it really 48h? No mid-project surprises?" },
      a: { fr: "Oui, vraiment 48h ouvrées à partir de la validation du brief. On le tient parce qu'on a structuré toute la stack et le process autour de cette contrainte : un seul designer dédié à votre projet sur ces deux jours, des templates internes prêts à l'emploi, et l'appui de Figma AI pour absorber la charge mécanique. Si jamais on prévoit un dépassement, on vous prévient dans les 4 premières heures — pas la veille de la deadline. Et si on rate (ça n'est jamais arrivé), on rembourse 50% du sprint.", en: "Yes, really 48 business hours from brief sign-off. We hit it because we engineered the whole stack and process around that constraint: one designer dedicated to your project over those two days, ready-to-use internal templates, and Figma AI handling the mechanical load. If we ever anticipate a slip, we warn you in the first 4 hours — not the day before deadline. And if we miss (never happened), we refund 50% of the sprint." } },
    { q: { fr: "Combien d'écrans sont inclus dans le sprint Express ?", en: "How many screens are included in the Express sprint?" },
      a: { fr: "Le forfait Express inclut 3 à 5 écrans en haute fidélité, avec leurs déclinaisons mobile et desktop. Pour un projet plus dense, on recommande le Standard 72h (6 à 10 écrans) ou le Premium 48h (jusqu'à 12 écrans). Pendant le brief de cadrage, on identifie ensemble les écrans réellement critiques — l'objectif n'est pas le volume, c'est l'impact.", en: "The Express plan includes 3 to 5 high-fidelity screens, with mobile and desktop versions. For denser projects, we recommend Standard 72h (6 to 10 screens) or Premium 48h (up to 12 screens). During the scoping brief, we jointly identify the truly critical screens — the goal isn't volume, it's impact." } },
    { q: { fr: "Que se passe-t-il si je veux des révisions après la livraison ?", en: "What if I want revisions after delivery?" },
      a: { fr: "Express inclut 1 tour de révisions, Standard inclut 2 tours, Premium offre des révisions illimitées sur 14 jours. Un « tour » regroupe l'ensemble des feedbacks que vous nous envoyez en une fois (typiquement par commentaire Figma ou Loom). Au-delà des tours inclus, on facture 50 €/heure pour les retouches additionnelles. La plupart de nos clients n'utilisent qu'un seul tour quand le brief initial était clair.", en: "Express includes 1 revision round, Standard includes 2, Premium offers unlimited revisions over 14 days. A 'round' groups all feedback sent at once (typically via Figma comments or Loom). Beyond the included rounds, we bill €50/hour for additional tweaks. Most clients use only one round when the initial brief was clear." } },
    { q: { fr: "Mon projet est complexe (SaaS, dashboard data, app mobile). Le 48h est-il vraiment réaliste ?", en: "My project is complex (SaaS, data dashboard, mobile app). Is 48h really realistic?" },
      a: { fr: "Pour les projets très complexes (SaaS riche, dashboard analytique poussé, app mobile avec 20+ écrans), le format 48h se concentre sur les 5 écrans les plus impactants pour votre objectif immédiat — pas sur la maquette complète du produit. C'est suffisant pour un pitch ou une démo. Pour le produit complet, on bascule vers la pillar Maquette UI/UX en 2-3 semaines, plus adaptée à ce volume.", en: "For very complex projects (rich SaaS, deep analytics dashboard, mobile app with 20+ screens), the 48h format focuses on the 5 most impactful screens for your immediate goal — not the full product mockup. That's enough for a pitch or demo. For the complete product, we switch to the Maquette UI/UX pillar offer over 2-3 weeks, better suited to that volume." } },
    { q: { fr: "Le design system est-il vraiment inclus ou c'est juste du marketing ?", en: "Is the design system really included or is it just marketing?" },
      a: { fr: "Vraiment inclus, et c'est l'un de nos différenciateurs majeurs. Chaque maquette livrée contient : styles de couleurs nommés, styles de typographie, composants Figma (boutons, inputs, cards, navigation) avec leurs variants et états (hover, focus, disabled), grille et espacements documentés. Sur le Premium, on packagise même le système comme librairie Figma réutilisable sur vos autres projets.", en: "Really included, and one of our major differentiators. Every delivered mockup contains: named color styles, type styles, Figma components (buttons, inputs, cards, navigation) with their variants and states (hover, focus, disabled), documented grid and spacing. On Premium, we package the system as a reusable Figma library for your other projects." } },
    { q: { fr: "Le fichier Figma est-il vraiment à moi ? Puis-je le donner à un autre designer ?", en: "Is the Figma file really mine? Can I hand it to another designer?" },
      a: { fr: "Oui, 100%. À la livraison, on transfère la propriété du fichier vers votre compte Figma (ou on vous le partage avec droits d'édition complets si vous êtes en plan gratuit). Vous pouvez le modifier, le dupliquer, le confier à un autre designer ou à un développeur, le commercialiser dans un produit — sans aucune restriction de notre part et sans avoir à nous payer de royalty. C'est votre asset, point final.", en: "Yes, 100%. On delivery, we transfer file ownership to your Figma account (or share it with full edit rights if you're on the free plan). You can edit it, duplicate it, hand it to another designer or developer, commercialize it in a product — with no restriction from us and no royalty owed. It's your asset, period." } },
    { q: { fr: "Travaillez-vous le weekend pour les vraies urgences ?", en: "Do you work weekends for true emergencies?" },
      a: { fr: "Oui, sur demande explicite et avec une majoration de 30%. Si vous nous briefez vendredi soir pour un pitch lundi matin, on peut absolument livrer dimanche soir. On garde un slot weekend ouvert chaque semaine, mais il part vite — d'où l'intérêt de nous prévenir dès que vous sentez l'urgence venir, même sans brief finalisé. On vous bloque le créneau et vous finalisez les détails plus tard.", en: "Yes, on explicit request and with a 30% surcharge. If you brief us Friday evening for a Monday morning pitch, we can absolutely deliver Sunday night. We keep one weekend slot open each week, but it fills fast — so flag us as soon as you sense urgency coming, even without a finalized brief. We block the slot and you finalize details later." } },
    { q: { fr: "Faut-il vous prévenir à l'avance ou je peux briefer maintenant pour livraison après-demain ?", en: "Should I book in advance or can I brief now for delivery the day after tomorrow?" },
      a: { fr: "Idéalement, prévenez-nous 24-48h en amont pour qu'on bloque un slot — surtout en fin de mois et avant les saisons de levée (mars-mai, septembre-novembre) où la demande explose. Mais oui, on accepte régulièrement des briefs à J-0 si on a une fenêtre libre. Le plus simple : envoyez-nous un message WhatsApp ou un email avec votre échéance, on vous confirme la dispo dans l'heure.", en: "Ideally, give us 24-48h heads up so we can block a slot — especially end of month and before fundraising seasons (March-May, September-November) when demand spikes. But yes, we regularly accept same-day briefs if we have an open window. Simplest path: send us a WhatsApp message or email with your deadline, we confirm availability within the hour." } },
  ],

  relatedSlugs: ["maquette-ui-ux", "prototype-v0-startup", "site-wordpress-seo", "chatbot-gpt-site-web"],

  cta: {
    headline: { fr: "Briefez aujourd'hui, projetez votre maquette après-demain", en: "Brief today, project your mockup the day after tomorrow" },
    desc: { fr: "Un appel de 45 minutes pour cadrer votre besoin, 48h ouvrées pour livrer un prototype Figma cliquable, haute fidélité, mobile-first — et le fichier reste 100% à vous. Disponibilité confirmée dans l'heure.", en: "A 45-minute call to scope your need, 48 business hours to deliver a clickable, high-fidelity, mobile-first Figma prototype — and the file stays 100% yours. Availability confirmed within the hour." },
    primaryLabel: { fr: "Réserver mon sprint 48h", en: "Book my 48h sprint" },
    secondaryLabel: { fr: "Voir l'offre Maquette UI/UX complète", en: "See the full UI/UX Mockup offer" },
  },
};

/* ── Long-tail : Prototype v0.dev pour Startup ── */
const prototypeV0Startup: ServicePage = {
  slug: "prototype-v0-startup",
  type: "long-tail",
  category: "Maquette UI/UX",
  pillarSlug: "maquette-ui-ux",
  color: "amber",
  icon: Palette,
  heroIllustration: "ui-mockup",

  metaTitle: {
    fr: "Prototype v0.dev pour Startups — De l'Idée au MVP en 5 Jours · Code React + Next.js",
    en: "v0.dev Prototype for Startups — From Idea to MVP in 5 Days · React + Next.js Code",
  },
  metaDescription: {
    fr: "Passez de l'idée au MVP en 5 jours avec v0.dev. Génération IA de composants React + Tailwind + ShadCN production-ready, intégration Next.js, déploiement Vercel. Idéal startups early-stage et founders solo. À partir de 300 €.",
    en: "Go from idea to MVP in 5 days with v0.dev. AI-generated React + Tailwind + ShadCN production-ready components, Next.js integration, Vercel deployment. Built for early-stage startups and solo founders. From €300.",
  },
  keywords: [
    "v0.dev prototype", "v0.dev startup", "prototype v0 Vercel", "prototype React IA",
    "MVP rapide startup", "MVP en 5 jours", "v0 Vercel", "prototype Next.js IA",
    "code généré par IA", "prototype investisseur", "startup early-stage design dev",
    "MVP no-code React", "générateur UI React", "ShadCN UI startup",
    "prototype SaaS rapide", "agence v0.dev Bénin", "prototype IA Cotonou",
    "founder solo MVP",
  ],

  hero: {
    badge: { fr: "Prototype v0.dev · Startup", en: "v0.dev Prototype · Startup" },
    h1: { fr: "De l'idée brute au MVP React déployé sur Vercel", en: "From raw idea to React MVP shipped on Vercel" },
    h1Highlight: { fr: "en 5 jours chrono", en: "in 5 days flat" },
    subtitle: {
      fr: "On utilise v0.dev (l'IA générative de Vercel) pour produire du code React + Tailwind + ShadCN UI production-ready, l'intégrer dans une app Next.js propre, et la déployer sur Vercel avec un domaine custom. Vous récupérez un MVP fonctionnel, le code source en TypeScript, et la liberté totale d'itérer. Parfait pour pitcher des investisseurs, valider une idée ou décrocher vos 10 premiers utilisateurs.",
      en: "We use v0.dev (Vercel's generative AI) to ship production-ready React + Tailwind + ShadCN UI code, wire it into a clean Next.js app, and deploy it on Vercel with a custom domain. You walk away with a working MVP, the full TypeScript source code, and the freedom to iterate on your own. Perfect to pitch investors, validate an idea or land your first 10 users.",
    },
    trustStrip: [
      { value: "5j", label: { fr: "Idée → MVP en ligne", en: "Idea → live MVP" } },
      { value: "100 %", label: { fr: "Code TypeScript livré", en: "TypeScript code delivered" } },
      { value: "-80 %", label: { fr: "Temps de dev classique", en: "Vs traditional dev time" } },
    ],
  },

  painPoints: {
    intro: {
      fr: "Vous avez une idée de startup claire dans la tête, mais entre l'inspiration et le moment où un vrai produit cliquable existe sur le web, il y a un gouffre. Un dev freelance vous demande 6 semaines et 8 000 €, un studio vous parle de 3 mois, et chaque jour qui passe, vos concurrents avancent. Voici les 4 blocages qui empêchent 90 % des founders early-stage de mettre un MVP en ligne avant qu'il ne soit déjà trop tard.",
      en: "You've got a crystal-clear startup idea in your head, but between inspiration and an actual clickable product on the web, there's a chasm. A freelance dev quotes 6 weeks and €8,000, a studio talks 3 months, and every day that passes, competitors move ahead. Here are the 4 blockers stopping 90% of early-stage founders from shipping an MVP before it's already too late.",
    },
    items: [
      { icon: Users, title: { fr: "Vous n'êtes pas développeur — et vous ne le serez jamais à temps", en: "You're not a developer — and you won't become one in time" },
        desc: { fr: "Vous êtes founder business, marketing ou produit. Apprendre React, Next.js, Tailwind et la gestion d'un déploiement Vercel demanderait 6 mois — temps que vous n'avez pas. Sans dev co-founder, votre idée reste un PDF Notion et un mood board Figma qui n'a jamais été testé sur un vrai utilisateur.", en: "You're a business, marketing or product founder. Learning React, Next.js, Tailwind and Vercel deployment would take 6 months — time you don't have. Without a dev co-founder, your idea stays a Notion PDF and a Figma mood board that no real user has ever touched." } },
      { icon: Briefcase, title: { fr: "Embaucher un dev freelance coûte 5 000 à 15 000 € pour un MVP", en: "Hiring a freelance dev costs €5,000 to €15,000 for an MVP" },
        desc: { fr: "Un développeur React senior facture 400 à 700 €/jour. Un MVP standard (auth, dashboard, 5-10 écrans, déploiement) demande 15 à 30 jours de travail. Vous n'avez ni le budget ni la trésorerie pour brûler ça sans même savoir si votre marché existe. Et si vous trouvez moins cher, vous payez en bugs et en retards.", en: "A senior React developer charges €400 to €700/day. A standard MVP (auth, dashboard, 5-10 screens, deployment) takes 15 to 30 days of work. You have neither the budget nor the cash to burn that without even knowing if your market exists. And if you find someone cheaper, you pay in bugs and delays." } },
      { icon: Clock, title: { fr: "Un MVP traditionnel sort 8 semaines après votre idée — c'est trop tard", en: "A traditional MVP ships 8 weeks after your idea — that's too late" },
        desc: { fr: "Le temps que vous fassiez les specs, le design Figma, le devis, le développement, la QA puis le déploiement, votre fenêtre d'opportunité se referme. Pendant ce temps, un concurrent agile sort une v1 imparfaite et capte vos early adopters. La vitesse de mise en marché est devenue le seul vrai avantage compétitif.", en: "By the time you've done specs, Figma design, quote, development, QA and deployment, your window of opportunity closes. Meanwhile, an agile competitor ships a rough v1 and captures your early adopters. Speed to market has become the only real competitive edge." } },
      { icon: Cpu, title: { fr: "Les outils no-code génèrent du code spaghetti impossible à maintenir", en: "No-code tools generate spaghetti code impossible to maintain" },
        desc: { fr: "Bubble, Webflow ou FlutterFlow vous enferment dans leur écosystème : impossible de récupérer un code React propre, impossible de migrer, impossible d'embaucher un dev plus tard sans tout refaire. Vous payez un abonnement à vie, vous restez prisonnier, et au premier scale-up sérieux, tout casse.", en: "Bubble, Webflow or FlutterFlow lock you into their ecosystem: no way to export clean React code, no way to migrate, no way to hire a dev later without redoing everything. You pay a lifetime subscription, you stay locked in, and at the first serious scale-up, everything breaks." } },
    ],
  },

  solution: {
    headline: { fr: "v0.dev × Next.js × Vercel — un MVP réel, pas un mockup", en: "v0.dev × Next.js × Vercel — a real MVP, not a mockup" },
    intro: {
      fr: "v0.dev est l'IA générative de Vercel qui produit du vrai code React + Tailwind + ShadCN UI à partir d'un prompt en langage naturel. Là où la plupart des agences se contentent de générer des écrans isolés, nous on connaît v0.dev en profondeur : on optimise chaque prompt pour des composants production-ready, on les intègre dans une app Next.js cohérente, et on déploie sur Vercel avec CI/CD. Le résultat : un MVP qui marche vraiment, dont vous possédez le code, et qui peut évoluer pendant des années sans réécriture.",
      en: "v0.dev is Vercel's generative AI that produces real React + Tailwind + ShadCN UI code from a natural-language prompt. Where most agencies just generate isolated screens, we know v0.dev inside out: we optimize each prompt for production-ready components, integrate them into a coherent Next.js app, and deploy on Vercel with CI/CD. The result: an MVP that actually works, that you own the code of, and that can evolve for years without a rewrite.",
    },
    features: [
      { icon: Sparkles, title: { fr: "Génération IA de composants à partir de prompts", en: "AI-driven component generation from prompts" },
        desc: { fr: "On traduit votre vision en prompts v0.dev affûtés (architecture d'écran, hiérarchie d'information, états interactifs, dark mode). En quelques minutes, on obtient des composants React/TSX que d'autres mettraient des jours à coder à la main. Vous voyez votre idée prendre forme en temps réel.", en: "We translate your vision into sharp v0.dev prompts (screen architecture, information hierarchy, interactive states, dark mode). In minutes, we get React/TSX components that would take others days to hand-code. You watch your idea take shape in real time." } },
      { icon: CheckCircle, title: { fr: "Code production-ready, pas un proof-of-concept jetable", en: "Production-ready code, not a throwaway proof of concept" },
        desc: { fr: "Chaque composant généré est revu, refactoré et typé strict en TypeScript. On élimine les anti-patterns, on factorise les éléments réutilisables, on ajoute les accessibilités (ARIA, focus, semantic HTML). Le code livré est prêt à passer une code review chez Stripe ou Notion.", en: "Every generated component is reviewed, refactored and strictly typed in TypeScript. We strip anti-patterns, factor out reusable elements, add accessibility (ARIA, focus, semantic HTML). The delivered code is ready to pass a code review at Stripe or Notion." } },
      { icon: Globe, title: { fr: "Stack moderne : Next.js + Tailwind CSS + ShadCN UI + Radix", en: "Modern stack: Next.js + Tailwind CSS + ShadCN UI + Radix" },
        desc: { fr: "On intègre les composants dans un projet Next.js App Router avec Tailwind, ShadCN UI et Radix pour les primitives accessibles. C'est exactement la stack utilisée par Vercel, Linear et les meilleures startups SaaS — celle que les devs senior adorent reprendre.", en: "We integrate components into a Next.js App Router project with Tailwind, ShadCN UI and Radix for accessible primitives. This is exactly the stack used by Vercel, Linear and the best SaaS startups — the one senior devs love to pick up." } },
      { icon: Rocket, title: { fr: "Déploiement Vercel + domaine custom + CI/CD", en: "Vercel deployment + custom domain + CI/CD" },
        desc: { fr: "On configure votre projet sur Vercel : déploiement automatique sur chaque push GitHub, preview deployments pour chaque pull request, SSL gratuit, CDN mondial. Votre MVP est en ligne en HTTPS sur votre domaine en moins d'une heure après la fin du build.", en: "We set up your project on Vercel: automatic deployment on every GitHub push, preview deployments on every pull request, free SSL, global CDN. Your MVP is live in HTTPS on your domain less than an hour after the build wraps." } },
      { icon: RotateCcw, title: { fr: "Itérations rapides — un nouvel écran en 30 minutes", en: "Fast iterations — a new screen in 30 minutes" },
        desc: { fr: "Une fois la base posée, ajouter un nouvel écran, un composant ou une variation prend 30 minutes au lieu d'une journée. Vous pouvez itérer après chaque feedback utilisateur, tester 3 versions d'une landing en une après-midi, ajuster le design avant un pitch investisseur. La vélocité devient votre superpouvoir.", en: "Once the foundation is in place, adding a new screen, component or variation takes 30 minutes instead of a day. You can iterate after every user feedback, test 3 landing versions in one afternoon, tweak the design before an investor pitch. Velocity becomes your superpower." } },
      { icon: Shield, title: { fr: "Ownership total : code, repo GitHub, déploiement", en: "Total ownership: code, GitHub repo, deployment" },
        desc: { fr: "Pas de lock-in propriétaire, pas d'abonnement obligatoire, pas de dépendance à GoScaleStudio. On vous transfère le repo GitHub, le compte Vercel, les variables d'environnement, la documentation technique. Demain, n'importe quel dev React reprend le projet sans vous.", en: "No proprietary lock-in, no mandatory subscription, no dependency on GoScaleStudio. We transfer the GitHub repo, the Vercel account, the environment variables, the technical documentation. Tomorrow, any React dev can pick the project up without us." } },
    ],
  },

  howItWorks: {
    headline: { fr: "De votre idée à votre MVP en ligne — un sprint de 5 jours", en: "From your idea to your live MVP — a 5-day sprint" },
    steps: [
      { icon: Lightbulb, title: { fr: "Kickoff & vision produit", en: "Kickoff & product vision" }, duration: { fr: "Jour 1", en: "Day 1" },
        desc: { fr: "On commence par une session de 90 minutes pour décortiquer votre idée : la promesse, les utilisateurs cibles, le user flow principal, les 3-5 écrans clés du MVP. On définit ensemble ce qui rentre dans la v1 et ce qui attend la v2. Le périmètre est verrouillé avant qu'une seule ligne de code soit générée.", en: "We kick off with a 90-minute session to dissect your idea: the promise, the target users, the main user flow, the 3-5 key screens of the MVP. Together we define what makes it into v1 and what waits for v2. The scope is locked before a single line of code is generated." } },
      { icon: Target, title: { fr: "Écriture des prompts v0.dev", en: "Writing v0.dev prompts" }, duration: { fr: "Jour 2 matin", en: "Day 2 AM" },
        desc: { fr: "On rédige des prompts précis pour chaque écran : structure, composants ShadCN à utiliser, état (loading, empty, error), variations responsive, palette de couleurs. C'est cette qualité de prompt qui fait la différence entre un MVP qui ressemble à un template Tailwind générique et un produit qui a une vraie identité.", en: "We craft precise prompts for each screen: structure, ShadCN components to use, states (loading, empty, error), responsive variations, color palette. This prompt quality is what separates an MVP looking like a generic Tailwind template from a product with a real identity." } },
      { icon: Sparkles, title: { fr: "Génération & refacto des composants", en: "Component generation & refactor" }, duration: { fr: "Jour 2 PM → Jour 3", en: "Day 2 PM → Day 3" },
        desc: { fr: "On lance les générations sur v0.dev, on sélectionne les meilleures itérations, puis on refactore : typage TypeScript strict, factorisation des composants partagés (Button, Card, Modal), gestion des états avec hooks React, accessibilité. On obtient une bibliothèque de composants cohérente, pas un patchwork d'écrans IA.", en: "We run generations on v0.dev, pick the best iterations, then refactor: strict TypeScript typing, factoring of shared components (Button, Card, Modal), state handling with React hooks, accessibility. We get a coherent component library, not an AI screen patchwork." } },
      { icon: Settings, title: { fr: "Intégration Next.js & logique applicative", en: "Next.js integration & app logic" }, duration: { fr: "Jour 4", en: "Day 4" },
        desc: { fr: "On assemble les composants dans une app Next.js App Router : routing entre les pages, navigation, état global si nécessaire (Zustand ou React Context), connexion à une base de données légère (Supabase, Neon) ou à des données mockées selon le pack. Le MVP devient cliquable de bout en bout.", en: "We assemble the components in a Next.js App Router app: routing between pages, navigation, global state where needed (Zustand or React Context), connection to a lightweight database (Supabase, Neon) or mock data depending on the pack. The MVP becomes fully clickable end to end." } },
      { icon: Rocket, title: { fr: "Déploiement Vercel & remise des clés", en: "Vercel deployment & handover" }, duration: { fr: "Jour 5", en: "Day 5" },
        desc: { fr: "On crée le projet Vercel, on connecte le repo GitHub, on configure le domaine custom (DNS, SSL), on met en place les analytics (Vercel Analytics, Plausible si demandé). On vous remet ensuite repo, accès Vercel, documentation et une session de 30 minutes pour vous former à publier vos propres mises à jour.", en: "We create the Vercel project, connect the GitHub repo, configure the custom domain (DNS, SSL), set up analytics (Vercel Analytics, Plausible if requested). We then hand over the repo, Vercel access, documentation and a 30-minute session to train you on publishing your own updates." } },
    ],
  },

  stats: [
    { value: "5", suffix: "j", label: { fr: "De l'idée au MVP en ligne", en: "From idea to live MVP" } },
    { value: "100", suffix: "%", label: { fr: "Code TypeScript production", en: "Production TypeScript code" } },
    { value: "-80", suffix: "%", label: { fr: "Temps vs dev traditionnel", en: "Time vs traditional dev" } },
    { value: "60", suffix: "s", label: { fr: "Pour déployer sur Vercel", en: "To ship on Vercel" } },
  ],

  useCases: {
    headline: { fr: "À qui s'adresse vraiment un sprint prototype v0.dev ?", en: "Who is a v0.dev prototype sprint really for?" },
    intro: {
      fr: "Ce service n'est pas pour tout le monde — il est taillé pour des profils précis qui doivent prouver quelque chose vite, avec un budget contraint et une exigence de qualité technique. Voici les 4 cas où nos clients voient le ROI le plus net en moins de 30 jours.",
      en: "This service isn't for everyone — it's built for specific profiles who need to prove something fast, on a tight budget and with serious technical quality. Here are the 4 cases where our clients see the clearest ROI in under 30 days.",
    },
    cases: [
      { icon: Users, sector: { fr: "Founder solo non-technique", en: "Solo non-technical founder" },
        problem: { fr: "Vous avez une idée de SaaS validée par 20 entretiens, mais pas de co-founder dev. Vous bloquez depuis 6 mois à chercher un CTO ou à apprendre Bubble.", en: "You have a SaaS idea validated by 20 interviews, but no dev co-founder. You've been stuck for 6 months looking for a CTO or learning Bubble." },
        solution: { fr: "On vous livre en 5 jours un MVP cliquable avec auth, dashboard et 1-2 features clés. Code React propre que vous pouvez confier à n'importe quel freelance pour la suite.", en: "We deliver in 5 days a clickable MVP with auth, dashboard and 1-2 key features. Clean React code that you can hand off to any freelancer for the next steps." },
        result: { fr: "Premiers utilisateurs en testing 2 semaines après le kickoff, sans dépendre d'un cofondateur technique.", en: "First users in testing 2 weeks after kickoff, without depending on a technical co-founder." } },
      { icon: TrendingUp, sector: { fr: "Startup pre-seed avant levée", en: "Pre-seed startup before fundraising" },
        problem: { fr: "Vous préparez un pitch investisseur dans 3 semaines. Les slides ne suffisent plus — les VCs veulent voir un produit qui marche, pas une promesse.", en: "You're prepping an investor pitch in 3 weeks. Slides aren't enough anymore — VCs want to see a working product, not a promise." },
        solution: { fr: "On livre un MVP démontrable en live pendant le pitch : URL en HTTPS, design pro, parcours utilisateur complet sur 3-5 écrans. Crédibilité technique instantanée.", en: "We deliver a live-demoable MVP for the pitch: HTTPS URL, professional design, full user journey across 3-5 screens. Instant technical credibility." },
        result: { fr: "Taux de réponse VC multiplié par 2-3 grâce à une démo réelle au lieu d'un mockup statique.", en: "VC response rate 2-3× higher thanks to a real demo instead of a static mockup." } },
      { icon: Award, sector: { fr: "Équipe hackathon ou bootcamp", en: "Hackathon or bootcamp team" },
        problem: { fr: "48 ou 72 heures pour livrer un projet présentable face à un jury. Vous n'avez pas le temps de coder une UI de zéro pendant que les autres devs bossent sur la logique métier.", en: "48 or 72 hours to ship something presentable to a jury. You don't have time to hand-code a UI from scratch while the other devs work on business logic." },
        solution: { fr: "Sprint éclair v0.dev en amont du hackathon : on prépare une base de composants + Next.js + Vercel prête, votre équipe se concentre uniquement sur la feature qui fait gagner.", en: "Lightning v0.dev sprint upstream of the hackathon: we prepare a ready-to-go component base + Next.js + Vercel, your team focuses only on the winning feature." },
        result: { fr: "Démo finale visuellement supérieure à 80 % des concurrents, focus équipe préservé sur la valeur ajoutée.", en: "Final demo visually beating 80% of competitors, team focus preserved on the actual added value." } },
      { icon: Briefcase, sector: { fr: "Agence sous-traitant un MVP client", en: "Agency outsourcing a client MVP" },
        problem: { fr: "Vous êtes une agence design, marketing ou growth. Un client vous demande un MVP rapide — vous n'avez pas les ressources dev internes et un freelance casserait votre marge.", en: "You're a design, marketing or growth agency. A client asks for a fast MVP — you don't have internal dev resources and a freelancer would crush your margin." },
        solution: { fr: "On opère en marque blanche : livraison du code source GitHub à votre nom, vous facturez votre client à votre tarif, on reste invisible. Workflow encadré et délai garanti.", en: "We operate white-label: GitHub source code delivered under your name, you bill your client at your rate, we stay invisible. Structured workflow and guaranteed timeline." },
        result: { fr: "Nouvelle offre MVP rentable à proposer à vos clients sans embaucher un dev senior à 5 000 €/mois.", en: "New profitable MVP offering to pitch to your clients without hiring a senior dev at €5,000/month." } },
    ],
  },

  stack: {
    headline: { fr: "La stack technique qu'on déploie", en: "The tech stack we deploy" },
    intro: {
      fr: "On combine les outils IA les plus avancés (v0.dev, Claude Code, Cursor) avec la stack frontend la plus appréciée du marché (Next.js, Tailwind, ShadCN) pour livrer un MVP qui ne ressemble pas à un template recyclé.",
      en: "We combine the most advanced AI tools (v0.dev, Claude Code, Cursor) with the most loved frontend stack on the market (Next.js, Tailwind, ShadCN) to deliver an MVP that doesn't look like a recycled template.",
    },
    tools: [
      { name: "v0.dev", role: { fr: "Génération IA de composants React via prompts en langage naturel", en: "AI-driven React component generation through natural-language prompts" } },
      { name: "Vercel", role: { fr: "Hébergement, CI/CD, preview deployments, domaine custom et SSL", en: "Hosting, CI/CD, preview deployments, custom domain and SSL" } },
      { name: "Next.js", role: { fr: "Framework React App Router pour le routing, SSR et performances", en: "React App Router framework for routing, SSR and performance" } },
      { name: "Tailwind CSS", role: { fr: "Système de design utility-first pour un styling rapide et cohérent", en: "Utility-first design system for fast and consistent styling" } },
      { name: "ShadCN UI", role: { fr: "Bibliothèque de composants prêts à customiser, owned by you", en: "Customizable component library, owned by you" } },
      { name: "Radix UI", role: { fr: "Primitives accessibles (Dialog, Dropdown, Tabs) sans compromis a11y", en: "Accessible primitives (Dialog, Dropdown, Tabs) with zero a11y compromise" } },
      { name: "TypeScript", role: { fr: "Typage strict pour un code maintenable et sans bugs runtime", en: "Strict typing for maintainable, runtime-bug-free code" } },
      { name: "Figma AI", role: { fr: "Brainstorm visuel et exploration de directions design avant les prompts", en: "Visual brainstorm and design direction exploration before prompting" } },
      { name: "Cursor", role: { fr: "IDE IA pour itérer rapidement sur le code généré", en: "AI IDE to iterate fast on generated code" } },
      { name: "Claude Code", role: { fr: "Agent IA pour le refacto, la documentation et la logique applicative", en: "AI agent for refactoring, documentation and app logic" } },
    ],
  },

  pricing: {
    headline: { fr: "Trois packs selon l'ambition de votre MVP", en: "Three packs based on your MVP ambition" },
    intro: {
      fr: "Chaque sprint est forfaitaire, livré dans le délai annoncé, payable en une fois ou 50/50. Vous repartez toujours avec le code source GitHub, l'accès Vercel et la documentation. Aucun abonnement, aucune dépendance à GoScaleStudio.",
      en: "Each sprint is fixed-price, delivered within the announced timeline, payable upfront or 50/50. You always leave with the GitHub source code, Vercel access and documentation. No subscription, no dependency on GoScaleStudio.",
    },
    tiers: [
      { name: { fr: "Starter", en: "Starter" }, price: "300 €", priceNote: { fr: "Landing page MVP single-page", en: "Single-page landing MVP" },
        features: [
          { fr: "1 landing page complète (hero, features, pricing, footer)", en: "1 complete landing page (hero, features, pricing, footer)" },
          { fr: "Génération v0.dev + refacto TypeScript", en: "v0.dev generation + TypeScript refactor" },
          { fr: "Responsive mobile-first + dark mode", en: "Mobile-first responsive + dark mode" },
          { fr: "Déploiement Vercel + domaine custom", en: "Vercel deployment + custom domain" },
          { fr: "Repo GitHub privé à votre nom", en: "Private GitHub repo under your name" },
          { fr: "Livraison en 3 jours · Support 14 jours", en: "Delivered in 3 days · 14-day support" },
        ] },
      { name: { fr: "Pro (recommandé)", en: "Pro (recommended)" }, price: "700 €", priceNote: { fr: "MVP applicatif 5-10 écrans", en: "Functional app MVP, 5-10 screens" }, highlight: true,
        features: [
          { fr: "5 à 10 écrans connectés (landing + app)", en: "5 to 10 connected screens (landing + app)" },
          { fr: "Auth basique (NextAuth, Clerk ou Supabase Auth)", en: "Basic auth (NextAuth, Clerk or Supabase Auth)" },
          { fr: "Base de données légère (Supabase ou Neon)", en: "Lightweight database (Supabase or Neon)" },
          { fr: "Composants ShadCN customisés à votre brand", en: "ShadCN components customized to your brand" },
          { fr: "Analytics Vercel + tracking événements", en: "Vercel Analytics + event tracking" },
          { fr: "Documentation technique + formation 30 min", en: "Technical documentation + 30-min training" },
          { fr: "Livraison en 5 jours · Support 30 jours", en: "Delivered in 5 days · 30-day support" },
        ] },
      { name: { fr: "Enterprise", en: "Enterprise" }, price: "à partir de 1 500 €", priceNote: { fr: "MVP complet + déploiement + itérations", en: "Full MVP + deployment + iterations" },
        features: [
          { fr: "Tout du plan Pro", en: "Everything in Pro" },
          { fr: "10+ écrans avec logique métier avancée", en: "10+ screens with advanced business logic" },
          { fr: "Intégrations API tierces (Stripe, OpenAI, Resend, etc.)", en: "Third-party API integrations (Stripe, OpenAI, Resend, etc.)" },
          { fr: "2 cycles d'itérations après feedback utilisateur", en: "2 iteration cycles after user feedback" },
          { fr: "SEO technique + sitemap + meta tags optimisés", en: "Technical SEO + sitemap + optimized meta tags" },
          { fr: "Onboarding équipe ou freelance pour la suite", en: "Team or freelance onboarding for the next steps" },
          { fr: "Livraison en 10-14 jours · Maintenance 60 jours", en: "Delivered in 10-14 days · 60-day maintenance" },
        ] },
    ],
  },

  faq: [
    { q: { fr: "Quelle est la différence entre une maquette Figma et un prototype v0.dev ?", en: "What's the difference between a Figma mockup and a v0.dev prototype?" },
      a: { fr: "Une maquette Figma est une image statique cliquable, parfaite pour valider un design avant le dev. Un prototype v0.dev est du vrai code React déployé sur une URL en HTTPS — c'est un produit fonctionnel, pas une simulation. Vous pouvez le donner à tester à de vrais utilisateurs, le montrer à un investisseur comme une démo live, ou continuer à itérer dessus. Figma s'arrête là où v0.dev commence : la mise en production réelle.", en: "A Figma mockup is a clickable static image, perfect to validate a design before dev. A v0.dev prototype is real React code shipped to an HTTPS URL — a working product, not a simulation. You can give it to real users to test, show it to an investor as a live demo, or keep iterating on it. Figma stops where v0.dev starts: actual production deployment." } },
    { q: { fr: "Le code généré par v0.dev est-il vraiment réutilisable et maintenable ?", en: "Is v0.dev generated code really reusable and maintainable?" },
      a: { fr: "Brut, non — c'est souvent verbeux, mal typé et plein d'anti-patterns. C'est pourquoi notre travail ne s'arrête jamais à la génération. On refactore systématiquement : extraction de composants partagés, typage TypeScript strict, hooks réutilisables, accessibilité ARIA. Le code que vous recevez est de niveau senior, prêt à être repris par n'importe quel dev React. C'est cette étape de polish qui fait toute la différence avec une livraison brute.", en: "Raw, no — it's often verbose, badly typed and full of anti-patterns. That's why our work never stops at generation. We systematically refactor: shared component extraction, strict TypeScript typing, reusable hooks, ARIA accessibility. The code you receive is senior-level, ready to be picked up by any React dev. This polish step is the entire difference with a raw delivery." } },
    { q: { fr: "Pourquoi utiliser Next.js plutôt que React seul ou un autre framework ?", en: "Why Next.js rather than plain React or another framework?" },
      a: { fr: "Next.js (App Router) est le framework React standard de l'industrie en 2026, maintenu par Vercel (les créateurs de v0.dev). Il gère nativement le routing, le SSR/SSG pour le SEO, l'optimisation des images, les preview deployments. Pour un MVP startup, c'est le choix qui maximise la vélocité aujourd'hui et qui ne vous limite pas demain. Vite, Astro ou Remix sont d'excellents outils mais moins alignés avec l'écosystème v0/Vercel.", en: "Next.js (App Router) is the industry-standard React framework in 2026, maintained by Vercel (the creators of v0.dev). It handles routing, SEO-friendly SSR/SSG, image optimization, preview deployments out of the box. For a startup MVP, it's the choice that maximizes velocity today and doesn't limit you tomorrow. Vite, Astro or Remix are excellent tools but less aligned with the v0/Vercel ecosystem." } },
    { q: { fr: "Peut-on ajouter un backend, une base de données ou des paiements ?", en: "Can we add a backend, a database or payments?" },
      a: { fr: "Oui, c'est inclus dès le pack Pro et étendu dans l'Enterprise. On connecte typiquement Supabase ou Neon pour la base de données Postgres, Clerk ou NextAuth pour l'authentification, Stripe pour les paiements, Resend pour les emails transactionnels, OpenAI ou Anthropic pour des fonctionnalités IA. Next.js gère les API routes côté serveur, donc tout vit dans le même repo, sans backend séparé à maintenir.", en: "Yes, it's included from the Pro pack and extended in Enterprise. We typically wire Supabase or Neon for the Postgres database, Clerk or NextAuth for authentication, Stripe for payments, Resend for transactional emails, OpenAI or Anthropic for AI features. Next.js handles server-side API routes, so everything lives in the same repo with no separate backend to maintain." } },
    { q: { fr: "Combien coûte le déploiement Vercel après la livraison ?", en: "How much does Vercel deployment cost after delivery?" },
      a: { fr: "Pour un MVP startup avec un trafic naissant, le plan Vercel Hobby (gratuit) suffit largement les premiers mois : 100 GB de bande passante, builds illimités, domaine custom et SSL inclus. Quand vous dépassez ces limites ou pour usage commercial sérieux, le plan Pro est à 20 $/mois/membre. Comparé à un hébergement traditionnel + CDN + CI/CD à assembler vous-même, c'est imbattable.", en: "For a startup MVP with early traffic, the Vercel Hobby plan (free) is plenty for the first months: 100 GB bandwidth, unlimited builds, custom domain and SSL included. When you outgrow those limits or for serious commercial use, the Pro plan is $20/month/member. Compared to a traditional hosting + CDN + CI/CD setup, it's unbeatable." } },
    { q: { fr: "À qui appartient le code source et le projet Vercel ?", en: "Who owns the source code and Vercel project?" },
      a: { fr: "100 % à vous, dès la livraison. On crée le repo GitHub directement sur votre compte (ou sur une organisation à votre nom), on transfère le projet Vercel sur votre compte, on vous remet toutes les variables d'environnement et secrets. GoScaleStudio n'a aucun accès résiduel, aucune licence sur le code, aucune dépendance technique. Si vous voulez nous revoir pour la v2, c'est par choix, pas par obligation.", en: "100% yours, from delivery. We create the GitHub repo directly on your account (or on an organization in your name), transfer the Vercel project to your account, hand over all environment variables and secrets. GoScaleStudio retains zero access, zero license on the code, zero technical dependency. If you want to come back for v2, it's by choice, not obligation." } },
    { q: { fr: "Le MVP supporte-t-il plusieurs langues (i18n) ?", en: "Does the MVP support multiple languages (i18n)?" },
      a: { fr: "Oui, on intègre next-intl ou next-i18next selon votre cas. La structure permet d'ajouter le français, l'anglais et toute autre langue avec un fichier JSON par locale. C'est particulièrement pertinent pour les startups qui ciblent à la fois l'Afrique francophone et le marché international anglophone. L'i18n est inclus de base dans les packs Pro et Enterprise, en option (+150 €) pour le Starter.", en: "Yes, we integrate next-intl or next-i18next depending on your case. The structure lets you add French, English and any other language with one JSON file per locale. Especially relevant for startups targeting both francophone Africa and the international English market. i18n is included by default in Pro and Enterprise packs, optional (+€150) for Starter." } },
    { q: { fr: "Et si je veux un design vraiment custom, pas un look ShadCN générique ?", en: "What if I want a truly custom design, not a generic ShadCN look?" },
      a: { fr: "C'est exactement notre valeur ajoutée. v0.dev brut a tendance à produire des écrans qui se ressemblent tous. Nous, on commence par une exploration de direction design (palette, typographie, ton visuel, références d'inspiration comme Linear, Vercel, Stripe), puis on injecte ces contraintes dans chaque prompt v0. Les composants ShadCN sont entièrement customisés via Tailwind pour matcher votre identité. Résultat : un MVP qui a un vrai caractère, pas un template.", en: "That's exactly our value-add. Raw v0.dev tends to produce screens that all look alike. We start with a design direction exploration (palette, typography, visual tone, inspirational references like Linear, Vercel, Stripe), then inject those constraints into every v0 prompt. ShadCN components are fully customized via Tailwind to match your identity. The result: an MVP with real character, not a template." } },
  ],

  relatedSlugs: ["maquette-ui-ux", "maquette-figma-48h", "site-wordpress-seo", "chatbot-gpt-site-web"],

  cta: {
    headline: { fr: "Votre idée mérite mieux qu'un PDF Notion — et plus rapide qu'un dev à 3 mois", en: "Your idea deserves better than a Notion PDF — and faster than a 3-month dev sprint" },
    desc: { fr: "30 minutes pour cadrer votre vision, 5 jours pour livrer un MVP React déployé sur Vercel. Code TypeScript à vous, déploiement à vous, prochaine étape à votre rythme. Audit produit 100 % gratuit pour démarrer.", en: "30 minutes to scope your vision, 5 days to ship a React MVP deployed on Vercel. TypeScript code yours, deployment yours, next step at your own pace. 100% free product audit to kick things off." },
    primaryLabel: { fr: "Lancer mon sprint MVP", en: "Launch my MVP sprint" },
    secondaryLabel: { fr: "Voir tous nos services", en: "See all our services" },
  },
};

/* ══════════════════════════════════════════════════════════════
   Export : Map des 15 pages
   ══════════════════════════════════════════════════════════════ */

export const servicePages: Record<string, ServicePage> = {
  // Pillar
  "automatisation-no-code": automatisationNoCode,
  "chatbot-ia": chatbotIa,
  "callbot-ia-vocal": callbotIaVocal,
  "site-wordpress-seo": siteWordpressSeo,
  "maquette-ui-ux": maquetteUiUx,
  // Long-tail
  "automatisation-make": automatisationMake,
  "automatisation-n8n": automatisationN8n,
  "automatisation-zapier": automatisationZapier,
  "chatbot-whatsapp-business": chatbotWhatsappBusiness,
  "chatbot-gpt-site-web": chatbotGptSiteWeb,
  "callbot-vapi": callbotVapi,
  "agent-vocal-ia-24-7": agentVocalIa247,
  "seo-google-page-1": seoGooglePage1,
  "maquette-figma-48h": maquetteFigma48h,
  "prototype-v0-startup": prototypeV0Startup,
};

export const allServiceSlugs: string[] = Object.keys(servicePages);

export const pillarSlugs: string[] = Object.values(servicePages)
  .filter((s) => s.type === "pillar")
  .map((s) => s.slug);

export const longTailSlugs: string[] = Object.values(servicePages)
  .filter((s) => s.type === "long-tail")
  .map((s) => s.slug);

export function getService(slug: string): ServicePage | undefined {
  return servicePages[slug];
}
