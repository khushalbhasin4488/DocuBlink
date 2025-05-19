
import { create } from 'zustand';

interface AiStore{
  geminiInput: string | null;
  setGeminiInput: (input: string) => void;
}

export const useAiStore= create<AiStore>((set) => ({
  geminiInput: null,
  setGeminiInput: (input: string) => set({ geminiInput: input }),
})); 