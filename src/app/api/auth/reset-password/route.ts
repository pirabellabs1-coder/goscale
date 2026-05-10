import { NextResponse } from "next/server";
import {
  hashResetToken,
  hashPassword,
  checkRateLimit,
} from "@/lib/auth";
import {
  getAdminUserById,
  updateAdminPassword,
} from "@/lib/db";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { allowed } = checkRateLimit(`reset:${ip}`, 5);
  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez plus tard." },
      { status: 429 }
    );
  }

  let body: { token?: string; id?: number; newPassword?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { token, id, newPassword } = body;
  if (!token || !id || !newPassword) {
    return NextResponse.json(
      { error: "Lien ou mot de passe manquant" },
      { status: 400 }
    );
  }
  if (newPassword.length < 12) {
    return NextResponse.json(
      { error: "Le mot de passe doit contenir au moins 12 caractères" },
      { status: 400 }
    );
  }

  const user = await getAdminUserById(Number(id));
  if (!user || !user.reset_token_hash || !user.reset_token_expires_at) {
    return NextResponse.json(
      { error: "Lien invalide ou expiré" },
      { status: 400 }
    );
  }
  if (new Date(user.reset_token_expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: "Lien expiré" }, { status: 400 });
  }

  const incomingHash = await hashResetToken(token);
  // Constant-time comparison
  const a = incomingHash;
  const b = user.reset_token_hash;
  if (a.length !== b.length) {
    return NextResponse.json({ error: "Lien invalide" }, { status: 400 });
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  if (diff !== 0) {
    return NextResponse.json({ error: "Lien invalide" }, { status: 400 });
  }

  const hash = await hashPassword(newPassword);
  await updateAdminPassword(user.id, hash);

  return NextResponse.json({ success: true });
}
