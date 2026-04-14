"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap, gsap } from "@/lib/motion/gsap";
import { usePrefersReducedMotion } from "@/lib/motion/reduced-motion";

export function LenisProvider() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    ensureGsap();

    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true
    });

    const stopLenis = () => {
      lenis.stop();
    };

    const startLenis = () => {
      lenis.start();
    };

    lenis.on("scroll", () => {
      ensureGsap().ScrollTrigger.update();
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    window.addEventListener("lenis:stop", stopLenis);
    window.addEventListener("lenis:start", startLenis);

    return () => {
      window.removeEventListener("lenis:stop", stopLenis);
      window.removeEventListener("lenis:start", startLenis);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}
