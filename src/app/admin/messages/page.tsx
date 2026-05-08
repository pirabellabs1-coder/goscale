"use client";

import { useState } from "react";
import { useProjects } from "@/lib/ProjectContext";
import { Mail, Phone, Clock, ChevronRight } from "lucide-react";

export default function MessagesPage() {
  const { messages } = useProjects();
  const [selected, setSelected] = useState<number | null>(null);

  const colorClasses: Record<string, string> = {
    brand: "bg-brand/20 text-brand",
    purple: "bg-purple/20 text-purple",
    emerald: "bg-emerald/20 text-emerald",
    blue: "bg-blue/20 text-blue",
    amber: "bg-amber/20 text-amber",
  };

  const activeMsg = messages.find((m) => m.id === selected);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1">Messages</h1>
        <p className="text-white/40 text-sm">{messages.length} messages recus</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          {messages.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                selected === m.id
                  ? "bg-brand/5 border-brand/30"
                  : "bg-dark-2 border-border hover:border-brand/20"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${colorClasses[m.color]}`}>
                  {m.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{m.name}</p>
                  <p className="text-xs text-white/30">{m.time}</p>
                </div>
                <ChevronRight size={14} className="text-white/20 flex-shrink-0" />
              </div>
              <p className="text-xs text-white/50 line-clamp-2">{m.message}</p>
              <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-brand/10 text-brand font-semibold">
                {m.service}
              </span>
            </button>
          ))}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {activeMsg ? (
            <div className="bg-dark-2 rounded-2xl border border-border p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${colorClasses[activeMsg.color]}`}>
                  {activeMsg.initials}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">{activeMsg.name}</h3>
                  <p className="text-xs text-white/40">{activeMsg.service} &middot; {activeMsg.time}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={15} className="text-white/30" />
                  <span className="text-white/60">{activeMsg.email}</span>
                </div>
                {activeMsg.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={15} className="text-white/30" />
                    <span className="text-white/60">{activeMsg.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Clock size={15} className="text-white/30" />
                  <span className="text-white/60">{activeMsg.time}</span>
                </div>
              </div>

              <div className="bg-dark-3 rounded-xl p-5 border border-border">
                <p className="text-sm text-white/70 leading-relaxed">{activeMsg.message}</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="btn-primary px-5 py-2.5 rounded-xl text-sm">Repondre</button>
                <button className="btn-dark px-5 py-2.5 rounded-xl text-sm">Archiver</button>
              </div>
            </div>
          ) : (
            <div className="bg-dark-2 rounded-2xl border border-border p-12 text-center">
              <Mail size={40} className="text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-sm">Selectionnez un message pour le lire</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
