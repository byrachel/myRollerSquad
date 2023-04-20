import type { NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironConfig } from "app/utils/ironConfig";
import sendEmail from "./sendEmail";

export default withIronSessionApiRoute(userRoute, ironConfig);

async function userRoute(req: any, res: NextApiResponse<any>) {
  const user = req.session.user;
  console.log(user);

  sendEmail(
    "byrachel@gmail.com",
    "Welcome to MyRollerSquad !",
    "<p>This is a test email</p>"
  );

  if (user) {
    res.status(200);
  } else {
    res.status(401).json({
      isLoggedIn: false,
      login: "",
    });
  }
}
