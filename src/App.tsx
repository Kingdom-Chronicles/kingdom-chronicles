import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Home } from './pages/Home';
import { Games } from './pages/Games';
import { Leaderboard } from './pages/Leaderboard';
import { Feedback } from './pages/Feedback';
import { Settings } from './pages/Settings';
import { KingdomBuilders } from './games/kingdom-builders/KingdomBuilders';
import { ArkEscape } from './games/ark-escape/ArkEscape';
import { BibleCharades } from './games/bible-charades/BibleCharades';
import { BibleVerse } from './games/bible-verse/BibleVerse';
import { TestamentQuiz } from './games/testament-quiz/TestamentQuiz';
import { ScriptureSprint } from './games/ap-mo-bible-pack/ScriptureSprint';
import { authService } from './services/auth';
import { useAuthStore } from './store/useAuthStore';
import { useGameProgressStore } from './store/useGameProgressStore';
import { initializeAnalytics } from './services/analytics/config';
import { analyticsService } from './services/analytics/analyticsService';
import { reminderService } from './services/reminder/reminderService';
import { ThemeSelector } from './components/ui/ThemeSelector';

// Analytics tracker component
const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    analyticsService.trackPageView(location.pathname);
  }, [location]);

  return null;
};

// Theme button visibility controller
const ThemeButtonController: React.FC = () => {
  const location = useLocation();
  const isVisible = location.pathname === '/' || location.pathname === '/games';
  
  return isVisible ? <ThemeSelector /> : null;
};

// Simplified NotFound component
const NotFound = () => {
  return <Navigate to="/" replace />;
};

const App: React.FC = () => {
  const login = useAuthStore((state) => state.login);
  const { syncWithCloud, reminderSettings } = useGameProgressStore();

  useEffect(() => {
    // Initialize Google Analytics
    initializeAnalytics();

    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          login(user);
          analyticsService.trackAuth('login', user.id);
          // Sync progress data when user logs in
          await syncWithCloud();
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuth();
  }, [login, syncWithCloud]);

  // Initialize reminder service
  useEffect(() => {
    if (reminderSettings.enabled) {
      reminderService.startWorker();
      reminderService.scheduleReminders();
    }

    return () => {
      reminderService.stopWorker();
    };
  }, [reminderSettings.enabled]);

  return (
    <Router>
      <AnalyticsTracker />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="md:pb-0 pb-16"> {/* Add padding for mobile nav */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/games/kingdom-builders" element={<KingdomBuilders />} />
            <Route path="/games/ark-escape" element={<ArkEscape />} />
            <Route path="/games/bible-charades" element={<BibleCharades />} />
            <Route path="/games/bible-verse" element={<BibleVerse />} />
            <Route path="/games/testament-quiz" element={<TestamentQuiz />} />
            <Route path="/games/scripture-sprint" element={<ScriptureSprint />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <MobileNav />
        <ThemeButtonController />
      </div>
    </Router>
  );
};

export default App;