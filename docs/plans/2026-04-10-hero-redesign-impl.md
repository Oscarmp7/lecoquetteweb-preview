# Hero Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the existing hero with a cinematic full-viewport hero: warm peach marble background, dark logo anchored full-width at the bottom, tagline + scroll hint centered, and the next section sliding up to cover the hero on scroll.

**Architecture:** The hero uses `position: sticky; top: 0` so the next section naturally scrolls over it — pure CSS, no JS for the transition. GSAP handles only the logo entry animation. The logo PNG (`LECoquetteLOGO-09.png`) is already dark/charcoal and needs only a CSS relief drop-shadow. A `LocalBusiness` JSON-LD block goes in `page.tsx`.

**Tech Stack:** Next.js 14 App Router, Tailwind CSS v4, GSAP + @gsap/react, next/image

---

## Pre-flight checks

Before starting, verify these exist:
- `public/assets/branding/Background.png` ✓
- `brandbook-assets/LECOQUETTE BRANDING/LOGOS/LECoquetteLOGO-09.png` ✓
- `src/lib/motion/gsap.ts` — exports `ensureGsap()`
- `src/lib/motion/reduced-motion.ts` — exports `usePrefersReducedMotion()`

---

## Task 1: Copy logo to public assets

**Files:**
- Copy: `brandbook-assets/LECOQUETTE BRANDING/LOGOS/LECoquetteLOGO-09.png` → `public/assets/branding/logo-dark.png`

**Step 1: Copy the file**

```bash
cp "brandbook-assets/LECOQUETTE BRANDING/LOGOS/LECoquetteLOGO-09.png" \
   "public/assets/branding/logo-dark.png"
```

On Windows (bash):
```bash
cp "brandbook-assets/LECOQUETTE BRANDING/LOGOS/LECoquetteLOGO-09.png" public/assets/branding/logo-dark.png
```

**Step 2: Verify**

```bash
ls public/assets/branding/
```
Expected: `Background.png  Background2.png  lecoquette-wordmark.png  logo-dark.png`

**Step 3: Commit**

```bash
git add public/assets/branding/logo-dark.png
git commit -m "assets: add dark logo for hero"
```

---

## Task 2: Reset page.tsx — remove legacy redirect

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Replace the entire file**

```tsx
export default function HomePage() {
  return (
    <main>
      {/* Hero and sections are added in subsequent tasks */}
    </main>
  );
}
```

**Step 2: Run dev server and verify no redirect**

```bash
npm run dev
```

Open `http://localhost:3000` — should show a blank page (no redirect to `/legacy/index.html`).

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "chore: remove legacy redirect from homepage"
```

---

## Task 3: Build the HeroSection component

**Files:**
- Create: `src/components/sections/hero-section.tsx`

This is the main component. Build it in this exact order.

**Step 1: Create the file with static structure (no animation yet)**

```tsx
"use client";

import Image from "next/image";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] overflow-hidden"
      style={{ position: "sticky", top: 0, zIndex: 1 }}
    >
      {/* Background */}
      <Image
        src="/assets/branding/Background.png"
        alt=""
        fill
        priority
        fetchPriority="high"
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Tagline — centered in viewport */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none">
        <p
          className="font-body text-[clamp(0.6rem,1.2vw,0.8rem)] uppercase tracking-[0.35em] text-[oklch(0.269_0.010_303.8)/0.55]"
          aria-hidden="false"
        >
          Nail&nbsp;&nbsp;·&nbsp;&nbsp;Brow&nbsp;&nbsp;·&nbsp;&nbsp;Beauty&nbsp;&nbsp;—&nbsp;&nbsp;Gainesville
        </p>

        {/* Scroll hint — animated vertical line */}
        <div className="flex flex-col items-center gap-1 mt-4" aria-hidden="true">
          <span className="block w-px bg-[oklch(0.269_0.010_303.8)/0.30] hero-scroll-line" style={{ height: "3.5rem" }} />
        </div>
      </div>

      {/* Logo — full-width, anchored to bottom, wrapped in H1 for SEO */}
      <div className="absolute bottom-0 left-0 w-full px-0">
        <h1 className="m-0 p-0 leading-none">
          <Image
            src="/assets/branding/logo-dark.png"
            alt="LeCoquette Luxury Spa"
            width={1080}
            height={1080}
            className="hero-logo w-full h-auto object-contain object-bottom"
            style={{
              filter:
                "drop-shadow(1px 3px 6px rgba(80,30,15,0.30)) drop-shadow(0px 1px 2px rgba(80,30,15,0.18))",
              maxHeight: "28svh",
            }}
            priority
          />
        </h1>
      </div>
    </section>
  );
}
```

**Step 2: Add scroll-line keyframe to globals.css**

Open `src/app/globals.css` and add before the closing line:

```css
/* Hero scroll hint */
@keyframes scroll-line-draw {
  0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
  20%  { opacity: 1; }
  60%  { transform: scaleY(1); transform-origin: top; }
  80%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
  100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
}

