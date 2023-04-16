import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

import handler from "../../../server/middleware/validators";
import { E1 } from "app/constants/ErrorMessages";

export default handler.post(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      res
        .status(200)
        .setHeader("Authorization", "")
        .setHeader("Set-Cookie", [
          cookie.serialize("refreshToken", "", {
            httpOnly: true,
            // secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: "strict",
            path: "/",
          }),
        ]);
    } catch (err) {
      res.status(400).json({ code: E1 });
    }
  }
);
