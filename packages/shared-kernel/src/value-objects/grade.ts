export enum Grade {
  Ceremonial = 'CEREMONIAL',
  Premium = 'PREMIUM',
  Culinary = 'CULINARY',
}

export function isValidGrade(value: string): value is Grade {
  return Object.values(Grade).includes(value as Grade);
}
