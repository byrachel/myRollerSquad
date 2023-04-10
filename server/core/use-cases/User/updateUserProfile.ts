import { PrismaErrorInterface } from "../../entities/ErrorInterface";
import { UserInterface } from "../../entities/UserInterface";
import { UserProfileRepositoryInterface } from "../../repositories/UserProfileRepositoryInterface";

export class UpdateUserProfileUseCase {
  constructor(
    private readonly userProfileRepository: UserProfileRepositoryInterface
  ) {}

  async execute(
    userToUpdate: UserInterface,
    userId: number
  ): Promise<any | PrismaErrorInterface> {
    return await this.userProfileRepository.updateUserProfile(
      userToUpdate,
      userId
    );
  }
}
