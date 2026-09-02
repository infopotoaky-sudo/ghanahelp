import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Logo from "./Logo";

const explore = [
  { label: "Find Help", to: "/find-help" },
  { label: "Jobs", to: "/jobs" },
  { label: "Businesses", to: "/businesses" },
  { label: "Opportunities", to: "/opportunities" },
  { label: "Lost & Found", to: "/lost-found" },
];

const forBusinesses = [
  { label: "List Your Business", to: "/businesses#list-my-business" },
  { label: "Business Benefits", to: "/about" },
];

const company = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/contact" },
  { label: "Terms", to: "/contact" },
];

const socials = [
  { label: "Facebook", icon: Facebook },
  { label: "Instagram", icon: Instagram },
  { label: "Twitter", icon: Twitter },
  { label: "YouTube", icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="kente h-1.5 w-full" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-14 sm:px-6 md:pb-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              Whatever you need in Ghana, start here. Find it. Ask for it. Get connected.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="/contact"
                  aria-label={`${label} (coming soon)`}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-800 text-ink-300 transition-all duration-200 hover:bg-brand-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Explore" links={explore} />
          <FooterCol title="For Businesses" links={forBusinesses} />
          <FooterCol title="Company" links={company} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-6 sm:flex-row">
          <p className="text-xs text-ink-500">© 2026 Ghana Help Hub. All rights reserved.</p>
          <p className="max-w-md text-center text-xs leading-relaxed text-ink-500 sm:text-right">
            Listings shown on this demo are fictional sample data. Verification badges mark
            verified profiles — not a guarantee of service.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.12em] text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-sm text-ink-400 transition-colors hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
