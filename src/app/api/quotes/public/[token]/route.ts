import { NextResponse } from "next/server";
import { getQuoteByToken, markQuoteViewed, markQuoteAccepted, markQuoteDeclined } from "@/lib/db";

export const runtime = "nodejs";
type Ctx = { params: Promise<{ token: string }> };

// GET /api/quotes/public/[token] — public, no auth
// Marks the quote as 'viewed' on first read.
export async function GET(_request: Request, context: Ctx) {
  try {
    const { token } = await context.params;
    if (!token || !/^[a-f0-9]{32}$/.test(token)) {
      return NextResponse.json({ error: "Lien invalide" }, { status: 400 });
    }
    const q = await getQuoteByToken(token);
    if (!q) return NextResponse.json({ error: "Devis introuvable" }, { status: 404 });

    // Don't expose internal id; bump status to 'viewed' on first open
    await markQuoteViewed(token);
    return NextResponse.json({
      token: q.token,
      client_name: q.client_name,
      client_company: q.client_company,
      title: q.title,
      items: q.items,
      notes: q.notes,
      currency: q.currency,
      validity_days: q.validity_days,
      status: q.status,
      created_at: q.created_at,
      sent_at: q.sent_at,
      accepted_at: q.accepted_at,
      declined_at: q.declined_at,
    });
  } catch (error) {
    console.error("GET public quote error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/quotes/public/[token] — public action: { action: 'accept' | 'decline' }
export async function POST(request: Request, context: Ctx) {
  try {
    const { token } = await context.params;
    if (!token || !/^[a-f0-9]{32}$/.test(token)) {
      return NextResponse.json({ error: "Lien invalide" }, { status: 400 });
    }
    const body = await request.json();
    if (body.action === "accept") {
      const q = await markQuoteAccepted(token);
      if (!q) return NextResponse.json({ error: "Action impossible (déjà traité)" }, { status: 400 });
      return NextResponse.json({ success: true, status: q.status });
    }
    if (body.action === "decline") {
      const q = await markQuoteDeclined(token);
      if (!q) return NextResponse.json({ error: "Action impossible (déjà traité)" }, { status: 400 });
      return NextResponse.json({ success: true, status: q.status });
    }
    return NextResponse.json({ error: "Action invalide" }, { status: 400 });
  } catch (error) {
    console.error("POST public quote error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
