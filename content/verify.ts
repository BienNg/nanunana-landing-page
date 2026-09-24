/**
 * Content verification helper.
 *
 * Any factual/marketing claim that NaNu NaNa has not confirmed yet is wrapped
 * in `verify(value, note)`. Confirmed content uses `ok(value)`.
 *
 * - In development, unverified values render with a dashed amber "VERIFY"
 *   outline so they are easy to spot.
 * - In production builds they are hidden (or replaced by a neutral fallback)
 *   unless NEXT_PUBLIC_SHOW_UNVERIFIED=1 is set (e.g. on a preview deployment).
 *
 * Run `pnpm verify:content` to list every open item.
 */

export type Verified<T> = { status: "ok"; value: T };
export type Unverified<T> = { status: "verify"; value: T; note: string };
export type Claim<T = string> = Verified<T> | Unverified<T>;

export function ok<T>(value: T): Verified<T> {
  return { status: "ok", value };
}

export function verify<T>(value: T, note: string): Unverified<T> {
  return { status: "verify", value, note };
}

export const showUnverified =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_UNVERIFIED === "1";

/** Whether a claim may be rendered in the current environment. */
export function isVisible<T>(claim: Claim<T> | undefined): claim is Claim<T> {
  if (!claim) return false;
  return claim.status === "ok" || showUnverified;
}

/** The claim's value if visible, otherwise the fallback (or undefined). */
export function claimValue<T>(claim: Claim<T> | undefined, fallback?: T): T | undefined {
  return claim && isVisible(claim) ? claim.value : fallback;
}

export function isUnverified<T>(claim: Claim<T> | undefined): claim is Unverified<T> {
  return claim?.status === "verify";
}
