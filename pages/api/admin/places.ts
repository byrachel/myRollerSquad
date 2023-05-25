import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { E1 } from "src/constants/ErrorMessages";
import { checkUserIsConnected } from "server/controllers/checkUserId";

const handler = nextConnect();

export default handler.get(async (req: any, res: any) => {
  const user = await checkUserIsConnected(req, res);
  if (!user || !user.role || user.role !== "ADMIN")
    return res.status(401).json({ message: E1 });

  try {
    const places = await prisma.place.findMany();
    res.status(200).json({ places });
  } catch (e) {
    res.status(400).json({ message: E1 });
  }
});
