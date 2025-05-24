
import { create } from 'zustand';

interface AiStore{
  geminiApiKey: string | null;
  loading:boolean;
  setGeminiApiKey: (input: string |null) => void;
}

export const useAiStore= create<AiStore>((set) => ({
  geminiApiKey: null,
  loading: false,
  setGeminiApiKey: (input: string | null) => set({ geminiApiKey: input }),
})); 