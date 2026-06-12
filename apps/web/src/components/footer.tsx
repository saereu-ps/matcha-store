import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-matcha-border bg-matcha-bg-subtle/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div>
            <h3 className="font-medium text-matcha-fg mb-2 sm:mb-3 text-xs sm:text-sm">Shop</h3>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-matcha-fg-muted">
              <li><Link href="/products" className="hover:text-matcha-accent transition-colors">All Matcha</Link></li>
              <li><Link href="/products?grade=CEREMONIAL" className="hover:text-matcha-accent transition-colors">Ceremonial</Link></li>
              <li><Link href="/products?grade=PREMIUM" className="hover:text-matcha-accent transition-colors">Premium</Link></li>
              <li><Link href="/products?grade=CULINARY" className="hover:text-matcha-accent transition-colors">Culinary</Link></li>
              <li><Link href="/subscriptions" className="hover:text-matcha-accent transition-colors">Subscriptions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-matcha-fg mb-2 sm:mb-3 text-xs sm:text-sm">Learn</h3>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-matcha-fg-muted">
              <li><Link href="/education" className="hover:text-matcha-accent transition-colors">Brewing Guides</Link></li>
              <li><Link href="/education/ceremony" className="hover:text-matcha-accent transition-colors">Tea Ceremony</Link></li>
              <li><Link href="/education/taste-quiz" className="hover:text-matcha-accent transition-colors">Taste Quiz</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-matcha-fg mb-2 sm:mb-3 text-xs sm:text-sm">Company</h3>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-matcha-fg-muted">
              <li><Link href="/about" className="hover:text-matcha-accent transition-colors">Our Story</Link></li>
              <li><Link href="/branches" className="hover:text-matcha-accent transition-colors">Branches</Link></li>
              <li><Link href="/careers" className="hover:text-matcha-accent transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-matcha-accent transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-matcha-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-matcha-fg mb-2 sm:mb-3 text-xs sm:text-sm">Account</h3>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-matcha-fg-muted">
              <li><Link href="/loyalty" className="hover:text-matcha-accent transition-colors">Rewards</Link></li>
              <li><Link href="/orders" className="hover:text-matcha-accent transition-colors">Orders</Link></li>
              <li><Link href="/profile" className="hover:text-matcha-accent transition-colors">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-matcha-fg mb-2 sm:mb-3 text-xs sm:text-sm">Legal</h3>
            <ul className="space-y-1.5 text-[11px] sm:text-xs text-matcha-fg-muted">
              <li><Link href="/privacy" className="hover:text-matcha-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-matcha-accent transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-matcha-border pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="font-display text-base text-matcha-fg">Matchá</div>
          <p className="text-matcha-fg-subtle text-[10px] sm:text-xs text-center">
            © 2026 Matchá Co., Ltd. Bangkok, Thailand. Crafted with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
