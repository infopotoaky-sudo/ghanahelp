import { useState } from "react";
import {
  Zap,
  BadgeCheck,
  MessageCircle,
  Briefcase,
  Radio,
  GraduationCap,
  Wallet,
  Banknote,
  ShieldCheck,
  BellOff,
  EyeOff,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Megaphone,
  Store,
} from "lucide-react";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../lib/utils";

/* ------------------------------- Content ------------------------------- */

const streams = [
  {
    n: "01",
    icon: Zap,
    accent: "bg-gold-100 text-gold-700 ring-gold-200",
    title: "Promoted & featured listings",
    text: "Like boosting an ad in the market: businesses pay a small amount to appear at the top of their category or in the “For you” rail while more people are searching.",
    pays: "Businesses pay",
    free: "Organic listings stay free",
    price: "from GH₵10/day",
  },
  {
    n: "02",
    icon: BadgeCheck,
    accent: "bg-brand-50 text-brand-700 ring-brand-200",
    title: "Verified business badge",
    text: "A one-time identity and phone check earns the green verified tick. Verification means “profile checked” — we say plainly it is never a guarantee of work.",
    pays: "Businesses pay once",
    free: "Badges stay visible forever",
    price: "GH₵40/year",
  },
  {
    n: "03",
    icon: MessageCircle,
    accent: "bg-brand-50 text-brand-700 ring-brand-200",
    title: "Pay-per-connection leads",
    text: "When someone posts “I need a plumber in Amasaman”, matching providers can unlock the contact for a tiny fee. No subscription — pay only when a real need arrives.",
    pays: "Providers pay per lead",
    free: "Posting requests is always free",
    price: "GH₵2/unlock",
  },
  {
    n: "04",
    icon: Briefcase,
    accent: "bg-gold-100 text-gold-700 ring-gold-200",
    title: "Job slots for employers",
    text: "A company's first opening is free. Frequent recruiters take a simple monthly bundle for multiple live slots and a highlighted employer badge.",
    pays: "Employers pay for volume",
    free: "Jobseekers never pay",
    price: "1st free · GH₵150/mo",
  },
  {
    n: "05",
    icon: Radio,
    accent: "bg-brand-50 text-brand-700 ring-brand-200",
    title: "Radio & media partnerships",
    text: "GHH was built to work with radio. Stations run “help segments” where on-air needs become online requests — sponsored airtime creates a shared revenue stream.",
    pays: "Sponsors & stations",
    free: "Listeners participate free",
    price: "Partner deals",
  },
  {
    n: "06",
    icon: GraduationCap,
    accent: "bg-gold-100 text-gold-700 ring-gold-200",
    title: "Institutions & opportunities",
    text: "Schools, NGOs and programmes pay to distribute scholarships, trainings and grants to the right audiences — with clear “sponsored” labelling on every listing.",
    pays: "Institutions pay",
    free: "Applicants never pay",
    price: "Per campaign",
  },
];

const rateBoard = [
  { item: "Boost a listing (top of category)", price: "GH₵10/day · GH₵50/week" },
  { item: "TOP spot on the home rail", price: "GH₵25/day" },
  { item: "Verified badge (ID + phone check)", price: "GH₵40/year" },
  { item: "Lead unlock from a posted request", price: "GH₵2/unlock" },
  { item: "Employer job bundle (5 live slots)", price: "GH₵150/month" },
  { item: "Sponsored opportunity campaign", price: "Custom quote" },
];

const neverList = [
  {
    icon: EyeOff,
    title: "Your data is never sold",
    text: "Contact details go only to the person you choose to connect with.",
  },
  {
    icon: BellOff,
    title: "No spam, no robocalls",
    text: "Providers reach you on WhatsApp or by call — only when you allow it.",
  },
  {
    icon: ShieldCheck,
    title: "No hidden charges for help",
    text: "Searching, posting requests and connecting cost GHS 0.00. Forever.",
  },
];

