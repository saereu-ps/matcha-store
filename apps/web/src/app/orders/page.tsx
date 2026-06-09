import { ProductIllustration } from '@/components/product-illustration';
import { Badge, Card, FadeIn } from '@matcha/ui';

const ORDERS = [
  { id: 'ORD-0042', date: 'June 5, 2026', status: 'Delivered', total: '$42.00', items: [{ id: '1', name: 'Uji Ceremonial Okumidori' }] },
  { id: 'ORD-0038', date: 'May 22, 2026', status: 'Delivered', total: '$56.00', items: [{ id: '3', name: 'Nishio First Flush' }] },
  { id: 'ORD-0035', date: 'May 8, 2026', status: 'Delivered', total: '$70.00', items: [{ id: '2', name: 'Kagoshima Premium' }, { id: '1', name: 'Uji Ceremonial' }] },
];

export default function OrdersPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <FadeIn><h1 className="font-display text-4xl text-matcha-fg mb-8">Order History</h1></FadeIn>
      <div className="space-y-4">
        {ORDERS.map((order, i) => (
          <FadeIn key={order.id} delay={i * 0.05}>
            <Card>
              <div className="flex items-center justify-between mb-3">
                <div><p className="font-medium text-matcha-fg text-sm">{order.id}</p><p className="text-matcha-fg-subtle text-xs">{order.date}</p></div>
                <div className="flex items-center gap-3"><Badge variant="status">{order.status}</Badge><span className="font-display text-lg">{order.total}</span></div>
              </div>
              <div className="flex gap-2">
                {order.items.map((item) => (
                  <div key={item.id} className="w-12 h-12 rounded-sm bg-matcha-bg-subtle overflow-hidden">
                    <ProductIllustration productId={item.id} className="w-full h-full" />
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
