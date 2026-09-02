import { useEffect, useState } from "react";

/**
 * App-style "Saved" (heart) items — persisted to localStorage and synced
 * across every component instance via a custom event.
 */
export interface SavedItem {
  id: string;
  title: string;
  sub: string;
  link: string;
}

const KEY = "ghh:saved";
const EVT = "ghh:saved-changed";

function read(): SavedItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as SavedItem[];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [saved, setSaved] = useState<SavedItem[]>(read);

  useEffect(() => {
    const sync = () => setSaved(read());
    window.addEventListener(EVT, sync);
    return () => window.removeEventListener(EVT, sync);
  }, []);

  const toggle = (item: SavedItem) => {
    const current = read();
    const exists = current.some((s) => s.id === item.id);
    const next = exists ? current.filter((s) => s.id !== item.id) : [item, ...current];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — keep in-memory only */
    }
    window.dispatchEvent(new Event(EVT));
  };

  const has = (id: string) => saved.some((s) => s.id === id);

  return { saved, toggle, has, count: saved.length };
}
