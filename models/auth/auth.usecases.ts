import { ResponseInterface } from "../../controllers/auth.repo";

export interface AuthUseCase {
  register(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<ResponseInterface>;
  userAccountActivation(id: number): Promise<ResponseInterface>;
  sendActivationMail(id: number): Promise<ResponseInterface>;
}
