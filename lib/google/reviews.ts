import "server-only";
import { serverEnv } from "@/lib/env";

/** One day. Place Details with `reviews` is billed per call, including the free monthly cap. */
const REVALIDATE_SECONDS = 60 * 60 * 24;
/** Avoid calling Google on every page view while the key is still rejected. */
const FAILURE_BACKOFF_MS = 60_000;

let failureUntil = 0;
let loggedFailure = "";
let inflight: Promise<GoogleReviews | null> | null = null;

const SCHOOL_PHONE_DIGITS = "84862934989";
const SEARCH_QUERY = "NaNu NaNa du học Đức Stuttgart";

export type GoogleReview = {
  id: string;
  authorName: string;
  authorUri: string | null;
  authorPhotoUri: string | null;
  rating: number;
  text: string;
  relativeTime: string | null;
  publishedAt: string | null;
  reviewUri: string | null;
};

export type GoogleReviews = {
  placeName: string | null;
  rating: number | null;
  ratingCount: number | null;
  mapsUri: string | null;
  reviews: GoogleReview[];
};

/**
 * Public 5-star Google reviews for the NaNu NaNa listing.
 * Places API (New) returns at most five reviews, sorted by relevance, with no
 * way to request more or to ask only for 5-star ones. Lower ratings are dropped
 * here. Hidden when the key is unset, the API rejects the key, or nothing
 * rated 5 remains. Responses are cached for a day.
 */
export async function getGoogleReviews(): Promise<GoogleReviews | null> {
  if (Date.now() < failureUntil) return null;
  const cfg = serverEnv.places();
  if (!cfg) return null;
  if (inflight) return inflight;

  inflight = fetchReviews(cfg).finally(() => {
    inflight = null;
  });
  return inflight;
}

async function fetchReviews(cfg: {
  apiKey: string;
  placeId?: string;
}): Promise<GoogleReviews | null> {
  try {
    const placeId = cfg.placeId ?? (await findPlaceId(cfg.apiKey));
    if (!placeId) return null;
    const reviews = await loadReviews(cfg.apiKey, placeId);
    failureUntil = 0;
    loggedFailure = "";
    return reviews;
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown error";
    failureUntil = Date.now() + FAILURE_BACKOFF_MS;
    if (detail !== loggedFailure) {
      loggedFailure = detail;
      console.error("[google:reviews]", detail);
    }
    return null;
  }
}

async function findPlaceId(apiKey: string): Promise<string | null> {
  const data = await placesFetch(apiKey, "https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.formattedAddress,places.internationalPhoneNumber",
    },
    body: JSON.stringify({
      textQuery: SEARCH_QUERY,
      languageCode: "vi",
      pageSize: 5,
      locationBias: {
        circle: {
          center: { latitude: 48.772, longitude: 9.168 },
          radius: 15000,
        },
      },
    }),
  });

  const places = Array.isArray(data.places) ? data.places.map(toCandidate).filter(isCandidate) : [];
  const chosen = pickPlace(places);
  if (!chosen) {
    console.error(
      "[google:reviews] no matching listing",
      places.map((p) => p.name).join(" | ") || "(empty)",
    );
    return null;
  }
  console.info("[google:reviews] listing", chosen.name);
  return chosen.id;
}

