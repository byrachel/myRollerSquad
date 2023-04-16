import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../server/prisma/db/client";
import handler, { isAdmin } from "../../../server/middleware/isAdmin";
import { E1 } from "app/constants/ErrorMessages";

export default handler
  .use(isAdmin)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const styles = await prisma.style.findMany();
      return res.status(200).json({ styles });
    } catch (error) {
      res.status(400).json({ code: E1 });
    }
  });
