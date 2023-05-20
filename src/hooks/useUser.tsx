import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Payload {
  id: null | number;
  isLoggedIn: boolean;
  role: string;
  avatar: null | string;
  username: string;
  places: null | { id: number; name: string }[];
}

interface User {
  userId: null | number;
  isLoggedIn: boolean;
  userRole: string;
  avatar: null | string;
  userName: string;
  userPlaces: null | { id: number; name: string }[];
}

export interface State extends User {
  login: (user: Payload) => void;
  logout: () => void;
  updateAvatar: (avatar: string) => void;
  setUser: (isLoggedIn: boolean, id: number | null, role: string) => void;
}

const initialState = {
  userId: null,
  isLoggedIn: false,
  userRole: "USER",
  userName: "",
  avatar: null,
  userPlaces: null,
};

export const useUser = create<State>()(
  persist(
    (set) => ({
      ...initialState,
      login: (user: Payload) =>
        set({
          ...user,
          isLoggedIn: user.isLoggedIn,
          userId: user.id,
          userRole: user.role,
          userPlaces: user.places,
          userName: user.username,
          avatar: user.avatar,
        }),
      setUser: (isLoggedIn: boolean, id: number | null, role: string) =>
        set({
          isLoggedIn,
          userId: id,
          userRole: role,
        }),
      logout: () => set(initialState),
      updateAvatar: (avatar: string) => set({ avatar }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
