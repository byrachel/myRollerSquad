import type { NextApiRequest, NextApiResponse } from "next";

import { FlowRepository } from "@/server/repositories/Flow.repository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(200).json({ posts: [] });

  const { uid } = req.query;
  const id = Array.isArray(uid) ? uid[0] : uid;
  if (!id) return res.status(200).json({ posts: [] });

  const flowRepo = new FlowRepository();
  const posts = await flowRepo.getUserLatestPosts(parseInt(id));
  if (!posts) return res.status(200).json({ posts: [] });
  res.status(200).json({ posts });
}
