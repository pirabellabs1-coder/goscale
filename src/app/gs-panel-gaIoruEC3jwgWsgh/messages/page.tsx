"use client";

import { useState } from "react";
import { useProjects, Message } from "@/lib/ProjectContext";
import { Mail, Phone, Clock, ChevronRight, Trash2, CheckCircle, Inbox } from "lucide-react";

export default function MessagesPage() {
  const { messages, markMessageRead, deleteMessage, loading } = useProjects();
  const [selected, setSelected] = useState<number | null>(null);

  const activeMsg = messages.find((m) => m.id === selected);
  const unread = messages.filter((m) => !m.is_read).length;

  const handleSelect = async (msg: Message) => {
    setSelected(msg.id);
    if (!msg.is_read) {
      await markMessageRead(msg.id);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Supprimer ce message ?")) {
      await deleteMessage(id);
      if (selected === id) setSelected(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `il y a ${mins}min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `il y a ${days}j`;
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  };

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
        <h1 className="font-display text-2xl font-bold mb-1">Messages</h1>
        <p className="text-white/40 text-sm">
          {messages.length} message{messages.length !== 1 ? "s" : ""} re&ccedil;u{messages.length !== 1 ? "s" : ""}
          {unread > 0 && <span className="text-brand ml-1">&middot; {unread} non lu{unread !== 1 ? "s" : ""}</span>}
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-dark-2 rounded-2xl border border-border p-12 text-center">
          <Inbox size={48} className="text-white/10 mx-auto mb-4" />
          <p className="text-white/30 text-sm">Aucun message pour le moment.</p>
          <p className="text-white/20 text-xs mt-1">Les messages du formulaire de contact appara&icirc;tront ici.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            {messages.map((m) => (
              <button
                key={m.id}
                onClick={() => handleSelect(m)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selected === m.id
                    ? "bg-brand/5 border-brand/30"
                    : m.is_read
                      ? "bg-dark-2 border-border hover:border-brand/20"
                      : "bg-dark-2 border-brand/20 hover:border-brand/30"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                    m.is_read ? "bg-white/5 text-white/30" : "bg-brand/20 text-brand"
                  }`}>
                    {m.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm truncate ${m.is_read ? "text-white/60" : "font-semibold"}`}>{m.name}</p>
                      {!m.is_read && <span className="w-2 h-2 rounded-full bg-brand flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-white/30">{formatDate(m.created_at)}</p>
                  </div>
                  <ChevronRight size={14} className="text-white/20 flex-shrink-0" />
                </div>
                <p className="text-xs text-white/50 line-clamp-2">{m.message}</p>
                <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-brand/10 text-brand font-semibold">
                  {m.service || "G\u00e9n\u00e9ral"}
                </span>
              </button>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {activeMsg ? (
              <div className="bg-dark-2 rounded-2xl border border-border p-6">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-12 h-12 rounded-full bg-brand/20 text-brand flex items-center justify-center text-sm font-bold">
                    {activeMsg.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold">{activeMsg.name}</h3>
                    <p className="text-xs text-white/40">{activeMsg.service || "G\u00e9n\u00e9ral"} &middot; {formatDate(activeMsg.created_at)}</p>
                  </div>
                  {activeMsg.is_read && (
                    <span className="flex items-center gap-1 text-xs text-emerald">
                      <CheckCircle size={12} /> Lu
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={15} className="text-white/30" />
                    <a href={`mailto:${activeMsg.email}`} className="text-white/60 hover:text-brand transition-colors">{activeMsg.email}</a>
                  </div>
                  {activeMsg.phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone size={15} className="text-white/30" />
                      <a href={`https://wa.me/${activeMsg.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand transition-colors">
                        {activeMsg.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={15} className="text-white/30" />
                    <span className="text-white/60">{new Date(activeMsg.created_at).toLocaleString("fr-FR")}</span>
                  </div>
                </div>

                <div className="bg-dark-3 rounded-xl p-5 border border-border">
                  <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{activeMsg.message}</p>
                </div>

                <div className="flex gap-3 mt-6">
                  <a
                    href={`mailto:${activeMsg.email}?subject=Re: ${activeMsg.service || "Votre message"} — GoScaleStudio`}
                    className="btn-primary px-5 py-2.5 rounded-xl text-sm inline-flex items-center gap-2"
                  >
                    <Mail size={14} /> R&eacute;pondre par email
                  </a>
                  {activeMsg.phone && (
                    <a
                      href={`https://wa.me/${activeMsg.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-dark px-5 py-2.5 rounded-xl text-sm inline-flex items-center gap-2"
                    >
                      <Phone size={14} /> WhatsApp
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(activeMsg.id)}
                    className="ml-auto px-4 py-2.5 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-dark-2 rounded-2xl border border-border p-12 text-center">
                <Mail size={40} className="text-white/10 mx-auto mb-3" />
                <p className="text-white/30 text-sm">S&eacute;lectionnez un message pour le lire</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
