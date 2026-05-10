// Shared FAQ data — imported by both the server-rendered FAQPage JSON-LD
// (in app/layout.tsx) and the client-rendered FAQ section (in app/page.tsx).
// Keeping it in a non-client file lets the server component see it for SEO.

export type FaqEntry = {
  cat: { fr: string; en: string };
  q: { fr: string; en: string };
  a: { fr: string; en: string };
};

export const faqItems: FaqEntry[] = [
  {
    cat: { fr: "Tarifs", en: "Pricing" },
    q: { fr: "Combien coûte un projet GoScaleStudio ?", en: "How much does a GoScaleStudio project cost?" },
    a: { fr: "Tout commence par notre offre Audit à 15 €  qui clarifie votre besoin. Ensuite, comptez 30 à 40 € pour 1 à 3 scénarios simples, 50 € pour un scénario avancé, 100 à 500 € pour une automatisation sur mesure, et 500 € pour 30 jours de maintenance. Un consulting de 30 minutes coûte 30 €. Devis personnalisé gratuit sous 24h.", en: "Everything starts with our €15 Audit offer that clarifies your needs. Then expect €30-40 for 1 to 3 simple scenarios, €50 for an advanced scenario, €100-500 for a custom automation, and €500 for 30 days of maintenance. A 30-minute consulting call is €30. Free personalized quote within 24h." },
  },
  {
    cat: { fr: "Tarifs", en: "Pricing" },
    q: { fr: "L'offre de base à 15 €, qu'est-ce qu'elle inclut exactement ?", en: "What does the €15 base offer include exactly?" },
    a: { fr: "L'Audit à 15 € comprend une analyse complète de votre activité, l'identification des automatisations possibles, l'explication simple de votre futur système et des recommandations personnalisées.", en: "The €15 Audit includes a full analysis of your business, identification of possible automations, a plain-language explanation of your future system, and personalized recommendations." },
  },
  {
    cat: { fr: "Délais", en: "Timelines" },
    q: { fr: "Quels sont vos délais de livraison ?", en: "What are your delivery timelines?" },
    a: { fr: "La plupart des projets sont livrés entre 3 et 14 jours selon la complexité. Les maquettes UI/UX sont livrées en 48 à 72h. L'audit à 15 € est rendu sous 24 à 48h.", en: "Most projects are delivered in 3 to 14 days depending on complexity. UI/UX mockups land in 48-72h. The €15 audit is delivered within 24-48h." },
  },
  {
    cat: { fr: "Services", en: "Services" },
    q: { fr: "Quels services proposez-vous ?", en: "What services do you offer?" },
    a: { fr: "GoScaleStudio propose 5 expertises : automatisation métier (Make, n8n, Zapier), callbots IA (Vapi, Retell AI, Twilio), chatbots IA (GPT-4, Claude, Botpress, ManyChat, WaChap), sites WordPress + SEO, et maquettes UI/UX (Figma AI, v0.dev).", en: "GoScaleStudio offers 5 specialties: business automation (Make, n8n, Zapier, GoHighLevel), AI callbots (Vapi, Retell AI, Twilio), custom AI chatbots (GPT-4, Claude, Botpress, ManyChat, WaChap), WordPress sites + SEO, and UI/UX mockups (Figma AI, v0.dev)." },
  },
  {
    cat: { fr: "Services", en: "Services" },
    q: { fr: "Quels outils et technologies utilisez-vous ?", en: "Which tools and technologies do you use?" },
    a: { fr: "Pour l'automatisation : Make, n8n, Zapier, GoHighLevel. Pour les chatbots : Botpress, ManyChat, WaChap, Voiceflow, GPT-4, Claude. Pour les callbots : Vapi, Retell AI, Twilio, ElevenLabs. Pour le web : WordPress, Elementor, RankMath. Pour le design : Figma AI, v0.dev, Google Stitch. Plus de 30 outils maîtrisés.", en: "For automation: Make, n8n, Zapier, GoHighLevel. For chatbots: Botpress, ManyChat, WaChap, Voiceflow, GPT-4, Claude. For callbots: Vapi, Retell AI, Twilio, ElevenLabs. For web: WordPress, Elementor, RankMath. For design: Figma AI, v0.dev, Google Stitch. 30+ tools mastered." },
  },
  {
    cat: { fr: "Définitions", en: "Definitions" },
    q: { fr: "Qu'est-ce que l'automatisation no-code et comment ça fonctionne ?", en: "What is no-code automation and how does it work?" },
    a: { fr: "L'automatisation no-code consiste à créer des séquences d'actions automatiques entre vos outils sans écrire une seule ligne de code, à l'aide de plateformes comme Make, n8n, Zapier ou GoHighLevel.", en: "No-code automation means building sequences of automatic actions between your tools without writing a single line of code, using platforms like Make, n8n, Zapier or GoHighLevel." },
  },
  {
    cat: { fr: "Définitions", en: "Definitions" },
    q: { fr: "Qu'est-ce qu'un chatbot IA ?", en: "What is an AI chatbot?" },
    a: { fr: "Un chatbot IA est un assistant conversationnel propulsé par un modèle de langage (GPT-4, Claude, Gemini) qui comprend le langage naturel et répond comme le ferait un humain, 24/7.", en: "An AI chatbot is a conversational assistant powered by a language model (GPT-4, Claude, Gemini) that understands natural language and responds like a human, 24/7." },
  },
  {
    cat: { fr: "Définitions", en: "Definitions" },
    q: { fr: "Qu'est-ce qu'un callbot vocal IA ?", en: "What is a voice AI callbot?" },
    a: { fr: "Un callbot vocal est un assistant téléphonique automatisé propulsé par une IA conversationnelle, capable de comprendre la voix, dialoguer et exécuter des actions (RDV, qualification, support).", en: "A voice callbot is an automated phone assistant powered by conversational AI, capable of understanding speech, holding a dialogue and performing actions (booking, qualification, support)." },
  },
  {
    cat: { fr: "Localisation", en: "Location" },
    q: { fr: "Où est basée GoScaleStudio ?", en: "Where is GoScaleStudio based?" },
    a: { fr: "GoScaleStudio est une agence digitale basée à Cotonou, au Bénin. Nous accompagnons des clients à travers tout le Bénin, l'Afrique de l'Ouest, la francophonie et à l'international.", en: "GoScaleStudio is a digital agency based in Cotonou, Benin. We work with clients across all of Benin, West Africa, the francophone world and internationally." },
  },
  {
    cat: { fr: "Localisation", en: "Location" },
    q: { fr: "Acceptez-vous les paiements en FCFA / Mobile Money ?", en: "Do you accept FCFA / Mobile Money payments?" },
    a: { fr: "Oui. Nous acceptons les paiements en FCFA (XOF) via virement et Mobile Money (MTN, Moov), et en euros via Stripe, PayPal ou Wise.", en: "Yes. We accept FCFA (XOF) payments via bank transfer and Mobile Money (MTN, Moov), and euros via Stripe, PayPal or Wise." },
  },
];
