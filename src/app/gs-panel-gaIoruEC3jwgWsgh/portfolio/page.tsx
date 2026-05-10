"use client";

import { useRef, useState } from "react";
import { useProjects, Project } from "@/lib/ProjectContext";
import {
  Plus, Search, Eye, EyeOff, Copy, Trash2, Edit3, X, Save,
  ChevronLeft, ExternalLink, Video, Image as ImageIcon,
  Upload, AlertTriangle, Loader2,
} from "lucide-react";

const categories = ["Tous", "Automatisation", "CallBot IA", "ChatBot IA", "WordPress + SEO", "Maquette UI/UX"];

const categoryColors: Record<string, string> = {
  Automatisation: "emerald",
  "CallBot IA": "blue",
  "ChatBot IA": "brand",
  "WordPress + SEO": "purple",
  "Maquette UI/UX": "amber",
};

export default function PortfolioPage() {
  const { projects, addProject, updateProject, deleteProject, toggleStatus, duplicateProject, loading } = useProjects();
  const [filter, setFilter] = useState("Tous");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [viewProject, setViewProject] = useState<Project | null>(null);
  const [form, setForm] = useState({
    title: "", title_en: "",
    category: "Automatisation",
    description: "", description_en: "",
    long_description: "", long_description_en: "",
    result: "", result_en: "",
    tools: "", status: "draft" as "published" | "draft",
    image_url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
    video_url: "",
    sort_order: 0,
  });

  const filtered = projects.filter((p) => {
    const matchCat = filter === "Tous" || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openNew = () => {
    setEditId(null);
    setForm({
      title: "", title_en: "",
      category: "Automatisation",
      description: "", description_en: "",
      long_description: "", long_description_en: "",
      result: "", result_en: "",
      tools: "", status: "draft",
      image_url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
      video_url: "",
      sort_order: projects.length + 1,
    });
    setShowForm(true);
  };

  const openEdit = (id: number) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    setEditId(id);
    setForm({
      title: p.title,
      title_en: p.title_en || "",
      category: p.category,
      description: p.description,
      description_en: p.description_en || "",
      long_description: p.long_description,
      long_description_en: p.long_description_en || "",
      result: p.result,
      result_en: p.result_en || "",
      tools: p.tools,
      status: p.status,
      image_url: p.image_url,
      video_url: p.video_url || "",
      sort_order: p.sort_order,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    if (editId) {
      await updateProject(editId, form);
    } else {
      await addProject(form);
    }
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Supprimer ce projet ?")) await deleteProject(id);
  };

  // ── Image upload (Vercel Blob via /api/upload) ──
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFilePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "Échec de l'upload");
      } else {
        setForm((f) => ({ ...f, image_url: data.url }));
      }
    } catch {
      setUploadError("Erreur réseau pendant l'upload");
    } finally {
      setUploading(false);
      // Reset the file input so picking the same file twice still triggers onChange
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const colorMap: Record<string, string> = {
    emerald: "bg-emerald/10 text-emerald border-emerald/20",
    blue: "bg-blue/10 text-blue border-blue/20",
    brand: "bg-brand/10 text-brand border-brand/20",
    purple: "bg-purple/10 text-purple border-purple/20",
    amber: "bg-amber/10 text-amber border-amber/20",
  };

  // Case Study View
  if (viewProject) {
    const color = categoryColors[viewProject.category] || "brand";
    return (
      <div>
        <button
          onClick={() => setViewProject(null)}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft size={16} /> Retour au portfolio
        </button>

        <div className="bg-dark-2 rounded-2xl border border-border overflow-hidden">
          {/* Image / Video */}
          {viewProject.video_url ? (
            <div className="aspect-video w-full">
              <iframe
                src={viewProject.video_url.replace("watch?v=", "embed/")}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : viewProject.image_url ? (
            <div className="aspect-video w-full overflow-hidden">
              <img src={viewProject.image_url} alt={viewProject.title} className="w-full h-full object-cover" />
            </div>
          ) : null}

          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${colorMap[color] || colorMap.brand}`}>
                {viewProject.category}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                viewProject.status === "published" ? "bg-emerald/10 text-emerald" : "bg-amber/10 text-amber"
              }`}>
                {viewProject.status === "published" ? "Publi\u00e9" : "Brouillon"}
              </span>
            </div>

            <h1 className="font-display text-2xl font-bold mb-3">{viewProject.title}</h1>
            <p className="text-white/50 text-sm mb-6">{viewProject.description}</p>

            {viewProject.result && (
              <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-xl text-sm font-bold mb-6">
                R&eacute;sultat : {viewProject.result}
              </div>
            )}

            <div className="bg-dark-3 rounded-xl p-6 border border-border mb-6">
              <h3 className="font-display font-bold text-sm mb-3 text-white/70">&Eacute;tude de cas</h3>
              <p className="text-white/60 text-sm leading-relaxed whitespace-pre-wrap">
                {viewProject.long_description || "Aucune description d\u00e9taill\u00e9e pour ce projet."}
              </p>
            </div>

            {viewProject.tools && (
              <div className="mb-6">
                <h3 className="font-display font-bold text-sm mb-3 text-white/70">Outils utilis&eacute;s</h3>
                <div className="flex gap-2 flex-wrap">
                  {viewProject.tools.split(", ").map((t, i) => (
                    <span key={i} className="tool-pill">{t}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button onClick={() => { openEdit(viewProject.id); setViewProject(null); }} className="btn-primary px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
                <Edit3 size={14} /> Modifier
              </button>
              <button onClick={() => toggleStatus(viewProject.id)} className="btn-dark px-5 py-2.5 rounded-xl text-sm">
                {viewProject.status === "published" ? "D\u00e9publier" : "Publier"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Portfolio</h1>
          <p className="text-white/40 text-sm">{projects.length} projets &middot; {projects.filter((p) => p.status === "published").length} publi&eacute;s</p>
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
        {filtered.map((p) => {
          const color = categoryColors[p.category] || "brand";
          return (
            <div key={p.id} className="bg-dark-2 rounded-2xl border border-border overflow-hidden hover:border-brand/20 transition-all">
              {/* Image preview */}
              {p.image_url && (
                <div className="h-40 overflow-hidden cursor-pointer" onClick={() => setViewProject(p)}>
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 mr-3">
                    <h3 className="font-semibold text-sm truncate cursor-pointer hover:text-brand transition-colors" onClick={() => setViewProject(p)}>
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${colorMap[color] || colorMap.brand}`}>
                        {p.category}
                      </span>
                      {p.result && <span className="text-xs text-white/40">&middot; {p.result}</span>}
                    </div>
                  </div>
                  <div
                    onClick={() => toggleStatus(p.id)}
                    className={`toggle-track flex-shrink-0 cursor-pointer ${p.status === "published" ? "on" : ""}`}
                  >
                    <div className="toggle-knob" />
                  </div>
                </div>
                <p className="text-xs text-white/50 mb-4 line-clamp-2">{p.description}</p>
                <div className="flex gap-1.5 mb-4 flex-wrap">
                  {p.tools.split(", ").filter(Boolean).map((t, i) => (
                    <span key={i} className="tool-pill">{t}</span>
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  <button onClick={() => setViewProject(p)} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-brand transition-colors">
                    <Eye size={13} /> Voir
                  </button>
                  <button onClick={() => openEdit(p.id)} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-brand transition-colors">
                    <Edit3 size={13} /> Modifier
                  </button>
                  <button onClick={() => duplicateProject(p.id)} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-blue transition-colors">
                    <Copy size={13} /> Dupliquer
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors ml-auto">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-white/30 py-12">Aucun projet trouv&eacute;.</p>
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
              {/* ── Version Française ── */}
              <div className="flex items-center gap-2 -mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand bg-brand/10 px-2 py-1 rounded-md">FR</span>
                <span className="text-xs text-white/40">Version fran&ccedil;aise</span>
              </div>
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
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <textarea
                placeholder="Description longue / &Eacute;tude de cas" rows={5} className="input-field resize-none"
                value={form.long_description} onChange={(e) => setForm({ ...form, long_description: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text" placeholder="R&eacute;sultat (ex: +15h/sem)" className="input-field"
                  value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })}
                />
                <input
                  type="text" placeholder="Outils (s&eacute;par&eacute;s par ,)" className="input-field"
                  value={form.tools} onChange={(e) => setForm({ ...form, tools: e.target.value })}
                />
              </div>

              {/* ── Version Anglaise ── */}
              <div className="flex items-center gap-2 mt-4 -mb-2 pt-4 border-t border-border">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue bg-blue/10 px-2 py-1 rounded-md">EN</span>
                <span className="text-xs text-white/40">English version (optional &mdash; falls back to FR if empty)</span>
              </div>
              <input
                type="text" placeholder="Project title (English)" className="input-field"
                value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })}
              />
              <input
                type="text" placeholder="Short description (English)" className="input-field"
                value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })}
              />
              <textarea
                placeholder="Long description / Case study (English)" rows={5} className="input-field resize-none"
                value={form.long_description_en} onChange={(e) => setForm({ ...form, long_description_en: e.target.value })}
              />
              <input
                type="text" placeholder="Result (e.g. +15h/wk)" className="input-field"
                value={form.result_en} onChange={(e) => setForm({ ...form, result_en: e.target.value })}
              />

              <div className="border-t border-border pt-4 -mb-2">
                <span className="text-xs text-white/40">M&eacute;dia</span>
              </div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <ImageIcon size={14} /> Image
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  hidden
                  onChange={handleFilePick}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand/10 text-brand hover:bg-brand/15 border border-brand/20 disabled:opacity-50"
                >
                  {uploading ? (
                    <><Loader2 size={12} className="animate-spin" /> Upload en cours...</>
                  ) : (
                    <><Upload size={12} /> Uploader depuis la galerie</>
                  )}
                </button>
              </div>
              <input
                type="text" placeholder="URL de l'image ou bouton Upload &uarr;" className="input-field"
                value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              />
              {uploadError && (
                <div className="flex items-start gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
                  <span>{uploadError}</span>
                </div>
              )}
              {form.image_url && (
                <div className="rounded-lg border border-border overflow-hidden bg-dark-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.image_url} alt="Aperçu" className="w-full h-32 object-cover" />
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-white/40 mb-1">
                <Video size={14} /> Vid&eacute;o (optionnel)
              </div>
              <input
                type="text" placeholder="URL YouTube ou lien vid&eacute;o" className="input-field"
                value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })}
              />
              <div className="flex items-center gap-3">
                <label className="text-sm text-white/50">Statut :</label>
                <div
                  onClick={() => setForm({ ...form, status: form.status === "published" ? "draft" : "published" })}
                  className={`toggle-track cursor-pointer ${form.status === "published" ? "on" : ""}`}
                >
                  <div className="toggle-knob" />
                </div>
                <span className="text-xs text-white/40">
                  {form.status === "published" ? "Publi\u00e9" : "Brouillon"}
                </span>
              </div>
              <button onClick={handleSave} className="btn-primary px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 mt-2">
                <Save size={16} /> {editId ? "Enregistrer" : "Cr\u00e9er"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
