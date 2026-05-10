"use client";

import { useEffect, useState } from "react";
import {
  Save, Globe, Mail, Bell, Shield, Lock, Eye, EyeOff,
  AlertTriangle, CheckCircle2,
} from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "GoScaleStudio",
    siteDesc:
      "Studio specialise en automatisation, chatbots IA, callbots vocaux, sites WordPress SEO et maquettes UI/UX.",
    email: "contact@goscalestudio.com",
    phone: "+33 6 00 00 00 00",
    notifyEmail: true,
    notifyMessages: true,
    maintenanceMode: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1">Param&egrave;tres</h1>
        <p className="text-white/40 text-sm">Configuration g&eacute;n&eacute;rale du site</p>
      </div>

      <div className="max-w-2xl flex flex-col gap-8">
        {/* Site Info */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
              <Globe size={18} className="text-brand" />
            </div>
            <h3 className="font-display text-lg font-bold">Informations du site</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Nom du site</label>
              <input
                type="text" className="input-field" value={settings.siteName}
                onChange={(e) => update("siteName", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Description</label>
              <textarea
                rows={3} className="input-field resize-none" value={settings.siteDesc}
                onChange={(e) => update("siteDesc", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
              <Mail size={18} className="text-blue" />
            </div>
            <h3 className="font-display text-lg font-bold">Contact</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Email</label>
              <input
                type="email" className="input-field" value={settings.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">T&eacute;l&eacute;phone</label>
              <input
                type="tel" className="input-field" value={settings.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center">
              <Bell size={18} className="text-amber" />
            </div>
            <h3 className="font-display text-lg font-bold">Notifications</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Notifications email</p>
                <p className="text-xs text-white/40">Recevoir un email pour chaque nouveau message</p>
              </div>
              <div
                onClick={() => update("notifyEmail", !settings.notifyEmail)}
                className={`toggle-track ${settings.notifyEmail ? "on" : ""}`}
              >
                <div className="toggle-knob" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Alertes messages</p>
                <p className="text-xs text-white/40">Notification dans le dashboard</p>
              </div>
              <div
                onClick={() => update("notifyMessages", !settings.notifyMessages)}
                className={`toggle-track ${settings.notifyMessages ? "on" : ""}`}
              >
                <div className="toggle-knob" />
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Shield size={18} className="text-red-400" />
            </div>
            <h3 className="font-display text-lg font-bold">Maintenance</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Mode maintenance</p>
              <p className="text-xs text-white/40">D&eacute;sactive le site public temporairement</p>
            </div>
            <div
              onClick={() => update("maintenanceMode", !settings.maintenanceMode)}
              className={`toggle-track ${settings.maintenanceMode ? "on" : ""}`}
            >
              <div className="toggle-knob" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button onClick={handleSave} className="btn-primary px-8 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 w-full">
          <Save size={16} /> {saved ? "Enregistré !" : "Enregistrer les modifications"}
        </button>

        {/* Security — admin account */}
        <SecuritySection />
      </div>
    </div>
  );
}

function SecuritySection() {
  const [adminEmail, setAdminEmail] = useState("");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    // Try to fetch the current admin email so the field is pre-filled
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setAdminEmail(d.email || ""))
      .catch(() => {});
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (newPw && newPw.length < 12) {
      setMsg({ type: "err", text: "Le mot de passe doit contenir au moins 12 caractères" });
      return;
    }
    if (newPw && newPw !== confirmPw) {
      setMsg({ type: "err", text: "Les mots de passe ne correspondent pas" });
      return;
    }
    if (!currentPw) {
      setMsg({ type: "err", text: "Mot de passe actuel requis" });
      return;
    }
    if (!newPw && !adminEmail) {
      setMsg({ type: "err", text: "Aucune modification à enregistrer" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: currentPw,
          newPassword: newPw || undefined,
          newEmail: adminEmail || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg({ type: "ok", text: "Identifiants mis à jour" });
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
        if (data.email) setAdminEmail(data.email);
      } else {
        setMsg({ type: "err", text: data.error || "Erreur" });
      }
    } catch {
      setMsg({ type: "err", text: "Erreur réseau" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark-2 rounded-2xl border border-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
          <Lock size={18} className="text-brand" />
        </div>
        <h3 className="font-display text-lg font-bold">S&eacute;curit&eacute; — Compte admin</h3>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Email administrateur</label>
          <input
            type="email"
            className="input-field"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-xs text-white/40 mb-3">
            Pour modifier l&#39;email ou le mot de passe, confirmez votre mot de passe actuel.
          </p>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Mot de passe actuel</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  className="input-field pr-10"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  autoComplete="current-password"
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
              <label className="text-xs text-white/40 mb-1.5 block">
                Nouveau mot de passe <span className="text-white/25">(laisser vide pour garder le m&ecirc;me)</span>
              </label>
              <input
                type={show ? "text" : "password"}
                className="input-field"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="Min. 12 caractères"
                autoComplete="new-password"
              />
            </div>

            {newPw && (
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Confirmer le nouveau mot de passe</label>
                <input
                  type={show ? "text" : "password"}
                  className="input-field"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            )}
          </div>
        </div>

        {msg && (
          <div
            className={`text-sm px-4 py-3 rounded-xl flex items-center gap-2 ${
              msg.type === "ok"
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            {msg.type === "ok" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            <span>{msg.text}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary px-6 py-3 rounded-xl text-sm font-bold disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Lock size={14} />
          {loading ? "Enregistrement..." : "Mettre à jour les identifiants"}
        </button>
      </form>
    </div>
  );
}
