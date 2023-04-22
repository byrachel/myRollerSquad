import nextConnect from "next-connect";
import jwt from "jsonwebtoken";

import prisma from "../../../server/prisma/db/client";
import { initValidation, check } from "../../../server/middleware/validators";
import { E1, E3 } from "src/constants/ErrorMessages";
import { hashPassword } from "@/server/middleware/auth/password";
import sendEmail from "../../../server/middleware/sendEmail";
import { NextApiResponse } from "next";

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
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage("password is empty or incorrect."),
  check("email").isEmail().normalizeEmail().withMessage("Check your email."),
  check("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Name can't be empty"),
]);

export default handler
  .use(validator)
  .post(async (req: any, res: NextApiResponse) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.status(400).json({ code: E3 });

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) return res.status(400).json({ code: E1 });

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
        select: {
          id: true,
        },
      });

      const token = jwt.sign({}, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: "1h",
      });

      if (!user.id || !token) return res.status(400).json({ code: E1 });

      sendEmail(
        email,
        `<h2>Welcome ${name}to MyRollerSquad !</h2>`,
        `<p>Click <a href=` +
          `https://myrollersquad.vercel.app/login/${user.id}/${token}` +
          `>here</a> to login and activate your account.</p>`
      );

      res.status(201);
    } catch (err) {
      // console.log(err);
      res.status(400).json({ code: E1 });
    }
  });
