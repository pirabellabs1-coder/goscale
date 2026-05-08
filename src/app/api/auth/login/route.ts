import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getAdminEmail,
  getAdminPassword,
  createSignedToken,
  checkRateLimit,
} from "@/lib/auth";

export async function POST(request: Request) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const { allowed, remaining } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans 15 minutes." },
      {
        status: 429,
        headers: { "Retry-After": "900" },
      }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email et mot de passe requis" },
      { status: 400 }
    );
  }

  // Validate credentials against server-side env vars
  if (email !== getAdminEmail() || password !== getAdminPassword()) {
    return NextResponse.json(
      {
        error: "Email ou mot de passe incorrect",
        remaining,
      },
      { status: 401 }
    );
  }

  // Create signed token and set httpOnly cookie
  const token = await createSignedToken(email);
  const cookieStore = await cookies();

  cookieStore.set("gs-auth", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24h
    path: "/",
  });

  return NextResponse.json({ success: true });
}
