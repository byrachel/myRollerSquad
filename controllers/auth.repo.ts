import { E1, E3 } from "views/constants/ErrorMessages";
import { AuthUseCase } from "../models/auth/auth.usecases";
import http from "../views/utils/interceptor/http";
import { IErrorCode } from "@/server/utils/globalInterfaces";
import { UserInterface } from "models/entities/user.entity";
import { PlaceInterface } from "models/entities/business.entity";

export interface ResponseInterface {
  status: string;
  message?: string;
  user?: UserInterface;
  userPlaces?: PlaceInterface[] | null;
  userFavs?: PlaceInterface[];
}

// const passwordRegex: string =
//   "^[a-zA-Z0-9!#$%&'+/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*$";

// const emailregex: string = "^[w.-]+@[a-zA-Zd.-]+.[a-zA-Z]{2,}$";

// function isPasswordCorrect(input: string): boolean {
//   const regex: RegExp = new RegExp(regexPattern);
//   return regex.test(input);
// }

export class AuthRepository implements AuthUseCase {
  async register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<ResponseInterface> {
    // if (
    //   !data.name ||
    //   data.name.length < 3 ||
    //   !data.email ||
    //   !data.password ||
    //   !isPasswordCorrect(data.password)
    // )
    //   return { status: "ERROR", message: E3 };
    const newUser = http({
      method: "post",
      url: `auth/register`,
      data,
    })
      .then((res: any) => {
        return { status: "SUCCESS", message: res.data.message };
      })
      .catch((error: IErrorCode) => {
        if (!error.response.data.message) {
          return { status: "ERROR", message: E1 };
        }
        return { status: "ERROR", message: error.response.data.message };
      });

    return newUser;
  }
  async userAccountActivation(id: number): Promise<ResponseInterface> {
    const newUser = http({
      method: "put",
      url: "auth/activate",
      data: { id },
    })
      .then((res: any) => {
        return { status: "SUCCESS", message: res.data.message };
      })
      .catch(() => {
        return { status: "ERROR", message: E1 };
      });

    return newUser;
  }
  async sendActivationMail(id: number): Promise<ResponseInterface> {
    const newUser = http({
      method: "post",
      url: "auth/resend",
      data: { id },
    })
      .then((res: any) => {
        console.log(res.data.message);
        return { status: "SUCCESS", message: res.data.message };
      })
      .catch(() => {
        console.log("TEST");
        return { status: "ERROR", message: E1 };
      });

    return newUser;
  }
}
