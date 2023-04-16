import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../server/prisma/db/client";
import handler, { isAdmin } from "@/server/middleware/isAdmin";
import { E1, E3 } from "app/constants/ErrorMessages";

export default handler
  .use(isAdmin)
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id, name } = req.body;
    if (!id || isNaN(id)) {
      return res.status(400).json({ code: E3 });
    }
    try {
      const style = await prisma.style.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      res.status(200).json({ style });
    } catch (error) {
      res.status(400).json({ code: E1 });
    }
  });
