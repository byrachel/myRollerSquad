import type { NextApiResponse } from "next";
import prisma from "../../../server/infrastructure/prisma/db/client";
import handler, { isAuthenticated } from "../middleware/isAuthenticated";
import { ExtendedRequest } from "../interfaces/ApiInterfaces";

export default handler
  .use(isAuthenticated)
  .get(async (req: ExtendedRequest, res: NextApiResponse) => {
    const userIdFromToken = req.user;
    if (!userIdFromToken)
      return res.status(400).json({ name: "USER ID NOT FOUND" });

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
      res.status(200).json({ user });
    } catch (error) {
      console.log("FIND USER BY ID ERR", error);
      res.status(500).json({ name: "USER NOT FOUND" });
    }
  });
