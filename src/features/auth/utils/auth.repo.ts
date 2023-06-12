import { E1 } from "src/constants/ErrorMessages";
import { AuthUseCase } from "./auth.usecases";
import http from "../../../interceptor/http";
import { IErrorCode } from "@/server/interfaces/globalInterfaces";
import { UserInterface } from "src/entities/user.entity";

export interface ResponseInterface {
  status: string;
  message?: string;
  user?: UserInterface;
}

export class AuthRepository implements AuthUseCase {
  async register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<ResponseInterface> {
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
