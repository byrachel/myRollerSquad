import { NextApiRequest, NextApiResponse } from "next";

import { E1, E2 } from "src/constants/ErrorMessages";
import { checkUserId } from "@/server/controllers/checkUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") return res.status(401).json({ message: E1 });

  const user = await checkUserId(req, res);
  if (!user || !user.id) return res.status(400).json({ message: E2 });

  const { cid } = req.query;
  const commentId = Array.isArray(cid) ? cid[0] : cid;
  if (!commentId) return res.status(400).json({ message: E1 });

  try {
    const comment = await prisma.comment.delete({
      where: {
        id: parseInt(commentId),
      },
    });
    if (!comment) return res.status(400).json({ message: E1 });
    res.status(200).json({ comment: null });
  } catch (err) {
    res.status(500).json({ message: E1 });
  }
}
