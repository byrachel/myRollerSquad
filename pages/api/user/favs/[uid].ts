import nextConnect from "next-connect";

import { E1, E2 } from "src/constants/ErrorMessages";
import { UserProfileRepository } from "@/server/repositories/UserProfile.repository";
import { checkUserId } from "@/server/controllers/checkUser";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect();

export default handler.get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserId(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    const userRepo = new UserProfileRepository();
    const userFavs = await userRepo.getUserFavs(user.id);
    if (!userFavs) return res.status(400).json({ message: E1 });
    res.status(200).json({ userFavs });
  }
);
