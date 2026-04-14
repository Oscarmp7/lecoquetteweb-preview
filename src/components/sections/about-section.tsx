"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ensureGsap } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";
import { assetPath } from "@/lib/utils";

const PILLARS = [
  { label: "Location", value: "Gainesville, FL" },
  { label: "Specialty", value: "Nail · Brow · Beauty" },
  { label: "Experience", value: "By appointment" },
];

function DesktopAbout() {
  const outerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const { gsap } = ensureGsap();

      if (reducedMotion) {
        gsap.set(".ab-panel", { yPercent: 0 });
        gsap.set(".ab-copy", { opacity: 1, y: 0 });
        return;
      }

      const takeover = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1,
        },
      });

      takeover.fromTo(
        ".ab-panel",
        { yPercent: 100, opacity: 1 },
        { yPercent: 0, opacity: 1, ease: "none" }
      );

      gsap.fromTo(
        ".ab-copy",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.82,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top 35%",
            once: true,
          },
        }
      );
    },
    { scope: outerRef, dependencies: [reducedMotion] }
  );

  return (
    <div
      ref={outerRef}
      className="relative hidden md:block"
      style={{ height: "200vh", marginTop: "-100vh", zIndex: 20 }}
    >
      <div className="ab-panel sticky top-0 h-screen overflow-hidden" data-header-theme="light">
        <div className="ab-image absolute inset-0">
          <Image
            src={assetPath("/assets/services/bundles.png")}
            alt="LeCoquette spa atmosphere"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(270deg, oklch(0.180 0.008 35 / 0.88) 0%, oklch(0.180 0.008 35 / 0.74) 28%, oklch(0.180 0.008 35 / 0.28) 52%, oklch(0.180 0.008 35 / 0.08) 74%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.180 0.008 35 / 0.22) 0%, transparent 32%, transparent 72%, oklch(0.180 0.008 35 / 0.34) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative ml-auto flex h-full max-w-[42rem] flex-col justify-center px-10 py-20 text-left xl:px-16">
          <div className="ab-copy mb-6 flex items-center justify-start gap-3">
            <span className="block h-px w-8 shrink-0" style={{ background: "oklch(0.780 0.060 75)" }} />
            <span
              className="font-body text-[0.68rem] uppercase tracking-[0.28em]"
              style={{ color: "oklch(0.780 0.060 75)" }}
            >
              Our Story
            </span>
          </div>

          <h2
            className="ab-copy font-display m-0"
            style={{
              fontSize: "clamp(3.2rem, 6vw, 5.6rem)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
              color: "oklch(0.985 0.010 55)",
            }}
          >
            A softer kind
            <br />
            <span style={{ color: "oklch(0.780 0.060 75)" }}>of luxury.</span>
          </h2>

          <p
            className="ab-copy font-body mt-7 max-w-[34ch]"
            style={{
              fontSize: "clamp(0.95rem, 1.45vw, 1.05rem)",
              lineHeight: 1.88,
              color: "oklch(0.940 0.015 60 / 0.80)",
            }}
          >
            Every appointment at LeCoquette is designed to feel like more than just
            a service: warm, deliberate, and always personal. A refined beauty
            experience that stays with you long after you leave.
          </p>

          <div className="ab-copy mt-10 mb-8 h-px w-10" style={{ background: "oklch(0.780 0.060 75 / 0.38)" }} />

          <div className="flex flex-col gap-4">
            {PILLARS.map((pillar) => (
              <div key={pillar.label} className="ab-copy flex items-baseline gap-5">
                <span
                  className="font-body w-24 shrink-0 text-[0.62rem] uppercase tracking-[0.24em]"
                  style={{ color: "oklch(0.780 0.060 75 / 0.64)" }}
                >
                  {pillar.label}
                </span>
                <span
                  className="font-body"
                  style={{ fontSize: "0.9rem", fontWeight: 500, color: "oklch(0.940 0.015 60 / 0.90)" }}
                >
                  {pillar.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileAbout() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion) return;
      const { gsap } = ensureGsap();

      gsap.fromTo(
        ".mob-ab-shell",
        { y: 42, opacity: 0.92, immediateRender: false },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".mob-ab-copy",
        { opacity: 0, y: 20, immediateRender: false },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 72%",
            once: true,
          },
        }
      );
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <div ref={ref} className="relative md:hidden" style={{ marginTop: "-10vh", zIndex: 20 }}>
      <div className="mob-ab-shell relative overflow-hidden" data-header-theme="light">
        <div className="relative min-h-[100svh]">
          <Image
            src={assetPath("/assets/services/bundles.png")}
            alt="LeCoquette spa atmosphere"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.180 0.008 35 / 0.16) 0%, oklch(0.180 0.008 35 / 0.16) 28%, oklch(0.180 0.008 35 / 0.54) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="relative flex min-h-[100svh] items-end px-5 pb-14 pt-28">
            <div className="ml-auto w-full max-w-[22rem] text-right">
              <div className="mob-ab-copy mb-5 flex items-center gap-3">
                <span className="grow" />
                <span
                  className="font-body text-[0.66rem] uppercase tracking-[0.28em]"
                  style={{ color: "oklch(0.780 0.060 75)" }}
                >
                  Our Story
                </span>
                <span className="block h-px w-7 shrink-0" style={{ background: "oklch(0.780 0.060 75)" }} />
              </div>

              <h2
                className="mob-ab-copy font-display m-0"
                style={{
                  fontSize: "clamp(2.8rem, 10vw, 4rem)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.03em",
                  color: "oklch(0.985 0.010 55)",
                }}
              >
                A softer kind
                <br />
                <span style={{ color: "oklch(0.780 0.060 75)" }}>of luxury.</span>
              </h2>

              <p
                className="mob-ab-copy font-body mt-5 ml-auto max-w-[31ch]"
                style={{
                  fontSize: "0.96rem",
                  lineHeight: 1.82,
                  color: "oklch(0.940 0.015 60 / 0.82)",
                }}
              >
                Every appointment at LeCoquette is designed to feel warm, personal,
                and composed from beginning to end.
              </p>

              <div className="mob-ab-copy mt-8 flex flex-col gap-3">
                {PILLARS.map((pillar) => (
                  <div key={pillar.label} className="flex items-baseline justify-end gap-4">
                    <span
                      className="font-body"
                      style={{ fontSize: "0.875rem", fontWeight: 500, color: "oklch(0.985 0.010 55 / 0.90)" }}
                    >
                      {pillar.value}
                    </span>
                    <span
                      className="font-body w-20 shrink-0 text-right text-[0.62rem] uppercase tracking-[0.22em]"
                      style={{ color: "oklch(0.780 0.060 75 / 0.72)" }}
                    >
                      {pillar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24"
      style={{ position: "relative", zIndex: 20, overflow: "clip" }}
    >
      <MobileAbout />
      <DesktopAbout />
    </section>
  );
}
