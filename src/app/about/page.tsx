import { SectionHeading } from "@/components/ui/section-heading";

export default function AboutPage() {
  return (
    <div className="px-4 pb-24 pt-32 md:px-6 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-6xl space-y-12">
        <SectionHeading
          eyebrow="About"
          title="Le Coquette is meant to feel elegant, warm, and intentionally personal."
          body="The website should carry the same promise as the service experience itself: refinement without distance, luxury without noise, and an atmosphere shaped with care."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2.2rem] bg-[var(--color-surface-alt)] p-8">
            <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--color-foreground-strong)]">
              Brand Position
            </h2>
            <p className="mt-4 leading-8 text-[var(--color-foreground)]/76">
              Warm-premium beauty, presented with editorial restraint and a more
              elevated digital presence than the current site communicates.
            </p>
          </article>
          <article className="rounded-[2.2rem] border border-[var(--color-border)] bg-white/84 p-8">
            <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--color-foreground-strong)]">
              Service Philosophy
            </h2>
            <p className="mt-4 leading-8 text-[var(--color-foreground-muted)]">
              Personalization, polish, warmth, and a quieter kind of luxury that
              feels composed from booking to final result.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
