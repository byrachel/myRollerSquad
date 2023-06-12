import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { E1, E2 } from "src/constants/ErrorMessages";
import { checkConnectedUserIsAdmin } from "@/server/controllers/checkUser";

const handler = nextConnect();

export default handler.get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkConnectedUserIsAdmin(req, res);
    if (!user) return res.status(401).json({ message: E2 });

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
      if (!users) return res.status(400).json({ message: E1 });
      res.status(200).json({ users });
    } catch (err) {
      res.status(400).json({ message: E1 });
    }
  }
);
