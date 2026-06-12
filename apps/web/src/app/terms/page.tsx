import { Card, FadeIn } from '@matcha/ui';

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <FadeIn>
        <p className="text-matcha-accent text-xs uppercase tracking-wider mb-2">Legal</p>
        <h1 className="font-display text-4xl text-matcha-fg mb-2">Terms of Service</h1>
        <p className="text-matcha-fg-subtle text-xs mb-8">Last updated: June 2026</p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <Card>
          <div className="prose-sm text-matcha-fg-muted space-y-4 text-xs sm:text-sm leading-relaxed">
            <section>
              <h2 className="font-medium text-matcha-fg text-sm mb-2">1. General</h2>
              <p>By using matcha.co you agree to these terms. Matchá Co., Ltd. reserves the right to modify terms with 30 days notice. Continued use constitutes acceptance.</p>
            </section>
            <section>
              <h2 className="font-medium text-matcha-fg text-sm mb-2">2. Orders & Payment</h2>
              <p>All prices are in Thai Baht (THB) and include 7% VAT. Orders are confirmed upon successful payment. We accept credit/debit cards, PromptPay, TrueMoney, bank transfer, and cash on delivery.</p>
            </section>
            <section>
              <h2 className="font-medium text-matcha-fg text-sm mb-2">3. Shipping & Delivery</h2>
              <p>Free shipping on orders over ฿1,500. Standard delivery 2-3 business days within Bangkok. Express same-day available for orders before 14:00. We ship nationwide via Kerry Express.</p>
            </section>
            <section>
              <h2 className="font-medium text-matcha-fg text-sm mb-2">4. Returns & Refunds</h2>
              <p>Returns accepted within 30 days for unopened products in original packaging. Opened matcha cannot be returned due to freshness. Refunds processed within 5-7 business days to original payment method.</p>
            </section>
            <section>
              <h2 className="font-medium text-matcha-fg text-sm mb-2">5. Subscriptions</h2>
              <p>Subscriptions renew automatically at the selected frequency. You may skip, pause, or cancel anytime from your dashboard. Cancellation takes effect after the current billing cycle. No cancellation fees.</p>
            </section>
            <section>
              <h2 className="font-medium text-matcha-fg text-sm mb-2">6. Loyalty Program</h2>
              <p>Points earned cannot be exchanged for cash. Points expire 12 months after last activity. Tier status is recalculated annually. Matchá reserves the right to modify the program with 30 days notice.</p>
            </section>
            <section>
              <h2 className="font-medium text-matcha-fg text-sm mb-2">7. Contact</h2>
              <p>Matchá Co., Ltd.<br/>Sukhumvit 63, Ekkamai Soi 10, Wattana, Bangkok 10110<br/>legal@matcha.co | 02-xxx-0000</p>
            </section>
          </div>
        </Card>
      </FadeIn>
    </main>
  );
}
