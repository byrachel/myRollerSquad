import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../server/infrastructure/prisma/db/client";
import { E1 } from "app/constants/ErrorMessages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(401).json({ code: E1 });

  const { postid } = req.query;
  const id = Array.isArray(postid) ? postid[0] : postid;
  if (!id) return res.status(400).json({ code: E1 });

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ post });
  } catch (err) {
    console.log(err);
    res.status(400).json({ code: E1 });
  }
}
