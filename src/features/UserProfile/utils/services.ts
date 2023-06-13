import { UserRepo } from "./user.repo";

export const getUserProfile = async (userId: number) => {
  const user = new UserRepo();
  const userProfile = await user.getProfile(userId);

  if (userProfile.status === "SUCCESS") {
    return userProfile.user;
  } else {
    return null;
  }
};

export const getPlaces = async (userId: number) => {
  const user = new UserRepo();
  const userPlaces = await user.getUserPlaces(userId);
  return userPlaces.userPlaces;
};

export const getFavPlaces = async (userId: number) => {
  const user = new UserRepo();
  const userFavs = await user.getUserFavPlaces(userId);
  return userFavs.userFavs;
};

export const removeUserPlace = async (placeId: number) => {
  const user = new UserRepo();
  const placeRemoved = await user.removeUserPlace(placeId);
  return placeRemoved.status;
};
