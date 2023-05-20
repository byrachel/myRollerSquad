import { withIronSessionApiRoute } from "iron-session/next";
import { ironConfig } from "@/server/middleware/auth/ironConfig";
import nextConnect from "next-connect";

const handler = nextConnect();

export default withIronSessionApiRoute(
  handler.get(async (req: any, res: any) => {
    const { user } = req.session;
    console.log(user);
    if (!user || !user.id)
      return res
        .status(200)
        .json({ user: { isLoggedIn: false, id: null, role: "USER" } });

    res.status(200).json({ user });
  }),
  ironConfig
);
