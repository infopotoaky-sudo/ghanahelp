import {
  Briefcase,
  Wrench,
  Home as HomeIcon,
  GraduationCap,
  Store,
  Target,
  ShoppingBag,
  Megaphone,
} from "lucide-react";
import type { Category } from "../types";

export const categories: Category[] = [
  {
    id: "jobs",
    name: "Jobs",
    description: "Browse openings posted by businesses across Ghana.",
    icon: Briefcase,
    to: "/jobs",
  },
  {
    id: "services",
    name: "Services",
    description: "Electricians, plumbers, mechanics, tutors and more.",
    icon: Wrench,
    to: "/find-help?category=services",
  },
  {
    id: "housing",
    name: "Housing",
    description: "Rooms, flats and short stays. Tell us what you need.",
    icon: HomeIcon,
    to: "/find-help?category=housing",
  },
  {
    id: "education",
    name: "Education",
    description: "Tutors, training programmes and scholarships.",
    icon: GraduationCap,
    to: "/find-help?category=education",
  },
  {
    id: "business",
    name: "Business",
    description: "Find professionals and grow your own business.",
    icon: Store,
    to: "/businesses",
  },
  {
    id: "opportunities",
    name: "Opportunities",
    description: "Scholarships, grants, internships and competitions.",
    icon: Target,
    to: "/opportunities",
  },
  {
    id: "buy-sell",
    name: "Buy & Sell",
    description: "Looking for something specific? Post your request.",
    icon: ShoppingBag,
    to: "/post-request",
  },
  {
    id: "lost-found",
    name: "Lost & Found",
    description: "Help reunite people with what they've lost.",
    icon: Megaphone,
    to: "/lost-found",
  },
];

export const popularSearches = [
  "Electricians",
  "Jobs",
  "Mechanics",
  "Tutors",
  "Photographers",
  "Rooms",
];
