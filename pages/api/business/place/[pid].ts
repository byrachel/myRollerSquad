import nextConnect from "next-connect";

import prisma from "../../../../server/prisma/db/client";
import { E1 } from "client/constants/ErrorMessages";

const handler = nextConnect();

export default handler.get(async (req: any, res: any) => {
  const { pid } = req.query;
  if (!pid) return res.status(400).json({ message: E1 });

  try {
    const place = await prisma.place.findUnique({
      where: {
        id: parseInt(pid),
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
            title: true,
            category: {
              select: {
                name: true,
              },
            },
            created_at: true,
            content: true,
            pictures: true,
          },
        },
      },
    });
    if (!place || !place.active) return res.status(200).json({ place: {} });
    res.status(200).json({ place });
  } catch (e) {
    res.status(400).json({ message: E1 });
  }
});
