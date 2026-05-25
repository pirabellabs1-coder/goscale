"use client";

import { CheckCircle, MessageSquare, Phone, Bot, Globe, Palette, Zap, Send, MoreVertical, ArrowLeft } from "lucide-react";

/**
 * Illustrations dédiées par catégorie de service.
 * Chaque illustration est 100% CSS, responsive, et habillée par la palette du service.
 */
export type IllustrationVariant =
  | "whatsapp-chat"
  | "chatbot-web"
  | "callbot-phone"
  | "automation-flow"
  | "wordpress-seo"
  | "ui-mockup"
  | "icon-halo";

export default function HeroIllustration({
  variant,
  color,
}: {
  variant: IllustrationVariant;
  color: "emerald" | "blue" | "brand" | "purple" | "amber";
}) {
  const haloColor =
    color === "emerald" ? "bg-emerald" :
    color === "blue" ? "bg-blue" :
    color === "brand" ? "bg-brand" :
    color === "purple" ? "bg-purple" : "bg-amber";

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Halos décoratifs */}
      <div className={`absolute -top-12 -right-12 w-72 h-72 ${haloColor}/20 rounded-full blur-3xl pointer-events-none`} />
      <div className={`absolute -bottom-12 -left-12 w-64 h-64 ${haloColor}/10 rounded-full blur-3xl pointer-events-none`} />

      <div className="relative">
        {variant === "whatsapp-chat" && <WhatsAppChat />}
        {variant === "chatbot-web" && <ChatbotWeb color={color} />}
        {variant === "callbot-phone" && <CallbotPhone color={color} />}
        {variant === "automation-flow" && <AutomationFlow color={color} />}
        {variant === "wordpress-seo" && <WordPressSeo color={color} />}
        {variant === "ui-mockup" && <UiMockup color={color} />}
        {variant === "icon-halo" && <IconHalo color={color} />}
      </div>
    </div>
  );
}

/* ── 1. WhatsApp Chat Mockup ── */
function WhatsAppChat() {
  return (
    <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-[2.5rem] border border-white/10 p-3 shadow-2xl shadow-emerald/10">
      {/* Phone bezel */}
      <div className="bg-[#075E54] rounded-t-[2rem] -mx-3 -mt-3 px-5 py-3 flex items-center gap-3">
        <ArrowLeft size={16} className="text-white/80" />
        <div className="w-9 h-9 rounded-full bg-emerald flex items-center justify-center text-xs font-bold text-white">GS</div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">GoScale Bot</div>
          <div className="text-[10px] text-emerald flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald inline-block animate-pulse" />
            en ligne
          </div>
        </div>
        <MoreVertical size={16} className="text-white/60" />
      </div>

      {/* Chat area */}
      <div className="bg-[#0d1418] px-3 py-4 flex flex-col gap-2 min-h-[320px]" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.02) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
        {/* Bot msg */}
        <div className="self-start max-w-[80%] bg-[#1f2c33] rounded-lg rounded-bl-none px-3 py-2 text-xs text-white/90 shadow-sm">
          Bonjour 👋 Je suis l&apos;assistant GoScale. Je peux vous aider à automatiser votre WhatsApp en 48h. Quel est votre besoin ?
          <div className="text-[9px] text-white/40 text-right mt-1">10:24</div>
        </div>
        {/* User msg */}
        <div className="self-end max-w-[80%] bg-emerald/90 rounded-lg rounded-br-none px-3 py-2 text-xs text-white shadow-sm">
          J&apos;ai un e-commerce, je perds plein de ventes le soir 😩
          <div className="text-[9px] text-white/60 text-right mt-1">10:25 ✓✓</div>
        </div>
        {/* Bot msg with options */}
        <div className="self-start max-w-[85%] bg-[#1f2c33] rounded-lg rounded-bl-none px-3 py-2 text-xs text-white/90 shadow-sm">
          Compris. Voici ce qu&apos;on peut mettre en place :
          <div className="mt-2 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-[11px]">
              <CheckCircle size={10} className="text-emerald" /> Réponses 24/7 (GPT-4)
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <CheckCircle size={10} className="text-emerald" /> Relances panier abandonné
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <CheckCircle size={10} className="text-emerald" /> Catalogue & paiement intégré
            </div>
          </div>
          <div className="text-[9px] text-white/40 text-right mt-1">10:25</div>
        </div>
        {/* Typing indicator */}
        <div className="self-start bg-[#1f2c33] rounded-lg rounded-bl-none px-3 py-2.5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>

      {/* Input bar */}
      <div className="bg-[#1f2c33] rounded-b-[2rem] -mx-3 -mb-3 px-4 py-3 flex items-center gap-2">
        <div className="flex-1 bg-[#2a3942] rounded-full px-3 py-2 text-[10px] text-white/30">Tapez un message…</div>
        <div className="w-9 h-9 rounded-full bg-emerald flex items-center justify-center">
          <Send size={14} className="text-white" />
        </div>
      </div>

      {/* Floating stat */}
      <div className="absolute -right-4 -top-4 sm:-right-6 sm:-top-6 bg-dark border border-emerald/30 rounded-2xl px-3 py-2 shadow-xl shadow-emerald/20">
        <div className="text-[9px] uppercase tracking-widest text-emerald font-bold">Réponse</div>
        <div className="font-display text-lg font-bold text-white">~2 sec</div>
      </div>
    </div>
  );
}

