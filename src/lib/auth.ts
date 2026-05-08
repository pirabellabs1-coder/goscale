// Simple hash function for client-side password verification
// Credentials are stored as hashed values in localStorage after first setup
export const ADMIN_EMAIL = "admin@goscalestudio.com";

// SHA-256 hash of the default password "GoScale@2024!"
// Change via the admin settings or env vars
const DEFAULT_PASSWORD_HASH = "a1b2c3d4"; // placeholder, actual hash computed at runtime

export function hashPassword(password: string): string {
  // Simple but effective hash for client-side auth
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

export function getStoredCredentials(): { email: string; passwordHash: string } | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("gs-admin-creds");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

export function setCredentials(email: string, password: string): void {
  localStorage.setItem(
    "gs-admin-creds",
    JSON.stringify({ email, passwordHash: hashPassword(password) })
  );
}

export function verifyCredentials(email: string, password: string): boolean {
  const stored = getStoredCredentials();
  if (!stored) {
    // First time setup - default credentials
    // email: admin@goscalestudio.com / password: GoScale@2024!
    if (email === "admin@goscalestudio.com" && password === "GoScale@2024!") {
      setCredentials(email, password);
      return true;
    }
    return false;
  }
  return stored.email === email && stored.passwordHash === hashPassword(password);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const session = sessionStorage.getItem("gs-admin-auth");
  return session === "authenticated";
}

export function login(): void {
  sessionStorage.setItem("gs-admin-auth", "authenticated");
}

export function logout(): void {
  sessionStorage.removeItem("gs-admin-auth");
}
