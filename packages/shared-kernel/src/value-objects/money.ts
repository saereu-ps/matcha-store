import { CurrencyCode } from './currency-code.js';

export class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: CurrencyCode,
  ) {}

  static create(amount: number, currency: CurrencyCode): Money {
    if (!Number.isFinite(amount)) {
      throw new Error('Money amount must be a finite number');
    }
    return new Money(Math.round(amount * 100) / 100, currency);
  }

  static zero(currency: CurrencyCode): Money {
    return new Money(0, currency);
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return Money.create(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return Money.create(this.amount - other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return Money.create(this.amount * factor, this.currency);
  }

  isZero(): boolean {
    return this.amount === 0;
  }

  isPositive(): boolean {
    return this.amount > 0;
  }

  isNegative(): boolean {
    return this.amount < 0;
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency.equals(other.currency);
  }

  format(locale = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.currency.value,
    }).format(this.amount);
  }

  private assertSameCurrency(other: Money): void {
    if (!this.currency.equals(other.currency)) {
      throw new Error(
        `Cannot operate on different currencies: ${this.currency.value} vs ${other.currency.value}`,
      );
    }
  }
}
