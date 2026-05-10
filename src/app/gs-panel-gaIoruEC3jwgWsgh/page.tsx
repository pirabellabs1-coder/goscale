"use client";

import { useEffect, useMemo, useState } from "react";
import { useProjects } from "@/lib/ProjectContext";
import {
  FolderOpen, Eye, FileEdit, MessageSquare, Inbox, TrendingUp,
  Database, CheckCircle, AlertTriangle, Activity, Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

interface Stats {
  projects: { total_projects: number; published: number; drafts: number };
  messages: { total_messages: number; unread: number; this_month: number };
  messagesByService: { service: string; count: number }[];
  messagesByMonth: { month: string; month_num: number; count: number }[];
  projectsByCategory: { category: string; count: number }[];
}

const TOOLTIP = {
  backgroundColor: "#1E1E1E",
  borderColor: "#333",
  borderWidth: 1,
  titleColor: "#fff",
  bodyColor: "#aaa",
  padding: 12,
  cornerRadius: 8,
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: TOOLTIP },
  scales: {
    x: {
      grid: { color: "rgba(255,255,255,0.04)" },
      ticks: { color: "rgba(255,255,255,0.3)", font: { size: 10 } },
    },
    y: {
      grid: { color: "rgba(255,255,255,0.04)" },
      ticks: { color: "rgba(255,255,255,0.3)", font: { size: 10 }, precision: 0 },
      beginAtZero: true,
    },
  },
};

const barHorizontalOptions = {
  ...lineOptions,
  indexAxis: "y" as const,
  scales: {
    x: {
      grid: { color: "rgba(255,255,255,0.04)" },
      ticks: { color: "rgba(255,255,255,0.3)", font: { size: 10 }, precision: 0 },
      beginAtZero: true,
    },
    y: {
      grid: { display: false },
      ticks: { color: "rgba(255,255,255,0.5)", font: { size: 11 } },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "68%",
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        color: "rgba(255,255,255,0.55)",
        padding: 14,
        font: { size: 11 },
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
      },
    },
    tooltip: TOOLTIP,
  },
};

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

const CATEGORY_COLORS: Record<string, string> = {
  "Automatisation": "#10B981",
  "CallBot IA": "#3B82F6",
  "ChatBot IA": "#E85C1A",
  "WordPress + SEO": "#8B5CF6",
  "Maquette UI/UX": "#F59E0B",
};
const FALLBACK_COLORS = ["#E85C1A", "#10B981", "#3B82F6", "#8B5CF6", "#F59E0B", "#EC4899", "#06B6D4"];

