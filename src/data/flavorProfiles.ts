import { ProcessingMethod, RoastLevel, FlavorProfile } from '../types';

export const processingProfiles: Record<ProcessingMethod, FlavorProfile> = {
  'washed': {
    name: { en: 'Washed', es: 'Lavado' },
    characteristics: {
      en: ['Clean', 'Floral', 'Citrus', 'High acidity', 'Tea-like body', 'Bright'],
      es: ['Limpio', 'Floral', 'Cítrico', 'Alta acidez', 'Cuerpo tipo té', 'Brillante']
    }
  },
  'natural': {
    name: { en: 'Natural', es: 'Natural' },
    characteristics: {
      en: ['Fruity', 'Sweet', 'Wine-like', 'Full body', 'Berry notes', 'Complex'],
      es: ['Afrutado', 'Dulce', 'Vinoso', 'Cuerpo completo', 'Notas de bayas', 'Complejo']
    }
  },
  'honey-white': {
    name: { en: 'White Honey', es: 'Honey Blanco' },
    characteristics: {
      en: ['Subtle sweetness', 'Light body', 'Clean finish', 'Delicate', 'Mild honey notes'],
      es: ['Dulzor sutil', 'Cuerpo ligero', 'Final limpio', 'Delicado', 'Notas suaves de miel']
    }
  },
  'honey-yellow': {
    name: { en: 'Yellow Honey', es: 'Honey Amarillo' },
    characteristics: {
      en: ['Balanced sweetness', 'Medium body', 'Honey', 'Caramel', 'Smooth'],
      es: ['Dulzor balanceado', 'Cuerpo medio', 'Miel', 'Caramelo', 'Suave']
    }
  },
  'honey-red': {
    name: { en: 'Red Honey', es: 'Honey Rojo' },
    characteristics: {
      en: ['Rich sweetness', 'Full body', 'Stone fruit', 'Brown sugar', 'Syrupy'],
      es: ['Dulzor rico', 'Cuerpo completo', 'Fruta de hueso', 'Azúcar morena', 'Jarabe']
    }
  },
  'honey-black': {
    name: { en: 'Black Honey', es: 'Honey Negro' },
    characteristics: {
      en: ['Intense sweetness', 'Heavy body', 'Dark fruit', 'Molasses', 'Winey'],
      es: ['Dulzor intenso', 'Cuerpo pesado', 'Fruta oscura', 'Melaza', 'Vinoso']
    }
  }
};

export const roastProfiles: Record<RoastLevel, FlavorProfile> = {
  'light': {
    name: { en: 'Light Roast', es: 'Tueste Claro' },
    characteristics: {
      en: ['Highest acidity', 'Origin flavors', 'Floral', 'Fruity', 'Tea-like', 'Delicate'],
      es: ['Acidez máxima', 'Sabores de origen', 'Floral', 'Afrutado', 'Tipo té', 'Delicado']
    }
  },
  'medium': {
    name: { en: 'Medium Roast', es: 'Tueste Medio' },
    characteristics: {
      en: ['Balanced acidity', 'Caramel', 'Nutty', 'Chocolate', 'Well-rounded', 'Versatile'],
      es: ['Acidez balanceada', 'Caramelo', 'Nuez', 'Chocolate', 'Equilibrado', 'Versátil']
    }
  },
  'medium-dark': {
    name: { en: 'Medium-Dark Roast', es: 'Tueste Medio-Oscuro' },
    characteristics: {
      en: ['Lower acidity', 'Rich', 'Toasted', 'Bittersweet', 'Full body', 'Bold'],
      es: ['Acidez baja', 'Rico', 'Tostado', 'Agridulce', 'Cuerpo completo', 'Audaz']
    }
  },
  'dark': {
    name: { en: 'Dark Roast', es: 'Tueste Oscuro' },
    characteristics: {
      en: ['Minimal acidity', 'Smoky', 'Charred', 'Bitter', 'Heavy body', 'Intense'],
      es: ['Acidez mínima', 'Ahumado', 'Carbonizado', 'Amargo', 'Cuerpo pesado', 'Intenso']
    }
  }
};
