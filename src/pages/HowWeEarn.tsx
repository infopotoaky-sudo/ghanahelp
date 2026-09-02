import { useState } from "react";
import {
  Coins,
  Wallet,
  TrendingUp,
  MessageCircle,
  Megaphone,
  Radio,
  Zap,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  X,
  Banknote,
  Store,
  ShieldCheck,
  HeartHandshake,
  Rocket,
} from "lucide-react";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import Badge from "../components/Badge";
import { usePageMeta } from "../hooks/usePageMeta";
import { formatGHS, cn } from "../lib/utils";

/* ------------------------------ Estimator ------------------------------ */

function Estimator() {
  const [avgJob, setAvgJob] = useState(300);
  const [jobsPerWeek, setJobsPerWeek] = useState(5);
  const [closeRate, setCloseRate] = useState(60);

  const monthly = Math.round((avgJob * jobsPerWeek * 4.33 * closeRate) / 100);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-7 rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
        <Slider
          label="Average value of one job"
          value={formatGHS(avgJob)}
          min={50}
          max={2000}
          step={50}
          current={avgJob}
          onChange={setAvgJob}
        />
        <Slider
          label="Jobs you take per week"
          value={`${jobsPerWeek} / week`}
          min={1}
          max={20}
          step={1}
          current={jobsPerWeek}
          onChange={setJobsPerWeek}
        />
        <Slider
          label="Share of enquiries you close"
          value={`${closeRate}%`}
          min={20}
          max={100}
          step={5}
          current={closeRate}
          onChange={setCloseRate}
        />
        <p className="text-xs leading-relaxed font-medium text-ink-400">
          A rough guide, not a promise — your results depend on your craft, response speed and
          reviews. Fast WhatsApp replies are the single biggest lever.
        </p>
      </div>

      <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink-900 p-6 text-white sm:p-8">
        <div className="dark-grid absolute inset-0" aria-hidden="true" />
        <span className="kente absolute inset-x-0 top-0 h-1" aria-hidden="true" />
        <div className="relative">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-gold-400 uppercase">
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
            Your estimated monthly income
          </p>
          <p
            key={monthly}
            className="font-display animate-pop mt-4 text-4xl font-extrabold tracking-tight text-gold-400 tabular-nums sm:text-5xl"
          >
            {formatGHS(monthly)}
          </p>
          <p className="mt-2 text-sm font-medium text-ink-300">
            {jobsPerWeek} job{jobsPerWeek > 1 ? "s" : ""}/week · {formatGHS(avgJob)} avg ·{" "}
            {closeRate}% close rate
          </p>
        </div>
        <div className="relative mt-8 space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-white/8 px-4 py-3 ring-1 ring-inset ring-white/15">
            <span className="text-sm font-semibold text-ink-200">You keep</span>
            <span className="font-display text-sm font-extrabold text-white">100% — GH₵0 to GHH</span>
          </div>
          <p className="text-xs leading-relaxed font-medium text-ink-400">
            During the MVP, Ghana Help Hub never takes a cut of what you earn. Money moves
            directly between you and your customer.
          </p>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-ink-800">{label}</span>
        <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-[13px] font-extrabold text-brand-700 tabular-nums ring-1 ring-inset ring-brand-100">
          {value}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-600"
        aria-label={label}
      />
    </label>
  );
}

