import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const services = [
  {
    title: "Nail Rituals",
    slug: "nails",
    description:
      "A refined manicure and nail presentation experience shaped around polish, finish, and a more elevated final impression."
  },
  {
    title: "Brow Design",
    slug: "brows",
    description:
      "Brow shaping and design approached with softness, structure, and a tailored sense of facial balance."
  },
  {
    title: "Beauty Edit",
    slug: "beauty",
    description:
      "A curated space for future beauty extensions, framed as part of a cohesive Le Coquette experience rather than a crowded menu."
  }
];

export default function ServicesPage() {
  return (
    <div className="px-4 pb-24 pt-32 md:px-6 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="Services"
          title="The service menu should feel curated, not crowded."
          body="This page is structured to keep the commercial hierarchy clear while preserving the calm, luxury-led tone of the rest of the site."
        />
        <div className="grid gap-5">
          {services.map((service) => (
            <article
              key={service.slug}
              className="grid gap-6 rounded-[2.2rem] border border-[var(--color-border)] bg-white/84 p-6 shadow-[0_18px_70px_rgba(122,48,27,0.08)] md:grid-cols-[0.8fr_1.2fr] md:p-8"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-primary)]">
                  Signature service
                </p>
                <h2 className="mt-4 font-display text-[clamp(2.3rem,4vw,4rem)] leading-[0.95] tracking-[-0.04em] text-[var(--color-foreground-strong)]">
                  {service.title}
                </h2>
              </div>
              <div className="space-y-5">
                <p className="max-w-2xl text-[1.03rem] leading-8 text-[var(--color-foreground-muted)]">
                  {service.description}
                </p>
                <ButtonLink href={`/services/${service.slug}`} variant="outline">
                  View service details
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
