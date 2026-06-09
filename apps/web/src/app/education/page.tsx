import { Badge, Button, Card, FadeIn } from '@matcha/ui';
import Link from 'next/link';

const GUIDES = [
  { id: 'usucha', title: 'Usucha (Thin Style)', difficulty: 'Beginner', duration: '5 min', emoji: '茶' },
  { id: 'koicha', title: 'Koicha (Thick Style)', difficulty: 'Advanced', duration: '7 min', emoji: '碗' },
  { id: 'latte', title: 'Matcha Latte', difficulty: 'Beginner', duration: '3 min', emoji: '杯' },
  { id: 'cold-brew', title: 'Cold Brew Matcha', difficulty: 'Beginner', duration: '1 min + 4h', emoji: '冷' },
];

const MASTERCLASSES = [
  { id: 'mc1', title: 'Understanding Matcha Grades', instructor: 'Kenji Tanaka', duration: '20 min', exclusive: false },
  { id: 'mc2', title: 'The Art of Chasen', instructor: 'Yuki Sato', duration: '30 min', exclusive: false },
  { id: 'mc3', title: 'Seasonal Harvests & Terroir', instructor: 'Kenji Tanaka', duration: '40 min', exclusive: true },
];

export default function EducationPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <FadeIn>
        <h1 className="font-display text-5xl md:text-6xl text-matcha-fg mb-4">Learn Matcha</h1>
        <p className="text-matcha-fg-muted text-lg mb-16 max-w-2xl">
          Interactive brewing guides, origin stories, and expert masterclasses.
          From your first cup to mastering the ceremony.
        </p>
      </FadeIn>

      {/* Brewing Guides */}
      <section className="mb-20">
        <FadeIn>
          <h2 className="font-display text-3xl text-matcha-fg mb-8">Brewing Guides</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GUIDES.map((guide, i) => (
            <FadeIn key={guide.id} delay={i * 0.05}>
              <Link href={`/education/${guide.id}`}>
                <Card className="h-full text-center">
                  <span className="text-5xl block mb-4">{guide.emoji}</span>
                  <h3 className="font-medium text-matcha-fg mb-1">{guide.title}</h3>
                  <p className="text-matcha-fg-subtle text-sm mb-3">{guide.duration}</p>
                  <Badge variant={guide.difficulty === 'Beginner' ? 'premium' : 'ceremonial'}>
                    {guide.difficulty}
                  </Badge>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 3D Ceremony */}
      <section className="mb-20">
        <FadeIn>
          <div className="rounded-xl bg-matcha-bg-subtle border border-matcha-border p-8 md:p-12 text-center">
            <span className="text-6xl block mb-4">殿</span>
            <h2 className="font-display text-3xl text-matcha-fg mb-4">3D Tea Ceremony</h2>
            <p className="text-matcha-fg-muted mb-6 max-w-xl mx-auto">
              Experience traditional matcha preparation in an interactive 3D scene.
              Watch the ceremony unfold step by step.
            </p>
            <Link href="/education/ceremony">
              <Button size="lg">Enter Ceremony</Button>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Origin Map */}
      <section className="mb-20">
        <FadeIn>
          <h2 className="font-display text-3xl text-matcha-fg mb-4">Origin Map</h2>
          <p className="text-matcha-fg-muted mb-8">Explore Japan&apos;s matcha-growing regions and their unique terroir.</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Link href="/education/origins">
            <Card className="aspect-[2/1] flex items-center justify-center">
              <div className="text-center">
                <span className="text-7xl block mb-4">図</span>
                <p className="text-matcha-fg-muted">Interactive origin map — click to explore</p>
              </div>
            </Card>
          </Link>
        </FadeIn>
      </section>

      {/* Masterclasses */}
      <section>
        <FadeIn>
          <h2 className="font-display text-3xl text-matcha-fg mb-8">Masterclasses</h2>
        </FadeIn>
        <div className="space-y-4">
          {MASTERCLASSES.map((mc, i) => (
            <FadeIn key={mc.id} delay={i * 0.05}>
              <Card className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-lg bg-matcha-bg-muted flex items-center justify-center text-2xl shrink-0">
                  映
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-matcha-fg">{mc.title}</h3>
                  <p className="text-matcha-fg-subtle text-sm">{mc.instructor} · {mc.duration}</p>
                </div>
                {mc.exclusive && <Badge variant="tier">Subscriber Only</Badge>}
                <Button variant="secondary" size="sm">Watch</Button>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
