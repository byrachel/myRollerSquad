import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "../../../../server/prisma/db/client";
import { E1 } from "views/constants/ErrorMessages";

const handler = nextConnect();

export default handler.get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { pid } = req.query;
    if (!pid) return res.status(400).json({ message: E1 });
    const place_id = Array.isArray(pid) ? pid[0] : pid;

    try {
      const place = await prisma.place.findUnique({
        where: {
          id: parseInt(place_id),
        },
        include: {
          favorites: {
            select: {
              id: true,
            },
          },
          posts: {
            select: {
              id: true,
              title: true,
              category: {
                select: {
                  name: true,
                },
              },
              created_at: true,
              content: true,
              pictures: true,
            },
          },
        },
      });
      if (!place) return res.status(200).json({ place: {} });
      res.status(200).json({ place });
    } catch (e) {
      res.status(500).json({ message: E1 });
    }
  }
);
