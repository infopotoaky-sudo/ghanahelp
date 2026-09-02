import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

interface LogoProps {
  dark?: boolean;
  compact?: boolean;
  className?: string;
}

/** Ghana Help Hub logo — green rounded pin with a gold heart-hand spark. Pure SVG, no assets. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden="true" focusable="false">
      <rect width="40" height="40" rx="11" fill="#006B3F" />
      <path
        d="M20 7.5c-5 0-9 3.9-9 8.8 0 6.5 9 16.2 9 16.2s9-9.7 9-16.2c0-4.9-4-8.8-9-8.8Z"
        fill="#F2C94C"
      />
      <path
        d="M20 12.6c1.1-1.6 3.5-1.5 4.4.1.7 1.3.2 2.8-1 3.9L20 19.5l-3.4-2.9c-1.2-1.1-1.7-2.6-1-3.9.9-1.6 3.3-1.7 4.4-.1Z"
        fill="#006B3F"
      />
      <circle cx="20" cy="23.4" r="1.6" fill="#006B3F" />
    </svg>
  );
}

export default function Logo({ dark = false, compact = false, className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn(
        "group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        className
      )}
      aria-label="Ghana Help Hub — home"
    >
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-6" />
      {!compact && (
        <span className="leading-none">
          <span
            className={cn(
              "font-display block text-[15px] font-extrabold tracking-tight",
              dark ? "text-white" : "text-ink-900"
            )}
          >
            GHANA HELP <span className="text-brand-600">HUB</span>
          </span>
          <span
            className={cn(
              "mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em]",
              dark ? "text-ink-400" : "text-ink-400"
            )}
          >
            Start here
          </span>
        </span>
      )}
    </Link>
  );
}
