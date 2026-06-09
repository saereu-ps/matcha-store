'use client';

import { ProductIllustration } from '@/components/product-illustration';
import { useCart } from '@/lib/cart';
import { useCurrency } from '@/lib/currency';
import { Badge, Button, Card, FadeIn } from '@matcha/ui';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const PROMO_CODES: Record<string, { discount: number; type: 'percent' | 'fixed'; label: string }> = {
  'MATCHA10': { discount: 10, type: 'percent', label: '10% off' },
  'FIRST500': { discount: 500, type: 'fixed', label: '฿500 off first order' },
  'FREESHIP': { discount: 200, type: 'fixed', label: 'Free shipping' },
  'ZEN20': { discount: 20, type: 'percent', label: '20% off' },
};

const PAYMENT_METHODS = [
  { id: 'credit', name: 'Credit / Debit Card', icon: 'card', desc: 'Visa, Mastercard, JCB' },
  { id: 'promptpay', name: 'PromptPay', icon: 'qr', desc: 'Scan QR to pay instantly' },
  { id: 'truemoney', name: 'TrueMoney Wallet', icon: 'wallet', desc: 'Pay with TrueMoney balance' },
  { id: 'bank', name: 'Bank Transfer', icon: 'bank', desc: 'SCB, KBank, BBL, Krungsri' },
  { id: 'cod', name: 'Cash on Delivery', icon: 'cash', desc: '+฿30 COD fee' },
];

