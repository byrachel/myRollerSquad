import nextConnect from "next-connect";
import { NextApiResponse } from "next";

import prisma from "../../../server/prisma/db/client";
import { initValidation, check } from "../../../server/middleware/validators";
import { E1, E3 } from "src/constants/ErrorMessages";

const handler = nextConnect();

const validator = initValidation([
  check("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
    .withMessage(E3),
  check("id").isInt(),
]);

export default handler
  .use(validator)
  .put(async (req: any, res: NextApiResponse) => {
    const { password } = req.body;
    if (!password) return res.status(400).json({ code: E3 });

    try {
      const user = await prisma.user.update({
        where: {
          id: req.body.id,
        },
        data: {
          password,
        },
      });

      console.log(user);
      if (!user) return res.status(400).json({ code: E3 });
      res.status(201);
    } catch (err) {
      res.status(500).json({ code: E1 });
    }
  });
