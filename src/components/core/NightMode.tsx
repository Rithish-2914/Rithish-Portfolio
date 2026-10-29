"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

// Night mode: the cream paper turns into deep space, with a Milky Way behind every section.
// The saved choice is applied before first paint by the inline script in layout.tsx.
const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const isNight = () => document.documentElement.dataset.theme === "night";

export default function NightMode() {
  const on = useSyncExternalStore(subscribe, isNight, () => false);
  const btn = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    const html = document.documentElement;
    const next = !isNight();
    const flip = () => {
      html.dataset.theme = next ? "night" : "day";
      try {
        localStorage.setItem("theme", next ? "night" : "day");
      } catch {}
    };

    // A circle of night (or day) grows out of the button
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || prefersReducedMotion()) {
      flip();
      return;
    }
    const r = btn.current?.getBoundingClientRect();
    const x = r ? r.left + r.width / 2 : window.innerWidth / 2;
    const y = r ? r.top + r.height / 2 : window.innerHeight / 2;
    const end = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    doc.startViewTransition(flip).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.7, 0, 0.3, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "n" && !e.metaKey && !e.ctrlKey && !e.altKey) toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return (
    <>
      <Galaxy on={on} />
      <button
        ref={btn}
        onClick={toggle}
        data-cursor="hover"
        aria-pressed={on}
        aria-label={on ? "Switch to day theme" : "Switch to night theme"}
        className="group fixed bottom-16 left-4 z-[70] flex items-center gap-2 rounded-full border border-text bg-text px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bg transition-colors hover:bg-blue hover:border-blue md:bottom-auto md:left-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:rounded-r-none md:rounded-l-lg md:border-r-0 md:px-2.5 md:py-4 md:[writing-mode:vertical-rl]"
      >
        <span className="font-bold">{on ? "☀" : "✦"}</span>
        <span>{on ? "Day mode" : "Night mode"}</span>
      </button>
    </>
  );
}

const STAR_COLORS = ["255,255,255", "200,215,255", "255,244,220", "255,214,170", "180,200,255"];
// Far stars barely move on scroll, near ones move faster: that's the depth.
const LAYERS = [
  { area: 2600, speed: 0.04, drift: 4, min: 0.3, max: 0.8 },
  { area: 7000, speed: 0.12, drift: 10, min: 0.6, max: 1.3 },
  { area: 24000, speed: 0.25, drift: 20, min: 1.0, max: 2.0 },
];

