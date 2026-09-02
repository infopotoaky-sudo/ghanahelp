import type { LucideIcon } from "lucide-react";

/* ---------------------------------- Categories ---------------------------------- */

export type CategoryId =
  | "jobs"
  | "services"
  | "housing"
  | "education"
  | "business"
  | "opportunities"
  | "buy-sell"
  | "lost-found";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: LucideIcon;
  /** Where the category card should take the user */
  to: string;
}

/* ---------------------------------- Businesses ---------------------------------- */

export interface Business {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** e.g. "Electrician", "Plumber" */
  category: string;
  /** Area + city, e.g. "Amasaman, Greater Accra" */
  location: string;
  city: string;
  phone: string;
  whatsapp: string;
  verified: boolean;
  phoneVerified: boolean;
  communityReported?: boolean;
  rating: number;
  reviewsCount: number;
  services: string[];
  hours: string;
  keywords: string[];
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

/* ---------------------------------- Jobs ---------------------------------- */

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  howToApply: string;
  location: string;
  city: string;
  type: JobType;
  salary: string;
  /** Lowest figure in GH₵, used for budget filtering */
  salaryMin: number | null;
  category: string;
  postedAt: string;
  deadline: string;
  featured?: boolean;
}

/* ---------------------------------- Opportunities ---------------------------------- */

export type OpportunityCategory =
  | "Scholarship"
  | "Grant"
  | "Training"
  | "Internship"
  | "Competition"
  | "Fellowship";

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: OpportunityCategory;
  description: string;
  details: string[];
  location: string;
  deadline: string;
  postedAt: string;
  verified: boolean;
}

/* ---------------------------------- Lost & Found ---------------------------------- */

export type LostFoundType = "lost" | "found";
export type LostFoundStatus = "lost" | "found" | "resolved";

export interface LostFoundItem {
  id: string;
  type: LostFoundType;
  title: string;
  description: string;
  category: string;
  location: string;
  city: string;
  date: string;
  status: LostFoundStatus;
  contact: string;
}

/* ---------------------------------- Help requests ---------------------------------- */

export type RequestStatus = "open" | "in-progress" | "resolved";

export interface HelpRequest {
  id: string; // GHH-XXXX
  title: string;
  description: string;
  category: string;
  location: string;
  budget: string;
  phone: string;
  status: RequestStatus;
  createdAt: string;
}

export interface NewHelpRequest {
  title: string;
  description: string;
  category: string;
  location: string;
  budget: string;
  phone: string;
  imageNote?: string;
}

/* ---------------------------------- Search ---------------------------------- */

export type SortKey = "relevance" | "newest" | "rating";

export type ResultKind = "business" | "job" | "opportunity" | "lostfound";

export interface SearchResult {
  kind: ResultKind;
  id: string;
  title: string;
  subtitle: string;
  location: string;
  link: string;
  /** Topics used by category filters, e.g. ["services","businesses","electrician"] */
  topics: string[];
  rating: number;
  verified: boolean;
  date: string;
  meta: string;
  budgetMin: number | null;
  score: number;
}