function PaymentIcon({ type }: { type: string }) {
  switch (type) {
    case 'card':
      return <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 8H18" stroke="currentColor" strokeWidth="1"/><path d="M5 12H9" stroke="currentColor" strokeWidth="0.8"/></svg>;
    case 'qr':
      return <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="5" height="5" stroke="currentColor" strokeWidth="1"/><rect x="12" y="3" width="5" height="5" stroke="currentColor" strokeWidth="1"/><rect x="3" y="12" width="5" height="5" stroke="currentColor" strokeWidth="1"/><rect x="13" y="13" width="3" height="3" stroke="currentColor" strokeWidth="0.8"/></svg>;
    case 'wallet':
      return <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M14 10.5a1 1 0 100 2 1 1 0 000-2z" fill="currentColor"/><path d="M2 8h16" stroke="currentColor" strokeWidth="0.5"/></svg>;
    case 'bank':
      return <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><path d="M10 3L3 7H17L10 3Z" stroke="currentColor" strokeWidth="1"/><path d="M5 8V14M8 8V14M12 8V14M15 8V14" stroke="currentColor" strokeWidth="0.8"/><path d="M3 14H17V16H3V14Z" stroke="currentColor" strokeWidth="1"/></svg>;
    case 'cash':
      return <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><rect x="3" y="6" width="14" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/><circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="0.8"/></svg>;
    default:
      return null;
  }
}

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, tax, shipping, total, itemCount } = useCart();
  const { format } = useCurrency();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<typeof PROMO_CODES[string] | null>(null);
  const [promoError, setPromoError] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('credit');
  const [step, setStep] = useState<'cart' | 'payment'>('cart');

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    const promo = PROMO_CODES[code];
    if (promo) {
      setAppliedPromo(promo);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setAppliedPromo(null);
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  // Calculate discount
  const discountAmount = appliedPromo
    ? appliedPromo.type === 'percent'
      ? Math.round(subtotal * (appliedPromo.discount / 100))
      : appliedPromo.discount
    : 0;

  const codFee = selectedPayment === 'cod' ? 30 : 0;
  const finalTotal = total - discountAmount + codFee;

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <FadeIn>
          <p className="font-display text-3xl text-matcha-fg mb-4">Your cart is empty</p>
          <p className="text-matcha-fg-muted text-sm mb-8">Explore our collection and add some matcha.</p>
          <Link href="/products"><Button>Browse Products</Button></Link>
        </FadeIn>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-16">
      <FadeIn>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h1 className="font-display text-2xl sm:text-4xl text-matcha-fg">
            {step === 'cart' ? 'Your Cart' : 'Payment'}
          </h1>
          {step === 'cart' && (
            <button onClick={clearCart} className="text-xs text-matcha-fg-subtle hover:text-matcha-warm transition-colors">Clear all</button>
          )}
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-4 sm:mb-8">
          <button onClick={() => setStep('cart')} className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${step === 'cart' ? 'bg-matcha-accent text-white' : 'text-matcha-fg-muted hover:text-matcha-fg'}`}>
            1. Cart
          </button>
          <div className="w-6 h-[1px] bg-matcha-border" />
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${step === 'payment' ? 'bg-matcha-accent text-white' : 'text-matcha-fg-muted'}`}>
            2. Payment
          </span>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
        {/* Left — Items + Promo + Payment */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {step === 'cart' ? (
              <motion.div key="cart" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3 sm:space-y-6">
                {/* Cart Items */}
                <div className="space-y-3">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100, height: 0 }}>
                        <Card className="flex items-center gap-3 sm:gap-4">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-md bg-matcha-bg-subtle overflow-hidden border border-matcha-border/30">
                            <ProductIllustration productId={item.id} className="w-full h-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-matcha-fg text-xs sm:text-sm truncate">{item.name}</h3>
                            <p className="text-matcha-fg-subtle text-[10px] sm:text-xs">{item.grade} · {item.weight}</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded border border-matcha-border text-matcha-fg-muted hover:border-matcha-accent hover:text-matcha-accent flex items-center justify-center text-sm transition-colors">−</button>
                            <span className="w-5 text-center text-xs font-medium text-matcha-fg">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded border border-matcha-border text-matcha-fg-muted hover:border-matcha-accent hover:text-matcha-accent flex items-center justify-center text-sm transition-colors">+</button>
                          </div>
                          <div className="text-right w-20">
                            <p className="font-display text-sm text-matcha-fg">{format(item.price * item.quantity)}</p>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-matcha-fg-subtle hover:text-matcha-warm transition-colors">
                            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.2"/></svg>
                          </button>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Promo Code */}
                <Card>
                  <h3 className="font-medium text-matcha-fg text-sm mb-3">Promotion Code</h3>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-2.5 bg-matcha-accent/5 border border-matcha-accent/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-matcha-accent" viewBox="0 0 16 16" fill="none"><path d="M2 8L6 12L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        <span className="text-matcha-accent text-xs font-medium">{promoCode.toUpperCase()}</span>
                        <Badge variant="tier">{appliedPromo.label}</Badge>
                      </div>
                      <button onClick={removePromo} className="text-matcha-fg-subtle hover:text-matcha-warm text-xs transition-colors">Remove</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => { setPromoCode(e.target.value); setPromoError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                        placeholder="Enter code (e.g. MATCHA10)"
                        className="flex-1 px-3 py-2 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/50 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring transition-all"
                      />
                      <Button size="sm" variant="secondary" onClick={applyPromo}>Apply</Button>
                    </div>
                  )}
                  {promoError && <p className="text-[10px] text-matcha-warm mt-2">{promoError}</p>}
                  {!appliedPromo && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <span className="text-[10px] text-matcha-fg-subtle">Try:</span>
                      {Object.entries(PROMO_CODES).slice(0, 3).map(([code, info]) => (
                        <button key={code} onClick={() => setPromoCode(code)} className="text-[10px] px-2 py-0.5 rounded-full border border-matcha-border text-matcha-fg-muted hover:border-matcha-accent hover:text-matcha-accent transition-colors">
                          {code} — {info.label}
                        </button>
                      ))}
                    </div>
                  )}
                </Card>

                <Link href="/products" className="inline-block text-matcha-accent text-xs hover:underline">← Continue shopping</Link>
              </motion.div>
            ) : (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                {/* Payment Method */}
                <Card>
                  <h3 className="font-medium text-matcha-fg text-sm mb-4">Select Payment Method</h3>
                  <div className="space-y-2">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-lg border transition-all text-left ${
                          selectedPayment === method.id
                            ? 'border-matcha-accent bg-matcha-accent/5 ring-1 ring-matcha-accent/20'
                            : 'border-matcha-border hover:border-matcha-fg-subtle'
                        }`}
                      >
                        <div className={`${selectedPayment === method.id ? 'text-matcha-accent' : 'text-matcha-fg-muted'}`}>
                          <PaymentIcon type={method.icon} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-xs font-medium ${selectedPayment === method.id ? 'text-matcha-accent' : 'text-matcha-fg'}`}>{method.name}</p>
                          <p className="text-[10px] text-matcha-fg-subtle">{method.desc}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPayment === method.id ? 'border-matcha-accent' : 'border-matcha-border'}`}>
                          {selectedPayment === method.id && (
                            <motion.div className="w-2 h-2 rounded-full bg-matcha-accent" initial={{ scale: 0 }} animate={{ scale: 1 }} />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>


                {/* Payment form based on selected method */}
                <Card>
                  <h3 className="font-medium text-matcha-fg text-sm mb-4">
                    {selectedPayment === 'credit' && 'Card Details'}
                    {selectedPayment === 'promptpay' && 'PromptPay'}
                    {selectedPayment === 'truemoney' && 'TrueMoney Wallet'}
                    {selectedPayment === 'bank' && 'Bank Transfer'}
                    {selectedPayment === 'cod' && 'Delivery Address'}
                  </h3>

                  {selectedPayment === 'credit' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Expiry</label>
                          <input type="text" placeholder="MM / YY" maxLength={7} className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
                        </div>
                        <div>
                          <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">CVV</label>
                          <input type="text" placeholder="123" maxLength={4} className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Cardholder Name</label>
                        <input type="text" placeholder="Name on card" className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
                      </div>
                    </div>
                  )}

                  {selectedPayment === 'promptpay' && (
                    <div className="text-center py-4">
                      <div className="w-40 h-40 mx-auto bg-matcha-bg-subtle border border-matcha-border rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-20 h-20 text-matcha-fg/15" viewBox="0 0 64 64" fill="none"><rect x="4" y="4" width="20" height="20" stroke="currentColor" strokeWidth="2"/><rect x="40" y="4" width="20" height="20" stroke="currentColor" strokeWidth="2"/><rect x="4" y="40" width="20" height="20" stroke="currentColor" strokeWidth="2"/><rect x="8" y="8" width="8" height="8" fill="currentColor"/><rect x="44" y="8" width="8" height="8" fill="currentColor"/><rect x="8" y="44" width="8" height="8" fill="currentColor"/></svg>
                      </div>
                      <p className="text-xs text-matcha-fg-muted">QR code will appear after you confirm</p>
                      <p className="text-[10px] text-matcha-fg-subtle mt-1">Scan with any Thai banking app · Expires in 15 min</p>
                    </div>
                  )}

                  {selectedPayment === 'truemoney' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Phone Number</label>
                        <input type="tel" placeholder="08X-XXX-XXXX" maxLength={12} className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
                      </div>
                      <p className="text-[10px] text-matcha-fg-subtle">OTP will be sent to verify your wallet</p>
                    </div>
                  )}

                  {selectedPayment === 'bank' && (
                    <div className="space-y-3">
                      <p className="text-xs text-matcha-fg-muted mb-1">Transfer to:</p>
                      <div className="p-3 bg-matcha-bg-subtle rounded-lg border border-matcha-border space-y-1.5 text-xs">
                        <div className="flex justify-between"><span className="text-matcha-fg-muted">Bank</span><span className="text-matcha-fg font-medium">KBank</span></div>
                        <div className="flex justify-between"><span className="text-matcha-fg-muted">Account</span><span className="text-matcha-fg font-mono">xxx-x-xx890-x</span></div>
                        <div className="flex justify-between"><span className="text-matcha-fg-muted">Name</span><span className="text-matcha-fg">Matcha Co., Ltd.</span></div>
                      </div>
                      <div>
                        <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Upload Slip</label>
                        <div className="border-2 border-dashed border-matcha-border rounded-lg p-4 text-center hover:border-matcha-accent/40 transition-colors cursor-pointer">
                          <p className="text-xs text-matcha-fg-muted">Click or drag file</p>
                          <p className="text-[10px] text-matcha-fg-subtle">JPG, PNG up to 5MB</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedPayment === 'cod' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Full Name</label>
                        <input type="text" placeholder="Your full name" className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
                      </div>
                      <div>
                        <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Phone</label>
                        <input type="tel" placeholder="08X-XXX-XXXX" className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
                      </div>
                      <div>
                        <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Address</label>
                        <textarea placeholder="Full delivery address..." rows={3} className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring resize-none" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Province</label>
                          <input type="text" placeholder="Bangkok" className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
                        </div>
                        <div>
                          <label className="text-[10px] text-matcha-fg-muted uppercase tracking-wider block mb-1">Postal Code</label>
                          <input type="text" placeholder="10XXX" maxLength={5} className="w-full px-3 py-2.5 text-xs bg-matcha-bg border border-matcha-border rounded-lg text-matcha-fg placeholder:text-matcha-fg-subtle/40 focus:outline-none focus:border-matcha-accent focus:ring-1 focus:ring-matcha-ring" />
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
                <button onClick={() => setStep('cart')} className="text-matcha-accent text-xs hover:underline">← Back to cart</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right — Order Summary (sticky) */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-4 sm:p-6">
            <h3 className="font-medium text-matcha-fg mb-3 sm:mb-4 text-sm sm:text-base">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-matcha-fg-muted">Subtotal ({itemCount} items)</span>
                <span className="text-matcha-fg">{format(subtotal)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-matcha-accent">
                  <span className="text-xs">Discount ({appliedPromo.label})</span>
                  <span>-{format(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-matcha-fg-muted">VAT (7%)</span>
                <span className="text-matcha-fg">{format(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-matcha-fg-muted">Shipping</span>
                <span className={shipping === 0 ? 'text-matcha-accent' : 'text-matcha-fg'}>
                  {shipping === 0 ? 'Free' : format(shipping)}
                </span>
              </div>
              {codFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-matcha-fg-muted">COD fee</span>
                  <span className="text-matcha-fg">{format(codFee)}</span>
                </div>
              )}
              <div className="border-t border-matcha-border pt-3 mt-3 flex justify-between font-medium">
                <span className="text-matcha-fg">Total</span>
                <div className="text-right">
                  <motion.span
                    key={finalTotal}
                    className="font-display text-xl text-matcha-fg block"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {format(finalTotal)}
                  </motion.span>
                  {appliedPromo && (
                    <span className="text-[10px] text-matcha-accent">You save {format(discountAmount)}</span>
                  )}
                </div>
              </div>
            </div>

            <Button className="w-full mt-6" size="lg" onClick={() => {
              if (step === 'cart') setStep('payment');
              else alert('Order placed! Thank you for your purchase.');
            }}>
              {step === 'cart' ? 'Proceed to Payment' :
               selectedPayment === 'promptpay' ? 'Generate QR Code' :
               selectedPayment === 'cod' ? 'Place Order (COD)' :
               'Confirm & Pay'}
            </Button>
            <p className="text-matcha-fg-subtle text-[10px] text-center mt-3">
              Secure checkout · Includes 7% VAT · Free returns 30 days
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
