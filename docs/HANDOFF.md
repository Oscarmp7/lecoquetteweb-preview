# Handoff Guide

This document is for the developer receiving the repository after the design and optimization phase.

Its job is simple:

- explain how the landing is composed
- show where to edit the most important parts
- clarify deployment and SEO assumptions
- reduce the need to reverse-engineer the codebase

## 1. Product Definition

The site should currently be treated as a `single landing page`.

It is not a multi-route marketing site anymore.

The main flow is:

1. branded hero
2. services storytelling
3. about/story section
4. booking/contact close

That decision affects:

- routing
- SEO
- content structure
- maintenance expectations

## 2. What Was Removed

The following secondary pages were intentionally removed from `app/`:

- `/about`
- `/contact`
- `/reserve`
- `/services`
- `/services/[slug]`

Reason:

- they were no longer aligned with the product shape
- they added maintenance cost
- they diluted a single-landing SEO strategy

If the site expands later, these pages can be reintroduced cleanly.

## 3. Core Architecture

### App Shell

File:

- `src/app/layout.tsx`

Responsibilities:

- global metadata
- global fonts
- header and footer
- Lenis bootstrap
- brand loader

This is the first file to inspect when something affects the whole site.

### Landing Entry

File:

- `src/app/page.tsx`

Responsibilities:

- section composition
- homepage JSON-LD

Current section order:

1. `HeroSection`
2. `ServicesSection`
3. `AboutSection`
4. `ContactSection`

## 4. Section Map

### Hero

File:

- `src/components/sections/hero-section.tsx`

What it does:

- renders the full-screen hero image
- displays the brand mark and tagline
- applies GSAP entry motion
- applies hero parallax

Notes:

- visually sensitive to image crop
- uses `assetPath()`
- the hero image is intentionally large and immersive

### Services

File:

- `src/components/sections/services-section.tsx`

What it does:

- renders mobile service cards
- renders the desktop pinned sequence
- includes the `Additional Services` block
- holds service pricing and section booking CTAs

Notes:

- this is the most complex section in the project
- desktop behavior is more advanced than mobile by design
- mobile custom takeover experiments were deliberately simplified back to normal scroll because they became fragile

If something breaks visually, this is one of the first files to inspect.

### About

File:

- `src/components/sections/about-section.tsx`

What it does:

- provides the brand-story section
- uses separate mobile and desktop treatments
- preserves the stronger takeover behavior on desktop
- uses simpler normal-flow behavior on mobile

Notes:

- very dependent on the current image framing
- any asset replacement should be QA’d on mobile and desktop

### Contact

File:

- `src/components/sections/contact-section.tsx`

What it does:

- closes the landing with the booking CTA
- shows phone, Instagram, service area, and booking intent

Notes:

- low engineering risk
- easy place to update contact information

## 5. Layout Components

### Site Header

File:

- `src/components/layout/site-header.tsx`

What it does:

- keeps the header fixed
- dynamically switches tone based on the content behind it

Recent optimization:

- reduced scroll cost by using `elementFromPoint` traversal instead of the heavier previous approach
- avoids state updates when the detected tone does not change

If the header ever looks wrong over a section, check each section’s `data-header-theme`.

### Mobile Navigation

File:

- `src/components/layout/mobile-nav.tsx`

What it does:

- renders the slide-in mobile menu
- links to landing anchors
- pauses Lenis while the drawer is open

### Brand Loader

File:

- `src/components/layout/brand-loader.tsx`

What it does:

- shows a first-visit loader once per session

Recent optimization:

- duration reduced to improve perceived performance

### Footer

File:

- `src/components/layout/site-footer.tsx`

What it does:

- repeats contact information
- repeats the booking CTA
- exposes anchor navigation and Instagram

## 6. Shared Logic

### Site Metadata and URLs

File:

- `src/lib/site.ts`

This file centralizes:

- site name
- SEO title and description
- city and region
- social URLs
- `siteUrl`
- base path helpers
- absolute URL generation

If the final domain changes, this is one of the first places to inspect together with environment variables.

### Booking Links

File:

- `src/lib/booking/get-booking-link.ts`

Purpose:

- builds WhatsApp booking links
- appends source information to the message

If booking changes to another provider later, update the logic here instead of editing every CTA by hand.

### Asset Path Helper

File:

- `src/lib/utils.ts`

Purpose:

- shared utility helpers
- `assetPath()` for base-path-safe asset resolution

## 7. Motion System

Files:

- `src/lib/motion/gsap.ts`
- `src/lib/motion/lenis.tsx`
- `src/lib/motion/reduced-motion.ts`

Current behavior:

- GSAP powers the main section motion
- Lenis is enabled only where it makes sense
- reduced-motion preference is respected

Important recent change:

- Lenis is now limited to desktop with `pointer: fine`, so mobile gets simpler native scroll behavior

## 8. Styling System

File:

- `src/app/globals.css`

This file contains:

- global OKLCH tokens
- typography utilities
- reduced motion fallback rules
- global background treatment
- hero scroll hint animation

The visual language depends on:

- warm luxury palette
- editorial serif display
- clean sans-serif body copy
- image-led sections

## 9. SEO and Production Configuration

### SEO Direction

This project is optimized as a single landing page.

Current SEO implementation includes:

- homepage metadata
- canonical
- robots generation
- sitemap generation
- `LocalBusiness` JSON-LD
- configurable absolute URLs

### Required Environment Variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BASE_PATH` if a subpath deploy is needed

If `NEXT_PUBLIC_SITE_URL` is not set:

- the site still builds
- metadata stays on a safe placeholder
- the final deploy is not fully production-ready yet

### Deployment Assumptions

The repo is prepared for:

- static export style deployment
- GitHub Pages style compatibility
- future migration to a real domain

Whoever deploys should verify:

1. final domain
2. base path strategy
3. OG image URL
4. favicon URL
5. canonical
6. robots
7. sitemap

## 10. Quality Gate

The following commands should pass before changes are shipped:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

They are currently passing.

## 11. What Is Safe to Change Quickly

Low-risk edits:

- text content
- CTA labels
- phone or Instagram
- metadata copy
- service lists and prices
- footer navigation labels

Medium-risk edits:

- swapping section images
- changing section spacing
- editing the mobile nav
- updating service card structure

High-risk edits:

- changing the desktop pinned services choreography
- changing hero sticky/parallax behavior
- reintroducing complex mobile takeover transitions
- changing base-path logic without testing deployment

## 12. Recommended Workflow for the Receiving Developer

1. install dependencies
2. set the final environment variables
3. run lint, typecheck, and build
4. verify the final deployed URL
5. QA mobile, tablet, and desktop manually
6. validate SEO tags on the real domain
7. connect analytics only after the final URL is stable

## 13. Final Notes

What is strong right now:

- visual direction
- landing structure
- SEO base
- cleaner repo shape
- quality tooling

What still deserves a final production pass on the real domain:

- manual responsive QA
- social preview QA
- analytics setup
- final content proofreading

This repository should now be understandable without session history. The goal of the handoff is that a developer can open the repo, find the right files quickly, and ship the final deployment without guessing how the project is put together.
