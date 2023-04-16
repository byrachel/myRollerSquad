import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

interface JwtPayload {
  userId: number;
  role: "ADMIN" | "USER" | "PRO";
  jti: string;
}

const isAdmin = (req: NextApiRequest, res: NextApiResponse, next: any) => {
  if (!req.headers.authorization) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const accessToken = req.headers.authorization.split(" ")[1];
    try {
      const { role } = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      ) as JwtPayload;
      if (role !== "ADMIN")
        return res.status(401).json({ error: "ADMIN ONLY -> Unauthorized" });
      next();
    } catch (e) {
      console.log(e);

      const refreshToken = req.cookies["refreshToken"];
      if (!refreshToken)
        return res.status(401).json({ error: "RT invalid -> Unauthorized" });

      try {
        const { userId, role, jti } = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_ACCESS_SECRET as string
        ) as JwtPayload;

        if (role !== "ADMIN")
          return res.status(401).json({ error: "ADMIN ONLY -> Unauthorized" });

        const newAccessToken = generateAccessToken(userId, role);
        const newRefreshToken = generateRefreshToken(userId, role, jti);

        res.setHeader("Set-Cookie", [
          cookie.serialize("refreshToken", newRefreshToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: "strict",
            path: "/",
          }),
          cookie.serialize("accessToken", newAccessToken, {
            httpOnly: false,
            // secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60,
            sameSite: "strict",
            path: "/",
          }),
        ]);

        next();
      } catch (err) {
        res.status(401).json({ error: "Unauthorized" });
      }
    }
  }
};

const handler = nextConnect<NextApiRequest, NextApiResponse>();

export default handler;
export { isAdmin };
