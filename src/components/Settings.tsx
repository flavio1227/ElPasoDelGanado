import React from 'react';
import { Globe, Download, Upload, Trash2, Info } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Language } from '../types';
import { clearAllData, exportData, importData } from '../utils/db';

export default function Settings() {
  const { t, language, setLanguage, refreshBrews } = useApp();

  const handleExport = async () => {
    try {
      const data = await exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `coffee-companion-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert(t('common.error'));
    }
  };

  const handleImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        await importData(text);
        await refreshBrews();
        alert(t('common.saved'));
      } catch (error) {
        alert(t('common.error'));
      }
    };

    input.click();
  };

  const handleClear = async () => {
    if (confirm(t('settings.confirmClear'))) {
      try {
        await clearAllData();
        await refreshBrews();
        alert(t('common.saved'));
      } catch (error) {
        alert(t('common.error'));
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 pb-8">
      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-bold text-brown-900 mb-1">{t('settings.title')}</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-brown-100 p-5 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-brown-700 font-medium mb-3">
            <Globe size={20} />
            <span>{t('settings.language')}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setLanguage('en')}
              className={`p-4 rounded-xl border-2 transition-all ${
                language === 'en'
                  ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-md'
                  : 'border-brown-200 hover:border-amber-300 text-brown-700'
              }`}
            >
              <div className="text-2xl mb-1">🇺🇸</div>
              <div className="font-medium">English</div>
            </button>

            <button
              onClick={() => setLanguage('es')}
              className={`p-4 rounded-xl border-2 transition-all ${
                language === 'es'
                  ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-md'
                  : 'border-brown-200 hover:border-amber-300 text-brown-700'
              }`}
            >
              <div className="text-2xl mb-1">🇪🇸</div>
              <div className="font-medium">Español</div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-brown-100 p-5 space-y-3">
        <h2 className="font-semibold text-brown-700 mb-3">{t('settings.exportData')}</h2>

        <button
          onClick={handleExport}
          className="w-full flex items-center justify-center gap-3 bg-green-50 text-green-700 font-medium py-4 px-6 rounded-xl hover:bg-green-100 transition-colors border-2 border-green-200"
        >
          <Download size={20} />
          {t('settings.exportData')}
        </button>

        <button
          onClick={handleImport}
          className="w-full flex items-center justify-center gap-3 bg-blue-50 text-blue-700 font-medium py-4 px-6 rounded-xl hover:bg-blue-100 transition-colors border-2 border-blue-200"
        >
          <Upload size={20} />
          {t('settings.importData')}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-red-200 p-5">
        <h2 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
          <Trash2 size={20} />
          {t('settings.clearData')}
        </h2>

        <p className="text-sm text-brown-600 mb-4">
          {t('settings.confirmClear')}
        </p>

        <button
          onClick={handleClear}
          className="w-full bg-red-50 text-red-700 font-medium py-4 px-6 rounded-xl hover:bg-red-100 transition-colors border-2 border-red-300"
        >
          {t('settings.clearData')}
        </button>
      </div>

      <div className="bg-gradient-to-br from-amber-600 to-brown-700 text-white rounded-2xl shadow-lg p-6">
        <div className="flex items-start gap-3 mb-3">
          <Info size={24} />
          <div>
            <h2 className="font-bold text-lg mb-1">{t('settings.about')}</h2>
            <p className="text-amber-100 text-sm">{t('appTagline')}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-amber-200">{t('settings.version')}</span>
            <span className="font-semibold">1.0.0</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20 text-xs text-amber-100">
          <p className="font-semibold mb-2">{t('cafeName')}</p>
          <p>{t('developedBy')}</p>
          <p className="mt-2">Built with React + Vite</p>
          <p>Offline-first PWA</p>
          <p className="mt-2">© 2026 El Paso del Ganado</p>
        </div>
      </div>
    </div>
  );
}
