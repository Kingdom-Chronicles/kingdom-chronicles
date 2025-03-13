import { Book, Play, Trophy, CheckCircle, Target } from 'lucide-react';
import { Tutorial } from './tutorials';

// Scripture Sprint Tutorials
export const ScriptureSprintmanual: Tutorial[] = [
  {
    title: 'Getting Started',
    description: 'Set up your game.',
    icon: <Book className="w-6 h-6 text-green-600" />,
    content: (
      <ul className="text-left space-y-2 pl-4 list-decimal">
        <li>Pick Your Bible Pack.</li>
        <li>Choose Your Bible Version: Go with the version you're most familiar with or challenge yourself with a new one.</li>
        <li>Select Your Challenge Level.</li>
      </ul>
    ),
  },
  {
    title: 'How To Play',
    description: 'Learn how to play the game.',
    icon: <Play className="w-6 h-6 text-indigo-600" />,
    content: (
      <ul className="text-left space-y-2 pl-4 list-decimal">
        <li>Start the Game: Once your settings are ready, jump into the challenge!</li>
        <li>Fill in the Verse: Based on the level you picked, complete the missing words as fast as you can.</li>
        <li>Watch the Clock: Time is ticking! Complete the verse before it runs out.</li>
      </ul>
    ),
  },
  {
    title: 'Scoring and Winning',
    description: 'Understand scoring and how to win.',
    icon: <Trophy className="w-6 h-6 text-blue-600" />,
    content: (
      <ul className="text-left space-y-2 pl-4 list-decimal">
        <li>All or Nothing: Nail the verse on time for maximum points.</li>
        <li>Competing with friends? The player with the highest score wins.</li>
        <li>Playing alone? Try to beat your personal best and track your progress.</li>
      </ul>
    ),
  },
  {
    title: 'Ready to Play',
    description: 'Youre almost there!',
    icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
    content: (
      <ul className="text-left space-y-2 pl-4 list-decimal">
        <li>Great job! You've got everything set up and understood the rules.</li>
        <li>Good luck, and may the best player win!</li>
      </ul>
    ),
  },
];

//Guess the testament Tutorials
export const testamentquizmanual: Tutorial[] = [
  {
    title: 'Setup',
    description: 'Prepare to play the game.',
    icon: <Play className="w-6 h-6 text-indigo-600" />,
    content: (
      <ul className="text-left space-y-2 pl-4 list-decimal">
      <li>Choose a game mode (Bible Books or Bible Stories).</li>
      <li>Select a host to present the questions or play in self-check mode.</li>
      <li>Prepare the question cards/prompts and answer key.</li>
    </ul>
    ),
  },
  {
    title: 'Gameplay and Scoring',
    description: 'Learn the game flow and scoring.',
    icon: <Target className="w-6 h-6 text-yellow-600" />,
    content: (
      <ul className="text-left space-y-2 pl-4 list-decimal">
        <li>The host presents a question to the player or team.</li>
        <li>The player/team must answer whether it is from the Old Testament or New Testament.</li>
        <li>+50 points for correct answers, -50 for incorrect answers.</li>
        <li>Continue presenting questions in turns or rounds.</li>
      </ul>
    ),
  },
  {
    title: 'Winning the Game',
    description: 'Learn how to win.',
    icon: <Trophy className="w-6 h-6 text-blue-600" />,
    content: (
      <ul className="text-left space-y-2 pl-4 list-decimal">
        <li>The player/team with the highest score wins the game.</li>
        <li>For a quick game, set a winning score (e.g., first to 10 points wins).</li>
      </ul>
    ),
  },
  {
    title: 'Enjoy 🎊',
    description: 'Have fun and enjoy the game!',
    icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
    content: (
      <ul className="text-left space-y-2 pl-4 list-decimal">
        <li>Great job! You’ve got everything set up and understood the rules. It’s time to begin!</li>
        <li>Gather your players, choose your mode, and get ready for an exciting game!</li>
        <li>Good luck, and may the best team win!</li>
      </ul>
    ),
  },
];


