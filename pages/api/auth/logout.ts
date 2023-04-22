import { ironConfig } from "@/server/middleware/auth/ironConfig";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiResponse } from "next";

export default withIronSessionApiRoute(logout, ironConfig);

async function logout(req: any, res: NextApiResponse<any>) {
  req.session.destroy();
  const user = req.session;
  res.status(200).json({ user });
}
