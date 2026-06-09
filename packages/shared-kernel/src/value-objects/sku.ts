const SKU_REGEX = /^[A-Z]+-[A-Z]+-\d+[A-Z]*-[A-Z]+$/;

export class SKU {
  private constructor(public readonly value: string) {}

  static create(value: string): SKU {
    const upper = value.toUpperCase();
    if (!SKU_REGEX.test(upper)) {
      throw new Error(
        `Invalid SKU format: ${value}. Expected: GRADE-ORIGIN-WEIGHT-GRIND (e.g., CER-UJI-30G-FINE)`,
      );
    }
    return new SKU(upper);
  }

  static fromParts(grade: string, origin: string, weight: string, grind: string): SKU {
    return SKU.create(`${grade}-${origin}-${weight}-${grind}`);
  }

  get grade(): string {
    return this.value.split('-')[0];
  }

  get origin(): string {
    return this.value.split('-')[1];
  }

  get weight(): string {
    return this.value.split('-')[2];
  }

  get grind(): string {
    return this.value.split('-')[3];
  }

  equals(other: SKU): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
