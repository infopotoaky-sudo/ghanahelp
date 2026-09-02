import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, BadgeCheck, MapPin, Store } from "lucide-react";
import BusinessCard from "../components/BusinessCard";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import Reveal from "../components/Reveal";
import BusinessCta from "../components/BusinessCta";
import { SampleDataBadge } from "../components/Badge";
import { searchBusinesses } from "../services/businesses";
import { businessCategories, businessCities } from "../data/businesses";
import type { Business } from "../types";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../lib/utils";

export default function Businesses() {
  usePageMeta(
    "Businesses & Professionals | Ghana Help Hub",
    "Find trusted Ghanaian businesses and professionals — electricians, mechanics, tutors, photographers and more."
  );

  const location = useLocation();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [city, setCity] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [results, setResults] = useState<Business[] | null>(null);

  useEffect(() => {
    let active = true;
    const t = setTimeout(() => {
      searchBusinesses({ query, category, city, verifiedOnly }).then((r) => {
        if (active) setResults(r);
      });
    }, 200);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [query, category, city, verifiedOnly]);

  // Support the /businesses#list-my-business anchor used across the site
  useEffect(() => {
    if (location.hash === "#list-my-business") {
      const el = document.getElementById("list-my-business");
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, [location.hash]);

  const hasFilters = query.trim() !== "" || category !== "all" || city !== "all" || verifiedOnly;
  const cities = useMemo(() => businessCities, []);

  const selectClass =
    "h-11 rounded-xl border border-ink-200 bg-white px-3 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 w-full";

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
            <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
            Businesses
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              Find businesses &amp; professionals
            </h1>
            <SampleDataBadge className="mt-2" />
          </div>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-500">
            Every listing below is fictional demo data. Verification badges mark verified
            profiles — not a guarantee of service.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-card sm:p-5">
          <form
            role="search"
            aria-label="Search businesses"
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 rounded-xl border border-ink-200 bg-canvas px-3.5 transition-all focus-within:border-brand-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-100"
          >
            <Search className="h-4.5 w-4.5 shrink-0 text-brand-600" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, service or keyword — e.g. “electrician”, “kente”…"
              aria-label="Search businesses"
              className="h-11 min-w-0 flex-1 bg-transparent text-sm font-medium text-ink-900 outline-none placeholder:text-ink-400"
            />
          </form>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-ink-500">Category</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
                <option value="all">All categories</option>
                {businessCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

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

            <div className="flex items-end">
              <button
                type="button"
                role="switch"
                aria-checked={verifiedOnly}
                onClick={() => setVerifiedOnly((v) => !v)}
                className={cn(
                  "flex h-11 w-full items-center justify-between rounded-xl border px-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  verifiedOnly
                    ? "border-brand-300 bg-brand-50 text-brand-700"
                    : "border-ink-200 bg-white text-ink-600 hover:border-brand-300"
                )}
              >
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                  Verified only
                </span>
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

            <div className="flex items-end justify-between gap-3 sm:col-span-2 lg:col-span-1">
              <p className="text-sm font-semibold text-ink-600" role="status">
                {results ? (
                  <>
                    <span className="font-display text-base font-extrabold text-ink-900">{results.length}</span>{" "}
                    listing{results.length === 1 ? "" : "s"}
                  </>
                ) : (
                  "Searching…"
                )}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                    setCity("all");
                    setVerifiedOnly(false);
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
          {!results ? (
            <LoadingState cards={6} />
          ) : results.length === 0 ? (
            <EmptyState
              icon={Store}
              title="No businesses found"
              text="Try changing your location or search term — or tell us what you need and we'll help find someone."
              action={
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setCategory("all");
                      setCity("all");
                      setVerifiedOnly(false);
                    }}
                    className="rounded-full border border-ink-200 bg-white px-4 py-2 text-xs font-bold text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    Clear filters
                  </button>
                  <Link
                    to="/post-request"
                    className="rounded-full bg-gold-400 px-4 py-2 text-xs font-bold text-ink-900 transition-colors hover:bg-gold-300"
                  >
                    Post what I need
                  </Link>
                </>
              }
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((business, i) => (
                <Reveal key={business.id} delay={Math.min(i % 6, 5) * 60}>
                  <BusinessCard business={business} index={i} />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <div id="list-my-business" className="mt-16 scroll-mt-24">
          <BusinessCta />
        </div>
      </section>
    </>
  );
}
