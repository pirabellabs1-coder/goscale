import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedToken } from "@/lib/auth";
import { updateClient, deleteClientById } from "@/lib/db";

export const runtime = "nodejs";
type Ctx = { params: Promise<{ id: string }> };

async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  return !!token && (await verifySignedToken(token));
}

export async function PUT(request: Request, context: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  try {
    const { id } = await context.params;
    const body = await request.json();
    const c = await updateClient(parseInt(id), body);
    return NextResponse.json(c);
  } catch {
    return NextResponse.json({ error: "Erreur mise à jour" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await context.params;
  await deleteClientById(parseInt(id));
  return NextResponse.json({ success: true });
}
