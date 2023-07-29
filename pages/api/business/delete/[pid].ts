import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { checkUserIsConnected } from "@/server/controllers/checkUser";
import prisma from "server/prisma/db/client";
import { E1, E2 } from "views/constants/ErrorMessages";

const handler = nextConnect();

export default handler.delete(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserIsConnected(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    const { pid } = req.query;
    if (!pid) return res.status(400).json({ message: E1 });
    const place_id = Array.isArray(pid) ? pid[0] : pid;
    const id = parseInt(place_id);

    try {
      const place = await prisma.place.findUnique({
        where: {
          id,
        },
        select: {
          user_id: true,
        },
      });

      if (!place || !place.user_id || place.user_id !== user.id)
        return res.status(400).json({ message: E2 });

      await prisma.place.delete({
        where: {
          id,
        },
      });

      res.status(200).json({ place: {} });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: E1 });
    }
  }
);
