"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { useProjects } from "@/lib/ProjectContext";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#1E1E1E",
      borderColor: "#333",
      borderWidth: 1,
      titleColor: "#fff",
      bodyColor: "#aaa",
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { color: "rgba(255,255,255,0.04)" },
      ticks: { color: "rgba(255,255,255,0.3)", font: { size: 11 } },
    },
    y: {
      grid: { color: "rgba(255,255,255,0.04)" },
      ticks: { color: "rgba(255,255,255,0.3)", font: { size: 11 } },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: { color: "rgba(255,255,255,0.5)", padding: 16, font: { size: 11 } },
    },
    tooltip: {
      backgroundColor: "#1E1E1E",
      borderColor: "#333",
      borderWidth: 1,
      titleColor: "#fff",
      bodyColor: "#aaa",
      padding: 12,
      cornerRadius: 8,
    },
  },
};

interface Stats {
  projects: { total_projects: number; published: number; drafts: number };
  messages: { total_messages: number; unread: number; this_month: number };
  messagesByService: { service: string; count: number }[];
  messagesByMonth: { month: string; month_num: number; count: number }[];
  projectsByCategory: { category: string; count: number }[];
  quotes?: { total: number; draft: number; sent: number; viewed: number; accepted: number; declined: number; this_month: number; accepted_revenue: number };
  quotesByMonth?: { month: string; month_num: number; count: number }[];
  testimonials?: { total: number; published: number; pending: number; archived: number; avg_rating: number };
  testimonialsBySource?: { source: string; count: number }[];
  ratingsDistribution?: { rating: number; count: number }[];
}

const categoryColorMap: Record<string, string> = {
  "Automatisation": "#10B981",
  "CallBot IA": "#3B82F6",
  "ChatBot IA": "#E85C1A",
  "WordPress + SEO": "#8B5CF6",
  "Maquette UI/UX": "#F59E0B",
};

