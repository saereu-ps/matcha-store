'use client';

import { Button, Card, FadeIn } from '@matcha/ui';

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <FadeIn>
        <p className="text-matcha-accent text-xs uppercase tracking-wider mb-2">Get in Touch</p>
        <h1 className="font-display text-4xl sm:text-5xl text-matcha-fg mb-4">Contact Us</h1>
        <p className="text-matcha-fg-muted text-sm mb-10">Questions about matcha, orders, or partnerships? We would love to hear from you.</p>
      </FadeIn>

      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <FadeIn delay={0.1}>
          <Card>
            <h3 className="font-medium text-matcha-fg text-sm mb-2">Customer Support</h3>
            <p className="text-matcha-fg-muted text-xs mb-1">support@matcha.co</p>
            <p className="text-matcha-fg-muted text-xs mb-1">Line: @matchath</p>
            <p className="text-matcha-fg-subtle text-[10px]">Response within 2 hours (9am-9pm)</p>
          </Card>
        </FadeIn>
        <FadeIn delay={0.15}>
          <Card>
            <h3 className="font-medium text-matcha-fg text-sm mb-2">Business & Partnerships</h3>
            <p className="text-matcha-fg-muted text-xs mb-1">hello@matcha.co</p>
            <p className="text-matcha-fg-muted text-xs mb-1">Tel: 02-xxx-0000</p>
            <p className="text-matcha-fg-subtle text-[10px]">Wholesale, corporate gifts, collaborations</p>
          </Card>
        </FadeIn>
      </div>

      <FadeIn delay={0.2}>
        <Card>
          <h3 className="font-medium text-matcha-fg text-sm mb-4">Send a Message</h3>
          <form className="space-y-3" action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />
            <input type="hidden" name="to" value="Pilan.s112@gmail.com" />
            <input type="hidden" name="subject" value="Contact Form — Matchá Website" />
            <input type="hidden" name="from_name" value="Matchá Contact Form" />
            <input type="hidden" name="redirect" value="https://matcha-store-web.vercel.app/contact" />
            <div className="grid sm:grid-cols-2 gap-3">
              <input type="text" placeholder="Name" className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
              <input type="email" placeholder="Email" className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
            </div>
            <input type="text" placeholder="Subject" className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
            <textarea rows={4} placeholder="Your message..." className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring resize-none" />
            <Button className="w-full" type="submit">Send Message</Button>
          </form>
        </Card>
      </FadeIn>
    </main>
  );
}
