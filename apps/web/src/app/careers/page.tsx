'use client';

import { Badge, Card, FadeIn } from '@matcha/ui';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const POSITIONS = [
  { id: 'barista-lead', title: 'Head Barista', location: 'Thonglor', type: 'Full-time', salary: '35,000 - 55,000', dept: 'Operations', urgent: true, desc: 'Lead our matcha bar team and craft ceremonial-grade experiences daily.' },
  { id: 'tea-sommelier', title: 'Tea Sommelier', location: 'Siam', type: 'Full-time', salary: '50,000 - 75,000', dept: 'Product', urgent: false, desc: 'Curate seasonal collections and lead tasting sessions for connoisseurs.' },
  { id: 'frontend-dev', title: 'Senior Frontend Developer', location: 'Remote', type: 'Full-time', salary: '80,000 - 130,000', dept: 'Engineering', urgent: true, desc: 'Build immersive experiences with Next.js, Framer Motion, Three.js.' },
  { id: 'backend-dev', title: 'Backend Engineer', location: 'Remote', type: 'Full-time', salary: '85,000 - 140,000', dept: 'Engineering', urgent: false, desc: 'Design microservices (TypeScript, Kafka, PostgreSQL) powering subscriptions.' },
  { id: 'ux-designer', title: 'Lead UX/UI Designer', location: 'Remote / HQ', type: 'Full-time', salary: '70,000 - 110,000', dept: 'Design', urgent: true, desc: 'Craft zen-inspired interfaces. Motion design, user research, design systems.' },
  { id: 'content-creator', title: 'Content & Brand Strategist', location: 'Ari', type: 'Full-time', salary: '45,000 - 70,000', dept: 'Marketing', urgent: false, desc: 'Shape our brand voice through matcha education content and campaigns.' },
  { id: 'logistics-mgr', title: 'Supply Chain Director', location: 'Bangna', type: 'Full-time', salary: '80,000 - 120,000', dept: 'Operations', urgent: false, desc: 'Manage cold-chain supply from Japan and same-day delivery logistics.' },
  { id: 'barista-pt', title: 'Barista', location: 'All Branches', type: 'Part-time', salary: '18,000 - 25,000', dept: 'Operations', urgent: false, desc: 'Prepare matcha with intention. Full training provided — bring your passion.' },
  { id: 'marketing-dir', title: 'Marketing Director', location: 'HQ (Ekkamai)', type: 'Full-time', salary: '90,000 - 150,000', dept: 'Marketing', urgent: true, desc: 'Drive growth strategy — brand, partnerships, community, digital.' },
  { id: 'data-engineer', title: 'Data Engineer (AI/ML)', location: 'Remote', type: 'Full-time', salary: '90,000 - 150,000', dept: 'Engineering', urgent: false, desc: 'Build recommendation engine and taste-profile ML pipeline.' },
];

const DEPTS = ['All', 'Engineering', 'Operations', 'Design', 'Marketing', 'Product'];

export default function CareersPage() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? POSITIONS : POSITIONS.filter(p => p.dept === filter);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Hero */}
      <FadeIn>
        <div className="text-center mb-12 sm:mb-16">
          <motion.p
            className="text-matcha-accent text-xs uppercase tracking-[0.2em] mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            We are hiring
          </motion.p>
          <h1 className="font-display text-4xl sm:text-6xl text-matcha-fg mb-4">
            Build the Future of<br />Matcha Culture
          </h1>
          <p className="text-matcha-fg-muted text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Join a team obsessed with craftsmanship, design, and the pursuit of the perfect cup.
            Remote-first. Japan trips. Free matcha forever.
          </p>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-4 gap-3 mb-12">
          <div className="text-center p-3 sm:p-4 rounded-xl bg-matcha-bg-subtle border border-matcha-border">
            <p className="font-display text-2xl sm:text-3xl text-matcha-accent">10</p>
            <p className="text-[9px] sm:text-xs text-matcha-fg-muted mt-0.5">Open Roles</p>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl bg-matcha-bg-subtle border border-matcha-border">
            <p className="font-display text-2xl sm:text-3xl text-matcha-accent">5</p>
            <p className="text-[9px] sm:text-xs text-matcha-fg-muted mt-0.5">Branches</p>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl bg-matcha-bg-subtle border border-matcha-border">
            <p className="font-display text-2xl sm:text-3xl text-matcha-accent">40+</p>
            <p className="text-[9px] sm:text-xs text-matcha-fg-muted mt-0.5">Team</p>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl bg-matcha-bg-subtle border border-matcha-border">
            <p className="font-display text-2xl sm:text-3xl text-matcha-accent">2x</p>
            <p className="text-[9px] sm:text-xs text-matcha-fg-muted mt-0.5">YoY Growth</p>
          </div>
        </div>
      </FadeIn>

      {/* Perks */}
      <FadeIn delay={0.15}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {[
            { title: 'Remote-first', desc: 'Work from anywhere' },
            { title: 'Japan trips', desc: 'Annual farm visit' },
            { title: 'Free matcha', desc: 'Unlimited daily' },
            { title: 'Health + dental', desc: 'Full coverage' },
          ].map(p => (
            <div key={p.title} className="p-3 rounded-lg border border-matcha-accent/15 bg-matcha-accent/5">
              <p className="text-xs font-medium text-matcha-fg">{p.title}</p>
              <p className="text-[10px] text-matcha-fg-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {DEPTS.map(d => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={`px-3 py-1.5 text-xs rounded-full transition-all ${
              filter === d ? 'bg-matcha-accent text-white' : 'bg-matcha-bg-muted text-matcha-fg-muted hover:text-matcha-fg border border-matcha-border'
            }`}
          >
            {d} {d !== 'All' && <span className="opacity-60">({POSITIONS.filter(p => p.dept === d).length})</span>}
          </button>
        ))}
      </div>

      {/* Positions */}
      <div className="space-y-3">
        {filtered.map((pos, i) => (
          <FadeIn key={pos.id} delay={i * 0.03}>
            <Link href={`/careers/${pos.id}`}>
              <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card className="group hover:border-matcha-accent/30 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-medium text-matcha-fg text-sm group-hover:text-matcha-accent transition-colors">{pos.title}</h3>
                        {pos.urgent && <span className="text-[9px] px-1.5 py-0.5 bg-matcha-warm/10 text-matcha-warm rounded-full border border-matcha-warm/20">Urgent</span>}
                        <Badge variant={pos.type === 'Full-time' ? 'ceremonial' : 'premium'}>{pos.type}</Badge>
                      </div>
                      <p className="text-matcha-fg-muted text-[11px] sm:text-xs mb-1">{pos.desc}</p>
                      <p className="text-matcha-fg-subtle text-[10px]">{pos.location} · {pos.dept}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-display text-sm text-matcha-fg">฿{pos.salary}</p>
                      <p className="text-[9px] text-matcha-fg-subtle">/month</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
