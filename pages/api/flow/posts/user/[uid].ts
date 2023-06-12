import { NextApiRequest, NextApiResponse } from "next";

import { checkUserId } from "@/server/controllers/checkUser";
import { FlowRepository } from "@/server/repositories/Flow.repository";
import { E1, E2 } from "src/constants/ErrorMessages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(401).json({ message: E1 });
  const user = await checkUserId(req, res);
  if (!user) return res.status(401).json({ message: E2 });

  const flowRepo = new FlowRepository();
  const posts = await flowRepo.getUserPosts(user.id);

  if (!posts) return res.status(500).json({ message: E1 });
  res.status(200).json({ posts });
}
