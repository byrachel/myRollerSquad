import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "server/prisma/db/client";
import { E1 } from "src/constants/ErrorMessages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(401).json({ message: E1 });

  const { pid } = req.query;
  const id = Array.isArray(pid) ? pid[0] : pid;
  if (!id) return res.status(400).json({ message: E1 });

  try {
    const posts = await prisma.post.findMany({
      where: {
        place_id: parseInt(id),
      },
      take: 3,
    });
    if (!posts) return res.status(400).json({ message: E1 });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(400).json({ message: E1 });
  }
}
