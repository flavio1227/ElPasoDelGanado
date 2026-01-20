import React, { useMemo, useState } from 'react';
import { TrendingUp, Coffee, BarChart3, PieChart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { brewingMethods } from '../data/brewingMethods';
import { BrewingMethod } from '../types';

type Period = 'week' | 'month' | 'year';

export default function Analytics() {
  const { t, brews, language } = useApp();
  const [period, setPeriod] = useState<Period>('month');

  const stats = useMemo(() => {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
    }

    const filteredBrews = brews.filter(b => new Date(b.date) >= startDate);

    const totalCups = filteredBrews.length;
    const totalCoffee = filteredBrews.reduce((sum, b) => sum + b.coffeeGrams, 0);
    const totalWater = filteredBrews.reduce((sum, b) => sum + b.waterMl, 0);

    const days = Math.ceil((now.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    const dailyAverage = totalCups / days;

    const methodCounts: Record<string, number> = {};
    filteredBrews.forEach(b => {
      methodCounts[b.method] = (methodCounts[b.method] || 0) + 1;
    });

    const favoriteMethod = Object.entries(methodCounts).sort((a, b) => b[1] - a[1])[0];

    const processCounts: Record<string, number> = {};
    filteredBrews.forEach(b => {
      if (b.processingMethod) {
        processCounts[b.processingMethod] = (processCounts[b.processingMethod] || 0) + 1;
      }
    });

    const favoriteProcess = Object.entries(processCounts).sort((a, b) => b[1] - a[1])[0];

    const dailyData: Record<string, number> = {};
    filteredBrews.forEach(b => {
      dailyData[b.date] = (dailyData[b.date] || 0) + 1;
    });

    const chartData = Object.entries(dailyData)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-14);

    return {
      totalCups,
      totalCoffee,
      totalWater,
      dailyAverage,
      favoriteMethod,
      favoriteProcess,
      methodCounts,
      processCounts,
      chartData,
    };
  }, [brews, period]);

  const maxChartValue = Math.max(...stats.chartData.map(d => d[1]), 1);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 pb-8">
      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-bold text-brown-900 mb-1">{t('analytics.title')}</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-brown-100 p-4">
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 px-4 rounded-xl border-2 transition-all font-medium ${
                period === p
                  ? 'border-amber-600 bg-amber-50 text-amber-900'
                  : 'border-brown-200 hover:border-amber-300 text-brown-600'
              }`}
            >
              {t(`analytics.period.${p}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-amber-600 to-brown-700 text-white rounded-2xl shadow-lg p-5">
          <div className="flex items-center gap-2 mb-2">
            <Coffee size={20} />
            <span className="text-sm opacity-90">{t('analytics.totalBrews')}</span>
          </div>
          <div className="text-4xl font-bold">{stats.totalCups}</div>
          <div className="text-sm opacity-75 mt-1">
            {t('analytics.dailyAverage')}: {stats.dailyAverage.toFixed(1)}
          </div>
        </div>

        <div className="bg-white border-2 border-brown-200 rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-2 mb-2 text-brown-700">
            <TrendingUp size={20} />
            <span className="text-sm">{t('analytics.totalCoffee')}</span>
          </div>
          <div className="text-4xl font-bold text-brown-900">{stats.totalCoffee}g</div>
          <div className="text-sm text-brown-500 mt-1">
            {(stats.totalCoffee / 1000).toFixed(2)} kg
          </div>
        </div>
      </div>

      {stats.chartData.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md border border-brown-100 p-5">
          <h2 className="font-bold text-brown-900 mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            {t('analytics.consumption')}
          </h2>

          <div className="flex items-end justify-between gap-1 h-40">
            {stats.chartData.map(([date, count]) => {
              const height = (count / maxChartValue) * 100;
              const dateObj = new Date(date);
              const day = dateObj.getDate();

              return (
                <div key={date} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col justify-end h-32">
                    <div
                      className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg transition-all hover:from-amber-700 hover:to-amber-500 relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brown-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {count} {count === 1 ? 'cup' : 'cups'}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-brown-500 font-medium">{day}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.favoriteMethod && (
          <div className="bg-white rounded-2xl shadow-md border border-brown-100 p-5">
            <h3 className="font-semibold text-brown-700 mb-3 flex items-center gap-2">
              <Coffee size={18} />
              {t('analytics.favoriteMethod')}
            </h3>

            <div className="space-y-2">
              {Object.entries(stats.methodCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([method, count]) => {
                  const percentage = (count / stats.totalCups) * 100;
                  return (
                    <div key={method}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-brown-700 font-medium">
                          {brewingMethods[method as BrewingMethod].name[language]}
                        </span>
                        <span className="text-brown-500">{count}</span>
                      </div>
                      <div className="w-full bg-brown-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {stats.favoriteProcess && (
          <div className="bg-white rounded-2xl shadow-md border border-brown-100 p-5">
            <h3 className="font-semibold text-brown-700 mb-3 flex items-center gap-2">
              <PieChart size={18} />
              {t('analytics.favoriteProcess')}
            </h3>

            <div className="space-y-2">
              {Object.entries(stats.processCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([process, count]) => {
                  const totalProcessed = Object.values(stats.processCounts).reduce((a, b) => a + b, 0);
                  const percentage = (count / totalProcessed) * 100;
                  return (
                    <div key={process}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-brown-700 font-medium">
                          {t(`processing.${process}`)}
                        </span>
                        <span className="text-brown-500">{count}</span>
                      </div>
                      <div className="w-full bg-brown-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
