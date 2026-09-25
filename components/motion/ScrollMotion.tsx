"use client";

import { gsap, MQ, ScrollTrigger, useGSAP } from "./gsap";

const nf = new Intl.NumberFormat("vi-VN");

/**
 * Scroll effects (loaded lazily by MotionLoader, so GSAP never blocks first paint):
 * - subtle parallax on the hero brand card ([data-hero-parallax])
 * - stat numbers count up once ([data-countup])
 * - the Process line draws as you scroll ([data-process], [data-process-line])
 * Everything is attached to server-rendered markup; without JS or with
 * reduced motion the final state is what's already in the HTML.
 */
export default function ScrollMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MQ.motionOk, () => {
      // Hero card parallax (the hero entrance itself is CSS — see globals.css)
      const hero = document.querySelector<HTMLElement>("[data-hero-parallax]");
      if (hero) {
        gsap.to(hero, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: hero.closest("section"),
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      // Count-up
      gsap.utils.toArray<HTMLElement>("[data-countup]").forEach((el) => {
        const target = Number(el.dataset.countup);
        const prefix = el.dataset.prefix ?? "";
        const suffix = el.dataset.suffix ?? "";
        if (!Number.isFinite(target)) return;
        const counter = { v: 0 };
        el.textContent = `${prefix}0${suffix}`;
        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${nf.format(Math.round(counter.v))}${suffix}`;
          },
        });
      });
    });

    // Process line: vertical on mobile, horizontal on desktop
    const processLine = (axis: "x" | "y") => () => {
      document.querySelectorAll<HTMLElement>("[data-process]").forEach((section) => {
        const line = section.querySelector<HTMLElement>("[data-process-line]");
        if (!line) return;
        gsap.fromTo(line, axis === "x" ? { scaleX: 0 } : { scaleY: 0 }, {
          ...(axis === "x" ? { scaleX: 1 } : { scaleY: 1 }),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: axis === "x" ? "top 75%" : "top 70%",
            end: axis === "x" ? "bottom 60%" : "bottom 55%",
            scrub: 0.5,
          },
        });
        section.querySelectorAll<HTMLElement>("[data-process-step]").forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: axis === "x" ? "top 70%" : "top 65%",
            toggleClass: { targets: step, className: "is-active" },
          });
        });
      });
    };
    mm.add(`${MQ.motionOk} and ${MQ.desktop}`, processLine("x"));
    mm.add(`${MQ.motionOk} and ${MQ.mobile}`, processLine("y"));

    return () => mm.revert();
  });

  return null;
}
