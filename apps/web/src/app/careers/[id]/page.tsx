'use client';

import { Badge, Button, Card, FadeIn } from '@matcha/ui';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function CareerApplyPage({ params }: { params: { id: string } }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append('access_key', 'YOUR_WEB3FORMS_KEY'); // Replace with real key
    data.append('subject', `Job Application: ${params.id} — Matchá Careers`);
    data.append('from_name', 'Matchá Careers Form');

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      setSubmitted(true);
    } catch {
      alert('Failed to send. Please try again or email directly to Pilan.s112@gmail.com');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-matcha-accent/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-matcha-accent" viewBox="0 0 24 24" fill="none">
              <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="font-display text-3xl text-matcha-fg mb-3">Application Sent</h1>
          <p className="text-matcha-fg-muted text-sm mb-6">Thank you for your interest in joining Matchá. We will review your application and get back to you within 5 business days.</p>
          <Link href="/careers"><Button variant="secondary">Back to Careers</Button></Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <FadeIn>
        <nav className="text-xs text-matcha-fg-muted mb-6">
          <Link href="/careers" className="hover:text-matcha-accent">Careers</Link>
          <span className="mx-2">/</span>
          <span className="text-matcha-fg">Apply</span>
        </nav>

        <div className="mb-8">
          <Badge variant="ceremonial" className="mb-3">Open Position</Badge>
          <h1 className="font-display text-3xl sm:text-4xl text-matcha-fg mb-2">Apply for this Role</h1>
          <p className="text-matcha-fg-muted text-sm">Position ID: {params.id}</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="to" value="Pilan.s112@gmail.com" />
            <input type="hidden" name="position" value={params.id} />

            {/* Personal Info */}
            <div>
              <p className="text-xs font-medium text-matcha-fg mb-3 uppercase tracking-wider">Personal Information</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Full Name *</label>
                  <input name="name" type="text" required placeholder="Your full name" className="w-full px-3 py-2.5 text-sm bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
                </div>
                <div>
                  <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Email *</label>
                  <input name="email" type="email" required placeholder="your@email.com" className="w-full px-3 py-2.5 text-sm bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Phone *</label>
                <input name="phone" type="tel" required placeholder="08X-XXX-XXXX" className="w-full px-3 py-2.5 text-sm bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
              </div>
              <div>
                <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Expected Salary</label>
                <input name="expected_salary" type="text" placeholder="e.g. 80,000 THB" className="w-full px-3 py-2.5 text-sm bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
              </div>
            </div>

            {/* Professional */}
            <div>
              <p className="text-xs font-medium text-matcha-fg mb-3 uppercase tracking-wider pt-2">Professional Background</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">LinkedIn Profile</label>
                  <input name="linkedin" type="url" placeholder="https://linkedin.com/in/..." className="w-full px-3 py-2.5 text-sm bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
                </div>
                <div>
                  <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Portfolio / Website</label>
                  <input name="portfolio" type="url" placeholder="https://..." className="w-full px-3 py-2.5 text-sm bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Years of Experience *</label>
              <select name="experience" required className="w-full px-3 py-2.5 text-sm bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring">
                <option value="">Select...</option>
                <option value="0-1">0 - 1 year</option>
                <option value="1-3">1 - 3 years</option>
                <option value="3-5">3 - 5 years</option>
                <option value="5-10">5 - 10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Why do you want to join Matchá? *</label>
              <textarea name="motivation" required rows={4} placeholder="Tell us about your passion, relevant experience, and what excites you about this role..." className="w-full px-3 py-2.5 text-sm bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring resize-none" />
            </div>

            <div>
              <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Anything else?</label>
              <textarea name="notes" rows={2} placeholder="Availability, questions, portfolio links..." className="w-full px-3 py-2.5 text-sm bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring resize-none" />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-matcha-accent text-white text-sm font-medium rounded-lg hover:bg-matcha-accent-dark transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Submit Application'}
              </button>
              <p className="text-[10px] text-matcha-fg-subtle text-center mt-2">
                Your application will be sent to our hiring team. We respond within 5 business days.
              </p>
            </div>
          </form>
        </Card>
      </FadeIn>
    </main>
  );
}
