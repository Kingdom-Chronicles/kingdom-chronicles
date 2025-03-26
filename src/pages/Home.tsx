import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { FeatureCard } from "../components/features/FeatureCard";
import { GameIcon, UsersIcon, TrophyIcon } from "../components/icons";
import { useTheme } from "../hooks/useTheme";
import { ScrollingTestimonialCarousel } from "../components/testimonials/ScrollingTestimonialCarousel";
import { LoginModal } from "../components/auth/LoginModal";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const features = [
  {
    icon: GameIcon,
    title: 'Exciting Mini-Games',
    description: 'Experience Bible stories through interactive challenges and adventures'
  },
  {
    icon: UsersIcon,
    title: 'Multiplayer Fun',
    description: 'Team up with friends and compete in exciting challenges together'
  },
  {
    icon: TrophyIcon,
    title: 'Earn Rewards',
    description: 'Collect points, unlock achievements, and climb the leaderboards'
  }
];

export const Home: React.FC = () => {
  const { theme } = useTheme("home");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      window.location.href = '/games';
    }
  };

  return (
    <div className={`theme-base min-h-screen ${theme === "night" ? "bg-gray-900" : "bg-gradient-to-b from-indigo-50 to-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className={`text-5xl font-bold mb-6 slide-in ${theme === "night" ? "text-white" : "text-gray-900"}`}>
            Welcome to Kingdom Chronicles
          </h1>
          <p className={`text-xl mb-8 max-w-2xl mx-auto fade-in ${theme === "night" ? "text-gray-300" : "text-gray-600"}`} style={{ animationDelay: "200ms" }}>
            Join an epic journey through Bible-inspired mini-games. Build your kingdom, compete with friends, and discover timeless wisdom along the way.
          </p>

          <div className="flex justify-center space-x-4 mb-16 fade-in" style={{ animationDelay: "400ms" }}>
            <Button onClick={handleGetStarted} size="lg" className="ripple hover-pulse">
              Get Started
            </Button>
            <Link to="/games">
              <Button variant="outline" size="lg" className="ripple hover-pulse">Browse Games</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="fade-in"
                style={{ animationDelay: `${600 + index * 200}ms` }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-6">What Our Players Say</h2>
            <ScrollingTestimonialCarousel />
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};
