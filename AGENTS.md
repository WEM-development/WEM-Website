# WEM Website – Agent Guide

Rules for any agent or contributor working on this repository. Follow them exactly; when a rule conflicts with a generic best practice, the rule wins.

## 1. Scope

This repository contains only the public company website. Management, invoicing and the typewriter live in a separate repository – do not add them back here.

The design system below applies to every file:

- `src/app/page.tsx`, `src/app/products/**`, `src/app/references/**`, `src/app/about/**`
- `src/components/layout/**`, `src/components/common/**`
- `src/config/company.ts`, `src/config/services.ts`, `src/config/projects.ts`

Change these only when explicitly asked:

- `src/app/hero.ts` – HeroUI plugin; keep the default theme, brand colors come from `@theme` tokens
- `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png` – generated from `public/WEM.svg`

## 2. Brand tokens

Taken from the logo (`public/WEM.svg`). Defined with `@theme` in `src/app/globals.css`.

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#0a0a0a` | Text, dark bands (contact band, footer), secondary buttons |
| `brand` | `#fdc746` | Primary button, triangle mark, active nav marker, slider progress, focus ring |
| `brand-strong` | `#fdb817` | Hover state of `brand` only |
| `steel` | `#929292` | Decorative only (large numerals, marks on dark) |
| `paper` | `#ffffff` | Default section background |
| `mist` | `#f5f5f5` | Alternating section background |

Rules:

- Use tokens (`bg-brand`, `text-ink`) – never hex literals like `bg-[#fdc746]`.
- Greys come from `neutral-*` only. Never `gray-*`, `slate-*`, `zinc-*` (they are tinted; the logo grey is neutral).
- `brand` is never used for text on light backgrounds (contrast 1.6:1). On `ink` it may be used for small accents.
- Secondary text on light backgrounds: `text-neutral-600` (body) or `text-neutral-500` (labels). On `ink`: `text-neutral-400`.
- No HeroUI semantic colors (`primary`, `secondary`, blue defaults).
- Brand motif: the left-pointing yellow triangle from the logo – `BrandMark`. It is the only decorative element allowed.

## 3. Typography

Font: Geist Sans (already loaded in `src/config/fonts.ts`).

| Role | Classes |
| --- | --- |
| H1 | `text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]` |
| H2 | `text-3xl md:text-4xl font-bold tracking-tight` |
| H3 | `text-xl font-semibold tracking-tight` |
| Lead | `text-lg leading-relaxed text-neutral-600 max-w-2xl` |
| Body | `text-base md:text-lg leading-relaxed` |
| Eyebrow | `text-xs font-semibold uppercase tracking-[0.2em]` |
| Numerals (01, 02…) | `text-sm font-semibold tabular-nums text-neutral-400` |

- Uppercase is reserved for eyebrows and navigation links.
- Phone numbers, counters and indices use `tabular-nums`; phones also `whitespace-nowrap`.
- Use `SectionHeading` instead of hand-writing heading blocks.

## 4. Layout and spacing

