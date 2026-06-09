import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';

import { CartToast } from '@/components/cart-toast';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { PageTransitionWrapper } from '@/components/page-transition-wrapper';
import { Providers } from '@/components/providers';
import { SakuraFall } from '@/components/sakura-fall';
import { ScrollProgress } from '@/components/scroll-progress';

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
  keywords: ['matcha', 'ceremonial grade', 'japanese tea', 'uji matcha', 'matcha subscription'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-screen bg-matcha-bg text-matcha-fg antialiased">
        <Providers>
          <SakuraFall />
          <ScrollProgress />
          <CartToast />
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
