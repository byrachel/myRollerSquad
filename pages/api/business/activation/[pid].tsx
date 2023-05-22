import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";

import prisma from "@/server/prisma/db/client";
import { E1, E2 } from "client/constants/ErrorMessages";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler.put(async (req: any, res: any) => {
    const { user } = req.session;
    if (!user && user.role !== "ADMIN")
      return res.status(401).json({ message: E2 });

    const { pid } = req.query;
    if (!pid) return res.status(401).json({ message: E2 });

    try {
      const place = await prisma.place.update({
        where: {
          id: parseInt(pid),
        },
        data: {
          active: true,
        },
      });

      if (!place.active) return res.status(400).json({ message: E1 });

      const userRoleUpdated = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          role: "PRO",
        },
      });

      if (!userRoleUpdated || userRoleUpdated.role !== "PRO")
        return res.status(400).json({ message: E1 });

      res.status(200).json({ place });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: E1 });
    }
  }),
  ironConfig
);
