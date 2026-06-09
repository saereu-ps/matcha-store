import { MatchaBowlIllustration } from '@/components/illustrations/matcha-bowl';
import { ProductIllustration } from '@/components/product-illustration';
import { Badge, Button, Card, FadeIn } from '@matcha/ui';

export default function ProfilePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <FadeIn>
        <div className="flex items-center gap-4 sm:gap-6 mb-10">
          <div className="w-16 h-16 rounded-full border border-matcha-border bg-matcha-bg-subtle flex items-center justify-center overflow-hidden">
            <MatchaBowlIllustration className="w-10 h-10" />
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl text-matcha-fg">Kenji Yamamoto</h1>
            <p className="text-matcha-fg-muted text-sm">kenji@example.com</p>
            <Badge variant="tier" className="mt-1">Enthusiast · 847 pts</Badge>
          </div>
        </div>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6">
        <FadeIn delay={0.1}>
          <Card>
            <h2 className="font-medium text-matcha-fg mb-4">Taste Profile</h2>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center"><div className="text-xl font-display text-matcha-accent">78</div><div className="text-[10px] text-matcha-fg-muted">Umami</div></div>
              <div className="text-center"><div className="text-xl font-display text-matcha-accent">62</div><div className="text-[10px] text-matcha-fg-muted">Sweet</div></div>
              <div className="text-center"><div className="text-xl font-display text-matcha-accent">45</div><div className="text-[10px] text-matcha-fg-muted">Vegetal</div></div>
              <div className="text-center"><div className="text-xl font-display text-matcha-accent">70</div><div className="text-[10px] text-matcha-fg-muted">Body</div></div>
            </div>
            <Button variant="ghost" size="sm">Retake Quiz</Button>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card>
            <h2 className="font-medium text-matcha-fg mb-4">Active Subscription</h2>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-sm bg-matcha-bg-subtle overflow-hidden">
                <ProductIllustration productId="1" className="w-full h-full" />
              </div>
              <div>
                <p className="text-matcha-fg text-sm font-medium">Uji Ceremonial Okumidori</p>
                <p className="text-matcha-fg-subtle text-xs">30g · Every 2 weeks</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">Skip</Button>
              <Button variant="secondary" size="sm">Swap</Button>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card>
            <h2 className="font-medium text-matcha-fg mb-4">Addresses</h2>
            <div className="p-3 rounded border border-matcha-accent/30 bg-matcha-accent-subtle mb-2">
              <p className="text-matcha-fg text-sm font-medium">Home</p>
              <p className="text-matcha-fg-muted text-xs">123 Matcha Lane, Portland, OR 97201</p>
            </div>
            <Button variant="ghost" size="sm">+ Add Address</Button>
          </Card>
        </FadeIn>

        <FadeIn delay={0.25}>
          <Card>
            <h2 className="font-medium text-matcha-fg mb-4">Preferences</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-matcha-fg-muted">Language</span><span className="text-matcha-fg">English</span></div>
              <div className="flex justify-between"><span className="text-matcha-fg-muted">Currency</span><span className="text-matcha-fg">USD</span></div>
              <div className="flex justify-between"><span className="text-matcha-fg-muted">Theme</span><span className="text-matcha-fg">Light</span></div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </main>
  );
}
