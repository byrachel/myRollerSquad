import type { NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import prisma from "../../../server/prisma/db/client";
import { E1 } from "src/constants/ErrorMessages";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

export default withIronSessionApiRoute(stylesRoute, ironConfig);

async function stylesRoute(req: any, res: NextApiResponse<any>) {
  if (req.method !== "GET") return res.status(401).json({ code: E1 });

  const user = req.session.user;
  if (!user || !user.role || user.role !== "ADMIN")
    return res.status(401).json({ code: E1 });

  try {
    const styles = await prisma.style.findMany();
    return res.status(200).json({ styles });
  } catch (error) {
    res.status(400).json({ code: E1 });
  }
}
