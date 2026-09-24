"use client";

import { gsap, MQ, useGSAP } from "./gsap";

/**
 * Signature moment: one orchestrated hero entrance on load, plus a subtle
 * parallax on the brand card. Attaches to the server-rendered hero by data
 * attributes, so the hero stays a Server Component and is fully visible
 * without JS (see the data-motion gate in app/layout.tsx + globals.css).
 */
export function HeroIntro({ scope }: { scope: string }) {
  useGSAP(
    () => {
      const root = document.documentElement;
      const section = document.querySelector<HTMLElement>(scope);
      if (!section) {
        root.dataset.motion = "ready";
        return;
      }
      const q = gsap.utils.selector(section);
      const mm = gsap.matchMedia();

      mm.add(MQ.motionOk, () => {
        const items = q("[data-hero-item]");
        const card = q("[data-hero-card]");
        const title = q("[data-hero-line]");

        // Lift the CSS gate first so from() tweens read the real end state;
        // they render their start state synchronously, before the next paint.
        root.dataset.motion = "ready";

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(items, { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, 0)
          .from(title, { yPercent: 40, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, 0.05)
          .from(card, { y: 32, scale: 0.97, autoAlpha: 0, duration: 0.9 }, 0.2);

        gsap.to(q("[data-hero-parallax]"), {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.6 },
        });
      });

      mm.add(MQ.reduce, () => {
        root.dataset.motion = "ready";
      });

      return () => mm.revert();
    },
    { dependencies: [scope] },
  );

  return null;
}
