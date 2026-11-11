import { clearDeclinedStorage, hasConsent } from "./consent";

type Pixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  push?: Pixel;
  loaded?: boolean;
  version?: string;
};
type TrackingWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: Pixel;
  _fbq?: Pixel;
};
let gaReady = false;
let metaReady = false;
let gaPage = "";
let metaPage = "";
let gaConfigured = false;
let metaConfigured = false;

function loadScript(id: string, src: string, ready: () => void) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  script.onload = ready;
  script.onerror = () => script.remove();
  document.head.appendChild(script);
}

/** Basic consent: no vendor download until that category is explicitly allowed. */
export function syncTracking(ga: string | undefined, pixel: string | undefined) {
  const w = window as TrackingWindow;
  const analytics = hasConsent("analytics");
  const marketing = hasConsent("marketing");
  if (ga) {
    (window as unknown as Record<string, unknown>)[`ga-disable-${ga}`] = !analytics;
    if (!analytics) {
      gaPage = "";
      if (gaConfigured) w.gtag?.("consent", "update", { analytics_storage: "denied" });
    }
    if (analytics) {
      w.dataLayer ??= [];
      // gtag expects Arguments objects in dataLayer, not rest-parameter arrays.
      w.gtag ??= function () {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      };
      if (gaReady && !gaConfigured) {
        gaConfigured = true;
        w.gtag("consent", "default", {
          analytics_storage: "granted",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
        w.gtag("js", new Date());
        w.gtag("config", ga, {
          send_page_view: false,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
          page_location: `${location.origin}${location.pathname}`,
          page_referrer: safeReferrer(),
        });
      }
      loadScript(
        "nn-ga4",
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`,
        () => {
          gaReady = true;
          syncTracking(ga, pixel);
        },
      );
      if (gaReady && gaPage !== location.pathname) {
        w.gtag("consent", "update", { analytics_storage: "granted" });
        gaPage = location.pathname;
        w.gtag("event", "page_view", {
          page_location: `${location.origin}${location.pathname}`,
          page_title: document.title,
          page_referrer: safeReferrer(),
        });
      }
    }
  }
  if (pixel) {
    if (!marketing) {
      w.fbq?.("consent", "revoke");
      metaPage = "";
    } else {
      if (!w.fbq) {
        const stub: Pixel = (...args) => {
          if (stub.callMethod) stub.callMethod(...args);
          else stub.queue!.push(args);
        };
        stub.queue = [];
        stub.push = stub;
        stub.loaded = true;
        stub.version = "2.0";
        w.fbq = stub;
        w._fbq = stub;
      }
      loadScript("nn-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js", () => {
        metaReady = true;
        syncTracking(ga, pixel);
      });
      // Do not queue init or PageView while downloading: consent can change.
      if (metaReady) {
        w.fbq("consent", "grant");
        if (!metaConfigured) {
          metaConfigured = true;
          w.fbq("set", "autoConfig", false, pixel);
          w.fbq("init", pixel);
        }
        if (metaPage !== location.pathname) {
          metaPage = location.pathname;
          w.fbq("track", "PageView");
        }
      }
    }
  }
  clearDeclinedStorage({ analytics, marketing });
}

function safeReferrer() {
  try {
    return new URL(document.referrer).origin;
  } catch {
    return "";
  }
}

export function canTrackGa() {
  return gaReady && hasConsent("analytics");
}
export function canTrackMeta() {
  return metaReady && hasConsent("marketing");
}
