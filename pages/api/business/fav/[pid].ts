import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { checkUserIsConnected } from "server/controllers/checkUserId";
import prisma from "server/prisma/db/client";
import { E1 } from "src/constants/ErrorMessages";

const handler = nextConnect();

export default handler.put(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserIsConnected(req, res);
    if (!user) return res.status(401).json({ message: E1 });

    const { pid } = req.query;
    if (!pid) return res.status(401).json({ message: E1 });
    const place_id = Array.isArray(pid) ? pid[0] : pid;
    const id = parseInt(place_id);

    try {
      const place = await prisma.place.findUnique({
        where: {
          id,
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

      const isFav = place.favorites.find(
        (fav: { id: number }) => fav.id === user.id
      );
      if (isFav) {
        const updatedPlaces = await prisma.place.update({
          where: {
            id,
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
        if (!updatedPlaces) return res.status(401).json({ message: E1 });
        res.status(200).json({ favorites: updatedPlaces.favorites });
      } else {
        const updatedPlaces = await prisma.place.update({
          where: {
            id,
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
        if (!updatedPlaces) return res.status(401).json({ message: E1 });
        res.status(200).json({ favorites: updatedPlaces.favorites });
      }
    } catch (e) {
      res.status(400).json({ message: E1 });
    }
  }
);