/* ------------------------------ FAQ ------------------------------ */

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white transition-colors duration-200",
        open ? "border-brand-200 shadow-card" : "border-ink-100 hover:border-ink-200"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <span className="text-sm font-bold text-ink-900 sm:text-[15px]">{q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-brand-600 transition-transform duration-300",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm leading-relaxed text-ink-600">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Page ------------------------------ */

const pipeline = [
  {
    icon: Megaphone,
    title: "Someone posts a need",
    text: "“I need an electrician in Amasaman — GH₵300.” Demand comes to you.",
  },
  {
    icon: BadgeCheck,
    title: "You show up first",
    text: "Verified and featured pros appear at the top of matches and search.",
  },
  {
    icon: MessageCircle,
    title: "Chat & agree a price",
    text: "The customer reaches you directly on WhatsApp or by call. No middleman.",
  },
  {
    icon: Wallet,
    title: "You get paid directly",
    text: "MoMo, bank transfer or cash — straight to you. GHH takes nothing.",
  },
];

const revenueStreams = [
  {
    icon: Zap,
    name: "Featured & Top placement",
    price: "GH₵49 / week",
    text: "Boost your listing to the top of your category and area while it matters.",
  },
  {
    icon: HeartHandshake,
    name: "Lead connections",
    price: "GH₵5 – 25 / match",
    text: "Pay a small fee only when we connect you to a serious, budget-backed request.",
  },
  {
    icon: Radio,
    name: "Radio × Online bundles",
    price: "Custom",
    text: "Combined on-air mentions and online promotion for launches and campaigns.",
  },
  {
    icon: Store,
    name: "Sponsored categories",
    price: "Custom",
    text: "Brands can sponsor a category — e.g. a paint company sponsoring Painters.",
  },
];

const neverList = [
  "Take a commission from your sales",
  "Sell your personal data",
  "Sell verification badges without checks",
];

export default function HowWeEarn() {
  usePageMeta(
    "How Money Moves | Ghana Help Hub",
    "How providers get paid on Ghana Help Hub — and how the platform itself will sustainably make money in Phase 2."
  );

  return (
    <>
      {/* ================================ HERO ================================ */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-14 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
                <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
                The money question, answered honestly
              </p>
              <h1 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-[2.7rem] sm:leading-[1.1]">
                How money moves on{" "}
                <span className="relative inline-block">
                  Ghana Help Hub.
                  <svg
                    viewBox="0 0 220 14"
                    className="absolute -bottom-1.5 left-0 w-full text-gold-400"
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
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-500">
                Two simple rules: <strong className="font-bold text-ink-800">providers keep 100%</strong>{" "}
                of what customers pay them, and the platform earns from{" "}
                <strong className="font-bold text-ink-800">optional promotions</strong> — never
                commissions on your work.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/businesses#list-my-business" variant="gold" size="lg">
                  <Store className="h-5 w-5" aria-hidden="true" />
                  List My Business — free
                </Button>
                <a
                  href="#revenue"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-5 py-3 text-sm font-bold text-ink-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  See the revenue model
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Money flow visual */}
            <div className="relative mx-auto w-full max-w-md">
              <div
                className="absolute inset-4 -rotate-2 rounded-3xl border border-gold-200 bg-gold-100/60"
                aria-hidden="true"
              />
              <div className="relative space-y-3">
                <div className="animate-fade-up rounded-2xl border border-ink-100 bg-white p-5 shadow-lift">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-extrabold tracking-[0.14em] text-ink-400 uppercase">
                      Incoming request
                    </p>
                    <Badge variant="gold">Sample</Badge>
                  </div>
                  <p className="font-display mt-2 text-[15px] font-bold text-ink-900">
                    “I need an electrician” — Amasaman
                  </p>
                  <p className="mt-1 text-sm font-extrabold text-brand-700">Budget: GH₵300</p>
                </div>

                <div className="ml-8 flex justify-center" aria-hidden="true">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm">
                    <ArrowRight className="h-4 w-4 rotate-90" />
                  </span>
                </div>

                <div
                  className="animate-fade-up rounded-2xl border border-brand-200 bg-white p-5 shadow-lift [animation-delay:0.15s]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-inset ring-brand-100">
                      <BadgeCheck className="h-5 w-5 text-brand-600" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-ink-900">Matched: BrightLine Electrical</p>
                      <p className="text-xs font-medium text-ink-400">
                        Verified · replies on WhatsApp in minutes
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="animate-float absolute -right-3 -bottom-5 flex items-center gap-2 rounded-2xl bg-gold-400 px-4 py-3 shadow-lift sm:-right-6"
                  aria-hidden="true"
                >
                  <Coins className="h-5 w-5 text-ink-900" />
                  <span className="text-sm font-extrabold text-ink-900">
                    GH₵300 → paid to the pro, directly
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== PROVIDER MONEY PIPELINE ====================== */}
      <section className="relative overflow-hidden bg-ink-900 py-16 sm:py-20">
        <div className="dark-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-gold-400 uppercase">
              <Banknote className="h-4 w-4" aria-hidden="true" />
              For providers & businesses
            </p>
            <h2 className="font-display mt-3 max-w-2xl text-2xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
              How you get paid on Ghana Help Hub
            </h2>
          </Reveal>

          <div className="relative mt-12">
            <div
              className="absolute top-7 right-[12%] left-[12%] hidden border-t-2 border-dashed border-gold-400/40 md:block"
              aria-hidden="true"
            />
            <span
              className="animate-travel top-[21px] hidden h-3.5 w-3.5 rounded-full bg-gold-400 shadow-[0_0_16px_rgba(242,201,76,0.9)] md:block"
              aria-hidden="true"
            />
            <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
              {pipeline.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="flex gap-4 md:flex-col md:gap-0">
                  <div className="flex flex-col items-center md:mb-5">
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold-400/30 bg-ink-800 shadow-sm">
                      <Icon className="h-6 w-6 text-gold-400" aria-hidden="true" />
                      <span className="font-display absolute -top-2 -right-2 rounded-full bg-gold-400 px-1.5 py-0.5 text-[10px] font-extrabold text-ink-900">
                        {i + 1}
                      </span>
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-[15px] font-bold text-white">{title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-400">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <Reveal delay={150} className="mt-12">
            <p className="mx-auto flex w-fit max-w-full items-center gap-2.5 rounded-2xl bg-white/8 px-5 py-3.5 text-sm font-bold text-white ring-1 ring-inset ring-white/15">
              <ShieldCheck className="h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
              No commissions. No hidden cuts. The customer pays you — that's the whole story.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================ ESTIMATOR ============================ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              Do the maths for your trade
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-500">
              Drag the sliders to match your business. This is what consistent visibility on
              Ghana Help Hub could be worth every month.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-9">
            <Estimator />
          </Reveal>
        </div>
      </section>

      {/* ============================ REVENUE MODEL ============================ */}
      <section id="revenue" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
                <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
                Phase 2 roadmap
              </p>
              <h2 className="font-display mt-3 text-2xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
                How Ghana Help Hub itself makes money
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
                Today, everything is free while we prove the model. Tomorrow, the platform
                sustains itself through <strong className="font-bold text-ink-800">optional</strong>{" "}
                visibility and promotion — the way radio sells airtime, not the way a bank takes
                interest. No payment is collected anywhere in this demo.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Business plan — featured */}
            <Reveal>
              <div className="relative h-full overflow-hidden rounded-3xl bg-ink-900 p-7 text-white shadow-lift sm:p-8">
                <div className="dark-grid absolute inset-0" aria-hidden="true" />
                <span className="kente absolute inset-x-0 top-0 h-1" aria-hidden="true" />
                <span className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-gold-400 px-3 py-1 text-[11px] font-extrabold text-ink-900">
                  <Zap className="h-3 w-3" aria-hidden="true" />
                  Most popular
                </span>
                <div className="relative">
                  <p className="text-xs font-bold tracking-[0.14em] text-gold-400 uppercase">
                    Verified Business Plan
                  </p>
                  <p className="font-display mt-3 text-4xl font-extrabold tracking-tight">
                    GH₵29<span className="text-lg font-bold text-ink-400"> / month</span>
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Verified badge after a real identity & business check",
                      "Priority placement in your category and area",
                      "Direct WhatsApp & call buttons on your profile",
                      "Monthly summary of views and enquiries",
                      "Cancel anytime — no lock-in",
                    ].map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-ink-200">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    to="/businesses#list-my-business"
                    variant="gold"
                    fullWidth
                    className="mt-7"
                  >
                    Start free, upgrade later
                  </Button>
                  <p className="mt-2.5 text-center text-[11px] font-semibold text-ink-500">
                    Payments open in Phase 2 · MoMo & card
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Stream rows */}
            <div className="space-y-4">
              {revenueStreams.map(({ icon: Icon, name, price, text }, i) => (
                <Reveal key={name} delay={i * 80}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-inset ring-brand-100 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105">
                      <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-display text-[15px] font-bold text-ink-900">{name}</h3>
                        <span className="rounded-md bg-gold-100 px-2 py-0.5 text-[11px] font-extrabold text-ink-900 ring-1 ring-inset ring-gold-200">
                          {price}
                        </span>
                        <Badge variant="slate">Phase 2</Badge>
                      </div>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={340}>
                <div className="flex items-start gap-4 rounded-2xl border-2 border-brand-200 bg-brand-50/70 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-inset ring-brand-100">
                    <HeartHandshake className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-display text-[15px] font-bold text-ink-900">
                        Free forever tier
                      </h3>
                      <span className="rounded-md bg-brand-600 px-2 py-0.5 text-[11px] font-extrabold text-white">
                        GH₵0
                      </span>
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-600">
                      Every business can list for free, receive requests and chat with
                      customers — permanently. Paid tiers only add visibility, never access.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Never list */}
          <Reveal delay={120} className="mt-10">
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-ink-800 bg-ink-900 px-6 py-7 sm:flex-row sm:justify-between">
              <p className="font-display text-lg font-bold text-white">What we will never do:</p>
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {neverList.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-semibold text-ink-300">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/15 ring-1 ring-inset ring-red-500/40">
                      <X className="h-3 w-3 text-red-400" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================ FAQ ================================ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display text-center text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
              Straight answers
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            <Reveal delay={0}>
              <Faq
                q="Does Ghana Help Hub take a cut of my earnings?"
                a="No — and this is a founding rule, not a promotion. When a customer pays you for work, 100% is yours. GHH earns from optional promotions (featured placement, verification plans), not from your transactions."
              />
            </Reveal>
            <Reveal delay={60}>
              <Faq
                q="How do I actually receive money from customers?"
                a="Directly. You agree the price with the customer and they pay you the Ghanaian way — Mobile Money, bank transfer or cash. Ghana Help Hub is never in the money flow."
              />
            </Reveal>
            <Reveal delay={120}>
              <Faq
                q="What does the Verified badge cost — and mean?"
                a="Verification will be part of the GH₵29/month Business Plan in Phase 2, after a real identity and business check. It means your profile is checked — we state plainly on every profile that it is not a guarantee of work quality."
              />
            </Reveal>
            <Reveal delay={180}>
              <Faq
                q="Do I pay anything during the MVP?"
                a="Nothing. Listing your business, receiving requests, chatting with customers — all free while we're in demo and Phase 1. When paid tiers launch, existing users keep the free tier forever."
              />
            </Reveal>
            <Reveal delay={240}>
              <Faq
                q="When do plans and payments launch?"
                a="Phase 2, alongside the backend and Mobile Money checkout (MoMo first, cards second). Tell us via the contact page if you'd like to be notified — or join the free waitlist by listing your business now."
              />
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-12">
            <div className="flex flex-col items-center gap-4 rounded-3xl border border-gold-200 bg-gold-100/50 p-7 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400 shadow-sm">
                <Rocket className="h-6 w-6 text-ink-900" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl font-extrabold text-ink-900">
                Ready to be found — and paid?
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-ink-600">
                Join free today. When the money features switch on, you'll already be where the
                demand is.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button to="/businesses#list-my-business" variant="primary" size="lg">
                  <Store className="h-4 w-4" aria-hidden="true" />
                  List My Business
                </Button>
                <Button to="/contact" variant="outline" size="lg">
                  Talk to the team
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
