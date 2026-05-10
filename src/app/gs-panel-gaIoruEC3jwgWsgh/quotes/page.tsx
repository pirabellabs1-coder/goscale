"use client";

import { useEffect, useState } from "react";
import {
  Plus, Trash2, X, Save, FileText, ExternalLink, Copy, Check,
  Edit3, Send, AlertTriangle, Search, Eye,
} from "lucide-react";

type QuoteItem = { description: string; qty: number; unit_price: number };

type Quote = {
  id: number;
  token: string;
  client_name: string;
  client_email: string;
  client_company: string;
  client_phone: string;
  title: string;
  items: QuoteItem[];
  notes: string;
  currency: string;
  validity_days: number;
  status: "draft" | "sent" | "viewed" | "accepted" | "declined";
  created_at: string;
};

const emptyItem: QuoteItem = { description: "", qty: 1, unit_price: 0 };
const emptyForm = {
  client_name: "", client_email: "", client_company: "", client_phone: "",
  title: "", items: [{ ...emptyItem }] as QuoteItem[],
  notes: "", currency: "EUR", validity_days: 30,
  status: "draft" as Quote["status"],
};

const statusBadge = (s: Quote["status"]) => ({
  draft: "bg-white/5 text-white/50 border-white/10",
  sent: "bg-blue/10 text-blue border-blue/20",
  viewed: "bg-purple/10 text-purple border-purple/20",
  accepted: "bg-emerald/10 text-emerald border-emerald/20",
  declined: "bg-red-500/10 text-red-400 border-red-500/20",
}[s]);
const statusLabel = (s: Quote["status"]) => ({
  draft: "Brouillon", sent: "Envoyé", viewed: "Vu",
  accepted: "Accepté", declined: "Refusé",
}[s]);

