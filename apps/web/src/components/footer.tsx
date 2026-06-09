import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-matcha-border bg-matcha-bg-subtle/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Links — 2 columns mobile, 4 columns desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div>
            <h3 className="font-medium text-matcha-fg mb-2 sm:mb-4 text-xs sm:text-sm">Shop</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-sm text-matcha-fg-muted">
              <li><Link href="/products" className="hover:text-matcha-accent transition-colors">All Matcha</Link></li>
              <li><Link href="/products?grade=CEREMONIAL" className="hover:text-matcha-accent transition-colors">Ceremonial</Link></li>
              <li><Link href="/products?grade=PREMIUM" className="hover:text-matcha-accent transition-colors">Premium</Link></li>
              <li><Link href="/subscriptions" className="hover:text-matcha-accent transition-colors">Subscriptions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-matcha-fg mb-2 sm:mb-4 text-xs sm:text-sm">Learn</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-sm text-matcha-fg-muted">
              <li><Link href="/education" className="hover:text-matcha-accent transition-colors">Brewing Guides</Link></li>
              <li><Link href="/education/ceremony" className="hover:text-matcha-accent transition-colors">Tea Ceremony</Link></li>
              <li><Link href="/education/taste-quiz" className="hover:text-matcha-accent transition-colors">Taste Quiz</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-matcha-fg mb-2 sm:mb-4 text-xs sm:text-sm">Account</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-sm text-matcha-fg-muted">
              <li><Link href="/loyalty" className="hover:text-matcha-accent transition-colors">Rewards</Link></li>
              <li><Link href="/orders" className="hover:text-matcha-accent transition-colors">Orders</Link></li>
              <li><Link href="/profile" className="hover:text-matcha-accent transition-colors">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-matcha-fg mb-2 sm:mb-4 text-xs sm:text-sm">About</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-sm text-matcha-fg-muted">
              <li><Link href="/about" className="hover:text-matcha-accent transition-colors">Our Story</Link></li>
              <li><Link href="/about" className="hover:text-matcha-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom — compact */}
        <div className="border-t border-matcha-border pt-4 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <div className="font-display text-base sm:text-xl text-matcha-fg">Matchá</div>
          <p className="text-matcha-fg-subtle text-[10px] sm:text-xs text-center">
            © 2026 Matchá. Premium Japanese matcha, delivered with care.
          </p>
          <div className="flex gap-3 text-matcha-fg-muted text-[10px] sm:text-sm">
            <Link href="/about" className="hover:text-matcha-accent transition-colors">Privacy</Link>
            <Link href="/about" className="hover:text-matcha-accent transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
