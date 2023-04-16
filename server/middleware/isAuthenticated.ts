import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { ExtendedRequest } from "../interfaces/ApiInterfaces";
import { E1 } from "app/constants/ErrorMessages";

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
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json({ code: E1 });
  }

  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) return res.status(401).json({ code: E1 });

  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const { userId } = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;
    req.user = userId;
    next();
  } catch (err) {
    try {
      const { userId } = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_ACCESS_SECRET as string
      ) as JwtPayload;

      req.user = userId;
      next();
    } catch (err) {
      res.status(401).json({ code: E1 });
    }
  }
};

export { isAuthenticated };
