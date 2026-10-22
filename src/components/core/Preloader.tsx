"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, markSiteReady, prefersReducedMotion } from "@/lib/gsap";
import { scramble } from "@/lib/scramble";
import { useLenis } from "./SmoothScroll";

const BOOT = [
  ["$", "boot --user rithish"],
  ["ok", "founder.module"],
  ["ok", "fullstack.engine"],
  ["ok", "ai.runtime"],
  ["ok", "world_record.cert   IBR · 2025"],
  ["ok", "theme: cyan"],
];
const SLATS = 7;

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLSpanElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);

  useEffect(() => {
    lenisRef.current = lenis;
    if (!gone) lenis?.stop();
  }, [lenis, gone]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const finish = () => {
      document.documentElement.style.overflow = "";
      lenisRef.current?.start();
      setGone(true);
    };

    if (prefersReducedMotion()) {
      gsap.to(el, { autoAlpha: 0, duration: 0.3, delay: 0.3, onStart: markSiteReady, onComplete: finish });
      return;
    }

    const counter = { v: 0 };
    let tl: gsap.core.Timeline | undefined;
    const ctx = gsap.context(() => {
      tl = gsap.timeline();
      tl.to(counter, {
        v: 100,
        duration: 2.3,
        ease: "power2.inOut",
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          if (bar.current) bar.current.style.transform = `scaleX(${counter.v / 100})`;
        },
      })
        .fromTo(
          ".boot-line",
          { autoAlpha: 0, x: -8 },
          { autoAlpha: 1, x: 0, duration: 0.25, stagger: 0.16, ease: "power2.out" },
          0.1,
        )
        .add(() => {
          if (name.current) scramble(name.current, "RITHISH", 900);
        }, 0.75)
        .fromTo(".boot-name", { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power3.out" }, 0.75)
        // exit: content lifts away, then the shutters open in alternating directions
        .to(".boot-content", { autoAlpha: 0, y: -24, duration: 0.45, ease: "power2.in" }, 2.45)
        .add(markSiteReady, 2.75)
        .to(
          ".boot-slat",
          {
            xPercent: (i) => (i % 2 ? 101 : -101),
            duration: 0.9,
            ease: "expo.inOut",
            stagger: { each: 0.05, from: "center" },
          },
          2.6,
        )
        .add(finish);
    }, el);

    return () => {
      // kill (not revert) so the timeline's callbacks can't fire during unmount
      tl?.kill();
      ctx.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className="theme-ink fixed inset-0 z-[100] !bg-transparent" aria-label="Loading" role="status">
      <div className="absolute inset-0 flex flex-col">
        {Array.from({ length: SLATS }).map((_, i) => (
          <div key={i} className={`boot-slat relative flex-1 ${i === SLATS - 1 ? "bg-blue" : "bg-bg"}`} />
        ))}
      </div>

      <div className="boot-content absolute inset-0 flex flex-col justify-between p-[var(--gutter)]">
        <div>
          <div className="flex items-start justify-between mono-label text-dim">
            <span>
              <span className="text-blue">rithish</span>.os / boot
            </span>
            <span>Hyderabad · IN</span>
          </div>
          <ul className="mt-8 font-mono text-[12px] leading-6 text-muted">
            {BOOT.map(([k, v]) => (
              <li key={v} className="boot-line">
                <span className={k === "$" ? "text-blue" : "text-cyan"}>{k === "$" ? "$" : "[ok]"}</span> {v}
              </li>
            ))}
          </ul>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            ref={name}
            className="boot-name font-wide text-text text-[clamp(48px,13vw,220px)] font-black leading-none tracking-tight opacity-0"
          >
            RITHISH
          </span>
        </div>

        <div>
          <div className="mb-4 flex items-end justify-between">
            <span className="mono-label text-dim">Compiling portfolio</span>
            <span ref={count} className="font-wide text-[clamp(40px,7vw,96px)] font-black leading-none text-text tabular-nums">
              000
            </span>
          </div>
          <div className="h-[3px] w-full bg-line">
            <div ref={bar} className="h-[3px] w-full origin-left scale-x-0 bg-blue" />
          </div>
        </div>
      </div>
    </div>
  );
}
