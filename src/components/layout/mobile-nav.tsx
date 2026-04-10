"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { getBookingLink } from "@/lib/booking/get-booking-link";
import { cn } from "@/lib/utils";
const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

type MobileNavProps = {
  tone: "light" | "dark";
};

const panelTransition = {
  type: "spring",
  stiffness: 240,
  damping: 28,
  mass: 0.95,
} as const;

export function MobileNav({ tone }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        className={cn(
          "relative z-[80] inline-flex h-12 w-12 cursor-pointer items-center justify-center transition-all duration-[var(--duration-medium)] ease-[var(--ease-standard)] md:h-14 md:w-14",
          tone === "light" ? "text-white" : "text-[oklch(0.269_0.010_303.8/0.82)]"
        )}
        onClick={() => setOpen((state) => !state)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="site-navigation-drawer"
      >
        <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
        <span className="relative flex h-4 w-7 flex-col justify-between md:h-5 md:w-8">
          <span
            className={cn(
              "block rounded-full bg-current transition-all duration-300 ease-[var(--ease-standard)]",
              open
                ? "w-7 translate-y-[7px] rotate-45 origin-center md:w-8 md:translate-y-[9px]"
                : "w-7 origin-right md:w-8"
            )}
            style={{ height: "0.9px" }}
          />
          <span
            className={cn(
              "block rounded-full bg-current transition-all duration-300 ease-[var(--ease-standard)]",
              open ? "opacity-0" : "w-4 self-end opacity-100 md:w-5"
            )}
            style={{ height: "0.9px" }}
          />
          <span
            className={cn(
              "block rounded-full bg-current transition-all duration-300 ease-[var(--ease-standard)]",
              open
                ? "w-7 -translate-y-[7px] -rotate-45 origin-center md:w-8 md:-translate-y-[9px]"
                : "w-5 self-end origin-right md:w-6"
            )}
            style={{ height: "0.9px" }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[60] bg-[rgba(28,16,10,0.24)] backdrop-blur-[10px]"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              id="site-navigation-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={panelTransition}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(34rem,100vw)] flex-col border-l border-[rgba(137,63,39,0.08)] bg-[linear-gradient(180deg,rgba(255,252,248,0.985)_0%,rgba(255,246,240,0.97)_58%,rgba(249,236,228,0.97)_100%)] px-8 pb-8 pt-24 shadow-[-28px_0_90px_rgba(54,20,7,0.12)] md:px-12 md:pt-28"
              aria-modal="true"
              role="dialog"
              aria-label="Site navigation"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,230,213,0.55),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.26),transparent_38%,rgba(193,97,68,0.04)_100%)]" />

              <div className="relative flex h-full flex-col">
                <div className="mb-10 pt-12 text-center">
                  <p className="font-body text-[0.68rem] uppercase tracking-[0.42em] text-[var(--color-foreground-muted)]">
                    Navigation
                  </p>
                </div>

                <nav className="flex flex-1 flex-col items-center justify-center gap-8" aria-label="Primary">
                  {links.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        duration: 0.34,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.06 + index * 0.05,
                      }}
                    >
                      <Link
                        href={link.href}
                        className="group flex min-w-[12rem] flex-col items-center gap-3 text-center text-[clamp(2rem,6vw,3.2rem)] font-display leading-[0.92] tracking-[-0.05em] text-[var(--color-foreground-strong)] transition-all duration-[var(--duration-medium)] ease-[var(--ease-standard)] hover:text-[var(--color-primary)] focus-visible:text-[var(--color-primary)]"
                        onClick={() => setOpen(false)}
                      >
                        <span>{link.label}</span>
                        <span className="h-px w-0 bg-[var(--color-primary)] transition-all duration-300 ease-[var(--ease-standard)] group-hover:w-16 group-focus-visible:w-16" aria-hidden="true">
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
                  className="flex flex-col items-center pt-8 text-center"
                >
                  <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[var(--color-foreground-muted)]">
                    Reserve
                  </p>
                  <p className="mt-4 max-w-[18rem] font-body text-[0.98rem] leading-7 text-[var(--color-foreground)]">
                    Book your appointment in a calmer flow designed around the mobile experience first.
                  </p>
                  <ButtonLink
                    href={getBookingLink("mobile-nav")}
                    className="mt-8 min-w-[18rem] bg-transparent px-0 py-0 font-display text-[1.3rem] tracking-[-0.03em] text-[var(--color-primary)] shadow-none hover:bg-transparent hover:text-[var(--color-primary-hover)]"
                    onClick={() => setOpen(false)}
                  >
                    Reserve an Appointment
                  </ButtonLink>
                </motion.div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
