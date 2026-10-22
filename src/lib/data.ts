// All site copy lives here so content edits never touch layout code.

export const PROFILE = {
  name: "Bajjuri Rithish",
  first: "RITHISH",
  last: "BAJJURI",
  age: 18,
  city: "Hyderabad",
  email: "bajjuririthish521@gmail.com",
  resume: "/resume.pdf",
  socials: [
    { label: "GitHub", handle: "Rithish-2914", href: "https://github.com/Rithish-2914" },
    { label: "LinkedIn", handle: "rithishbajjuri", href: "https://www.linkedin.com/in/rithishbajjuri/" },
    { label: "Instagram", handle: "@rithish.codes", href: "https://www.instagram.com/rithish.codes/" },
  ],
};

export const RECORD = {
  org: "International Book of Records",
  title: "Youngest to develop maximum startup-level business websites",
  date: "16 Sep 2025",
  age: "17 years, 7 months, 18 days",
  href: "https://www.internationalbookofrecords.com/records/youngest-to-develop-maximum-startup-level-business-websites/",
};

export const STATS = [
  { value: 1, suffix: "", label: "World record", note: "International Book of Records, 2025" },
  { value: 10, suffix: "+", label: "Production projects", note: "AI, EdTech, e-commerce, civic tech" },
  { value: 1000, suffix: "+", label: "Students mentored", note: "Full-stack & entrepreneurship" },
  { value: 10000, suffix: "+", label: "Bootcamp attendees", note: "Weekly AI bootcamps, cumulative" },
];

