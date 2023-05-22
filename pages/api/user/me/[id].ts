import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";

import { ironConfig } from "@/server/middleware/auth/ironConfig";
import { E1, E2 } from "client/constants/ErrorMessages";
import { UserProfileRepository } from "@/server/repositories/UserProfile.repository";

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler.get(async (req: any, res: any) => {
    const { user } = req.session;
    if (!user) return res.status(401).json({ message: E2 });

    const { id } = req.query;
    const userId = Array.isArray(id) ? id[0] : id;
    if (!userId || parseInt(userId) !== user.id)
      return res.status(401).json({ message: E2 });

    const userRepo = new UserProfileRepository();
    const userProfile = await userRepo.getMyProfile(user.id);
    if (!userProfile) return res.status(400).json({ message: E1 });
    res.status(200).json({ user: userProfile });
  }),
  ironConfig
);
