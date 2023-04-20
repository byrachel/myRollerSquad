import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prisma/db/client";
import { E1, E3 } from "app/constants/ErrorMessages";
import jwt from "jsonwebtoken";
import { withSessionRoute } from "app/utils/withSession";
import sendEmail from "../sendEmail";

export default withSessionRoute(async (req: any, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(401).json({ code: E1 });

  const { id } = req.body;
  if (!id || typeof id !== "number") return res.status(400).json({ code: E3 });

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    const token = jwt.sign({}, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn: "1h",
    });

    if (!user || !token) return res.status(400).json({ code: E1 });

    console.log("USER", user);

    sendEmail(
      user.email,
      "Welcome to MyRollerSquad !",
      `<p>Click <a href=` +
        `https://myrollersquad.vercel.app/login/${user.id}/${token}` +
        `>here</a> to login and activate your account.</p>`
    );

    res.status(201);
  } catch (err) {
    console.log(err);
    res.status(400).json({ code: E1 });
  }
});
