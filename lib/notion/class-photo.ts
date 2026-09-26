import "server-only";
import https from "node:https";
import { unstable_cache } from "next/cache";
import sharp from "sharp";
import { getRunningClasses } from "@/lib/notion/classes";
import { notionFileId } from "@/lib/notion/file-id";

/**
 * Table and mobile-row thumbnails. 640px covers a full-height mobile row at 3x.
 * The lightbox uses a larger copy that is still WebP, so opening a photo does not
 * download the original Notion file.
 */
const VARIANTS = {
  thumb: { maxPx: 640, quality: 70 },
  view: { maxPx: 1600, quality: 70 },
} as const;

export type ClassPhotoVariant = keyof typeof VARIANTS;

const MAX_SOURCE_BYTES = 12 * 1024 * 1024;
const DOWNLOAD_TIMEOUT_MS = 25_000;
const REVALIDATE_SECONDS = 60 * 60 * 24;

export class ClassPhotoNotFound extends Error {
  constructor() {
    super("Class photo not found");
    this.name = "ClassPhotoNotFound";
  }
}

async function findMediaUrl(id: string) {
  const classes = await getRunningClasses();
  for (const row of classes) {
    for (const file of row.media) {
      if (notionFileId(file.url) === id) return file.url;
    }
  }
  return null;
}

/**
 * Signed URL for the resize that is about to run. Kept off the cache key:
 * Notion rotates the query string every few minutes, and the file id does not.
 */
const sourceUrls = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();

function downloadNotionFile(url: string) {
  if (new URL(url).protocol !== "https:" || notionFileId(url) === null) {
    return Promise.reject(new Error("Refusing to fetch a non-Notion file URL"));
  }

  return new Promise<Buffer>((resolve, reject) => {
    let settled = false;
    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      reject(error);
    };
    const succeed = (body: Buffer) => {
      if (settled) return;
      settled = true;
      resolve(body);
    };

    // IPv4: Node otherwise prefers a much slower IPv6 path to this S3 bucket.
    const req = https.get(url, { family: 4, timeout: DOWNLOAD_TIMEOUT_MS }, (res) => {
      const status = res.statusCode ?? 0;
      if (status !== 200) {
        res.resume();
        fail(new Error(`Notion file responded ${status}`));
        return;
      }
      const type = String(res.headers["content-type"] ?? "");
      if (type && !/^image\/|^application\/octet-stream/.test(type)) {
        res.resume();
        fail(new Error("Notion file was not an image"));
        return;
      }
      const declared = Number(res.headers["content-length"] ?? "0");
      if (declared > MAX_SOURCE_BYTES) {
        res.resume();
        fail(new Error("Class photo is too large to resize"));
        return;
      }

      const chunks: Buffer[] = [];
      let received = 0;
      res.on("data", (chunk: Buffer) => {
        received += chunk.length;
        if (received > MAX_SOURCE_BYTES) {
          req.destroy();
          fail(new Error("Class photo is too large to resize"));
          return;
        }
        chunks.push(chunk);
      });
      res.on("end", () => {
        if (received === 0) {
          fail(new Error("Class photo response was empty"));
          return;
        }
        succeed(Buffer.concat(chunks));
      });
      res.on("error", (error) => fail(error));
    });
    req.on("timeout", () => req.destroy(new Error("Class photo download timed out")));
    req.on("error", (error) => fail(error));
  });
}

async function renderClassPhoto(id: string, variant: ClassPhotoVariant) {
  const url = sourceUrls.get(id);
  if (!url || notionFileId(url) !== id) throw new Error("Class photo URL was not resolved");

  const { maxPx, quality } = VARIANTS[variant];
  const source = await downloadNotionFile(url);
  const webp = await sharp(source, { limitInputPixels: 25_000_000, animated: false })
    .rotate()
    .resize(maxPx, maxPx, { fit: "inside", withoutEnlargement: true })
    .webp({ quality })
    .toBuffer();
  if (webp.byteLength === 0) throw new Error("Resized class photo was empty");
  return webp.toString("base64");
}

const getCachedThumb = unstable_cache(
  (id: string) => renderClassPhoto(id, "thumb"),
  ["class-photo-thumb-640-v1"],
  { revalidate: REVALIDATE_SECONDS },
);

const getCachedView = unstable_cache(
  (id: string) => renderClassPhoto(id, "view"),
  ["class-photo-view-1600-v1"],
  { revalidate: REVALIDATE_SECONDS },
);

/** WebP class photo, cached by Notion file id. `view` is the lightbox size. */
export async function classPhotoImage(id: string, variant: ClassPhotoVariant = "thumb") {
  const url = await findMediaUrl(id);
  if (!url) throw new ClassPhotoNotFound();
  sourceUrls.set(id, url);

  const key = `${variant}:${id}`;
  const pending = inflight.get(key);
  if (pending) return pending;
  const load = variant === "view" ? getCachedView(id) : getCachedThumb(id);
  const created = load.finally(() => {
    if (inflight.get(key) === created) inflight.delete(key);
  });
  inflight.set(key, created);
  return created;
}
