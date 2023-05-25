import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/server/prisma/db/client";
import { checkUserIsConnected } from "@/server/controllers/checkUserId";
import { E1, E2 } from "src/constants/ErrorMessages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(401).json({ message: E1 });

  const user = await checkUserIsConnected(req, res);
  if (!user) return res.status(401).json({ message: E2 });

  const { cursor, category, style } = req.query;
  const category_id = category
    ? Array.isArray(category)
      ? parseInt(category[0])
      : parseInt(category)
    : null;
  const style_id = style
    ? Array.isArray(style)
      ? parseInt(style[0])
      : parseInt(style)
    : null;
  const cursorValue = Array.isArray(cursor) ? cursor[0] : cursor;
  const postsCursor = cursorValue ? parseInt(cursorValue) : 0;

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
        ...(category_id ? { category_id } : {}),
        ...(style_id ? { style: { some: { style_id } } } : {}),
      },
      select: {
        id: true,
        title: true,
        content: true,
        category_id: true,
        style: {
          select: {
            style_id: true,
          },
        },
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
        place: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
        city: true,
        county: true,
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
    res.status(400).json({ message: E1 });
  }
}
