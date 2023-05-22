import prisma from "server/prisma/db/client";

import { PlaceInterface } from "src/entities/business.entity";
import { PostInterface } from "src/entities/flow.entity";
import {
  UserFavs,
  UserInterface,
  UserProfileInterface,
} from "src/entities/user.entity";
import { UserProfileUseCase } from "src/usecases/UserProfile.usecase";
import { exclude } from "@/server/utils/prismaExclude";

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
  async updateProfile(data: UserInterface): Promise<UserInterface> {
    return data;
  }
  async getUserPlaces(id: number): Promise<PlaceInterface[]> {
    console.log(id);
    return [];
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
  async getUserPosts(id: number): Promise<PostInterface[]> {
    console.log(id);
    return [];
  }
}
