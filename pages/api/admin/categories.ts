import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../server/infrastructure/prisma/db/client";
import handler, { isAdmin } from "../middleware/isAdmin";
import { E1 } from "app/constants/ErrorMessages";

export default handler
  .use(isAdmin)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const categories = await prisma.category.findMany();
      return res.status(200).json({ categories });
    } catch (error) {
      res.status(400).json({ code: E1 });
    }
  });
