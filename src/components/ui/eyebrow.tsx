import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]",
        className
      )}
    >
      <span className="h-px w-8 bg-current" />
      {children}
    </span>
  );
}
