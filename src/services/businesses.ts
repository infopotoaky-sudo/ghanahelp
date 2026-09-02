import type { Business, Review } from "../types";
import { businesses as data, reviewsForBusiness } from "../data/businesses";
import { matchesQuery, sleep } from "../lib/utils";

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

/** Demo reviews — later: supabase.from("reviews").select("*").eq("business_id", id) */
export async function getReviews(businessId: string): Promise<Review[]> {
  await sleep(200);
  return reviewsForBusiness(businessId);
}

export interface BusinessFilters {
  query?: string;
  category?: string; // "all" or a category label
  city?: string; // "all" or a city
  verifiedOnly?: boolean;
}

export async function searchBusinesses(filters: BusinessFilters): Promise<Business[]> {
  await sleep(200);
  const query = (filters.query ?? "").trim();
  return [...data].filter((b) => {
    if (filters.category && filters.category !== "all" && b.category !== filters.category) {
      return false;
    }
    if (filters.city && filters.city !== "all" && b.city !== filters.city) {
      return false;
    }
    if (filters.verifiedOnly && !b.verified) return false;
    if (query && !matchesQuery([b.name, b.category, b.location, b.tagline, ...b.keywords], query)) {
      return false;
    }
    return true;
  });
}
