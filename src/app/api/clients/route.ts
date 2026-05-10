import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedToken } from "@/lib/auth";
import { getAllClients, createClient } from "@/lib/db";

export const runtime = "nodejs";

async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  return !!token && (await verifySignedToken(token));
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  try {
    return NextResponse.json(await getAllClients());
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json({ error: "Nom requis" }, { status: 400 });
    }
    const c = await createClient({
      name: body.name.trim().slice(0, 200),
      email: (body.email || "").trim().slice(0, 200),
      phone: (body.phone || "").trim().slice(0, 50),
      company: (body.company || "").trim().slice(0, 200),
      source: body.source || "manual",
      notes: (body.notes || "").slice(0, 2000),
    });
    return NextResponse.json(c, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur création" }, { status: 500 });
  }
}
