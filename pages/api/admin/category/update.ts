import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "../../../../server/prisma/db/client";
import { E1, E3 } from "src/constants/ErrorMessages";
import {
  initValidation,
  check,
} from "../../../../server/middleware/validators";
import { checkUserIsConnected } from "@/server/controllers/checkUserId";

const handler = nextConnect();

const validator = initValidation([
  check("name").not().isEmpty().trim().escape().withMessage(E3),
  check("id").not().isEmpty().isNumeric().withMessage(E3),
]);

export default handler
  .use(validator)
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserIsConnected(req, res);
    if (!user || !user.role || user.role !== "ADMIN")
      return res.status(401).json({ message: E1 });

    const { id, name } = req.body;
    if (!id || !name) return res.status(400).json({ message: E3 });

    try {
      const updatedCategory = await prisma.category.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      res.status(200).json({ category: updatedCategory });
    } catch (error) {
      res.status(400).json({ message: E1 });
    }
  });
