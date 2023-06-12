import { UserRepo } from "./user.repo";

export const getUserProfile = async (userId: number) => {
  const getUser = new UserRepo();
  const userProfile = await getUser.getProfile(userId);

  console.log(userProfile);

  if (userProfile.status === "SUCCESS") {
    return userProfile.user;
  } else {
    return null;
  }
};
