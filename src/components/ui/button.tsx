import Link, { type LinkProps } from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
  secondary:
    "border border-[var(--color-foreground-strong)] bg-transparent text-[var(--color-foreground-strong)] hover:bg-[var(--color-foreground-strong)] hover:text-white",
  ghost:
    "bg-transparent text-[var(--color-foreground-strong)] hover:bg-black/5",
  outline:
    "border border-[var(--color-border)] bg-transparent text-[var(--color-foreground-strong)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-11 px-5 text-sm",
  md: "h-12 px-6 text-sm md:text-[0.95rem]",
  lg: "h-14 px-7 text-base"
};

type SharedProps = {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", type = "button", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center rounded-[var(--radius-pill)] font-medium tracking-[0.08em] uppercase transition-all duration-500 ease-[var(--ease-standard)]",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

type ButtonLinkProps = SharedProps &
  LinkProps & {
    href: string;
  };

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  children,
  href,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-[var(--radius-pill)] font-medium tracking-[0.08em] uppercase transition-all duration-500 ease-[var(--ease-standard)]",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
