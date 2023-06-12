import { ResponseInterface } from "src/features/Auth/utils/auth.repo";

export interface UserUseCase {
  getProfile(userId: number): Promise<ResponseInterface>;
}
