import React from 'react';
import type { GameItem } from '../types';

interface DragDropAreaProps {
  selectedItems: string[];
  allItems: GameItem[];
  onRemoveItem: (itemId: string) => void;
  onAddItem: (itemId: string) => void;
  draggedItem: string | null;
  onSetDraggedItem: (itemId: string | null) => void;
}

export const DragDropArea: React.FC<DragDropAreaProps> = ({
  selectedItems,
  allItems,
  onRemoveItem,
  onAddItem,
  draggedItem,
  onSetDraggedItem
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    if (itemId && !selectedItems.includes(itemId)) {
      onAddItem(itemId);
    }
    onSetDraggedItem(null);
  };

  const getItemById = (id: string) => allItems.find(item => item.id === id);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`
        bg-white/10 backdrop-blur-sm rounded-xl p-6 min-h-[400px]
        ${draggedItem ? 'border-2 border-dashed border-yellow-400' : ''}
      `}
    >
      <h3 className="text-xl font-bold text-white mb-4 text-center">
        📋 Story Sequence
      </h3>
      <p className="text-white/80 text-sm text-center mb-6">
        Arrange the items in the correct order
      </p>

      {selectedItems.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-white/60 text-center">
          <div>
            <div className="text-4xl mb-2">👆</div>
            <div>Drop or tap items here</div>
            <div className="text-sm mt-1">in the correct order</div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {selectedItems.map((itemId, index) => {
            const item = getItemById(itemId);
            if (!item) return null;

            return (
              <div
                key={`${itemId}-${index}`}
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
            );
          })}
        </div>
      )}

      {selectedItems.length > 0 && (
        <div className="mt-4 text-center text-white/80 text-sm">
          Click any item to remove it from the sequence
        </div>
      )}
    </div>
  );
};