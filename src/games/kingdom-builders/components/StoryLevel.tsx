import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { STORY_LEVELS } from '../constants/stories';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import type { StoryLevel as StoryLevelType } from '../types';

interface StoryLevelProps {
  level: StoryLevelType;
  onComplete: (score: number) => void;
  onExit: () => void;
}

export const StoryLevel: React.FC<StoryLevelProps> = ({ level, onComplete, onExit }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [score, setScore] = useState(0);
  
  const levelData = STORY_LEVELS[level];
  
  // Timer
  useEffect(() => {
    if (timeLeft <= 0 || showResult) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, showResult]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Handle drag end
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    if (source.droppableId === 'items' && destination.droppableId === 'sequence') {
      // Add item to sequence
      const itemId = levelData.items[source.index].id;
      if (!selectedItems.includes(itemId)) {
        setSelectedItems(prev => [...prev, itemId]);
      }
    } else if (source.droppableId === 'sequence' && destination.droppableId === 'sequence') {
      // Reorder within sequence
      const newItems = Array.from(selectedItems);
      const [movedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, movedItem);
      setSelectedItems(newItems);
    } else if (source.droppableId === 'sequence' && destination.droppableId === 'items') {
      // Remove from sequence
      const newItems = Array.from(selectedItems);
      newItems.splice(source.index, 1);
      setSelectedItems(newItems);
    }
  };
  
  // Add item to sequence by clicking
  const handleAddItem = (itemId: string) => {
    if (!selectedItems.includes(itemId)) {
      setSelectedItems(prev => [...prev, itemId]);
    }
  };
  
  // Remove item from sequence by clicking
  const handleRemoveItem = (index: number) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };
  
  // Check sequence
  const checkSequence = () => {
    const correct = JSON.stringify(selectedItems) === JSON.stringify(levelData.correctOrder);
    setIsCorrect(correct);
    
    // Calculate score
    const baseScore = 500; // Base score for completion
    const timeBonus = timeLeft * 2; // 2 points per second remaining
    const perfectBonus = correct ? 200 : 0; // Bonus for getting it right first try
    
    const totalScore = baseScore + timeBonus + perfectBonus;
    setScore(totalScore);
    
    setShowResult(true);
  };
  
  // Reset sequence
  const resetSequence = () => {
    setSelectedItems([]);
    setShowResult(false);
  };
  
  // Complete level
  const completeLevel = () => {
    onComplete(score);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full">
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onExit}
          variant="outline"
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {levelData.title}
          </h2>
          <p className="text-gray-600">{levelData.description}</p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-500">Time Left</div>
          <div className={`text-xl font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-gray-900'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
        <div className="flex items-start">
          <div className="text-3xl mr-3">📖</div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-1">Scripture</h3>
            <p className="text-blue-700">{levelData.scripture}</p>
          </div>
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
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <h3 className="font-semibold text-gray-800 mb-4">Available Items</h3>
                <div className="grid grid-cols-2 gap-3">
                  {levelData.items.map((item, index) => {
                    const isUsed = selectedItems.includes(item.id);
                    
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
                            onClick={() => !isUsed && handleAddItem(item.id)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              isUsed 
                                ? 'opacity-50 bg-gray-100 border-gray-300 cursor-not-allowed' 
                                : 'bg-white border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-grab'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className="text-3xl mr-3">{item.emoji}</div>
                              <div>
                                <div className="font-medium text-gray-900">{item.name}</div>
                                <div className="text-xs text-gray-500">{item.description}</div>
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
                className="bg-indigo-50 rounded-lg p-4 border border-indigo-200"
              >
                <h3 className="font-semibold text-indigo-800 mb-4">Your Sequence</h3>
                <div className="space-y-3 min-h-[200px]">
                  {selectedItems.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-indigo-400 text-center p-8">
                      <div>
                        <div className="text-4xl mb-2">👆</div>
                        <div>Drag items here to create your sequence</div>
                      </div>
                    </div>
                  ) : (
                    selectedItems.map((itemId, index) => {
                      const item = levelData.items.find(i => i.id === itemId);
                      if (!item) return null;
                      
                      return (
                        <Draggable key={itemId} draggableId={itemId} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => handleRemoveItem(index)}
                              className="flex items-center bg-white rounded-lg p-3 border border-indigo-200 cursor-grab hover:bg-indigo-50"
                            >
                              <div className="flex items-center justify-center w-8 h-8 bg-indigo-500 text-white rounded-full mr-3 text-sm font-bold">
                                {index + 1}
                              </div>
                              <div className="text-2xl mr-3">{item.emoji}</div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900">{item.name}</div>
                                <div className="text-xs text-gray-500">{item.description}</div>
                              </div>
                              <div className="text-red-400 opacity-0 hover:opacity-100 transition-opacity">
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
      
      <div className="flex justify-center space-x-4">
        <Button
          onClick={resetSequence}
          variant="outline"
          disabled={selectedItems.length === 0}
          className="flex items-center"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        
        <Button
          onClick={checkSequence}
          disabled={selectedItems.length !== levelData.correctOrder.length}
          className="flex items-center"
        >
          <Check className="w-4 h-4 mr-2" />
          Check Order
        </Button>
      </div>
      
      {/* Result Modal */}
      {showResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">{isCorrect ? '🎉' : '😅'}</div>
            <h2 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-600' : 'text-orange-600'}`}>
              {isCorrect ? 'Correct!' : 'Not Quite Right'}
            </h2>
            <p className="text-gray-700 mb-6">
              {isCorrect 
                ? `Great job! You completed the level with a score of ${score} points!` 
                : 'The order is not correct. Try again!'}
            </p>
            
            {isCorrect && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-500">Base Score</div>
                    <div className="text-xl font-bold text-gray-900">500</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Time Bonus</div>
                    <div className="text-xl font-bold text-green-600">+{timeLeft * 2}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Perfect Bonus</div>
                    <div className="text-xl font-bold text-indigo-600">+200</div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              {isCorrect ? (
                <Button
                  onClick={completeLevel}
                  className="w-full flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {level < 5 ? 'Next Level' : 'Complete Game'}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShowResult(false);
                    resetSequence();
                  }}
                  className="w-full flex items-center justify-center"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              )}
              
              <Button
                onClick={onExit}
                variant="outline"
                className="w-full"
              >
                Exit to Level Select
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};