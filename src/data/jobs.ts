import type { Job } from "../types";
import { daysAgo, daysFromNow } from "../lib/utils";

/** Fictional sample job listings for the Ghana Help Hub demo. */
export const jobs: Job[] = [
  {
    id: "frontend-developer-pixelkraft",
    title: "Frontend Developer (React)",
    company: "PixelKraft Studios",
    description:
      "PixelKraft is looking for a frontend developer to build fast, mobile-first websites for Ghanaian small businesses. You'll work closely with the design lead, ship weekly, and see real traders and shops using what you build.",
    requirements: [
      "2+ years building with React and TypeScript",
      "Strong CSS skills and care for responsive design",
      "Experience integrating REST APIs",
      "Good written English for client handover notes",
      "Portfolio of live projects (even personal ones count)",
    ],
    responsibilities: [
      "Build and maintain client websites from approved designs",
      "Optimise pages for low-end Android devices and slow networks",
      "Integrate WhatsApp ordering and mobile-money payment flows",
      "Write short handover documentation for each project",
    ],
    howToApply:
      "Send your CV and portfolio link by email or WhatsApp. In the demo, the Apply button shows a sample application flow.",
    location: "Remote — based in Accra",
    city: "Accra",
    type: "Full-time",
    salary: "GH₵6,000 – 9,000 / month",
    salaryMin: 6000,
    category: "Technology",
    postedAt: daysAgo(2),
    deadline: daysFromNow(21),
    featured: true,
  },
  {
    id: "customer-service-kudumart",
    title: "Customer Service Representative",
    company: "KuduMart Online",
    description:
      "KuduMart, an online grocery delivery service, needs a friendly voice to handle WhatsApp and phone orders, resolve delivery issues and keep customers coming back. Weekend rotation applies.",
    requirements: [
      "SHS certificate or equivalent",
      "Fluent English and Twi (Ga is a plus)",
      "Confident with WhatsApp Business and spreadsheets",
      "Calm and patient under pressure",
    ],
    responsibilities: [
      "Take and confirm orders on WhatsApp and phone",
      "Track deliveries and update customers proactively",
      "Process refunds and replacements within policy",
      "Log common issues for the operations team",
    ],
    howToApply: "Apply through the sample application flow on this page.",
    location: "Spintex, Accra",
    city: "Accra",
    type: "Full-time",
    salary: "GH₵2,800 – 3,500 / month",
    salaryMin: 2800,
    category: "Customer Service",
    postedAt: daysAgo(3),
    deadline: daysFromNow(14),
  },
  {
    id: "electrical-apprentice-brightline",
    title: "Electrical Technician Apprentice",
    company: "BrightLine Electrical Services",
    description:
      "A 12-month paid apprenticeship learning house wiring, fault tracing and meter installation alongside senior technicians. You'll ride along to real jobs across Greater Accra from day one.",
    requirements: [
      "Basic knowledge of electrical tools",
      "Technical institute background is an advantage",
      "Willingness to work Saturdays on rotation",
      "Honest, punctual and safety-minded",
    ],
    responsibilities: [
      "Assist senior technicians on site",
      "Prepare materials and organise tools",
      "Complete the BrightLine safety workbook",
      "Learn client communication and quoting basics",
    ],
    howToApply: "Bring your CV to the Amasaman office or apply through the sample flow.",
    location: "Amasaman, Greater Accra",
    city: "Accra",
    type: "Internship",
    salary: "GH₵1,200 / month stipend",
    salaryMin: 1200,
    category: "Trades & Technical",
    postedAt: daysAgo(5),
    deadline: daysFromNow(10),
  },
  {
    id: "pastry-chef-nanas-kitchen",
    title: "Pastry & Cake Decorator",
    company: "Nana's Kitchen & Catering",
    description:
      "Nana's Kitchen wants a creative decorator for celebration cakes and small chops platters for weddings and birthdays. Kitchen space and equipment are provided; you bring the skill.",
    requirements: [
      "Portfolio of decorated cakes (photos on WhatsApp are fine)",
      "Experience with fondant and buttercream",
      "Reliable with same-day deadlines",
    ],
    responsibilities: [
      "Bake and decorate custom cakes from client briefs",
      "Price and quote cake orders with the manager",
      "Keep the pastry station clean and stocked",
    ],
    howToApply: "Send photos of your best 5 cakes with your application.",
    location: "Osu, Accra",
    city: "Accra",
    type: "Part-time",
    salary: "GH₵120 – 200 / day",
    salaryMin: 120,
    category: "Hospitality",
    postedAt: daysAgo(6),
    deadline: daysFromNow(12),
  },
  {
    id: "sales-executive-coolbreeze",
    title: "Sales Executive (Home Services)",
    company: "CoolBreeze AC & Refrigeration",
    description:
      "Sell AC servicing plans and installations to homes and small offices around Tema and Spintex. Base salary plus commission on every closed job — top sellers double their base.",
    requirements: [
      "1+ year in field or phone sales",
      "Own motorbike is an advantage",
      "Comfortable with mobile-money collections",
    ],
    responsibilities: [
      "Visit homes and offices to offer service plans",
      "Follow up quotes within 48 hours",
      "Report weekly pipeline to the branch manager",
    ],
    howToApply: "Apply through the sample application flow on this page.",
    location: "Tema Community 1",
    city: "Tema",
    type: "Full-time",
    salary: "GH₵2,500 + commission",
    salaryMin: 2500,
    category: "Sales",
    postedAt: daysAgo(8),
    deadline: daysFromNow(18),
  },
  {
    id: "content-writer-remote",
    title: "Content Writer (Business & Tech)",
    company: "Sankofa Digital Media",
    description:
      "Write practical, Ghana-focused articles about small business, mobile money and everyday tech. Fully remote, paid per published piece, with a monthly retainer option after three months.",
    requirements: [
      "Samples of published or personal writing",
      "Clear, simple English — no jargon",
      "Ability to hit 2 pieces per week",
    ],
    responsibilities: [
      "Research and draft 800–1,200 word articles",
      "Interview small business owners by phone",
      "Revise based on editor feedback within 48 hours",
    ],
    howToApply: "Attach two writing samples to your application.",
    location: "Remote (anywhere in Ghana)",
    city: "Remote",
    type: "Remote",
    salary: "GH₵400 – 700 / article",
    salaryMin: 400,
    category: "Creative & Media",
    postedAt: daysAgo(10),
    deadline: daysFromNow(25),
  },
  {
    id: "accounts-assistant-oakwood",
    title: "Accounts Assistant",
    company: "OakWood Carpentry & Furniture",
    description:
      "Support the workshop's books: record material purchases, track customer deposits, reconcile mobile-money statements and prepare a simple monthly summary for the owner.",
    requirements: [
      "Diploma in accounting or related field",
      "Comfortable with Excel or Google Sheets",
      "High attention to detail and honesty",
    ],
    responsibilities: [
      "Record daily sales and expenses",
      "Reconcile MoMo and bank statements weekly",
      "Chase outstanding balances politely and professionally",
    ],
    howToApply: "Apply through the sample application flow on this page.",
    location: "Kasoa, Central Region",
    city: "Kasoa",
    type: "Full-time",
    salary: "GH₵2,200 – 2,600 / month",
    salaryMin: 2200,
    category: "Finance",
    postedAt: daysAgo(12),
    deadline: daysFromNow(16),
  },
  {
    id: "auto-mechanic-accra-auto",
    title: "Auto Mechanic (Japanese & Korean Cars)",
    company: "Accra Auto Care",
    description:
      "Join a busy Kaneshie garage handling diagnostics, engine service and suspension work. Experience with Toyota, Hyundai and Kia models is essential; scanner experience is a strong plus.",
    requirements: [
      "3+ years hands-on mechanic experience",
      "Comfortable with OBD scanners",
      "Team player who documents work with photos",
    ],
    responsibilities: [
      "Diagnose and repair engine and suspension faults",
      "Photograph replaced parts for customer reports",
      "Keep the bay clean and tools accounted for",
    ],
    howToApply: "Walk-ins welcome on weekdays. Mention Ghana Help Hub at the front desk.",
    location: "Kaneshie, Accra",
    city: "Accra",
    type: "Full-time",
    salary: "GH₵3,000 – 4,500 / month",
    salaryMin: 3000,
    category: "Trades & Technical",
    postedAt: daysAgo(14),
    deadline: daysFromNow(9),
  },
];

export const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"] as const;

export const jobCategories = Array.from(new Set(jobs.map((j) => j.category))).sort((a, b) =>
  a.localeCompare(b)
);

export const jobCities = Array.from(new Set(jobs.map((j) => j.city))).sort((a, b) =>
  a.localeCompare(b)
);
