import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BibleCharades } from '../BibleCharades';
import { BIBLE_STORIES } from '../constants/stories';

// Mock hooks
vi.mock('../hooks/useGameState', () => ({
  useGameState: () => ({
    gameState: {
      currentStory: BIBLE_STORIES[0],
      teams: [
        { id: '1', name: 'Team 1', score: 0, isActing: true },
        { id: '2', name: 'Team 2', score: 0, isActing: false }
      ],
      currentRound: 1,
      timeLeft: 60,
      isPlaying: true,
      settings: {
        totalRounds: 3,
        timePerRound: 60,
        storyMode: 'static',
        difficulty: 'medium'
      }
    },
    startGame: vi.fn(),
    makeGuess: vi.fn(),
    nextRound: vi.fn(),
    decrementTime: vi.fn()
  })
}));

describe('BibleCharades', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders game setup initially', () => {
    render(<BibleCharades />);
    expect(screen.getByText(/Bible Charades/i)).toBeInTheDocument();
  });

  it('starts game with team setup', async () => {
    render(<BibleCharades />);
    
    // Fill team names
    await userEvent.type(screen.getByLabelText(/Team 1 Name/i), 'Lions');
    await userEvent.type(screen.getByLabelText(/Team 2 Name/i), 'Eagles');
    await userEvent.click(screen.getByText(/Start Game/i));

    // Verify game started
    await waitFor(() => {
      expect(screen.getByText(/Round 1/i)).toBeInTheDocument();
    });
  });

  it('handles story guessing correctly', async () => {
    render(<BibleCharades />);
    
    // Start game
    await userEvent.click(screen.getByText(/Start Game/i));

    // Make a guess
    const option = screen.getByText(BIBLE_STORIES[0].options[0]);
    await userEvent.click(option);

    // Verify feedback
    await waitFor(() => {
      expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    });
  });
});