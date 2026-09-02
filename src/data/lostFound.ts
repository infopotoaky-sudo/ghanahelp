import type { LostFoundItem } from "../types";
import { daysAgo } from "../lib/utils";

/** Fictional sample lost & found posts for the Ghana Help Hub demo. */
export const lostFoundItems: LostFoundItem[] = [
  {
    id: "lf-phone-circle",
    type: "lost",
    title: "Black Samsung Galaxy A34 lost at Kwame Nkrumah Circle",
    description:
      "Left in a Bolt ride that dropped me near the Circle taxi rank around 6pm. Black case with a cracked corner. Contains family photos — reward offered, no questions asked.",
    category: "Electronics",
    location: "Kwame Nkrumah Circle, Accra",
    city: "Accra",
    date: daysAgo(1),
    status: "lost",
    contact: "WhatsApp: +233 24 000 0001",
  },
  {
    id: "lf-keys-makola",
    type: "found",
    title: "Bunch of car keys found near Makola Market entrance",
    description:
      "Found a set of car keys with a blue bead keychain near the Makola main entrance on Saturday morning. Currently kept with a trusted stall. Describe the car brand tag to claim.",
    category: "Keys & Documents",
    location: "Makola, Accra",
    city: "Accra",
    date: daysAgo(3),
    status: "found",
    contact: "WhatsApp: +233 24 000 0002",
  },
  {
    id: "lf-waec-docs",
    type: "lost",
    title: "WAEC result slip and ID card — Adwoa Boateng",
    description:
      "Lost a brown envelope containing a WAEC result slip and national ID on the Kasoa–Accra trotro route. Documents belong to Adwoa Boateng. Please help reunite — replacement has been very difficult.",
    category: "Keys & Documents",
    location: "Kasoa – Accra route",
    city: "Kasoa",
    date: daysAgo(5),
    status: "lost",
    contact: "WhatsApp: +233 24 000 0003",
  },
  {
    id: "lf-backpack-legon",
    type: "found",
    title: "Blue backpack found on UG campus shuttle",
    description:
      "A blue backpack with notebooks and a scientific calculator was left on the Legon campus shuttle. Contents are safe. Owner should describe the sticker on the front pocket to claim.",
    category: "Bags",
    location: "University of Ghana, Legon",
    city: "Accra",
    date: daysAgo(6),
    status: "found",
    contact: "WhatsApp: +233 24 000 0004",
  },
  {
    id: "lf-dog-dansoman",
    type: "lost",
    title: "Brown German Shepherd — answers to 'Bingo'",
    description:
      "Bingo slipped out of our compound in Dansoman Roundabout area on Sunday evening. Friendly, wearing a red collar. Family is heartbroken — please share.",
    category: "Pets",
    location: "Dansoman, Accra",
    city: "Accra",
    date: daysAgo(8),
    status: "resolved",
    contact: "WhatsApp: +233 24 000 0005",
  },
  {
    id: "lf-id-tema",
    type: "found",
    title: "Student ID card found at Tema Station One",
    description:
      "Found a student ID card from a nursing training college near the Station One bus stop. The holder's name and programme are visible — claim by confirming your index number.",
    category: "Keys & Documents",
    location: "Tema Community 1",
    city: "Tema",
    date: daysAgo(10),
    status: "found",
    contact: "WhatsApp: +233 24 000 0006",
  },
];

export const lostFoundCategories = Array.from(
  new Set(lostFoundItems.map((i) => i.category))
).sort((a, b) => a.localeCompare(b));

export const lostFoundCities = Array.from(
  new Set(lostFoundItems.map((i) => i.city))
).sort((a, b) => a.localeCompare(b));
