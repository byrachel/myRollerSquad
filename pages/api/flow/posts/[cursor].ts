import type { NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import prisma from "../../../../server/prisma/db/client";
import { ironConfig } from "@/server/middleware/auth/ironConfig";
import { E1 } from "src/constants/ErrorMessages";

export default withIronSessionApiRoute(userRoute, ironConfig);

async function userRoute(req: any, res: NextApiResponse<any>) {
  if (req.method !== "GET") return res.status(401).json({ code: E1 });

  const user = req.session.user;
  const { cursor, category, style } = req.query;

  if (!user) return res.status(401).json({ code: E1 });

  const postsCursor = cursor ? parseInt(cursor) : 0;

  try {
    // const cursorObj = postsCursor === 0 ? undefined : { id: postsCursor };
    const posts = await prisma.post.findMany({
      skip: postsCursor,
      // cursor: cursorObj,
      take: 4,
      orderBy: {
        created_at: "desc",
      },
      where: {
        ...(category ? { category_id: parseInt(category) } : {}),
        ...(style ? { style_id: parseInt(style) } : {}),
      },
      select: {
        id: true,
        title: true,
        content: true,
        category_id: true,
        style: true,
        hashtags: true,
        created_at: true,
        pictures: true,
        link: true,
        comments: true,
        user: {
          select: {
            avatar: true,
            id: true,
            name: true,
          },
        },
        squad_ids: true,
        city: true,
        country: true,
        user_likes: {
          select: {
            user_id: true,
          },
        },
        price: true,
        distance: true,
        duration: true,
      },
    });
    res.status(200).json({ posts, nextId: postsCursor + 4 });
  } catch (e) {
    console.log(e);
    res.status(400).json({ code: E1 });
  }
}
