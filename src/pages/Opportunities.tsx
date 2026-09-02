import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Target, Building2, MapPin, CalendarDays, BadgeCheck, ExternalLink } from "lucide-react";
import OpportunityCard, { daysLeft } from "../components/OpportunityCard";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import Modal from "../components/Modal";
import Badge, { SampleDataBadge } from "../components/Badge";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import { getOpportunities } from "../services/opportunities";
import type { Opportunity, OpportunityCategory } from "../types";
import { formatDate } from "../lib/utils";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../lib/utils";

const tabs: Array<"All" | OpportunityCategory> = [
  "All",
  "Scholarship",
  "Grant",
  "Training",
  "Internship",
  "Competition",
  "Fellowship",
];

export default function Opportunities() {
  usePageMeta(
    "Opportunities in Ghana | Ghana Help Hub",
    "Scholarships, grants, training programmes, internships, competitions and fellowships in Ghana."
  );

  const [opps, setOpps] = useState<Opportunity[] | null>(null);
  const [tab, setTab] = useState<"All" | OpportunityCategory>("All");
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [openId, setOpenId] = useState<string | null>(() => {
    const m = window.location.hash.match(/[?&]open=([^&]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  });

  useEffect(() => {
    let active = true;
    getOpportunities().then((o) => active && setOpps(o));
    return () => {
      active = false;
    };
  }, []);

  // Open a specific opportunity when arriving from Find Help (?open=id)
  useEffect(() => {
    if (!opps || !openId) return;
    const found = opps.find((o) => o.id === openId);
    if (found) setSelected(found);
    setOpenId(null);
  }, [opps, openId]);

  const filtered = useMemo(() => {
    if (!opps) return null;
    const list = tab === "All" ? opps : opps.filter((o) => o.category === tab);
    return [...list].sort((a, b) => +new Date(a.deadline) - +new Date(b.deadline));
  }, [opps, tab]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    (opps ?? []).forEach((o) => map.set(o.category, (map.get(o.category) ?? 0) + 1));
    return map;
  }, [opps]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
            <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
            Opportunities
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              Opportunities worth chasing.
            </h1>
            <SampleDataBadge className="mt-2" />
          </div>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-500">
            Scholarships, grants, training, internships, competitions and fellowships. Every
            listing here is clearly marked sample data for the demo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Opportunity categories">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-[13px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                tab === t
                  ? "bg-brand-600 text-white shadow-sm"
                  : "border border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700"
              )}
            >
              {t === "All" ? "All" : `${t}s`}
              <span className={cn("ml-1.5 text-[11px]", tab === t ? "text-brand-100" : "text-ink-400")}>
                {t === "All" ? (opps?.length ?? "…") : (counts.get(t) ?? 0)}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          {!filtered ? (
            <LoadingState cards={6} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Target}
              title={`No ${tab.toLowerCase()}s right now`}
              text="New opportunities are added regularly. Tell us what you're looking for and we'll keep an eye out for you."
              action={
                <Button to="/post-request" variant="gold" size="sm">
                  Post what I need
                </Button>
              }
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((o, i) => (
                <Reveal key={o.id} delay={Math.min(i % 6, 5) * 60}>
                  <OpportunityCard opportunity={o} onView={setSelected} />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-brand-200 bg-brand-50 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="font-display text-xl font-bold text-ink-900">
                Know an opportunity others should see?
              </h2>
              <p className="mt-1 text-sm text-ink-600">
                Scholarships, trainings, grants — share them with the community via Ghana Help Hub.
              </p>
            </div>
            <Link
              to="/contact"
              className="shrink-0 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              Share an opportunity
            </Link>
          </div>
        </Reveal>
      </section>

      {selected && (
        <Modal
          open
          onClose={() => setSelected(null)}
          title={selected.title}
          eyebrow={selected.category}
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {selected.verified && (
                <Badge variant="green">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Profile verified
                </Badge>
              )}
              <SampleDataBadge />
            </div>

            <p className="flex items-center gap-1.5 text-sm font-bold text-ink-700">
              <Building2 className="h-4 w-4 text-brand-600" aria-hidden="true" />
              {selected.organization}
            </p>
            <p className="text-sm leading-relaxed text-ink-600">{selected.description}</p>

            <ul className="space-y-2 rounded-xl bg-canvas p-4 ring-1 ring-inset ring-ink-200">
              {selected.details.map((d) => (
                <li key={d} className="flex gap-2 text-[13px] leading-relaxed text-ink-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold text-ink-600">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                {selected.location}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1",
                  daysLeft(selected.deadline) <= 7 && "font-bold text-red-600"
                )}
              >
                <CalendarDays className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                Deadline: {formatDate(selected.deadline)}
              </span>
            </div>

            <div className="rounded-xl border border-gold-200 bg-gold-100/60 p-4 text-[13px] leading-relaxed text-ink-700">
              This is sample data for the Ghana Help Hub demo — the application link is not
              live. In production, “View Opportunity” opens the organiser's official page.
            </div>

            <Button variant="primary" fullWidth disabled>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Open official link (demo)
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
