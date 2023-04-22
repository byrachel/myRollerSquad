import bcrypt from "bcrypt";

import prisma from "../../../server/prisma/db/client";
// import { initValidation, check } from "../../../server/middleware/validators";
import { E1, E3 } from "src/constants/ErrorMessages";
import { NextApiResponse } from "next";
import { ironConfig } from "@/server/middleware/auth/ironConfig";
import { withIronSessionApiRoute } from "iron-session/next";

// const handler = nextConnect();

// const validator = initValidation([
//   check("email").isEmail().normalizeEmail().withMessage("Check your email."),
//   check("password")
//     .isStrongPassword({
//       minLength: 8,
//       minLowercase: 1,
//       minUppercase: 1,
//       minNumbers: 1,
//       minSymbols: 1,
//       returnScore: false,
//     })
//     .withMessage("password is empty or incorrect."),
// ]);

export default withIronSessionApiRoute(login, ironConfig);

async function login(req: any, res: NextApiResponse<any>) {
  if (req.method !== "POST") return res.status(401).json({ code: E1 });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ code: E3 });

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

      console.log(validPassword);
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
    res.status(400).json({ code: E1 });
  }
}
