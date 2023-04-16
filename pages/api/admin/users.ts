import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../server/prisma/db/client";
import handler, { isAdmin } from "../../../server/middleware/isAdmin";
import { E1 } from "app/constants/ErrorMessages";

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
      res.status(200).json({ users });
    } catch (err) {
      res.status(400).json({ code: E1 });
    }
  });
