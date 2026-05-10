"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Lightweight horizontal carousel with snap-scroll, prev/next buttons
 * and dot indicators. No external dependency.
 *
 * Usage:
 *   <Carousel images={["url1", "url2"]} alt="Project name" />
 */
export default function Carousel({
  images,
  alt = "",
  className = "",
}: {
  images: string[];
  alt?: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Update active index when the user scrolls/snaps
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const i = Math.round(el.scrollLeft / el.clientWidth);
      setActive(Math.min(images.length - 1, Math.max(0, i)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [images.length]);

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const target = Math.min(images.length - 1, Math.max(0, i));
    el.scrollTo({ left: target * el.clientWidth, behavior: "smooth" });
  };

  if (images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className={`relative ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[0]} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      <div
        ref={trackRef}
        className="flex h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((src, i) => (
          <div key={src + i} className="snap-center flex-shrink-0 w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${alt} - ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Prev/Next */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); scrollTo(active - 1); }}
        disabled={active === 0}
        aria-label="Image précédente"
        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-black/80"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); scrollTo(active + 1); }}
        disabled={active === images.length - 1}
        aria-label="Image suivante"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-black/80"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => { e.stopPropagation(); scrollTo(i); }}
            aria-label={`Aller à l'image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-5 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
