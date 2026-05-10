import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { verifySignedToken } from "@/lib/auth";
import { getQuoteById, getSettings, updateQuote } from "@/lib/db";

export const runtime = "nodejs";
type Ctx = { params: Promise<{ id: string }> };

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  return !!token && (await verifySignedToken(token));
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(_request: Request, context: Ctx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  try {
    const { id } = await context.params;
    const q = await getQuoteById(parseInt(id));
    if (!q) return NextResponse.json({ error: "Devis introuvable" }, { status: 404 });
    if (!q.client_email) {
      return NextResponse.json({ error: "Aucun email client renseigné sur ce devis" }, { status: 400 });
    }

    const settings = await getSettings().catch(() => null);
    const siteName = settings?.site_name || "GoScaleStudio";

    // Resolve absolute URL of the public quote
    const hdrs = await headers();
    const host = hdrs.get("x-forwarded-host") || hdrs.get("host") || "goscalestudio.com";
    const proto = hdrs.get("x-forwarded-proto") || "https";
    const link = `${proto}://${host}/devis/${q.token}`;

    const subjectText = `Votre devis ${q.title ? `« ${q.title} »` : ""} — ${siteName}`.trim();
    const totalNum = (q.items as Array<{ qty: number; unit_price: number }>)
      .reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.unit_price) || 0), 0);
    const totalStr = `${totalNum.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${q.currency === "EUR" ? "€" : q.currency}`;

    const fallbackBody =
      `Bonjour ${q.client_name},\n\n` +
      `Voici votre devis ${q.title ? `« ${q.title} »` : ""} :\n${link}\n\n` +
      `Total : ${totalStr}\nValide ${q.validity_days} jours.\n\n` +
      `Vous pouvez le consulter, l'accepter ou le télécharger en PDF directement depuis ce lien.\n\n` +
      `Cordialement,\n${siteName}`;

    // ── Resend not configured → tell the client to fall back to mailto: ──
    if (!process.env.RESEND_API_KEY) {
      const fallbackMailto = `mailto:${q.client_email}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(fallbackBody)}`;
      return NextResponse.json(
        {
          error: "Resend non configuré (env RESEND_API_KEY manquant). Ouverture de votre client mail à la place.",
          fallbackMailto,
        },
        { status: 503 }
      );
    }

    const from = process.env.RESEND_FROM_EMAIL || `${siteName} <onboarding@resend.dev>`;
    const safeName = escapeHtml(q.client_name || "");
    const safeTitle = escapeHtml(q.title || "Proposition commerciale");

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#0a0a0a;color:#fff;border-radius:16px">
        <h2 style="font-size:20px;margin:0 0 8px 0">Bonjour ${safeName},</h2>
        <p style="color:#aaa;line-height:1.5;margin:0 0 16px 0">Voici votre devis « <strong style="color:#fff">${safeTitle}</strong> ».</p>

        <div style="background:#161616;border:1px solid #222;border-radius:12px;padding:16px;margin:16px 0">
          <div style="display:flex;justify-content:space-between;align-items:baseline">
            <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.05em">Total</span>
            <span style="color:#F07830;font-weight:700;font-size:22px">${escapeHtml(totalStr)}</span>
          </div>
          <p style="color:#666;font-size:11px;margin:8px 0 0 0">Validité : ${q.validity_days} jours.</p>
        </div>

        <p style="margin:24px 0">
          <a href="${link}" style="display:inline-block;background:linear-gradient(135deg,#F07830,#D94048);color:#fff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:700">
            Voir mon devis →
          </a>
        </p>

        <p style="color:#777;font-size:13px;line-height:1.5">
          Vous pourrez le consulter, l'<strong style="color:#10B981">accepter</strong>, le <strong style="color:#EF4444">refuser</strong> ou le <strong style="color:#fff">télécharger en PDF</strong> directement depuis ce lien.
        </p>

        <p style="color:#555;font-size:11px;margin-top:32px;word-break:break-all">
          Si le bouton ne fonctionne pas, copiez ce lien :<br>${link}
        </p>

        <hr style="border:none;border-top:1px solid #222;margin:24px 0">
        <p style="color:#555;font-size:11px;text-align:center">
          Email envoyé par ${escapeHtml(siteName)}
        </p>
      </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: q.client_email,
        subject: subjectText,
        html,
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      console.error("Resend error:", res.status, t);
      const fallbackMailto = `mailto:${q.client_email}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(fallbackBody)}`;
      return NextResponse.json(
        {
          error: "Resend a refusé l'envoi (vérifiez le domaine vérifié ou la clé API).",
          fallbackMailto,
        },
        { status: 502 }
      );
    }

    // Bump status from 'draft' → 'sent' if applicable
    if (q.status === "draft") {
      await updateQuote(q.id, { status: "sent" });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("send-email error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
