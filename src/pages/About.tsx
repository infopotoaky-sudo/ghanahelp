import { Link } from "react-router-dom";
import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Megaphone,
  Radio,
  Database,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import FinalCta from "../components/FinalCta";
import DemoVideo from "../components/DemoVideo";
import { media } from "../lib/media";
import { usePageMeta } from "../hooks/usePageMeta";

const values = [
  {
    icon: HeartHandshake,
    title: "Community first",
    text: "Ghana Help Hub exists to connect people — the person with a need and the person who can fill it.",
  },
  {
    icon: ShieldCheck,
    title: "Trust, carefully labelled",
    text: "Verification badges mean a profile has been checked — never that we guarantee the outcome. We say so plainly.",
  },
  {
    icon: Sparkles,
    title: "Simple for everyone",
    text: "Mobile-first, light on data, and usable by anyone — from a student in Legon to a trader in Makola.",
  },
  {
    icon: Megaphone,
    title: "Demand-driven",
    text: "Instead of browsing endless listings, you start with “I need…” — and the platform does the matching.",
  },
];

const phases = [
  {
    icon: Rocket,
    phase: "Phase 1",
    title: "Frontend MVP",
    status: "You are here",
    current: true,
    text: "The experience you're using now: search, requests, jobs, opportunities and lost & found — running on sample data.",
  },
  {
    icon: Database,
    phase: "Phase 2",
    title: "Backend & accounts",
    status: "Planned",
    current: false,
    text: "Supabase-powered data, real listings, WhatsApp-first onboarding for providers and simple accounts.",
  },
  {
    icon: Radio,
    phase: "Phase 3",
    title: "Radio × regions",
    status: "Planned",
    current: false,
    text: "Connecting on-air conversations with live requests, and rolling out region by region across Ghana.",
  },
];

export default function About() {
  usePageMeta(
    "About | Ghana Help Hub",
    "Ghana Help Hub makes it easier for Ghanaians to find the people, services, opportunities and information they need."
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-10 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
            <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
            About us
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-[2.6rem] sm:leading-[1.12]">
            A Ghana where finding help is{" "}
            <span className="relative inline-block">
              simple.
              <svg viewBox="0 0 220 14" className="absolute -bottom-1.5 left-0 w-full text-gold-400" aria-hidden="true" preserveAspectRatio="none">
                <path d="M4 10.5C60 3.5 160 3.5 216 9.5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-500">
            Ghana Help Hub (GHH) is a help and connection platform. You tell us what you need —
            a service, a job, a room, an opportunity — and we help you discover the right
            businesses, people and information, or connect you with someone who can help.
          </p>
        </div>
      </section>

      {/* What & Why */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-card sm:p-9">
              <div className="-mx-7 -mt-7 mb-6 overflow-hidden sm:-mx-9 sm:-mt-9 sm:mb-8">
                <img
                  src={media.workshop}
                  alt="A Ghanaian tailor showing kente fabric to a smiling customer in his workshop"
                  className="h-48 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-56"
                  loading="lazy"
                />
              </div>
              <p className="text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">What we are</p>
              <h2 className="font-display mt-2 text-2xl font-bold text-ink-900">
                Not a marketplace. A starting point.
              </h2>
              <div className="mt-4 space-y-3.5 text-[15px] leading-relaxed text-ink-600">
                <p>
                  Most Ghanaians find help the same way they always have: asking around. A
                  cousin knows a mechanic. A neighbour knows a tutor. It works — until it
                  doesn't.
                </p>
                <p>
                  Ghana Help Hub puts that “ask around” energy online. Post what you need,
                  search verified professionals, browse jobs and opportunities, or check the
                  community lost &amp; found board — all in one place.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-3xl bg-brand-700 p-7 text-white shadow-card sm:p-9">
              <p className="text-xs font-bold tracking-[0.14em] text-gold-400 uppercase">Why we exist</p>
              <h2 className="font-display mt-2 text-2xl font-bold">
                Because “who do you know?” shouldn't be the only answer.
              </h2>
              <div className="mt-4 space-y-3.5 text-[15px] leading-relaxed text-brand-100">
                <p>
                  Good electricians, honest mechanics, real opportunities — they exist in every
                  town. They're just hard to find if you don't already know someone.
                </p>
                <p>
                  We're building the bridge: demand on one side (“I need a plumber in
                  Amasaman”), capable people on the other, and a simple way to connect.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border-2 border-brand-200 bg-brand-50/60 p-7 sm:p-9">
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
                  <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
                  Our mission
                </p>
                <p className="font-display mt-4 text-xl leading-snug font-bold text-ink-900 sm:text-2xl">
                  “Make it easier for Ghanaians to find the people, services, opportunities and
                  information they need.”
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-3xl border-2 border-gold-200 bg-gold-100/50 p-7 sm:p-9">
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-gold-700 uppercase">
                  <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
                  Our vision
                </p>
                <p className="font-display mt-4 text-xl leading-snug font-bold text-ink-900 sm:text-2xl">
                  “A Ghana where finding help is simple.”
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  One trusted starting point — from Accra to Tamale, on any phone, in minutes.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Values */}
          <div className="mt-14">
            <Reveal>
              <h2 className="font-display text-center text-2xl font-bold text-ink-900 sm:text-3xl">
                What we stand for
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-inset ring-brand-100">
                      <v.icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                    </span>
                    <h3 className="font-display mt-4 text-[15px] font-bold text-ink-900">{v.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-center text-2xl font-bold text-ink-900 sm:text-3xl">
              Where we're headed
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-[15px] text-ink-500">
              An honest roadmap — no inflated numbers, no fake partnerships.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {phases.map((p, i) => (
              <Reveal key={p.phase} delay={i * 100}>
                <div
                  className={
                    p.current
                      ? "relative h-full rounded-3xl border-2 border-brand-300 bg-white p-7 shadow-lift"
                      : "h-full rounded-3xl border border-ink-100 bg-white p-7 shadow-card"
                  }
                >
                  {p.current && (
                    <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-gold-400 px-3 py-1 text-[11px] font-extrabold text-ink-900 shadow-sm">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      {p.status}
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-inset ring-brand-100">
                      <p.icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-extrabold tracking-[0.14em] text-ink-400 uppercase">
                      {p.phase}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-lg font-bold text-ink-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <p className="mx-auto max-w-2xl rounded-2xl border border-ink-200 bg-white p-5 text-center text-[13px] leading-relaxed text-ink-500">
              <span className="font-bold text-ink-700">A note on honesty:</span> this demo runs
              on fictional sample data. We don't claim real users, funding or partnerships —
              we're earning those one helpful connection at a time.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-4 text-center text-sm font-semibold text-ink-500">
              Wondering how this stays sustainable?{" "}
              <Link
                to="/how-we-earn"
                className="group inline-flex items-center gap-1 font-bold text-brand-700 transition-colors hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                See how GHH makes money
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <DemoVideo
              src={media.demoVideoTwo}
              poster={media.market}
              title="The spirit we're building for"
              note="Sample footage · 1 min"
              className="mx-auto max-w-3xl"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FinalCta />
        </div>
      </section>
    </>
  );
}
