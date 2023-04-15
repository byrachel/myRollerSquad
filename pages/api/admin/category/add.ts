import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../server/infrastructure/prisma/db/client";
import handler, { isAuthenticated } from "../../middleware/isAuthenticated";

export default handler
  .use(isAuthenticated)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body.name)
      return res.status(400).json({ error: "Name is missing." });
    try {
      const result = await prisma.category.create({
        data: {
          name: req.body.name,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ name: "CATEG : Something went wrong" });
    }
  });
