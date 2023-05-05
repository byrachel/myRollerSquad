import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";

import prisma from "@/server/prisma/db/client";
import { E1, E2 } from "src/constants/ErrorMessages";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler.delete(async (req: any, res: any) => {
    const { user } = req.session;
    if (!user) return res.status(401).json({ message: E2 });

    const { postid } = req.query;
    if (!postid) return res.status(401).json({ message: E2 });

    try {
      const post = await prisma.post.findUnique({
        where: {
          id: parseInt(postid),
        },
        select: {
          user_id: true,
        },
      });

      if (!post || !post.user_id || post.user_id !== user.id)
        return res.status(401).json({ message: E2 });

      await prisma.post.delete({
        where: {
          id: parseInt(postid),
        },
      });

      res.status(200).json({ post: {} });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: E1 });
    }
  }),
  ironConfig
);
