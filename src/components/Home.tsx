import React, { useMemo } from 'react';
import { Coffee, TrendingUp, Calendar, Clock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { brewingMethods } from '../data/brewingMethods';

interface HomeProps {
  onNavigate: (view: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const { t, brews, language } = useApp();

  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const todayBrews = brews.filter(b => b.date === today);
    const weekBrews = brews.filter(b => b.date >= oneWeekAgo);
    const monthBrews = brews.filter(b => b.date >= oneMonthAgo);

    return {
      today: {
        cups: todayBrews.length,
        grams: todayBrews.reduce((sum, b) => sum + b.coffeeGrams, 0),
      },
      week: {
        cups: weekBrews.length,
        grams: weekBrews.reduce((sum, b) => sum + b.coffeeGrams, 0),
      },
      month: {
        cups: monthBrews.length,
        grams: monthBrews.reduce((sum, b) => sum + b.coffeeGrams, 0),
      },
    };
  }, [brews]);

  const recentBrews = useMemo(() => brews.slice(0, 5), [brews]);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-bold text-brown-900 mb-1">
          {t('home.welcome')}
        </h1>
        <p className="text-brown-600">{t('appTagline')}</p>
        <p className="text-xs text-amber-700 mt-1 font-medium">{t('developedBy')}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-md border border-brown-100">
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <Coffee size={16} />
            <span className="text-xs font-medium">{t('home.todayConsumption')}</span>
          </div>
          <div className="text-2xl font-bold text-brown-900">{stats.today.cups}</div>
          <div className="text-xs text-brown-500">{stats.today.grams}g</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-brown-100">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <Calendar size={16} />
            <span className="text-xs font-medium">{t('home.thisWeek')}</span>
          </div>
          <div className="text-2xl font-bold text-brown-900">{stats.week.cups}</div>
          <div className="text-xs text-brown-500">{stats.week.grams}g</div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md border border-brown-100">
          <div className="flex items-center gap-2 text-brown-600 mb-2">
            <TrendingUp size={16} />
            <span className="text-xs font-medium">{t('home.thisMonth')}</span>
          </div>
          <div className="text-2xl font-bold text-brown-900">{stats.month.cups}</div>
          <div className="text-xs text-brown-500">{stats.month.grams}g</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('brew')}
          className="bg-gradient-to-br from-amber-600 to-brown-700 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
        >
          <Coffee size={32} className="mb-2" />
          <div className="font-semibold text-lg">{t('home.quickBrew')}</div>
        </button>

        <button
          onClick={() => onNavigate('analytics')}
          className="bg-white text-brown-700 p-6 rounded-2xl shadow-md border-2 border-brown-200 hover:border-amber-400 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          <TrendingUp size={32} className="mb-2" />
          <div className="font-semibold text-lg">{t('home.viewStats')}</div>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-brown-100 p-5">
        <h2 className="text-xl font-bold text-brown-900 mb-4 flex items-center gap-2">
          <Clock size={20} />
          {t('home.recentBrews')}
        </h2>

        {recentBrews.length === 0 ? (
          <div className="text-center py-8 text-brown-400">
            <Coffee size={48} className="mx-auto mb-3 opacity-30" />
            <p>{t('home.noBrews')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentBrews.map((brew) => (
              <div
                key={brew.id}
                className="flex items-center justify-between p-3 bg-brown-50 rounded-xl hover:bg-brown-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Coffee size={20} className="text-amber-700" />
                  </div>
                  <div>
                    <div className="font-medium text-brown-900">
                      {brewingMethods[brew.method].name[language]}
                    </div>
                    <div className="text-sm text-brown-500">
                      {brew.coffeeGrams}g • {brew.waterMl}ml
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-brown-500">
                  <div>{formatTime(brew.time)}</div>
                  {brew.rating && (
                    <div className="text-amber-600">{'★'.repeat(brew.rating)}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
