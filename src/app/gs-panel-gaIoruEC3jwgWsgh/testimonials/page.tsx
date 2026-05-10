"use client";

import { useEffect, useState } from "react";
import {
  Star, Plus, Trash2, Eye, EyeOff, Archive, Check, X, Copy,
  ExternalLink, MessageSquare, Search, Edit3, AlertTriangle, Save,
} from "lucide-react";
import ConfirmModal from "@/components/admin/ConfirmModal";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  status: "pending" | "published" | "archived";
  source: string;
  email: string;
  reply: string;
  review_date: string | null;
  sort_order: number;
  created_at: string;
};

type FormState = {
  name: string;
  role: string;
  text: string;
  rating: number;
  email: string;
  status: "pending" | "published" | "archived";
  source: string;
  reply: string;
  review_date: string;
};

const emptyForm: FormState = {
  name: "", role: "", text: "", rating: 5, email: "",
  status: "published", source: "manual", reply: "", review_date: "",
};

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "published" | "archived">("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [linkCopied, setLinkCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reviewLink = typeof window !== "undefined"
    ? `${window.location.origin}/avis`
    : "";

  const refresh = async () => {
    try {
      const res = await fetch("/api/testimonials?admin=true");
      if (res.ok) setItems(await res.json());
    } catch { /* noop */ }
    finally { setLoading(false); }
  };

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(async () => {
      try {
        const res = await fetch("/api/testimonials?admin=true");
        if (!cancelled && res.ok) setItems(await res.json());
      } finally {
        if (!cancelled) setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(reviewLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch { /* noop */ }
  };

  const openNew = () => {
    setEditId(null);
    setForm(emptyForm);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditId(t.id);
    setForm({
      name: t.name,
      role: t.role,
      text: t.text,
      rating: t.rating,
      email: t.email,
      status: t.status,
      source: t.source,
      reply: t.reply || "",
      review_date: t.review_date ? t.review_date.slice(0, 10) : "",
    });
    setError(null);
    setShowForm(true);
  };

  const save = async () => {
    setError(null);
    if (form.name.trim().length < 2) { setError("Nom trop court"); return; }
    if (form.text.trim().length < 10) { setError("Avis trop court (min 10 caractères)"); return; }
    try {
      if (editId) {
        const res = await fetch(`/api/testimonials/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const d = await res.json();
          setError(d.error || "Erreur"); return;
        }
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const d = await res.json();
          setError(d.error || "Erreur"); return;
        }
      }
      setShowForm(false);
      refresh();
    } catch {
      setError("Erreur réseau");
    }
  };

  const setStatus = async (id: number, status: Testimonial["status"]) => {
    await fetch(`/api/testimonials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    refresh();
  };

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const confirmDelete = async () => {
    if (deleteId == null) return;
    setDeleting(true);
    try {
      await fetch(`/api/testimonials/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      refresh();
    } finally {
      setDeleting(false);
    }
  };

  const filtered = items.filter((t) => {
    if (filter !== "all" && t.status !== filter) return false;
    if (search && !`${t.name} ${t.text}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: items.length,
    pending: items.filter((t) => t.status === "pending").length,
    published: items.filter((t) => t.status === "published").length,
    archived: items.filter((t) => t.status === "archived").length,
  };

  const statusBadge = (s: Testimonial["status"]) => {
    if (s === "published") return "bg-emerald/10 text-emerald border-emerald/20";
    if (s === "pending") return "bg-amber/10 text-amber border-amber/20";
    return "bg-white/5 text-white/40 border-white/10";
  };
  const statusLabel = (s: Testimonial["status"]) => ({
    published: "Publié",
    pending: "En attente",
    archived: "Archivé",
  }[s]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Avis clients</h1>
          <p className="text-white/40 text-sm">G&eacute;rer les t&eacute;moignages publi&eacute;s sur le site</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={async () => {
              if (!confirm("Importer 15 avis ComeUp pré-remplis (résumés) ? Vous pourrez tous les éditer ensuite.")) return;
              try {
                const res = await fetch("/api/testimonials/seed-comeup", { method: "POST" });
                const d = await res.json();
                if (res.ok) {
                  alert(`${d.created} avis importés, ${d.skipped} déjà présents.`);
                  refresh();
                } else {
                  alert(d.error || "Erreur");
                }
              } catch {
                alert("Erreur réseau");
              }
            }}
            className="btn-dark px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2"
          >
            <MessageSquare size={16} /> Importer mes avis ComeUp
          </button>
          <button onClick={openNew} className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
            <Plus size={16} /> Ajouter un avis
          </button>
        </div>
      </div>

      {/* Review link card */}
      <div className="bg-dark-2 rounded-2xl border border-brand/20 p-5 sm:p-6 mb-6">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
            <MessageSquare size={18} className="text-brand" />
          </div>
          <div className="flex-1 min-w-[280px]">
            <h3 className="font-display text-base font-bold mb-1">Lien public pour vos clients</h3>
            <p className="text-white/50 text-xs mb-3">
              Partagez ce lien &agrave; vos clients pour qu&apos;ils laissent un avis. Les avis arrivent en
              &laquo; En attente &raquo; ; vous validez ce qui appara&icirc;t sur le site.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <code className="text-xs bg-dark-3 px-3 py-2 rounded-lg border border-border break-all flex-1 min-w-[200px]">
                {reviewLink || "/avis"}
              </code>
              <button onClick={copyLink} className="text-xs px-3 py-2 rounded-lg bg-brand/10 text-brand border border-brand/20 hover:bg-brand/15 flex items-center gap-1.5">
                {linkCopied ? <><Check size={12} /> Copi&eacute; !</> : <><Copy size={12} /> Copier</>}
              </button>
              <a href="/avis" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-2 rounded-lg bg-white/5 text-white/60 border border-white/10 hover:text-white flex items-center gap-1.5">
                <ExternalLink size={12} /> Ouvrir
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {(["all", "pending", "published", "archived"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`text-xs px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              filter === k
                ? "bg-brand text-white"
                : "bg-white/5 text-white/60 border border-white/10 hover:border-brand/30"
            }`}
          >
            {{ all: "Tous", pending: "En attente", published: "Publiés", archived: "Archivés" }[k]}
            <span className={filter === k ? "text-white/70" : "text-white/30"}>{counts[k]}</span>
          </button>
        ))}
        <div className="flex-1 min-w-[200px] relative ml-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="input-field pl-9"
          />
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-dark-2 rounded-2xl border border-border p-10 text-center">
          <MessageSquare size={32} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/40 text-sm">
            {filter === "pending" && "Aucun avis en attente."}
            {filter === "published" && "Aucun avis publié. Cliquez 'Ajouter un avis' pour en créer manuellement."}
            {filter === "archived" && "Aucun avis archivé."}
            {filter === "all" && "Aucun avis pour le moment. Partagez le lien public ou ajoutez-en manuellement."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((t) => (
            <div key={t.id} className="bg-dark-2 rounded-2xl border border-border p-5 flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-brand/15 flex items-center justify-center text-brand font-bold text-sm flex-shrink-0">
                    {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate">{t.name}</p>
                    {t.role && <p className="text-white/40 text-xs truncate">{t.role}</p>}
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border whitespace-nowrap ${statusBadge(t.status)}`}>
                  {statusLabel(t.status)}
                </span>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={i < t.rating ? "text-amber fill-amber" : "text-white/15"} />
                ))}
                <span className="text-[10px] text-white/30 ml-1">{t.rating}/5</span>
                {t.source && <span className="text-[10px] text-white/30 ml-2">&middot; {t.source}</span>}
              </div>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-4">&quot;{t.text}&quot;</p>

              <div className="flex flex-wrap items-center gap-2 mt-auto pt-3 border-t border-border">
                {t.status !== "published" && (
                  <button onClick={() => setStatus(t.id, "published")} className="text-xs px-3 py-1.5 rounded-lg bg-emerald/10 text-emerald border border-emerald/20 hover:bg-emerald/15 flex items-center gap-1.5">
                    <Eye size={12} /> Publier
                  </button>
                )}
                {t.status === "published" && (
                  <button onClick={() => setStatus(t.id, "archived")} className="text-xs px-3 py-1.5 rounded-lg bg-amber/10 text-amber border border-amber/20 hover:bg-amber/15 flex items-center gap-1.5">
                    <EyeOff size={12} /> D&eacute;publier
                  </button>
                )}
                {t.status === "archived" && (
                  <button onClick={() => setStatus(t.id, "pending")} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 flex items-center gap-1.5">
                    <Archive size={12} /> R&eacute;activer
                  </button>
                )}
                <button onClick={() => openEdit(t)} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/60 border border-white/10 hover:text-white flex items-center gap-1.5">
                  <Edit3 size={12} /> &Eacute;diter
                </button>
                <button onClick={() => setDeleteId(t.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/15 flex items-center gap-1.5 ml-auto">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={deleteId != null}
        title="Supprimer cet avis ?"
        description="Cette action est définitive."
        confirmLabel="Supprimer"
        tone="danger"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-dark-2 rounded-2xl border border-border p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold">{editId ? "Modifier l'avis" : "Nouvel avis"}</h3>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-white/40" /></button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Stars */}
              <div>
                <label className="text-xs text-white/40 mb-2 block">Note</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n} type="button"
                      onClick={() => setForm({ ...form, rating: n })}
                      className="hover:scale-110 transition-transform"
                    >
                      <Star size={24} className={n <= form.rating ? "text-amber fill-amber" : "text-white/15"} />
                    </button>
                  ))}
                  <span className="text-xs text-white/40 ml-2">{form.rating}/5</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text" placeholder="Nom *" className="input-field"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="text" placeholder="Rôle / société" className="input-field"
                  value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </div>

              <input
                type="email" placeholder="Email (optionnel)" className="input-field"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <textarea
                placeholder="Texte de l'avis *" rows={6} className="input-field resize-none"
                value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })}
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/40 flex items-center gap-2">
                  <span className="bg-brand/10 text-brand px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    Réponse
                  </span>
                  Votre réponse (optionnelle, affichée sous l&apos;avis sur le site)
                </label>
                <textarea
                  placeholder="Merci pour votre retour…" rows={3} className="input-field resize-none"
                  value={form.reply} onChange={(e) => setForm({ ...form, reply: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs text-white/40 mb-1.5 block">Date de l&apos;avis (optionnelle)</label>
                <input
                  type="date" className="input-field"
                  value={form.review_date} onChange={(e) => setForm({ ...form, review_date: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">Statut</label>
                  <select
                    className="input-field" value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as FormState["status"] })}
                  >
                    <option value="pending">En attente</option>
                    <option value="published">Publi&eacute;</option>
                    <option value="archived">Archiv&eacute;</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">Source</label>
                  <select
                    className="input-field" value={form.source}
                    onChange={(e) => setForm({ ...form, source: e.target.value })}
                  >
                    <option value="manual">Saisie manuelle</option>
                    <option value="ComeUp">ComeUp</option>
                    <option value="site">Formulaire site</option>
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                  <AlertTriangle size={16} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-3 mt-2">
                <button onClick={save} className="btn-primary px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 flex-1 justify-center">
                  <Save size={14} /> {editId ? "Enregistrer" : "Créer"}
                </button>
                <button onClick={() => setShowForm(false)} className="btn-dark px-6 py-3 rounded-xl text-sm">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
