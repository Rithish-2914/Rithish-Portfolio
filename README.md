# Bajjuri Rithish: portfolio

Next.js 16 · Tailwind v4 · GSAP + ScrollTrigger · Lenis smooth scroll.

## Run locally

```bash
npm install
cp .env.example .env.local   # then add your Gmail App Password
npm run dev
```

## Editing content

All copy (projects, changelog, stats, photos, socials) lives in `src/lib/data.ts`.
Images: `public/photos` (gallery), `public/work` (project screenshots), `public/resume.pdf`.
To add a screenshot to a project, drop it in `public/work/` and set `image: "/work/name.jpg"`.

## Source Mode

The `</> View source` tab (or the <kbd>`</kbd> key) shows the real code behind each section.
`scripts/gen-source.mjs` snapshots `src/components/sections/*.tsx` into `public/source.json`
before every `dev` and `build`, so the code shown is always the code that shipped.

## Contact form → Gmail

`src/app/api/contact/route.ts` sends mail through Gmail SMTP with Nodemailer.

1. Turn on 2-Step Verification on the Google account.
2. Create an App Password at https://myaccount.google.com/apppasswords.
3. Set these environment variables (in `.env.local`, and in Vercel → Settings → Environment Variables):
   - `GMAIL_USER`: the Gmail address
   - `GMAIL_APP_PASSWORD`: the 16-character app password
   - `CONTACT_TO` (optional): where to deliver; defaults to `GMAIL_USER`
   - `NEXT_PUBLIC_SITE_URL` (optional): your final domain, for social previews

## Deploy to Vercel

Push to GitHub, import the repo in Vercel (framework preset: Next.js), add the env vars above, deploy.
