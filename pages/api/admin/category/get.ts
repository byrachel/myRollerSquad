import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../server/infrastructure/prisma/db/client";
import handler, { isAuthenticated } from "../../middleware/isAuthenticated";

export default handler
  .use(isAuthenticated)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const categories = await prisma.category.findMany();
      if (!categories) return new Error("NO CATEGORIES FOUND");
      return res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ name: "NO CATEGORIES FOUND" });
    }
  });
