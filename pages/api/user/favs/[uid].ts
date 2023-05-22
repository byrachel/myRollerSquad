import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironConfig } from "@/server/middleware/auth/ironConfig";
import { E1, E2 } from "src/constants/ErrorMessages";
import { UserProfileRepository } from "@/server/repositories/UserProfile.repository";

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler.get(async (req: any, res: any) => {
    const { user } = req.session;
    if (!user) return res.status(401).json({ message: E2 });

    const userRepo = new UserProfileRepository();
    const userFavs = await userRepo.getUserFavs(user.id);
    if (!userFavs) return res.status(400).json({ message: E1 });
    res.status(200).json({ userFavs });
  }),
  ironConfig
);
