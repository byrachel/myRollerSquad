import { NextApiRequest, NextApiResponse } from "next";

import { E1, E2 } from "src/constants/ErrorMessages";
import { checkUserId } from "@/server/controllers/checkUser";
import { FlowRepository } from "@/server/repositories/Flow.repository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") return res.status(401).json({ message: E1 });
  const user = await checkUserId(req, res);
  if (!user) return res.status(401).json({ message: E2 });

  const { postid } = req.query;
  if (!postid) return res.status(401).json({ message: E1 });
  const id = Array.isArray(postid) ? postid[0] : postid;

  const flowRepo = new FlowRepository();
  const isDeleted = await flowRepo.deletePost(parseInt(id));
  if (!isDeleted) return res.status(401).json({ message: E1 });
  res.status(200).json({ post: {} });
}
