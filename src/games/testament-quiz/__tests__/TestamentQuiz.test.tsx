import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestamentQuiz } from '../TestamentQuiz';
import { BIBLE_BOOKS } from '../constants/books';

// Mock hooks
vi.mock('../hooks/useGameState', () => ({
  useGameState: () => ({
    currentItem: BIBLE_BOOKS[0],
    makeGuess: vi.fn(),
    calculateScore: vi.fn(),
    resetGame: vi.fn(),
    correctAnswers: 0,
    wrongAnswers: 0,
    lastGuessCorrect: null
  })
}));

describe('TestamentQuiz', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders game setup initially', () => {
    render(<TestamentQuiz />);
    expect(screen.getByText(/Guess the Testament/i)).toBeInTheDocument();
  });

  it('starts game with selected settings', async () => {
    render(<TestamentQuiz />);
    
    // Select game mode and settings
    await userEvent.click(screen.getByText(/books/i));
    await userEvent.click(screen.getByText(/Start Game/i));

    // Verify game started
    await waitFor(() => {
      expect(screen.getByText(/Round 1/i)).toBeInTheDocument();
    });
  });

  it('handles testament selection correctly', async () => {
    render(<TestamentQuiz />);
    
    // Start game
    await userEvent.click(screen.getByText(/Start Game/i));

    // Select testament
    await userEvent.click(screen.getByText(/Old Testament/i));

    // Verify feedback
    await waitFor(() => {
      expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    });
  });
});