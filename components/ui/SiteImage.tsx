import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/cn";
import { images, type ImageKey } from "@/content/images";

const isDev = process.env.NODE_ENV !== "production";

/**
 * next/image driven by the typed image map in content/images.ts.
 * Placeholder photos get a small "Ảnh mẫu" tag in development.
 */
export function SiteImage({
  image,
  className,
  wrapperClassName,
  ...props
}: { image: ImageKey; wrapperClassName?: string } & Omit<ImageProps, "src" | "alt">) {
  const img = images[image];
  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      <Image
        src={img.src}
        alt={img.alt}
        placeholder={img.src.blurDataURL ? "blur" : "empty"}
        className={cn("h-full w-full object-cover", className)}
        {...props}
      />
      {isDev && img.placeholder ? (
        <span className="pointer-events-none absolute top-2 left-2 rounded-full bg-amber px-2 py-0.5 text-label-sm text-ink uppercase">
          Ảnh mẫu
        </span>
      ) : null}
    </div>
  );
}
