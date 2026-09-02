import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import { cn } from "../lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
}

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} data-reveal className={cn(className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
