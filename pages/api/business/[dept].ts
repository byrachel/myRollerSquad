import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { E1 } from "src/constants/ErrorMessages";

const handler = nextConnect();

export default handler.get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { dept, category } = req.query;
    const county = dept ? (Array.isArray(dept) ? dept[0] : dept) : "all";
    const categoryId = category
      ? Array.isArray(category)
        ? category[0]
        : category
      : "all";

    try {
      const places = await prisma.place.findMany({
        take: 100,
        orderBy: {
          created_at: "desc",
        },
        where: {
          active: true,
          ...(!county || county === "all" ? {} : { county: parseInt(county) }),
          ...(!categoryId || categoryId === "all"
            ? {}
            : { category: parseInt(categoryId) }),
        },
        include: {
          favorites: {
            select: {
              id: true,
            },
          },
          posts: {
            select: {
              id: true,
            },
          },
        },
      });
      res.status(200).json({ places });
    } catch (e) {
      res.status(400).json({ message: E1 });
    }
  }
);
