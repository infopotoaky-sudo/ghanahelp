import type { HelpRequest } from "../types";
import { daysAgo } from "../lib/utils";

/**
 * Sample help requests that show what "I need something" posts look like.
 * In production these come from the requests service (Supabase later).
 */
export const sampleRequests: HelpRequest[] = [
  {
    id: "GHH-7K2M",
    title: "I need an electrician",
    description: "Two sockets in my shop stopped working after Dumsor. Need someone to trace the fault this week.",
    category: "Services",
    location: "Amasaman",
    budget: "GH₵300",
    phone: "+233 24 000 0011",
    status: "open",
    createdAt: daysAgo(0.1),
  },
  {
    id: "GHH-9P4B",
    title: "I need a room near Legon",
    description: "Single room with prepaid meter for a final-year student. Quiet compound preferred.",
    category: "Housing",
    location: "East Legon",
    budget: "GH₵800 / month",
    phone: "+233 24 000 0012",
    status: "in-progress",
    createdAt: daysAgo(0.6),
  },
  {
    id: "GHH-3T8Q",
    title: "I need a photographer for a naming ceremony",
    description: "Half-day coverage for a naming ceremony on the last Saturday of the month. Outdoor shots are a must.",
    category: "Services",
    location: "Kumasi",
    budget: "GH₵1,500",
    phone: "+233 24 000 0013",
    status: "open",
    createdAt: daysAgo(1.2),
  },
  {
    id: "GHH-5X1D",
    title: "I need a laptop under GH₵5,000",
    description: "For online classes — needs at least 8GB RAM and a full working battery. Refurbished is fine.",
    category: "Buy & Sell",
    location: "Accra",
    budget: "GH₵5,000",
    phone: "+233 24 000 0014",
    status: "in-progress",
    createdAt: daysAgo(2),
  },
  {
    id: "GHH-2W6N",
    title: "I need someone to repair my AC",
    description: "Split AC in the master bedroom stopped cooling. Gas refill or servicing — open to quotes.",
    category: "Services",
    location: "Tema",
    budget: "GH₵450",
    phone: "+233 24 000 0015",
    status: "resolved",
    createdAt: daysAgo(3),
  },
];

export const requestCategories = [
  "Services",
  "Housing",
  "Jobs",
  "Education",
  "Buy & Sell",
  "Opportunities",
  "Something else",
];