export default function AnalyticsPage() {
  const { projects, messages, loading } = useProjects();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.ok ? r.json() : null)
      .then(setStats)
      .catch(() => null);
  }, []);

  // Build charts from real data or stats
  const serviceLabels = stats?.messagesByService.map(s => s.service || "Autre") || [];
  const serviceCounts = stats?.messagesByService.map(s => s.count) || [];
  const serviceColors = serviceLabels.map(s => categoryColorMap[s] || "#E85C1A");

  const months = ["Jan", "F\u00e9v", "Mar", "Avr", "Mai", "Juin", "Juil", "Ao\u00fbt", "Sep", "Oct", "Nov", "D\u00e9c"];
  const monthData = new Array(12).fill(0);
  stats?.messagesByMonth.forEach(m => {
    if (m.month_num >= 1 && m.month_num <= 12) monthData[m.month_num - 1] = m.count;
  });

  const catLabels = stats?.projectsByCategory.map(c => c.category) || [];
  const catCounts = stats?.projectsByCategory.map(c => c.count) || [];
  const catColors = catLabels.map(c => categoryColorMap[c] || "#E85C1A");

  // Messages per month
  const messagesLineData = {
    labels: months,
    datasets: [{
      label: "Messages",
      data: monthData,
      borderColor: "#E85C1A",
      backgroundColor: "rgba(232,92,26,0.1)",
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: "#E85C1A",
    }],
  };

  // Leads by service
  const leadsBarData = {
    labels: serviceLabels.length > 0 ? serviceLabels : ["Aucune donn\u00e9e"],
    datasets: [{
      label: "Messages",
      data: serviceCounts.length > 0 ? serviceCounts : [0],
      backgroundColor: serviceColors.length > 0 ? serviceColors : ["#333"],
      borderRadius: 8,
    }],
  };

  // Services distribution
  const servicesDoughnut = {
    labels: serviceLabels.length > 0 ? serviceLabels : ["Aucune donn\u00e9e"],
    datasets: [{
      data: serviceCounts.length > 0 ? serviceCounts : [1],
      backgroundColor: serviceColors.length > 0 ? serviceColors : ["#333"],
      borderWidth: 0,
      hoverOffset: 6,
    }],
  };

  // Projects by category
  const projectsBarData = {
    labels: catLabels.length > 0 ? catLabels : ["Aucun projet"],
    datasets: [{
      label: "Projets",
      data: catCounts.length > 0 ? catCounts : [0],
      backgroundColor: catColors.length > 0 ? catColors : ["#333"],
      borderRadius: 8,
    }],
  };

  const unread = messages.filter(m => !m.is_read).length;

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
        <h1 className="font-display text-2xl font-bold mb-1">Analytics</h1>
        <p className="text-white/40 text-sm">Donn&eacute;es en temps r&eacute;el de votre activit&eacute;</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Projets", value: projects.length },
          { label: "Total Messages", value: messages.length },
          { label: "Non lus", value: unread },
          { label: "Ce mois", value: stats?.messages.this_month ?? 0 },
        ].map((s, i) => (
          <div key={i} className="stat-card p-5">
            <p className="text-white/40 text-xs mb-1">{s.label}</p>
            <p className="text-xl font-display font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <h3 className="font-display text-sm font-bold mb-4 text-white/70">Messages par mois</h3>
          <div className="h-64"><Line data={messagesLineData} options={chartOptions} /></div>
        </div>

        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <h3 className="font-display text-sm font-bold mb-4 text-white/70">Messages par service</h3>
          <div className="h-64"><Bar data={leadsBarData} options={chartOptions} /></div>
        </div>

        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <h3 className="font-display text-sm font-bold mb-4 text-white/70">R&eacute;partition des demandes</h3>
          <div className="h-64"><Doughnut data={servicesDoughnut} options={doughnutOptions} /></div>
        </div>

        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <h3 className="font-display text-sm font-bold mb-4 text-white/70">Projets par cat&eacute;gorie</h3>
          <div className="h-64"><Bar data={projectsBarData} options={chartOptions} /></div>
        </div>

        {/* ── Devis par mois ── */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-bold text-white/70">Devis par mois</h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue/10 text-blue font-semibold">
              {stats?.quotes?.total ?? 0} total
            </span>
          </div>
          <div className="h-64">
            <Line
              data={{
                labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
                datasets: [{
                  label: "Devis",
                  data: (() => {
                    const arr = new Array(12).fill(0);
                    stats?.quotesByMonth?.forEach((m) => {
                      if (m.month_num >= 1 && m.month_num <= 12) arr[m.month_num - 1] = m.count;
                    });
                    return arr;
                  })(),
                  borderColor: "#3B82F6",
                  backgroundColor: "rgba(59,130,246,0.1)",
                  fill: true,
                  tension: 0.4,
                  pointRadius: 3,
                  pointBackgroundColor: "#3B82F6",
                }],
              }}
              options={chartOptions}
            />
          </div>
        </div>

        {/* ── Statut des devis ── */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-bold text-white/70">Statut des devis</h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald/10 text-emerald font-semibold">
              {stats?.quotes?.accepted_revenue
                ? `${stats.quotes.accepted_revenue.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} € CA`
                : "—"}
            </span>
          </div>
          <div className="h-64">
            <Doughnut
              data={{
                labels: ["Brouillon", "Envoyé", "Vu", "Accepté", "Refusé"],
                datasets: [{
                  data: stats?.quotes
                    ? [stats.quotes.draft, stats.quotes.sent, stats.quotes.viewed, stats.quotes.accepted, stats.quotes.declined]
                    : [1],
                  backgroundColor: stats?.quotes
                    ? ["#6B7280", "#3B82F6", "#8B5CF6", "#10B981", "#EF4444"]
                    : ["#222"],
                  borderWidth: 0,
                  hoverOffset: 6,
                }],
              }}
              options={doughnutOptions}
            />
          </div>
        </div>

        {/* ── Avis par source ── */}
        <div className="bg-dark-2 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-bold text-white/70">Avis par source</h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber/10 text-amber font-semibold">
              {stats?.testimonials?.avg_rating
                ? `${stats.testimonials.avg_rating.toFixed(1)}/5`
                : "—"}
            </span>
          </div>
          <div className="h-64">
            <Bar
              data={{
                labels: stats?.testimonialsBySource?.map((s) => s.source) || ["Aucune donnée"],
                datasets: [{
                  label: "Avis publiés",
                  data: stats?.testimonialsBySource?.map((s) => s.count) || [0],
                  backgroundColor: ["#F07830", "#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"],
                  borderRadius: 8,
                }],
              }}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
