import React, { useState, useMemo } from 'react';
import { Coffee, Thermometer, Clock, Droplets, Star } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { BrewingMethod, Strength, ProcessingMethod, RoastLevel } from '../types';
import { brewingMethods, calculateCoffeeWater, getRatioByStrength } from '../data/brewingMethods';
import { processingProfiles, roastProfiles } from '../data/flavorProfiles';
import { saveBrew } from '../utils/db';

export default function Brew() {
  const { t, language, refreshBrews } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<BrewingMethod>('v60');
  const [inputValue, setInputValue] = useState<string>('');
  const [inputType, setInputType] = useState<'coffee' | 'water'>('coffee');
  const [strength, setStrength] = useState<Strength>('balanced');
  const [showLogForm, setShowLogForm] = useState(false);

  const [origin, setOrigin] = useState('');
  const [processing, setProcessing] = useState<ProcessingMethod | ''>('');
  const [roast, setRoast] = useState<RoastLevel | ''>('');
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');

  const calculatedValues = useMemo(() => {
    if (!inputValue || isNaN(Number(inputValue))) return null;

    const ratio = getRatioByStrength(selectedMethod, strength);
    const input = Number(inputValue);

    return calculateCoffeeWater(input, inputType === 'water', ratio);
  }, [inputValue, inputType, selectedMethod, strength]);

  const methodData = brewingMethods[selectedMethod];

  const handleMethodSelect = (method: BrewingMethod) => {
    setSelectedMethod(method);
  };

  const handleLogBrew = async () => {
    if (!calculatedValues) return;

    const now = new Date();
    const brew = {
      id: `${Date.now()}-${Math.random()}`,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0].substring(0, 5),
      method: selectedMethod,
      coffeeGrams: calculatedValues.coffee,
      waterMl: calculatedValues.water,
      ratio: calculatedValues.water / calculatedValues.coffee,
      origin: origin || undefined,
      processingMethod: processing || undefined,
      roastLevel: roast || undefined,
      rating: rating || undefined,
      notes: notes || undefined,
    };

    await saveBrew(brew);
    await refreshBrews();

    setShowLogForm(false);
    setOrigin('');
    setProcessing('');
    setRoast('');
    setRating(0);
    setNotes('');
    setInputValue('');
  };

  const flavorProfile = useMemo(() => {
    const flavors: string[] = [];

    if (processing && processing in processingProfiles) {
      flavors.push(...processingProfiles[processing].characteristics[language]);
    }

    if (roast && roast in roastProfiles) {
      flavors.push(...roastProfiles[roast].characteristics[language]);
    }

    return flavors;
  }, [processing, roast, language]);

  const methods: BrewingMethod[] = ['v60', 'french-press', 'aeropress', 'aeropress-inverted', 'espresso', 'chemex', 'percolator'];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 pb-8">
      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-bold text-brown-900 mb-1">{t('brew.title')}</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-brown-100 p-5">
        <h2 className="font-semibold text-brown-700 mb-3">{t('brew.selectMethod')}</h2>
        <div className="grid grid-cols-2 gap-2">
          {methods.map((method) => (
            <button
              key={method}
              onClick={() => handleMethodSelect(method)}
              className={`p-3 rounded-xl border-2 transition-all text-left ${
                selectedMethod === method
                  ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-md'
                  : 'border-brown-200 hover:border-amber-300 text-brown-700'
              }`}
            >
              <Coffee size={20} className="mb-1" />
              <div className="font-medium text-sm">{brewingMethods[method].name[language]}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-brown-100 p-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-brown-700 mb-2">
              {t('brew.coffeeAmount')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={inputType === 'coffee' ? inputValue : calculatedValues?.coffee || ''}
                onChange={(e) => {
                  setInputType('coffee');
                  setInputValue(e.target.value);
                }}
                onFocus={() => setInputType('coffee')}
                className="w-full px-4 py-3 border-2 border-brown-200 rounded-xl focus:border-amber-500 focus:outline-none"
                placeholder="0"
              />
              <span className="absolute right-4 top-3.5 text-brown-400">g</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-2">
              {t('brew.waterAmount')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={inputType === 'water' ? inputValue : calculatedValues?.water || ''}
                onChange={(e) => {
                  setInputType('water');
                  setInputValue(e.target.value);
                }}
                onFocus={() => setInputType('water')}
                className="w-full px-4 py-3 border-2 border-brown-200 rounded-xl focus:border-amber-500 focus:outline-none"
                placeholder="0"
              />
              <span className="absolute right-4 top-3.5 text-brown-400">ml</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brown-700 mb-2">
            {t('brew.selectStrength')}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['light', 'balanced', 'strong'] as Strength[]).map((s) => (
              <button
                key={s}
                onClick={() => setStrength(s)}
                className={`py-2 px-3 rounded-xl border-2 transition-all text-sm font-medium ${
                  strength === s
                    ? 'border-amber-600 bg-amber-50 text-amber-900'
                    : 'border-brown-200 hover:border-amber-300 text-brown-600'
                }`}
              >
                {t(`brew.strength.${s}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-brown-700 to-brown-900 text-white rounded-2xl shadow-lg p-5 space-y-3">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Coffee size={20} />
          {t('brew.brewGuide')}
        </h2>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-amber-300 text-xs mb-1">{t('brew.ratio')}</div>
            <div className="font-semibold">
              1:{methodData.ratioRange[0]} - 1:{methodData.ratioRange[1]}
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-amber-300 text-xs mb-1">{t('brew.grindSize')}</div>
            <div className="font-semibold">{methodData.grindSize[language]}</div>
          </div>

          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-amber-300 text-xs mb-1 flex items-center gap-1">
              <Clock size={12} />
              {t('brew.brewTime')}
            </div>
            <div className="font-semibold">{methodData.brewTime}</div>
          </div>

          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-amber-300 text-xs mb-1 flex items-center gap-1">
              <Thermometer size={12} />
              {t('brew.waterTemp')}
            </div>
            <div className="font-semibold">{methodData.waterTemp}</div>
          </div>

          {methodData.bloomTime && (
            <>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-amber-300 text-xs mb-1 flex items-center gap-1">
                  <Droplets size={12} />
                  {t('brew.bloom')}
                </div>
                <div className="font-semibold">{methodData.bloomTime}</div>
              </div>

              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-amber-300 text-xs mb-1">{methodData.bloomRatio}</div>
              </div>
            </>
          )}
        </div>

        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-sm italic">{methodData.description[language]}</p>
        </div>
      </div>

      {!showLogForm ? (
        <button
          onClick={() => setShowLogForm(true)}
          disabled={!calculatedValues}
          className="w-full bg-gradient-to-r from-amber-600 to-brown-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-amber-700 hover:to-brown-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('brew.logBrew')}
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-md border border-brown-100 p-5 space-y-4">
          <h3 className="font-bold text-brown-900">{t('brew.optional')}</h3>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-2">
              {t('brew.origin')}
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-4 py-2 border-2 border-brown-200 rounded-xl focus:border-amber-500 focus:outline-none"
              placeholder="Colombia, Ethiopia, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-2">
              {t('brew.processing')}
            </label>
            <select
              value={processing}
              onChange={(e) => setProcessing(e.target.value as ProcessingMethod)}
              className="w-full px-4 py-2 border-2 border-brown-200 rounded-xl focus:border-amber-500 focus:outline-none"
            >
              <option value="">-</option>
              <option value="washed">{t('processing.washed')}</option>
              <option value="natural">{t('processing.natural')}</option>
              <option value="honey-white">{t('processing.honey-white')}</option>
              <option value="honey-yellow">{t('processing.honey-yellow')}</option>
              <option value="honey-red">{t('processing.honey-red')}</option>
              <option value="honey-black">{t('processing.honey-black')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-2">
              {t('brew.roastLevel')}
            </label>
            <select
              value={roast}
              onChange={(e) => setRoast(e.target.value as RoastLevel)}
              className="w-full px-4 py-2 border-2 border-brown-200 rounded-xl focus:border-amber-500 focus:outline-none"
            >
              <option value="">-</option>
              <option value="light">{t('roast.light')}</option>
              <option value="medium">{t('roast.medium')}</option>
              <option value="medium-dark">{t('roast.medium-dark')}</option>
              <option value="dark">{t('roast.dark')}</option>
            </select>
          </div>

          {flavorProfile.length > 0 && (
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="font-medium text-brown-900 mb-2">
                {t('brew.expectedFlavors')}
              </div>
              <div className="flex flex-wrap gap-2">
                {flavorProfile.map((flavor, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white rounded-full text-sm text-brown-700 border border-amber-300"
                  >
                    {flavor}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-2">
              {t('brew.rating')}
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={star <= rating ? 'fill-amber-500 text-amber-500' : 'text-brown-300'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brown-700 mb-2">
              {t('brew.notes')}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 border-2 border-brown-200 rounded-xl focus:border-amber-500 focus:outline-none"
              rows={3}
              placeholder="..."
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowLogForm(false)}
              className="flex-1 bg-brown-100 text-brown-700 font-semibold py-3 px-6 rounded-xl hover:bg-brown-200 transition-colors"
            >
              {t('brew.cancel')}
            </button>
            <button
              onClick={handleLogBrew}
              className="flex-1 bg-gradient-to-r from-amber-600 to-brown-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-amber-700 hover:to-brown-800 transition-all shadow-lg"
            >
              {t('brew.save')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
