import { Language } from '../types';

export const translations = {
  en: {
    appName: 'Coffee Companion',
    appTagline: 'Your Personal Brewing Assistant',
    cafeName: 'El Paso del Ganado',
    developedBy: 'Developed by El Paso del Ganado',

    onboarding: {
      welcome: 'Welcome to Coffee Companion',
      subtitle: 'Your personal coffee assistant, tracker, and brewing guide',
      selectLanguage: 'Select Your Language',
      continue: 'Continue',
    },

    nav: {
      home: 'Home',
      brew: 'Brew',
      history: 'History',
      analytics: 'Analytics',
      settings: 'Settings',
    },

    home: {
      welcome: 'Welcome Back',
      todayConsumption: 'Today',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      cups: 'cups',
      grams: 'grams',
      quickBrew: 'Quick Brew',
      viewStats: 'View Analytics',
      recentBrews: 'Recent Brews',
      noBrews: 'No brews yet. Start your first one!',
    },

    brew: {
      title: 'Brew Coffee',
      selectMethod: 'Select Brewing Method',
      coffeeAmount: 'Coffee (grams)',
      waterAmount: 'Water (ml)',
      selectStrength: 'Select Strength',
      strength: {
        light: 'Light',
        balanced: 'Balanced',
        strong: 'Strong',
      },
      calculate: 'Calculate',
      brewNow: 'Brew Now',
      logBrew: 'Log This Brew',
      optional: 'Optional Details',
      origin: 'Origin / Region',
      processing: 'Processing Method',
      roastLevel: 'Roast Level',
      rating: 'Rate Your Brew',
      notes: 'Notes',
      save: 'Save Brew',
      cancel: 'Cancel',
      brewGuide: 'Brewing Guide',
      ratio: 'Ratio',
      grindSize: 'Grind Size',
      brewTime: 'Brew Time',
      waterTemp: 'Water Temperature',
      bloom: 'Bloom',
      expectedFlavors: 'Expected Flavor Profile',
    },

    methods: {
      v60: 'V60 Pour Over',
      'french-press': 'French Press',
      aeropress: 'AeroPress',
      'aeropress-inverted': 'AeroPress Inverted',
      espresso: 'Espresso',
      chemex: 'Chemex',
    },

    processing: {
      washed: 'Washed',
      natural: 'Natural',
      'honey-white': 'White Honey',
      'honey-yellow': 'Yellow Honey',
      'honey-red': 'Red Honey',
      'honey-black': 'Black Honey',
    },

    roast: {
      light: 'Light Roast',
      medium: 'Medium Roast',
      'medium-dark': 'Medium-Dark Roast',
      dark: 'Dark Roast',
    },

    analytics: {
      title: 'Analytics',
      consumption: 'Consumption Trends',
      dailyAverage: 'Daily Average',
      weeklyAverage: 'Weekly Average',
      monthlyTotal: 'Monthly Total',
      favoriteMethod: 'Favorite Method',
      favoriteProcess: 'Favorite Process',
      totalBrews: 'Total Brews',
      totalCoffee: 'Total Coffee Used',
      period: {
        week: 'Week',
        month: 'Month',
        year: 'Year',
      },
    },

    history: {
      title: 'Brew History',
      filterBy: 'Filter by',
      all: 'All',
      method: 'Method',
      delete: 'Delete',
      edit: 'Edit',
      noHistory: 'No brew history yet',
    },

    settings: {
      title: 'Settings',
      language: 'Language',
      about: 'About',
      version: 'Version',
      exportData: 'Export Data',
      importData: 'Import Data',
      clearData: 'Clear All Data',
      confirmClear: 'Are you sure? This cannot be undone.',
    },

    common: {
      yes: 'Yes',
      no: 'No',
      ok: 'OK',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      saved: 'Saved successfully',
    },
  },

  es: {
    appName: 'Coffee Companion',
    appTagline: 'Tu Asistente Personal de Café',
    cafeName: 'El Paso del Ganado',
    developedBy: 'Desarrollado por El Paso del Ganado',

    onboarding: {
      welcome: 'Bienvenido a Coffee Companion',
      subtitle: 'Tu asistente personal de café, registro y guía de preparación',
      selectLanguage: 'Selecciona tu Idioma',
      continue: 'Continuar',
    },

    nav: {
      home: 'Inicio',
      brew: 'Preparar',
      history: 'Historial',
      analytics: 'Análisis',
      settings: 'Ajustes',
    },

    home: {
      welcome: 'Bienvenido de Nuevo',
      todayConsumption: 'Hoy',
      thisWeek: 'Esta Semana',
      thisMonth: 'Este Mes',
      cups: 'tazas',
      grams: 'gramos',
      quickBrew: 'Preparación Rápida',
      viewStats: 'Ver Análisis',
      recentBrews: 'Preparaciones Recientes',
      noBrews: '¡Aún no hay preparaciones. Comienza la primera!',
    },

    brew: {
      title: 'Preparar Café',
      selectMethod: 'Selecciona Método de Preparación',
      coffeeAmount: 'Café (gramos)',
      waterAmount: 'Agua (ml)',
      selectStrength: 'Selecciona Intensidad',
      strength: {
        light: 'Suave',
        balanced: 'Balanceado',
        strong: 'Fuerte',
      },
      calculate: 'Calcular',
      brewNow: 'Preparar Ahora',
      logBrew: 'Registrar Esta Preparación',
      optional: 'Detalles Opcionales',
      origin: 'Origen / Región',
      processing: 'Método de Procesamiento',
      roastLevel: 'Nivel de Tueste',
      rating: 'Califica tu Preparación',
      notes: 'Notas',
      save: 'Guardar Preparación',
      cancel: 'Cancelar',
      brewGuide: 'Guía de Preparación',
      ratio: 'Proporción',
      grindSize: 'Tamaño de Molido',
      brewTime: 'Tiempo de Preparación',
      waterTemp: 'Temperatura del Agua',
      bloom: 'Floración',
      expectedFlavors: 'Perfil de Sabor Esperado',
    },

    methods: {
      v60: 'V60 Pour Over',
      'french-press': 'Prensa Francesa',
      aeropress: 'AeroPress',
      'aeropress-inverted': 'AeroPress Invertido',
      espresso: 'Espresso',
      chemex: 'Chemex',
    },

    processing: {
      washed: 'Lavado',
      natural: 'Natural',
      'honey-white': 'Honey Blanco',
      'honey-yellow': 'Honey Amarillo',
      'honey-red': 'Honey Rojo',
      'honey-black': 'Honey Negro',
    },

    roast: {
      light: 'Tueste Claro',
      medium: 'Tueste Medio',
      'medium-dark': 'Tueste Medio-Oscuro',
      dark: 'Tueste Oscuro',
    },

    analytics: {
      title: 'Análisis',
      consumption: 'Tendencias de Consumo',
      dailyAverage: 'Promedio Diario',
      weeklyAverage: 'Promedio Semanal',
      monthlyTotal: 'Total Mensual',
      favoriteMethod: 'Método Favorito',
      favoriteProcess: 'Proceso Favorito',
      totalBrews: 'Total de Preparaciones',
      totalCoffee: 'Total de Café Usado',
      period: {
        week: 'Semana',
        month: 'Mes',
        year: 'Año',
      },
    },

    history: {
      title: 'Historial de Preparaciones',
      filterBy: 'Filtrar por',
      all: 'Todos',
      method: 'Método',
      delete: 'Eliminar',
      edit: 'Editar',
      noHistory: 'Aún no hay historial de preparaciones',
    },

    settings: {
      title: 'Ajustes',
      language: 'Idioma',
      about: 'Acerca de',
      version: 'Versión',
      exportData: 'Exportar Datos',
      importData: 'Importar Datos',
      clearData: 'Borrar Todos los Datos',
      confirmClear: '¿Estás seguro? Esto no se puede deshacer.',
    },

    common: {
      yes: 'Sí',
      no: 'No',
      ok: 'OK',
      close: 'Cerrar',
      back: 'Atrás',
      next: 'Siguiente',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      saved: 'Guardado exitosamente',
    },
  },
};

export type TranslationKey = typeof translations.en;

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}
