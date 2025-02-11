import { Package, Droplets, Apple } from 'lucide-react';

export enum Resource {
  WOOD = 'wood',
  WATER = 'water',
  FOOD = 'food'
}

export const RESOURCE_CONFIG = {
  [Resource.WOOD]: {
    name: 'Wood',
    icon: Package,
    baseRequired: 50,
    color: 'amber'
  },
  [Resource.WATER]: {
    name: 'Water',
    icon: Droplets,
    baseRequired: 40,
    color: 'blue'
  },
  [Resource.FOOD]: {
    name: 'Food',
    icon: Apple,
    baseRequired: 30,
    color: 'green'
  }
} as const;