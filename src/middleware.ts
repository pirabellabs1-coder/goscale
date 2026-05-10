import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Pays où le français est langue officielle ou massivement utilisé.
// Pour ces pays, on garde le site en français par défaut.
const FRANCOPHONE_COUNTRIES = new Set<string>([
  // Europe
  "FR", "BE", "CH", "MC", "LU",
  // Afrique francophone (incl. Bénin)
  "BJ", "CI", "SN", "TG", "BF", "ML", "NE", "MR", "GN",
  "GA", "CG", "CD", "TD", "CM", "MG", "CF", "DJ", "KM",
  "RW", "BI", "GQ",
  // Maghreb (FR très présent)
  "MA", "TN", "DZ",
  // DOM-TOM
  "MQ", "GP", "RE", "GF", "PF", "NC", "YT", "PM", "WF",
  // Caraïbes / Pacifique
  "HT", "VU",
]);

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // 1. Préférence utilisateur explicite (cookie posé par le toggle FR/EN) → on respecte
  const cookieLang = request.cookies.get("gs-lang")?.value;
  if (cookieLang === "fr" || cookieLang === "en") {
    return NextResponse.next();
  }

  // 2. Si l'URL a déjà ?lang=… → on respecte le lien partagé
  const urlLang = searchParams.get("lang");
  if (urlLang === "fr" || urlLang === "en") {
    return NextResponse.next();
  }

  // 3. Détection auto : Vercel geo (header injecté en prod) + Accept-Language
  const country = (request.headers.get("x-vercel-ip-country") || "").toUpperCase();
  const acceptLang = (request.headers.get("accept-language") || "").toLowerCase();

  const isFrenchSpeaker =
    FRANCOPHONE_COUNTRIES.has(country) || acceptLang.startsWith("fr");

  // Visiteur non francophone → redirige vers la version anglaise par défaut.
  // Visiteur francophone → laisse l'URL FR par défaut (no lang param).
  if (!isFrenchSpeaker) {
    const url = request.nextUrl.clone();
    url.searchParams.set("lang", "en");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Ne s'exécute que sur les pages publiques :
  // exclut API, _next, le panel admin (gs-panel-*) et les fichiers statiques (extension dans le path).
  matcher: [
    "/((?!api|_next/static|_next/image|gs-panel-|favicon\\.ico|robots\\.txt|sitemap\\.xml|llms\\.txt|logo\\.jpg|.*\\.[a-zA-Z]{2,5}$).*)",
  ],
};
