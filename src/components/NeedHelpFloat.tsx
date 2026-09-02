import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  X,
  Send,
  ArrowRight,
  Star,
  CheckCircle2,
  Megaphone,
  MessageCircle,
} from "lucide-react";
import { LogoMark } from "./Logo";
import { BusinessAvatar } from "./BusinessCard";
import RequestCard from "./RequestCard";
import { businesses } from "../data/businesses";
import { createRequest } from "../services/requests";
import type { Business, HelpRequest } from "../types";
import { tokenize, cn } from "../lib/utils";

/* ------------------------------ Types ------------------------------ */

type Chip =
  | { label: string; kind: "text"; value: string }
  | { label: string; kind: "link"; to: string }
  | { label: string; kind: "post" }
  | { label: string; kind: "budget"; value: string }
  | { label: string; kind: "reset" };

interface Message {
  id: number;
  from: "bot" | "user";
  text?: string;
  chips?: Chip[];
  biz?: Business[];
  request?: HelpRequest;
  isTyping?: boolean;
}

type Stage = "need" | "location" | "budget";

interface Ctx {
  need: string;
  category: string;
  location?: string;
}

/* --------------------------- Intent matching --------------------------- */

const OTHER_INTENTS: Array<{
  test: RegExp;
  category: string;
  reply: string;
  chips: Chip[];
}> = [
  {
    test: /\b(job|jobs|work|employ|vacanc|hiring|intern(ship)?s?)\b/i,
    category: "Jobs",
    reply:
      "Got it — work. I can show you openings posted on Ghana Help Hub, or post a request so employers looking for your skills can find you.",
    chips: [
      { label: "Browse jobs", kind: "link", to: "/jobs" },
      { label: "Post a request", kind: "post" },
    ],
  },
  {
    test: /\b(room|house|flat|apartment|rent|hostel|accommodat\w*)\b/i,
    category: "Housing",
    reply:
      "Housing moves fast, so requests work best. Tell agents and landlords what you need — or browse what's already listed.",
    chips: [
      { label: "Browse housing", kind: "link", to: "/find-help?category=housing" },
      { label: "Post a request", kind: "post" },
    ],
  },
  {
    test: /\b(scholarship|grant|training|fellowship|competition|opportunit\w*)\b/i,
    category: "Opportunities",
    reply: "Nice one. There are scholarships, grants, trainings and internships listed right now.",
    chips: [
      { label: "See opportunities", kind: "link", to: "/opportunities" },
      { label: "Post a request", kind: "post" },
    ],
  },
  {
    test: /\b(lost|missing|stolen|found)\b/i,
    category: "Lost & Found",
    reply:
      "Sorry to hear that — the community board is the fastest way to spread the word. You can also post it as a request.",
    chips: [
      { label: "Open Lost & Found", kind: "link", to: "/lost-found" },
      { label: "Post a request", kind: "post" },
    ],
  },
];

const NEED_CHIPS: Chip[] = [
  { label: "I need an electrician", kind: "text", value: "I need an electrician" },
  { label: "I need a job", kind: "text", value: "I need a job" },
  { label: "I need a room near Legon", kind: "text", value: "I need a room near Legon" },
  { label: "I need a photographer", kind: "text", value: "I need a photographer" },
  { label: "I lost something", kind: "text", value: "I lost something" },
];

const SERVICE_CHIPS: Chip[] = [
  { label: "Electrician", kind: "text", value: "I need an electrician" },
  { label: "Plumber", kind: "text", value: "I need a plumber" },
  { label: "Mechanic", kind: "text", value: "I need a mechanic" },
  { label: "Tutor", kind: "text", value: "I need a tutor" },
  { label: "Tailor", kind: "text", value: "I need a tailor" },
  { label: "AC repair", kind: "text", value: "I need someone to repair my AC" },
];

