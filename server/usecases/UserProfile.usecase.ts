import { PostInterface } from "src/entities/flow.entity";
import { PlaceInterface } from "src/entities/business.entity";
import {
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
  getUserPlaces(id: number): Promise<PlaceInterface[]>;
  getUserFavs(id: number): Promise<UserFavs[] | null>;
  getUserPosts(id: number): Promise<PostInterface[]>;
}
