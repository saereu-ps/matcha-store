const VALID_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF'] as const;
type ValidCurrency = (typeof VALID_CURRENCIES)[number];

export class CurrencyCode {
  private constructor(public readonly value: ValidCurrency) {}

  static create(code: string): CurrencyCode {
    const upper = code.toUpperCase();
    if (!VALID_CURRENCIES.includes(upper as ValidCurrency)) {
      throw new Error(`Invalid currency code: ${code}. Valid: ${VALID_CURRENCIES.join(', ')}`);
    }
    return new CurrencyCode(upper as ValidCurrency);
  }

  static USD = new CurrencyCode('USD');
  static EUR = new CurrencyCode('EUR');
  static GBP = new CurrencyCode('GBP');
  static JPY = new CurrencyCode('JPY');

  equals(other: CurrencyCode): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
