import { Badge, Card, FadeIn } from '@matcha/ui';

const TIERS = [
  { name: 'Novice', points: '0', icon: '初', benefits: ['Standard shipping', 'Basic rewards catalog'], current: false },
  { name: 'Enthusiast', points: '500', icon: '葉', benefits: ['Free shipping', '5% bonus points', 'Birthday surprise'], current: true },
  { name: 'Connoisseur', points: '2,000', icon: '茂', benefits: ['Early access (48h)', 'Exclusive products', '10% bonus', 'Priority support'], current: false },
  { name: 'Master', points: '5,000', icon: '竹', benefits: ['All above', 'Free express shipping', 'Annual exclusive blend', 'Personal curator'], current: false },
];

const ACHIEVEMENTS = [
  { name: 'First Brew', desc: 'Complete your first brewing guide', earned: true, icon: '茶' },
  { name: 'Origin Explorer', desc: 'Try matcha from all 5 regions', progress: '2/5', earned: false, icon: '図' },
  { name: 'Dedicated Drinker', desc: 'Place 10 orders', progress: '3/10', earned: false, icon: '冠' },
  { name: 'First Voice', desc: 'Write your first review', earned: true, icon: '言' },
  { name: 'Streak Master', desc: '6 months uninterrupted subscription', progress: '2/6', earned: false, icon: '炎' },
];

export default function LoyaltyPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <FadeIn>
        <h1 className="font-display text-5xl md:text-6xl text-matcha-fg mb-4">Loyalty & Rewards</h1>
        <p className="text-matcha-fg-muted text-lg mb-12">
          Earn points on every purchase. Unlock exclusive access as you progress through tiers.
        </p>
      </FadeIn>

      {/* Current Status */}
      <FadeIn delay={0.1}>
        <Card className="mb-12 text-center py-8">
          <p className="text-matcha-fg-muted text-sm mb-2">Your Balance</p>
          <p className="font-display text-5xl text-matcha-accent mb-2">847</p>
          <p className="text-matcha-fg-muted text-sm mb-4">points</p>
          <Badge variant="tier">Enthusiast</Badge>
          <div className="mt-4 max-w-md mx-auto">
            <div className="flex justify-between text-xs text-matcha-fg-muted mb-1">
              <span>847 pts</span>
              <span>2,000 pts (Connoisseur)</span>
            </div>
            <div className="h-2 bg-matcha-bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-matcha-accent rounded-full" style={{ width: '42%' }} />
            </div>
          </div>
        </Card>
      </FadeIn>

      {/* Tiers */}
      <section className="mb-16">
        <FadeIn><h2 className="font-display text-3xl text-matcha-fg mb-8">Tiers</h2></FadeIn>
        <div className="grid md:grid-cols-4 gap-4">
          {TIERS.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.05}>
              <Card className={`text-center ${tier.current ? 'border-matcha-accent ring-1 ring-matcha-accent' : ''}`}>
                <span className="text-4xl block mb-3">{tier.icon}</span>
                <h3 className="font-medium text-matcha-fg mb-1">{tier.name}</h3>
                <p className="text-matcha-accent text-sm mb-3">{tier.points} pts</p>
                <ul className="text-xs text-matcha-fg-muted space-y-1">
                  {tier.benefits.map(b => <li key={b}>✓ {b}</li>)}
                </ul>
                {tier.current && <Badge variant="tier" className="mt-3">Current</Badge>}
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section>
        <FadeIn><h2 className="font-display text-3xl text-matcha-fg mb-8">Achievements</h2></FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((a, i) => (
            <FadeIn key={a.name} delay={i * 0.05}>
              <Card className={`flex items-center gap-4 ${a.earned ? '' : 'opacity-60'}`}>
                <span className="text-3xl">{a.icon}</span>
                <div className="flex-1">
                  <h3 className="font-medium text-matcha-fg text-sm">{a.name}</h3>
                  <p className="text-matcha-fg-subtle text-xs">{a.desc}</p>
                  {a.progress && <p className="text-matcha-accent text-xs mt-1">{a.progress}</p>}
                </div>
                {a.earned && <Badge variant="ceremonial">✓</Badge>}
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
