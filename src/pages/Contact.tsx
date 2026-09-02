import { useState } from "react";
import type { FormEvent } from "react";
import {
  MessageCircle,
  Mail,
  MapPin,
  CheckCircle2,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { cn } from "../lib/utils";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-[15px] font-medium text-ink-900 transition-all placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const socials = [
  { label: "Facebook", icon: Facebook },
  { label: "Instagram", icon: Instagram },
  { label: "Twitter", icon: Twitter },
  { label: "YouTube", icon: Youtube },
];

export default function Contact() {
  usePageMeta(
    "Contact | Ghana Help Hub",
    "Have a question for Ghana Help Hub? Send us a message — we'd love to hear from you."
  );

  const [form, setForm] = useState<ContactForm>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (key: keyof ContactForm, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof ContactForm, string>> = {};
    if (form.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) next.message = "Tell us a little more (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setSent(true);
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-100 bg-white">
        <div className="hero-grid absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
            <span className="kente inline-block h-1 w-8 rounded-full" aria-hidden="true" />
            Contact
          </p>
          <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink-900 text-balance sm:text-4xl">
            Have a question?
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-500">
            Whether you need help with a request, want to list a business, or just want to say
            hello — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            {sent ? (
              <div className="animate-pop flex h-full flex-col items-center justify-center rounded-3xl border border-brand-200 bg-white p-10 text-center shadow-card">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 ring-1 ring-inset ring-brand-200">
                  <CheckCircle2 className="h-8 w-8 text-brand-600" aria-hidden="true" />
                </span>
                <h2 className="font-display mt-5 text-2xl font-extrabold text-ink-900">
                  Message received. Medaase!
                </h2>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-500">
                  Thanks, {form.name.trim().split(" ")[0]}. We'll get back to you at{" "}
                  <span className="font-semibold text-ink-700">{form.email.trim()}</span> as soon
                  as we can. (Demo — nothing was actually sent.)
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", phone: "", message: "" });
                  }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8"
              >
                <h2 className="font-display text-lg font-bold text-ink-900">Send us a message</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-ink-800">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. Ama Mensah"
                      className={cn(inputClass, errors.name && "border-red-300 focus:ring-red-100")}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-ink-800">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@example.com"
                      className={cn(inputClass, errors.email && "border-red-300 focus:ring-red-100")}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-bold text-ink-800">
                      Phone <span className="text-xs font-semibold text-ink-400">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+233 24 123 4567"
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-1.5 block text-sm font-bold text-ink-800">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="How can we help?"
                      className={cn(inputClass, "resize-none", errors.message && "border-red-300 focus:ring-red-100")}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs font-semibold text-red-600">{errors.message}</p>
                    )}
                  </div>
                </div>
                <Button type="submit" variant="primary" size="lg" fullWidth disabled={sending} className="mt-6">
                  {sending ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Send message
                    </>
                  )}
                </Button>
                <p className="mt-3 text-center text-xs font-medium text-ink-400">
                  Demo form — nothing is sent to a server yet.
                </p>
              </form>
            )}
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={80}>
              <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
                <h2 className="font-display text-base font-bold text-ink-900">Reach us directly</h2>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-inset ring-brand-100">
                      <MessageCircle className="h-4.5 w-4.5 text-brand-600" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-ink-900">WhatsApp</span>
                      <span className="block text-[13px] text-ink-500">
                        +233 XX XXX XXXX — being configured
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-inset ring-brand-100">
                      <Mail className="h-4.5 w-4.5 text-brand-600" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-ink-900">Email</span>
                      <a
                        href="mailto:hello@example.com"
                        className="text-[13px] font-semibold text-brand-700 transition-colors hover:text-brand-900"
                      >
                        hello@example.com
                      </a>
                      <span className="block text-[12px] text-ink-400">Placeholder until configured</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 ring-1 ring-inset ring-brand-100">
                      <MapPin className="h-4.5 w-4.5 text-brand-600" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-ink-900">Based in</span>
                      <span className="block text-[13px] text-ink-500">Accra, Ghana 🇬🇭</span>
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card">
                <h2 className="font-display text-base font-bold text-ink-900">Follow along</h2>
                <p className="mt-1.5 text-[13px] text-ink-500">
                  Social channels are coming soon.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  {socials.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      type="button"
                      title={`${label} — coming soon`}
                      aria-label={`${label} (coming soon)`}
                      className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-xl bg-ink-100 text-ink-400 transition-colors"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="rounded-3xl border border-gold-200 bg-gold-100/50 p-6">
                <p className="text-sm font-bold text-ink-900">Faster route for needs</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">
                  If you need a service, job or opportunity right now, posting a request is the
                  quickest way to get matched.
                </p>
                <Button to="/post-request" variant="gold" size="sm" className="mt-4">
                  I Need Something
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
