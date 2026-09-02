import { useState } from "react";
import type { FormEvent } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
  size?: "md" | "lg";
  className?: string;
  autoFocus?: boolean;
  /** Accessible name for the search input */
  ariaLabel?: string;
}

export default function SearchBar({
  defaultValue = "",
  placeholder = "What are you looking for?",
  size = "md",
  className,
  autoFocus,
  ariaLabel = "Search query",
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);
  const navigate = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    navigate(q ? `/find-help?q=${encodeURIComponent(q)}` : "/find-help");
  };

  return (
    <form
      onSubmit={submit}
      role="search"
      aria-label="Search Ghana Help Hub"
      className={cn(
        "group flex w-full items-center gap-2 rounded-2xl border border-ink-200 bg-white p-1.5 shadow-card transition-all duration-200",
        "focus-within:border-brand-400 focus-within:shadow-lift focus-within:ring-2 focus-within:ring-brand-100",
        className
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600",
          size === "lg" && "h-11 w-11 sm:ml-1"
        )}
      >
        <Search className={cn("h-4.5 w-4.5", size === "lg" && "h-5 w-5")} aria-hidden="true" />
      </div>
      <label htmlFor={undefined} className="sr-only">
        Search
      </label>
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn(
          "min-w-0 flex-1 bg-transparent font-medium text-ink-900 outline-none placeholder:text-ink-400",
          size === "lg" ? "h-11 text-base" : "h-9 text-sm"
        )}
      />
      <button
        type="submit"
        className={cn(
          "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gold-400 font-bold tracking-tight text-ink-900 transition-all duration-200 hover:bg-gold-300 active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
          size === "lg" ? "h-11 px-5 sm:px-7" : "h-9 px-4"
        )}
      >
        <Search className="h-4 w-4 sm:hidden" aria-hidden="true" />
        <span className={cn(size === "lg" ? "text-[15px]" : "text-sm")}>Search</span>
      </button>
    </form>
  );
}
