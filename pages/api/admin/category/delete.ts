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
  check("id")
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage("Oups ! Il manque quelque chose..."),
]);

export default handler
  .use(validator)
  .delete(async (req: any, res: NextApiResponse) => {
    const user = await ironSessionMiddleware(req);
    if (!user || !user.role || user.role !== "ADMIN")
      return res.status(401).json({ code: E1 });

    const { id } = req.body;
    if (!id) return res.status(400).json({ code: E3 });

    try {
      const categoryRemoved = await prisma.category.delete({
        where: { id },
      });
      if (!categoryRemoved) {
        return res.status(400).json({ code: E3 });
      }
      res.status(200).json({});
    } catch (error) {
      res.status(400).json({ code: E1 });
    }
  });
