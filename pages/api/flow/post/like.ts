import type { NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "../../../../server/prisma/db/client";
import { isAuthenticated } from "../../../../server/middleware/isAuthenticated";
import { E1, E2 } from "app/constants/ErrorMessages";
import { ExtendedRequest } from "@/server/interfaces/ApiInterfaces";

const handler = nextConnect<ExtendedRequest, NextApiResponse>();

export default handler
  .use(isAuthenticated)
  .post(async (req: ExtendedRequest, res: NextApiResponse) => {
    const userIdFromToken = req.user;
    const { user_id, post_id } = req.body;
    if (!userIdFromToken || !user_id || userIdFromToken !== user_id || !post_id)
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
      const postIsAlreadyLiked = postLikes.includes(userIdFromToken);

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
      console.log(error);
      res.status(400).json({ code: E1 });
    }
  });