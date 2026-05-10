"use client";

import { ReactNode } from "react";
import { AlertTriangle, X } from "lucide-react";

export type ConfirmTone = "danger" | "warning" | "info";

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  tone = "danger",
  loading = false,
  icon,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmTone;
  loading?: boolean;
  icon?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  const toneClasses = {
    danger: {
      bubble: "bg-red-500/15 text-red-400",
      btn: "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30",
    },
    warning: {
      bubble: "bg-amber/15 text-amber",
      btn: "bg-amber/20 text-amber border border-amber/30 hover:bg-amber/30",
    },
    info: {
      bubble: "bg-brand/15 text-brand",
      btn: "btn-primary",
    },
  }[tone];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={() => !loading && onCancel()}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-dark-2 rounded-3xl border border-border w-full max-w-md p-6 sm:p-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          disabled={loading}
          className="absolute top-4 right-4 text-white/30 hover:text-white/60 disabled:opacity-50"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-4 mb-5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${toneClasses.bubble}`}>
            {icon || <AlertTriangle size={20} />}
          </div>
          <div className="flex-1 min-w-0 pr-6">
            <h3 className="font-display text-base sm:text-lg font-bold mb-1">{title}</h3>
            {description && <p className="text-white/55 text-sm leading-relaxed">{description}</p>}
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="btn-dark px-5 py-3 rounded-xl text-sm disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-5 py-3 rounded-xl text-sm font-bold disabled:opacity-50 ${toneClasses.btn}`}
          >
            {loading ? "..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
