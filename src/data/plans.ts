/**
 * Demo monetization model for Ghana Help Hub.
 * Later: supabase.from("plans") / stripe or paystack checkout.
 */
export interface PlanFeature {
  label: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  cta: string;
  highlighted?: boolean;
  features: PlanFeature[];
}

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Get found for free.",
    price: "GH₵0",
    period: "forever",
    cta: "List my business",
    features: [
      { label: "Public business profile", included: true },
      { label: "Appear in search & categories", included: true },
      { label: "WhatsApp & call buttons", included: true },
      { label: "Collect community reviews", included: true },
      { label: "Top-of-search placement", included: false },
      { label: "Reply to posted requests", included: false },
    ],
  },
  {
    id: "boost",
    name: "Boost",
    tagline: "Jump to the front of the line.",
    price: "GH₵29",
    period: "per week",
    cta: "Boost my listing",
    highlighted: true,
    features: [
      { label: "Everything in Starter", included: true },
      { label: "Top-of-search placement", included: true },
      { label: "“Featured” badge on your card", included: true },
      { label: "Reply to 20 posted requests / week", included: true },
      { label: "Weekly WhatsApp performance summary", included: true },
      { label: "Priority in “For you” grid", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For busy professionals & teams.",
    price: "GH₵99",
    period: "per month",
    cta: "Go Pro",
    features: [
      { label: "Everything in Boost", included: true },
      { label: "Unlimited request replies", included: true },
      { label: "Verified business badge", included: true },
      { label: "Priority in “For you” grid", included: true },
      { label: "Lead analytics dashboard", included: true },
      { label: "Up to 3 team seats", included: true },
    ],
  },
];

export interface RevenueStream {
  icon: "megaphone" | "zap" | "radio" | "handshake";
  title: string;
  who: string;
  detail: string;
}

/** How money actually flows through Ghana Help Hub. */
export const revenueStreams: RevenueStream[] = [
  {
    icon: "zap",
    title: "Boosted & featured listings",
    who: "Businesses & professionals",
    detail:
      "Providers pay to appear at the top of search and in the “For you” grid — the same promoted-listing model that powers major marketplaces, priced for Ghana.",
  },
  {
    icon: "megaphone",
    title: "Request lead credits",
    who: "Professionals",
    detail:
      "When someone posts “I need a plumber in Amasaman”, nearby plumbers can spend a credit to be introduced. You only pay to reach a real, stated need.",
  },
  {
    icon: "handshake",
    title: "Pro subscriptions",
    who: "Growing businesses",
    detail:
      "A monthly plan with verification, analytics and team seats for professionals who live on the platform and want a durable edge.",
  },
  {
    icon: "radio",
    title: "Radio & partner campaigns",
    who: "Brands & stations",
    detail:
      "Sponsored “need of the day” segments that connect an on-air conversation to live listings online — measurable, local, and trusted.",
  },
];

export interface PricingFaq {
  q: string;
  a: string;
}

export const pricingFaqs: PricingFaq[] = [
  {
    q: "Is it really free to list my business?",
    a: "Yes. The Starter plan is free forever — you get a public profile, search presence and direct WhatsApp/call contact. We only earn when you choose to pay for extra visibility.",
  },
  {
    q: "Do you take a commission on my jobs?",
    a: "No. Money between you and your customer stays between you and your customer. We never sit in the middle of your payment or take a cut of your work.",
  },
  {
    q: "How do I pay for Boost or Pro?",
    a: "At launch, via Mobile Money (MTN MoMo, Telecel Cash, AT Money) and card. In this demo no real payment is processed — checkout is a placeholder for Phase 2.",
  },
  {
    q: "What is a lead credit?",
    a: "A posted request like “I need a tutor in Kumasi” is a warm lead. A credit lets you be introduced to that person. Unused credits roll over for 30 days.",
  },
  {
    q: "I just need help — do I pay anything?",
    a: "Never. Posting a request, searching, browsing jobs and using lost & found is free for people looking for help. Businesses pay for visibility, not you.",
  },
];
