import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedToken } from "@/lib/auth";
import { createTestimonial, getAllTestimonials } from "@/lib/db";

export const runtime = "nodejs";

// Short, paraphrased summaries of the GoScaleStudio ComeUp reviews.
// Admin can edit any of them after import via the testimonials editor.
const COMEUP_REVIEWS: Array<{
  name: string;
  role?: string;
  text: string;
  reply?: string;
  review_date?: string;
}> = [
  {
    name: "StephanieChambourg",
    text: "Travail technique exécuté avec précision : récupération de contacts, gestion de leads, intégration campagne email. Système fluide, fiable et exactement comme attendu. Je recommande vivement.",
    reply: "Merci pour ce retour détaillé. Ravi que le système fonctionne comme prévu — au plaisir de collaborer à nouveau.",
    review_date: "2026-04-15",
  },
  {
    name: "StephanieChambourg",
    text: "Configuration Make + Facebook Ads + Brevo réalisée rapidement et sans souci. Une personne de confiance pour débloquer les automatisations. Je referai appel sans hésiter.",
    reply: "Merci pour votre confiance. Au plaisir de vous accompagner sur les prochaines automatisations.",
    review_date: "2026-04-10",
  },
  {
    name: "EvaUGG",
    text: "Le top du top ! Merci encore.",
    reply: "Merci beaucoup, à très bientôt.",
  },
  {
    name: "EvaUGG",
    text: "Très satisfaite — clairement le meilleur agent IA avec qui j'ai travaillé sur plusieurs projets. Patience, réactivité et efficacité au rendez-vous.",
    reply: "Merci infiniment pour ce retour, ravi d'avoir pu vous accompagner sur autant de projets.",
  },
  {
    name: "KennyVtdr",
    text: "Travail exemplaire malgré quelques difficultés. Toutes les solutions ont été trouvées pour automatiser la landing page (Slack, SMS, WhatsApp).",
    reply: "Merci pour votre avis. Système d'automatisation Slack/SMS/WhatsApp mis en place pour le suivi des leads — ravi du résultat.",
    review_date: "2026-03-25",
  },
  {
    name: "benjidss",
    text: "Super travail ! Merci.",
    reply: "Merci beaucoup, ravi d'avoir pu contribuer.",
    review_date: "2026-03-18",
  },
  {
    name: "FamilleBoisneNoc",
    text: "Personne sérieuse et professionnelle. Ponctuel aux RDV et réactif aux suggestions. Je renouvellerai en cas de besoin.",
    reply: "Merci pour votre confiance, au plaisir de retravailler ensemble.",
  },
  {
    name: "ChristopheBouryvis",
    text: "Travail impeccable, quelques ajustements normaux pour une automatisation. Très professionnel, je recommande.",
    reply: "Merci pour votre retour. Ravi d'avoir pu vous accompagner — disponible pour la suite.",
    review_date: "2026-02-02",
  },
  {
    name: "Foliobook",
    text: "Correction d'un workflow complexe (transfert d'images + traduction) résolu rapidement. Solution structurée et fiable. Maîtrise claire des enjeux d'automatisation et d'IA.",
    reply: "Merci pour votre confiance. Le problème a été identifié et corrigé pour gérer correctement texte/images dans les deux sens.",
    review_date: "2026-01-27",
  },
  {
    name: "YoannCoste1",
    text: "Très professionnel et répond très rapidement.",
    reply: "Merci pour votre précieux avis.",
    review_date: "2026-01-25",
  },
  {
    name: "FastEnglishAcademy",
    text: "Go scale studio est très professionnel, c'est agréable de travailler avec lui.",
    reply: "Une fois de plus, merci.",
    review_date: "2026-01-22",
  },
  {
    name: "FastEnglishAcademy",
    text: "Merci pour votre réactivité !",
    reply: "Je vous en prie et à la prochaine pour d'autres projets.",
    review_date: "2026-01-19",
  },
  {
    name: "LaetitiaBoutefeu",
    text: "Commande complexe avec beaucoup d'allers-retours. Patience, capacité d'apprentissage et flexibilité tout au long du projet. Collaboration engagée et respectueuse.",
    reply: "Merci pour ce retour si détaillé. Au plaisir de poursuivre cette belle collaboration.",
    review_date: "2026-01-04",
  },
  {
    name: "LefrereZ",
    text: "Super travail, rapide et efficace !",
    reply: "Merci encore pour votre confiance ! À la prochaine.",
    review_date: "2025-12-29",
  },
  {
    name: "INDIGO_ADS",
    text: "Excellent travail, je recommande.",
    reply: "Merci beaucoup et à la prochaine chez GoScaleStudio.",
    review_date: "2025-12-16",
  },
];

export async function POST() {
  // Auth check
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  if (!token || !(await verifySignedToken(token))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    // Idempotent: skip names already imported from ComeUp with same first 30 chars
    const existing = (await getAllTestimonials()) as Array<{ name: string; text: string; source?: string }>;
    const seen = new Set(
      existing
        .filter((t) => (t.source || "") === "ComeUp")
        .map((t) => `${t.name}::${(t.text || "").slice(0, 30)}`)
    );

    let created = 0;
    let skipped = 0;
    for (const r of COMEUP_REVIEWS) {
      const key = `${r.name}::${r.text.slice(0, 30)}`;
      if (seen.has(key)) {
        skipped++;
        continue;
      }
      await createTestimonial({
        name: r.name,
        role: r.role || "",
        text: r.text,
        rating: 5,
        status: "published",
        source: "ComeUp",
        reply: r.reply || "",
        review_date: r.review_date || null,
      });
      created++;
    }

    return NextResponse.json({ success: true, created, skipped, total: COMEUP_REVIEWS.length });
  } catch (error) {
    console.error("Seed ComeUp error:", error);
    return NextResponse.json({ error: "Erreur d'import" }, { status: 500 });
  }
}
