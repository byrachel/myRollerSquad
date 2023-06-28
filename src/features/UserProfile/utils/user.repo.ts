import { UserUseCase } from "./user.usecases";
import { ResponseInterface } from "src/features/Authentication/utils/auth.repo";
import http from "src/interceptor/http";
import { IErrorCode } from "@/server/interfaces/globalInterfaces";
import { E1 } from "src/constants/ErrorMessages";

export class UserRepo implements UserUseCase {
  async getProfile(userId: number): Promise<ResponseInterface> {
    const userProfile = http({
      method: "get",
      url: `user/me/${userId}`,
    })
      .then((res: any) => {
        return { status: "SUCCESS", user: res.data.user };
      })
      .catch((error: IErrorCode) => {
        if (!error.response.data.message) {
          return { status: "ERROR", message: E1 };
        }
        return { status: "ERROR", message: error.response.data.message };
      });

    return userProfile;
  }
  async getUserPlaces(userId: number): Promise<ResponseInterface> {
    const userPlaces = http({
      method: "get",
      url: `business/user/${userId}`,
    })
      .then((res: any) => {
        return { status: "SUCCESS", userPlaces: res.data.places };
      })
      .catch(() => {
        return { status: "ERROR", userPlaces: null };
      });
    return userPlaces;
  }
  async removeUserPlace(placeId: number): Promise<ResponseInterface> {
    const userPlaceDeleted = http({
      method: "delete",
      url: `business/delete/${placeId}`,
    })
      .then(() => {
        return { status: "SUCCESS" };
      })
      .catch(() => {
        return { status: "ERROR" };
      });
    return userPlaceDeleted;
  }

  async getUserFavPlaces(userId: number): Promise<ResponseInterface> {
    const userFavs = http({
      method: "get",
      url: `user/favs/${userId}`,
    })
      .then((res: any) => {
        return { status: "SUCCESS", userFavs: res.data.userFavs };
      })
      .catch(() => {
        return { status: "ERROR", userFavs: [] };
      });
    return userFavs;
  }
}
