import type { Opportunity, OpportunityCategory } from "../types";
import { daysAgo, daysFromNow } from "../lib/utils";

/**
 * Fictional sample opportunities for the Ghana Help Hub demo.
 * Organisations and programmes shown are illustrative, not real listings.
 */
export const opportunities: Opportunity[] = [
  {
    id: "stem-scholarship-ananse",
    title: "STEM Undergraduate Scholarship",
    organization: "Ananse Education Fund (sample)",
    category: "Scholarship",
    description:
      "Full tuition support for first-year students entering engineering, computer science or applied maths programmes at public universities.",
    details: [
      "Covers tuition and examination fees for 4 years",
      "Open to students with WASSCE aggregate 10 or better",
      "Includes a GH₵1,500 yearly book allowance",
      "Renewal requires a 3.0 GPA each academic year",
    ],
    location: "Nationwide",
    deadline: daysFromNow(30),
    postedAt: daysAgo(4),
    verified: true,
  },
  {
    id: "agribiz-grant-sankofa",
    title: "Youth AgriBiz Starter Grant",
    organization: "Sankofa Ventures (sample)",
    category: "Grant",
    description:
      "Seed grants of GH₵5,000 – GH₵20,000 for Ghanaians aged 18–35 building small agribusinesses in poultry, vegetables or cassava value chains.",
    details: [
      "No equity taken — this is a grant, not a loan",
      "Includes a 6-week business coaching programme",
      "Open to individuals and groups of up to 3",
      "Priority for applicants outside Greater Accra",
    ],
    location: "Nationwide",
    deadline: daysFromNow(45),
    postedAt: daysAgo(6),
    verified: true,
  },
  {
    id: "digital-bootcamp-accra-code",
    title: "Free 12-Week Digital Skills Bootcamp",
    organization: "Accra Code Collective (sample)",
    category: "Training",
    description:
      "Hands-on training in web development, digital marketing and data entry for young job seekers. Laptops and data stipends provided on-site.",
    details: [
      "Runs Mon – Fri, 9:00am – 3:00pm in Osu",
      "No prior experience required",
      "Job-referral network with partner businesses",
      "Certificate awarded on completing the capstone project",
    ],
    location: "Osu, Accra",
    deadline: daysFromNow(18),
    postedAt: daysAgo(2),
    verified: true,
  },
  {
    id: "fintech-internship-paynala",
    title: "Fintech Operations Internship",
    organization: "PayNala Labs (sample)",
    category: "Internship",
    description:
      "A 6-month paid internship rotating through payments operations, merchant onboarding and customer insights at a growing payments startup.",
    details: [
      "GH₵1,800 monthly stipend plus transport support",
      "Hybrid: 3 days on-site in Airport City",
      "Mentorship from senior operations staff",
      "Strong interns are considered for full-time roles",
    ],
    location: "Airport City, Accra",
    deadline: daysFromNow(21),
    postedAt: daysAgo(9),
    verified: false,
  },
  {
    id: "pitch-competition-blackstar",
    title: "National Business Pitch Competition",
    organization: "Black Star Innovators (sample)",
    category: "Competition",
    description:
      "Pitch your small business for a share of GH₵150,000 in prizes. Regional heats in Accra, Kumasi, Tamale and Takoradi before a national final.",
    details: [
      "Open to registered and unregistered micro-businesses",
      "5-minute pitch plus 3-minute Q&A",
      "Winners receive cash plus 3 months of free mentorship",
      "Applications close strictly at 11:59pm on deadline day",
    ],
    location: "Regional heats nationwide",
    deadline: daysFromNow(35),
    postedAt: daysAgo(12),
    verified: false,
  },
  {
    id: "health-fellowship-ntini",
    title: "Community Health Fellowship",
    organization: "Ntini Health Network (sample)",
    category: "Fellowship",
    description:
      "A 9-month fellowship placing nursing and physician assistant graduates in rural health centres with mentorship and a monthly stipend.",
    details: [
      "GH₵2,400 monthly stipend with housing support",
      "Placements in Northern, Savannah and Oti regions",
      "Monthly virtual case-study sessions",
      "Certificate recognised by partner health directorates",
    ],
    location: "Northern Ghana",
    deadline: daysFromNow(50),
    postedAt: daysAgo(15),
    verified: true,
  },
  {
    id: "solar-training-volta",
    title: "Solar Installation Certification Training",
    organization: "Volta Green Skills (sample)",
    category: "Training",
    description:
      "Six-week certification course covering solar panel installation, battery systems and safety standards. Weekend classes for working applicants.",
    details: [
      "Tuition: GH₵950, with 20-part instalment plans",
      "Weekend classes in Tema and Kumasi",
      "Tool kit included on completion",
      "Graduates listed on partner installer directories",
    ],
    location: "Tema & Kumasi",
    deadline: daysFromNow(28),
    postedAt: daysAgo(7),
    verified: false,
  },
  {
    id: "entrance-bursary-adom",
    title: "University Entrance Bursary",
    organization: "Adom Foundation (sample)",
    category: "Scholarship",
    description:
      "One-off GH₵3,000 bursaries for first-generation university students to cover admission fees, accommodation deposits and first-semester books.",
    details: [
      "For students admitted to public universities",
      "Household income below GH₵3,000/month",
      "Simple application: form plus admission letter",
      "Funds paid directly to the institution where possible",
    ],
    location: "Nationwide",
    deadline: daysFromNow(40),
    postedAt: daysAgo(11),
    verified: false,
  },
];

export const opportunityCategories: OpportunityCategory[] = [
  "Scholarship",
  "Grant",
  "Training",
  "Internship",
  "Competition",
  "Fellowship",
];
