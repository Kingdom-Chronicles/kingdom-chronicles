import { useState, useCallback, useRef, useEffect } from 'react';
import { BIBLE_VERSES } from '../constants/verses';
import type { BibleVerse, PackType, RoundScore, DifficultyLevel, AnswerFeedback, VerseAttempt, BibleVersion } from '../types';

export const useGameState = (
  initialPackType: PackType, 
  initialDifficulty: DifficultyLevel, 
  initialMaxAttempts: number,
  initialBibleVersion: BibleVersion = 'NKJV'
) => {
  const [currentVerse, setCurrentVerse] = useState<BibleVerse | null>(null);
  const [versesCompleted, setVersesCompleted] = useState(0);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [failedVerses, setFailedVerses] = useState<VerseAttempt[]>([]);
  
  const packTypeRef = useRef(initialPackType);
  const difficultyRef = useRef(initialDifficulty);
  const maxAttemptsRef = useRef(initialMaxAttempts);
  const bibleVersionRef = useRef(initialBibleVersion);
  const currentAttemptsRef = useRef(initialMaxAttempts);
  const usedVersesRef = useRef<Set<string>>(new Set());

  const getVerseText = useCallback((verse: BibleVerse): string => {
    // Get text in selected version, fallback to first available version if not found
    return verse.versions[bibleVersionRef.current] || Object.values(verse.versions)[0] || '';
  }, []);

  const getNextVerse = useCallback(() => {
    const packVerses = BIBLE_VERSES.filter(v => 
      v.packType === packTypeRef.current && 
      !usedVersesRef.current.has(v.verse) &&
      // Ensure verse has text in selected version
      (v.versions[bibleVersionRef.current] || Object.values(v.versions)[0])
    );

    if (packVerses.length === 0) {
      setCurrentVerse(null);
      return;
    }

    const nextVerse = packVerses[Math.floor(Math.random() * packVerses.length)];
    usedVersesRef.current.add(nextVerse.verse);
    setCurrentVerse(nextVerse);
    currentAttemptsRef.current = maxAttemptsRef.current;
    setFeedback(null);
  }, []);

  const calculateSimilarity = (str1: string, str2: string): number => {
    if (!str1 || !str2) return 0;
    
    // Normalize text: lowercase, remove punctuation, replace newlines and extra spaces with single spaces
    const normalizeText = (text: string) =>
      text.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();

    const s1 = normalizeText(str1);
    const s2 = normalizeText(str2);

    const words1 = s1.split(' ');
    const words2 = s2.split(' ');

    // Find common words
    const commonWords = words1.filter(word => words2.includes(word));

    // Calculate similarity as a percentage
    return (commonWords.length * 2) / (words1.length + words2.length) * 100;
  };

  const checkAnswer = useCallback((answer: string | null): AnswerFeedback => {
    if (!currentVerse || currentAttemptsRef.current === 0) {
      return {
        isCorrect: false,
        similarity: 0,
        message: 'No more attempts remaining',
        attemptsLeft: 0
      };
    }

    if (answer === null) {
      // Handle skip
      const verseText = getVerseText(currentVerse);
      setFailedVerses(prev => [...prev, {
        verse: currentVerse.verse,
        expectedAnswer: verseText,
        userAnswer: '',
        similarity: 0,
        attempts: maxAttemptsRef.current - currentAttemptsRef.current
      }]);
      getNextVerse();
      return {
        isCorrect: false,
        similarity: 0,
        message: 'Skipped verse',
        attemptsLeft: maxAttemptsRef.current
      };
    }

    const correctAnswer = getVerseText(currentVerse);
    if (!correctAnswer) {
      console.error('No verse text available');
      return {
        isCorrect: false,
        similarity: 0,
        message: 'Error: No verse text available',
        attemptsLeft: currentAttemptsRef.current
      };
    }
    
    // Adjusted comparison to ignore newlines
    const normalizeText = (text: string) =>
      text.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();

    const isCorrect = normalizeText(answer) === normalizeText(correctAnswer);
    
    const similarity = calculateSimilarity(answer, correctAnswer);
    currentAttemptsRef.current--;

    const feedback: AnswerFeedback = {
      isCorrect,
      similarity,
      message: isCorrect 
        ? 'Perfect! Well done!' 
        : currentAttemptsRef.current > 0
          ? `Try again! ${currentAttemptsRef.current} ${
              currentAttemptsRef.current === 1 ? 'attempt' : 'attempts'
            } remaining`
          : 'No more attempts remaining',
      attemptsLeft: currentAttemptsRef.current
    };

    if (!isCorrect && currentAttemptsRef.current === 0) {
      setFailedVerses(prev => [...prev, {
        verse: currentVerse.verse,
        expectedAnswer: correctAnswer,
        userAnswer: answer,
        similarity,
        attempts: maxAttemptsRef.current
      }]);
      getNextVerse();
    }

    setFeedback(feedback);
    return feedback;
  }, [currentVerse, getNextVerse, getVerseText]);

  const calculateScore = useCallback((timeLeft: number): RoundScore => ({
    points: versesCompleted * 100 + Math.floor(timeLeft * 0.5),
    versesCompleted,
    timeBonus: Math.floor(timeLeft * 0.5),
    failedVerses
  }), [versesCompleted, failedVerses]);

  const initializeGame = useCallback((
    packType: PackType, 
    difficulty: DifficultyLevel, 
    maxAttempts: number,
    bibleVersion: BibleVersion
  ) => {
    packTypeRef.current = packType;
    difficultyRef.current = difficulty;
    maxAttemptsRef.current = maxAttempts;
    bibleVersionRef.current = bibleVersion;
    currentAttemptsRef.current = maxAttempts;
    usedVersesRef.current.clear();
    setVersesCompleted(0);
    setFailedVerses([]);
    setFeedback(null);
    getNextVerse();
  }, [getNextVerse]);

  const resetGame = useCallback(() => {
    initializeGame(
      packTypeRef.current, 
      difficultyRef.current, 
      maxAttemptsRef.current,
      bibleVersionRef.current
    );
  }, [initializeGame]);

  useEffect(() => {
    if (!currentVerse) {
      getNextVerse();
    }
  }, [currentVerse, getNextVerse]);

  return {
    currentVerse,
    versesCompleted,
    feedback,
    failedVerses,
    checkAnswer,
    getNextVerse,
    calculateScore,
    resetGame,
    initializeGame,
    getVerseText,
    incrementVersesCompleted: useCallback(() => {
      setVersesCompleted(prev => prev + 1);
    }, [])
  };
};