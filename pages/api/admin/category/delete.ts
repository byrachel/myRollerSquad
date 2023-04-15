import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../server/infrastructure/prisma/db/client";
import handler, { isAdmin } from "pages/api/middleware/isAdmin";
import { E1, E3 } from "app/constants/ErrorMessages";

export default handler
  .use(isAdmin)
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.body;
    if (!id || isNaN(id)) {
      return res.status(400).json({ code: E3 });
    }
    try {
      const categoryToRemove = await prisma.category.findUnique({
        where: { id },
      });
      if (!categoryToRemove) {
        return res.status(400).json({ code: E3 });
      }
      await prisma.category.delete({
        where: { id },
      });
      return res.status(200);
    } catch (error) {
      res.status(400).json({ code: E1 });
    }
  });
