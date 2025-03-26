import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

interface MobileGameHeaderProps {
  title: string;
}

export const MobileGameHeader: React.FC<MobileGameHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();

  return (
    <header className={`md:hidden fixed top-0 left-0 right-0 z-50 ${
      theme === 'night' 
        ? 'bg-gray-800 border-b border-gray-700' 
        : 'bg-white border-b border-gray-200'
    }`}>
      <div className="flex items-center justify-between px-4 h-14">
        <button
          onClick={() => navigate('/games')}
          className={`p-2 -ml-2 ${
            theme === 'night' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <h1 className={`text-lg font-semibold ${
          theme === 'night' ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h1>
        
        <button
          onClick={() => navigate('/')}
          className={`p-2 -mr-2 ${
            theme === 'night' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Home className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};