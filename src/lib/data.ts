export interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  longDesc: string;
  result: string;
  tools: string;
  status: "published" | "draft";
  img: string;
  order: number;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  initials: string;
  color: string;
  time: string;
}

export const initialProjects: Project[] = [
  {
    id: 1,
    title: "Automatisation CRM — Agence Immobilière",
    category: "Automatisation",
    desc: "Synchronisation complète leads + CRM + agenda.",
    longDesc: "Projet d'automatisation complète pour une agence immobilière de 12 agents. Synchronisation des leads entrants avec HubSpot, création automatique de tâches et rappels dans Google Calendar.",
    result: "+15h/sem",
    tools: "Make, HubSpot, Google Calendar",
    status: "published",
    img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
    order: 1,
  },
  {
    id: 2,
    title: "ChatBot WhatsApp — E-commerce Mode",
    category: "ChatBot IA",
    desc: "Chatbot GPT-4 entraîné sur le catalogue produit.",
    longDesc: "Chatbot intelligent déployé sur WhatsApp Business pour une boutique de mode. Il recommande des produits, répond aux questions sur les tailles et les retours, et convertit les visiteurs en acheteurs.",
    result: "+35% conversion",
    tools: "Botpress, GPT-4, WhatsApp API",
    status: "published",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    order: 2,
  },
  {
    id: 3,
    title: "Refonte WordPress — Cabinet de Conseil",
    category: "WordPress + SEO",
    desc: "Refonte complète + SEO on-page.",
    longDesc: "Site vitrine WordPress avec Elementor et stratégie SEO complète. Optimisation technique, création de contenu optimisé et link building interne.",
    result: "Page 1 Google",
    tools: "WordPress, Elementor, RankMath",
    status: "published",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    order: 3,
  },
  {
    id: 4,
    title: "Assistant Vocal — Clinique Dentaire",
    category: "CallBot IA",
    desc: "CallBot IA pour prise de RDV automatique.",
    longDesc: "Agent vocal IA disponible 24h/24 pour la prise de rendez-vous, la confirmation et l'envoi de rappels SMS. Les patients obtiennent un créneau en 30 secondes.",
    result: "-40% appels manqués",
    tools: "Vapi, Twilio, Make",
    status: "published",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    order: 4,
  },
  {
    id: 5,
    title: "Maquette FinTech App",
    category: "Maquette UI/UX",
    desc: "Prototype cliquable pour levée de fonds.",
    longDesc: "Maquette interactive livrée en 48h pour une startup fintech. Design complet de l'onboarding, du dashboard et des flux de paiement.",
    result: "Levée 200K€",
    tools: "Figma AI, v0.dev",
    status: "draft",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80",
    order: 5,
  },
  {
    id: 6,
    title: "Automatisation Social Media — PME",
    category: "Automatisation",
    desc: "Publication automatique sur 4 réseaux sociaux.",
    longDesc: "Workflow complet de publication et reporting automatisé. Planification, publication et analyse de performance sur Instagram, LinkedIn, Facebook et X.",
    result: "+8h/sem",
    tools: "Make, Buffer, Notion",
    status: "draft",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
    order: 6,
  },
];

export const initialMessages: Message[] = [
  {
    id: 1,
    name: "Jean-Marc Dupont",
    email: "jm.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    service: "Automatisation",
    message: "Bonjour, je suis agent immobilier et je perds beaucoup de temps à relancer mes prospects manuellement. J'aimerais automatiser tout ça avec un CRM connecté. Pouvez-vous m'aider ?",
    initials: "JM",
    color: "brand",
    time: "il y a 2h",
  },
  {
    id: 2,
    name: "Sophie Leclerc",
    email: "sophie@startup.io",
    phone: "",
    service: "Maquette UI/UX",
    message: "On lance une app fintech et on a besoin d'un prototype cliquable pour notre prochaine levée de fonds. Délai idéal : 1 semaine max.",
    initials: "SL",
    color: "purple",
    time: "il y a 5h",
  },
  {
    id: 3,
    name: "Marc André",
    email: "marc@boutique-mode.fr",
    phone: "+33 7 98 76 54 32",
    service: "ChatBot IA",
    message: "J'ai une boutique de mode en ligne et mes clients posent toujours les mêmes questions sur les tailles et les retours. Un chatbot sur WhatsApp serait parfait.",
    initials: "MA",
    color: "emerald",
    time: "hier",
  },
];

export const categoryColors: Record<string, string> = {
  Automatisation: "emerald",
  "CallBot IA": "blue",
  "ChatBot IA": "brand",
  "WordPress + SEO": "purple",
  "Maquette UI/UX": "amber",
};
