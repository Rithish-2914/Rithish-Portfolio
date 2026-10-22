"use client";

import { useRef, useState } from "react";
import { useGSAP, reveal } from "@/lib/gsap";
import { OPEN_SOURCE } from "@/lib/data";
import Module from "@/components/core/Module";

const merged = OPEN_SOURCE.flatMap((r) => r.prs).filter((p) => p.state === "merged").length;
const open = OPEN_SOURCE.flatMap((r) => r.prs).filter((p) => p.state === "open").length;

const SUMMARY = [
  { k: String(merged), v: "PRs merged" },
  { k: String(OPEN_SOURCE.length), v: "CodeChef-VIT repos" },
  { k: String(open), v: "In review" },
];

export default function OpenSource() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const repo = OPEN_SOURCE[active];

  useGSAP(
    () => {
      reveal(".oss-reveal", {
        y: 50,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  // Fade the PR list in each time the repo changes.
  useGSAP(
    () => {
      reveal(".oss-pr", { x: 20, autoAlpha: 0, duration: 0.5, ease: "power3.out", stagger: 0.035 });
    },
    { scope: root, dependencies: [active] },
  );

  return (
    <Module id="opensource" file="OpenSource" index="04" label="Open source" ink>
      <div ref={root} className="px-[var(--gutter)] py-24 md:py-32">
        <div className="mb-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="oss-reveal xr-text font-wide text-[clamp(40px,6.5vw,110px)] font-black uppercase leading-[0.88] tracking-tight">
              Open
              <br />
              <span className="xr-text accent">source</span>
            </h2>
            <p className="oss-reveal xr-copy mt-6 max-w-[46ch] text-[15px] leading-relaxed text-muted">
              Code I&apos;ve shipped into other people&apos;s products. Most of it lands in CodeChef-VIT&apos;s projects,
              used by thousands of VIT students and every Cookoff contestant.
            </p>
          </div>
          <dl className="oss-reveal grid grid-cols-3 border-t border-line-2 lg:col-span-5">
            {SUMMARY.map((s) => (
              <div key={s.v} className="border-r border-line-2 pr-4 pt-5 last:border-r-0 [&:not(:first-child)]:pl-4">
                <dt className="xr-text font-wide text-[clamp(40px,4.5vw,72px)] font-black leading-none">{s.k}</dt>
                <dd className="mt-2 mono-label text-muted">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="oss-reveal grid gap-6 lg:grid-cols-12">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0" role="tablist">
            {OPEN_SOURCE.map((r, i) => {
              const on = i === active;
              const m = r.prs.filter((p) => p.state === "merged").length;
              return (
                <button
                  key={r.repo}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  className={`xr-box shrink-0 rounded-xl border px-4 py-4 text-left transition-colors duration-300 ${
                    on ? "border-cyan bg-cyan text-[#161513]" : "border-line-2 text-text hover:border-text"
                  }`}
                >
                  <span className="block font-mono text-[11px] opacity-60">CodeChefVIT /</span>
                  <span className="block text-[17px] font-semibold tracking-tight">{r.repo.split("/")[1]}</span>
                  <span className={`mt-1 block font-mono text-[11px] ${on ? "" : "text-muted"}`}>
                    {m} merged{r.prs.length > m ? ` · ${r.prs.length - m} open` : ""}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="xr-box rounded-2xl border border-line-2 bg-surface lg:col-span-8" role="tabpanel">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4">
              <a
                href={`https://github.com/${repo.repo}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[13px] text-text hover:text-cyan"
              >
                {repo.repo} ↗
              </a>
              <span className="xr-copy text-[13px] text-muted">{repo.what}</span>
            </div>
            <ul>
              {repo.prs.map((pr) => (
                <li key={pr.n} className="oss-pr border-b border-line last:border-b-0">
                  <a
                    href={`https://github.com/${repo.repo}/pull/${pr.n}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3.5 transition-colors hover:bg-bg"
                  >
                    <span className="font-mono text-[12px] text-dim">#{pr.n}</span>
                    <span className="xr-copy min-w-0 text-[14px] leading-snug text-text group-hover:text-cyan">{pr.title}</span>
                    <span className="flex items-center gap-3">
                      <span className="hidden font-mono text-[11px] text-dim sm:inline">{pr.date}</span>
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                          pr.state === "merged" ? "bg-blue text-[#efe8d9]" : "border border-line-2 text-muted"
                        }`}
                      >
                        {pr.state}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Module>
  );
}
