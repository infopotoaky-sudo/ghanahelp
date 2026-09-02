import { Link } from "react-router-dom";
import type { Category } from "../types";

interface CategoryCardProps {
  category: Category;
  /** Stagger index for entrance delay */
  index?: number;
}

const tileStyles = [
  "bg-brand-50 text-brand-600 ring-brand-100",
  "bg-gold-100 text-gold-700 ring-gold-200",
  "bg-ink-100 text-ink-700 ring-ink-200",
];

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const Icon = category.icon;
  return (
    <Link
      to={category.to}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-ink-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      <span className="kente absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-inset transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${tileStyles[index % tileStyles.length]}`}
      >
        <Icon className="h-5.5 w-5.5" aria-hidden="true" />
      </span>
      <span>
        <span className="font-display block text-[15px] font-bold text-ink-900 transition-colors group-hover:text-brand-700">
          {category.name}
        </span>
        <span className="mt-1 block text-[13px] leading-relaxed text-ink-500">
          {category.description}
        </span>
      </span>
    </Link>
  );
}
