import Link from "next/link";
import { AtSign, MapPin, MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { getBookingLink } from "@/lib/booking/get-booking-link";
import { LeCoquetteWordmark } from "@/components/ui/lecoquette-wordmark";

export function SiteFooter() {
  return (
    <footer className="w-full overflow-hidden bg-[var(--color-noir)] text-white">
      {/* Top Banner CTA (only visible well on desktop but fluid for mobile) */}
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-16 pt-24 text-center md:px-10 md:pb-24 md:pt-32">
        <h2 className="font-display mb-8 text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05] tracking-tight">
          A softer kind<br />
          <span style={{ color: "oklch(0.637 0.177 32.7)" }}>of luxury.</span>
        </h2>
        <p className="font-body mb-10 max-w-[40ch] text-[clamp(0.95rem,1.5vw,1.1rem)] leading-relaxed text-white/60">
          Warm-premium rituals, refined beauty care, and a more intentional way to reserve time for yourself.
        </p>
        <ButtonLink href={getBookingLink("footer")} variant="secondary" className="px-12">
          Reserve on WhatsApp
        </ButtonLink>
      </div>

      {/* Thin elegant divider */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.780 0.060 75 / 0.15), transparent)" }}
      />

      {/* Grid Links container */}
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 md:grid md:grid-cols-2 md:px-10 md:py-20 lg:grid-cols-4 lg:gap-8">
        <div className="space-y-6 lg:col-span-2">
          <p
            className="font-body text-[0.62rem] uppercase tracking-[0.26em]"
            style={{ color: "oklch(0.637 0.177 32.7)" }}
          >
            Contact Us
          </p>
          <div className="font-body flex flex-col gap-5 text-[0.95rem] text-white/70">
            <a href="tel:+17865998161" className="flex items-center gap-4 transition-colors hover:text-white">
              <Phone size={15} strokeWidth={1.2} /> (786) 599-8161
            </a>
            <a href={getBookingLink("footer")} className="flex cursor-pointer items-center gap-4 transition-colors hover:text-white">
              <MessageCircle size={15} strokeWidth={1.2} /> WhatsApp reservations
            </a>
            <p className="flex items-center gap-4 transition-colors hover:text-white">
              <MapPin size={15} strokeWidth={1.2} /> Luxury appointments by booking request
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p
            className="font-body text-[0.62rem] uppercase tracking-[0.26em]"
            style={{ color: "oklch(0.637 0.177 32.7)" }}
          >
            Navigate
          </p>
          <div className="font-body flex flex-col gap-4 text-[0.95rem] text-white/70">
            <a href="#services" className="transition-colors hover:text-white">Services</a>
            <a href="#about" className="transition-colors hover:text-white">About</a>
            <a href="#contact" className="transition-colors hover:text-white">Contact</a>
            <Link href="/" className="transition-colors hover:text-white">Home</Link>
          </div>
        </div>

        <div className="space-y-6">
          <p
            className="font-body text-[0.62rem] uppercase tracking-[0.26em]"
            style={{ color: "oklch(0.637 0.177 32.7)" }}
          >
            Social
          </p>
          <div className="font-body flex flex-col gap-4 text-[0.95rem] text-white/70">
            <a
              href="https://instagram.com/lecoquette_spa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 transition-colors hover:text-white"
            >
              <AtSign size={15} strokeWidth={1.2} /> @lecoquette_spa
            </a>
          </div>
        </div>
      </div>

      {/* Massive Brand Wordmark at the base */}
      <div className="relative flex w-full flex-col items-center px-5 pb-10 pt-4 md:px-10">
        <div className="mb-12 h-px w-full md:mb-16" style={{ background: "oklch(1 1 1 / 0.05)" }} />

        <div className="flex w-full justify-center pb-6 opacity-[0.85] md:pb-8">
          <LeCoquetteWordmark tone="light" zoom={1} className="h-auto w-full origin-bottom" style={{ maxWidth: "100%", maxHeight: "28vh" }} />
        </div>

        <div className="font-body mt-2 flex w-full flex-col items-center justify-between gap-3 text-center text-[0.58rem] uppercase tracking-[0.14em] text-white/30 md:flex-row">
          <p>© 2026 LeCoquette Luxury Spa. All rights reserved.</p>
          <p>By Appointment Only. Gainesville, FL.</p>
        </div>
      </div>
    </footer>
  );
}
