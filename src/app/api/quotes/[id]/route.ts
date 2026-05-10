import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedToken } from "@/lib/auth";
import { getQuoteById, updateQuote, deleteQuoteById } from "@/lib/db";

export const runtime = "nodejs";
type Ctx = { params: Promise<{ id: string }> };

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  if (!token || !(await verifySignedToken(token))) return false;
  return true;
}

export async function GET(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await context.params;
  const q = await getQuoteById(parseInt(id));
  if (!q) return NextResponse.json({ error: "Devis introuvable" }, { status: 404 });
  return NextResponse.json(q);
}

export async function PUT(request: Request, context: Ctx) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  try {
    const { id } = await context.params;
    const body = await request.json();
    const q = await updateQuote(parseInt(id), {
      client_name: body.client_name,
      client_email: body.client_email,
      client_company: body.client_company,
      client_phone: body.client_phone,
      title: body.title,
      items: body.items,
      notes: body.notes,
      currency: body.currency,
      validity_days: body.validity_days,
      status: body.status,
    });
    return NextResponse.json(q);
  } catch (error) {
    console.error("PUT quote error:", error);
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await context.params;
  await deleteQuoteById(parseInt(id));
  return NextResponse.json({ success: true });
}
