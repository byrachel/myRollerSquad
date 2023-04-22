import type { NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironConfig } from "@/server/middleware/auth/ironConfig";

export default withIronSessionApiRoute(userRoute, ironConfig);

async function userRoute(req: any, res: NextApiResponse<any>) {
  if (req.method !== "POST") return res.status(401);

  const user = req.session.user;

  if (user) {
    res.status(200);
  } else {
    res.status(401);
  }
}
