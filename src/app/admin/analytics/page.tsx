"use client";

import { useEffect, useRef, useState } from "react";
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

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler
);

const months = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aout", "Sep", "Oct", "Nov", "Dec"];

const chartOptions = (title: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
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
});

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

export default function AnalyticsPage() {
  // Visitors Line Chart
  const visitorsData = {
    labels: months,
    datasets: [{
      label: "Visiteurs",
      data: [820, 1100, 950, 1350, 1600, 1420, 1800, 2100, 1950, 2400, 2250, 2800],
      borderColor: "#E85C1A",
      backgroundColor: "rgba(232,92,26,0.1)",
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: "#E85C1A",
    }],
  };

  // Leads by Service Bar Chart
  const leadsData = {
    labels: ["Automatisation", "CallBot IA", "ChatBot IA", "WordPress", "UI/UX"],
    datasets: [{
      label: "Leads",
      data: [28, 15, 22, 18, 12],
      backgroundColor: ["#10B981", "#3B82F6", "#E85C1A", "#8B5CF6", "#F59E0B"],
      borderRadius: 8,
    }],
  };

  // Traffic Sources Doughnut
  const trafficData = {
    labels: ["Google", "Direct", "Social", "Referral", "ComeUp"],
    datasets: [{
      data: [42, 22, 18, 10, 8],
      backgroundColor: ["#E85C1A", "#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"],
      borderWidth: 0,
      hoverOffset: 6,
    }],
  };

  // Conversion Rate Line Chart
  const conversionData = {
    labels: months,
    datasets: [{
      label: "Taux (%)",
      data: [2.1, 2.5, 2.8, 3.2, 3.0, 3.5, 3.8, 4.0, 3.9, 4.2, 4.5, 4.8],
      borderColor: "#10B981",
      backgroundColor: "rgba(16,185,129,0.1)",
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: "#10B981",
    }],
  };

  // Projects by Category Bar Chart
  const projectsData = {
    labels: ["Automatisation", "CallBot IA", "ChatBot IA", "WordPress", "UI/UX"],
    datasets: [{
      label: "Projets",
      data: [18, 12, 15, 10, 8],
      backgroundColor: "rgba(232,92,26,0.6)",
      borderColor: "#E85C1A",
      borderWidth: 1,
      borderRadius: 8,
    }],
  };

  // Revenue Line Chart
  const revenueData = {
    labels: months,
    datasets: [{
      label: "Revenus (EUR)",
      data: [2800, 3500, 3200, 4100, 4800, 4500, 5200, 6100, 5800, 6800, 7200, 8500],
      borderColor: "#8B5CF6",
      backgroundColor: "rgba(139,92,246,0.1)",
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointBackgroundColor: "#8B5CF6",
    }],
  };

  const charts = [
    { title: "Visiteurs par mois", component: <Line data={visitorsData} options={chartOptions("Visiteurs")} /> },
    { title: "Leads par service", component: <Bar data={leadsData} options={chartOptions("Leads")} /> },
    { title: "Sources de trafic", component: <Doughnut data={trafficData} options={doughnutOptions} /> },
    { title: "Taux de conversion", component: <Line data={conversionData} options={chartOptions("Conversion")} /> },
    { title: "Projets par categorie", component: <Bar data={projectsData} options={chartOptions("Projets")} /> },
    { title: "Revenus mensuels", component: <Line data={revenueData} options={chartOptions("Revenus")} /> },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1">Analytics</h1>
        <p className="text-white/40 text-sm">Statistiques detaillees de votre activite</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Visiteurs total", value: "24.5K", change: "+18%" },
          { label: "Leads total", value: "95", change: "+24%" },
          { label: "Taux conversion", value: "4.2%", change: "+0.8%" },
          { label: "Revenu annuel", value: "62.6K EUR", change: "+35%" },
        ].map((s, i) => (
          <div key={i} className="stat-card p-5">
            <p className="text-white/40 text-xs mb-1">{s.label}</p>
            <p className="text-xl font-display font-bold">{s.value}</p>
            <p className="text-emerald text-xs font-semibold mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {charts.map((c, i) => (
          <div key={i} className="bg-dark-2 rounded-2xl border border-border p-6">
            <h3 className="font-display text-sm font-bold mb-4 text-white/70">{c.title}</h3>
            <div className="h-64">{c.component}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
