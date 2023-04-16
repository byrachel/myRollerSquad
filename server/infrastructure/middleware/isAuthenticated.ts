import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { ErrorInterface } from "../../interfaces/ErrorInterface";

interface JwtPayload {
  userId: number;
  role: "ADMIN" | "USER" | "PRO";
  jti: string;
}

export function isAuthenticated(req: any, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const accessToken = authorization?.split(" ")[1];
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
      const { userId, role, jti } = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_ACCESS_SECRET as string
      ) as JwtPayload;

      const accessToken = generateAccessToken(userId, role);
      const newRefreshToken = generateRefreshToken(userId, role, jti);

      if (accessToken && newRefreshToken) {
        req.payload = { userId, jti };
        req.headers.authorization = accessToken;
        req.cookies.refreshToken = newRefreshToken;

        next();
      } else {
        const err = new Error(
          "Veuillez vous connecter pour accéder à cette ressource."
        ) as ErrorInterface;
        err.status = 400;
        throw err;
      }
    } catch (error) {
      console.log("isAuthenticated >> ", error);
      const err = new Error(
        "Veuillez vous connecter pour accéder à cette ressource."
      ) as ErrorInterface;
      err.status = 400;
      throw err;
    }
  }
}
