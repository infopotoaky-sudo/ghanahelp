import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Store,
  Briefcase,
  Target,
  SlidersHorizontal,
  MapPin,
  SearchX,
} from "lucide-react";
import BusinessCard from "../components/BusinessCard";
import JobCard from "../components/JobCard";
import OpportunityCard from "../components/OpportunityCard";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import { getBusinesses } from "../services/businesses";
import { getJobs } from "../services/jobs";
import { getOpportunities } from "../services/opportunities";
import type { Business, Job, Opportunity, SearchResult, SortKey } from "../types";
import { relevanceScore } from "../lib/utils";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../lib/utils";

const categoryChips = [
  { id: "all", label: "All" },
  { id: "services", label: "Services" },
  { id: "businesses", label: "Businesses" },
  { id: "jobs", label: "Jobs" },
  { id: "housing", label: "Housing" },
  { id: "education", label: "Education" },
  { id: "opportunities", label: "Opportunities" },
];

const budgetOptions = [
  { id: "any", label: "Any budget" },
  { id: "under500", label: "Under GH₵500" },
  { id: "500to2000", label: "GH₵500 – 2,000" },
  { id: "over2000", label: "GH₵2,000+" },
];

const sortOptions: Array<{ id: SortKey; label: string }> = [
  { id: "relevance", label: "Relevance" },
  { id: "newest", label: "Newest" },
  { id: "rating", label: "Highest rated" },
];

const suggestions = ["Electrician", "Tutor", "Mechanic", "Remote", "Scholarship", "Photographer"];

