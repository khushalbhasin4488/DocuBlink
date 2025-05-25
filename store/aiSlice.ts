
import { create } from 'zustand';

interface AiStore{
  geminiApiKeyState: string | null;
  loading:boolean;
  setGeminiApiKeyState: (input: string |null) => void;
  reset: () => void;
}

export const useAiStore= create<AiStore>((set) => ({
  geminiApiKeyState: null,
  loading: false,
  setGeminiApiKeyState: (input: string | null) => set({ geminiApiKeyState: input }),
  reset: () => set({ geminiApiKeyState: null, loading: false
  })
})); 