- Container: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8` – provided by `Section`.
- Section rhythm: `py-20 md:py-28` – provided by `Section`.
- Gaps: `gap-8` for card grids, `gap-12` for column layouts; vertical grid gaps `gap-y-12`/`gap-y-14`.
- Left-aligned by default. Center only short CTA content.
- Alternate `paper` and `mist` between sections. `ink` only for `ContactBand` and footer.
- Every page: `<div data-site className="min-h-screen bg-paper text-ink">` → `Navigation` → sections → `ContactBand` → `Footer`.
- Anchored sections rely on `scroll-mt-20` (built into `Section`) to clear the sticky navbar.

## 5. Shape, depth, borders

- Radius: `rounded-sm` (4px) for images, sliders and buttons. Nothing larger (`rounded-lg`, `xl`, `2xl`, `full`) on containers.
- No shadows. No borders. No outlines as decoration. Separation comes from background tone and whitespace.
- No card chrome around content – images and text sit directly on the section background.

## 6. Components and interaction

Shared primitives live in `src/components/common/`:

| Component | Purpose |
| --- | --- |
| `Section` | Section wrapper with `tone` (`paper` / `mist` / `ink`), container and rhythm; `isPageIntro` for the first section under the navbar |
| `SectionHeading` | Eyebrow + title (`h1`/`h2`) + optional lead |
| `BrandMark` | Yellow triangle from the logo |
| `ButtonLink` | Link styled as a button (`primary` / `secondary` / `inverse`) |
| `ServiceCard` | Image card linking to a service |
| `ImageSlider` | Photo slider with counter, arrows, keyboard and swipe |
| `Reveal` | Subtle scroll-in animation |
| `ContactBand` | Dark contact CTA at the end of every page |

Rules:

- Buttons: `primary` = `bg-brand text-ink`, `secondary` = `bg-ink text-white`, `inverse` = `bg-white text-ink`. Height `h-12` (`h-10` small). At most one `primary` per viewport.
- Text links: `text-ink` with `hover:underline underline-offset-4`, optional `→`. Never turn links yellow on hover.
- Links use `next/link`. HeroUI is used for structural widgets (`Navbar`). If a HeroUI `Button` is needed, pass `radius="none"`, `disableRipple` and `className="rounded-sm"`.
- Focus: handled globally for `[data-site]` in `globals.css` (ink ring + yellow outline). Never remove it with `outline-none`.
- Content data (contacts, owners, links, services, projects) comes from `src/config/company.ts`, `src/config/services.ts` and `src/config/projects.ts`. Do not duplicate it in pages.

## 7. Motion

- Only `Reveal` (opacity + 16px rise, 0.5s, `easeOut`, once) and image hover zoom (`group-hover:scale-[1.03]`, 500ms).
- Respect `prefers-reduced-motion` (`Reveal` uses `MotionConfig reducedMotion="user"`).
- Never animate the hero/LCP image or text above the fold.
- No parallax, no staggered cascades longer than 3 items, no looping animations.

## 8. Images

- Always `next/image` with `fill` inside an aspect-ratio wrapper (`aspect-video`, `aspect-[4/3]`), `object-cover`, explicit `sizes`.
- `priority` only on the hero image.
- Placeholder background while loading: `bg-neutral-200`.
- Alt text in Czech, describing the content.
- New photos: WebP in `public/assets/<topic>/NN.webp`, generated with:

  ```sh
  magick "$SRC" -auto-orient -resize '1600x1600>' -strip -quality 70 "$OUT.webp"
  ```

  `-auto-orient` before `-strip` is mandatory (iPhone photos otherwise rotate). `-strip` also removes GPS data.
- Raw originals stay in `assets/` and are never referenced from code.

## 9. Copy (Czech)

- Factual, short sentences. Describe what is done, with what, for whom.
- Never invent facts: no years, counts, certifications, clients or guarantees that are not already on the site.
- No superlatives or filler: „špičkový“, „inovativní řešení“, „Vítejte“, „jsme lídr“, „na míru vašim potřebám“, „kvalita na prvním místě“.
- No exclamation marks, no emoji.
- Typography: non-breaking space after one-letter words (`v`, `k`, `s`, `z`, `o`, `u`, `a`, `i`) – `&nbsp;` in JSX, `\u00a0` in strings. Spaced en dash ` – `. Czech quotes „…“. Phones as `+420 773 266 677`.

## 10. Banned patterns ("generated look")

- Glassmorphism (`backdrop-blur` cards, `bg-white/10` panels)
- Gradient or radial blobs, colored glows (`shadow-[#fdc746]/50`), drop shadows on text
- `border-2` hover borders, outlined cards, `shadow-*` on cards
- Decorative divider bars (`w-24 h-1 bg-…`) – use the eyebrow + `BrandMark`
- Everything centered, uppercase H2s
- Dot pagination for long galleries – use the counter
- Placeholder or dead links (`href="#"`)
- Icon packs, stock illustrations, emoji

## 11. Code style

Match the existing code exactly:

- `"use client"` at the top of files that use hooks, HeroUI or framer-motion.
- Default-exported function components, PascalCase; file name equals component name.
- Props typed with an `interface XProps` directly above the component; defaults in destructuring (`{ width = 72 }`).
- 2-space indentation, double quotes, semicolons.
- Imports via `@/`; order: `react` / `next` → `@heroui/*` → `framer-motion` → `@/components` → `@/config`.
- Static data as module-level `const` arrays/objects above the component (`const workshopImages = [...]`).
- Section comments in JSX: `{/* Section Name */}`.
- Tailwind utilities inline; variant maps as `const xClasses: Record<Variant, string>`. No CSS modules, no new dependencies.
- Site content lives in `src/config/`; no backend, database or environment variables.
- Comments only for what the code cannot say, one short line.

## 12. Definition of done

1. `npx tsc --noEmit`, `npm run lint`, `npm run build` pass.
2. Pages checked at 375, 768 and 1280 px; no horizontal scroll.
3. Keyboard tab-through shows a visible focus ring on every interactive element.
4. Sliders work with arrows, keyboard and touch swipe.
5. Files contain no `gray-`, hex colors, `shadow-`, `border-` or `rounded-lg`+ classes.