const faqs = [
  {
    q: "Do regular people ever pay?",
    a: "No. Browsing, searching, posting “I need…” requests, and connecting with providers is completely free for everyone in Ghana. Businesses, employers and partners fund the platform instead — the classic marketplace model, done honestly.",
  },
  {
    q: "Is this pricing live today?",
    a: "Not yet — everything on this page is the illustrative model we're testing with Ghanaian businesses during the pilot. Real prices will be shaped by what small businesses can genuinely afford, starting as low as a few cedis.",
  },
  {
    q: "Why not run ads like other platforms?",
    a: "Banner ads pay little and clutter the experience. Promoted listings and pay-per-connection align our income with actual help delivered: we only earn when a business gets real customers.",
  },
  {
    q: "What happens to my information?",
    a: "It's used only to match you with relevant help. No selling to third parties, no data brokers, no surprise marketing. When accounts launch, you'll be able to delete everything in one tap.",
  },
];

/* ------------------------------- Page ------------------------------- */

export default function HowWeEarn() {
  usePageMeta(
    "How Ghana Help Hub Makes Money | Ghana Help Hub",
    "Help stays free for Ghanaians. Ghana Help Hub earns from promoted listings, verification, pay-per-connection leads, job slots and radio partnerships."
  );

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-gold-200/60 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-10 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
            <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
            Business model · honest edition
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-[2.6rem] sm:leading-[1.12]">
            How Ghana Help Hub{" "}
            <span className="relative inline-block">
              makes money.
              <svg viewBox="0 0 220 14" className="absolute -bottom-1.5 left-0 w-full text-gold-400" aria-hidden="true" preserveAspectRatio="none">
                <path d="M4 10.5C60 3.5 160 3.5 216 9.5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">
            The short version: <strong className="font-bold text-ink-800">help is free for people.</strong>{" "}
            Businesses, employers and partners pay for visibility and connections — never your
            data, never hidden fees. Here's the full picture.
          </p>
        </div>
      </section>

      {/* Free panel + streams */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Sticky: free forever */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="overflow-hidden rounded-3xl bg-brand-700 text-white shadow-lift">
                <span className="kente block h-1.5" aria-hidden="true" />
                <div className="p-7 sm:p-9">
                  <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-gold-400 uppercase">
                    <Wallet className="h-4 w-4" aria-hidden="true" />
                    Free forever — for people
                  </p>
                  <h2 className="font-display mt-3 text-2xl font-extrabold tracking-tight text-balance">
                    GHS 0.00 to find help.
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {[
                      "Search businesses, services & professionals",
                      "Post “I need…” requests",
                      "Browse jobs & opportunities",
                      "Lost & Found board",
                      "Connect directly on WhatsApp or call",
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-2.5 text-[15px] font-medium text-brand-100">
                        <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 grid gap-2.5">
                    <Button to="/post-request" variant="gold" fullWidth>
                      <Megaphone className="h-4 w-4" aria-hidden="true" />
                      I Need Something
                    </Button>
                    <Button
                      to="/businesses#list-my-business"
                      fullWidth
                      className="bg-white/10 text-white ring-1 ring-inset ring-white/25 hover:bg-white/20"
                    >
                      <Store className="h-4 w-4" aria-hidden="true" />
                      I run a business
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-6 rounded-3xl border border-gold-200 bg-gold-100/50 p-6">
                <p className="flex items-center gap-2 text-sm font-extrabold text-ink-900">
                  <Banknote className="h-4 w-4 text-gold-700" aria-hidden="true" />
                  The one-line model
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  “People bring needs. Businesses pay to be the answer.” — the same logic as a
                  busy market stall paying for the best spot, at cedi-friendly scale.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Revenue streams */}
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                Six honest revenue streams
              </h2>
              <p className="mt-2 max-w-xl text-[15px] text-ink-500">
                Ranked by how early they arrive. Each one keeps the free side free.
              </p>
            </Reveal>

            <ol className="mt-8 space-y-4">
              {streams.map((s, i) => (
                <Reveal key={s.n} delay={Math.min(i, 4) * 70}>
                  <li className="group relative overflow-hidden rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift sm:p-6">
                    <div className="flex items-start gap-4 sm:gap-5">
                      <span className="font-display text-4xl leading-none font-extrabold text-brand-100 transition-colors duration-300 group-hover:text-brand-300 sm:text-5xl">
                        {s.n}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl ring-1 ring-inset", s.accent)}>
                            <s.icon className="h-4.5 w-4.5" aria-hidden="true" />
                          </span>
                          <h3 className="font-display text-base font-bold text-ink-900 sm:text-lg">
                            {s.title}
                          </h3>
                          <span className="ml-auto rounded-full bg-canvas px-3 py-1 text-[11px] font-extrabold whitespace-nowrap text-brand-700 ring-1 ring-inset ring-ink-200">
                            {s.price}
                          </span>
                        </div>
                        <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{s.text}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-inset ring-brand-100">
                            {s.pays}
                          </span>
                          <span className="rounded-md bg-gold-100 px-2.5 py-1 text-[11px] font-bold text-ink-800 ring-1 ring-inset ring-gold-200">
                            {s.free}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Rate board */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <div>
                <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
                  The GHH rate board
                </h2>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-500">
                  Illustrative pilot pricing — think of it as the chalkboard at the stall.
                  Final numbers will be set with real Ghanaian businesses, starting low enough
                  that a roadside mechanic can afford to be seen.
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-100/60 px-3.5 py-1.5 text-xs font-bold text-ink-800">
                  <Wallet className="h-3.5 w-3.5 text-gold-700" aria-hidden="true" />
                  Demo pricing — nothing is charged today
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="overflow-hidden rounded-3xl bg-ink-900 shadow-lift">
                <span className="kente block h-1.5" aria-hidden="true" />
                <div className="p-6 sm:p-8">
                  <p className="font-display text-sm font-extrabold tracking-[0.14em] text-gold-400 uppercase">
                    Market rates · GH₵
                  </p>
                  <ul className="mt-5">
                    {rateBoard.map((row) => (
                      <li
                        key={row.item}
                        className="group flex items-baseline gap-3 border-b border-dashed border-ink-700 py-3.5 last:border-0"
                      >
                        <span className="text-sm font-semibold text-ink-200 transition-colors group-hover:text-white">
                          {row.item}
                        </span>
                        <span className="mx-1 mb-1 flex-1 border-b border-dotted border-ink-600" aria-hidden="true" />
                        <span className="font-display text-sm font-extrabold whitespace-nowrap text-gold-400">
                          {row.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Never monetized */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-brand-200 bg-brand-50/60">
              <div className="grid divide-y divide-brand-100 md:grid-cols-3 md:divide-x md:divide-y-0">
                {neverList.map((item, i) => (
                  <div key={item.title} className="p-6 sm:p-8">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm ring-1 ring-inset ring-brand-100">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display mt-4 text-[15px] font-bold text-ink-900">{item.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{item.text}</p>
                    <span className="mt-3 inline-block rounded-md bg-brand-600 px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-white uppercase">
                      Promise {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Radio partnership note */}
          <Reveal delay={100}>
            <div className="mt-6 flex flex-col items-start gap-4 rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:flex-row sm:items-center sm:p-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-100 text-gold-700 ring-1 ring-inset ring-gold-200">
                <Radio className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-base font-bold text-ink-900">
                  Built to work with radio
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">
                  Stations get a live pipeline from on-air conversations to solved needs — and a
                  share of the revenue their audiences create online.
                </p>
              </div>
              <Button to="/about" variant="outline">
                The full story
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display text-center text-2xl font-bold text-ink-900 sm:text-3xl">
              Fair questions, straight answers
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <Reveal key={f.q} delay={Math.min(i, 3) * 60}>
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl border transition-all duration-300",
                      isOpen ? "border-brand-300 bg-brand-50/50 shadow-card" : "border-ink-100 bg-white hover:border-ink-200"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:px-6"
                    >
                      <span className="font-display text-[15px] font-bold text-ink-900">{f.q}</span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-brand-600 transition-transform duration-300",
                          isOpen && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <p className="animate-pop px-5 pb-5 text-sm leading-relaxed text-ink-600 sm:px-6">
                        {f.a}
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={120}>
            <div className="mt-10 flex flex-col items-center gap-3 text-center">
              <p className="text-sm font-semibold text-ink-500">
                Want to be on the earning side? List your business or partner with us.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button to="/businesses#list-my-business" variant="gold" size="lg">
                  <Store className="h-4 w-4" aria-hidden="true" />
                  List My Business
                </Button>
                <Button to="/contact" variant="outline" size="lg">
                  Partner with GHH
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
