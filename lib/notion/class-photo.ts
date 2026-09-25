import "server-only";
import https from "node:https";
import { unstable_cache } from "next/cache";
import sharp from "sharp";
import { getRunningClasses } from "@/lib/notion/classes";
import { notionFileId } from "@/lib/notion/file-id";

/** Longest side of the table thumbnail. 160px covers a 48px slot at 3x. */
const THUMB_MAX_PX = 160;
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

async function renderClassPhoto(id: string) {
  const url = sourceUrls.get(id);
  if (!url || notionFileId(url) !== id) throw new Error("Class photo URL was not resolved");

  const source = await downloadNotionFile(url);
  const webp = await sharp(source, { limitInputPixels: 25_000_000, animated: false })
    .rotate()
    .resize(THUMB_MAX_PX, THUMB_MAX_PX, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 70 })
    .toBuffer();
  if (webp.byteLength === 0) throw new Error("Resized class photo was empty");
  return webp.toString("base64");
}

const getCachedClassPhoto = unstable_cache(renderClassPhoto, ["class-photo-thumb-160-v1"], {
  revalidate: REVALIDATE_SECONDS,
});

/** WebP thumbnail for a running-class photo, cached by Notion file id. */
export async function classPhotoThumb(id: string) {
  const url = await findMediaUrl(id);
  if (!url) throw new ClassPhotoNotFound();
  sourceUrls.set(id, url);

  const pending = inflight.get(id);
  if (pending) return pending;
  const created = getCachedClassPhoto(id).finally(() => {
    if (inflight.get(id) === created) inflight.delete(id);
  });
  inflight.set(id, created);
  return created;
}
