import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "server/prisma/db/client";
import { E1, E2 } from "src/constants/ErrorMessages";
import nextConnect from "next-connect";
import { checkConnectedUserIsAdmin } from "@/server/controllers/checkUserId";

const handler = nextConnect();

export default handler.get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkConnectedUserIsAdmin(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    try {
      const categories = await prisma.category.findMany();
      if (!categories) return res.status(401).json({ message: E1 });
      return res.status(200).json({ categories });
    } catch (error) {
      res.status(400).json({ message: E1 });
    }
  }
);
