import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedToken } from "@/lib/auth";
import { getAllQuotes, createQuote } from "@/lib/db";

export const runtime = "nodejs";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  if (!token || !(await verifySignedToken(token))) return false;
  return true;
}

// GET /api/quotes — admin: list all quotes
export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    return NextResponse.json(await getAllQuotes());
  } catch (error) {
    console.error("GET /api/quotes error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/quotes — admin: create a new quote
export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body.client_name || typeof body.client_name !== "string" || body.client_name.trim().length < 2) {
      return NextResponse.json({ error: "Nom du client requis" }, { status: 400 });
    }
    const items = Array.isArray(body.items) ? body.items : [];
    const quote = await createQuote({
      client_name: body.client_name.trim().slice(0, 200),
      client_email: (body.client_email || "").trim().slice(0, 200),
      client_company: (body.client_company || "").trim().slice(0, 200),
      client_phone: (body.client_phone || "").trim().slice(0, 50),
      title: (body.title || "").trim().slice(0, 200),
      items,
      notes: (body.notes || "").slice(0, 5000),
      currency: (body.currency || "EUR").slice(0, 5),
      validity_days: Math.max(1, Math.min(365, parseInt(body.validity_days) || 30)),
      status: body.status || "draft",
    });
    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error("POST /api/quotes error:", error);
    return NextResponse.json({ error: "Erreur création devis" }, { status: 500 });
  }
}
