import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Megaphone,
  Store,
  ArrowRight,
  BadgeCheck,
  MessageCircle,
  PenLine,
  Compass,
  HeartHandshake,
  Radio,
  Flag,
  PackageSearch,
} from "lucide-react";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import CategoryCard from "../components/CategoryCard";
import BusinessCard from "../components/BusinessCard";
import JobCard from "../components/JobCard";
import OpportunityCard from "../components/OpportunityCard";
import RequestCard from "../components/RequestCard";
import LostFoundCard from "../components/LostFoundCard";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import BusinessCta from "../components/BusinessCta";
import FinalCta from "../components/FinalCta";
import { categories, popularSearches } from "../data/categories";
import { getFeaturedBusinesses } from "../services/businesses";
import { getLatestJobs } from "../services/jobs";
import { getOpportunities } from "../services/opportunities";
import { getLostFoundItems } from "../services/lostFound";
import { getRecentRequests } from "../services/requests";
import type { Business, Job, Opportunity, LostFoundItem, HelpRequest } from "../types";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../lib/utils";

const searchExamples = [
  "Electrician in Amasaman",
  "Job in Accra",
  "Room in Kasoa",
  "Photographer in Kumasi",
];

const marqueeNeeds = [
  "I need a plumber in Amasaman",
  "I need a laptop under GH₵5,000",
  "I need a photographer in Kumasi",
  "I need an internship",
  "I need a room near Legon",
  "I need someone to repair my AC",
  "I need a graphic designer",
  "I need a tutor for WASSCE",
];

