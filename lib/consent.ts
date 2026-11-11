export type Consent = { analytics: boolean; marketing: boolean };
export const CONSENT_KEY = "nanunana:consent:v1";
export const CONSENT_EVENT = "nanunana:consent-change";
export const PREFERENCES_EVENT = "nanunana:privacy-settings";
export const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;

/**
 * Runs in <head> before first paint. The banner is part of the server HTML so it
 * paints early; this hides it right away for visitors with a valid stored choice.
 * Mirrors parseConsent: version 1, boolean flags, savedAt within CONSENT_MAX_AGE.
 */
export const consentPaintScript = `try{var c=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_KEY)})),n=Date.now();if(c&&c.version===1&&typeof c.analytics==="boolean"&&typeof c.marketing==="boolean"&&typeof c.savedAt==="number"&&c.savedAt<=n&&n-c.savedAt<${CONSENT_MAX_AGE})document.documentElement.dataset.consent="1"}catch(e){}`;
let memory: string | null = null;
let memoryOnly = false;

export function parseConsent(raw: string | null, now = Date.now()): Consent | null {
  try {
    const value = JSON.parse(raw ?? "null");
    if (
      value?.version !== 1 ||
      typeof value.analytics !== "boolean" ||
      typeof value.marketing !== "boolean" ||
      typeof value.savedAt !== "number" ||
      !Number.isFinite(value.savedAt) ||
      value.savedAt > now ||
      now - value.savedAt >= CONSENT_MAX_AGE
    )
      return null;
    return { analytics: value.analytics, marketing: value.marketing };
  } catch {
    return null;
  }
}

export function consentSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  let raw = memory;
  if (!memoryOnly) {
    try {
      raw = window.localStorage.getItem(CONSENT_KEY);
    } catch {
      /* use session memory */
    }
  }
  return parseConsent(raw) ? raw : null;
}

export function hasConsent(category: keyof Consent): boolean {
  return parseConsent(consentSnapshot())?.[category] === true;
}

/** Only the preference itself is stored before the visitor opts in. */
export function saveConsent(consent: Consent) {
  memory = JSON.stringify({ version: 1, ...consent, savedAt: Date.now() });
  try {
    window.localStorage.setItem(CONSENT_KEY, memory);
    memoryOnly = false;
  } catch {
    memoryOnly = true;
  }
  clearDeclinedStorage(consent);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function subscribeConsent(listener: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key === CONSENT_KEY || event.key === null) listener();
  };
  window.addEventListener(CONSENT_EVENT, listener);
  window.addEventListener("storage", storage);
  window.addEventListener("focus", listener);
  return () => {
    window.removeEventListener(CONSENT_EVENT, listener);
    window.removeEventListener("storage", storage);
    window.removeEventListener("focus", listener);
  };
}

export function clearDeclinedStorage(consent: Consent) {
  if (!consent.analytics) {
    try {
      window.localStorage.removeItem("nn_vid");
    } catch {}
    try {
      window.sessionStorage.removeItem("nn_sid");
    } catch {}
  }
  if (!consent.marketing) {
    try {
      window.sessionStorage.removeItem("nanunana:attribution");
    } catch {}
  }
  // Expire vendor cookies on the host and parent domains, including cookies
  // from visits before consent controls were introduced. Never touch other cookies.
  const names = document.cookie.split(";").map((part) => part.trim().split("=")[0]);
  const host = window.location.hostname.split(".");
  const domains = ["", ...host.map((_, i) => host.slice(i).join("."))];
  const segments = window.location.pathname.split("/").filter(Boolean);
  const paths = ["/", ...segments.map((_, i) => `/${segments.slice(0, i + 1).join("/")}`)];
  for (const name of names) {
    if (
      (!consent.analytics && /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) ||
      (!consent.marketing && /^_fb[cp]$/.test(name))
    ) {
      for (const domain of domains)
        for (const path of paths) {
          document.cookie = `${name}=; Max-Age=0; path=${path}${domain ? `; domain=${domain}` : ""}`;
        }
    }
  }
}
