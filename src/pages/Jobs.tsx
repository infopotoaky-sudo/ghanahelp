import { useEffect, useMemo, useState } from "react";
import { Search, Briefcase, MapPin } from "lucide-react";
import JobCard from "../components/JobCard";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import Reveal from "../components/Reveal";
import BusinessCta from "../components/BusinessCta";
import { SampleDataBadge } from "../components/Badge";
import { getJobs } from "../services/jobs";
import type { Job, JobType } from "../types";
import { matchesQuery } from "../lib/utils";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../lib/utils";

const typeChips: Array<"all" | JobType> = [
  "all",
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Remote",
];

export default function Jobs() {
  usePageMeta(
    "Jobs in Ghana | Ghana Help Hub",
    "Browse job openings across Ghana — filter by city, job type and category."
  );

  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [type, setType] = useState<"all" | JobType>("all");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    let active = true;
    getJobs().then((j) => active && setJobs(j));
    return () => {
      active = false;
    };
  }, []);

  const cities = useMemo(
    () => Array.from(new Set((jobs ?? []).map((j) => j.city))).sort(),
    [jobs]
  );
  const categories = useMemo(
    () => Array.from(new Set((jobs ?? []).map((j) => j.category))).sort(),
    [jobs]
  );

  const filtered = useMemo(() => {
    if (!jobs) return null;
    return jobs.filter((j) => {
      if (type !== "all" && j.type !== type) return false;
      if (city !== "all" && j.city !== city) return false;
      if (category !== "all" && j.category !== category) return false;
      if (
        query.trim() &&
        !matchesQuery([j.title, j.company, j.location, j.category, j.type, j.description], query)
      ) {
        return false;
      }
      return true;
    });
  }, [jobs, query, city, type, category]);

  const hasFilters = query.trim() !== "" || city !== "all" || type !== "all" || category !== "all";

  const selectClass =
    "h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
            <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
            Jobs
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              Find your next role.
            </h1>
            <SampleDataBadge className="mt-2" />
          </div>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-500">
            Openings posted by businesses across Ghana. All listings are fictional demo data.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-card sm:p-5">
          <form
            role="search"
            aria-label="Search jobs"
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 rounded-xl border border-ink-200 bg-canvas px-3.5 transition-all focus-within:border-brand-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-100"
          >
            <Search className="h-4.5 w-4.5 shrink-0 text-brand-600" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Keyword — e.g. “developer”, “nurse”, “sales”…"
              aria-label="Search jobs by keyword"
              className="h-11 min-w-0 flex-1 bg-transparent text-sm font-medium text-ink-900 outline-none placeholder:text-ink-400"
            />
          </form>

          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Job type">
            {typeChips.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={type === t}
                onClick={() => setType(t)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-[13px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  type === t
                    ? "bg-brand-600 text-white shadow-sm"
                    : "border border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700"
                )}
              >
                {t === "all" ? "All types" : t}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1 text-xs font-bold text-ink-500">
                <MapPin className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                Location
              </span>
              <select value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
                <option value="all">All locations</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-ink-500">Category</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
                <option value="all">All categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-end justify-between gap-3">
              <p className="text-sm font-semibold text-ink-600" role="status">
                {filtered ? (
                  <>
                    <span className="font-display text-base font-extrabold text-ink-900">
                      {filtered.length}
                    </span>{" "}
                    opening{filtered.length === 1 ? "" : "s"}
                  </>
                ) : (
                  "Loading jobs…"
                )}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCity("all");
                    setType("all");
                    setCategory("all");
                  }}
                  className="text-sm font-bold text-brand-600 transition-colors hover:text-brand-800"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          {!filtered ? (
            <LoadingState cards={4} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No jobs match your search"
              text="Try a different keyword, another city or fewer filters. New openings are added regularly."
              action={
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCity("all");
                    setType("all");
                    setCategory("all");
                  }}
                  className="rounded-full bg-gold-400 px-4 py-2 text-xs font-bold text-ink-900 transition-colors hover:bg-gold-300"
                >
                  Clear all filters
                </button>
              }
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {filtered.map((job) => (
                <Reveal key={job.id}>
                  <JobCard job={job} />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16">
          <BusinessCta />
        </div>
      </section>
    </>
  );
}
