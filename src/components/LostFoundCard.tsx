import { MapPin, CalendarDays, PackageSearch, Phone } from "lucide-react";
import type { LostFoundItem, LostFoundStatus } from "../types";
import { formatDate } from "../lib/utils";
import Badge from "./Badge";

interface LostFoundCardProps {
  item: LostFoundItem;
  onReport: (item: LostFoundItem) => void;
}

const statusMeta: Record<LostFoundStatus, { label: string; variant: "red" | "green" | "slate" }> = {
  lost: { label: "Lost", variant: "red" },
  found: { label: "Found", variant: "green" },
  resolved: { label: "Resolved", variant: "slate" },
};

export default function LostFoundCard({ item, onReport }: LostFoundCardProps) {
  const status = statusMeta[item.status];
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <div
        className={`relative flex h-24 items-center justify-center ${
          item.type === "lost"
            ? "bg-gradient-to-br from-red-50 to-gold-100"
            : "bg-gradient-to-br from-brand-50 to-brand-100"
        }`}
        aria-hidden="true"
      >
        <PackageSearch
          className={`h-9 w-9 ${item.type === "lost" ? "text-red-300" : "text-brand-300"} transition-transform duration-300 group-hover:scale-110`}
        />
        <span className="absolute left-3 top-3">
          <Badge variant={status.variant}>{status.label}</Badge>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-ink-400">
          {item.category}
        </p>
        <h3 className="font-display mt-1.5 text-[15px] font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-ink-500">
          {item.description}
        </p>

        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-ink-500">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
            {item.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
            {formatDate(item.date)}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-ink-100 pt-3.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500">
            <Phone className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
            {item.contact}
          </span>
          <button
            type="button"
            onClick={() => onReport(item)}
            className="rounded-lg px-2 py-1 text-sm font-bold text-brand-600 transition-colors hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Report
          </button>
        </div>
      </div>
    </article>
  );
}
