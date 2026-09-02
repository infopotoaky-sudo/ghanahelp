import { Store, ArrowRight, BadgeCheck, MessageCircle, Users } from "lucide-react";
import Button from "./Button";
import Reveal from "./Reveal";

/** Periodic "Own a business?" CTA strip used across pages. */
export default function BusinessCta() {
  return (
    <Reveal>
      <section
        aria-label="List your business on Ghana Help Hub"
        className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-10 sm:px-10 sm:py-12"
      >
        <div className="dark-grid absolute inset-0" aria-hidden="true" />
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-600/30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-gold-400/15 blur-3xl" aria-hidden="true" />

        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-400">
              <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
              Own a business?
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Get discovered by people looking for what you offer.
            </h2>
            <ul className="mt-5 grid gap-3 text-sm text-ink-300 sm:grid-cols-3">
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                Verified profile badge
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                Direct WhatsApp leads
              </li>
              <li className="flex items-center gap-2">
                <Users className="h-4.5 w-4.5 shrink-0 text-gold-400" aria-hidden="true" />
                Matched to local requests
              </li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/businesses#list-my-business" variant="gold" size="lg">
              <Store className="h-5 w-5" aria-hidden="true" />
              List My Business
            </Button>
            <Button to="/about" variant="outline" size="lg" className="border-ink-700 bg-transparent text-white ring-ink-700 hover:bg-ink-800 hover:ring-ink-600">
              Learn more
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
