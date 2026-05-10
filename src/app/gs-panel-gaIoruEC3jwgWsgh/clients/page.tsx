"use client";

import { useEffect, useState } from "react";
import {
  Plus, Trash2, X, Save, Users, Edit3, Search, AlertTriangle,
  Mail, Phone, Building2,
} from "lucide-react";
import ConfirmModal from "@/components/admin/ConfirmModal";

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  notes: string;
  status: string;
  quote_token: string;
  created_at: string;
};

const emptyForm = {
  name: "", email: "", phone: "", company: "", notes: "",
};

export default function ClientsAdminPage() {
  const [items, setItems] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const refresh = async () => {
    try {
      const res = await fetch("/api/clients");
      if (res.ok) setItems(await res.json());
    } finally { setLoading(false); }
  };
  useEffect(() => { refresh(); }, []);

  const openNew = () => {
    setEditId(null);
    setForm(emptyForm);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (c: Client) => {
    setEditId(c.id);
    setForm({
      name: c.name, email: c.email, phone: c.phone,
      company: c.company, notes: c.notes,
    });
    setError(null);
    setShowForm(true);
  };

  const save = async () => {
    setError(null);
    if (form.name.trim().length < 2) { setError("Nom requis"); return; }
    try {
      const url = editId ? `/api/clients/${editId}` : "/api/clients";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || "Erreur"); return;
      }
      setShowForm(false);
      refresh();
    } catch {
      setError("Erreur réseau");
    }
  };

  const confirmDelete = async () => {
    if (deleteId == null) return;
    setDeleting(true);
    try {
      await fetch(`/api/clients/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      refresh();
    } finally {
      setDeleting(false);
    }
  };

  const filtered = items.filter((c) =>
    !search ||
    `${c.name} ${c.company} ${c.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const sourceBadge = (s: string) => ({
    quote_accepted: "bg-emerald/10 text-emerald border-emerald/20",
    manual: "bg-blue/10 text-blue border-blue/20",
    form: "bg-amber/10 text-amber border-amber/20",
  }[s] || "bg-white/5 text-white/40 border-white/10");

  const sourceLabel = (s: string) => ({
    quote_accepted: "Devis accepté",
    manual: "Ajouté manuellement",
    form: "Formulaire",
  }[s] || s);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold mb-1">Clients</h1>
          <p className="text-white/40 text-sm">
            {items.length} client{items.length > 1 ? "s" : ""} &middot; ajout&eacute;s manuellement ou via les devis accept&eacute;s
          </p>
        </div>
        <button onClick={openNew} className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
          <Plus size={16} /> Ajouter un client
        </button>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
               placeholder="Rechercher..." className="input-field pl-9" />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-dark-2 rounded-2xl border border-border p-10 text-center">
          <Users size={32} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/40 text-sm">
            {search ? "Aucun client correspondant." : "Aucun client encore. Ils apparaîtront ici dès qu'un devis est accepté ou si vous en ajoutez manuellement."}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="bg-dark-2 rounded-2xl border border-border p-5 flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-brand/15 flex items-center justify-center text-brand font-bold text-sm flex-shrink-0">
                  {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-sm truncate">{c.name}</p>
                  {c.company && (
                    <p className="text-white/40 text-xs truncate flex items-center gap-1">
                      <Building2 size={10} /> {c.company}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-xs text-white/60 mb-4">
                {c.email && (
                  <a href={`mailto:${c.email}`} className="flex items-center gap-2 hover:text-brand truncate">
                    <Mail size={12} /> {c.email}
                  </a>
                )}
                {c.phone && (
                  <a href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand">
                    <Phone size={12} /> {c.phone}
                  </a>
                )}
              </div>

              {c.notes && (
                <p className="text-white/50 text-xs leading-relaxed mb-3 line-clamp-2">{c.notes}</p>
              )}

              <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-border">
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${sourceBadge(c.source)}`}>
                  {sourceLabel(c.source)}
                </span>
                <div className="flex gap-1.5">
                  <button onClick={() => openEdit(c)} className="text-xs px-2 py-1.5 rounded-lg bg-white/5 text-white/60 border border-white/10 hover:text-white">
                    <Edit3 size={11} />
                  </button>
                  <button onClick={() => setDeleteId(c.id)} className="text-xs px-2 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/15">
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={deleteId != null}
        title="Supprimer ce client ?"
        description="Cette action est irréversible. Le client sera retiré de la liste."
        confirmLabel="Supprimer"
        tone="danger"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-dark-2 rounded-2xl border border-border p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold">{editId ? "Modifier le client" : "Nouveau client"}</h3>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-white/40" /></button>
            </div>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Nom complet *" className="input-field"
                     value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input type="text" placeholder="Société (optionnel)" className="input-field"
                     value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              <input type="email" placeholder="Email" className="input-field"
                     value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input type="tel" placeholder="Téléphone / WhatsApp" className="input-field"
                     value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <textarea placeholder="Notes internes (optionnel)" rows={3} className="input-field resize-none"
                        value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                  <AlertTriangle size={16} /> {error}
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
