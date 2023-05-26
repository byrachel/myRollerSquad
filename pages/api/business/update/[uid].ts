import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { initValidation, check } from "server/middleware/validators";
import { E1, E2, E3 } from "src/constants/ErrorMessages";
import { checkUserId } from "server/controllers/checkUserId";

const validator = initValidation([
  check("name").not().isEmpty().trim().escape().withMessage(E3),
  check("description").trim().escape(),
  check("url").isURL().withMessage(E3),
  check("country").not().isEmpty().trim().escape().withMessage(E3),
  check("county").trim().escape(),
  check("city").trim().escape(),
  check("category").not().isEmpty().withMessage(E3),
]);

const handler = nextConnect();

export default handler
  .use(validator)
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserId(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    const { name, url, description, country, county, city, category, placeId } =
      req.body;
    if (!name || !category || !placeId)
      return res.status(401).json({ message: E3 });

    try {
      const placeToUpdate = await prisma.place.findUnique({
        where: {
          id: placeId,
        },
        select: {
          user_id: true,
        },
      });

      if (!placeToUpdate || user.id !== placeToUpdate.user_id)
        return res.status(401).json({ message: E1 });

      const updatedPlace = await prisma.place.update({
        where: {
          id: placeId,
        },
        data: {
          name,
          website: url,
          description,
          country,
          county,
          city,
          category,
        },
        include: {
          favorites: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!updatedPlace) return res.status(400).json({ message: E1 });

      res.status(200).json({ place: updatedPlace });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: E1 });
    }
  });
