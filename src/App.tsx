import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Games } from './pages/Games';
import { Leaderboard } from './pages/Leaderboard';
import { Feedback } from './pages/Feedback';
import { KingdomBuilders } from './games/kingdom-builders/KingdomBuilders';
import { ArkEscape } from './games/ark-escape/ArkEscape';
import { BibleCharades } from './games/bible-charades/BibleCharades';
import { BibleVerse } from './games/bible-verse/BibleVerse';
import { TestamentQuiz } from './games/testament-quiz/TestamentQuiz';
import { ScriptureSprint } from './games/ap-mo-bible-pack/ScriptureSprint';
import { authService } from './services/auth';
import { useAuthStore } from './store/useAuthStore';
import { initializeAnalytics } from './services/analytics/config';
import { analyticsService } from './services/analytics/analyticsService';

// Analytics tracker component
const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    analyticsService.trackPageView(location.pathname);
  }, [location]);

  return null;
};

// Simplified NotFound component
const NotFound = () => {
  return <Navigate to="/" replace />;
};

const App: React.FC = () => {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    // Initialize Google Analytics
    initializeAnalytics();

    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          login(user);
          analyticsService.trackAuth('login', user.id);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuth();
  }, [login]);

  return (
    <Router>
      <AnalyticsTracker />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/games/kingdom-builders" element={<KingdomBuilders />} />
          <Route path="/games/ark-escape" element={<ArkEscape />} />
          <Route path="/games/bible-charades" element={<BibleCharades />} />
          <Route path="/games/bible-verse" element={<BibleVerse />} />
          <Route path="/games/testament-quiz" element={<TestamentQuiz />} />
          <Route path="/games/scripture-sprint" element={<ScriptureSprint />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;