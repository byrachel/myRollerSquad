import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prisma/db/client";
import { isAuthenticated } from "../../../server/middleware/isAuthenticated";
import { E1 } from "app/constants/ErrorMessages";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

export default handler
  .use(isAuthenticated)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const userId = Array.isArray(id) ? id[0] : id;
    if (!userId) return res.status(400).json({ code: E1 });

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(userId),
        },
        select: {
          id: true,
          resume: true,
          social_medias: true,
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
          county: true,
          city: true,
          postLiked: true,
          my_events: true,
          my_followers: true,
          my_squad: true,
        },
      });
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(400).json({ code: E1 });
    }
  });
