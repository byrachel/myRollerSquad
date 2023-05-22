import type { NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "../../../../server/prisma/db/client";
import { E1, E3 } from "client/constants/ErrorMessages";
import {
  initValidation,
  check,
} from "../../../../server/middleware/validators";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

const handler = nextConnect();

const validator = initValidation([
  check("name").not().isEmpty().trim().escape().withMessage(E3),
]);

export default withIronSessionApiRoute(
  handler.use(validator).post(async (req: any, res: NextApiResponse) => {
    const { user } = req.session;
    if (!user || !user.role || user.role !== "ADMIN")
      return res.status(401).json({ message: E1 });

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
  }),
  ironConfig
);
