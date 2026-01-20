import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, AppSettings, CoffeeBrew } from '../types';
import { getSettings, saveSettings, getAllBrews, initDB } from '../utils/db';
import { translations } from '../utils/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  brews: CoffeeBrew[];
  refreshBrews: () => Promise<void>;
  t: (key: string) => string;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [brews, setBrews] = useState<CoffeeBrew[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        await initDB();
        const settings = await getSettings();

        if (settings) {
          setLanguageState(settings.language);
          setHasCompletedOnboarding(settings.hasCompletedOnboarding);
        } else {
          const browserLang = navigator.language.toLowerCase();
          const detectedLang: Language = browserLang.startsWith('es') ? 'es' : 'en';
          setLanguageState(detectedLang);
        }

        await refreshBrews();
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    const settings = await getSettings();
    await saveSettings({
      ...settings,
      language: lang,
      hasCompletedOnboarding: settings?.hasCompletedOnboarding || false,
    });
  };

  const completeOnboarding = async () => {
    setHasCompletedOnboarding(true);
    const settings = await getSettings();
    await saveSettings({
      ...settings,
      language,
      hasCompletedOnboarding: true,
    });
  };

  const refreshBrews = async () => {
    try {
      const allBrews = await getAllBrews();
      setBrews(allBrews.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`).getTime();
        const dateB = new Date(`${b.date} ${b.time}`).getTime();
        return dateB - dateA;
      }));
    } catch (error) {
      console.error('Failed to load brews:', error);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        hasCompletedOnboarding,
        completeOnboarding,
        brews,
        refreshBrews,
        t,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
