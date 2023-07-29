import bcrypt from "bcrypt";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "server/prisma/db/client";
import { initValidation, check } from "server/middleware/validators";
import { E3, E5, E6 } from "views/constants/ErrorMessages";

const handler = nextConnect();

const validator = initValidation([
  check("email").isEmail().normalizeEmail().withMessage(E6),
  check("password")
    .isStrongPassword({
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
    })
    .withMessage(E6),
]);

export default handler
  .use(validator)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: E3 });

    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          place: true,
        },
      });

      if (!existingUser || !existingUser.active)
        return res.status(400).json({ message: E5 });

      if (existingUser.password) {
        const validPassword = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!validPassword) return res.status(400).json({ message: E6 });

        res.status(200).json({
          user: {
            id: existingUser.id,
            username: existingUser.name,
            role: existingUser.role,
            avatar: existingUser.avatar,
            places:
              existingUser.role === "PRO" || existingUser.role === "ADMIN"
                ? existingUser.place.map((elt: any) => ({
                    id: elt.id,
                    name: elt.name,
                    active: elt.active,
                  }))
                : null,
          },
        });
      } else {
        res.status(400).json({ message: E3 });
      }
    } catch (e) {
      res.status(500).json({ message: E6 });
    }
  });
