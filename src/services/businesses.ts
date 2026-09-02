import type { Business, Review } from "../types";
import { businesses as data } from "../data/businesses";
import { sleep } from "../lib/utils";

/**
 * Business service.
 * Today: returns mock data. Later: swap the bodies with Supabase queries —
 * e.g. supabase.from("businesses").select("*").
 */

export async function getBusinesses(): Promise<Business[]> {
  await sleep(300);
  return [...data];
}

export async function getFeaturedBusinesses(limit = 6): Promise<Business[]> {
  await sleep(250);
  return [...data]
    .sort((a, b) => Number(b.verified) - Number(a.verified) || b.rating - a.rating)
    .slice(0, limit);
}

export async function getBusinessById(id: string): Promise<Business | null> {
  await sleep(250);
  return data.find((b) => b.id === id) ?? null;
}

/** Reviews live in their own table later; the demo has none yet. */
export async function getReviews(_businessId: string): Promise<Review[]> {
  await sleep(200);
  return [];
}

export interface BusinessFilters {
  query?: string;
  category?: string; // "all" or a category label
  city?: string; // "all" or a city
  verifiedOnly?: boolean;
}

export async function searchBusinesses(filters: BusinessFilters): Promise<Business[]> {
  await sleep(200);
  return [...data];
}
