import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "server/prisma/db/client";
import { E1 } from "src/constants/ErrorMessages";
import nextConnect from "next-connect";
import { checkUserIsConnected } from "@/server/controllers/checkUserId";

const handler = nextConnect();

export default handler.get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserIsConnected(req, res);
    if (!user || !user.role || user.role !== "ADMIN")
      return res.status(401).json({ message: E1 });

    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          posts: true,
          role: true,
          rgpd: true,
          avatar: true,
        },
      });
      if (!users) return res.status(401).json({ message: E1 });
      res.status(200).json({ users });
    } catch (err) {
      res.status(400).json({ message: E1 });
    }
  }
);
