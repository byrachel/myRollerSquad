import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../server/infrastructure/prisma/db/client";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import handler, {
  initValidation,
  put,
  check,
} from "../../middleware/validators";

const validator = initValidation([
  check("name").not().isEmpty().trim().withMessage("Name can't be empty"),
  check("resume").trim(),
]);

export default handler
  .use(put(validator))
  .use(isAuthenticated)
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const userId = Array.isArray(id) ? id[0] : id;
    if (!userId) return res.status(400).json({ name: "USER ID NOT FOUND" });

    try {
      const userToUpdate = req.body;
      console.log("userToUpdate", userToUpdate);

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
      console.log("FIND USER BY ID ERR", error);
      res.status(500).json({ name: "USER NOT FOUND" });
    }
  });
