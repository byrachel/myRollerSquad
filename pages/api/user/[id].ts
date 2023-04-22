import type { NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironConfig } from "@/server/middleware/auth/ironConfig";
import { E1 } from "src/constants/ErrorMessages";

export default withIronSessionApiRoute(userRoute, ironConfig);

async function userRoute(req: any, res: NextApiResponse<any>) {
  if (req.method !== "GET") return res.status(401).json({ code: E1 });

  const { id } = req.query;
  if (!id || typeof id !== "string") return res.status(400).json({ code: E1 });

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
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
            style: true,
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
    // console.log(error);
    res.status(400).json({ code: E1 });
  }
}
