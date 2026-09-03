# I'm Thinking — Eunyu Studio site

Content-led studio site: services, case studies, insights, and an enquiry form.

- **Framework** — Next.js (App Router) + TypeScript, with `.jsx` and `.tsx` sources side by side
- **Styling** — Tailwind CSS v4
- **Animation** — GSAP + ScrollTrigger, Lenis smooth scroll on desktop only, both disabled under `prefers-reduced-motion`
- **Content** — MDX in `content/{work,blog}`, frontmatter validated with Zod
- **Hosting** — Cloudflare Workers via `@opennextjs/cloudflare`

## Getting started

```bash
npm install
npm run dev
```

## Structure

```
content/            MDX case studies and posts
src/app/            App Router routes (+ robots.txt / sitemap.xml route handlers)
src/components/     UI, motion, and MDX rendering
src/lib/            content loading + site constants
src/styles/         global.css (Tailwind entry + design tokens)
```

See [AGENTS.md](AGENTS.md) for commands and project gotchas.
