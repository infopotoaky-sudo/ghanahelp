import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Megaphone,
  Store,
  ArrowRight,
  BadgeCheck,
  PenLine,
  Compass,
  HeartHandshake,
  Radio,
  Flag,
  PackageSearch,
  MapPin,
  ChevronDown,
} from "lucide-react";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import BusinessCard from "../components/BusinessCard";
import JobCard from "../components/JobCard";
import OpportunityCard from "../components/OpportunityCard";
import RequestCard from "../components/RequestCard";
import LostFoundCard from "../components/LostFoundCard";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Reveal from "../components/Reveal";
import BusinessCta from "../components/BusinessCta";
import FinalCta from "../components/FinalCta";
import BannerCarousel from "../components/BannerCarousel";
import Carousel from "../components/Carousel";
import ListingTile, { HeartToggle } from "../components/ListingTile";
import CityPicker from "../components/CityPicker";
import EmptyState from "../components/EmptyState";
import { categories, popularSearches } from "../data/categories";
import { getBusinesses } from "../services/businesses";
import { getLatestJobs } from "../services/jobs";
import { getOpportunities } from "../services/opportunities";
import { getLostFoundItems } from "../services/lostFound";
import { getRecentRequests } from "../services/requests";
import { useFavorites } from "../hooks/useFavorites";
import type {
  Business,
  Job,
  Opportunity,
  LostFoundItem,
  HelpRequest,
  RequestStatus,
} from "../types";
import { media } from "../lib/media";
import { cn, timeAgo } from "../lib/utils";
import { usePageMeta } from "../hooks/usePageMeta";

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

const askStatus: Record<RequestStatus, { label: string; variant: "gold" | "green" | "slate" }> = {
  open: { label: "Looking for help", variant: "gold" },
  "in-progress": { label: "Being matched", variant: "green" },
  resolved: { label: "Resolved", variant: "slate" },
};

const tileTints = [
  "bg-brand-50 text-brand-600 ring-brand-100",
  "bg-gold-100 text-gold-700 ring-gold-200",
  "bg-ink-100 text-ink-700 ring-ink-200",
];

