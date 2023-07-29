import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { E1, E2, E3 } from "views/constants/ErrorMessages";
import { initValidation, check } from "server/middleware/validators";
import { checkUserIsConnected } from "@/server/controllers/checkUser";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect();

const validator = initValidation([
  check("comment").not().isEmpty().escape().trim().withMessage(E3),
  check("answerOf").optional().isInt().withMessage(E3),
]);

export default handler
  .use(validator)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const user = await checkUserIsConnected(req, res);
    if (!user || user.id !== req.body.userId)
      return res.status(401).json({ message: E2 });

    const { comment, answerOf, postId } = req.body;
    if (!comment || !postId) return res.status(400).json({ message: E3 });

    try {
      let newComment = null;
      if (answerOf) {
        newComment = await prisma.comment.create({
          data: {
            comment,
            author: {
              connect: {
                id: user.id,
              },
            },
            answer_of: {
              connect: {
                id: parseInt(answerOf),
              },
            },
            post: {
              connect: {
                id: parseInt(postId),
              },
            },
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });
      } else {
        newComment = await prisma.comment.create({
          data: {
            comment,
            author: {
              connect: {
                id: user.id,
              },
            },
            post: {
              connect: {
                id: parseInt(postId),
              },
            },
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });
      }
      if (!newComment) return res.status(400).json({ message: E1 });
      res.status(200).json({ comment: newComment });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: E1 });
    }
  });
