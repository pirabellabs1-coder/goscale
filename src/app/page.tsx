"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useProjects } from "@/lib/ProjectContext";
import { categoryColors } from "@/lib/data";
import { useT, useLang, useSyncHtmlLang } from "@/lib/i18n";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Carousel from "@/components/public/Carousel";
import RichText from "@/components/public/RichText";
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
  { slug: "automatisation-no-code", icon: Zap, color: "emerald",
    title: { fr: "Automatisation Métier", en: "Business Automation" },
    desc: { fr: "Workflows intelligents avec Make, n8n ou Zapier. On connecte vos outils, on supprime les tâches répétitives, on vous rend +10h/semaine.", en: "Smart workflows with Make, n8n or Zapier. We connect your tools, eliminate repetitive tasks, and give you back 10+ hours every week." } },
  { slug: "callbot-ia-vocal", icon: Phone, color: "blue",
    title: { fr: "CallBot & Assistant Vocal IA", en: "AI Voice Agent & Callbot" },
    desc: { fr: "Agents vocaux 24/7 via Vapi, Twilio ou Bland AI. Prise de RDV, qualification de leads, support client — sans intervention humaine.", en: "24/7 voice agents powered by Vapi, Twilio or Bland AI. Appointment booking, lead qualification, customer support — no human touch needed." } },
  { slug: "chatbot-ia", icon: Bot, color: "brand",
    title: { fr: "ChatBot IA sur Mesure", en: "Custom AI Chatbot" },
    desc: { fr: "Chatbots GPT-4 déployés sur WhatsApp, site web ou Messenger. Entraînés sur vos données, ils convertissent et assistent vos clients.", en: "GPT-4 chatbots deployed on WhatsApp, your website or Messenger. Trained on your data — they convert and assist your customers." } },
  { slug: "site-wordpress-seo", icon: Globe, color: "purple",
    title: { fr: "Site WordPress + SEO", en: "WordPress Site + SEO" },
    desc: { fr: "Sites vitrines rapides et SEO-ready avec WordPress + Elementor. Optimisation technique, contenu et netlinking pour atteindre la page 1.", en: "Fast, SEO-ready sites built with WordPress + Elementor. Technical optimization, content and link-building to reach page one." } },
  { slug: "maquette-ui-ux", icon: Palette, color: "amber",
    title: { fr: "Maquette UI/UX IA", en: "AI-Powered UI/UX Mockups" },
    desc: { fr: "Prototypes cliquables livrés en 48-72h avec Figma AI et v0.dev. Design moderne, mobile-first, prêt pour le développement.", en: "Clickable prototypes delivered in 48-72h with Figma AI and v0.dev. Modern, mobile-first design, ready for development." } },
];

const processSteps = [
  {
    num: "01", icon: Search,
    title: { fr: "Appel Découverte", en: "Discovery Call" },
    desc: {
      fr: "On décortique votre business, vos vrais points de blocage et ce qui vous fera changer d'échelle. Vous repartez avec une vision claire — même si on ne travaille pas ensemble.",
      en: "We unpack your business, your real blockers and what will help you scale. You leave with a clear vision — even if we don't end up working together.",
    },
    duration: { fr: "30 min", en: "30 min" },
    deliverable: { fr: "Diagnostic verbal + 3 quick wins", en: "Verbal diagnosis + 3 quick wins" },
    tag: { fr: "100 % gratuit · Zéro engagement", en: "100% free · No commitment" },
  },
  {
    num: "02", icon: Eye,
    title: { fr: "Audit & Diagnostic", en: "Audit & Diagnosis" },
    desc: {
      fr: "On scanne votre stack, vos workflows et vos points de friction. On chiffre concrètement le temps perdu, les leads qui passent à travers et l'argent laissé sur la table.",
      en: "We scan your stack, workflows and friction points. We put a concrete number on the time you lose, the leads that slip through and the money left on the table.",
    },
    duration: { fr: "24 - 48h", en: "24 - 48h" },
    deliverable: { fr: "Rapport personnalisé + roadmap priorisée", en: "Tailored report + prioritized roadmap" },
    tag: { fr: "Insights chiffrés", en: "Numbers-backed insights" },
  },
  {
    num: "03", icon: FileCheck,
    title: { fr: "Stratégie & Devis", en: "Strategy & Quote" },
    desc: {
      fr: "Un plan d'attaque sur mesure livré sous 24h. Pas de jargon, pas de surprises — juste le scope précis, les délais fermes et un prix sans extras cachés.",
      en: "A tailored game plan delivered within 24h. No jargon, no surprises — just the exact scope, firm timeline and a price with no hidden extras.",
    },
    duration: { fr: "< 24h", en: "< 24h" },
    deliverable: { fr: "Roadmap + devis ferme + planning", en: "Roadmap + firm quote + schedule" },
    tag: { fr: "Prix transparent · Pas de surprises", en: "Transparent price · No surprises" },
  },
  {
    num: "04", icon: Settings,
    title: { fr: "Développement", en: "Development" },
    desc: {
      fr: "On construit votre solution en sprints courts. Vous voyez des previews concrètes à chaque jalon, vous validez à votre rythme — et vous restez maître de la direction.",
      en: "We build your solution in short sprints. You see real previews at every milestone, validate at your own pace — and stay in control of the direction.",
    },
    duration: { fr: "3 - 14 jours", en: "3 - 14 days" },
    deliverable: { fr: "Previews live + accès Slack/WhatsApp", en: "Live previews + Slack/WhatsApp access" },
    tag: { fr: "Vous gardez la main", en: "You stay in control" },
  },
  {
    num: "05", icon: Rocket,
    title: { fr: "Tests & Livraison", en: "Testing & Delivery" },
    desc: {
      fr: "On stress-test l'ensemble, on peaufine les détails, on met en production. Si quelque chose cloche après le go-live, on reprend — sans facture additionnelle, sans débat.",
      en: "We stress-test everything, polish the details, ship to production. If anything breaks after go-live, we fix it — at no extra cost, no debate.",
    },
    duration: { fr: "24 - 72h", en: "24 - 72h" },
    deliverable: { fr: "Solution en production + documentation", en: "Live solution + documentation" },
    tag: { fr: "Satisfait ou repris", en: "Satisfied or redone" },
  },
  {
    num: "06", icon: Handshake,
    title: { fr: "Support & Scale", en: "Support & Scale" },
    desc: {
      fr: "Formation prise en main, 30 jours de support prioritaire offerts, et un partenaire long-terme pour faire grandir votre setup au rythme de votre croissance.",
      en: "Onboarding training, 30 days of priority support included, and a long-term partner to grow your setup alongside your business.",
    },
    duration: { fr: "30 jours +", en: "30 days +" },
    deliverable: { fr: "Formation 1:1 + support prioritaire", en: "1:1 training + priority support" },
    tag: { fr: "Partenaire long-terme", en: "Long-term partner" },
  },
];

const stats = [
  { value: 65, suffix: "+", label: { fr: "Projets livrés", en: "Projects delivered" } },
  { value: 5, suffix: ".0/5", label: { fr: "Note ComeUp", en: "ComeUp rating" } },
  { value: 15, suffix: "h+", label: { fr: "Économisées/sem", en: "Hours saved/week" } },
  { value: 48, suffix: "h", label: { fr: "Délai moyen", en: "Avg delivery" } },
];

// Testimonials are now fetched from /api/testimonials (admin-managed via /gs-panel-.../testimonials)
type DBTestimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  status: string;
  source: string;
  reply: string;
  review_date: string | null;
  created_at: string;
};

