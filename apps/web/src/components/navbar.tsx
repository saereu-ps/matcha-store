'use client';

import { useAuth } from '@/lib/auth';
import { useCart } from '@/lib/cart';
import { Button, useTheme } from '@matcha/ui';
import { AuthModal } from './auth-modal';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CurrencySelector } from './currency-selector';


const NAV_LINKS = [
  { href: '/products', label: 'Collection' },
  { href: '/subscriptions', label: 'Subscribe' },
  { href: '/education', label: 'Learn' },
  { href: '/loyalty', label: 'Rewards' },
];

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-matcha-border bg-matcha-bg/80 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-display text-xl sm:text-2xl text-matcha-fg hover:text-matcha-accent transition-colors">
            Matchá
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm transition-colors relative',
                  pathname === link.href || pathname?.startsWith(link.href + '/')
                    ? 'text-matcha-accent font-medium'
                    : 'text-matcha-fg-muted hover:text-matcha-fg',
                )}
              >
                {link.label}
                {(pathname === link.href || pathname?.startsWith(link.href + '/')) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-matcha-accent"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency selector */}
            <CurrencySelector />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center text-matcha-fg-muted hover:text-matcha-fg hover:bg-matcha-bg-subtle transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? '◯' : '●'}
            </button>

            {/* Cart */}
            <Link href="/checkout" className="relative w-8 h-8 flex items-center justify-center text-matcha-fg-muted hover:text-matcha-fg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-matcha-accent text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                {itemCount}
              </span>
            </Link>

            {/* Sign In (desktop) */}
            <div className="hidden sm:block">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-matcha-fg-muted">{user?.name}</span>
                  <button onClick={logout} className="text-[10px] text-matcha-fg-subtle hover:text-matcha-warm transition-colors">Logout</button>
                </div>
              ) : (
                <Button variant="secondary" size="sm" onClick={() => setAuthOpen(true)}>Sign In</Button>
              )}
            </div>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Menu"
            >
              <motion.span
                className="w-5 h-[1.5px] bg-matcha-fg block"
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-5 h-[1.5px] bg-matcha-fg block"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.1 }}
              />
              <motion.span
                className="w-5 h-[1.5px] bg-matcha-fg block"
                animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-matcha-bg/90 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu content */}
            <motion.nav
              className="absolute top-14 left-0 right-0 bg-matcha-bg border-b border-matcha-border p-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={clsx(
                        'block py-3 px-4 rounded-lg text-lg transition-colors',
                        pathname === link.href || pathname?.startsWith(link.href + '/')
                          ? 'text-matcha-accent bg-matcha-accent/10 font-medium'
                          : 'text-matcha-fg hover:bg-matcha-bg-subtle',
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <hr className="border-matcha-border my-3" />
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-4 rounded-lg text-lg text-matcha-fg hover:bg-matcha-bg-subtle"
                  >
                    My Profile
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/orders"
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-4 rounded-lg text-lg text-matcha-fg hover:bg-matcha-bg-subtle"
                  >
                    Orders
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-3"
                >
                  <Button className="w-full" onClick={() => { setMobileOpen(false); isLoggedIn ? logout() : setAuthOpen(true); }}>
                    {isLoggedIn ? 'Logout' : 'Sign In'}
                  </Button>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
