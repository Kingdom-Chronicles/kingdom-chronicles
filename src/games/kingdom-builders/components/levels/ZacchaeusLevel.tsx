import React, { useState } from 'react';
import { STORY_LEVELS } from '../../constants/stories';
import type { GameState } from '../../types';

interface ZacchaeusLevelProps {
  gameState: GameState;
  onClimbBranch: (branchId: string) => void;
  onGiveCoin: (coinId: string, recipient: string) => void;
}

export const ZacchaeusLevel: React.FC<ZacchaeusLevelProps> = ({ gameState, onClimbBranch, onGiveCoin }) => {
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);
  
  const zacchaeus = gameState.zacchaeus;
  
  if (!zacchaeus) return null;

  const availableBranches = zacchaeus.branches.filter(branch => 
    !branch.climbed && branch.height <= zacchaeus.heightReached + 1
  );

  const handleCoinSelect = (coinId: string) => {
    if (zacchaeus.coins.find(c => c.id === coinId)?.given) return;
    setSelectedCoin(coinId);
  };

  const handleRecipientSelect = (recipient: string) => {
    if (!selectedCoin) return;
    setSelectedRecipient(recipient);
    onGiveCoin(selectedCoin, recipient);
    setSelectedCoin(null);
    setSelectedRecipient(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🌳 Jesus Visits Zacchaeus
        </h2>
        <p className="text-gray-600 mb-4">
          Help Zacchaeus climb the tree safely and learn about sharing!
        </p>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-blue-800 text-sm">
            "Today salvation has come to this house..." - Luke 19:9
          </p>
        </div>
      </div>

      {/* Tree Climbing */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4 text-gray-800">🧗 Climb the Tree Safely</h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose safe branches (green) to climb higher. Avoid weak branches (red)!
        </p>
        
        <div className="relative bg-gradient-to-b from-blue-200 to-green-300 rounded-lg h-96 overflow-hidden">
          {/* Tree trunk */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-full bg-amber-800"></div>
          
          {/* Branches */}
          {zacchaeus.branches.map(branch => {
            const isAvailable = availableBranches.includes(branch);
            
            return (
              <button
                key={branch.id}
                onClick={() => isAvailable && onClimbBranch(branch.id)}
                disabled={!isAvailable || branch.climbed}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                  branch.climbed
                    ? 'bg-green-200 border-green-500'
                    : branch.safe
                      ? isAvailable
                        ? 'bg-green-100 border-green-300 hover:bg-green-200 animate-pulse'
                        : 'bg-gray-100 border-gray-300 opacity-50'
                      : 'bg-red-100 border-red-300 cursor-not-allowed'
                } border-2 rounded-lg px-3 py-2`}
                style={{
                  left: branch.x,
                  top: branch.y
                }}
              >
                <div className="text-lg">
                  {branch.safe ? '🌿' : '💥'}
                </div>
                <div className="text-xs">
                  {branch.climbed ? '✅' : branch.safe ? 'Safe' : 'Weak'}
                </div>
              </button>
            );
          })}
          
          {/* Zacchaeus */}
          <div 
            className="absolute transform -translate-x-1/2 transition-all duration-500 z-10"
            style={{
              left: '50%',
              bottom: `${100 - zacchaeus.heightReached * 20}%`
            }}
          >
            <div className="text-3xl">👨</div>
            <div className="text-center text-xs font-medium">Zacchaeus</div>
          </div>
          
          {/* Jesus (appears when tree is climbed) */}
          {zacchaeus.treeClimbed && (
            <div className="absolute bottom-4 left-1/4 animate-bounce">
              <div className="text-4xl">✨👨‍🦳</div>
              <div className="text-center text-sm font-medium">Jesus</div>
            </div>
          )}
          
          {/* Crowd */}
          <div className="absolute bottom-2 right-4">
            <div className="text-2xl">👥👥👥</div>
            <div className="text-center text-xs">Crowd</div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <span className="font-medium">Height Reached: {zacchaeus.heightReached} / 4</span>
          {zacchaeus.treeClimbed && (
            <div className="text-green-600 font-medium mt-2">
              🎉 You can see Jesus! Now share your coins with others!
            </div>
          )}
        </div>
      </div>

      {/* Coin Sharing */}
      {zacchaeus.treeClimbed && (
        <div className="mb-6">
          <h3 className="font-semibold mb-4 text-gray-800">💰 Share Your Coins</h3>
          <p className="text-sm text-gray-600 mb-4">
            Zacchaeus learned about generosity from Jesus. Select coins and choose who to give them to!
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Coins */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3 text-yellow-800">Your Coins:</h4>
              <div className="grid grid-cols-3 gap-3">
                {zacchaeus.coins.map(coin => (
                  <button
                    key={coin.id}
                    onClick={() => !coin.given && handleCoinSelect(coin.id)}
                    disabled={coin.given}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      coin.given
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : selectedCoin === coin.id
                          ? 'bg-yellow-200 border-yellow-500 ring-2 ring-yellow-300'
                          : 'bg-yellow-100 border-yellow-300 hover:border-yellow-500 hover:bg-yellow-200'
                    }`}
                  >
                    <div className="text-2xl">
                      {coin.given ? '✅' : '🪙'}
                    </div>
                    <div className="text-xs font-medium">
                      {coin.value} coins
                    </div>
                    {coin.given && coin.recipient && (
                      <div className="text-xs text-green-600 mt-1">
                        Given to {coin.recipient}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Recipients */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3 text-blue-800">Give To:</h4>
              <div className="space-y-3">
                <button
                  onClick={() => selectedCoin && handleRecipientSelect('poor')}
                  disabled={!selectedCoin}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    !selectedCoin
                      ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                      : selectedRecipient === 'poor'
                        ? 'bg-green-100 border-green-500'
                        : 'bg-white border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">👨‍👩‍👧‍👦</div>
                    <div>
                      <div className="font-medium">The Poor</div>
                      <div className="text-xs text-gray-600">Give to those in need (2x bonus)</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => selectedCoin && handleRecipientSelect('temple')}
                  disabled={!selectedCoin}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    !selectedCoin
                      ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                      : selectedRecipient === 'temple'
                        ? 'bg-green-100 border-green-500'
                        : 'bg-white border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">🏛️</div>
                    <div>
                      <div className="font-medium">The Temple</div>
                      <div className="text-xs text-gray-600">Give to God's house (1x bonus)</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => selectedCoin && handleRecipientSelect('keep')}
                  disabled={!selectedCoin}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    !selectedCoin
                      ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                      : selectedRecipient === 'keep'
                        ? 'bg-green-100 border-green-500'
                        : 'bg-white border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">💰</div>
                    <div>
                      <div className="font-medium">Keep for Yourself</div>
                      <div className="text-xs text-gray-600">Save for later (0.5x bonus)</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hints */}
      <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h3 className="font-semibold mb-2 text-yellow-800">Hints:</h3>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc pl-5">
          <li>Climb branches in order - you can't skip heights</li>
          <li>Only safe branches (green) will support your weight</li>
          <li>You need to reach height 4 to see Jesus</li>
          <li>Giving to the poor gives the biggest bonus (like Zacchaeus did)</li>
          <li>You must give away all coins to complete the level</li>
        </ul>
      </div>

      {/* Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Tree Progress</span>
            <span className="text-sm text-gray-600">
              {zacchaeus.heightReached} / 4
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(zacchaeus.heightReached / 4) * 100}%`
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Generosity</span>
            <span className="text-sm text-gray-600">
              {zacchaeus.coinsGiven} / {zacchaeus.coins.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(zacchaeus.coinsGiven / zacchaeus.coins.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};