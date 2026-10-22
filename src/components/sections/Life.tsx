"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { PHOTOS } from "@/lib/data";
import Module from "@/components/core/Module";

const ROWS = [PHOTOS.slice(0, 6), PHOTOS.slice(6)];

export default function Life() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const trigger = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 };
      gsap.fromTo(".life-row-0", { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger: trigger });
      gsap.fromTo(".life-row-1", { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger: trigger });
    },
    { scope: root },
  );

  return (
    <Module id="life" file="Life" index="07" label="Off the clock">
      <div ref={root} className="overflow-hidden pb-24 pt-20 md:pt-28">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 px-[var(--gutter)]">
          <h2 className="xr-text font-wide text-[clamp(40px,6.5vw,110px)] font-black uppercase leading-[0.88] tracking-tight">
            Off the
            <br />
            clock
          </h2>
          <p className="xr-copy max-w-[36ch] text-[15px] leading-relaxed text-muted">
            Trails, tides, go-karts and the occasional dunk. The best ideas usually show up when I&apos;m away from the
            keyboard.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:gap-7">
          {ROWS.map((row, r) => (
            <div key={r} className={`life-row-${r} flex w-max gap-5 pl-[var(--gutter)] md:gap-7`}>
              {[...row, ...row.slice(0, 3)].map((p, i) => (
                <figure key={`${p.src}-${i}`} className="group shrink-0" style={{ rotate: `${((i + r) % 3) - 1}deg` }}>
                  <div
                    className="xr-box relative overflow-hidden rounded-2xl border border-line-2 bg-surface transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:rotate-0"
                    style={{ height: "clamp(200px, 28vw, 400px)", aspectRatio: `${p.w} / ${p.h}` }}
                  >
                    <Image
                      src={p.src}
                      alt={p.caption}
                      fill
                      sizes="(max-width: 768px) 60vw, 30vw"
                      className="xr-media object-cover grayscale-[0.3] transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                  <figcaption className="mt-3 flex justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
                    <span>IMG_{String(PHOTOS.indexOf(p) + 1).padStart(2, "0")}</span>
                    <span className="transition-colors group-hover:text-blue">{p.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Module>
  );
}
