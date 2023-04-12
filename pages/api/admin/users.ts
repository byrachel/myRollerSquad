import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/infrastructure/prisma/db/client";

type Data = {
  users: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
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
    res.json({ users });
  } else {
    res.status(500).json({ users: "failed to load USERS data" });
  }
}
