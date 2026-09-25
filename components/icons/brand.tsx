import type { SVGProps } from "react";

/*
 * Lightweight inline brand glyphs (simplified, single-color, currentColor).
 * Decorative by default — pair with visible text or an aria-label on the link.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden focusable="false" {...props}>
      {children}
    </svg>
  );
}

/** Zalo glyph on a coral button: the bubble follows currentColor, the letters stay coral. */
export const zaloOnCoral = "[--icon-contrast:var(--color-coral-fill)]";

export function ZaloIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M12 2.5c-5.52 0-10 3.9-10 8.7 0 2.62 1.33 4.97 3.43 6.57L4.6 21.3l4.18-1.97c1.02.3 2.1.46 3.22.46 5.52 0 10-3.9 10-8.7S17.52 2.5 12 2.5Z"
      />
      <path
        fill="none"
        stroke="var(--icon-contrast, #fff)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.4 9h3.7l-3.7 4.6h3.7M12.3 10.6v3M12.3 11.6a1.4 1.4 0 1 1 0 .01M15.1 8.8v4.8M17.9 10.5a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1Z"
      />
    </Svg>
  );
}

export function MessengerIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.2 5.43 3.14 7.17v3.61l3.43-1.88c1.08.3 2.23.46 3.43.46 5.64 0 10-4.13 10-9.7S17.64 2 12 2Z"
      />
      <path
        fill="var(--icon-contrast, #fff)"
        d="m6.2 14.43 2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63l-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63Z"
      />
    </Svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        d="M3.6 20.4 4.9 16A8.6 8.6 0 1 1 8 19.1l-4.4 1.3Z"
      />
      <path
        fill="currentColor"
        d="M9.1 7.6c.2 0 .4 0 .55.36l.7 1.66c.06.15.05.32-.05.46l-.5.64c-.1.13-.1.3-.02.44.62 1.1 1.45 1.9 2.55 2.46.14.07.31.05.43-.06l.62-.56c.13-.12.32-.15.48-.08l1.63.76c.2.1.31.3.28.52-.1.77-.8 1.55-1.62 1.55-2.9 0-6-3.08-6-6 0-.83.6-2.1 1-2.15Z"
      />
    </Svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M13.4 22v-8.2h2.75l.42-3.2H13.4V8.56c0-.93.26-1.56 1.59-1.56h1.7V4.14A22.6 22.6 0 0 0 14.22 4c-2.45 0-4.12 1.5-4.12 4.23v2.37H7.33v3.2h2.77V22h3.3Z"
      />
    </Svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M16.2 2.5c.35 2.3 1.9 3.95 4.05 4.15v3.2a7.4 7.4 0 0 1-4-1.22v6.32a6.2 6.2 0 1 1-6.2-6.2c.3 0 .6.02.88.07v3.28a2.95 2.95 0 1 0 2.07 2.82V2.5h3.2Z"
      />
    </Svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2C2 8.76 2 12 2 12s0 3.24.4 4.8a2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77c.4-1.56.4-4.8.4-4.8s0-3.24-.4-4.8Z"
      />
      <path fill="var(--icon-contrast, #fff)" d="m10 15 5.2-3L10 9v6Z" />
    </Svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.9">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
      </g>
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </Svg>
  );
}
