"use client";

import { useState } from "react";
import { Save, Globe, Mail, User, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "GoScaleStudio",
    siteDesc: "Studio specialise en automatisation, chatbots IA, callbots vocaux, sites WordPress SEO et maquettes UI/UX.",
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
        <h1 className="font-display text-2xl font-bold mb-1">Parametres</h1>
        <p className="text-white/40 text-sm">Configuration generale du site</p>
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
              <label className="text-xs text-white/40 mb-1.5 block">Telephone</label>
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
              <p className="text-xs text-white/40">Desactive le site public temporairement</p>
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
          <Save size={16} /> {saved ? "Enregistre !" : "Enregistrer les modifications"}
        </button>
      </div>
    </div>
  );
}
