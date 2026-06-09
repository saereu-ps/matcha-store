const VALID_LANGUAGES = ['en', 'ja', 'de', 'fr', 'es', 'ar', 'he'] as const;
const VALID_REGIONS = ['US', 'GB', 'JP', 'DE', 'FR', 'ES'] as const;

type LanguageCode = (typeof VALID_LANGUAGES)[number];
type RegionCode = (typeof VALID_REGIONS)[number];

export class Locale {
  private constructor(
    public readonly language: LanguageCode,
    public readonly region?: RegionCode,
  ) {}

  static create(language: string, region?: string): Locale {
    const lang = language.toLowerCase() as LanguageCode;
    if (!VALID_LANGUAGES.includes(lang)) {
      throw new Error(`Invalid language code: ${language}`);
    }
    if (region) {
      const reg = region.toUpperCase() as RegionCode;
      if (!VALID_REGIONS.includes(reg)) {
        throw new Error(`Invalid region code: ${region}`);
      }
      return new Locale(lang, reg);
    }
    return new Locale(lang);
  }

  static default(): Locale {
    return new Locale('en', 'US');
  }

  get tag(): string {
    return this.region ? `${this.language}-${this.region}` : this.language;
  }

  get isRTL(): boolean {
    return this.language === 'ar' || this.language === 'he';
  }

  equals(other: Locale): boolean {
    return this.language === other.language && this.region === other.region;
  }

  toString(): string {
    return this.tag;
  }
}
