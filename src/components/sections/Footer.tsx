"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { PROFILE } from "@/lib/data";
import Clock from "@/components/core/Clock";
import { CodeLayer } from "@/components/core/SourceMode";
import { scrollToTarget, useLenis } from "@/components/core/SmoothScroll";
import { useFitText } from "@/components/core/useFitText";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  useFitText(word);

  useGSAP(
    () => {
      // The outlined wordmark fills with solid blue from left to right as you reach the end.
      gsap.fromTo(
        ".footer-fill",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom bottom", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <footer ref={root} data-module="Footer" className="theme-ink relative overflow-hidden border-t border-line">
      <CodeLayer file="Footer" />
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-[var(--gutter)] py-6 mono-label text-muted">
        <span>© 2026 {PROFILE.name}</span>
        <span>
          Hyderabad · <Clock seconds />
        </span>
        <span className="hidden md:inline">Next.js · GSAP · Lenis</span>
        <button onClick={() => scrollToTarget(lenis, 0)} className="text-text transition-colors hover:text-cyan">
          Back to top ↑
        </button>
      </div>

      <div className="relative z-10 px-[var(--gutter)] pb-4">
        <div className="relative">
          <div
            ref={word}
            aria-hidden
            className="font-wide inline-block whitespace-nowrap font-black leading-[0.78] text-transparent [-webkit-text-stroke:1px_var(--line-2)]"
          >
            RITHISH
          </div>
          <div
            aria-hidden
            className="footer-fill xr-hide absolute inset-0 font-wide whitespace-nowrap font-black leading-[0.78] text-blue"
            style={{ fontSize: "inherit" }}
          >
            <FillMirror source={word} />
          </div>
        </div>
        <p className="mt-4 text-center mono-label text-dim">
          Press <kbd className="text-blue">`</kbd> anywhere to see how this site is built
        </p>
      </div>
    </footer>
  );
}

// Mirrors the fitted font-size of the outline layer so the fill lines up exactly.
function FillMirror({ source }: { source: React.RefObject<HTMLDivElement | null> }) {
  const self = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const sync = () => {
      if (source.current && self.current) self.current.style.fontSize = source.current.style.fontSize;
    };
    sync();
    const ro = new ResizeObserver(sync);
    if (source.current) ro.observe(source.current);
    return () => ro.disconnect();
  });
  return (
    <span ref={self} className="inline-block">
      RITHISH
    </span>
  );
}
