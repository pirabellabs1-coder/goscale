import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedToken } from "@/lib/auth";
import {
  getTestimonialById,
  updateTestimonial,
  deleteTestimonialById,
} from "@/lib/db";

export const runtime = "nodejs";
type Ctx = { params: Promise<{ id: string }> };

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  if (!token || !(await verifySignedToken(token))) return false;
  return true;
}

// GET — admin can fetch a single testimonial (e.g. to edit)
export async function GET(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const { id } = await context.params;
    const t = await getTestimonialById(parseInt(id));
    if (!t) return NextResponse.json({ error: "Avis introuvable" }, { status: 404 });
    return NextResponse.json(t);
  } catch (error) {
    console.error("GET testimonial error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT — update (status change, edit, sort_order)
export async function PUT(request: Request, context: Ctx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const { id } = await context.params;
    const body = await request.json();
    const t = await updateTestimonial(parseInt(id), {
      name: body.name,
      role: body.role,
      text: body.text,
      rating: body.rating,
      status: body.status,
      sort_order: body.sort_order,
      reply: body.reply,
      review_date: body.review_date,
      source: body.source,
    });
    return NextResponse.json(t);
  } catch (error) {
    console.error("PUT testimonial error:", error);
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const { id } = await context.params;
    await deleteTestimonialById(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE testimonial error:", error);
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
