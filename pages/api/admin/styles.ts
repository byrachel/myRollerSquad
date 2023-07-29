import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { E1, E2 } from "views/constants/ErrorMessages";
import { checkConnectedUserIsAdmin } from "@/server/controllers/checkUser";

const handler = nextConnect();

export default handler.get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkConnectedUserIsAdmin(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    try {
      const styles = await prisma.style.findMany();
      if (!styles) return res.status(401).json({ message: E1 });
      return res.status(200).json({ styles });
    } catch (error) {
      res.status(400).json({ message: E1 });
    }
  }
);