/* ── 2. Chatbot Web Widget Mockup ── */
function ChatbotWeb({ color }: { color: string }) {
  const accent = color === "brand" ? "#E85C1A" : color === "emerald" ? "#10B981" : color === "blue" ? "#3B82F6" : color === "purple" ? "#8B5CF6" : "#F59E0B";
  return (
    <div className="relative bg-gradient-to-br from-dark-2 to-dark rounded-3xl border border-white/10 p-5 shadow-2xl" style={{ boxShadow: `0 25px 50px -12px ${accent}20` }}>
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald/60" />
        <span className="ml-3 text-[10px] text-white/30">votre-site.com</span>
      </div>
      {/* Fake page content */}
      <div className="space-y-2 mb-6 opacity-40">
        <div className="h-3 bg-white/10 rounded w-3/4" />
        <div className="h-2 bg-white/10 rounded w-full" />
        <div className="h-2 bg-white/10 rounded w-5/6" />
        <div className="h-2 bg-white/10 rounded w-4/6" />
      </div>
      {/* Chat widget */}
      <div className="rounded-2xl border border-white/10 bg-dark p-3 shadow-lg">
        <div className="flex items-center gap-2 pb-2 mb-2 border-b border-white/5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: accent }}>
            <Bot size={14} className="text-white" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-white">Assistant IA</div>
            <div className="text-[9px]" style={{ color: accent }}>● en ligne</div>
          </div>
        </div>
        <div className="text-[11px] text-white/70 mb-2 bg-white/[0.03] rounded-lg px-2.5 py-2">
          Bonjour ! Comment puis-je vous aider aujourd&apos;hui ?
        </div>
        <div className="text-[11px] text-white/70 mb-3 self-end ml-auto rounded-lg px-2.5 py-2" style={{ background: `${accent}30`, color: "#fff" }}>
          Combien coûte votre service ?
        </div>
      </div>
      {/* Floating */}
      <div className="absolute -right-4 -top-4 bg-dark border rounded-2xl px-3 py-2 shadow-xl" style={{ borderColor: `${accent}50` }}>
        <div className="text-[9px] uppercase tracking-widest font-bold" style={{ color: accent }}>Conversion</div>
        <div className="font-display text-lg font-bold text-white">+35 %</div>
      </div>
    </div>
  );
}

