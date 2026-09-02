import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Flag, PackageSearch, CheckCircle2, MapPin } from "lucide-react";
import LostFoundCard from "../components/LostFoundCard";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import { getLostFoundItems } from "../services/lostFound";
import type { LostFoundItem, LostFoundStatus, LostFoundType } from "../types";
import { sleep } from "../lib/utils";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../lib/utils";

const typeTabs: Array<{ id: "all" | LostFoundStatus; label: string }> = [
  { id: "all", label: "All" },
  { id: "lost", label: "Lost" },
  { id: "found", label: "Found" },
  { id: "resolved", label: "Resolved" },
];

const itemCategories = ["Electronics", "Keys & Documents", "Bags", "Clothing", "Pets", "Other"];

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-[15px] font-medium text-ink-900 transition-all placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function LostFound() {
  usePageMeta(
    "Lost & Found Ghana | Ghana Help Hub",
    "Report lost items or things you've found, and help reunite Ghanaians with their belongings."
  );

  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState<LostFoundItem[] | null>(null);
  const [status, setStatus] = useState<"all" | LostFoundStatus>("all");
  const [category, setCategory] = useState("all");
  const [city, setCity] = useState("all");
  const [reportType, setReportType] = useState<LostFoundType>("lost");
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    let active = true;
    getLostFoundItems().then((l) => active && setItems(l));
    return () => {
      active = false;
    };
  }, []);

  // Home page links here with ?report=lost|found
  useEffect(() => {
    const r = params.get("report");
    if (r === "lost" || r === "found") {
      setReportType(r);
      setReportOpen(true);
      params.delete("report");
      setParams(params, { replace: true });
    }
  }, [params, setParams]);

  const cities = useMemo(
    () => Array.from(new Set((items ?? []).map((i) => i.city))).sort(),
    [items]
  );

  const filtered = useMemo(() => {
    if (!items) return null;
    return items.filter((i) => {
      if (status !== "all" && i.status !== status) return false;
      if (category !== "all" && i.category !== category) return false;
      if (city !== "all" && i.city !== city) return false;
      return true;
    });
  }, [items, status, category, city]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
            <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
            Community board
          </p>
          <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
            Lost &amp; Found Ghana
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-500">
            Lost something? Found something? Help reunite people with their belongings.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              variant="primary"
              onClick={() => {
                setReportType("lost");
                setReportOpen(true);
              }}
            >
              <Flag className="h-4 w-4" aria-hidden="true" />
              Report Lost
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setReportType("found");
                setReportOpen(true);
              }}
            >
              <PackageSearch className="h-4 w-4" aria-hidden="true" />
              Report Found
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-ink-100 bg-white p-4 shadow-card sm:p-5">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" aria-label="Status filter">
            {typeTabs.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={status === t.id}
                onClick={() => setStatus(t.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-[13px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  status === t.id
                    ? t.id === "lost"
                      ? "bg-red-600 text-white shadow-sm"
                      : t.id === "found"
                        ? "bg-brand-600 text-white shadow-sm"
                        : "bg-ink-900 text-white shadow-sm"
                    : "border border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-ink-500">Item category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm font-semibold text-ink-700 hover:border-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <option value="all">All categories</option>
                {itemCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1 text-xs font-bold text-ink-500">
                <MapPin className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
                Location
              </span>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-11 w-full rounded-xl border border-ink-200 bg-white px-3 text-sm font-semibold text-ink-700 hover:border-brand-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <option value="all">All locations</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8">
          {!filtered ? (
            <LoadingState cards={6} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={PackageSearch}
              title="Nothing here yet"
              text="No items match these filters right now. If you've lost or found something, be the first to report it."
              action={
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => {
                    setReportType("lost");
                    setReportOpen(true);
                  }}
                >
                  <Flag className="h-4 w-4" aria-hidden="true" />
                  Report an item
                </Button>
              }
            />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <Reveal key={item.id} delay={Math.min(i % 6, 5) * 60}>
                  <LostFoundCard
                    item={item}
                    onReport={() => {
                      setReportType(item.type);
                      setReportOpen(true);
                    }}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-display text-lg font-bold text-ink-900">Safety tips</h2>
            <ul className="mt-3 grid gap-3 text-sm leading-relaxed text-ink-600 sm:grid-cols-3">
              <li className="rounded-xl bg-canvas p-4 ring-1 ring-inset ring-ink-200">
                Always meet in a public, populated place — a police station is even better.
              </li>
              <li className="rounded-xl bg-canvas p-4 ring-1 ring-inset ring-ink-200">
                Ask the claimant to describe a detail only the owner would know.
              </li>
              <li className="rounded-xl bg-canvas p-4 ring-1 ring-inset ring-ink-200">
                Never pay a "release fee" to get your own item back. Report suspicious requests.
              </li>
            </ul>
          </div>
        </Reveal>
      </section>

      <ReportModal type={reportType} onTypeChange={setReportType} open={reportOpen} onClose={() => setReportOpen(false)} />
    </>
  );
}

function ReportModal({
  type,
  onTypeChange,
  open,
  onClose,
}: {
  type: LostFoundType;
  onTypeChange: (t: LostFoundType) => void;
  open: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(itemCategories[0]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const reset = () => {
    setTitle("");
    setLocation("");
    setDescription("");
    setContact("");
    setErrors({});
    setSent(false);
  };

  const close = () => {
    reset();
    onClose();
  };

  const submit = async () => {
    const next: Record<string, string> = {};
    if (title.trim().length < 3) next.title = "Name the item, e.g. “Samsung Galaxy A34”.";
    if (location.trim().length < 2) next.location = "Where was it lost or found?";
    if (description.trim().length < 8) next.description = "Add a short description.";
    if (contact.replace(/\D/g, "").length < 9) next.contact = "Add a valid phone or WhatsApp number.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSending(true);
    await sleep(600);
    setSending(false);
    setSent(true);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      eyebrow="Community board"
      title={type === "lost" ? "Report a lost item" : "Report a found item"}
    >
      {sent ? (
        <div className="flex flex-col items-center py-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 ring-1 ring-inset ring-brand-200">
            <CheckCircle2 className="h-7 w-7 text-brand-600" aria-hidden="true" />
          </span>
          <h4 className="font-display mt-4 text-lg font-bold text-ink-900">Report posted</h4>
          <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-500">
            Your {type} report is on the board. We'll notify you when someone responds. (Demo —
            nothing was sent.)
          </p>
          <Button variant="primary" className="mt-5" onClick={close}>
            Done
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Report type">
            {(["lost", "found"] as LostFoundType[]).map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={type === t}
                onClick={() => onTypeChange(t)}
                className={cn(
                  "rounded-xl border px-4 py-2.5 text-sm font-bold capitalize transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  type === t
                    ? t === "lost"
                      ? "border-red-300 bg-red-50 text-red-700"
                      : "border-brand-300 bg-brand-50 text-brand-700"
                    : "border-ink-200 bg-white text-ink-600 hover:border-ink-300"
                )}
              >
                I {t === "lost" ? "lost" : "found"} something
              </button>
            ))}
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink-800">Item</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={type === "lost" ? "e.g. Black HP laptop bag" : "e.g. Car keys with red holder"}
              className={inputClass}
            />
            {errors.title && <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.title}</p>}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-ink-800">Category</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                {itemCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-ink-800">Location</span>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Osu, Accra"
                className={inputClass}
              />
              {errors.location && <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.location}</p>}
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink-800">Description</span>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Distinguishing details, when it happened, landmarks…"
              className={cn(inputClass, "resize-none")}
            />
            {errors.description && (
              <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.description}</p>
            )}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-ink-800">Phone / WhatsApp</span>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="+233 24 123 4567"
              className={inputClass}
            />
            {errors.contact && <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.contact}</p>}
          </label>

          <Button variant={type === "lost" ? "primary" : "gold"} fullWidth onClick={submit} disabled={sending}>
            {sending ? "Posting…" : type === "lost" ? "Post lost report" : "Post found report"}
          </Button>
          <p className="text-center text-xs font-medium text-ink-400">Demo — nothing is sent to a server.</p>
        </div>
      )}
    </Modal>
  );
}
