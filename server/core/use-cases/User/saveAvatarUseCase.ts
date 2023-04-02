import { PrismaErrorInterface } from "../../entities/ErrorInterface";
import { UserInterface } from "../../entities/UserInterface";
import { UserProfileRepositoryInterface } from "../../repositories/UserProfileRepositoryInterface";

export class SaveAvatarUseCase {
  constructor(
    private readonly userProfileRepository: UserProfileRepositoryInterface
  ) {}

  async execute(
    userId: number,
    filename: string
  ): Promise<UserInterface | PrismaErrorInterface> {
    return await this.userProfileRepository.saveUserAvatar(userId, filename);
  }
}