export default function FindHelp() {
  usePageMeta(
    "Find Help | Ghana Help Hub",
    "Search businesses, services, jobs and opportunities across Ghana."
  );

  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const cat = params.get("cat") ?? "all";
  const loc = params.get("loc") ?? "all";
  const budget = params.get("budget") ?? "any";
  const verifiedOnly = params.get("verified") === "1";
  const sort = (params.get("sort") as SortKey) ?? "relevance";

  const [input, setInput] = useState(q);
  const [businesses, setBusinesses] = useState<Business[] | null>(null);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[] | null>(null);

  useEffect(() => setInput(q), [q]);

  // Debounced live search → URL param
  useEffect(() => {
    const t = setTimeout(() => {
      if (input.trim() !== q) {
        updateParam("q", input.trim());
      }
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  useEffect(() => {
    let active = true;
    Promise.all([getBusinesses(), getJobs(), getOpportunities()]).then(([b, j, o]) => {
      if (!active) return;
      setBusinesses(b);
      setJobs(j);
      setOpportunities(o);
    });
    return () => {
      active = false;
    };
  }, []);

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (!value || value === "all" || value === "any" || value === "relevance") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setParams(next, { replace: true });
  }

  const cities = useMemo(() => {
    const set = new Set<string>();
    businesses?.forEach((b) => set.add(b.city));
    jobs?.forEach((j) => set.add(j.city));
    opportunities?.forEach((o) => set.add(o.location));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [businesses, jobs, opportunities]);

  /* ------------------------- Unified result building ------------------------- */
  const allResults = useMemo<SearchResult[]>(() => {
    if (!businesses || !jobs || !opportunities) return [];

    const b: SearchResult[] = businesses.map((x) => ({
      kind: "business",
      id: x.id,
      title: x.name,
      subtitle: x.tagline,
      location: x.location,
      link: `/businesses/${x.id}`,
      topics: [
        "businesses",
        "services",
        x.category.toLowerCase(),
        x.city.toLowerCase(),
        ...(x.category === "Tutor" ? ["education"] : []),
        ...x.keywords,
      ],
      rating: x.rating,
      verified: x.verified,
      date: x.createdAt,
      meta: x.category,
      budgetMin: null,
      score: 0,
    }));

    const j: SearchResult[] = jobs.map((x) => ({
      kind: "job",
      id: x.id,
      title: x.title,
      subtitle: `${x.company} · ${x.salary}`,
      location: x.location,
      link: `/jobs/${x.id}`,
      topics: [
        "jobs",
        x.category.toLowerCase(),
        x.city.toLowerCase(),
        x.type.toLowerCase(),
        x.company.toLowerCase(),
      ],
      rating: 0,
      verified: false,
      date: x.postedAt,
      meta: `${x.type} · ${x.salary}`,
      budgetMin: x.salaryMin,
      score: 0,
    }));

    const o: SearchResult[] = opportunities.map((x) => ({
      kind: "opportunity",
      id: x.id,
      title: x.title,
      subtitle: x.organization,
      location: x.location,
      link: `/opportunities?open=${x.id}`,
      topics: [
        "opportunities",
        x.category.toLowerCase(),
        x.location.toLowerCase(),
        ...(["Scholarship", "Training", "Fellowship"].includes(x.category) ? ["education"] : []),
      ],
      rating: 0,
      verified: x.verified,
      date: x.postedAt,
      meta: `${x.category} · deadline ${new Date(x.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`,
      budgetMin: null,
      score: 0,
    }));

    return [...b, ...j, ...o].map((r) => ({
      ...r,
      score: relevanceScore(
        [
          { value: r.title, weight: 6 },
          { value: r.subtitle, weight: 3 },
          { value: r.location, weight: 3 },
          { value: r.topics.join(" "), weight: 2 },
        ],
        q
      ),
    }));
  }, [businesses, jobs, opportunities, q]);

  const filtered = useMemo(() => {
    let list = allResults.filter((r) => (q.trim() ? r.score > 0 : true));
    if (cat !== "all") list = list.filter((r) => r.topics.includes(cat));
    if (loc !== "all") {
      const needle = loc.toLowerCase();
      list = list.filter(
        (r) => r.topics.includes(needle) || r.location.toLowerCase().includes(needle)
      );
    }
    if (budget !== "any") {
      list = list.filter((r) => {
        if (r.budgetMin == null) return true; // not salary-based — keep
        if (budget === "under500") return r.budgetMin <= 500;
        if (budget === "500to2000") return r.budgetMin <= 2000;
        return r.budgetMin >= 2000;
      });
    }
    if (verifiedOnly) list = list.filter((r) => r.verified);

    const sorted = [...list];
    if (sort === "newest") sorted.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating || +new Date(b.date) - +new Date(a.date));
    else sorted.sort((a, b) => b.score - a.score || +new Date(b.date) - +new Date(a.date));
    return sorted;
  }, [allResults, q, cat, loc, budget, verifiedOnly, sort]);

  const businessHits = filtered.filter((r) => r.kind === "business");
  const jobHits = filtered.filter((r) => r.kind === "job");
  const opportunityHits = filtered.filter((r) => r.kind === "opportunity");

  const businessById = useMemo(
    () => new Map((businesses ?? []).map((b) => [b.id, b])),
    [businesses]
  );
  const jobById = useMemo(() => new Map((jobs ?? []).map((j) => [j.id, j])), [jobs]);
  const oppById = useMemo(
    () => new Map((opportunities ?? []).map((o) => [o.id, o])),
    [opportunities]
  );

  const loading = !businesses || !jobs || !opportunities;
  const hasActiveFilters = q.trim() !== "" || cat !== "all" || loc !== "all" || budget !== "any" || verifiedOnly;

  const selectClass =
    "h-10 rounded-xl border border-ink-200 bg-white px-3 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

  return (
    <>
      {/* Header */}
      <section className="border-b border-ink-100 bg-white">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
            <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
            Find help
          </p>
          <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
            Find the help you need.
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-500">
            Search businesses, services, jobs and opportunities across Ghana — all in one
            place.
          </p>

          <div className="mt-6 max-w-2xl">
            <form
              role="search"
              aria-label="Search for help"
              className="group flex items-center gap-2 rounded-2xl border border-ink-200 bg-white p-1.5 shadow-card transition-all focus-within:border-brand-400 focus-within:shadow-lift focus-within:ring-2 focus-within:ring-brand-100"
              onSubmit={(e) => {
                e.preventDefault();
                updateParam("q", input.trim());
              }}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 sm:ml-1">
                <Search className="h-5 w-5" aria-hidden="true" />
              </span>
              <input
                type="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Try “electrician”, “job”, “scholarship”, “Kumasi”…"
                aria-label="Search query"
                className="h-11 min-w-0 flex-1 bg-transparent text-base font-medium text-ink-900 outline-none placeholder:text-ink-400"
              />
              {input && (
                <button
                  type="button"
                  onClick={() => {
                    setInput("");
                    updateParam("q", "");
                  }}
                  className="rounded-lg px-2 py-1 text-xs font-bold text-ink-400 hover:text-ink-700"
                >
                  Clear
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filter bar */}
        <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-card sm:p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-ink-700">
            <SlidersHorizontal className="h-4 w-4 text-brand-600" aria-hidden="true" />
            Filters
          </div>

          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Category">
            {categoryChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                role="tab"
                aria-selected={cat === chip.id}
                onClick={() => updateParam("cat", chip.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-[13px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  cat === chip.id
                    ? "bg-brand-600 text-white shadow-sm"
                    : "border border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700"
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1 text-xs font-bold text-ink-500">
                <MapPin className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                Location
              </span>
              <select
                value={loc}
                onChange={(e) => updateParam("loc", e.target.value)}
                className={cn(selectClass, "w-full")}
              >
                <option value="all">All locations</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-ink-500">Budget (job salaries)</span>
              <select
                value={budget}
                onChange={(e) => updateParam("budget", e.target.value)}
                className={cn(selectClass, "w-full")}
              >
                {budgetOptions.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-ink-500">Sort by</span>
              <select
                value={sort}
                onChange={(e) => updateParam("sort", e.target.value)}
                className={cn(selectClass, "w-full")}
              >
                {sortOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-end">
              <button
                type="button"
                role="switch"
                aria-checked={verifiedOnly}
                onClick={() => updateParam("verified", verifiedOnly ? "" : "1")}
                className={cn(
                  "flex h-10 w-full items-center justify-between rounded-xl border px-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  verifiedOnly
                    ? "border-brand-300 bg-brand-50 text-brand-700"
                    : "border-ink-200 bg-white text-ink-600 hover:border-brand-300"
                )}
              >
                Verified only
                <span
                  className={cn(
                    "relative h-5 w-9 rounded-full transition-colors",
                    verifiedOnly ? "bg-brand-600" : "bg-ink-200"
                  )}
                  aria-hidden="true"
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all",
                      verifiedOnly ? "left-[18px]" : "left-0.5"
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Results meta */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink-600" role="status">
            {loading ? (
              "Searching Ghana Help Hub…"
            ) : (
              <>
                <span className="font-display text-base font-extrabold text-ink-900">
                  {filtered.length}
                </span>{" "}
                result{filtered.length === 1 ? "" : "s"}
                {q.trim() && (
                  <>
                    {" "}for “<span className="text-brand-700">{q.trim()}</span>”
                  </>
                )}
              </>
            )}
          </p>
          {hasActiveFilters && !loading && (
            <button
              type="button"
              onClick={() => setParams(new URLSearchParams(), { replace: true })}
              className="text-sm font-bold text-brand-600 transition-colors hover:text-brand-800"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Results */}
        <div className="mt-6 space-y-12">
          {loading ? (
            <LoadingState cards={6} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title={cat === "housing" ? "No housing listings yet" : "No results found"}
              text={
                cat === "housing"
                  ? "Housing listings are coming soon. Post what you need — e.g. “a room near Legon” — and we'll help connect you."
                  : q.trim()
                    ? `We couldn't find anything matching “${q.trim()}”. Try a different keyword or clear your filters.`
                    : "Nothing matches these filters yet. Try widening your search."
              }
              action={
                <>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setInput(s);
                        updateParam("q", s);
                      }}
                      className="rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      {s}
                    </button>
                  ))}
                  <Button to="/post-request" variant="gold" size="sm">
                    Post what I need
                  </Button>
                </>
              }
            />
          ) : (
            <>
              {businessHits.length > 0 && (
                <ResultSection
                  icon={Store}
                  label="Businesses & professionals"
                  count={businessHits.length}
                >
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {businessHits.map((r, i) => {
                      const b = businessById.get(r.id);
                      return b ? (
                        <Reveal key={r.id} delay={Math.min(i, 5) * 60}>
                          <BusinessCard business={b} index={i} />
                        </Reveal>
                      ) : null;
                    })}
                  </div>
                </ResultSection>
              )}

              {jobHits.length > 0 && (
                <ResultSection icon={Briefcase} label="Jobs" count={jobHits.length}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {jobHits.map((r) => {
                      const j = jobById.get(r.id);
                      return j ? <JobCard key={r.id} job={j} /> : null;
                    })}
                  </div>
                </ResultSection>
              )}

              {opportunityHits.length > 0 && (
                <ResultSection icon={Target} label="Opportunities" count={opportunityHits.length}>
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {opportunityHits.map((r) => {
                      const o = oppById.get(r.id);
                      return o ? (
                        <OpportunityCard
                          key={r.id}
                          opportunity={o}
                          onView={() => navigate(`/opportunities?open=${o.id}`)}
                          hideSampleBadge
                        />
                      ) : null;
                    })}
                  </div>
                </ResultSection>
              )}
            </>
          )}
        </div>

        {/* Still stuck CTA */}
        {!loading && (
          <Reveal className="mt-14">
            <div className="flex flex-col items-center gap-5 rounded-3xl border border-gold-200 bg-gold-100/50 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h2 className="font-display text-xl font-bold text-ink-900">
                  Still can't find it?
                </h2>
                <p className="mt-1 text-sm text-ink-600">
                  Tell us exactly what you need — someone on Ghana Help Hub can help.
                </p>
              </div>
              <Button to="/post-request" variant="gold" size="lg" className="shrink-0">
                I Need Something
              </Button>
            </div>
          </Reveal>
        )}
      </section>
    </>
  );
}

function ResultSection({
  icon: Icon,
  label,
  count,
  children,
}: {
  icon: typeof Store;
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={label}>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-inset ring-brand-100">
          <Icon className="h-4.5 w-4.5 text-brand-600" aria-hidden="true" />
        </span>
        <h2 className="font-display text-lg font-bold text-ink-900">{label}</h2>
        <span className="rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-bold text-ink-600">
          {count}
        </span>
      </div>
      {children}
    </section>
  );
}
