import React, { ReactNode } from 'react';
import { Home, Coffee, History, BarChart3, Settings } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface LayoutProps {
  children: ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Layout({ children, currentView, onNavigate }: LayoutProps) {
  const { t } = useApp();

  const navItems = [
    { id: 'home', icon: Home, label: t('nav.home') },
    { id: 'brew', icon: Coffee, label: t('nav.brew') },
    { id: 'history', icon: History, label: t('nav.history') },
    { id: 'analytics', icon: BarChart3, label: t('nav.analytics') },
    { id: 'settings', icon: Settings, label: t('nav.settings') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 flex flex-col">
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-brown-200 shadow-lg">
        <div className="flex items-center justify-around px-2 py-2 max-w-2xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-brown-400 hover:text-brown-600 hover:bg-brown-50'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