export type Project = {
  slug: string;
  name: string;
  year: string;
  kind: string;
  context?: string;
  hook: string;
  body: string;
  stack: string[];
  image?: string;
  live?: string;
  repo?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "finbee",
    name: "FinBee",
    year: "2026",
    kind: "EdTech · Fintech literacy",
    context: "Megathon '26 (10th edition) · Vanguard challenge",
    hook: "Teens get UPI before they get a single money lesson. FinBee fixes the order.",
    body:
      "A trilingual (English, Telugu, Hindi), offline-ready financial literacy platform for Grade 11–12 students. Twenty hands-on lessons across four floating islands, a 30-day month simulator full of fake scholarship SMS and OTP calls to dodge, and an educator dashboard NGOs can actually use.",
    stack: ["Next.js", "TypeScript", "MongoDB", "PWA", "i18n"],
    image: "/work/finbee.jpg",
    repo: "https://github.com/IIIT-ECell/megathon26-the-paradise",
  },
  {
    slug: "kmrl",
    name: "KMRL Document Assistant",
    year: "2025",
    kind: "AI · Government",
    context: "Smart India Hackathon 2025",
    hook: "Kochi Metro drowns in paperwork. This reads it, translates it and sends it to the right desk.",
    body:
      "A bilingual AI document management and routing system for Kochi Metro Rail Limited. Scanned documents go through OCR, get summarised, and are routed to the right department, with a live operations dashboard on top.",
    stack: ["Next.js", "TypeScript", "Google Vision API", "Real-time"],
    image: "/work/kmrl.jpg",
    live: "https://kmrl-sih-2025.vercel.app",
    repo: "https://github.com/Rithish-2914/KMRL-SIH2025",
  },
  {
    slug: "terrasense",
    name: "TerraSense",
    year: "2026",
    kind: "Climate · GIS",
    hook: "A digital twin of a city that sees the flash flood before the city does.",
    body:
      "A climate-adaptive urban digital twin that simulates flash-flood risk on interactive GIS maps and dispatches live emergency alerts over SMS and calls.",
    stack: ["React", "Python", "Flask", "Earth Engine", "Twilio"],
    image: "/work/terrasense.jpg",
    live: "https://terrasense-idp.vercel.app",
    repo: "https://github.com/Rithish-2914/TerraSense-IDP",
  },
  {
    slug: "papers",
    name: "CodeChef-VIT Papers",
    year: "2026",
    kind: "Open source · Education",
    context: "Core member, CodeChef-VIT",
    hook: "Every past exam paper at VIT, one search away.",
    body:
      "The portal VIT students use to find previous-year papers. As a CodeChef-VIT core member I've merged 9 PRs into it: the paper preview modal, PDF viewer fixes, faster downloads, a better catalogue, light mode and school info on every paper.",
    stack: ["Next.js", "Tailwind", "MongoDB"],
    image: "/work/papers.jpg",
    live: "https://papers.codechefvit.com",
    repo: "https://github.com/Rithish-2914/papers-codechef",
  },
  {
    slug: "medverse",
    name: "Medverse",
    year: "2026",
    kind: "Event platform",
    context: "MedTech Innovators Club, VIT Vellore",
    hook: "A hackathon where medicine students and engineers build in the same room.",
    body:
      "The site for a cross-domain medtech build event: tracks for CSE, IT, ECE, mechanical, biomedical, medicine and pharmacy teams, plus team registration and portals for participants, judges and organisers.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    image: "/work/medverse.jpg",
    live: "https://medverse-1-0.vercel.app",
    repo: "https://github.com/Rithish-2914/medverse-1.0",
  },
  {
    slug: "smartprep",
    name: "SmartPrep",
    year: "2025",
    kind: "AI · EdTech",
    hook: "Unlimited JEE and NEET practice papers that feel like the real thing.",
    body:
      "Generates JEE- and NEET-pattern practice papers with answer keys on demand, so students never run out of fresh questions in physics, chemistry, maths or biology.",
    stack: ["AI", "Next.js", "Exam engine"],
    image: "/work/smartprep.jpg",
    live: "https://smart-prep-papers.vercel.app",
    repo: "https://github.com/Rithish-2914/SmartPrep",
  },
  {
    slug: "deepwork",
    name: "DeepWork AI",
    year: "2025",
    kind: "AI agent",
    hook: "An AI that reads twenty sources before it answers you.",
    body:
      "A research agent that scans 15–20 trusted sources in real time, cross-checks the facts against each other and filters misinformation before it gives a verified answer.",
    stack: ["Python", "NLP", "Web scraping", "LLMs"],
    repo: "https://github.com/Rithish-2914/DEEPTECH-AI",
  },
  {
    slug: "gesturepod",
    name: "GesturePod",
    year: "2025",
    kind: "Computer vision",
    hook: "Send a message without touching anything.",
    body:
      "A touchless interface that uses real-time hand tracking to send text and images with gestures alone.",
    stack: ["Python", "OpenCV", "Computer vision"],
    repo: "https://github.com/Rithish-2914/GESTUREPOD",
  },
  {
    slug: "dripza",
    name: "Dripza",
    year: "2025",
    kind: "Founder · E-commerce",
    hook: "A clothing brand, launched solo. Store, stock and shipping included.",
    body:
      "I founded Dripza and built its e-commerce platform from scratch, then ran branding, inventory and the full product lifecycle myself.",
    stack: ["Next.js", "TypeScript", "Payments", "Branding"],
  },
];

export const MORE_BUILDS = [
  { name: "SwapHands", what: "Buy / sell / swap marketplace for hostellers", stack: "React · Node.js · MongoDB" },
  { name: "DevNotes", what: "Tech-stack notes used by 1,000+ students", stack: "React · Node.js" },
  { name: "AI Voice Assistant", what: "Real-time speech recognition assistant", stack: "Python · Speech" },
  { name: "KMRL Ops Dashboard", what: "Live operations analytics for Kochi Metro", stack: "React · TypeScript" },
];

