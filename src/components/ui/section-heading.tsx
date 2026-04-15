import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { ElementType } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
  as?: ElementType;
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className,
  as: TitleTag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-4",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <Eyebrow className={align === "center" ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <TitleTag className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.92] tracking-[-0.03em] text-[var(--color-foreground-strong)]">
        {title}
      </TitleTag>
      {body ? (
        <p className="max-w-2xl text-pretty text-[1.125rem] leading-8 text-[var(--color-foreground-muted)]">
          {body}
        </p>
      ) : null}
    </div>
  );
}
