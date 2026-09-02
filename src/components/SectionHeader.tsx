import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; to: string };
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  dark = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 md:mb-10",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      , className)}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p
            className={cn(
              "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]",
              dark ? "text-gold-400" : "text-brand-600"
            )}
          >
            <span className={cn("kente inline-block h-1 w-8 rounded-full")} aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl",
            dark ? "text-white" : "text-ink-900"
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={cn("mt-2 text-[15px] leading-relaxed", dark ? "text-ink-300" : "text-ink-500")}>
            {description}
          </p>
        )}
      </div>
      {action && (
        <Link
          to={action.to}
          className={cn(
            "group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-md px-1 py-0.5",
            dark ? "text-gold-400 hover:text-gold-300" : "text-brand-600 hover:text-brand-800"
          )}
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-600",
        className
      )}
    >
      <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
      {children}
    </p>
  );
}
