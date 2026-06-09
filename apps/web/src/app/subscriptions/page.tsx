import { Badge, Button, Card, FadeIn } from '@matcha/ui';

const PLANS = [
  { name: 'Explorer', price: '$28', frequency: 'Monthly', description: 'A different premium matcha every month', features: ['1 × 30g premium matcha', 'Tasting notes card', 'Brewing guide', 'Free shipping'] },
  { name: 'Enthusiast', price: '$42', frequency: 'Bi-weekly', description: 'Your favorite ceremonial grade, on repeat', features: ['1 × 30g ceremonial matcha', 'Choose your product', 'Smart cadence adjustment', 'Free shipping', '10% subscriber discount'], popular: true },
  { name: 'Connoisseur', price: '$78', frequency: 'Monthly', description: 'Curated selection of rare, seasonal matchas', features: ['2 × 30g rare/seasonal matcha', 'Exclusive harvests access', 'Chasen refresh (quarterly)', 'Priority support', '15% subscriber discount', 'Free express shipping'] },
];

export default function SubscriptionsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <FadeIn>
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl text-matcha-fg mb-4">Subscribe & Save</h1>
          <p className="text-matcha-fg-muted text-lg max-w-2xl mx-auto">
            Never run out of your favorite matcha. Smart delivery learns your pace,
            and you can skip, swap, or pause anytime.
          </p>
        </div>
      </FadeIn>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {PLANS.map((plan, i) => (
          <FadeIn key={plan.name} delay={i * 0.1}>
            <Card className={`flex flex-col h-full relative ${plan.popular ? 'border-matcha-accent ring-1 ring-matcha-accent' : ''}`}>
              {plan.popular && (
                <Badge variant="tier" className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
              )}
              <h3 className="font-display text-2xl text-matcha-fg mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-4xl text-matcha-accent">{plan.price}</span>
                <span className="text-matcha-fg-muted text-sm">/ {plan.frequency.toLowerCase()}</span>
              </div>
              <p className="text-matcha-fg-muted text-sm mb-6">{plan.description}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-matcha-fg">
                    <span className="text-matcha-accent mt-0.5">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant={plan.popular ? 'primary' : 'secondary'} className="w-full">
                Start {plan.name}
              </Button>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* How it works */}
      <section id="how-it-works">
        <FadeIn>
          <h2 className="font-display text-3xl text-matcha-fg text-center mb-12">How It Works</h2>
        </FadeIn>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '1', title: 'Choose Your Matcha', desc: 'Pick a plan or select your exact product and variant' },
            { step: '2', title: 'Set Your Cadence', desc: 'Weekly, bi-weekly, or monthly — we\'ll learn your pace' },
            { step: '3', title: 'Enjoy & Manage', desc: 'Skip, swap, or pause anytime with one click' },
            { step: '4', title: 'Earn Rewards', desc: '1.5x loyalty points on every subscription delivery' },
          ].map((item, i) => (
            <FadeIn key={item.step} delay={i * 0.1}>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-matcha-accent/10 text-matcha-accent font-display text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-medium text-matcha-fg mb-2">{item.title}</h3>
                <p className="text-matcha-fg-muted text-sm">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
