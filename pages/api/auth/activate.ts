import type { NextApiResponse } from "next";
import prisma from "../../../server/prisma/db/client";
import { E1, E3 } from "src/constants/ErrorMessages";
import { withSessionRoute } from "@/server/middleware/auth/withSession";

export default withSessionRoute(async (req: any, res: NextApiResponse) => {
  if (req.method !== "PUT") return res.status(401).json({ code: E1 });

  const { id } = req.body;
  if (!id || typeof id !== "number") return res.status(400).json({ code: E3 });

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        active: true,
      },
      select: {
        id: true,
        role: true,
      },
    });

    // if (!user.id && !user.role) return res.status(400).json({ code: E1 });
    // req.session.user = {
    //   id: user.id,
    //   role: user.role,
    // };

    // await req.session.save();

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ code: E1 });
  }
});