const faqItems: { cat: { fr: string; en: string }; q: { fr: string; en: string }; a: { fr: string; en: string } }[] = [
  // ── Tarifs & paiement ──
  {
    cat: { fr: "Tarifs", en: "Pricing" },
    q: { fr: "Combien coûte un projet GoScaleStudio ?", en: "How much does a GoScaleStudio project cost?" },
    a: { fr: "Tout commence par notre offre Audit à 15 €  qui clarifie votre besoin. Ensuite, comptez 30 à 40 € pour 1 à 3 scénarios simples, 50 € pour un scénario avancé, 100 à 500 € pour une automatisation sur mesure, et 500 € pour 30 jours de maintenance. Un consulting de 30 minutes coûte 30 €. Devis personnalisé gratuit sous 24h.", en: "Everything starts with our €15 Audit offer that clarifies your needs. Then expect €30-40 for 1 to 3 simple scenarios, €50 for an advanced scenario, €100-500 for a custom automation, and €500 for 30 days of maintenance. A 30-minute consulting call is €30. Free personalized quote within 24h." },
  },
  {
    cat: { fr: "Tarifs", en: "Pricing" },
    q: { fr: "L'offre de base à 15 €, qu'est-ce qu'elle inclut exactement ?", en: "What does the €15 base offer include exactly?" },
    a: { fr: "L'Audit à 15 € comprend une analyse complète de votre activité, l'identification des automatisations possibles, l'explication simple de votre futur système et des recommandations personnalisées. C'est le point de départ idéal si vous débutez et ne savez pas par où commencer.", en: "The €15 Audit includes a full analysis of your business, identification of possible automations, a plain-language explanation of your future system, and personalized recommendations. The perfect starting point if you're new and don't know where to begin." },
  },
  {
    cat: { fr: "Tarifs", en: "Pricing" },
    q: { fr: "Quels modes de paiement acceptez-vous ?", en: "Which payment methods do you accept?" },
    a: { fr: "Nous acceptons Stripe (CB), virement bancaire, PayPal et Wise pour l'international. Pour les projets supérieurs à 200 €, le paiement se fait en deux fois : 50 % au lancement, 50 % à la livraison.", en: "We accept Stripe (cards), bank transfer, PayPal and Wise for international clients. For projects above €200, payment is split 50% at kickoff, 50% on delivery." },
  },
  {
    cat: { fr: "Tarifs", en: "Pricing" },
    q: { fr: "Y a-t-il des frais cachés ou un abonnement ?", en: "Are there hidden fees or any subscription?" },
    a: { fr: "Non, aucun frais caché. Vous payez une fois, vous êtes propriétaire de votre solution. Les seuls coûts récurrents possibles viennent des outils tiers (Make, OpenAI, Twilio...) que vous payez directement et selon votre usage.", en: "No, no hidden fees. You pay once and own your solution. The only possible recurring costs come from third-party tools (Make, OpenAI, Twilio...) that you pay directly based on your own usage." },
  },

  // ── Delais & livraison ──
  {
    cat: { fr: "Délais", en: "Timelines" },
    q: { fr: "Quels sont vos délais de livraison ?", en: "What are your delivery timelines?" },
    a: { fr: "La plupart des projets sont livrés entre 3 et 14 jours selon la complexité. Les maquettes UI/UX sont livrées en 48 à 72h. L'audit à 15 € est rendu sous 24 à 48h. Pour les chatbots et automatisations standards, comptez 5 à 7 jours ouvrés.", en: "Most projects are delivered in 3 to 14 days depending on complexity. UI/UX mockups land in 48-72h. The €15 audit is delivered within 24-48h. For standard chatbots and automations, count 5 to 7 business days." },
  },
  {
    cat: { fr: "Délais", en: "Timelines" },
    q: { fr: "Comment se déroule un projet étape par étape ?", en: "What does a project look like step by step?" },
    a: { fr: "Notre processus en 6 étapes : 1) Appel découverte de 30 min, 2) Audit et diagnostic, 3) Stratégie et devis sous 24h, 4) Développement avec previews réguliers, 5) Tests, ajustements et livraison, 6) Formation, suivi 30 jours et accompagnement pour scaler.", en: "Our 6-step process: 1) 30-min discovery call, 2) Audit and diagnosis, 3) Strategy and quote within 24h, 4) Development with regular previews, 5) Testing, adjustments and delivery, 6) Training, 30-day follow-up and scaling support." },
  },

  // ── Services ──
  {
    cat: { fr: "Services", en: "Services" },
    q: { fr: "Quels services proposez-vous ?", en: "What services do you offer?" },
    a: { fr: "GoScaleStudio propose 5 expertises : automatisation métier (Make, n8n, Zapier), callbots et assistants vocaux IA (Vapi, Twilio, Bland AI), chatbots IA sur mesure (GPT-4, WhatsApp, Botpress), sites WordPress + SEO, et maquettes UI/UX (Figma AI, v0.dev).", en: "GoScaleStudio offers 5 specialties: business automation (Make, n8n, Zapier), callbots and AI voice agents (Vapi, Twilio, Bland AI), custom AI chatbots (GPT-4, WhatsApp, Botpress), WordPress sites + SEO, and UI/UX mockups (Figma AI, v0.dev)." },
  },
  {
    cat: { fr: "Services", en: "Services" },
    q: { fr: "Quels outils et technologies utilisez-vous ?", en: "Which tools and technologies do you use?" },
    a: { fr: "Pour l'automatisation : Make, n8n, Zapier, HubSpot, Notion. Pour les chatbots : Botpress, Voiceflow, GPT-4, Claude, WhatsApp Business API. Pour les callbots : Vapi, Twilio, Bland AI. Pour le web : WordPress, Elementor, RankMath. Pour le design : Figma AI, v0.dev. Plus de 15 outils maîtrisés au quotidien.", en: "For automation: Make, n8n, Zapier, HubSpot, Notion. For chatbots: Botpress, Voiceflow, GPT-4, Claude, WhatsApp Business API. For callbots: Vapi, Twilio, Bland AI. For web: WordPress, Elementor, RankMath. For design: Figma AI, v0.dev. Over 15 tools mastered day-to-day." },
  },
  {
    cat: { fr: "Services", en: "Services" },
    q: { fr: "Pour quels secteurs d'activité travaillez-vous ?", en: "Which industries do you work with?" },
    a: { fr: "Nous accompagnons aussi bien des agences immobilières, e-commerces, cliniques, cabinets de conseil, startups fintech, agences marketing, freelances et PME. Notre approche s'adapte à votre métier : on commence par comprendre votre activité avant de proposer une solution.", en: "We work with real estate agencies, e-commerces, clinics, consulting firms, fintech startups, marketing agencies, freelancers and SMEs alike. Our approach adapts to your industry: we start by understanding your business before suggesting a solution." },
  },

  // ── Apres livraison ──
  {
    cat: { fr: "Après livraison", en: "After delivery" },
    q: { fr: "Comment fonctionne le support après livraison ?", en: "How does post-delivery support work?" },
    a: { fr: "Chaque projet inclut un suivi de 30 jours offert : support réactif par email et WhatsApp, ajustements mineurs gratuits, et formation à la prise en main. Au-delà, le pack Maintenance 30 jours à 500 € couvre les évolutions, monitoring et ajustements continus.", en: "Every project includes a free 30-day follow-up: responsive email + WhatsApp support, free minor adjustments, and onboarding training. Beyond that, the €500 30-day Maintenance pack covers evolutions, monitoring and continuous adjustments." },
  },
  {
    cat: { fr: "Après livraison", en: "After delivery" },
    q: { fr: "Puis-je modifier mon chatbot, callbot ou automatisation après livraison ?", en: "Can I modify my chatbot, callbot or automation after delivery?" },
    a: { fr: "Oui, totalement. Vous êtes propriétaire de votre solution avec accès complet. Nous vous formons à son utilisation et à sa modification. Si vous préférez déléguer, on reste disponibles pour faire évoluer le système avec vous.", en: "Yes, fully. You own your solution with complete access. We train you to use and modify it. If you'd rather delegate, we remain available to evolve the system with you." },
  },
  {
    cat: { fr: "Après livraison", en: "After delivery" },
    q: { fr: "Que se passe-t-il si l'automatisation tombe en panne ?", en: "What happens if my automation breaks?" },
    a: { fr: "Pendant les 30 jours offerts, on intervient gratuitement pour tout bug ou panne lié à notre code. Au-delà, le pack Maintenance couvre les corrections. La majorité des pannes viennent de changements d'API tiers (Make, OpenAI...) — on détecte et réagit rapidement.", en: "During the free 30-day window, we fix any bug or outage linked to our code at no cost. Beyond that, the Maintenance pack covers fixes. Most outages come from third-party API changes (Make, OpenAI...) — we detect and react quickly." },
  },

  // ── International & collaboration ──
  {
    cat: { fr: "Collaboration", en: "Collaboration" },
    q: { fr: "Travaillez-vous avec des entreprises hors de France ?", en: "Do you work with companies outside France?" },
    a: { fr: "Absolument. Nous accompagnons des clients dans toute la francophonie (France, Belgique, Suisse, Canada, Afrique francophone) et à l'international. Tout se fait à distance via Zoom ou Google Meet. Paiements internationaux acceptés via Wise et PayPal.", en: "Absolutely. We work with clients across the entire francophone world (France, Belgium, Switzerland, Canada, francophone Africa) and internationally. Everything is done remotely via Zoom or Google Meet. International payments accepted via Wise and PayPal." },
  },
  {
    cat: { fr: "Collaboration", en: "Collaboration" },
    q: { fr: "Qui est derrière GoScaleStudio ?", en: "Who is behind GoScaleStudio?" },
    a: { fr: "GoScaleStudio est dirigé par Fidah IMOROU BOUKARI, CEO et fondateur, également co-fondateur de Pirabel Labs (agence web marketing). L'équipe combine expertise en automatisation, IA et marketing digital pour livrer des solutions performantes et alignées sur vos objectifs business.", en: "GoScaleStudio is led by Fidah IMOROU BOUKARI, CEO and founder, also co-founder of Pirabel Labs (web marketing agency). The team combines expertise in automation, AI and digital marketing to deliver performant solutions aligned with your business goals." },
  },

  // ── Securite & confidentialite ──
  {
    cat: { fr: "Sécurité", en: "Security" },
    q: { fr: "Comment garantissez-vous la confidentialité de mes données ?", en: "How do you guarantee the confidentiality of my data?" },
    a: { fr: "Nous signons un NDA si vous le souhaitez. Toutes les données sont stockées sur des serveurs RGPD-compliant (UE). Les credentials et accès clients sont gérés dans des coffres-forts chiffrés (1Password). Aucune donnée n'est partagée avec des tiers sans votre accord écrit.", en: "We can sign an NDA on request. All data is stored on GDPR-compliant servers (EU). Client credentials and access are managed in encrypted vaults (1Password). No data is shared with third parties without your written consent." },
  },
  {
    cat: { fr: "Sécurité", en: "Security" },
    q: { fr: "Êtes-vous conformes au RGPD ?", en: "Are you GDPR compliant?" },
    a: { fr: "Oui. Nous concevons toutes nos solutions en respectant le RGPD : minimisation des données, consentement explicite, droit à l'oubli, hébergement UE et registre de traitements. Pour les chatbots qui collectent des données clients, nous intégrons les mentions légales adéquates.", en: "Yes. All our solutions are designed with GDPR in mind: data minimization, explicit consent, right to be forgotten, EU hosting and processing register. For chatbots collecting customer data, we include the appropriate legal notices." },
  },

  // ── IA ──
  {
    cat: { fr: "IA", en: "AI" },
    q: { fr: "Quels modèles d'IA utilisez-vous pour les chatbots et callbots ?", en: "Which AI models do you use for chatbots and callbots?" },
    a: { fr: "Selon le besoin : GPT-4 et GPT-4o (OpenAI) pour les chatbots conversationnels, Claude (Anthropic) pour le contenu long et le raisonnement, Gemini pour les usages Google Workspace. Pour les callbots, nous utilisons les voix premium de Vapi, ElevenLabs et OpenAI TTS pour un rendu humain.", en: "Based on the use case: GPT-4 and GPT-4o (OpenAI) for conversational chatbots, Claude (Anthropic) for long-form content and complex reasoning, Gemini for Google Workspace use cases. For callbots we use premium voices from Vapi, ElevenLabs and OpenAI TTS for a natural feel." },
  },

  // ── Définitions / Glossaire (SEO long-tail) ──
  {
    cat: { fr: "Définitions", en: "Definitions" },
    q: { fr: "Qu'est-ce que l'automatisation no-code et comment ça fonctionne ?", en: "What is no-code automation and how does it work?" },
    a: { fr: "L'automatisation no-code consiste à créer des séquences d'actions automatiques entre vos outils (CRM, email, agenda, e-commerce, réseaux sociaux...) sans écrire une seule ligne de code. À l'aide de plateformes comme Make, n8n ou Zapier, on connecte les API de vos applications pour qu'elles communiquent entre elles : un nouveau client arrive sur votre site, son email atterrit automatiquement dans votre CRM, une tâche est créée dans Notion, et un message WhatsApp de bienvenue est envoyé — le tout en quelques secondes, sans intervention humaine.", en: "No-code automation means building sequences of automatic actions between your tools (CRM, email, calendar, e-commerce, social media...) without writing a single line of code. Platforms like Make, n8n or Zapier connect your apps' APIs so they talk to each other: a new customer hits your site, their email lands in your CRM, a task is created in Notion, and a welcome WhatsApp message is sent — all in seconds, with zero human input." },
  },
  {
    cat: { fr: "Définitions", en: "Definitions" },
    q: { fr: "Qu'est-ce qu'un chatbot IA et qu'apporte-t-il à mon entreprise ?", en: "What is an AI chatbot and what does it bring to my business?" },
    a: { fr: "Un chatbot IA est un assistant conversationnel propulsé par un modèle de langage (GPT-4, Claude, Gemini) qui comprend le langage naturel et répond comme le ferait un humain. Contrairement aux anciens chatbots à scénarios rigides, un chatbot IA s'adapte aux questions imprévues, accède à votre base de connaissances et peut effectuer des actions (prendre RDV, créer un devis, transmettre une demande). Bénéfices concrets : réponses 24/7, +35 % de conversions en moyenne, support client allégé.", en: "An AI chatbot is a conversational assistant powered by a language model (GPT-4, Claude, Gemini) that understands natural language and responds like a human. Unlike older rule-based chatbots, an AI chatbot handles unexpected questions, taps into your knowledge base, and can perform actions (book a meeting, generate a quote, escalate a request). Real benefits: 24/7 answers, +35% conversions on average, lighter support load." },
  },
  {
    cat: { fr: "Définitions", en: "Definitions" },
    q: { fr: "Qu'est-ce qu'un callbot vocal IA et quelle différence avec un standard téléphonique ?", en: "What is a voice AI callbot and how is it different from a phone IVR?" },
    a: { fr: "Un callbot vocal est un assistant téléphonique automatisé propulsé par une IA conversationnelle. À la différence d'un standard classique (SVI à touches), il comprend la voix naturelle, dialogue, prend des décisions et exécute des actions (prise de RDV, qualification de lead, envoi de SMS de confirmation). Outils utilisés : Vapi, Twilio, Bland AI pour la téléphonie, ElevenLabs et OpenAI TTS pour des voix humaines. Cas d'usage : cliniques, agences immobilières, services après-vente.", en: "A voice callbot is an automated phone assistant powered by conversational AI. Unlike a classic IVR (touch-tone menu), it understands natural speech, holds a dialogue, makes decisions and performs actions (book a meeting, qualify a lead, send a confirmation SMS). Stack: Vapi, Twilio, Bland AI for telephony, ElevenLabs and OpenAI TTS for human-sounding voices. Common use cases: clinics, real estate agencies, customer service." },
  },
  {
    cat: { fr: "Définitions", en: "Definitions" },
    q: { fr: "Qu'est-ce que le SEO (référencement naturel) et pourquoi c'est important ?", en: "What is SEO and why does it matter?" },
    a: { fr: "Le SEO (Search Engine Optimization) est l'ensemble des techniques visant à positionner un site en première page de Google et des autres moteurs de recherche, sans payer de publicité. Il combine SEO technique (vitesse, structure du code, indexation), SEO on-page (contenu, mots-clés, balises meta) et SEO off-page (netlinking, autorité). Un bon SEO multiplie le trafic organique par 5 en moyenne et génère des leads qualifiés sur le long terme — sans budget publicitaire récurrent.", en: "SEO (Search Engine Optimization) is the set of techniques used to rank a website on the first page of Google and other search engines without paying for ads. It combines technical SEO (speed, code structure, indexing), on-page SEO (content, keywords, meta tags) and off-page SEO (backlinks, authority). Strong SEO typically multiplies organic traffic by 5 and generates qualified leads long-term — without a recurring ad budget." },
  },
  {
    cat: { fr: "Définitions", en: "Definitions" },
    q: { fr: "Qu'est-ce qu'une maquette UI/UX et à quoi ça sert avant de développer ?", en: "What is a UI/UX mockup and why bother before coding?" },
    a: { fr: "Une maquette UI/UX est une représentation visuelle et interactive d'un produit numérique (application, site, dashboard) avant son développement. UI = User Interface (l'apparence) ; UX = User Experience (la fluidité du parcours). Elle permet de valider le design, tester l'ergonomie auprès d'utilisateurs réels et convaincre des investisseurs avant d'engager des frais de développement. Avec Figma AI et v0.dev, nous livrons des prototypes cliquables en 48 à 72h.", en: "A UI/UX mockup is a visual, interactive representation of a digital product (app, website, dashboard) before development. UI = User Interface (the look); UX = User Experience (the flow). It validates the design, tests ergonomics with real users and convinces investors before committing dev budget. With Figma AI and v0.dev we deliver clickable prototypes in 48-72h." },
  },
  {
    cat: { fr: "Définitions", en: "Definitions" },
    q: { fr: "Quelle différence entre Make, n8n et Zapier ?", en: "What's the difference between Make, n8n and Zapier?" },
    a: { fr: "Les trois sont des plateformes d'automatisation no-code. Zapier : la plus simple, idéale pour des automatisations linéaires (déclencheur → action), pricing à la tâche. Make (ex-Integromat) : plus puissant, supporte les boucles, les conditions complexes et les routeurs, pricing à l'opération (plus économique pour les volumes). n8n : open-source, auto-hébergeable, parfait pour la confidentialité et les besoins sur mesure. Nous choisissons le bon outil selon votre cas et votre budget.", en: "All three are no-code automation platforms. Zapier: the simplest, perfect for linear automations (trigger → action), priced per task. Make (formerly Integromat): more powerful, supports loops, complex conditions and routers, priced per operation (cheaper at volume). n8n: open-source, self-hostable, ideal for privacy and custom needs. We pick the right tool based on your use case and budget." },
  },
  {
    cat: { fr: "Définitions", en: "Definitions" },
    q: { fr: "Qu'est-ce qu'un workflow d'automatisation ?", en: "What is an automation workflow?" },
    a: { fr: "Un workflow est une suite ordonnée d'étapes automatisées qui s'enchaînent suite à un déclencheur (trigger). Exemple : nouveau message WhatsApp → IA qualifie l'intention → si lead chaud, création dans HubSpot + tâche pour un commercial ; si question simple, réponse automatique de la FAQ. Un workflow bien conçu remplace plusieurs heures de travail manuel par une exécution instantanée et fiable.", en: "A workflow is an ordered sequence of automated steps triggered by an event. Example: new WhatsApp message → AI classifies intent → if hot lead, create in HubSpot + assign a sales task; if simple question, reply with the matching FAQ. A well-designed workflow replaces hours of manual work with instant, reliable execution." },
  },
  {
    cat: { fr: "Définitions", en: "Definitions" },
    q: { fr: "C'est quoi GPT-4, Claude et la différence entre ces IA ?", en: "What are GPT-4, Claude, and what's the difference between these AIs?" },
    a: { fr: "GPT-4 (et GPT-4o) sont les modèles de langage d'OpenAI : excellents en conversation grand public, génération de contenu marketing, assistance client. Claude (par Anthropic) excelle dans le raisonnement complexe, l'analyse de longs documents et le respect strict des consignes — idéal pour les usages B2B sensibles. Gemini (Google) est performant pour l'intégration avec Google Workspace. Nous choisissons le modèle selon le cas d'usage, le budget et les exigences de confidentialité.", en: "GPT-4 (and GPT-4o) are OpenAI's language models: great for consumer conversation, marketing content generation and customer support. Claude (by Anthropic) excels at complex reasoning, long-document analysis and strict instruction-following — ideal for sensitive B2B use cases. Gemini (Google) shines for Google Workspace integration. We pick the model based on use case, budget and privacy requirements." },
  },
  {
    cat: { fr: "Définitions", en: "Definitions" },
    q: { fr: "Qu'est-ce qu'un site WordPress optimisé SEO ?", en: "What is an SEO-optimized WordPress site?" },
    a: { fr: "Un site WordPress optimisé SEO combine un thème léger et rapide, une structure HTML propre, un plugin SEO professionnel (RankMath ou Yoast), des balises meta soignées, des URLs lisibles, une vitesse de chargement inférieure à 2 secondes, et une stratégie de contenu ciblée sur les bons mots-clés. C'est cette combinaison qui permet d'atteindre la première page de Google de manière durable, sans dépendre des publicités payantes.", en: "An SEO-optimized WordPress site combines a fast, lightweight theme, clean HTML structure, a professional SEO plugin (RankMath or Yoast), polished meta tags, readable URLs, sub-2-second load time and a content strategy aimed at the right keywords. This combination is what gets you sustainably ranked on Google's first page without relying on paid ads." },
  },
  {
    cat: { fr: "Définitions", en: "Definitions" },
    q: { fr: "C'est quoi WhatsApp Business API et comment l'utiliser pour mon business ?", en: "What is the WhatsApp Business API and how can I use it?" },
    a: { fr: "WhatsApp Business API est l'interface professionnelle de WhatsApp permettant d'envoyer/recevoir des messages à grande échelle, d'intégrer un chatbot IA, et de gérer le service client de manière automatisée tout en respectant les règles de conformité de Meta. Cas d'usage : automatisation des relances panier, prise de RDV, support multilingue 24/7, campagnes promotionnelles personnalisées.", en: "The WhatsApp Business API is WhatsApp's professional interface for sending/receiving messages at scale, integrating an AI chatbot and automating customer service while respecting Meta's compliance rules. Use cases: cart-recovery automation, appointment booking, 24/7 multilingual support, personalized promo campaigns." },
  },

  // ── Localisation / Bénin ──
  {
    cat: { fr: "Localisation", en: "Location" },
    q: { fr: "Où est basée GoScaleStudio ?", en: "Where is GoScaleStudio based?" },
    a: { fr: "GoScaleStudio est une agence digitale basée à Cotonou, au Bénin. Nous accompagnons des clients à travers tout le Bénin (Cotonou, Porto-Novo, Parakou, Abomey-Calavi), l'Afrique de l'Ouest (Côte d'Ivoire, Sénégal, Togo, Burkina Faso), la francophonie (France, Belgique, Suisse, Canada) et à l'international. Tout se fait à distance via Zoom, Google Meet ou WhatsApp.", en: "GoScaleStudio is a digital agency based in Cotonou, Benin. We work with clients across all of Benin (Cotonou, Porto-Novo, Parakou, Abomey-Calavi), West Africa (Côte d'Ivoire, Senegal, Togo, Burkina Faso), the francophone world (France, Belgium, Switzerland, Canada) and internationally. Everything is done remotely via Zoom, Google Meet or WhatsApp." },
  },
  {
    cat: { fr: "Localisation", en: "Location" },
    q: { fr: "Travaillez-vous avec des entreprises béninoises et africaines ?", en: "Do you work with Beninese and African companies?" },
    a: { fr: "Absolument — c'est même au cœur de notre mission. Nous accompagnons les PME, startups, e-commerces, cliniques et indépendants au Bénin et dans toute l'Afrique de l'Ouest qui veulent se digitaliser et automatiser leurs processus. Nos solutions sont adaptées aux réalités locales : Mobile Money, paiements XOF/USD/EUR, intégrations WhatsApp (utilisé partout en Afrique), et tarifs accessibles à partir de 15 €.", en: "Absolutely — it's at the heart of our mission. We work with SMEs, startups, e-commerces, clinics and freelancers across Benin and the rest of West Africa that want to go digital and automate their processes. Our solutions are tailored to local realities: Mobile Money, XOF/USD/EUR payments, WhatsApp integrations (the dominant channel across Africa), and accessible pricing starting at €15." },
  },
  {
    cat: { fr: "Localisation", en: "Location" },
    q: { fr: "Acceptez-vous les paiements en FCFA / Mobile Money ?", en: "Do you accept payments in FCFA / Mobile Money?" },
    a: { fr: "Oui. Nous acceptons les paiements en FCFA (XOF) via virement bancaire, Mobile Money (MTN, Moov), et en euros via Stripe, PayPal ou Wise pour les clients hors zone CFA. Nos devis peuvent être libellés dans la monnaie qui vous arrange.", en: "Yes. We accept payments in FCFA (XOF) via bank transfer, Mobile Money (MTN, Moov), and in euros via Stripe, PayPal or Wise for clients outside the CFA zone. Quotes can be issued in whichever currency works best for you." },
  },
];

