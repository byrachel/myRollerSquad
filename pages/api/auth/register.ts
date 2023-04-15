import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import prisma from "../../../server/infrastructure/prisma/db/client";
import handler, { initValidation, post, check } from "../middleware/validators";
import { E1, E3 } from "app/constants/ErrorMessages";

const validator = initValidation([
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
  check("email").isEmail().normalizeEmail().withMessage("Check your email."),
  check("name").not().isEmpty().trim().withMessage("Name can't be empty"),
]);

export default handler
  .use(post(validator))

  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) return res.status(400).json({ code: E3 });

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: bcrypt.hashSync(password, 12),
          name,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      res.status(201).send({ user });
    } catch (err) {
      console.log(err);
      res.status(400).json({ code: E1 });
    }
  });
