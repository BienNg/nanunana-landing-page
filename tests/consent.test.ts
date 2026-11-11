import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CONSENT_KEY,
  CONSENT_MAX_AGE,
  parseConsent,
  saveConsent,
  hasConsent,
} from "../lib/consent";
import { syncTracking, canTrackGa, canTrackMeta } from "../lib/tracking-consent";
import { readAttribution, captureAttribution } from "../lib/attribution";

const now = Date.now();
test("only valid, explicit, unexpired choices grant consent", () => {
  const raw = (extra = {}) =>
    JSON.stringify({ version: 1, analytics: true, marketing: false, savedAt: now, ...extra });
  assert.deepEqual(parseConsent(raw(), now), { analytics: true, marketing: false });
  for (const value of [
    null,
    "",
    "{}",
    "not json",
    raw({ version: 2 }),
    raw({ analytics: "true" }),
    raw({ savedAt: now + 1 }),
    raw({ savedAt: now - CONSENT_MAX_AGE }),
  ])
    assert.equal(parseConsent(value, now), null);
});

test("tracking lifecycle: denied, selective, download race, revoke, reaccept and navigation", () => {
  const local = new Map<string, string>();
  const session = new Map<string, string>();
  const storage = (map: Map<string, string>) => ({
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => map.set(key, value),
    removeItem: (key: string) => map.delete(key),
  });
  type Script = { id: string; src: string; onload: () => void; remove: () => void };
  const scripts = new Map<string, Script>();
  const cookieWrites: string[] = [];
  const location = {
    origin: "https://example.test",
    pathname: "/niveau",
    hostname: "www.example.test",
    search: "?fbclid=example",
    href: "https://example.test/niveau?fbclid=example",
  };
  const w = Object.assign(new EventTarget(), {
    localStorage: storage(local),
    sessionStorage: storage(session),
    location,
  }) as unknown as EventTarget & {
    dataLayer?: unknown[][];
    fbq?: { queue: unknown[][] };
    [key: string]: unknown;
  };
  const doc = {
    title: "Courses",
    referrer: "https://search.example/path?private=value",
    getElementById: (id: string) => scripts.get(id),
    createElement: () => {
      const s = { id: "", src: "", onload: () => {}, remove: () => scripts.delete(s.id) };
      return s;
    },
    head: { appendChild: (s: Script) => scripts.set(s.id, s) },
    get cookie() {
      return "_ga=old; _ga_ABC=old; _fbp=old; session=keep";
    },
    set cookie(value: string) {
      cookieWrites.push(value);
    },
  };
  const values = { window: w, document: doc, location, sessionStorage: storage(session) };
  const originals = new Map(
    Object.keys(values).map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]),
  );
  for (const [key, value] of Object.entries(values))
    Object.defineProperty(globalThis, key, { value, configurable: true });
  try {
    syncTracking("G-TEST", "123");
    assert.equal(scripts.size, 0);
    captureAttribution();
    assert.equal(session.size, 0);
    assert.deepEqual(readAttribution(), {});
    saveConsent({ analytics: false, marketing: false });
    syncTracking("G-TEST", "123");
    assert.equal(scripts.size, 0);
    saveConsent({ analytics: true, marketing: false });
    syncTracking("G-TEST", "123");
    assert.equal(scripts.size, 1);
    assert.ok(scripts.has("nn-ga4"));
    assert.equal(canTrackGa(), false);
    // Revoke before the vendor finishes downloading: no configuration or event.
    saveConsent({ analytics: false, marketing: false });
    syncTracking("G-TEST", "123");
    scripts.get("nn-ga4")!.onload();
    assert.equal(w.dataLayer?.length, 0);
    assert.equal(w["ga-disable-G-TEST"], true);
    assert.equal(canTrackGa(), false);
    saveConsent({ analytics: true, marketing: false });
    syncTracking("G-TEST", "123");
    const gaEvents = () =>
      w.dataLayer!.map((entry) => Array.from(entry)).filter((entry) => entry[0] === "event");
    assert.equal(gaEvents().length, 1);
    syncTracking("G-TEST", "123");
    assert.equal(gaEvents().length, 1, "same page is not double counted");
    location.pathname = "/du-hoc-duc";
    syncTracking("G-TEST", "123");
    assert.equal(gaEvents().length, 2);
    assert.equal(canTrackGa(), true);
    saveConsent({ analytics: false, marketing: true });
    syncTracking("G-TEST", "123");
    assert.ok(scripts.has("nn-meta-pixel"));
    assert.equal(canTrackMeta(), false);
    assert.equal(canTrackGa(), false);
    assert.equal(w.fbq!.queue.length, 0);
    saveConsent({ analytics: false, marketing: false });
    syncTracking("G-TEST", "123");
    scripts.get("nn-meta-pixel")!.onload();
    assert.equal(
      w.fbq!.queue.some((entry) => entry[0] === "init" || entry[0] === "track"),
      false,
    );
    saveConsent({ analytics: false, marketing: true });
    syncTracking("G-TEST", "123");
    assert.equal(canTrackMeta(), true);
    assert.equal(w.fbq!.queue.filter((entry) => entry[0] === "track").length, 1);
    captureAttribution();
    assert.equal(readAttribution().fbclid, "example");
    local.set("nn_vid", "visitor");
    session.set("nn_sid", "visit");
    saveConsent({ analytics: false, marketing: false });
    syncTracking("G-TEST", "123");
    assert.equal(local.has("nn_vid"), false);
    assert.equal(session.has("nn_sid"), false);
    assert.equal(session.has("nanunana:attribution"), false);
    assert.equal(
      cookieWrites.some((value) => value.startsWith("session=")),
      false,
    );
    assert.ok(cookieWrites.some((value) => value.startsWith("_ga=")));
    assert.deepEqual(w.fbq!.queue.at(-1), ["consent", "revoke"]);
    local.set(
      CONSENT_KEY,
      JSON.stringify({
        version: 1,
        analytics: true,
        marketing: true,
        savedAt: Date.now() - CONSENT_MAX_AGE,
      }),
    );
    assert.equal(hasConsent("analytics"), false);
    // Storage may allow reads but reject writes (e.g. quota exceeded).
    w.localStorage = {
      ...storage(local),
      setItem: () => {
        throw new Error("quota");
      },
    };
    saveConsent({ analytics: true, marketing: false });
    assert.equal(hasConsent("analytics"), true);
    saveConsent({ analytics: false, marketing: false });
    assert.equal(hasConsent("analytics"), false);
  } finally {
    for (const [key, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    }
  }
});
