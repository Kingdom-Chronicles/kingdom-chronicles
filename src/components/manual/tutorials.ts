export interface Tutorial {
  title: string;
  description: string;
  icon: JSX.Element;
  content: JSX.Element | string;
}

export interface ManualModelProps {
  isOpen: boolean;
  onClose: () => void;
  gameType: 'scripture-sprint' | 'testament-quiz' | 'bible-charades' | 'bible-verse'| 'kingdom-builders'| 'ark-escape';
}