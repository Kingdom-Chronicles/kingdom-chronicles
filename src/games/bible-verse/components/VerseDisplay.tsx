import React from 'react';
import { Book } from 'lucide-react';
import type { BibleVerse } from '../types';

interface VerseDisplayProps {
  verse: BibleVerse;
}

export const VerseDisplay: React.FC<VerseDisplayProps> = ({ verse }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
      <div className="flex justify-center mb-4">
        <Book className="w-12 h-12 text-indigo-600" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Find This Verse</h2>
      <div className="bg-indigo-50 p-4 rounded-lg">
        <p className="text-lg text-indigo-900">{verse.text}</p>
      </div>
    </div>
  );
};