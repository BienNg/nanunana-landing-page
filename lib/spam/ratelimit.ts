import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { serverEnv } from "@/lib/env";

let limiter: Ratelimit | null | undefined;

function getLimiter() {
  if (limiter !== undefined) return limiter;
  const cfg = serverEnv.upstash();
  limiter = cfg
    ? new Ratelimit({
        redis: new Redis({ url: cfg.url, token: cfg.token }),
        // 5 submissions per IP per 10 minutes
        limiter: Ratelimit.slidingWindow(5, "10 m"),
        prefix: "nanunana:lead",
        analytics: false,
      })
    : null;
  return limiter;
}

/** true = allowed. Skipped (always allowed) when Upstash isn't configured or errors. */
export async function checkRateLimit(ip: string): Promise<boolean> {
  const rl = getLimiter();
  if (!rl) return true;
  try {
    const { success } = await rl.limit(ip);
    return success;
  } catch (e) {
    console.error("[ratelimit] failed, allowing request:", e);
    return true;
  }
}
