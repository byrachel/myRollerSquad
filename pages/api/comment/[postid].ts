import { NextApiRequest, NextApiResponse } from "next";

import { E1, E2 } from "src/constants/ErrorMessages";
import { checkUserIsConnected } from "@/server/controllers/checkUserId";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(401).json({ message: E1 });

  const user = await checkUserIsConnected(req, res);
  if (!user || !user.id) return res.status(400).json({ message: E2 });

  const { postid } = req.query;
  const id = Array.isArray(postid) ? postid[0] : postid;
  if (!id) return res.status(400).json({ message: E1 });

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
    if (!post) return res.status(400).json({ message: E1 });
    const comments = post.comments.sort((a, b) => {
      if (a.published_at < b.published_at) return 1;
      if (a.published_at > b.published_at) return -1;
      return 0;
    });
    res.status(200).json({ comments });
  } catch (err) {
    res.status(400).json({ message: E1 });
  }
}
