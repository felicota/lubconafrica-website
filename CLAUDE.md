# CLAUDE.md — LUBCON Africa Website

## Project Overview
A single-page marketing/product website for **LUBCON Africa** — a B2B industrial lubricants brand.
Built with React 19 + TypeScript + Vite, styled with Tailwind CSS v3 + shadcn/ui, animated with GSAP + ScrollTrigger.

**Framework:** Vite (not Next.js — no SSR, no file-based routing)
**Deployment:** Vercel (static build via `npm run build`)
**Local dev:** http://localhost:5173

---

## Zero-Cost First Policy

**Every feature, service, API, or third-party tool added to this project MUST be free at the tier we use.**
We build free-first and only introduce paid services when the free tier becomes a genuine bottleneck
(traffic, submissions, storage) — and only after discussing it explicitly.

### Approved Free-Tier Services
| Purpose | Service | Free Limit |
|---|---|---|
| Contact form delivery | [Web3Forms](https://web3forms.com) | 250 submissions/month |
| Contact form (higher volume) | [FormSubmit.co](https://formsubmit.co) | Unlimited, no signup |
| Analytics | Google Analytics 4 | Free forever |
| PDF/asset hosting | Cloudinary free tier | 25 GB bandwidth/month |
| Maps / stockist locator | Leaflet.js + OpenStreetMap | Free forever |
| Fonts | Google Fonts | Free forever |
| Deployment | Vercel Hobby | Free forever (static) |
| Search indexing | Google Search Console | Free forever |
| Images (stock) | Unsplash / Pexels (client provides real photos ideally) | Free |

### Never Add (paid-only or unnecessary cost)
- ❌ Sendgrid, Mailgun, Postmark (paid email APIs — use Web3Forms instead)
- ❌ Contentful, Sanity, Prismic (paid CMS — content stays in source files until volume justifies it)
- ❌ Algolia (paid search — not needed for a single-page site)
- ❌ Any paid map tile provider
- ❌ Any analytics service with a paid-only free trial

---

## Tech Stack
- **Framework:** React 19.2.0 + TypeScript 5.9
- **Build tool:** Vite 7.2
- **Styling:** Tailwind CSS 3.4 + shadcn/ui (Radix primitives) + `tw-animate-css`
- **Animation:** GSAP 3.14 + ScrollTrigger (registered globally in `App.tsx`)
- **Icons:** lucide-react
- **Forms:** react-hook-form + zod
- **Fonts:** Inter, Sora, IBM Plex Mono (Google Fonts via `index.css`)
- **Package manager:** npm

---

## Architecture

### Single-Page Structure
The site is a single scrollable page. All sections are rendered in order inside `src/App.tsx` — there is no router.

### Section Order (`src/App.tsx`)
1. `Navigation` — sticky top nav
2. `HeroSection` — headline, CTA, product card
3. `BuiltForAfricaSection`
4. `ProductCategoriesSection`
5. `FeaturedProductSection`
6. `CapabilitiesSection`
7. `InnovationSection`
8. `IndustrySolutionsSection`
9. `QualitySection`
10. `DistributionSection`
11. `ContactSection`
12. `Footer`

All section files live in `src/sections/`.

### GSAP Setup
- `gsap.registerPlugin(ScrollTrigger)` is called in `App.tsx` and again locally in each section that needs it.
- `App.tsx` sets up a global scroll-snap that snaps to pinned sections after a 500ms delay (to wait for all ScrollTriggers to register).
- Always call `ctx.revert()` inside the `useEffect` cleanup to kill GSAP contexts on unmount.

### Tailwind Theme
- Design tokens are CSS custom properties in `src/index.css` under `:root`.
- **Brand colours:** navy background (`--background: 216 55% 15%`), gold accent (`--primary: 43 65% 53%`).
- Custom utility classes (`.font-mono-label`, `.noise-overlay`, etc.) are defined in `@layer components` in `src/index.css`.
- `bg-navy` is a custom Tailwind colour alias defined in `tailwind.config.js`.

---

## Prioritised To-Do List

Items are ordered by business impact — what makes the site a real, working tool for LUBCON Africa.
All items use free-tier services only until explicitly upgraded.

### PHASE 1 — Make It Real (Content & Conversion)
> The site looks professional but contains placeholder data. Nothing converts until this is done.

- [ ] **1. Replace all placeholder contact details**
  Replace `+234 123 456 7890` and `info@lubconafrica.com` in `ContactSection.tsx` and `Footer.tsx`
  with real company phone, email, and physical address. Also update social media links in `Footer.tsx`.

- [ ] **2. Wire up the contact form (Web3Forms — free)**
  `ContactSection.tsx` currently shows a toast and discards the data.
  Integrate [Web3Forms](https://web3forms.com) (no backend needed — one API key, POST to their endpoint).
  Submissions arrive in the company inbox. 250/month free; upgrade to FormSubmit.co if volume exceeds that.

- [ ] **3. Add a floating WhatsApp CTA button**
  In Nigeria and across Africa, WhatsApp is the primary B2B channel.
  Add a fixed bottom-right `wa.me/+2348XXXXXXXXX` button (with the LUBCON Africa WhatsApp number).
  This single button will generate more direct leads than anything else on the page. Zero cost.

- [ ] **4. Replace placeholder product images with real photos**
  `/public/` already has the right image slots (`category_automotive.jpg`, `hero_machinery_bg.jpg`, etc.).
  Client to supply real product and facility photos. Drop replacements into `/public/` — no code change needed.

---

### PHASE 2 — Trust & Technical Credibility
> B2B lubricant buyers (fleet managers, procurement officers, plant engineers) need specs, not just marketing copy.

- [ ] **5. Add oil specification badges to each product card**
  Each product in `ProductCategoriesSection.tsx` needs its API classification, SAE/NLGI grade, and key
  application standard (e.g. API SN Plus, ACEA C3, SAE 40, NLGI 2). These live in the product data array
  — no backend needed, just add fields to the hardcoded objects.

- [ ] **6. Build a Product Detail modal (or expandable card)**
  Clicking "Learn more" on a product card should open a modal with:
  full product name, viscosity grades available, application list, key specifications, and a
  "Request TDS" (Technical Data Sheet) button. Modal uses the existing shadcn Dialog component.

- [ ] **7. Add downloadable TDS (Technical Data Sheet) PDFs**
  Host PDF datasheets on Cloudinary free tier or directly in `/public/`.
  Link them from the product modal. This is the #1 thing procurement officers ask for. Free.

- [ ] **8. Certifications / standards strip**
  Add a logo bar section (between QualitySection and DistributionSection) showing:
  ISO 9001, API certification marks, NAFDAC, SON (Standards Organisation of Nigeria), and any
  other approvals LUBCON Africa holds. Builds instant credibility. Content only — no cost.

---

### PHASE 3 — SEO & Discoverability
> A site no one can find via Google is invisible. These are all free.

- [ ] **9. Add SEO meta tags and Open Graph to `index.html`**
  Title, description, `og:title`, `og:description`, `og:image`, `og:url`, Twitter card tags.
  One-time edit in `index.html`. No library needed.

- [ ] **10. Add `robots.txt` and `sitemap.xml` to `/public/`**
  Both are static files — no build step required.
  Submit sitemap to Google Search Console (free) after Vercel deploy.

- [ ] **11. Install Google Analytics 4**
  Add GA4 script tag to `index.html`. Free forever. Lets us see which sections
  users engage with, where they drop off, and how many click "Request a quote".

- [ ] **12. Add structured data (JSON-LD) for local business**
  Paste a `<script type="application/ld+json">` LocalBusiness schema block into `index.html`.
  Improves how Google displays the business in search results. Free.

---

### PHASE 4 — Product Discovery & User Experience
> Help buyers find the right oil faster.

- [ ] **13. Oil / fluid selector wizard ("What's the right oil for me?")**
  A 3-step interactive tool: Choose equipment type → Choose environment/conditions → Get recommendation.
  Built entirely in React state — no backend. Lives in its own `OilSelectorSection.tsx` or as a modal.
  This is the highest-value UX feature for the lubricant industry (fleet managers use this constantly).

- [ ] **14. Distributor / stockist map (Leaflet.js + OpenStreetMap)**
  Replace the current `DistributionSection.tsx` static text with an interactive map
  showing distributor pin locations across Nigeria and West Africa.
  Uses [Leaflet.js](https://leafletjs.com) + free OpenStreetMap tiles — zero cost.
  Distributor data lives in a local JSON file.

- [ ] **15. Mobile responsiveness audit**
  Test every section on 375 px (iPhone SE), 390 px (iPhone 14), and 768 px (iPad).
  Fix any overflow, font-size, or layout issues. GSAP animations must not break on touch devices.

- [ ] **16. Product comparison table**
  Side-by-side table: pick 2–3 products, compare viscosity, application, spec grade, container sizes.
  Pure React state — no backend. Useful for fleet procurement decisions.

---

### PHASE 5 — Lead Nurturing & Growth (still free-tier)

- [ ] **17. Newsletter signup (EmailJS free tier)**
  A simple email capture in the footer or a sticky banner.
  [EmailJS](https://www.emailjs.com) free tier (200 emails/month) sends a welcome email automatically.
  Upgrade to Mailchimp free (500 contacts) when the list grows.

- [ ] **18. Blog / technical articles section**
  A static `src/data/articles.ts` array of posts (title, date, excerpt, slug, content).
  Renders as a simple card grid. No CMS needed — content is edited directly in the data file.
  Topics: oil change intervals, understanding API grades, hydraulic fluid selection guides.
  This drives organic search traffic from mechanics and fleet managers.

- [ ] **19. Favicon and PWA manifest**
  Add `favicon.ico`, `apple-touch-icon.png`, and `manifest.json` to `/public/`.
  Makes the site installable on mobile home screens and looks professional in browser tabs.

---

### PHASE 6 — Upgrade Decisions (only when free tier is insufficient)
> Do not start these until the free tier is actually a bottleneck.

- [ ] Quote-to-order workflow with a lightweight backend (Vercel Functions — still free up to 100GB-hrs/month)
- [ ] Inventory / product catalogue CMS (consider Notion API or Airtable free tier before paid CMS)
- [ ] WhatsApp Business API for automated quote follow-ups (Meta charges per conversation after free tier)
- [ ] Live chat support widget (Tawk.to is free forever with no message limits)

---

## Key File Locations

```
src/
  App.tsx               ← Root component, GSAP global setup, section order
  App.css               ← App-level styles
  index.css             ← Global styles, Tailwind directives, design tokens
  main.tsx              ← ReactDOM.createRoot entry point
  sections/             ← One file per page section
  components/
    ui/                 ← shadcn/ui component library (do not edit manually)
  hooks/                ← Custom React hooks
  lib/                  ← Utility functions (cn, etc.)
public/                 ← Static assets (images, PDFs, robots.txt, sitemap.xml)
index.html              ← Vite HTML entry — SEO tags go here
vite.config.ts          ← Vite config (alias @ → src/)
tailwind.config.js      ← Tailwind theme extension
```

---

## Local Development

```bash
# Start dev server (hot-reload)
npm run dev            # → http://localhost:5173

# Type-check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build          # output → dist/

# Preview production build locally
npm run preview
```

---

## Working Rules

### Things We Do
1. Edit section files in `src/sections/` — one section per file.
2. Use `gsap.context()` + `ctx.revert()` for all GSAP animations.
3. Use the `cn()` helper from `src/lib/utils.ts` for conditional Tailwind classes.
4. Use shadcn/ui primitives from `src/components/ui/` for interactive elements.
5. Test changes at localhost:5173 before pushing.
6. Pick the free-tier service first. Document the upgrade path in this file when limits are hit.

### Things We Avoid
1. Do not edit files in `src/components/ui/` directly — these are shadcn-managed.
2. Do not add a router (React Router, TanStack Router) unless explicitly requested.
3. Do not add any paid API, service, or SDK — free-tier only (see Zero-Cost First Policy above).
4. Do not upgrade to Tailwind v4 without checking shadcn/ui compatibility.
5. Do not use `cat >` to write files — always use the Write/Edit tools.
