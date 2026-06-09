export class FlavorVector {
  private constructor(
    public readonly umami: number,
    public readonly sweet: number,
    public readonly vegetal: number,
    public readonly body: number,
  ) {}

  static create(umami: number, sweet: number, vegetal: number, body: number): FlavorVector {
    const values = [umami, sweet, vegetal, body];
    for (const v of values) {
      if (v < 0 || v > 100 || !Number.isFinite(v)) {
        throw new Error(`FlavorVector values must be between 0-100. Got: ${v}`);
      }
    }
    return new FlavorVector(
      Math.round(umami),
      Math.round(sweet),
      Math.round(vegetal),
      Math.round(body),
    );
  }

  distance(other: FlavorVector): number {
    return Math.sqrt(
      Math.pow(this.umami - other.umami, 2) +
        Math.pow(this.sweet - other.sweet, 2) +
        Math.pow(this.vegetal - other.vegetal, 2) +
        Math.pow(this.body - other.body, 2),
    );
  }

  similarity(other: FlavorVector): number {
    const maxDistance = Math.sqrt(4 * Math.pow(100, 2)); // max possible distance
    return 1 - this.distance(other) / maxDistance;
  }

  toArray(): [number, number, number, number] {
    return [this.umami, this.sweet, this.vegetal, this.body];
  }

  equals(other: FlavorVector): boolean {
    return (
      this.umami === other.umami &&
      this.sweet === other.sweet &&
      this.vegetal === other.vegetal &&
      this.body === other.body
    );
  }
}
