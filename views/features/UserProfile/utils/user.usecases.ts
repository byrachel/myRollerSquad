import { ResponseInterface } from "controllers/auth.repo";

export interface UserUseCase {
  getProfile(userId: number): Promise<ResponseInterface>;
  getUserPlaces(userId: number): Promise<ResponseInterface>;
  getUserFavPlaces(userId: number): Promise<ResponseInterface>;
  removeUserPlace(placeId: number): Promise<ResponseInterface>;
}
