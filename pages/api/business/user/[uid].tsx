import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { E1 } from "client/constants/ErrorMessages";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler.get(async (req: any, res: any) => {
    const user = req.session.user;
    const userId = req.query.uid;
    if (
      !user ||
      !user.role ||
      user.role !== "PRO" ||
      parseInt(userId) !== user.id
    )
      return res.status(401).json({ message: E1 });

    try {
      const places = await prisma.place.findMany({
        where: { user_id: user.id },
        select: {
          id: true,
          name: true,
        },
      });
      res.status(200).json({ places });
    } catch (e) {
      res.status(400).json({ message: E1 });
    }
  }),
  ironConfig
);
