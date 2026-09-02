import { Link } from "react-router-dom";
import { ArrowRight, Heart, HeartOff } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";
import { useFavorites } from "../hooks/useFavorites";

interface SavedModalProps {
  open: boolean;
  onClose: () => void;
}

/** App-style "Saved" list — everything the user has hearted. */
export default function SavedModal({ open, onClose }: SavedModalProps) {
  const { saved, toggle, count } = useFavorites();

  return (
    <Modal open={open} onClose={onClose} title="Saved items" eyebrow={`${count} saved on this device`}>
      {saved.length === 0 ? (
        <div className="flex flex-col items-center py-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 ring-1 ring-inset ring-red-100">
            <Heart className="h-6 w-6 text-red-400" aria-hidden="true" />
          </span>
          <h4 className="font-display mt-4 text-base font-bold text-ink-900">Nothing saved yet</h4>
          <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-ink-500">
            Tap the heart on any business or request to keep it here for quick access.
          </p>
          <Button to="/businesses" variant="primary" className="mt-5" onClick={onClose}>
            Browse businesses
          </Button>
        </div>
      ) : (
        <ul className="divide-y divide-ink-100">
          {saved.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-3">
              <Link
                to={item.link}
                onClick={onClose}
                className="group flex min-w-0 flex-1 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">
                  <Heart className="h-4 w-4 fill-red-400 stroke-red-400" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-ink-900 group-hover:text-brand-700">
                    {item.title}
                  </span>
                  <span className="block truncate text-xs font-medium text-ink-400">{item.sub}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-ink-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => toggle(item)}
                aria-label={`Remove ${item.title} from saved`}
                className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                <HeartOff className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
