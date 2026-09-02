import { Link } from "react-router-dom";
import {
  Star,
  BadgeCheck,
  Zap,
  Wrench,
  Car,
  Camera,
  ChefHat,
  GraduationCap,
  Scissors,
  Code2,
  Sparkles,
  Fan,
  Hammer,
  Store,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Business } from "../types";
import { timeAgo, cn } from "../lib/utils";
import { useFavorites } from "../hooks/useFavorites";

const headerStyles = [
  "from-brand-50 to-brand-100 text-brand-600",
  "from-gold-100 to-gold-200/70 text-gold-700",
  "from-ink-50 to-ink-100 text-ink-500",
];

const categoryIcons: Record<string, LucideIcon> = {
  Electrician: Zap,
  Plumber: Wrench,
  Mechanic: Car,
  Photographer: Camera,
  Caterer: ChefHat,
  Tutor: GraduationCap,
  Tailor: Scissors,
  Barber: Scissors,
  "Web Developer": Code2,
  Cleaner: Sparkles,
  "AC Technician": Fan,
  Carpenter: Hammer,
};

/* ------------------------------ Heart toggle ------------------------------ */

interface HeartToggleProps {
  active: boolean;
  onToggle: () => void;
  label: string;
  className?: string;
}

export function HeartToggle({ active, onToggle, label, className }: HeartToggleProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm ring-1 ring-ink-900/10 transition-all duration-200 hover:scale-110 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        className
      )}
    >
      <svg
        viewBox="0 0 24 24"
        key={active ? "on" : "off"}
        className={cn(
          "h-4 w-4 transition-colors",
          active ? "animate-heart-pop fill-red-500 stroke-red-500" : "fill-transparent stroke-ink-500"
        )}
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}

/* ------------------------------ Listing tile ------------------------------ */

interface ListingTileProps {
  business: Business;
  index?: number;
  className?: string;
}

/**
 * Dense, image-block-first listing card in the style of Jiji's marketplace
 * tiles — bold green value line, location, save-to-favourites heart.
 */
export default function ListingTile({ business: b, index = 0, className }: ListingTileProps) {
  const { has, toggle } = useFavorites();
  const Icon = categoryIcons[b.category] ?? Store;
  const saved = has(b.id);
  const isTop = b.verified && b.rating >= 4.7;

  return (
    <Link
      to={`/businesses/${b.id}`}
      className={cn(
        "group block overflow-hidden rounded-xl border border-ink-100 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        className
      )}
    >
      <div
        className={cn(
          "relative flex h-28 items-center justify-center bg-gradient-to-br sm:h-32",
          headerStyles[index % headerStyles.length]
        )}
      >
        <Icon
          className="h-11 w-11 opacity-80 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
          aria-hidden="true"
        />
        <span className="absolute top-2 left-2 flex flex-col items-start gap-1">
          {isTop && (
            <span className="inline-flex items-center gap-1 rounded-md bg-gold-400 px-1.5 py-0.5 text-[10px] font-extrabold tracking-wide text-ink-900 uppercase shadow-sm">
              <Zap className="h-3 w-3" aria-hidden="true" />
              Top
            </span>
          )}
          {b.verified && !isTop && (
            <span className="inline-flex items-center gap-1 rounded-md bg-brand-600 px-1.5 py-0.5 text-[10px] font-extrabold tracking-wide text-white uppercase shadow-sm">
              <BadgeCheck className="h-3 w-3" aria-hidden="true" />
              Verified
            </span>
          )}
        </span>
        <HeartToggle
          active={saved}
          onToggle={() =>
            toggle({ id: b.id, title: b.name, sub: `${b.category} · ${b.location}`, link: `/businesses/${b.id}` })
          }
          label={saved ? `Remove ${b.name} from saved` : `Save ${b.name}`}
          className="absolute top-2 right-2"
        />
      </div>

      <div className="p-3">
        <h3 className="font-display line-clamp-1 text-[13.5px] leading-snug font-bold text-ink-900 transition-colors group-hover:text-brand-700">
          {b.name}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-sm font-extrabold text-brand-700">
          <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-500" aria-hidden="true" />
          {b.rating.toFixed(1)}
          <span className="text-[11px] font-semibold text-ink-400">({b.reviewsCount})</span>
        </p>
        <p className="mt-0.5 truncate text-[11px] font-semibold text-ink-500">
          {b.category} · {b.location}
        </p>
        <p className="mt-1.5 border-t border-dashed border-ink-100 pt-1.5 text-[10.5px] font-semibold tracking-wide text-ink-400 uppercase">
          On GHH {timeAgo(b.createdAt)}
        </p>
      </div>
    </Link>
  );
}
