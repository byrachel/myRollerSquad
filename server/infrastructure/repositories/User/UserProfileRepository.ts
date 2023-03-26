import prisma from "../../prisma/db/client";
import { UserInterface } from "server/core/entities/UserInterface";
import { UserProfileRepositoryInterface } from "server/core/repositories/UserProfileRepositoryInterface";

export class UserProfileRepository implements UserProfileRepositoryInterface {
  async saveUserAvatar(
    userId: number,
    fileName: string
  ): Promise<UserInterface | null> {
    if (!userId || !fileName) return null;
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: fileName,
      },
    });
    return user;
  }
}
