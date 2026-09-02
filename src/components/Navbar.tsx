import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Megaphone, Store, Heart, ChevronDown, LogOut, LogIn, UserPlus } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import SavedModal from "./SavedModal";
import AuthModal from "./AuthModal";
import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../hooks/useAuth";
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
  const [savedOpen, setSavedOpen] = useState(false);
  const [authMode, setAuthMode] = useState<null | "signin" | "signup">(null);
  const { count } = useFavorites();
  const { user, logout } = useAuth();
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
            <SavedButton count={count} onOpen={() => setSavedOpen(true)} />
            {user ? (
              <UserMenu name={user.name} onLogout={logout} onOpenSaved={() => setSavedOpen(true)} />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setAuthMode("signin")}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-ink-600 transition-colors hover:bg-ink-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Log in
                </button>
                <Button to="/businesses#list-my-business" variant="outline" size="sm">
                  <Store className="h-4 w-4" aria-hidden="true" />
                  List My Business
                </Button>
                <Button onClick={() => setAuthMode("signup")} variant="primary" size="sm">
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  Sign up free
                </Button>
              </>
            )}
            <Button to="/post-request" variant="gold" size="sm">
              <Megaphone className="h-4 w-4" aria-hidden="true" />
              I Need Something
            </Button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <SavedButton count={count} onOpen={() => setSavedOpen(true)} />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="rounded-xl p-2 text-ink-700 transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
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
              <li>
                <NavLink
                  to="/how-we-earn"
                  tabIndex={open ? 0 : -1}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                      isActive ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-ink-50"
                    )
                  }
                >
                  How GHH Earns
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="space-y-2.5 border-t border-ink-100 p-4">
            {user ? (
              <div className="flex items-center justify-between gap-3 rounded-xl bg-canvas px-3.5 py-3 ring-1 ring-inset ring-ink-200">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Avatar name={user.name} />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-ink-900">{user.name}</span>
                    <span className="block truncate text-[11px] font-medium text-ink-400">{user.contact}</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="shrink-0 rounded-lg p-2 text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  aria-label="Log out"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <Button variant="outline" tabIndex={open ? 0 : -1} onClick={() => { setOpen(false); setAuthMode("signin"); }}>
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                  Log in
                </Button>
                <Button variant="primary" tabIndex={open ? 0 : -1} onClick={() => { setOpen(false); setAuthMode("signup"); }}>
                  <UserPlus className="h-4 w-4" aria-hidden="true" />
                  Sign up
                </Button>
              </div>
            )}
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

      <SavedModal open={savedOpen} onClose={() => setSavedOpen(false)} />
      <AuthModal open={authMode !== null} initialMode={authMode ?? "signin"} onClose={() => setAuthMode(null)} />
    </>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-extrabold text-white ring-2 ring-brand-200">
      {name.trim().charAt(0).toUpperCase() || "G"}
    </span>
  );
}

function UserMenu({
  name,
  onLogout,
  onOpenSaved,
}: {
  name: string;
  onLogout: () => void;
  onOpenSaved: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-expanded={menuOpen}
        aria-label={`Account menu for ${name}`}
        className="flex items-center gap-2 rounded-xl py-1.5 pr-2.5 pl-1.5 transition-colors hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <Avatar name={name} />
        <ChevronDown
          className={cn("h-4 w-4 text-ink-400 transition-transform duration-200", menuOpen && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {menuOpen && (
        <div className="animate-pop absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-ink-100 bg-white p-1.5 shadow-lift">
          <div className="border-b border-ink-100 px-3 py-2.5">
            <p className="text-sm font-bold text-ink-900">{name}</p>
            <p className="text-[11px] font-semibold text-ink-400">Demo session · on this device</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenSaved();
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-ink-700 transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <Heart className="h-4 w-4 text-red-400" aria-hidden="true" />
            Saved items
          </button>
          <Link
            to="/post-request"
            onClick={() => setMenuOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <Megaphone className="h-4 w-4 text-gold-600" aria-hidden="true" />
            Post a request
          </Link>
          <Link
            to="/pricing"
            onClick={() => setMenuOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <Store className="h-4 w-4 text-brand-600" aria-hidden="true" />
            Business plans
          </Link>
          <div className="my-1 border-t border-ink-100" />
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onLogout();
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

function SavedButton({ count, onOpen }: { count: number; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Saved items (${count})`}
      className="relative rounded-xl p-2 text-ink-700 transition-colors hover:bg-ink-50 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <Heart className="h-5.5 w-5.5" aria-hidden="true" />
      {count > 0 && (
        <span
          key={count}
          className="animate-pop absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-extrabold text-white ring-2 ring-white"
        >
          {count}
        </span>
      )}
    </button>
  );
}
