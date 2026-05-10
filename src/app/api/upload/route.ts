import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { put } from "@vercel/blob";
import { verifySignedToken } from "@/lib/auth";

export const runtime = "nodejs";
// 10 MB hard cap on a single image upload
const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

export async function POST(request: Request) {
  // ── Auth ──
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  if (!token || !(await verifySignedToken(token))) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // ── Blob configured? ──
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Stockage non configuré. Ouvrez Vercel → Storage → Create Blob store, redéployez, puis réessayez.",
      },
      { status: 503 }
    );
  }

  // ── Read file ──
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }

  // ── Validate ──
  if (file.size === 0) {
    return NextResponse.json({ error: "Fichier vide" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: `Fichier trop volumineux (max ${MAX_SIZE / (1024 * 1024)} MB)` },
      { status: 413 }
    );
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: `Type non supporté (${file.type}). Formats acceptés : JPEG, PNG, WebP, GIF, AVIF.` },
      { status: 415 }
    );
  }

  // ── Upload ──
  // Sanitize filename: strip directory parts and unsafe chars
  const safeName =
    file.name
      .split(/[\\/]/)
      .pop()!
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .slice(0, 100) || "upload";
  const path = `projects/${Date.now()}-${safeName}`;

  try {
    const blob = await put(path, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      size: file.size,
      type: file.type,
    });
  } catch (err) {
    console.error("Blob upload error:", err);
    return NextResponse.json(
      { error: "Erreur lors de l'upload. Réessayez." },
      { status: 500 }
    );
  }
}
