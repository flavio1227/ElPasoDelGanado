import React, { useState, useMemo } from 'react';
import { Coffee, Trash2, Star } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { BrewingMethod } from '../types';
import { brewingMethods } from '../data/brewingMethods';
import { deleteBrew } from '../utils/db';

export default function History() {
  const { t, brews, language, refreshBrews } = useApp();
  const [filterMethod, setFilterMethod] = useState<BrewingMethod | 'all'>('all');

  const filteredBrews = useMemo(() => {
    if (filterMethod === 'all') return brews;
    return brews.filter(b => b.method === filterMethod);
  }, [brews, filterMethod]);

  const handleDelete = async (id: string) => {
    if (confirm(t('settings.confirmClear'))) {
      await deleteBrew(id);
      await refreshBrews();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const methods: (BrewingMethod | 'all')[] = ['all', 'v60', 'french-press', 'aeropress', 'aeropress-inverted', 'espresso'];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 pb-8">
      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-bold text-brown-900 mb-1">{t('history.title')}</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-brown-100 p-4">
        <label className="block text-sm font-medium text-brown-700 mb-2">
          {t('history.filterBy')}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {methods.map((method) => (
            <button
              key={method}
              onClick={() => setFilterMethod(method)}
              className={`px-4 py-2 rounded-xl border-2 transition-all whitespace-nowrap text-sm font-medium ${
                filterMethod === method
                  ? 'border-amber-600 bg-amber-50 text-amber-900'
                  : 'border-brown-200 hover:border-amber-300 text-brown-600'
              }`}
            >
              {method === 'all' ? t('history.all') : brewingMethods[method].name[language]}
            </button>
          ))}
        </div>
      </div>

      {filteredBrews.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-brown-100 p-12 text-center">
          <Coffee size={64} className="mx-auto mb-4 text-brown-300" />
          <p className="text-brown-500">{t('history.noHistory')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBrews.map((brew) => (
            <div
              key={brew.id}
              className="bg-white rounded-2xl shadow-md border border-brown-100 p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-3 rounded-xl">
                    <Coffee size={24} className="text-amber-700" />
                  </div>
                  <div>
                    <div className="font-bold text-brown-900 text-lg">
                      {brewingMethods[brew.method].name[language]}
                    </div>
                    <div className="text-sm text-brown-500">
                      {formatDate(brew.date)} • {formatTime(brew.time)}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(brew.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-brown-50 rounded-lg p-3">
                  <div className="text-xs text-brown-500 mb-1">{t('brew.coffeeAmount')}</div>
                  <div className="font-semibold text-brown-900">{brew.coffeeGrams}g</div>
                </div>

                <div className="bg-brown-50 rounded-lg p-3">
                  <div className="text-xs text-brown-500 mb-1">{t('brew.waterAmount')}</div>
                  <div className="font-semibold text-brown-900">{brew.waterMl}ml</div>
                </div>

                <div className="bg-brown-50 rounded-lg p-3">
                  <div className="text-xs text-brown-500 mb-1">{t('brew.ratio')}</div>
                  <div className="font-semibold text-brown-900">1:{brew.ratio.toFixed(1)}</div>
                </div>

                {brew.rating && (
                  <div className="bg-brown-50 rounded-lg p-3">
                    <div className="text-xs text-brown-500 mb-1">{t('brew.rating')}</div>
                    <div className="flex gap-1">
                      {Array.from({ length: brew.rating }).map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {(brew.origin || brew.processingMethod || brew.roastLevel) && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {brew.origin && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200">
                      {brew.origin}
                    </span>
                  )}
                  {brew.processingMethod && (
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200">
                      {t(`processing.${brew.processingMethod}`)}
                    </span>
                  )}
                  {brew.roastLevel && (
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm border border-orange-200">
                      {t(`roast.${brew.roastLevel}`)}
                    </span>
                  )}
                </div>
              )}

              {brew.notes && (
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                  <div className="text-xs text-brown-500 mb-1">{t('brew.notes')}</div>
                  <div className="text-sm text-brown-700">{brew.notes}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
