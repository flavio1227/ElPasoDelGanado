import React from 'react';
import { Coffee, Globe } from 'lucide-react';
import { Language } from '../types';
import { useApp } from '../contexts/AppContext';

export default function Onboarding() {
  const { language, setLanguage, completeOnboarding, t } = useApp();

  const handleContinue = () => {
    completeOnboarding();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-amber-600 to-brown-700 p-4 rounded-3xl shadow-xl">
              <Coffee size={64} className="text-white" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-brown-900 mb-2">
            {t('onboarding.welcome')}
          </h1>
          <p className="text-lg text-brown-600 mb-1">
            {t('onboarding.subtitle')}
          </p>
          <p className="text-sm text-amber-700 font-medium">
            {t('developedBy')}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-brown-700 font-medium">
              <Globe size={20} />
              <span>{t('onboarding.selectLanguage')}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLanguage('en')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  language === 'en'
                    ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-md'
                    : 'border-gray-200 hover:border-amber-300 text-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">🇺🇸</div>
                <div className="font-medium">English</div>
              </button>

              <button
                onClick={() => setLanguage('es')}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  language === 'es'
                    ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-md'
                    : 'border-gray-200 hover:border-amber-300 text-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">🇪🇸</div>
                <div className="font-medium">Español</div>
              </button>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-amber-600 to-brown-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-amber-700 hover:to-brown-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {t('onboarding.continue')}
          </button>
        </div>
      </div>
    </div>
  );
}
