import { NextApiRequest, NextApiResponse } from "next";

import { E1, E2 } from "views/constants/ErrorMessages";
import { UserProfileRepository } from "@/server/repositories/UserProfile.repository";
import { checkUserIsConnected } from "@/server/controllers/checkUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400).json({ message: E1 });

  const user = await checkUserIsConnected(req, res);
  if (!user) return res.status(401).json({ message: E2 });

  const { uid } = req.query;
  if (!uid) return res.status(401).json({ message: E1 });
  const userId = Array.isArray(uid) ? uid[0] : uid;
  if (!userId) return res.status(401).json({ message: E1 });

  const userRepo = new UserProfileRepository();
  const userProfile = await userRepo.getUserProfile(parseInt(userId));

  if (!userProfile) return res.status(500).json({ message: E1 });
  res.status(200).json({ user: userProfile });
}
