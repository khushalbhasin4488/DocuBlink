import { User } from "firebase/auth";
import { create } from "zustand";

interface UserState {
    firebaseUser: User | null;
    isAuthenticated: boolean;
}

interface UserStore {
    user: UserState;
    setUser: (user: UserState) => void;
    clearUser: () => void;
    setFirebaseUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: {
        firebaseUser: null,
        isAuthenticated: false
    },
    setUser: (user: UserState) => set({ user }),
    clearUser: () => set({ 
        user: {
            firebaseUser: null,
            isAuthenticated: false
        }
    }),
    setFirebaseUser: (user: User | null) => set((state) => ({
        user: {
            ...state.user,
            firebaseUser: user,
            isAuthenticated: !!user
        }
    }))
}));