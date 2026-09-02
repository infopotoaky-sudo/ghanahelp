import type { Business } from "../types";
import { daysAgo } from "../lib/utils";

/**
 * Fictional sample businesses for the Ghana Help Hub demo.
 * These are not real companies — they exist to show how listings will look.
 */
export const businesses: Business[] = [
  {
    id: "brightline-electrical",
    name: "BrightLine Electrical Services",
    tagline: "Safe, certified electrical work for homes and shops.",
    description:
      "BrightLine handles wiring, fault tracing, meter issues and full installations for homes, shops and small offices. Every job starts with a free safety check and a clear written quote, so you always know what you're paying for before work begins.",
    category: "Electrician",
    location: "Amasaman, Greater Accra",
    city: "Accra",
    phone: "+233 24 110 2233",
    whatsapp: "+233 24 110 2233",
    verified: true,
    phoneVerified: true,
    rating: 4.8,
    reviewsCount: 46,
    services: ["House wiring", "Fault tracing", "Meter installation", "Ceiling fans & lighting", "Small business fit-outs"],
    hours: "Mon – Sat, 7:30am – 6:00pm",
    keywords: ["electrician", "wiring", "lighting", "power", "amasaman", "electric"],
    createdAt: daysAgo(120),
  },
  {
    id: "accra-auto-care",
    name: "Accra Auto Care",
    tagline: "Honest diagnostics. Fair prices. No stories.",
    description:
      "A full-service garage in Kaneshie for Japanese and Korean cars. Accra Auto Care offers computer diagnostics, engine service, suspension work and pre-purchase inspections. You get photos of every part replaced.",
    category: "Mechanic",
    location: "Kaneshie, Accra",
    city: "Accra",
    phone: "+233 20 555 8811",
    whatsapp: "+233 20 555 8811",
    verified: true,
    phoneVerified: true,
    rating: 4.6,
    reviewsCount: 72,
    services: ["Computer diagnostics", "Engine service", "Brakes & suspension", "AC regas", "Pre-purchase inspection"],
    hours: "Mon – Sat, 8:00am – 5:30pm",
    keywords: ["mechanic", "car", "garage", "engine", "kaneshie", "auto repair"],
    createdAt: daysAgo(96),
  },
  {
    id: "creative-lens-ghana",
    name: "Creative Lens Ghana",
    tagline: "Weddings, naming ceremonies and brand photography.",
    description:
      "Creative Lens is a two-person studio in Kumasi covering weddings, engagements, naming ceremonies and product shoots. Packages include same-week previews and a full online gallery you can share with family anywhere in the world.",
    category: "Photographer",
    location: "Ahodwo, Kumasi",
    city: "Kumasi",
    phone: "+233 54 771 9034",
    whatsapp: "+233 54 771 9034",
    verified: true,
    phoneVerified: true,
    rating: 4.9,
    reviewsCount: 58,
    services: ["Wedding coverage", "Naming ceremonies", "Product photography", "Event highlights", "Photo albums"],
    hours: "Tue – Sun, 9:00am – 7:00pm",
    keywords: ["photographer", "wedding", "pictures", "kumasi", "event", "camera"],
    createdAt: daysAgo(75),
  },
  {
    id: "aquafix-plumbing",
    name: "AquaFix Plumbing",
    tagline: "Leaks, blockages and bathroom fittings — fixed fast.",
    description:
      "AquaFix covers emergency leak repairs, pipe replacement, WC and sink installation, and water tank connections across Tema. Weekend call-outs are available for urgent flooding, with a response target of under 2 hours in central Tema.",
    category: "Plumber",
    location: "Community 6, Tema",
    city: "Tema",
    phone: "+233 27 663 4120",
    whatsapp: "+233 27 663 4120",
    verified: true,
    phoneVerified: true,
    rating: 4.7,
    reviewsCount: 39,
    services: ["Emergency leak repair", "Pipe replacement", "WC & sink installation", "Water tank connection", "Bathroom fittings"],
    hours: "Mon – Sun, 24hr emergency line",
    keywords: ["plumber", "leak", "pipes", "toilet", "tema", "water"],
    createdAt: daysAgo(60),
  },
  {
    id: "nanas-kitchen",
    name: "Nana's Kitchen & Catering",
    tagline: "Home-style Ghanaian catering for events of every size.",
    description:
      "From 20-plate family gatherings to 500-guest weddings, Nana's Kitchen cooks jollof, waakye, kontomire stew and grilled tilapia the home way. Menus are planned with you, and tastings are available for events above 100 guests.",
    category: "Caterer",
    location: "Osu, Accra",
    city: "Accra",
    phone: "+233 55 210 7745",
    whatsapp: "+233 55 210 7745",
    verified: false,
    phoneVerified: true,
    rating: 4.5,
    reviewsCount: 27,
    services: ["Wedding catering", "Funeral & memorial menus", "Office lunch packs", "Birthday parties", "Chop bar classics"],
    hours: "Mon – Sat, 8:00am – 8:00pm",
    keywords: ["caterer", "food", "jollof", "wedding", "osu", "party", "cooking"],
    createdAt: daysAgo(54),
  },
  {
    id: "excel-tutoring",
    name: "Excel Tutoring Centre",
    tagline: "BECE, WASSCE and university prep with patient tutors.",
    description:
      "Excel runs small-group and one-on-one classes near East Legon for BECE and WASSCE candidates, plus first-year university maths and statistics. Parents receive a short progress note after every session.",
    category: "Tutor",
    location: "East Legon, Accra",
    city: "Accra",
    phone: "+233 26 908 1172",
    whatsapp: "+233 26 908 1172",
    verified: true,
    phoneVerified: true,
    rating: 4.8,
    reviewsCount: 64,
    services: ["BECE prep", "WASSCE prep", "Maths & science", "English & essay writing", "University statistics"],
    hours: "Mon – Fri 3:30pm – 8:00pm, Sat 9:00am – 2:00pm",
    keywords: ["tutor", "teacher", "lessons", "bece", "wassce", "legon", "school", "education"],
    createdAt: daysAgo(48),
  },
  {
    id: "kente-touch-tailoring",
    name: "Kente Touch Tailoring",
    tagline: "Traditional and contemporary styles, cut to fit.",
    description:
      "A family tailoring shop at Adum, Kumasi, stitching kente, ankara and plain-wear for offices, weddings and church programmes. Bring your own fabric or choose from their rack. Fittings are free within the first month.",
    category: "Tailor",
    location: "Adum, Kumasi",
    city: "Kumasi",
    phone: "+233 24 887 6601",
    whatsapp: "+233 24 887 6601",
    verified: false,
    phoneVerified: true,
    communityReported: true,
    rating: 4.4,
    reviewsCount: 31,
    services: ["Kente styling", "Ankara outfits", "Office wear", "Wedding aso-ebi", "Repairs & adjustments"],
    hours: "Mon – Sat, 8:30am – 6:30pm",
    keywords: ["tailor", "sewing", "kente", "ankara", "dress", "kumasi", "fashion"],
    createdAt: daysAgo(40),
  },
  {
    id: "sharp-edge-barber",
    name: "Sharp Edge Barber Lounge",
    tagline: "Clean cuts, hot-towel shaves and kids' cuts.",
    description:
      "A modern barbershop in Takoradi with online-style booking by WhatsApp. Sharp Edge does fades, beard sculpting, hot-towel shaves and gentle kids' cuts. Loyalty card: every 6th cut is on the house.",
    category: "Barber",
    location: "Market Circle, Takoradi",
    city: "Takoradi",
    phone: "+233 50 334 9980",
    whatsapp: "+233 50 334 9980",
    verified: false,
    phoneVerified: true,
    rating: 4.3,
    reviewsCount: 22,
    services: ["Fades & trims", "Beard sculpting", "Hot-towel shave", "Kids' cuts", "Hair & scalp treatment"],
    hours: "Tue – Sun, 9:00am – 8:00pm",
    keywords: ["barber", "haircut", "fade", "takoradi", "grooming"],
    createdAt: daysAgo(35),
  },
  {
    id: "pixelkraft-studios",
    name: "PixelKraft Studios",
    tagline: "Websites, brand design and social media kits for SMEs.",
    description:
      "PixelKraft builds fast, mobile-first websites for Ghanaian small businesses, with WhatsApp ordering and mobile-money payment integration. Packages include a simple admin dashboard and one month of free support.",
    category: "Web Developer",
    location: "Remote — based in Accra",
    city: "Accra",
    phone: "+233 59 402 3317",
    whatsapp: "+233 59 402 3317",
    verified: true,
    phoneVerified: true,
    rating: 4.9,
    reviewsCount: 33,
    services: ["Business websites", "Online ordering", "Logo & brand kits", "Social media setup", "Website care plans"],
    hours: "Mon – Fri, 9:00am – 6:00pm",
    keywords: ["web developer", "website", "designer", "graphic", "digital", "accra", "online"],
    createdAt: daysAgo(30),
  },
  {
    id: "sparkle-clean",
    name: "SparkleClean Ghana",
    tagline: "Deep cleaning for homes, offices and post-event spaces.",
    description:
      "SparkleClean brings a trained two-person crew with their own supplies for home deep cleans, office upkeep and post-funeral or post-party cleanups. Book a slot on WhatsApp and get a quote with photos of your space.",
    category: "Cleaner",
    location: "Dansoman, Accra",
    city: "Accra",
    phone: "+233 24 776 5092",
    whatsapp: "+233 24 776 5092",
    verified: false,
    phoneVerified: true,
    rating: 4.2,
    reviewsCount: 18,
    services: ["Home deep cleaning", "Office cleaning", "Post-event cleanup", "Window & curtain care", "Fumigation referrals"],
    hours: "Mon – Sat, 8:00am – 5:00pm",
    keywords: ["cleaner", "cleaning", "washing", "dansoman", "house"],
    createdAt: daysAgo(22),
  },
  {
    id: "coolbreeze-ac",
    name: "CoolBreeze AC & Refrigeration",
    tagline: "AC repair, servicing and fridge fixes — same day.",
    description:
      "CoolBreeze services split and window AC units, fridges, freezers and cold rooms across Tema and Spintex. Regas work comes with a 3-month leak warranty, and most repairs are completed the same day.",
    category: "AC Technician",
    location: "Tema Community 1",
    city: "Tema",
    phone: "+233 20 118 4457",
    whatsapp: "+233 20 118 4457",
    verified: true,
    phoneVerified: true,
    rating: 4.6,
    reviewsCount: 41,
    services: ["AC repair & servicing", "Gas refilling", "Fridge & freezer repair", "Cold room maintenance", "Installation & relocation"],
    hours: "Mon – Sat, 8:00am – 6:00pm",
    keywords: ["ac", "air conditioner", "fridge", "freezer", "tema", "cooling", "repair"],
    createdAt: daysAgo(15),
  },
  {
    id: "oakwood-carpentry",
    name: "OakWood Carpentry & Furniture",
    tagline: "Custom wardrobes, kitchen fittings and office furniture.",
    description:
      "OakWood's Kasoa workshop builds wardrobes, kitchen cabinets, shop counters and office desks from solid wood and quality boards. Send a photo or sketch on WhatsApp for a free quote within one working day.",
    category: "Carpenter",
    location: "Kasoa, Central Region",
    city: "Kasoa",
    phone: "+233 54 220 8863",
    whatsapp: "+233 54 220 8863",
    verified: false,
    phoneVerified: true,
    communityReported: true,
    rating: 4.5,
    reviewsCount: 25,
    services: ["Wardrobes & closets", "Kitchen cabinets", "Office furniture", "Shop counters", "Door & window frames"],
    hours: "Mon – Sat, 7:00am – 5:00pm",
    keywords: ["carpenter", "furniture", "wood", "wardrobe", "kasoa", "cabinet"],
    createdAt: daysAgo(8),
  },
];

