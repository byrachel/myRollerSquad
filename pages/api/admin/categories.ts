import type { NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import prisma from "../../../server/prisma/db/client";
import { E1 } from "src/constants/ErrorMessages";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

export default withIronSessionApiRoute(categoriesRoute, ironConfig);

async function categoriesRoute(req: any, res: NextApiResponse<any>) {
  if (req.method !== "GET") return res.status(401).json({ message: E1 });

  const user = req.session.user;
  if (!user || !user.role || user.role !== "ADMIN")
    return res.status(401).json({ message: E1 });

  try {
    const categories = await prisma.category.findMany();
    return res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ message: E1 });
  }
}
