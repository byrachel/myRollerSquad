import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Payload = {
  id: null | number;
  role: string;
  county: null | string;
  isLoggedIn: boolean;
  username: string;
  places: null | { id: number; name: string }[];
};

export type State = {
  userId: null | number;
  userRole: string;
  county: null | string;
  isLoggedIn: boolean;
  userName: string;
  userPlaces: null | { id: number; name: string }[];
  login: (user: Payload) => void;
  logout: () => void;
};

type Actions = {
  login: (user: Payload) => void;
  logout: () => void;
};

const initialState = {
  userId: null,
  userRole: "USER",
  userName: "",
  county: null,
  isLoggedIn: false,
  userPlaces: null,
};

export const useUser = create<State & Actions>()(
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
        }),
      logout: () => set(initialState),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
