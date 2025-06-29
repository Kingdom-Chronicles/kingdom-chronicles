export type StoryLevel = 1 | 2 | 3 | 4 | 5;

export interface GameItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export interface DragItem {
  id: string;
  type: string;
}

export interface GameSettings {
  difficulty: 'easy' | 'medium' | 'hard';
  totalRounds: number;
  timePerRound: number;
  points: {
    completion: number;
    timeBonus: number;
    perfectBonus: number;
  };
}

export interface Resources {
  wood: number;
  stone: number;
  food: number;
  faith: number;
  [key: string]: number;
}

export type TerrainType = 'grass' | 'forest' | 'mountain' | 'water' | 'desert';

export type BuildingType = 'house' | 'church' | 'garden' | 'workshop' | 'market' | 'temple' | 'well' | 'wall';

export interface BuildingData {
  type: BuildingType;
  icon: React.ReactNode;
  cost: Partial<Resources>;
  points: number;
  description: string;
  produces?: (keyof Resources)[];
  requires?: TerrainType[];
  adjacencyBonus?: {
    buildings: BuildingType[];
    bonus: number;
  };
  specialEffect?: string;
}

export interface GridCell {
  terrain: TerrainType;
  building: BuildingType | null;
  isHighlighted: boolean;
  canPlace: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

// Creation Level Types
export interface CreationItem {
  id: string;
  day: number;
  placed: boolean;
  position?: number;
}

export interface CreationState {
  items: CreationItem[];
  currentDay: number;
  completed: boolean;
}

// Noah Level Types
export interface NoahAnimal {
  id: string;
  pairId: string;
  matched: boolean;
}

export interface NoahArkPart {
  id: string;
  placed: boolean;
  position?: number;
}

export interface NoahState {
  animals: NoahAnimal[];
  arkParts: NoahArkPart[];
  animalsOnArk: number;
  arkBuilt: boolean;
  completed: boolean;
}

// David Level Types
export interface DavidStone {
  id: string;
  smooth: boolean;
  collected: boolean;
  x: number;
  y: number;
}

export interface DavidState {
  stones: DavidStone[];
  stonesCollected: number;
  slingReady: boolean;
  targetHit: boolean;
  completed: boolean;
}

// Daniel Level Types
export interface DanielLion {
  id: string;
  x: number;
  y: number;
  calm: boolean;
  alertLevel: number;
}

export interface DanielPrayerSpot {
  id: string;
  x: number;
  y: number;
  discovered: boolean;
}

export interface DanielState {
  lions: DanielLion[];
  prayerSpots: DanielPrayerSpot[];
  lionsCalmed: number;
  prayersCompleted: number;
  completed: boolean;
}

// Zacchaeus Level Types
export interface ZacchaeusBranch {
  id: string;
  height: number;
  safe: boolean;
  climbed: boolean;
  x: number;
  y: number;
}

export interface ZacchaeusCoin {
  id: string;
  value: number;
  given: boolean;
  recipient?: string;
}

export interface ZacchaeusState {
  branches: ZacchaeusBranch[];
  coins: ZacchaeusCoin[];
  heightReached: number;
  treeClimbed: boolean;
  coinsGiven: number;
  completed: boolean;
}

export interface GameState {
  currentLevel: number;
  levels: {
    id: number;
    title: string;
    description: string;
    emoji: string;
    items: GameItem[];
    correctOrder: string[];
    completed: boolean;
    unlocked: boolean;
  }[];
  isPlaying: boolean;
  selectedItems: string[];
  draggedItem: string | null;
  showResult: boolean;
  resultMessage: string;
  isCorrect: boolean;
  gameCompleted: boolean;
  
  // Level-specific states
  creation?: CreationState;
  noah?: NoahState;
  david?: DavidState;
  daniel?: DanielState;
  zacchaeus?: ZacchaeusState;
}

export interface GameProgress {
  currentLevel: number;
  completedLevels: number[];
  lastPlayed: string;
}