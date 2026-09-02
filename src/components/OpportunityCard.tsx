import { CalendarDays, MapPin, Building2, ArrowRight } from "lucide-react";
import type { Opportunity, OpportunityCategory } from "../types";
import { formatDate } from "../lib/utils";
import Badge from "./Badge";
import { SampleDataBadge } from "./Badge";

interface OpportunityCardProps {
  opportunity: Opportunity;
  onView: (o: Opportunity) => void;
  /** Hide the sample-data badge in dense contexts */
  hideSampleBadge?: boolean;
}

const categoryVariant: Record<OpportunityCategory, "green" | "gold" | "slate"> = {
  Scholarship: "gold",
  Grant: "green",
  Training: "slate",
  Internship: "green",
  Competition: "gold",
  Fellowship: "slate",
};

export function daysLeft(deadline: string): number {
  return Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export default function OpportunityCard({ opportunity, onView, hideSampleBadge }: OpportunityCardProps) {
  const left = daysLeft(opportunity.deadline);
  return (
    <article className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant={categoryVariant[opportunity.category]}>{opportunity.category}</Badge>
        {opportunity.verified && <Badge variant="green">Profile verified</Badge>}
        {!hideSampleBadge && <SampleDataBadge />}
      </div>

      <h3 className="font-display mt-3 text-[15px] font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
        {opportunity.title}
      </h3>
      <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-600">
        <Building2 className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
        {opportunity.organization}
      </p>

      <p className="mt-2.5 line-clamp-2 flex-1 text-[13px] leading-relaxed text-ink-500">
        {opportunity.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-ink-500">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
          {opportunity.location}
        </span>
        <span
          className={`inline-flex items-center gap-1 ${left <= 7 ? "font-bold text-red-600" : ""}`}
        >
          <CalendarDays className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
          {left <= 7 ? `Closes in ${left} day${left === 1 ? "" : "s"}` : `Deadline: ${formatDate(opportunity.deadline)}`}
        </span>
      </div>

      <div className="mt-4 border-t border-ink-100 pt-3.5">
        <button
          type="button"
          onClick={() => onView(opportunity)}
          className="inline-flex items-center gap-1 rounded-md text-sm font-bold text-brand-600 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          View Opportunity
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
