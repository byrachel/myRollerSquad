import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../server/prisma/db/client";
import handler, { isAdmin } from "@/server/middleware/isAdmin";
import { E1, E3 } from "app/constants/ErrorMessages";

export default handler
  .use(isAdmin)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body.name) return res.status(400).json({ code: E3 });
    try {
      const style = await prisma.style.create({
        data: {
          name: req.body.name,
        },
      });
      res.status(200).json({ style });
    } catch (error) {
      res.status(400).json({ code: E1 });
    }
  });
