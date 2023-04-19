// import type { NextApiRequest, NextApiResponse } from "next";
// import cookie from "cookie";

// import handler from "../../../server/middleware/validators";
import { withSessionRoute } from "app/utils/withSession";

export default withSessionRoute(async (req, res) => {
  req.session.destroy();
  return res.status(200);
});

// export default handler.post(
//   async (req: NextApiRequest, res: NextApiResponse) => {
//     return res
//       .status(200)
//       .setHeader("Authorization", "")
//       .setHeader("Set-Cookie", [
//         cookie.serialize("refreshToken", "", {
//           httpOnly: true,
//           // secure: process.env.NODE_ENV !== "development",
//           maxAge: 60 * 60 * 24 * 7, // 1 week
//           sameSite: "strict",
//           path: "/",
//         }),
//       ])
//       .json({ message: "Logged out" });
//   }
// );
