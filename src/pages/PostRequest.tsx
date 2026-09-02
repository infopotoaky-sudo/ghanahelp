import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  Megaphone,
  CheckCircle2,
  Upload,
  X,
  PenLine,
  Compass,
  HeartHandshake,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";
import Button from "../components/Button";
import RequestCard from "../components/RequestCard";
import Reveal from "../components/Reveal";
import { createRequest } from "../services/requests";
import { requestCategories, sampleRequests } from "../data/requests";
import type { HelpRequest, NewHelpRequest } from "../types";
import { useSearchParams } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn, formatGHS } from "../lib/utils";

interface FormState {
  title: string;
  category: string;
  location: string;
  budget: string;
  description: string;
  phone: string;
  consent: boolean;
}

const blankForm: FormState = {
  title: "",
  category: "",
  location: "",
  budget: "",
  description: "",
  phone: "",
  consent: false,
};

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-[15px] font-medium text-ink-900 transition-all placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function PostRequest() {
  usePageMeta(
    "Post a Request | Ghana Help Hub",
    "Tell Ghana Help Hub what you need — a service, a job, a room, an opportunity — and get connected."
  );

  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormState>(() => {
    const prefill = searchParams.get("title");
    return prefill ? { ...blankForm, title: prefill.slice(0, 80) } : blankForm;
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [imageName, setImageName] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<HelpRequest | null>(null);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  useEffect(() => {
    if (submitted) topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [submitted]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onFile = (file: File | null) => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    if (!file) {
      setImageName(null);
      setImagePreview(null);
      return;
    }
    setImageName(file.name);
    setImagePreview(URL.createObjectURL(file));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.title.trim().length < 4) next.title = "Tell us what you need in a short sentence.";
    if (!form.category) next.category = "Pick the closest category.";
    if (form.location.trim().length < 2) next.location = "Add your area or city.";
    if (form.description.trim().length < 12)
      next.description = "A little more detail helps us match you faster (12+ characters).";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 9) next.phone = "Enter a valid WhatsApp number, e.g. +233 24 123 4567.";
    if (!form.consent) next.consent = "Please agree so we can use your request to connect you.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const payload: NewHelpRequest = {
      title: form.title.trim(),
      category: form.category,
      location: form.location.trim(),
      budget: form.budget.trim() || "Flexible",
      description: form.description.trim(),
      phone: form.phone.trim(),
      imageNote: imageName ?? undefined,
    };
    const created = await createRequest(payload);
    setSubmitting(false);
    setSubmitted(created);
  };

  const reset = () => {
    setForm(blankForm);
    setErrors({});
    setImageName(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setSubmitted(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const copyId = async () => {
    if (!submitted) return;
    try {
      await navigator.clipboard.writeText(submitted.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
            <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
            I need something
          </p>
          <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
            What do you need?
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-500">
            Tell us what you're looking for and we'll help you find the right person or
            solution.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {submitted ? (
          /* ------------------------------ SUCCESS ------------------------------ */
          <div className="animate-pop mx-auto max-w-2xl">
            <div className="overflow-hidden rounded-3xl border border-brand-200 bg-white shadow-card">
              <div className="kente h-1.5 w-full" aria-hidden="true" />
              <div className="p-6 sm:p-10">
                <div className="flex flex-col items-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 ring-1 ring-inset ring-brand-200">
                    <CheckCircle2 className="h-8 w-8 text-brand-600" aria-hidden="true" />
                  </span>
                  <h2 className="font-display mt-5 text-2xl font-extrabold text-ink-900">
                    Your request has been received.
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                    Someone from Ghana Help Hub can follow up with you. Keep your request ID
                    handy — you'll use it in any conversation about this request.
                  </p>

                  <div className="mt-6 flex items-center gap-3 rounded-2xl border border-gold-200 bg-gold-100/60 px-5 py-3.5">
                    <span className="text-xs font-bold tracking-wide text-gold-700 uppercase">
                      Request ID
                    </span>
                    <span className="font-display text-xl font-extrabold tracking-wide text-ink-900">
                      {submitted.id}
                    </span>
                    <button
                      type="button"
                      onClick={copyId}
                      aria-label="Copy request ID"
                      className="rounded-lg p-1.5 text-gold-700 transition-colors hover:bg-gold-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Copy className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  <p className="mt-3 text-xs font-medium text-ink-400">
                    Demo only — nothing was sent to a server.
                  </p>
                </div>

                <div className="mt-8">
                  <p className="mb-2 text-xs font-bold tracking-wide text-ink-400 uppercase">
                    Your request preview
                  </p>
                  <RequestCard request={submitted} featured />
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button onClick={reset} variant="gold" size="lg">
                    <Megaphone className="h-5 w-5" aria-hidden="true" />
                    Post another request
                  </Button>
                  <Button to="/find-help" variant="outline" size="lg">
                    <Compass className="h-5 w-5" aria-hidden="true" />
                    Explore help while you wait
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ------------------------------- FORM ------------------------------- */
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <form
                onSubmit={onSubmit}
                noValidate
                className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="need" className="mb-1.5 block text-sm font-bold text-ink-800">
                      What do you need? <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="need"
                      type="text"
                      value={form.title}
                      onChange={(e) => set("title", e.target.value)}
                      placeholder="e.g. I need an electrician for my shop"
                      className={cn(inputClass, errors.title && "border-red-300 focus:ring-red-100")}
                      aria-invalid={!!errors.title}
                    />
                    {errors.title && <FieldError text={errors.title} />}
                  </div>

                  <div>
                    <label htmlFor="category" className="mb-1.5 block text-sm font-bold text-ink-800">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      value={form.category}
                      onChange={(e) => set("category", e.target.value)}
                      className={cn(inputClass, !form.category && "text-ink-400", errors.category && "border-red-300")}
                      aria-invalid={!!errors.category}
                    >
                      <option value="" disabled>
                        Choose a category
                      </option>
                      {requestCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {errors.category && <FieldError text={errors.category} />}
                  </div>

                  <div>
                    <label htmlFor="location" className="mb-1.5 block text-sm font-bold text-ink-800">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={form.location}
                      onChange={(e) => set("location", e.target.value)}
                      placeholder="e.g. Amasaman, Greater Accra"
                      className={cn(inputClass, errors.location && "border-red-300 focus:ring-red-100")}
                      aria-invalid={!!errors.location}
                    />
                    {errors.location && <FieldError text={errors.location} />}
                  </div>

                  <div>
                    <label htmlFor="budget" className="mb-1.5 block text-sm font-bold text-ink-800">
                      Budget <span className="text-xs font-semibold text-ink-400">(optional)</span>
                    </label>
                    <input
                      id="budget"
                      type="text"
                      inputMode="numeric"
                      value={form.budget}
                      onChange={(e) => set("budget", e.target.value)}
                      placeholder="e.g. 300"
                      className={inputClass}
                    />
                    <p className="mt-1 text-xs font-medium text-ink-400">
                      {form.budget.trim() ? `≈ ${formatGHS(Number(form.budget.replace(/[^\d]/g, "")) || 0)}` : "We'll show it as GH₵ to helpers."}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-bold text-ink-800">
                      WhatsApp number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+233 24 123 4567"
                      className={cn(inputClass, errors.phone && "border-red-300 focus:ring-red-100")}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && <FieldError text={errors.phone} />}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="description" className="mb-1.5 block text-sm font-bold text-ink-800">
                      Describe what you need <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      value={form.description}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="The more detail you give — timing, size of the job, your budget — the faster we can match you."
                      className={cn(inputClass, "resize-none", errors.description && "border-red-300 focus:ring-red-100")}
                      aria-invalid={!!errors.description}
                    />
                    {errors.description && <FieldError text={errors.description} />}
                  </div>

                  <div className="sm:col-span-2">
                    <span className="mb-1.5 block text-sm font-bold text-ink-800">
                      Add a photo <span className="text-xs font-semibold text-ink-400">(optional)</span>
                    </span>
                    <input
                      ref={fileRef}
                      id="image"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                    />
                    {imageName ? (
                      <div className="flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 p-3">
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="Selected attachment preview"
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        )}
                        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-brand-800">
                          {imageName}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            onFile(null);
                            if (fileRef.current) fileRef.current.value = "";
                          }}
                          aria-label="Remove image"
                          className="rounded-lg p-1.5 text-brand-700 transition-colors hover:bg-brand-100"
                        >
                          <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="image"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-ink-300 bg-canvas px-4 py-5 text-sm font-semibold text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-700"
                      >
                        <Upload className="h-4 w-4" aria-hidden="true" />
                        Upload an image (e.g. the broken part, the item you lost)
                      </label>
                    )}
                    <p className="mt-1 text-xs font-medium text-ink-400">
                      Stays on your device in this demo — nothing is uploaded.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-ink-100 pt-5">
                  <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-600">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      className="mt-0.5 h-5 w-5 shrink-0 rounded border-ink-300 accent-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      aria-invalid={!!errors.consent}
                    />
                    <span>
                      I agree that Ghana Help Hub may use this information to help connect me
                      with relevant providers.
                    </span>
                  </label>
                  {errors.consent && <FieldError text={errors.consent} />}
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  fullWidth
                  disabled={submitting}
                  className="mt-6"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-900/30 border-t-ink-900" aria-hidden="true" />
                      Posting your request…
                    </>
                  ) : (
                    <>
                      <Megaphone className="h-5 w-5" aria-hidden="true" />
                      Post My Request
                    </>
                  )}
                </Button>
                <p className="mt-3 text-center text-xs font-medium text-ink-400">
                  Free to post · Demo form — nothing is sent to a server yet.
                </p>
              </form>
            </Reveal>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Reveal delay={100}>
                <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
                  <h2 className="font-display text-base font-bold text-ink-900">
                    What happens next?
                  </h2>
                  <ol className="mt-4 space-y-4">
                    {[
                      { icon: PenLine, title: "We review your request", text: "Usually within a few hours on weekdays." },
                      { icon: Compass, title: "We match you", text: "Relevant providers, listings or opportunities are shortlisted." },
                      { icon: HeartHandshake, title: "You connect directly", text: "Chat on WhatsApp or call — you decide who to work with." },
                    ].map(({ icon: Icon, title, text }, i) => (
                      <li key={title} className="flex gap-3">
                        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-inset ring-brand-100">
                          <Icon className="h-4 w-4 text-brand-600" aria-hidden="true" />
                          <span className="font-display absolute -top-1.5 -right-1.5 rounded-full bg-gold-400 px-1.5 text-[10px] font-extrabold text-ink-900">
                            {i + 1}
                          </span>
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-ink-800">{title}</span>
                          <span className="block text-[13px] leading-relaxed text-ink-500">{text}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div>
                  <p className="mb-2 text-xs font-bold tracking-wide text-ink-400 uppercase">
                    Example request
                  </p>
                  <RequestCard request={sampleRequests[0]} featured />
                </div>
              </Reveal>

              <Reveal delay={240}>
                <div className="rounded-3xl border border-brand-200 bg-brand-50 p-6">
                  <p className="flex items-center gap-2 text-sm font-bold text-brand-800">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Prefer to talk it through?
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-brand-700/90">
                    Not sure how to describe what you need? Send us a message and we'll help
                    you write it.
                  </p>
                  <Button to="/contact" variant="primary" size="sm" className="mt-4">
                    Contact Ghana Help Hub
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function FieldError({ text }: { text: string }) {
  return (
    <p role="alert" className="mt-1.5 text-xs font-semibold text-red-600">
      {text}
    </p>
  );
}
