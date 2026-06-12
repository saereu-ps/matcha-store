'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type Locale = 'en' | 'th' | 'ja';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    'nav.collection': 'Collection',
    'nav.subscribe': 'Subscribe',
    'nav.learn': 'Learn',
    'nav.rewards': 'Rewards',
    'nav.signin': 'Sign In',
    'nav.logout': 'Logout',
    'hero.subtitle': 'Ceremonial Grade · Stone-Ground · Single Origin',
    'hero.title': 'Matchá',
    'hero.desc': 'The finest stone-ground matcha from Japan. Curated with intention, delivered with care.',
    'hero.cta1': 'Explore Collection',
    'hero.cta2': 'Discover Your Taste',
    'home.curated': 'Curated for You',
    'home.curated.desc': 'Discover our selection of single-origin, stone-ground matcha from Japan\'s finest terroir.',
    'home.origins': 'Explore Origins',
    'home.try': 'Try It Yourself',
    'home.try.desc': 'Interactive matcha experiences — whisk your own bowl or enjoy a virtual sip.',
    'home.whisk': 'Whisk It',
    'home.sip': 'Sip It',
    'products.title': 'Our Collection',
    'products.desc': 'Single-origin, stone-ground matcha from Japan\'s finest terroir.',
    'products.all': 'All',
    'products.sort': 'Sort:',
    'products.recommended': 'Recommended',
    'products.priceUp': 'Price ↑',
    'products.priceDown': 'Price ↓',
    'products.products': 'products',
    'products.add': '+ Add',
    'products.soldout': 'Sold Out',
    'products.lowstock': 'Low stock',
    'products.notify': 'Notify',
    'cart.title': 'Your Cart',
    'cart.clear': 'Clear all',
    'cart.empty': 'Your cart is empty',
    'cart.empty.desc': 'Explore our collection and add some matcha.',
    'cart.browse': 'Browse Products',
    'cart.summary': 'Order Summary',
    'cart.subtotal': 'Subtotal',
    'cart.vat': 'VAT (7%)',
    'cart.shipping': 'Shipping',
    'cart.free': 'Free',
    'cart.total': 'Total',
    'cart.proceed': 'Proceed to Payment',
    'cart.confirm': 'Confirm & Pay',
    'cart.continue': '← Continue shopping',
    'footer.shop': 'Shop',
    'footer.learn': 'Learn',
    'footer.company': 'Company',
    'footer.account': 'Account',
    'footer.legal': 'Legal',
    'cookie.title': 'We value your privacy',
    'cookie.desc': 'We use cookies for cart, preferences, and analytics to improve your matcha experience.',
    'cookie.accept': 'Accept All',
    'cookie.essential': 'Essential Only',
  },
  th: {
    'nav.collection': 'สินค้า',
    'nav.subscribe': 'สมัครสมาชิก',
    'nav.learn': 'เรียนรู้',
    'nav.rewards': 'สะสมแต้ม',
    'nav.signin': 'เข้าสู่ระบบ',
    'nav.logout': 'ออกจากระบบ',
    'hero.subtitle': 'เกรดพิธีการ · บดหิน · แหล่งเดียว',
    'hero.title': 'มัทฉะ',
    'hero.desc': 'มัทฉะบดหินชั้นเลิศจากญี่ปุ่น คัดสรรด้วยความตั้งใจ ส่งมอบด้วยความใส่ใจ',
    'hero.cta1': 'เลือกชมสินค้า',
    'hero.cta2': 'ค้นหารสชาติของคุณ',
    'home.curated': 'คัดสรรเพื่อคุณ',
    'home.curated.desc': 'มัทฉะแหล่งเดียวจากแหล่งปลูกชั้นนำของญี่ปุ่น',
    'home.origins': 'สำรวจแหล่งผลิต',
    'home.try': 'ลองเล่นดู',
    'home.try.desc': 'ประสบการณ์มัทฉะแบบอินเทอร์แอคทีฟ — ตีชาเองหรือจิบชาเสมือนจริง',
    'home.whisk': 'ตีชา',
    'home.sip': 'จิบชา',
    'products.title': 'สินค้าของเรา',
    'products.desc': 'มัทฉะบดหินแหล่งเดียวจากญี่ปุ่น',
    'products.all': 'ทั้งหมด',
    'products.sort': 'เรียง:',
    'products.recommended': 'แนะนำ',
    'products.priceUp': 'ราคา ↑',
    'products.priceDown': 'ราคา ↓',
    'products.products': 'สินค้า',
    'products.add': '+ เพิ่ม',
    'products.soldout': 'สินค้าหมด',
    'products.lowstock': 'เหลือน้อย',
    'products.notify': 'แจ้งเตือน',
    'cart.title': 'ตะกร้าของคุณ',
    'cart.clear': 'ล้างทั้งหมด',
    'cart.empty': 'ตะกร้าว่างเปล่า',
    'cart.empty.desc': 'เลือกชมสินค้าแล้วเพิ่มมัทฉะลงตะกร้า',
    'cart.browse': 'เลือกชมสินค้า',
    'cart.summary': 'สรุปคำสั่งซื้อ',
    'cart.subtotal': 'ราคาสินค้า',
    'cart.vat': 'ภาษี (7%)',
    'cart.shipping': 'ค่าจัดส่ง',
    'cart.free': 'ฟรี',
    'cart.total': 'รวมทั้งหมด',
    'cart.proceed': 'ดำเนินการชำระเงิน',
    'cart.confirm': 'ยืนยันและชำระเงิน',
    'cart.continue': '← เลือกซื้อต่อ',
    'footer.shop': 'สินค้า',
    'footer.learn': 'เรียนรู้',
    'footer.company': 'บริษัท',
    'footer.account': 'บัญชี',
    'footer.legal': 'กฎหมาย',
    'cookie.title': 'เราใส่ใจความเป็นส่วนตัว',
    'cookie.desc': 'เราใช้คุกกี้เพื่อตะกร้าสินค้า การตั้งค่า และวิเคราะห์เพื่อปรับปรุงประสบการณ์',
    'cookie.accept': 'ยอมรับทั้งหมด',
    'cookie.essential': 'จำเป็นเท่านั้น',
  },
  ja: {
    'nav.collection': 'コレクション',
    'nav.subscribe': '定期購入',
    'nav.learn': '学ぶ',
    'nav.rewards': 'リワード',
    'nav.signin': 'ログイン',
    'nav.logout': 'ログアウト',
    'hero.subtitle': '儀式用 · 石臼挽き · シングルオリジン',
    'hero.title': '抹茶',
    'hero.desc': '日本最高峰の石臼挽き抹茶。心を込めて厳選し、丁寧にお届けします。',
    'hero.cta1': 'コレクションを見る',
    'hero.cta2': 'あなたの味を発見',
    'home.curated': 'あなたへのおすすめ',
    'home.curated.desc': '日本最高の産地から厳選したシングルオリジン石臼挽き抹茶。',
    'home.origins': '産地を探る',
    'home.try': '体験する',
    'home.try.desc': 'インタラクティブな抹茶体験 — 自分で点てるか、バーチャルで一服。',
    'home.whisk': '点てる',
    'home.sip': '飲む',
    'products.title': 'コレクション',
    'products.desc': '日本最高の産地からのシングルオリジン石臼挽き抹茶。',
    'products.all': 'すべて',
    'products.sort': '並び替え:',
    'products.recommended': 'おすすめ',
    'products.priceUp': '価格 ↑',
    'products.priceDown': '価格 ↓',
    'products.products': '商品',
    'products.add': '+ 追加',
    'products.soldout': '売り切れ',
    'products.lowstock': '残りわずか',
    'products.notify': '通知',
    'cart.title': 'カート',
    'cart.clear': 'すべて削除',
    'cart.empty': 'カートは空です',
    'cart.empty.desc': 'コレクションから抹茶を追加してください。',
    'cart.browse': '商品を見る',
    'cart.summary': '注文概要',
    'cart.subtotal': '小計',
    'cart.vat': '消費税 (7%)',
    'cart.shipping': '送料',
    'cart.free': '無料',
    'cart.total': '合計',
    'cart.proceed': 'お支払いへ進む',
    'cart.confirm': '確認して支払う',
    'cart.continue': '← 買い物を続ける',
    'footer.shop': '商品',
    'footer.learn': '学ぶ',
    'footer.company': '会社',
    'footer.account': 'アカウント',
    'footer.legal': '法的情報',
    'cookie.title': 'プライバシーを大切に',
    'cookie.desc': 'カート、設定、分析のためにCookieを使用しています。',
    'cookie.accept': 'すべて許可',
    'cookie.essential': '必要なもののみ',
  },
};

const LOCALE_NAMES: Record<Locale, string> = { en: 'EN', th: 'TH', ja: 'JA' };

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('matcha-locale') as Locale | null;
    if (saved && translations[saved]) setLocaleState(saved);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('matcha-locale', l);
  }, []);

  const t = useCallback((key: string) => {
    return translations[locale][key] ?? translations['en'][key] ?? key;
  }, [locale]);

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export { LOCALE_NAMES };