export default function Home() {
  usePageMeta(
    "Ghana Help Hub | Whatever You Need in Ghana, Start Here",
    "Find businesses, services, jobs, opportunities and more across Ghana — or tell us what you need and get connected."
  );

  const navigate = useNavigate();
  const [example, setExample] = useState(0);
  const [businesses, setBusinesses] = useState<Business[] | null>(null);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[] | null>(null);
  const [lostFound, setLostFound] = useState<LostFoundItem[] | null>(null);
  const [requests, setRequests] = useState<HelpRequest[] | null>(null);
  const [feedIndex, setFeedIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setExample((i) => (i + 1) % searchExamples.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([
      getFeaturedBusinesses(6),
      getLatestJobs(4),
      getOpportunities(),
      getLostFoundItems(),
      getRecentRequests(5),
    ]).then(([b, j, o, l, r]) => {
      if (!active) return;
      setBusinesses(b);
      setJobs(j);
      setOpportunities(o.slice(0, 3));
      setLostFound(l.slice(0, 3));
      setRequests(r);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!requests?.length) return;
    const t = setInterval(() => setFeedIndex((i) => (i + 1) % requests.length), 4200);
    return () => clearInterval(t);
  }, [requests]);

  const feedRequest = requests?.[feedIndex % (requests?.length ?? 1)];

  return (
    <>
      {/* ================================ HERO ================================ */}
      <section className="relative overflow-hidden">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute top-10 -right-24 h-80 w-80 rounded-full bg-gold-200/50 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20 lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            {/* Left — headline + search */}
            <div className="animate-fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-bold tracking-wide text-brand-700 shadow-sm">
                <span
                  className="animate-pulse-dot h-2 w-2 rounded-full bg-gold-400"
                  aria-hidden="true"
                />
                Ghana's help &amp; connection platform
              </p>

              <h1 className="font-display mt-5 text-[2.5rem] leading-[1.08] font-extrabold tracking-tight text-ink-900 text-balance sm:text-5xl lg:text-[3.4rem]">
                Whatever you need in{" "}
                <span className="text-brand-600">Ghana</span>,{" "}
                <span className="relative inline-block">
                  start here.
                  <svg
                    viewBox="0 0 220 14"
                    className="absolute -bottom-2 left-0 w-full text-gold-400"
                    aria-hidden="true"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M4 10.5C60 3.5 160 3.5 216 9.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
                Find trusted businesses, services, jobs, opportunities and more — or simply
                tell us what you need.
              </p>

              <div className="mt-8 max-w-xl">
                <SearchBar
                  size="lg"
                  placeholder={`Try “${searchExamples[example]}”`}
                  aria-label="Search businesses, services and jobs"
                />
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold tracking-wide text-ink-400 uppercase">
                    Popular:
                  </span>
                  {popularSearches.map((term) => (
                    <Link
                      key={term}
                      to={`/find-help?q=${encodeURIComponent(term)}`}
                      className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button to="/post-request" variant="gold" size="lg">
                  <Megaphone className="h-5 w-5" aria-hidden="true" />
                  I NEED SOMETHING
                </Button>
                <Button to="/businesses#list-my-business" variant="outline" size="lg">
                  <Store className="h-5 w-5" aria-hidden="true" />
                  LIST MY BUSINESS
                </Button>
              </div>
            </div>

            {/* Right — live request feed */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div
                className="absolute inset-0 -rotate-3 rounded-2xl border border-brand-100 bg-brand-50/70"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 rotate-2 rounded-2xl border border-gold-200 bg-gold-100/60"
                aria-hidden="true"
              />

              <div className="relative">
                <div className="mb-3 flex items-center justify-between px-1">
                  <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-ink-500 uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                    </span>
                    Live from the community
                  </p>
                  <span className="text-[11px] font-semibold text-ink-400">Sample data</span>
                </div>

                {feedRequest ? (
                  <RequestCard
                    key={feedRequest.id + feedIndex}
                    request={feedRequest}
                    featured
                    className="animate-pop"
                  />
                ) : (
                  <div
                    className="h-44 animate-pulse rounded-2xl border border-ink-100 bg-white"
                    aria-hidden="true"
                  />
                )}

                <div className="mt-3 flex items-center justify-center gap-1.5">
                  {(requests ?? Array.from({ length: 5 })).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show request ${i + 1}`}
                      onClick={() => setFeedIndex(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === feedIndex % (requests?.length ?? 5)
                          ? "w-6 bg-brand-600"
                          : "w-1.5 bg-ink-200 hover:bg-ink-300"
                      )}
                    />
                  ))}
                </div>

                <div
                  className="animate-float absolute -top-5 -right-3 hidden items-center gap-2 rounded-xl border border-gold-200 bg-white px-3 py-2 shadow-lift sm:flex"
                  aria-hidden="true"
                >
                  <BadgeCheck className="h-4 w-4 text-brand-600" />
                  <span className="text-xs font-bold text-ink-700">Verified match found</span>
                </div>
                <div
                  className="animate-float absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-xl border border-brand-100 bg-white px-3 py-2 shadow-lift [animation-delay:1.2s] sm:flex"
                  aria-hidden="true"
                >
                  <MessageCircle className="h-4 w-4 text-brand-600" />
                  <span className="text-xs font-bold text-ink-700">Replied on WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Needs marquee */}
        <div className="marquee relative overflow-hidden border-y border-ink-800 bg-ink-900 py-3">
          <div className="marquee-track" aria-hidden="true">
            {[...marqueeNeeds, ...marqueeNeeds].map((need, i) => (
              <span
                key={i}
                className="mx-5 flex shrink-0 items-center gap-3 text-[13px] font-semibold text-ink-300"
              >
                <span className="kente inline-block h-1 w-7 rounded-full" />
                {need}
              </span>
            ))}
          </div>
          <p className="sr-only">Examples of needs posted on Ghana Help Hub</p>
        </div>
      </section>

      {/* ============================ CATEGORIES ============================ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Quick categories"
              title="How can we help?"
              description="Start with what you're looking for — we'll point you to the right people and opportunities."
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, i) => (
              <Reveal key={category.id} delay={Math.min(i, 7) * 60}>
                <CategoryCard category={category} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== I NEED SOMETHING =========================== */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeader
                eyebrow="I need something"
                title="Can't find what you're looking for?"
                description="Tell Ghana Help Hub what you need and we'll help connect you to someone who can."
                className="mb-6 md:mb-0"
              />
              <ul className="space-y-3">
                {[
                  "“I need a plumber in Amasaman.”",
                  "“I need a room near Legon.”",
                  "“I need an internship.”",
                  "“I need a laptop under GH₵5,000.”",
                ].map((line) => (
                  <li key={line} className="flex items-center gap-3 text-[15px] font-medium text-ink-600">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100 ring-1 ring-inset ring-gold-300">
                      <BadgeCheck className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button to="/post-request" variant="gold" size="lg">
                  <Megaphone className="h-5 w-5" aria-hidden="true" />
                  Post what I need
                </Button>
                <Link
                  to="/find-help"
                  className="group inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  Or browse existing help
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative mx-auto max-w-md">
                <div
                  className="absolute inset-0 rotate-3 rounded-2xl bg-brand-600/10"
                  aria-hidden="true"
                />
                {feedRequest ? (
                  <RequestCard request={feedRequest} featured className="relative" />
                ) : (
                  <div className="relative h-44 animate-pulse rounded-2xl border border-ink-100 bg-white" />
                )}
                <div className="relative mt-4 flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
                    <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-brand-800">Ghana Help Hub is matching…</p>
                    <p className="text-xs font-medium text-brand-700/80">
                      Providers nearby get your request and can reply directly.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================= FEATURED BUSINESSES ========================= */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Featured"
              title="Find trusted businesses & professionals"
              description="Electricians, mechanics, photographers, tutors and more — with verified profiles and direct WhatsApp contact."
              action={{ label: "View all businesses", to: "/businesses" }}
            />
          </Reveal>
          {businesses ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {businesses.map((business, i) => (
                <Reveal key={business.id} delay={Math.min(i, 5) * 70}>
                  <BusinessCard business={business} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-56 animate-pulse rounded-2xl border border-ink-100 bg-canvas" />
              ))}
            </div>
          )}
          <div className="mt-14">
            <BusinessCta />
          </div>
        </div>
      </section>

      {/* ================================ JOBS ================================ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Jobs"
              title="Latest opportunities"
              description="Real openings posted by businesses across Ghana — filter by city, type and category."
              action={{ label: "Browse all jobs", to: "/jobs" }}
            />
          </Reveal>
          {jobs ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {jobs.map((job, i) => (
                <Reveal key={job.id} delay={Math.min(i, 3) * 80}>
                  <JobCard job={job} compact />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl border border-ink-100 bg-white" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================ OPPORTUNITIES ============================ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Opportunities"
              title="Scholarships, training, grants & more"
              description="Discover opportunities for students, founders and professionals. All listings below are clearly marked sample data."
              action={{ label: "See all opportunities", to: "/opportunities" }}
            />
          </Reveal>
          {opportunities ? (
            <div className="grid gap-5 md:grid-cols-3">
              {opportunities.map((opportunity, i) => (
                <Reveal key={opportunity.id} delay={i * 80}>
                  <OpportunityCard
                    opportunity={opportunity}
                    onView={() => navigate("/opportunities")}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-3" aria-busy="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-56 animate-pulse rounded-2xl border border-ink-100 bg-canvas" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================= LOST & FOUND ============================= */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Community"
              title="Lost something? Found something?"
              description="Help reunite people with their belongings. Report what you've lost — or what you've found."
            />
          </Reveal>
          <Reveal>
            <div className="mb-8 flex flex-wrap gap-3">
              <Button to="/lost-found?report=lost" variant="primary">
                <Flag className="h-4 w-4" aria-hidden="true" />
                Report Lost Item
              </Button>
              <Button to="/lost-found?report=found" variant="outline">
                <PackageSearch className="h-4 w-4" aria-hidden="true" />
                Report Found Item
              </Button>
            </div>
          </Reveal>
          {lostFound ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {lostFound.map((item, i) => (
                <Reveal key={item.id} delay={i * 80}>
                  <LostFoundCard item={item} onReport={() => navigate("/lost-found")} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 animate-pulse rounded-2xl border border-ink-100 bg-white" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================= HOW IT WORKS ============================= */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="How it works"
              title="From “I need…” to “sorted” in three steps"
            />
          </Reveal>
          <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            <div
              className="absolute top-10 right-[16%] left-[16%] hidden border-t-2 border-dashed border-brand-200 md:block"
              aria-hidden="true"
            />
            {[
              {
                icon: PenLine,
                step: "01",
                title: "Tell us what you need",
                text: "Post a request in under a minute — a service, a job, a room, an opportunity, anything.",
              },
              {
                icon: Compass,
                step: "02",
                title: "Discover the right people or opportunities",
                text: "Search trusted businesses, openings and opportunities — or let your request do the work.",
              },
              {
                icon: HeartHandshake,
                step: "03",
                title: "Connect and get help",
                text: "Chat on WhatsApp or call directly. You stay in control of who you work with.",
              },
            ].map(({ icon: Icon, step, title, text }, i) => (
              <Reveal key={step} delay={i * 120}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 shadow-sm transition-transform duration-300 hover:-rotate-3 hover:scale-105">
                    <Icon className="h-8 w-8 text-brand-600" aria-hidden="true" />
                    <span className="font-display absolute -top-2.5 -right-2.5 rounded-full bg-gold-400 px-2 py-0.5 text-[11px] font-extrabold text-ink-900 shadow-sm">
                      {step}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-lg font-bold text-ink-900">{title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-500">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== RADIO CONNECTION ========================== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-800 px-6 py-12 sm:px-12 sm:py-16">
              <div className="dark-grid absolute inset-0" aria-hidden="true" />
              <div
                className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gold-400/15 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-gold-400 uppercase">
                    <Radio className="h-4 w-4" aria-hidden="true" />
                    On air × online
                  </p>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
                    From Radio to Real Solutions
                  </h2>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-brand-100">
                    Have a need? Hear about an opportunity? Looking for a service? Ghana Help
                    Hub connects the conversation on radio with real solutions online — so a
                    mention on air becomes a match in minutes.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button to="/find-help" variant="gold" size="lg">
                      Explore Ghana Help Hub
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                    <Button
                      to="/post-request"
                      size="lg"
                      className="bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/20"
                    >
                      <Megaphone className="h-5 w-5" aria-hidden="true" />
                      Post a need
                    </Button>
                  </div>
                </div>

                <div
                  className="flex items-end justify-center gap-1.5 lg:justify-end lg:pr-6"
                  aria-hidden="true"
                >
                  {[10, 18, 26, 38, 30, 46, 34, 22, 42, 28, 16, 36].map((h, i) => (
                    <span
                      key={i}
                      className="animate-wave w-2 origin-bottom rounded-full bg-gold-400/90"
                      style={{ height: `${h * 2.2}px`, animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =============================== FINAL CTA =============================== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FinalCta />
        </div>
      </section>
    </>
  );
}
