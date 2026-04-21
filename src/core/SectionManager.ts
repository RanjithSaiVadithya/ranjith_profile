import { create } from 'zustand';

interface SectionState {
  status: 'enter' | 'active' | 'exit';
  setStatus: (s: 'enter' | 'active' | 'exit') => void;
}

export const useSectionManager = create<SectionState>((set) => ({
  status: 'enter',
  setStatus: (status) => set({ status }),
}));
