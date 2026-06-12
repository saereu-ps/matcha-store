import { Card, FadeIn } from '@matcha/ui';

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <FadeIn>
        <p className="text-matcha-accent text-xs uppercase tracking-wider mb-2">Legal</p>
        <h1 className="font-display text-4xl text-matcha-fg mb-2">Privacy Policy</h1>
        <p className="text-matcha-fg-subtle text-xs mb-8">Last updated: June 2026</p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <Card>
          <div className="prose-sm text-matcha-fg-muted space-y-4 text-xs sm:text-sm leading-relaxed">
            <section>
              <h2 className="font-medium text-matcha-fg text-sm mb-2">1. Information We Collect</h2>
              <p>We collect personal information you provide when creating an account, placing orders, or contacting us. This includes name, email, shipping address, and payment details (processed securely via Stripe).</p>
            </section>
            <section>
              <h2 className="font-medium text-matcha-fg text-sm mb-2">2. How We Use Your Data</h2>
              <p>Your data is used to process orders, manage subscriptions, personalize recommendations (taste profile), send order updates, and improve our services. We never sell your data to third parties.</p>
            </section>
            <section>
              <h2 className="font-medium text-matcha-fg text-sm mb-2">3. Cookies & Tracking</h2>
              <p>We use essential cookies for cart functionality and preferences (theme, currency, language). Analytics cookies help us understand how you use our site. You can disable non-essential cookies in your browser settings.</p>
            </section>
            <section>
              <h2 className="font-medium text-matcha-fg text-sm mb-2">4. Data Security</h2>
              <p>All data is encrypted in transit (TLS 1.3) and at rest. Payment information is handled by Stripe and never stored on our servers. We follow PDPA (Thailand Personal Data Protection Act) guidelines.</p>
            </section>
            <section>
              <h2 className="font-medium text-matcha-fg text-sm mb-2">5. Your Rights</h2>
              <p>You may request access, correction, or deletion of your personal data at any time by contacting privacy@matcha.co. Account deletion removes all personal data within 30 days.</p>
            </section>
            <section>
              <h2 className="font-medium text-matcha-fg text-sm mb-2">6. Contact</h2>
              <p>Data Protection Officer: privacy@matcha.co<br/>Matchá Co., Ltd., Ekkamai, Wattana, Bangkok 10110, Thailand</p>
            </section>
          </div>
        </Card>
      </FadeIn>
    </main>
  );
}