export const businessCategories = Array.from(
  new Set(businesses.map((b) => b.category))
).sort((a, b) => a.localeCompare(b));

export const businessCities = Array.from(
  new Set(businesses.map((b) => b.city))
).sort((a, b) => a.localeCompare(b));

/* ------------------------- Sample reviews (demo) ------------------------- */

import type { Review } from "../types";
import { daysAgo as reviewDaysAgo } from "../lib/utils";

/**
 * A small pool of clearly-fictional review snippets. The service picks a
 * deterministic slice per business so profiles feel alive without inventing
 * real customer claims about real people.
 */
const reviewPool: Array<Omit<Review, "id" | "date">> = [
  { author: "Kwame A.", rating: 5, text: "Responded quickly on WhatsApp, gave a clear quote before starting and finished the same day. Exactly what I needed." },
  { author: "Abena S.", rating: 5, text: "Professional from start to finish. Explained the problem in a way I could understand and charged what was agreed." },
  { author: "Yaw B.", rating: 4, text: "Good work and fair pricing. Had to reschedule once, but communicated properly and the result was solid." },
  { author: "Efua M.", rating: 5, text: "Found them through a request I posted. They called within the hour and sorted everything before the weekend." },
  { author: "Kojo D.", rating: 4, text: "Neat, polite and honest. Showed me the replaced parts and gave a short warranty on the work." },
  { author: "Ama K.", rating: 5, text: "I've recommended them to two neighbours already. Reliable and easy to deal with." },
];

export function reviewsForBusiness(businessId: string, count = 3): Review[] {
  const seed = businessId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return Array.from({ length: count }).map((_, i) => {
    const pick = reviewPool[(seed + i * 2) % reviewPool.length];
    return {
      id: `${businessId}-review-${i + 1}`,
      ...pick,
      date: reviewDaysAgo(6 + ((seed + i * 9) % 40)),
    };
  });
}
