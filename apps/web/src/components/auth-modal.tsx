'use client';

import { useAuth } from '@/lib/auth';
import { Badge, Button } from '@matcha/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = mode === 'login'
      ? await login(email, password)
      : await register(name, email, password);

    setLoading(false);
    if (result.success) {
      onClose();
      setEmail(''); setPassword(''); setName('');
    } else {
      setError(result.error || 'Something went wrong');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-matcha-fg/20 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm bg-matcha-bg border border-matcha-border rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Top accent */}
            <div className="h-[2px] bg-gradient-to-r from-matcha-accent/30 via-matcha-accent to-matcha-accent/30" />

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <p className="font-display text-2xl text-matcha-fg mb-1">
                  {mode === 'login' ? 'Welcome back' : 'Join Matchá'}
                </p>
                <p className="text-matcha-fg-muted text-xs">
                  {mode === 'login' ? 'Sign in to your account' : 'Create an account to start your matcha journey'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {mode === 'register' && (
                  <div>
                    <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full px-3 py-2.5 text-sm bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring transition-all"
                    />
                  </div>
                )}
                <div>
                  <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-3 py-2.5 text-sm bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={mode === 'login' ? 'Your password' : 'Min 6 characters'}
                    required
                    className="w-full px-3 py-2.5 text-sm bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring transition-all"
                  />
                </div>

                {/* Error */}
                {error && (
                  <motion.p
                    className="text-xs text-matcha-warm bg-matcha-warm-subtle p-2 rounded-lg"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.p>
                )}

                <Button className="w-full" size="lg" type="submit" disabled={loading}>
                  {loading ? (
                    <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>
                      {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                    </motion.span>
                  ) : (
                    mode === 'login' ? 'Sign In' : 'Create Account'
                  )}
                </Button>
              </form>

              {/* Toggle mode */}
              <div className="mt-5 text-center">
                <p className="text-xs text-matcha-fg-muted">
                  {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                  {' '}
                  <button
                    onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                    className="text-matcha-accent font-medium hover:underline"
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>

              {/* Demo credentials hint */}
              {mode === 'login' && (
                <div className="mt-4 p-2.5 bg-matcha-bg-subtle rounded-lg border border-matcha-border/50">
                  <p className="text-[10px] text-matcha-fg-subtle mb-1.5">Demo accounts:</p>
                  <div className="space-y-1">
                    <button
                      onClick={() => { setEmail('demo@matcha.co'); setPassword('matcha123'); }}
                      className="text-[10px] text-matcha-fg-muted hover:text-matcha-accent transition-colors block"
                    >
                      demo@matcha.co / matcha123 <Badge variant="tier" className="ml-1">Enthusiast</Badge>
                    </button>
                    <button
                      onClick={() => { setEmail('admin@matcha.co'); setPassword('admin123'); }}
                      className="text-[10px] text-matcha-fg-muted hover:text-matcha-accent transition-colors block"
                    >
                      admin@matcha.co / admin123 <Badge variant="ceremonial" className="ml-1">Master</Badge>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
