import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/infrastructure/prisma/db/client";
import handler, { isAdmin } from "../middleware/isAdmin";

export default handler
  .use(isAdmin)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
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
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ name: "USERS NOT FOUND" });
    }
  });
