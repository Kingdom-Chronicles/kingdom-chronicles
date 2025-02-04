import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn()
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children
  }
}));

// Mock react-ga4
vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
    event: vi.fn()
  }
}));

// Mock audio context
window.AudioContext = vi.fn().mockImplementation(() => ({
  createOscillator: vi.fn().mockReturnValue({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    disconnect: vi.fn(),
    frequency: {
      setValueAtTime: vi.fn()
    }
  }),
  createGain: vi.fn().mockReturnValue({
    connect: vi.fn(),
    gain: {
      value: 0
    }
  }),
  destination: {},
  currentTime: 0,
  close: vi.fn()
}));