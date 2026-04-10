import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBookingLink } from "@/lib/booking/get-booking-link";

export default function ReservePage() {
  return (
    <div className="px-4 pb-24 pt-32 md:px-6 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-5xl rounded-[2.6rem] border border-[var(--color-border)] bg-white/84 p-8 shadow-[0_18px_70px_rgba(122,48,27,0.08)] md:p-12">
        <SectionHeading
          eyebrow="Reserve"
          title="The booking path is simple now, but already designed for what comes next."
          body="WhatsApp is the current booking destination. The site architecture is ready for a future shift toward a dedicated Le Coquette reservation system."
        />
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href={getBookingLink("reserve-page")} size="lg">
            Continue to WhatsApp
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Contact first
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
