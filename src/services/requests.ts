import type { HelpRequest, NewHelpRequest } from "../types";
import { sampleRequests } from "../data/requests";
import { generateRequestId, sleep } from "../lib/utils";

/**
 * Requests service — the heart of Ghana Help Hub.
 * Today: mock. Later: supabase.from("requests").insert(...) etc.
 */

export async function getRecentRequests(limit = 5): Promise<HelpRequest[]> {
  await sleep(200);
  return sampleRequests.slice(0, limit);
}

export async function createRequest(input: NewHelpRequest): Promise<HelpRequest> {
  // Simulates a network round-trip; nothing is sent anywhere in the demo.
  await sleep(700);
  const request: HelpRequest = {
    id: generateRequestId(),
    ...input,
    status: "open",
    createdAt: new Date().toISOString(),
  };
  return request;
}
