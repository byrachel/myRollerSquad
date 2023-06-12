import { UserUseCase } from "./user.usecases";
import { ResponseInterface } from "src/features/Auth/utils/auth.repo";
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
}

// axios(`/api/user/me/${userId}`, {
//   method: "GET",
//   withCredentials: true,
// })
//   .then((res) => set({ userProfile: res.data.user }))
//   .catch(() => set({ userProfile: null }))
//   .finally(() => set({ userProfileLoading: false }));
