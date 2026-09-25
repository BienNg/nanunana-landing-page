"use client";

import { gsap, MQ, ScrollTrigger, useGSAP } from "./gsap";

const nf = new Intl.NumberFormat("vi-VN");

/**
 * Scroll effects (loaded lazily by MotionLoader, so GSAP never blocks first paint):
 * - subtle parallax on the hero brand card ([data-hero-parallax])
 * - stat numbers count up once ([data-countup])
 * - the Process line draws as you scroll ([data-process], [data-process-line])
 * - gallery photos settle in and recede out ([data-gallery-tile])
 * Everything is attached to server-rendered markup; without JS or with
 * reduced motion the final state is what's already in the HTML.
 */

/**
 * Gallery photos rest in a band around the optical center of the screen.
 * Outside that band they scale down, soften, and open from rounder corners —
 * the same scroll-linked media treatment Apple uses on product pages.
 * `rest` is how far from the focal line (as a fraction of the viewport) a
 * photo stays fully resolved. `ramp` is the distance over which it recedes.
 */
const GALLERY_FOCUS = 0.46;
const GALLERY_REST = 0.18;
const GALLERY_RAMP = 0.5;

type GalleryTile = {
  tile: HTMLElement;
  media: HTMLElement | null;
  restRadius: number;
  recede: number;
  shown: number;
  below: boolean;
};

function measureGalleryTile(tile: HTMLElement) {
  const rect = tile.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  const center = rect.top + rect.height / 2;
  const dist = Math.abs(center - vh * GALLERY_FOCUS) / vh;
  return {
    recede: gsap.utils.clamp(0, 1, (dist - GALLERY_REST) / GALLERY_RAMP),
    below: center > vh * GALLERY_FOCUS,
  };
}

/** Softens the fade so a photo stays readable while its scale still tracks the scroll. */
function galleryEase(progress: number) {
  return 1 - (1 - progress) ** 2;
}

function paintGalleryTile(state: GalleryTile) {
  const presence = 1 - state.shown;
  const { tile, media } = state;

  if (state.shown < 0.02) {
    tile.style.transform = "";
    tile.style.opacity = "";
    tile.style.borderRadius = "";
    if (media) media.style.transform = "";
    return;
  }

  const scale = gsap.utils.interpolate(0.84, 1, presence);
  const opacity = gsap.utils.interpolate(0.88, 1, galleryEase(presence));
  const y = state.below
    ? gsap.utils.interpolate(4.5, 0, presence)
    : gsap.utils.interpolate(0, -2.5, 1 - presence);
  const radius = gsap.utils.interpolate(state.restRadius * 1.85, state.restRadius, presence);
  tile.style.transform = `translate3d(0, ${y.toFixed(2)}%, 0) scale(${scale.toFixed(4)})`;
  tile.style.opacity = opacity.toFixed(3);
  tile.style.borderRadius = `${radius.toFixed(2)}px`;
  if (media) {
    const zoom = gsap.utils.interpolate(1.08, 1, presence);
    media.style.transform = `scale(${zoom.toFixed(4)})`;
  }
}

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

    // Gallery: each photo is linked to scroll, so it arrives and leaves instead of popping.
    mm.add(MQ.motionOk, () => {
      const tiles = gsap.utils.toArray<HTMLElement>("[data-gallery-tile]").map((tile) => {
        const measured = measureGalleryTile(tile);
        const tileState: GalleryTile = {
          tile,
          media: tile.querySelector("img"),
          restRadius: Number.parseFloat(getComputedStyle(tile).borderRadius) || 16,
          recede: measured.recede,
          shown: measured.recede,
          below: measured.below,
        };
        tile.style.transformOrigin = "center center";
        if (tileState.media) tileState.media.style.transformOrigin = "center center";
        paintGalleryTile(tileState);
        return tileState;
      });
      if (!tiles.length) return;

      let alive = true;
      const sample = () => {
        if (!alive) return;
        for (const tileState of tiles) {
          const measured = measureGalleryTile(tileState.tile);
          tileState.recede = measured.recede;
          tileState.below = measured.below;
        }
      };
      const tick = () => {
        if (!alive) return;
        for (const tileState of tiles) {
          const delta = tileState.recede - tileState.shown;
          if (Math.abs(delta) < 0.001) {
            if (tileState.shown === tileState.recede) continue;
            tileState.shown = tileState.recede;
          } else {
            tileState.shown += delta * 0.14;
          }
          paintGalleryTile(tileState);
        }
      };

      gsap.ticker.add(tick);
      const section = tiles[0].tile.closest("section");
      const trigger = ScrollTrigger.create({
        trigger: section ?? tiles[0].tile,
        start: "top bottom",
        end: "bottom top",
        onUpdate: sample,
        onRefresh: sample,
      });
      sample();

      return () => {
        alive = false;
        gsap.ticker.remove(tick);
        trigger.kill();
        for (const tileState of tiles) {
          tileState.tile.style.transform = "";
          tileState.tile.style.opacity = "";
          tileState.tile.style.borderRadius = "";
          tileState.tile.style.transformOrigin = "";
          if (!tileState.media) continue;
          tileState.media.style.transform = "";
          tileState.media.style.transformOrigin = "";
        }
      };
    });

    return () => mm.revert();
  });

  return null;
}
