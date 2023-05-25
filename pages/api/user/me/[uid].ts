import { NextApiRequest, NextApiResponse } from "next";

import { E1, E2 } from "src/constants/ErrorMessages";
import { UserProfileRepository } from "@/server/repositories/UserProfile.repository";
import { checkUserId } from "@/server/controllers/checkUserId";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(401).json({ message: E1 });

  const user = await checkUserId(req, res);
  if (!user) return res.status(400).json({ message: E2 });

  const userRepo = new UserProfileRepository();
  const userProfile = await userRepo.getMyProfile(user.id);

  if (!userProfile) return res.status(400).json({ message: E1 });
  res.status(200).json({ user: userProfile });
}
