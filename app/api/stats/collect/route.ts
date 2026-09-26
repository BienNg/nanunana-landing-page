import { isStatsBot, recordStats } from "@/lib/stats/collect";

export async function POST(request: Request) {
  if (isStatsBot(request.headers)) return new Response(null, { status: 204 });

  const length = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(length) && length > 20_000) {
    return new Response(null, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  await recordStats(body, request.headers);
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
