import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScriptureSprint } from '../ScriptureSprint';
import { BIBLE_VERSES } from '../constants/verses';

// Mock hooks
vi.mock('../hooks/useGameState', () => ({
  useGameState: () => ({
    currentVerse: BIBLE_VERSES[0],
    versesCompleted: 0,
    feedback: null,
    failedVerses: [],
    checkAnswer: vi.fn(),
    getNextVerse: vi.fn(),
    calculateScore: vi.fn(),
    resetGame: vi.fn(),
    initializeGame: vi.fn(),
    getVerseText: vi.fn(),
    incrementVersesCompleted: vi.fn()
  })
}));

describe('ScriptureSprint', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders game setup initially', () => {
    render(<ScriptureSprint />);
    expect(screen.getByText(/Scripture Sprint/i)).toBeInTheDocument();
    expect(screen.getByText(/Race against time/i)).toBeInTheDocument();
  });

  it('starts game when setup is completed', async () => {
    render(<ScriptureSprint />);
    
    // Fill out game settings
    await userEvent.click(screen.getByText(/healing/i));
    await userEvent.click(screen.getByText(/medium/i));
    await userEvent.click(screen.getByText(/Start Game/i));

    // Verify game has started
    await waitFor(() => {
      expect(screen.getByText(/Round 1/i)).toBeInTheDocument();
    });
  });

  it('handles verse submission correctly', async () => {
    render(<ScriptureSprint />);
    
    // Start game
    await userEvent.click(screen.getByText(/Start Game/i));

    // Submit a verse
    const input = screen.getByPlaceholderText(/Type the entire verse/i);
    await userEvent.type(input, 'Test verse');
    await userEvent.click(screen.getByText(/Submit Answer/i));

    // Verify feedback is shown
    await waitFor(() => {
      expect(screen.getByText(/Try again/i)).toBeInTheDocument();
    });
  });
});