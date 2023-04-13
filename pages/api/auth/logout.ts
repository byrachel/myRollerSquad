import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

import handler from "../middleware/handler";

export default handler.post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      res
        .status(200)
        .setHeader("Set-Cookie", [
          cookie.serialize("refreshToken", "", {
            httpOnly: true,
            // secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: "strict",
            path: "/",
          }),
          cookie.serialize("accessToken", "", {
            httpOnly: false,
            // secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/",
          }),
        ])
        .send({ message: "LOGOUT ok" });
    } catch (err) {
      res.status(500).json({ name: "LOGOUT failed" });
    }
  }
);