.hero-scroll-line {
  animation: scroll-line-draw 2s ease-in-out infinite;
}
```

**Step 3: Wire component into page.tsx**

```tsx
import { HeroSection } from "@/components/sections/hero-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
```

**Step 4: Verify visually**

```bash
npm run dev
```

Check at `http://localhost:3000`:
- [ ] Peach marble background fills viewport
- [ ] Tagline centered in viewport, small caps
- [ ] Animated vertical line below tagline
- [ ] Dark logo sits at the very bottom, full width
- [ ] Logo has subtle 3D shadow

**Step 5: Commit**

```bash
git add src/components/sections/hero-section.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: add hero section with marble background and bottom logo"
```

---

## Task 4: Add GSAP logo entry animation

**Files:**
- Modify: `src/components/sections/hero-section.tsx`

The logo and tagline should animate in on mount. Logo rises from below, tagline fades in.

**Step 1: Import GSAP hooks**

Add at the top of `hero-section.tsx`:

```tsx
import { useGSAP } from "@gsap/react";
import { ensureGsap } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";
```

**Step 2: Add the animation inside the component (after the refs)**

```tsx
const reducedMotion = usePrefersReducedMotion();

useGSAP(
  () => {
    if (reducedMotion) return;

    const { gsap } = ensureGsap();

    // Logo rises from below
    gsap.fromTo(
      ".hero-logo",
      { yPercent: 18, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.1 }
    );

    // Tagline fades in slightly after
    gsap.fromTo(
      ".hero-tagline",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.5 }
    );
  },
  { scope: containerRef, dependencies: [reducedMotion] }
);
```

**Step 3: Add className `hero-tagline` to the tagline `<p>`**

```tsx
<p className="hero-tagline font-body text-[clamp(0.6rem,1.2vw,0.8rem)] uppercase tracking-[0.35em] text-[oklch(0.269_0.010_303.8)/0.55]">
```

**Step 4: Verify animation**

Hard-refresh `http://localhost:3000` and check:
- [ ] Logo animates up from below on load
- [ ] Tagline fades in ~0.5s after logo
- [ ] No layout shift or flicker
- [ ] Animation is skipped when `prefers-reduced-motion: reduce` is set in OS

**Step 5: Commit**

```bash
git add src/components/sections/hero-section.tsx
git commit -m "feat: add gsap entry animation to hero logo and tagline"
```

---

## Task 5: Add the scroll-over placeholder next section

**Files:**
- Create: `src/components/sections/next-section-placeholder.tsx`
- Modify: `src/app/page.tsx`

This establishes the sticky scroll-over effect. The next section slides over the hero naturally.

**Step 1: Create the placeholder component**

```tsx
export function NextSectionPlaceholder() {
  return (
    <section
      className="relative z-10 min-h-screen bg-[oklch(0.985_0.010_55)]"
      style={{ borderRadius: "2.5rem 2.5rem 0 0" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-32 md:px-6">
        <p className="font-display text-4xl text-[oklch(0.269_0.010_303.8)/0.4]">
          Next section coming soon
        </p>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx**

```tsx
import { HeroSection } from "@/components/sections/hero-section";
import { NextSectionPlaceholder } from "@/components/sections/next-section-placeholder";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <NextSectionPlaceholder />
    </main>
  );
}
```

**Step 3: Verify scroll-over effect**

Open `http://localhost:3000` and scroll down:
- [ ] Hero stays pinned while next section slides up over it
- [ ] Next section has rounded top corners (2.5rem)
- [ ] Logo progressively disappears under the next section from the bottom up
- [ ] No jumps or layout issues

