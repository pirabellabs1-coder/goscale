// Server-side auth — DB-stored credentials with PBKDF2 hashing
// Bootstrap: if no admin row exists, env vars (ADMIN_EMAIL/ADMIN_PASSWORD) are accepted
// once and migrated to DB on first successful login.

import {
  getAdminUserByEmail,
  getAdminUserCount,
  createAdminUser,
} from "@/lib/db";

const AUTH_SECRET = process.env.AUTH_SECRET;
if (!AUTH_SECRET) console.error("[AUTH] AUTH_SECRET env var is missing!");

// ── Optional bootstrap env vars (no longer required after first login) ──
export function getBootstrapEmail(): string | null {
  return process.env.ADMIN_EMAIL || null;
}
export function getBootstrapPassword(): string | null {
  return process.env.ADMIN_PASSWORD || null;
}

// ── Password hashing (PBKDF2-HMAC-SHA256, 600k iterations) ──
const PBKDF2_ITERATIONS = 600_000;

function b64u(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return Buffer.from(bytes).toString("base64url");
}
function b64uDecode(s: string): Uint8Array<ArrayBuffer> {
  const buf = Buffer.from(s, "base64url");
  const out = new Uint8Array(buf.byteLength);
  out.set(buf);
  return out;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    key,
    256
  );
  return `pbkdf2$${PBKDF2_ITERATIONS}$${b64u(salt)}$${b64u(bits)}`;
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    const parts = hash.split("$");
    if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
    const iterations = parseInt(parts[1]);
    if (!Number.isFinite(iterations) || iterations < 1000) return false;
    const salt = b64uDecode(parts[2]);
    const expected = b64uDecode(parts[3]);
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveBits"]
    );
    const bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
      key,
      expected.length * 8
    );
    const actual = new Uint8Array(bits);
    if (actual.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < actual.length; i++) diff |= actual[i] ^ expected[i];
    return diff === 0;
  } catch {
    return false;
  }
}

// ── Signed session tokens (HMAC-SHA256 over `email:timestamp`) ──
export async function createSignedToken(email: string): Promise<string> {
  const payload = `${email}:${Date.now()}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(AUTH_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${Buffer.from(payload).toString("base64url")}.${hex}`;
}

export async function verifySignedToken(token: string): Promise<boolean> {
  return (await readVerifiedToken(token)) !== null;
}

export async function readVerifiedToken(
  token: string
): Promise<{ email: string; issuedAt: number } | null> {
  try {
    const dotIdx = token.lastIndexOf(".");
    if (dotIdx === -1) return null;

    const b64Payload = token.slice(0, dotIdx);
    const sigHex = token.slice(dotIdx + 1);

    const payload = Buffer.from(b64Payload, "base64url").toString();
    const lastColon = payload.lastIndexOf(":");
    if (lastColon === -1) return null;
    const email = payload.slice(0, lastColon);
    const timestamp = parseInt(payload.slice(lastColon + 1));

    if (!Number.isFinite(timestamp) || Date.now() - timestamp > 24 * 60 * 60 * 1000) {
      return null;
    }

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(AUTH_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    const expectedHex = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (sigHex.length !== expectedHex.length) return null;
    let diff = 0;
    for (let i = 0; i < sigHex.length; i++) {
      diff |= sigHex.charCodeAt(i) ^ expectedHex.charCodeAt(i);
    }
    return diff === 0 ? { email, issuedAt: timestamp } : null;
  } catch {
    return null;
  }
}

// ── Login verification (DB → bootstrap fallback) ──
export type LoginResult =
  | { ok: true; email: string }
  | { ok: false; reason: "bad_credentials" | "no_admin" };

export async function verifyLogin(email: string, password: string): Promise<LoginResult> {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await getAdminUserByEmail(normalizedEmail);
  if (user) {
    const ok = await verifyPassword(password, user.password_hash);
    return ok ? { ok: true, email: user.email } : { ok: false, reason: "bad_credentials" };
  }

  // No DB row for this email — try bootstrap path if admin_users table is empty
  const count = await getAdminUserCount();
  if (count === 0) {
    const bootEmail = getBootstrapEmail();
    const bootPw = getBootstrapPassword();
    if (
      bootEmail &&
      bootPw &&
      bootEmail.trim().toLowerCase() === normalizedEmail &&
      password === bootPw
    ) {
      // Seed DB with hashed credentials
      const hash = await hashPassword(password);
      await createAdminUser(normalizedEmail, hash);
      return { ok: true, email: normalizedEmail };
    }
  }
  return { ok: false, reason: "bad_credentials" };
}

// ── Rate limiting (in-memory, per serverless instance) ──
const attempts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string, max = 5, windowMs = 15 * 60 * 1000): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1 };
  }
  if (entry.count >= max) return { allowed: false, remaining: 0 };
  entry.count++;
  return { allowed: true, remaining: max - entry.count };
}

// ── Reset token (random URL-safe string) ──
export function generateResetToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return b64u(bytes);
}

export async function hashResetToken(token: string): Promise<string> {
  const enc = new TextEncoder();
  const sig = await crypto.subtle.digest("SHA-256", enc.encode(token));
  return Buffer.from(new Uint8Array(sig)).toString("hex");
}
