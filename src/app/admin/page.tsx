"use client";

import { useProjects } from "@/lib/ProjectContext";
import {
  FolderOpen, Eye, FileEdit, MessageSquare, TrendingUp, Users,
} from "lucide-react";

export default function AdminDashboard() {
  const { projects, messages } = useProjects();

  const published = projects.filter((p) => p.status === "published").length;
  const drafts = projects.filter((p) => p.status === "draft").length;

  const statCards = [
    { label: "Total Projets", value: projects.length, icon: FolderOpen, color: "brand", change: "+2 ce mois" },
    { label: "Publies", value: published, icon: Eye, color: "emerald", change: `${Math.round((published / (projects.length || 1)) * 100)}% du total` },
    { label: "Brouillons", value: drafts, icon: FileEdit, color: "amber", change: "A publier" },
    { label: "Messages", value: messages.length, icon: MessageSquare, color: "blue", change: "Non lus" },
    { label: "Visites/mois", value: "2.4K", icon: Users, color: "purple", change: "+18% vs mois dernier" },
    { label: "Taux Conversion", value: "4.2%", icon: TrendingUp, color: "emerald", change: "+0.8% vs mois dernier" },
  ];

  const colorClasses: Record<string, string> = {
    brand: "bg-brand/10 text-brand",
    emerald: "bg-emerald/10 text-emerald",
    amber: "bg-amber/10 text-amber",
    blue: "bg-blue/10 text-blue",
    purple: "bg-purple/10 text-purple",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1">Tableau de bord</h1>
        <p className="text-white/40 text-sm">Vue d&apos;ensemble de votre activite</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((s, i) => (
          <div key={i} className="stat-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[s.color]}`}>
                <s.icon size={18} />
              </div>
            </div>
            <p className="text-2xl font-display font-bold mb-1">{s.value}</p>
            <p className="text-white/40 text-xs">{s.label}</p>
            <p className="text-white/30 text-xs mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Projects + Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <h3 className="font-display text-lg font-bold mb-4">Projets Recents</h3>
          <div className="flex flex-col gap-3">
            {projects.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-dark-3 border border-border">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.title}</p>
                  <p className="text-xs text-white/40">{p.category}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  p.status === "published" ? "bg-emerald/10 text-emerald" : "bg-amber/10 text-amber"
                }`}>
                  {p.status === "published" ? "Publie" : "Brouillon"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <h3 className="font-display text-lg font-bold mb-4">Activite Recente</h3>
          <div className="flex flex-col gap-4">
            {[
              { text: "Nouveau message de Jean-Marc D.", time: "Il y a 2h", color: "brand" },
              { text: "Projet 'ChatBot WhatsApp' publie", time: "Il y a 5h", color: "emerald" },
              { text: "Message de Sophie L. recu", time: "Il y a 5h", color: "blue" },
              { text: "Projet 'Maquette FinTech' mis a jour", time: "Hier", color: "amber" },
              { text: "Nouveau message de Marc A.", time: "Hier", color: "purple" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-${a.color}`} />
                <div>
                  <p className="text-sm text-white/70">{a.text}</p>
                  <p className="text-xs text-white/30">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
