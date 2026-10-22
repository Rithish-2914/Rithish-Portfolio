"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, reveal } from "@/lib/gsap";
import { MORE_BUILDS, PROFILE, PROJECTS, type Project } from "@/lib/data";
import Module from "@/components/core/Module";

const [SPOTLIGHT, ...REST] = PROJECTS;

export default function Work() {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<Project | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  useGSAP(
    () => {
      reveal(".work-title-line", {
        yPercent: 110,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".work-title", start: "top 85%" },
      });
      gsap.fromTo(
        ".spot-frame",
        { rotateY: -14, rotateX: 6, y: 60 },
        {
          rotateY: 0,
          rotateX: 0,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: ".spot", start: "top bottom", end: "center center", scrub: true },
        },
      );
      gsap.fromTo(
        ".spot-float",
        { y: 120 },
        { y: -20, ease: "none", scrollTrigger: { trigger: ".spot", start: "top bottom", end: "bottom top", scrub: true } },
      );
      reveal(".work-row", {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: ".work-list", start: "top 85%" },
      });

      // The hover preview trails the cursor with a little lag and tilt.
      const el = preview.current!;
      gsap.set(el, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      const rTo = gsap.quickTo(el, "rotate", { duration: 0.8, ease: "power3" });
      let lastX = 0;
      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root },
  );

  useGSAP(() => {
    gsap.to(preview.current, {
      autoAlpha: hovered ? 1 : 0,
      scale: hovered ? 1 : 0.85,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [hovered]);

  const toggle = (slug: string) => setOpen((v) => (v === slug ? null : slug));

  return (
    <Module id="work" file="Work" index="03" label="Selected work">
      <div ref={root} className="px-[var(--gutter)] pb-28 pt-16 md:pt-24">
        <header className="work-title mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="xr-text font-wide text-[clamp(44px,8.5vw,140px)] font-black uppercase leading-[0.85] tracking-tight">
            <span className="block overflow-hidden">
              <span className="work-title-line block">Selected</span>
            </span>
            <span className="block overflow-hidden">
              <span className="work-title-line block">
                work<span className="xr-text accent-2 align-top text-[0.35em]">({String(PROJECTS.length).padStart(2, "0")})</span>
              </span>
            </span>
          </h2>
          <p className="xr-copy max-w-[38ch] text-[15px] leading-relaxed text-muted">
            Hackathon builds that kept going, products with real users, and a few experiments that taught me more than they
            should have.
          </p>
        </header>

        {/* Spotlight: the latest build */}
        <article className="spot theme-ink xr-box relative mb-20 grid overflow-hidden rounded-3xl border border-line-2 lg:grid-cols-12">
          <div className="xr-hide pointer-events-none absolute inset-0 blueprint-grid opacity-40 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />

          <div className="relative flex min-w-0 flex-col justify-between gap-8 p-6 md:p-10 lg:col-span-5">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-cyan px-3 py-1 mono-label font-semibold text-[#161513]">Latest</span>
                <span className="rounded-full border border-cyan/40 px-3 py-1 mono-label text-cyan">{SPOTLIGHT.year}</span>
              </div>
              <p className="mb-3 mono-label text-muted">{SPOTLIGHT.context}</p>
              <h3 className="xr-text font-wide text-[clamp(48px,6vw,96px)] font-black leading-[0.9] tracking-tight">{SPOTLIGHT.name}</h3>
              <p className="xr-copy mt-5 max-w-[34ch] text-[clamp(18px,1.6vw,22px)] font-medium leading-snug text-text">{SPOTLIGHT.hook}</p>
            </div>
            <div>
              <p className="xr-copy text-[14px] leading-relaxed text-muted">{SPOTLIGHT.body}</p>
              <Stack items={SPOTLIGHT.stack} />
              <Links p={SPOTLIGHT} />
            </div>
          </div>

          <div className="relative min-w-0 p-4 pb-16 md:p-8 md:pb-24 lg:col-span-7 lg:pl-0 [perspective:1600px]">
            <div className="spot-frame xr-box relative overflow-hidden rounded-xl border border-line-2 bg-bg shadow-[6px_6px_0_var(--cyan)] md:shadow-[12px_12px_0_var(--cyan)]">
              <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
                <span className="flex gap-1.5">
                  <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
                  <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
                  <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
                </span>
                <span className="flex-1 truncate rounded-md bg-surface px-3 py-1 text-center font-mono text-[11px] text-muted">
                  finbee · learn money skills, one island at a time
                </span>
              </div>
              <div className="relative aspect-[16/9]">
                <Image src={SPOTLIGHT.image!} alt={`${SPOTLIGHT.name}: the island learning map`} fill sizes="(max-width: 1024px) 95vw, 55vw" className="xr-media object-cover" />
              </div>
            </div>
            <div className="spot-float xr-box absolute bottom-4 left-0 w-[46%] overflow-hidden rounded-lg border-2 border-bg bg-bg shadow-[8px_8px_0_var(--blue)] md:bottom-8 md:-left-6">
              <div className="relative aspect-[16/9]">
                <Image src="/work/finbee-lesson.jpg" alt="A FinBee lesson with an interactive activity" fill sizes="30vw" className="xr-media object-cover" />
              </div>
            </div>
          </div>
        </article>

        {/* Index */}
        <div className="mb-4 hidden grid-cols-12 gap-4 px-2 mono-label text-dim md:grid">
          <span className="col-span-1">No.</span>
          <span className="col-span-6">Project</span>
          <span className="col-span-3">Type</span>
          <span className="col-span-2 text-right">Year</span>
        </div>
        <ul className="work-list border-t border-line" onPointerLeave={() => setHovered(null)}>
          {REST.map((p, i) => {
            const isOpen = open === p.slug;
            return (
              <li key={p.slug} className="work-row border-b border-line">
                <button
                  onClick={() => toggle(p.slug)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(p)}
                  aria-expanded={isOpen}
                  className="group relative grid w-full grid-cols-12 items-center gap-4 px-2 py-6 text-left md:py-8"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-blue transition-transform duration-500 group-hover:scale-y-100" />
                  <span className="relative col-span-2 mono-label text-blue transition-colors duration-500 group-hover:text-[#efe8d9] md:col-span-1">{String(i + 2).padStart(2, "0")}</span>
                  <span className="xr-text relative col-span-10 text-[clamp(24px,3.4vw,52px)] font-bold leading-none tracking-tight transition-[transform,color] duration-500 group-hover:translate-x-3 group-hover:text-[#efe8d9] md:col-span-6">
                    {p.name}
                  </span>
                  <span className="xr-copy relative col-span-8 col-start-3 text-[13px] text-muted transition-colors duration-500 group-hover:text-[#efe8d9] md:col-span-3 md:col-start-auto">{p.kind}</span>
                  <span className="relative col-span-2 flex items-center justify-end gap-3 font-mono text-[13px] text-muted transition-colors duration-500 group-hover:text-[#efe8d9]">
                    <span className="hidden md:inline">{p.year}</span>
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-full border border-line-2 text-text transition-all duration-500 group-hover:border-[#efe8d9] group-hover:text-[#efe8d9] ${
                        isOpen ? "rotate-45 border-blue text-blue" : ""
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  onTransitionEnd={() => ScrollTrigger.refresh()}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 px-2 pb-10 md:grid-cols-12">
                      <div className="md:col-span-5 md:col-start-2">
                        {p.context && <p className="mb-3 mono-label text-cyan">{p.context}</p>}
                        <p className="xr-copy text-[clamp(18px,1.6vw,22px)] font-medium leading-snug text-text">{p.hook}</p>
                        <p className="xr-copy mt-4 text-[14px] leading-relaxed text-muted">{p.body}</p>
                        <Stack items={p.stack} />
                        <Links p={p} />
                      </div>
                      <div className="md:col-span-5 md:col-start-8">
                        <Poster p={p} className="aspect-[16/10] rounded-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-20 grid gap-10 md:grid-cols-12">
          <h3 className="mono-label text-dim md:col-span-3">
            <span className="text-blue">+</span> Also built
          </h3>
          <ul className="md:col-span-9">
            {MORE_BUILDS.map((b) => (
              <li key={b.name} className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-12 sm:gap-4">
                <span className="xr-text font-semibold sm:col-span-4">{b.name}</span>
                <span className="xr-copy text-[14px] text-muted sm:col-span-5">{b.what}</span>
                <span className="font-mono text-[12px] text-dim sm:col-span-3 sm:text-right">{b.stack}</span>
              </li>
            ))}
            <li className="pt-6">
              <a href={PROFILE.socials[0].href} target="_blank" rel="noreferrer" className="mono-label text-cyan hover:underline">
                Everything else lives on GitHub ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Cursor-following preview (desktop, mouse only) */}
      <div ref={preview} className="pointer-events-none invisible fixed left-0 top-0 z-[65] hidden w-[340px] md:block">
        {hovered && <Poster p={hovered} className="aspect-[16/10] rounded-xl shadow-[8px_8px_0_var(--blue)]" />}
      </div>
    </Module>
  );
}

function Poster({ p, className = "" }: { p: Project; className?: string }) {
  if (p.image) {
    return (
      <div className={`xr-box relative overflow-hidden border border-line-2 bg-surface ${className}`}>
        <Image src={p.image} alt={`${p.name} screenshot`} fill sizes="(max-width: 768px) 90vw, 40vw" className="xr-media object-cover object-top" />
      </div>
    );
  }
  // No screenshot yet: a typographic card in the same visual language.
  return (
    <div
      className={`xr-box relative flex flex-col justify-between overflow-hidden border border-line-2 bg-surface p-5 blueprint-grid ${className}`}
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue" />
      <span className="relative mono-label text-cyan">{p.kind}</span>
      <span className="xr-text relative font-wide text-[clamp(26px,3vw,40px)] font-black leading-none">{p.name}</span>
      <span className="relative font-mono text-[11px] text-muted">{p.stack.join(" · ")}</span>
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {items.map((s) => (
        <li key={s} className="rounded-full border border-line-2 px-3 py-1 font-mono text-[11px] text-muted">
          {s}
        </li>
      ))}
    </ul>
  );
}

function Links({ p }: { p: Project }) {
  if (!p.live && !p.repo) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-5 mono-label">
      {p.live && (
        <a href={p.live} target="_blank" rel="noreferrer" className="text-cyan hover:underline">
          Live site ↗
        </a>
      )}
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer" className="text-text hover:text-cyan">
          Source ↗
        </a>
      )}
    </div>
  );
}
