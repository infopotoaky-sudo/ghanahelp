import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Eye, EyeOff, Megaphone, Sparkles } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";
import { useAuth } from "../hooks/useAuth";
import { cn } from "../lib/utils";

interface AuthModalProps {
  open: boolean;
  initialMode: "signin" | "signup";
  onClose: () => void;
}

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-[15px] font-medium text-ink-900 transition-all placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function AuthModal({ open, initialMode, onClose }: AuthModalProps) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setErrors({});
      setDone(null);
      setSubmitting(false);
      setShowPw(false);
    }
  }, [open, initialMode]);

  const switchMode = (m: "signin" | "signup") => {
    setMode(m);
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === "signup" && name.trim().length < 2) e.name = "Please enter your name.";
    const c = contact.trim();
    if (!c) e.contact = "Enter your phone or email.";
    else if (!c.includes("@") && c.replace(/\D/g, "").length < 9)
      e.contact = "Enter a valid phone (e.g. 024 123 4567) or email.";
    if (password.length < 6) e.password = "Use at least 6 characters.";
    if (mode === "signup" && !consent) e.consent = "Please tick the box to continue.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      const display =
        mode === "signup"
          ? name.trim().split(/\s+/)[0]
          : `Member ···${contact.trim().replace(/\D/g, "").slice(-4) || "GHH"}`;
      login({ name: display, contact: contact.trim() });
      setSubmitting(false);
      setDone(display);
    }, 900);
  };

  const title = done
    ? "You're in!"
    : mode === "signin"
      ? "Welcome back"
      : "Create your free account";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      eyebrow={done ? "Demo session" : "Ghana Help Hub"}
    >
      {done ? (
        <div className="flex flex-col items-center py-4 text-center">
          <span className="animate-pop flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 ring-1 ring-inset ring-brand-200">
            <CheckCircle2 className="h-8 w-8 text-brand-600" aria-hidden="true" />
          </span>
          <h4 className="font-display mt-4 text-xl font-extrabold text-ink-900">
            Akwaaba, {done}!
          </h4>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-500">
            Your demo session is saved on this device only — no real account was created and
            nothing left your browser.
          </p>
          <div className="mt-6 grid w-full gap-2.5">
            <Button
              variant="gold"
              onClick={() => {
                onClose();
                navigate("/post-request");
              }}
            >
              <Megaphone className="h-4 w-4" aria-hidden="true" />
              Post your first request
            </Button>
            <Button variant="outline" onClick={onClose}>
              Keep exploring
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {/* Tabs */}
          <div
            className="relative mb-5 grid grid-cols-2 rounded-xl bg-canvas p-1 ring-1 ring-inset ring-ink-200"
            role="tablist"
            aria-label="Authentication mode"
          >
            <span
              className={cn(
                "absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-lg bg-white shadow-sm transition-transform duration-300 ease-out",
                mode === "signup" && "translate-x-[calc(100%+4px)]"
              )}
              aria-hidden="true"
            />
            <button
              type="button"
              role="tab"
              aria-selected={mode === "signin"}
              onClick={() => switchMode("signin")}
              className={cn(
                "relative z-10 rounded-lg py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                mode === "signin" ? "text-brand-700" : "text-ink-500 hover:text-ink-800"
              )}
            >
              Log in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "signup"}
              onClick={() => switchMode("signup")}
              className={cn(
                "relative z-10 rounded-lg py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                mode === "signup" ? "text-brand-700" : "text-ink-500 hover:text-ink-800"
              )}
            >
              Sign up free
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-3.5" noValidate>
            {mode === "signup" && (
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-ink-800">Full name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ama Serwaa"
                  className={cn(inputClass, errors.name && "border-red-400 ring-2 ring-red-100")}
                />
                {errors.name && (
                  <span className="mt-1 block text-xs font-semibold text-red-600">{errors.name}</span>
                )}
              </label>
            )}

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-ink-800">Phone or email</span>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="024 123 4567 or you@example.com"
                className={cn(inputClass, errors.contact && "border-red-400 ring-2 ring-red-100")}
              />
              {errors.contact && (
                <span className="mt-1 block text-xs font-semibold text-red-600">{errors.contact}</span>
              )}
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-ink-800">Password</span>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className={cn(inputClass, "pr-11", errors.password && "border-red-400 ring-2 ring-red-100")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-ink-400 transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  {showPw ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="mt-1 block text-xs font-semibold text-red-600">{errors.password}</span>
              )}
            </label>

            {mode === "signup" && (
              <label className="flex items-start gap-2.5 rounded-xl bg-canvas p-3 ring-1 ring-inset ring-ink-200">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-brand-600"
                />
                <span className="text-xs leading-relaxed font-medium text-ink-600">
                  I agree that Ghana Help Hub may use this information to connect me with
                  relevant help. (Demo terms.)
                </span>
              </label>
            )}
            {mode === "signup" && errors.consent && (
              <p className="-mt-1 text-xs font-semibold text-red-600">{errors.consent}</p>
            )}

            <Button type="submit" variant="primary" fullWidth size="lg" disabled={submitting}>
              {submitting ? (
                "One moment…"
              ) : mode === "signin" ? (
                "Log in"
              ) : (
                <>
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Create free account
                </>
              )}
            </Button>

            <p className="rounded-xl border border-gold-200 bg-gold-100/60 px-3.5 py-2.5 text-center text-xs leading-relaxed font-semibold text-ink-700">
              Demo only — no real account is created and nothing leaves your browser.
            </p>
          </form>
        </div>
      )}
    </Modal>
  );
}
