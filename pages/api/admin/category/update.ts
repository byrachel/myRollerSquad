import type { NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "../../../../server/prisma/db/client";
import { E1, E3 } from "src/constants/ErrorMessages";
import { ironSessionMiddleware } from "@/server/middleware/auth/ironSessionMiddleware";
import {
  initValidation,
  check,
} from "../../../../server/middleware/validators";

const handler = nextConnect();

const validator = initValidation([
  check("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Oups ! Il manque quelque chose..."),
  check("id")
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("Oups ! Il manque quelque chose..."),
]);

export default handler
  .use(validator)
  .put(async (req: any, res: NextApiResponse) => {
    const user = await ironSessionMiddleware(req);
    if (!user || !user.role || user.role !== "ADMIN")
      return res.status(401).json({ code: E1 });

    const { id, name } = req.body;
    if (!id || !name) return res.status(400).json({ code: E3 });

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
      res.status(400).json({ code: E1 });
    }
  });
