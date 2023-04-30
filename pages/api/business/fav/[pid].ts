import nextConnect from "next-connect";

import prisma from "../../../../server/prisma/db/client";
import { E1 } from "src/constants/ErrorMessages";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler.put(async (req: any, res: any) => {
    const user = req.session.user;
    if (!user || !user.isLoggedIn) return res.status(401).json({ message: E1 });

    const { pid } = req.query;
    if (!pid) return res.status(401).json({ message: E1 });

    try {
      const place = await prisma.place.findUnique({
        where: {
          id: parseInt(pid),
        },
        select: {
          favorites: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!place) return res.status(401).json({ message: E1 });

      const isFav = place.favorites.find((fav) => fav.id === user.id);
      if (isFav) {
        const updatedPlaces = await prisma.place.update({
          where: {
            id: parseInt(pid),
          },
          data: {
            favorites: {
              disconnect: {
                id: user.id,
              },
            },
          },
          select: {
            favorites: {
              select: {
                id: true,
              },
            },
          },
        });
        res.status(200).json({ favorites: updatedPlaces.favorites });
      } else {
        const updatedPlaces = await prisma.place.update({
          where: {
            id: parseInt(pid),
          },
          data: {
            favorites: {
              connect: {
                id: user.id,
              },
            },
          },
          select: {
            favorites: {
              select: {
                id: true,
              },
            },
          },
        });
        res.status(200).json({ favorites: updatedPlaces.favorites });
      }
    } catch (e) {
      res.status(400).json({ message: E1 });
    }
  }),
  ironConfig
);
