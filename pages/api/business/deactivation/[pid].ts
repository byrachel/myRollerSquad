import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";

import prisma from "@/server/prisma/db/client";
import { E1, E2 } from "client/constants/ErrorMessages";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler.put(async (req: any, res: any) => {
    const { user } = req.session;
    if (!user) return res.status(401).json({ message: E2 });

    const { pid } = req.query;
    if (!pid) return res.status(401).json({ message: E2 });

    try {
      const place = await prisma.place.findUnique({
        where: {
          id: parseInt(pid),
        },
        select: {
          user_id: true,
        },
      });

      if (!place || !place.user_id)
        return res.status(401).json({ message: E2 });

      if (place.user_id === user.id || user.role === "ADMIN") {
        const placeUpdated = await prisma.place.update({
          where: {
            id: parseInt(pid),
          },
          data: {
            active: false,
          },
        });

        res.status(200).json({ place: placeUpdated });
      } else {
        return res.status(401).json({ message: E2 });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: E1 });
    }
  }),
  ironConfig
);