const faqCategories: { id: string; label: { fr: string; en: string } }[] = [
  { id: "Tous", label: { fr: "Tous", en: "All" } },
  { id: "Tarifs", label: { fr: "Tarifs", en: "Pricing" } },
  { id: "Délais", label: { fr: "Délais", en: "Timelines" } },
  { id: "Services", label: { fr: "Services", en: "Services" } },
  { id: "Définitions", label: { fr: "Définitions", en: "Definitions" } },
  { id: "Localisation", label: { fr: "Localisation", en: "Location" } },
  { id: "Après livraison", label: { fr: "Après livraison", en: "After delivery" } },
  { id: "Collaboration", label: { fr: "Collaboration", en: "Collaboration" } },
  { id: "Sécurité", label: { fr: "Sécurité", en: "Security" } },
  { id: "IA", label: { fr: "IA", en: "AI" } },
];

const techTools = [
  "Make", "n8n", "Zapier", "Botpress", "Voiceflow", "GPT-4",
  "Vapi", "Twilio", "WordPress", "Elementor", "Figma", "v0.dev",
  "HubSpot", "Notion", "WhatsApp API", "Bland AI",
];

const toolsStack = [
  {
    title: { fr: "Automatisation", en: "Automation" },
    icon: Zap,
    color: "emerald",
    tools: [
      { name: "Make", initials: "Mk", bg: "linear-gradient(135deg,#6D5BFC,#9D4EFF)" },
      { name: "n8n", initials: "n8", bg: "linear-gradient(135deg,#EA4B71,#FF6B6B)" },
      { name: "Zapier", initials: "Z", bg: "linear-gradient(135deg,#FF4A00,#FF7A45)" },
      { name: "GoHighLevel", initials: "GHL", bg: "linear-gradient(135deg,#1F77FF,#3CC8FF)" },
    ],
  },
  {
    title: { fr: "Chatbots & IA", en: "Chatbots & AI" },
    icon: Bot,
    color: "brand",
    tools: [
      { name: "Botpress", initials: "Bp", bg: "linear-gradient(135deg,#1F4FE0,#4F8AFF)" },
      { name: "ManyChat", initials: "Mc", bg: "linear-gradient(135deg,#00D9C0,#0099FF)" },
      { name: "WaChap", initials: "Wc", bg: "linear-gradient(135deg,#25D366,#0066FF)" },
      { name: "Voiceflow", initials: "Vf", bg: "linear-gradient(135deg,#5247FF,#7B6BFF)" },
      { name: "ChatGPT (GPT-4)", initials: "GPT", bg: "linear-gradient(135deg,#10A37F,#0EAA85)" },
      { name: "Claude (Anthropic)", initials: "C", bg: "linear-gradient(135deg,#D97757,#F4A261)" },
      { name: "Claude Code", initials: "CC", bg: "linear-gradient(135deg,#1F2937,#D97757)" },
      { name: "Gemini", initials: "G", bg: "linear-gradient(135deg,#4285F4,#9B72CB)" },
    ],
  },
  {
    title: { fr: "Voix & Téléphonie", en: "Voice & Telephony" },
    icon: Phone,
    color: "blue",
    tools: [
      { name: "Vapi", initials: "Va", bg: "linear-gradient(135deg,#15B79E,#5EE5C2)" },
      { name: "Retell AI", initials: "Re", bg: "linear-gradient(135deg,#7C3AED,#C084FC)" },
      { name: "Twilio", initials: "Tw", bg: "linear-gradient(135deg,#F22F46,#FF6B7A)" },
      { name: "ElevenLabs", initials: "11", bg: "linear-gradient(135deg,#1F1F1F,#5C5C5C)" },
      { name: "WhatsApp Business", initials: "Wa", bg: "linear-gradient(135deg,#25D366,#128C7E)" },
    ],
  },
  {
    title: { fr: "Design & Web", en: "Design & Web" },
    icon: Palette,
    color: "purple",
    tools: [
      { name: "Figma AI", initials: "Fg", bg: "linear-gradient(135deg,#F24E1E,#A259FF)" },
      { name: "v0.dev", initials: "v0", bg: "linear-gradient(135deg,#1F1F1F,#404040)" },
      { name: "Google Stitch", initials: "St", bg: "linear-gradient(135deg,#4285F4,#34A853)" },
      { name: "WordPress", initials: "Wp", bg: "linear-gradient(135deg,#21759B,#1E8CBE)" },
      { name: "Elementor", initials: "El", bg: "linear-gradient(135deg,#92003B,#D7286E)" },
    ],
  },
  {
    title: { fr: "CRM & Productivité", en: "CRM & Productivity" },
    icon: Briefcase,
    color: "amber",
    tools: [
      { name: "HubSpot", initials: "Hs", bg: "linear-gradient(135deg,#FF7A59,#FF9F7C)" },
      { name: "Notion", initials: "N", bg: "linear-gradient(135deg,#1F1F1F,#404040)" },
      { name: "Airtable", initials: "At", bg: "linear-gradient(135deg,#FCB400,#FF8800)" },
      { name: "Slack", initials: "Sl", bg: "linear-gradient(135deg,#4A154B,#ECB22E)" },
      { name: "Google Workspace", initials: "GW", bg: "linear-gradient(135deg,#4285F4,#34A853)" },
    ],
  },
  {
    title: { fr: "SEO & Analytics", en: "SEO & Analytics" },
    icon: BarChart3,
    color: "emerald",
    tools: [
      { name: "Google Search Console", initials: "GSC", bg: "linear-gradient(135deg,#4285F4,#34A853)" },
      { name: "Google Analytics 4", initials: "GA4", bg: "linear-gradient(135deg,#F9AB00,#E8710A)" },
      { name: "RankMath", initials: "Rm", bg: "linear-gradient(135deg,#724BCB,#9D4EFF)" },
      { name: "Search Console Insights", initials: "Sci", bg: "linear-gradient(135deg,#34A853,#0F9D58)" },
    ],
  },
];

const guarantees = [
  { icon: Shield,
    title: { fr: "Satisfait ou Repris", en: "Satisfied or Re-done" },
    desc: { fr: "Si le livrable ne correspond pas au cahier des charges, on reprend gratuitement.", en: "If the deliverable doesn't match the brief, we redo it for free." } },
  { icon: Headphones,
    title: { fr: "Support 30 Jours", en: "30-Day Support" },
    desc: { fr: "Suivi post-livraison inclus. On ne vous lâche pas après la mise en ligne.", en: "Post-delivery follow-up included. We don't disappear once it's live." } },
  { icon: RotateCcw,
    title: { fr: "Révisions Illimitées", en: "Unlimited Revisions" },
    desc: { fr: "Jusqu'à satisfaction totale sur chaque livrable, sans frais supplémentaires.", en: "Until you're fully satisfied with every deliverable, at no extra cost." } },
];

const painPoints = [
  { icon: Clock,
    title: { fr: "Tâches manuelles qui bouffent vos journées", en: "Manual tasks eating up your days" },
    desc: { fr: "Copier-coller entre outils, relances manuelles, reporting à la main... Vous perdez +10h/semaine sur des tâches qu'un robot ferait en 10 secondes.", en: "Copy-pasting between tools, manual follow-ups, hand-built reports... You lose 10+ hours every week on tasks a bot would handle in 10 seconds." } },
  { icon: Phone,
    title: { fr: "Appels manqués = clients perdus", en: "Missed calls = lost customers" },
    desc: { fr: "Votre téléphone sonne, personne ne répond. Chaque appel manqué est un prospect qui va chez le concurrent. Et ça arrive tous les jours.", en: "Your phone rings, nobody picks up. Every missed call is a prospect heading to the competition. And it happens every day." } },
  { icon: Users,
    title: { fr: "Support noyé sous les mêmes questions", en: "Support drowning in the same questions" },
    desc: { fr: "Vos équipes répondent en boucle aux mêmes demandes au lieu de vendre. Le chat, les mails, WhatsApp — tout déborde.", en: "Your team answers the same requests on loop instead of selling. Chat, email, WhatsApp — everything is overflowing." } },
  { icon: Eye,
    title: { fr: "Site web invisible sur Google", en: "Website invisible on Google" },
    desc: { fr: "Vous avez un site mais zéro trafic organique. Vos concurrents trustent la page 1 pendant que vous restez en page 5.", en: "You have a website but zero organic traffic. Competitors own page 1 while you're stuck on page 5." } },
];

const solutions = [
  { icon: Zap, result: { fr: "+10h/sem libérées", en: "+10h/week freed" },
    title: { fr: "On automatise, vous respirez", en: "We automate, you breathe" },
    desc: { fr: "On connecte tous vos outils et on crée des workflows qui tournent tout seuls. Fini le copier-coller, bonjour la productivité.", en: "We connect all your tools and build workflows that run on their own. No more copy-pasting, hello productivity." } },
  { icon: Bot, result: { fr: "24/7 disponible", en: "24/7 available" },
    title: { fr: "Un assistant IA qui ne dort jamais", en: "An AI assistant that never sleeps" },
    desc: { fr: "Chatbot ou callbot IA déployé en 48h. Il répond, qualifie et convertit vos prospects 24/7 — même à 3h du matin.", en: "AI chatbot or callbot deployed in 48h. It answers, qualifies and converts your leads 24/7 — even at 3am." } },
  { icon: Globe, result: { fr: "Page 1 Google", en: "Google page 1" },
    title: { fr: "Un site qui attire et convertit", en: "A site that attracts and converts" },
    desc: { fr: "Site WordPress optimisé SEO qui grimpe sur Google et transforme les visiteurs en clients. Pas juste joli — performant.", en: "SEO-optimized WordPress site that climbs Google and turns visitors into customers. Not just pretty — performant." } },
  { icon: Palette, result: { fr: "48h livraison", en: "48h delivery" },
    title: { fr: "Un prototype qui convainc", en: "A prototype that closes deals" },
    desc: { fr: "Maquette interactive en 48h pour valider votre idée, convaincre vos investisseurs ou lancer votre produit plus vite.", en: "Interactive mockup in 48h to validate your idea, convince investors or launch your product faster." } },
];

