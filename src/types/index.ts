export type Language = 'en' | 'es';

export type BrewingMethod = 'v60' | 'french-press' | 'aeropress' | 'aeropress-inverted' | 'espresso' | 'chemex' | 'percolator';

export type ProcessingMethod = 'washed' | 'natural' | 'honey-white' | 'honey-yellow' | 'honey-red' | 'honey-black';

export type RoastLevel = 'light' | 'medium' | 'medium-dark' | 'dark';

export type Strength = 'light' | 'balanced' | 'strong';

export interface BrewingMethodData {
  name: { en: string; es: string };
  ratioRange: [number, number];
  grindSize: { en: string; es: string };
  brewTime: string;
  waterTemp: string;
  bloomTime?: string;
  bloomRatio?: string;
  description: { en: string; es: string };
  pours?: {
    count: number; // Número de vertidas (incluyendo bloom)
    bloomMl?: number; // ml para bloom (opcional, algunos métodos no usan bloom)
    poursDescription?: { en: string; es: string }; // Descripción de las vertidas
  };
}

export interface FlavorProfile {
  name: { en: string; es: string };
  characteristics: { en: string[]; es: string[] };
}

export interface CoffeeBrew {
  id: string;
  date: string;
  time: string;
  method: BrewingMethod;
  coffeeGrams: number;
  waterMl: number;
  ratio: number;
  origin?: string;
  processingMethod?: ProcessingMethod;
  roastLevel?: RoastLevel;
  rating?: number;
  notes?: string;
}

export interface DailyStats {
  date: string;
  totalCups: number;
  totalCoffeeGrams: number;
  totalWaterMl: number;
}

export interface AppSettings {
  language: Language;
  hasCompletedOnboarding: boolean;
  brandName?: string;
  themeColor?: string;
}
