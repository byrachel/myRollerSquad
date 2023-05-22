import nextConnect from "next-connect";

import prisma from "../../../../server/prisma/db/client";
import { E1 } from "client/constants/ErrorMessages";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler.get(async (req: any, res: any) => {
    const user = req.session.user;
    if (!user && !user.role && user.role !== "ADMIN")
      return res.status(401).json({ message: E1 });

    try {
      const places = await prisma.place.findMany({
        where: {
          active: false,
        },
      });
      res.status(200).json({ places });
    } catch (e) {
      res.status(400).json({ message: E1 });
    }
  }),
  ironConfig
);