// Versions are my age at the time: v17.7 means 17 years and 7 months.
export const CHANGELOG = [
  {
    version: "v14.2",
    date: "Apr 2022",
    type: "init",
    title: "Initial commit",
    body: "Picked up Python seriously. Earned Cisco PCAP, IBM Python for Data Science and Google's Digital Marketing certificates at 14.",
  },
  {
    version: "v15.x",
    date: "2023",
    type: "feat",
    title: "Got on stage",
    body: "Started speaking at colleges and hackathons and running weekly AI bootcamps. Today that's 1,000+ institutions and 10,000+ attendees.",
  },
  {
    version: "v17.4",
    date: "Jun 2025",
    type: "feat",
    title: "Founded Dripza",
    body: "Launched a clothing brand solo and built its whole e-commerce store from scratch.",
  },
  {
    version: "v17.7",
    date: "Sep 2025",
    type: "release",
    title: "World record",
    body: "International Book of Records: youngest to develop maximum startup-level business websites. Same month: KMRL Document Assistant at SIH 2025, web developer at Trinetra Games, and B.Tech IT at VIT Vellore.",
  },
  {
    version: "v17.10",
    date: "Dec 2025",
    type: "feat",
    title: "First internship",
    body: "Full-stack developer intern at Arqgene (remote). Shipped React and Node.js modules across frontend and backend.",
  },
  {
    version: "v18.0",
    date: "Jan 2026",
    type: "major",
    title: "Turned 18",
    body: "Became a core member of CodeChef-VIT and completed AWS's Solutions Architecture job simulation.",
  },
  {
    version: "v18.2",
    date: "Apr 2026",
    type: "feat",
    title: "First open-source merge",
    body: "Got my first PRs merged into CodeChef-VIT's Papers portal: a paper preview modal and a sidebar fix. Nine more followed.",
  },
  {
    version: "v18.7",
    date: "Sep 2026",
    type: "feat",
    title: "Cookoff 11.0",
    body: "Ten merged PRs in one week across the portal, admin console and Go backend of CodeChef-VIT's Cookoff 11.0 contest: code execution, markdown problems, leaderboard and analytics.",
  },
  {
    version: "v18.8",
    date: "Oct 2026",
    type: "feat",
    title: "FinBee at Megathon",
    body: "Built FinBee for the Vanguard challenge at Megathon's 10th edition, and TerraSense, a flood-risk digital twin.",
  },
];

export const STAGES = ["IIT Madras", "Christ University", "NIT Durgapur", "Hackathons", "Colleges across India", "International events", "AI Bootcamps"];

export const TOOLBOX = [
  { group: "languages", label: "What I think in", items: ["TypeScript", "Python", "JavaScript", "SQL", "HTML / CSS"] },
  { group: "frontend", label: "What I build with", items: ["React", "Next.js", "Tailwind", "GSAP", "Figma"] },
  { group: "backend", label: "What runs underneath", items: ["Node.js", "Express", "Django", "Flask", "REST APIs"] },
  { group: "data", label: "Where it lives", items: ["PostgreSQL", "MongoDB", "AWS", "Docker", "Git & GitHub", "Vercel"] },
  { group: "ai", label: "The new stuff", items: ["AI/ML integration", "LLM APIs", "AI prompting", "NLP", "Computer vision", "Automation"] },
  { group: "craft", label: "Off the keyboard", items: ["Public speaking", "Premiere Pro", "After Effects", "Photoshop", "Branding"] },
];

export const PHOTOS = [
  { src: "/photos/portrait.jpg", caption: "Somewhere above the trees", w: 1050, h: 1400 },
  { src: "/photos/build.jpg", caption: "Megathon, 10.10.2026", w: 832, h: 1334 },
  { src: "/photos/shore.jpg", caption: "Low tide, high clouds", w: 1254, h: 1254 },
  { src: "/photos/karting.jpg", caption: "Car #11", w: 960, h: 1280 },
  { src: "/photos/hills.jpg", caption: "Trail break", w: 1400, h: 1054 },
  { src: "/photos/dunk.jpg", caption: "Off-day hoops", w: 1050, h: 1400 },
  { src: "/photos/night.jpg", caption: "City lights", w: 1400, h: 988 },
  { src: "/photos/falls.jpg", caption: "Found a waterfall", w: 1050, h: 1400 },
  { src: "/photos/beach.jpg", caption: "Sunset, no wifi", w: 1050, h: 1400 },
  { src: "/photos/valley.jpg", caption: "Green on green", w: 1400, h: 1054 },
  { src: "/photos/dusk.jpg", caption: "Pink hour", w: 1400, h: 626 },
  { src: "/photos/hoop.jpg", caption: "Hang time", w: 900, h: 828 },
];

