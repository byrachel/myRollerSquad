import bcrypt from "bcrypt";
import nextConnect from "next-connect";
import { NextApiResponse } from "next";

import prisma from "../../../server/prisma/db/client";
import { initValidation, check } from "../../../server/middleware/validators";
import { E3, E5, E6 } from "src/constants/ErrorMessages";

const handler = nextConnect();

const validator = initValidation([
  check("email").isEmail().normalizeEmail().withMessage(E3),
  check("password")
    .isStrongPassword({
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(E3),
]);

export default handler
  .use(validator)
  .post(async (req: any, res: NextApiResponse) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ code: E3 });

    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      console.log(existingUser);

      if (!existingUser || !existingUser.active)
        return res.status(400).json({ code: E5 });

      if (existingUser.password) {
        const validPassword = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!validPassword) return res.status(400).json({ code: E3 });

        // const user = (req.session.user = {
        //   id: existingUser.id,
        //   role: existingUser.role,
        //   isLoggedIn: true,
        // });

        req.session.user = {
          id: existingUser.id,
          role: existingUser.role,
          isLoggedIn: true,
        };
        await req.session.save();

        res.status(200).json({
          user: {
            id: existingUser.id,
            role: existingUser.role,
            isLoggedIn: true,
          },
        });
      } else {
        res.status(400).json({ code: E3 });
      }
    } catch (e) {
      res.status(400).json({ code: E6 });
    }
  });
