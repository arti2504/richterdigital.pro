import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage          from './pages/HomePage';
import PrivacyPage       from './pages/PrivacyPage';
import ImpressumPage     from './pages/ImpressumPage';
import ErstgespraechPage from './pages/ErstgespraechPage';
import ConsentBanner from './components/ConsentBanner';
import { initPixel } from './lib/pixel';

function App() {
  useEffect(() => { initPixel(); }, []);

  return (
    <div className="relative min-h-screen bg-navy-900">
      <div className="noise-overlay" />
      <Routes>
        <Route path="/"          element={<HomePage />}      />
        <Route path="/privacy"   element={<PrivacyPage />}   />
        <Route path="/impressum" element={<ImpressumPage />} />
        {/* Zielseite fuer bezahlte Anzeigen */}
        <Route path="/erstgespraech" element={<ErstgespraechPage />} />
      </Routes>
      <ConsentBanner />
    </div>
  );
}

export default App;
