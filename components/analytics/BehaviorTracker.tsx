"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VID_KEY = "nn_vid";
const SID_KEY = "nn_sid";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SECTION_ID = /^[a-z0-9_-]{1,80}$/i;
const KEEP_QUERY = ["khoa", "muc-tieu"];

type ClickEvent = { label: string; href: string; section: string; page: string };
type WatchEvent = { id: string; label: string; ms: number; view: boolean };

const memoryIds = { vid: "", sid: "" };
const viewed = new Set<string>();
let lastPageview = "";
let pageGeneration = 0;

function browserId(area: "local" | "session", key: string, slot: "vid" | "sid") {
  try {
    const store = area === "local" ? window.localStorage : window.sessionStorage;
    const current = store.getItem(key);
    if (current && UUID.test(current)) return current;
    const next = crypto.randomUUID();
    store.setItem(key, next);
    return next;
  } catch {
    if (!memoryIds[slot]) memoryIds[slot] = crypto.randomUUID();
    return memoryIds[slot];
  }
}

function identity() {
  return {
    vid: browserId("local", VID_KEY, "vid"),
    sid: browserId("session", SID_KEY, "sid"),
  };
}

function post(body: {
  vid: string;
  sid: string;
  path: string;
  pageview?: boolean;
  clicks?: ClickEvent[];
  watch?: WatchEvent[];
}) {
  const json = JSON.stringify(body);
  try {
    if (document.visibilityState === "hidden" && navigator.sendBeacon) {
      const sent = navigator.sendBeacon(
        "/api/stats/collect",
        new Blob([json], { type: "application/json" }),
      );
      if (sent) return;
    }
  } catch {
    /* fall through to fetch */
  }
  void fetch("/api/stats/collect", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: json,
    keepalive: true,
  }).catch(() => {});
}

function compactHref(raw: string) {
  try {
    const url = new URL(raw, location.origin);
    if (url.protocol === "mailto:" || url.protocol === "tel:") {
      return (url.protocol + url.pathname).slice(0, 300);
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    if (url.origin === location.origin) {
      const params = new URLSearchParams();
      for (const key of KEEP_QUERY) {
        const value = url.searchParams.get(key);
        if (value) params.set(key, value.slice(0, 40));
      }
      const query = params.toString();
      return (url.pathname + (query ? `?${query}` : "") + url.hash).slice(0, 300);
    }
    return (url.origin + url.pathname).slice(0, 300);
  } catch {
    return "";
  }
}

function sectionOf(el: Element) {
  const section = el.closest("section[id]");
  if (section instanceof HTMLElement && SECTION_ID.test(section.id)) return section.id;
  if (el.closest("#mobile-nav")) return "menu";
  if (el.closest("#site-footer")) return "footer";
  if (el.closest("header")) return "header";
  if (el.closest("nav[aria-label='Liên hệ nhanh']")) return "mobile-cta";
  return "";
}

function describeClick(target: EventTarget | null): ClickEvent | null {
  if (!(target instanceof Element)) return null;
  const el = target.closest(
    "a[href], button, input[type='submit'], input[type='button'], [role='button']",
  );
  if (!(el instanceof HTMLElement)) return null;
  if (el.closest("[data-stats-ignore]")) return null;
  if (el.matches(":disabled") || el.getAttribute("aria-disabled") === "true") return null;

  const labelled = (el.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim();
  let text = "";
  if (el instanceof HTMLInputElement) text = el.value.replace(/\s+/g, " ").trim();
  else text = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
  const label = (text || labelled).slice(0, 120);
  if (!label) return null;

  const href = el instanceof HTMLAnchorElement ? compactHref(el.href) : "";
  return { label, href, section: sectionOf(el), page: location.pathname || "/" };
}

function headingIn(el: HTMLElement) {
  for (const heading of el.querySelectorAll("h1, h2")) {
    if (heading.closest("section") === el) {
      return (heading.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
    }
  }
  return "";
}

function nameSection(el: HTMLElement): { id: string; label: string } | null {
  if (SECTION_ID.test(el.id)) return { id: el.id, label: headingIn(el) };
  const label = headingIn(el);
  if (!label) return null;
  const slug = label
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  if (!slug) return null;
  return { id: `h:${slug}`, label };
}

/**
 * First-party behaviour capture: one page view per navigation, every button
 * and link click, and how long each section stays on screen.
 */
export function BehaviorTracker() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (lastPageview !== pathname) {
      lastPageview = pathname;
      pageGeneration += 1;
      post({ ...identity(), path: pathname, pageview: true });
    }
    const generation = pageGeneration;

    const main = document.getElementById("noi-dung");
    if (!main) return;

    type Row = {
      id: string;
      label: string;
      watching: boolean;
      last: number;
      ms: number;
      view: boolean;
    };
    const rows = new Map<HTMLElement, Row>();
    let paused = document.hidden;

    const tick = (now: number) => {
      for (const row of rows.values()) {
        if (!paused && row.watching) row.ms += now - row.last;
        row.last = now;
      }
    };

    const flush = () => {
      const now = performance.now();
      tick(now);
      const watch: WatchEvent[] = [];
      for (const row of rows.values()) {
        const ms = Math.min(60_000, Math.round(row.ms));
        const key = `${generation}:${row.id}`;
        const sendView = row.view && !viewed.has(key);
        if (sendView) viewed.add(key);
        if (ms >= 250 || sendView) {
          watch.push({ id: row.id, label: row.label, ms: ms >= 250 ? ms : 0, view: sendView });
        }
        row.ms = 0;
        row.view = false;
      }
      if (watch.length > 0) post({ ...identity(), path: pathname, watch });
    };

    const onScreen = (entry: IntersectionObserverEntry) => {
      const viewport = entry.rootBounds?.height || window.innerHeight;
      return (
        entry.isIntersecting &&
        (entry.intersectionRatio >= 0.5 || entry.intersectionRect.height >= viewport * 0.45)
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const now = performance.now();
        tick(now);
        for (const entry of entries) {
          const el = entry.target;
          if (!(el instanceof HTMLElement)) continue;
          let row = rows.get(el);
          if (!row) {
            const named = nameSection(el);
            if (!named) {
              observer.unobserve(el);
              continue;
            }
            row = { ...named, watching: false, last: now, ms: 0, view: false };
            rows.set(el, row);
          }
          const visible = onScreen(entry);
          if (visible && !viewed.has(`${generation}:${row.id}`)) row.view = true;
          row.watching = visible;
          row.last = now;
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );

    const observe = () => {
      main.querySelectorAll("section").forEach((el) => observer.observe(el));
    };
    observe();
    const mutations = new MutationObserver(observe);
    mutations.observe(main, { childList: true, subtree: true });

    const onHide = () => {
      if (document.hidden) {
        paused = true;
        flush();
        return;
      }
      paused = false;
      const now = performance.now();
      for (const row of rows.values()) row.last = now;
    };

    const onClick = (event: MouseEvent) => {
      if (event.type === "click" && event.button !== 0) return;
      const click = describeClick(event.target);
      if (!click) return;
      post({ ...identity(), path: location.pathname || pathname, clicks: [click] });
    };

    const timer = window.setInterval(flush, 15_000);
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);

    return () => {
      flush();
      observer.disconnect();
      mutations.disconnect();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, [pathname]);

  return null;
}
