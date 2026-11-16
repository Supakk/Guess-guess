---
title: ClovedBuild — design your own house, room by room
client: ClovedBuild
year: 2026
summary: A free, in-browser house designer that turns "I can't picture it" into a plan, a 3D model and a rule check.
problem: People planning a home couldn't see it — or know if it was allowed — until they paid an architect.
tags: [UX/UI, Frontend, 3D]
url: https://cloved-build.vercel.app
repo: https://github.com/Supakk/ClovedBuild
cover: /work/clovedbuild/cover.jpg
stack: [Astro, React, Tailwind CSS, three.js, Motion]
highlights:
  - title: Every room, editable in 3D
    body: Open a floor, tap a room and change its type, floor finish, wall paint and furniture — size and cost update as you go.
  - title: Checked against Thai building law
    body: A score out of 100 against Ministerial Regulation No. 55, split into must-fix, check and tips.
  - title: 26 styles to start from
    body: Thai, Japanese, European and modern houses, each with beds, baths, area and an estimated price.
  - title: Plan and 3D, always in sync
    body: Every step switches between an architect-style drawing and a 3D model, in Thai or English.
facts:
  - value: '26'
    label: house styles
  - value: '5'
    label: guided steps
  - value: '13'
    label: room types
  - value: TH / EN
    label: interface
videos:
  - src: /work/clovedbuild/builder.mp4
    poster: /work/clovedbuild/builder.jpg
    title: House builder
    caption: Land, House, Rooms, Style, Check. Every step switches between an architect-style plan and 3D.
  - src: /work/clovedbuild/simulator.mp4
    poster: /work/clovedbuild/simulator.jpg
    title: Simulator
    caption: Place the house on its plot with furniture, trees, cars and people — rotate it, or flip to a top view.
---

## The problem

Most people planning a house in Thailand start with a rough idea and a plot size in *wah* — and nothing in between that and a paid architect's drawing. They can't picture how big a 3 × 4 m bedroom really is, whether a second storey fits the plot, or whether the layout they sketched is even allowed under the building rules. So the first real feedback arrives late, after money is already spent.

## How we diagnosed it

Existing tools fell into two camps: professional CAD that assumes you can already draw, and listing-style galleries of finished houses you can only look at. Neither lets a non-architect *try* an idea and see the consequence. The real gap wasn't a better picture of a house — it was a fast loop of **change something → see it → know if it's OK**, in the units and rules people actually deal with.

## The fix

ClovedBuild is a design tool, not a listing site. It breaks the job into five steps people can follow without training:

- **Land** — plot size in wah (1 wah = 2 m), where the house sits, and the setback lines drawn on a site plan.
- **House** — footprint, 1–3 storeys and 26 ready-made Thai, Japanese, European and modern styles to start from.
- **Rooms** — drag rooms onto the plan, resize them, place doors, windows, posts and furniture.
- **Style** — roof, wall finish, colours and how much glass.
- **Check** — the design is checked against Thai Ministerial Regulation No. 55, with plain-language advice: open space, distance of openings from the boundary, minimum bedroom size, ceiling height, stairs.

Every step can be viewed as an **architect-style plan or in 3D**, so the drawing and the picture never drift apart. A separate **simulator** puts the house on its plot with furniture, trees, cars and people at real scale.

Under the hood: Astro, React, Tailwind CSS and three.js, with spring animation (Motion) so dragging and switching views feels physical rather than jumpy. The interface works in English and Thai, and designs save in the browser — no account needed.

## The result

A free tool anyone can open in a browser and use to go from a plot size to a checked, 3D house design in one sitting — and arrive at an architect with a concrete brief instead of a vague idea. It's live at [cloved-build.vercel.app](https://cloved-build.vercel.app), and the code is on [GitHub](https://github.com/Supakk/ClovedBuild).