**Step 4: Commit**

```bash
git add src/components/sections/next-section-placeholder.tsx src/app/page.tsx
git commit -m "feat: add scroll-over next section — hero pinned, section slides up"
```

---

## Task 6: Add LocalBusiness JSON-LD schema for SEO

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Add the JSON-LD script tag**

```tsx
import { HeroSection } from "@/components/sections/hero-section";
import { NextSectionPlaceholder } from "@/components/sections/next-section-placeholder";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "LeCoquette Luxury Spa",
    description:
      "Luxury nail, brow, and beauty spa in Gainesville. Refined rituals designed to feel intimate, polished, and elevated.",
    url: "https://lecoquetteluxspa.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gainesville",
      addressCountry: "US",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Spa Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nail Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Brow Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Beauty Treatments" } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <HeroSection />
        <NextSectionPlaceholder />
      </main>
    </>
  );
}
```

**Step 2: Verify schema**

```bash
npm run build
```

After build, open `http://localhost:3000` and inspect page source — look for:
```
<script type="application/ld+json">
```

Optionally paste the URL into Google's Rich Results Test tool.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "seo: add LocalBusiness JSON-LD schema to homepage"
```

---

## Task 7: Delete old hero and unused section components

**Files:**
- Delete: `src/components/sections/hero-cinematic.tsx`
- Delete: `src/components/sections/intro-orchestration.tsx`
- Delete: `src/components/sections/services-choreography.tsx`
- Delete: `src/components/sections/signature-experience.tsx`
- Delete: `src/components/sections/testimonials-proof.tsx`
- Delete: `src/components/sections/seasonal-offers.tsx`
- Delete: `src/components/sections/reserve-cta.tsx`
- Delete: `src/components/sections/about-preview.tsx`
- Delete: `src/components/sections/faq-preview.tsx`

**Step 1: Delete the files**

```bash
rm src/components/sections/hero-cinematic.tsx
rm src/components/sections/intro-orchestration.tsx
rm src/components/sections/services-choreography.tsx
rm src/components/sections/signature-experience.tsx
rm src/components/sections/testimonials-proof.tsx
rm src/components/sections/seasonal-offers.tsx
rm src/components/sections/reserve-cta.tsx
rm src/components/sections/about-preview.tsx
rm src/components/sections/faq-preview.tsx
```

**Step 2: Verify no broken imports**

```bash
npm run build
```

Expected: Build completes with no errors. If TypeScript complains about missing imports, find and remove any references to the deleted files.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old hero and section components"
```

---

## Final verification checklist

After all tasks:

- [ ] `npm run build` passes with no errors or TypeScript warnings
- [ ] `http://localhost:3000` shows the marble hero
- [ ] Logo is full-width, anchored at the bottom
- [ ] Tagline "Nail · Brow · Beauty — Gainesville" is centered
- [ ] Scroll hint (animated vertical line) is visible
- [ ] Logo entry animation works on load
- [ ] Scrolling down: next section slides over the hero with rounded corners
- [ ] Page source contains `<script type="application/ld+json">`
- [ ] No console errors in browser
- [ ] `prefers-reduced-motion` disables animations (test in OS accessibility settings)

---

## Notes for implementer

- The logo PNG has whitespace/padding around it — `object-contain` + `maxHeight: "28svh"` controls the visual size. Adjust `maxHeight` if the logo feels too large or small.
- The `hero-scroll-line` animation uses CSS only — no GSAP dependency for it.
- Do NOT touch `src/app/layout.tsx`, `src/components/layout/`, or any other page's files. Scope is strictly homepage hero.
- The `NextSectionPlaceholder` is temporary — it will be replaced when the next section is designed in a future session.
