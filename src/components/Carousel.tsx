import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

interface CarouselProps {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
}

/**
 * App-style horizontal snap scroller (like Jiji's home carousels).
 * Children are the slides — give each a width class + `snap-start shrink-0`.
 */
export default function Carousel({ children, ariaLabel, className }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const check = () => setCanScroll(el.scrollWidth > el.clientWidth + 8);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollByPage = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  }, []);

  return (
    <div className={cn("group/carousel relative", className)}>
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
      >
        {children}
      </div>

      {canScroll && (
        <>
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Scroll left"
            className="absolute top-1/2 -left-3 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink-100 bg-white text-ink-700 shadow-lift opacity-0 transition-all duration-200 group-hover/carousel:opacity-100 hover:bg-brand-600 hover:text-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:flex"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="Scroll right"
            className="absolute top-1/2 -right-3 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink-100 bg-white text-ink-700 shadow-lift opacity-0 transition-all duration-200 group-hover/carousel:opacity-100 hover:bg-brand-600 hover:text-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:flex"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}
