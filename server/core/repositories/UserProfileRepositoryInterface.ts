import { PrismaErrorInterface } from "../entities/ErrorInterface";
import { UserInterface } from "../entities/UserInterface";

export interface UserProfileRepositoryInterface {
  saveUserAvatar(
    userId: number,
    fileName: string
  ): Promise<UserInterface | PrismaErrorInterface>;
}
