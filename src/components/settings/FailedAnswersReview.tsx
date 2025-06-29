import React, { useState } from 'react';
import { BookOpen, Clock, RotateCcw, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/Button';
import { useGameProgressStore } from '../../store/useGameProgressStore';
import { format, parseISO } from 'date-fns';

export const FailedAnswersReview: React.FC = () => {
  const { failedAnswers, incrementReminderCount } = useGameProgressStore();
  const [selectedGameType, setSelectedGameType] = useState<'all' | 'scripture-sprint' | 'bible-verse'>('all');
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

  const filteredAnswers = failedAnswers.filter(answer => 
    selectedGameType === 'all' || answer.gameType === selectedGameType
  );

  const toggleAnswerVisibility = (timestamp: string) => {
    setShowAnswers(prev => ({
      ...prev,
      [timestamp]: !prev[timestamp]
    }));
  };

  const markAsReminded = (timestamp: string) => {
    incrementReminderCount(timestamp);
  };

  const getGameTypeColor = (gameType: string) => {
    switch (gameType) {
      case 'scripture-sprint':
        return 'bg-purple-100 text-purple-800';
      case 'bible-verse':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getGameTypeName = (gameType: string) => {
    switch (gameType) {
      case 'scripture-sprint':
        return 'Scripture Sprint';
      case 'bible-verse':
        return 'Bible Verse';
      default:
        return gameType;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BookOpen className="w-6 h-6 text-indigo-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Failed Answers Review</h2>
        </div>
        <div className="text-sm text-gray-600">
          {filteredAnswers.length} answers to review
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={selectedGameType}
          onChange={(e) => setSelectedGameType(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">All Games</option>
          <option value="scripture-sprint">Scripture Sprint</option>
          <option value="bible-verse">Bible Verse</option>
        </select>
      </div>

      {/* Failed Answers List */}
      <div className="space-y-4">
        {filteredAnswers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No failed answers to review!</p>
            <p className="text-sm">Keep playing to improve your knowledge.</p>
          </div>
        ) : (
          filteredAnswers.map((answer) => (
            <div key={answer.timestamp} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGameTypeColor(answer.gameType)}`}>
                      {getGameTypeName(answer.gameType)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {format(parseISO(answer.timestamp), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900 mb-2">{answer.question}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleAnswerVisibility(answer.timestamp)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                    title={showAnswers[answer.timestamp] ? 'Hide answer' : 'Show answer'}
                  >
                    {showAnswers[answer.timestamp] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {showAnswers[answer.timestamp] && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-medium text-green-700">Correct Answer:</p>
                      <p className="text-green-600">{answer.correctAnswer}</p>
                    </div>
                    <div>
                      <p className="font-medium text-red-700">Your Answer:</p>
                      <p className="text-red-600">{answer.userAnswer}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Reminded {answer.reminderCount} times
                  </span>
                  {answer.lastReminded && (
                    <span>
                      Last: {format(parseISO(answer.lastReminded), 'MMM d')}
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => markAsReminded(answer.timestamp)}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Mark as Reminded
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};