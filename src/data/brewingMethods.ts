import { BrewingMethod, BrewingMethodData } from '../types';

export const brewingMethods: Record<BrewingMethod, BrewingMethodData> = {
  'v60': {
    name: { en: 'V60 Pour Over', es: 'V60 Pour Over' },
    ratioRange: [15, 17],
    grindSize: { en: 'Medium (like sea salt)', es: 'Medio (como sal marina)' },
    brewTime: '2:30 - 3:00',
    waterTemp: '92-96°C (197-205°F)',
    bloomTime: '30-45 seconds',
    bloomRatio: '2-3x coffee weight',
    description: {
      en: 'Pour-over method that highlights clarity and complexity of flavors. Perfect for lighter roasts.',
      es: 'Método de vertido que resalta la claridad y complejidad de sabores. Perfecto para tuestes claros.'
    }
  },
  'french-press': {
    name: { en: 'French Press', es: 'Prensa Francesa' },
    ratioRange: [12, 15],
    grindSize: { en: 'Coarse (like breadcrumbs)', es: 'Grueso (como pan rallado)' },
    brewTime: '4:00 - 5:00',
    waterTemp: '92-96°C (197-205°F)',
    bloomTime: '30 seconds',
    bloomRatio: 'Stir gently',
    description: {
      en: 'Full-bodied, rich coffee with oils and sediment. Great for bold, darker roasts.',
      es: 'Café con cuerpo completo, rico en aceites y sedimentos. Ideal para tuestes oscuros y audaces.'
    }
  },
  'aeropress': {
    name: { en: 'AeroPress', es: 'AeroPress' },
    ratioRange: [14, 16],
    grindSize: { en: 'Medium-fine', es: 'Medio-fino' },
    brewTime: '1:30 - 2:30',
    waterTemp: '80-90°C (176-194°F)',
    bloomTime: '30 seconds',
    bloomRatio: 'Fill halfway',
    description: {
      en: 'Versatile and quick method. Clean cup with full flavor. Perfect for travel.',
      es: 'Método versátil y rápido. Taza limpia con sabor completo. Perfecto para viajar.'
    }
  },
  'aeropress-inverted': {
    name: { en: 'AeroPress Inverted', es: 'AeroPress Invertido' },
    ratioRange: [14, 16],
    grindSize: { en: 'Medium-fine', es: 'Medio-fino' },
    brewTime: '2:00 - 3:00',
    waterTemp: '80-90°C (176-194°F)',
    bloomTime: '30 seconds',
    bloomRatio: 'Full immersion',
    description: {
      en: 'Extended contact time for fuller extraction. More body than standard method.',
      es: 'Tiempo de contacto extendido para extracción completa. Más cuerpo que el método estándar.'
    }
  },
  'espresso': {
    name: { en: 'Espresso', es: 'Espresso' },
    ratioRange: [2, 2.5],
    grindSize: { en: 'Very fine (like flour)', es: 'Muy fino (como harina)' },
    brewTime: '25-30 seconds',
    waterTemp: '90-96°C (194-205°F)',
    description: {
      en: 'Concentrated coffee shot. Foundation for many drinks. Requires espresso machine.',
      es: 'Café concentrado. Base de muchas bebidas. Requiere máquina de espresso.'
    }
  }
};

export function calculateCoffeeWater(input: number, isWater: boolean, ratio: number): { coffee: number; water: number } {
  if (isWater) {
    const coffee = Math.round(input / ratio);
    return { coffee, water: input };
  } else {
    const water = Math.round(input * ratio);
    return { coffee: input, water };
  }
}

export function getRatioByStrength(method: BrewingMethod, strength: 'light' | 'balanced' | 'strong'): number {
  const range = brewingMethods[method].ratioRange;

  switch (strength) {
    case 'light':
      return range[1];
    case 'strong':
      return range[0];
    case 'balanced':
    default:
      return (range[0] + range[1]) / 2;
  }
}
