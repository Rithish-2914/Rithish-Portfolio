"use client";

import { useRef, useState } from "react";
import { useGSAP, reveal } from "@/lib/gsap";
import { PROFILE } from "@/lib/data";
import Module from "@/components/core/Module";

const TOPICS = ["Website", "Web app", "AI tool", "Talk / workshop", "Collab", "Something else"];
type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useGSAP(
    () => {
      reveal(".contact-line", {
        yPercent: 110,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
      reveal(".contact-form", {
        y: 60,
        autoAlpha: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".contact-form", start: "top 85%" },
      });
    },
    { scope: root },
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, topic }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <Module id="contact" file="Contact" index="09" label="Contact">
      <div ref={root} className="grid gap-14 px-[var(--gutter)] py-24 md:py-32 lg:grid-cols-12">
        <h2 className="xr-text font-wide text-[clamp(40px,8vw,136px)] font-black uppercase leading-[0.86] tracking-tight lg:col-span-12">
          <span className="block overflow-hidden">
            <span className="contact-line block">Let&apos;s build</span>
          </span>
          <span className="block overflow-hidden">
            <span className="contact-line xr-text accent-2 inline-block">something.</span>
          </span>
        </h2>
        <div className="lg:col-span-5">
          <p className="xr-copy max-w-[40ch] text-[15px] leading-relaxed text-muted">
            A product, a hackathon team, a talk at your college, or just a good problem. Tell me about it and I&apos;ll get
            back to you, usually within a day.
          </p>

          <ul className="mt-10 border-t border-line">
            <ContactRow label="Email" value={PROFILE.email} href={`mailto:${PROFILE.email}`} />
            {PROFILE.socials.map((s) => (
              <ContactRow key={s.label} label={s.label} value={s.handle} href={s.href} />
            ))}
            <ContactRow label="Resume" value="The one-page version" href={PROFILE.resume} />
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="contact-form xr-box relative self-start rounded-3xl border border-text bg-surface shadow-[6px_6px_0_var(--cyan)] md:shadow-[12px_12px_0_var(--cyan)] lg:col-span-7"
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <span className="font-mono text-[12px] text-muted">
              <span className="text-blue">~/inbox</span> $ new-message
            </span>
            <span className="font-mono text-[11px] text-dim">→ {PROFILE.email.split("@")[0]}@gmail</span>
          </div>

          <div className="grid gap-8 p-6 md:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Field name="name" label="Your name" placeholder="Ada Lovelace" autoComplete="name" />
              <Field name="email" type="email" label="Email" placeholder="you@company.com" autoComplete="email" />
            </div>

            <fieldset>
              <legend className="mb-3 mono-label text-dim">What&apos;s it about?</legend>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTopic(t)}
                    aria-pressed={topic === t}
                    className={`rounded-full border px-4 py-2 text-[13px] transition-all duration-300 ${
                      topic === t ? "border-text bg-text text-bg" : "border-line-2 text-muted hover:border-text hover:text-text"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="mono-label text-dim">The idea</span>
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={4000}
                rows={5}
                placeholder="What are we building, and by when?"
                className="mt-2 w-full resize-none border-b border-line-2 bg-transparent py-3 text-[16px] text-text outline-none transition-colors placeholder:text-dim focus:border-cyan"
              />
            </label>

            {/* honeypot: real people never see or fill this */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p aria-live="polite" className={`font-mono text-[12px] ${status === "error" ? "text-blue" : "text-muted"}`}>
                {status === "sent" && <span className="text-cyan">✓ Delivered. Talk soon.</span>}
                {status === "error" && error}
                {status === "sending" && "Sending…"}
                {status === "idle" && "Goes straight to my inbox."}
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group flex items-center gap-3 rounded-full bg-blue px-7 py-4 text-[15px] font-semibold text-[#efe8d9] transition-colors hover:bg-text hover:text-bg disabled:opacity-60"
              >
                {status === "sending" ? "Sending" : "Send it"}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Module>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mono-label text-dim">{label}</span>
      <input
        required
        maxLength={200}
        {...props}
        className="mt-2 w-full border-b border-line-2 bg-transparent py-3 text-[16px] text-text outline-none transition-colors placeholder:text-dim focus:border-cyan"
      />
    </label>
  );
}

function ContactRow({ label, value, href }: { label: string; value: string; href: string }) {
  const external = href.startsWith("http") || href.endsWith(".pdf");
  return (
    <li className="border-b border-line">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="group flex items-center justify-between gap-4 py-4"
      >
        <span className="mono-label text-dim">{label}</span>
        <span className="xr-copy flex items-center gap-2 text-[15px] text-text transition-colors group-hover:text-cyan">
          {value}
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        </span>
      </a>
    </li>
  );
}
