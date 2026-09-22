import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90",
  secondary:
    "border border-foreground/20 text-foreground hover:border-foreground/50",
  ghost: "text-foreground hover:text-accent",
  dark: "bg-background text-dark hover:bg-surface",
};

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  "aria-label"?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[0.8125rem] tracking-[0.08em] uppercase transition-colors duration-500 ease-[var(--ease-premium)]",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