// Bible Charades Tutorials
export const bibleCharadesmanual: Tutorial[] = [
  {
    title: 'Game Setup',
    description: 'Prepare to play the game.',
    icon: <Book className="w-6 h-6 text-indigo-600" />,
    content: (
      <ul className="text-center space-y-2 pl-4">
        <li>Divide into Teams: Split players into two or more teams.</li>
      </ul>
    ),
  },
  {
    title: 'How to Play and Win',
    description: 'Play the game by acting out prompts and scoring points.',
    icon: <Trophy className="w-6 h-6 text-indigo-600" />,
    content: (
      <ul className="text-left space-y-2 pl-4 list-decimal">
        <li>Start the Round: A Team A player picks a prompt from the list.</li>
        <li>Act It Out: No talking, just gestures and body language!</li>
        <li>Guess the Prompt: Teammates guess before time runs out. Correct guesses score 1 point.</li>
        <li>Rotate Turns: Teams continue taking turns until the game ends.</li>
        <li>Winning: The team with the highest score wins!</li>
      </ul>
    ),
  },
  {
    title: 'Enjoy 🎊',
    description: 'Have fun and enjoy the game!',
    icon: <CheckCircle className="w-6 h-6 text-indigo-600" />,
    content: (
      <ul className="text-left space-y-2 pl-4 list-decimal">
        <li>Cheer for your team and keep the fun going!</li>
        <li>May the best team win!</li>
      </ul>
    ),
  },
];

//Find the Bible Verse manual
export const bibleversemanual: Tutorial[] = [
  {
    title: 'How To Play',
    description: 'Prepare to play the game.',
    icon: <Play className="w-6 h-6 text-indigo-600" />,
    content: (
      <ul className="text-left space-y-2 pl-4 list-decimal">
        <li>Start the Game.</li>
        <li>Read the Scripture Statement.</li>
        <li>Choose the Correct Option.</li>
        <li>Watch the Timer.</li>
      </ul>
    ),
  },
  {
    title: 'Scoring and Winning',
    description: 'Understand the Scoring System and Winning Conditions.',
    icon: <Trophy className="w-6 h-6 text-blue-600" />,
    content: (
      <ul className="text-left space-y-2 pl-4 list-decimal">
        <li>The game uses an All or Nothing scoring system, awarding maximum points.</li>
        <li>If you're playing with friends, the player with the most points wins.</li>
        <li>If playing alone, try to beat your own high score.</li>
      </ul>
    ),
  },
  {
    title: 'Ready to Play 🎊',
    description: 'You’re almost there!',
    icon: <CheckCircle className="w-6 h-6 text-purple-600" />,
    content: (
      <ul className="text-left space-y-2 pl-4 list-decimal">
        <li>Great job! You’ve got everything set up and understood the rules. It’s time to begin!</li>
        <li>Good luck, and may the best team win!</li>
      </ul>
    ),
  },
];


// Bible Memory Tutorials
export const bibleMemoryTutorials: Tutorial[] = [
  {
    title: 'Getting Started with the Game',
    description: 'This tutorial will help you get started with the basics of the game.',
    content: 'Follow the instructions to understand the basic game mechanics.',
    icon: <Book className="w-6 h-6 text-indigo-600" />
  },
  {
    title: 'Game Mode',
    description: 'You can either choose to guess the testament by the Books or By the Stories.',
    content: 'Master the techniques that will make you a pro in no time.',
    icon: <Book className="w-6 h-6 text-indigo-600" />
  },
  {
    title: 'Number of rounds',
    description: 'Choose How many rounds you want.',
    content: 'You can choose how many rounds you can go for.',
    icon: <Book className="w-6 h-6 text-indigo-600" />
  },
  {
    title: 'Time per Round',
    description: 'Timed rounds!.',
    content: 'You can choose how many rounds you can go for.',
    icon: <Book className="w-6 h-6 text-indigo-600" />
  },
  {
    title: 'Let us Begin',
    description: 'Are you Excited?',
    content: 'Let us Proceed.',
    icon: <Book className="w-6 h-6 text-indigo-600" />
  },
];