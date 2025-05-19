import { create } from 'zustand';
interface SyncStore{
    syncValue: boolean
    setSyncValue: (value: boolean) => void
}

export const useSyncStore = create<SyncStore>((set) => ({
    syncValue: false,
    setSyncValue: (value: boolean) => set({ syncValue: value })
}))