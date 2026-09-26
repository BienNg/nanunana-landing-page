"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { classPhotoThumbSrc, classPhotoViewSrc, notionFileId } from "@/lib/notion/file-id";

type Photo = { url: string; name: string };

function ViewerPhoto({ url, label }: { url: string; label: string }) {
  const viewSrc = classPhotoViewSrc(url);
  const thumbSrc = classPhotoThumbSrc(url);
  const [src, setSrc] = useState(thumbSrc);

  useEffect(() => {
    if (viewSrc === thumbSrc) return;
    const img = new Image();
    img.referrerPolicy = "no-referrer";
    img.onload = () => setSrc(viewSrc);
    img.src = viewSrc;
    return () => {
      img.onload = null;
    };
  }, [thumbSrc, viewSrc]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        referrerPolicy="no-referrer"
        decoding="async"
        className="max-h-[85dvh] max-w-[92vw] rounded-card object-contain shadow-tier-3"
      />
    </>
  );
}

function PhotoButton({
  file,
  label,
  fill,
  onOpen,
}: {
  file: Photo;
  label: string;
  fill?: boolean;
  onOpen: (file: Photo, trigger: HTMLButtonElement) => void;
}) {
  const [src, setSrc] = useState(() => classPhotoThumbSrc(file.url));

  return (
    <button
      type="button"
      onClick={(event) => onOpen(file, event.currentTarget)}
      aria-label={`Xem ${label}`}
      className={
        fill
          ? "relative block min-h-0 flex-1 cursor-zoom-in overflow-hidden"
          : "block cursor-zoom-in overflow-hidden rounded-md border border-border-subtle"
      }
    >
      {/* Thumbnails are the small /api/class-photo WebP. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={fill ? 640 : 48}
        height={fill ? 640 : 48}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className={
          fill
            ? "absolute inset-0 size-full bg-surface-container-low object-cover"
            : "size-12 bg-surface-container-low object-cover"
        }
        onError={() => {
          if (src !== file.url) setSrc(file.url);
        }}
      />
    </button>
  );
}

export function ClassPhotos({
  name,
  media,
  layout = "inline",
}: {
  name: string;
  media: Photo[];
  /** `fill` stretches photos to the full height of a mobile class row. */
  layout?: "inline" | "fill";
}) {
  const [active, setActive] = useState<Photo | null>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!active) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActive(null);
        return;
      }
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      restoreFocus.current?.focus();
    };
  }, [active]);

  if (media.length === 0) return <span className="text-ink-subtle">—</span>;

  const label = `Ảnh lớp ${name}`;

  return (
    <>
      <div className={layout === "fill" ? "absolute inset-0 flex flex-col" : "flex gap-1.5"}>
        {media.map((file) => (
          <PhotoButton
            key={notionFileId(file.url) ?? file.url}
            file={file}
            label={label}
            fill={layout === "fill"}
            onOpen={(photo, trigger) => {
              restoreFocus.current = trigger;
              setActive(photo);
            }}
          />
        ))}
      </div>
      {active
        ? createPortal(
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8">
              <div className="absolute inset-0 bg-ink/75" onClick={() => setActive(null)} />
              <div role="dialog" aria-modal="true" aria-label={label} className="relative z-10">
                <ViewerPhoto key={active.url} url={active.url} label={label} />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Đóng ảnh"
                  className="absolute top-3 right-3 grid size-tap place-items-center rounded-full bg-white text-ink shadow-tier-2"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
