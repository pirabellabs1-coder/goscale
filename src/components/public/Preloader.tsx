"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "gs-preloader-shown";
const MIN_DURATION_MS = 1100;
const MAX_DURATION_MS = 2400;

export default function Preloader() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/gs-panel-") ?? false;

  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Bail conditions — defer state mutations to a microtask so we
    // don't update synchronously inside the effect body.
    const shouldSkip =
      isAdmin ||
      (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY));

    if (shouldSkip) {
      const raf = requestAnimationFrame(() => setVisible(false));
      return () => cancelAnimationFrame(raf);
    }

    const start = Date.now();
    let hideTimer: ReturnType<typeof setTimeout>;
    let removeTimer: ReturnType<typeof setTimeout>;

    const hide = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_DURATION_MS - elapsed);
      hideTimer = setTimeout(() => {
        setFading(true);
        removeTimer = setTimeout(() => {
          setVisible(false);
          if (typeof window !== "undefined") {
            sessionStorage.setItem(STORAGE_KEY, "1");
          }
        }, 500);
      }, wait);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
    }

    const fallback = setTimeout(hide, MAX_DURATION_MS);

    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(fallback);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [isAdmin]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`preloader ${fading ? "preloader-fade" : ""}`}
    >
      <div className="preloader-inner">
        <div className="preloader-logo-wrap">
          <div className="preloader-rings">
            <span className="ring ring-1" />
            <span className="ring ring-2" />
            <span className="ring ring-3" />
          </div>
          <div className="preloader-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="GoScaleStudio" className="preloader-logo-img" />
          </div>
        </div>

        <div className="preloader-brand">
          <span className="gradient-text">GoScale</span>
          <span>Studio</span>
        </div>

        <div className="preloader-tagline">Chargement en cours...</div>

        <div className="preloader-bar">
          <div className="preloader-bar-fill" />
        </div>
      </div>
    </div>
  );
}
