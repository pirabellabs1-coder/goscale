"use client";

import { useRef, useState } from "react";
import { useProjects, Project } from "@/lib/ProjectContext";
import {
  Plus, Search, Eye, EyeOff, Copy, Trash2, Edit3, X, Save,
  ChevronLeft, ExternalLink, Video, Image as ImageIcon,
  Upload, AlertTriangle, Loader2, Star,
} from "lucide-react";
import ConfirmModal from "@/components/admin/ConfirmModal";

const categories = ["Tous", "Automatisation", "CallBot IA", "ChatBot IA", "WordPress + SEO", "Maquette UI/UX"];

const categoryColors: Record<string, string> = {
  Automatisation: "emerald",
  "CallBot IA": "blue",
  "ChatBot IA": "brand",
  "WordPress + SEO": "purple",
  "Maquette UI/UX": "amber",
};

export default function PortfolioPage() {
  const { projects, addProject, updateProject, deleteProject, toggleStatus, toggleFeatured, duplicateProject, loading } = useProjects();
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
    image_url: "",
    video_url: "",
    images: [] as string[],
    featured: false,
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
      image_url: "",
      video_url: "",
      images: [],
      featured: false,
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
      images: Array.isArray(p.images) ? p.images : [],
      featured: p.featured ?? false,
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

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const confirmDelete = async () => {
    if (deleteId == null) return;
    setDeleting(true);
    try {
      await deleteProject(deleteId);
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
  };

  // ── Image upload (Vercel Blob via /api/upload) ──
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFilePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadError(null);
    setUploading(true);
    const newUrls: string[] = [];
    try {
      // Upload sequentially to keep order predictable + avoid hammering the route
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) {
          setUploadError(data.error || "Échec de l'upload");
          break;
        }
        newUrls.push(data.url);
      }
      if (newUrls.length > 0) {
        setForm((f) => ({
          ...f,
          // First upload becomes the cover if no cover yet
          image_url: f.image_url || newUrls[0],
          images: [...(f.images || []), ...newUrls],
        }));
      }
    } catch {
      setUploadError("Erreur réseau pendant l'upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (url: string) => {
    setForm((f) => {
      const next = (f.images || []).filter((u) => u !== url);
      return {
        ...f,
        images: next,
        image_url: f.image_url === url ? (next[0] || "") : f.image_url,
      };
    });
  };

  const setCoverImage = (url: string) => {
    setForm((f) => ({ ...f, image_url: url }));
  };

  const moveImage = (url: string, dir: -1 | 1) => {
    setForm((f) => {
      const arr = [...(f.images || [])];
      const i = arr.indexOf(url);
      if (i < 0) return f;
      const j = i + dir;
      if (j < 0 || j >= arr.length) return f;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...f, images: arr };
    });
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
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${colorMap[color] || colorMap.brand}`}>
                        {p.category}
                      </span>
                      {p.featured && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber/15 text-amber border border-amber/30 flex items-center gap-1">
                          <Star size={10} className="fill-amber" /> Vedette
                        </span>
                      )}
                      {p.result && <span className="text-xs text-white/40">&middot; {p.result}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(p.id)}
                      title={p.featured ? "Retirer de la vedette" : "Mettre en vedette"}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        p.featured
                          ? "bg-amber/15 border-amber/30 text-amber"
                          : "border-border text-white/30 hover:text-amber hover:border-amber/30"
                      }`}
                    >
                      <Star size={15} className={p.featured ? "fill-amber" : ""} />
                    </button>
                    <div
                      onClick={() => toggleStatus(p.id)}
                      className={`toggle-track cursor-pointer ${p.status === "published" ? "on" : ""}`}
                    >
                      <div className="toggle-knob" />
                    </div>
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
                  <button onClick={() => setDeleteId(p.id)} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors ml-auto">
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

      <ConfirmModal
        open={deleteId != null}
        title="Supprimer ce projet ?"
        description="Le projet sera retiré de la base. Cette action est définitive."
        confirmLabel="Supprimer"
        tone="danger"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowForm(false)} />
          <div className="relative bg-dark-2 rounded-2xl border border-border p-6 sm:p-8 w-full max-w-3xl max-h-[92vh] overflow-y-auto">
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
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <ImageIcon size={14} /> Images du projet
                  {(form.images?.length || 0) > 0 && (
                    <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-md">{form.images!.length}</span>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                  multiple
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
                    <><Loader2 size={12} className="animate-spin" /> Upload...</>
                  ) : (
                    <><Upload size={12} /> Ajouter des images</>
                  )}
                </button>
              </div>

              {(form.images?.length || 0) > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {form.images!.map((url, i) => {
                    const isCover = url === form.image_url;
                    return (
                      <div
                        key={url + i}
                        className={`relative rounded-lg border overflow-hidden bg-dark-3 group ${
                          isCover ? "border-brand ring-2 ring-brand/30" : "border-border"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={`Image ${i + 1}`} className="w-full h-28 object-cover" />
                        {isCover && (
                          <span className="absolute top-1.5 left-1.5 text-[9px] uppercase font-bold tracking-wider bg-brand text-white px-1.5 py-0.5 rounded">
                            Cover
                          </span>
                        )}
                        <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-sm p-1 flex items-center justify-between gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-0.5">
                            <button type="button" onClick={() => moveImage(url, -1)}
                                    disabled={i === 0}
                                    className="text-[10px] px-1.5 py-1 rounded bg-white/10 text-white/70 hover:bg-white/20 disabled:opacity-30">
                              ←
                            </button>
                            <button type="button" onClick={() => moveImage(url, 1)}
                                    disabled={i === form.images!.length - 1}
                                    className="text-[10px] px-1.5 py-1 rounded bg-white/10 text-white/70 hover:bg-white/20 disabled:opacity-30">
                              →
                            </button>
                          </div>
                          {!isCover && (
                            <button type="button" onClick={() => setCoverImage(url)}
                                    className="text-[10px] px-2 py-1 rounded bg-brand/30 text-brand hover:bg-brand/50">
                              Cover
                            </button>
                          )}
                          <button type="button" onClick={() => removeImage(url)}
                                  className="text-[10px] px-2 py-1 rounded bg-red-500/30 text-red-300 hover:bg-red-500/50">
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border bg-dark-3 p-6 text-center">
                  <ImageIcon size={28} className="text-white/15 mx-auto mb-2" />
                  <p className="text-xs text-white/40">Aucune image. Cliquez « Ajouter des images » pour uploader plusieurs photos d&apos;un coup.</p>
                </div>
              )}

              <input
                type="text" placeholder="Ou collez une URL d'image..." className="input-field text-xs"
                value={form.image_url}
                onChange={(e) => {
                  const url = e.target.value;
                  setForm((f) => ({
                    ...f,
                    image_url: url,
                    images: url && !f.images.includes(url) ? [...f.images, url] : f.images,
                  }));
                }}
              />

              {uploadError && (
                <div className="flex items-start gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
                  <span>{uploadError}</span>
                </div>
              )}
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
              <div className="flex items-center gap-3">
                <label className="text-sm text-white/50 flex items-center gap-1.5">
                  <Star size={14} className={form.featured ? "fill-amber text-amber" : "text-white/40"} /> En vedette :
                </label>
                <div
                  onClick={() => setForm({ ...form, featured: !form.featured })}
                  className={`toggle-track cursor-pointer ${form.featured ? "on" : ""}`}
                >
                  <div className="toggle-knob" />
                </div>
                <span className="text-xs text-white/40">
                  {form.featured ? "Affich\u00e9 en priorit\u00e9" : "Affichage normal"}
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
