import { Routes, Route } from 'react-router-dom';
import HomePage      from './pages/HomePage';
import PrivacyPage   from './pages/PrivacyPage';
import ImpressumPage from './pages/ImpressumPage';
import ParticleBackground from './components/ParticleBackground';
import GlobeBackground    from './components/GlobeBackground';

function App() {
  return (
    <div className="relative min-h-screen bg-navy-900">
      {/* Rotating digital Earth — top-right corner */}
      <GlobeBackground />

      {/* Floating particle lights */}
      <ParticleBackground />

      {/* Subtle noise grain */}
      <div className="noise-overlay" />

      <Routes>
        <Route path="/"          element={<HomePage />}      />
        <Route path="/privacy"   element={<PrivacyPage />}   />
        <Route path="/impressum" element={<ImpressumPage />} />
      </Routes>
    </div>
  );
}

export default App;
