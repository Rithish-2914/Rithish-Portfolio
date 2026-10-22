"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// A cyan dot plus a lagging ring. Only on devices with a real mouse.
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const d = dot.current!;
    const r = ring.current!;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, x: -100, y: -100, autoAlpha: 1 });
    const dx = gsap.quickTo(d, "x", { duration: 0.08 });
    const dy = gsap.quickTo(d, "y", { duration: 0.08 });
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const hot = (e.target as HTMLElement).closest("a, button, [data-cursor='hover'], input, textarea, select");
      gsap.to(r, { scale: hot ? 1.9 : 1, duration: 0.3 });
      gsap.to(d, { scale: hot ? 0 : 1, duration: 0.2 });
    };
    const leave = () => gsap.to([d, r], { autoAlpha: 0, duration: 0.2 });
    const enter = () => gsap.to([d, r], { autoAlpha: 1, duration: 0.2 });

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden className="pointer-events-none invisible fixed left-0 top-0 z-[110] h-8 w-8 rounded-full border border-white mix-blend-difference" />
      <div ref={dot} aria-hidden className="pointer-events-none invisible fixed left-0 top-0 z-[110] h-1.5 w-1.5 rounded-full bg-blue" />
    </>
  );
}
