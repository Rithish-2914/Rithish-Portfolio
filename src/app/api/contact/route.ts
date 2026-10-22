import nodemailer from "nodemailer";

// Sends contact-form messages to Gmail over SMTP.
// Needs GMAIL_USER and GMAIL_APP_PASSWORD (a Google App Password, not your real password).
// CONTACT_TO is optional and defaults to GMAIL_USER.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend it worked.
  if (typeof body.website === "string" && body.website.trim()) return Response.json({ ok: true });

  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const topic = String(body.topic ?? "General").trim().slice(0, 60);
  const message = String(body.message ?? "").trim().slice(0, 4000);

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return Response.json({ error: "Please add your name, a valid email and a few more words." }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return Response.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.error("contact: GMAIL_USER / GMAIL_APP_PASSWORD are not set");
    return Response.json({ error: "Mail isn't configured yet. Please email me directly." }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });

  try {
    await transporter.sendMail({
      from: `"Portfolio" <${user}>`,
      to: process.env.CONTACT_TO || user,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `[Portfolio] ${topic} · ${name}`,
      text: `${message}\n\n— ${name} <${email}>\nTopic: ${topic}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px">
          <p style="color:#0aa;font:12px monospace;letter-spacing:.12em;text-transform:uppercase">New message · ${esc(topic)}</p>
          <p style="white-space:pre-wrap;font-size:15px;line-height:1.6;color:#111">${esc(message)}</p>
          <hr style="border:none;border-top:1px solid #ddd"/>
          <p style="font-size:13px;color:#555">${esc(name)} · <a href="mailto:${esc(email)}">${esc(email)}</a></p>
        </div>`,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("contact: send failed", err);
    return Response.json({ error: "Couldn't send right now. Please email me directly." }, { status: 502 });
  }
}
