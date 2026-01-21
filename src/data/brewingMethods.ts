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
    pours: {
      count: 3,
      poursDescription: {
        en: 'Bloom (2-3x coffee weight), then 2-3 main pours in spiral pattern',
        es: 'Bloom (2-3x peso del café), luego 2-3 vertidas principales en espiral'
      }
    },
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
    pours: {
      count: 1,
      poursDescription: {
        en: 'Single pour: all water at once (immersion method)',
        es: 'Una sola vertida: todo el agua de una vez (método de inmersión)'
      }
    },
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
    pours: {
      count: 1,
      poursDescription: {
        en: 'Single pour: all water at once',
        es: 'Una sola vertida: todo el agua de una vez'
      }
    },
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
    pours: {
      count: 1,
      poursDescription: {
        en: 'Single pour: all water at once (inverted method)',
        es: 'Una sola vertida: todo el agua de una vez (método invertido)'
      }
    },
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
    pours: {
      count: 1,
      poursDescription: {
        en: 'Single continuous pour: pressurized extraction',
        es: 'Una sola vertida continua: extracción presurizada'
      }
    },
    description: {
      en: 'Concentrated coffee shot. Foundation for many drinks. Requires espresso machine.',
      es: 'Café concentrado. Base de muchas bebidas. Requiere máquina de espresso.'
    }
  },
  'chemex': {
    name: { en: 'Chemex', es: 'Chemex' },
    ratioRange: [15, 16],
    grindSize: { en: 'Medium-coarse (like sea salt)', es: 'Medio-grueso (como sal marina)' },
    brewTime: '4:00 - 5:00',
    waterTemp: '92-94°C (197-201°F)',
    bloomTime: '30-45 seconds',
    bloomRatio: '2x coffee weight',
    pours: {
      count: 3,
      poursDescription: {
        en: 'Bloom (2x coffee weight), then 2-3 main pours',
        es: 'Bloom (2x peso del café), luego 2-3 vertidas principales'
      }
    },
    description: {
      en: 'Pour-over method with thick filters for an exceptionally clean, bright cup. Perfect for highlighting delicate flavors and acidity.',
      es: 'Método de vertido con filtros gruesos para una taza excepcionalmente limpia y brillante. Perfecto para resaltar sabores delicados y acidez.'
    }
  },
  'percolator': {
    name: { en: 'Percolator', es: 'Percoladora' },
    ratioRange: [10, 12],
    grindSize: { en: 'Coarse (like sea salt)', es: 'Grueso (como sal marina)' },
    brewTime: '5:00 - 7:00',
    waterTemp: '95-100°C (203-212°F)',
    pours: {
      count: 1,
      poursDescription: {
        en: 'Single pour: all water at once (circulation method)',
        es: 'Una sola vertida: todo el agua de una vez (método de circulación)'
      }
    },
    description: {
      en: 'Traditional and simple method. Water circulates through coffee grounds producing a strong, robust cup. Perfect for camping and large batches.',
      es: 'Método tradicional y simple. El agua circula a través del café molido produciendo una taza fuerte y robusta. Perfecto para camping y grandes cantidades.'
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

export function calculatePours(method: BrewingMethod, coffeeGrams: number, totalWaterMl: number): Array<{ pour: number; ml: number; description: string }> {
  const methodData = brewingMethods[method];
  const pours = methodData.pours;
  
  if (!pours) {
    // Si no hay información de vertidas, retornar una sola vertida con todo el agua
    return [{ pour: 1, ml: totalWaterMl, description: 'Una sola vertida' }];
  }

  const result: Array<{ pour: number; ml: number; description: string }> = [];
  
  if (pours.count === 1) {
    // Métodos de una sola vertida (AeroPress, French Press, Percolator, etc.)
    result.push({
      pour: 1,
      ml: totalWaterMl,
      description: methodData.pours?.poursDescription?.es || 'Una sola vertida'
    });
  } else {
    // Métodos con múltiples vertidas (V60, Chemex)
    // Primera vertida: Bloom
    const bloomMultiplier = method === 'v60' ? 2.5 : 2; // V60 usa 2-3x, Chemex usa 2x
    const bloomMl = Math.round(coffeeGrams * bloomMultiplier);
    
    result.push({
      pour: 1,
      ml: bloomMl,
      description: `Bloom (${bloomMultiplier}x peso del café)`
    });
    
    // Vertidas restantes
    const remainingWater = totalWaterMl - bloomMl;
    const poursPerMainPour = Math.ceil(remainingWater / (pours.count - 1));
    
    for (let i = 2; i <= pours.count; i++) {
      const isLast = i === pours.count;
      const pourMl = isLast 
        ? remainingWater - (poursPerMainPour * (pours.count - 2))
        : poursPerMainPour;
      
      result.push({
        pour: i,
        ml: Math.round(pourMl),
        description: `Vertida ${i - 1}`
      });
    }
  }
  
  return result;
}
