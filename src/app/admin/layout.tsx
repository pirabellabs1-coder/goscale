"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, BarChart3, FolderOpen, MessageSquare,
  Settings, Menu, X, LogOut, ChevronRight, Lock, Eye, EyeOff,
} from "lucide-react";
import { isAuthenticated, verifyCredentials, login, logout } from "@/lib/auth";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderOpen },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Parametres", icon: Settings },
];

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Small delay to prevent brute force
    setTimeout(() => {
      if (verifyCredentials(email, password)) {
        login();
        window.location.reload();
      } else {
        setError("Email ou mot de passe incorrect");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="bg-dark text-white min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="font-display text-2xl font-bold mb-2">
            <span className="gradient-text">GoScale</span>Studio
          </div>
          <p className="text-white/40 text-sm">Espace Administration</p>
        </div>

        <form onSubmit={handleLogin} className="bg-dark-2 rounded-2xl border border-border p-8">
          <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={24} className="text-brand" />
          </div>

          <h2 className="font-display text-xl font-bold text-center mb-6">Connexion</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@goscalestudio.com"
                required
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
                  placeholder="••••••••"
                  required
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
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </div>
        </form>

        <p className="text-center text-white/20 text-xs mt-6">
          Acces reserve aux administrateurs
        </p>
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

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setChecking(false);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  if (checking) {
    return <div className="bg-dark min-h-screen" />;
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
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all">
            <Lock size={18} />
            Deconnexion
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
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400/60 hover:text-red-400">
                <Lock size={18} />
                Deconnexion
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
