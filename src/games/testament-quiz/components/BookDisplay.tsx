import React from 'react';
import { Book } from 'lucide-react';
import type { BibleBook } from '../types';

interface BookDisplayProps {
  book: BibleBook | any;
  gameMode?: 'books' | 'stories';
}

export const BookDisplay: React.FC<BookDisplayProps> = ({ book, gameMode = 'books' }) => {
  if (!book) return null;

  const title = gameMode === 'books' ? book.name : book.title;
  const description = book.description;

  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
      <div className="flex justify-center mb-4">
        <Book className="w-12 h-12 text-indigo-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
      {book.scripture && (
        <p className="text-sm text-gray-500 mt-2">{book.scripture}</p>
      )}
    </div>
  );
};