export default function QuotesAdminPage() {
  const [items, setItems] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const refresh = async () => {
    try {
      const res = await fetch("/api/quotes");
      if (res.ok) setItems(await res.json());
    } finally { setLoading(false); }
  };
  useEffect(() => { refresh(); }, []);

  const subtotal = (its: QuoteItem[]) =>
    its.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.unit_price) || 0), 0);

  const openNew = () => {
    setEditId(null);
    setForm(emptyForm);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (q: Quote) => {
    setEditId(q.id);
    setForm({
      client_name: q.client_name,
      client_email: q.client_email,
      client_company: q.client_company,
      client_phone: q.client_phone,
      title: q.title,
      items: q.items.length > 0 ? q.items : [{ ...emptyItem }],
      notes: q.notes,
      currency: q.currency,
      validity_days: q.validity_days,
      status: q.status,
    });
    setError(null);
    setShowForm(true);
  };

  const save = async () => {
    setError(null);
    if (form.client_name.trim().length < 2) { setError("Nom du client requis"); return; }
    if (form.items.length === 0 || form.items.every((i) => !i.description.trim())) {
      setError("Ajoutez au moins une ligne avec description");
      return;
    }
    const cleanItems = form.items.filter((i) => i.description.trim());
    try {
      const url = editId ? `/api/quotes/${editId}` : "/api/quotes";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items: cleanItems }),
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

  const remove = async (id: number) => {
    if (!confirm("Supprimer ce devis ?")) return;
    await fetch(`/api/quotes/${id}`, { method: "DELETE" });
    refresh();
  };

  const updateStatus = async (id: number, status: Quote["status"]) => {
    await fetch(`/api/quotes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    refresh();
  };

  const copyLink = async (token: string) => {
    const link = `${window.location.origin}/devis/${token}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(token);
      setTimeout(() => setCopied(null), 2000);
    } catch { /* noop */ }
  };

  const filtered = items.filter((q) =>
    !search ||
    `${q.client_name} ${q.client_company} ${q.title}`.toLowerCase().includes(search.toLowerCase())
  );

  // ── Form helpers ──
  const addItem = () => setForm({ ...form, items: [...form.items, { ...emptyItem }] });
  const removeItem = (i: number) => setForm({ ...form, items: form.items.filter((_, idx) => idx !== i) });
  const updateItem = (i: number, patch: Partial<QuoteItem>) =>
    setForm({ ...form, items: form.items.map((it, idx) => idx === i ? { ...it, ...patch } : it) });

  const formSubtotal = subtotal(form.items);

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
          <h1 className="font-display text-2xl font-bold mb-1">Devis</h1>
          <p className="text-white/40 text-sm">G&eacute;n&eacute;rer et envoyer des devis &agrave; vos clients</p>
        </div>
        <button onClick={openNew} className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
          <Plus size={16} /> Nouveau devis
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par client, société, titre..."
          className="input-field pl-9"
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-dark-2 rounded-2xl border border-border p-10 text-center">
          <FileText size={32} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/40 text-sm">
            {search ? "Aucun devis correspondant." : "Aucun devis pour le moment. Cliquez 'Nouveau devis' pour commencer."}
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((q) => {
            const total = subtotal(q.items);
            return (
              <div key={q.id} className="bg-dark-2 rounded-2xl border border-border p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-display text-base font-bold truncate">{q.title || q.client_name}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${statusBadge(q.status)}`}>
                        {statusLabel(q.status)}
                      </span>
                    </div>
                    <p className="text-white/50 text-xs">
                      {q.client_name}{q.client_company && ` · ${q.client_company}`}
                      {q.client_email && ` · ${q.client_email}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-bold gradient-text">
                      {total.toLocaleString("fr-FR")} {q.currency === "EUR" ? "€" : q.currency}
                    </p>
                    <p className="text-[10px] text-white/30">{q.items.length} ligne{q.items.length > 1 ? "s" : ""}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border">
                  <button onClick={() => copyLink(q.token)} className="text-xs px-3 py-1.5 rounded-lg bg-brand/10 text-brand border border-brand/20 hover:bg-brand/15 flex items-center gap-1.5">
                    {copied === q.token ? <><Check size={12} /> Copi&eacute; !</> : <><Copy size={12} /> Lien client</>}
                  </button>
                  <a
                    href={`/devis/${q.token}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/70 border border-white/10 hover:text-white flex items-center gap-1.5"
                  >
                    <Eye size={12} /> Pr&eacute;visualiser
                  </a>
                  {q.status === "draft" && (
                    <button onClick={() => updateStatus(q.id, "sent")} className="text-xs px-3 py-1.5 rounded-lg bg-blue/10 text-blue border border-blue/20 hover:bg-blue/15 flex items-center gap-1.5">
                      <Send size={12} /> Marquer envoy&eacute;
                    </button>
                  )}
                  <button onClick={() => openEdit(q)} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/60 border border-white/10 hover:text-white flex items-center gap-1.5">
                    <Edit3 size={12} /> &Eacute;diter
                  </button>
                  <button onClick={() => remove(q.id)} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/15 flex items-center gap-1.5 ml-auto">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-dark-2 rounded-2xl border border-border p-6 w-full max-w-3xl max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold">{editId ? "Modifier le devis" : "Nouveau devis"}</h3>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-white/40" /></button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Client */}
              <div className="border-b border-border pb-4">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Client</p>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text" placeholder="Nom du client *" className="input-field"
                    value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                  />
                  <input
                    type="text" placeholder="Soci&eacute;t&eacute;" className="input-field"
                    value={form.client_company} onChange={(e) => setForm({ ...form, client_company: e.target.value })}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="email" placeholder="Email" className="input-field"
                    value={form.client_email} onChange={(e) => setForm({ ...form, client_email: e.target.value })}
                  />
                  <input
                    type="tel" placeholder="T&eacute;l&eacute;phone" className="input-field"
                    value={form.client_phone} onChange={(e) => setForm({ ...form, client_phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Title */}
              <input
                type="text" placeholder="Titre du devis (ex: Automatisation CRM HubSpot)" className="input-field"
                value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              {/* Line items */}
              <div className="border-y border-border py-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase tracking-widest text-white/40">Lignes</p>
                  <button type="button" onClick={addItem} className="text-xs px-3 py-1.5 rounded-lg bg-brand/10 text-brand border border-brand/20 flex items-center gap-1.5">
                    <Plus size={12} /> Ajouter une ligne
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {form.items.map((it, i) => (
                    <div key={i} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-2 items-center">
                      <input
                        type="text" placeholder="Description" className="input-field"
                        value={it.description} onChange={(e) => updateItem(i, { description: e.target.value })}
                      />
                      <input
                        type="number" min="0" step="1" placeholder="Qté" className="input-field w-20 text-center"
                        value={it.qty} onChange={(e) => updateItem(i, { qty: parseFloat(e.target.value) || 0 })}
                      />
                      <input
                        type="number" min="0" step="0.01" placeholder="P.U." className="input-field w-28 text-right"
                        value={it.unit_price} onChange={(e) => updateItem(i, { unit_price: parseFloat(e.target.value) || 0 })}
                      />
                      <span className="text-sm font-bold text-brand min-w-[80px] text-right">
                        {((it.qty || 0) * (it.unit_price || 0)).toFixed(2)}
                      </span>
                      <button type="button" onClick={() => removeItem(i)} className="text-red-400/60 hover:text-red-400 p-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4 pt-3 border-t border-border">
                  <div className="text-right">
                    <p className="text-xs text-white/40 mb-1">Total</p>
                    <p className="font-display text-2xl font-bold gradient-text">
                      {formSubtotal.toFixed(2)} {form.currency === "EUR" ? "€" : form.currency}
                    </p>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">Devise</label>
                  <select className="input-field" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })}>
                    <option value="EUR">EUR (€)</option>
                    <option value="XOF">XOF (FCFA)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">Validité (jours)</label>
                  <input
                    type="number" min="1" max="365" className="input-field"
                    value={form.validity_days} onChange={(e) => setForm({ ...form, validity_days: parseInt(e.target.value) || 30 })}
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-1.5 block">Statut</label>
                  <select className="input-field" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Quote["status"] })}>
                    <option value="draft">Brouillon</option>
                    <option value="sent">Envoy&eacute;</option>
                    <option value="accepted">Accept&eacute;</option>
                    <option value="declined">Refus&eacute;</option>
                  </select>
                </div>
              </div>

              <textarea
                placeholder="Notes / conditions (optionnel — visibles par le client)"
                rows={3}
                className="input-field resize-none"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                  <AlertTriangle size={16} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-3 mt-2">
                <button onClick={save} className="btn-primary px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 flex-1 justify-center">
                  <Save size={14} /> {editId ? "Enregistrer" : "Cr&eacute;er le devis"}
                </button>
                <button onClick={() => setShowForm(false)} className="btn-dark px-6 py-3 rounded-xl text-sm">
                  Annuler
                </button>
              </div>
              {!editId && (
                <p className="text-[11px] text-white/30 text-center -mt-2">
                  Apr&egrave;s cr&eacute;ation, vous pourrez copier le lien client &agrave; partager.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
