import { ResponseInterface } from "src/features/auth/utils/auth.repo";

export interface UserUseCase {
  getProfile(userId: number): Promise<ResponseInterface>;
  getUserPlaces(userId: number): Promise<ResponseInterface>;
  getUserFavPlaces(userId: number): Promise<ResponseInterface>;
  removeUserPlace(placeId: number): Promise<ResponseInterface>;
}
