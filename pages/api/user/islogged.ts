import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import { E1 } from "app/constants/ErrorMessages";
import { generateAccessToken, generateRefreshToken } from "@/server/utils/jwt";

const handler = nextConnect();

interface JwtPayload {
  userId: number;
  role: "ADMIN" | "USER" | "PRO";
  jti: string;
}

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({ code: E1 });
  }
  const accessToken = req.headers.authorization.split(" ")[1];

  try {
    const { userId, role } = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) return res.status(401).json({ code: E1 });

    const newAccessToken = generateAccessToken(userId, role);

    res.setHeader("Authorization", newAccessToken);

    res.status(200).json({ user: { id: userId, role } });
  } catch (e) {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) return res.status(401).json({ code: E1 });

    try {
      const { userId, role, jti } = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_ACCESS_SECRET as string
      ) as JwtPayload;

      const newAccessToken = generateAccessToken(userId, role);
      const newRefreshToken = generateRefreshToken(userId, role, jti);

      res.setHeader("Authorization", newAccessToken);
      res.setHeader("Set-Cookie", [
        cookie.serialize("refreshToken", newRefreshToken, {
          httpOnly: true,
          // secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        }),
      ]);
      res.status(200).json({ user: { id: userId, role } });
    } catch (err) {
      res.status(401).json({ code: E1 });
    }
  }
});

export default handler;
