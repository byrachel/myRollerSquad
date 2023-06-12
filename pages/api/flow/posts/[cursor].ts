import type { NextApiRequest, NextApiResponse } from "next";

import { checkUserIsConnected } from "@/server/controllers/checkUser";
import { E1, E2 } from "src/constants/ErrorMessages";
import { FlowRepository } from "@/server/repositories/Flow.repository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(400).json({ message: E1 });

  const user = await checkUserIsConnected(req, res);
  if (!user) return res.status(401).json({ message: E2 });

  const { cursor, category, style } = req.query;
  const category_id = category
    ? Array.isArray(category)
      ? parseInt(category[0])
      : parseInt(category)
    : null;
  const style_id = style
    ? Array.isArray(style)
      ? parseInt(style[0])
      : parseInt(style)
    : null;
  const cursorValue = Array.isArray(cursor) ? cursor[0] : cursor;
  const postsCursor = cursorValue ? parseInt(cursorValue) : 0;

  const flowRepo = new FlowRepository();
  const response = await flowRepo.getPosts(postsCursor, category_id, style_id);
  if (!response) return res.status(500).json({ message: E1 });
  return res
    .status(200)
    .json({ posts: response.posts, nextId: response.nextId });
}
