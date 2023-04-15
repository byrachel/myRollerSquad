import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import { generateAccessToken, generateRefreshToken } from "../auth/jwt";
import { ExtendedRequest } from "../interfaces/ApiInterfaces";

interface JwtPayload {
  userId: number;
  role: "ADMIN" | "USER" | "PRO";
  jti: string;
}

const isAuthenticated = (
  req: ExtendedRequest,
  res: NextApiResponse,
  next: any
) => {
  if (!req.headers.authorization) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    const accessToken = req.headers.authorization.split(" ")[1];
    try {
      jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      ) as JwtPayload;
      next();
    } catch (e) {
      const refreshToken = req.cookies["refreshToken"];
      if (!refreshToken)
        return res.status(401).json({ error: "RT invalid -> Unauthorized" });

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

        req.user = userId;
        next();
      } catch (err) {
        res.status(401).json({ error: "Unauthorized" });
      }
    }
  }
};

const handler = nextConnect<NextApiRequest, NextApiResponse>();

// const get = (middleware: any) => {
//   console.log("middleware", middleware);
//   return nextConnect().get(middleware);
// };

const put = (middleware: any) => {
  console.log("middleware", middleware);
  return nextConnect().put(middleware);
};

export default handler;
export { isAuthenticated, put };
