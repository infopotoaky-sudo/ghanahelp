import { Megaphone, Compass } from "lucide-react";
import Button from "./Button";
import Reveal from "./Reveal";

export default function FinalCta() {
  return (
    <Reveal>
      <section
        aria-label="Get started with Ghana Help Hub"
        className="relative overflow-hidden rounded-3xl bg-brand-700 px-6 py-14 text-center sm:px-10 sm:py-16"
      >
        <div className="dark-grid absolute inset-0" aria-hidden="true" />
        <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-brand-500/40 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-2xl">
          <span className="kente mx-auto mb-6 block h-1.5 w-24 rounded-full" aria-hidden="true" />
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl">
            Whatever you need, start here.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-brand-100">
            Tell Ghana Help Hub what you're looking for — a service, a job, a room, an
            opportunity — and we'll help connect you to the right people.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/post-request" variant="gold" size="lg" className="w-full sm:w-auto">
              <Megaphone className="h-5 w-5" aria-hidden="true" />
              I Need Something
            </Button>
            <Button
              to="/find-help"
              size="lg"
              className="w-full bg-white/10 text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm hover:bg-white/20 sm:w-auto"
            >
              <Compass className="h-5 w-5" aria-hidden="true" />
              Find Help
            </Button>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
