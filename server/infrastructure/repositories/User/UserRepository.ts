import bcrypt from "bcrypt";
import db from "../../prisma/db/client";
import { Prisma } from "@prisma/client";

export async function newUserSignIn(user: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    user.password = bcrypt.hashSync(user.password, 12);
    return await db.user.create({
      data: user,
    });
  } catch (error) {
    // @eslint-ignore
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("Prisma Code Error = ", error);
      if (error.code === "P2002") {
        throw new Error("Il semble que cet email soit déjà utilisé.");
      }
    }
  }
}

export function findUserByEmail(email: string) {
  try {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    // @eslint-ignore
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("Prisma Code Error = ", error);
      if (error.code === "P2002") {
        throw new Error("L'identifiant ou le mot de passe est incorrect.");
      }
    }
  }
}

export function findUserById(id: number) {
  try {
    return db.user.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    // @eslint-ignore
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("Prisma Code Error = ", error);
    }
  }
}
