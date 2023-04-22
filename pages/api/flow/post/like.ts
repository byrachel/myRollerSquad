import type { NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import prisma from "../../../../server/prisma/db/client";
import { E1, E2 } from "src/constants/ErrorMessages";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

export default withIronSessionApiRoute(likeRoute, ironConfig);

async function likeRoute(req: any, res: NextApiResponse<any>) {
  if (req.method !== "POST") return res.status(401).json({ code: E1 });

  const user = req.session.user;
  const { user_id, post_id } = req.body;
  if (!user || !user.id || !user_id || user.id !== user_id || !post_id)
    return res.status(401).json({ code: E2 });

  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(post_id) },
      select: {
        user_likes: {
          select: {
            user_id: true,
          },
        },
      },
    });
    if (!post) return res.status(400).json({ code: E1 });

    const postLikes = post.user_likes.map(like => like.user_id);
    const postIsAlreadyLiked = postLikes.includes(user_id);

    if (postIsAlreadyLiked) {
      const postLiked = await prisma.postLiked.findUnique({
        where: {
          user_id_post_id: {
            user_id,
            post_id,
          },
        },
        select: {
          id: true,
        },
      });

      if (!postLiked) return res.status(400).json({ code: E1 });

      await prisma.postLiked.delete({
        where: {
          id: postLiked.id,
        },
      });
      res.status(200).json({ liked: false });
    } else {
      await prisma.postLiked.create({
        data: {
          user_id,
          post_id,
        },
      });
      res.status(200).json({ liked: true });
    }
  } catch (error) {
    res.status(400).json({ code: E1 });
  }
}
