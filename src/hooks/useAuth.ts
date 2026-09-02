import { useEffect, useState } from "react";

/**
 * Frontend-only demo auth. The session lives in localStorage on this device —
 * no passwords are stored and nothing leaves the browser. Swap this hook's
 * internals for Supabase Auth later; the call sites stay the same.
 */
export interface AuthUser {
  id: string;
  name: string;
  contact: string;
  createdAt: string;
}

const SESSION_KEY = "ghh:session";
const EVT = "ghh:auth-changed";

function readSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function notify() {
  window.dispatchEvent(new Event(EVT));
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(readSession);

  useEffect(() => {
    const sync = () => setUser(readSession());
    window.addEventListener(EVT, sync);
    return () => window.removeEventListener(EVT, sync);
  }, []);

  const login = (input: { name: string; contact: string }) => {
    const next: AuthUser = {
      id: `usr_${Math.random().toString(36).slice(2, 9)}`,
      name: input.name,
      contact: input.contact,
      createdAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — session stays in memory */
    }
    notify();
    return next;
  };

  const logout = () => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* noop */
    }
    notify();
  };

  return {
    user,
    firstName: user ? (user.name.split(" ")[0] ?? null) : null,
    initials: user
      ? user.name
          .split(" ")
          .filter(Boolean)
          .map((p) => p[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "",
    login,
    logout,
  };
}
