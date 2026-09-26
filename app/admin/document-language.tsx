"use client";

import { useEffect } from "react";

/** The site root is Vietnamese. This page is English, so the document language follows it. */
export function DocumentLanguage({ lang }: { lang: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.lang;
    root.lang = lang;
    return () => {
      root.lang = previous;
    };
  }, [lang]);

  return null;
}
