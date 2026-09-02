import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Navigation,
  Flag,
  Star,
  Clock,
  Wrench,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { BusinessAvatar } from "../components/BusinessCard";
import BusinessCard from "../components/BusinessCard";
import Badge, {
  VerifiedBadge,
  PhoneVerifiedBadge,
  CommunityReportedBadge,
  SampleDataBadge,
} from "../components/Badge";
import Button from "../components/Button";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import Reveal from "../components/Reveal";
import { getBusinessById, getReviews, getBusinesses } from "../services/businesses";
import type { Business, Review } from "../types";
import { formatDate, telLink, timeAgo, waLink } from "../lib/utils";
import { usePageMeta } from "../hooks/usePageMeta";

export default function BusinessProfile() {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<Business | null | "missing">(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Business[]>([]);
  const [reportOpen, setReportOpen] = useState(false);

  usePageMeta(
    business && business !== "missing"
      ? `${business.name} | Ghana Help Hub`
      : "Business profile | Ghana Help Hub"
  );

  useEffect(() => {
    if (!id) return;
    let active = true;
    setBusiness(null);
    getBusinessById(id).then(async (b) => {
      if (!active) return;
      if (!b) {
        setBusiness("missing");
        return;
      }
      setBusiness(b);
      const [r, all] = await Promise.all([getReviews(b.id), getBusinesses()]);
      if (!active) return;
      setReviews(r);
      setRelated(
        all
          .filter((x) => x.id !== b.id && (x.category === b.category || x.city === b.city))
          .slice(0, 3)
      );
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (business === null) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <LoadingState label="Loading business profile…" />
      </section>
    );
  }

  if (business === "missing") {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <EmptyState
          title="Business not found"
          text="This listing doesn't exist or may have been removed. Try browsing all businesses instead."
          action={
            <Button to="/businesses" variant="primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to businesses
            </Button>
          }
        />
      </section>
    );
  }

  const b = business;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.location)}`;

  return (
    <>
      <section className="border-b border-ink-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-8 sm:px-6 lg:px-8">
          <Link
            to="/businesses"
            className="inline-flex items-center gap-1.5 rounded-md text-sm font-bold text-brand-600 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All businesses
          </Link>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4 sm:gap-5">
              <BusinessAvatar business={b} size="lg" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
                    {b.name}
                  </h1>
                  {b.verified && <VerifiedBadge />}
                  {b.phoneVerified && <PhoneVerifiedBadge className="hidden sm:inline-flex" />}
                  {b.communityReported && <CommunityReportedBadge className="hidden sm:inline-flex" />}
                  <SampleDataBadge className="hidden sm:inline-flex" />
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-medium text-ink-500">
                  <Badge variant="outline">{b.category}</Badge>
                  <span className="inline-flex items-center gap-1">
                    <Navigation className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                    {b.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                    On GHH {timeAgo(b.createdAt)}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center gap-2">
                  <Stars rating={b.rating} />
                  <span className="text-sm font-extrabold text-ink-900">{b.rating.toFixed(1)}</span>
                  <span className="text-xs font-medium text-ink-400">
                    ({b.reviewsCount} ratings · sample)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <Button href={telLink(b.phone)} variant="primary">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </Button>
              <Button
                href={waLink(b.whatsapp, `Hello ${b.name}! I found you on Ghana Help Hub.`)}
                variant="gold"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </Button>
              <Button href={mapsUrl} variant="outline">
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Get Directions
              </Button>
              <Button variant="danger-outline" onClick={() => setReportOpen(true)}>
                <Flag className="h-4 w-4" aria-hidden="true" />
                Report Listing
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Main column */}
          <div className="space-y-8">
            <Reveal>
              <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
                <h2 className="font-display text-lg font-bold text-ink-900">About</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{b.description}</p>

                <h3 className="font-display mt-7 flex items-center gap-2 text-base font-bold text-ink-900">
                  <Wrench className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  Services offered
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {b.services.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-[13px] font-semibold text-brand-800 transition-colors hover:bg-brand-100"
                    >
                      {s}
                    </li>
                  ))}
                </ul>

                <h3 className="font-display mt-7 flex items-center gap-2 text-base font-bold text-ink-900">
                  <Clock className="h-4 w-4 text-brand-600" aria-hidden="true" />
                  Opening hours
                </h3>
                <p className="mt-2 inline-flex items-center gap-2 rounded-xl bg-canvas px-4 py-2.5 text-sm font-semibold text-ink-700 ring-1 ring-inset ring-ink-200">
                  {b.hours}
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-lg font-bold text-ink-900">Reviews</h2>
                  <span className="text-xs font-semibold text-ink-400">Sample reviews for demo</span>
                </div>
                <div className="mt-5 flex items-center gap-4 rounded-2xl bg-canvas p-5 ring-1 ring-inset ring-ink-200">
                  <p className="font-display text-4xl font-extrabold text-ink-900">
                    {b.rating.toFixed(1)}
                  </p>
                  <div>
                    <Stars rating={b.rating} />
                    <p className="mt-1 text-xs font-semibold text-ink-500">
                      Based on {b.reviewsCount} sample ratings
                    </p>
                  </div>
                </div>
                <ul className="mt-5 divide-y divide-ink-100">
                  {reviews.map((r) => (
                    <li key={r.id} className="py-5 first:pt-0 last:pb-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-extrabold text-white">
                          {r.author.slice(0, 1)}
                        </span>
                        <span className="text-sm font-bold text-ink-900">{r.author}</span>
                        <Stars rating={r.rating} small />
                        <span className="ml-auto text-xs font-medium text-ink-400">
                          {formatDate(r.date)}
                        </span>
                      </div>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{r.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={120}>
              <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card">
                <div className="kente h-1.5" aria-hidden="true" />
                <div className="p-6">
                  <h2 className="font-display text-base font-bold text-ink-900">Contact</h2>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="font-semibold text-ink-500">Phone</dt>
                      <dd className="font-bold text-ink-900">{b.phone}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="font-semibold text-ink-500">WhatsApp</dt>
                      <dd className="font-bold text-ink-900">{b.whatsapp}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="font-semibold text-ink-500">Area</dt>
                      <dd className="text-right font-bold text-ink-900">{b.location}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 grid gap-2.5">
                    <Button
                      href={waLink(b.whatsapp, `Hello ${b.name}! I found you on Ghana Help Hub.`)}
                      variant="gold"
                      fullWidth
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      Chat on WhatsApp
                    </Button>
                    <Button href={telLink(b.phone)} variant="outline" fullWidth>
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      Call {b.phone}
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="rounded-3xl border border-gold-200 bg-gold-100/50 p-6">
                <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                  <ShieldCheck className="h-4 w-4 text-gold-700" aria-hidden="true" />
                  Stay safe
                </p>
                <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-ink-600">
                  <li>· Agree a clear written quote before work starts.</li>
                  <li>· Meet in public places for exchanges.</li>
                  <li>· A verification badge means the profile is verified — not that we guarantee the work.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <Reveal>
              <h2 className="font-display mb-6 text-xl font-bold text-ink-900">
                Similar businesses nearby
              </h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rb, i) => (
                <Reveal key={rb.id} delay={i * 70}>
                  <BusinessCard business={rb} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>

      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} businessName={b.name} />
    </>
  );
}

function Stars({ rating, small = false }: { rating: number; small?: boolean }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            (small ? "h-3.5 w-3.5" : "h-4 w-4") +
            (i < Math.round(rating) ? " fill-gold-400 text-gold-500" : " text-ink-200")
          }
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function ReportModal({
  open,
  onClose,
  businessName,
}: {
  open: boolean;
  onClose: () => void;
  businessName: string;
}) {
  const [reason, setReason] = useState("Incorrect information");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  const close = () => {
    setSent(false);
    setDetails("");
    onClose();
  };

  return (
    <Modal open={open} onClose={close} title={`Report ${businessName}`} eyebrow="Community safety">
      {sent ? (
        <div className="flex flex-col items-center py-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 ring-1 ring-inset ring-brand-200">
            <CheckCircle2 className="h-7 w-7 text-brand-600" aria-hidden="true" />
          </span>
          <h4 className="font-display mt-4 text-lg font-bold text-ink-900">Report received</h4>
          <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-500">
            Thank you for helping keep Ghana Help Hub trustworthy. Our team will review this
            listing. (Demo — nothing was sent.)
          </p>
          <Button variant="primary" className="mt-5" onClick={close}>
            Done
          </Button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (details.trim().length < 5) return;
            setSent(true);
          }}
          className="space-y-4"
        >
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink-800">Reason</span>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-[15px] font-medium text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
            >
              {["Incorrect information", "Suspicious or scam", "Duplicate listing", "Inappropriate content", "Other"].map(
                (r) => (
                  <option key={r}>{r}</option>
                )
              )}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink-800">Tell us more</span>
            <textarea
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
              minLength={5}
              placeholder="What's wrong with this listing?"
              className="w-full resize-none rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-[15px] font-medium text-ink-900 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <Button type="submit" variant="danger-outline" fullWidth>
            <Flag className="h-4 w-4" aria-hidden="true" />
            Submit report
          </Button>
          <p className="text-center text-xs font-medium text-ink-400">
            Reporting: {reason}
          </p>
        </form>
      )}
    </Modal>
  );
}
