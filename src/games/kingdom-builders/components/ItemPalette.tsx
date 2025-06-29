import React from 'react';
import type { GameItem } from '../types';

interface ItemPaletteProps {
  items: GameItem[];
  selectedItems: string[];
  draggedItem: string | null;
  onItemClick: (itemId: string) => void;
  onSetDraggedItem: (itemId: string | null) => void;
}

export const ItemPalette: React.FC<ItemPaletteProps> = ({
  items,
  selectedItems,
  draggedItem,
  onItemClick,
  onSetDraggedItem
}) => {
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
    onSetDraggedItem(itemId);
  };

  const handleDragEnd = () => {
    onSetDraggedItem(null);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 text-center">
        📦 Story Items
      </h3>
      <p className="text-white/80 text-sm text-center mb-6">
        Drag or tap items to arrange them in the correct order
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {items.map((item) => {
          const isUsed = selectedItems.includes(item.id);
          const isDragging = draggedItem === item.id;
          
          return (
            <div
              key={item.id}
              draggable={!isUsed}
              onDragStart={(e) => !isUsed && handleDragStart(e, item.id)}
              onDragEnd={handleDragEnd}
              onClick={() => !isUsed && onItemClick(item.id)}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                ${isUsed 
                  ? 'bg-gray-400/50 border-gray-400 opacity-50 cursor-not-allowed' 
                  : 'bg-white/20 border-white/30 hover:bg-white/30 hover:border-white/50 hover:scale-105'
                }
                ${isDragging ? 'opacity-50 scale-95' : ''}
              `}
            >
              {isUsed && (
                <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
              )}
              
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
          );
        })}
      </div>
    </div>
  );
};