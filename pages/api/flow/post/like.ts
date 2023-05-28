import nextConnect from "next-connect";

import prisma from "@/server/prisma/db/client";
import { E1, E2 } from "src/constants/ErrorMessages";
import { initValidation, check } from "@/server/middleware/validators";
import { checkUserIsConnected } from "@/server/controllers/checkUser";
import { NextApiRequest, NextApiResponse } from "next";

const validator = initValidation([
  check("post_id").not().isEmpty().trim().escape().withMessage(E1),
  check("user_id").not().isEmpty().trim().escape().withMessage(E2),
]);

const handler = nextConnect();

export default handler
  .use(validator)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserIsConnected(req, res);
    if (!user) return res.status(400).json({ message: E2 });

    const { user_id, post_id } = req.body;
    if (user.id !== user.id) return res.status(401).json({ message: E2 });

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
      if (!post) return res.status(400).json({ message: E1 });

      const postLikes =
        post.user_likes.length > 0
          ? post.user_likes.map((like: { user_id: number }) => like.user_id)
          : [];
      const postIsAlreadyLikedByThisUser =
        post.user_likes.length > 0
          ? postLikes.includes(parseInt(user_id))
          : false;

      if (postIsAlreadyLikedByThisUser) {
        const postLiked = await prisma.postLiked.findUnique({
          where: {
            user_id_post_id: {
              user_id: parseInt(user_id),
              post_id: parseInt(post_id),
            },
          },
          select: {
            id: true,
          },
        });

        if (!postLiked) return res.status(400).json({ message: E1 });

        await prisma.postLiked.delete({
          where: {
            id: postLiked.id,
          },
        });
        res.status(200).json({ liked: false });
      } else {
        await prisma.postLiked.create({
          data: {
            user_id: parseInt(user_id),
            post_id: parseInt(post_id),
          },
        });
        res.status(200).json({ liked: true });
      }
    } catch (error) {
      res.status(400).json({ message: E1 });
    }
  });
