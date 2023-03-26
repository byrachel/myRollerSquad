import bcrypt from "bcrypt";
import prisma from "../../prisma/db/client";

export function newUserSignIn(user: {
  email: string;
  password: string;
  name: string;
}) {
  user.password = bcrypt.hashSync(user.password, 12);
  return prisma.user.create({
    data: user,
  });
}

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export function findUserById(id: number) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}
