import React from 'react';
import { ArrowLeft, Check, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { STORY_LEVELS } from '../constants/stories';
import type { GameState } from '../types';

interface GamePlayProps {
  gameState: GameState;
  onAddItem: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckSequence: () => void;
  onNextLevel: () => void;
  onExitToMenu: () => void;
  onSetDraggedItem: (itemId: string | null) => void;
}

export const GamePlay: React.FC<GamePlayProps> = ({
  gameState,
  onAddItem,
  onRemoveItem,
  onCheckSequence,
  onNextLevel,
  onExitToMenu,
  onSetDraggedItem
}) => {
  const currentLevel = gameState.levels.find(l => l.id === gameState.currentLevel);
  
  if (!currentLevel) return null;

  const levelData = STORY_LEVELS[gameState.currentLevel as keyof typeof STORY_LEVELS];
  const canCheck = gameState.selectedItems.length === currentLevel.correctOrder.length;

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    if (source.droppableId === 'items' && destination.droppableId === 'sequence') {
      // Add item to sequence
      const itemId = levelData.items[source.index].id;
      if (!gameState.selectedItems.includes(itemId)) {
        onAddItem(itemId);
      }
    } else if (source.droppableId === 'sequence' && destination.droppableId === 'sequence') {
      // Reorder within sequence - not implemented in this simplified version
    } else if (source.droppableId === 'sequence' && destination.droppableId === 'items') {
      // Remove from sequence
      const itemId = gameState.selectedItems[source.index];
      onRemoveItem(itemId);
    }
    
    onSetDraggedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onExitToMenu}
            variant="outline"
            className="flex items-center space-x-2 bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Menu</span>
          </Button>

          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              {currentLevel.emoji} {currentLevel.title}
            </h1>
            <p className="text-white/90 text-sm md:text-base">
              {currentLevel.description}
            </p>
          </div>

          <div className="text-white text-right">
            <div className="text-sm opacity-80">Level</div>
            <div className="text-xl font-bold">{gameState.currentLevel}</div>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Available Items */}
            <Droppable droppableId="items" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 text-center">
                    📦 Story Items
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {levelData.items.map((item, index) => {
                      const isUsed = gameState.selectedItems.includes(item.id);
                      
                      return (
                        <Draggable 
                          key={item.id} 
                          draggableId={item.id} 
                          index={index}
                          isDragDisabled={isUsed}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => !isUsed && onAddItem(item.id)}
                              className={`
                                p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer
                                ${isUsed 
                                  ? 'bg-gray-400/50 border-gray-400 opacity-50 cursor-not-allowed' 
                                  : 'bg-white/20 border-white/30 hover:bg-white/30 hover:border-white/50 hover:scale-105'
                                }
                              `}
                            >
                              <div className="text-center">
                                <div className="text-3xl mb-2">{item.emoji}</div>
                                <div className="text-white font-medium text-sm mb-1">
                                  {item.name}
                                </div>
                                <div className="text-white/70 text-xs">
                                  {item.description}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
            
            {/* Sequence */}
            <Droppable droppableId="sequence">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 text-center">
                    📋 Story Sequence
                  </h3>
                  <div className="space-y-3">
                    {gameState.selectedItems.length === 0 ? (
                      <div className="flex items-center justify-center h-32 text-white/60 text-center">
                        <div>
                          <div className="text-4xl mb-2">👆</div>
                          <div>Drop or tap items here</div>
                          <div className="text-sm mt-1">in the correct order</div>
                        </div>
                      </div>
                    ) : (
                      gameState.selectedItems.map((itemId, index) => {
                        const item = levelData.items.find(i => i.id === itemId);
                        if (!item) return null;

                        return (
                          <Draggable key={itemId} draggableId={itemId} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => onRemoveItem(itemId)}
                                className="flex items-center space-x-3 bg-white/20 rounded-lg p-3 cursor-pointer hover:bg-white/30 transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-bold">
                                  {index + 1}
                                </div>
                                <div className="text-2xl">{item.emoji}</div>
                                <div className="flex-1">
                                  <div className="text-white font-medium">{item.name}</div>
                                  <div className="text-white/70 text-sm">{item.description}</div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400">
                                  ✕
                                </div>
                              </div>
                            )}
                          </Draggable>
                        );
                      })
                    )}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <Button
            onClick={() => gameState.selectedItems.forEach(onRemoveItem)}
            variant="outline"
            className="flex items-center space-x-2 bg-white/20 border-white/30 text-white hover:bg-white/30"
            disabled={gameState.selectedItems.length === 0}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear</span>
          </Button>

          <Button
            onClick={onCheckSequence}
            disabled={!canCheck}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-8"
          >
            <Check className="w-4 h-4" />
            <span>Check Order</span>
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 text-center">
          <div className="text-white/80 text-sm">
            {gameState.selectedItems.length} / {currentLevel.correctOrder.length} items placed
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ 
                width: `${(gameState.selectedItems.length / currentLevel.correctOrder.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>

      {/* Result Modal */}
      {gameState.showResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="mb-6">
              {gameState.isCorrect ? (
                <div className="text-6xl mb-4">🎉</div>
              ) : (
                <div className="text-6xl mb-4">😅</div>
              )}
              
              <h2 className={`text-2xl font-bold mb-2 ${
                gameState.isCorrect ? 'text-green-600' : 'text-orange-600'
              }`}>
                {gameState.isCorrect ? 'Well Done!' : 'Try Again!'}
              </h2>
              
              <p className="text-gray-700">{gameState.resultMessage}</p>
            </div>

            <div className="space-y-4">
              {gameState.isCorrect ? (
                <Button
                  onClick={onNextLevel}
                  className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600"
                >
                  <span>{gameState.gameCompleted ? 'Complete Game' : 'Next Level'}</span>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setGameState(prev => ({ ...prev, showResult: false }));
                    gameState.selectedItems.forEach(onRemoveItem);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Again</span>
                </Button>
              )}
              
              <Button
                onClick={onExitToMenu}
                variant="outline"
                className="w-full"
              >
                Back to Menu
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};