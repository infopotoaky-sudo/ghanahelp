import { MapPin, MessageCircle, Star, ArrowRight } from "lucide-react";
import type { Business } from "../types";
import { waLink } from "../lib/utils";
import { VerifiedBadge } from "./Badge";
import Button from "./Button";
import Badge from "./Badge";

interface BusinessCardProps {
  business: Business;
  index?: number;
}

const avatarPalettes = [
  "bg-brand-600 text-white",
  "bg-gold-400 text-ink-900",
  "bg-ink-900 text-gold-400",
  "bg-brand-100 text-brand-800",
  "bg-gold-200 text-gold-700",
  "bg-brand-800 text-brand-100",
];

export function BusinessAvatar({ business, size = "md" }: { business: Business; size?: "md" | "lg" }) {
  const hash = business.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const palette = avatarPalettes[hash % avatarPalettes.length];
  const initials = business.name
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden="true"
      className={`font-display flex shrink-0 items-center justify-center rounded-xl font-bold ${palette} ${
        size === "lg" ? "h-16 w-16 text-xl" : "h-12 w-12 text-sm"
      }`}
    >
      {initials}
    </span>
  );
}

export default function BusinessCard({ business, index = 0 }: BusinessCardProps) {
  return (
    <article
      className="group flex flex-col rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="flex items-start gap-3.5">
        <BusinessAvatar business={business} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="font-display truncate text-[15px] font-bold text-ink-900">
              {business.name}
            </h3>
            {business.verified && <VerifiedBadge />}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <Badge variant="outline">{business.category}</Badge>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-500">
              <MapPin className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
              {business.location}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-ink-500">
        {business.tagline}
      </p>

      <div className="mt-3 flex items-center gap-1.5 text-sm">
        <span className="flex items-center gap-1 font-bold text-ink-900">
          <Star className="h-4 w-4 fill-gold-400 text-gold-500" aria-hidden="true" />
          {business.rating.toFixed(1)}
        </span>
        <span className="text-xs text-ink-400">({business.reviewsCount} ratings)</span>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-ink-100 pt-4">
        <Button
          href={waLink(business.whatsapp, `Hello ${business.name}! I found you on Ghana Help Hub.`)}
          variant="outline"
          size="sm"
          className="flex-1"
          aria-label={`Chat with ${business.name} on WhatsApp`}
        >
          <MessageCircle className="h-4 w-4 text-brand-600" aria-hidden="true" />
          WhatsApp
        </Button>
        <Button to={`/businesses/${business.id}`} variant="primary" size="sm" className="flex-1">
          View profile
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}
