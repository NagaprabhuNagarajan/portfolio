// ─────────────────────────────────────────────────────────────────────────────
//  SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT
//  Edit this file to update the site. Fields marked  // TODO  need your real data.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Nagaprabhu N",
  shortName: "Nagaprabhu",
  role: "Frontend Engineer",
  tagline: "Building scalable Web & Mobile Applications",
  location: "Madurai",
  email: "prabhumse14@gmail.com",
  github: "https://github.com/NagaprabhuNagarajan",
  githubUser: "NagaprabhuNagarajan",
  linkedin: "https://linkedin.com/in/nagaprabhu-nagarajan-0a19b1118",
  resume: "/resume.pdf",
  url: "https://portfolio-nagaprabhu.vercel.app", // deployed domain (for SEO/OG)
} as const;

// Rotating word chips under the hero name
export const heroStack = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Flutter",
  "React Native",
] as const;

export const about = {
  lead: "Frontend Engineer with 5+ years building enterprise web and cross-platform mobile applications.",
  body: "Specialized in React.js, Next.js, TypeScript, React Native and Flutter — scalable UI architecture, reusable component libraries, performance optimization, authentication and RBAC. Passionate about clean, maintainable code and AI-assisted development with Claude Code and ChatGPT.",
  stats: [
    { value: "5+", label: "Years of experience" },
    { value: "4", label: "Shipped products" },
    { value: "2", label: "Platforms — web & mobile" },
    { value: "20%", label: "Faster load times" },
  ],
};

// ── Skills ───────────────────────────────────────────────────────────────────
export type SkillGroup = {
  title: string;
  icon: "layout" | "smartphone" | "sparkles" | "server";
  level: number; // 1-5, drives the ★ meter
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: "layout",
    level: 5,
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Redux Toolkit",
      "React Query",
    ],
  },
  {
    title: "Mobile",
    icon: "smartphone",
    level: 5,
    items: ["Flutter", "React Native", "Dart", "GetX"],
  },
  {
    title: "AI-Assisted Dev",
    icon: "sparkles",
    level: 5,
    items: ["Claude Code", "ChatGPT", "Prompt Engineering"],
  },
  {
    title: "Backend & Tools",
    icon: "server",
    level: 4,
    items: ["REST APIs", "Firebase", "JWT", "RBAC", "NX Monorepo"],
  },
];

// ── Projects ───────────────────────────────────────────────────────────────────
// TODO: refine the copy and drop real screenshots into public/projects/<slug>-*.png
export type Project = {
  slug: string;
  name: string;
  tagline: string;
  featured?: boolean;
  year: string;
  problem: string;
  solution: string;
  tech: string[];
  challenges: string;
  architecture: string;
  // filenames relative to /public/projects, or [] to render a placeholder
  screenshots: string[];
};

export const projects: Project[] = [
  {
    slug: "ayphen",
    name: "Ayphen",
    tagline: "Enterprise accounting & ERP platform",
    featured: true,
    year: "2023 — Now",
    problem:
      "Finance teams needed a single, secure platform to run accounting and ERP workflows across an organization — with fine-grained access control and fast, data-heavy dashboards.",
    solution:
      "A responsive web accounting suite with role-based dashboards, secure JWT authentication and real-time financial analytics, built with React and Next.js inside an NX monorepo.",
    tech: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Shadcn UI",
      "Tailwind CSS",
      "Ant Design",
      "Redux Toolkit",
      "NX",
    ],
    challenges:
      "Rendering data-heavy financial dashboards and deeply nested forms without jank, while enforcing RBAC on every route.",
    architecture:
      "NX monorepo with reusable component libraries, Redux Toolkit + React Hook Form for complex forms, RBAC-guarded routes, and code-splitting/caching that cut load times by ~30%.",
    screenshots: ["ayphen.png"],
  },
  {
    slug: "gowalkies",
    name: "GoWalkies",
    tagline: "Two-sided dog-walking & pet-services marketplace",
    featured: true,
    year: "2022",
    problem:
      "Pet owners and walkers needed a trusted marketplace to connect, book, pay and track walks in real time — across two very different user experiences.",
    solution:
      "Twin React Native apps (Owner & Provider) sharing a common architecture, with social sign-in, an end-to-end booking lifecycle, Stripe payments and live GPS tracking during walks.",
    tech: ["React Native", "Firebase Auth", "Stripe", "FCM", "Branch.io"],
    challenges:
      "Battery-friendly real-time geolocation tracking, a reliable booking + payment lifecycle, and cleanly sharing code across two apps.",
    architecture:
      "Shared React Native architecture across the Owner & Provider apps, Firebase Auth (Google/Apple sign-in), Stripe payments, FCM push notifications and Branch.io deep-linked campaigns.",
    screenshots: [],
  },
  {
    slug: "dockket",
    name: "Dockket",
    tagline: "Secure document capture & accounting",
    featured: false,
    year: "2023",
    problem:
      "Organizations needed a secure, compliant way to scan, store and manage financial documents without slow manual data entry.",
    solution:
      "A Flutter app to scan, upload and organize financial documents with structured data capture and role-based access for compliance.",
    tech: ["Flutter", "Dart", "Firebase", "RBAC"],
    challenges:
      "Cutting manual document-entry time while keeping data secure and compliant.",
    architecture:
      "Flutter client with structured capture flows and RBAC for organizational security — reducing manual entry time by ~40%.",
    screenshots: [],
  },
  {
    slug: "smenu",
    name: "sMenu",
    tagline: "Cross-platform food-ordering app",
    featured: false,
    year: "2021",
    problem:
      "Restaurants needed a scalable ordering app that stays fast and low-latency even under heavy concurrent load.",
    solution:
      "A cross-platform Flutter food-ordering app with menu listings, cart, payment-gateway integration, real-time order tracking, coupons and multi-language support.",
    tech: ["Flutter", "Dart", "REST APIs", "Payments"],
    challenges:
      "Supporting 5k+ concurrent users with minimal latency through API and UI-rendering optimization.",
    architecture:
      "Flutter client with optimized API/UI rendering, real-time order tracking, a discount-coupon system and multi-language support.",
    screenshots: [],
  },
];

