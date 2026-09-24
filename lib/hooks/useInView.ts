"use client";

import { useEffect, useState } from "react";

/**
 * True while any element matching one of the selectors intersects the viewport.
 * `resetKey` re-scans the DOM (e.g. pass the pathname after client navigation).
 */
export function useAnyInView(selectors: readonly string[], rootMargin = "0px", resetKey = "") {
  const [state, setState] = useState({ key: resetKey, inView: false });
  const selector = selectors.join(",");

  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (els.length === 0) return;
    const visible = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target, e.isIntersecting));
        setState({ key: resetKey, inView: [...visible.values()].some(Boolean) });
      },
      { rootMargin },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, rootMargin, resetKey]);

  // Ignore results that belong to a previous route.
  return state.key === resetKey && state.inView;
}
