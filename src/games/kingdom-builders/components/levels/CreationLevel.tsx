import React, { useState } from 'react';
import { STORY_LEVELS } from '../../constants/stories';
import type { GameState, CreationItem } from '../../types';

interface CreationLevelProps {
  gameState: GameState;
  onPlaceItem: (itemId: string, position: number) => void;
}

export const CreationLevel: React.FC<CreationLevelProps> = ({ gameState, onPlaceItem }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [sequence, setSequence] = useState<string[]>([]);
  const creation = gameState.creation;
  
  if (!creation) return null;

  const availableItems = creation.items.filter(item => !item.placed);
  const placedItems = sequence.map(id => creation.items.find(item => item.id === id)).filter(Boolean) as CreationItem[];

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.setData('text/plain', itemId);
    // Set a ghost image
    const ghost = document.createElement('div');
    ghost.textContent = STORY_LEVELS[1].items.find(i => i.id === itemId)?.emoji || '';
    ghost.className = 'text-4xl';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 25, 25);
    setTimeout(() => document.body.removeChild(ghost), 0);
  };

  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    // Update the sequence
    const newSequence = [...sequence];
    newSequence[position] = draggedItem;
    setSequence(newSequence);

    // Notify parent component
    onPlaceItem(draggedItem, position);
    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-blue-100');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-blue-100');
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🌍 God Makes the World
        </h2>
        <p className="text-gray-600 mb-4">
          Day {creation.currentDay}: Place the items in the correct order of creation
        </p>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-blue-800 text-sm">
            "In the beginning God created the heavens and the earth." - Genesis 1:1
          </p>
        </div>
      </div>

      {/* Creation Sequence */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4 text-gray-800">Creation Order:</h3>
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, index) => {
            const itemId = sequence[index];
            const item = itemId ? creation.items.find(i => i.id === itemId) : null;
            const storyItem = item ? STORY_LEVELS[1].items.find(i => i.id === item.id) : null;
            
            return (
              <div
                key={index}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                className={`h-24 rounded-lg border-2 border-dashed flex items-center justify-center transition-all ${
                  item 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                {item ? (
                  <div className="text-center">
                    <div className="text-3xl mb-1">{storyItem?.emoji}</div>
                    <div className="text-xs font-medium">{storyItem?.name}</div>
                    <div className="text-xs text-gray-500">Day {item.day}</div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">
                    {index + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Items */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-3 text-gray-800">Available Items:</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {availableItems.map(item => {
            const storyItem = STORY_LEVELS[1].items.find(i => i.id === item.id);
            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                className="flex flex-col items-center p-3 bg-white rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm"
              >
                <div className="text-3xl mb-1">{storyItem?.emoji}</div>
                <div className="text-sm font-medium">{storyItem?.name}</div>
                <div className="text-xs text-gray-500">Day {item.day}</div>
              </div>
            );
          })}
          
          {availableItems.length === 0 && (
            <div className="text-center text-green-600 font-medium p-4 w-full">
              ✅ All items placed! Check if your order is correct.
            </div>
          )}
        </div>
      </div>

      {/* Hints */}
      <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h3 className="font-semibold mb-2 text-yellow-800">Hints:</h3>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc pl-5">
          <li>God created light on the first day</li>
          <li>Land and plants were created on the same day</li>
          <li>Fish and birds were created before land animals</li>
          <li>People were created last, on the same day as land animals</li>
        </ul>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-gray-700">Creation Progress</span>
          <span className="text-sm text-gray-600">
            {creation.items.filter(i => i.placed).length} / {creation.items.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${(creation.items.filter(i => i.placed).length / creation.items.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};