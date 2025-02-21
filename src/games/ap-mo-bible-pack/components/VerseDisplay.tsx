import React from 'react';
import { Book, AlertTriangle } from 'lucide-react';
import type { BibleVerse, AnswerFeedback, DifficultyLevel } from '../types';

interface VerseDisplayProps {
  verse: BibleVerse | null;
  feedback: AnswerFeedback | null;
  difficulty?: DifficultyLevel;
  getVerseText: (verse: BibleVerse) => string;
}

export const VerseDisplay: React.FC<VerseDisplayProps> = ({ 
  verse, 
  feedback, 
  difficulty = 'medium',
  getVerseText
}) => {
  if (!verse) {
    return (
      <div className="card p-8 text-center mb-8">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-amber-600">No More Verses Available</h2>
        <p className="text-theme-secondary">
          You have completed all verses in this pack! The game will end shortly.
        </p>
      </div>
    );
  }

  const getDisplayText = () => {
    const verseText = getVerseText(verse);
    if (!verseText) return 'Loading verse...';

    if (difficulty === 'hard') {
      return 'Type the complete verse';
    }

    const words = verseText.split(' ');
    const numWordsToShow = difficulty === 'easy' ? 4 : 3;
    return words.slice(0, numWordsToShow).join(' ') + '...';
  };

  return (
    <div className="card p-8 text-center mb-8">
      <div className="flex justify-center mb-4">
        <Book className="w-12 h-12 text-indigo-600" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2 text-theme-primary">{verse.verse}</h2>
      <p className="text-theme-secondary mb-4">{verse.description}</p>
      
      <div className="bg-indigo-50 p-4 rounded-lg">
        <p className="text-lg text-indigo-900">{getDisplayText()}</p>
      </div>
      
      {feedback && (
        <div className={`mt-4 p-4 rounded-lg transition-all ${
          feedback.isCorrect ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <p className={feedback.isCorrect ? 'text-green-800' : 'text-red-800'}>
            {feedback.message}
          </p>
          {!feedback.isCorrect && feedback.similarity > 0 && (
            <p className="text-sm mt-2">
              Similarity: {Math.round(feedback.similarity)}%
            </p>
          )}
        </div>
      )}
    </div>
  );
};