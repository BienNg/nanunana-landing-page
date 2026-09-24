import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "inverse";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-control font-sans text-label-lg font-semibold transition-[background-color,border-color,color,box-shadow,translate] duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60 [&_svg]:size-[1.125em] [&_svg]:shrink-0";

const variants: Record<ButtonVariant, string> = {
  // Lead capture — coral
  primary:
    "bg-coral-fill text-white shadow-tier-1 hover:-translate-y-px hover:bg-coral-hover hover:shadow-glow-coral",
  // Curriculum explorer — teal
  secondary: "bg-brand-teal-dark text-white shadow-tier-1 hover:bg-teal-hover",
  outline:
    "border border-teal bg-white text-brand-teal-dark hover:border-brand-teal-dark hover:bg-surface-container-low",
  ghost: "text-brand-teal-dark hover:bg-surface-container-low",
  // On dark sections
  inverse: "bg-white text-ink hover:bg-surface-container-low",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-tap px-4 py-2 text-label-md",
  md: "min-h-tap px-6 py-3",
  lg: "min-h-13 px-7 py-3.5 text-[16px]",
};

/** Class string for button-looking elements (usable from Server Components). */
export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
}

/** Framer Motion press feedback shared by all buttons. */
export const pressMotion = {
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 600, damping: 30 },
} as const;
