import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";

import prisma from "@/server/prisma/db/client";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler.get(async (req: any, res: any) => {
    const { user } = req.session;
    if (!user) return res.status(401).json({ posts: null });

    const { uid } = req.query;
    if (!uid || parseInt(uid) !== user.id)
      return res.status(401).json({ posts: null });

    try {
      const posts = await prisma.post.findMany({
        where: {
          user_id: parseInt(uid),
        },
        orderBy: {
          created_at: "desc",
        },
        select: {
          id: true,
          user_id: true,
          place_id: true,
          title: true,
          category_id: true,
          style: {
            select: {
              style_id: true,
            },
          },
          created_at: true,
          pictures: true,
          comments: true,
          user_likes: {
            select: {
              user_id: true,
            },
          },
        },
      });

      if (!posts) return res.status(401).json({ posts: null });

      res.status(200).json({ posts });
    } catch (error) {
      res.status(400).json({ posts: null });
    }
  }),
  ironConfig
);
