"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { PROFILE } from "@/lib/data";
import { scrollToTarget, useLenis } from "./SmoothScroll";
import Clock from "./Clock";

const LINKS = [
  { href: "#top", label: "Index" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#opensource", label: "Open source" },
  { href: "#changelog", label: "Changelog" },
  { href: "#stage", label: "On stage" },
  { href: "#life", label: "Off the clock" },
  { href: "#toolbox", label: "Toolbox" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    if (open) {
      lenis?.stop();
      gsap.set(el, { visibility: "visible" });
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.inOut" });
      gsap.fromTo(
        el.querySelectorAll(".menu-item"),
        { yPercent: 110 },
        { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.04, delay: 0.25 },
      );
    } else {
      lenis?.start();
      gsap.to(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.55,
        ease: "expo.inOut",
        onComplete: () => void gsap.set(el, { visibility: "hidden" }),
      });
    }
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollToTarget(lenis, href === "#top" ? 0 : href), open ? 350 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-[var(--gutter)] py-4 transition-transform duration-500 ${
          hidden && !open ? "-translate-y-full" : ""
        }`}
      >
        <button onClick={() => go("#top")} data-cursor="hover" className="group flex items-center gap-3" aria-label="Back to top">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-text font-wide text-[13px] font-black text-bg transition-colors group-hover:bg-blue">
            BR
          </span>
          <span className="hidden mono-label text-muted sm:inline">Bajjuri Rithish</span>
        </button>

        <div className="hidden items-center gap-2 rounded-full border border-line-2 bg-bg/60 px-4 py-2 mono-label text-muted backdrop-blur-md md:flex">
          <span className="relative h-1.5 w-1.5 rounded-full bg-blue text-blue pulse-dot" />
          Open to projects &amp; talks
        </div>

        <div className="flex items-center gap-5">
          <span className="hidden mono-label text-muted sm:inline">
            HYD <Clock />
          </span>
          <button
            onClick={() => setOpen((v) => !v)}
            data-cursor="hover"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid h-10 w-10 place-items-center rounded-md border border-line-2 bg-bg/70 backdrop-blur-md transition-colors hover:border-blue"
          >
            <span className={`absolute h-px w-4 bg-text transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-px w-4 bg-text transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </header>

      <div ref={menu} className="theme-ink invisible fixed inset-0 z-[55] flex flex-col justify-between px-[var(--gutter)] pb-8 pt-24 blueprint-grid">
        <nav aria-label="Sections">
          <ul>
            {LINKS.map((l, i) => (
              <li key={l.href} className="overflow-hidden border-b border-line">
                <button
                  onClick={() => go(l.href)}
                  data-cursor="hover"
                  className="menu-item group flex w-full items-baseline gap-4 py-2 text-left md:py-3"
                >
                  <span className="mono-label text-blue">{String(i).padStart(2, "0")}</span>
                  <span className="font-wide text-[clamp(28px,5.5vw,72px)] font-black uppercase leading-[1.05] text-text transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-blue">
                    {l.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 mono-label text-muted">
          <a href={`mailto:${PROFILE.email}`} className="hover:text-blue">
            {PROFILE.email}
          </a>
          <div className="flex gap-6">
            {PROFILE.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-blue">
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
