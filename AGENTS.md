## Stack

Next.js (App Router) + TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis (desktop only),
MDX content read from `content/` and validated with Zod. Deployed to Cloudflare Workers via
`@opennextjs/cloudflare`.

Sources deliberately mix `.tsx` and `.jsx`: routes, data access, and anything typed live in `.tsx`/`.ts`;
plain presentational components may be `.jsx`. `allowJs` is on and `pageExtensions` covers both.

`src/components/` is grouped by purpose, not by page: `ui/` (SectionIntro, SiteHeader, SiteFooter),
`motion/` (Motion, RouteTransition), `mdx/` (Mdx). Add new components to the matching folder rather
than dropping them flat in `components/`.

## Development

```
npm run dev        # next dev
npm run build      # next build
npm run typecheck  # tsc --noEmit
npm run preview    # build with OpenNext + run in workerd locally
npm run deploy     # build + deploy to Cloudflare
npm run cf-typegen # regenerate cloudflare-env.d.ts from wrangler.jsonc
```

## Gotchas

- The project directory name contains an apostrophe (`I'm-Thinking`), which breaks Next.js'
  metadata-route loader. `robots.ts`/`sitemap.ts` conventions therefore cannot be used — the
  equivalents live at `src/app/robots.txt/route.ts` and `src/app/sitemap.xml/route.ts`.
- Astro View Transitions are replaced by `src/components/motion/RouteTransition.jsx` (a pathname-keyed
  CSS fade). GSAP/Lenis setup lives in `src/components/motion/Motion.tsx` and re-runs per navigation.
- Content frontmatter schemas are in `src/lib/content.ts`; a bad frontmatter fails the build.

## Documentation

- [App Router routing](https://nextjs.org/docs/app/building-your-application/routing)
- [Metadata & SEO](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [OpenNext for Cloudflare](https://opennext.js.org/cloudflare)
