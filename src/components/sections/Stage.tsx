"use client";

import { useRef } from "react";
import { gsap, useGSAP, reveal } from "@/lib/gsap";
import { PROFILE, RECORD, STAGES } from "@/lib/data";
import Module from "@/components/core/Module";

const RECORD_ROWS = [
  ["Date", RECORD.date],
  ["Age", RECORD.age],
  ["Category", "Solo activity"],
  ["Place", "Hyderabad, Telangana"],
];

const TALKS = [
  { k: "1,000+", v: "Institutions spoken at, national & international" },
  { k: "10,000+", v: "Attendees across weekly AI bootcamps" },
  { k: "1,000+", v: "Students mentored in full-stack & entrepreneurship" },
];

export default function Stage() {
  const root = useRef<HTMLDivElement>(null);
  const cert = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      reveal(".stage-reveal", {
        y: 60,
        autoAlpha: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      gsap.to(".seal-text", { rotate: 360, duration: 24, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
    },
    { scope: root },
  );

  // The certificate tilts toward the pointer.
  const onMove = (e: React.PointerEvent) => {
    const el = cert.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    gsap.to(el, { rotateY: (x - 0.5) * 8, rotateX: (0.5 - y) * 8, duration: 0.6, ease: "power3.out" });
  };
  const onLeave = () => gsap.to(cert.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });

  return (
    <Module id="stage" file="Stage" index="06" label="On record, on stage" ink>
      <div ref={root} className="px-[var(--gutter)] pb-10 pt-20 md:pt-28">
        <h2 className="stage-reveal xr-text font-wide mb-14 text-[clamp(40px,6.5vw,110px)] font-black uppercase leading-[0.88] tracking-tight">
          On record.
          <br />
          <span className="xr-text accent">On stage.</span>
        </h2>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="stage-reveal lg:col-span-7 [perspective:1200px]">
            <div
              ref={cert}
              onPointerMove={onMove}
              onPointerLeave={onLeave}
              className="xr-box relative overflow-hidden rounded-3xl border border-[#161513] bg-blue p-7 text-[#efe8d9] shadow-[6px_6px_0_var(--cyan)] md:shadow-[12px_12px_0_var(--cyan)] md:p-10 [transform-style:preserve-3d]"
            >
              <div className="pointer-events-none absolute inset-3 rounded-2xl border border-[#efe8d9]/25" />

              <div className="relative flex items-start justify-between gap-6">
                <div>
                  <p className="mono-label font-semibold">{RECORD.org}</p>
                  <p className="mt-1 mono-label opacity-60">World record · Certified</p>
                </div>
                <Seal />
              </div>

              <p className="xr-text relative mt-8 text-[clamp(24px,2.8vw,40px)] font-bold leading-[1.1] tracking-tight">
                {RECORD.title}
              </p>
              <p className="xr-copy relative mt-3 text-[15px] opacity-75">
                Awarded to <span className="font-semibold">{PROFILE.name}</span>
              </p>

              <dl className="relative mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#efe8d9]/25 pt-6 md:grid-cols-4">
                {RECORD_ROWS.map(([k, v]) => (
                  <div key={k}>
                    <dt className="mono-label opacity-60">{k}</dt>
                    <dd className="xr-copy mt-1 text-[14px] font-medium">{v}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={RECORD.href}
                target="_blank"
                rel="noreferrer"
                className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-[#efe8d9] px-4 py-2 mono-label text-[#161513] transition-colors hover:bg-cyan"
              >
                Verify the record ↗
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="stage-reveal xr-copy mb-6 text-[15px] leading-relaxed text-muted">
              Keynotes and workshops at IIT Madras, Christ University, NIT Durgapur and hackathons across India and abroad.
              I&apos;d rather show people how to use AI than tell them about it.
            </p>
            <ul>
              {TALKS.map((t) => (
                <li key={t.v} className="stage-reveal flex items-baseline gap-5 border-t border-line py-5">
                  <span className="xr-text font-wide min-w-[5ch] text-[clamp(30px,3vw,44px)] font-black leading-none text-text">{t.k}</span>
                  <span className="xr-copy text-[14px] text-muted">{t.v}</span>
                </li>
              ))}
              <li className="stage-reveal flex items-center justify-between border-y border-line py-5">
                <span className="xr-copy text-[14px] text-muted">1,500+ followers · 10K+ views on tech &amp; startup content</span>
                <a href={PROFILE.socials[2].href} target="_blank" rel="noreferrer" className="mono-label text-cyan hover:underline">
                  {PROFILE.socials[2].handle} ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-y border-line py-6">
        <div className="animate-marquee flex w-max gap-12 [--marquee-dur:40s]">
          {[...STAGES, ...STAGES].map((s, i) => (
            <span
              key={i}
              className="font-wide flex items-center gap-12 whitespace-nowrap text-[clamp(28px,4vw,56px)] font-black uppercase text-transparent [-webkit-text-stroke:1px_var(--line-2)]"
            >
              {s}
              <span className="text-blue [-webkit-text-stroke:0]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </Module>
  );
}

function Seal() {
  return (
    <svg viewBox="0 0 120 120" className="h-20 w-20 shrink-0 md:h-24 md:w-24" aria-hidden>
      <defs>
        <path id="seal-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="none" stroke="#efe8d9" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="60" cy="60" r="34" fill="#161513" stroke="#161513" strokeWidth="1" />
      <g className="seal-text">
        <text fill="#efe8d9" fontSize="9.5" letterSpacing="3.2" fontFamily="var(--font-jetbrains)">
          <textPath href="#seal-path">WORLD RECORD · HOLDER · 2025 · IBR ·</textPath>
        </text>
      </g>
      <text x="60" y="58" textAnchor="middle" fill="#efe8d9" fontSize="18" fontWeight="900" fontFamily="var(--font-archivo)">
        №1
      </text>
      <text x="60" y="74" textAnchor="middle" fill="#33c3ff" fontSize="7" letterSpacing="1.5" fontFamily="var(--font-jetbrains)">
        AGE 17
      </text>
    </svg>
  );
}
