import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Banknote,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock,
  ExternalLink,
  ListChecks,
  MapPin,
} from "lucide-react";
import Badge from "../components/Badge";
import Button from "../components/Button";
import Modal from "../components/Modal";
import JobCard from "../components/JobCard";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import Reveal from "../components/Reveal";
import { getJobById, getJobs } from "../services/jobs";
import type { Job } from "../types";
import { formatDate, timeAgo } from "../lib/utils";
import { usePageMeta } from "../hooks/usePageMeta";
import { daysLeft } from "../components/OpportunityCard";

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null | "missing">(null);
  const [related, setRelated] = useState<Job[]>([]);
  const [applyOpen, setApplyOpen] = useState(false);

  usePageMeta(
    job && job !== "missing" ? `${job.title} at ${job.company} | Ghana Help Hub` : "Job details | Ghana Help Hub"
  );

  useEffect(() => {
    if (!id) return;
    let active = true;
    setJob(null);
    getJobById(id).then(async (j) => {
      if (!active) return;
      if (!j) {
        setJob("missing");
        return;
      }
      setJob(j);
      const all = await getJobs();
      if (!active) return;
      setRelated(all.filter((x) => x.id !== j.id && (x.category === j.category || x.city === j.city)).slice(0, 2));
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (job === null) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <LoadingState label="Loading job…" />
      </section>
    );
  }

  if (job === "missing") {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <EmptyState
          icon={Briefcase}
          title="Job not found"
          text="This opening may have closed or the link is incorrect. Browse current openings instead."
          action={
            <Button to="/jobs" variant="primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to jobs
            </Button>
          }
        />
      </section>
    );
  }

  const j = job;
  const left = daysLeft(j.deadline);

  return (
    <>
      <section className="border-b border-ink-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-8 sm:px-6 lg:px-8">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 rounded-md text-sm font-bold text-brand-600 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All jobs
          </Link>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 ring-1 ring-inset ring-brand-100">
                <Briefcase className="h-6 w-6 text-brand-600" aria-hidden="true" />
              </span>
              <div>
                <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-3xl">
                  {j.title}
                </h1>
                <p className="mt-1 flex items-center gap-1.5 text-[15px] font-bold text-brand-700">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  {j.company}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-ink-500">
                  <Badge variant={j.type === "Remote" ? "gold" : "slate"}>{j.type}</Badge>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                    {j.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Banknote className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                    {j.salary}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                    Posted {timeAgo(j.postedAt)}
                  </span>
                </div>
              </div>
            </div>

            <Button variant="gold" size="lg" onClick={() => setApplyOpen(true)} className="shrink-0">
              Apply Now
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <Reveal>
              <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
                <h2 className="font-display text-lg font-bold text-ink-900">About the role</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{j.description}</p>

                <h3 className="font-display mt-7 flex items-center gap-2 text-base font-bold text-ink-900">
                  <ListChecks className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  Responsibilities
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {j.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-600">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>

                <h3 className="font-display mt-7 flex items-center gap-2 text-base font-bold text-ink-900">
                  <ClipboardList className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  Requirements
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {j.requirements.map((r) => (
                    <li key={r} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-600">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {related.length > 0 && (
              <Reveal delay={80}>
                <div>
                  <h2 className="font-display mb-5 text-xl font-bold text-ink-900">Similar openings</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {related.map((r) => (
                      <JobCard key={r.id} job={r} compact />
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card">
                <div className="kente h-1.5" aria-hidden="true" />
                <div className="p-6">
                  <h2 className="font-display text-base font-bold text-ink-900">Job summary</h2>
                  <dl className="mt-4 space-y-3.5 text-sm">
                    <div className="flex items-start justify-between gap-3">
                      <dt className="font-semibold text-ink-500">Company</dt>
                      <dd className="text-right font-bold text-ink-900">{j.company}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <dt className="font-semibold text-ink-500">Category</dt>
                      <dd className="text-right font-bold text-ink-900">{j.category}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <dt className="font-semibold text-ink-500">Salary</dt>
                      <dd className="text-right font-bold text-ink-900">{j.salary}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <dt className="flex items-center gap-1 font-semibold text-ink-500">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                        Deadline
                      </dt>
                      <dd className="text-right">
                        <span className="font-bold text-ink-900">{formatDate(j.deadline)}</span>
                        <span className={`block text-xs font-bold ${left <= 7 ? "text-red-600" : "text-ink-400"}`}>
                          {left <= 7 ? `${left} day${left === 1 ? "" : "s"} left` : `${left} days left`}
                        </span>
                      </dd>
                    </div>
                  </dl>
                  <Button variant="gold" fullWidth size="lg" className="mt-6" onClick={() => setApplyOpen(true)}>
                    Apply Now
                  </Button>
                  <p className="mt-2.5 text-center text-xs font-medium text-ink-400">
                    Demo listing — the apply link is a placeholder.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
                <h2 className="font-display text-base font-bold text-ink-900">How to apply</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{j.howToApply}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Modal open={applyOpen} onClose={() => setApplyOpen(false)} title={`Apply — ${j.title}`} eyebrow="Demo application">
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-ink-600">
            In the live product this button opens the employer's application form. For this
            demo, use the placeholder link below:
          </p>
          <div className="flex items-center gap-2 rounded-xl border border-ink-200 bg-canvas px-4 py-3">
            <ExternalLink className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
            <code className="truncate text-sm font-semibold text-ink-700">
              https://apply.example.com/{j.id}
            </code>
          </div>
          <div className="rounded-xl border border-gold-200 bg-gold-100/60 p-4 text-[13px] leading-relaxed text-ink-700">
            <p className="font-bold">Application tip</p>
            <p className="mt-1">{j.howToApply}</p>
          </div>
          <Button variant="primary" fullWidth onClick={() => setApplyOpen(false)}>
            Got it
          </Button>
        </div>
      </Modal>
    </>
  );
}
