import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedToken } from "@/lib/auth";
import { createTables } from "@/lib/db";
import { sql } from "@vercel/postgres";

export async function POST() {
  // Only allow authenticated admin
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  if (!token || !(await verifySignedToken(token))) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  try {
    await createTables();

    // Seed projects if table is empty
    const { rows: existing } = await sql`SELECT COUNT(*)::int AS c FROM projects`;
    if (existing[0].c === 0) {
      await sql`
        INSERT INTO projects (title, category, description, long_description, result, tools, status, image_url, sort_order) VALUES
        ('Automatisation CRM — Agence Immobilière', 'Automatisation', 'Synchronisation complète leads + CRM + agenda.', 'Projet d''automatisation complète pour une agence immobilière de 12 agents. Synchronisation des leads entrants avec HubSpot, création automatique de tâches et rappels dans Google Calendar.', '+15h/sem', 'Make, HubSpot, Google Calendar', 'published', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80', 1),
        ('ChatBot WhatsApp — E-commerce Mode', 'ChatBot IA', 'Chatbot GPT-4 entraîné sur le catalogue produit.', 'Chatbot intelligent déployé sur WhatsApp Business pour une boutique de mode. Il recommande des produits, répond aux questions sur les tailles et les retours, et convertit les visiteurs en acheteurs.', '+35% conversion', 'Botpress, GPT-4, WhatsApp API', 'published', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', 2),
        ('Refonte WordPress — Cabinet de Conseil', 'WordPress + SEO', 'Refonte complète + SEO on-page.', 'Site vitrine WordPress avec Elementor et stratégie SEO complète. Optimisation technique, création de contenu optimisé et link building interne.', 'Page 1 Google', 'WordPress, Elementor, RankMath', 'published', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', 3),
        ('Assistant Vocal — Clinique Dentaire', 'CallBot IA', 'CallBot IA pour prise de RDV automatique.', 'Agent vocal IA disponible 24h/24 pour la prise de rendez-vous, la confirmation et l''envoi de rappels SMS. Les patients obtiennent un créneau en 30 secondes.', '-40% appels manqués', 'Vapi, Twilio, Make', 'published', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80', 4),
        ('Maquette FinTech App', 'Maquette UI/UX', 'Prototype cliquable pour levée de fonds.', 'Maquette interactive livrée en 48h pour une startup fintech. Design complet de l''onboarding, du dashboard et des flux de paiement.', 'Levée 200K€', 'Figma AI, v0.dev', 'published', 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80', 5),
        ('Automatisation Social Media — PME', 'Automatisation', 'Publication automatique sur 4 réseaux sociaux.', 'Workflow complet de publication et reporting automatisé. Planification, publication et analyse de performance sur Instagram, LinkedIn, Facebook et X.', '+8h/sem', 'Make, Buffer, Notion', 'published', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80', 6)
      `;
    }

    return NextResponse.json({ success: true, message: "Tables creees et donnees initiales ajoutees" });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json({ error: "Erreur lors de la configuration" }, { status: 500 });
  }
}
