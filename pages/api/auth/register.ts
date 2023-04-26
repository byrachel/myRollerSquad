import nextConnect from "next-connect";
import jwt from "jsonwebtoken";

import prisma from "../../../server/prisma/db/client";
import { initValidation, check } from "../../../server/middleware/validators";
import { E1, E3, E4 } from "src/constants/ErrorMessages";
import { hashPassword } from "@/server/middleware/auth/password";
import { transporter } from "../../../server/middleware/sendEmail";
import { NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

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
  check("email").isEmail().normalizeEmail().withMessage(E3),
  check("name").not().isEmpty().trim().escape().withMessage(E3),
]);

export default handler
  .use(validator)
  .post(async (req: any, res: NextApiResponse) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name)
      return res.status(400).json({ message: E3 });

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) return res.status(500).json({ message: E1 });

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

      if (!user) return res.status(400).json({ message: E4 });

      const token = jwt.sign({}, process.env.JWT_ACCESS_SECRET as string, {
        expiresIn: "1h",
      });

      if (!user.id || !token) return res.status(400).json({ message: E1 });

      const html =
        `<h2>Bienvenue dans la squad !</h2><p><a href=` +
        `https://myrollersquad.vercel.app/login/${user.id}/${token}` +
        `>Voici le lien pour activer ton compte</a>.</p><p>Attention : Il n'est actif qu'une heure, ne tarde pas à l'activer et partager tes prouesses !</p><h3>My Roller Squad</h3>`;

      transporter.sendMail(
        {
          from: "myRollerSquad <myrollersquad@gmail.com>",
          to: email,
          subject: "[ myRollerSquad ] Bienvenue !",
          html,
        },
        (err, info) => {
          if (info) {
            res
              .status(201)
              .json({ message: "Le compte a été créé avec succès." });
            return true;
          } else {
            return res.status(400).json({ message: E1 });
          }
        }
      );
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          res.status(401).json({ message: E4 });
        } else {
          res.status(400).json({ message: E1 });
        }
      } else {
        res.status(500).json({ message: E1 });
      }
    }
  });
