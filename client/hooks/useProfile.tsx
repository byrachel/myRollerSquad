import axios from "axios";
import { create } from "zustand";
import { PlaceInterface } from "client/entities/business.entity";
import { UserInterface } from "client/entities/user.entity";

export type UserProfile = {
  userProfileLoading: boolean;
  userProfile: UserInterface | null;
  userPlaces: PlaceInterface[] | null;
  userFavs: any[];
};

type Actions = {
  getUserProfile: (userId: number) => Promise<void>;
  updateUserProfile: (user: any) => void;
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
      .then((res) => {
        const userProfile = res.data.user;
        const userPlaces = userProfile.place;
        delete userProfile.place;
        set({
          userProfile,
          userPlaces,
        });
      })
      .catch(() => set({ userProfile: null, userPlaces: null }))
      .finally(() => set({ userProfileLoading: false }));
  },
  updateUserProfile: (user: any) => set({ userProfile: user }),
  getUserFavs: (favs: any[]) => set({ userFavs: favs }),
}));
