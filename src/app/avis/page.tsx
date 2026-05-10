"use client";

import { Suspense, useState } from "react";
import { Star, Send, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

function ReviewForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (text.trim().length < 10) {
      setError("Votre avis doit faire au moins 10 caractères.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, email, text, rating }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur d'envoi");
      } else {
        setDone(true);
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-dark-2 rounded-3xl border border-emerald/30 p-8 sm:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald/15 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} className="text-emerald" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-3">Merci pour votre avis !</h2>
        <p className="text-white/60 text-sm sm:text-base mb-6 max-w-md mx-auto">
          Votre retour a bien été enregistré. Il sera publié sur le site une fois validé. À très bientôt !
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm">
          <ArrowLeft size={16} /> Retour au site
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-dark-2 rounded-3xl border border-border p-6 sm:p-10">
      {/* Stars */}
      <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
        Note globale
      </label>
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className="transition-transform hover:scale-110"
            aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
          >
            <Star
              size={32}
              className={
                n <= (hover || rating)
                  ? "text-amber fill-amber"
                  : "text-white/15"
              }
            />
          </button>
        ))}
        <span className="text-sm text-white/40 ml-2">{rating}/5</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Votre nom *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={100}
            className="input-field"
            placeholder="Jean Dupont"
          />
        </div>
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Votre rôle / société (optionnel)</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            maxLength={100}
            className="input-field"
            placeholder="Agent immobilier"
          />
        </div>
      </div>

      <label className="text-xs text-white/40 mb-1.5 block">Email (optionnel)</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={200}
        className="input-field mb-4"
        placeholder="vous@example.com"
      />

      <label className="text-xs text-white/40 mb-1.5 block">Votre avis *</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        minLength={10}
        maxLength={2000}
        rows={6}
        className="input-field resize-none mb-2"
        placeholder="Décrivez votre expérience avec GoScaleStudio…"
      />
      <div className="flex justify-end mb-4">
        <span className="text-xs text-white/30">{text.length} / 2000</span>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 flex items-start gap-2">
          <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 w-full disabled:opacity-50"
      >
        {loading ? "Envoi en cours..." : (
          <>
            Envoyer mon avis <Send size={16} />
          </>
        )}
      </button>

      <p className="text-[11px] text-white/30 text-center mt-4">
        Votre avis sera vérifié avant publication. Pas de spam, on n&apos;est pas là pour ça.
      </p>
    </form>
  );
}

export default function ReviewPage() {
  return (
    <div className="bg-dark text-white min-h-screen flex items-center justify-center p-4 sm:p-6 py-12">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8 sm:mb-10">
          <Link href="/" className="font-display text-2xl font-bold inline-block mb-6">
            <span className="gradient-text">GoScale</span>Studio
          </Link>
          <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3">
            Laissez-nous votre <span className="gradient-text">avis</span>
          </h1>
          <p className="text-white/50 text-sm sm:text-base max-w-md mx-auto">
            Votre retour aide les futurs clients à se faire une idée — et nous à continuer
            de progresser. Merci de prendre 30 secondes.
          </p>
        </div>

        <Suspense fallback={null}>
          <ReviewForm />
        </Suspense>
      </div>
    </div>
  );
}
