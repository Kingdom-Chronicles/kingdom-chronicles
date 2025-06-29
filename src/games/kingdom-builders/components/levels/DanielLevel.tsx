import React, { useState, useEffect } from 'react';
import type { GameState } from '../../types';

interface DanielLevelProps {
  gameState: GameState;
  onCalmLion: (lionId: string) => void;
  onDiscoverPrayerSpot: (spotId: string) => void;
}

export const DanielLevel: React.FC<DanielLevelProps> = ({ gameState, onCalmLion, onDiscoverPrayerSpot }) => {
  const [danielPosition, setDanielPosition] = useState({ x: 250, y: 200 });
  const [stealthMode, setStealthMode] = useState(true);
  const daniel = gameState.daniel;
  
  if (!daniel) return null;

  const handleMoveDaniel = (e: React.MouseEvent) => {
    if (daniel.lions.every(l => l.calm)) return; // Don't move if all lions are calm
    
    const rect = e.currentTarget.getBoundingClientRect();
    const newPosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    setDanielPosition(newPosition);
    
    // Check if near a lion
    daniel.lions.forEach(lion => {
      if (lion.calm) return;
      
      const distance = Math.sqrt(
        Math.pow(newPosition.x - lion.x, 2) + Math.pow(newPosition.y - lion.y, 2)
      );
      
      if (distance < 50) {
        // Close enough to calm
        onCalmLion(lion.id);
      }
    });
    
    // Check if near a prayer spot
    daniel.prayerSpots.forEach(spot => {
      if (spot.discovered) return;
      
      const distance = Math.sqrt(
        Math.pow(newPosition.x - spot.x, 2) + Math.pow(newPosition.y - spot.y, 2)
      );
      
      if (distance < 30) {
        // Close enough to pray
        onDiscoverPrayerSpot(spot.id);
      }
    });
  };

  const toggleStealthMode = () => {
    setStealthMode(!stealthMode);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🦁 Daniel and the Lions
        </h2>
        <p className="text-gray-600 mb-4">
          Stay faithful to God! Calm the lions and find places to pray.
        </p>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-blue-800 text-sm">
            "My God sent his angel, and he shut the mouths of the lions." - Daniel 6:22
          </p>
        </div>
      </div>

      {/* Lion's Den */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">🏛️ The Lion's Den</h3>
          <button
            onClick={toggleStealthMode}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              stealthMode 
                ? 'bg-purple-100 text-purple-800 border border-purple-300' 
                : 'bg-gray-100 text-gray-800 border border-gray-300'
            }`}
          >
            {stealthMode ? '🤫 Stealth Mode' : '👣 Normal Mode'}
          </button>
        </div>
        
        <div 
          className="relative bg-gradient-to-b from-yellow-100 to-orange-100 rounded-lg h-96 border-4 border-gray-400 overflow-hidden"
          onClick={handleMoveDaniel}
        >
          {/* Stone walls */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 right-0 h-16 bg-gray-400 bg-opacity-30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-400 bg-opacity-30"></div>
            <div className="absolute top-0 left-0 bottom-0 w-16 bg-gray-400 bg-opacity-30"></div>
            <div className="absolute top-0 right-0 bottom-0 w-16 bg-gray-400 bg-opacity-30"></div>
          </div>
          
          {/* Daniel */}
          <div 
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
              stealthMode ? 'opacity-60' : 'opacity-100'
            }`}
            style={{ left: danielPosition.x, top: danielPosition.y }}
          >
            <div className="text-4xl">🧔</div>
            <div className="text-center text-xs font-medium">Daniel</div>
          </div>
          
          {/* Lions */}
          {daniel.lions.map(lion => (
            <div
              key={lion.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                lion.calm ? 'opacity-50' : 'opacity-100'
              }`}
              style={{ left: lion.x, top: lion.y }}
            >
              <div className={`text-5xl ${lion.calm ? 'grayscale' : ''}`}>
                {lion.calm ? '😴' : '🦁'}
              </div>
              <div className="text-center text-xs">
                {lion.calm ? 'Calm' : `Alert: ${lion.alertLevel}`}
              </div>
              
              {/* Alert radius visualization */}
              {!lion.calm && (
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-500 border-opacity-30"
                  style={{ 
                    width: `${100 + lion.alertLevel * 20}px`, 
                    height: `${100 + lion.alertLevel * 20}px`,
                    opacity: stealthMode ? 0.3 : 0.6
                  }}
                ></div>
              )}
            </div>
          ))}
          
          {/* Prayer Spots */}
          {daniel.prayerSpots.map(spot => (
            <div
              key={spot.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                spot.discovered ? 'opacity-100' : 'opacity-30'
              }`}
              style={{ left: spot.x, top: spot.y }}
            >
              <div className="text-2xl animate-pulse">
                {spot.discovered ? '🙏' : '✨'}
              </div>
              <div className="text-center text-xs">
                {spot.discovered ? 'Praying' : 'Prayer spot'}
              </div>
            </div>
          ))}
          
          {/* Instructions */}
          <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white bg-opacity-70 px-2 py-1 rounded">
            Click to move Daniel
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          Move carefully! Approach lions to calm them with God's protection. Find the sparkling prayer spots!
        </div>
      </div>

      {/* Hints */}
      <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h3 className="font-semibold mb-2 text-yellow-800">Hints:</h3>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc pl-5">
          <li>Use stealth mode to approach lions more safely</li>
          <li>Calm lions one at a time to avoid alerting others</li>
          <li>Find all prayer spots to complete the level</li>
          <li>Remember that Daniel's faith protected him from the lions</li>
        </ul>
      </div>

      {/* Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Lions Calmed</span>
            <span className="text-sm text-gray-600">
              {daniel.lionsCalmed} / {daniel.lions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-orange-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(daniel.lionsCalmed / daniel.lions.length) * 100}%`
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Prayers Completed</span>
            <span className="text-sm text-gray-600">
              {daniel.prayersCompleted} / {daniel.prayerSpots.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-purple-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(daniel.prayersCompleted / daniel.prayerSpots.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};