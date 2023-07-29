import nextConnect from "next-connect";

import { initValidation, check } from "@/server/middleware/validators";
import { E1, E2, E3 } from "views/constants/ErrorMessages";
import { UserProfileRepository } from "@/server/repositories/UserProfile.repository";
import { checkUserId } from "@/server/controllers/checkUser";
import { NextApiRequest, NextApiResponse } from "next";

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

export default handler
  .use(validator)
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserId(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    const userToUpdate = req.body;

    const userRepo = new UserProfileRepository();
    const userProfile = await userRepo.updateUserProfile(user.id, userToUpdate);

    if (!userProfile) return res.status(500).json({ message: E1 });
    res.status(200).json({ user: userProfile });
  });
