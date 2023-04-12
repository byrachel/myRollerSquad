import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../server/infrastructure/prisma/db/client";
import bcrypt from "bcrypt";
import { UserInterface } from "app/interfaces/userInterfaces";

type Data = {
  user: UserInterface;
};

type Error = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(417).json({ name: "BODY IS MISSING" });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log(existingUser);

    if (existingUser && existingUser.password) {
      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!validPassword) {
        res.status(417).json({ name: "PASSWORD" });
      }
      //   const jti = uuidv4();
      //   const { accessToken, refreshToken } = generateTokens(existingUser, jti);
      //   await addRefreshTokenToWhitelist({
      //     jti,
      //     refreshToken,
      //     userId: existingUser.id,
      //   });
      console.log("NEXT API", existingUser);
      res
        .status(200)
        // .cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   sameSite: "strict",
        // })
        // .header("Authorization", accessToken)
        .send({ user: existingUser });
    } else {
      res.status(417).json({ name: "failed to load data" });
    }
  } catch (err) {
    res.status(500).json({ name: "failed to load data" });
  }
}
