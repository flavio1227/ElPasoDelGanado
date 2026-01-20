import { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Onboarding from './components/Onboarding';
import Layout from './components/Layout';
import Home from './components/Home';
import Brew from './components/Brew';
import History from './components/History';
import Analytics from './components/Analytics';
import Settings from './components/Settings';

function AppContent() {
  const { hasCompletedOnboarding, isLoading } = useApp();
  const [currentView, setCurrentView] = useState('home');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-brown-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Onboarding />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={setCurrentView} />;
      case 'brew':
        return <Brew />;
      case 'history':
        return <History />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
