import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../pages/api/utils/jwt";

interface JwtPayload {
  userId: number;
  role: "ADMIN" | "USER" | "PRO";
  jti: string;
}

export function isAdmin(req: any, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const accessToken = authorization ? authorization.split(" ")[1] : null;
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const { userId, role } = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    if (role !== "ADMIN") {
      return res.status(401).send("Access Denied. Admin only.");
    }

    req.payload = { userId };
    req.headers.authorization = accessToken;
    next();
  } catch (err: any) {
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }

    try {
      const { userId, role, jti } = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_ACCESS_SECRET as string
      ) as JwtPayload;

      if (role !== "ADMIN") {
        return res.status(401).send("Access Denied. Admin only.");
      }

      const accessToken = generateAccessToken(userId, role);
      const newRefreshToken = generateRefreshToken(userId, role, jti);

      if (accessToken && newRefreshToken) {
        req.payload = { userId };
        req.headers.authorization = accessToken;
        req.cookies.refreshToken = newRefreshToken;

        next();
      } else {
        return res.status(417).send("Access Token Not generated !");
      }
    } catch (error) {
      return res.status(400).send("Invalid Token.");
    }
  }
}
