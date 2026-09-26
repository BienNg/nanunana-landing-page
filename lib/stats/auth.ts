import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "nn_stats_admin";
export const ADMIN_MAX_AGE = 60 * 60 * 24 * 14;

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_MAX_AGE,
  };
}

export function passwordsMatch(input: string, expected: string) {
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export function signAdminSession(password: string, now = Date.now()) {
  const exp = String(now + ADMIN_MAX_AGE * 1000);
  const mac = createHmac("sha256", password).update(`v1.${exp}`).digest("base64url");
  return `${exp}.${mac}`;
}

export function adminSessionValid(token: string | undefined, password: string) {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot <= 0) return false;
  const exp = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  if (!/^\d+$/.test(exp) || Number(exp) <= Date.now()) return false;
  const expected = createHmac("sha256", password).update(`v1.${exp}`).digest("base64url");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
