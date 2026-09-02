import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

interface LoadingStateProps {
  label?: string;
  className?: string;
  /** Render skeleton cards instead of a spinner */
  cards?: number;
}

export default function LoadingState({ label = "Loading…", className, cards }: LoadingStateProps) {
  if (cards) {
    return (
      <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)} aria-busy="true">
        {Array.from({ length: cards }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-ink-100 bg-white p-5"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-ink-100" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-2/3 rounded bg-ink-100" />
                <div className="h-3 w-1/3 rounded bg-ink-100" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg-ink-100" />
              <div className="h-3 w-5/6 rounded bg-ink-100" />
              <div className="h-3 w-1/2 rounded bg-ink-100" />
            </div>
            <div className="mt-5 h-9 rounded-xl bg-ink-100" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3 py-16", className)}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-8 w-8 animate-spin text-brand-600" aria-hidden="true" />
      <p className="text-sm font-medium text-ink-500">{label}</p>
    </div>
  );
}
