"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, BarChart3, FolderOpen, MessageSquare, Star,
  Settings, Menu, X, LogOut, ChevronRight, Lock, Eye, EyeOff,
  ShieldCheck, AlertTriangle,
} from "lucide-react";

const PANEL = "/gs-panel-gaIoruEC3jwgWsgh";

const sidebarLinks = [
  { href: PANEL, label: "Dashboard", icon: LayoutDashboard },
  { href: `${PANEL}/analytics`, label: "Analytics", icon: BarChart3 },
  { href: `${PANEL}/portfolio`, label: "Portfolio", icon: FolderOpen },
  { href: `${PANEL}/messages`, label: "Messages", icon: MessageSquare },
  { href: `${PANEL}/testimonials`, label: "Avis clients", icon: Star },
  { href: `${PANEL}/settings`, label: "Parametres", icon: Settings },
];

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMsg, setForgotMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.reload();
      } else if (res.status === 429) {
        setError(data.error || "Trop de tentatives. R\u00e9essayez plus tard.");
      } else {
        setAttempts((p) => p + 1);
        setError(data.error || "Identifiants incorrects");
        setLoading(false);
      }
    } catch {
      setError("Erreur de connexion. V\u00e9rifiez votre r\u00e9seau.");
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMsg(null);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setForgotMsg({ type: "ok", text: data.message || "Email envoy\u00e9 si le compte existe." });
      } else {
        setForgotMsg({ type: "err", text: data.error || "Erreur" });
      }
    } catch {
      setForgotMsg({ type: "err", text: "Erreur r\u00e9seau" });
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="bg-dark text-white min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="font-display text-2xl font-bold mb-2">
            <span className="gradient-text">GoScale</span>Studio
          </div>
          <p className="text-white/40 text-sm">Espace Administration S&eacute;curis&eacute;</p>
        </div>

        <form onSubmit={handleLogin} className="bg-dark-2 rounded-2xl border border-border p-8">
          <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={24} className="text-brand" />
          </div>

          <h2 className="font-display text-xl font-bold text-center mb-2">Connexion</h2>
          <p className="text-center text-white/30 text-xs mb-6">Authentification s&eacute;curis&eacute;e HMAC-SHA256</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
              <AlertTriangle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {attempts >= 3 && (
            <div className="bg-amber/10 border border-amber/20 text-amber text-xs px-4 py-3 rounded-xl mb-4">
              Attention : {5 - attempts > 0 ? `${5 - attempts} tentative(s) restante(s)` : "Compte temporairement verrouill\u00e9"}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Email administrateur</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@goscalestudio.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="••••••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-6 py-3.5 rounded-xl text-sm font-bold mt-2 disabled:opacity-50"
            >
              {loading ? "V\u00e9rification..." : "Se connecter"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForgot(!showForgot);
                setForgotMsg(null);
              }}
              className="text-xs text-white/40 hover:text-brand transition-colors mt-1"
            >
              Mot de passe oubli&eacute; ?
            </button>
          </div>

          {showForgot && (
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-white/50 mb-3">
                Entrez votre email administrateur. Un lien de r&eacute;initialisation sera envoy&eacute; par email.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin@goscalestudio.com"
                  className="input-field flex-1"
                />
                <button
                  type="button"
                  onClick={handleForgot}
                  disabled={forgotLoading || !forgotEmail}
                  className="btn-primary px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-50 whitespace-nowrap"
                >
                  {forgotLoading ? "..." : "Envoyer"}
                </button>
              </div>
              {forgotMsg && (
                <p
                  className={`text-xs mt-3 ${
                    forgotMsg.type === "ok" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {forgotMsg.text}
                </p>
              )}
            </div>
          )}
        </form>

        <div className="text-center mt-6 flex items-center justify-center gap-2 text-white/15 text-xs">
          <Lock size={10} />
          <span>Connexion chiffr&eacute;e &middot; Cookie httpOnly &middot; Token sign&eacute; 24h</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  // Public sub-routes inside the admin panel that don't require auth
  const isPublicRoute = pathname?.startsWith(`${PANEL}/reset`) ?? false;

  useEffect(() => {
    if (isPublicRoute) return;
    fetch("/api/auth/check")
      .then((r) => {
        setAuthenticated(r.ok);
        setChecking(false);
      })
      .catch(() => {
        setAuthenticated(false);
        setChecking(false);
      });
  }, [isPublicRoute]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  const isActive = (href: string) => {
    if (href === PANEL) return pathname === PANEL;
    return pathname.startsWith(href);
  };

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="bg-dark min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginPage />;
  }

  return (
    <div className="bg-dark text-white min-h-screen flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-dark-2 border-r border-border min-h-screen fixed left-0 top-0 bottom-0">
        <div className="p-6 border-b border-border">
          <Link href="/" className="font-display text-xl font-bold">
            <span className="gradient-text">GoScale</span>Studio
          </Link>
          <p className="text-xs text-white/30 mt-1">Administration</p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {sidebarLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive(l.href)
                  ? "bg-brand/10 text-brand border border-brand/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <l.icon size={18} />
              {l.label}
              {isActive(l.href) && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border flex flex-col gap-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <LogOut size={18} />
            Retour au site
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all text-left">
            <Lock size={18} />
            D&eacute;connexion
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-72 bg-dark-2 min-h-screen border-r border-border flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <Link href="/" className="font-display text-xl font-bold">
                <span className="gradient-text">GoScale</span>Studio
              </Link>
              <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
            </div>
            <nav className="flex-1 p-4 flex flex-col gap-1">
              {sidebarLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(l.href)
                      ? "bg-brand/10 text-brand border border-brand/20"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <l.icon size={18} />
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-border flex flex-col gap-1">
              <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white">
                <LogOut size={18} />
                Retour au site
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/60 hover:text-red-400 text-left">
                <Lock size={18} />
                D&eacute;connexion
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-40 bg-dark/80 backdrop-blur-lg border-b border-border px-6 py-4 flex items-center justify-between">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="hidden lg:block">
            <h2 className="font-display text-lg font-bold">
              {sidebarLinks.find((l) => isActive(l.href))?.label || "Admin"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand text-xs font-bold">
              GS
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
