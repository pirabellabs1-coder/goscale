"use client";

import { useEffect, useState } from "react";
import {
  Save, Globe, Mail, Bell, Shield, Lock, Eye, EyeOff,
  AlertTriangle, CheckCircle2, Loader2, Image as ImageIcon, Upload, Trash2,
} from "lucide-react";

type SettingsState = {
  site_name: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  contact_whatsapp: string;
  contact_address: string;
  notify_email: boolean;
  notify_messages: boolean;
  maintenance_mode: boolean;
  maintenance_message: string;
  logo_url: string;
  about_photo_url: string;
};

const defaultSettings: SettingsState = {
  site_name: "GoScaleStudio",
  site_description: "",
  contact_email: "",
  contact_phone: "",
  contact_whatsapp: "",
  contact_address: "",
  notify_email: true,
  notify_messages: true,
  maintenance_mode: false,
  maintenance_message: "",
  logo_url: "",
  about_photo_url: "",
};

export default function SettingsPage() {
  const [s, setS] = useState<SettingsState>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setS({ ...defaultSettings, ...data });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setMsg(null);
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(s),
      });
      const data = await res.json();
      if (res.ok) {
        setS({ ...defaultSettings, ...data });
        setMsg({ type: "ok", text: "Modifications enregistrées et appliquées sur le site." });
      } else {
        setMsg({ type: "err", text: data.error || "Erreur" });
      }
    } catch {
      setMsg({ type: "err", text: "Erreur réseau" });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 4000);
    }
  };

  const upd = <K extends keyof SettingsState>(k: K, v: SettingsState[K]) =>
    setS((prev) => ({ ...prev, [k]: v }));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1">Paramètres</h1>
        <p className="text-white/40 text-sm">Configuration générale du site &mdash; appliquée immédiatement après sauvegarde</p>
      </div>

      <div className="max-w-2xl flex flex-col gap-6">
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
                type="text" className="input-field" value={s.site_name}
                onChange={(e) => upd("site_name", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Description</label>
              <textarea
                rows={3} className="input-field resize-none" value={s.site_description}
                onChange={(e) => upd("site_description", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Identité visuelle */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center">
              <ImageIcon size={18} className="text-purple" />
            </div>
            <h3 className="font-display text-lg font-bold">Identité visuelle</h3>
            <span className="ml-auto text-[10px] uppercase tracking-widest text-white/40">visible publiquement</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <ImageField
              label="Logo"
              hint="Carré recommandé. Affiché dans la barre de navigation."
              value={s.logo_url}
              fallback="/logo.jpg"
              rounded="rounded-xl"
              onChange={(url) => upd("logo_url", url)}
            />
            <ImageField
              label="Photo « À propos »"
              hint="Portrait 4:5 recommandé. Affichée dans la section À propos."
              value={s.about_photo_url}
              fallback="https://i.postimg.cc/tR89Dwj9/Whats-App-Image-2026-05-10-at-01-30-44.jpg"
              rounded="rounded-2xl"
              onChange={(url) => upd("about_photo_url", url)}
            />
          </div>
        </div>

        {/* Contact */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
              <Mail size={18} className="text-blue" />
            </div>
            <h3 className="font-display text-lg font-bold">Contact</h3>
            <span className="ml-auto text-[10px] uppercase tracking-widest text-white/40">visible publiquement</span>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Email</label>
              <input type="email" className="input-field" value={s.contact_email}
                     onChange={(e) => upd("contact_email", e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Téléphone</label>
                <input type="tel" className="input-field" value={s.contact_phone}
                       onChange={(e) => upd("contact_phone", e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">WhatsApp</label>
                <input type="tel" className="input-field" value={s.contact_whatsapp}
                       onChange={(e) => upd("contact_whatsapp", e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Localisation</label>
              <input type="text" className="input-field" value={s.contact_address}
                     onChange={(e) => upd("contact_address", e.target.value)} />
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
              <div onClick={() => upd("notify_email", !s.notify_email)}
                   className={`toggle-track ${s.notify_email ? "on" : ""}`}>
                <div className="toggle-knob" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Alertes messages</p>
                <p className="text-xs text-white/40">Notification dans le dashboard</p>
              </div>
              <div onClick={() => upd("notify_messages", !s.notify_messages)}
                   className={`toggle-track ${s.notify_messages ? "on" : ""}`}>
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
            <h3 className="font-display text-lg font-bold">Mode maintenance</h3>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Activer le mode maintenance</p>
                <p className="text-xs text-white/40">Affiche un bandeau plein écran sur le site public.</p>
              </div>
              <div onClick={() => upd("maintenance_mode", !s.maintenance_mode)}
                   className={`toggle-track ${s.maintenance_mode ? "on" : ""}`}>
                <div className="toggle-knob" />
              </div>
            </div>
            {s.maintenance_mode && (
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Message affiché aux visiteurs</label>
                <textarea
                  rows={2} className="input-field resize-none" value={s.maintenance_message}
                  onChange={(e) => upd("maintenance_message", e.target.value)}
                  placeholder="Le site est en maintenance..."
                />
              </div>
            )}
          </div>
        </div>

        {msg && (
          <div className={`text-sm px-4 py-3 rounded-xl flex items-center gap-2 ${
            msg.type === "ok"
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}>
            {msg.type === "ok" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            <span>{msg.text}</span>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary px-8 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 w-full disabled:opacity-50"
        >
          {saving ? (
            <><Loader2 size={16} className="animate-spin" /> Enregistrement...</>
          ) : (
            <><Save size={16} /> Enregistrer les modifications</>
          )}
        </button>

        {/* Security — admin account */}
        <SecuritySection />
      </div>
    </div>
  );
}

function ImageField({
  label, hint, value, fallback, rounded, onChange,
}: {
  label: string;
  hint: string;
  value: string;
  fallback: string;
  rounded: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;
    setErr(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
      } else {
        setErr(data.error || "Échec de l'upload");
      }
    } catch {
      setErr("Erreur réseau");
    } finally {
      setUploading(false);
    }
  };

  const preview = value || fallback;

  return (
    <div>
      <label className="text-xs text-white/40 mb-1.5 block">{label}</label>
      <div className="flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview}
          alt={label}
          className={`h-20 w-20 object-cover border border-border bg-dark shrink-0 ${rounded}`}
        />
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-2">
            <label className="btn-dark px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer">
              {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
              {uploading ? "Envoi..." : "Choisir une image"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                className="hidden"
                onChange={handleFile}
                disabled={uploading}
              />
            </label>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="px-2.5 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-1.5"
              >
                <Trash2 size={13} /> Retirer
              </button>
            )}
          </div>
          <p className="text-[11px] text-white/30 leading-snug">{hint}</p>
          {!value && <p className="text-[11px] text-white/25">Aucune image personnalisée — l&apos;image par défaut est utilisée.</p>}
          {err && <p className="text-[11px] text-red-400">{err}</p>}
        </div>
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
    if (!currentPw) { setMsg({ type: "err", text: "Mot de passe actuel requis" }); return; }
    if (!newPw && !adminEmail) { setMsg({ type: "err", text: "Aucune modification à enregistrer" }); return; }
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
        setCurrentPw(""); setNewPw(""); setConfirmPw("");
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
        <h3 className="font-display text-lg font-bold">Sécurité &mdash; Compte admin</h3>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Email administrateur</label>
          <input type="email" className="input-field" value={adminEmail}
                 onChange={(e) => setAdminEmail(e.target.value)} autoComplete="email" />
        </div>

        <div className="border-t border-border pt-4">
          <p className="text-xs text-white/40 mb-3">
            Pour modifier l&apos;email ou le mot de passe, confirmez votre mot de passe actuel.
          </p>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">Mot de passe actuel</label>
              <div className="relative">
                <input type={show ? "text" : "password"} className="input-field pr-10"
                       value={currentPw} onChange={(e) => setCurrentPw(e.target.value)}
                       autoComplete="current-password" />
                <button type="button" onClick={() => setShow(!show)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1.5 block">
                Nouveau mot de passe <span className="text-white/25">(laisser vide pour garder le même)</span>
              </label>
              <input type={show ? "text" : "password"} className="input-field"
                     value={newPw} onChange={(e) => setNewPw(e.target.value)}
                     placeholder="Min. 12 caractères" autoComplete="new-password" />
            </div>
            {newPw && (
              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Confirmer le nouveau mot de passe</label>
                <input type={show ? "text" : "password"} className="input-field"
                       value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)}
                       autoComplete="new-password" />
              </div>
            )}
          </div>
        </div>

        {msg && (
          <div className={`text-sm px-4 py-3 rounded-xl flex items-center gap-2 ${
            msg.type === "ok"
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}>
            {msg.type === "ok" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
            <span>{msg.text}</span>
          </div>
        )}

        <button type="submit" disabled={loading}
                className="btn-primary px-6 py-3 rounded-xl text-sm font-bold disabled:opacity-50 flex items-center justify-center gap-2">
          <Lock size={14} />
          {loading ? "Enregistrement..." : "Mettre à jour les identifiants"}
        </button>
      </form>
    </div>
  );
}
