import type { NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import prisma from "../../../server/prisma/db/client";
import { E1 } from "src/constants/ErrorMessages";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

export default withIronSessionApiRoute(userRoute, ironConfig);

async function userRoute(req: any, res: NextApiResponse<any>) {
  if (req.method !== "GET") return res.status(401);

  const user = req.session.user;
  if (!user || !user.role || user.role !== "ADMIN") return res.status(401);

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        posts: true,
        role: true,
        rgpd: true,
        avatar: true,
      },
    });
    res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({ code: E1 });
  }
}