const targetAudiences = [
  { icon: Building2,
    title: { fr: "Agences & Consultants", en: "Agencies & Consultants" },
    desc: { fr: "Vous jonglez entre 10 clients et 20 outils. On automatise votre back-office pour que vous restiez focus sur la valeur.", en: "You juggle 10 clients and 20 tools. We automate your back-office so you stay focused on value." } },
  { icon: ShoppingCart,
    title: { fr: "E-commerce & Retail", en: "E-commerce & Retail" },
    desc: { fr: "Chatbot sur WhatsApp, relances panier abandonné, gestion de stock auto — on booste vos ventes pendant que vous dormez.", en: "WhatsApp chatbot, abandoned-cart recovery, automated stock management — we boost your sales while you sleep." } },
  { icon: Stethoscope,
    title: { fr: "Santé & Cliniques", en: "Health & Clinics" },
    desc: { fr: "Callbot pour la prise de RDV, rappels SMS, gestion des annulations — vos patients obtiennent un créneau en 30 secondes.", en: "Callbot for appointment booking, SMS reminders, cancellation handling — your patients get a slot in 30 seconds." } },
  { icon: GraduationCap,
    title: { fr: "Startups & SaaS", en: "Startups & SaaS" },
    desc: { fr: "Prototype rapide, onboarding automatisé, support chatbot — tout ce qu'il faut pour scaler sans exploser votre équipe.", en: "Fast prototype, automated onboarding, chatbot support — everything you need to scale without burning out your team." } },
  { icon: Briefcase,
    title: { fr: "PME & Indépendants", en: "SMEs & Freelancers" },
    desc: { fr: "Site visible sur Google, leads automatisés, facturation connectée — on digitalise votre business de A à Z.", en: "Site visible on Google, automated leads, connected invoicing — we digitalize your business from A to Z." } },
  { icon: Heart,
    title: { fr: "Associations & ONG", en: "Nonprofits & NGOs" },
    desc: { fr: "Communication automatisée, formulaires intelligents, chatbot d'information — plus d'impact avec moins de ressources.", en: "Automated communications, smart forms, info chatbot — more impact with fewer resources." } },
];

const beforeAfter = [
  { icon: Target,
    before: { fr: "Relances manuelles, prospects oubliés", en: "Manual follow-ups, forgotten leads" },
    after: { fr: "CRM automatisé, zéro prospect perdu", en: "Automated CRM, zero leads lost" } },
  { icon: Phone,
    before: { fr: "Appels manqués, clients frustrés", en: "Missed calls, frustrated customers" },
    after: { fr: "Callbot IA 24/7, satisfaction +90 %", en: "24/7 AI callbot, +90% satisfaction" } },
  { icon: Globe,
    before: { fr: "Site en page 5 de Google", en: "Site stuck on Google page 5" },
    after: { fr: "Top 3 Google, trafic x5", en: "Google top 3, traffic x5" } },
  { icon: Bot,
    before: { fr: "Support débordé, délais de réponse longs", en: "Overwhelmed support, long response times" },
    after: { fr: "Chatbot instant, réponse en 2 secondes", en: "Instant chatbot, replies in 2 seconds" } },
  { icon: Palette,
    before: { fr: "Prototype en 3 semaines", en: "Prototype in 3 weeks" },
    after: { fr: "Maquette interactive en 48h", en: "Interactive mockup in 48h" } },
];

const whyUs = [
  { icon: Rocket, value: "48h-14j",
    title: { fr: "Livraison ultra-rapide", en: "Lightning-fast delivery" },
    desc: { fr: "48h à 14 jours max. Pas de projets qui traînent pendant des mois.", en: "48h to 14 days max. No projects dragging on for months." } },
  { icon: Award, value: "5.0/5",
    title: { fr: "Note 5.0/5 sur ComeUp", en: "5.0/5 rating on ComeUp" },
    desc: { fr: "65+ projets livrés avec 100 % de satisfaction client. Zéro avis négatif.", en: "65+ projects delivered with 100% client satisfaction. Zero negative reviews." } },
  { icon: Cpu, value: "15+",
    title: { fr: "Stack IA de pointe", en: "Cutting-edge AI stack" },
    desc: { fr: "On utilise les meilleurs outils du marché : GPT-4, Make, Vapi, Botpress, et plus.", en: "We use the market's best tools: GPT-4, Make, Vapi, Botpress, and more." } },
  { icon: Heart, value: "30 / 30",
    title: { fr: "Accompagnement humain", en: "Human-first support" },
    desc: { fr: "Un interlocuteur dédié, des points réguliers, et un support 30 jours post-livraison.", en: "A dedicated point of contact, regular check-ins, and 30 days of post-delivery support." } },
];

const resultsBars = [
  { value: 85, display: "15h+", from: "#10B981", to: "#34D399", text: "text-emerald",
    label: { fr: "Temps économisé par semaine", en: "Time saved per week" } },
  { value: 100, display: "100 %", from: "#F07830", to: "#D94048", text: "text-brand",
    label: { fr: "Taux de satisfaction client", en: "Client satisfaction rate" } },
  { value: 70, display: "+35 %", from: "#3B82F6", to: "#60A5FA", text: "text-blue",
    label: { fr: "Augmentation des conversions", en: "Conversion uplift" } },
  { value: 80, display: "-40 %", from: "#8B5CF6", to: "#C084FC", text: "text-purple",
    label: { fr: "Réduction des appels manqués", en: "Missed-call reduction" } },
  { value: 90, display: "x5", from: "#F59E0B", to: "#FBBF24", text: "text-amber",
    label: { fr: "Amélioration du trafic SEO", en: "SEO traffic boost" } },
];

const colorMap: Record<string, string> = {
  emerald: "text-emerald bg-emerald/10 border-emerald/20",
  blue: "text-blue bg-blue/10 border-blue/20",
  brand: "text-brand bg-brand/10 border-brand/20",
  purple: "text-purple bg-purple/10 border-purple/20",
  amber: "text-amber bg-amber/10 border-amber/20",
};

const portfolioTabs: { id: string; label: { fr: string; en: string } }[] = [
  { id: "Tous", label: { fr: "Tous", en: "All" } },
  { id: "Automatisation", label: { fr: "Automatisation", en: "Automation" } },
  { id: "CallBot IA", label: { fr: "CallBot IA", en: "AI Callbot" } },
  { id: "ChatBot IA", label: { fr: "ChatBot IA", en: "AI Chatbot" } },
  { id: "WordPress + SEO", label: { fr: "WordPress + SEO", en: "WordPress + SEO" } },
  { id: "Maquette UI/UX", label: { fr: "Maquette UI/UX", en: "UI/UX Mockup" } },
];

const pricingFeatures: { fr: string; en: string }[] = [
  { fr: "Analyse complète de votre activité", en: "Full analysis of your business" },
  { fr: "Identification des automatisations possibles", en: "Identification of possible automations" },
  { fr: "Explication simple de votre système futur", en: "Plain-language explanation of your future system" },
  { fr: "Recommandations personnalisées", en: "Personalized recommendations" },
];

const pricingOptions = [
  { price: "30 €", highlight: false,
    service: { fr: "1 scénario simple", en: "1 simple scenario" },
    note: { fr: "Workflow basique", en: "Basic workflow" } },
  { price: "35 €", highlight: false,
    service: { fr: "2 scénarios simples", en: "2 simple scenarios" },
    note: { fr: "Pack 2 workflows", en: "Pack of 2 workflows" } },
  { price: "40 €", highlight: false,
    service: { fr: "3 scénarios simples", en: "3 simple scenarios" },
    note: { fr: "Pack 3 workflows", en: "Pack of 3 workflows" } },
  { price: "50 €", highlight: false,
    service: { fr: "Scénario avancé", en: "Advanced scenario" },
    note: { fr: "Logique multi-étapes", en: "Multi-step logic" } },
  { price: "100 € à 500 €", highlight: true,
    service: { fr: "Automatisation sur mesure", en: "Custom automation" },
    note: { fr: "Projet complet adapté", en: "Full tailored project" } },
  { price: "500 €", highlight: false,
    service: { fr: "Maintenance 30 jours", en: "30-day Maintenance" },
    note: { fr: "Suivi & ajustements", en: "Follow-up & adjustments" } },
  { price: "30 €", highlight: false,
    service: { fr: "Consulting 30 min", en: "30-min consulting" },
    note: { fr: "Appel stratégique", en: "Strategy call" } },
];

/* ── Media helpers ─────────────────────────────────── */

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function getVimeoId(url: string): string | null {
  if (!url) return null;
  const m = url.match(/vimeo\.com\/(?:video\/|channels\/[\w-]+\/)?(\d+)/i);
  return m ? m[1] : null;
}

function getLoomId(url: string): string | null {
  if (!url) return null;
  const m = url.match(/loom\.com\/(?:share|embed)\/([a-f0-9]+)/i);
  return m ? m[1] : null;
}

function getDriveFileId(url: string): string | null {
  if (!url) return null;
  // Google Drive: /file/d/<id>/view  or  ?id=<id>
  const m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([\w-]{20,})/);
  return m ? m[1] : null;
}

function isVideoFile(url: string): boolean {
  return !!url && /\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(url);
}

/**
 * Renders the most appropriate media for a project URL:
 * - YouTube link → iframe embed
 * - Direct video (mp4/webm/...) → <video>
 * - Anything else → falls back to image
 */
