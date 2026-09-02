import { useEffect, useState } from "react";

/**
 * Demo auth state — lives only in this browser (localStorage) and syncs
 * across components via a custom event. Real accounts (OTP, Supabase
 * auth, MoMo-linked profiles) arrive in Phase 2; this hook is the swap point.
 */
export interface AuthUser {
  name: string;
  firstName: string;
  contact: string; // email or phone
  joinedAt: string;
}

const KEY = "ghh:user";
const EVT = "ghh:user-changed";

function read(): AuthUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(read);

  useEffect(() => {
    const sync = () => setUser(read());
    window.addEventListener(EVT, sync);
    return () => window.removeEventListener(EVT, sync);
  }, []);

  const login = (u: AuthUser) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(u));
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new Event(EVT));
  };

  const logout = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new Event(EVT));
  };

  return { user, login, logout, firstName: user?.firstName ?? null };
}
