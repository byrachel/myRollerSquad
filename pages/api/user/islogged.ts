import type { NextApiResponse } from "next";
import prisma from "../../../server/prisma/db/client";
import handler, {
  isAuthenticated,
} from "../../../server/middleware/isAuthenticated";
import { ExtendedRequest } from "../../../server/interfaces/ApiInterfaces";
import { E1, E2 } from "app/constants/ErrorMessages";

export default handler
  .use(isAuthenticated)
  .get(async (req: ExtendedRequest, res: NextApiResponse) => {
    const userIdFromToken = req.user;
    if (!userIdFromToken) return res.status(400).json({ code: E2 });

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userIdFromToken,
        },
        select: {
          id: true,
          role: true,
        },
      });
      if (!user) return res.status(400).json({ code: E1 });
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(400).json({ code: E1 });
    }
  });
