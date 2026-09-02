import type { ReactNode, ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

type Variant = "primary" | "gold" | "outline" | "ghost" | "dark" | "danger-outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Internal route — renders a React Router Link */
  to?: string;
  /** External URL (https:, tel:, wa.me…) — renders an anchor */
  href?: string;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm shadow-brand-900/20",
  gold: "bg-gold-400 text-ink-900 hover:bg-gold-300 active:bg-gold-500 shadow-sm shadow-gold-700/20",
  outline:
    "bg-white text-brand-700 ring-1 ring-inset ring-brand-200 hover:bg-brand-50 hover:ring-brand-300",
  ghost: "text-brand-700 hover:bg-brand-50",
  dark: "bg-ink-900 text-white hover:bg-ink-800",
  "danger-outline":
    "bg-white text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-50 hover:ring-red-300",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-13 px-7 text-base gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  fullWidth,
  className,
  type,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-xl font-semibold tracking-tight transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "active:scale-[0.98]",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
