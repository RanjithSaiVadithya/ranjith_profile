import { create } from 'zustand';

interface ScrollState {
  progress: number;
  direction: 'up' | 'down' | null;
  activeSection: string;
  setProgress: (p: number) => void;
  setDirection: (d: 'up' | 'down' | null) => void;
  setActiveSection: (s: string) => void;
}

export const useScrollEngine = create<ScrollState>((set) => ({
  progress: 0,
  direction: null,
  activeSection: 'home',
  setProgress: (progress) => set({ progress }),
  setDirection: (direction) => set({ direction }),
  setActiveSection: (activeSection) => set({ activeSection }),
}));
