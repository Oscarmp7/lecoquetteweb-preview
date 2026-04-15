# LeCoquette Luxury Spa

Elegant single-landing website for LeCoquette, built with Next.js App Router and prepared for handoff to a developer who will connect the final domain and deploy it.

## Overview

This repository is intentionally structured as a `single landing page`, not a multi-page marketing site.

The public experience is centered around four sections:

- `Hero`
- `Services`
- `About`
- `Contact`

The current codebase is already optimized for:

- static export
- GitHub Pages compatibility
- configurable final domain
- single-landing SEO
- mobile-first booking flow

## Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `GSAP`
- `Framer Motion`
- `Lenis`

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Commands

```bash
npm run lint
npx tsc --noEmit
npm run build
```

These commands currently pass and should remain the baseline quality gate before any deploy.

## Project Structure

```text
src/
  app/
    globals.css                Global tokens and base styles
    layout.tsx                 Global metadata, fonts, shell
    page.tsx                   Landing page entry
    robots.ts                  Dynamic robots.txt
    sitemap.ts                 Dynamic sitemap.xml

  components/
    layout/
      brand-loader.tsx         First-visit loader
      mobile-nav.tsx           Mobile navigation drawer
      site-footer.tsx          Footer
      site-header.tsx          Dynamic fixed header

    sections/
      hero-section.tsx         Hero section
      services-section.tsx     Services storytelling section
      about-section.tsx        About/story section
      contact-section.tsx      Final CTA/contact section

    ui/
      button.tsx
      eyebrow.tsx
      lecoquette-wordmark.tsx
      section-heading.tsx

  lib/
    site.ts                    Site metadata and URL helpers
    utils.ts                   Shared utilities and asset path helper
    booking/
      get-booking-link.ts      WhatsApp booking URL builder
    motion/
      gsap.ts
      lenis.tsx
      reduced-motion.ts

public/
  assets/
    branding/
    services/
```

## Main Files to Edit

If a developer needs to change the site quickly, these are the primary surfaces:

- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/lib/site.ts`
- `src/components/sections/hero-section.tsx`
- `src/components/sections/services-section.tsx`
- `src/components/sections/about-section.tsx`
- `src/components/sections/contact-section.tsx`
- `src/components/layout/site-header.tsx`
- `src/components/layout/site-footer.tsx`
- `src/lib/booking/get-booking-link.ts`
- `src/app/globals.css`

## Environment Configuration

The project is handoff-ready and does not hardcode the client’s final domain.

Important environment variables:

- `NEXT_PUBLIC_SITE_URL`
  The final public URL, for example `https://example.com`
- `NEXT_PUBLIC_BASE_PATH`
  Optional base path if the site is deployed under a subpath

If `NEXT_PUBLIC_SITE_URL` is not configured:

- metadata falls back to a placeholder domain
- robots are set conservatively
- the code remains safe to hand off before production domain setup

## SEO Model

The SEO strategy is intentionally built around one canonical landing page.

Included now:

- homepage metadata
- canonical
- `robots.txt`
- `sitemap.xml`
- `LocalBusiness` JSON-LD
- configurable absolute URL generation

This repo should not be treated as a multi-page SEO architecture unless the site expands later.

## Booking Flow

The booking flow is unified through WhatsApp.

Source tags are appended from:

- `src/lib/booking/get-booking-link.ts`

If the business later switches booking providers, that file is the correct place to update the destination logic.

## Deployment Notes

Current assumptions:

- static export friendly
- GitHub Pages compatible
- final domain still configurable at handoff time

Before production deploy, the receiving developer should:

1. set `NEXT_PUBLIC_SITE_URL`
2. confirm whether a `basePath` is still needed
3. run `npm run lint`
4. run `npx tsc --noEmit`
5. run `npm run build`
6. verify favicon, OG image, canonical, sitemap, and robots against the final domain

## Current State

Completed:

- secondary marketing routes removed
- landing-only structure established
- SEO base implemented for single landing
- dead assets and unused dependencies cleaned
- lint restored
- build and typecheck passing
- mobile flow simplified where custom transitions were becoming fragile
- runtime interactions optimized

Still worth checking before final launch:

- final domain configuration
- final analytics setup
- manual responsive QA on the final deployment URL
- social preview verification on the real domain

## Handoff

For a developer-oriented explanation of how the project works and how to move inside the codebase, read:

- [docs/HANDOFF.md](docs/HANDOFF.md)
