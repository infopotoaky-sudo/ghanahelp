import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone, Store, Radio, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { media } from "../lib/media";
import { cn } from "../lib/utils";

interface Banner {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  to: string;
  kind: "gold" | "dark" | "brand" | "image";
  image?: string;
  icon?: typeof Megaphone;
}

const banners: Banner[] = [
  {
    id: "need",
    eyebrow: "New here?",
    title: "Whatever you need — just say it.",
    text: "Tell Ghana Help Hub and we'll connect you to someone who can help.",
    cta: "I Need Something",
    to: "/post-request",
    kind: "gold",
    icon: Megaphone,
  },
  {
    id: "provider",
    eyebrow: "Verified professional",
    title: "Meet Kwabena — Electrician, Amasaman",
    text: "One of the trusted pros you can reach directly on WhatsApp.",
    cta: "View profile",
    to: "/businesses/brightline-electrical",
    kind: "image",
    image: media.heroElectrician,
  },
  {
    id: "business",
    eyebrow: "For businesses",
    title: "Own a business? Get discovered.",
    text: "People near you are searching for what you offer right now.",
    cta: "List My Business",
    to: "/businesses#list-my-business",
    kind: "dark",
    icon: Store,
  },
  {
    id: "radio",
    eyebrow: "On air × online",
    title: "From radio to real solutions.",
    text: "Heard a need or an opportunity on air? Continue the conversation here.",
    cta: "Explore",
    to: "/about",
    kind: "brand",
    icon: Radio,
  },
];

const bg: Record<Banner["kind"], string> = {
  gold: "bg-gold-400 text-ink-900",
  dark: "bg-ink-900 text-white",
  brand: "bg-brand-700 text-white",
  image: "bg-ink-900 text-white",
};

/** Jiji-style auto-playing promo banner carousel for the app home. */
export default function BannerCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollTo = useCallback((index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const index = Math.round(el.scrollLeft / el.clientWidth);
      setActive(Math.max(0, Math.min(index, banners.length - 1)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const next = Math.round(el.scrollLeft / el.clientWidth) + 1;
      el.scrollTo({ left: (next % banners.length) * el.clientWidth, behavior: "smooth" });
    }, 5200);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <div
      className="group/banner relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        role="region"
        aria-label="Featured announcements"
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-2xl scroll-smooth"
      >
        {banners.map((b) => (
          <div key={b.id} className="w-full shrink-0 snap-start">
            <div className={cn("relative overflow-hidden rounded-2xl", bg[b.kind])}>
              {b.kind === "image" && b.image && (
                <img
                  src={b.image}
                  alt=""
                  aria-hidden="true"
                  className="animate-kenburns absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              )}
              {b.kind === "image" && (
                <div
                  className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/55 to-ink-900/20"
                  aria-hidden="true"
                />
              )}
              {b.kind === "dark" && <div className="dark-grid absolute inset-0" aria-hidden="true" />}
              {b.kind === "brand" && <div className="dark-grid absolute inset-0 opacity-70" aria-hidden="true" />}
              <span className="kente absolute inset-x-0 top-0 h-1" aria-hidden="true" />

              <div className="relative flex min-h-36 flex-col justify-center gap-1.5 p-5 sm:min-h-44 sm:p-7">
                <p
                  className={cn(
                    "text-[11px] font-extrabold tracking-[0.14em] uppercase",
                    b.kind === "gold" ? "text-ink-700" : "text-gold-400"
                  )}
                >
                  {b.eyebrow}
                </p>
                <p className="font-display max-w-md text-lg leading-tight font-extrabold tracking-tight text-balance sm:text-2xl">
                  {b.title}
                </p>
                <p
                  className={cn(
                    "max-w-sm text-[13px] leading-snug font-medium sm:text-sm",
                    b.kind === "gold" ? "text-ink-700/80" : "text-ink-300"
                  )}
                >
                  {b.text}
                </p>
                <Link
                  to={b.to}
                  className={cn(
                    "mt-2.5 inline-flex w-fit items-center gap-1.5 rounded-xl px-4 py-2 text-[13px] font-extrabold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    b.kind === "gold"
                      ? "bg-ink-900 text-white focus-visible:ring-ink-900"
                      : "bg-white text-ink-900 focus-visible:ring-white"
                  )}
                >
                  {b.icon && <b.icon className="h-4 w-4" aria-hidden="true" />}
                  {b.cta}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {banners.map((b, i) => (
          <button
            key={b.id}
            type="button"
            aria-label={`Go to banner ${i + 1}`}
            aria-current={i === active}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              i === active ? "w-6 bg-brand-600" : "w-1.5 bg-ink-200 hover:bg-ink-300"
            )}
          />
        ))}
      </div>

      {/* Arrows (desktop) */}
      <button
        type="button"
        onClick={() => scrollTo((active - 1 + banners.length) % banners.length)}
        aria-label="Previous banner"
        className="absolute top-1/2 -left-3 hidden h-9 w-9 -translate-y-2/3 items-center justify-center rounded-full border border-ink-100 bg-white text-ink-700 shadow-lift opacity-0 transition-all duration-200 group-hover/banner:opacity-100 hover:bg-brand-600 hover:text-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 md:flex"
      >
        <ChevronLeft className="h-4.5 w-4.5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => scrollTo((active + 1) % banners.length)}
        aria-label="Next banner"
        className="absolute top-1/2 -right-3 hidden h-9 w-9 -translate-y-2/3 items-center justify-center rounded-full border border-ink-100 bg-white text-ink-700 shadow-lift opacity-0 transition-all duration-200 group-hover/banner:opacity-100 hover:bg-brand-600 hover:text-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 md:flex"
      >
        <ChevronRight className="h-4.5 w-4.5" aria-hidden="true" />
      </button>
    </div>
  );
}
