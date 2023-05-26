import axios from "axios";
import { create } from "zustand";
import { PlaceInterface } from "src/entities/business.entity";
import { UserInterface } from "src/entities/user.entity";

export type UserProfile = {
  userProfileLoading: boolean;
  userProfile: UserInterface | null;
  userPlaces: PlaceInterface[] | null;
  userFavs: any[];
};

type Actions = {
  getUserProfile: (userId: number) => Promise<void>;
  getUserPlaces: (userId: number) => Promise<void>;
  updateUserProfile: (user: any) => void;
  updateUserPlace: (place: any) => void;
  deleteUserPlace: (placeId: number) => void;
  addUserPlace: (place: any) => void;
  getUserFavs: (favs: any[]) => void;
};

const initialState = {
  userProfileLoading: false,
  userProfile: null,
  userPlaces: null,
  userFavs: [],
};

export const useProfile = create<UserProfile & Actions>()((set) => ({
  ...initialState,
  getUserProfile: async (userId: number) => {
    set({ userProfileLoading: true });
    axios(`/api/user/me/${userId}`, {
      method: "GET",
      withCredentials: true,
    })
      .then((res) => set({ userProfile: res.data.user }))
      .catch(() => set({ userProfile: null }))
      .finally(() => set({ userProfileLoading: false }));
  },
  getUserPlaces: async (userId: number) => {
    set({ userProfileLoading: true });
    axios(`/api/business/user/${userId}`, {
      method: "GET",
      withCredentials: true,
    })
      .then((res) => set({ userPlaces: res.data.places }))
      .catch(() => set({ userPlaces: null }))
      .finally(() => set({ userProfileLoading: false }));
  },
  addUserPlace: (place: any) =>
    set((state) => {
      const userPlaces = state.userPlaces
        ? [...state.userPlaces, place]
        : [place];
      return { userPlaces };
    }),

  updateUserProfile: (user: any) => set({ userProfile: user }),
  updateUserPlace: (place: any) =>
    set((state) => {
      const userPlaces = state.userPlaces?.map((p) => {
        if (p.id === place.id) {
          return place;
        }
        return p;
      });
      return { userPlaces };
    }),
  deleteUserPlace: (placeId: number) =>
    set((state) => {
      const userPlaces = state.userPlaces?.filter((p) => p.id !== placeId);
      return { userPlaces };
    }),
  getUserFavs: (favs: any[]) => set({ userFavs: favs }),
}));