type Star = { x: number; y: number; r: number; a: number; speed: number; drift: number; tw: number; phase: number; color: string };
type Shot = { x: number; y: number; vx: number; vy: number; len: number; born: number; life: number };

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const gauss = () => (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;

function Galaxy({ on }: { on: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!on) return;
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const reduced = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let dpr = 1;
    let lastW = 0;
    let raf = 0;
    let nextShot = 0;
    let stars: Star[] = [];
    let shots: Shot[] = [];
    let milkyWay: HTMLCanvasElement | null = null;
    // pointer offset from centre, -1..1, eased
    const p = { x: 0, y: 0, tx: 0, ty: 0 };

    const buildStars = () => {
      stars = [];
      for (const l of LAYERS) {
        const count = Math.floor((w * h) / l.area);
        for (let i = 0; i < count; i++) {
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: rand(l.min, l.max),
            a: rand(0.4, 1),
            speed: l.speed,
            drift: l.drift,
            tw: rand(0.0005, 0.003),
            phase: Math.random() * Math.PI * 2,
            color: `rgb(${STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]})`,
          });
        }
      }
    };

    // The band is painted once offscreen, then just rotated each frame.
    const buildMilkyWay = () => {
      const size = Math.ceil(Math.hypot(w, h) * 1.3);
      const off = document.createElement("canvas");
      off.width = size;
      off.height = size;
      const g = off.getContext("2d")!;
      const cy = size / 2;
      const bandH = Math.min(w, h) * 0.3 + 60;
      const coreX = size * 0.55;

      g.globalCompositeOperation = "lighter";
      const tints = ["120,90,220", "60,110,230", "50,190,255", "170,110,220", "90,150,255"];
      for (let i = 0; i < 80; i++) {
        const x = rand(0, size);
        const y = cy + gauss() * bandH * 0.5;
        const r = rand(bandH * 0.3, bandH * 1.1);
        const core = 1 - Math.min(1, Math.abs(x - coreX) / (size * 0.5));
        const tint = tints[i % tints.length];
        const grad = g.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, `rgba(${tint},${(0.035 + core * 0.06).toFixed(3)})`);
        grad.addColorStop(1, `rgba(${tint},0)`);
        g.fillStyle = grad;
        g.fillRect(x - r, y - r, r * 2, r * 2);
      }

      // bright galactic core
      const cr = bandH * 1.4;
      const coreGrad = g.createRadialGradient(coreX, cy, 0, coreX, cy, cr);
      coreGrad.addColorStop(0, "rgba(255,236,200,0.24)");
      coreGrad.addColorStop(0.4, "rgba(255,200,150,0.07)");
      coreGrad.addColorStop(1, "rgba(255,200,150,0)");
      g.fillStyle = coreGrad;
      g.fillRect(coreX - cr, cy - cr, cr * 2, cr * 2);

      // dense star dust along the band
      const dust = Math.floor(size * 2.5);
      for (let i = 0; i < dust; i++) {
        const s = Math.random() < 0.95 ? rand(0.4, 1) : rand(1, 1.8);
        g.fillStyle = `rgba(255,255,255,${rand(0.12, 0.7).toFixed(2)})`;
        g.fillRect(rand(0, size), cy + gauss() * bandH * 0.6, s, s);
      }

      // dark dust lanes through the middle
      g.globalCompositeOperation = "source-over";
      for (let i = 0; i < 60; i++) {
        const x = (size * i) / 60 + rand(-25, 25);
        const y = cy + Math.sin(i * 0.3) * bandH * 0.12 + rand(-10, 10);
        const r = rand(bandH * 0.08, bandH * 0.2);
        const grad = g.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, "rgba(3,5,12,0.4)");
        grad.addColorStop(1, "rgba(3,5,12,0)");
        g.fillStyle = grad;
        g.fillRect(x - r, y - r, r * 2, r * 2);
      }
      milkyWay = off;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      buildStars();
      // a mobile address bar only changes the height; skip the expensive rebuild then
      if (w !== lastW || !milkyWay) buildMilkyWay();
      lastW = w;
    };

    const spawnShot = (t: number) => {
      const angle = rand(0.35, 0.75);
      const speed = rand(0.6, 1.1);
      shots.push({
        x: rand(w * 0.1, w * 0.9),
        y: rand(0, h * 0.4),
        vx: Math.cos(angle) * speed * (Math.random() < 0.5 ? -1 : 1),
        vy: Math.sin(angle) * speed,
        len: rand(80, 180),
        born: t,
        life: rand(700, 1200),
      });
      nextShot = t + rand(2500, 7000);
    };

    const draw = (t: number) => {
      const sy = window.scrollY;
      const progress = sy / Math.max(1, document.documentElement.scrollHeight - h);
      p.x += (p.tx - p.x) * 0.04;
      p.y += (p.ty - p.y) * 0.04;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // the Milky Way slowly turns as you scroll down the page
      if (milkyWay) {
        ctx.save();
        ctx.translate(w / 2 - p.x * 6, h / 2 - p.y * 6);
        ctx.rotate(-0.5 + progress * 1.1);
        ctx.drawImage(milkyWay, -milkyWay.width / 2, -milkyWay.height / 2);
        ctx.restore();
      }

      for (const s of stars) {
        const x = (((s.x - p.x * s.drift) % w) + w) % w;
        const y = (((s.y - sy * s.speed - p.y * s.drift) % h) + h) % h;
        const twinkle = reduced ? 1 : 0.6 + 0.4 * Math.sin(t * s.tw + s.phase);
        ctx.globalAlpha = s.a * twinkle;
        ctx.fillStyle = s.color;
        if (s.r < 0.9) {
          ctx.fillRect(x, y, s.r * 1.6, s.r * 1.6);
          continue;
        }
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.5) {
          ctx.globalAlpha *= 0.15;
          ctx.beginPath();
          ctx.arc(x, y, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if (reduced) return;
      if (t > nextShot) spawnShot(t);
      shots = shots.filter((s) => t - s.born < s.life);
      for (const s of shots) {
        const age = t - s.born;
        const hx = s.x + s.vx * age;
        const hy = s.y + s.vy * age;
        const n = Math.hypot(s.vx, s.vy);
        const tx = hx - (s.vx / n) * s.len;
        const ty = hy - (s.vy / n) * s.len;
        const grad = ctx.createLinearGradient(hx, hy, tx, ty);
        grad.addColorStop(0, `rgba(235,245,255,${(1 - age / s.life).toFixed(2)})`);
        grad.addColorStop(1, "rgba(235,245,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced) draw(0);
      else if (!document.hidden) raf = requestAnimationFrame(loop);
    };

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (reduced) draw(0);
      }, 150);
    };
    const onMove = (e: PointerEvent) => {
      p.tx = (e.clientX / w - 0.5) * 2;
      p.ty = (e.clientY / h - 0.5) * 2;
    };
    // with reduced motion there is no loop, so redraw on scroll instead
    const onScroll = () => requestAnimationFrame(() => draw(0));

    resize();
    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", start);
    if (reduced) window.addEventListener("scroll", onScroll, { passive: true });
    else window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, [on]);

  return <canvas ref={canvas} aria-hidden className="galaxy pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
