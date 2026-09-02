import { Link } from "react-router-dom";
import { Banknote, Briefcase, Clock, MapPin, ArrowRight } from "lucide-react";
import type { Job } from "../types";
import { timeAgo } from "../lib/utils";
import Badge from "./Badge";

interface JobCardProps {
  job: Job;
  compact?: boolean;
}

export default function JobCard({ job, compact = false }: JobCardProps) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-inset ring-brand-100">
          <Briefcase className="h-5 w-5 text-brand-600" aria-hidden="true" />
        </div>
        <Badge variant={job.type === "Remote" ? "gold" : "slate"}>{job.type}</Badge>
      </div>

      <h3 className="font-display mt-3.5 text-[15px] font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
        {job.title}
      </h3>
      <p className="mt-0.5 text-[13px] font-semibold text-brand-700">{job.company}</p>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-ink-500">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Banknote className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
          {job.salary}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
          {timeAgo(job.postedAt)}
        </span>
      </div>

      {!compact && (
        <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-ink-500">{job.description}</p>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3.5">
        <span className="text-xs font-medium text-ink-400">{job.category}</span>
        <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 transition-colors group-hover:text-brand-800">
          Apply
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
