import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { checkUserId } from "@/server/controllers/checkUser";
import prisma from "server/prisma/db/client";
import { E1 } from "src/constants/ErrorMessages";

const handler = nextConnect();

export default handler.get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserId(req, res);
    if (!user) return res.status(401).json({ message: E1 });

    try {
      const places = await prisma.place.findMany({
        where: { user_id: user.id },
        include: {
          favorites: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!places) return res.status(400).json({ message: E1 });
      res.status(200).json({ places });
    } catch (e) {
      res.status(400).json({ message: E1 });
    }
  }
);
