import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { initValidation, check } from "@/server/middleware/validators";
import { E1, E2, E3 } from "src/constants/ErrorMessages";
import { checkUserIsConnected } from "@/server/controllers/checkUser";

const validator = initValidation([
  check("name").not().isEmpty().trim().escape().withMessage(E3),
  check("description").trim(),
  check("url").isURL().withMessage(E3),
  check("siren").not().isEmpty().trim().escape().withMessage(E3),
  check("type").not().isEmpty().trim().escape().withMessage(E3),
  check("country").not().isEmpty().trim().escape().withMessage(E3),
  check("county").trim().escape(),
  check("city").trim().escape(),
  check("category").not().isEmpty().withMessage(E3),
]);

const handler = nextConnect();

export default handler
  .use(validator)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserIsConnected(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    const {
      name,
      siren,
      url,
      description,
      type,
      country,
      county,
      city,
      category,
    } = req.body;
    if (!name || !siren || !type || !category)
      return res.status(401).json({ message: E3 });

    try {
      const place = await prisma.place.create({
        data: {
          user_id: user.id,
          name,
          siren,
          website: url,
          description,
          type,
          country,
          county,
          city,
          category,
        },
        include: {
          favorites: true,
        },
      });
      if (!place) return res.status(400).json({ message: E1 });
      res.status(200).json({ place });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: E1 });
    }
  });
