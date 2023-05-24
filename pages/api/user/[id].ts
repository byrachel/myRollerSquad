import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { E1, E2 } from "src/constants/ErrorMessages";
import { UserProfileRepository } from "@/server/repositories/UserProfile.repository";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(400).json({ message: E2 });

  const { id } = req.query;
  const userId = id
    ? Array.isArray(id)
      ? parseInt(id[0])
      : parseInt(id)
    : null;
  if (!id || !userId) return res.status(400).json({ message: E1 });

  const userRepo = new UserProfileRepository();
  const userProfile = await userRepo.getUserProfile(userId);

  if (!userProfile) return res.status(400).json({ message: E1 });
  res.status(200).json({ user: userProfile });
}
