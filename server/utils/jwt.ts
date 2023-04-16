import { UserInterface } from "@/server/interfaces/UserInterface";
import jwt from "jsonwebtoken";

export function generateAccessToken(
  userId: number,
  role: "ADMIN" | "USER" | "PRO"
) {
  return jwt.sign({ userId, role }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "5m",
  });
}

export function generateRefreshToken(
  userId: number,
  role: "ADMIN" | "USER" | "PRO",
  jti: string
) {
  return jwt.sign(
    {
      userId,
      role,
      jti,
    },
    process.env.JWT_REFRESH_ACCESS_SECRET as string,
    {
      expiresIn: "2h",
    }
  );
}

export function generateTokens(user: UserInterface, jti: string) {
  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id, user.role, jti);

  return {
    accessToken,
    refreshToken,
  };
}
