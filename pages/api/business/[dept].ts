import { NextApiResponse } from "next";
import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { E1 } from "views/constants/ErrorMessages";

const handler = nextConnect();

export default handler.get(async (req: any, res: NextApiResponse) => {
  const { dept, category } = req.query;

  try {
    const places = await prisma.place.findMany({
      take: 100,
      orderBy: {
        created_at: "desc",
      },
      where: {
        active: true,
        ...(!dept || dept === "all" ? {} : { county: dept }),
        ...(!category || category === "all" ? {} : { category }),
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
    if (!places) return res.status(200).json({ places: [] });
    res.status(200).json({ places });
  } catch (e) {
    res.status(500).json({ message: E1 });
  }
});