function ProjectMedia({
  imageUrl, videoUrl, title, autoplay, controls, className,
}: {
  imageUrl: string;
  videoUrl?: string;
  title: string;
  autoplay?: boolean;
  controls?: boolean;
  className?: string;
}) {
  const ytId = videoUrl ? getYouTubeId(videoUrl) : null;
  if (ytId) {
    const params = new URLSearchParams({
      ...(autoplay ? { autoplay: "1", mute: "1", loop: "1", playlist: ytId, controls: controls ? "1" : "0" } : { autoplay: "0" }),
      modestbranding: "1",
      rel: "0",
    });
    return (
      <iframe
        src={`https://www.youtube.com/embed/${ytId}?${params}`}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className={className || "w-full h-full border-0"}
      />
    );
  }
  const vimeoId = videoUrl ? getVimeoId(videoUrl) : null;
  if (vimeoId) {
    const params = new URLSearchParams({
      ...(autoplay ? { autoplay: "1", muted: "1", loop: "1" } : {}),
      title: "0",
      byline: "0",
      portrait: "0",
    });
    return (
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?${params}`}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className={className || "w-full h-full border-0"}
      />
    );
  }
  const loomId = videoUrl ? getLoomId(videoUrl) : null;
  if (loomId) {
    return (
      <iframe
        src={`https://www.loom.com/embed/${loomId}${autoplay ? "?autoplay=1&muted=1" : ""}`}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        className={className || "w-full h-full border-0"}
      />
    );
  }
  const driveId = videoUrl ? getDriveFileId(videoUrl) : null;
  if (driveId) {
    return (
      <iframe
        src={`https://drive.google.com/file/d/${driveId}/preview`}
        title={title}
        allow="autoplay"
        allowFullScreen
        className={className || "w-full h-full border-0"}
      />
    );
  }
  if (videoUrl && isVideoFile(videoUrl)) {
    return (
      <video
        src={videoUrl}
        poster={imageUrl}
        autoPlay={autoplay}
        muted={autoplay}
        loop={autoplay}
        playsInline
        controls={controls}
        preload="metadata"
        className={className || "w-full h-full object-cover"}
      />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={imageUrl} alt={title} className={className || "w-full h-full object-cover"} />;
}

function TestimonialCard({ tm }: { tm: DBTestimonial }) {
  return (
    <div className="testimonial-card glass rounded-2xl p-5 sm:p-6 flex-shrink-0 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-1">
          {Array.from({ length: tm.rating }).map((_, j) => (
            <Star key={j} size={14} className="text-amber fill-amber" />
          ))}
        </div>
        {tm.source && (
          <span className="text-[9px] font-bold uppercase tracking-wider text-white/30 bg-white/5 px-2 py-0.5 rounded">
            {tm.source}
          </span>
        )}
      </div>
      <p className="text-white/70 text-xs sm:text-sm mb-4 leading-relaxed">&quot;{tm.text}&quot;</p>

      {tm.reply && (
        <div className="border-l-2 border-brand/40 pl-3 py-1 mb-4 bg-brand/[0.03] rounded-r-md">
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand mb-1">
            Réponse GoScaleStudio
          </p>
          <p className="text-white/55 text-[11px] sm:text-xs leading-relaxed italic">
            {tm.reply}
          </p>
        </div>
      )}

      <div className="mt-auto">
        <p className="font-bold text-sm">{tm.name}</p>
        {tm.role && <p className="text-white/40 text-xs">{tm.role}</p>}
      </div>
    </div>
  );
}

/* ── Component ─────────────────────────────────────── */

export default function Page() {
  return (
    <Suspense fallback={<div className="bg-dark min-h-screen" />}>
      <HomePage />
    </Suspense>
  );
}

function HomePage() {
  const t = useT();
  const lang = useLang();
  useSyncHtmlLang();
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const toggleLang = () => {
    const newLang = lang === "fr" ? "en" : "fr";
    // Persist user choice for ~1 year — middleware respects it on next visits
    if (typeof document !== "undefined") {
      document.cookie = `gs-lang=${newLang};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    }
    const params = new URLSearchParams(sp?.toString() || "");
    if (newLang === "en") params.set("lang", "en");
    else params.delete("lang");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : (pathname || "/"));
  };

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
  const [selectedProject, setSelectedProject] = useState<typeof publishedProjects[number] | null>(null);
  const [testimonials, setTestimonials] = useState<DBTestimonial[]>([]);

  // Site settings (admin-managed via /gs-panel-…/settings)
  type SiteSettings = {
    site_name: string;
    site_description: string;
    contact_email: string;
    contact_phone: string;
    contact_whatsapp: string;
    contact_address: string;
    maintenance_mode: boolean;
    maintenance_message: string;
    logo_url: string;
    about_photo_url: string;
  };
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Fetch published testimonials from the admin-managed DB
  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => Array.isArray(data) && setTestimonials(data))
      .catch(() => {});
  }, []);

  // Fetch site settings (re-fetched after each toggle to stay fresh)
  useEffect(() => {
    fetch("/api/settings", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then(setSettings)
      .catch(() => {});
  }, []);

  // Lock body scroll when modal is open + close on ESC
  useEffect(() => {
    if (!selectedProject) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedProject(null); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedProject]);

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
    { label: { fr: "Services", en: "Services" }, id: "services" },
    { label: { fr: "Tarifs", en: "Pricing" }, id: "pricing" },
    { label: { fr: "Réalisations", en: "Work" }, id: "portfolio" },
    { label: { fr: "À propos", en: "About" }, id: "about" },
    { label: { fr: "FAQ", en: "FAQ" }, id: "faq" },
    { label: { fr: "Contact", en: "Contact" }, id: "contact" },
  ];

  const filteredProjects = activeTab === "Tous"
    ? publishedProjects
    : publishedProjects.filter((p) => p.category === activeTab);

  const filteredFaqItems = activeFaqCat === "Tous"
    ? faqItems
    : faqItems.filter((f) => f.cat.fr === activeFaqCat);

  // Translate a project's category (stored as the FR id in DB) to the active language
  const trCategory = (cat: string) => {
    const tab = portfolioTabs.find((p) => p.id === cat);
    return tab ? t(tab.label) : cat;
  };

  // Use EN field if present (and active lang is en), fall back to FR
  const trProject = (p: typeof publishedProjects[number]) => ({
    title: lang === "en" && p.title_en ? p.title_en : p.title,
    description: lang === "en" && p.description_en ? p.description_en : p.description,
    long_description: lang === "en" && p.long_description_en ? p.long_description_en : p.long_description,
    result: lang === "en" && p.result_en ? p.result_en : p.result,
  });

  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 4);

  // Maintenance mode: full-screen banner replacing the home page
  if (settings?.maintenance_mode) {
    return (
      <div className="bg-dark text-white min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={settings.logo_url || "/logo.jpg"} alt={settings.site_name || "GoScaleStudio"} className="h-16 w-16 rounded-2xl object-cover mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold mb-4">
            <span className="gradient-text">{(settings.site_name || "GoScale").replace(/Studio$/i, "")}</span>
            {settings.site_name?.toLowerCase().endsWith("studio") ? "Studio" : ""}
          </h1>
          <div className="bg-amber/10 border border-amber/20 rounded-2xl p-6 mb-6">
            <p className="text-amber font-bold mb-2">Site en maintenance</p>
            <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
              {settings.maintenance_message || "Le site est temporairement indisponible. Nous revenons rapidement."}
            </p>
          </div>
          {(settings.contact_email || settings.contact_whatsapp) && (
            <p className="text-white/40 text-xs">
              Besoin de nous joindre ?
              {settings.contact_email && (
                <> <a href={`mailto:${settings.contact_email}`} className="text-brand hover:underline">{settings.contact_email}</a></>
              )}
              {settings.contact_whatsapp && (
                <> &middot; <a href={`https://wa.me/${settings.contact_whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">WhatsApp</a></>
              )}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Brand label split (e.g. "GoScaleStudio" → "GoScale" + "Studio")
  const fullName = settings?.site_name || "GoScaleStudio";
  const brandSuffix = fullName.toLowerCase().endsWith("studio") ? "Studio" : "";
  const brandPrefix = brandSuffix ? fullName.slice(0, fullName.length - brandSuffix.length) : fullName;

  return (
    <div className="bg-dark text-white min-h-screen overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-dark/90 backdrop-blur-lg border-b border-border" : ""}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between gap-3">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={settings?.logo_url || "/logo.jpg"} alt={fullName} className="h-8 w-8 rounded-lg object-cover" />
            <span className="font-display text-base sm:text-xl font-bold"><span className="gradient-text">{brandPrefix}</span>{brandSuffix}</span>
          </button>
          {/* Desktop nav (lg+ pour éviter le débordement à 6 liens + 2 controls) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-sm text-white/60 hover:text-white transition-colors whitespace-nowrap">
                {t(l.label)}
              </button>
            ))}
            <button
              onClick={toggleLang}
              className="text-xs font-bold text-white/60 hover:text-brand transition-colors flex items-center gap-1.5 border border-white/10 rounded-full px-3 py-1.5"
              aria-label="Switch language"
            >
              <Globe size={12} />
              <span className={lang === "fr" ? "text-brand" : ""}>FR</span>
              <span className="text-white/20">/</span>
              <span className={lang === "en" ? "text-brand" : ""}>EN</span>
            </button>
            <button onClick={() => scrollTo("contact")} className="btn-primary px-5 py-2 rounded-full text-sm whitespace-nowrap">
              {t({ fr: "Démarrer un projet", en: "Start a project" })}
            </button>
          </div>

          {/* CTA compact + burger (mobile + tablet) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => scrollTo("contact")}
              className="hidden sm:flex btn-primary px-4 py-2 rounded-full text-xs items-center gap-1.5 whitespace-nowrap"
            >
              {t({ fr: "Démarrer", en: "Start" })}
            </button>
            <button className="text-white p-2" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu">
              {mobileMenu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="lg:hidden bg-dark-2 border-t border-border px-6 py-6 flex flex-col gap-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left text-white/70 hover:text-white py-3 px-2 hover:bg-white/5 rounded-lg transition-colors">
                {t(l.label)}
              </button>
            ))}
            <button
              onClick={toggleLang}
              className="text-left text-xs font-bold text-white/60 hover:text-brand transition-colors flex items-center gap-1.5 px-2 py-2 mt-2"
            >
              <Globe size={12} />
              <span className={lang === "fr" ? "text-brand" : ""}>FR</span>
              <span className="text-white/20">/</span>
              <span className={lang === "en" ? "text-brand" : ""}>EN</span>
            </button>
            <button onClick={() => scrollTo("contact")} className="btn-primary px-5 py-3 rounded-full text-sm mt-2">
              {t({ fr: "Démarrer un projet", en: "Start a project" })}
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,92,26,0.08)_0%,transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 text-center">
          <div className="anim fade-up section-badge mx-auto mb-8">
            <Sparkles size={12} /> {t({ fr: "Studio IA & Automatisation", en: "AI & Automation Studio" })}
          </div>
          <h1 className="anim fade-up delay-1 font-display text-[1.875rem] sm:text-4xl md:text-5xl font-bold leading-[1.15] mb-5 sm:mb-6">
            {t({ fr: "Automatisez. Déployez. ", en: "Automate. Deploy. " })}
            <span className="gradient-text">{t({ fr: "Scalez.", en: "Scale." })}</span>
          </h1>
          <p className="anim fade-up delay-2 text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t({ fr: "Chatbots IA, assistants vocaux, automatisations et sites web performants. On construit les systèmes qui font tourner votre business — pendant que vous dormez.", en: "AI chatbots, voice assistants, automations and high-performance websites. We build the systems that run your business — while you sleep." })}
          </p>
          <div className="anim fade-up delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("contact")} className="btn-primary px-8 py-4 rounded-full text-sm sm:text-base flex items-center justify-center gap-2">
              {t({ fr: "Lancer mon projet", en: "Start my project" })} <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollTo("portfolio")} className="btn-outline px-8 py-4 rounded-full text-sm sm:text-base flex items-center justify-center gap-2">
              <Play size={18} /> {t({ fr: "Voir nos réalisations", en: "See our work" })}
            </button>
          </div>
          <div className="anim fade-up delay-4 mt-14 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/40">
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald" /> {t({ fr: "65+ projets livrés", en: "65+ projects delivered" })}</span>
            <span className="flex items-center gap-2"><Star size={16} className="text-amber" /> 5.0/5 ComeUp</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-blue" /> {t({ fr: "Livraison 48h-14j", en: "Delivery 48h-14d" })}</span>
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
      <section className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><XCircle size={12} /> {t({ fr: "Le Problème", en: "The Problem" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              {t({ fr: "Vous perdez du temps, de l'argent et des clients ", en: "You lose time, money and customers " })}
              <span className="gradient-text">{t({ fr: "chaque jour", en: "every single day" })}</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              {t({ fr: "Ces problèmes vous parlent ? Vous n'êtes pas seul. 90 % de nos clients vivaient la même chose avant de nous contacter.", en: "Sound familiar? You're not alone. 90% of our clients were going through the exact same thing before reaching out." })}
            </p>
          </div>
          {/* Liste éditoriale (manifesto) — pas de cards */}
          <div className="max-w-3xl mx-auto flex flex-col">
            {painPoints.map((p, i) => (
              <div
                key={i}
                className={`anim fade-up delay-${i + 1} group relative grid grid-cols-[auto_1fr] gap-5 sm:gap-8 py-6 sm:py-8 ${
                  i < painPoints.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <div className="flex flex-col items-start gap-3">
                  <span className="font-display text-3xl sm:text-5xl font-bold text-red-500/30 leading-none tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p.icon size={18} className="text-red-400/70 group-hover:text-red-400 transition-colors" />
                </div>
                <div className="pt-1">
                  <h3 className="font-display text-base sm:text-xl font-bold mb-2 group-hover:text-red-300 transition-colors">
                    {t(p.title)}
                  </h3>
                  <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xl">
                    {t(p.desc)}
                  </p>
                </div>
                <div className="absolute left-0 top-6 sm:top-8 bottom-6 sm:bottom-8 w-px bg-gradient-to-b from-red-500/30 via-red-500/10 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW: La Solution ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 bg-dark-2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Lightbulb size={12} /> {t({ fr: "La Solution", en: "The Solution" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              {t({ fr: "On transforme vos problèmes en ", en: "We turn your problems into " })}
              <span className="gradient-text">{t({ fr: "avantages compétitifs", en: "competitive advantages" })}</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              {t({ fr: "Pour chaque blocage, on a une solution concrète, déployée en moins de 14 jours.", en: "For every blocker, we have a concrete solution, deployed in less than 14 days." })}
            </p>
          </div>
          {/*
            Format "achievement strip" :
            - Mobile : stat compacte en chip top-right au-dessus du titre (n'écrase plus le contenu)
            - Desktop (sm+) : grid 3 colonnes avec index minuscule à gauche, titre+desc au centre, stat géante à droite
          */}
          <div className="max-w-5xl mx-auto flex flex-col">
            {solutions.map((s, i) => (
              <div
                key={i}
                className={`anim fade-up delay-${i + 1} group relative overflow-hidden ${
                  i < solutions.length - 1 ? "border-b border-white/8" : ""
                }`}
              >
                {/* Wash gradient qui apparaît au hover (de la gauche vers la droite) */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald/[0.08] via-emerald/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* MOBILE LAYOUT (caché sm+) — stat compacte en chip puis titre + desc en pleine largeur */}
                <div className="relative sm:hidden py-7">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="font-display text-[10px] font-bold tracking-widest text-emerald/50 uppercase">
                      {String(i + 1).padStart(2, "0")} · {t({ fr: "Gain", en: "Gain" })}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald bg-emerald/10 border border-emerald/20 px-2.5 py-1 rounded-full tabular-nums">
                      {t(s.result)}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 mb-2">
                    <s.icon size={17} className="text-emerald flex-shrink-0 mt-0.5" />
                    <h3 className="font-display text-base font-bold leading-tight">
                      {t(s.title)}
                    </h3>
                  </div>
                  <p className="text-white/55 text-[13px] leading-relaxed pl-[26px]">
                    {t(s.desc)}
                  </p>
                </div>

                {/* DESKTOP LAYOUT (sm+) — grid 3 colonnes, stat géante à droite */}
                <div className="relative hidden sm:grid sm:grid-cols-[auto_1fr_auto] items-center gap-10 py-10">
                  {/* Index minuscule */}
                  <div className="flex flex-col items-center w-12">
                    <span className="font-display text-[11px] font-bold tracking-widest text-emerald/40 uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="w-px h-12 bg-gradient-to-b from-emerald/30 to-transparent mt-3" />
                  </div>

                  {/* Texte central */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <s.icon size={18} className="text-emerald flex-shrink-0" />
                      <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">
                        {t(s.title)}
                      </h3>
                    </div>
                    <p className="text-white/55 text-base leading-relaxed pl-7 max-w-2xl">
                      {t(s.desc)}
                    </p>
                  </div>

                  {/* Stat géante à droite (desktop only) */}
                  <div className="text-right flex-shrink-0">
                    <div className="font-display text-4xl md:text-5xl font-bold leading-none tabular-nums bg-gradient-to-br from-emerald to-emerald/40 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105 origin-right">
                      {t(s.result)}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-emerald/50 font-bold mt-2">
                      {t({ fr: "Gain", en: "Gain" })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ── Services ── */}
      <section id="services" className="py-12 sm:py-20 lg:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-3 sm:mb-4"><Zap size={12} /> {t({ fr: "Nos Services", en: "Our Services" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-lg sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              {t({ fr: "Tout ce qu'il faut pour ", en: "Everything you need to " })}
              <span className="gradient-text">{t({ fr: "scaler", en: "scale" })}</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-xl mx-auto text-xs sm:text-sm lg:text-base px-2">
              {t({ fr: "5 expertises complémentaires pour automatiser, convertir et dominer votre marché.", en: "5 complementary specialties to automate, convert and dominate your market." })}
            </p>
          </div>
          {/* Bento asymétrique — 1 hero + 4 tuiles variées, gradients francs */}
          <div className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 gap-3 sm:gap-4 auto-rows-[minmax(150px,auto)] sm:auto-rows-[minmax(180px,auto)]">
            {services.map((s, i) => {
              // Layout : 0 = hero large (lg:col-span-7, row-span-2), 1-4 = tuiles variées
              const layouts = [
                "sm:col-span-6 lg:col-span-7 lg:row-span-2 min-h-[220px] sm:min-h-[360px]",
                "sm:col-span-3 lg:col-span-5 min-h-[150px] sm:min-h-[180px]",
                "sm:col-span-3 lg:col-span-5 min-h-[150px] sm:min-h-[180px]",
                "sm:col-span-3 lg:col-span-6 min-h-[150px] sm:min-h-[180px]",
                "sm:col-span-3 lg:col-span-6 min-h-[150px] sm:min-h-[180px]",
              ];
              const palettes: Record<string, { from: string; to: string; ring: string; icon: string }> = {
                emerald: { from: "from-emerald/20", to: "to-emerald/5", ring: "border-emerald/30", icon: "text-emerald" },
                blue: { from: "from-blue/20", to: "to-blue/5", ring: "border-blue/30", icon: "text-blue" },
                brand: { from: "from-brand/25", to: "to-accent/10", ring: "border-brand/40", icon: "text-brand" },
                purple: { from: "from-purple/20", to: "to-purple/5", ring: "border-purple/30", icon: "text-purple" },
                amber: { from: "from-amber/20", to: "to-amber/5", ring: "border-amber/30", icon: "text-amber" },
              };
              const p = palettes[s.color] || palettes.brand;
              const isHero = i === 0;
              const serviceHref = `/services/${s.slug}${lang === "en" ? "?lang=en" : ""}`;
              return (
                <Link
                  key={i}
                  href={serviceHref}
                  className={`anim scale-in delay-${i + 1} group relative ${layouts[i] || "sm:col-span-3 lg:col-span-4 min-h-[180px]"} rounded-3xl overflow-hidden border ${p.ring} bg-gradient-to-br ${p.from} ${p.to} hover:scale-[1.01] transition-transform duration-300 block`}
                >
                  {/* Motif décoratif */}
                  <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                    backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 50%)",
                  }} />
                  {/* Grosse icône en watermark sur la tuile hero */}
                  {isHero && (
                    <s.icon
                      size={220}
                      className={`absolute -right-12 -bottom-12 ${p.icon} opacity-[0.07] pointer-events-none`}
                      strokeWidth={1.2}
                    />
                  )}

                  <div className={`relative h-full flex flex-col ${isHero ? "p-5 sm:p-8 lg:p-10" : "p-4 sm:p-6"} justify-between`}>
                    <div>
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                        <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center ${p.icon}`}>
                          <s.icon size={isHero ? 20 : 18} />
                        </div>
                        {isHero && (
                          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/70 bg-white/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm">
                            {t({ fr: "Service phare", en: "Flagship service" })}
                          </span>
                        )}
                      </div>
                      <h3 className={`font-display font-bold mb-2 leading-tight ${isHero ? "text-lg sm:text-2xl lg:text-3xl" : "text-sm sm:text-base lg:text-lg"}`}>
                        {t(s.title)}
                      </h3>
                      <p className={`text-white/65 leading-relaxed ${isHero ? "text-xs sm:text-sm lg:text-base max-w-md" : "text-[11px] sm:text-xs lg:text-sm line-clamp-3"}`}>
                        {t(s.desc)}
                      </p>
                    </div>
                    {/* CTA "Découvrir" sur toutes les tuiles */}
                    <div className={`flex items-center gap-2 ${isHero ? "mt-4 sm:mt-6 text-xs sm:text-sm" : "mt-3 sm:mt-4 text-[11px] sm:text-xs"} font-semibold text-white/80 group-hover:text-white transition-colors`}>
                      <span>
                        {isHero
                          ? t({ fr: "Explorer ce service", en: "Explore this service" })
                          : t({ fr: "Découvrir", en: "Learn more" })}
                      </span>
                      <ArrowRight size={isHero ? 14 : 12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stack & Outils maîtrisés ── */}
      <section id="stack" className="py-16 sm:py-24 px-5 sm:px-6 bg-dark-2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Cpu size={12} /> {t({ fr: "Stack Technique", en: "Tech Stack" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              {t({ fr: "Les ", en: "The " })}
              <span className="gradient-text">{t({ fr: "outils", en: "tools" })}</span>
              {t({ fr: " qu'on maîtrise pour vous", en: " we've mastered for you" })}
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              {t({ fr: "Plus de 30 outils industriels combinés au cas par cas pour livrer vite, fiable et sans dette technique.", en: "30+ industry-grade tools combined case by case to deliver fast, reliable and free of technical debt." })}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {toolsStack.map((cat, i) => {
              const cls = colorMap[cat.color] || colorMap.brand;
              return (
                <div
                  key={i}
                  className={`anim fade-up delay-${Math.min(i + 1, 6)} bg-dark rounded-2xl border border-border p-6 hover:border-brand/30 transition-all`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${cls}`}>
                      <cat.icon size={18} />
                    </div>
                    <h3 className="font-display text-base font-bold">{t(cat.title)}</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {cat.tools.map((t, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand/20 transition-colors"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 shadow-md"
                          style={{ background: t.bg }}
                        >
                          {t.initials}
                        </div>
                        <span className="text-sm text-white/80 font-medium truncate">{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mini stats footer */}
          <div className="anim fade-up grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 sm:mt-12">
            {[
              { v: "30+", l: { fr: "Outils maîtrisés", en: "Tools mastered" } },
              { v: "6", l: { fr: "Catégories", en: "Categories" } },
              { v: "100 %", l: { fr: "Production-ready", en: "Production-ready" } },
              { v: "24/7", l: { fr: "Veille techno", en: "Tech watch" } },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-2xl glass">
                <div className="font-display text-xl sm:text-2xl font-bold gradient-text mb-1">{s.v}</div>
                <div className="text-xs text-white/50">{t(s.l)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW: Pour Qui ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 bg-dark-2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Users size={12} /> {t({ fr: "Pour Qui ?", en: "For Who?" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              {t({ fr: "On accompagne ceux qui veulent ", en: "We work with people who want to " })}
              <span className="gradient-text">{t({ fr: "aller plus vite", en: "move faster" })}</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {targetAudiences.map((a, i) => (
              <div key={i} className={`anim fade-up delay-${Math.min(i + 1, 6)} glass rounded-2xl p-6 sm:p-8 hover:border-brand/20 transition-all duration-300 group hover:-translate-y-1`}>
                <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                  <a.icon size={20} className="text-brand" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-bold mb-2">{t(a.title)}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{t(a.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process (6 etapes) ── */}
      <section id="process" className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 sm:mb-20">
            <div className="anim fade-up section-badge mx-auto mb-4"><BarChart3 size={12} /> {t({ fr: "Comment on bosse", en: "How we work" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-5xl font-bold mb-5 leading-tight">
              {t({ fr: "De votre première idée à un système qui ", en: "From your first idea to a system that " })}
              <span className="gradient-text">{t({ fr: "tourne tout seul", en: "runs itself" })}</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/55 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              {t({
                fr: "Un process en 6 étapes rodé par 65+ projets — clair, rapide et sans mauvaise surprise. Vous savez exactement ce qui se passe, quand, et combien ça coûte.",
                en: "A 6-step process battle-tested across 65+ projects — clear, fast and without nasty surprises. You always know what's happening, when, and how much it costs.",
              })}
            </p>

            {/* Trust strip — chiffres clés du process */}
            <div className="anim fade-up delay-3 mt-8 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm">
              <span className="flex items-center gap-2 text-white/60">
                <CheckCircle size={14} className="text-emerald" />
                <span><span className="font-bold text-white">48h</span> {t({ fr: "à 14 jours", en: "to 14 days" })}</span>
              </span>
              <span className="w-px h-4 bg-white/15" />
              <span className="flex items-center gap-2 text-white/60">
                <CheckCircle size={14} className="text-emerald" />
                <span><span className="font-bold text-white">65+</span> {t({ fr: "projets livrés", en: "projects shipped" })}</span>
              </span>
              <span className="w-px h-4 bg-white/15" />
              <span className="flex items-center gap-2 text-white/60">
                <CheckCircle size={14} className="text-emerald" />
                <span><span className="font-bold text-white">100 %</span> {t({ fr: "satisfaction", en: "satisfaction" })}</span>
              </span>
            </div>
          </div>

          {/* Timeline verticale zigzag — ligne centrale, étapes alternées gauche/droite */}
          <div className="relative max-w-5xl mx-auto">
            {/* Ligne centrale pleine + gradient */}
            <div className="absolute top-4 bottom-4 left-7 sm:left-1/2 sm:-translate-x-px w-px bg-gradient-to-b from-brand/60 via-brand/30 to-brand/5" />
            {/* Point de départ */}
            <div className="hidden sm:flex absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand items-center justify-center shadow-lg shadow-brand/40">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            <ol className="flex flex-col gap-12 sm:gap-16 pt-6">
              {processSteps.map((s, i) => {
                const isRight = i % 2 === 0;
                const StepContent = (
                  <div className={`max-w-md ${isRight ? "sm:ml-auto sm:text-left" : "sm:mr-auto sm:text-right"}`}>
                    {/* Header — numéro + durée */}
                    <div className={`flex items-center gap-2 mb-3 ${isRight ? "" : "sm:justify-end"}`}>
                      <span className="font-display text-xs font-bold uppercase tracking-widest text-brand">
                        {s.num} · {t({ fr: "Étape", en: "Step" })}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber bg-amber/10 border border-amber/20 px-2 py-0.5 rounded-full">
                        <Clock size={10} /> {t(s.duration)}
                      </span>
                    </div>

                    {/* Titre + desc */}
                    <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 leading-tight group-hover:text-brand transition-colors">
                      {t(s.title)}
                    </h3>
                    <p className="text-white/55 text-sm sm:text-[15px] leading-relaxed mb-5">
                      {t(s.desc)}
                    </p>

                    {/* Livrable — bloc deliverable */}
                    <div className={`flex items-start gap-2.5 mb-4 ${isRight ? "" : "sm:justify-end sm:text-right"}`}>
                      <FileCheck size={15} className={`text-emerald flex-shrink-0 mt-0.5 ${isRight ? "" : "sm:order-2"}`} />
                      <div className={isRight ? "" : "sm:order-1"}>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5">
                          {t({ fr: "Vous repartez avec", en: "You walk away with" })}
                        </div>
                        <div className="text-sm font-semibold text-white/85">{t(s.deliverable)}</div>
                      </div>
                    </div>

                    {/* Objection killer — chip mise en avant */}
                    <div className={`flex ${isRight ? "" : "sm:justify-end"}`}>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald bg-emerald/10 border border-emerald/20 px-2.5 py-1 rounded-md">
                        <Sparkles size={11} /> {t(s.tag)}
                      </span>
                    </div>
                  </div>
                );

                return (
                  <li
                    key={i}
                    className={`anim ${isRight ? "fade-left" : "fade-right"} delay-${Math.min(i + 1, 6)} group relative grid grid-cols-[auto_1fr] sm:grid-cols-2 sm:gap-0 items-start`}
                  >
                    {/* Desktop : contenu à gauche pour étapes paires */}
                    {!isRight && (
                      <div className="hidden sm:block sm:col-start-1 pr-16">
                        {StepContent}
                      </div>
                    )}

                    {/* Nœud central */}
                    <div className="relative flex-shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-0 z-10">
                      <div className="absolute inset-0 bg-brand/40 rounded-full blur-xl group-hover:bg-brand/60 transition-colors" />
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-dark border-2 border-brand/70 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <s.icon size={22} className="text-brand" />
                      </div>
                      <span className="absolute -top-1 -right-1 text-[10px] font-display font-bold bg-brand text-white w-6 h-6 rounded-full flex items-center justify-center tabular-nums shadow-lg shadow-brand/40 ring-2 ring-dark">
                        {i + 1}
                      </span>
                    </div>

                    {/* Mobile : contenu toujours à droite du nœud */}
                    <div className="sm:hidden pt-1 pl-3">
                      <div className={`max-w-md text-left`}>
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="font-display text-xs font-bold uppercase tracking-widest text-brand">
                            {s.num} · {t({ fr: "Étape", en: "Step" })}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber bg-amber/10 border border-amber/20 px-2 py-0.5 rounded-full">
                            <Clock size={10} /> {t(s.duration)}
                          </span>
                        </div>
                        <h3 className="font-display text-base font-bold mb-2 leading-tight">{t(s.title)}</h3>
                        <p className="text-white/55 text-sm leading-relaxed mb-4">{t(s.desc)}</p>
                        <div className="flex items-start gap-2 mb-3">
                          <FileCheck size={14} className="text-emerald flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                              {t({ fr: "Vous repartez avec", en: "You walk away with" })}
                            </div>
                            <div className="text-xs font-semibold text-white/85">{t(s.deliverable)}</div>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald bg-emerald/10 border border-emerald/20 px-2 py-0.5 rounded-md">
                          <Sparkles size={10} /> {t(s.tag)}
                        </span>
                      </div>
                    </div>

                    {/* Desktop : contenu à droite pour étapes impaires */}
                    {isRight && (
                      <div className="hidden sm:block sm:col-start-2 pl-16">
                        {StepContent}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>

            {/* Point d'arrivée + mini-CTA */}
            <div className="relative mt-12 sm:mt-16">
              <div className="hidden sm:flex absolute -top-8 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-emerald to-emerald/60 items-center justify-center shadow-lg shadow-emerald/40">
                <CheckCircle size={12} className="text-white" />
              </div>
              <div className="anim fade-up text-center max-w-2xl mx-auto pt-6 sm:pt-10">
                <p className="text-white/60 text-sm sm:text-base mb-5 leading-relaxed">
                  {t({
                    fr: "L'étape 1 est ",
                    en: "Step 1 is ",
                  })}
                  <span className="text-white font-bold">{t({ fr: "100 % gratuite", en: "100% free" })}</span>
                  {t({
                    fr: " et vous repartez avec des recommandations actionnables — même si vous décidez de ne pas continuer.",
                    en: " and you walk away with actionable recommendations — even if you decide not to continue.",
                  })}
                </p>
                <button
                  onClick={() => scrollTo("contact")}
                  className="btn-primary px-8 py-3.5 rounded-full text-sm font-bold inline-flex items-center gap-2"
                >
                  {t({ fr: "Démarrer par l'étape 01", en: "Start with step 01" })} <ArrowRight size={16} />
                </button>
                <p className="text-[11px] text-white/35 mt-3">
                  {t({ fr: "Aucune carte requise · Réponse sous 24h · Zéro engagement", en: "No card required · Reply within 24h · No commitment" })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA intermediaire ── */}
      <section className="py-14 sm:py-20 px-5 sm:px-6 bg-dark-2">
        <div className="anim scale-in max-w-3xl mx-auto text-center glass rounded-3xl p-8 sm:p-12 border-brand/10">
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-3">{t({ fr: "Vous avez un projet en tête ?", en: "Got a project in mind?" })}</h3>
          <p className="text-white/50 text-sm mb-6">{t({ fr: "Discutons-en gratuitement. Réponse garantie sous 24h.", en: "Let's talk — free of charge. Response guaranteed within 24h." })}</p>
          <button onClick={() => scrollTo("contact")} className="btn-primary px-8 py-3.5 rounded-full text-sm flex items-center gap-2 mx-auto">
            {t({ fr: "Prendre un RDV gratuit", en: "Book a free call" })} <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6" ref={statsRef}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><TrendingUp size={12} /> {t({ fr: "Chiffres Clés", en: "Key Numbers" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold">
              {t({ fr: "Des ", en: "Real " })}
              <span className="gradient-text">{t({ fr: "résultats", en: "results" })}</span>
              {t({ fr: " concrets", en: "" })}
            </h2>
          </div>
          {/* Bandeau de chiffres — dividers verticaux, pas de cards */}
          <div className="anim scale-in relative overflow-hidden rounded-3xl">
            {/* Halo gradient subtil (clipped par overflow-hidden du parent) */}
            <div className="absolute inset-0 -inset-x-6 bg-gradient-to-r from-transparent via-brand/[0.04] to-transparent rounded-3xl" />
            <div className="relative grid grid-cols-2 md:grid-cols-4 py-8 sm:py-12">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`px-5 sm:px-6 text-center ${
                    i > 0 ? "md:border-l border-white/10" : ""
                  } ${i === 2 ? "border-l md:border-l border-white/10" : ""} ${
                    i >= 2 ? "mt-8 md:mt-0 pt-8 md:pt-0 border-t md:border-t-0 border-white/10" : ""
                  }`}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-display font-bold gradient-text mb-2 sm:mb-3 tabular-nums leading-none">
                    {counters[i]}{s.suffix}
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

      {/* ── NEW: Avant / Apres ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 bg-dark-2">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><ArrowUpRight size={12} /> {t({ fr: "Transformation", en: "Transformation" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              {t({ fr: "Avant ", en: "Before " })}
              <span className="text-white/30">vs</span>{" "}
              <span className="gradient-text">{t({ fr: "Après", en: "After" })}</span>
              {" GoScaleStudio"}
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {beforeAfter.map((b, i) => (
              <div key={i} className={`anim fade-up delay-${Math.min(i + 1, 5)} glass rounded-xl sm:rounded-2xl p-4 sm:p-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6`}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <XCircle size={16} className="text-red-400 flex-shrink-0 hidden sm:block" />
                  <span className="text-white/50 text-xs sm:text-sm">{t(b.before)}</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                  <ArrowRight size={14} className="text-brand" />
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <CircleCheck size={16} className="text-emerald flex-shrink-0 hidden sm:block" />
                  <span className="text-emerald font-semibold text-xs sm:text-sm">{t(b.after)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ── Portfolio (onglets par categorie) ── */}
      <section id="portfolio" className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Sparkles size={12} /> {t({ fr: "Réalisations", en: "Work" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              {t({ fr: "Nos derniers ", en: "Our latest " })}
              <span className="gradient-text">{t({ fr: "projets", en: "projects" })}</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-xl mx-auto text-sm sm:text-base">
              {t({ fr: "Chaque projet est conçu sur mesure pour résoudre un problème métier réel.", en: "Every project is built bespoke to solve a real business problem." })}
            </p>
          </div>

          {/* Filter — select dropdown */}
          <div className="anim fade-up delay-3 flex justify-center mb-10">
            <label className="relative inline-block w-full max-w-sm">
              <span className="sr-only">{t({ fr: "Filtrer par catégorie", en: "Filter by category" })}</span>
              <select
                value={activeTab}
                onChange={(e) => { setActiveTab(e.target.value); setShowAllProjects(false); }}
                className="input-field appearance-none pr-12 cursor-pointer w-full font-semibold"
              >
                {portfolioTabs.map((tab) => (
                  <option key={tab.id} value={tab.id} className="bg-dark-2">
                    {t(tab.label)}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand"
              />
            </label>
          </div>

          {filteredProjects.length === 0 ? (
            <p className="text-center text-white/30 py-8">{t({ fr: "Aucune réalisation dans cette catégorie.", en: "No projects in this category yet." })}</p>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {visibleProjects.map((p) => {
                  const cat = categoryColors[p.category] || "brand";
                  const tp = trProject(p);
                  return (
                    <div
                      key={p.id}
                      className="anim fade-up group bg-dark-3 rounded-2xl border border-border overflow-hidden hover:border-brand/30 transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
                      onClick={() => setSelectedProject(p)}
                    >
                      <div className="relative h-44 sm:h-52 overflow-hidden">
                        {(() => {
                          const gallery = (p.images && p.images.length > 0) ? p.images : (p.image_url ? [p.image_url] : []);
                          // Multi-image gallery wins on the card preview
                          if (gallery.length > 1) {
                            return (
                              <Carousel
                                images={gallery}
                                alt={tp.title}
                                className="w-full h-full"
                              />
                            );
                          }
                          return (
                            <ProjectMedia
                              imageUrl={p.image_url}
                              videoUrl={p.video_url}
                              title={tp.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          );
                        })()}
                        <div className="portfolio-gradient absolute inset-0 pointer-events-none" />
                        <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full border ${colorMap[cat] || colorMap.brand}`}>
                          {trCategory(p.category)}
                        </span>
                        {p.featured && (
                          <span className="absolute top-14 left-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber/90 text-black flex items-center gap-1 shadow-lg">
                            <Star size={11} className="fill-black" /> {t({ fr: "En vedette", en: "Featured" })}
                          </span>
                        )}
                        {p.video_url && (
                          <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white/80 flex items-center gap-1">
                            <Play size={10} /> {t({ fr: "Vidéo", en: "Video" })}
                          </span>
                        )}
                        {!p.video_url && p.images && p.images.length > 1 && (
                          <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white/80">
                            {p.images.length} photos
                          </span>
                        )}
                      </div>
                      <div className="p-5 sm:p-6 flex flex-col flex-1">
                        <h3 className="font-display text-base sm:text-lg font-bold mb-2">{tp.title}</h3>
                        <p className="text-white/50 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3">{tp.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-brand font-bold text-xs sm:text-sm">{tp.result}</span>
                          <div className="flex gap-1.5 flex-wrap justify-end">
                            {p.tools.split(", ").slice(0, 3).map((tt, ti) => (
                              <span key={ti} className="tool-pill">{tt}</span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedProject(p); }}
                          className="mt-auto w-full btn-outline px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all"
                        >
                          {t({ fr: "Voir le cas", en: "View case study" })} <ArrowUpRight size={14} />
                        </button>
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
                    {t({ fr: `Voir plus (${filteredProjects.length - 4} de plus)`, en: `See more (${filteredProjects.length - 4} more)` })} <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><User size={12} /> {t({ fr: "À propos", en: "About" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              {t({ fr: "Qui suis-", en: "Who am " })}
              <span className="gradient-text">{t({ fr: "je", en: "I" })}</span>
              {t({ fr: " ?", en: "?" })}
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
                    src={settings?.about_photo_url || "https://i.postimg.cc/tR89Dwj9/Whats-App-Image-2026-05-10-at-01-30-44.jpg"}
                    alt="Fidah IMOROU BOUKARI - CEO GoScaleStudio"
                    className="w-full aspect-[4/5] object-cover rounded-2xl"
                  />
                  <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl px-4 py-3 backdrop-blur-xl">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                      <span className="text-white/70 font-medium">{t({ fr: "Disponible pour vos projets", en: "Available for your projects" })}</span>
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
                <span className="text-brand text-xs font-bold tracking-widest uppercase">{t({ fr: "CEO & Fondateur", en: "CEO & Founder" })}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-2">
                Fidah <span className="gradient-text">IMOROU BOUKARI</span>
              </h3>
              <p className="text-white/40 text-sm mb-2">{t({ fr: "CEO de GoScaleStudio · Cotonou, Bénin", en: "CEO of GoScaleStudio · Cotonou, Benin" })}</p>
              <p className="text-white/30 text-xs mb-6 flex items-center gap-2 flex-wrap">
                <Sparkles size={11} className="text-brand" />
                <span>
                  {t({ fr: "Co-fondateur de ", en: "Co-founder of " })}
                  <a
                    href="https://pirabellabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    Pirabel Labs
                    <ArrowUpRight size={11} />
                  </a>
                  {t({ fr: " · Agence web marketing", en: " · Web marketing agency" })}
                </span>
              </p>

              <div className="flex flex-col gap-4 text-sm sm:text-[15px] text-white/70 leading-relaxed">
                <p>{t({ fr: "Passionné par l'automatisation, l'intelligence artificielle et la croissance digitale, j'accompagne les entreprises dans la création de systèmes performants capables de simplifier leur activité et d'accélérer leur développement.", en: "Passionate about automation, artificial intelligence and digital growth, I help companies build high-performance systems that simplify their operations and accelerate their development." })}</p>
                <p>
                  {t({ fr: "Basé à ", en: "Based in " })}
                  <span className="text-white font-semibold">{t({ fr: "Cotonou, au Bénin", en: "Cotonou, Benin" })}</span>
                  {t({ fr: ", j'ai fondé ", en: ", I founded " })}
                  <span className="text-white font-semibold">GoScaleStudio</span>
                  {t({ fr: " avec une mission claire : aider les marques, entrepreneurs et entreprises — au Bénin, dans toute l'Afrique de l'Ouest et au-delà — à gagner du temps, optimiser leurs processus et scaler plus efficacement grâce à des solutions digitales modernes et intelligentes.", en: " with a clear mission: help brands, entrepreneurs and companies — across Benin, all of West Africa and beyond — save time, optimize their processes and scale more effectively through modern, intelligent digital solutions." })}
                </p>
                <p>
                  {t({ fr: "Je suis aussi co-fondateur de ", en: "I'm also co-founder of " })}
                  <a
                    href="https://pirabellabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    Pirabel Labs
                    <ArrowUpRight size={13} />
                  </a>
                  {t({ fr: ", une agence web marketing spécialisée dans la croissance digitale, la stratégie de contenu et l'acquisition client. Une double casquette qui me permet de combiner technologie, automatisation et marketing pour des résultats concrets.", en: ", a web marketing agency specialized in digital growth, content strategy and customer acquisition. A dual hat that lets me combine technology, automation and marketing for concrete results." })}
                </p>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-3 gap-3 mt-8">
                {[
                  { icon: Lightbulb, label: { fr: "Innovation", en: "Innovation" } },
                  { icon: Target, label: { fr: "Stratégie", en: "Strategy" } },
                  { icon: TrendingUp, label: { fr: "Performance", en: "Performance" } },
                ].map((p, i) => (
                  <div key={i} className="glass rounded-xl p-4 text-center hover:border-brand/30 transition-colors">
                    <p.icon size={18} className="text-brand mx-auto mb-2" />
                    <span className="text-xs font-semibold text-white/80">{t(p.label)}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <button onClick={() => scrollTo("contact")} className="btn-primary px-6 py-3 rounded-full text-sm flex items-center gap-2">
                  {t({ fr: "Travaillons ensemble", en: "Let's work together" })} <ArrowRight size={16} />
                </button>
                <button onClick={() => scrollTo("portfolio")} className="btn-dark px-6 py-3 rounded-full text-sm">
                  {t({ fr: "Voir mes réalisations", en: "See my work" })}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-24 bg-dark-2 overflow-hidden">
        <div className="text-center mb-12 sm:mb-16 px-5 sm:px-6">
          <div className="anim fade-up section-badge mx-auto mb-4"><Star size={12} /> {t({ fr: "Avis Clients", en: "Client Reviews" })}</div>
          <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold mb-4">
            {t({ fr: "Ce que disent nos ", en: "What our " })}
            <span className="gradient-text">{t({ fr: "clients", en: "clients say" })}</span>
          </h2>
          <p className="anim fade-up delay-2 text-white/40 text-xs sm:text-sm">
            {t({ fr: "Vous avez travaillé avec nous ? ", en: "Worked with us? " })}
            <a href="/avis" className="text-brand hover:underline font-semibold">
              {t({ fr: "Laissez votre avis →", en: "Leave a review →" })}
            </a>
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center px-6">
            <p className="text-white/30 text-sm max-w-md mx-auto">
              {t({ fr: "Les premiers avis arrivent bientôt. Soyez le premier à témoigner !", en: "The first reviews are coming soon. Be the first to leave one!" })}
            </p>
          </div>
        ) : (() => {
          // Split testimonials evenly across two scrolling rows
          const mid = Math.ceil(testimonials.length / 2);
          const row1 = testimonials.slice(0, mid);
          const row2 = testimonials.slice(mid).length > 0 ? testimonials.slice(mid) : row1;
          return (
            <>
              <div className="mb-6 overflow-hidden">
                <div className="marquee-left flex gap-6">
                  {[...row1, ...row1].map((tm, i) => (
                    <TestimonialCard key={i} tm={tm} />
                  ))}
                </div>
              </div>
              {row2 !== row1 && (
                <div className="overflow-hidden">
                  <div className="marquee-right flex gap-6">
                    {[...row2, ...row2].map((tm, i) => (
                      <TestimonialCard key={i} tm={tm} />
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </section>

      {/* ── NEW: Pourquoi Nous ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Award size={12} /> {t({ fr: "Pourquoi Nous", en: "Why Us" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              {t({ fr: "Ce qui fait la ", en: "What makes the " })}
              <span className="gradient-text">{t({ fr: "différence", en: "difference" })}</span>
            </h2>
          </div>
          {/* Big numbers + texte aligné, pas de cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-y-12">
            {whyUs.map((w, i) => (
              <div
                key={i}
                className={`anim scale-in delay-${i + 1} group relative`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <w.icon size={20} className="text-brand" />
                  <div className="flex-1 h-px bg-gradient-to-r from-brand/40 to-transparent" />
                </div>
                <div className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-3 leading-none tabular-nums break-words">
                  {w.value}
                </div>
                <h3 className="font-display text-sm sm:text-base font-bold mb-2 uppercase tracking-wide">
                  {t(w.title)}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{t(w.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guarantees ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 bg-dark-2">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Shield size={12} /> {t({ fr: "Nos Garanties", en: "Our Guarantees" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold">
              {t({ fr: "Zéro risque, ", en: "Zero risk, " })}
              <span className="gradient-text">{t({ fr: "100 % confiance", en: "100% trust" })}</span>
            </h2>
          </div>
          {/* Feature strip — lignes horizontales, pas de cards */}
          <div className="max-w-3xl mx-auto flex flex-col">
            {guarantees.map((g, i) => (
              <div
                key={i}
                className={`anim fade-up delay-${i + 1} group flex items-start gap-5 sm:gap-7 py-6 sm:py-8 ${
                  i < guarantees.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-brand/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand/15 to-brand/5 border border-brand/20 flex items-center justify-center">
                    <g.icon size={26} className="text-brand" />
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                    <h3 className="font-display text-lg sm:text-xl font-bold">{t(g.title)}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand/70 bg-brand/10 px-2 py-0.5 rounded">
                      {String(i + 1).padStart(2, "0")} / {String(guarantees.length).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-white/55 text-sm sm:text-base leading-relaxed">{t(g.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW: Resultats Concrets (barres) ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><BarChart3 size={12} /> {t({ fr: "Impact Réel", en: "Real Impact" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              {t({ fr: "Les ", en: "The average " })}
              <span className="gradient-text">{t({ fr: "résultats", en: "results" })}</span>
              {t({ fr: " moyens de nos clients", en: " from our clients" })}
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
                  <span className="text-xs sm:text-sm text-white/70">{t(r.label)}</span>
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
      <section id="pricing" className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Tag size={12} /> {t({ fr: "Tarifs", en: "Pricing" })}</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              {t({ fr: "Des prix ", en: "Prices that are " })}
              <span className="gradient-text">{t({ fr: "transparents", en: "transparent" })}</span>
              {t({ fr: ", sans surprise", en: ", with no surprises" })}
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
              {t({ fr: "Commencez avec un audit à 15 € pour clarifier votre besoin, puis choisissez les options adaptées à votre projet.", en: "Start with a €15 audit to clarify your needs, then pick the options tailored to your project." })}
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
                      {t({ fr: "Offre de base", en: "Base offer" })}
                    </span>
                    <span className="text-xs text-white/40 bg-white/5 px-3 py-1.5 rounded-full">{t({ fr: "Recommandé", en: "Recommended" })}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">{t({ fr: "Audit & Diagnostic", en: "Audit & Diagnosis" })}</h3>
                  <p className="text-white/50 text-sm mb-6">{t({ fr: "Le point de départ idéal si vous débutez et ne savez pas quoi automatiser.", en: "The perfect starting point if you're new and don't know what to automate." })}</p>

                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="font-display text-5xl sm:text-6xl font-bold gradient-text">15</span>
                    <span className="text-2xl font-display font-bold text-white/70">€</span>
                    <span className="text-xs text-white/40 ml-2">{t({ fr: "paiement unique", en: "one-time payment" })}</span>
                  </div>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {pricingFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                        <div className="w-5 h-5 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle size={12} className="text-emerald" />
                        </div>
                        <span>{t(f)}</span>
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => scrollTo("contact")} className="btn-primary px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 w-full">
                    {t({ fr: "Réserver mon audit", en: "Book my audit" })} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Options table */}
            <div className="lg:col-span-7 anim fade-left">
              <div className="glass rounded-3xl p-6 sm:p-8 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold mb-1">{t({ fr: "Options & Add-ons", en: "Options & Add-ons" })}</h3>
                    <p className="text-white/40 text-xs">{t({ fr: "À combiner librement avec votre offre de base", en: "Mix and match freely with your base offer" })}</p>
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
                          <p className="text-sm font-semibold truncate">{t(o.service)}</p>
                          <p className="text-[11px] text-white/35">{t(o.note)}</p>
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
                    {t({ fr: "Devis personnalisé gratuit sous 24h", en: "Free personalized quote within 24h" })}
                  </p>
                  <button onClick={() => scrollTo("contact")} className="btn-dark px-5 py-2.5 rounded-full text-xs font-semibold">
                    {t({ fr: "Demander un devis", en: "Request a quote" })}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider max-w-4xl mx-auto" />

      {/* ── FAQ ── */}
      {/* FAQPage JSON-LD is emitted once in app/layout.tsx — duplicating it here invalidates both for Google. */}
      <section id="faq" className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="anim fade-up section-badge mx-auto mb-4"><MessageSquare size={12} /> FAQ</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              {t({ fr: "Questions ", en: "Frequently asked " })}
              <span className="gradient-text">{t({ fr: "fréquentes", en: "questions" })}</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 text-sm sm:text-base max-w-xl mx-auto">
              {t({ fr: "Tout ce que vous devez savoir avant de démarrer un projet avec GoScaleStudio.", en: "Everything you need to know before starting a project with GoScaleStudio." })}
            </p>
          </div>

          {/* Category filter — select dropdown */}
          <div className="anim fade-up flex justify-center mb-8">
            <label className="relative inline-block w-full max-w-sm">
              <span className="sr-only">{t({ fr: "Filtrer par catégorie", en: "Filter by category" })}</span>
              <select
                value={activeFaqCat}
                onChange={(e) => { setActiveFaqCat(e.target.value); setOpenFaq(null); }}
                className="input-field appearance-none pr-12 cursor-pointer w-full font-semibold"
              >
                {faqCategories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-dark-2">
                    {t(c.label)}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand"
              />
            </label>
          </div>

          <div className="flex flex-col gap-3">
            {filteredFaqItems.length === 0 && (
              <p className="text-white/30 text-sm py-8 text-center">{t({ fr: "Aucune question dans cette catégorie.", en: "No questions in this category yet." })}</p>
            )}
            {filteredFaqItems.map((f, i) => (
              <div key={`${f.cat.fr}-${i}`} className={`anim fade-up delay-${Math.min(i + 1, 6)} faq-item glass rounded-xl overflow-hidden ${openFaq === i ? "open border-brand/20" : ""}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand bg-brand/10 px-2 py-1 rounded-md flex-shrink-0 mt-0.5">
                      {t(f.cat)}
                    </span>
                    <span className="font-semibold text-xs sm:text-sm pt-1">{t(f.q)}</span>
                  </div>
                  <ChevronDown size={18} className="faq-chevron text-brand flex-shrink-0" />
                </button>
                <div className="faq-answer px-4 sm:px-5 pb-4 sm:pb-5">
                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed pl-0 sm:pl-[68px]">{t(f.a)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="anim fade-up text-center mt-10 sm:mt-12">
            <p className="text-white/50 text-sm mb-4">{t({ fr: "Vous ne trouvez pas votre réponse ?", en: "Can't find your answer?" })}</p>
            <button onClick={() => scrollTo("contact")} className="btn-primary px-6 py-3 rounded-full text-sm inline-flex items-center gap-2">
              {t({ fr: "Posez votre question", en: "Ask your question" })} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 bg-dark-2">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="anim fade-up font-display text-xl sm:text-2xl md:text-5xl font-bold mb-6">
            {t({ fr: "Prêt à ", en: "Ready to " })}
            <span className="gradient-text">{t({ fr: "scaler", en: "scale" })}</span>
            {t({ fr: " votre business ?", en: " your business?" })}
          </h2>
          <p className="anim fade-up delay-1 text-white/50 text-sm sm:text-lg mb-10 max-w-xl mx-auto">
            {t({ fr: "Rejoignez 65+ entreprises qui ont déjà automatisé leur croissance avec GoScaleStudio.", en: "Join 65+ companies that have already automated their growth with GoScaleStudio." })}
          </p>
          <div className="anim fade-up delay-2 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("contact")} className="btn-primary px-10 py-4 rounded-full text-sm sm:text-base flex items-center justify-center gap-2">
              {t({ fr: "Démarrer maintenant", en: "Get started now" })} <ArrowRight size={18} />
            </button>
            <button onClick={() => scrollTo("services")} className="btn-dark px-8 py-4 rounded-full text-sm sm:text-base">
              {t({ fr: "Explorer nos services", en: "Explore our services" })}
            </button>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-16 sm:py-24 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="anim fade-up section-badge mx-auto mb-4"><Mail size={12} /> Contact</div>
            <h2 className="anim fade-up delay-1 font-display text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              {t({ fr: "Lancez votre ", en: "Launch your " })}
              <span className="gradient-text">{t({ fr: "projet", en: "project" })}</span>
            </h2>
            <p className="anim fade-up delay-2 text-white/50 max-w-xl mx-auto text-sm sm:text-base">{t({ fr: "Décrivez votre besoin et recevez un devis personnalisé sous 24h.", en: "Describe your need and get a personalized quote within 24h." })}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <form className="anim fade-right flex flex-col gap-4" onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              const btn = form.querySelector("button[type=submit]") as HTMLButtonElement;
              const labelSending = t({ fr: "Envoi en cours...", en: "Sending..." });
              const labelSent = t({ fr: "Message envoyé !", en: "Message sent!" });
              const labelDefault = t({ fr: "Envoyer", en: "Send" });
              const labelError = t({ fr: "Erreur, réessayez", en: "Error, try again" });
              btn.disabled = true;
              btn.textContent = labelSending;
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
                btn.textContent = labelSent;
                setTimeout(() => { btn.disabled = false; btn.innerHTML = labelDefault; }, 3000);
              } catch {
                btn.disabled = false;
                btn.textContent = labelError;
                setTimeout(() => { btn.innerHTML = labelDefault; }, 3000);
              }
            }}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="name" placeholder={t({ fr: "Prénom & Nom", en: "First & Last name" })} className="input-field" required />
                <input type="email" name="email" placeholder="Email" className="input-field" required />
              </div>
              <input type="tel" name="phone" placeholder={t({ fr: "WhatsApp / Téléphone", en: "WhatsApp / Phone" })} className="input-field" required />
              <select className="input-field" name="service" required defaultValue="">
                <option value="" disabled>{t({ fr: "Service souhaité", en: "Service of interest" })}</option>
                {services.map((s, i) => (
                  <option key={i} value={s.title.fr}>{t(s.title)}</option>
                ))}
              </select>
              <textarea name="message" placeholder={t({ fr: "Décrivez votre projet...", en: "Describe your project..." })} rows={4} className="input-field resize-none" required />
              <button type="submit" className="btn-primary px-8 py-4 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 mt-2">
                {t({ fr: "Envoyer", en: "Send" })} <ArrowRight size={18} />
              </button>
            </form>
            <div className="anim fade-left flex flex-col gap-4 sm:gap-6 justify-center">
              {(() => {
                const wa = settings?.contact_whatsapp || "+229 01 68 24 28 66";
                const email = settings?.contact_email || "contact@goscalestudio.com";
                const addr = settings?.contact_address || "Cotonou, Bénin · Afrique & International";
                const waHref = `https://wa.me/${wa.replace(/[^0-9]/g, "")}`;
                const items = [
                { icon: MessageSquare, label: { fr: "WhatsApp", en: "WhatsApp" }, value: { fr: wa, en: wa }, href: waHref },
                { icon: Mail, label: { fr: "Email", en: "Email" }, value: { fr: email, en: email }, href: `mailto:${email}` },
                { icon: MapPin, label: { fr: "Localisation", en: "Location" }, value: { fr: addr, en: addr }, href: undefined },
                { icon: Clock, label: { fr: "R\u00e9ponse", en: "Response" }, value: { fr: "Sous 24h garantie", en: "Within 24h guaranteed" }, href: undefined },
              ];
              return items.map((c, i) => {
                const inner = (
                  <div className={`group flex items-center gap-3 sm:gap-5 py-4 sm:py-5 ${i < items.length - 1 ? "border-b border-white/5" : ""}`}>
                    <c.icon size={20} className="text-brand flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-widest text-white/35 font-bold mb-1">
                        {t(c.label)}
                      </div>
                      <div className="font-display text-sm sm:text-base lg:text-lg font-bold truncate group-hover:text-brand transition-colors">
                        {t(c.value)}
                      </div>
                    </div>
                    {c.href && (
                      <ArrowUpRight size={14} className="text-white/30 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                    )}
                  </div>
                );
                return c.href ? (
                  <a
                    key={i}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={i}>{inner}</div>
                );
              });
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-10 sm:py-14 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Sections de liens (Brand + Nav + Services) — identique aux pages services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.2fr] gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10">
            {/* Brand + tagline (full width sur sm pour respirer) */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="font-display text-lg font-bold mb-3">
                <span className="gradient-text">GoScale</span>Studio
              </div>
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
                {navLinks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="text-left hover:text-brand transition-colors"
                  >
                    {t(l.label)}
                  </button>
                ))}
              </div>
            </div>

            {/* Services (lien vers les 5 pillar pages) */}
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
                    className="hover:text-brand transition-colors"
                  >
                    {t(s.label)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="divider mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <p>&copy; {new Date().getFullYear()} GoScaleStudio. {t({ fr: "Tous droits réservés.", en: "All rights reserved." })}</p>
            <p>
              {t({ fr: "Réalisé par ", en: "Built by " })}
              <a href="https://pirabellabs.com" target="_blank" rel="noopener noreferrer" className="text-brand/60 hover:text-brand transition-colors font-semibold">
                Pirabel Labs
              </a>
              {t({ fr: ", Agence Web, Marketing & SEO", en: ", Web, Marketing & SEO Agency" })}
            </p>
          </div>
        </div>
      </footer>

      {/* ── Case Study Modal ── */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-dark-2 rounded-3xl border border-border w-full max-w-4xl max-h-[92vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 bg-dark-2/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${colorMap[categoryColors[selectedProject.category] || "brand"] || colorMap.brand}`}>
                {trCategory(selectedProject.category)}
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label={t({ fr: "Fermer", en: "Close" })}
              >
                <X size={16} />
              </button>
            </div>

            {/* Media — gallery (>1 photos) wins, then video, then single image */}
            <div className="relative w-full aspect-video bg-black">
              {(() => {
                const gallery = (selectedProject.images && selectedProject.images.length > 0)
                  ? selectedProject.images
                  : (selectedProject.image_url ? [selectedProject.image_url] : []);
                if (gallery.length > 1) {
                  return <Carousel images={gallery} alt={selectedProject.title} className="w-full h-full" />;
                }
                return (
                  <ProjectMedia
                    imageUrl={selectedProject.image_url}
                    videoUrl={selectedProject.video_url}
                    title={selectedProject.title}
                    autoplay
                    controls
                    className="w-full h-full object-cover"
                  />
                );
              })()}
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              {(() => {
                const tp = trProject(selectedProject);
                return (
                  <>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">{tp.title}</h2>
                    <p className="text-white/60 text-sm sm:text-base mb-6 leading-relaxed">{tp.description}</p>

                    {tp.long_description && (
                      <div className="mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-brand mb-3">
                          {t({ fr: "Étude de cas", en: "Case study" })}
                        </h3>
                        <RichText text={tp.long_description} />
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <div className="bg-dark-3 rounded-xl border border-border p-4">
                        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-emerald">
                          <TrendingUp size={12} /> {t({ fr: "Résultat", en: "Result" })}
                        </div>
                        <p className="font-display text-base sm:text-lg font-bold">{tp.result || "—"}</p>
                      </div>
                      <div className="bg-dark-3 rounded-xl border border-border p-4">
                        <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-brand">
                          <Cpu size={12} /> {t({ fr: "Outils utilisés", en: "Tools used" })}
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          {selectedProject.tools && selectedProject.tools.split(", ").map((tool, ti) => (
                            <span key={ti} className="tool-pill">{tool}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
                <button
                  onClick={() => { setSelectedProject(null); scrollTo("contact"); }}
                  className="btn-primary px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 flex-1"
                >
                  {t({ fr: "Démarrer un projet similaire", en: "Start a similar project" })} <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn-dark px-6 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 sm:w-auto"
                >
                  {t({ fr: "Fermer", en: "Close" })}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
