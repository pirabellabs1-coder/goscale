"use client";

import { useState } from "react";
import { useProjects } from "@/lib/ProjectContext";
import { categoryColors } from "@/lib/data";
import {
  Plus, Search, Eye, EyeOff, Copy, Trash2, Edit3, X, Save,
} from "lucide-react";

const categories = ["Tous", "Automatisation", "CallBot IA", "ChatBot IA", "WordPress + SEO", "Maquette UI/UX"];

export default function PortfolioPage() {
  const { projects, addProject, updateProject, deleteProject, toggleStatus, duplicateProject } = useProjects();
  const [filter, setFilter] = useState("Tous");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "", category: "Automatisation", desc: "", longDesc: "",
    result: "", tools: "", status: "draft" as "published" | "draft",
    img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
    order: 0,
  });

  const filtered = projects.filter((p) => {
    const matchCat = filter === "Tous" || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openNew = () => {
    setEditId(null);
    setForm({
      title: "", category: "Automatisation", desc: "", longDesc: "",
      result: "", tools: "", status: "draft",
      img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
      order: projects.length + 1,
    });
    setShowForm(true);
  };

  const openEdit = (id: number) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    setEditId(id);
    setForm({ title: p.title, category: p.category, desc: p.desc, longDesc: p.longDesc, result: p.result, tools: p.tools, status: p.status, img: p.img, order: p.order });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editId) {
      updateProject(editId, form);
    } else {
      addProject(form);
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Supprimer ce projet ?")) deleteProject(id);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Portfolio</h1>
          <p className="text-white/40 text-sm">{projects.length} projets &middot; {projects.filter((p) => p.status === "published").length} publies</p>
        </div>
        <button onClick={openNew} className="btn-primary px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
          <Plus size={16} /> Nouveau projet
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text" placeholder="Rechercher..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === c ? "bg-brand text-white" : "bg-dark-3 text-white/50 border border-border hover:border-brand/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="bg-dark-2 rounded-2xl border border-border p-5 hover:border-brand/20 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0 mr-3">
                <h3 className="font-semibold text-sm truncate">{p.title}</h3>
                <p className="text-xs text-white/40 mt-0.5">{p.category} &middot; {p.result}</p>
              </div>
              <div
                onClick={() => toggleStatus(p.id)}
                className={`toggle-track flex-shrink-0 ${p.status === "published" ? "on" : ""}`}
              >
                <div className="toggle-knob" />
              </div>
            </div>
            <p className="text-xs text-white/50 mb-4 line-clamp-2">{p.desc}</p>
            <div className="flex gap-1.5 mb-4 flex-wrap">
              {p.tools.split(", ").map((t, i) => (
                <span key={i} className="tool-pill">{t}</span>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(p.id)} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-brand transition-colors">
                <Edit3 size={13} /> Modifier
              </button>
              <button onClick={() => duplicateProject(p.id)} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-blue transition-colors">
                <Copy size={13} /> Dupliquer
              </button>
              <button onClick={() => handleDelete(p.id)} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors ml-auto">
                <Trash2 size={13} /> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-white/30 py-12">Aucun projet trouve.</p>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowForm(false)} />
          <div className="relative bg-dark-2 rounded-2xl border border-border p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold">{editId ? "Modifier" : "Nouveau"} projet</h3>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-white/40" /></button>
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="text" placeholder="Titre du projet" className="input-field"
                value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <select
                className="input-field" value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categories.filter((c) => c !== "Tous").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="text" placeholder="Description courte" className="input-field"
                value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
              <textarea
                placeholder="Description longue" rows={3} className="input-field resize-none"
                value={form.longDesc} onChange={(e) => setForm({ ...form, longDesc: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text" placeholder="Resultat (ex: +15h/sem)" className="input-field"
                  value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })}
                />
                <input
                  type="text" placeholder="Outils (separes par ,)" className="input-field"
                  value={form.tools} onChange={(e) => setForm({ ...form, tools: e.target.value })}
                />
              </div>
              <input
                type="text" placeholder="URL image" className="input-field"
                value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })}
              />
              <div className="flex items-center gap-3">
                <label className="text-sm text-white/50">Statut :</label>
                <div
                  onClick={() => setForm({ ...form, status: form.status === "published" ? "draft" : "published" })}
                  className={`toggle-track ${form.status === "published" ? "on" : ""}`}
                >
                  <div className="toggle-knob" />
                </div>
                <span className="text-xs text-white/40">
                  {form.status === "published" ? "Publie" : "Brouillon"}
                </span>
              </div>
              <button onClick={handleSave} className="btn-primary px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 mt-2">
                <Save size={16} /> {editId ? "Enregistrer" : "Creer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