/* ── 3. Callbot Phone Mockup ── */
function CallbotPhone({ color }: { color: string }) {
  const accent = color === "blue" ? "#3B82F6" : color === "brand" ? "#E85C1A" : "#10B981";
  return (
    <div className="relative bg-gradient-to-br from-dark-2 to-dark rounded-[2.5rem] border border-white/10 p-4 shadow-2xl">
      <div className="bg-dark-3 rounded-[2rem] aspect-[9/16] flex flex-col items-center justify-center px-6 py-8">
        {/* Live indicator */}
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Appel entrant</div>
        <div className="text-xs text-white/60 mb-6">+229 01 68 24 28 66</div>

        {/* Avatar with pulse */}
        <div className="relative w-28 h-28 mb-6">
          <div className="absolute inset-0 rounded-full animate-ping" style={{ background: `${accent}40` }} />
          <div className="absolute inset-2 rounded-full animate-ping" style={{ background: `${accent}30`, animationDelay: "300ms" }} />
          <div className="relative w-full h-full rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}60)` }}>
            <Phone size={32} className="text-white" />
          </div>
        </div>

        <div className="font-display text-xl font-bold text-white mb-1">Agent IA</div>
        <div className="text-[10px] uppercase tracking-widest font-bold" style={{ color: accent }}>● En conversation</div>

        {/* Waveform */}
        <div className="flex items-end gap-1 h-10 mt-6">
          {[0.3, 0.8, 0.5, 0.9, 0.6, 1, 0.4, 0.7, 0.5, 0.8, 0.3, 0.6].map((h, i) => (
            <span
              key={i}
              className="w-1 rounded-full"
              style={{
                height: `${h * 100}%`,
                background: accent,
                animation: `pulse 1s ease-in-out ${i * 0.05}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
            <Phone size={18} className="text-white rotate-[135deg]" />
          </div>
        </div>
      </div>

      {/* Floating */}
      <div className="absolute -right-4 -top-4 bg-dark border rounded-2xl px-3 py-2 shadow-xl" style={{ borderColor: `${accent}50` }}>
        <div className="text-[9px] uppercase tracking-widest font-bold" style={{ color: accent }}>Disponible</div>
        <div className="font-display text-lg font-bold text-white">24/7</div>
      </div>
    </div>
  );
}

/* ── 4. Automation Flow Mockup ── */
function AutomationFlow({ color }: { color: string }) {
  const accent = color === "emerald" ? "#10B981" : color === "brand" ? "#E85C1A" : "#3B82F6";
  const nodes = [
    { icon: Globe, label: "Site Web", x: 10, y: 20 },
    { icon: Zap, label: "Make", x: 50, y: 50 },
    { icon: MessageSquare, label: "WhatsApp", x: 10, y: 80 },
    { icon: Bot, label: "CRM", x: 80, y: 30 },
    { icon: CheckCircle, label: "Notion", x: 80, y: 75 },
  ];

  return (
    <div className="relative bg-gradient-to-br from-dark-2 to-dark rounded-3xl border border-white/10 p-6 shadow-2xl aspect-[4/5]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.slice(0, 4).map((n, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke={accent}
            strokeWidth="0.3"
            strokeDasharray="2 2"
            opacity="0.4"
          />
        ))}
        <line x1="50" y1="50" x2="80" y2="75" stroke={accent} strokeWidth="0.3" strokeDasharray="2 2" opacity="0.4" />
      </svg>

      {nodes.map((n, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div
            className="w-12 h-12 rounded-2xl border flex items-center justify-center backdrop-blur-sm"
            style={{ borderColor: `${accent}60`, background: `${accent}20` }}
          >
            <n.icon size={20} style={{ color: accent }} />
          </div>
          <span className="text-[10px] font-semibold text-white/70 whitespace-nowrap">{n.label}</span>
        </div>
      ))}

      {/* Floating */}
      <div className="absolute -right-4 -top-4 bg-dark border rounded-2xl px-3 py-2 shadow-xl" style={{ borderColor: `${accent}50` }}>
        <div className="text-[9px] uppercase tracking-widest font-bold" style={{ color: accent }}>Gain</div>
        <div className="font-display text-lg font-bold text-white">+10h/sem</div>
      </div>
    </div>
  );
}

/* ── 5. WordPress + SEO Mockup ── */
function WordPressSeo({ color }: { color: string }) {
  const accent = color === "purple" ? "#8B5CF6" : "#E85C1A";
  return (
    <div className="relative bg-gradient-to-br from-dark-2 to-dark rounded-3xl border border-white/10 p-5 shadow-2xl">
      {/* Google search bar */}
      <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 mb-4 flex items-center gap-3 text-xs text-white/70">
        <span className="text-white/30">🔍</span>
        <span>agence automatisation Bénin</span>
      </div>

      {/* SERP results */}
      <div className="space-y-3">
        <div className="rounded-xl p-3 border-2" style={{ background: `${accent}15`, borderColor: accent }}>
          <div className="text-[9px] uppercase tracking-widest font-bold mb-1" style={{ color: accent }}>● Votre site — #1</div>
          <div className="text-xs font-bold text-white">GoScaleStudio · Automatisation & IA Bénin</div>
          <div className="text-[10px] text-white/50 mt-1 line-clamp-2">Agence digitale basée à Cotonou. Automatisation no-code, chatbots IA…</div>
        </div>
        <div className="rounded-xl p-3 border border-white/5 opacity-50">
          <div className="text-xs font-semibold text-white/80">Concurrent A</div>
          <div className="text-[10px] text-white/40 mt-1">Lorem ipsum dolor sit amet…</div>
        </div>
        <div className="rounded-xl p-3 border border-white/5 opacity-30">
          <div className="text-xs font-semibold text-white/80">Concurrent B</div>
          <div className="text-[10px] text-white/40 mt-1">Consectetur adipiscing…</div>
        </div>
      </div>

      {/* Speed score */}
      <div className="absolute -right-4 -top-4 bg-dark border rounded-2xl px-3 py-2 shadow-xl" style={{ borderColor: `${accent}50` }}>
        <div className="text-[9px] uppercase tracking-widest font-bold" style={{ color: accent }}>Vitesse</div>
        <div className="font-display text-lg font-bold text-white">98/100</div>
      </div>
    </div>
  );
}

/* ── 6. UI/UX Mockup ── */
function UiMockup({ color }: { color: string }) {
  const accent = color === "amber" ? "#F59E0B" : "#E85C1A";
  return (
    <div className="relative bg-gradient-to-br from-dark-2 to-dark rounded-3xl border border-white/10 p-4 shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl aspect-square flex items-center justify-center" style={{ background: `${accent}30`, border: `1px solid ${accent}40` }}>
          <Palette size={18} style={{ color: accent }} />
        </div>
        <div className="rounded-xl aspect-square col-span-2 flex flex-col p-3 gap-1.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="h-1.5 bg-white/30 rounded w-1/2" />
          <div className="h-1 bg-white/15 rounded w-3/4" />
          <div className="h-1 bg-white/15 rounded w-5/6" />
          <div className="mt-auto h-3 rounded" style={{ background: accent }} />
        </div>
        <div className="rounded-xl aspect-square col-span-2 flex p-2 gap-1.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex-1 space-y-1">
            <div className="h-1 bg-white/15 rounded" />
            <div className="h-1 bg-white/15 rounded w-3/4" />
            <div className="h-1 bg-white/15 rounded w-1/2" />
          </div>
          <div className="w-8 rounded" style={{ background: `${accent}50` }} />
        </div>
        <div className="rounded-xl aspect-square flex items-center justify-center text-xs font-display font-bold text-white" style={{ background: `${accent}30`, border: `1px solid ${accent}40` }}>48h</div>
        <div className="rounded-xl aspect-square col-span-3 flex items-center gap-2 p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="w-6 h-6 rounded-full" style={{ background: accent }} />
          <div className="flex-1">
            <div className="h-1.5 bg-white/30 rounded w-1/3 mb-1" />
            <div className="h-1 bg-white/15 rounded w-2/3" />
          </div>
        </div>
      </div>

      <div className="absolute -right-4 -top-4 bg-dark border rounded-2xl px-3 py-2 shadow-xl" style={{ borderColor: `${accent}50` }}>
        <div className="text-[9px] uppercase tracking-widest font-bold" style={{ color: accent }}>Livré en</div>
        <div className="font-display text-lg font-bold text-white">48h</div>
      </div>
    </div>
  );
}

/* ── 7. Fallback : Icon halo géante ── */
function IconHalo({ color }: { color: string }) {
  const accent = color === "brand" ? "#E85C1A" : color === "emerald" ? "#10B981" : color === "blue" ? "#3B82F6" : color === "purple" ? "#8B5CF6" : "#F59E0B";
  return (
    <div className="relative aspect-square flex items-center justify-center">
      <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: `${accent}30` }} />
      <div className="absolute inset-8 rounded-full blur-2xl" style={{ background: `${accent}20` }} />
      <div className="relative w-48 h-48 rounded-3xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accent}30, ${accent}10)`, border: `2px solid ${accent}40` }}>
        <Bot size={80} style={{ color: accent }} />
      </div>
    </div>
  );
}
