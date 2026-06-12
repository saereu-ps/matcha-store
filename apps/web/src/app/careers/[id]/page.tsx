import { Badge, Button, Card, FadeIn } from '@matcha/ui';
import Link from 'next/link';

export default function CareerDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <FadeIn>
        <nav className="text-xs text-matcha-fg-muted mb-6">
          <Link href="/careers" className="hover:text-matcha-accent">Careers</Link>
          <span className="mx-2">/</span>
          <span className="text-matcha-fg">Position Details</span>
        </nav>
        <Badge variant="ceremonial" className="mb-3">Full-time</Badge>
        <h1 className="font-display text-3xl sm:text-4xl text-matcha-fg mb-2">Position Details</h1>
        <p className="text-matcha-fg-muted text-sm mb-8">Bangkok, Thailand</p>

        <Card className="mb-6">
          <h2 className="font-medium text-matcha-fg mb-3">About the Role</h2>
          <p className="text-matcha-fg-muted text-sm leading-relaxed mb-4">
            We are looking for passionate individuals who share our love for matcha and craftsmanship.
            This role involves working closely with our team to deliver exceptional experiences to our customers.
          </p>
          <h2 className="font-medium text-matcha-fg mb-3">Requirements</h2>
          <ul className="text-matcha-fg-muted text-sm space-y-1.5 mb-4 list-disc list-inside">
            <li>Passion for Japanese tea culture</li>
            <li>Strong attention to detail</li>
            <li>Team player with positive attitude</li>
            <li>Excellent communication skills</li>
          </ul>
          <h2 className="font-medium text-matcha-fg mb-3">Benefits</h2>
          <ul className="text-matcha-fg-muted text-sm space-y-1.5 list-disc list-inside">
            <li>Free matcha every day</li>
            <li>Health insurance</li>
            <li>Flexible hours (for eligible roles)</li>
            <li>Annual trip to Japan tea farms</li>
            <li>Staff discount 40%</li>
          </ul>
        </Card>

        <Button size="lg" className="w-full">Apply Now</Button>
        <p className="text-matcha-fg-subtle text-[10px] text-center mt-3">Send CV to careers@matcha.co</p>
      </FadeIn>
    </main>
  );
}
