import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "./jwt";

interface JwtPayload {
  userId: number;
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
    next();
  } catch (err: any) {
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }

    try {
      const { userId } = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_ACCESS_SECRET as string
      ) as JwtPayload;

      const accessToken = generateAccessToken(userId);

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .header("Authorization", accessToken)
        .send({ message: "tokens & cookie re-generated" });
    } catch (error) {
      return res.status(400).send("Invalid Token.");
    }
  }
}
