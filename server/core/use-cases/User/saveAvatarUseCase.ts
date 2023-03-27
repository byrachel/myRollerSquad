import { UserInterface } from "../../entities/UserInterface";
import { UserProfileRepositoryInterface } from "../../repositories/UserProfileRepositoryInterface";

export class SaveAvatarUseCase {
  constructor(
    private readonly userProfileRepository: UserProfileRepositoryInterface
  ) {}

  async execute(
    userId: number,
    filename: string
  ): Promise<UserInterface | null> {
    return await this.userProfileRepository.saveUserAvatar(userId, filename);
  }
}