export default function Home() {
  usePageMeta(
    "Ghana Help Hub | Whatever You Need in Ghana, Start Here",
    "Find businesses, services, jobs, opportunities and more across Ghana — or tell us what you need and get connected."
  );

  const navigate = useNavigate();
  const [example, setExample] = useState(0);
  const [hour] = useState(() => new Date().getHours());
  const [businesses, setBusinesses] = useState<Business[] | null>(null);
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[] | null>(null);
  const [lostFound, setLostFound] = useState<LostFoundItem[] | null>(null);
  const [requests, setRequests] = useState<HelpRequest[] | null>(null);
  const [city, setCity] = useState<string>(() => {
    try {
      return localStorage.getItem("ghh:city") ?? "All Ghana";
    } catch {
      return "All Ghana";
    }
  });
  const [cityOpen, setCityOpen] = useState(false);

  const dayPart = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  useEffect(() => {
    const t = setInterval(() => setExample((i) => (i + 1) % searchExamples.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let active = true;
    Promise.all([
      getBusinesses(),
      getLatestJobs(6),
      getOpportunities(),
      getLostFoundItems(),
      getRecentRequests(5),
    ]).then(([b, j, o, l, r]) => {
      if (!active) return;
      setBusinesses(b);
      setJobs(j);
      setOpportunities(o);
      setLostFound(l);
      setRequests(r);
    });
    return () => {
      active = false;
    };
  }, []);

  const cityOptions = useMemo(() => {
    if (!businesses) return [{ name: "All Ghana", count: 0 }];
    const counts = new Map<string, number>();
    businesses.forEach((b) => counts.set(b.city, (counts.get(b.city) ?? 0) + 1));
    return [
      { name: "All Ghana", count: businesses.length },
      ...Array.from(counts.entries())
        .sort((a, z) => z[1] - a[1])
        .map(([name, count]) => ({ name, count })),
    ];
  }, [businesses]);

  const forYou = useMemo(() => {
    if (!businesses) return null;
    const list =
      city === "All Ghana" ? businesses : businesses.filter((b) => b.city === city);
    return [...list]
      .sort((a, z) => Number(z.verified) - Number(a.verified) || z.rating - a.rating)
      .slice(0, 8);
  }, [businesses, city]);

  const featured = useMemo(() => {
    if (!businesses) return null;
    return [...businesses]
      .sort((a, z) => Number(z.verified) - Number(a.verified) || z.rating - a.rating)
      .slice(0, 3);
  }, [businesses]);

  const pickCity = (c: string) => {
    setCity(c);
    try {
      localStorage.setItem("ghh:city", c);
    } catch {
      /* private mode — keep in memory */
    }
  };

  return (
    <>
      {/* ============================ APP HOME HEADER ============================ */}
      <section className="relative overflow-hidden">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="absolute top-10 -right-24 h-80 w-80 rounded-full bg-gold-200/50 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-8 sm:px-6 sm:pt-10 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="animate-fade-up max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
                <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
                Akwaaba — good {dayPart}
              </p>
              <h1 className="font-display mt-3 text-[2rem] leading-[1.1] font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-[2.9rem]">
                Whatever you need in <span className="text-brand-600">Ghana</span>,{" "}
                <span className="relative inline-block">
                  start here.
                  <svg
                    viewBox="0 0 220 14"
                    className="absolute -bottom-1.5 left-0 w-full text-gold-400"
                    aria-hidden="true"
                    preserveAspectRatio="none"
                  >
                    <path d="M4 10.5C60 3.5 160 3.5 216 9.5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-500">
                Find trusted businesses, services, jobs, opportunities and more — or simply
                tell us what you need.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCityOpen(true)}
              className="animate-fade-up group flex items-center gap-2.5 rounded-xl border border-ink-200 bg-white px-4 py-3 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label={`Change location. Current: ${city}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-100 text-gold-700 ring-1 ring-inset ring-gold-200">
                <MapPin className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] font-bold tracking-[0.12em] text-ink-400 uppercase">
                  Your area
                </span>
                <span className="font-display block text-sm font-bold text-ink-900">{city}</span>
              </span>
              <ChevronDown className="h-4 w-4 text-ink-400 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </button>
          </div>

          <div className="animate-fade-up mt-6 max-w-2xl [animation-delay:120ms]">
            <SearchBar
              size="lg"
              placeholder={`Try “${searchExamples[example]}”`}
              ariaLabel="Search businesses, services and jobs"
            />
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold tracking-wide text-ink-400 uppercase">
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
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                to="/post-request"
                className="group inline-flex items-center gap-1.5 text-sm font-extrabold text-gold-700 transition-colors hover:text-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
              >
                <Megaphone className="h-4 w-4" aria-hidden="true" />
                I Need Something
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                to="/businesses#list-my-business"
                className="group inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-700 transition-colors hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
              >
                <Store className="h-4 w-4" aria-hidden="true" />
                List My Business
              </Link>
            </div>
          </div>
        </div>

        {/* Needs marquee */}
        <div className="marquee relative overflow-hidden border-y border-ink-800 bg-ink-900 py-3">
          <div className="marquee-track" aria-hidden="true">
            {[...marqueeNeeds, ...marqueeNeeds].map((need, i) => (
              <span key={i} className="mx-5 flex shrink-0 items-center gap-3 text-[13px] font-semibold text-ink-300">
                <span className="kente inline-block h-1 w-7 rounded-full" />
                {need}
              </span>
            ))}
          </div>
          <p className="sr-only">Examples of needs posted on Ghana Help Hub</p>
        </div>
      </section>

      {/* ========================= CATEGORY TILES (app grid) ========================= */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Quick categories"
            title="How can we help?"
            action={{ label: "Find help", to: "/find-help" }}
          />
        </Reveal>
        <Reveal delay={80}>
          <nav aria-label="Help categories" className="grid grid-cols-4 gap-2.5 md:grid-cols-8">
            {categories.map((category, i) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  to={category.to}
                  className="group flex flex-col items-center gap-2 rounded-xl border border-ink-100 bg-white px-1 py-3.5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-inset transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6",
                      tileTints[i % tileTints.length]
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-center text-[11px] leading-tight font-bold text-ink-700 group-hover:text-brand-700">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </Reveal>

        <Reveal delay={140} className="mt-7">
          <BannerCarousel />
        </Reveal>
      </section>

      {/* ========================= FOR YOU (dense listing grid) ========================= */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow={city === "All Ghana" ? "Across Ghana" : `In ${city}`}
            title="For you"
            description="Trusted businesses and professionals — save the ones you like with the heart."
            action={{ label: "See all", to: "/businesses" }}
          />
        </Reveal>
        {forYou === null ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4" aria-busy="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-xl border border-ink-100 bg-white" />
            ))}
          </div>
        ) : forYou.length === 0 ? (
          <EmptyState
            title={`Nothing in ${city} yet`}
            text="No listings match this area right now. Post what you need and we'll start matching."
            action={
              <Button to="/post-request" variant="gold" size="sm">
                <Megaphone className="h-4 w-4" aria-hidden="true" />
                Post what I need
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
            {forYou.map((business, i) => (
              <Reveal key={business.id} delay={Math.min(i % 4, 3) * 60}>
                <ListingTile business={business} index={i} className="h-full" />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ========================= PEOPLE ARE ASKING (requests carousel) ========================= */}
      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Live demand"
              title="People are asking"
              description="Real needs posted by the community. Need the same thing? Add yours to the pile."
              action={{ label: "Post a request", to: "/post-request" }}
            />
          </Reveal>
          {requests ? (
            <Reveal delay={80}>
              <Carousel ariaLabel="Recent community requests">
                {requests.map((request) => (
                  <div key={request.id} className="w-[85%] max-w-[380px] shrink-0 snap-start sm:w-[350px]">
                    <AskTile request={request} />
                  </div>
                ))}
              </Carousel>
            </Reveal>
          ) : (
            <div className="flex gap-4 overflow-hidden" aria-busy="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-48 w-[320px] shrink-0 animate-pulse rounded-xl border border-ink-100 bg-canvas" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================= I NEED SOMETHING (feature) ========================= */}
      <section className="relative overflow-hidden py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
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
              <div className="mt-7 flex flex-wrap items-center gap-3">
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
                <div className="absolute inset-0 rotate-3 rounded-2xl bg-brand-600/10" aria-hidden="true" />
                {requests?.[0] ? (
                  <RequestCard request={requests[0]} featured className="relative" />
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

      {/* ========================= FEATURED PROS ========================= */}
      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Featured"
              title="Top-rated pros"
              description="Verified profiles with direct WhatsApp contact."
              action={{ label: "View all businesses", to: "/businesses" }}
            />
          </Reveal>
          {featured ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((business, i) => (
                <Reveal key={business.id} delay={i * 70}>
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
          <div className="mt-12">
            <BusinessCta />
          </div>
        </div>
      </section>

      {/* ========================= LATEST JOBS (carousel) ========================= */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Jobs"
              title="Latest openings"
              description="Swipe through new roles posted across Ghana."
              action={{ label: "Browse all jobs", to: "/jobs" }}
            />
          </Reveal>
          {jobs ? (
            <Reveal delay={80}>
              <Carousel ariaLabel="Latest job openings">
                {jobs.map((job) => (
                  <div key={job.id} className="w-[85%] max-w-[380px] shrink-0 snap-start sm:w-[340px]">
                    <JobCard job={job} compact />
                  </div>
                ))}
              </Carousel>
            </Reveal>
          ) : (
            <div className="flex gap-4 overflow-hidden" aria-busy="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-44 w-[320px] shrink-0 animate-pulse rounded-xl border border-ink-100 bg-white" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================= OPPORTUNITIES (carousel) ========================= */}
      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Opportunities"
              title="Scholarships, training, grants & more"
              description="Clearly marked sample data for the demo."
              action={{ label: "See all opportunities", to: "/opportunities" }}
            />
          </Reveal>
          {opportunities ? (
            <Reveal delay={80}>
              <Carousel ariaLabel="Opportunities">
                {opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="w-[88%] max-w-[400px] shrink-0 snap-start sm:w-[360px]">
                    <OpportunityCard opportunity={opportunity} onView={() => navigate("/opportunities")} />
                  </div>
                ))}
              </Carousel>
            </Reveal>
          ) : (
            <div className="flex gap-4 overflow-hidden" aria-busy="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-52 w-[340px] shrink-0 animate-pulse rounded-xl border border-ink-100 bg-canvas" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================= LOST & FOUND (carousel) ========================= */}
      <section className="py-12 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Community"
              title="Lost something? Found something?"
              description="Help reunite people with their belongings."
            />
          </Reveal>
          <Reveal>
            <div className="mb-6 flex flex-wrap gap-3">
              <Button to="/lost-found?report=lost" variant="primary" size="sm">
                <Flag className="h-4 w-4" aria-hidden="true" />
                Report Lost Item
              </Button>
              <Button to="/lost-found?report=found" variant="outline" size="sm">
                <PackageSearch className="h-4 w-4" aria-hidden="true" />
                Report Found Item
              </Button>
            </div>
          </Reveal>
          {lostFound ? (
            <Reveal delay={80}>
              <Carousel ariaLabel="Lost and found items">
                {lostFound.map((item) => (
                  <div key={item.id} className="w-[85%] max-w-[360px] shrink-0 snap-start sm:w-[320px]">
                    <LostFoundCard item={item} onReport={() => navigate("/lost-found")} />
                  </div>
                ))}
              </Carousel>
            </Reveal>
          ) : (
            <div className="flex gap-4 overflow-hidden" aria-busy="true">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-60 w-[300px] shrink-0 animate-pulse rounded-xl border border-ink-100 bg-white" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================= HOW IT WORKS ============================= */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader align="center" eyebrow="How it works" title="From “I need…” to “sorted” in three steps" />
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
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-800 px-6 py-12 sm:px-12 sm:py-16">
              <div className="dark-grid absolute inset-0" aria-hidden="true" />
              <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gold-400/15 blur-3xl" aria-hidden="true" />
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

                <div className="relative overflow-hidden rounded-3xl shadow-lift ring-1 ring-white/15">
                  <div className="aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
                    <img
                      src={media.radioHost}
                      alt="A radio host speaking into a studio microphone, live on air"
                      className="animate-kenburns h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/25 to-transparent" aria-hidden="true" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-ink-900/70 px-3 py-1.5 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                    </span>
                    <span className="text-[11px] font-extrabold tracking-[0.18em] text-white uppercase">On air</span>
                  </div>
                  <div className="absolute right-5 bottom-4 flex items-end gap-1" aria-hidden="true">
                    {[10, 18, 26, 38, 30, 46, 34, 22].map((h, i) => (
                      <span
                        key={i}
                        className="animate-wave w-1.5 origin-bottom rounded-full bg-gold-400"
                        style={{ height: `${h * 1.6}px`, animationDelay: `${i * 0.12}s` }}
                      />
                    ))}
                  </div>
                  <p className="font-display absolute bottom-4 left-5 max-w-[70%] text-sm font-bold text-white">
                    “Call in with your need — we'll connect you.”
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =============================== FINAL CTA =============================== */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FinalCta />
        </div>
      </section>

      <CityPicker
        open={cityOpen}
        onClose={() => setCityOpen(false)}
        cities={cityOptions}
        current={city}
        onSelect={pickCity}
      />
    </>
  );
}

/* ------------------------- Request tile (app style) ------------------------- */

function AskTile({ request }: { request: HelpRequest }) {
  const { has, toggle } = useFavorites();
  const saved = has(request.id);
  const status = askStatus[request.status];

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-ink-100 bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <span className="kente absolute inset-x-0 top-0 h-1" aria-hidden="true" />
      <div className="flex items-start justify-between gap-2 pt-1">
        <Badge variant={status.variant}>{status.label}</Badge>
        <HeartToggle
          active={saved}
          onToggle={() =>
            toggle({
              id: request.id,
              title: request.title,
              sub: `${request.location} · ${request.budget}`,
              link: "/find-help",
            })
          }
          label={saved ? `Remove ${request.title} from saved` : `Save ${request.title}`}
        />
      </div>
      <h3 className="font-display mt-2.5 text-[15px] leading-snug font-bold text-ink-900">
        {request.title}
      </h3>
      <p className="mt-1.5 flex items-baseline gap-1.5">
        <span className="text-lg font-extrabold text-brand-700">{request.budget}</span>
        <span className="text-[11px] font-bold tracking-wide text-ink-400 uppercase">budget</span>
      </p>
      <p className="mt-1 text-xs font-semibold text-ink-500">
        {request.location} · {timeAgo(request.createdAt)}
      </p>
      <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-ink-500">
        {request.description}
      </p>
      <Link
        to={`/post-request?title=${encodeURIComponent(request.title)}`}
        className="mt-3.5 inline-flex w-fit items-center gap-1.5 rounded-lg bg-gold-100 px-3.5 py-2 text-xs font-extrabold text-ink-900 ring-1 ring-inset ring-gold-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
        I need this too
        <ArrowRight className="h-3 w-3" aria-hidden="true" />
      </Link>
    </article>
  );
}
