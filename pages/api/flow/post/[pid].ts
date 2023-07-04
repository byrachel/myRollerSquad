import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import { E1 } from "src/constants/ErrorMessages";
import { FlowRepository } from "@/server/repositories/Flow.repository";

const handler = nextConnect();

export default handler.get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { pid } = req.query;
    if (!pid) return res.status(400).json({ message: E1 });
    const id = Array.isArray(pid) ? pid[0] : pid;

    try {
      const flowRepo = new FlowRepository();
      const selectedPost = await flowRepo.getPostById(parseInt(id));
      if (!selectedPost) return res.status(200).json({ post: {} });
      res.status(200).json({ post: selectedPost });
    } catch (e) {
      res.status(500).json({ message: E1 });
    }
  }
);
