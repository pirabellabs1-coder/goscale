// Server-side auth utilities — credentials via env vars, HMAC-SHA256 signed tokens

const AUTH_SECRET = process.env.AUTH_SECRET || "gs_k8Tz!mP3xR7vQ2wL9nB5jF0hD6";

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || "admin@goscalestudio.com";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "GoScale@2024!";
}

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
  try {
    const dotIdx = token.lastIndexOf(".");
    if (dotIdx === -1) return false;

    const b64Payload = token.slice(0, dotIdx);
    const sigHex = token.slice(dotIdx + 1);

    const payload = Buffer.from(b64Payload, "base64url").toString();
    const parts = payload.split(":");
    const timestamp = parseInt(parts[parts.length - 1]);

    // Token expires after 24h
    if (isNaN(timestamp) || Date.now() - timestamp > 24 * 60 * 60 * 1000) {
      return false;
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

    // Constant-time comparison
    if (sigHex.length !== expectedHex.length) return false;
    let diff = 0;
    for (let i = 0; i < sigHex.length; i++) {
      diff |= sigHex.charCodeAt(i) ^ expectedHex.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}

// Rate limiting (in-memory, per serverless instance)
const attempts = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const window = 15 * 60 * 1000; // 15 min
  const maxAttempts = 5;

  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + window });
    return { allowed: true, remaining: maxAttempts - 1 };
  }

  if (entry.count >= maxAttempts) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: maxAttempts - entry.count };
}
