import db from "../../prisma/db/client";
import { UserInterface } from "server/core/entities/UserInterface";
import { UserProfileRepositoryInterface } from "server/core/repositories/UserProfileRepositoryInterface";
// import { Prisma } from "@prisma/client";

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
    } catch (error) {
      console.log("SAVE USER AVATAR ERR", error);
      // if (error instanceof Prisma.PrismaClientKnownRequestError) {
      //   console.log("Prisma Code Error = ", error);
      //   return { status: 400, message: "Une erreur est survenue" };
      // }
    }
  }
  async updateUserProfile(
    userToUpdate: any,
    userId: number
  ): Promise<UserInterface | any> {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: userToUpdate,
    });

    const updatedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      resume: user.resume,
      social_medias: user.social_medias,
      my_squad: user.my_squad,
      roller_dance_level: user.roller_dance_level,
      skatepark_level: user.skatepark_level,
      artistic_level: user.artistic_level,
      freestyle_level: user.freestyle_level,
      urban_level: user.urban_level,
      derby_level: user.derby_level,
      country: user.country,
      city: user.city,
    };

    return updatedUser;
  }
}
