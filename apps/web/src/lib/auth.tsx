'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  tier: string;
  points: number;
  avatar?: string;
}

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Mock user database
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'demo@matcha.co': {
    password: 'matcha123',
    user: { id: '1', name: 'Kenji', email: 'demo@matcha.co', tier: 'Enthusiast', points: 847 },
  },
  'admin@matcha.co': {
    password: 'admin123',
    user: { id: '2', name: 'Yuki', email: 'admin@matcha.co', tier: 'Master', points: 5200 },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('matcha-user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));

    const entry = MOCK_USERS[email.toLowerCase()];
    if (!entry) return { success: false, error: 'Account not found' };
    if (entry.password !== password) return { success: false, error: 'Incorrect password' };

    setUser(entry.user);
    localStorage.setItem('matcha-user', JSON.stringify(entry.user));
    return { success: true };
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    await new Promise(r => setTimeout(r, 800));

    if (MOCK_USERS[email.toLowerCase()]) {
      return { success: false, error: 'Email already registered' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    const newUser: User = { id: Date.now().toString(), name, email, tier: 'Novice', points: 0 };
    MOCK_USERS[email.toLowerCase()] = { password, user: newUser };
    setUser(newUser);
    localStorage.setItem('matcha-user', JSON.stringify(newUser));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('matcha-user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
