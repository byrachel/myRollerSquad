import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Payload {
  id: null | number;
  role: string;
  avatar: null | string;
  username: string;
  places: null | { id: number; name: string }[];
}

interface User {
  userId: null | number;
  userRole: string;
  avatar: null | string;
  userName: string;
  userPlaces: null | { id: number; name: string }[];
  isLoading: boolean;
}

export interface State extends User {
  login: (user: Payload) => void;
  logout: () => void;
  updateAvatar: (avatar: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const initialState = {
  userId: null,
  userRole: "USER",
  userName: "",
  avatar: null,
  userPlaces: null,
  isLoading: false,
};

export const useUser = create<State>()(
  persist(
    (set) => ({
      ...initialState,
      login: (user: Payload) =>
        set({
          ...user,
          userId: user.id,
          userRole: user.role,
          userPlaces: user.places,
          userName: user.username,
          avatar: user.avatar,
          isLoading: false,
        }),
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      logout: () => set(initialState),
      updateAvatar: (avatar: string) => set({ avatar }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
