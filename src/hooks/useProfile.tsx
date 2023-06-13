import { create } from "zustand";
import { PlaceInterface } from "src/entities/business.entity";
import { UserInterface } from "src/entities/user.entity";
import {
  getFavPlaces,
  getPlaces,
  getUserProfile,
} from "src/features/UserProfile/utils/services";

export type UserProfile = {
  userProfileLoading: boolean;
  userProfile: UserInterface | null;
  userPlaces: PlaceInterface[] | null;
  userFavs: any[];
};

type Actions = {
  getUserProfile: (userId: number) => Promise<void>;
  getUserPlaces: (userId: number) => Promise<void>;
  getUserFavs: (userId: number) => Promise<void>;
  updateUserProfile: (user: any) => void;
  updateUserPlace: (place: any) => void;
  deleteUserPlace: (placeId: number) => void;
  addUserPlace: (place: any) => void;
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
    const user = await getUserProfile(userId);
    if (!user) set({ userProfile: null });
    set({ userProfile: user });
    set({ userProfileLoading: false });
  },
  getUserPlaces: async (userId: number) => {
    set({ userProfileLoading: true });
    const places = await getPlaces(userId);
    set({ userPlaces: places });
    set({ userProfileLoading: false });
  },
  getUserFavs: async (userId: number) => {
    const userFavs = await getFavPlaces(userId);
    set({ userFavs });
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
}));
