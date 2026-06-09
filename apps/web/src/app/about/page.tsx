import { images } from '@/lib/images';
import { Card, FadeIn } from '@matcha/ui';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <FadeIn>
        <h1 className="font-display text-5xl md:text-6xl text-matcha-fg mb-6">Our Story</h1>
      </FadeIn>

      {/* Hero image */}
      <FadeIn delay={0.1}>
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-12">
          <Image src={images.hero.field} alt="Japanese tea fields" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-matcha-bg/80 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <p className="font-display text-3xl text-white">From leaf to cup, with intention.</p>
          </div>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <FadeIn delay={0.2}>
          <h2 className="font-display text-3xl text-matcha-fg mb-4">The Beginning</h2>
          <p className="text-matcha-fg-muted leading-relaxed mb-4">
            Matchá was born from a simple frustration: finding high-quality matcha online meant navigating
            generic stores with no provenance data, no guidance, and no soul. We believed matcha deserved
            a digital experience as refined as the product itself.
          </p>
          <p className="text-matcha-fg-muted leading-relaxed">
            We partnered directly with tea farmers across Japan&apos;s five premium matcha regions — Uji, Nishio,
            Kagoshima, Yame, and Shizuoka — to bring their craft directly to you, with full transparency
            about origin, harvest, and processing.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden">
            <Image src={images.education.ceremony} alt="Tea ceremony" fill className="object-cover" />
          </div>
        </FadeIn>
      </div>

      {/* Values */}
      <FadeIn>
        <h2 className="font-display text-3xl text-matcha-fg mb-8 text-center">Our Values</h2>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: '初', title: 'Terroir First', desc: 'Every matcha tells the story of its land — elevation, climate, and the farmer who cultivated it.' },
          { icon: '竹', title: 'Education', desc: 'We believe informed drinkers enjoy matcha more. Every product comes with context, guides, and tasting notes.' },
          { icon: '循', title: 'Sustainability', desc: 'Direct trade with farmers, minimal packaging, carbon-neutral shipping. Quality without compromise.' },
        ].map((v, i) => (
          <FadeIn key={v.title} delay={i * 0.1}>
            <Card className="text-center">
              <span className="text-4xl block mb-4">{v.icon}</span>
              <h3 className="font-medium text-matcha-fg mb-2">{v.title}</h3>
              <p className="text-matcha-fg-muted text-sm">{v.desc}</p>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* Regions */}
      <FadeIn>
        <h2 className="font-display text-3xl text-matcha-fg mb-8">Our Partner Regions</h2>
      </FadeIn>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Uji, Kyoto', img: images.origins.uji, desc: '800+ years of tea tradition' },
          { name: 'Nishio, Aichi', img: images.origins.nishio, desc: 'Mild coastal climate, sweet matcha' },
          { name: 'Kagoshima', img: images.origins.kagoshima, desc: 'Volcanic soil, bold flavors' },
          { name: 'Yame, Fukuoka', img: images.origins.yame, desc: 'Mountain fog, full-bodied' },
          { name: 'Shizuoka', img: images.origins.shizuoka, desc: 'Largest tea region, diverse terroir' },
        ].map((r, i) => (
          <FadeIn key={r.name} delay={i * 0.05}>
            <Card className="overflow-hidden p-0">
              <div className="relative h-32">
                <Image src={r.img} alt={r.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-matcha-fg text-sm">{r.name}</h3>
                <p className="text-matcha-fg-muted text-xs">{r.desc}</p>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
