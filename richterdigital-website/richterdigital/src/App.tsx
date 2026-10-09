import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage      from './pages/HomePage';
import PrivacyPage   from './pages/PrivacyPage';
import ImpressumPage from './pages/ImpressumPage';
import ConsentBanner from './components/ConsentBanner';
import { initPixel } from './lib/pixel';

/* Die Buchseite wird erst geladen, wenn jemand /plague aufruft. So traegt die
   Startseite weder die Karte noch den Buchtext mit. */
const PlaguePage = lazy(() => import('./pages/PlaguePage'));

function App() {
  useEffect(() => { initPixel(); }, []);

  return (
    <div className="relative min-h-screen bg-navy-900">
      <div className="noise-overlay" />
      <Routes>
        <Route path="/"          element={<HomePage />}      />
        <Route path="/privacy"   element={<PrivacyPage />}   />
        <Route path="/impressum" element={<ImpressumPage />} />
        {/* Verkaufsseite fuer das englische E-Book, eigene Optik, US-Publikum. */}
        <Route path="/plague"    element={<Suspense fallback={null}><PlaguePage /></Suspense>} />
        {/* Unbekannte Adressen auf die Startseite. Ohne das zeigt eine falsche
            oder veraltete Adresse eine leere Seite - besonders teuer, wenn der
            Klick aus einer bezahlten Anzeige kam. */}
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
      <ConsentBanner />
    </div>
  );
}

export default App;
