"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShieldCheck, Eye, EyeOff, AlertTriangle, CheckCircle2 } from "lucide-react";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const id = searchParams.get("id") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 12) {
      setError("Mot de passe trop court (minimum 12 caractères)");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, id: Number(id), newPassword: password }),
      });
      const data = await res.json();
      if (res.ok) {
        setDone(true);
        setTimeout(() => router.push("/gs-panel-gaIoruEC3jwgWsgh"), 2000);
      } else {
        setError(data.error || "Erreur lors de la réinitialisation");
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  if (!token || !id) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
        <AlertTriangle size={16} className="flex-shrink-0" />
        <span>Lien invalide. Demandez un nouveau lien depuis la page de connexion.</span>
      </div>
    );
  }

  if (done) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-4 rounded-xl flex items-center gap-3">
        <CheckCircle2 size={20} className="flex-shrink-0" />
        <div>
          <p className="font-medium">Mot de passe réinitialisé</p>
          <p className="text-xs text-green-400/70 mt-0.5">Redirection vers la connexion...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-dark-2 rounded-2xl border border-border p-8">
      <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6">
        <ShieldCheck size={24} className="text-brand" />
      </div>
      <h2 className="font-display text-xl font-bold text-center mb-2">Nouveau mot de passe</h2>
      <p className="text-center text-white/30 text-xs mb-6">
        Choisissez un mot de passe d&#39;au moins 12 caractères
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
          <AlertTriangle size={16} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Nouveau mot de passe</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pr-10"
              placeholder="••••••••••••"
              required
              minLength={12}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Confirmation</label>
          <input
            type={show ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="input-field"
            placeholder="••••••••••••"
            required
            minLength={12}
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary px-6 py-3.5 rounded-xl text-sm font-bold mt-2 disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : "Définir le mot de passe"}
        </button>
      </div>
    </form>
  );
}

export default function ResetPage() {
  return (
    <div className="bg-dark text-white min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="font-display text-2xl font-bold mb-2">
            <span className="gradient-text">GoScale</span>Studio
          </div>
          <p className="text-white/40 text-sm">Réinitialisation du mot de passe</p>
        </div>
        <Suspense fallback={<div className="text-white/40 text-sm text-center">Chargement...</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
