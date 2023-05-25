import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { E1 } from "src/constants/ErrorMessages";

const handler = nextConnect();

export default handler.put(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body;
    if (!id) return res.status(401).json({ message: E1 });
    const user_id = Array.isArray(id) ? id[0] : id;

    try {
      const userToActivate = await prisma.user.update({
        where: {
          id: parseInt(user_id),
        },
        data: {
          active: true,
        },
      });
      if (!userToActivate) return res.status(401).json({ message: E1 });
      res.status(200).json({ user: { active: userToActivate.active } });
    } catch (err) {
      res.status(400).json({ message: E1 });
    }
  }
);
