import { useState } from 'react';
import { Home } from '@/sections/Home';
import { Register } from '@/sections/Register';
import { Admin } from '@/sections/Admin';
import { About } from '@/sections/About';
import { Privacy } from '@/sections/Privacy';
import { Toaster } from '@/components/ui/sonner';
import type { View } from '@/types';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  return (
    <>
      {currentView === 'home' && <Home onNavigate={handleNavigate} />}
      {currentView === 'register' && <Register onNavigate={handleNavigate} />}
      {currentView === 'admin' && <Admin onNavigate={handleNavigate} />}
      {currentView === 'about' && <About onNavigate={handleNavigate} />}
      {currentView === 'privacy' && <Privacy onNavigate={handleNavigate} />}
      <Toaster position="top-center" />
    </>
  );
}

export default App;
