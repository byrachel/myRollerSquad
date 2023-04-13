import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/infrastructure/prisma/db/client";
import handler, { isAuthenticated } from "../middleware/isAuthenticated";

export default handler
  .use(isAuthenticated)
  .get(async (req: any, res: NextApiResponse) => {
    const { id } = req.query;
    const userId = Array.isArray(id) ? id[0] : id;
    if (!userId) return res.status(400).json({ name: "USER ID NOT FOUND" });

    const payload = req.user;
    console.log(payload);

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(userId),
        },
        select: {
          id: true,
          resume: true,
          social_medias: true,
          my_squad: true,
          roller_dance_level: true,
          skatepark_level: true,
          artistic_level: true,
          freestyle_level: true,
          urban_level: true,
          derby_level: true,
          role: true,
          name: true,
          avatar: true,
          posts: {
            take: 3,
            include: {
              comments: true,
              user_likes: true,
            },
          },
          email: true,
          country: true,
          city: true,
          postLiked: true,
        },
      });
      res.status(200).json({ user });
    } catch (error) {
      console.log("FIND USER BY ID ERR", error);
      res.status(500).json({ name: "USER NOT FOUND" });
    }
  });
