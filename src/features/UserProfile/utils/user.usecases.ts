import { ResponseInterface } from "src/features/auth/utils/auth.repo";

export interface UserUseCase {
  getProfile(userId: number): Promise<ResponseInterface>;
}
