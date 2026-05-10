import { NextResponse } from "next/server";
import {
  generateResetToken,
  hashResetToken,
  checkRateLimit,
} from "@/lib/auth";
import { getAdminUserByEmail, setAdminResetToken } from "@/lib/db";

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1h

async function sendResetEmail(to: string, resetUrl: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY non configuré");

  const from =
    process.env.RESEND_FROM_EMAIL ||
    "GoScaleStudio <onboarding@resend.dev>";

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#0a0a0a;color:#fff;border-radius:16px">
      <h2 style="font-size:20px;margin-bottom:12px">Réinitialisation du mot de passe</h2>
      <p style="color:#999;line-height:1.5">Une demande de réinitialisation a été faite pour ce compte administrateur GoScaleStudio.</p>
      <p style="color:#999;line-height:1.5">Cliquez sur le lien ci-dessous (valable 1h) pour définir un nouveau mot de passe&nbsp;:</p>
      <p style="margin:24px 0">
        <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#F07830,#D94048);color:#fff;text-decoration:none;padding:12px 24px;border-radius:12px;font-weight:bold">
          Réinitialiser mon mot de passe
        </a>
      </p>
      <p style="color:#666;font-size:12px">Si vous n'êtes pas à l'origine de cette demande, ignorez ce message — votre mot de passe restera inchangé.</p>
      <p style="color:#444;font-size:11px;margin-top:24px;word-break:break-all">${resetUrl}</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: "Réinitialisation de votre mot de passe GoScaleStudio",
      html,
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Resend API: ${res.status} ${t}`);
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Looser rate limit than login: 3 / 15min
  const { allowed } = checkRateLimit(`forgot:${ip}`, 3);
  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de demandes. Réessayez plus tard." },
      { status: 429 }
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
  const email = body.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  const user = await getAdminUserByEmail(email);

  // If Resend isn't configured, surface a clear error so the user knows
  // they have to either configure it or use the change-password flow once logged in.
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Récupération par email non configurée. Définissez RESEND_API_KEY dans Vercel, ou changez le mot de passe via la variable d'environnement ADMIN_PASSWORD.",
      },
      { status: 503 }
    );
  }

  if (user) {
    const token = generateResetToken();
    const tokenHash = await hashResetToken(token);
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);
    await setAdminResetToken(user.id, tokenHash, expiresAt);

    const origin =
      request.headers.get("origin") ||
      `https://${request.headers.get("host")}`;
    const resetUrl = `${origin}/gs-panel-gaIoruEC3jwgWsgh/reset?token=${encodeURIComponent(
      token
    )}&id=${user.id}`;

    try {
      await sendResetEmail(user.email, resetUrl);
    } catch (err) {
      console.error("[forgot-password] email send failed:", err);
      return NextResponse.json(
        {
          error:
            "Impossible d'envoyer l'email. Vérifiez la configuration Resend (RESEND_API_KEY, domaine vérifié).",
        },
        { status: 502 }
      );
    }
  }

  // Always return success to avoid leaking which emails are registered
  return NextResponse.json({
    success: true,
    message:
      "Si cet email correspond à un compte, un lien de réinitialisation a été envoyé.",
  });
}
