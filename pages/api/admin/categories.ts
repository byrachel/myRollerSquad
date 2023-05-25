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
      const categories = await prisma.category.findMany();
      if (!categories) return res.status(401).json({ message: E1 });
      return res.status(200).json({ categories });
    } catch (error) {
      res.status(400).json({ message: E1 });
    }
  }
);