// ── Experience ───────────────────────────────────────────────────────────────
export type Job = {
  company: string;
  role: string;
  subtitle?: string;
  period: string;
  current?: boolean;
  summary: string;
  tech: string[];
};

export const experience: Job[] = [
  {
    company: "Ayphen Technologies",
    role: "Frontend Developer",
    subtitle: "Enterprise Accounting & ERP Platform",
    period: "Nov 2023 — Present",
    current: true,
    summary:
      "Build dynamic, scalable web apps with React and Next.js in an NX monorepo — reusable Shadcn/Tailwind component libraries, complex nested forms with Redux Toolkit & React Hook Form, RBAC-secured routes, and REST integrations that cut load times ~20%. Use Claude Code & ChatGPT to accelerate delivery while keeping quality high through manual review.",
    tech: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Shadcn UI",
      "Tailwind CSS",
      "Ant Design",
      "React Hook Form",
      "Redux",
      "NX",
    ],
  },
  {
    company: "Pirai Infotech Pvt Ltd",
    role: "Mobile Application Developer",
    subtitle: "Cross-platform mobile apps (iOS & Android)",
    period: "Feb 2021 — Oct 2023",
    summary:
      "Designed and shipped cross-platform Flutter apps to the App Store and Play Store — real-time Firebase sync, secure Firebase Auth/OAuth, push notifications and third-party API integrations, with GetX state management and optimization that reduced crashes and memory usage.",
    tech: ["Flutter", "Dart", "Firebase", "GetX", "REST APIs"],
  },
];

// ── AI Workflow ──────────────────────────────────────────────────────────────
export const aiWorkflow = {
  lead: "AI as part of my engineering workflow — not a replacement for engineering.",
  body: "I pair with AI across the whole loop: planning architecture, writing and reviewing code, debugging, and keeping docs and tests honest. The judgment stays mine; the leverage compounds.",
  steps: [
    {
      title: "Architecture Planning",
      icon: "compass",
      desc: "Explore trade-offs and pressure-test designs before writing code.",
    },
    {
      title: "Prompt Engineering",
      icon: "terminal",
      desc: "Precise, context-rich prompts that get production-grade output.",
    },
    {
      title: "Debugging",
      icon: "bug",
      desc: "Faster root-cause analysis with an AI pair to reason through failures.",
    },
    {
      title: "Code Review",
      icon: "git-pull-request",
      desc: "A second set of eyes on every diff for correctness and clarity.",
    },
    {
      title: "Documentation",
      icon: "file-text",
      desc: "Keep docs in sync with the code as it evolves.",
    },
    {
      title: "Testing",
      icon: "flask-conical",
      desc: "Generate and harden test cases around real edge conditions.",
    },
  ],
};

// ── Nav / sections ───────────────────────────────────────────────────────────
export const navSections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "ai", label: "AI Workflow" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
] as const;
