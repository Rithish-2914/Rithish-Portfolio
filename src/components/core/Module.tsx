"use client";

import { CodeLayer, useSource } from "./SourceMode";

type Props = {
  id: string;
  file: string;
  index: string;
  label: string;
  className?: string;
  ink?: boolean;
  children: React.ReactNode;
};

// Every section is a "module": framed with registration marks, labelled with its index,
// and backed by its own source file when Source Mode is on.
export default function Module({ id, file, index, label, className = "", ink = false, children }: Props) {
  const { data } = useSource();
  const lines = data?.files[file]?.lines;
  return (
    <section id={id} data-module={file} className={`relative border-t border-line bg-bg text-text ${ink ? "theme-ink" : ""} ${className}`}>
      <span className="reg -top-[6px] left-[calc(var(--gutter)-6px)]" />
      <span className="reg -top-[6px] right-[calc(var(--gutter)-6px)]" />
      <CodeLayer file={file} />
      <div className="relative z-10 flex items-center justify-between px-[var(--gutter)] pt-6 mono-label text-dim">
        <span>
          <span className="text-blue">{index}</span>
          <span className="mx-2">{"//"}</span>
          {label}
        </span>
        <span className="hidden normal-case tracking-[0.06em] sm:inline">
          {file}.tsx{lines ? ` · ${lines} lines` : ""}
        </span>
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
