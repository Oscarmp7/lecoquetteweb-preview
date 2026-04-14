import Link from "next/link";
import { AtSign, MapPin, MessageCircle, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { getBookingLink } from "@/lib/booking/get-booking-link";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-noir)] text-[var(--color-noir-foreground)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_0.8fr_0.8fr] md:px-10">
        <div className="space-y-6">
          <p className="font-display text-5xl tracking-[-0.05em] text-white">
            LeCoquette
          </p>
          <p className="max-w-md text-base leading-8 text-white/72">
            Warm-premium rituals, refined beauty care, and a more intentional
            way to reserve time for yourself.
          </p>
          <ButtonLink href={getBookingLink("footer")} variant="secondary">
            Reserve on WhatsApp
          </ButtonLink>
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-noir-accent)]">
            Navigate
          </p>
          <div className="flex flex-col gap-3 text-white/78">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <Link href="/">Home</Link>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-noir-accent)]">
            Contact
          </p>
          <div className="space-y-3 text-white/78">
            <p className="flex items-center gap-3">
              <Phone size={16} /> (786) 599-8161
            </p>
            <p className="flex items-center gap-3">
              <MessageCircle size={16} /> WhatsApp reservations
            </p>
            <p className="flex items-center gap-3">
              <AtSign size={16} /> @lecoquette_spa
            </p>
            <p className="flex items-center gap-3">
              <MapPin size={16} /> Luxury appointments by booking request
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
