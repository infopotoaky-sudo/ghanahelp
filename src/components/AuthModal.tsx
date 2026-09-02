import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Loader2, LogIn, UserPlus, ShieldCheck } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";
import { LogoMark } from "./Logo";
import { useAuth } from "../hooks/useAuth";
import { cn } from "../lib/utils";

type Mode = "signin" | "signup";

interface AuthModalProps {
  open: boolean;
  initialMode: Mode;
  onClose: () => void;
}

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-[15px] font-medium text-ink-900 transition-all placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

const isValidContact = (v: string) =>
  /^\S+@\S+\.\S+$/.test(v) || /^\+?\d[\d\s-]{8,}$/.test(v);

export default function AuthModal({ open, initialMode, onClose }: AuthModalProps) {
  const { login } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setErrors({});
      setBusy(false);
      setDone(null);
    }
  }, [open, initialMode]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setErrors({});
    setDone(null);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (mode === "signup" && name.trim().length < 2) next.name = "Please enter your name.";
    if (!isValidContact(contact.trim()))
      next.contact = "Enter a valid email or Ghana phone number (e.g. +233 24 000 0000).";
    if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setBusy(true);
    window.setTimeout(() => {
      const displayName =
        mode === "signup"
          ? name.trim()
          : contact
              .trim()
              .split("@")[0]
              .replace(/[._-]+/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());
      login({
        name: displayName || "Friend",
        firstName: (displayName || "Friend").split(" ")[0],
        contact: contact.trim(),
        joinedAt: new Date().toISOString(),
      });
      setBusy(false);
      setDone(displayName || "Friend");
    }, 900);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={done ? "You're in!" : mode === "signin" ? "Welcome back" : "Create your account"}
      eyebrow="Ghana Help Hub"
    >
      {done ? (
        <div className="flex flex-col items-center py-4 text-center">
          <span className="relative">
            <LogoMark className="h-14 w-14 rounded-2xl" />
            <span className="absolute -right-1.5 -bottom-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 ring-2 ring-canvas">
              <CheckCircle2 className="h-4 w-4 text-white" aria-hidden="true" />
            </span>
          </span>
          <h4 className="font-display mt-4 text-xl font-bold text-ink-900">Akwaaba, {done}!</h4>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-500">
            Your demo account is saved on this device only. Real sign-in, profiles and
            notifications arrive in Phase 2 with the backend.
          </p>
          <Button variant="primary" className="mt-5" onClick={onClose}>
            Start exploring
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mode switch */}
          <div
            role="tablist"
            aria-label="Authentication mode"
            className="grid grid-cols-2 gap-1 rounded-xl bg-canvas p-1 ring-1 ring-inset ring-ink-200"
          >
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => switchMode(m)}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  mode === m ? "bg-white text-brand-700 shadow-sm" : "text-ink-500 hover:text-ink-800"
                )}
              >
                {m === "signin" ? (
                  <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <UserPlus className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {m === "signin" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          <p className="text-[13px] leading-relaxed text-ink-500">
            {mode === "signup"
              ? "Save your favourites, post requests faster and be ready when accounts go live."
              : "Log in to pick up where you left off — saved items, requests and matches."}
          </p>

          <form onSubmit={submit} className="space-y-3.5" noValidate>
            {mode === "signup" && (
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-ink-800">Full name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ama Serwaa"
                  className={cn(inputClass, errors.name && "border-red-400 focus:border-red-400 focus:ring-red-100")}
                  autoComplete="name"
                />
                {errors.name && <span className="mt-1 block text-xs font-semibold text-red-600">{errors.name}</span>}
              </label>
            )}

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-ink-800">Email or phone</span>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="ama@example.com or +233 24 000 0000"
                className={cn(inputClass, errors.contact && "border-red-400 focus:border-red-400 focus:ring-red-100")}
                autoComplete="username"
              />
              {errors.contact && (
                <span className="mt-1 block text-xs font-semibold text-red-600">{errors.contact}</span>
              )}
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-ink-800">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className={cn(inputClass, errors.password && "border-red-400 focus:border-red-400 focus:ring-red-100")}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />
              {errors.password && (
                <span className="mt-1 block text-xs font-semibold text-red-600">{errors.password}</span>
              )}
            </label>

            <Button type="submit" variant={mode === "signup" ? "gold" : "primary"} fullWidth disabled={busy}>
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  {mode === "signup" ? "Creating account…" : "Logging in…"}
                </>
              ) : mode === "signup" ? (
                <>
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  Create account
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Log in
                </>
              )}
            </Button>
          </form>

          <p className="flex items-start gap-2 rounded-xl border border-brand-100 bg-brand-50 p-3 text-xs leading-relaxed font-medium text-brand-800">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
            This is a design preview — nothing is sent to a server. Accounts, OTP login and
            MoMo-linked profiles ship in Phase 2.
          </p>
        </div>
      )}
    </Modal>
  );
}
