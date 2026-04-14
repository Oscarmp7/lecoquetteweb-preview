import Link from "next/link";
import { AtSign, MapPin, MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { getBookingLink } from "@/lib/booking/get-booking-link";
import { LeCoquetteWordmark } from "@/components/ui/lecoquette-wordmark";

export function SiteFooter() {
  return (
    <footer className="w-full overflow-hidden bg-[var(--color-noir)] text-white">
      {/* Top Banner CTA */}
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-12 pt-16 text-center md:px-10 md:pb-16 md:pt-24">
        <h2 className="font-display mb-6 text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.05] tracking-tight">
          A softer kind<br />
          <span style={{ color: "oklch(0.637 0.177 32.7)" }}>of luxury.</span>
        </h2>
        <p className="font-body mb-8 max-w-[40ch] text-[clamp(0.95rem,1.2vw,1.05rem)] leading-relaxed text-white/50">
          Warm-premium rituals, refined beauty care, and a more intentional way to reserve time for yourself.
        </p>
        <ButtonLink href={getBookingLink("footer")} variant="secondary" className="px-10 md:px-12">
          Reserve on WhatsApp
        </ButtonLink>
      </div>

      {/* Thin elegant divider */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.780 0.060 75 / 0.12), transparent)" }}
      />

      {/* Grid Links container */}
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 md:grid md:grid-cols-2 md:px-10 md:py-16 lg:grid-cols-4 lg:gap-8">
        <div className="space-y-5 lg:col-span-2">
          <p
            className="font-body text-[0.6rem] uppercase tracking-[0.25em]"
            style={{ color: "oklch(0.637 0.177 32.7)" }}
          >
            Contact Us
          </p>
          <div className="font-body flex flex-col gap-4 text-[0.9rem] text-white/60">
            <a href="tel:+17865998161" className="flex w-fit items-center gap-3 transition-colors hover:text-white">
              <Phone size={14} strokeWidth={1.5} /> (786) 599-8161
            </a>
            <a href={getBookingLink("footer")} className="flex w-fit cursor-pointer items-center gap-3 transition-colors hover:text-white">
              <MessageCircle size={14} strokeWidth={1.5} /> WhatsApp reservations
            </a>
            <p className="flex w-fit items-center gap-3 transition-colors hover:text-white">
              <MapPin size={14} strokeWidth={1.5} /> Luxury appointments by booking request
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <p
            className="font-body text-[0.6rem] uppercase tracking-[0.25em]"
            style={{ color: "oklch(0.637 0.177 32.7)" }}
          >
            Navigate
          </p>
          <div className="font-body flex flex-col gap-3 text-[0.9rem] text-white/60">
            <a href="#services" className="w-fit transition-colors hover:text-white">Services</a>
            <a href="#about" className="w-fit transition-colors hover:text-white">About</a>
            <a href="#contact" className="w-fit transition-colors hover:text-white">Contact</a>
            <Link href="/" className="w-fit transition-colors hover:text-white">Home</Link>
          </div>
        </div>

        <div className="space-y-5">
          <p
            className="font-body text-[0.6rem] uppercase tracking-[0.25em]"
            style={{ color: "oklch(0.637 0.177 32.7)" }}
          >
            Social
          </p>
          <div className="font-body flex flex-col gap-3 text-[0.9rem] text-white/60">
            <a
              href="https://instagram.com/lecoquette_spa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-3 transition-colors hover:text-white"
            >
              <AtSign size={14} strokeWidth={1.5} /> @lecoquette_spa
            </a>
          </div>
        </div>
      </div>

      {/* Brand Wordmark at the base */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-8 pt-2 md:px-10">
        <div className="mb-10 h-px w-full md:mb-12" style={{ background: "oklch(1 1 1 / 0.05)" }} />

        <div className="flex w-full justify-center pb-6 opacity-90 md:pb-8">
          <LeCoquetteWordmark tone="light" zoom={4.5} className="h-auto w-full max-w-[22rem] origin-bottom md:max-w-3xl" />
        </div>

        <div className="font-body mt-2 flex w-full flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-center text-[0.55rem] uppercase tracking-[0.12em] text-white/30 md:flex-row">
          <p>© 2026 LeCoquette Luxury Spa. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-white/60">Privacy</Link>
            <Link href="/terms" className="transition-colors hover:text-white/60">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
