"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, reveal } from "@/lib/gsap";
import { PROFILE, RECORD } from "@/lib/data";
import Module from "@/components/core/Module";

// Words wrapped in *asterisks* light up cyan instead of white.
const STATEMENT =
  "I don't wait to be ready. At *14* I was collecting Python certificates. At *17* I had a clothing brand, an AI system for Kochi Metro and a *world record*. Now I'm 18, studying IT at VIT, and building software for people who actually need it.";

const ID_ROWS = [
  ["Name", PROFILE.name],
  ["Age", `${PROFILE.age}`],
  ["Base", "Hyderabad → Vellore"],
  ["Study", "B.Tech IT, VIT '29"],
  ["Record", RECORD.date],
  ["Status", "Building"],
];

export default function About() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".about-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: ".about-statement", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      reveal(".about-card", {
        y: 80,
        rotate: 4,
        autoAlpha: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about-card", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <Module id="about" file="About" index="01" label="About">
      <div ref={root} className="grid gap-14 px-[var(--gutter)] py-24 md:py-36 lg:grid-cols-12 lg:gap-10">
        <p className="about-statement xr-text lg:col-span-8 text-[clamp(26px,3.4vw,52px)] font-semibold leading-[1.18] tracking-tight">
          {STATEMENT.split(" ").map((w, i) => {
            const hot = w.includes("*");
            return (
              <span key={i} className={`about-word inline-block ${hot ? "xr-text accent-2" : ""}`}>
                {w.replace(/\*/g, "")}&nbsp;
              </span>
            );
          })}
        </p>

        <div className="lg:col-span-4 lg:pt-3">
          <figure className="about-card xr-box relative mx-auto max-w-[360px] rounded-2xl border border-text bg-surface p-3 shadow-[6px_6px_0_var(--cyan)] md:shadow-[10px_10px_0_var(--cyan)]">
            <div className="flex items-center justify-between px-1 pb-3 mono-label text-dim">
              <span>
                ID <span className="text-blue">#BR-2008</span>
              </span>
              <span className="flex gap-1">
                <i className="h-2 w-2 rounded-full bg-line-2" />
                <i className="h-2 w-2 rounded-full bg-line-2" />
                <i className="h-2 w-2 rounded-full bg-blue" />
              </span>
            </div>
            <div className="group relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src="/photos/shore.jpg"
                alt="Bajjuri Rithish standing in the surf on a cloudy beach"
                fill
                sizes="(max-width: 1024px) 90vw, 360px"
                className="xr-media object-cover grayscale-[0.35] transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 px-1 pt-4 font-mono text-[11px]">
              {ID_ROWS.map(([k, v]) => (
                <div key={k} className="border-b border-line pb-1.5">
                  <dt className="uppercase tracking-[0.16em] text-dim">{k}</dt>
                  <dd className={`xr-copy mt-0.5 ${k === "Status" ? "text-blue" : "text-text"}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </figure>
        </div>
      </div>
    </Module>
  );
}
