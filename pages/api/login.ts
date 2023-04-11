import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/infrastructure/prisma/db/client";
import bcrypt from "bcrypt";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("L'identifiant ou le mot de passe est manquant.");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser && existingUser.password) {
      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!validPassword) {
        console.log("L'identifiant ou le mot de passe est incorrect.");
      }
      //   const jti = uuidv4();
      //   const { accessToken, refreshToken } = generateTokens(existingUser, jti);
      //   await addRefreshTokenToWhitelist({
      //     jti,
      //     refreshToken,
      //     userId: existingUser.id,
      //   });

      res
        // .cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   sameSite: "strict",
        // })
        // .header("Authorization", accessToken)
        .send({ name: existingUser.name });
    } else {
      console.log("L'identifiant ou le mot de passe est incorrect.");
    }
  } catch (err) {
    console.log("Signin error.");
  }
}
