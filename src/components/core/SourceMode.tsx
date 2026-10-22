"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { highlight } from "@/lib/highlight";

type SourceFile = { path: string; code: string; lines: number };
type SourceData = { lines: number; files: Record<string, SourceFile> };

type Ctx = { on: boolean; data: SourceData | null; toggle: () => void };
const SourceContext = createContext<Ctx>({ on: false, data: null, toggle: () => {} });
export const useSource = () => useContext(SourceContext);

export default function SourceModeProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const [data, setData] = useState<SourceData | null>(null);
  const sweep = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const onRef = useRef(false);

  const toggle = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    let next = data;
    if (!next) {
      try {
        next = (await fetch("/source.json").then((r) => r.json())) as SourceData;
        setData(next);
      } catch {
        busy.current = false;
        return;
      }
    }
    const flip = () => {
      onRef.current = !onRef.current;
      document.documentElement.dataset.source = onRef.current ? "on" : "off";
      setOn(onRef.current);
    };
    const el = sweep.current;
    if (!el) {
      flip();
      busy.current = false;
      return;
    }
    const html = document.documentElement;
    html.classList.add("source-anim");
    gsap
      .timeline({
        onComplete: () => {
          busy.current = false;
          html.classList.remove("source-anim");
        },
      })
      .set(el, { autoAlpha: 1, yPercent: -100 })
      .to(el, { yPercent: 0, duration: 0.45, ease: "power2.in" })
      .add(flip)
      .to(el, { yPercent: 100, duration: 0.55, ease: "power3.out" })
      .set(el, { autoAlpha: 0 });
  }, [data]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "`") toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const value = useMemo(() => ({ on, data, toggle }), [on, data, toggle]);

  return (
    <SourceContext.Provider value={value}>
      {children}
      {/* The scan bar that wipes the screen when switching modes */}
      <div
        ref={sweep}
        aria-hidden
        className="pointer-events-none invisible fixed inset-0 z-[80] border-b-[6px] border-blue"
        style={{ background: "var(--cyan)" }}
      />
      <SourceToggle />
      <SourceHud />
    </SourceContext.Provider>
  );
}

function SourceToggle() {
  const { on, toggle } = useSource();
  return (
    <button
      onClick={toggle}
      data-cursor="hover"
      aria-pressed={on}
      aria-label={on ? "Back to the designed site" : "View the source code behind each section"}
      className="group fixed bottom-4 left-4 z-[70] flex items-center gap-2 rounded-full border border-text bg-text px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bg transition-colors hover:bg-blue hover:border-blue md:bottom-auto md:left-0 md:top-1/2 md:-translate-y-1/2 md:rounded-l-none md:rounded-r-lg md:border-l-0 md:px-2.5 md:py-4 md:[writing-mode:vertical-rl]"
    >
      <span className="font-bold md:rotate-90">{"</>"}</span>
      <span className="md:rotate-180">{on ? "Back to UI" : "View source"}</span>
    </button>
  );
}

function SourceHud() {
  const { on, data } = useSource();
  if (!on || !data) return null;
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[70] hidden items-center gap-3 rounded-full border border-line-2 bg-bg/90 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted backdrop-blur-md sm:flex">
      <span className="relative h-1.5 w-1.5 rounded-full bg-blue text-blue pulse-dot" />
      <span className="text-blue">Source</span>
      <span className="text-dim">/</span>
      {Object.keys(data.files).length} modules
      <span className="text-dim">/</span>
      {data.lines.toLocaleString("en-IN")} lines
      <span className="text-dim">/</span>
      press <kbd className="text-text">`</kbd>
    </div>
  );
}

export function CodeLayer({ file }: { file: string }) {
  const { on, data } = useSource();
  const src = data?.files[file];
  const html = useMemo(() => {
    if (!src) return "";
    return src.code
      .split("\n")
      .map(
        (line, i) =>
          `<div class="break-inside-avoid-column"><span class="inline-block w-8 select-none pr-3 text-right text-dim/60">${i + 1}</span>${highlight(line) || " "}</div>`,
      )
      .join("");
  }, [src]);

  if (!on || !src) return null;
  return (
    <div aria-hidden className="code-layer pointer-events-none absolute inset-0 overflow-hidden px-[var(--gutter)] pt-16 pb-8">
      <div className="mb-3 font-mono text-[11px] text-blue">{src.path}</div>
      <pre
        className="columns-1 gap-10 whitespace-pre-wrap font-mono text-[11.5px] leading-[1.75] text-muted md:columns-2 xl:columns-3"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
