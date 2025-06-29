import React from 'react';
import { 
  Home, 
  Church, 
  Flower2, 
  Hammer,
  ShoppingCart,
  Crown,
  Droplets,
  Shield
} from 'lucide-react';
import type { BuildingType, BuildingData } from '../types';

export const BUILDINGS: Record<BuildingType, BuildingData> = {
  house: {
    type: 'house',
    icon: <Home className="w-6 h-6" />,
    cost: { wood: 2, stone: 1 },
    points: 10,
    description: 'Basic housing for your citizens. Provides population growth.',
    produces: ['food'],
    adjacencyBonus: {
      buildings: ['garden', 'well'],
      bonus: 5
    }
  },
  church: {
    type: 'church',
    icon: <Church className="w-6 h-6" />,
    cost: { wood: 3, stone: 4, faith: 2 },
    points: 25,
    description: 'A place of worship that generates faith and provides community bonuses.',
    produces: ['faith'],
    adjacencyBonus: {
      buildings: ['house', 'temple'],
      bonus: 10
    },
    specialEffect: 'Increases faith generation of adjacent buildings'
  },
  garden: {
    type: 'garden',
    icon: <Flower2 className="w-6 h-6" />,
    cost: { wood: 1, food: 1 },
    points: 8,
    description: 'Grows food and provides beauty to the kingdom.',
    produces: ['food'],
    requires: ['grass'],
    adjacencyBonus: {
      buildings: ['house', 'well'],
      bonus: 3
    }
  },
  workshop: {
    type: 'workshop',
    icon: <Hammer className="w-6 h-6" />,
    cost: { wood: 3, stone: 2 },
    points: 15,
    description: 'Produces tools and crafted goods. Essential for advanced buildings.',
    produces: ['wood', 'stone'],
    adjacencyBonus: {
      buildings: ['market', 'house'],
      bonus: 8
    }
  },
  market: {
    type: 'market',
    icon: <ShoppingCart className="w-6 h-6" />,
    cost: { wood: 2, stone: 2, food: 3 },
    points: 20,
    description: 'Trade center that boosts resource efficiency and generates wealth.',
    produces: ['wood', 'stone', 'food'],
    adjacencyBonus: {
      buildings: ['workshop', 'house'],
      bonus: 12
    },
    specialEffect: 'Reduces building costs by 10% for adjacent buildings'
  },
  temple: {
    type: 'temple',
    icon: <Crown className="w-6 h-6" />,
    cost: { stone: 5, faith: 4, food: 2 },
    points: 35,
    description: 'Grand temple that provides massive faith bonuses and kingdom prestige.',
    produces: ['faith'],
    adjacencyBonus: {
      buildings: ['church', 'house'],
      bonus: 15
    },
    specialEffect: 'Provides faith bonus to all buildings in 2-tile radius'
  },
  well: {
    type: 'well',
    icon: <Droplets className="w-6 h-6" />,
    cost: { stone: 3 },
    points: 12,
    description: 'Provides fresh water, essential for life and growth.',
    produces: ['food'],
    requires: ['grass', 'mountain'],
    adjacencyBonus: {
      buildings: ['house', 'garden'],
      bonus: 6
    },
    specialEffect: 'Enables building on desert terrain within 1 tile'
  },
  wall: {
    type: 'wall',
    icon: <Shield className="w-6 h-6" />,
    cost: { stone: 4, wood: 1 },
    points: 5,
    description: 'Defensive structure that protects your kingdom and provides strategic bonuses.',
    adjacencyBonus: {
      buildings: ['wall'],
      bonus: 3
    },
    specialEffect: 'Connected walls provide exponential defense bonuses'
  }
};

export const TERRAIN_COLORS = {
  grass: 'bg-green-200',
  forest: 'bg-green-600',
  mountain: 'bg-gray-500',
  water: 'bg-blue-400',
  desert: 'bg-yellow-300'
};

export const TERRAIN_DESCRIPTIONS = {
  grass: 'Fertile grassland - ideal for most buildings',
  forest: 'Dense forest - provides wood resources',
  mountain: 'Rocky mountains - source of stone',
  water: 'Water body - cannot build here',
  desert: 'Harsh desert - requires well nearby to build'
};