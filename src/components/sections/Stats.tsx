"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { STATS } from "@/lib/data";
import { scramble } from "@/lib/scramble";
import Module from "@/components/core/Module";

const format = (n: number) => n.toLocaleString("en-IN");

export default function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cells = gsap.utils.toArray<HTMLElement>(".stat-cell");
      cells.forEach((cell, i) => {
        const num = cell.querySelector<HTMLElement>(".stat-num")!;
        const target = num.dataset.value!;
        num.textContent = target.replace(/\d/g, "0");
        ScrollTrigger.create({
          trigger: cell,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.delayedCall(i * 0.12, () => void scramble(num, target, 1100));
            gsap.fromTo(cell.querySelector(".stat-bar"), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.out", delay: i * 0.12 });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <Module id="stats" file="Stats" index="02" label="By the numbers" ink>
      <div ref={root} className="px-[var(--gutter)] py-16">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="stat-cell group relative bg-bg px-6 py-10 transition-colors duration-500 hover:bg-surface"
          >
            <div className="mono-label text-dim">
              <span className="text-blue">0{i + 1}</span> / {s.label}
            </div>
            <div className="xr-text mt-6 text-[clamp(48px,4.6vw,80px)] font-black leading-none tracking-tight tabular-nums">
              <span className="stat-num" data-value={format(s.value)}>
                {format(s.value)}
              </span>
              <span className="xr-text accent">{s.suffix}</span>
            </div>
            <div className="mt-6 h-px w-full bg-line">
              <div className="stat-bar h-px w-full origin-left bg-blue" />
            </div>
            <p className="xr-copy mt-3 text-[13px] text-muted">{s.note}</p>
          </div>
        ))}
        </div>
      </div>
    </Module>
  );
}
