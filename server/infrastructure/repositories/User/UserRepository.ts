import bcrypt from "bcrypt";
import prisma from "../../prisma/db/client";
// import { Prisma } from "@prisma/client";

export async function newUserSignIn(user: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    user.password = bcrypt.hashSync(user.password, 12);
    return await prisma.user.create({
      data: user,
    });
  } catch (error) {
    console.log("NEW USER SIGN IN ERR", error);
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   console.log("Prisma Code Error = ", error);
    //   if (error.code === "P2002") {
    //     throw new Error("Il semble que cet email soit déjà utilisé.");
    //   }
    // }
  }
}

export function findUserByEmail(email: string) {
  try {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    console.log("FIND USER BY EMAIL ERR", error);
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   console.log("Prisma Code Error = ", error);
    //   if (error.code === "P2002") {
    //     throw new Error("L'identifiant ou le mot de passe est incorrect.");
    //   }
    // }
  }
}

export function findUserById(id: number) {
  try {
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        resume: true,
        social_medias: true,
        my_squad: true,
        roller_dance_level: true,
        skatepark_level: true,
        artistic_level: true,
        freestyle_level: true,
        urban_level: true,
        derby_level: true,
        role: true,
        name: true,
        avatar: true,
        posts: {
          take: 3,
          include: {
            comments: true,
            user_likes: true,
          },
        },
        email: true,
        country: true,
        city: true,
        postLiked: true,
      },
    });
  } catch (error) {
    console.log("FIND USER BY ID ERR", error);
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   console.log("Prisma Code Error = ", error);
    // }
  }
}
