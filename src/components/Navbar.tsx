import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Megaphone, Store } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import { cn } from "../lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/find-help", label: "Find Help" },
  { to: "/jobs", label: "Jobs" },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/lost-found", label: "Lost & Found" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-ink-100 bg-white/85 shadow-sm backdrop-blur-md"
            : "border-transparent bg-white/60 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <Button to="/businesses#list-my-business" variant="outline" size="sm">
              <Store className="h-4 w-4" aria-hidden="true" />
              List My Business
            </Button>
            <Button to="/post-request" variant="gold" size="sm">
              <Megaphone className="h-4 w-4" aria-hidden="true" />
              I Need Something
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="rounded-xl p-2 text-ink-700 transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="kente h-0.5 w-full opacity-70" aria-hidden="true" />
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
          className="absolute inset-0 bg-ink-900/50 backdrop-blur-[2px]"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className={cn(
            "absolute inset-y-0 right-0 flex w-[85%] max-w-xs flex-col bg-white shadow-lift transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              tabIndex={open ? 0 : -1}
              className="rounded-xl p-2 text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    tabIndex={open ? 0 : -1}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                        isActive
                          ? "bg-brand-50 text-brand-700"
                          : "text-ink-700 hover:bg-ink-50"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/about"
                  tabIndex={open ? 0 : -1}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                      isActive ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-ink-50"
                    )
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  tabIndex={open ? 0 : -1}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                      isActive ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-ink-50"
                    )
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="space-y-2.5 border-t border-ink-100 p-4">
            <Button to="/post-request" variant="gold" fullWidth tabIndex={open ? 0 : -1}>
              <Megaphone className="h-4 w-4" aria-hidden="true" />
              I Need Something
            </Button>
            <Button to="/businesses#list-my-business" variant="primary" fullWidth tabIndex={open ? 0 : -1}>
              <Store className="h-4 w-4" aria-hidden="true" />
              List My Business
            </Button>
            <p className="pt-1 text-center text-[11px] font-medium text-ink-400">
              Whatever you need in Ghana, start here.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
