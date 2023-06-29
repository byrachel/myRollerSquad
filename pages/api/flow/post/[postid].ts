import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import { FlowRepository } from "@/server/repositories/Flow.repository";
import { E1 } from "src/constants/ErrorMessages";

const handler = nextConnect();

export default handler.get(async (req: any, res: NextApiResponse) => {
  const { postid } = req.query;
  if (!postid) return res.status(401).json({ message: E1 });

  try {
    const flowRepo = new FlowRepository();
    const selectedPost = await flowRepo.getPostById(parseInt(postid));
    if (!selectedPost) return res.status(401).json({ message: E1 });
    res.status(200).json({ post: selectedPost });
  } catch (e) {
    res.status(500).json({ message: E1 });
  }
});
