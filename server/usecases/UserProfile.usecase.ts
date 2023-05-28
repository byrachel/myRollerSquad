import {
  MinimalUserInterface,
  UpdateUserProfileInterface,
  UserFavs,
  UserInterface,
  UserProfileInterface,
} from "src/entities/user.entity";

export interface UserProfileUseCase {
  getMyProfile(id: number): Promise<UserInterface | null>;
  getUserProfile(id: number): Promise<UserProfileInterface | null>;
  updateUserProfile(
    id: number,
    data: UpdateUserProfileInterface
  ): Promise<UserInterface | null>;
  getUserFavs(id: number): Promise<UserFavs[] | null>;
  updateAvatar(
    id: number,
    buffer: Buffer
  ): Promise<MinimalUserInterface | null>;
}
