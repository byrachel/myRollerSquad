import type { NextApiRequest, NextApiResponse } from "next";

import { FlowRepository } from "@/server/repositories/Flow.repository";
import { E1 } from "views/constants/ErrorMessages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(401).json({ message: E1 });

  const { pid } = req.query;
  const id = Array.isArray(pid) ? pid[0] : pid;
  if (!id) return res.status(400).json({ message: E1 });

  const flowRepo = new FlowRepository();
  const posts = await flowRepo.getPlaceLatestPosts(parseInt(id));
  if (!posts) return res.status(500).json({ message: E1 });
  res.status(200).json({ posts });
}
