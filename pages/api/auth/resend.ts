import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prisma/db/client";
import { E1, E2 } from "src/constants/ErrorMessages";
import jwt from "jsonwebtoken";
import sendEmail from "server/utils/sendEmail";
import nextConnect from "next-connect";

const handler = nextConnect();

export default handler.post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: E2 });
    const user_id = Array.isArray(id) ? id[0] : id;

    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(user_id) },
      });

      const token = jwt.sign({}, process.env.NEXT_PUBLIC_JWT as string, {
        expiresIn: "1h",
      });

      if (!user || !token) return res.status(400).json({ message: E1 });

      sendEmail(
        user.email,
        "[ myRollerSquad ]",
        `<p>Active ton compte <a href=` +
          `https://myrollersquad.vercel.app/auth/login/${user.id}/${token}` +
          `>en cliquant sur ce lien !</a></p><h3>myRollerSquad</h3>`
      );

      res.status(201).json({});
    } catch (err) {
      res.status(400).json({ message: E1 });
    }
  }
);
