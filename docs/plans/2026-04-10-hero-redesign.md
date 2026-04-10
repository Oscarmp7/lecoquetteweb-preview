# Hero Redesign — LeCoquette Luxury Spa
Date: 2026-04-10

## Overview

Full rebuild of the homepage hero from scratch. All previous section components are discarded. The page is reconstructed part by part, starting with the hero and the scroll-over transition to the next section.

## Design Decision

The user wants a cinematic, editorial hero inspired by the BELLEVOIRE reference: the brand logo anchors the bottom of the viewport at full width, the tagline floats in the center, and the next section slides up from below on scroll — progressively covering the logo from bottom to top.

## Visual Layout

```
┌──────────────────────────────────────────┐
│                                          │
│  [Background.png — warm peach marble]    │
│                                          │
│                                          │
│    Nail · Brow · Beauty — Gainesville    │  ← <p> tagline, small/elegant
│                                          │
│              |                           │
│              | ← scroll hint (line)      │
│              |                           │
├──────────────────────────────────────────┤
│  <h1><img alt="LeCoquette Luxury Spa"/>  │  ← logo full-width = H1
└──────────────────────────────────────────┘
         ↑ next section slides up and covers
```

## Components

### `HeroSection` (`src/components/sections/hero-section.tsx`)
- Replaces `hero-cinematic.tsx` entirely
- `position: sticky; top: 0; z-index: 1; height: 100svh`
- Background: `<Image>` from next/image, `src="/assets/branding/Background.png"`, `fill`, `object-fit: cover`, `priority`, `fetchpriority="high"`
- Logo: `<h1>` wrapping `<img>`, `alt="LeCoquette Luxury Spa"`, positioned `absolute bottom-0 left-0 w-full`
- Logo effect: dark/charcoal logo version (check LECoquetteLOGO-08 through -35 for dark variant; if none found, use CSS `filter: brightness(0) sepia(0.2)` on existing colored logo + drop-shadow)
- Logo 3D relief CSS:
  ```css
  filter: drop-shadow(1px 3px 6px rgba(80,30,15,0.35))
          drop-shadow(0px 1px 2px rgba(80,30,15,0.20));
  ```
- Tagline: `<p>` centered in the hero (`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`), small caps, tracking-widest
- Scroll hint: vertical animated line (`absolute bottom-[calc(logo-height+1rem)] left-1/2`), CSS keyframe animation that draws the line downward on loop
- GSAP entry animation: logo slides up from below on mount (subtle, 0.8s), tagline fades in

### Scroll-Over Transition
- Hero: `position: sticky; top: 0; z-index: 1`
- Next section wrapper: `position: relative; z-index: 10; border-radius: 2.5rem 2.5rem 0 0`
- No JS required for the transition — pure CSS stacking

### `page.tsx`
- Remove `redirect("/legacy/index.html")`
- Render `<HeroSection />` + placeholder `<NextSection />` with white background
- Add `LocalBusiness` JSON-LD schema

## SEO

### In-page (hero)
- `<h1>` wraps logo img — `alt="LeCoquette Luxury Spa"` is the H1 text for crawlers
- `<p>` tagline: "Nail · Brow · Beauty — Gainesville" — local keywords
- No content duplication

### JSON-LD (`src/app/layout.tsx` or `page.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "LeCoquette Luxury Spa",
  "description": "Luxury nail, brow, and beauty spa in Gainesville",
  "address": { "@type": "PostalAddress", "addressLocality": "Gainesville" },
  "url": "https://lecoquetteluxspa.com"
}
```

### Meta tags (already in layout.tsx)
- Title and description confirmed adequate, can improve per-page later

## Assets

| Asset | Path | Notes |
|---|---|---|
| Background | `public/assets/branding/Background.png` | Warm peach marble |
| Logo (dark) | TBD from LECoquetteLOGO-08..35 | Or CSS filter on existing |
| Logo (fallback) | `public/assets/branding/lecoquette-wordmark.png` | Already in public |

## What is NOT in scope for this task
- Navigation / header redesign
- Footer
- Any section beyond the hero + placeholder next section
- Mobile-specific breakpoints beyond basic responsiveness
- All other pages (services, about, contact, reserve)

## Decisions Made
- Logo at bottom, full-width (BELLEVOIRE style) — not centered
- Background.png (warm peach) not Background2.png
- Transition: pure CSS sticky, no GSAP for the scroll-over
- H1 wraps logo img, no visible duplicate text
- Tagline carries local SEO keywords: Gainesville + service types
- Scroll hint: animated vertical line (editorial, not arrow/chevron)
