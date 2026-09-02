import type { ReactNode } from "react";
import { BadgeCheck, PhoneCall, Users, ShieldAlert } from "lucide-react";
import { cn } from "../lib/utils";

type BadgeVariant = "green" | "gold" | "slate" | "red" | "outline" | "dark";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  green: "bg-brand-50 text-brand-700 ring-brand-200",
  gold: "bg-gold-100 text-gold-700 ring-gold-300",
  slate: "bg-ink-100 text-ink-600 ring-ink-200",
  red: "bg-red-50 text-red-700 ring-red-200",
  outline: "bg-white text-ink-600 ring-ink-200",
  dark: "bg-ink-900 text-canvas ring-ink-700",
};

export default function Badge({ children, variant = "slate", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <Badge variant="green" className={className}>
      <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
      Verified
    </Badge>
  );
}

export function PhoneVerifiedBadge({ className }: { className?: string }) {
  return (
    <Badge variant="outline" className={className}>
      <PhoneCall className="h-3 w-3" aria-hidden="true" />
      Phone verified
    </Badge>
  );
}

export function CommunityReportedBadge({ className }: { className?: string }) {
  return (
    <Badge variant="gold" className={className}>
      <Users className="h-3 w-3" aria-hidden="true" />
      Community reported
    </Badge>
  );
}

export function SampleDataBadge({ className }: { className?: string }) {
  return (
    <Badge variant="slate" className={className}>
      <ShieldAlert className="h-3 w-3" aria-hidden="true" />
      Sample data
    </Badge>
  );
}
