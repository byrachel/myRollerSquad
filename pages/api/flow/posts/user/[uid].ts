import nextConnect from "next-connect";

import prisma from "@/server/prisma/db/client";
import { checkUserId } from "@/server/controllers/checkUserId";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect();

export default handler.get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserId(req, res);
    if (!user) return res.status(401).json({ posts: null });

    try {
      const posts = await prisma.post.findMany({
        where: {
          user_id: user.id,
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
  }
);
