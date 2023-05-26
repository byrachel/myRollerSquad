import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prisma/db/client";
import { E1 } from "src/constants/ErrorMessages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(401).json({ message: E1 });

  const { postid } = req.query;
  const id = Array.isArray(postid) ? postid[0] : postid;
  if (!id) return res.status(400).json({ message: E1 });

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        style: {
          select: {
            style_id: true,
          },
        },
        comments: true,
        user_likes: {
          select: {
            user_id: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            posts: {
              take: 3,
              select: {
                id: true,
                title: true,
              },
            },
            country: true,
          },
        },
      },
    });
    res.status(200).json({ post });
  } catch (err) {
    res.status(400).json({ message: E1 });
  }
}
