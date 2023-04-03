import db from "../../prisma/db/client";
import { UserInterface } from "server/core/entities/UserInterface";
import { UserProfileRepositoryInterface } from "server/core/repositories/UserProfileRepositoryInterface";
import { Prisma } from "@prisma/client";

export class UserProfileRepository implements UserProfileRepositoryInterface {
  async saveUserAvatar(
    userId: number,
    fileName: string
  ): Promise<UserInterface | any> {
    try {
      if (!userId || !fileName)
        return { status: 400, message: "Une erreur est survenue" };
      const user = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          avatar: fileName,
        },
      });
      return user ? user : { status: 400, message: "Une erreur est survenue" };
    } catch (e) {
      // @ts-nocheck
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log("Prisma Code Error = ", e);
        return { status: 400, message: "Une erreur est survenue" };
      }
    }
  }
}
