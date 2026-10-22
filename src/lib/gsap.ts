"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The preloader fires this once the curtain has gone, so section intros start on cue.
export const READY_EVENT = "site:ready";

export function onSiteReady(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  if ((window as unknown as { __siteReady?: boolean }).__siteReady) {
    cb();
    return () => {};
  }
  window.addEventListener(READY_EVENT, cb, { once: true });
  return () => window.removeEventListener(READY_EVENT, cb);
}

export function markSiteReady() {
  (window as unknown as { __siteReady?: boolean }).__siteReady = true;
  window.dispatchEvent(new Event(READY_EVENT));
}

// Like gsap.from(), but with explicit end values. gsap.from() reads the element's current
// state as its destination, which goes wrong if an earlier run (Strict Mode, HMR) already hid it.
const RESTING: Record<string, number> = { x: 0, y: 0, xPercent: 0, yPercent: 0, rotate: 0, autoAlpha: 1, opacity: 1, scale: 1 };

export function reveal(targets: gsap.TweenTarget, vars: gsap.TweenVars) {
  const from: gsap.TweenVars = {};
  const to: gsap.TweenVars = {};
  for (const [k, v] of Object.entries(vars)) {
    if (k in RESTING) {
      from[k] = v;
      to[k] = RESTING[k];
    } else to[k] = v;
  }
  return gsap.fromTo(targets, from, to);
}
