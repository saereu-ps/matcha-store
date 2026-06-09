import { randomUUID } from 'node:crypto';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

abstract class Identifier {
  constructor(public readonly value: string) {
    if (!UUID_REGEX.test(value)) {
      throw new Error(`Invalid UUID: ${value}`);
    }
  }

  static generateUUID(): string {
    return randomUUID();
  }

  equals(other: Identifier): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}

export class UserId extends Identifier {
  static create(value?: string): UserId {
    return new UserId(value ?? Identifier.generateUUID());
  }
}

export class ProductId extends Identifier {
  static create(value?: string): ProductId {
    return new ProductId(value ?? Identifier.generateUUID());
  }
}

export class SubscriptionId extends Identifier {
  static create(value?: string): SubscriptionId {
    return new SubscriptionId(value ?? Identifier.generateUUID());
  }
}

export class OrderId extends Identifier {
  static create(value?: string): OrderId {
    return new OrderId(value ?? Identifier.generateUUID());
  }
}
