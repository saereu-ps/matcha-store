'use client';

import { Badge, Card, FadeIn } from '@matcha/ui';
import Link from 'next/link';

const POSITIONS = [
  { id: 'barista-lead', title: 'Head Barista', location: 'Thonglor Branch', type: 'Full-time', salary: '25,000 - 35,000', dept: 'Operations', desc: 'Lead our matcha bar team, train new baristas, and ensure every cup meets our ceremonial standard.' },
  { id: 'tea-sommelier', title: 'Tea Sommelier', location: 'Siam Branch', type: 'Full-time', salary: '30,000 - 45,000', dept: 'Product', desc: 'Curate seasonal collections, lead tasting sessions, and educate customers on terroir and cultivars.' },
  { id: 'frontend-dev', title: 'Frontend Developer', location: 'Remote / HQ', type: 'Full-time', salary: '50,000 - 80,000', dept: 'Engineering', desc: 'Build immersive web experiences with Next.js, Framer Motion, and our custom design system.' },
  { id: 'backend-dev', title: 'Backend Engineer', location: 'Remote / HQ', type: 'Full-time', salary: '55,000 - 90,000', dept: 'Engineering', desc: 'Design and maintain microservices (TypeScript, PostgreSQL, Kafka) powering our subscription engine.' },
  { id: 'ux-designer', title: 'UX/UI Designer', location: 'Remote / HQ', type: 'Full-time', salary: '45,000 - 70,000', dept: 'Design', desc: 'Craft zen-inspired interfaces that feel as refined as our matcha. Figma, motion design, user research.' },
  { id: 'content-creator', title: 'Content Creator', location: 'Ari Branch', type: 'Part-time', salary: '18,000 - 25,000', dept: 'Marketing', desc: 'Create educational content about matcha culture — photos, videos, brewing guides, origin stories.' },
  { id: 'logistics-mgr', title: 'Logistics Manager', location: 'Warehouse (Bangna)', type: 'Full-time', salary: '35,000 - 50,000', dept: 'Operations', desc: 'Manage cold-chain supply from Japan, inventory forecasting, and same-day delivery operations.' },
  { id: 'barista-pt', title: 'Barista', location: 'All Branches', type: 'Part-time', salary: '13,000 - 18,000', dept: 'Operations', desc: 'Prepare matcha drinks with care. Training provided — passion for tea is all you need.' },
  { id: 'marketing-mgr', title: 'Marketing Manager', location: 'HQ (Ekkamai)', type: 'Full-time', salary: '45,000 - 65,000', dept: 'Marketing', desc: 'Drive brand growth through campaigns, partnerships, and community building around matcha culture.' },
  { id: 'cs-lead', title: 'Customer Service Lead', location: 'HQ (Ekkamai)', type: 'Full-time', salary: '28,000 - 38,000', dept: 'Support', desc: 'Lead our support team — handle subscription inquiries, delivery issues, and product consultations.' },
];

const DEPARTMENTS = ['All', 'Engineering', 'Operations', 'Design', 'Marketing', 'Product', 'Support'];

export default function CareersPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <FadeIn>
        <p className="text-matcha-accent text-xs uppercase tracking-wider mb-2">Join Our Team</p>
        <h1 className="font-display text-4xl sm:text-5xl text-matcha-fg mb-4">Careers at Matchá</h1>
        <p className="text-matcha-fg-muted text-sm sm:text-base max-w-2xl mb-10 leading-relaxed">
          We are building the future of matcha culture in Thailand. Join a team that values
          craftsmanship, attention to detail, and the pursuit of perfection in every cup.
        </p>
      </FadeIn>

      {/* Values */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-12">
          <Card className="text-center">
            <p className="font-display text-2xl text-matcha-accent mb-1">10+</p>
            <p className="text-[10px] sm:text-xs text-matcha-fg-muted">Open Positions</p>
          </Card>
          <Card className="text-center">
            <p className="font-display text-2xl text-matcha-accent mb-1">5</p>
            <p className="text-[10px] sm:text-xs text-matcha-fg-muted">Bangkok Branches</p>
          </Card>
          <Card className="text-center">
            <p className="font-display text-2xl text-matcha-accent mb-1">40+</p>
            <p className="text-[10px] sm:text-xs text-matcha-fg-muted">Team Members</p>
          </Card>
        </div>
      </FadeIn>

      {/* Positions */}
      <div className="space-y-3">
        {POSITIONS.map((pos, i) => (
          <FadeIn key={pos.id} delay={i * 0.03}>
            <Link href={`/careers/${pos.id}`}>
              <Card className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 group hover:border-matcha-accent/30 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-matcha-fg text-sm group-hover:text-matcha-accent transition-colors">{pos.title}</h3>
                    <Badge variant={pos.type === 'Full-time' ? 'ceremonial' : 'premium'}>{pos.type}</Badge>
                  </div>
                  <p className="text-matcha-fg-muted text-xs">{pos.location} · {pos.dept}</p>
                </div>
                <p className="text-matcha-fg text-xs font-display">฿{pos.salary}</p>
              </Card>
            </Link>
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
