"use client";

import { useRef } from "react";
import { gsap, onSiteReady, useGSAP } from "@/lib/gsap";
import { PROFILE } from "@/lib/data";
import DotField from "@/components/core/DotField";
import { CodeLayer } from "@/components/core/SourceMode";
import { scrollToTarget, useLenis } from "@/components/core/SmoothScroll";
import { useFitText } from "@/components/core/useFitText";

const ROLES = ["Founder", "Full-stack & AI engineer", "Speaker"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const name = useRef<HTMLHeadingElement>(null);
  const lenis = useLenis();
  useFitText(name);

  useGSAP(
    () => {
      const intro = gsap
        .timeline({ paused: true })
        .fromTo(".hero-char", { yPercent: 115 }, { yPercent: 0, duration: 1.3, ease: "expo.out", stagger: 0.05 })
        .fromTo(
          ".hero-fade",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08 },
          0.35,
        );
      const off = onSiteReady(() => intro.play());

      // On the way out, the name drifts up and the field dims.
      gsap.to(".hero-name-wrap", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-field", {
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      return off;
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" data-module="Hero" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-bg text-text">
      <div className="hero-field absolute inset-0 xr-hide">
        <DotField />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg to-transparent" />
      </div>
      <CodeLayer file="Hero" />

      <div className="relative z-10 flex flex-1 flex-col justify-end px-[var(--gutter)] pb-6 pt-28">
        <ul className="hero-fade mb-5 flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <li key={r} className="xr-box rounded-full border border-line-2 bg-bg/50 px-3 py-1.5 mono-label text-muted backdrop-blur">
              {r}
            </li>
          ))}
        </ul>

        <div className="hero-name-wrap w-full">
          <h1
            ref={name}
            aria-label={PROFILE.name}
            className="xr-text font-wide inline-block whitespace-nowrap font-black uppercase leading-[0.8] tracking-[-0.02em] text-text"
          >
            {PROFILE.first.split("").map((c, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.04em] align-bottom">
                <span className={`hero-char inline-block ${i === PROFILE.first.length - 1 ? "xr-text accent-2" : ""}`}>{c}</span>
              </span>
            ))}
          </h1>
        </div>

        <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="hero-fade mono-label mb-4 text-muted">{PROFILE.last} · {PROFILE.age} · Hyderabad → VIT Vellore</p>
            <h2 className="hero-fade xr-text max-w-[18ch] text-[clamp(26px,3.6vw,54px)] font-semibold leading-[1.05] tracking-tight">
              I build like a <span className="xr-text mark">founder</span> and ship like an{" "}
              <span className="xr-text mark">engineer</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pb-2">
            <p className="hero-fade xr-copy max-w-[46ch] text-[15px] leading-relaxed text-muted">
              World record holder before I could vote. I turn ideas into products people actually use: AI tools,
              learning platforms, civic tech, and once, a clothing brand.
            </p>
            <div className="hero-fade mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => scrollToTarget(lenis, "#work")}
                className="xr-box group flex items-center gap-2 rounded-full bg-text px-5 py-3 text-[14px] font-semibold text-bg transition-colors hover:bg-blue"
              >
                See the work <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </button>
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noreferrer"
                className="xr-box flex items-center gap-2 rounded-full border border-text px-5 py-3 text-[14px] font-semibold text-text transition-colors hover:bg-cyan hover:border-cyan hover:text-bg"
              >
                Resume ↗
              </a>
            </div>
          </div>
        </div>

        <div className="hero-fade mt-10 flex items-center justify-between border-t border-line pt-4 mono-label text-dim">
          <span>
            <span className="text-blue">◆</span> World record · IBR 2025
          </span>
          <span className="hidden sm:inline">Hyderabad, IN</span>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
