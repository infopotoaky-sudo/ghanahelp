import { MapPin, Banknote, HeartHandshake } from "lucide-react";
import type { HelpRequest, RequestStatus } from "../types";
import { timeAgo } from "../lib/utils";
import Badge from "./Badge";
import { cn } from "../lib/utils";

interface RequestCardProps {
  request: HelpRequest;
  /** Hero feed style with kente accent */
  featured?: boolean;
  className?: string;
}

const statusMeta: Record<RequestStatus, { label: string; variant: "gold" | "green" | "slate" }> = {
  open: { label: "Looking for help", variant: "gold" },
  "in-progress": { label: "Being matched", variant: "green" },
  resolved: { label: "Resolved", variant: "slate" },
};

export default function RequestCard({ request, featured = false, className }: RequestCardProps) {
  const status = statusMeta[request.status];
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-white p-5 shadow-card transition-all duration-300",
        featured
          ? "border-brand-200 ring-1 ring-brand-100"
          : "border-ink-100 hover:-translate-y-0.5 hover:shadow-lift",
        className
      )}
    >
      {featured && <span className="kente absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              featured ? "bg-gold-100 text-gold-700" : "bg-brand-50 text-brand-600"
            )}
          >
            <HeartHandshake className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-[15px] font-bold text-ink-900">{request.title}</h3>
            <p className="mt-0.5 text-xs font-semibold tracking-wide text-ink-400">{request.id}</p>
          </div>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      <p className="mt-3 text-[13px] leading-relaxed text-ink-500">{request.description}</p>

      <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-ink-600">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
          {request.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Banknote className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
          {request.budget}
        </span>
        <span className="ml-auto text-[11px] font-medium text-ink-400">{timeAgo(request.createdAt)}</span>
      </div>
    </article>
  );
}
