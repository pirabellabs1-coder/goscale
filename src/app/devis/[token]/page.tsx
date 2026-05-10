"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  Check, X, Download, ArrowLeft, AlertTriangle, Sparkles,
  CheckCircle2, XCircle, Clock,
} from "lucide-react";

type QuoteItem = { description: string; qty: number; unit_price: number };

type PublicQuote = {
  token: string;
  client_name: string;
  client_company: string;
  title: string;
  items: QuoteItem[];
  notes: string;
  currency: string;
  validity_days: number;
  status: "draft" | "sent" | "viewed" | "accepted" | "declined";
  created_at: string;
  sent_at: string | null;
  accepted_at: string | null;
  declined_at: string | null;
};

export default function DevisPublicPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [quote, setQuote] = useState<PublicQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acting, setActing] = useState(false);
  const [confirmAction, setConfirmAction] = useState<"accept" | "decline" | null>(null);
  const [clientMessage, setClientMessage] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  // Snapshot Date.now() once at mount so render stays pure under React 19's purity rule
  const [now] = useState(() => Date.now());

  useEffect(() => {
    fetch(`/api/quotes/public/${token}`)
      .then(async (r) => {
        if (!r.ok) {
          const d = await r.json();
          setError(d.error || "Devis introuvable");
          return null;
        }
        return r.json();
      })
      .then((data) => data && setQuote(data))
      .catch(() => setError("Erreur réseau"))
      .finally(() => setLoading(false));
  }, [token]);

  const openAction = (action: "accept" | "decline") => {
    setConfirmAction(action);
    setClientMessage("");
    setActionError(null);
  };

  const submitAction = async () => {
    if (!confirmAction) return;
    setActing(true);
    setActionError(null);
    try {
      const res = await fetch(`/api/quotes/public/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: confirmAction, message: clientMessage }),
      });
      const data = await res.json();
      if (!res.ok) {
        setActionError(data.error || "Erreur");
      } else {
        const refreshed = await fetch(`/api/quotes/public/${token}`).then((r) => r.json());
        setQuote(refreshed);
        setConfirmAction(null);
        setClientMessage("");
      }
    } catch {
      setActionError("Erreur réseau");
    } finally {
      setActing(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-dark min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="bg-dark text-white min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-red-400" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-3">Devis introuvable</h1>
          <p className="text-white/50 text-sm mb-6">{error || "Le lien semble incorrect ou le devis a été supprimé."}</p>
          <Link href="/" className="btn-primary px-6 py-3 rounded-full text-sm inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Retour au site
          </Link>
        </div>
      </div>
    );
  }

  const total = quote.items.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.unit_price) || 0), 0);
  const currencySymbol = quote.currency === "EUR" ? "€" : quote.currency === "USD" ? "$" : quote.currency;
  const fmt = (n: number) => `${n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currencySymbol}`;

  // Compute expiry (now is captured at mount via useState for purity)
  const sentDate = quote.sent_at ? new Date(quote.sent_at) : new Date(quote.created_at);
  const expiryDate = new Date(sentDate.getTime() + quote.validity_days * 24 * 60 * 60 * 1000);
  const isExpired = now > expiryDate.getTime() && !["accepted", "declined"].includes(quote.status);
  const isDecided = quote.status === "accepted" || quote.status === "declined";

  return (
    <div className="bg-dark text-white min-h-screen print:bg-white print:text-black">
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>

      {/* Top bar (hidden on print) */}
      <div className="no-print bg-dark-2 border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-bold">
          <span className="gradient-text">GoScale</span>Studio
        </Link>
        <button
          onClick={() => {
            // Set a friendly default filename for "Save as PDF" in the browser dialog
            const safeTitle = (quote.title || "devis").replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 40);
            const safeName = (quote.client_name || "client").replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 30);
            const number = quote.token.slice(0, 8).toUpperCase();
            const previousTitle = document.title;
            document.title = `Devis-${number}-${safeName}-${safeTitle}`;
            window.print();
            // Restore the original title shortly after the dialog closes
            setTimeout(() => { document.title = previousTitle; }, 1000);
          }}
          className="text-xs px-4 py-2 rounded-full bg-brand text-white hover:opacity-90 flex items-center gap-2 font-bold"
        >
          <Download size={14} /> Télécharger en PDF
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12">

        {/* Status banner */}
        {isDecided && (
          <div className={`rounded-2xl border p-5 mb-6 flex items-center gap-3 ${
            quote.status === "accepted"
              ? "bg-emerald/10 border-emerald/30"
              : "bg-red-500/10 border-red-500/30"
          }`}>
            {quote.status === "accepted" ? (
              <>
                <CheckCircle2 size={22} className="text-emerald flex-shrink-0" />
                <div>
                  <p className="font-bold text-emerald">Devis accepté</p>
                  <p className="text-xs text-white/60">Merci pour votre confiance — nous vous recontactons sous peu.</p>
                </div>
              </>
            ) : (
              <>
                <XCircle size={22} className="text-red-400 flex-shrink-0" />
                <div>
                  <p className="font-bold text-red-400">Devis refusé</p>
                  <p className="text-xs text-white/60">Nous restons disponibles si vous changez d&apos;avis.</p>
                </div>
              </>
            )}
          </div>
        )}
        {isExpired && !isDecided && (
          <div className="rounded-2xl border bg-amber/10 border-amber/30 p-5 mb-6 flex items-center gap-3">
            <Clock size={22} className="text-amber flex-shrink-0" />
            <div>
              <p className="font-bold text-amber">Devis expiré</p>
              <p className="text-xs text-white/60">Contactez-nous pour qu&apos;on vous fasse une nouvelle proposition.</p>
            </div>
          </div>
        )}

        {/* Header — same in print */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-brand print:text-orange-600">
              <Sparkles size={12} /> Devis
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold print:text-black">
              {quote.title || "Proposition commerciale"}
            </h1>
            <p className="text-white/40 text-xs mt-1 print:text-gray-500">
              N° {quote.token.slice(0, 8).toUpperCase()} &middot; {new Date(quote.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-base font-bold gradient-text print:text-orange-600">GoScaleStudio</p>
            <p className="text-xs text-white/40 print:text-gray-500">Cotonou, B&eacute;nin</p>
            <p className="text-xs text-white/40 print:text-gray-500">contact@goscalestudio.com</p>
          </div>
        </div>

        {/* Client */}
        <div className="bg-dark-2 print:bg-gray-50 print:border print:border-gray-200 rounded-2xl p-5 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 print:text-gray-500 mb-2">
            Pour
          </p>
          <p className="font-display text-base font-bold print:text-black">{quote.client_name}</p>
          {quote.client_company && (
            <p className="text-sm text-white/60 print:text-gray-700">{quote.client_company}</p>
          )}
        </div>

        {/* Items table */}
        <div className="bg-dark-2 print:bg-white print:border print:border-gray-200 rounded-2xl overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead className="bg-dark-3 print:bg-gray-100">
              <tr>
                <th className="text-left text-[10px] uppercase tracking-widest text-white/40 print:text-gray-600 font-bold p-4">Description</th>
                <th className="text-right text-[10px] uppercase tracking-widest text-white/40 print:text-gray-600 font-bold p-4 w-16">Qt&eacute;</th>
                <th className="text-right text-[10px] uppercase tracking-widest text-white/40 print:text-gray-600 font-bold p-4 w-32">P.U.</th>
                <th className="text-right text-[10px] uppercase tracking-widest text-white/40 print:text-gray-600 font-bold p-4 w-32">Total</th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((it, i) => (
                <tr key={i} className="border-t border-border print:border-gray-200">
                  <td className="p-4 print:text-black">{it.description}</td>
                  <td className="p-4 text-right print:text-black">{it.qty}</td>
                  <td className="p-4 text-right print:text-black">{fmt(it.unit_price)}</td>
                  <td className="p-4 text-right font-semibold print:text-black">{fmt((it.qty || 0) * (it.unit_price || 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-end mb-8">
          <div className="text-right">
            <p className="text-xs text-white/40 print:text-gray-500 mb-1">TOTAL</p>
            <p className="font-display text-3xl sm:text-4xl font-bold gradient-text print:text-orange-600">
              {fmt(total)}
            </p>
            <p className="text-[11px] text-white/30 print:text-gray-500 mt-1">
              Validit&eacute; : {quote.validity_days} jours &middot; Expire le {expiryDate.toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>

        {/* Notes */}
        {quote.notes && (
          <div className="bg-dark-2 print:bg-gray-50 print:border print:border-gray-200 rounded-2xl p-5 mb-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 print:text-gray-600 mb-2">
              Notes / Conditions
            </p>
            <p className="text-sm text-white/70 print:text-gray-800 leading-relaxed whitespace-pre-line">
              {quote.notes}
            </p>
          </div>
        )}

        {/* Actions (hidden on print + when decided/expired) */}
        {!isDecided && !isExpired && (
          <div className="no-print flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => openAction("accept")}
              className="btn-primary px-6 py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 flex-1"
            >
              <Check size={16} /> Accepter ce devis
            </button>
            <button
              onClick={() => openAction("decline")}
              className="btn-dark px-6 py-4 rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <X size={16} /> Refuser
            </button>
          </div>
        )}

        {/* Confirmation modal — replaces native confirm() with branded UI + optional message */}
        {confirmAction && (
          <div
            className="no-print fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => !acting && setConfirmAction(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-dark-2 rounded-3xl border border-border w-full max-w-md p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  confirmAction === "accept" ? "bg-emerald/15 text-emerald" : "bg-red-500/15 text-red-400"
                }`}>
                  {confirmAction === "accept" ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">
                    {confirmAction === "accept" ? "Accepter ce devis" : "Refuser ce devis"}
                  </h3>
                  <p className="text-white/40 text-xs mt-0.5">
                    {confirmAction === "accept"
                      ? "Une action irréversible — l'agence sera notifiée."
                      : "L'agence verra votre retour pour s'améliorer."}
                  </p>
                </div>
              </div>

              <label className="text-xs text-white/40 mb-1.5 block">
                {confirmAction === "accept"
                  ? "Instructions ou message (optionnel)"
                  : "Raison du refus ou commentaire (optionnel)"}
              </label>
              <textarea
                value={clientMessage}
                onChange={(e) => setClientMessage(e.target.value)}
                rows={4}
                maxLength={2000}
                placeholder={confirmAction === "accept"
                  ? "Ex : démarrons la semaine prochaine, voici quelques précisions..."
                  : "Ex : budget trop élevé, projet reporté, autre prestataire..."
                }
                className="input-field resize-none mb-2"
              />
              <div className="flex justify-end mb-4">
                <span className="text-xs text-white/30">{clientMessage.length} / 2000</span>
              </div>

              {actionError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 flex items-start gap-2">
                  <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{actionError}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={submitAction}
                  disabled={acting}
                  className={`px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 flex-1 disabled:opacity-50 ${
                    confirmAction === "accept" ? "btn-primary" : "bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/20"
                  }`}
                >
                  {acting ? "Envoi..." : (confirmAction === "accept" ? "Confirmer l'acceptation" : "Confirmer le refus")}
                </button>
                <button
                  onClick={() => setConfirmAction(null)}
                  disabled={acting}
                  className="btn-dark px-6 py-3.5 rounded-xl text-sm disabled:opacity-50"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pt-6 border-t border-border print:border-gray-200">
          <p className="text-xs text-white/30 print:text-gray-500">
            Devis g&eacute;n&eacute;r&eacute; par{" "}
            <Link href="/" className="text-brand hover:underline font-semibold print:text-orange-600">GoScaleStudio</Link>
            {" "}&middot; goscalestudio.com
          </p>
        </div>
      </div>
    </div>
  );
}
