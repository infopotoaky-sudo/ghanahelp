import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Megaphone,
  Zap,
  Radio,
  HeartHandshake,
  Check,
  Minus,
  ChevronDown,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import FinalCta from "../components/FinalCta";
import ListingTile from "../components/ListingTile";
import { businesses } from "../data/businesses";
import { plans, revenueStreams, pricingFaqs } from "../data/plans";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../lib/utils";

const streamIcons: Record<string, LucideIcon> = {
  megaphone: Megaphone,
  zap: Zap,
  radio: Radio,
  handshake: HeartHandshake,
};

export default function Pricing() {
  usePageMeta(
    "Business Plans & Pricing | Ghana Help Hub",
    "Free to list. Pay only for extra visibility — boosts, lead credits and Pro plans. See how Ghana Help Hub makes money."
  );

  const boosted = businesses.find((b) => b.verified) ?? businesses[0];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-12 sm:px-6 lg:px-8 lg:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
                <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
                For businesses &amp; professionals
              </p>
              <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl lg:text-[2.9rem] lg:leading-[1.08]">
                Turn your craft into{" "}
                <span className="relative inline-block">
                  customers.
                  <svg viewBox="0 0 220 14" className="absolute -bottom-1.5 left-0 w-full text-gold-400" aria-hidden="true" preserveAspectRatio="none">
                    <path d="M4 10.5C60 3.5 160 3.5 216 9.5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-500">
                Listing your business is <span className="font-bold text-ink-800">free, forever</span>.
                You only pay when you want to be seen first — by the people already searching for
                exactly what you do.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button to="/businesses#list-my-business" variant="primary" size="lg">
                  List my business free
                </Button>
                <a
                  href="#plans"
                  className="group inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  See plans
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-5 inline-flex items-start gap-2 rounded-xl border border-gold-200 bg-gold-100/60 px-3.5 py-2.5 text-xs leading-relaxed font-semibold text-ink-700">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-700" aria-hidden="true" />
                Demo pricing — no real payment is processed. Checkout via Mobile Money arrives in Phase 2.
              </p>
            </div>

            {/* Boosted preview */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-3 -rotate-2 rounded-3xl bg-brand-50 ring-1 ring-inset ring-brand-100" aria-hidden="true" />
              <div className="relative rounded-2xl bg-white p-3 shadow-lift ring-1 ring-ink-900/5">
                <p className="flex items-center gap-1.5 px-1 pb-2 text-[11px] font-extrabold tracking-[0.12em] text-brand-600 uppercase">
                  <Zap className="h-3.5 w-3.5 fill-gold-400 text-gold-500" aria-hidden="true" />
                  This is a boosted listing
                </p>
                <div className="relative">
                  <ListingTile business={boosted} index={0} className="pointer-events-none" />
                  <span className="animate-float absolute -top-3 -right-2 inline-flex items-center gap-1 rounded-full bg-gold-400 px-2.5 py-1 text-[11px] font-extrabold text-ink-900 shadow-lift">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    Boosted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHO PAYS / WHO DOESN'T ============ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-ink-100 bg-canvas p-7 sm:p-8">
                <p className="text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">For people</p>
                <h2 className="font-display mt-2 text-2xl font-bold text-ink-900">Finding help is free. Always.</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                  Post a request, search businesses, browse jobs and opportunities, use lost &amp;
                  found — none of it costs a pesewa. The person with the need never pays.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="relative h-full overflow-hidden rounded-3xl bg-brand-700 p-7 text-white sm:p-8">
                <div className="dark-grid absolute inset-0" aria-hidden="true" />
                <span className="kente absolute inset-x-0 top-0 h-1" aria-hidden="true" />
                <div className="relative">
                  <p className="text-xs font-bold tracking-[0.14em] text-gold-400 uppercase">For businesses</p>
                  <h2 className="font-display mt-2 text-2xl font-bold">Visibility is where we earn.</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-brand-100">
                    Professionals pay to be seen first and to reach warm leads. We never take a cut
                    of your actual work — your money stays yours.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ HOW THE MONEY FLOWS ============ */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
              <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
              The honest business model
            </p>
            <h2 className="font-display mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
              Four ways Ghana Help Hub makes money.
            </h2>
          </Reveal>

          <div className="mt-10 space-y-4">
            {revenueStreams.map((stream, i) => {
              const Icon = streamIcons[stream.icon] ?? Megaphone;
              return (
                <Reveal key={stream.title} delay={i * 70}>
                  <div className="group flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift sm:flex-row sm:items-center sm:gap-6 sm:p-6">
                    <div className="flex items-center gap-4 sm:w-1/3 sm:shrink-0">
                      <span className="font-display text-3xl font-extrabold text-ink-200 transition-colors group-hover:text-gold-400">
                        0{i + 1}
                      </span>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-inset ring-brand-100">
                        <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold text-ink-900">{stream.title}</h3>
                        <p className="text-xs font-semibold text-brand-600">{stream.who}</p>
                      </div>
                    </div>
                    <p className="text-[14px] leading-relaxed text-ink-600 sm:flex-1">{stream.detail}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PLANS ============ */}
      <section id="plans" className="scroll-mt-24 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
                Simple plans, priced for Ghana.
              </h2>
              <p className="mt-3 text-[15px] text-ink-500">
                Start free. Boost when you want the phone to ring more.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 90}>
                <div
                  className={cn(
                    "relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift",
                    plan.highlighted
                      ? "bg-brand-700 text-white shadow-lift ring-2 ring-gold-400 lg:-translate-y-3 lg:hover:-translate-y-4"
                      : "border border-ink-100 bg-canvas shadow-card"
                  )}
                >
                  {plan.highlighted && <span className="kente absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />}
                  {plan.highlighted && (
                    <span className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-gold-400 px-2.5 py-1 text-[11px] font-extrabold text-ink-900">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      Most popular
                    </span>
                  )}

                  <h3 className={cn("font-display text-lg font-bold", plan.highlighted ? "text-white" : "text-ink-900")}>
                    {plan.name}
                  </h3>
                  <p className={cn("mt-1 text-sm font-medium", plan.highlighted ? "text-brand-100" : "text-ink-500")}>
                    {plan.tagline}
                  </p>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className={cn("font-display text-4xl font-extrabold tracking-tight", plan.highlighted ? "text-gold-400" : "text-ink-900")}>
                      {plan.price}
                    </span>
                    <span className={cn("text-sm font-semibold", plan.highlighted ? "text-brand-100" : "text-ink-400")}>
                      {plan.period}
                    </span>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-2.5">
                        {f.included ? (
                          <Check className={cn("mt-0.5 h-4 w-4 shrink-0", plan.highlighted ? "text-gold-400" : "text-brand-600")} aria-hidden="true" />
                        ) : (
                          <Minus className="mt-0.5 h-4 w-4 shrink-0 text-ink-300" aria-hidden="true" />
                        )}
                        <span className={cn("text-[14px] leading-snug font-medium", f.included ? (plan.highlighted ? "text-brand-50" : "text-ink-700") : "text-ink-400 line-through decoration-ink-300")}>
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={plan.highlighted ? "/contact" : "/businesses#list-my-business"}
                    className={cn(
                      "mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      plan.highlighted
                        ? "bg-gold-400 text-ink-900 shadow-sm hover:bg-gold-300 focus-visible:ring-gold-400"
                        : "bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500"
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <p className="mx-auto flex max-w-xl items-start justify-center gap-2 text-center text-[13px] leading-relaxed font-medium text-ink-500">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              Every paid plan is an optional boost. Your free listing stays live whether you pay or not.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-center text-3xl font-extrabold tracking-tight text-ink-900">
              Fair questions, straight answers.
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {pricingFaqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 50}>
                <FaqItem q={faq.q} a={faq.a} />
              </Reveal>
            ))}
          </div>
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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("rounded-2xl border bg-white transition-all duration-300", open ? "border-brand-200 shadow-card" : "border-ink-100 shadow-card hover:border-brand-200")}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <span className="font-display text-[15px] font-bold text-ink-900">{q}</span>
        <ChevronDown className={cn("h-5 w-5 shrink-0 text-brand-600 transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
      </button>
      <div className={cn("grid transition-all duration-300 ease-out", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[14px] leading-relaxed text-ink-600">{a}</p>
        </div>
      </div>
    </div>
  );
}
