import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySignedToken, checkRateLimit } from "@/lib/auth";
import {
  getPublishedTestimonials,
  getAllTestimonials,
  createTestimonial,
} from "@/lib/db";

export const runtime = "nodejs";

async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  return !!token && (await verifySignedToken(token));
}

// GET /api/testimonials
//   default → published only (public)
//   ?admin=true → all (admin only)
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const adminMode = url.searchParams.get("admin") === "true";
    if (adminMode) {
      if (!(await isAdmin())) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
      }
      return NextResponse.json(await getAllTestimonials());
    }
    return NextResponse.json(await getPublishedTestimonials());
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/testimonials — public submission via /avis page
//   - Anyone can submit (rate-limited)
//   - Lands as 'pending', admin must approve
//   - Admin can pass status: 'published' if authenticated
export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // 5 submissions / 60min per IP
  const { allowed } = checkRateLimit(`testimonial:${ip}`, 5, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de soumissions. Réessayez plus tard." },
      { status: 429 }
    );
  }

  let body: {
    name?: string;
    role?: string;
    text?: string;
    rating?: number;
    email?: string;
    status?: string;
    source?: string;
    reply?: string;
    review_date?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const text = (body.text || "").trim();
  const role = (body.role || "").trim();
  const email = (body.email || "").trim();
  const rating = Number.isFinite(body.rating) ? Number(body.rating) : 5;

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
  }
  if (text.length < 10 || text.length > 2000) {
    return NextResponse.json(
      { error: "L'avis doit faire entre 10 et 2000 caractères" },
      { status: 400 }
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalide" }, { status: 400 });
  }

  // Admin can override status + source for manual entries
  const admin = await isAdmin();
  const status = admin && body.status ? body.status : "pending";
  const source = admin && body.source ? body.source : "site";

  try {
    const t = await createTestimonial({
      name: name.slice(0, 100),
      role: role.slice(0, 100),
      text: text.slice(0, 2000),
      rating,
      email: email.slice(0, 200),
      status,
      source,
      // Admin-only fields (only honored when authenticated)
      reply: admin && body.reply ? String(body.reply).slice(0, 2000) : "",
      review_date: admin && body.review_date ? body.review_date : null,
    });
    return NextResponse.json(t, { status: 201 });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json({ error: "Erreur enregistrement" }, { status: 500 });
  }
}
