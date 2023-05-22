import type { NextApiResponse } from "next";
import prisma from "../../../server/prisma/db/client";
import { E1, E3 } from "client/constants/ErrorMessages";
import jwt from "jsonwebtoken";
import { withSessionRoute } from "@/server/middleware/auth/withSession";
import sendEmail from "../../../server/utils/sendEmail";

export default withSessionRoute(async (req: any, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(401).json({ message: E1 });

  const { id } = req.body;
  if (!id || typeof id !== "number")
    return res.status(400).json({ message: E3 });

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    const token = jwt.sign({}, process.env.NEXT_PUBLIC_JWT as string, {
      expiresIn: "1h",
    });

    if (!user || !token) return res.status(400).json({ message: E1 });

    sendEmail(
      user.email,
      "[ myRollerSquad ]",
      `<p>Active ton compte <a href=` +
        `https://myrollersquad.vercel.app/login/${user.id}/${token}` +
        `>en cliquant sur ce lien !</a></p><h3>myRollerSquad</h3>`
    );

    res.status(201).json({});
  } catch (err) {
    res.status(400).json({ message: E1 });
  }
});
