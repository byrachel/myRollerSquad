import prisma from "server/prisma/db/client";
import sharp from "sharp";

import {
  MinimalUserInterface,
  UpdateUserProfileInterface,
  UserFavs,
  UserInterface,
  UserProfileInterface,
} from "src/entities/user.entity";
import { UserProfileUseCase } from "@/server/usecases/UserProfile.usecase";
import { exclude } from "@/server/utils/prismaExclude";
import { uploadImage } from "../utils/uploadImage";

export class UserProfileRepository implements UserProfileUseCase {
  async getMyProfile(id: number): Promise<UserInterface | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          place: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!user) return null;
      const userWithoutPassword = exclude(user, ["password"]);
      return userWithoutPassword;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getUserProfile(id: number): Promise<UserProfileInterface | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          favorite_places: {
            select: {
              id: true,
              name: true,
              category: true,
              logo: true,
            },
          },
          place: {
            select: {
              id: true,
            },
          },
          posts: {
            take: 3,
            include: {
              comments: true,
              style: true,
              user_likes: {
                select: {
                  user_id: true,
                  id: true,
                },
              },
            },
          },
        },
      });
      if (!user) return null;
      const userWithoutPassword = exclude(user, ["password"]);
      return userWithoutPassword;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async updateUserProfile(
    id: number,
    data: UpdateUserProfileInterface
  ): Promise<UserInterface | null> {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data,
        include: {
          place: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!updatedUser) return null;
      const userWithoutPassword = exclude(updatedUser, ["password"]);
      return userWithoutPassword;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getUserFavs(id: number): Promise<UserFavs[] | null> {
    try {
      const userFavoriteBusiness = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          favorite_places: {
            select: {
              id: true,
              name: true,
              category: true,
              logo: true,
            },
          },
        },
      });
      if (!userFavoriteBusiness) return null;
      const userFavs = userFavoriteBusiness.favorite_places;
      return userFavs;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async updateAvatar(
    id: number,
    buffer: Buffer
  ): Promise<MinimalUserInterface | null> {
    const resizedBuffer = await sharp(buffer)
      .resize({ width: 200, height: 200 })
      .toBuffer();

    if (!resizedBuffer || !process.env.S3_AVATAR_BUCKET_NAME) return null;
    const avatar = await uploadImage(
      process.env.S3_AVATAR_BUCKET_NAME,
      resizedBuffer
    );

    if (!avatar || !avatar.Key) return null;
    const userToUpdate = await prisma.user.update({
      where: {
        id,
      },
      data: {
        avatar: avatar.Key,
      },
    });
    if (!userToUpdate) return null;
    return userToUpdate;
  }
}
