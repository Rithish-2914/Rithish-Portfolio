"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, reveal } from "@/lib/gsap";
import { CHANGELOG } from "@/lib/data";
import Module from "@/components/core/Module";
import { scrollToTarget, useLenis } from "@/components/core/SmoothScroll";

const TYPE_STYLE: Record<string, string> = {
  init: "border-line-2 text-muted",
  feat: "border-cyan/40 text-cyan",
  release: "border-blue bg-blue text-[#efe8d9]",
  major: "border-cyan bg-cyan text-[#161513]",
};

export default function Changelog() {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      gsap.fromTo(
        ".log-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".log-list", start: "top 60%", end: "bottom 60%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>(".log-entry").forEach((entry) => {
        ScrollTrigger.create({
          trigger: entry,
          start: "top 60%",
          end: "bottom 60%",
          toggleClass: { targets: entry, className: "is-active" },
          onEnter: () => entry.classList.add("is-passed"),
          onLeaveBack: () => entry.classList.remove("is-passed"),
        });
        reveal(entry.querySelector(".log-body"), {
          x: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: entry, start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <Module id="changelog" file="Changelog" index="05" label="The journey">
      <div ref={root} className="grid gap-14 px-[var(--gutter)] py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="mb-4 font-mono text-[13px] text-blue">CHANGELOG.md</p>
            <h2 className="xr-text font-wide text-[clamp(40px,5vw,76px)] font-black uppercase leading-[0.9] tracking-tight">
              Release
              <br />
              notes
            </h2>
            <p className="xr-copy mt-6 max-w-[34ch] text-[15px] leading-relaxed text-muted">
              Every version number is my age at the time. <span className="font-mono text-text">v17.7</span> means 17 years
              and 7 months. Still in active development.
            </p>
          </div>
        </div>

        <ol className="log-list relative lg:col-span-8">
          {/* track + progress */}
          <span className="absolute bottom-0 left-[7px] top-2 w-px bg-line-2" />
          <span className="log-progress absolute bottom-0 left-[7px] top-2 w-px origin-top bg-blue" />

          {CHANGELOG.map((c) => (
            <li key={c.version} className="log-entry group relative pb-16 pl-12">
              <span className="absolute left-0 top-2 grid h-[15px] w-[15px] place-items-center rounded-full border border-line-2 bg-bg transition-all duration-500 group-[.is-passed]:border-blue group-[.is-active]:scale-125">
                <span className="h-[5px] w-[5px] rounded-full bg-dim transition-colors duration-500 group-[.is-passed]:bg-blue" />
              </span>
              <div className="log-body">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="xr-text font-wide text-[clamp(32px,4vw,56px)] font-black leading-none tracking-tight text-dim transition-colors duration-500 group-[.is-passed]:text-text">
                    {c.version}
                  </span>
                  <span className={`rounded border px-2 py-0.5 font-mono text-[11px] ${TYPE_STYLE[c.type]}`}>{c.type}</span>
                  <span className="font-mono text-[12px] text-muted">{c.date}</span>
                </div>
                <h3 className="xr-text mt-3 text-[clamp(20px,2vw,28px)] font-semibold tracking-tight">{c.title}</h3>
                <p className="xr-copy mt-2 max-w-[58ch] text-[15px] leading-relaxed text-muted">{c.body}</p>
              </div>
            </li>
          ))}

          <li className="relative pl-12">
            <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border border-dashed border-cyan" />
            <p className="font-mono text-[13px] text-muted">
              <span className="text-cyan">HEAD</span> → next release
            </p>
            <button
              onClick={() => scrollToTarget(lenis, "#contact")}
              className="xr-text mt-2 text-left text-[clamp(20px,2vw,28px)] font-semibold tracking-tight text-text underline decoration-cyan/50 underline-offset-4 transition-colors hover:text-cyan"
            >
              Could be the thing we build together →
            </button>
          </li>
        </ol>
      </div>
    </Module>
  );
}
