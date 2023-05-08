import bcrypt from "bcrypt";
import nextConnect from "next-connect";
import { NextApiResponse } from "next";

import prisma from "../../../server/prisma/db/client";
import { initValidation, check } from "../../../server/middleware/validators";
import { E3, E5, E6 } from "src/constants/ErrorMessages";
import { ironConfig } from "@/server/middleware/auth/ironConfig";
import { withIronSessionApiRoute } from "iron-session/next";

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

export default withIronSessionApiRoute(
  handler.use(validator).post(async (req: any, res: NextApiResponse) => {
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
            county: existingUser.county,
            isLoggedIn: true,
            places:
              existingUser.role === "PRO"
                ? existingUser.place.map((elt) => ({
                    id: elt.id,
                    name: elt.name,
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
  }),
  ironConfig
);
