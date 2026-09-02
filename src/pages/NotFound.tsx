import { Compass, Home as HomeIcon } from "lucide-react";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import { usePageMeta } from "../hooks/usePageMeta";

const quickLinks = [
  { label: "Find Help", to: "/find-help" },
  { label: "Jobs", to: "/jobs" },
  { label: "Businesses", to: "/businesses" },
  { label: "Opportunities", to: "/opportunities" },
  { label: "Lost & Found", to: "/lost-found" },
  { label: "Post a Request", to: "/post-request" },
];

export default function NotFound() {
  usePageMeta("Page not found | Ghana Help Hub");
  return (
    <section className="relative overflow-hidden">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="kente mb-8 block h-1.5 w-24 rounded-full" aria-hidden="true" />
        <p className="font-display text-[7rem] leading-none font-extrabold tracking-tight text-brand-600 sm:text-[9rem]">
          4<span className="text-gold-400">0</span>4
        </p>
        <h1 className="font-display mt-2 text-2xl font-bold text-ink-900 sm:text-3xl">
          This page took a tro-tro detour.
        </h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-500">
          The page you're looking for doesn't exist or has moved. But whatever you need in
          Ghana — you can still start here.
        </p>

        <div className="mt-8 w-full max-w-xl">
          <SearchBar placeholder="Search for help instead…" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button to="/" variant="primary">
            <HomeIcon className="h-4 w-4" aria-hidden="true" />
            Back home
          </Button>
          <Button to="/post-request" variant="gold">
            I Need Something
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {quickLinks.map((link) => (
            <a
              key={link.to}
              href={`#${link.to}`}
              className="rounded-full border border-ink-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-ink-400">
          <Compass className="h-3.5 w-3.5" aria-hidden="true" />
          Still stuck? Tell us what you need — we'll point you the right way.
        </p>
      </div>
    </section>
  );
  }
