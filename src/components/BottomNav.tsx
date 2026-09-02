import { NavLink, Link, useLocation } from "react-router-dom";
import { Home, Compass, Briefcase, Menu, Megaphone } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

const tabs = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/find-help", label: "Find Help", icon: Compass },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
];

/** Fixed bottom navigation for mobile — hidden on md+. */
export default function BottomNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const close = () => setMenuOpen(false);

  const menuLinks = [
    { to: "/opportunities", label: "Opportunities" },
    { to: "/lost-found", label: "Lost & Found" },
    { to: "/businesses", label: "Businesses" },
    { to: "/post-request", label: "Post a Request" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {menuOpen && (
        <button
          type="button"
          aria-label="Close quick menu"
          onClick={close}
          className="fixed inset-0 z-[55] bg-ink-900/50 backdrop-blur-[2px] md:hidden"
        />
      )}
      {menuOpen && (
        <nav
          aria-label="Quick menu"
          className="animate-pop fixed inset-x-3 bottom-20 z-[56] rounded-2xl bg-white p-2 shadow-lift ring-1 ring-ink-100 md:hidden"
        >
          <ul className="grid grid-cols-2 gap-1">
            {menuLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={close}
                  className="block rounded-xl px-3.5 py-3 text-sm font-semibold text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <nav
        aria-label="Bottom navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-100 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-5 items-end">
          {tabs.slice(0, 2).map((tab) => (
            <Tab key={tab.to} {...tab} />
          ))}

          <div className="relative flex justify-center">
            <Link
              to="/post-request"
              aria-label="I need something — post a request"
              className="absolute -top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400 text-ink-900 shadow-lift ring-4 ring-canvas transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Megaphone className="h-6 w-6" aria-hidden="true" />
            </Link>
            <span
              className={cn(
                "pointer-events-none pt-1.5 pb-2 text-[10px] font-bold",
                location.pathname === "/post-request" ? "text-brand-700" : "text-ink-500"
              )}
            >
              I Need
            </span>
          </div>

          <Tab {...tabs[2]} />
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Open quick menu"
            className="flex flex-col items-center gap-1 pt-1.5 pb-2 text-[10px] font-bold text-ink-500 transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
            Menu
          </button>
        </div>
      </nav>
    </>
  );
}

function Tab({ to, label, icon: Icon, end }: { to: string; label: string; icon: typeof Home; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center gap-1 pt-1.5 pb-2 text-[10px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg",
          isActive ? "text-brand-700" : "text-ink-500 hover:text-brand-700"
        )
      }
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      {label}
    </NavLink>
  );
}
