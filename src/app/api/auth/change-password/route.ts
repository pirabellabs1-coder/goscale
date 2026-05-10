import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  readVerifiedToken,
  verifyPassword,
  hashPassword,
  createSignedToken,
} from "@/lib/auth";
import {
  getAdminUserByEmail,
  updateAdminPassword,
  updateAdminEmail,
} from "@/lib/db";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("gs-auth")?.value;
  const session = token ? await readVerifiedToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  let body: {
    currentPassword?: string;
    newPassword?: string;
    newEmail?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const { currentPassword, newPassword, newEmail } = body;
  if (!currentPassword) {
    return NextResponse.json(
      { error: "Mot de passe actuel requis" },
      { status: 400 }
    );
  }
  if (!newPassword && !newEmail) {
    return NextResponse.json(
      { error: "Nouveau mot de passe ou nouvel email requis" },
      { status: 400 }
    );
  }
  if (newPassword && newPassword.length < 12) {
    return NextResponse.json(
      { error: "Le mot de passe doit contenir au moins 12 caractères" },
      { status: 400 }
    );
  }
  if (newEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
    return NextResponse.json(
      { error: "Email invalide" },
      { status: 400 }
    );
  }

  const user = await getAdminUserByEmail(session.email);
  if (!user) {
    return NextResponse.json(
      { error: "Compte introuvable" },
      { status: 404 }
    );
  }

  const ok = await verifyPassword(currentPassword, user.password_hash);
  if (!ok) {
    return NextResponse.json(
      { error: "Mot de passe actuel incorrect" },
      { status: 401 }
    );
  }

  if (newPassword) {
    const hash = await hashPassword(newPassword);
    await updateAdminPassword(user.id, hash);
  }

  let finalEmail = user.email;
  if (newEmail && newEmail.toLowerCase() !== user.email.toLowerCase()) {
    // Conflict check
    const existing = await getAdminUserByEmail(newEmail);
    if (existing && existing.id !== user.id) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 409 }
      );
    }
    await updateAdminEmail(user.id, newEmail);
    finalEmail = newEmail.toLowerCase();
  }

  // Reissue cookie with possibly new email so future logout/check stays valid
  const newToken = await createSignedToken(finalEmail);
  cookieStore.set("gs-auth", newToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return NextResponse.json({ success: true, email: finalEmail });
}
