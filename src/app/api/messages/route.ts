import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedToken } from "@/lib/auth";
import { getMessages, createMessage } from "@/lib/db";

// GET /api/messages — list messages (admin only)
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  if (!token || !(await verifySignedToken(token))) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  try {
    const messages = await getMessages();
    return NextResponse.json(messages);
  } catch (error) {
    console.error("GET /api/messages error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/messages — create message (public — from contact form)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Nom, email et message requis" }, { status: 400 });
    }

    const message = await createMessage({
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      service: body.service || "",
      message: body.message,
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("POST /api/messages error:", error);
    return NextResponse.json({ error: "Erreur envoi message" }, { status: 500 });
  }
}
