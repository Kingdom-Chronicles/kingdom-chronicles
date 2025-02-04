import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KingdomBuilders } from '../KingdomBuilders';
import { BUILDINGS } from '../constants/buildings';

// Mock hooks
vi.mock('../hooks/useGameState', () => ({
  useGameState: () => ({
    resources: 500,
    grid: Array(5).fill(Array(5).fill(null)),
    selectedBuilding: null,
    setSelectedBuilding: vi.fn(),
    handleCellClick: vi.fn(),
    calculateScore: vi.fn(),
    resetGame: vi.fn()
  })
}));

describe('KingdomBuilders', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders game setup initially', () => {
    render(<KingdomBuilders />);
    expect(screen.getByText(/Kingdom Builders/i)).toBeInTheDocument();
  });

  it('starts game with selected settings', async () => {
    render(<KingdomBuilders />);
    
    // Select game settings
    await userEvent.click(screen.getByText(/Start Game/i));

    // Verify game started
    await waitFor(() => {
      expect(screen.getByText(/Round 1/i)).toBeInTheDocument();
    });
  });

  it('handles building placement correctly', async () => {
    render(<KingdomBuilders />);
    
    // Start game
    await userEvent.click(screen.getByText(/Start Game/i));

    // Select building and place it
    const houseButton = screen.getByText(/house/i);
    await userEvent.click(houseButton);
    
    const gridCell = screen.getAllByRole('button')[0];
    await userEvent.click(gridCell);

    // Verify building was placed
    await waitFor(() => {
      expect(gridCell).toHaveClass('bg-indigo-100');
    });
  });
});