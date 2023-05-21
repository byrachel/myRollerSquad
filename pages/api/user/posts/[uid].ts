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
    if (!uid) return res.status(401).json({ posts: null });

    try {
      const posts = await prisma.post.findMany({
        where: {
          user_id: parseInt(uid),
          place_id: null,
        },
        take: 3,
        orderBy: {
          created_at: "desc",
        },
        select: {
          id: true,
          title: true,
          category_id: true,
          style: {
            select: {
              style_id: true,
            },
          },
          comments: true,
          content: true,
          created_at: true,
          pictures: true,
          country: true,
          city: true,
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
