import React, { useState, useEffect } from 'react';
import { SkipForward, Mic, MicOff, X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface VerseInputProps {
  onSubmit: (answer: string | null) => void;
  disabled?: boolean;
  attemptsLeft?: number;
  value: string;
  onChange: (value: string) => void;
}

export const VerseInput: React.FC<VerseInputProps> = ({ 
  onSubmit, 
  disabled,
  attemptsLeft,
  value,
  onChange
}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        onChange(transcript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || attemptsLeft === 0) return;
    onSubmit(value);
  };

  const handleSkip = () => {
    onSubmit(null);
    onChange('');
  };

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  const isDisabled = disabled || attemptsLeft === 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder={isDisabled ? 'No more attempts remaining' : 'Type the entire verse...'}
          className={`w-full p-4 border-2 rounded-lg form-input focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none h-32 ${
            isDisabled ? 'bg-gray-100 border-gray-200' : ''
          }`}
        />
        
        <div className="flex items-center justify-end space-x-2">
          {recognition && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={toggleListening}
              className={`flex items-center space-x-1 ${isListening ? 'text-red-500' : ''}`}
              disabled={isDisabled}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>Stop Speaking</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>Start Speaking</span>
                </>
              )}
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={isDisabled || !value}
            className="flex items-center space-x-1"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </Button>
        </div>

        {attemptsLeft !== undefined && attemptsLeft > 0 && (
          <p className="text-sm text-theme-secondary">
            {attemptsLeft} {attemptsLeft === 1 ? 'attempt' : 'attempts'} remaining
          </p>
        )}
      </div>

      <div className="flex space-x-4">
        <Button 
          type="submit" 
          disabled={isDisabled || !value.trim()}
          className="flex-1"
        >
          Submit Answer
        </Button>
        <Button 
          type="button"
          variant="outline"
          onClick={handleSkip}
          disabled={disabled}
          className="flex items-center"
        >
          <SkipForward className="w-4 h-4 mr-2" />
          Skip
        </Button>
      </div>
    </form>
  );
};