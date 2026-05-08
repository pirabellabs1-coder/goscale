import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedToken } from "@/lib/auth";
import { getMessageById, markMessageRead, deleteMessageById } from "@/lib/db";

type Ctx = { params: Promise<{ id: string }> };

// GET /api/messages/[id]
export async function GET(_request: Request, context: Ctx) {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  if (!token || !(await verifySignedToken(token))) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const message = await getMessageById(parseInt(id));
    if (!message) return NextResponse.json({ error: "Message introuvable" }, { status: 404 });
    return NextResponse.json(message);
  } catch (error) {
    console.error("GET message error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT /api/messages/[id] — mark as read
export async function PUT(_request: Request, context: Ctx) {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  if (!token || !(await verifySignedToken(token))) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const message = await markMessageRead(parseInt(id));
    return NextResponse.json(message);
  } catch (error) {
    console.error("PUT message error:", error);
    return NextResponse.json({ error: "Erreur mise a jour" }, { status: 500 });
  }
}

// DELETE /api/messages/[id]
export async function DELETE(_request: Request, context: Ctx) {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  if (!token || !(await verifySignedToken(token))) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await deleteMessageById(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE message error:", error);
    return NextResponse.json({ error: "Erreur suppression" }, { status: 500 });
  }
}