// Real pull requests, from github.com/pulls?q=author:Rithish-2914
type PR = { n: number; title: string; date: string; state: "merged" | "open" };
export const OPEN_SOURCE: { repo: string; what: string; prs: PR[] }[] = [
  {
    repo: "CodeChefVIT/papers-codechef",
    what: "Past-paper portal for VIT students",
    prs: [
      { n: 544, title: "fix: resolve bulk downloads, PostHog crash and missing-file UX", date: "Oct 2026", state: "open" },
      { n: 539, title: "fix: remove inline opacity from Reading Mode button", date: "Sep 2026", state: "merged" },
      { n: 533, title: "chore: remove completed Gravitas event banners and footer links", date: "Sep 2026", state: "merged" },
      { n: 532, title: "feat: floating, draggable syllabus mini-player overlay", date: "Sep 2026", state: "open" },
      { n: 528, title: "feat: add school information to papers", date: "Aug 2026", state: "merged" },
      { n: 527, title: "feat: improve catalogue and PDF viewer UX, light mode", date: "Aug 2026", state: "merged" },
      { n: 518, title: "fix: PDF viewer, faster downloads, sidebar, reusable announcements", date: "Jul 2026", state: "merged" },
      { n: 517, title: "fix: sidebar, scroll and PDF viewer issues", date: "Jul 2026", state: "merged" },
      { n: 502, title: "fix: correct PDF viewer page count and input handling", date: "Apr 2026", state: "merged" },
      { n: 488, title: "feat: paper preview modal on eye-icon click", date: "Apr 2026", state: "merged" },
      { n: 487, title: "fix: sidebar accordion not collapsing", date: "Apr 2026", state: "merged" },
    ],
  },
  {
    repo: "CodeChefVIT/cookoff-admin-11.0",
    what: "Admin console for the Cookoff 11.0 contest",
    prs: [
      { n: 31, title: "refactor: consolidate dependencies and expand test coverage", date: "Sep 2026", state: "merged" },
      { n: 29, title: "feat(admin): portal hardening, bulk upgrade API, full test suite", date: "Sep 2026", state: "merged" },
      { n: 23, title: "fix(analytics): align dashboard with backend DTO", date: "Sep 2026", state: "merged" },
      { n: 20, title: "fix(leaderboard): API parsing and podium rankings", date: "Sep 2026", state: "merged" },
      { n: 13, title: "fix(users): user management API parsing and field mapping", date: "Sep 2026", state: "merged" },
    ],
  },
  {
    repo: "CodeChefVIT/cookoff-portal-11.0",
    what: "Contestant portal for Cookoff 11.0",
    prs: [
      { n: 71, title: "fix(compiler-output): show stdout and compiler diagnostics in rounds 2 & 3", date: "Sep 2026", state: "merged" },
      { n: 61, title: "feat(portal): Cookoff 11 branding, profile logout, metadata", date: "Sep 2026", state: "merged" },
      { n: 60, title: "fix(problem-panel): render markdown in statements and constraints", date: "Sep 2026", state: "merged" },
      { n: 46, title: "feat: wire up Run Code and custom input execution", date: "Sep 2026", state: "merged" },
    ],
  },
  {
    repo: "CodeChefVIT/cookoff-11.0-be",
    what: "Go backend for Cookoff 11.0",
    prs: [{ n: 86, title: "feat(dashboard): return questions with attempt status", date: "Sep 2026", state: "merged" }],
  },
];

export const CERTIFICATIONS = [
  { name: "AWS Solutions Architecture Job Simulation", issuer: "Forage", date: "Jan 2026" },
  { name: "PCAP: Programming Essentials in Python", issuer: "Cisco Networking Academy", date: "Apr 2022", image: "/certificates/python-pcap.png" },
  { name: "Python for Data Science", issuer: "IBM Cognitive Class", date: "Apr 2022", image: "/certificates/ibm-python-data-science.png" },
  { name: "MOS: PowerPoint (77-729)", issuer: "Infosys", date: "Apr 2022" },
  { name: "Fundamentals of Digital Marketing", issuer: "Google Digital Garage", date: "Apr 2022", image: "/certificates/google-digital-marketing.png" },
  { name: "Python 101 for Data Science", issuer: "IBM", date: "Jan 2022" },
  { name: "Google IT Automation with Python", issuer: "Itronix Solution", date: "Jan 2022" },
];
