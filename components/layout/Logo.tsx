import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import logoMark from "@/public/brand/logo-mark.png";

/** Graduation-cap mark + wordmark. Links to the home page. */
export function Logo({
  tone = "light",
  className,
  priority = false,
}: {
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <Link
      href="/"
      aria-label={`${site.fullName} — Trang chủ`}
      className={cn("inline-flex min-h-tap items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "grid size-10 place-items-center rounded-control",
          dark ? "bg-white" : "bg-surface-container-low",
        )}
      >
        <Image src={logoMark} alt="" width={28} height={19} priority={priority} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[17px] font-extrabold tracking-[-0.01em]",
            dark ? "text-white" : "text-brand-teal-dark",
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            "mt-1 text-label-sm uppercase",
            dark ? "text-ink-inverse-muted" : "text-ink-subtle",
          )}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
