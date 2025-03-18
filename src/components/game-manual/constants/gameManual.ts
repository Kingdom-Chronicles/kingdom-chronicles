import { Book, Crown, Ship, Theater, BookOpen, Scroll } from 'lucide-react';

export interface GameManual {
  id: string;
  title: string;
  icon: typeof Book | typeof Crown | typeof Ship | typeof Theater | typeof BookOpen | typeof Scroll;
  description: string;
  howToPlay: string[];
  scoring: string[];
  tips: string[];
}

export const gameManuals: Record<string, GameManual> = {
  'testament-quiz': {
    id: 'testament-quiz',
    title: 'Testament Quiz',
    icon: BookOpen,
    description: 'Test your knowledge of Bible books and their testaments in this fast-paced quiz game.',
    howToPlay: [
      'Select your preferred game mode: Books or Stories',
      'Choose the number of rounds and time per round',
      'For each question, identify whether the book/story is from the Old or New Testament',
      'Answer quickly to earn bonus points',
      'Complete all rounds to see your final score'
    ],
    scoring: [
      'Correct Answer: +100 points',
      'Time Bonus: +0.5 points per second remaining',
      'Wrong Answer: -50 points',
      'Perfect Round Bonus: +200 points'
    ],
    tips: [
      'Pay attention to historical context to identify the testament',
      'Use the time bonus strategically - accuracy is more important than speed',
      'Learn common patterns: Prophetic books are usually Old Testament',
      'Epistles (letters) are always in the New Testament'
    ]
  },
  'scripture-sprint': {
    id: 'scripture-sprint',
    title: 'Scripture Sprint',
    icon: Scroll,
    description: 'Race against time to complete Bible verses from different themed packs.',
    howToPlay: [
      'Choose a themed pack: Healing, Wealth, or Wisdom',
      'Select your preferred Bible version',
      'Set difficulty level and number of rounds',
      'Complete the verses before time runs out',
      'Type or speak the missing parts of each verse'
    ],
    scoring: [
      'Correct Verse: +100 points',
      'Time Bonus: +0.5 points per second remaining',
      'Consecutive Correct Answers: +50 bonus points',
      'Perfect Accuracy Bonus: +200 points'
    ],
    tips: [
      'Use the voice input feature for faster entry',
      'Practice memorizing key verses in each category',
      'Focus on accuracy first, then speed',
      'Read the context to better understand the verse'
    ]
  },
  'bible-charades': {
    id: 'bible-charades',
    title: 'Bible Charades',
    icon: Theater,
    description: 'Act out and guess Biblical stories in this exciting team game.',
    howToPlay: [
      'Form two teams and enter team names',
      'Choose difficulty level and story generation mode',
      'Take turns acting out Biblical stories',
      'Select the correct story from multiple options',
      'Complete rounds to determine the winning team'
    ],
    scoring: [
      'Correct Guess: +100 points',
      'Time Bonus: +10 points per 10 seconds remaining',
      'First Try Bonus: +50 points',
      'Team Round Victory: +200 points'
    ],
    tips: [
      'Use gestures and facial expressions effectively',
      'Focus on key characters and actions in the story',
      'Time your guesses strategically',
      'Study common Bible stories beforehand'
    ]
  },
  'bible-verse': {
    id: 'bible-verse',
    title: 'Find the Bible Verse',
    icon: Book,
    description: 'Test your Bible navigation skills by finding specific verses quickly.',
    howToPlay: [
      'Set the number of rounds and time limit',
      'Read the displayed verse carefully',
      'Select the correct reference from the options',
      'Complete all rounds to see your final score',
      'Try to beat your previous best time'
    ],
    scoring: [
      'Correct Reference: +100 points',
      'Time Bonus: +0.5 points per second remaining',
      'Consecutive Correct Answers: +50 points',
      'No Mistakes Bonus: +200 points'
    ],
    tips: [
      'Learn the order of Bible books',
      'Pay attention to key phrases in verses',
      'Use context clues to narrow down options',
      'Practice quick Bible navigation regularly'
    ]
  },
  'kingdom-builders': {
    id: 'kingdom-builders',
    title: 'Kingdom Builders',
    icon: Crown,
    description: 'Build and manage your Biblical kingdom with wisdom and strategy.',
    howToPlay: [
      'Start with initial resources',
      'Choose buildings to construct',
      'Place buildings strategically on the grid',
      'Create combinations for bonus points',
      'Complete objectives within the time limit'
    ],
    scoring: [
      'Basic Building: +10-30 points',
      'Adjacent Bonus: +50 points',
      'Completed Section: +200 points',
      'Resource Efficiency: +0.5 points per unused resource'
    ],
    tips: [
      'Plan your building placement carefully',
      'Create synergies between different buildings',
      'Balance resource usage with scoring potential',
      'Focus on completing sections for bonus points'
    ]
  },
  'ark-escape': {
    id: 'ark-escape',
    title: 'Ark Escape',
    icon: Ship,
    description: 'Race against time to gather resources and build Noah\'s ark.',
    howToPlay: [
      'Collect different types of resources',
      'Manage your inventory efficiently',
      'Complete ark sections in order',
      'Gather animals two by two',
      'Beat the flood timer'
    ],
    scoring: [
      'Resource Collection: +10 points each',
      'Completed Ark Section: +100 points',
      'Animal Pair Rescue: +50 points',
      'Time Bonus: +0.5 points per second remaining'
    ],
    tips: [
      'Prioritize essential resources first',
      'Keep track of the flood timer',
      'Balance resource gathering with construction',
      'Plan your animal collection strategy'
    ]
  }
};