const BUDGET_CHIPS: Chip[] = [
  { label: "Under GH₵300", kind: "budget", value: "Under GH₵300" },
  { label: "GH₵300 – 1,000", kind: "budget", value: "GH₵300 – GH₵1,000" },
  { label: "GH₵1,000 – 5,000", kind: "budget", value: "GH₵1,000 – GH₵5,000" },
  { label: "Flexible", kind: "budget", value: "Flexible" },
];

function matchBusinesses(text: string): Business[] {
  const tokens = tokenize(text);
  if (tokens.length === 0) return [];
  return businesses
    .map((b) => {
      const hay = [b.category, b.name, ...b.keywords, ...b.services].join(" ").toLowerCase();
      const score = tokens.reduce((acc, t) => acc + (hay.includes(t) ? 1 : 0), 0);
      return { b, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, z) => z.score - a.score || z.b.rating - a.b.rating)
    .slice(0, 2)
    .map((x) => x.b);
}

function serviceCategoryFor(matches: Business[]): string {
  return matches.length > 0 ? "Services" : "Something else";
}

/* ------------------------------ Component ------------------------------ */

let nextId = 1;
const uid = () => nextId++;

export default function NeedHelpFloat() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [stage, setStage] = useState<Stage>("need");

  const ctxRef = useRef<Ctx>({ need: "", category: "Services" });
  const stageRef = useRef<Stage>("need");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<number[]>([]);

  /* Keep ref in sync so async callbacks read the latest stage */
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  /* First-visit nudge */
  useEffect(() => {
    const t1 = window.setTimeout(() => setShowTip(true), 1600);
    const t2 = window.setTimeout(() => setShowTip(false), 10000);
    timersRef.current.push(t1, t2);
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  /* Auto-scroll on new content */
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  /* Esc closes + focus input when opened */
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const push = (msg: Omit<Message, "id">) =>
    setMessages((m) => [...m, { id: uid(), ...msg }]);

  const botSay = (msg: Omit<Message, "id" | "from">, delay = 750) => {
    const typingId = uid();
    setMessages((m) => [...m, { id: typingId, from: "bot", isTyping: true }]);
    const t = window.setTimeout(() => {
      setMessages((m) => m.filter((x) => x.id !== typingId).concat({ id: uid(), from: "bot", ...msg }));
    }, delay);
    timersRef.current.push(t);
  };

  const greet = () => {
    setStage("need");
    ctxRef.current = { need: "", category: "Services" };
    botSay(
      {
        text: "Akwaaba! I'm the GHH assistant. Tell me what you need — in your own words — and I'll point you to the right people, listings or opportunities.",
        chips: NEED_CHIPS,
      },
      500
    );
  };

  const openPanel = () => {
    setOpen(true);
    setShowTip(false);
    if (!hasOpened) {
      setHasOpened(true);
      greet();
    }
  };

  const submitRequest = async (budget: string) => {
    const ctx = ctxRef.current;
    botSay({ text: "Posting your request now…" }, 600);
    const created = await createRequest({
      title: `I need ${ctx.need.replace(/^i need\s*/i, "").slice(0, 48) || "help"}`,
      description: ctx.need,
      category: ctx.category,
      location: ctx.location ?? "Ghana",
      budget,
      phone: "+233 · via GHH Assistant (demo)",
    });
    botSay(
      {
        text: "Done! Your request is live on Ghana Help Hub. Providers nearby can now reply to you directly.",
        request: created,
        chips: [
          { label: "Ask another thing", kind: "reset" },
          { label: "View full form", kind: "link", to: "/post-request" },
        ],
      },
      900
    );
    setStage("need");
  };

  const handleNeed = (text: string) => {
    const matches = matchBusinesses(text);
    const other = OTHER_INTENTS.find((i) => i.test.test(text));

    if (matches.length > 0) {
      ctxRef.current = { need: text, category: serviceCategoryFor(matches) };
      botSay({
        text: `Good news — I found ${matches.length} match${matches.length > 1 ? "es" : ""} on Ghana Help Hub for that:`,
        biz: matches,
        chips: [
          { label: "Post a request instead", kind: "post" },
          { label: "See more matches", kind: "link", to: `/businesses?q=${encodeURIComponent(text)}` },
        ],
      });
      return;
    }

    if (other) {
      ctxRef.current = { need: text, category: other.category };
      botSay({ text: other.reply, chips: other.chips });
      return;
    }

    if (/\b(service|services|someone|repair|fix)\b/i.test(text)) {
      ctxRef.current = { need: text, category: "Services" };
      botSay({
        text: "Which kind of service is closest? Pick one and I'll check who's available:",
        chips: SERVICE_CHIPS,
      });
      return;
    }

    ctxRef.current = { need: text, category: "Something else" };
    botSay({
      text: "I can match you with services, jobs, rooms, opportunities — or post it as an open request for the community. What sounds right?",
      chips: [
        { label: "A service", kind: "text", value: "I need a service" },
        { label: "A job", kind: "text", value: "I need a job" },
        { label: "A room", kind: "text", value: "I need a room" },
        { label: "Just post my request", kind: "post" },
      ],
    });
  };

  const handleChip = (chip: Chip) => {
    switch (chip.kind) {
      case "text":
        push({ from: "user", text: chip.label });
        if (stageRef.current === "location") {
          ctxRef.current.location = chip.label;
          setStage("budget");
          botSay({ text: "Noted. Roughly what budget are you working with?", chips: BUDGET_CHIPS });
        } else {
          handleNeed(chip.value);
        }
        break;
      case "budget":
        push({ from: "user", text: chip.label });
        void submitRequest(chip.value);
        break;
      case "post":
        if (!ctxRef.current.need) {
          push({ from: "user", text: chip.label });
          botSay({ text: "Sure — first, what exactly do you need?", chips: NEED_CHIPS });
          return;
        }
        push({ from: "user", text: "Post a request for me" });
        setStage("location");
        botSay({
          text: `On it. Where do you need this? (e.g. “Amasaman” or “near Legon”)`,
        });
        break;
      case "reset":
        push({ from: "user", text: chip.label });
        greet();
        break;
      case "link":
        setOpen(false);
        navigate(chip.to);
        break;
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    push({ from: "user", text });

    if (stageRef.current === "location") {
      ctxRef.current.location = text;
      setStage("budget");
      botSay({ text: "Noted. Roughly what budget are you working with?", chips: BUDGET_CHIPS });
      return;
    }
    if (stageRef.current === "budget") {
      void submitRequest(text);
      return;
    }
    handleNeed(text);
  };

  return (
    <div className="fixed right-4 bottom-24 z-[65] flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {/* Chat panel */}
      {open && (
        <section
          role="dialog"
          aria-label="Ghana Help Hub assistant"
          className="animate-pop flex h-[min(34rem,72dvh)] w-[min(23.5rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl bg-canvas shadow-lift ring-1 ring-ink-900/10"
        >
          {/* Header */}
          <div className="relative bg-brand-700 px-5 pt-4 pb-4 text-white">
            <div className="dark-grid absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative flex items-center gap-3">
              <span className="relative">
                <LogoMark className="h-10 w-10 rounded-xl ring-2 ring-gold-400/70" />
                <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-brand-700 bg-gold-400" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-extrabold tracking-tight">GHH Assistant</p>
                <p className="text-[11px] font-semibold text-brand-100">
                  Demo assistant · replies instantly
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="rounded-lg p-1.5 text-brand-100 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <span className="kente absolute inset-x-0 bottom-0 h-1" aria-hidden="true" />
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m) =>
              m.isTyping ? (
                <div key={m.id} className="flex items-end gap-2">
                  <LogoMark className="h-7 w-7 rounded-lg" />
                  <span className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-ink-100 bg-white px-3.5 py-3 shadow-sm">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="animate-typing-dot h-1.5 w-1.5 rounded-full bg-brand-500"
                        style={{ animationDelay: `${d * 0.15}s` }}
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                </div>
              ) : m.from === "bot" ? (
                <div key={m.id} className="flex items-end gap-2">
                  <LogoMark className="h-7 w-7 shrink-0 rounded-lg" />
                  <div className="max-w-[85%] space-y-2.5">
                    {m.text && (
                      <p className="rounded-2xl rounded-bl-md border border-ink-100 bg-white px-3.5 py-2.5 text-[13px] leading-relaxed font-medium text-ink-700 shadow-sm">
                        {m.text}
                      </p>
                    )}
                    {m.biz?.map((b) => (
                      <Link
                        key={b.id}
                        to={`/businesses/${b.id}`}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 rounded-2xl rounded-bl-md border border-brand-200 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      >
                        <BusinessAvatar business={b} />
                        <span className="min-w-0 flex-1">
                          <span className="font-display flex items-center gap-1.5 text-[13px] font-bold text-ink-900">
                            <span className="truncate">{b.name}</span>
                            {b.verified && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden="true" />}
                          </span>
                          <span className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-ink-500">
                            <Star className="h-3 w-3 fill-gold-400 text-gold-500" aria-hidden="true" />
                            {b.rating.toFixed(1)} · {b.category}
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    ))}
                    {m.request && <RequestCard request={m.request} featured />}
                    {m.chips && (
                      <span className="flex flex-wrap gap-1.5 pt-0.5">
                        {m.chips.map((chip) =>
                          chip.kind === "link" ? (
                            <Link
                              key={chip.label}
                              to={chip.to}
                              onClick={() => setOpen(false)}
                              className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition-all hover:-translate-y-0.5 hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                            >
                              {chip.label}
                              <ArrowRight className="h-3 w-3" aria-hidden="true" />
                            </Link>
                          ) : (
                            <button
                              key={chip.label}
                              type="button"
                              onClick={() => handleChip(chip)}
                              className={cn(
                                "rounded-full px-3 py-1.5 text-xs font-bold transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                                chip.kind === "post"
                                  ? "bg-gold-400 text-ink-900 shadow-sm hover:bg-gold-300"
                                  : "border border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100"
                              )}
                            >
                              {chip.label}
                            </button>
                          )
                        )}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-600 px-3.5 py-2.5 text-[13px] leading-relaxed font-medium text-white shadow-sm">
                    {m.text}
                  </p>
                </div>
              )
            )}
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="border-t border-ink-100 bg-white p-3">
            <div className="flex items-center gap-2 rounded-2xl border border-ink-200 bg-canvas py-1 pr-1 pl-3.5 transition-all focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
              <Megaphone className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Try "I need a plumber in Tema"'
                aria-label="Tell the assistant what you need"
                className="min-w-0 flex-1 bg-transparent py-2 text-[13px] font-medium text-ink-900 outline-none placeholder:text-ink-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition-all hover:bg-brand-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 flex items-center justify-center gap-1 text-center text-[10px] font-semibold text-ink-400">
              <MessageCircle className="h-3 w-3" aria-hidden="true" />
              Demo assistant — requests are not sent anywhere yet.
            </p>
          </form>
        </section>
      )}

      {/* First-visit tooltip */}
      {showTip && !open && !hasOpened && (
        <div className="animate-tip relative mr-1 mb-1 hidden max-w-[210px] rounded-2xl bg-ink-900 px-4 py-3 text-xs leading-relaxed font-semibold text-white shadow-lift sm:block">
          Whatever you need — just ask.
          <span className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 bg-ink-900" aria-hidden="true" />
        </div>
      )}

      {/* Floating action button */}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-label={open ? "Close the GHH assistant" : "Open the GHH assistant — tell us what you need"}
        aria-expanded={open}
        className={cn(
          "animate-pulse-ring relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-lift transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
          open ? "bg-ink-900 text-white" : "bg-brand-600 text-white"
        )}
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Sparkles className="h-6 w-6 text-gold-400" aria-hidden="true" />
        )}
        {!open && !hasOpened && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75 motion-reduce:animate-none" aria-hidden="true" />
            <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-canvas bg-gold-400 text-[9px] font-extrabold text-ink-900">
              1
            </span>
          </span>
        )}
      </button>
    </div>
  );
}
