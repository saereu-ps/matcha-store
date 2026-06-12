import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';

import { BackToTop } from '@/components/back-to-top';
import { CartToast } from '@/components/cart-toast';
import { CookieConsent } from '@/components/cookie-consent';
import { CursorTrail } from '@/components/cursor-trail';
import { ChatButton } from '@/components/chat-button';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { Providers } from '@/components/providers';
import { SakuraFall } from '@/components/sakura-fall';
import { ScrollProgress } from '@/components/scroll-progress';
import { WelcomeBanner } from '@/components/welcome-banner';

import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Matchá — Premium Japanese Matcha',
  description: 'Discover ceremonial-grade matcha from Japan\'s finest regions. Subscriptions, brewing guides, and a curated experience for matcha enthusiasts.',
  keywords: ['matcha', 'ceremonial grade', 'japanese tea', 'uji matcha', 'matcha subscription', 'premium matcha thailand'],
  openGraph: {
    title: 'Matchá — Premium Japanese Matcha',
    description: 'Stone-ground matcha from Uji, Kagoshima, Nishio. Subscriptions, brewing guides, and interactive tea ceremonies.',
    siteName: 'Matchá',
    locale: 'en_US',
    type: 'website',
    url: 'https://matcha-store-web.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matchá — Premium Japanese Matcha',
    description: 'Stone-ground matcha from Japan. Curated with intention, delivered with care.',
  },
  metadataBase: new URL('https://matcha-store-web.vercel.app'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6b7f5e" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body id="top" className="min-h-screen bg-matcha-bg text-matcha-fg antialiased">
        <Providers>
          <SakuraFall />
          <CursorTrail />
          <ScrollProgress />
          <CookieConsent />
          <ChatButton />
          <CartToast />
          <WelcomeBanner />
          <BackToTop />
          <Navbar />
          <PageTransitionWrapper>
            {children}
          </PageTransitionWrapper>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
