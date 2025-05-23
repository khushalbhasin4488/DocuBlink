
import { create } from "zustand";

interface userState {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
}

interface UserStore {
    user: userState;
    setUser: (user: userState) => void;
    clearUser: () => void;
    
}

export const useUserStore = create<UserStore>((set) => ({
    user: {
        id: "",
        name: null,
        email: "",
        photo: null,
        familyName: null,
        givenName: null
    },
    setUser: (user: userState) => set({ user }),
    clearUser: () => set({ 
        user: {
            id: "",
            name: null,
            email: "",
            photo: null,
            familyName: null,
            givenName: null
        }
    }),
}));