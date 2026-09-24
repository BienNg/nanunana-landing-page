/**
 * Phone rules for the consultation form — Vietnamese and German numbers only.
 * Small on purpose (runs in the browser too); replaces a full phone library.
 *
 * Vietnam: mobile 0[35789]x xxx xxxx, landline 02xx xxx xxxx (with 0, +84 or 0084)
 * Germany: +49 / 0049 followed by 7–13 digits (mobile e.g. +49 151 2345 6789)
 */

/** Returns the E.164 form (e.g. +84988123456) or null if not accepted. */
export function toE164(input: string): string | null {
  const raw = input.trim();
  if (!/^[\d\s+().\-/]+$/.test(raw)) return null;
  let n = raw.replace(/[^\d+]/g, "");
  if (n.startsWith("00")) n = `+${n.slice(2)}`;
  if (n.indexOf("+") > 0) return null;

  // Vietnam
  let vn: string | null = null;
  if (n.startsWith("+84")) vn = `0${n.slice(3).replace(/^0/, "")}`;
  else if (n.startsWith("0")) vn = n;
  if (vn) {
    const mobile = /^0[35789]\d{8}$/.test(vn);
    const landline = /^02\d{9}$/.test(vn);
    return mobile || landline ? `+84${vn.slice(1)}` : null;
  }

  // Germany (international format required, to tell it apart from Vietnamese 0…)
  if (n.startsWith("+49")) {
    const rest = n.slice(3).replace(/^0/, "");
    return /^[1-9]\d{6,12}$/.test(rest) ? `+49${rest}` : null;
  }
  return null;
}

export const isAcceptedPhone = (input: string) => toE164(input) !== null;
