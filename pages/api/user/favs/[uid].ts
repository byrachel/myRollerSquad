import { withIronSessionApiRoute } from "iron-session/next";
import { ironConfig } from "@/server/middleware/auth/ironConfig";
import { E1, E2 } from "src/constants/ErrorMessages";
import nextConnect from "next-connect";
import prisma from "@/server/prisma/db/client";

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler.get(async (req: any, res: any) => {
    const { user } = req.session;
    if (!user) return res.status(401).json({ message: E2 });

    try {
      const userFavs = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          favorite_places: {
            select: {
              id: true,
              name: true,
              category: true,
              logo: true,
            },
          },
        },
      });
      if (!userFavs) return res.status(400).json({ message: E1 });
      res.status(200).json({ userFavs: userFavs.favorite_places });
    } catch (error) {
      res.status(400).json({ message: E1 });
    }
  }),
  ironConfig
);
