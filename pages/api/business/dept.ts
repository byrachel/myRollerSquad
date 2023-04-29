import nextConnect from "next-connect";

import prisma from "../../../server/prisma/db/client";
import { E1 } from "src/constants/ErrorMessages";

const handler = nextConnect();

export default handler.get(async (req: any, res: any) => {
  const { department, cursor } = req.query;
  const selectedCounty = department ? department : null;

  const postsCursor = cursor ? parseInt(cursor) : 0;

  try {
    const places = await prisma.place.findMany({
      skip: postsCursor,
      take: 6,
      orderBy: {
        created_at: "desc",
      },
      where: {
        active: true,
        ...(department ? { county: selectedCounty } : {}),
      },
    });
    res.status(200).json({ places, nextId: postsCursor + 6 });
  } catch (e) {
    res.status(400).json({ message: E1 });
  }
});
