import { Check, MapPin, Navigation } from "lucide-react";
import Modal from "./Modal";
import { cn } from "../lib/utils";

export interface CityOption {
  name: string;
  count: number;
}

interface CityPickerProps {
  open: boolean;
  onClose: () => void;
  cities: CityOption[];
  current: string;
  onSelect: (city: string) => void;
}

/** App-style bottom-sheet location selector. */
export default function CityPicker({ open, onClose, cities, current, onSelect }: CityPickerProps) {
  return (
    <Modal open={open} onClose={onClose} title="Choose your location" eyebrow="Serve & discover nearby">
      <ul className="space-y-1.5">
        {cities.map((city) => {
          const selected = city.name === current;
          return (
            <li key={city.name}>
              <button
                type="button"
                onClick={() => {
                  onSelect(city.name);
                  onClose();
                }}
                aria-pressed={selected}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  selected
                    ? "border-brand-300 bg-brand-50 ring-1 ring-inset ring-brand-200"
                    : "border-ink-100 bg-white hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    selected ? "bg-brand-600 text-white" : "bg-canvas text-brand-600 ring-1 ring-inset ring-ink-200"
                  )}
                >
                  {city.name === "All Ghana" ? (
                    <Navigation className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-bold text-ink-900">{city.name}</span>
                  <span className="block text-[11px] font-semibold text-ink-400">
                    {city.name === "All Ghana"
                      ? "See everything, everywhere"
                      : `${city.count} listing${city.count === 1 ? "" : "s"} nearby`}
                  </span>
                </span>
                {selected && <Check className="h-5 w-5 text-brand-600" aria-hidden="true" />}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-center text-[11px] font-medium text-ink-400">
        Your location stays on this device — nothing is shared yet.
      </p>
    </Modal>
  );
}
