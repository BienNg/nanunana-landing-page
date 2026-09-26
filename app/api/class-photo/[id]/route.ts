import {
  ClassPhotoNotFound,
  classPhotoImage,
  type ClassPhotoVariant,
} from "@/lib/notion/class-photo";

export const maxDuration = 30;

const FILE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function safeError(error: unknown) {
  const message = error instanceof Error ? error.message : "unknown error";
  return message.replace(/https?:\/\/\S+/g, "[url]");
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!FILE_ID.test(id)) return new Response(null, { status: 400 });

  const variant: ClassPhotoVariant =
    new URL(request.url).searchParams.get("size") === "view" ? "view" : "thumb";

  try {
    const base64 = await classPhotoImage(id.toLowerCase(), variant);
    const bytes = Buffer.from(base64, "base64");
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "image/webp",
        "Content-Length": String(bytes.byteLength),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (error instanceof ClassPhotoNotFound) {
      return new Response(null, { status: 404, headers: { "Cache-Control": "no-store" } });
    }
    console.error("[class-photo]", id, safeError(error));
    return new Response(null, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
