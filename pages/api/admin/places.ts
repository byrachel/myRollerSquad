import nextConnect from "next-connect";

import prisma from "server/prisma/db/client";
import { E1, E2 } from "views/constants/ErrorMessages";
import { checkConnectedUserIsAdmin } from "@/server/controllers/checkUser";

const handler = nextConnect();

export default handler.get(async (req: any, res: any) => {
  const user = await checkConnectedUserIsAdmin(req, res);
  if (!user) return res.status(401).json({ message: E2 });

  try {
    const places = await prisma.place.findMany();
    res.status(200).json({ places });
  } catch (e) {
    res.status(400).json({ message: E1 });
  }
});
