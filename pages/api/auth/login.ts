import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";
import { v4 as uuidv4 } from "uuid";

import prisma from "../../../server/infrastructure/prisma/db/client";
import { generateTokens } from "./jwt";
import handler, { initValidation, post, check } from "../middleware/validators";

const validator = initValidation([
  check("email").isEmail().normalizeEmail().withMessage("Check your email."),
  check("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage("password is empty or incorrect."),
]);

export default handler
  .use(post(validator))

  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;
    try {
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
          res.status(417).json({ name: "PASSWORD is incorrect" });
        }
        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(existingUser, jti);
        //   await addRefreshTokenToWhitelist({
        //     jti,
        //     refreshToken,
        //     userId: existingUser.id,
        //   });

        const user = { ...existingUser, password: undefined };
        res
          .status(200)
          .setHeader("Set-Cookie", [
            cookie.serialize("refreshToken", refreshToken, {
              httpOnly: true,
              // secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60 * 24 * 7, // 1 week
              sameSite: "strict",
              path: "/",
            }),
            cookie.serialize("accessToken", accessToken, {
              httpOnly: false,
              // secure: process.env.NODE_ENV !== "development",
              maxAge: 60 * 60,
              sameSite: "strict",
              path: "/",
            }),
          ])
          .send({ user });
      } else {
        res.status(417).json({ name: "failed to load data" });
      }
    } catch (err) {
      res.status(500).json({ name: "failed to load data" });
    }
  });
