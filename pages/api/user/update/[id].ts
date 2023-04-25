import type { NextApiResponse } from "next";

import prisma from "../../../../server/prisma/db/client";
import {
  initValidation,
  check,
} from "../../../../server/middleware/validators";
// import { ExtendedRequest } from "@/server/interfaces/ApiInterfaces";
import { E1, E2 } from "src/constants/ErrorMessages";
import { ironSessionMiddleware } from "@/server/middleware/auth/ironSessionMiddleware";
import nextConnect from "next-connect";

const validator = initValidation([
  check("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Oups ! Le nom (ou pseudo) n'est pas valide."),
  check("resume").trim().escape(),
  check("country")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Oups ! Le pays n'est pas valide."),
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

export default handler
  .use(validator)
  .put(async (req: any, res: NextApiResponse) => {
    const { id } = req.query;
    const userId = Array.isArray(id) ? id[0] : id;

    const user = await ironSessionMiddleware(req);
    if (!user) return res.status(401).json({ message: E2 });

    if (!userId || !user.id || user.id !== parseInt(userId))
      return res.status(401).json({ message: E2 });

    try {
      const userToUpdate = req.body;

      const user = await prisma.user.update({
        where: {
          id: parseInt(userId),
        },
        data: userToUpdate,
        select: {
          // id: true,
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

      console.log(user);

      // const updatedUser = {
      //   id: user.id,
      //   email: user.email,
      //   name: user.name,
      //   avatar: user.avatar,
      //   resume: user.resume,
      //   social_medias: user.social_medias,
      //   roller_dance_level: user.roller_dance_level,
      //   skatepark_level: user.skatepark_level,
      //   artistic_level: user.artistic_level,
      //   freestyle_level: user.freestyle_level,
      //   urban_level: user.urban_level,
      //   derby_level: user.derby_level,
      //   country: user.country,
      //   county: user.county,
      //   city: user.city,
      // };
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: E1 });
    }
  });
