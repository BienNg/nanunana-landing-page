/** Second UUID in a Notion `prod-files-secure` path. The signed query string changes; this id does not. */
const FILE_HOST = /^prod-files-secure\.s3(?:\.[a-z0-9-]+)?\.amazonaws\.com$/i;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function notionFileId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (!FILE_HOST.test(parsed.hostname)) return null;

  const parts = parsed.pathname.split("/").filter(Boolean);
  for (let index = 1; index < parts.length; index++) {
    const workspace = parts[index - 1];
    const file = parts[index];
    if (workspace && file && UUID.test(workspace) && UUID.test(file)) {
      return file.toLowerCase();
    }
  }
  return null;
}

/** Resized thumbnail for the class table and mobile row. */
export function classPhotoThumbSrc(url: string) {
  const id = notionFileId(url);
  return id ? `/api/class-photo/${id}` : url;
}

/** Compressed lightbox image. Larger than the thumbnail, still not the Notion original. */
export function classPhotoViewSrc(url: string) {
  const id = notionFileId(url);
  return id ? `/api/class-photo/${id}?size=view` : url;
}
