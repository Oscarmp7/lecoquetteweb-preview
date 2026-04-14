"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsap } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";
import { assetPath } from "@/lib/utils";


// ─── Types & Data ─────────────────────────────────────────────────────────────

type ServiceItem = { name: string; price: string; tag?: string };

type Ritual = {
  id: string;
  index: string;
  subline: string;
  headline: string;
  body: string;
  anchor: string;
  image: string;
  imageAlt: string;
  cta: string;
  services: ServiceItem[];
};

const BOOKING_URL = "https://lecoquette.square.site/";

const RITUALS: Ritual[] = [
  {
    id: "manicure",
    index: "01",
    subline: "Manicure",
    headline: "Precision\nmeets indulgence",
    body: "Every line deliberate. Every finish flawless. From classic refinement to the full Coquette experience — warm towel and therapeutic massage included.",
    anchor: "From $35",
    image: "/assets/services/manicure.png",
    imageAlt: "LeCoquette luxury manicure service",
    cta: "Book Manicure",
    services: [
      { name: "Classic Manicure", price: "$35" },
      { name: "Gel Manicure", price: "$50" },
      { name: "Coquette Manicure", price: "$50", tag: "COQUETTE" },
      { name: "Coquette Gel Manicure", price: "$65", tag: "COQUETTE" },
      { name: "Nail Art (per nail)", price: "$5+" },
      { name: "Nail Repair (per nail)", price: "$5" },
      { name: "Gel Removal", price: "$15" },
    ],
  },
  {
    id: "pedicure",
    index: "02",
    subline: "Pedicure",
    headline: "A ritual from\nsole to soul",
    body: "Step into stillness. Starting with a warm soak and ending with a finish that turns every step into a statement.",
    anchor: "From $32",
    image: "/assets/services/pedicure.png",
    imageAlt: "LeCoquette luxury pedicure service",
    cta: "Book Pedicure",
    services: [
      { name: "Classic Pedicure", price: "$45" },
      { name: "Gel Pedicure", price: "$60" },
      { name: "Coquette Pedicure", price: "$60", tag: "COQUETTE" },
      { name: "Coquette Gel Pedicure", price: "$75", tag: "COQUETTE" },
      { name: "Mini Pedicure", price: "$32" },
      { name: "Nail Art (per nail)", price: "$5+" },
      { name: "Gel Removal", price: "$15" },
    ],
  },
  {
    id: "bundles",
    index: "03",
    subline: "Bundles",
    headline: "The full\nCoquette experience",
    body: "Why choose when you can have both? Our bundles pair manicure and pedicure into one seamless ritual.",
    anchor: "From $68",
    image: "/assets/services/bundles.png",
    imageAlt: "LeCoquette bundle mani-pedi experience",
    cta: "Book Bundle",
    services: [
      { name: "Classic Mani + Pedi", price: "$68" },
      { name: "Gel Mani + Classic Pedi", price: "$83" },
      { name: "Classic Mani + Gel Pedi", price: "$83" },
      { name: "Gel Mani + Gel Pedi", price: "$98" },
      { name: "Coquette Mani + Pedi", price: "$98", tag: "COQUETTE" },
      { name: "Coquette Gel Mani + Pedi", price: "$113", tag: "COQUETTE" },
      { name: "Full Coquette Experience", price: "$128", tag: "COQUETTE" },
    ],
  },
];

const ADD_ONS = [
  { label: "Eyebrow Wax", price: "$15" },
  { label: "Eyebrow Tint", price: "$15" },
  { label: "Eyebrow Wax + Tint", price: "$25" },
  { label: "Kids Manicure (under 10)", price: "$20" },
  { label: "Kids Pedicure (under 10)", price: "$28" },
  { label: "Kids Mani + Pedi (under 10)", price: "$40" },
  { label: "Hand Design", price: "$60" },
];

// ─── Shared: Service list + CTA ───────────────────────────────────────────────

