import { MatchaBowlIllustration } from '@/components/illustrations/matcha-bowl';
import { Badge, Card, FadeIn } from '@matcha/ui';

const BRANCHES = [
  { id: 'thonglor', name: 'Matchá Thonglor', address: 'Sukhumvit 55 (Thonglor), Soi 13, Wattana, Bangkok 10110', hours: '08:00 - 21:00', phone: '02-xxx-1234', features: ['Matcha Bar', 'Tasting Room', 'Workshop Space'], flagship: true },
  { id: 'siam', name: 'Matchá Siam', address: 'Siam Square One, 3rd Floor, Pathum Wan, Bangkok 10330', hours: '10:00 - 22:00', phone: '02-xxx-5678', features: ['Matcha Bar', 'Gift Corner'], flagship: false },
  { id: 'ari', name: 'Matchá Ari', address: 'Phaholyothin 7, Soi Ari, Phaya Thai, Bangkok 10400', hours: '07:30 - 20:00', phone: '02-xxx-9012', features: ['Matcha Bar', 'Quiet Reading Corner', 'Garden Seating'], flagship: false },
  { id: 'ekkamai', name: 'Matchá HQ & Lab', address: 'Sukhumvit 63 (Ekkamai), Soi 10, Wattana, Bangkok 10110', hours: '09:00 - 18:00 (Office) / 08:00 - 20:00 (Cafe)', phone: '02-xxx-3456', features: ['HQ Office', 'R&D Lab', 'Staff Cafe', 'Rooftop Tea Garden'], flagship: true },
  { id: 'sathorn', name: 'Matchá Sathorn', address: 'Narathiwas 15, Silom, Bangrak, Bangkok 10500', hours: '07:00 - 19:00', phone: '02-xxx-7890', features: ['Express Bar', 'Office Delivery Hub'], flagship: false },
];

export default function BranchesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <FadeIn>
        <p className="text-matcha-accent text-xs uppercase tracking-wider mb-2">Visit Us</p>
        <h1 className="font-display text-4xl sm:text-5xl text-matcha-fg mb-4">Our Branches</h1>
        <p className="text-matcha-fg-muted text-sm sm:text-base max-w-2xl mb-10">
          5 locations across Bangkok — each designed as a zen space for matcha lovers.
        </p>
      </FadeIn>

      <div className="space-y-4">
        {BRANCHES.map((branch, i) => (
          <FadeIn key={branch.id} delay={i * 0.05}>
            <Card className="flex flex-col sm:flex-row gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg bg-matcha-bg-subtle flex items-center justify-center">
                <MatchaBowlIllustration className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-matcha-fg text-sm sm:text-base">{branch.name}</h3>
                  {branch.flagship && <Badge variant="ceremonial">Flagship</Badge>}
                </div>
                <p className="text-matcha-fg-muted text-xs mb-2">{branch.address}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-matcha-fg-subtle">
                  <span>Hours: {branch.hours}</span>
                  <span>Tel: {branch.phone}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {branch.features.map(f => (
                    <span key={f} className="text-[10px] px-2 py-0.5 bg-matcha-accent/8 text-matcha-accent rounded-full border border-matcha-accent/15">{f}</span>
                  ))}
                </div>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
