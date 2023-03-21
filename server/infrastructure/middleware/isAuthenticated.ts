import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "./jwt";

interface JwtPayload {
  userId: number;
  jti: string;
}

export function isAuthenticated(req: any, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const accessToken = authorization.split(" ")[1];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const payload = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );

    req.payload = payload;
    req.headers.authorization = accessToken;
    next();
  } catch (err: any) {
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }

    try {
      const { userId, jti } = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_ACCESS_SECRET as string
      ) as JwtPayload;

      const accessToken = generateAccessToken(userId);
      const newRefreshToken = generateRefreshToken(userId, jti);

      if (accessToken && newRefreshToken) {
        // res.header("Authorization", accessToken);
        // res.cookie("refreshToken", newRefreshToken, {
        //   httpOnly: true,
        //   sameSite: "strict",
        // });
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
