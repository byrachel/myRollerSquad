import nextConnect from "next-connect";

import prisma from "@/server/prisma/db/client";
import { E1, E2 } from "src/constants/ErrorMessages";
import { checkUserId } from "@/server/controllers/checkUser";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect();

export default handler.delete(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserId(req, res);
    if (!user) return res.status(401).json({ message: E2 });

    const { postid } = req.query;
    if (!postid) return res.status(401).json({ message: E1 });
    const id = Array.isArray(postid) ? postid[0] : postid;

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: parseInt(id),
        },
        select: {
          user_id: true,
        },
      });

      if (!post || !post.user_id || post.user_id !== user.id)
        return res.status(401).json({ message: E2 });

      await prisma.post.delete({
        where: {
          id: parseInt(id),
        },
      });

      res.status(200).json({ post: {} });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: E1 });
    }
  }
);
