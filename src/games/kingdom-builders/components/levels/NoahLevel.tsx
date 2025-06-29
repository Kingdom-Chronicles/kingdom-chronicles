import React, { useState } from 'react';
import { STORY_LEVELS } from '../../constants/stories';
import type { GameState } from '../../types';

interface NoahLevelProps {
  gameState: GameState;
  onMatchAnimals: (animalId: string) => void;
  onPlaceArkPart: (partId: string, position: number) => void;
}

export const NoahLevel: React.FC<NoahLevelProps> = ({ gameState, onMatchAnimals, onPlaceArkPart }) => {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [arkSequence, setArkSequence] = useState<string[]>([]);
  const noah = gameState.noah;
  
  if (!noah) return null;

  const handleAnimalClick = (animalId: string) => {
    if (selectedAnimal === null) {
      // First animal selected
      setSelectedAnimal(animalId);
    } else {
      // Check if they match (same type, different ID)
      const first = noah.animals.find(a => a.id === selectedAnimal);
      const second = noah.animals.find(a => a.id === animalId);
      
      if (first && second && first.pairId === second.pairId && first.id !== second.id) {
        // Match found!
        onMatchAnimals(first.id);
        onMatchAnimals(second.id);
      }
      
      // Reset selection
      setSelectedAnimal(null);
    }
  };

  const handleArkPartDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const partId = e.dataTransfer.getData('text/plain');
    if (!partId) return;
    
    // Update the sequence
    const newSequence = [...arkSequence];
    newSequence[position] = partId;
    setArkSequence(newSequence);
    
    // Notify parent
    onPlaceArkPart(partId, position);
  };

  const handleDragStart = (e: React.DragEvent, partId: string) => {
    e.dataTransfer.setData('text/plain', partId);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🚢 Noah Builds the Boat
        </h2>
        <p className="text-gray-600 mb-4">
          Gather animals two by two and build the ark before the flood comes!
        </p>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-blue-800 text-sm">
            "Make yourself an ark of cypress wood; make rooms in it and coat it with pitch inside and out." - Genesis 6:14
          </p>
        </div>
      </div>

      {/* Ark Building */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4 text-gray-800">🔨 Build the Ark (in order):</h3>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => {
            const partId = arkSequence[index];
            const part = partId ? noah.arkParts.find(p => p.id === partId) : null;
            const storyPart = part ? STORY_LEVELS[2].arkParts.find(p => p.id === part.id) : null;
            
            return (
              <div
                key={index}
                onDrop={(e) => handleArkPartDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
                className={`h-24 rounded-lg border-2 border-dashed flex items-center justify-center transition-all ${
                  part 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                {part ? (
                  <div className="text-center">
                    <div className="text-3xl mb-1">{storyPart?.emoji}</div>
                    <div className="text-xs font-medium">{storyPart?.name}</div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">
                    Step {index + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Ark Parts */}
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <h3 className="font-semibold mb-3 text-gray-800">Available Ark Parts:</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {noah.arkParts.filter(part => !part.placed).map(part => {
            const storyPart = STORY_LEVELS[2].arkParts.find(p => p.id === part.id);
            return (
              <div
                key={part.id}
                draggable
                onDragStart={(e) => handleDragStart(e, part.id)}
                className="flex flex-col items-center p-3 bg-white rounded-lg cursor-move hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm"
              >
                <div className="text-3xl mb-1">{storyPart?.emoji}</div>
                <div className="text-sm font-medium">{storyPart?.name}</div>
              </div>
            );
          })}
          
          {noah.arkParts.every(p => p.placed) && (
            <div className="text-center text-green-600 font-medium p-4 w-full">
              ✅ Ark built! Now gather the animals!
            </div>
          )}
        </div>
      </div>

      {/* Animal Matching */}
      <div className="mb-6">
        <h3 className="font-semibold mb-4 text-gray-800">🐾 Match the Animals (Two by Two):</h3>
        <div className="grid grid-cols-4 gap-4">
          {noah.animals.map(animal => {
            const storyAnimal = STORY_LEVELS[2].animals.find(a => a.id === animal.id);
            const isSelected = selectedAnimal === animal.id;
            
            return (
              <button
                key={animal.id}
                onClick={() => !animal.matched && handleAnimalClick(animal.id)}
                disabled={animal.matched}
                className={`p-4 rounded-lg border-2 transition-all ${
                  animal.matched
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : isSelected
                      ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-300'
                      : 'bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <div className="text-3xl mb-2">{storyAnimal?.emoji}</div>
                <div className="text-sm font-medium">{storyAnimal?.name}</div>
                <div className="text-xs text-gray-500 capitalize">{storyAnimal?.type}</div>
                {animal.matched && <div className="text-xs text-green-600 mt-1">✅ On Ark</div>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hints */}
      <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h3 className="font-semibold mb-2 text-yellow-800">Hints:</h3>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc pl-5">
          <li>Build the ark in the correct order: hull, deck, roof, door</li>
          <li>Match animals of the same type (look for similar names!)</li>
          <li>You need to complete both tasks to finish the level</li>
        </ul>
      </div>

      {/* Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Ark Progress</span>
            <span className="text-sm text-gray-600">
              {noah.arkParts.filter(p => p.placed).length} / {noah.arkParts.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(noah.arkParts.filter(p => p.placed).length / noah.arkParts.length) * 100}%`
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Animals Saved</span>
            <span className="text-sm text-gray-600">
              {noah.animalsOnArk} / {noah.animals.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(noah.animalsOnArk / noah.animals.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};