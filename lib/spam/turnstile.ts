import "server-only";
import { serverEnv } from "@/lib/env";

export const TURNSTILE_FIELD = "cf-turnstile-response";

/** true = human (or Turnstile not configured). */
export async function verifyTurnstile(token: string | null, ip?: string): Promise<boolean> {
  const cfg = serverEnv.turnstile();
  if (!cfg) return true;
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret: cfg.secretKey, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (e) {
    console.error("[turnstile] verification error:", e);
    return false;
  }
}
