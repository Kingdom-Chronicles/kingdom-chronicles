import React from 'react';
import { Book } from 'lucide-react';

interface ScriptureHintProps {
  scripture: string;
}

export const ScriptureHint: React.FC<ScriptureHintProps> = ({ scripture }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className="flex justify-center mb-4">
        <Book className="w-8 h-8 text-indigo-600" />
      </div>
      <h3 className="text-xl font-bold mb-2">Scripture Hint</h3>
      <p className="text-gray-600">{scripture}</p>
    </div>
  );
};