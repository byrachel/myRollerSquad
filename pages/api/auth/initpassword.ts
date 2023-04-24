import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import jwt from "jsonwebtoken";

import prisma from "../../../server/prisma/db/client";
import sendEmail from "../../../server/middleware/sendEmail";
import { initValidation, check } from "../../../server/middleware/validators";
import { E3 } from "src/constants/ErrorMessages";

const handler = nextConnect();

const validator = initValidation([
  check("email").isEmail().normalizeEmail().withMessage(E3),
]);

export default handler
  .use(validator)
  .post(async (req: any, res: NextApiResponse) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ code: E3 });

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      console.log(user);

      if (user && user.id) {
        const token = jwt.sign(
          { user: user.id },
          process.env.JWT_ACCESS_SECRET as string,
          {
            expiresIn: "1h",
          }
        );
        console.log(token);
        const html =
          `<h2>Welcome back !</h2>
        <h3>As-tu demandé un nouveau mot de passe ?</h3>
        <p>Si c'est le cas, le lien ci-dessus te permettra de créer ton nouveau mot de passe. Sinon, tu n'as qu'à ignorer cet e-mail ;-)</p> <a href=` +
          `https://myrollersquad.vercel.app/newpassword/${user.id}/${token}</p><br /><p>Attention, pour des raisons de sécurité n'est actif qu'une heure.</p><h2>My Roller Squad</h2>`;

        sendEmail(email, `[myRollerSquad] Mot de passe`, html);
        console.log(html);
      }

      res.status(201);
    } catch (err) {
      res.status(500).json({ code: E3 });
    }
  });
