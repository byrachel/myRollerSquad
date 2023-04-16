import type { NextApiResponse } from "next";

import prisma from "../../../../server/prisma/db/client";
import { isAuthenticated } from "../../../../server/middleware/isAuthenticated";
import handler, {
  initValidation,
  put,
  check,
} from "../../../../server/middleware/validators";
import { ExtendedRequest } from "@/server/interfaces/ApiInterfaces";
import { E1, E2 } from "app/constants/ErrorMessages";

const validator = initValidation([
  check("name").not().isEmpty().trim().withMessage("Name can't be empty"),
  check("resume").trim(),
  check("country").not().isEmpty().trim(),
]);

export default handler
  .use(put(validator))
  .use(isAuthenticated)
  .put(async (req: ExtendedRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const userId = Array.isArray(id) ? id[0] : id;
    const userIdFromToken = req.user;

    if (!userId || !userIdFromToken || userIdFromToken !== parseInt(userId))
      return res.status(401).json({ code: E2 });

    try {
      const userToUpdate = req.body;

      const user = await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: userToUpdate,
      });

      const updatedUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        resume: user.resume,
        social_medias: user.social_medias,
        my_squad: user.my_squad,
        roller_dance_level: user.roller_dance_level,
        skatepark_level: user.skatepark_level,
        artistic_level: user.artistic_level,
        freestyle_level: user.freestyle_level,
        urban_level: user.urban_level,
        derby_level: user.derby_level,
        country: user.country,
        city: user.city,
      };
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      console.log(error);
      res.status(400).json({ name: E1 });
    }
  });
