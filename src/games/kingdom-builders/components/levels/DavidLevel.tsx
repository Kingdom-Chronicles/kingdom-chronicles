import React, { useState, useRef } from 'react';
import { STORY_LEVELS } from '../../constants/stories';
import type { GameState } from '../../types';

interface DavidLevelProps {
  gameState: GameState;
  onCollectStone: (stoneId: string) => void;
  onAimSlingshot: (targetX: number, targetY: number) => void;
}

export const DavidLevel: React.FC<DavidLevelProps> = ({ gameState, onCollectStone, onAimSlingshot }) => {
  const [aimPosition, setAimPosition] = useState({ x: 250, y: 100 });
  const [isAiming, setIsAiming] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const battlefieldRef = useRef<HTMLDivElement>(null);
  
  const david = gameState.david;
  
  if (!david) return null;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isAiming || !battlefieldRef.current) return;
    
    const rect = battlefieldRef.current.getBoundingClientRect();
    setAimPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleShoot = () => {
    if (!david.slingReady || !isAiming) return;
    onAimSlingshot(aimPosition.x, aimPosition.y);
    setIsAiming(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🏹 David Kills Goliath
        </h2>
        <p className="text-gray-600 mb-4">
          Collect 5 smooth stones and defeat Goliath with God's help!
        </p>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-blue-800 text-sm">
            "The battle is the LORD's, and he will give all of you into our hands." - 1 Samuel 17:47
          </p>
        </div>
      </div>

      {/* Stone Collection */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4 text-gray-800">🪨 Collect Smooth Stones</h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose only the smooth stones for your slingshot. You need exactly 5 smooth stones.
        </p>
        
        <div className="relative bg-gradient-to-b from-blue-100 to-green-100 rounded-lg p-4 h-48 mb-4 overflow-hidden">
          {/* Stream */}
          <div className="absolute left-0 right-0 top-1/2 h-12 bg-blue-300 transform -translate-y-1/2"></div>
          
          {/* Stones */}
          {david.stones.map(stone => (
            <button
              key={stone.id}
              onClick={() => !stone.collected && onCollectStone(stone.id)}
              disabled={stone.collected}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                stone.collected ? 'opacity-0' : 'hover:scale-110'
              }`}
              style={{ left: stone.x, top: stone.y }}
            >
              <div className="text-3xl">
                {stone.smooth ? '🪨' : '⛰️'}
              </div>
            </button>
          ))}
          
          {/* David */}
          <div className="absolute bottom-2 left-4">
            <div className="text-4xl">👦</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
          <span className="font-medium text-gray-700">Stones Collected: {david.stonesCollected} / 5</span>
          {david.slingReady ? (
            <span className="text-green-600 font-medium">✅ Slingshot Ready!</span>
          ) : (
            <span className="text-gray-500">Need {5 - david.stonesCollected} more smooth stones</span>
          )}
        </div>
      </div>

      {/* Slingshot Battle */}
      {david.slingReady && (
        <div className="mb-6">
          <h3 className="font-semibold mb-4 text-gray-800">🎯 Face Goliath</h3>
          <p className="text-sm text-gray-600 mb-4">
            Aim for Goliath's forehead! Click to start aiming, then click again to shoot.
          </p>
          
          <div
            ref={battlefieldRef}
            className="relative bg-gradient-to-b from-orange-100 to-yellow-100 rounded-lg h-64 border-4 border-gray-300 cursor-crosshair overflow-hidden"
            onMouseMove={handleMouseMove}
            onClick={isAiming ? handleShoot : () => setIsAiming(true)}
          >
            {/* Sky */}
            <div className="absolute inset-0 bg-blue-200 opacity-30"></div>
            
            {/* Mountains */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gray-400 rounded-t-3xl"></div>
            
            {/* Goliath */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <div className="text-6xl">🧔</div>
                <div className="text-center text-sm font-medium">Goliath</div>
                
                {/* Target area - forehead */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full">
                  {showHint && (
                    <div className="absolute inset-0 border-2 border-red-500 rounded-full animate-ping"></div>
                  )}
                </div>
              </div>
            </div>
            
            {/* David */}
            <div className="absolute bottom-4 left-4">
              <div className="text-4xl">👦</div>
              <div className="text-center text-sm font-medium">David</div>
            </div>
            
            {/* Slingshot and trajectory */}
            {isAiming && (
              <>
                <div className="absolute bottom-12 left-12 w-2 h-2 bg-gray-800 rounded-full"></div>
                <svg
                  className="absolute inset-0 pointer-events-none"
                  style={{ zIndex: 10 }}
                >
                  <line
                    x1="48"
                    y1={battlefieldRef.current?.clientHeight ? battlefieldRef.current.clientHeight - 48 : 200}
                    x2={aimPosition.x}
                    y2={aimPosition.y}
                    stroke="#666"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>
                <div
                  className="absolute w-6 h-6 border-2 border-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ left: aimPosition.x, top: aimPosition.y }}
                >
                  <div className="absolute inset-0 border-t-2 border-red-500"></div>
                  <div className="absolute inset-0 border-l-2 border-red-500"></div>
                </div>
              </>
            )}
            
            {/* Instructions */}
            <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white bg-opacity-70 px-2 py-1 rounded">
              {isAiming ? 'Click to shoot!' : 'Click to aim'}
            </div>
            
            {/* Hint button */}
            <button
              className="absolute top-2 right-2 text-xs bg-yellow-100 border border-yellow-300 px-2 py-1 rounded hover:bg-yellow-200"
              onClick={(e) => {
                e.stopPropagation();
                setShowHint(!showHint);
              }}
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
          </div>
          
          {david.targetHit && (
            <div className="mt-4 text-center text-green-600 font-bold text-lg bg-green-50 p-4 rounded-lg">
              🎉 Victory! Goliath is defeated! God gave David the victory!
            </div>
          )}
        </div>
      )}

      {/* Hints */}
      <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h3 className="font-semibold mb-2 text-yellow-800">Hints:</h3>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc pl-5">
          <li>Look for smooth, round stones (🪨) - not rough ones (⛰️)</li>
          <li>You need exactly 5 stones to prepare your slingshot</li>
          <li>Aim carefully at Goliath's forehead for the best chance to hit</li>
          <li>Remember that David's strength came from his faith in God, not his own power</li>
        </ul>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-700">Level Progress</span>
          <span className="text-sm text-gray-600">
            {david.targetHit ? '2/2' : david.slingReady ? '1/2' : '0/2'}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{
              width: david.targetHit ? '100%' : david.slingReady ? '50%' : '0%'
            }}
          />
        </div>
      </div>
    </div>
  );
};