import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { getBookingLink } from "@/lib/booking/get-booking-link";

const serviceMap = {
  nails: {
    title: "Nail Rituals",
    body:
      "A more polished approach to nail care, designed to feel composed, premium, and visually refined from start to finish."
  },
  brows: {
    title: "Brow Design",
    body:
      "Brow services shaped around facial harmony, clean detail, and an intentionally elevated final result."
  },
  beauty: {
    title: "Beauty Edit",
    body:
      "A curated space for future beauty extensions, framed as part of a cohesive Le Coquette experience rather than a crowded menu."
  }
};

export function generateStaticParams() {
  return Object.keys(serviceMap).map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceMap[slug as keyof typeof serviceMap];

  if (!service) {
    notFound();
  }

  return (
    <div className="px-4 pb-24 pt-32 md:px-6 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-5xl rounded-[2.6rem] border border-[var(--color-border)] bg-white/84 p-8 shadow-[0_20px_80px_rgba(122,48,27,0.08)] md:p-12">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-primary)]">
          Service Detail
        </p>
        <h1 className="mt-5 font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.05em] text-[var(--color-foreground-strong)]">
          {service.title}
        </h1>
        <p className="mt-6 max-w-3xl text-[1.08rem] leading-8 text-[var(--color-foreground-muted)]">
          {service.body}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href={getBookingLink(`service-${slug}`)} size="lg">
            Reserve this appointment
          </ButtonLink>
          <ButtonLink href="/services" variant="outline" size="lg">
            Back to services
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