function ServiceList({ ritual }: { ritual: Ritual }) {
  return (
    <>
      <ul
        className="mt-5 space-y-2.5 border-t pt-5"
        style={{ borderColor: "oklch(0.900 0.025 50)" }}
        aria-label={`${ritual.subline} service prices`}
      >
        {ritual.services.map((svc) => (
          <li key={svc.name} className="flex items-baseline justify-between gap-3">
            <span
              className="font-body flex items-center gap-2 leading-snug"
              style={{ fontSize: "0.83rem", color: "oklch(0.410 0.109 36.5)" }}
            >
              {svc.name}
              {svc.tag && (
                <span
                  className="inline-block rounded-full px-2 py-px text-[0.58rem] font-medium uppercase tracking-[0.1em]"
                  style={{
                    background: "oklch(0.637 0.177 32.7 / 0.10)",
                    color: "oklch(0.637 0.177 32.7)",
                  }}
                >
                  {svc.tag}
                </span>
              )}
            </span>
            <span
              className="font-body shrink-0 tabular-nums"
              style={{ fontSize: "0.83rem", fontWeight: 500, color: "oklch(0.269 0.010 303.8)" }}
            >
              {svc.price}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          id={`book-${ritual.id}`}
          className="group relative inline-flex items-center gap-3 overflow-hidden px-1 pt-1 pb-2 font-display text-[1.2rem] tracking-[-0.02em] text-[oklch(0.637_0.177_32.7)] transition-colors hover:text-opacity-70"
        >
          <span className="relative">
            {ritual.cta}
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:origin-left group-hover:scale-x-100" />
          </span>
          <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5 pt-[2px]">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </>
  );
}

// ─── MOBILE: Stacked cards ────────────────────────────────────────────────────
// Mobile-first: each ritual is a full-width "reveal" card.
// Image wipes in from below, text fades up underneath.

function MobileCard({ ritual, i }: { ritual: Ritual; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const { gsap } = ensureGsap();

      // Image wipe-in (clip from bottom)
      gsap.fromTo(
        ".mc-img",
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Text stagger up
      gsap.fromTo(
        ".mc-text",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: cardRef, dependencies: [reducedMotion] }
  );

  return (
    <div
      ref={cardRef}
      id={ritual.id}
      className="scroll-mt-8"
    >
      {/* Full-width image */}
      <div
        className="mc-img relative w-full overflow-hidden"
        style={{ aspectRatio: "4 / 3" }}
        data-header-theme="light"
      >
        <Image
          src={assetPath(ritual.image)}
          alt={ritual.imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority={i === 0}
        />
        {/* Index overlay */}
        <span
          className="pointer-events-none absolute select-none font-display"
          aria-hidden="true"
          style={{
            fontSize: "clamp(5rem, 22vw, 9rem)",
            lineHeight: 1,
            color: "oklch(1 0 0 / 0.08)",
            bottom: "-0.1em",
            right: "0.05em",
          }}
        >
          {ritual.index}
        </span>
      </div>

      {/* Text block */}
      <div
        className="px-5 py-8"
        style={{ background: "oklch(0.985 0.010 55)" }}
        data-header-theme="dark"
      >
        {/* Eyebrow */}
        <div className="mc-text mb-4 flex items-center gap-2.5">
          <span
            className="block h-px w-6 shrink-0"
            style={{ background: "oklch(0.637 0.177 32.7)" }}
          />
          <span
            className="font-body text-[0.68rem] uppercase tracking-[0.26em]"
            style={{ color: "oklch(0.637 0.177 32.7)" }}
          >
            {ritual.subline}
          </span>
        </div>

        {/* Headline */}
        <h2
          className="mc-text font-display m-0"
          style={{
            fontSize: "clamp(2rem, 8vw, 2.6rem)",
            lineHeight: 1.08,
            color: "oklch(0.269 0.010 303.8)",
            whiteSpace: "pre-line",
          }}
        >
          {ritual.headline}
        </h2>

        {/* Anchor price */}
        <p
          className="mc-text font-body mt-2.5"
          style={{
            fontSize: "0.78rem",
            color: "oklch(0.637 0.177 32.7)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {ritual.anchor}
        </p>

        {/* Body */}
        <p
          className="mc-text font-body mt-4"
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.75,
            color: "oklch(0.560 0.050 35)",
          }}
        >
          {ritual.body}
        </p>

        {/* Service list + CTA */}
        <div className="mc-text">
          <ServiceList ritual={ritual} />
        </div>
      </div>

      {/* Divider */}
      {i < RITUALS.length - 1 && (
        <div
          className="mx-5 h-px"
          style={{ background: "oklch(0.900 0.025 50)" }}
        />
      )}
    </div>
  );
}

function MobileRituals() {
  return (
    <div className="md:hidden">
      {RITUALS.map((r, i) => (
        <MobileCard key={r.id} ritual={r} i={i} />
      ))}
    </div>
  );
}

// ─── DESKTOP: Pinned scroll sequence ─────────────────────────────────────────
// The viewport is pinned (sticky). Scroll progress drives a GSAP timeline.
//
// Panel progression (image column | text column):
//   Beat 0→1: img-0 rises LEFT   | txt-0 appears RIGHT
//   Beat 1→2: img-0 exits LEFT   | txt-0 fades RIGHT
//             img-1 rises RIGHT  | txt-1 appears LEFT
//   Beat 2→3: img-1 exits RIGHT  | txt-1 fades LEFT
//             img-2 rises LEFT   | txt-2 appears RIGHT
//
// Outer section height = (N+1)*100vh → gives N×100vh of "pinned" travel.

function DesktopRitualText({ ritual }: { ritual: Ritual }) {
  return (
    <div className="flex h-full flex-col justify-center overflow-y-auto px-10 py-12 xl:px-16">
      {/* Eyebrow */}
      <div className="mb-5 flex items-center gap-3">
        <span className="block h-px w-8 shrink-0" style={{ background: "oklch(0.637 0.177 32.7)" }} />
        <span
          className="font-body text-xs uppercase tracking-[0.26em]"
          style={{ color: "oklch(0.637 0.177 32.7)" }}
        >
          {ritual.subline}
        </span>
      </div>

      {/* Headline */}
      <h2
        className="font-display m-0"
        style={{
          fontSize: "clamp(2rem, 3.8vw, 3rem)",
          lineHeight: 1.08,
          color: "oklch(0.269 0.010 303.8)",
          whiteSpace: "pre-line",
        }}
      >
        {ritual.headline}
      </h2>

      {/* Anchor */}
      <p
        className="font-body mt-3"
        style={{
          fontSize: "0.8rem",
          color: "oklch(0.637 0.177 32.7)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        {ritual.anchor}
      </p>

      {/* Body */}
      <p
        className="font-body mt-4 max-w-[36ch]"
        style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)", lineHeight: 1.78, color: "oklch(0.560 0.050 35)" }}
      >
        {ritual.body}
      </p>

      <ServiceList ritual={ritual} />
    </div>
  );
}

function DesktopAddonsText() {
  return (
    <div className="flex h-full flex-col justify-center overflow-y-auto px-10 py-12 xl:px-16 text-left">
      <div className="mb-5 flex items-center gap-3">
        <span className="block h-px w-8 shrink-0" style={{ background: "oklch(0.637 0.177 32.7)" }} />
        <span className="font-body text-xs uppercase tracking-[0.26em]" style={{ color: "oklch(0.637 0.177 32.7)" }}>
          Additional Services
        </span>
      </div>

      <h2
        className="font-display m-0"
        style={{
          fontSize: "clamp(2rem, 3.8vw, 3rem)",
          lineHeight: 1.08,
          color: "oklch(0.269 0.010 303.8)",
        }}
      >
        Complete your
        <br />
        ritual.
      </h2>

      <p
        className="font-body mt-4 max-w-[36ch]"
        style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)", lineHeight: 1.78, color: "oklch(0.560 0.050 35)" }}
      >
        Elevate any visit with curated additions, from precision brow shaping to little luxuries that make the appointment feel fully considered.
      </p>

      <div className="mt-8 max-w-sm">
        <ul className="space-y-0 border-t pt-2" style={{ borderColor: "oklch(0.900 0.025 50)" }}>
          {ADD_ONS.map((a) => (
            <li
              key={a.label}
              className="flex items-baseline justify-between gap-4 border-b py-3.5"
              style={{ borderColor: "oklch(0.900 0.025 50)" }}
            >
              <span className="font-body" style={{ fontSize: "0.85rem", color: "oklch(0.410 0.109 36.5)" }}>
                {a.label}
              </span>
              <span
                className="font-body shrink-0 tabular-nums"
                style={{ fontSize: "0.85rem", fontWeight: 500, color: "oklch(0.269 0.010 303.8)" }}
              >
                {a.price}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 overflow-hidden px-1 pt-1 pb-2 font-display text-[1.2rem] tracking-[-0.02em] text-[oklch(0.637_0.177_32.7)] transition-colors hover:text-opacity-70"
        >
          <span className="relative">
            Book Add-On
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:origin-left group-hover:scale-x-100" />
          </span>
          <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5 pt-[2px]">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function DesktopPinnedRituals() {
  const outerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const { gsap, ScrollTrigger } = ensureGsap();

      const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

      // First panel must already be in place while the intro clears out.
      gsap.set(".pin-img-0", { yPercent: 0 });
      gsap.set(".pin-txt-0", { autoAlpha: 1, y: 0 });

      // ── Beat 1→2: Pedicure enters (img right), Manicure exits ────────────
      tl.to(".pin-img-0", { yPercent: -100, duration: 1 }, 1);
      tl.fromTo(".pin-img-1", { yPercent: 100 }, { yPercent: 0, duration: 1 }, 1);
      tl.to(".pin-txt-0", { autoAlpha: 0, y: -24, duration: 0.3, ease: "power2.in" }, 1);
      tl.fromTo(
        ".pin-txt-1",
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
        1.38
      );

      // ── Beat 2→3: Bundles enters (img left), Pedicure exits ──────────────
      tl.to(".pin-img-1", { yPercent: -100, duration: 1 }, 2);
      tl.fromTo(".pin-img-2", { yPercent: 100 }, { yPercent: 0, duration: 1 }, 2);
      tl.to(".pin-txt-1", { autoAlpha: 0, y: -24, duration: 0.3, ease: "power2.in" }, 2);
      tl.fromTo(
        ".pin-txt-2",
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
        2.38
      );

      // ── Beat 3→4: Add-ons enters, Bundles exits ──────────────────────────
      tl.to(".pin-img-2", { yPercent: -100, duration: 1 }, 3);
      tl.fromTo(".pin-img-3", { yPercent: 100 }, { yPercent: 0, duration: 1 }, 3);
      tl.to(".pin-txt-2", { autoAlpha: 0, y: -24, duration: 0.3, ease: "power2.in" }, 3);
      tl.fromTo(
        ".pin-txt-3",
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" },
        3.38
      );

      // Hold Add-ons in place longer before About starts covering Services.
      tl.to({}, { duration: 1 }, 4);

      ScrollTrigger.create({
        trigger: outerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.4,
        animation: tl,
      });

      return () => {
        tl.scrollTrigger?.kill();
      };
    },
    { scope: outerRef, dependencies: [reducedMotion] }
  );

  // Four content beats plus one hold beat before About takeover.
  const panelCount = RITUALS.length + 1;

  return (
    <div
      ref={outerRef}
      style={{ height: `${(panelCount + 2) * 100}vh` }}
      className="hidden md:block"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
      >
        {/* ── LEFT column: img-0 (Manicure), img-2 (Bundles), txt-1 (Pedicure), txt-3 (Add-ons) ── */}
        <div className="relative h-full overflow-hidden" style={{ background: "oklch(0.930 0.022 50)" }} data-header-theme="light">
          {/* Manicure image — enters first */}
          <div
            className="pin-img-0 absolute inset-0 will-change-transform"
            style={{ zIndex: 20 }}
          >
            <Image src={assetPath(RITUALS[0].image)} alt={RITUALS[0].imageAlt} fill sizes="50vw" className="object-cover object-center" />
          </div>
          {/* Bundles image — enters last */}
          <div
            className="pin-img-2 absolute inset-0 will-change-transform"
            style={{ zIndex: 30 }}
          >
            <Image src={assetPath(RITUALS[2].image)} alt={RITUALS[2].imageAlt} fill sizes="50vw" className="object-cover object-center" />
          </div>
          {/* Pedicure text — visible between beats 1→2 */}
          <div
            className="pin-txt-1 absolute inset-0"
            style={{ zIndex: 10, background: "oklch(0.985 0.010 55)", visibility: "hidden", opacity: 0 }}
          >
            <DesktopRitualText ritual={RITUALS[1]} />
          </div>
          <div
            className="pin-txt-3 absolute inset-0"
            style={{ zIndex: 10, background: "oklch(0.985 0.010 55)", visibility: "hidden", opacity: 0 }}
          >
            <DesktopAddonsText />
          </div>
        </div>

        {/* ── RIGHT column: txt-0 (Manicure), img-1 (Pedicure), txt-2 (Bundles), img-3 (Add-ons) ── */}
        <div className="relative h-full overflow-hidden" style={{ background: "oklch(0.985 0.010 55)" }} data-header-theme="dark">
          {/* Manicure text — visible beat 0→1 */}
          <div
            className="pin-txt-0 absolute inset-0"
            style={{ zIndex: 10, visibility: "hidden", opacity: 0 }}
          >
            <DesktopRitualText ritual={RITUALS[0]} />
          </div>
          {/* Pedicure image — enters beat 1→2, covers Manicure text */}
          <div
            className="pin-img-1 absolute inset-0 will-change-transform"
            style={{ zIndex: 20 }}
          >
            <Image src={assetPath(RITUALS[1].image)} alt={RITUALS[1].imageAlt} fill sizes="50vw" className="object-cover object-center" />
          </div>
          {/* Bundles text — visible beat 2→3 */}
          <div
            className="pin-txt-2 absolute inset-0"
            style={{ zIndex: 10, visibility: "hidden", opacity: 0 }}
          >
            <DesktopRitualText ritual={RITUALS[2]} />
          </div>
          <div
            className="pin-img-3 absolute inset-0 will-change-transform"
            style={{ zIndex: 30 }}
          >
            <Image src={assetPath("/assets/services/addons_new.png")} alt="Additional luxury beauty services" fill sizes="50vw" className="object-cover object-center" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Add-ons section ──────────────────────────────────────────────────────────

function AddOnsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const { gsap } = ensureGsap();

      gsap.fromTo(
        ".addon-reveal",
        { opacity: 0, y: 28, immediateRender: false },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".addon-item",
        { opacity: 0, y: 16, immediateRender: false },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <div
      ref={ref}
      className="relative w-full border-t md:hidden"
      style={{ background: "oklch(0.985 0.010 55)", borderColor: "oklch(0.900 0.025 50)" }}
      data-header-theme="dark"
    >
      <div className="flex flex-col-reverse md:grid md:min-h-screen md:grid-cols-2">
        <div className="flex items-center">
          <div className="w-full px-5 py-12 md:px-10 md:py-16 xl:px-16">
            <div className="addon-reveal mb-5 flex items-center gap-3">
              <span className="block h-px w-8 shrink-0" style={{ background: "oklch(0.637 0.177 32.7)" }} />
              <span
                className="font-body text-[0.68rem] uppercase tracking-[0.26em]"
                style={{ color: "oklch(0.637 0.177 32.7)" }}
              >
                Additional Services
              </span>
            </div>

            <h2
              className="addon-reveal font-display m-0"
              style={{
                fontSize: "clamp(2.2rem, 4.8vw, 4.5rem)",
                lineHeight: 1.05,
                color: "oklch(0.269 0.010 303.8)",
                letterSpacing: "-0.02em",
              }}
            >
              Complete your
              <br />
              ritual.
            </h2>

            <p
              className="addon-reveal font-body mt-5 max-w-[34ch]"
              style={{
                fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
                lineHeight: 1.8,
                color: "oklch(0.560 0.050 35)",
              }}
            >
              Elevate any visit with curated additions, from precision brow shaping to little luxuries that make the appointment feel fully considered.
            </p>

            <div className="mt-8 max-w-xl border-t pt-2" style={{ borderColor: "oklch(0.900 0.025 50)" }}>
              {ADD_ONS.map((a) => (
                <div
                  key={a.label}
                  className="addon-item flex items-baseline justify-between gap-4 border-b py-3.5"
                  style={{ borderColor: "oklch(0.900 0.025 50)" }}
                >
                  <span className="font-body" style={{ fontSize: "0.88rem", color: "oklch(0.410 0.109 36.5)" }}>
                    {a.label}
                  </span>
                  <span
                    className="font-body shrink-0 tabular-nums"
                    style={{ fontSize: "0.88rem", fontWeight: 500, color: "oklch(0.269 0.010 303.8)" }}
                  >
                    {a.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="addon-reveal mt-8">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden px-1 pt-1 pb-2 font-display text-[1.2rem] tracking-[-0.02em] text-[oklch(0.637_0.177_32.7)] transition-colors hover:text-opacity-70"
        >
          <span className="relative">
            Book Add-On
            <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:origin-left group-hover:scale-x-100" />
          </span>
          <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5 pt-[2px]">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          className="relative min-h-[26rem] overflow-hidden md:min-h-full"
          data-header-theme="light"
        >
          <Image
            src={assetPath("/assets/services/addons_new.png")}
            alt="Additional luxury beauty services"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(180deg, oklch(0.985 0.010 55 / 0.02) 0%, oklch(0.180 0.008 35 / 0.12) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Section intro ────────────────────────────────────────────────────────────

function ServicesIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const { gsap } = ensureGsap();
      gsap.fromTo(
        ".intro-item",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 82%", toggleActions: "play none none reverse" },
        }
      );
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <div
      ref={ref}
      className="relative z-10 mx-auto max-w-2xl px-5 py-16 text-center md:py-20"
      style={{ background: "oklch(0.985 0.010 55)" }}
    >
      <div className="intro-item mb-5 flex items-center justify-center gap-3">
        <span className="block h-px w-7" style={{ background: "oklch(0.637 0.177 32.7 / 0.45)" }} />
        <span className="font-body text-[0.68rem] uppercase tracking-[0.28em]" style={{ color: "oklch(0.637 0.177 32.7)" }}>
          The Rituals
        </span>
        <span className="block h-px w-7" style={{ background: "oklch(0.637 0.177 32.7 / 0.45)" }} />
      </div>

      <h2
        className="intro-item font-display m-0"
        style={{
          fontSize: "clamp(2.4rem, 8vw, 4rem)",
          lineHeight: 1.06,
          color: "oklch(0.269 0.010 303.8)",
          letterSpacing: "-0.01em",
        }}
      >
        Every visit, a ritual.
      </h2>

      <p
        className="intro-item font-body mx-auto mt-5"
        style={{
          fontSize: "clamp(0.93rem, 3.5vw, 1.05rem)",
          lineHeight: 1.78,
          color: "oklch(0.560 0.050 35)",
          maxWidth: "38ch",
        }}
      >
        Discover our curated menu — each experience designed to feel less like an appointment and more like a ceremony.
      </p>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function ServicesSection() {
  return (
    <section
      id="services"
      style={{ position: "relative", zIndex: 10, background: "oklch(0.985 0.010 55)" }}
    >
      <ServicesIntro />

      {/* Mobile-first: stacked cards */}
      <MobileRituals />

      {/* Desktop: pinned scroll sequence */}
      <DesktopPinnedRituals />

      <AddOnsSection />
    </section>
  );
}
