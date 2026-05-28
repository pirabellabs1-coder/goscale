import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedToken } from "@/lib/auth";
import { getSettings, updateSettings } from "@/lib/db";

export const runtime = "nodejs";

async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  return !!token && (await verifySignedToken(token));
}

// GET — public reads (used by the home page to render contact info, site name, etc.)
export async function GET() {
  try {
    const s = await getSettings();
    return NextResponse.json(s, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT — admin only
export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const allowed = [
      "site_name", "site_description",
      "contact_email", "contact_phone", "contact_whatsapp", "contact_address",
      "notify_email", "notify_messages",
      "maintenance_mode", "maintenance_message",
      "logo_url", "about_photo_url",
    ] as const;
    const patch: Record<string, unknown> = {};
    for (const k of allowed) {
      if (body[k] !== undefined) patch[k] = body[k];
    }
    const s = await updateSettings(patch);
    return NextResponse.json(s);
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json({ error: "Erreur sauvegarde" }, { status: 500 });
  }
}
