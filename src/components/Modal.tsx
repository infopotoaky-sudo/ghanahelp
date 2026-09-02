import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Optional small label above the title */
  eyebrow?: string;
}

export default function Modal({ open, onClose, title, eyebrow, children }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-ink-900/55 backdrop-blur-[2px]"
        onClick={onClose}
        tabIndex={-1}
      />
      <div className="animate-pop relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-lift ring-1 ring-ink-100 sm:rounded-2xl">
        <div className="kente h-1.5 w-full" aria-hidden="true" />
        <div className="flex items-start justify-between gap-4 px-6 pt-5">
          <div>
            {eyebrow && (
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-600">
                {eyebrow}
              </p>
            )}
            <h3 className="font-display text-lg font-bold tracking-tight text-ink-900">{title}</h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="px-6 pb-6 pt-3">{children}</div>
      </div>
    </div>
  );
}
