import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IAnalysis } from '../types';

interface StudyState {
  history: IAnalysis[];
  addAnalysis: (analysis: IAnalysis) => void;
  setHistory: (history: IAnalysis[]) => void;
  clearHistory: () => void;
}

export const useStudyStore = create<StudyState>()(
  persist(
    (set) => ({
      history: [],
      
      addAnalysis: (analysis) => 
        set((state) => ({ 
          history: [analysis, ...state.history] 
        })),

      setHistory: (history) => set({ history }),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'study-ai-storage', // nombre de la llave en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);