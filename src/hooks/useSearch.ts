import { useMemo, useState } from "react";
import { matchesQuery } from "../lib/utils";

/**
 * Lightweight client-side search over any list.
 * @param items       the full list
 * @param getFields   returns the searchable strings for each item
 */
export function useSearch<T>(items: T[], getFields: (item: T) => Array<string | undefined>) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return items;
    return items.filter((item) => matchesQuery(getFields(item), query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, query]);

  return { query, setQuery, results };
}
