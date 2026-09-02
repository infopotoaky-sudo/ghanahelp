import type { Opportunity } from "../types";
import { opportunities as data } from "../data/opportunities";
import { sleep } from "../lib/utils";

/**
 * Opportunities service.
 * Today: returns mock data. Later: swap with supabase.from("opportunities").select("*").
 */

export async function getOpportunities(): Promise<Opportunity[]> {
  await sleep(300);
  return [...data].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );
}

export async function getOpportunityById(id: string): Promise<Opportunity | null> {
  await sleep(200);
  return data.find((o) => o.id === id) ?? null;
}
