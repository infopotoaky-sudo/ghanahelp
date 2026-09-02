import type { Job } from "../types";
import { jobs as data } from "../data/jobs";
import { sleep } from "../lib/utils";

/**
 * Jobs service.
 * Today: returns mock data. Later: swap with supabase.from("jobs").select("*").
 */

export async function getJobs(): Promise<Job[]> {
  await sleep(300);
  return [...data].sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );
}

export async function getLatestJobs(limit = 4): Promise<Job[]> {
  const all = await getJobs();
  return all.slice(0, limit);
}

export async function getJobById(id: string): Promise<Job | null> {
  await sleep(250);
  return data.find((j) => j.id === id) ?? null;
}
