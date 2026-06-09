import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-matcha-border bg-matcha-bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Shop */}
          <div>
            <h3 className="font-medium text-matcha-fg mb-4 text-sm">Shop</h3>
            <ul className="space-y-2 text-sm text-matcha-fg-muted">
              <li><Link href="/products" className="hover:text-matcha-fg transition-colors">All Matcha</Link></li>
              <li><Link href="/products?grade=CEREMONIAL" className="hover:text-matcha-fg transition-colors">Ceremonial</Link></li>
              <li><Link href="/products?grade=PREMIUM" className="hover:text-matcha-fg transition-colors">Premium</Link></li>
              <li><Link href="/products?grade=CULINARY" className="hover:text-matcha-fg transition-colors">Culinary</Link></li>
              <li><Link href="/subscriptions" className="hover:text-matcha-fg transition-colors">Subscriptions</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-medium text-matcha-fg mb-4 text-sm">Learn</h3>
            <ul className="space-y-2 text-sm text-matcha-fg-muted">
              <li><Link href="/education" className="hover:text-matcha-fg transition-colors">Brewing Guides</Link></li>
              <li><Link href="/education/origins" className="hover:text-matcha-fg transition-colors">Origin Map</Link></li>
              <li><Link href="/education/ceremony" className="hover:text-matcha-fg transition-colors">Tea Ceremony</Link></li>
              <li><Link href="/education" className="hover:text-matcha-fg transition-colors">Masterclasses</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-medium text-matcha-fg mb-4 text-sm">Account</h3>
            <ul className="space-y-2 text-sm text-matcha-fg-muted">
              <li><Link href="/loyalty" className="hover:text-matcha-fg transition-colors">Loyalty Rewards</Link></li>
              <li><Link href="/profile" className="hover:text-matcha-fg transition-colors">My Profile</Link></li>
              <li><Link href="/orders" className="hover:text-matcha-fg transition-colors">Order History</Link></li>
              <li><Link href="/subscriptions" className="hover:text-matcha-fg transition-colors">Manage Subscription</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-matcha-fg mb-4 text-sm">Matchá</h3>
            <ul className="space-y-2 text-sm text-matcha-fg-muted">
              <li><Link href="/about" className="hover:text-matcha-fg transition-colors">Our Story</Link></li>
              <li><Link href="/sustainability" className="hover:text-matcha-fg transition-colors">Sustainability</Link></li>
              <li><Link href="/contact" className="hover:text-matcha-fg transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-matcha-fg transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-matcha-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl text-matcha-fg">Matchá</div>
          <p className="text-matcha-fg-subtle text-xs">
            © 2026 Matchá. Premium Japanese matcha, delivered with care.
          </p>
          <div className="flex gap-4 text-matcha-fg-muted text-sm">
            <Link href="/privacy" className="hover:text-matcha-fg transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-matcha-fg transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