export default function AdminDashboard() {
  const { projects, messages, loading, dbReady, setupDatabase } = useProjects();
  const [setting, setSetting] = useState(false);
  const [setupDone, setSetupDone] = useState(false);
  const [setupError, setSetupError] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then(setStats)
      .catch(() => null);
  }, [projects, messages]);

  const published = projects.filter((p) => p.status === "published").length;
  const drafts = projects.filter((p) => p.status === "draft").length;
  const unread = messages.filter((m) => !m.is_read).length;
  const read = messages.length - unread;
  const thisMonth = stats?.messages.this_month ?? 0;

  // ── Chart data ──
  const messagesLineData = useMemo(() => {
    const monthData = new Array(12).fill(0);
    stats?.messagesByMonth.forEach((m) => {
      if (m.month_num >= 1 && m.month_num <= 12) monthData[m.month_num - 1] = m.count;
    });
    return {
      labels: MONTHS,
      datasets: [
        {
          label: "Messages",
          data: monthData,
          borderColor: "#E85C1A",
          backgroundColor: (ctx: { chart: { ctx: CanvasRenderingContext2D; chartArea?: { top: number; bottom: number } } }) => {
            const c = ctx.chart.ctx;
            const area = ctx.chart.chartArea;
            if (!area) return "rgba(232,92,26,0.2)";
            const g = c.createLinearGradient(0, area.top, 0, area.bottom);
            g.addColorStop(0, "rgba(232,92,26,0.35)");
            g.addColorStop(1, "rgba(232,92,26,0)");
            return g;
          },
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: "#E85C1A",
          borderWidth: 2,
        },
      ],
    };
  }, [stats]);

  const projectsStatusDoughnut = useMemo(() => {
    const total = published + drafts;
    return {
      labels: ["Publiés", "Brouillons"],
      datasets: [
        {
          data: total > 0 ? [published, drafts] : [1],
          backgroundColor: total > 0 ? ["#10B981", "#F59E0B"] : ["#222"],
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    };
  }, [published, drafts]);

  const servicesBarData = useMemo(() => {
    const top = (stats?.messagesByService ?? [])
      .filter((s) => s.service)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    return {
      labels: top.length > 0 ? top.map((s) => s.service) : ["Aucune donnée"],
      datasets: [
        {
          label: "Messages",
          data: top.length > 0 ? top.map((s) => s.count) : [0],
          backgroundColor: top.length > 0
            ? top.map((s, i) => CATEGORY_COLORS[s.service] || FALLBACK_COLORS[i % FALLBACK_COLORS.length])
            : ["#222"],
          borderRadius: 6,
        },
      ],
    };
  }, [stats]);

  const readDoughnut = useMemo(() => {
    const total = read + unread;
    return {
      labels: ["Lus", "Non lus"],
      datasets: [
        {
          data: total > 0 ? [read, unread] : [1],
          backgroundColor: total > 0 ? ["#3B82F6", "#E85C1A"] : ["#222"],
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    };
  }, [read, unread]);

  const handleSetup = async () => {
    setSetting(true);
    setSetupError(false);
    const ok = await setupDatabase();
    setSetting(false);
    if (ok) setSetupDone(true);
    else setSetupError(true);
  };

  const statCards = [
    { label: "Total Projets", value: projects.length, sub: `${published} publiés`, icon: FolderOpen, color: "brand" },
    { label: "Publiés", value: published, sub: `${drafts} brouillons`, icon: Eye, color: "emerald" },
    { label: "Messages", value: messages.length, sub: `${thisMonth} ce mois`, icon: MessageSquare, color: "blue" },
    { label: "Non lus", value: unread, sub: messages.length > 0 ? `${Math.round((unread / messages.length) * 100)}% du total` : "0%", icon: Inbox, color: "purple" },
    { label: "Activité mois", value: thisMonth, sub: "Messages reçus", icon: TrendingUp, color: "amber" },
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
      <div className="mb-8 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1 flex items-center gap-2">
            Tableau de bord
            <Sparkles size={18} className="text-brand" />
          </h1>
          <p className="text-white/40 text-sm">Vue d&apos;ensemble de votre activit&eacute;</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40 bg-dark-2 border border-border px-3 py-2 rounded-xl">
          <Activity size={12} className="text-emerald animate-pulse" />
          <span>Donn&eacute;es en temps r&eacute;el</span>
        </div>
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
                {setting ? "Configuration en cours..." : "Initialiser la base de données"}
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} className="stat-card p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[s.color]}`}>
                <s.icon size={18} />
              </div>
            </div>
            <p className="text-2xl font-display font-bold mb-1">{s.value}</p>
            <p className="text-white/40 text-xs mb-0.5">{s.label}</p>
            <p className="text-white/25 text-[10px]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid: 4 graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 1. Messages activity (line) */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-sm font-bold text-white/80">Activit&eacute; des messages</h3>
              <p className="text-white/30 text-xs mt-0.5">Volume des 12 derniers mois</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-brand/10 text-brand font-semibold">
              {messages.length} total
            </span>
          </div>
          <div className="h-56">
            <Line data={messagesLineData} options={lineOptions} />
          </div>
        </div>

        {/* 2. Projects status (doughnut) */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-sm font-bold text-white/80">Statut des projets</h3>
              <p className="text-white/30 text-xs mt-0.5">R&eacute;partition publi&eacute;s / brouillons</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald/10 text-emerald font-semibold">
              {projects.length} projets
            </span>
          </div>
          <div className="h-56">
            <Doughnut data={projectsStatusDoughnut} options={doughnutOptions} />
          </div>
        </div>

        {/* 3. Top services (horizontal bar) */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-sm font-bold text-white/80">Top services demand&eacute;s</h3>
              <p className="text-white/30 text-xs mt-0.5">5 services les plus sollicit&eacute;s</p>
            </div>
            <FileEdit size={16} className="text-white/30" />
          </div>
          <div className="h-56">
            <Bar data={servicesBarData} options={barHorizontalOptions} />
          </div>
        </div>

        {/* 4. Messages read vs unread (doughnut) */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-sm font-bold text-white/80">Lecture des messages</h3>
              <p className="text-white/30 text-xs mt-0.5">Lus vs non lus</p>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                unread > 0 ? "bg-brand/10 text-brand" : "bg-emerald/10 text-emerald"
              }`}
            >
              {unread > 0 ? `${unread} en attente` : "Tout lu"}
            </span>
          </div>
          <div className="h-56">
            <Doughnut data={readDoughnut} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Recent Projects + Recent Messages */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold">Projets r&eacute;cents</h3>
            <Link
              href="/gs-panel-gaIoruEC3jwgWsgh/portfolio"
              className="text-xs text-brand hover:text-brand/80"
            >
              Voir tout &rarr;
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {projects.length === 0 && (
              <p className="text-white/30 text-sm py-4 text-center">Aucun projet</p>
            )}
            {projects.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-xl bg-dark-3 border border-border hover:border-brand/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.title}</p>
                  <p className="text-xs text-white/40">
                    {p.category} &middot; {p.result}
                  </p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    p.status === "published"
                      ? "bg-emerald/10 text-emerald"
                      : "bg-amber/10 text-amber"
                  }`}
                >
                  {p.status === "published" ? "Publié" : "Brouillon"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold">Messages r&eacute;cents</h3>
            <Link
              href="/gs-panel-gaIoruEC3jwgWsgh/messages"
              className="text-xs text-brand hover:text-brand/80"
            >
              Voir tout &rarr;
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {messages.length === 0 && (
              <p className="text-white/30 text-sm py-4 text-center">Aucun message</p>
            )}
            {messages.slice(0, 5).map((m) => (
              <div
                key={m.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-dark-3 border border-border hover:border-brand/30 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    m.is_read
                      ? "bg-white/5 text-white/30"
                      : "bg-brand/20 text-brand"
                  }`}
                >
                  {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">{m.name}</p>
                    {!m.is_read && (
                      <span className="w-2 h-2 rounded-full bg-brand flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-white/40 truncate">
                    {m.service} &middot; {m.email}
                  </p>
                  <p className="text-xs text-white/30 mt-1 line-clamp-1">
                    {m.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
