"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

// A grid of dots that light up cyan and push away from the pointer.
// With no pointer (touch, or idle) a slow drifting "probe" takes its place.
export default function DotField({ className = "" }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const GAP = 26;
    const R = 170;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let lastMove = -1e9;
    const p = { x: -999, y: -999, tx: -999, ty: -999 };
    // Dots take the section's ink colour; the ones near the pointer turn solid blue.
    const rgb = (name: string) => {
      const hex = getComputedStyle(c).getPropertyValue(name).trim().replace("#", "");
      return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(",");
    };
    const inkRgb = rgb("--text");
    const hotRgb = rgb("--blue");

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      if (performance.now() - lastMove > 2500) {
        // idle probe on a lissajous path
        p.tx = w * (0.5 + 0.32 * Math.sin(t * 0.00023));
        p.ty = h * (0.5 + 0.28 * Math.sin(t * 0.00031 + 1.3));
      }
      p.x += (p.tx - p.x) * 0.12;
      p.y += (p.ty - p.y) * 0.12;
      ctx.clearRect(0, 0, w, h);
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          const dx = x - p.x;
          const dy = y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const k = Math.max(0, 1 - d / R);
          const e = k * k;
          const ox = d ? (dx / d) * e * 10 : 0;
          const oy = d ? (dy / d) * e * 10 : 0;
          ctx.fillStyle = e > 0.02 ? `rgba(${hotRgb},${0.2 + e * 0.8})` : `rgba(${inkRgb},0.16)`;
          const s = 1 + e * 1.6;
          ctx.fillRect(x + ox - s / 2, y + oy - s / 2, s, s);
        }
      }
      if (visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      p.tx = e.clientX - r.left;
      p.ty = e.clientY - r.top;
      lastMove = performance.now();
    };

    resize();
    if (prefersReducedMotion()) {
      visible = false;
      draw(0);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(c);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden className={`absolute inset-0 h-full w-full ${className}`} />;
}