async function loadReviews(apiKey: string, placeId: string): Promise<GoogleReviews | null> {
  const id = placeId.replace(/^places\//, "");
  const data = await placesFetch(
    apiKey,
    `https://places.googleapis.com/v1/places/${encodeURIComponent(id)}?languageCode=vi`,
    {
      headers: {
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,googleMapsUri,reviews",
      },
    },
  );

  const reviews = (Array.isArray(data.reviews) ? data.reviews.flatMap(toReview) : []).filter(
    (review) => review.rating === 5,
  );
  if (reviews.length === 0) return null;

  return {
    placeName: localizedText(data.displayName) || null,
    rating: typeof data.rating === "number" ? data.rating : null,
    ratingCount: typeof data.userRatingCount === "number" ? data.userRatingCount : null,
    mapsUri: typeof data.googleMapsUri === "string" ? data.googleMapsUri : null,
    reviews,
  };
}

async function placesFetch(
  apiKey: string,
  url: string,
  init: { method?: string; headers: Record<string, string>; body?: string },
): Promise<Record<string, unknown>> {
  const res = await fetch(url, {
    method: init.method ?? "GET",
    headers: { "X-Goog-Api-Key": apiKey, ...init.headers },
    body: init.body,
    next: { revalidate: REVALIDATE_SECONDS },
  });

  const json = (await res.json().catch(() => null)) as Record<string, unknown> | null;
  if (!res.ok) {
    const error = asRecord(json?.error);
    const status = typeof error?.status === "string" ? error.status : "";
    const message = typeof error?.message === "string" ? error.message : res.statusText;
    if (status === "PERMISSION_DENIED" && message.includes("are blocked")) {
      throw new Error(
        "Places API (New) is blocked for this key. In Google Cloud Console, enable Places API (New) and add it under the key's API restrictions. A browser-referrer restriction also blocks these server calls.",
      );
    }
    throw new Error(`${res.status} ${status} ${message}`.trim());
  }
  return json ?? {};
}

type Candidate = { id: string; name: string; address: string; phone: string };

function toCandidate(value: unknown): Candidate | null {
  const place = asRecord(value);
  const id = place?.id;
  if (typeof id !== "string" || !id) return null;
  return {
    id,
    name: localizedText(place.displayName),
    address: typeof place.formattedAddress === "string" ? place.formattedAddress : "",
    phone: typeof place.internationalPhoneNumber === "string" ? place.internationalPhoneNumber : "",
  };
}

function isCandidate(place: Candidate | null): place is Candidate {
  return place !== null;
}

function pickPlace(places: Candidate[]): Candidate | null {
  const phoneMatch = places.find((place) => {
    const phone = place.phone.replace(/\D/g, "");
    return phone.endsWith(SCHOOL_PHONE_DIGITS) || phone.endsWith("862934989");
  });
  if (phoneMatch) return phoneMatch;

  const ranked = places
    .map((place) => ({ place, score: scorePlace(place) }))
    .sort((a, b) => b.score - a.score);
  const best = ranked[0];
  return best && best.score >= 3 ? best.place : null;
}

function scorePlace(place: Candidate) {
  const hay = `${place.name} ${place.address}`.toLocaleLowerCase("vi");
  let score = 0;
  if (hay.includes("nanu")) score += 2;
  if (/học|đức|tiếng đức|deutsch/.test(hay)) score += 3;
  if (hay.includes("senefelder")) score += 4;
  if (hay.includes("stuttgart")) score += 1;
  if (hay.includes("milaneo") || hay.includes("mailänder") || hay.includes("mailander")) score -= 6;
  return score;
}

function toReview(value: unknown): GoogleReview[] {
  const review = asRecord(value);
  if (!review) return [];
  const author = asRecord(review.authorAttribution);
  const authorName = typeof author?.displayName === "string" ? author.displayName.trim() : "";
  const text = localizedText(review.originalText) || localizedText(review.text);
  const rating = review.rating;
  if (!authorName || !text || typeof rating !== "number") return [];

  const id = typeof review.name === "string" ? review.name : `${authorName}:${text.slice(0, 24)}`;
  return [
    {
      id,
      authorName,
      authorUri: typeof author?.uri === "string" ? author.uri : null,
      authorPhotoUri: typeof author?.photoUri === "string" ? author.photoUri : null,
      rating,
      text,
      relativeTime:
        typeof review.relativePublishTimeDescription === "string"
          ? review.relativePublishTimeDescription
          : null,
      publishedAt: typeof review.publishTime === "string" ? review.publishTime : null,
      reviewUri: typeof review.googleMapsUri === "string" ? review.googleMapsUri : null,
    },
  ];
}

function localizedText(value: unknown) {
  const record = asRecord(value);
  return typeof record?.text === "string" ? record.text.trim() : "";
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}
