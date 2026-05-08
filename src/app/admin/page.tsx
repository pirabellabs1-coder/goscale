"use client";

import { useState, useEffect } from "react";
import { useProjects } from "@/lib/ProjectContext";
import {
  FolderOpen, Eye, FileEdit, MessageSquare, Inbox,
  Database, CheckCircle, AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { projects, messages, loading, dbReady, setupDatabase } = useProjects();
  const [setting, setSetting] = useState(false);
  const [setupDone, setSetupDone] = useState(false);
  const [setupError, setSetupError] = useState(false);

  const published = projects.filter((p) => p.status === "published").length;
  const drafts = projects.filter((p) => p.status === "draft").length;
  const unread = messages.filter((m) => !m.is_read).length;

  const handleSetup = async () => {
    setSetting(true);
    setSetupError(false);
    const ok = await setupDatabase();
    setSetting(false);
    if (ok) setSetupDone(true);
    else setSetupError(true);
  };

  const statCards = [
    { label: "Total Projets", value: projects.length, icon: FolderOpen, color: "brand" },
    { label: "Publi\u00e9s", value: published, icon: Eye, color: "emerald" },
    { label: "Brouillons", value: drafts, icon: FileEdit, color: "amber" },
    { label: "Messages", value: messages.length, icon: MessageSquare, color: "blue" },
    { label: "Non lus", value: unread, icon: Inbox, color: "purple" },
  ];

  const colorClasses: Record<string, string> = {
    brand: "bg-brand/10 text-brand",
    emerald: "bg-emerald/10 text-emerald",
    amber: "bg-amber/10 text-amber",
    blue: "bg-blue/10 text-blue",
    purple: "bg-purple/10 text-purple",
  };

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
        <h1 className="font-display text-2xl font-bold mb-1">Tableau de bord</h1>
        <p className="text-white/40 text-sm">Vue d&apos;ensemble de votre activit&eacute;</p>
      </div>

      {/* Database Setup Banner */}
      {!dbReady && !setupDone && (
        <div className="bg-amber/10 border border-amber/20 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <Database size={24} className="text-amber flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-amber mb-1">Configuration de la base de donn&eacute;es</h3>
              <p className="text-white/50 text-sm mb-4">
                Cliquez ci-dessous pour cr&eacute;er les tables et ajouter les donn&eacute;es initiales.
                Assurez-vous que la base Postgres est connect&eacute;e dans Vercel.
              </p>
              {setupError && (
                <div className="flex items-center gap-2 text-red-400 text-sm mb-3">
                  <AlertTriangle size={14} />
                  Erreur : v&eacute;rifiez que Postgres est configur&eacute; dans Vercel Dashboard &rarr; Storage
                </div>
              )}
              <button
                onClick={handleSetup}
                disabled={setting}
                className="btn-primary px-6 py-3 rounded-xl text-sm font-bold disabled:opacity-50"
              >
                {setting ? "Configuration en cours..." : "Initialiser la base de donn\u00e9es"}
              </button>
            </div>
          </div>
        </div>
      )}

      {setupDone && (
        <div className="bg-emerald/10 border border-emerald/20 rounded-2xl p-4 mb-8 flex items-center gap-3">
          <CheckCircle size={20} className="text-emerald" />
          <p className="text-emerald text-sm font-semibold">Base de donn&eacute;es initialis&eacute;e avec succ&egrave;s !</p>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((s, i) => (
          <div key={i} className="stat-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[s.color]}`}>
                <s.icon size={18} />
              </div>
            </div>
            <p className="text-2xl font-display font-bold mb-1">{s.value}</p>
            <p className="text-white/40 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Projects + Recent Messages */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold">Projets R&eacute;cents</h3>
            <Link href="/admin/portfolio" className="text-xs text-brand hover:text-brand/80">Voir tout &rarr;</Link>
          </div>
          <div className="flex flex-col gap-3">
            {projects.length === 0 && (
              <p className="text-white/30 text-sm py-4 text-center">Aucun projet</p>
            )}
            {projects.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-dark-3 border border-border">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.title}</p>
                  <p className="text-xs text-white/40">{p.category} &middot; {p.result}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  p.status === "published" ? "bg-emerald/10 text-emerald" : "bg-amber/10 text-amber"
                }`}>
                  {p.status === "published" ? "Publi\u00e9" : "Brouillon"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold">Messages R&eacute;cents</h3>
            <Link href="/admin/messages" className="text-xs text-brand hover:text-brand/80">Voir tout &rarr;</Link>
          </div>
          <div className="flex flex-col gap-3">
            {messages.length === 0 && (
              <p className="text-white/30 text-sm py-4 text-center">Aucun message</p>
            )}
            {messages.slice(0, 5).map((m) => (
              <div key={m.id} className="flex items-start gap-3 p-3 rounded-xl bg-dark-3 border border-border">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  m.is_read ? "bg-white/5 text-white/30" : "bg-brand/20 text-brand"
                }`}>
                  {m.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">{m.name}</p>
                    {!m.is_read && <span className="w-2 h-2 rounded-full bg-brand flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-white/40 truncate">{m.service} &middot; {m.email}</p>
                  <p className="text-xs text-white/30 mt-1 line-clamp-1">{m.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
