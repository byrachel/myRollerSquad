import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { checkConnectedUserIsAdmin } from "@/server/controllers/checkUserId";
import prisma from "server/prisma/db/client";
import { E1, E2 } from "src/constants/ErrorMessages";

const handler = nextConnect();

export default handler.put(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkConnectedUserIsAdmin(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    const { pid } = req.query;
    if (!pid) return res.status(401).json({ message: E2 });
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

      if (!place) return res.status(401).json({ message: E2 });

      const placeUpdated = await prisma.place.update({
        where: {
          id,
        },
        data: {
          active: false,
        },
      });
      if (!placeUpdated) return res.status(401).json({ message: E1 });
      res.status(200).json({ place: placeUpdated });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: E1 });
    }
  }
);
