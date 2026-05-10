"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export type Lang = "fr" | "en";
export type Tr<T> = { fr: T; en: T };

export function useLang(): Lang {
  const sp = useSearchParams();
  return sp?.get("lang") === "en" ? "en" : "fr";
}

/**
 * Translation hook. Usage:
 *   const t = useT();
 *   <h1>{t({ fr: "Bonjour", en: "Hello" })}</h1>
 */
export function useT() {
  const lang = useLang();
  return function t<T>(obj: Tr<T>): T {
    return obj[lang];
  };
}

/**
 * Sync the <html lang="..."> attribute with the active language so
 * accessibility tools and search bots see the correct page language.
 */
export function useSyncHtmlLang() {
  const lang = useLang();
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "en" ? "en" : "fr";
    }
  }, [lang]);
}

export const FR_URL = "https://goscalestudio.com/";
export const EN_URL = "https://goscalestudio.com/?lang=en";
