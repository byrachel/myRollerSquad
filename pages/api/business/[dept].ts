import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { E1 } from "client/constants/ErrorMessages";

const handler = nextConnect();

export default handler.get(async (req: any, res: any) => {
  const { dept, category } = req.query;

  try {
    const places = await prisma.place.findMany({
      take: 100,
      orderBy: {
        created_at: "desc",
      },
      where: {
        active: true,
        ...(dept === "all" ? {} : { county: dept }),
        ...(category === "all" ? {} : { category }),
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
});
