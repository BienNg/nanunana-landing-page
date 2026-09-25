import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";

function isGooglePhoto(src: string) {
  try {
    const host = new URL(src).hostname;
    return host.endsWith("googleusercontent.com") || host.endsWith("ggpht.com");
  } catch {
    return false;
  }
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  // "Nicole Bärlein" → "NB", "Lệ Phạm" → "LP", single names → first letter ("Mến" → "M").
  const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
  return letters.toLocaleUpperCase("vi");
}

/** Circular avatar with a subtle teal ring; initials when there is no photo. */
export function Avatar({
  name,
  photo,
  size = 96,
  className,
}: {
  name: string;
  photo?: StaticImageData | string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-surface-container-low ring-2 ring-teal/30 ring-offset-2 ring-offset-white",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {photo && (typeof photo !== "string" || isGooglePhoto(photo)) ? (
        <Image src={photo} alt="" fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <span
          aria-hidden
          className="font-extrabold text-brand-teal-dark"
          style={{ fontSize: Math.round(size * 0.34) }}
        >
          {initials(name)}
        </span>
      )}
    </span>
  );
}
