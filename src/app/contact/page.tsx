import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBookingLink } from "@/lib/booking/get-booking-link";

export default function ContactPage() {
  return (
    <div className="px-4 pb-24 pt-32 md:px-6 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionHeading
          eyebrow="Contact"
          title="Start the conversation in the most direct way possible."
          body="For V1, WhatsApp is the cleanest lead path. It keeps booking personal while the future in-house appointment system is prepared."
        />
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2.3rem] bg-[var(--color-noir)] p-8 text-[var(--color-noir-foreground)]">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-noir-accent)]">
              Reserve
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.6rem,4vw,4.5rem)] leading-[0.92] tracking-[-0.05em] text-white">
              Reserve on WhatsApp
            </h2>
            <p className="mt-4 max-w-xl leading-8 text-white/74">
              This keeps the first release flexible, personal, and easy to adapt
              once the brand-owned booking platform replaces it.
            </p>
            <ButtonLink
              href={getBookingLink("contact")}
              variant="secondary"
              className="mt-8"
            >
              Open WhatsApp
            </ButtonLink>
          </article>
          <article className="rounded-[2.3rem] border border-[var(--color-border)] bg-white/86 p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-primary)]">
              Reach us
            </p>
            <div className="mt-5 space-y-4 text-[var(--color-foreground-muted)]">
              <p>(786) 599-8161</p>
              <p>contact@lecoquetteluxspa.com</p>
              <p>Instagram: @lecoquette_spa</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
