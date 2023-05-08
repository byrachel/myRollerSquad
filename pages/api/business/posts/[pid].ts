import nextConnect from "next-connect";

import prisma from "@/server/prisma/db/client";

const handler = nextConnect();

export default handler.get(async (req: any, res: any) => {
  const { pid } = req.query;
  if (!pid) return res.status(401).json({ posts: null });

  try {
    const posts = await prisma.post.findMany({
      where: {
        place_id: parseInt(pid),
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        title: true,
        category_id: true,
        style: {
          select: {
            style_id: true,
          },
        },
        comments: true,
        content: true,
        created_at: true,
        pictures: true,
        country: true,
        city: true,
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
});
