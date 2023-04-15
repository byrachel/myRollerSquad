import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../server/infrastructure/prisma/db/client";
import handler, { isAuthenticated } from "../../middleware/isAuthenticated";
import { E1 } from "app/constants/ErrorMessages";

export default handler
  .use(isAuthenticated)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { cursor } = req.query;
    const apiCursor = cursor
      ? Array.isArray(cursor)
        ? cursor[0]
        : cursor
      : "0";
    const postsCursor = parseInt(apiCursor);

    try {
      const cursorObj = postsCursor === 0 ? undefined : { id: postsCursor };
      const posts = await prisma.post.findMany({
        skip: postsCursor,
        cursor: cursorObj,
        take: 4,
        orderBy: {
          created_at: "desc",
        },
        select: {
          id: true,
          title: true,
          content: true,
          category_id: true,
          style_id: true,
          hashtags: true,
          created_at: true,
          pictures: true,
          link: true,
          // comments: true,
          user: true,
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
      res.status(200).json({ posts });
    } catch (error) {
      console.log(error);
      res.status(400).json({ code: E1 });
    }
  });
