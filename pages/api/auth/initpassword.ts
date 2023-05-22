import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import jwt from "jsonwebtoken";

import prisma from "../../../server/prisma/db/client";
import sendEmail from "../../../server/utils/sendEmail";
import { initValidation, check } from "../../../server/middleware/validators";
import { E3 } from "client/constants/ErrorMessages";

const handler = nextConnect();

const validator = initValidation([
  check("email").isEmail().normalizeEmail().withMessage(E3),
]);

export default handler
  .use(validator)
  .post(async (req: any, res: NextApiResponse) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: E3 });

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user || !user.id) return res.status(400).json({ message: E3 });

      const token = jwt.sign(
        { user: user.id },
        process.env.NEXT_PUBLIC_JWT as string,
        {
          expiresIn: "1h",
        }
      );

      const html =
        `<h2>Welcome back !</h2>
        <h3>As-tu demandé un nouveau mot de passe ?</h3>
        <p>Si c'est le cas, le lien ci-dessous te permettra de créer ton nouveau mot de passe.</p> <a href=` +
        `https://myrollersquad.vercel.app/auth/password/new/${user.id}/${token}` +
        `>Créer un nouveau mot de passe</a></p>` +
        `<p>Attention, pour des raisons de sécurité il n'est actif qu'une heure.</p><h2>My Roller Squad</h2>`;

      sendEmail(email, `[myRollerSquad] Mot de passe`, html);

      res.status(201).json({ email });
    } catch (err) {
      res.status(500).json({ message: E3 });
    }
  });
