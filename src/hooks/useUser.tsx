import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Payload = {
  id: null | number;
  role: string;
  avatar: null | string;
  username: string;
  places: null | { id: number; name: string }[];
};

export type State = {
  userId: null | number;
  userRole: string;
  avatar: null | string;
  userName: string;
  userPlaces: null | { id: number; name: string }[];
  login: (user: Payload) => void;
  logout: () => void;
  updateAvatar: (avatar: string) => void;
};

type Actions = {
  login: (user: Payload) => void;
  logout: () => void;
  updateAvatar: (avatar: string) => void;
};

const initialState = {
  userId: null,
  userRole: "USER",
  userName: "",
  avatar: null,
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
          avatar: user.avatar,
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
