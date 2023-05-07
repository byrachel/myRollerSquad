import { withIronSessionApiRoute } from "iron-session/next";
import { ironConfig } from "@/server/middleware/auth/ironConfig";
import { E1 } from "src/constants/ErrorMessages";
import nextConnect from "next-connect";
import prisma from "@/server/prisma/db/client";

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler.get(async (req: any, res: any) => {
    const { id } = req.query;

    const userId = Array.isArray(id) ? id[0] : id;
    if (!userId) return res.status(400).json({ message: E1 });

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
          email: true,
          country: true,
          county: true,
          city: true,
          postLiked: true,
          favorite_places: {
            select: {
              id: true,
              name: true,
              category: true,
              logo: true,
            },
          },
          place: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!user) return res.status(400).json({ message: E1 });
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: E1 });
    }
  }),
  ironConfig
);
