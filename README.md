# I'm Thinking — Eunyu Studio site

The site for **Eunyu Studio**, an independent UX/UI design and frontend development practice in Bangkok.
It is positioned around solving problems rather than "building websites": every case study reads
problem → diagnosis → fix → result.

**Pages:** home, services, work (case studies), about, insights (blog), and contact with an enquiry form.
Below `md`, the home page folds every section into one scrolling page, and the nav shows only the wordmark.

## Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript, with `.tsx` and `.jsx` sources side by side
- **Styling:** Tailwind CSS v4, with design tokens and shared effects (glass, motion) in `src/styles/global.css`
- **Motion:** GSAP + ScrollTrigger with spring easing, and Lenis smooth scrolling on desktop only. See [Motion](#motion).
- **Content:** Markdown/MDX in `content/{work,blog}`, frontmatter validated with Zod (`src/lib/content.ts`)
- **Hosting:** Cloudflare Workers via `@opennextjs/cloudflare`

## Getting started

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run preview    # build with OpenNext and run it locally in workerd
npm run deploy     # build and deploy to Cloudflare
```

## Structure

```text
content/work/          case studies (.md / .mdx)
content/blog/          insights posts
public/work/<slug>/    case-study media: cover, screen recordings and posters
src/app/               routes, plus robots.txt / sitemap.xml route handlers and /api/contact
src/components/ui/     header, footer, WorkCard, ProjectOverview, AutoVideo, ContactForm, SectionIntro
src/components/motion/ Motion (GSAP + Lenis) and RouteTransition
src/components/mdx/    MDX renderer and its element styles
src/lib/               content loading, site constants, spring easing (motion.ts)
src/styles/global.css  Tailwind entry, tokens, glass and motion utilities
```

## Adding a case study

Create `content/work/<slug>.md`. The slug becomes `/work/<slug>`. Put media in `public/work/<slug>/`.

```yaml
---
title: Project name — one-line pitch
client: Project name
year: 2026
summary: One sentence; shown in the overview card.
problem: The problem in the user's words; shown on the work card.
tags: [UX/UI, Frontend]
url: https://live-site.example          # optional: "Visit live site" button
repo: https://github.com/you/repo       # optional: "View code on GitHub" button
cover: /work/<slug>/cover.jpg           # optional: still image for the card and the overview
stack: [Next.js, Tailwind CSS]          # optional
highlights:                             # optional: listed in the overview card
  - title: The thing that matters most
    body: One or two lines on why.
facts:                                  # optional: number strip under the overview
  - value: '26'
    label: house styles
videos:                                 # optional: "Inside the product" gallery
  - src: /work/<slug>/flow.mp4
    poster: /work/<slug>/flow.jpg
    title: Main flow
    caption: What this recording shows.
---

## The problem
## How we diagnosed it
## The fix
## The result
```

Bad frontmatter fails the build with a readable error. Keep screen recordings short, muted and H.264 MP4
(about 1280px wide). They only load and play while on screen, and stay on their poster under
`prefers-reduced-motion`.

## Motion

- **Reveals:** add `.reveal` to above-the-fold elements, which spring in on load, and `data-reveal` to anything
  further down, which springs in when scrolled to. Each one rises on a spring, fades in and un-blurs, then hands
  its styles back to the stylesheet so hover effects keep working.
- **Springs:** `src/lib/motion.ts` turns spring physics (stiffness/damping) into GSAP eases: `ENTER` has a
  little overshoot, `SOFT` has none.
- **Easing tokens:** `--ease-out` and `--ease-spring` in `global.css`, used by hovers, presses and transitions.
- **Utilities:** `.press` (squeeze on click), `.link-sweep` (underline sweep), `.btn-arrow` (arrow glides in).
- **Safety:** content is hidden before revealing only when JS runs and motion is allowed (`html.js-motion`);
  `prefers-reduced-motion` turns everything off.

## Notes

- The folder name contains an apostrophe (`I'm-Thinking`), which breaks Next.js' metadata-route loader,
  so `robots.txt` and `sitemap.xml` are plain route handlers.
- The contact form validates and redirects, but does not deliver enquiries yet (`src/app/api/contact/route.ts`).
- `site.url` in `src/lib/site.ts` is still a placeholder. Set it before deploying so canonical URLs and the
  sitemap are correct.

See [AGENTS.md](AGENTS.md) for more commands and project gotchas.
