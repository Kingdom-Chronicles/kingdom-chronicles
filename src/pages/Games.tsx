import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Ship, Theater, Book, BookOpen, Scroll } from 'lucide-react';
import { ThemeSelector } from '../components/ui/ThemeSelector';
import { useTheme } from '../hooks/useTheme';

export const games = [
  {
    id: 'testament-quiz',
    title: 'Guess the Testament',
    description: 'Quick-fire rounds of Old vs New Testament identification',
    icon: <BookOpen className="w-12 h-12 text-indigo-600" />,
    difficulty: 'Easy',
    players: '1'
  },
  {
    id: 'scripture-sprint',
    title: 'Scripture Sprint',
    description: 'Race against time to complete Bible verses in different themed packs',
    icon: <Scroll className="w-12 h-12 text-indigo-600" />,
    difficulty: 'Medium',
    players: '1'
  },
  {
    id: 'bible-charades',
    title: 'Bible Charades',
    description: 'Act out and guess Biblical stories in this exciting team game',
    icon: <Theater className="w-12 h-12 text-indigo-600" />,
    difficulty: 'Easy',
    players: '4-12'
  },
  {
    id: 'bible-verse',
    title: 'Find the Bible Verse',
    description: 'Test your Bible navigation skills in this fast-paced challenge',
    icon: <Book className="w-12 h-12 text-indigo-600" />,
    difficulty: 'Medium',
    players: '1'
  },
  {
    id: 'kingdom-builders',
    title: 'Kingdom Builders',
    description: 'Build and manage your Biblical kingdom with wisdom and strategy. Recommended for ages under 10.',
    icon: <Building2 className="w-12 h-12 text-indigo-600" />,
    difficulty: 'Medium',
    players: '1-4'
  },
  {
    id: 'ark-escape',
    title: 'Ark Escape',
    description: 'Race against time to gather resources and build Noah\'s ark. Perfect for children under 10 years old.',
    icon: <Ship className="w-12 h-12 text-indigo-600" />,
    difficulty: 'Easy',
    players: '1-2'
  },
];

export const getGameName = (gameType: string | undefined): string => {

  console.log("checking my game type",gameType)
  if (!gameType) return 'Unknown Game';
  const game = games.find(g => g.id === gameType);
  return game ? game.title : 'Unknown Game';
};

export const Games: React.FC = () => {
  const [visibleGames, setVisibleGames] = useState<number[]>([]);
  const { theme, setTheme } = useTheme('games');

  useEffect(() => {
    const showGames = () => {
      const interval = setInterval(() => {
        setVisibleGames(prev => {
          if (prev.length >= games.length) {
            clearInterval(interval);
            return prev;
          }
          return [...prev, prev.length];
        });
      }, 200);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(showGames, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`theme-base min-h-screen ${theme === 'night' ? 'bg-gray-900' : 'bg-gradient-to-b from-indigo-50 to-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`text-3xl font-bold mb-8 slide-up-fade ${theme === 'night' ? 'text-white' : 'text-gray-900'}`}>
          Available Games
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <Link
              key={game.id}
              to={`/games/${game.id}`}
              className={`block transition-all duration-300 hover-float ${
                visibleGames.includes(index) ? 'opacity-100' : 'opacity-0 translate-y-10'
              } ${theme === 'night' ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-md`}
              style={{
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="hover-float">{game.icon}</div>
                  <div className="ml-4">
                    <h2 className={`text-xl font-semibold ${theme === 'night' ? 'text-white' : 'text-gray-900'}`}>
                      {game.title}
                    </h2>
                    <p className={`text-sm ${theme === 'night' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {game.difficulty} • {game.players} Players
                    </p>
                  </div>
                </div>
                <p className={theme === 'night' ? 'text-gray-300' : 'text-gray-600'}>
                  {game.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />
    </div>
  );
};

export default Games;
