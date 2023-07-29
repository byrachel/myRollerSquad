import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { E1, E2, E3 } from "views/constants/ErrorMessages";
import { initValidation, check } from "server/middleware/validators";
import { checkConnectedUserIsAdmin } from "@/server/controllers/checkUser";

const handler = nextConnect();

const validator = initValidation([
  check("name").not().isEmpty().trim().escape().withMessage(E3),
]);

export default handler
  .use(validator)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkConnectedUserIsAdmin(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    const { name } = req.body;
    if (!name) return res.status(400).json({ message: E3 });
    try {
      const category = await prisma.category.create({
        data: {
          name,
        },
      });
      res.status(200).json({ category });
    } catch (error) {
      res.status(400).json({ message: E1 });
    }
  });
