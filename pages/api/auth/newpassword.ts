import nextConnect from "next-connect";
import { NextApiResponse } from "next";

import prisma from "../../../server/prisma/db/client";
import { initValidation, check } from "../../../server/middleware/validators";
import { E1, E3 } from "src/constants/ErrorMessages";
import { hashPassword } from "@/server/middleware/auth/password";

const handler = nextConnect();

const validator = initValidation([
  check("password")
    .isStrongPassword({
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
    })
    .withMessage(E3),
  check("id").isInt(),
]);

export default handler
  .use(validator)
  .put(async (req: any, res: NextApiResponse) => {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: E3 });

    try {
      const hashedPassword = await hashPassword(password);
      if (!hashedPassword) return res.status(500).json({ message: E1 });
      const user = await prisma.user.update({
        where: {
          id: req.body.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      if (!user) return res.status(400).json({ message: E3 });
      res.status(200).json({ user: user.id });
    } catch (err) {
      res.status(500).json({ message: E1 });
    }
  });
