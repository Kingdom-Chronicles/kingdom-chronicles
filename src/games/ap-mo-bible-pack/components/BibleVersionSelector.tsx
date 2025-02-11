import React from 'react';
import { Book } from 'lucide-react';
import type { BibleVersion } from '../types';

interface BibleVersionSelectorProps {
  value: BibleVersion;
  onChange: (version: BibleVersion) => void;
}

export const BibleVersionSelector: React.FC<BibleVersionSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium form-label mb-1">
        Bible Version
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(['NKJV', 'KJV', 'NIV', 'ESV'] as BibleVersion[]).map((version) => (
          <button
            key={version}
            onClick={() => onChange(version)}
            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors card ${
              value === version 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            <Book className="w-6 h-6 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-theme-primary">{version}</span>
          </button>
        ))}
      </div>
    </div>
  );
};