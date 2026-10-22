"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP, reveal } from "@/lib/gsap";
import { CERTIFICATIONS, RECORD, TOOLBOX } from "@/lib/data";
import Module from "@/components/core/Module";

export default function Toolbox() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(TOOLBOX[0].group);
  const [auto, setAuto] = useState(true);

  // Cycle through the groups until someone hovers one.
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setActive((g) => TOOLBOX[(TOOLBOX.findIndex((t) => t.group === g) + 1) % TOOLBOX.length].group);
    }, 2400);
    return () => clearInterval(id);
  }, [auto]);

  useGSAP(
    () => {
      reveal(".tool-reveal", {
        y: 50,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  const pick = (g: string) => {
    setAuto(false);
    setActive(g);
  };

  return (
    <Module id="toolbox" file="Toolbox" index="08" label="Toolbox" ink>
      <div ref={root} className="grid gap-12 px-[var(--gutter)] py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="tool-reveal xr-text font-wide text-[clamp(40px,5.5vw,92px)] font-black uppercase leading-[0.88] tracking-tight">
            The
            <br />
            toolbox
          </h2>
          <p className="tool-reveal xr-copy mt-6 max-w-[38ch] text-[15px] leading-relaxed text-muted">
            Whatever gets the product out the door. Hover a group to see where it sits in the manifest.
          </p>

          <div className="tool-reveal theme-ink xr-box mt-10 overflow-hidden rounded-2xl border border-line-2 shadow-[6px_6px_0_var(--blue)] md:shadow-[10px_10px_0_var(--blue)]">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="font-mono text-[12px] text-muted">package.json</span>
              <span className="flex gap-1.5">
                <i className="h-2.5 w-2.5 rounded-full bg-line-2" />
                <i className="h-2.5 w-2.5 rounded-full bg-line-2" />
                <i className="h-2.5 w-2.5 rounded-full bg-blue" />
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-[1.8] text-muted">
              <Line>{"{"}</Line>
              <Line indent={1}>
                <K>name</K>: <S>rithish</S>,
              </Line>
              <Line indent={1}>
                <K>version</K>: <S>18.8.0</S>,
              </Line>
              <Line indent={1}>
                <K>dependencies</K>: {"{"}
              </Line>
              {TOOLBOX.map((t, i) => (
                <div
                  key={t.group}
                  className={`-mx-4 border-l-2 px-4 transition-colors duration-300 ${
                    active === t.group ? "border-blue bg-blue/15" : "border-transparent"
                  }`}
                >
                  <Line indent={2}>
                    <K>{t.group}</K>: [<span className={active === t.group ? "text-text" : ""}>{t.items.length}</span> pkgs]
                    {i < TOOLBOX.length - 1 ? "," : ""}
                  </Line>
                </div>
              ))}
              <Line indent={1}>{"},"}</Line>
              <Line indent={1}>
                <K>scripts</K>: {"{ "}
                <K>dev</K>: <S>ship --until-it-works</S>
                {" },"}
              </Line>
              <Line indent={1}>
                <K>license</K>: <S>open-to-work</S>
              </Line>
              <Line>{"}"}</Line>
            </pre>
          </div>
        </div>

        <ul className="lg:col-span-7" onPointerLeave={() => setAuto(true)}>
          {TOOLBOX.map((t, i) => {
            const on = active === t.group;
            return (
              <li
                key={t.group}
                onPointerEnter={() => pick(t.group)}
                onFocus={() => pick(t.group)}
                tabIndex={0}
                className="tool-reveal group border-t border-line py-6 outline-none last:border-b"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3
                    className={`xr-text text-[clamp(22px,2.4vw,34px)] font-semibold tracking-tight transition-colors duration-300 ${
                      on ? "text-blue" : "text-text"
                    }`}
                  >
                    {t.label}
                  </h3>
                  <span className="font-mono text-[12px] text-dim">
                    0{i + 1} · {t.group}
                  </span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {t.items.map((s) => (
                    <li
                      key={s}
                      className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-all duration-300 ${
                        on ? "border-text bg-text text-bg" : "border-line-2 text-muted"
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className="lg:col-span-12 lg:mt-10">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h3 className="tool-reveal xr-text font-wide text-[clamp(28px,3vw,44px)] font-black uppercase leading-none tracking-tight">
              Certified
            </h3>
            <span className="mono-label text-muted">{CERTIFICATIONS.length} certifications</span>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-4">
            {CERTIFICATIONS.map((c) => {
              const body = (
                <>
                  <span className="font-mono text-[11px] text-dim">{c.date}</span>
                  <span className="xr-text mt-3 block text-[16px] font-semibold leading-snug tracking-tight">{c.name}</span>
                  <span className="xr-copy mt-1 block text-[13px] text-muted">{c.issuer}</span>
                  {c.image && <span className="mt-4 block mono-label text-cyan">View certificate ↗</span>}
                </>
              );
              return (
                <li key={c.name} className="tool-reveal bg-bg">
                  {c.image ? (
                    <a href={c.image} target="_blank" rel="noreferrer" className="block h-full p-5 transition-colors hover:bg-surface">
                      {body}
                    </a>
                  ) : (
                    <div className="h-full p-5">{body}</div>
                  )}
                </li>
              );
            })}
            <li className="tool-reveal bg-blue text-[#efe8d9]">
              <a href={RECORD.href} target="_blank" rel="noreferrer" className="block h-full p-5 transition-opacity hover:opacity-90">
                <span className="font-mono text-[11px] opacity-70">Sep 2025</span>
                <span className="xr-text mt-3 block text-[16px] font-semibold leading-snug tracking-tight">World record holder</span>
                <span className="mt-1 block text-[13px] opacity-80">{RECORD.org}</span>
                <span className="mt-4 block mono-label">View record ↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Module>
  );
}

function Line({ indent = 0, children }: { indent?: number; children: React.ReactNode }) {
  return <div style={{ paddingLeft: `${indent * 2}ch` }}>{children}</div>;
}
const K = ({ children }: { children: React.ReactNode }) => <span className="tok-a">&quot;{children}&quot;</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="tok-s">&quot;{children}&quot;</span>;
