import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";

import prisma from "../../../../server/prisma/db/client";
import {
  initValidation,
  check,
} from "../../../../server/middleware/validators";
import { E1, E2, E3 } from "client/constants/ErrorMessages";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

const validator = initValidation([
  check("name").not().isEmpty().trim().escape().withMessage(E3),
  check("resume").trim(),
  check("country").not().isEmpty().trim().withMessage(E3),
  check("county").trim().escape(),
  check("city").trim().escape(),
  check("roller_dance_level").isNumeric(),
  check("skatepark_level").isNumeric(),
  check("artistic_level").isNumeric(),
  check("freestyle_level").isNumeric(),
  check("urban_level").isNumeric(),
  check("derby_level").isNumeric(),
]);

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler.use(validator).put(async (req: any, res: any) => {
    const { user } = req.session;
    if (!user) return res.status(401).json({ message: E2 });
    const { id } = req.query;
    const userId = Array.isArray(id) ? id[0] : id;

    if (!userId || !user.id || user.id !== parseInt(userId))
      return res.status(401).json({ message: E2 });

    const userToUpdate = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: userToUpdate,
        select: {
          id: true,
          name: true,
          avatar: true,
          resume: true,
          social_medias: true,
          roller_dance_level: true,
          skatepark_level: true,
          artistic_level: true,
          freestyle_level: true,
          urban_level: true,
          derby_level: true,
          country: true,
          county: true,
          city: true,
        },
      });

      res.status(200).json({ user: updatedUser });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: E1 });
    }
  }),
  ironConfig
);
