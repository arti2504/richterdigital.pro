import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import ImpressumPage from './pages/ImpressumPage';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <div className="relative min-h-screen bg-navy-900">
      {/* Floating particle lights — fixed, behind noise overlay */}
      <ParticleBackground />

      {/* Subtle noise grain */}
      <div className="noise-overlay" />

      <Routes>
        <Route path="/"          element={<HomePage />}    />
        <Route path="/privacy"   element={<PrivacyPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
      </Routes>
    </div>
  );
}

export default App;
