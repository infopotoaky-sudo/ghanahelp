import type { LostFoundItem } from "../types";
import { lostFoundItems as data } from "../data/lostFound";
import { sleep } from "../lib/utils";

/**
 * Lost & Found service.
 * Today: returns mock data. Later: swap with supabase.from("lost_found").select("*").
 */

export async function getLostFoundItems(): Promise<LostFoundItem[]> {
  await sleep(280);
  return [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
